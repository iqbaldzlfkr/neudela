import React, { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronSelect from '../../components/NeuronSelect';
import type { SettingsVariantId } from './SettingsPatternView';
import { SETTINGS_VARIANTS, renderLiveSettingsPreview } from './SettingsPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Settings,
} from 'lucide-react';

interface StandaloneSettingsPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneSettingsPreview({
  variantId = 'general-workspace',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneSettingsPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<SettingsVariantId>(
    (variantId as SettingsVariantId) || 'general-workspace'
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId && SETTINGS_VARIANTS.some((v) => v.id === variantId)) {
      setActiveVariant(variantId as SettingsVariantId);
    }
  }, [variantId]);

  const currentMeta = SETTINGS_VARIANTS.find((v) => v.id === activeVariant) || SETTINGS_VARIANTS[0];

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
      className={`standalone-settings-app ${isDarkMode ? 'dark-theme' : ''}`}
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
            <span style={{ color: '#94a3b8' }}>Settings Pattern:</span>
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
          <div style={{ minWidth: '260px' }}>
            <NeuronSelect
              size="sm"
              value={activeVariant}
              onChange={(newVal) => {
                setActiveVariant(newVal as SettingsVariantId);
                window.location.hash = `#standalone-settings-${newVal}`;
              }}
              options={SETTINGS_VARIANTS.map((v) => ({
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

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
            style={{
              border: 'none',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
            }}
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* ── Viewport Canvas Centering Container ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '24px',
          background: isDarkMode ? '#0a0f1d' : '#f1f5f9',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: getViewportWidth(),
            minHeight: '100%',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            background: 'var(--color-bg-surface)',
            border: viewportMode !== 'desktop' ? '1px solid var(--color-border)' : 'none',
            borderRadius: viewportMode !== 'desktop' ? '18px' : '0px',
            boxShadow: viewportMode !== 'desktop' ? '0 20px 40px rgba(0,0,0,0.15)' : 'none',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          {renderLiveSettingsPreview(activeVariant, isDarkMode, () => {
            onBackToDocs();
          })}
        </div>
      </div>
    </div>
  );
}

