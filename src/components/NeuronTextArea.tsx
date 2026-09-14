'use client';

import React, { 
  forwardRef, 
  useRef, 
  useImperativeHandle, 
  useState, 
  useEffect, 
  useCallback, 
  useId 
} from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading3, 
  Quote, 
  Code, 
  FileCode, 
  List, 
  ListOrdered, 
  Link2,
  Undo2,
  Redo2
} from 'lucide-react';
import NeuronTooltip from './NeuronTooltip';

export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaVariant = 'default' | 'filled' | 'ghost';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';
export type TextAreaState = 'default' | 'error' | 'success' | 'warning';
export type TextAreaCountType = 'characters' | 'words';
export type TextAreaToolType = 
  | 'bold' 
  | 'italic' 
  | 'strike' 
  | 'heading' 
  | 'quote' 
  | 'code' 
  | 'codeblock' 
  | 'bullet' 
  | 'number' 
  | 'link'
  | 'undo'
  | 'redo';
export type TextAreaToolbarPosition = 'top' | 'bottom';

export interface NeuronTextAreaProps 
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Label displayed above the textarea */
  label?: string;
  /** Auxiliary element next to label (e.g. badge or action link) */
  labelAction?: React.ReactNode;
  /** Size scale of the textarea: sm (12px), md (14px), lg (16px) */
  size?: TextAreaSize;
  /** Visual container style: default, filled, or ghost */
  variant?: TextAreaVariant;
  /** Resizing behavior: none, vertical, horizontal, both, or auto */
  resize?: TextAreaResize;
  /** Convenience flag to automatically adjust height based on content */
  autoResize?: boolean;
  /** Minimum number of visible text rows */
  minRows?: number;
  /** Maximum number of rows before enabling vertical scrolling in auto-resize mode */
  maxRows?: number;
  /** Contextual validation state: default, error, success, or warning */
  state?: TextAreaState;
  /** Alias to set state to error */
  destructive?: boolean;
  /** Explanatory helper or validation feedback text below the input */
  helperText?: string;
  /** Alias for helperText */
  hintText?: string;
  /** Show contextual help icon with tooltip */
  helpIcon?: boolean;
  /** Help tooltip text */
  helpTooltip?: string;
  /** Show live character or word count in footer */
  showCount?: boolean;
  /** Counting mode for character limiter: characters or words */
  countType?: TextAreaCountType;
  /** Custom formatter for the counter display */
  countFormatter?: (current: number, max?: number) => React.ReactNode;
  /** Displays a clear button when text is present */
  allowClear?: boolean;
  /** Callback fired when the clear button is clicked */
  onClear?: () => void;
  /** Leading icon rendered inside top-left of the textarea container */
  leadingIcon?: React.ReactNode;
  /** Auxiliary action slot in footer (e.g. emoji picker, attachments, submit button) */
  actions?: React.ReactNode;
  /** Enable formatting toolbar variant (bold, italic, strike, heading, lists, etc.) */
  withToolbar?: boolean;
  /** Position of the formatting toolbar: 'top' or 'bottom' */
  toolbarPosition?: TextAreaToolbarPosition;
  /** Customizable list of tool buttons to display */
  toolbarTools?: TextAreaToolType[];
  /** Auxiliary slot inside the toolbar (e.g. preview toggle, attachments, clear action) */
  toolbarExtra?: React.ReactNode;
  /** Optional locale override ('en' | 'id') */
  locale?: 'en' | 'id';
}

// Reusable Help Icon SVG matching Neudela standards
const HelpIconSvg = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Clear X Icon SVG
const ClearIconSvg = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export interface ToolDefinition {
  labelEn: string;
  labelId: string;
  descEn: string;
  descId: string;
  shortcut?: string;
  shortcutMac?: string;
  group: number;
  icon: React.ComponentType<{ size?: number }>;
}

// Toolbar metadata definitions with rich descriptions and shortcuts
const TOOL_DEFINITIONS: Record<TextAreaToolType, ToolDefinition> = {
  bold: {
    labelEn: 'Bold',
    labelId: 'Tebal',
    descEn: 'Wrap selected text in double asterisks (**text**) for strong emphasis.',
    descId: 'Bungkus teks dengan tanda bintang (**teks**) untuk penekanan tebal.',
    shortcut: 'Ctrl+B',
    shortcutMac: '⌘B',
    group: 1,
    icon: Bold,
  },
  italic: {
    labelEn: 'Italic',
    labelId: 'Miring',
    descEn: 'Wrap selected text in single asterisks (*text*) for gentle emphasis.',
    descId: 'Bungkus teks dengan tanda bintang tunggal (*teks*) untuk teks miring.',
    shortcut: 'Ctrl+I',
    shortcutMac: '⌘I',
    group: 1,
    icon: Italic,
  },
  strike: {
    labelEn: 'Strikethrough',
    labelId: 'Coretan',
    descEn: 'Wrap selected text in double tildes (~~text~~) to mark as deleted.',
    descId: 'Bungkus teks dengan tanda tilde (~~teks~~) untuk efek garis coret.',
    shortcut: 'Ctrl+Shift+X',
    shortcutMac: '⇧⌘X',
    group: 1,
    icon: Strikethrough,
  },
  heading: {
    labelEn: 'Heading 3',
    labelId: 'Judul H3',
    descEn: 'Format active line as a level 3 subsection heading (###).',
    descId: 'Format baris aktif sebagai subjudul tingkat 3 (###).',
    shortcut: '###',
    shortcutMac: '###',
    group: 2,
    icon: Heading3,
  },
  quote: {
    labelEn: 'Blockquote',
    labelId: 'Kutipan',
    descEn: 'Format active line as an indented excerpt or citation (>).',
    descId: 'Format baris aktif sebagai kutipan atau catatan khusus (>).',
    shortcut: '>',
    shortcutMac: '>',
    group: 2,
    icon: Quote,
  },
  code: {
    labelEn: 'Inline Code',
    labelId: 'Kode Sebaris',
    descEn: 'Wrap selected text in backticks (`code`) for short commands or tokens.',
    descId: 'Bungkus teks dengan tanda petik (`kode`) untuk perintah singkat.',
    shortcut: 'Ctrl+E',
    shortcutMac: '⌘E',
    group: 2,
    icon: Code,
  },
  codeblock: {
    labelEn: 'Code Block',
    labelId: 'Blok Kode',
    descEn: 'Insert a multi-line fenced code block (```).',
    descId: 'Sisipkan blok kode multibaris berpagar tiga tanda kutip balik (```).',
    shortcut: '```',
    shortcutMac: '```',
    group: 2,
    icon: FileCode,
  },
  bullet: {
    labelEn: 'Bulleted List',
    labelId: 'Daftar Poin',
    descEn: 'Format active line as an unordered bulleted list item (-).',
    descId: 'Format baris aktif sebagai butir daftar berpoin tak berurutan (-).',
    shortcut: '-',
    shortcutMac: '-',
    group: 3,
    icon: List,
  },
  number: {
    labelEn: 'Numbered List',
    labelId: 'Daftar Bernomor',
    descEn: 'Format active line as an ordered sequential list item (1.).',
    descId: 'Format baris aktif sebagai butir daftar berurutan dengan nomor (1.).',
    shortcut: '1.',
    shortcutMac: '1.',
    group: 3,
    icon: ListOrdered,
  },
  link: {
    labelEn: 'Insert Link',
    labelId: 'Sisipkan Tautan',
    descEn: 'Wrap selected text into a markdown hyperlink ([text](url)).',
    descId: 'Format pilihan sebagai tautan hyperlink markdown ([teks](url)).',
    shortcut: 'Ctrl+K',
    shortcutMac: '⌘K',
    group: 3,
    icon: Link2,
  },
  undo: {
    labelEn: 'Undo',
    labelId: 'Urungkan',
    descEn: 'Revert the most recent text modification.',
    descId: 'Batalkan perubahan teks yang terakhir dilakukan.',
    shortcut: 'Ctrl+Z',
    shortcutMac: '⌘Z',
    group: 4,
    icon: Undo2,
  },
  redo: {
    labelEn: 'Redo',
    labelId: 'Ulangi',
    descEn: 'Reapply the previously undone editing action.',
    descId: 'Terapkan kembali perubahan teks yang sebelumnya dibatalkan.',
    shortcut: 'Ctrl+Y',
    shortcutMac: '⌘Y',
    group: 4,
    icon: Redo2,
  },
};

const DEFAULT_TOOLBAR_TOOLS: TextAreaToolType[] = [
  'bold',
  'italic',
  'strike',
  'heading',
  'quote',
  'code',
  'bullet',
  'number',
  'link'
];

const NeuronTextArea = forwardRef<HTMLTextAreaElement, NeuronTextAreaProps>(function NeuronTextArea(
  {
    label,
    labelAction,
    placeholder = '',
    disabled = false,
    readOnly = false,
    required = false,
    size = 'md',
    variant = 'default',
    resize = 'vertical',
    autoResize = false,
    minRows = 3,
    maxRows = 10,
    rows = 3,
    state = 'default',
    destructive = false,
    helperText,
    hintText,
    helpIcon = false,
    helpTooltip,
    showCount = false,
    maxLength,
    countType = 'characters',
    countFormatter,
    allowClear = false,
    onClear,
    leadingIcon,
    actions,
    withToolbar = false,
    toolbarPosition = 'top',
    toolbarTools,
    toolbarExtra,
    locale,
    value,
    defaultValue,
    onChange,
    id: customId,
    className = '',
    style,
    ...restProps
  },
  forwardedRef
) {
  const generatedId = useId();
  const inputId = customId || `neuron-textarea-${generatedId}`;
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const contextLanguage: 'en' | 'id' = 
    locale || 
    (typeof document !== 'undefined' && document.documentElement.lang === 'id' ? 'id' : 'en');

  // Expose inner ref to parent
  useImperativeHandle(forwardedRef, () => innerRef.current as HTMLTextAreaElement);

  // Controlled vs Uncontrolled value tracking
  const [internalValue, setInternalValue] = useState<string>(() => {
    if (value !== undefined) return String(value);
    if (defaultValue !== undefined) return String(defaultValue);
    return '';
  });

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value || '') : internalValue;

  // Effective state
  const effectiveState: TextAreaState = destructive ? 'error' : state;
  const isAutoResize = autoResize || resize === 'auto';
  const displayHelper = hintText || helperText;

  // ── Auto-Resize Logic ──
  const adjustHeight = useCallback(() => {
    const textarea = innerRef.current;
    if (!textarea || !isAutoResize) return;

    // Reset height temporarily to calculate scrollHeight accurately
    textarea.style.height = 'auto';

    // Calculate approximate row height based on font size & line-height
    const computed = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computed.lineHeight) || 20;
    const paddingTop = parseFloat(computed.paddingTop) || 8;
    const paddingBottom = parseFloat(computed.paddingBottom) || 8;
    const borderTop = parseFloat(computed.borderTopWidth) || 1;
    const borderBottom = parseFloat(computed.borderBottomWidth) || 1;
    const verticalPadding = paddingTop + paddingBottom + borderTop + borderBottom;

    const effectiveMinRows = Math.max(minRows, rows);
    const minHeight = effectiveMinRows * lineHeight + verticalPadding;
    const maxHeight = maxRows * lineHeight + verticalPadding;

    const scrollHeight = textarea.scrollHeight;
    let targetHeight = Math.max(scrollHeight, minHeight);

    if (maxRows && targetHeight > maxHeight) {
      targetHeight = maxHeight;
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }

    textarea.style.height = `${targetHeight}px`;
  }, [isAutoResize, minRows, maxRows, rows]);

  // Readjust on value change or window resize
  useEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight]);

  // ── Change Handler ──
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  // ── Formatting Action Executor ──
  const applyFormatting = useCallback((tool: TextAreaToolType) => {
    const textarea = innerRef.current;
    if (!textarea || disabled || readOnly) return;

    if (tool === 'undo') {
      document.execCommand?.('undo');
      return;
    }
    if (tool === 'redo') {
      document.execCommand?.('redo');
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    const selectedText = val.substring(start, end);

    let newText = val;
    let newStart = start;
    let newEnd = end;

    const wrapInline = (prefix: string, suffix: string, defaultPlaceholder: string) => {
      const beforeStart = val.substring(Math.max(0, start - prefix.length), start);
      const afterEnd = val.substring(end, end + suffix.length);

      if (beforeStart === prefix && afterEnd === suffix) {
        // Toggle off formatting
        newText = val.substring(0, start - prefix.length) + selectedText + val.substring(end + suffix.length);
        newStart = start - prefix.length;
        newEnd = end - prefix.length;
      } else {
        // Wrap text
        const content = selectedText || defaultPlaceholder;
        newText = val.substring(0, start) + prefix + content + suffix + val.substring(end);
        if (selectedText) {
          newStart = start + prefix.length;
          newEnd = end + prefix.length;
        } else {
          newStart = start + prefix.length;
          newEnd = newStart + defaultPlaceholder.length;
        }
      }
    };

    const applyLinePrefix = (getPrefix: (lineIndex: number) => { prefix: string; pattern: RegExp }) => {
      const lineStart = val.lastIndexOf('\n', start - 1) + 1;
      let lineEnd = val.indexOf('\n', end);
      if (lineEnd === -1) lineEnd = val.length;

      const fullLines = val.substring(lineStart, lineEnd);
      const lines = fullLines.split('\n');

      let allHavePrefix = true;
      lines.forEach((l, idx) => {
        const { pattern } = getPrefix(idx);
        if (!pattern.test(l)) allHavePrefix = false;
      });

      const transformedLines = lines.map((l, idx) => {
        const { prefix, pattern } = getPrefix(idx);
        if (allHavePrefix) {
          return l.replace(pattern, '');
        } else {
          return prefix + l.replace(pattern, '');
        }
      });

      const replacement = transformedLines.join('\n');
      newText = val.substring(0, lineStart) + replacement + val.substring(lineEnd);
      newStart = lineStart;
      newEnd = lineStart + replacement.length;
    };

    switch (tool) {
      case 'bold':
        wrapInline('**', '**', 'bold text');
        break;
      case 'italic':
        wrapInline('*', '*', 'italic text');
        break;
      case 'strike':
        wrapInline('~~', '~~', 'strikethrough text');
        break;
      case 'code':
        wrapInline('`', '`', 'code');
        break;
      case 'codeblock':
        wrapInline('```\n', '\n```', 'code block');
        break;
      case 'heading':
        applyLinePrefix(() => ({ prefix: '### ', pattern: /^#{1,6}\s*/ }));
        break;
      case 'quote':
        applyLinePrefix(() => ({ prefix: '> ', pattern: /^>\s*/ }));
        break;
      case 'bullet':
        applyLinePrefix(() => ({ prefix: '- ', pattern: /^[-*+]\s*/ }));
        break;
      case 'number':
        applyLinePrefix((idx) => ({ prefix: `${idx + 1}. `, pattern: /^\d+\.\s*/ }));
        break;
      case 'link': {
        if (selectedText) {
          newText = val.substring(0, start) + `[${selectedText}](url)` + val.substring(end);
          newStart = end + 3;
          newEnd = newStart + 3;
        } else {
          const placeholder = '[link text](https://example.com)';
          newText = val.substring(0, start) + placeholder + val.substring(end);
          newStart = start + 1;
          newEnd = start + 10;
        }
        break;
      }
    }

    if (!isControlled) {
      setInternalValue(newText);
    }

    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set;
    if (nativeSetter) {
      nativeSetter.call(textarea, newText);
      const ev = new Event('input', { bubbles: true });
      textarea.dispatchEvent(ev);
    }

    requestAnimationFrame(() => {
      if (innerRef.current) {
        innerRef.current.focus();
        innerRef.current.setSelectionRange(newStart, newEnd);
        adjustHeight();
      }
    });
  }, [disabled, readOnly, isControlled, adjustHeight]);

  // Keyboard shortcut formatting support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (withToolbar && (e.ctrlKey || e.metaKey)) {
      const key = e.key.toLowerCase();
      if (key === 'b') {
        e.preventDefault();
        applyFormatting('bold');
      } else if (key === 'i') {
        e.preventDefault();
        applyFormatting('italic');
      } else if (key === 'k') {
        e.preventDefault();
        applyFormatting('link');
      } else if (key === 'e') {
        e.preventDefault();
        applyFormatting('code');
      } else if (e.shiftKey && (key === 'x' || key === 's')) {
        e.preventDefault();
        applyFormatting('strike');
      }
    }
    restProps.onKeyDown?.(e);
  };

  // ── Clear Handler ──
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isControlled) {
      setInternalValue('');
    }

    if (innerRef.current) {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;
      if (nativeSetter) {
        nativeSetter.call(innerRef.current, '');
        const ev = new Event('input', { bubbles: true });
        innerRef.current.dispatchEvent(ev);
      }
      innerRef.current.focus();
    }

    onClear?.();
  };

  // ── Count Calculation ──
  const count = countType === 'words' 
    ? (currentValue.trim() ? currentValue.trim().split(/\s+/).length : 0)
    : currentValue.length;

  const isOverLimit = maxLength !== undefined && count > maxLength;
  const isNearLimit = maxLength !== undefined && count >= maxLength * 0.9 && !isOverLimit;

  // ── Class Names ──
  const groupClasses = [
    'neuron-textarea-group',
    `neuron-textarea-group--${size}`,
    effectiveState !== 'default' && `neuron-textarea-group--${effectiveState}`,
    disabled && 'neuron-textarea-group--disabled',
    readOnly && 'neuron-textarea-group--readonly',
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'neuron-textarea-wrapper',
    `neuron-textarea-wrapper--${size}`,
    `neuron-textarea-wrapper--${variant}`,
    effectiveState !== 'default' && `neuron-textarea-wrapper--${effectiveState}`,
    disabled && 'neuron-textarea-wrapper--disabled',
    readOnly && 'neuron-textarea-wrapper--readonly',
    leadingIcon && 'neuron-textarea-wrapper--has-leading',
    allowClear && currentValue && 'neuron-textarea-wrapper--has-clear',
    withToolbar && 'neuron-textarea-wrapper--with-toolbar',
    withToolbar && `neuron-textarea-wrapper--toolbar-${toolbarPosition}`,
  ].filter(Boolean).join(' ');



  const textareaClasses = [
    'neuron-textarea',
    `neuron-textarea--resize-${isAutoResize ? 'auto' : resize}`,
    className,
  ].filter(Boolean).join(' ');

  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  // ── Toolbar Component ──
  const renderToolbar = () => {
    const tools = toolbarTools || DEFAULT_TOOLBAR_TOOLS;
    const isId = contextLanguage === 'id';

    return (
      <div 
        className={`neuron-textarea-toolbar neuron-textarea-toolbar--${toolbarPosition}`} 
        role="toolbar" 
        aria-label="Text formatting tools"
      >
        <div className="neuron-textarea-toolbar__tools">
          {tools.map((tool, index) => {
            const config = TOOL_DEFINITIONS[tool];
            if (!config) return null;
            const Icon = config.icon;
            const prevTool = index > 0 ? tools[index - 1] : null;
            const showDivider = prevTool && TOOL_DEFINITIONS[prevTool]?.group !== config.group;

            const toolLabel = isId ? config.labelId : config.labelEn;

            return (
              <React.Fragment key={tool}>
                {showDivider && <span className="neuron-textarea-tool-divider" aria-hidden="true" />}
                <NeuronTooltip
                  placement={toolbarPosition === 'top' ? 'top' : 'bottom'}
                  variant="dark"
                  size="sm"
                  arrow
                  delay={100}
                  disabled={disabled || readOnly}
                  content={toolLabel}
                >
                  <button
                    type="button"
                    className="neuron-textarea-tool-btn"
                    disabled={disabled || readOnly}
                    tabIndex={-1}
                    aria-label={toolLabel}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => applyFormatting(tool)}
                  >
                    <Icon size={iconSize} />
                  </button>
                </NeuronTooltip>
              </React.Fragment>
            );
          })}
        </div>

        {toolbarExtra && (
          <div className="neuron-textarea-toolbar__extra">
            {toolbarExtra}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={groupClasses}>
      {/* ── Label Row ── */}
      {(label || labelAction) && (
        <div className="neuron-textarea-header">
          {label && (
            <label htmlFor={inputId} className="neuron-label">
              {label}
              {required && <span className="neuron-label__required" aria-hidden="true"> *</span>}
              {helpIcon && (
                helpTooltip ? (
                  <NeuronTooltip content={helpTooltip} placement="top" arrow delay={100}>
                    <span className="neuron-label__help-icon" tabIndex={0} role="img" aria-label="Help">
                      <HelpIconSvg />
                    </span>
                  </NeuronTooltip>
                ) : (
                  <span className="neuron-label__help-icon" tabIndex={0} role="img" aria-label="Help">
                    <HelpIconSvg />
                  </span>
                )
              )}
            </label>
          )}
          {labelAction && <div className="neuron-textarea-label-action">{labelAction}</div>}
        </div>
      )}

      {/* ── Textarea Wrapper Box ── */}
      <div className={wrapperClasses}>
        {withToolbar && toolbarPosition === 'top' && renderToolbar()}

        {withToolbar ? (
          <div className="neuron-textarea-content">
            {leadingIcon && (
              <span className="neuron-textarea-leading-icon" aria-hidden="true">
                {leadingIcon}
              </span>
            )}

            <textarea
              ref={innerRef}
              id={inputId}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              value={isControlled ? value : internalValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={textareaClasses}
              aria-invalid={effectiveState === 'error' || isOverLimit}
              aria-required={required}
              aria-describedby={displayHelper ? `${inputId}-helper` : undefined}
              style={style}
              {...restProps}
            />

            {/* Quick Clear Button */}
            {allowClear && !disabled && !readOnly && currentValue.length > 0 && (
              <NeuronTooltip
                content={contextLanguage === 'id' ? 'Hapus teks' : 'Clear text'}
                placement="top"
                arrow
                delay={150}
              >
                <button
                  type="button"
                  className="neuron-textarea-clear-btn"
                  onClick={handleClear}
                  aria-label={contextLanguage === 'id' ? 'Hapus teks' : 'Clear text'}
                >
                  <ClearIconSvg />
                </button>
              </NeuronTooltip>
            )}
          </div>
        ) : (
          <>
            {leadingIcon && (
              <span className="neuron-textarea-leading-icon" aria-hidden="true">
                {leadingIcon}
              </span>
            )}

            <textarea
              ref={innerRef}
              id={inputId}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              value={isControlled ? value : internalValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={textareaClasses}
              aria-invalid={effectiveState === 'error' || isOverLimit}
              aria-required={required}
              aria-describedby={displayHelper ? `${inputId}-helper` : undefined}
              style={style}
              {...restProps}
            />

            {/* Quick Clear Button */}
            {allowClear && !disabled && !readOnly && currentValue.length > 0 && (
              <NeuronTooltip
                content={contextLanguage === 'id' ? 'Hapus teks' : 'Clear text'}
                placement="top"
                arrow
                delay={150}
              >
                <button
                  type="button"
                  className="neuron-textarea-clear-btn"
                  onClick={handleClear}
                  aria-label={contextLanguage === 'id' ? 'Hapus teks' : 'Clear text'}
                >
                  <ClearIconSvg />
                </button>
              </NeuronTooltip>
            )}
          </>
        )}

        {withToolbar && toolbarPosition === 'bottom' && renderToolbar()}
      </div>

      {/* ── Footer Row: Helper / Validation Text & Counter / Actions ── */}
      {(displayHelper || showCount || actions) && (
        <div className="neuron-textarea-footer">
          {/* Left: Helper or Validation Message */}
          <div className="neuron-textarea-helper-slot">
            {displayHelper && (
              <span 
                id={`${inputId}-helper`} 
                className={`neuron-helper-text ${effectiveState !== 'default' ? `neuron-helper-text--${effectiveState}` : ''}`}
              >
                {displayHelper}
              </span>
            )}
          </div>

          {/* Right: Actions and/or Character Counter */}
          <div className="neuron-textarea-meta-slot">
            {actions && <div className="neuron-textarea-actions">{actions}</div>}

            {showCount && (
              <span 
                className={[
                  'neuron-textarea-count',
                  isOverLimit && 'neuron-textarea-count--error',
                  isNearLimit && 'neuron-textarea-count--warning',
                ].filter(Boolean).join(' ')}
                aria-live="polite"
              >
                {countFormatter ? (
                  countFormatter(count, maxLength)
                ) : (
                  <>
                    <span className="neuron-textarea-count__current">{count}</span>
                    {maxLength !== undefined && (
                      <span className="neuron-textarea-count__max"> / {maxLength}</span>
                    )}
                    {countType === 'words' && ' words'}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

NeuronTextArea.displayName = 'NeuronTextArea';

export default NeuronTextArea;
export { NeuronTextArea as NeuronTextarea };

