import { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { DataGridVariantId } from './DataGridPatternView';
import { DATA_GRID_VARIANTS, renderLiveDataGridPreview } from './DataGridPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Database,
} from 'lucide-react';

interface StandaloneDataGridPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneDataGridPreview({
  variantId = 'master-detail',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneDataGridPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<DataGridVariantId>(
    (variantId as DataGridVariantId) || 'master-detail'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && DATA_GRID_VARIANTS.some(v => v.id === variantId)) {
      setActiveVariant(variantId as DataGridVariantId);
    }
  }, [variantId]);

  const currentMeta = DATA_GRID_VARIANTS.find(v => v.id === activeVariant) || DATA_GRID_VARIANTS[0];

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'desktop': return '100%';
      case 'tablet': return '768px';
      case 'mobile': return '420px';
    }
  };

  return (
    <div
      className={`standalone-data-grid-app ${isDarkMode ? 'dark-theme' : ''}`}
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
            <span style={{ color: '#94a3b8' }}>Data Grid Pattern:</span>
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
              options={DATA_GRID_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameEn,
                description: v.badge,
              }))}
              value={activeVariant}
              onChange={(val) => setActiveVariant(val as DataGridVariantId)}
              leadingIcon={<Database size={13} />}
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

      {/* ── Real Fullscreen Data Grid Frame ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: isDarkMode ? '#0a0f1d' : '#f8fafc',
          padding: viewportMode === 'desktop' ? '24px 32px' : '16px 12px',
          display: 'flex',
          justifyContent: 'center',
          transition: 'padding 0.2s ease',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            maxWidth: '100%',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Subheader info bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            paddingBottom: 16,
            borderBottom: '1px solid var(--color-border)',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {currentMeta.nameEn}
                </h2>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: `${currentMeta.accentColor}18`,
                  color: currentMeta.accentColor,
                }}>
                  {currentMeta.badge}
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                {currentMeta.taglineEn}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              <span>Live Synced (Production Mode)</span>
            </div>
          </div>

          {/* Active Grid Component */}
          {renderLiveDataGridPreview(activeVariant)}
        </div>
      </div>
    </div>
  );
}
