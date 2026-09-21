import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import {
  UploadCloud,
  Upload,
  File,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  Code as CodeIcon,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCw,
  Trash2,
  Camera,
  User
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────
export type FileUploadVariant = 'dropzone' | 'button' | 'avatar' | 'compact';
export type FileUploadSize = 'sm' | 'md' | 'lg';
export type FileUploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileUploadStatus;
  error?: string;
  file?: File;
  previewUrl?: string;
  uploadedAt?: Date;
}

export interface NeuronFileUploadProps {
  /** Visual display variant */
  variant?: FileUploadVariant;
  /** Sizing scale */
  size?: FileUploadSize;
  /** Accepted MIME types or extensions (e.g., "image/*,.pdf") */
  accept?: string | string[];
  /** Allow selecting multiple files */
  multiple?: boolean;
  /** Max file size in bytes (e.g. 10 * 1024 * 1024 for 10MB) */
  maxSize?: number;
  /** Maximum number of files in the list */
  maxFiles?: number;
  /** Disabled interaction */
  disabled?: boolean;
  /** Field label */
  label?: string;
  /** Supporting caption / helper text */
  helperText?: string;
  /** Field-level error message */
  error?: string;
  /** Controlled file list */
  value?: UploadFileItem[];
  /** Initial uncontrolled file list */
  defaultValue?: UploadFileItem[];
  /** Callback fired when files change */
  onChange?: (files: UploadFileItem[]) => void;
  /** Callback fired when files are dropped */
  onDrop?: (files: File[]) => void;
  /** Callback fired when a file item is removed */
  onRemove?: (file: UploadFileItem) => void;
  /** Callback fired when an upload retry is triggered */
  onRetry?: (file: UploadFileItem) => void;
  /** Custom upload handler function */
  customUpload?: (file: File, updateProgress: (progress: number) => void) => Promise<void>;
  /** Automatically simulate progress if no customUpload is provided (default true) */
  simulateUpload?: boolean;
  /** Whether to render the queued file list below the trigger */
  showFileList?: boolean;
  /** Primary dropzone prompt */
  dropzoneText?: string;
  /** Action link / button text */
  browseText?: string;
  /** Constraints hint (e.g., "PNG, JPG, PDF up to 10MB") */
  hintText?: string;
  /** Fallback URL for avatar variant */
  avatarFallbackUrl?: string;
  /** Shape for avatar variant ('circle' | 'rounded') */
  avatarShape?: 'circle' | 'rounded';
  /** Required field indicator */
  required?: boolean;
  /** Element ID */
  id?: string;
  /** Input name */
  name?: string;
  /** Custom wrapper class */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Helpers
// ─────────────────────────────────────────────────────────────────────────────
export function formatFileSize(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFileCategoryIcon(type: string, name: string) {
  const ext = name.split('.').pop()?.toLowerCase() || '';
  if (type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
    return <ImageIcon size={18} className="neuron-file-icon--image" />;
  }
  if (type === 'application/pdf' || ext === 'pdf') {
    return <FileText size={18} className="neuron-file-icon--pdf" />;
  }
  if (type.startsWith('video/') || ['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) {
    return <Film size={18} className="neuron-file-icon--video" />;
  }
  if (type.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
    return <Music size={18} className="neuron-file-icon--audio" />;
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    return <Archive size={18} className="neuron-file-icon--archive" />;
  }
  if (['js', 'ts', 'tsx', 'jsx', 'html', 'css', 'json', 'py', 'go', 'java', 'c', 'cpp'].includes(ext)) {
    return <CodeIcon size={18} className="neuron-file-icon--code" />;
  }
  return <File size={18} className="neuron-file-icon--default" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ─────────────────────────────────────────────────────────────────────────────
export default function NeuronFileUpload({
  variant = 'dropzone',
  size = 'md',
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  label,
  helperText,
  error,
  value,
  defaultValue = [],
  onChange,
  onDrop,
  onRemove,
  onRetry,
  customUpload,
  simulateUpload = true,
  showFileList = true,
  dropzoneText,
  browseText,
  hintText,
  avatarFallbackUrl,
  avatarShape = 'circle',
  required = false,
  id,
  name,
  className = '',
  style,
}: NeuronFileUploadProps) {
  const generatedId = useId();
  const inputId = id || `neuron-file-input-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  // Uncontrolled vs Controlled state
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = useState<UploadFileItem[]>(defaultValue);
  const files = isControlled ? value : internalFiles;

  // Drag-and-drop hover state
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Active error displayed (prop error takes precedence over validation error)
  const displayError = error || validationError;

  // Update files helper
  const updateFiles = useCallback(
    (newFiles: UploadFileItem[] | ((prev: UploadFileItem[]) => UploadFileItem[])) => {
      if (typeof newFiles === 'function') {
        setInternalFiles((prev) => {
          const updated = newFiles(prev);
          onChange?.(updated);
          return updated;
        });
      } else {
        if (!isControlled) {
          setInternalFiles(newFiles);
        }
        onChange?.(newFiles);
      }
    },
    [isControlled, onChange]
  );

  // Parse accepted formats string
  const acceptString = Array.isArray(accept) ? accept.join(',') : accept;

  // Validate a single file against accept and maxSize
  const validateFile = useCallback(
    (file: File): string | null => {
      // Check size limit
      if (maxSize && file.size > maxSize) {
        return `File "${file.name}" exceeds maximum allowed size of ${formatFileSize(maxSize)}.`;
      }

      // Check format if accept prop is set
      if (accept) {
        const acceptList = Array.isArray(accept)
          ? accept.map((a) => a.trim().toLowerCase())
          : accept.split(',').map((a) => a.trim().toLowerCase());

        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();

        const isAccepted = acceptList.some((pattern) => {
          if (pattern.startsWith('.')) {
            return fileName.endsWith(pattern);
          }
          if (pattern.endsWith('/*')) {
            const baseType = pattern.replace('/*', '');
            return fileType.startsWith(baseType);
          }
          return fileType === pattern;
        });

        if (!isAccepted) {
          return `File "${file.name}" format is not supported.`;
        }
      }

      return null;
    },
    [accept, maxSize]
  );

  // Simulate file upload with incremental progress
  const startUploadSimulation = useCallback(
    (fileItem: UploadFileItem) => {
      if (!fileItem.file) return;

      if (customUpload) {
        customUpload(fileItem.file, (prog) => {
          updateFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? {
                    ...f,
                    progress: prog,
                    status: prog >= 100 ? 'success' : 'uploading',
                    uploadedAt: prog >= 100 ? new Date() : undefined,
                  }
                : f
            )
          );
        }).catch((err) => {
          updateFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? {
                    ...f,
                    status: 'error',
                    error: err?.message || 'Upload failed',
                  }
                : f
            )
          );
        });
        return;
      }

      if (!simulateUpload) {
        // Immediately mark as success if no simulation requested
        updateFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, progress: 100, status: 'success', uploadedAt: new Date() }
              : f
          )
        );
        return;
      }

      // Simulated network chunked progression
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 10;
        if (currentProgress >= 100) {
          clearInterval(interval);
          updateFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? { ...f, progress: 100, status: 'success', uploadedAt: new Date() }
                : f
            )
          );
        } else {
          updateFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? { ...f, progress: currentProgress, status: 'uploading' }
                : f
            )
          );
        }
      }, 120);
    },
    [customUpload, simulateUpload, updateFiles]
  );

  // Process selected files from input or drop
  const handleFilesAdded = useCallback(
    (newRawFiles: File[]) => {
      if (disabled || newRawFiles.length === 0) return;
      setValidationError(null);

      // Check max files constraint
      if (maxFiles && files.length + newRawFiles.length > maxFiles) {
        setValidationError(`Maximum of ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed.`);
        return;
      }

      // If single file mode, keep only the latest file
      const incomingList = multiple ? newRawFiles : [newRawFiles[0]];

      const newItems: UploadFileItem[] = [];

      for (const file of incomingList) {
        const fileErr = validateFile(file);
        let previewUrl: string | undefined;

        if (file.type.startsWith('image/')) {
          try {
            previewUrl = URL.createObjectURL(file);
          } catch {
            // fallback
          }
        }

        const item: UploadFileItem = {
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          progress: fileErr ? 0 : 0,
          status: fileErr ? 'error' : 'uploading',
          error: fileErr || undefined,
          file,
          previewUrl,
        };

        newItems.push(item);
      }

      const updatedList = multiple ? [...files, ...newItems] : newItems;
      updateFiles(updatedList);

      // Start upload for non-error items
      newItems.forEach((item) => {
        if (!item.error) {
          startUploadSimulation(item);
        }
      });
    },
    [disabled, files, maxFiles, multiple, startUploadSimulation, updateFiles, validateFile]
  );

  // Native input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      handleFilesAdded(filesArray);
    }
    // Reset input value so re-selecting same file triggers change
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only leave if exiting the target
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      onDrop?.(droppedFiles);
      handleFilesAdded(droppedFiles);
    }
  };

  // Trigger file selection dialog
  const handleTriggerClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  // Keyboard navigation for trigger
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  // Remove a file from the list
  const handleRemoveFile = (item: UploadFileItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (item.previewUrl && item.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(item.previewUrl);
    }
    const updated = files.filter((f) => f.id !== item.id);
    updateFiles(updated);
    onRemove?.(item);
  };

  // Retry an errored upload
  const handleRetryFile = (item: UploadFileItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!item.file) return;

    updateFiles((prev) =>
      prev.map((f) =>
        f.id === item.id ? { ...f, status: 'uploading', progress: 0, error: undefined } : f
      )
    );

    const retryTarget = { ...item, status: 'uploading' as FileUploadStatus, progress: 0, error: undefined };
    startUploadSimulation(retryTarget);
    onRetry?.(item);
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.previewUrl && f.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(f.previewUrl);
        }
      });
    };
  }, [files]);

  // Default labels and text
  const resolvedDropzoneText = dropzoneText || 'Drag and drop files here, or';
  const resolvedBrowseText = browseText || 'Browse files';
  const resolvedHintText =
    hintText ||
    (maxSize
      ? `Supports ${acceptString || 'all file types'} up to ${formatFileSize(maxSize)}`
      : `Supports ${acceptString || 'all standard formats'}`);

  // ─────────────────────────────────────────────────────────────────────────
  // Render: Avatar Variant
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === 'avatar') {
    const activeAvatar = files[files.length - 1];
    const previewSrc = activeAvatar?.previewUrl || avatarFallbackUrl;

    return (
      <div
        className={`neuron-file-upload neuron-file-upload--avatar neuron-file-upload--${size} ${
          disabled ? 'is-disabled' : ''
        } ${displayError ? 'has-error' : ''} ${className}`}
        style={style}
      >
        {label && (
          <div className="neuron-file-upload__label">
            {label} {required && <span className="neuron-file-upload__required">*</span>}
          </div>
        )}

        <div className="neuron-file-avatar-wrapper">
          <div
            className={`neuron-file-avatar neuron-file-avatar--${avatarShape} ${
              isDragOver ? 'is-dragover' : ''
            }`}
            onClick={handleTriggerClick}
            onKeyDown={handleKeyDown}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            tabIndex={disabled ? -1 : 0}
            role="button"
            aria-label={label || 'Upload profile avatar'}
            aria-disabled={disabled}
          >
            {previewSrc ? (
              <img src={previewSrc} alt="Avatar preview" className="neuron-file-avatar__img" />
            ) : (
              <div className="neuron-file-avatar__placeholder">
                <User size={size === 'sm' ? 24 : size === 'lg' ? 44 : 32} />
              </div>
            )}

            {/* Hover overlay with camera icon */}
            <div className="neuron-file-avatar__overlay">
              <Camera size={size === 'sm' ? 14 : size === 'lg' ? 22 : 18} />
              <span className="neuron-file-avatar__overlay-text">
                {previewSrc ? 'Change' : 'Upload'}
              </span>
            </div>

            {/* Circular upload progress ring if currently uploading */}
            {activeAvatar?.status === 'uploading' && (
              <div className="neuron-file-avatar__progress-overlay">
                <svg className="neuron-file-avatar__progress-ring" viewBox="0 0 36 36">
                  <path
                    className="neuron-file-avatar__progress-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="neuron-file-avatar__progress-fill"
                    strokeDasharray={`${activeAvatar.progress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="neuron-file-avatar__progress-text">{activeAvatar.progress}%</span>
              </div>
            )}
          </div>

          {/* Action / Camera badge indicator at bottom-right */}
          {!disabled && (
            <div
              className={`neuron-file-avatar__action-badge neuron-file-avatar__action-badge--${size} neuron-file-avatar__action-badge--${avatarShape}`}
              aria-hidden="true"
            >
              <Camera size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
            </div>
          )}

          {/* Remove active avatar trigger if uploaded */}
          {activeAvatar && !disabled && (
            <button
              type="button"
              className="neuron-file-avatar__remove-btn"
              onClick={(e) => handleRemoveFile(activeAvatar, e)}
              title="Remove avatar"
              aria-label="Remove avatar"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>

        {hintText && <div className="neuron-file-upload__hint">{hintText}</div>}
        {helperText && !displayError && (
          <div className="neuron-file-upload__helper neuron-helper-text">{helperText}</div>
        )}
        {displayError && (
          <div className="neuron-file-upload__error">
            <AlertCircle size={14} /> <span>{displayError}</span>
          </div>
        )}

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          accept={acceptString}
          onChange={handleInputChange}
          disabled={disabled}
          className="neuron-file-upload__native-input"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render: Compact Bar Variant
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <div
        className={`neuron-file-upload neuron-file-upload--compact neuron-file-upload--${size} ${
          disabled ? 'is-disabled' : ''
        } ${displayError ? 'has-error' : ''} ${className}`}
        style={style}
      >
        {label && (
          <label htmlFor={inputId} className="neuron-file-upload__label">
            {label} {required && <span className="neuron-file-upload__required">*</span>}
          </label>
        )}

        <div
          className={`neuron-file-compact-bar ${isDragOver ? 'is-dragover' : ''}`}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label={label || 'Select file to upload'}
          aria-disabled={disabled}
        >
          <div className="neuron-file-compact-bar__lead">
            <Upload size={16} className="neuron-file-compact-bar__icon" />
            <span className="neuron-file-compact-bar__text">
              {files.length > 0
                ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                : resolvedDropzoneText}
            </span>
          </div>
          <button
            type="button"
            className="neuron-file-compact-bar__btn"
            disabled={disabled}
            tabIndex={-1}
          >
            {resolvedBrowseText}
          </button>
        </div>

        {hintText && <div className="neuron-file-upload__hint">{hintText}</div>}
        {helperText && !displayError && (
          <div className="neuron-file-upload__helper neuron-helper-text">{helperText}</div>
        )}
        {displayError && (
          <div className="neuron-file-upload__error">
            <AlertCircle size={14} /> <span>{displayError}</span>
          </div>
        )}

        {/* Queued File List */}
        {showFileList && files.length > 0 && (
          <div className="neuron-file-list">
            {files.map((item) => (
              <FileItemCard
                key={item.id}
                item={item}
                size={size}
                disabled={disabled}
                onRemove={(e) => handleRemoveFile(item, e)}
                onRetry={(e) => handleRetryFile(item, e)}
              />
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          accept={acceptString}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="neuron-file-upload__native-input"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render: Button Trigger Variant
  // ─────────────────────────────────────────────────────────────────────────
  if (variant === 'button') {
    return (
      <div
        className={`neuron-file-upload neuron-file-upload--button neuron-file-upload--${size} ${
          disabled ? 'is-disabled' : ''
        } ${displayError ? 'has-error' : ''} ${className}`}
        style={style}
      >
        {label && (
          <label htmlFor={inputId} className="neuron-file-upload__label">
            {label} {required && <span className="neuron-file-upload__required">*</span>}
          </label>
        )}

        <div className="neuron-file-button-trigger-wrap">
          <button
            type="button"
            id={inputId}
            className={`neuron-file-button-trigger neuron-file-button-trigger--${size}`}
            onClick={handleTriggerClick}
            disabled={disabled}
          >
            <Upload size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
            <span>{resolvedBrowseText}</span>
          </button>

          {resolvedHintText && (
            <span className="neuron-file-button-hint">{resolvedHintText}</span>
          )}
        </div>

        {helperText && !displayError && (
          <div className="neuron-file-upload__helper neuron-helper-text">{helperText}</div>
        )}
        {displayError && (
          <div className="neuron-file-upload__error">
            <AlertCircle size={14} /> <span>{displayError}</span>
          </div>
        )}

        {/* Queued File List */}
        {showFileList && files.length > 0 && (
          <div className="neuron-file-list">
            {files.map((item) => (
              <FileItemCard
                key={item.id}
                item={item}
                size={size}
                disabled={disabled}
                onRemove={(e) => handleRemoveFile(item, e)}
                onRetry={(e) => handleRetryFile(item, e)}
              />
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          name={name}
          type="file"
          accept={acceptString}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="neuron-file-upload__native-input"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Render: Dropzone Variant (Default)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className={`neuron-file-upload neuron-file-upload--dropzone neuron-file-upload--${size} ${
        disabled ? 'is-disabled' : ''
      } ${displayError ? 'has-error' : ''} ${className}`}
      style={style}
    >
      {label && (
        <label htmlFor={inputId} className="neuron-file-upload__label">
          {label} {required && <span className="neuron-file-upload__required">*</span>}
        </label>
      )}

      {/* Main Drag-and-Drop Area */}
      <div
        className={`neuron-file-dropzone ${isDragOver ? 'is-dragover' : ''} ${
          disabled ? 'is-disabled' : ''
        }`}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={label || 'Drag and drop files here, or browse files'}
        aria-disabled={disabled}
      >
        <div className="neuron-file-dropzone__icon-badge">
          <UploadCloud
            size={size === 'sm' ? 22 : size === 'lg' ? 36 : 28}
            strokeWidth={1.75}
            className="neuron-file-dropzone__icon"
          />
        </div>

        <div className="neuron-file-dropzone__body">
          <p className="neuron-file-dropzone__prompt">
            <span>{resolvedDropzoneText}</span>{' '}
            <span className="neuron-file-dropzone__browse-link">{resolvedBrowseText}</span>
          </p>
          <p className="neuron-file-dropzone__hint">{resolvedHintText}</p>
        </div>
      </div>

      {helperText && !displayError && (
        <div className="neuron-file-upload__helper neuron-helper-text">{helperText}</div>
      )}

      {displayError && (
        <div className="neuron-file-upload__error">
          <AlertCircle size={14} /> <span>{displayError}</span>
        </div>
      )}

      {/* Queued File List */}
      {showFileList && files.length > 0 && (
        <div className="neuron-file-list">
          {files.map((item) => (
            <FileItemCard
              key={item.id}
              item={item}
              size={size}
              disabled={disabled}
              onRemove={(e) => handleRemoveFile(item, e)}
              onRetry={(e) => handleRetryFile(item, e)}
            />
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        id={inputId}
        name={name}
        type="file"
        accept={acceptString}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        className="neuron-file-upload__native-input"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-Component: File Item Card in the Queue
// ─────────────────────────────────────────────────────────────────────────────
interface FileItemCardProps {
  item: UploadFileItem;
  size: FileUploadSize;
  disabled?: boolean;
  onRemove: (e: React.MouseEvent) => void;
  onRetry: (e: React.MouseEvent) => void;
}

function FileItemCard({ item, size, disabled, onRemove, onRetry }: FileItemCardProps) {
  const isImage = item.type.startsWith('image/') && !!item.previewUrl;

  return (
    <div
      className={`neuron-file-item neuron-file-item--${item.status} neuron-file-item--${size}`}
      role="listitem"
    >
      {/* Thumbnail or Icon */}
      <div className="neuron-file-item__visual">
        {isImage ? (
          <img
            src={item.previewUrl}
            alt={item.name}
            className="neuron-file-item__thumbnail"
          />
        ) : (
          <div className="neuron-file-item__icon-wrapper">
            {getFileCategoryIcon(item.type, item.name)}
          </div>
        )}
      </div>

      {/* Metadata & Progress */}
      <div className="neuron-file-item__details">
        <div className="neuron-file-item__top-row">
          <span className="neuron-file-item__name" title={item.name}>
            {item.name}
          </span>
          <span className="neuron-file-item__size">{formatFileSize(item.size)}</span>
        </div>

        {/* Progress Bar (during upload) */}
        {item.status === 'uploading' && (
          <div className="neuron-file-item__progress-bar-wrap">
            <div className="neuron-file-item__progress-track">
              <div
                className="neuron-file-item__progress-fill"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <span className="neuron-file-item__progress-pct">{item.progress}%</span>
          </div>
        )}

        {/* Error message */}
        {item.status === 'error' && (
          <div className="neuron-file-item__error-msg">
            <AlertCircle size={12} />
            <span>{item.error || 'Upload failed. Please try again.'}</span>
          </div>
        )}

        {/* Success confirmation */}
        {item.status === 'success' && (
          <div className="neuron-file-item__success-msg">
            <CheckCircle2 size={12} />
            <span>Ready</span>
          </div>
        )}
      </div>

      {/* Action Triggers */}
      <div className="neuron-file-item__actions">
        {item.status === 'error' && !disabled && (
          <button
            type="button"
            className="neuron-file-item__action-btn neuron-file-item__action-btn--retry"
            onClick={onRetry}
            title="Retry upload"
            aria-label={`Retry uploading ${item.name}`}
          >
            <RotateCw size={14} />
          </button>
        )}

        {!disabled && (
          <button
            type="button"
            className="neuron-file-item__action-btn neuron-file-item__action-btn--remove"
            onClick={onRemove}
            title="Remove file"
            aria-label={`Remove file ${item.name}`}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
