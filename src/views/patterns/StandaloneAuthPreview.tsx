import { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { AuthVariantId } from './AuthPatternView';
import { AUTH_VARIANTS, renderLiveAuthPreview } from './AuthPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
} from 'lucide-react';

interface StandaloneAuthPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneAuthPreview({
  variantId = 'split-screen-login',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneAuthPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<AuthVariantId>(
    (variantId as AuthVariantId) || 'split-screen-login'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && AUTH_VARIANTS.some(v => v.id === variantId)) {
      setActiveVariant(variantId as AuthVariantId);
    }
  }, [variantId]);

  const currentMeta = AUTH_VARIANTS.find(v => v.id === activeVariant) || AUTH_VARIANTS[0];

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'desktop': return '100%';
      case 'tablet': return '768px';
      case 'mobile': return '420px';
    }
  };

  return (
    <div
      className={`standalone-auth-app ${isDarkMode ? 'dark-theme' : ''}`}
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
            <span style={{ color: '#94a3b8' }}>Auth Pattern:</span>
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
              options={AUTH_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameEn,
                description: v.badge,
              }))}
              value={activeVariant}
              onChange={(val) => setActiveVariant(val as AuthVariantId)}
              leadingIcon={<Lock size={13} />}
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

      {/* ── Main Canvas ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '40px 20px',
          background: isDarkMode ? '#0a0f1d' : '#f1f5f9',
        }}
      >
        <div
          data-theme={isDarkMode ? 'dark' : 'light'}
          className={isDarkMode ? 'dark-theme' : 'light-theme'}
          style={{ width: getViewportWidth(), transition: 'width 0.25s ease' }}
        >
          {renderLiveAuthPreview(activeVariant)}
        </div>
      </div>
    </div>
  );
}
