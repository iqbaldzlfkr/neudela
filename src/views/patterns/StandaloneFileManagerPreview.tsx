import { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { FileManagerVariantId } from './FileManagerPatternView';
import { FILE_MANAGER_VARIANTS, renderLiveFileManagerPreview } from './FileManagerPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
} from 'lucide-react';

interface StandaloneFileManagerPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneFileManagerPreview({
  variantId = 'cloud-drive',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneFileManagerPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<FileManagerVariantId>(
    (variantId as FileManagerVariantId) || 'cloud-drive'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && FILE_MANAGER_VARIANTS.some((v) => v.id === variantId)) {
      setActiveVariant(variantId as FileManagerVariantId);
    }
  }, [variantId]);

  const currentMeta =
    FILE_MANAGER_VARIANTS.find((v) => v.id === activeVariant) || FILE_MANAGER_VARIANTS[0];

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '768px';
      case 'mobile':
        return '390px';
      default:
        return '100%';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-bg-canvas)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* ── Top Floating Toolbar Bar ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Left: Back button + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <NeuronButton
            size="sm"
            variant="ghost"
            leadingIcon={<ArrowLeft size={16} />}
            onClick={onBackToDocs}
          >
            Kembali ke Dokumentasi
          </NeuronButton>

          <div
            style={{
              height: '24px',
              width: '1px',
              background: 'var(--color-border)',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: currentMeta.accentColor,
                boxShadow: `0 0 10px ${currentMeta.accentColor}`,
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {currentMeta.nameId}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '10px',
                background: `${currentMeta.accentColor}20`,
                color: currentMeta.accentColor,
              }}
            >
              {currentMeta.badge}
            </span>
          </div>
        </div>

        {/* Center: Viewport Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--color-bg-canvas)',
            padding: '3px',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={() => setViewportMode('desktop')}
            title="Desktop View (100%)"
            style={{
              border: 'none',
              background: viewportMode === 'desktop' ? 'var(--color-primary)' : 'transparent',
              color: viewportMode === 'desktop' ? '#fff' : 'var(--color-text-secondary)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            title="Tablet View (768px)"
            style={{
              border: 'none',
              background: viewportMode === 'tablet' ? 'var(--color-primary)' : 'transparent',
              color: viewportMode === 'tablet' ? '#fff' : 'var(--color-text-secondary)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            <Tablet size={14} />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            title="Mobile View (390px)"
            style={{
              border: 'none',
              background: viewportMode === 'mobile' ? 'var(--color-primary)' : 'transparent',
              color: viewportMode === 'mobile' ? '#fff' : 'var(--color-text-secondary)',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Variant Select + Dark Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '260px' }}>
            <NeuronSelect
              size="sm"
              value={activeVariant}
              onChange={(val) => {
                const nextId = val as FileManagerVariantId;
                setActiveVariant(nextId);
                window.location.hash = `#preview-file-manager-${nextId}`;
              }}
              options={FILE_MANAGER_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameId,
              }))}
            />
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-surface)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={isDarkMode ? 'Beralih ke Terang' : 'Beralih ke Gelap'}
          >
            {isDarkMode ? <Sun size={16} color="#df7e30" /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* ── Main Viewport Canvas Container ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: viewportMode === 'mobile' ? '14px 10px' : viewportMode === 'tablet' ? '24px 16px' : '32px 24px',
          overflowY: 'auto',
          background: isDarkMode ? '#0d1117' : '#f1f5f9',
          transition: 'all 0.25s ease',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            maxWidth: '100%',
            background: 'var(--color-bg-canvas)',
            borderRadius: viewportMode === 'desktop' ? '16px' : '28px',
            border: viewportMode === 'desktop' ? 'none' : '6px solid #1e293b',
            boxShadow: viewportMode === 'desktop' ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            minHeight: viewportMode === 'mobile' ? '680px' : '720px',
            boxSizing: 'border-box',
            padding: viewportMode === 'mobile' ? '12px' : '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
          }}
        >
          {/* Simulated Mobile Speaker/Sensor Notch Bar */}
          {viewportMode === 'mobile' && (
            <div
              style={{
                width: '120px',
                height: '4px',
                borderRadius: '2px',
                background: 'var(--color-border)',
                margin: '0 auto 12px auto',
                flexShrink: 0,
              }}
            />
          )}

          {renderLiveFileManagerPreview(activeVariant, true, isDarkMode, viewportMode)}
        </div>
      </div>
    </div>
  );
}

