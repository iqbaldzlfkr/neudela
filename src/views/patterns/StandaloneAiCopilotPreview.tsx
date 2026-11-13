import { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { AiCopilotVariantId } from './AiCopilotPatternView';
import { AI_COPILOT_VARIANTS, renderLiveAiCopilotPreview } from './AiCopilotPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
} from 'lucide-react';

interface StandaloneAiCopilotPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneAiCopilotPreview({
  variantId = 'floating-copilot',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneAiCopilotPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<AiCopilotVariantId>(
    (variantId as AiCopilotVariantId) || 'floating-copilot'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && AI_COPILOT_VARIANTS.some((v) => v.id === variantId)) {
      setActiveVariant(variantId as AiCopilotVariantId);
    }
  }, [variantId]);

  const currentMeta =
    AI_COPILOT_VARIANTS.find((v) => v.id === activeVariant) || AI_COPILOT_VARIANTS[0];

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
          <div style={{ width: '240px' }}>
            <NeuronSelect
              size="sm"
              value={activeVariant}
              onChange={(val) => {
                const nextId = val as AiCopilotVariantId;
                setActiveVariant(nextId);
                window.location.hash = `#preview-ai-copilot-${nextId}`;
              }}
              options={AI_COPILOT_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameId,
              }))}
            />
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-canvas)',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              color: isDarkMode ? '#f59e0b' : 'var(--color-text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* ── Viewport Canvas Outer Area ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: viewportMode === 'desktop' ? '0' : '24px 16px',
          background: isDarkMode
            ? viewportMode === 'desktop'
              ? 'var(--color-bg-canvas)'
              : '#060a12'
            : viewportMode === 'desktop'
            ? 'var(--color-bg-canvas)'
            : '#e2e8f0',
          transition: 'all 0.25s ease',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            minHeight: viewportMode === 'desktop' ? '100%' : viewportMode === 'mobile' ? '700px' : '840px',
            background: 'var(--color-bg-canvas)',
            boxShadow:
              viewportMode === 'desktop'
                ? 'none'
                : isDarkMode
                ? '0 24px 48px rgba(0,0,0,0.6)'
                : '0 24px 48px rgba(0,0,0,0.12)',
            borderRadius: viewportMode === 'desktop' ? '0' : viewportMode === 'mobile' ? '24px' : '16px',
            overflowY: 'auto',
            border: viewportMode === 'desktop' ? 'none' : '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: viewportMode === 'mobile' ? '14px 10px' : viewportMode === 'tablet' ? '20px 16px' : '32px 24px',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {/* Subtle Mobile Speaker / Camera Notch Pill when simulated on Mobile */}
          {viewportMode === 'mobile' && (
            <div
              style={{
                width: '72px',
                height: '4px',
                borderRadius: '2px',
                background: 'var(--color-border)',
                marginBottom: '12px',
                flexShrink: 0,
              }}
            />
          )}

          {renderLiveAiCopilotPreview(
            activeVariant,
            isDarkMode,
            () => {
              onBackToDocs();
            },
            viewportMode
          )}
        </div>
      </div>
    </div>
  );
}

