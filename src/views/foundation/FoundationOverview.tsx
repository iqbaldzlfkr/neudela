import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  Palette,
  LayoutGrid,
  Type,
  Ruler,
  Sparkles,
  ArrowRight,
  Sliders,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface FoundationOverviewProps {
  setActiveTab: (tabId: string) => void;
}

export default function FoundationOverview({ setActiveTab }: FoundationOverviewProps) {
  const { t } = useLanguage();

  const cards = [
    {
      id: 'colors',
      title: t.foundationOverview.colorsTitle,
      desc: t.foundationOverview.colorsDesc,
      badge: t.foundationOverview.colorsBadge,
      action: 'colors',
      renderVisual: () => (
        <div className="foundation-card-visual foundation-visual-colors">
          <div className="foundation-swatches-fan">
            {[
              { color: '#df7e30', rotate: -16, y: 10 },
              { color: '#a23c1b', rotate: -8, y: 4 },
              { color: '#f1ce96', rotate: 0, y: 0 },
              { color: '#10b981', rotate: 8, y: 4 },
              { color: '#0284c7', rotate: 16, y: 10 },
            ].map((swatch, i) => (
              <div
                key={i}
                className="foundation-swatch-chip"
                style={{
                  backgroundColor: swatch.color,
                  transform: `rotate(${swatch.rotate}deg) translateY(${swatch.y}px)`,
                }}
              />
            ))}
          </div>
          <div className="foundation-visual-tag">
            <span className="foundation-tag-dot" style={{ backgroundColor: '#df7e30' }} />
            <span>Tokens · Hex</span>
          </div>
        </div>
      ),
    },
    {
      id: 'grid',
      title: t.foundationOverview.gridTitle,
      desc: t.foundationOverview.gridDesc,
      badge: t.foundationOverview.gridBadge,
      action: 'grid',
      renderVisual: () => (
        <div className="foundation-card-visual foundation-visual-grid">
          <div className="foundation-grid-frame">
            <div className="foundation-grid-cols">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="foundation-grid-col-bar" />
              ))}
            </div>
            <div className="foundation-grid-blocks">
              <div className="foundation-grid-span span-4">col-4</div>
              <div className="foundation-grid-span span-8">col-8 (fluid)</div>
            </div>
          </div>
          <div className="foundation-visual-tag">
            <span className="foundation-tag-dot" style={{ backgroundColor: '#0284c7' }} />
            <span>12 Col · Fluid</span>
          </div>
        </div>
      ),
    },
    {
      id: 'icons',
      title: t.foundationOverview.iconsTitle,
      desc: t.foundationOverview.iconsDesc,
      badge: t.foundationOverview.iconsBadge,
      action: 'icons',
      renderVisual: () => (
        <div className="foundation-card-visual foundation-visual-icons">
          <div className="foundation-icons-cluster">
            {[
              Palette,
              LayoutGrid,
              Type,
              Ruler,
              Sparkles,
              ShieldCheck,
            ].map((IconComponent, i) => (
              <div key={i} className="foundation-icon-pill">
                <IconComponent size={17} strokeWidth={1.9} />
              </div>
            ))}
          </div>
          <div className="foundation-visual-tag">
            <span className="foundation-tag-dot" style={{ backgroundColor: '#8b5cf6' }} />
            <span>24px Grid</span>
          </div>
        </div>
      ),
    },
    {
      id: 'spacing',
      title: t.foundationOverview.spacingTitle,
      desc: t.foundationOverview.spacingDesc,
      badge: t.foundationOverview.spacingBadge,
      action: 'spacing',
      renderVisual: () => (
        <div className="foundation-card-visual foundation-visual-spacing">
          <div className="foundation-spacing-scale">
            {[
              { width: 32, label: 'space-2 (8px)' },
              { width: 64, label: 'space-4 (16px)' },
              { width: 96, label: 'space-6 (24px)' },
              { width: 128, label: 'space-8 (32px)' },
            ].map((step, i) => (
              <div key={i} className="foundation-spacing-item">
                <div
                  className="foundation-spacing-bar"
                  style={{ width: `${step.width}px` }}
                />
                <span className="foundation-spacing-label">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="foundation-visual-tag">
            <span className="foundation-tag-dot" style={{ backgroundColor: '#10b981' }} />
            <span>4px Base Unit</span>
          </div>
        </div>
      ),
    },
    {
      id: 'typography',
      title: t.foundationOverview.typographyTitle,
      desc: t.foundationOverview.typographyDesc,
      badge: t.foundationOverview.typographyBadge,
      action: 'typography',
      renderVisual: () => (
        <div className="foundation-card-visual foundation-visual-typography">
          <div className="foundation-typo-specimen">
            <span className="foundation-typo-glyph">Aa</span>
            <div className="foundation-typo-details">
              <span className="foundation-typo-line">Inter</span>
              <span className="foundation-typo-scale">400 · 500 · 600 · 700</span>
            </div>
          </div>
          <div className="foundation-visual-tag">
            <span className="foundation-tag-dot" style={{ backgroundColor: '#df7e30' }} />
            <span>Font: Inter</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="foundation-overview-container">
      {/* Page Header */}
      <div className="page-header">
        <span
          style={{
            fontSize: 'var(--fs-text-xs)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: 'var(--space-2)',
          }}
        >
          <Layers size={13} strokeWidth={2.4} />
          {t.foundationOverview.categoryLabel}
        </span>
        <h1 className="page-title">{t.foundationOverview.pageTitle}</h1>
        <p className="page-subtitle">{t.foundationOverview.pageSubtitle}</p>

        {/* Highlight Pills */}
        <div className="foundation-header-pills">
          <div className="foundation-pill-item">
            <span className="foundation-pill-dot" />
            {t.foundationOverview.pillModules}
          </div>
          <div className="foundation-pill-item">
            <span className="foundation-pill-dot" style={{ backgroundColor: '#0284c7' }} />
            {t.foundationOverview.pillTokens}
          </div>
          <div className="foundation-pill-item">
            <span className="foundation-pill-dot" style={{ backgroundColor: '#10b981' }} />
            {t.foundationOverview.pillWcag}
          </div>
        </div>
      </div>

      {/* Foundation Items Cards Grid */}
      <div className="foundation-cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveTab(card.action)}
            className="component-overview-card"
          >
            {/* Visual Preview */}
            {card.renderVisual()}

            {/* Card Body */}
            <div className="component-overview-body">
              <div className="component-overview-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 className="component-overview-title">{card.title}</h3>
                  {card.id === 'typography' && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        backgroundColor: 'rgba(223, 126, 48, 0.1)',
                        padding: '1px 7px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(223, 126, 48, 0.25)',
                      }}
                    >
                      Inter
                    </span>
                  )}
                </div>
                <span className="component-overview-badge">{card.badge}</span>
              </div>
              <p className="component-overview-desc">{card.desc}</p>
              <div className="component-overview-link">
                {t.foundationOverview.exploreModule}
                <ArrowRight size={12} className="component-overview-arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Foundation Architecture Section */}
      <div className="foundation-arch-section">
        <div className="foundation-arch-header">
          <h2 className="foundation-arch-title">{t.foundationOverview.archTitle}</h2>
          <p className="foundation-arch-subtitle">{t.foundationOverview.archSubtitle}</p>
        </div>
        <div className="foundation-arch-grid">
          <div className="foundation-arch-card">
            <div className="foundation-arch-icon token">
              <Sliders size={18} strokeWidth={2} />
            </div>
            <h4 className="foundation-arch-item-title">{t.foundationOverview.archTokenTitle}</h4>
            <p className="foundation-arch-item-desc">{t.foundationOverview.archTokenDesc}</p>
          </div>
          <div className="foundation-arch-card">
            <div className="foundation-arch-icon a11y">
              <ShieldCheck size={18} strokeWidth={2} />
            </div>
            <h4 className="foundation-arch-item-title">{t.foundationOverview.archA11yTitle}</h4>
            <p className="foundation-arch-item-desc">{t.foundationOverview.archA11yDesc}</p>
          </div>
          <div className="foundation-arch-card">
            <div className="foundation-arch-icon responsive">
              <LayoutGrid size={18} strokeWidth={2} />
            </div>
            <h4 className="foundation-arch-item-title">{t.foundationOverview.archResponsiveTitle}</h4>
            <p className="foundation-arch-item-desc">{t.foundationOverview.archResponsiveDesc}</p>
          </div>
        </div>
      </div>

      {/* Next & Previous Navigation */}
      <NextPrevious
        prev={{ id: 'overview', label: t.nav.overview }}
        next={{ id: 'colors', label: t.nav.colors }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
