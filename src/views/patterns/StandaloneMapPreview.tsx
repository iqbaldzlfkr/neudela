import React, { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { MapVariantId } from './MapPatternView';
import { MAP_VARIANTS, renderLiveMapPreview } from './MapPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Compass,
} from 'lucide-react';

interface StandaloneMapPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneMapPreview({
  variantId = 'order-tracking',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneMapPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<MapVariantId>(
    (variantId as MapVariantId) || 'order-tracking'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && MAP_VARIANTS.some((v) => v.id === variantId)) {
      setActiveVariant(variantId as MapVariantId);
    }
  }, [variantId]);

  const currentMeta = MAP_VARIANTS.find((v) => v.id === activeVariant) || MAP_VARIANTS[0];

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '768px';
      case 'mobile':
        return '420px';
    }
  };

  return (
    <div
      className={`standalone-map-app ${isDarkMode ? 'dark-theme' : ''}`}
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
      {/* ── Top Floating Controller Banner ── */}
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
            <span style={{ color: '#94a3b8' }}>Geospatial Pattern:</span>
            <strong style={{ color: currentMeta.accentColor }}>{currentMeta.nameEn}</strong>
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '10px',
                background: `${currentMeta.accentColor}25`,
                color: currentMeta.accentColor,
              }}
            >
              {currentMeta.badge}
            </span>
          </div>
        </div>

        {/* Right Controls: Variant Selector, Viewport mode, Theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Variant Selector Dropdown */}
          <div style={{ minWidth: '220px' }}>
            <NeuronSelect
              size="sm"
              value={activeVariant}
              onChange={(newVal) => {
                setActiveVariant(newVal as MapVariantId);
                window.location.hash = `#preview-map-${newVal}`;
              }}
              options={MAP_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameEn,
              }))}
            />
          </div>

          {/* Viewport Width Buttons */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '6px',
              padding: '2px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              title="Desktop (100%)"
              style={{
                border: 'none',
                background: viewportMode === 'desktop' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
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
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
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
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <Smartphone size={14} />
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              borderRadius: '6px',
              padding: '5px 10px',
              fontSize: '11.5px',
              cursor: 'pointer',
            }}
          >
            {isDarkMode ? <Sun size={13} color="#f59e0b" /> : <Moon size={13} />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* ── Main Canvas Viewport Area ── */}
      <div
        style={{
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDarkMode ? '#050811' : '#cbd5e1',
          padding: viewportMode === 'desktop' ? '0' : '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            height: '100%',
            maxHeight: viewportMode === 'desktop' ? '100%' : '840px',
            background: 'var(--color-bg-surface)',
            boxShadow: viewportMode === 'desktop' ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.4)',
            borderRadius: viewportMode === 'desktop' ? '0' : '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
          }}
        >
          {renderLiveMapPreview(activeVariant, isDarkMode)}
        </div>
      </div>
    </div>
  );
}
