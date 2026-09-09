import { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Sparkles, 
  Box, 
  Layers, 
  LayoutGrid, 
  Palette,
  CheckCircle2,
  Code2
} from 'lucide-react';
import HeroIconsGrid from '../components/HeroIconsGrid';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface OverviewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode: boolean;
}

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export default function Overview({ setActiveTab, isDarkMode: _isDarkMode }: OverviewProps) {
  const [projectType, setProjectType] = useState<'react' | 'vue' | 'html'>('react');
  const [pkgManager, setPkgManager] = useState<PackageManager>('npm');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getInstallCommand = (pm: PackageManager) => {
    switch (pm) {
      case 'pnpm':
        return 'pnpm add neudela';
      case 'yarn':
        return 'yarn add neudela';
      case 'bun':
        return 'bun add neudela';
      case 'npm':
      default:
        return 'npm install neudela';
    }
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
          
          <div className="hero-actions" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button
              className="neuron-btn neuron-btn--primary neuron-btn--lg"
              onClick={() => {
                document.getElementById('quick-start-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: '5px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              {t.overview.getStarted}
            </button>

            {/* Quick NPM Install Pill in Hero */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '6px 10px 6px 14px',
                boxShadow: 'var(--shadow-sm)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                color: 'var(--color-text-primary)'
              }}
            >
              <span style={{ color: 'var(--brand-500)', fontWeight: 700 }}>$</span>
              <span>npm install neudela</span>
              
              <button
                onClick={() => handleCopy('npm install neudela', 'hero-npm')}
                className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                style={{ height: '28px', padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Copy npm install command"
                type="button"
              >
                {copiedId === 'hero-npm' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                <span>{copiedId === 'hero-npm' ? t.overview.copied : t.overview.copy}</span>
              </button>

              <a
                href="https://www.npmjs.com/package/neudela"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>npm v0.1.1</span>
                <ExternalLink size={10} />
              </a>
            </div>
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
          <div className="feature-icon-wrapper">
            <Palette size={24} color="var(--brand-600)" />
          </div>
          <h3 className="feature-title">{t.overview.cardFoundationTitle}</h3>
          <p className="feature-desc">
            {t.overview.cardFoundationDesc}
          </p>
        </div>

        <div className="feature-card" onClick={() => setActiveTab('components-overview')}>
          <div className="feature-icon-wrapper">
            <Box size={24} color="#0ea5e9" />
          </div>
          <h3 className="feature-title">{t.overview.cardComponentsTitle}</h3>
          <p className="feature-desc">
            {t.overview.cardComponentsDesc}
          </p>
        </div>

        <div className="feature-card" onClick={() => setActiveTab('pat-forms')}>
          <div className="feature-icon-wrapper">
            <LayoutGrid size={24} color="#10b981" />
          </div>
          <h3 className="feature-title">{t.overview.cardPatternsTitle}</h3>
          <p className="feature-desc">
            {t.overview.cardPatternsDesc}
          </p>
        </div>
      </section>

      {/* Developer Quick Start & Installation */}
      <div id="quick-start-section" className="section-card" style={{ marginTop: 'var(--space-12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <h2 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Terminal size={22} color="var(--brand-500)" />
            <span>{t.overview.devQuickStartTitle}</span>
          </h2>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            fontSize: '12px', 
            fontWeight: 600, 
            color: 'var(--brand-700)', 
            backgroundColor: 'var(--brand-50)', 
            border: '1px solid var(--brand-200)',
            padding: '4px 12px', 
            borderRadius: 'var(--radius-full)' 
          }}>
            <Sparkles size={13} color="var(--brand-600)" />
            Official NPM Package (v0.1.1)
          </span>
        </div>
        
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
            <span>React / Next.js (NPM)</span>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: 700, 
              backgroundColor: 'rgba(223, 126, 48, 0.15)', 
              color: 'var(--brand-600)', 
              padding: '2px 6px', 
              borderRadius: 'var(--radius-xs)' 
            }}>
              Primary
            </span>
          </button>

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
            <span>Vue 3 / Nuxt</span>
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
            <span>HTML / CDN</span>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {projectType === 'react' && (
            <>
              {/* Step 1: Install from NPM */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>1</span>
                  <span>{t.overview.installStepTitle}</span>
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-3)', lineHeight: '1.6' }}>
                  {t.overview.installStepDesc}
                </p>

                {/* Package Manager Selector */}
                <div style={{ display: 'inline-flex', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2px', gap: '2px', marginBottom: 'var(--space-2)' }}>
                  {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setPkgManager(pm)}
                      type="button"
                      style={{
                        padding: '4px 12px',
                        fontSize: '12px',
                        fontWeight: pkgManager === pm ? 600 : 500,
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        backgroundColor: pkgManager === pm ? 'var(--color-bg-surface)' : 'transparent',
                        color: pkgManager === pm ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        boxShadow: pkgManager === pm ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {getInstallCommand(pkgManager)}
                  </pre>
                  <button
                    onClick={() => handleCopy(getInstallCommand(pkgManager), 'react-install')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'react-install' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'react-install' ? t.overview.copied : t.overview.copy}</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Import Stylesheet */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>2</span>
                  <span>{t.overview.styleStepTitle}</span>
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.styleStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`import 'neudela/style.css';`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import 'neudela/style.css';`, 'react-css')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'react-css' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'react-css' ? t.overview.copied : t.overview.copy}</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Use Components */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>3</span>
                  <span>{t.overview.componentStepTitle}</span>
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.componentStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`import React from 'react';
import { 
  NeuronButton, 
  NeuronBadge, 
  NeuronTable, 
  NeuronDatePicker, 
  NeuronModal 
} from 'neudela';

export default function MyDashboard() {
  return (
    <div>
      <NeuronBadge variant="brand" pill>Enterprise UI</NeuronBadge>
      <NeuronButton variant="primary">Submit</NeuronButton>
    </div>
  );
}`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import React from 'react';\nimport { NeuronButton, NeuronBadge, NeuronTable, NeuronDatePicker, NeuronModal } from 'neudela';\n\nexport default function MyDashboard() {\n  return (\n    <div>\n      <NeuronBadge variant="brand" pill>Enterprise UI</NeuronBadge>\n      <NeuronButton variant="primary">Submit</NeuronButton>\n    </div>\n  );\n}`, 'react-code')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'react-code' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'react-code' ? t.overview.copied : t.overview.copy}</span>
                  </button>
                </div>
              </div>
            </>
          )}

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
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">`, 'vue-font')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'vue-font' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'vue-font' ? t.overview.copied : t.overview.copy}</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Import CSS */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>2</span>
                  {t.overview.cssStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.cssStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`// In main.ts or App.vue
import 'neudela/style.css';`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import 'neudela/style.css';`, 'vue-copy')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'vue-copy' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'vue-copy' ? t.overview.copied : t.overview.copy}</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Use UI Classes */}
              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>3</span>
                  {t.overview.usageStepTitle}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  {t.overview.usageStepDesc}
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
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
                    type="button"
                  >
                    {copiedId === 'vue-imp' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'vue-imp' ? t.overview.copied : t.overview.copy}</span>
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
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`<link rel="stylesheet" href="https://unpkg.com/neudela@0.1.1/dist/style.css">`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<link rel="stylesheet" href="https://unpkg.com/neudela@0.1.1/dist/style.css">`, 'html-font')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'html-font' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'html-font' ? t.overview.copied : t.overview.copy}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: 'var(--fs-text-xs)' }}>2</span>
                  <span>Contoh Penggunaan Button & Badge</span>
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)', lineHeight: '1.6' }}>
                  Gunakan class CSS Neudela langsung di elemen HTML:
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ backgroundColor: 'var(--color-bg-canvas)', padding: 'var(--space-4) 70px var(--space-4) var(--space-4)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'var(--fs-text-xs)', overflowX: 'auto', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                    {`<span class="neuron-badge neuron-badge--brand neuron-badge--pill">Enterprise</span>
<button class="neuron-btn neuron-btn--primary neuron-btn--md">Click Me</button>`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<span class="neuron-badge neuron-badge--brand neuron-badge--pill">Enterprise</span>\n<button class="neuron-btn neuron-btn--primary neuron-btn--md">Click Me</button>`, 'html-code')}
                    className="neuron-btn neuron-btn--secondary neuron-btn--sm"
                    style={{ position: 'absolute', top: '10px', right: '10px', height: '32px', padding: '0 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    type="button"
                  >
                    {copiedId === 'html-code' ? <Check size={12} color="var(--emerald-600)" /> : <Copy size={12} />}
                    <span>{copiedId === 'html-code' ? t.overview.copied : t.overview.copy}</span>
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
