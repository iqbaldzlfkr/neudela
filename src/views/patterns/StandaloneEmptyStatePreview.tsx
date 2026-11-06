import React, { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { EmptyStateVariantId } from './EmptyStatePatternView';
import { EMPTY_STATE_VARIANTS, renderLiveEmptyStatePreview } from './EmptyStatePatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Compass,
} from 'lucide-react';

interface StandaloneEmptyStatePreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneEmptyStatePreview({
  variantId = 'zero-data-search',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneEmptyStatePreviewProps) {
  const [activeVariant, setActiveVariant] = useState<EmptyStateVariantId>(
    (variantId as EmptyStateVariantId) || 'zero-data-search'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && EMPTY_STATE_VARIANTS.some((v) => v.id === variantId)) {
      setActiveVariant(variantId as EmptyStateVariantId);
    }
  }, [variantId]);

  const currentMeta =
    EMPTY_STATE_VARIANTS.find((v) => v.id === activeVariant) || EMPTY_STATE_VARIANTS[0];

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
      className={`standalone-empty-state-app ${isDarkMode ? 'dark-theme' : ''}`}
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
            <span style={{ color: '#94a3b8' }}>Empty States Pattern:</span>
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
          <div style={{ minWidth: '280px' }}>
            <NeuronSelect
              size="sm"
              value={activeVariant}
              onChange={(newVal) => {
                setActiveVariant(newVal as EmptyStateVariantId);
                window.location.hash = `#standalone-empty-state-${newVal}`;
              }}
              options={EMPTY_STATE_VARIANTS.map((v) => ({
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

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
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
            minHeight: viewportMode === 'desktop' ? '100%' : '840px',
            background: 'var(--color-bg-canvas)',
            boxShadow:
              viewportMode === 'desktop'
                ? 'none'
                : isDarkMode
                ? '0 20px 40px rgba(0,0,0,0.6)'
                : '0 20px 40px rgba(0,0,0,0.12)',
            borderRadius: viewportMode === 'desktop' ? '0' : '16px',
            overflow: 'hidden',
            border: viewportMode === 'desktop' ? 'none' : '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            boxSizing: 'border-box',
          }}
        >
          {renderLiveEmptyStatePreview(activeVariant, isDarkMode, () => {
            onBackToDocs();
          })}
        </div>
      </div>
    </div>
  );
}

