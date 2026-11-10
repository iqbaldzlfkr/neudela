import { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { FormVariantId } from './FormPatternView';
import { FORM_VARIANTS, renderLivePreview } from './FormPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface StandaloneFormPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneFormPreview({
  variantId = 'stepper-wizard',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneFormPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<FormVariantId>(
    (variantId as FormVariantId) || 'stepper-wizard'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && FORM_VARIANTS.some(v => v.id === variantId)) {
      setActiveVariant(variantId as FormVariantId);
    }
  }, [variantId]);

  const currentMeta = FORM_VARIANTS.find(v => v.id === activeVariant) || FORM_VARIANTS[0];

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'desktop': return '100%';
      case 'tablet': return '768px';
      case 'mobile': return '420px';
    }
  };

  return (
    <div
      className={`standalone-form-app ${isDarkMode ? 'dark-theme' : ''}`}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: isDarkMode ? '#0a0f1d' : '#f8fafc',
        color: 'var(--color-text-primary)',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Top Floating Neudela Controller Banner ── */}
      <div
        style={{
          height: '52px',
          background: isDarkMode ? '#0d1322' : '#1e293b',
          color: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          fontSize: '12.5px',
          zIndex: 1000,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          flexShrink: 0,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        {/* Left: Brand & Back to Docs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <NeuronButton
            size="xs"
            variant="secondary"
            leadingIcon={<ArrowLeft size={13} />}
            onClick={onBackToDocs}
            style={{ color: '#fff', background: 'rgba(255,255,255,0.12)', border: 'none' }}
          >
            Kembali ke Neudela Docs
          </NeuronButton>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#94a3b8' }}>Form Pattern:</span>
            <strong style={{ color: currentMeta.accentColor }}>{currentMeta.nameEn}</strong>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(223, 126, 48, 0.2)',
                color: '#df7e30',
                fontWeight: 600,
              }}
            >
              Real App Mode
            </span>
          </div>
        </div>

        {/* Right: Switcher, Viewport Mode, Dark Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Quick Variant Switcher Dropdown */}
          <div style={{ width: '280px', position: 'relative', zIndex: 1100 }}>
            <NeuronSelect
              size="sm"
              options={FORM_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameEn,
                description: v.badge,
              }))}
              value={activeVariant}
              onChange={(val) => setActiveVariant(val as FormVariantId)}
              leadingIcon={<FileText size={13} />}
            />
          </div>

          {/* Viewport Width Buttons */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', padding: '2px' }}>
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              title="Desktop (100%)"
              style={{
                border: 'none',
                background: viewportMode === 'desktop' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: viewportMode === 'desktop' ? '#fff' : '#94a3b8',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Monitor size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('tablet')}
              title="Tablet (768px)"
              style={{
                border: 'none',
                background: viewportMode === 'tablet' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: viewportMode === 'tablet' ? '#fff' : '#94a3b8',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Tablet size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              title="Mobile (420px)"
              style={{
                border: 'none',
                background: viewportMode === 'mobile' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: viewportMode === 'mobile' ? '#fff' : '#94a3b8',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Smartphone size={14} />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            {isDarkMode ? <Sun size={13} color="#f59e0b" /> : <Moon size={13} color="#94a3b8" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* ── Subheader Info Bar ── */}
      <div
        style={{
          padding: '10px 24px',
          background: isDarkMode ? '#0d1322' : '#ffffff',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {currentMeta.nameEn}
            </h2>
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>— {currentMeta.taglineEn}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {currentMeta.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10.5,
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-primary, #df7e30)', fontSize: 12, fontWeight: 600 }}>
          <CheckCircle2 size={15} />
          <span>Form State Active</span>
        </div>
      </div>

      {/* ── Canvas Viewport Area ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: isDarkMode ? '#060a12' : '#f1f5f9',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            maxWidth: viewportMode === 'desktop' ? '1080px' : getViewportWidth(),
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: viewportMode !== 'desktop' ? '0 10px 40px rgba(0,0,0,0.15)' : 'none',
            borderRadius: viewportMode !== 'desktop' ? 14 : 0,
            overflow: 'hidden',
          }}
        >
          {renderLivePreview(activeVariant)}
        </div>
      </div>
    </div>
  );
}
