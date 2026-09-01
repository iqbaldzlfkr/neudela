import { useState } from 'react';
import HeroIconsGrid from '../components/HeroIconsGrid';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface OverviewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode: boolean;
}

export default function Overview({ setActiveTab, isDarkMode: _isDarkMode }: OverviewProps) {
  const [projectType, setProjectType] = useState<'vue' | 'react' | 'html'>('vue');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t.overview.heroTitle}
          </h1>
          <p className="hero-subtitle">
            {t.overview.heroSubtitle}
          </p>
          <div className="hero-actions">
            <button
              className="neuron-btn neuron-btn--primary neuron-btn--lg"
              onClick={() => {
                document.getElementById('brand-assets-header')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '5px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              {t.overview.getStarted}
            </button>
          </div>
        </div>
        <div className="hero-image-container">
          <HeroIconsGrid />
        </div>
      </section>

      {/* Value Cards Header */}
      <div style={{ marginBottom: 'var(--space-6)', marginTop: 'var(--space-10)', animation: 'fadeIn 0.7s ease-out' }}>
        <h2 id="brand-assets-header" style={{ fontSize: 'var(--fs-display-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
          {t.overview.findBrandTitle}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-md)' }}>
          {t.overview.findBrandSubtitle}
        </p>
      </div>

      {/* Feature Cards Grid */}
      <section className="features-grid">
        <div className="feature-card" onClick={() => setActiveTab('foundation-overview')}>
          <div className="feature-icon-wrapper">🎨</div>
          <h3 className="feature-title">{t.overview.cardFoundationTitle}</h3>
          <p className="feature-desc">
            {t.overview.cardFoundationDesc}
          </p>
        </div>

        <div className="feature-card" onClick={() => setActiveTab('components-overview')}>
          <div className="feature-icon-wrapper">🧩</div>
          <h3 className="feature-title">{t.overview.cardComponentsTitle}</h3>
          <p className="feature-desc">
            {t.overview.cardComponentsDesc}
          </p>
        </div>

        <div className="feature-card" onClick={() => setActiveTab('pat-forms')}>
          <div className="feature-icon-wrapper">📐</div>
          <h3 className="feature-title">{t.overview.cardPatternsTitle}</h3>
          <p className="feature-desc">
            {t.overview.cardPatternsDesc}
          </p>
        </div>
      </section>

      {/* Developer Quick Start */}
      <div className="section-card" style={{ marginTop: 'var(--space-12)' }}>
        <h2 className="section-title">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {t.overview.devQuickStartTitle}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-6)', lineHeight: '1.6' }}>
          {t.overview.devQuickStartSubtitle}
        </p>

        {/* Project Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-2)',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setProjectType('vue')}
            style={{
              background: 'none',
              border: 'none',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--fs-text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: projectType === 'vue' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: projectType === 'vue' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 22h4l6-10 6 10h4L12 2z" stroke="#41B883" fill="#41B883" fillOpacity={projectType === 'vue' ? 0.3 : 0.1} />
            </svg>
            Vue 3 / Nuxt
          </button>
          <button
            onClick={() => setProjectType('react')}
            style={{
              background: 'none',
              border: 'none',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--fs-text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: projectType === 'react' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: projectType === 'react' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#61DAFB' }}>
              <circle cx="12" cy="12" r="3" fill="#61DAFB" fillOpacity={projectType === 'react' ? 0.3 : 0.1} />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
            </svg>
            React / Next.js
          </button>
          <button
            onClick={() => setProjectType('html')}
            style={{
              background: 'none',
              border: 'none',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--fs-text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: projectType === 'html' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: projectType === 'html' ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#df7e30' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            HTML / Blade / CDN
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {projectType === 'vue' && (
            <>
              {/* Step 1: Font */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>1</span>
                  {t.overview.fontStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.fontStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 60px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">`, 'vue-font')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === 'vue-font' ? t.overview.copied : t.overview.copy}
                  </button>
                </div>
              </div>

              {/* Step 2: Copy CSS */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>2</span>
                  {t.overview.cssStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.cssStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 60px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`mkdir -p src/assets/neudela
cp path/to/neudela/src/assets/tokens.css src/assets/neudela/
cp path/to/neudela/src/assets/main.css src/assets/neudela/`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`mkdir -p src/assets/neudela\ncp path/to/neudela/src/assets/tokens.css src/assets/neudela/\ncp path/to/neudela/src/assets/main.css src/assets/neudela/`, 'vue-copy')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === 'vue-copy' ? t.overview.copied : t.overview.copy}
                  </button>
                </div>
              </div>

              {/* Step 3: Register CSS */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>3</span>
                  {t.overview.usageStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.usageStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 60px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`<template>
  <button class="neuron-btn neuron-btn--primary">
    Save Changes
  </button>
</template>`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<template>\n  <button class="neuron-btn neuron-btn--primary">\n    Save Changes\n  </button>\n</template>`, 'vue-imp')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === 'vue-imp' ? t.overview.copied : t.overview.copy}
                  </button>
                </div>
              </div>
            </>
          )}

          {projectType === 'react' && (
            <>
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>1</span>
                  {t.overview.fontStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.fontStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 60px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import { Inter, JetBrains_Mono } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'], variable: '--font-sans' });\nconst mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });`, 'react-font')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === 'react-font' ? t.overview.copied : t.overview.copy}
                  </button>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>2</span>
                  {t.overview.cssStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.cssStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 60px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`import './styles/tokens.css';
import './styles/main.css';`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import './styles/tokens.css';\nimport './styles/main.css';`, 'react-copy')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === 'react-copy' ? t.overview.copied : t.overview.copy}
                  </button>
                </div>
              </div>
            </>
          )}

          {projectType === 'html' && (
            <>
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>1</span>
                  {t.overview.fontStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.fontStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 60px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`<link rel="stylesheet" href="/css/neudela/tokens.css">
<link rel="stylesheet" href="/css/neudela/main.css">`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<link rel="stylesheet" href="/css/neudela/tokens.css">\n<link rel="stylesheet" href="/css/neudela/main.css">`, 'html-font')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === 'html-font' ? t.overview.copied : t.overview.copy}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <NextPrevious
        next={{ id: 'foundation-overview', label: t.nav.foundationOverview }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
