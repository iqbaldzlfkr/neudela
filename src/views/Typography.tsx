import React, { useState } from 'react';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface TypographyProps {
  setActiveTab: (tabId: string) => void;
}

const TYPO_SIZES = [
  { name: 'Display 2xl', varName: '--fs-display-2xl', deskSize: '72px (4.5rem)', mobSize: '44px (2.75rem)', lh: '90px (5.625rem)', class: 'display-2xl' },
  { name: 'Display xl', varName: '--fs-display-xl', deskSize: '60px (3.75rem)', mobSize: '36px (2.25rem)', lh: '72px (4.5rem)', class: 'display-xl' },
  { name: 'Display lg', varName: '--fs-display-lg', deskSize: '48px (3rem)', mobSize: '32px (2rem)', lh: '60px (3.75rem)', class: 'display-lg' },
  { name: 'Display md', varName: '--fs-display-md', deskSize: '36px (2.25rem)', mobSize: '28px (1.75rem)', lh: '44px (2.75rem)', class: 'display-md' },
  { name: 'Display sm', varName: '--fs-display-sm', deskSize: '30px (1.875rem)', mobSize: '24px (1.5rem)', lh: '38px (2.375rem)', class: 'display-sm' },
  { name: 'Display xs', varName: '--fs-display-xs', deskSize: '24px (1.5rem)', mobSize: '20px (1.25rem)', lh: '32px (2rem)', class: 'display-xs' },
  { name: 'Text xl', varName: '--fs-text-xl', deskSize: '20px (1.25rem)', mobSize: '18px (1.125rem)', lh: '30px (1.875rem)', class: 'text-xl' },
  { name: 'Text lg', varName: '--fs-text-lg', deskSize: '18px (1.125rem)', mobSize: '16px (1rem)', lh: '28px (1.75rem)', class: 'text-lg' },
  { name: 'Text md', varName: '--fs-text-md', deskSize: '16px (1rem)', mobSize: '14px (0.875rem)', lh: '24px (1.5rem)', class: 'text-md' },
  { name: 'Text sm', varName: '--fs-text-sm', deskSize: '14px (0.875rem)', mobSize: '12px (0.75rem)', lh: '20px (1.25rem)', class: 'text-sm' },
  { name: 'Text xs', varName: '--fs-text-xs', deskSize: '12px (0.75rem)', mobSize: '11px (0.6875rem)', lh: '18px (1.125rem)', class: 'text-xs' },
];

export default function Typography({ setActiveTab }: TypographyProps) {
  const [testText, setTestText] = useState('Neudela Design System');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const { language, t } = useLanguage();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.typography.pageTitle}</h1>
        <p className="page-subtitle">
          {t.typography.pageSubtitle}
        </p>
      </div>

      {/* Font Specs */}
      <div className="section-card">
        <h2 className="section-title">{t.typography.fontSpecsTitle}</h2>
        <p className="section-description">
          {t.typography.fontSpecsDesc}
        </p>

        {/* Font Families Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            marginTop: 'var(--space-4)',
          }}
        >
          {/* Primary Font: Inter */}
          <div
            style={{
              padding: 'var(--space-5)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-bg-canvas)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--fs-text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {language === 'en' ? 'Primary Font' : 'Jenis Font Utama'}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Sans-Serif
              </span>
            </div>
            <h3
              style={{
                fontSize: 'var(--fs-display-sm)',
                fontWeight: 800,
                margin: '0 0 var(--space-1) 0',
                color: 'var(--color-text-primary)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Inter
            </h3>
            <p
              style={{
                fontSize: 'var(--fs-text-xs)',
                color: 'var(--color-text-secondary)',
                margin: '0 0 var(--space-3) 0',
                lineHeight: 1.5,
              }}
            >
              {language === 'en'
                ? 'Standard typeface crafted specifically for user interfaces with exceptional legibility across display densities.'
                : 'Huruf standar yang dirancang khusus untuk antarmuka pengguna dengan tingkat keterbacaan tinggi di berbagai resolusi layar.'}
            </p>
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono',
                color: 'var(--color-text-tertiary)',
                background: 'var(--color-bg-surface)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              <code>--font-family: 'Inter', system-ui, sans-serif;</code>
            </div>
          </div>

          {/* Monospace Font: JetBrains Mono */}
          <div
            style={{
              padding: 'var(--space-5)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-bg-canvas)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: '#0284c7',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--fs-text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#0284c7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {language === 'en' ? 'Code & Monospace' : 'Jenis Font Monospace / Kode'}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Monospace
              </span>
            </div>
            <h3
              style={{
                fontSize: 'var(--fs-display-sm)',
                fontWeight: 800,
                margin: '0 0 var(--space-1) 0',
                color: 'var(--color-text-primary)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              JetBrains Mono
            </h3>
            <p
              style={{
                fontSize: 'var(--fs-text-xs)',
                color: 'var(--color-text-secondary)',
                margin: '0 0 var(--space-3) 0',
                lineHeight: 1.5,
              }}
            >
              {language === 'en'
                ? 'Monospaced font family for code snippets, design tokens, data tables, and developer documentation.'
                : 'Keluarga huruf monospace untuk baris kode, token desain, tabel data, dan dokumentasi pengembang.'}
            </p>
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono',
                color: 'var(--color-text-tertiary)',
                background: 'var(--color-bg-surface)',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              <code>--font-mono: 'JetBrains Mono', monospace;</code>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Font Weight 400</span>
            <p style={{ fontSize: 'var(--fs-display-sm)', fontWeight: 400, marginTop: 'var(--space-2)' }}>Regular</p>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Font Weight 500</span>
            <p style={{ fontSize: 'var(--fs-display-sm)', fontWeight: 500, marginTop: 'var(--space-2)' }}>Medium</p>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Font Weight 600</span>
            <p style={{ fontSize: 'var(--fs-display-sm)', fontWeight: 600, marginTop: 'var(--space-2)' }}>Semibold</p>
          </div>
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Font Weight 700</span>
            <p style={{ fontSize: 'var(--fs-display-sm)', fontWeight: 700, marginTop: 'var(--space-2)' }}>Bold</p>
          </div>
        </div>
      </div>

      {/* Typography Scale Table */}
      <div className="section-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>{t.typography.scaleTitle}</h2>
          
          {/* Toggle Viewport */}
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <button
              className={`playground-tab ${viewportMode === 'desktop' ? 'active' : ''}`}
              style={{ borderRadius: 0, padding: 'var(--space-1) var(--space-3)' }}
              onClick={() => setViewportMode('desktop')}
            >
              {t.typography.desktop}
            </button>
            <button
              className={`playground-tab ${viewportMode === 'mobile' ? 'active' : ''}`}
              style={{ borderRadius: 0, padding: 'var(--space-1) var(--space-3)' }}
              onClick={() => setViewportMode('mobile')}
            >
              {t.typography.mobile}
            </button>
          </div>
        </div>
        
        <p className="section-description">
          {t.typography.scaleDesc}
        </p>

        <div className="typography-table-wrapper">
          <table className="typography-table">
            <thead>
              <tr>
                <th>{t.typography.scaleName}</th>
                <th>{t.typography.size} ({viewportMode === 'desktop' ? t.typography.desktop : t.typography.mobile})</th>
                <th>{t.typography.lineHeight}</th>
                <th>{t.typography.cssToken}</th>
              </tr>
            </thead>
            <tbody>
              {TYPO_SIZES.map(item => (
                <tr key={item.name}>
                  <td style={{ fontWeight: 'var(--font-weight-bold)' }}>{item.name}</td>
                  <td>{viewportMode === 'desktop' ? item.deskSize : item.mobSize}</td>
                  <td>{item.lh}</td>
                  <td><code style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono' }}>var({item.varName})</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Type Tester */}
      <div className="section-card">
        <h2 className="section-title">
          {language === 'en' ? 'Interactive Type Tester' : 'Penguji Tipografi Interaktif'}
        </h2>
        <p className="section-description">
          {language === 'en'
            ? 'Type custom text below to test and compare font rendering and weights in real-time.'
            : 'Ketik teks khusus di bawah ini untuk menguji dan membandingkan ketebalan serta ukuran rendering secara real-time.'}
        </p>
        <input
          type="text"
          className="type-tester-input"
          value={testText}
          onChange={e => setTestText(e.target.value)}
          placeholder={language === 'en' ? 'Type something to test...' : 'Ketik sesuatu untuk menguji...'}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
          {TYPO_SIZES.map(item => {
            const style: React.CSSProperties = {
              fontSize: viewportMode === 'desktop' 
                ? `var(${item.varName})` 
                : item.class.includes('display-2xl') ? '2.75rem'
                : item.class.includes('display-xl') ? '2.25rem'
                : item.class.includes('display-lg') ? '2rem'
                : item.class.includes('display-md') ? '1.75rem'
                : item.class.includes('display-sm') ? '1.5rem'
                : item.class.includes('display-xs') ? '1.25rem'
                : item.class.includes('text-xl') ? '1.125rem'
                : item.class.includes('text-lg') ? '1rem'
                : item.class.includes('text-md') ? '0.875rem'
                : item.class.includes('text-sm') ? '0.75rem'
                : '0.6875rem',
              lineHeight: '1.2',
              fontWeight: 'var(--font-weight-semibold)',
              wordBreak: 'break-word',
            };
            return (
              <div key={item.name} style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-4)' }}>
                <div style={{ width: '120px', flexShrink: 0 }}>
                  <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-tertiary)' }}>
                    {item.name}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={style}>{testText || (language === 'en' ? 'Type tester...' : 'Penguji tipe...')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'spacing', label: t.nav.spacing }}
        next={{ id: 'components-overview', label: t.nav.componentsOverview }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
