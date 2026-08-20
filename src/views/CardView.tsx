import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NeuronCard, { 
  NeuronCardVariant, 
  NeuronCardPadding, 
  NeuronCardRadius,
  NeuronCardHoverEffect
} from '../components/NeuronCard';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  MoreVertical, 
  Check, 
  Heart, 
  Star, 
  Bookmark, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Activity,
  Layers,
  FileText,
  ShoppingBag
} from 'lucide-react';

interface CardViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────
function RuleCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type}`}>
      <div className="rule-card__badge">
        {isDo ? (
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Anatomy Label Item
// ─────────────────────────────────────────────
function AnatomyLabel({ number, label, desc }: { number: number; label: string; desc: string }) {
  return (
    <div className="anatomy-label">
      <span className="anatomy-number">{number}</span>
      <div>
        <div className="anatomy-label-name">{label}</div>
        <div className="anatomy-label-desc">{desc}</div>
      </div>
    </div>
  );
}

export default function CardView({ setActiveTab }: CardViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');

  // Sample media images
  const ARTICLE_IMG = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';
  const PRODUCT_IMG = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
  const PROFILE_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces';
  const PROFILE_BANNER = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80';

  const [wishlistActive, setWishlistActive] = useState(false);

  const gl = t.card.guideline;

  const VARIANTS: { id: NeuronCardVariant; label: string; desc: string }[] = [
    { id: 'default', label: t.card.defaultVariant, desc: 'Clean 1px border and flat background surface' },
    { id: 'elevated', label: t.card.elevatedVariant, desc: 'Layered shadow for prominent depth' },
    { id: 'flat', label: t.card.flatVariant, desc: 'Subtle tinted container without border' },
    { id: 'glass', label: t.card.glassVariant, desc: 'Frosted blur glassmorphism with ambient glow' },
    { id: 'gradient', label: t.card.gradientVariant, desc: 'Soft brand gradient background transition' },
    { id: 'gradient-border', label: t.card.gradientBorderVariant, desc: 'Radiant multi-color accent border glow' },
    { id: 'brand', label: t.card.brandVariant, desc: 'Solid primary terracotta accent background' },
    { id: 'ghost', label: t.card.ghostVariant, desc: 'Dashed outline placeholder container' },
  ];

  return (
    <div className="card-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.card.pageTitle}</h1>
            <p className="page-subtitle">{t.card.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setTab('guideline')}
          >
            {gl.tabName}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setTab('playbook')}
          >
            {gl.playbookTabName}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          TAB 1: GUIDELINE
      ═══════════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">
          
          {/* ── Overview & Matrix Showcase ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                {t.card.overviewCardHeading}
              </h3>
              
              <div className="component-showcase-grid component-showcase-grid--wide" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
                {VARIANTS.map((v) => {
                  const isGlass = v.id === 'glass';
                  const cardElement = (
                    <NeuronCard 
                      key={v.id}
                      variant={v.id}
                      hoverable
                      padding="md"
                      header={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--fs-text-sm)' }}>{v.label}</span>
                          <NeuronBadge size="sm" variant={v.id === 'brand' ? 'brand' : 'gray'}>
                            {v.id}
                          </NeuronBadge>
                        </div>
                      }
                      footer={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: 'var(--fs-text-xs)' }}>
                          <span style={{ opacity: 0.8 }}>Interactive Preview</span>
                          <ArrowRight size={14} />
                        </div>
                      }
                    >
                      <p style={{ fontSize: 'var(--fs-text-sm)', lineHeight: 1.5, margin: 0, opacity: v.id === 'brand' ? 0.9 : 0.75 }}>
                        {v.desc}
                      </p>
                    </NeuronCard>
                  );

                  if (isGlass) {
                    return (
                      <div 
                        key={v.id}
                        style={{
                          position: 'relative',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1px',
                          background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.4) 0%, rgba(99, 102, 241, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)',
                        }}
                      >
                        {cardElement}
                      </div>
                    );
                  }

                  return cardElement;
                })}
              </div>
            </div>
          </div>

          {/* ── Anatomy Diagram ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>

            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ minHeight: '390px', padding: 'var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Blueprint Canvas Container */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  maxWidth: '460px',
                  padding: '50px 70px 40px 70px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-2xl)',
                  display: 'flex',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-xs)'
                }}>
                  
                  {/* ── Marker 1: Surface Container (Left -> points directly to card outer border) ── */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '16px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0px',
                    zIndex: 10
                  }}>
                    <span className="anatomy-marker">1</span>
                    <span style={{ width: '38px', height: '1px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* ── Marker 2: Media Cover (Top -> points down into media cover area) ── */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '50%', 
                    top: '12px', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '0px',
                    zIndex: 10
                  }}>
                    <span className="anatomy-marker">2</span>
                    <span style={{ width: '1px', height: '24px', background: 'var(--color-text-primary)' }} />
                  </div>

                  {/* ── Marker 3: Header Slot (Right -> points left to Header section) ── */}
                  <div style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '142px', 
                    transform: 'translateY(-50%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0px',
                    zIndex: 10
                  }}>
                    <span style={{ width: '38px', height: '1px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* ── Marker 4: Content Body (Right -> points left to Body section) ── */}
                  <div style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '202px', 
                    transform: 'translateY(-50%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0px',
                    zIndex: 10
                  }}>
                    <span style={{ width: '38px', height: '1px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* ── Marker 5: Action Footer (Right -> points left to Footer section) ── */}
                  <div style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '256px', 
                    transform: 'translateY(-50%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0px',
                    zIndex: 10
                  }}>
                    <span style={{ width: '38px', height: '1px', background: 'var(--color-text-primary)' }} />
                    <span className="anatomy-marker">5</span>
                  </div>

                  {/* ── Card Mockup Inside Blueprint ── */}
                  <div style={{ width: '100%', maxWidth: '280px' }}>
                    <NeuronCard
                      variant="elevated"
                      padding="none"
                      media={
                        <div style={{ height: '76px', background: 'linear-gradient(135deg, var(--brand-500) 0%, var(--purple-600) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative' }}>
                          <Layers size={22} />
                        </div>
                      }
                      header={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>Card Title</div>
                            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Subtitle & meta</div>
                          </div>
                          <NeuronBadge size="sm" variant="brand">Badge</NeuronBadge>
                        </div>
                      }
                      footer={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>Updated today</span>
                          <NeuronButton size="xs" variant="primary">Action</NeuronButton>
                        </div>
                      }
                    >
                      <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
                        Body text summarizing details, content, or input elements.
                      </p>
                    </NeuronCard>
                  </div>

                </div>

              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyContainerLabel} desc={gl.anatomyContainerDesc} />
                <AnatomyLabel number={2} label={gl.anatomyMediaLabel} desc={gl.anatomyMediaDesc} />
                <AnatomyLabel number={3} label={gl.anatomyHeaderLabel} desc={gl.anatomyHeaderDesc} />
                <AnatomyLabel number={4} label={gl.anatomyBodyLabel} desc={gl.anatomyBodyDesc} />
                <AnatomyLabel number={5} label={gl.anatomyFooterLabel} desc={gl.anatomyFooterDesc} />
              </div>
            </div>
          </div>

          {/* ── When to Use Grid ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenToUseTitle}</h2>
            <p className="section-description">{gl.whenToUseDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
              
              {/* Scenario 1: Standalone Content Chunk */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{gl.whenContentTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="gray">Outlined / Elevated</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {gl.whenContentDesc}
                  </p>
                </div>

                {/* Mini Preview Mockup */}
                <div style={{ background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'center' }}>
                  <NeuronCard variant="default" padding="sm" style={{ width: '100%', maxWidth: '280px', background: 'var(--color-bg-surface)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      <Clock size={11} /> 3 min read · Engineering
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                      Synchronizing Multi-Theme Tokens
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px' }}>
                      <span style={{ color: 'var(--brand-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Read article <ArrowRight size={12} />
                      </span>
                    </div>
                  </NeuronCard>
                </div>
              </div>

              {/* Scenario 2: Dashboard Metrics & KPI */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{gl.whenDashboardTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="success">Metrics & KPI</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {gl.whenDashboardDesc}
                  </p>
                </div>

                {/* Mini Preview Mockup */}
                <div style={{ background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'center' }}>
                  <NeuronCard variant="elevated" padding="sm" style={{ width: '100%', maxWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Monthly Active Volume</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '10px', color: 'var(--emerald-600)', fontWeight: 600 }}>
                        <TrendingUp size={12} /> +18.4%
                      </span>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '4px' }}>
                      $124,500 <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>USD</span>
                    </div>
                  </NeuronCard>
                </div>
              </div>

              {/* Scenario 3: Product & Media Showcase */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--amber-50)', color: 'var(--amber-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingBag size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{gl.whenEcommerceTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="warning">Catalog Grid</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {gl.whenEcommerceDesc}
                  </p>
                </div>

                {/* Mini Preview Mockup */}
                <div style={{ background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'center' }}>
                  <NeuronCard variant="gradient-border" padding="sm" style={{ width: '100%', maxWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>Neuron Studio Pro</span>
                      <NeuronBadge size="sm" variant="brand">HOT</NeuronBadge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '6px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>$249</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textDecoration: 'line-through' }}>$329</span>
                    </div>
                  </NeuronCard>
                </div>
              </div>

              {/* Scenario 4: Pricing Plans & Tier Comparison */}
              <div style={{ 
                background: 'var(--color-bg-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--purple-50)', color: 'var(--purple-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={16} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{gl.whenPricingTitle}</span>
                    </div>
                    <NeuronBadge size="sm" variant="brand">SaaS Tiers</NeuronBadge>
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {gl.whenPricingDesc}
                  </p>
                </div>

                {/* Mini Preview Mockup */}
                <div style={{ background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'center' }}>
                  <NeuronCard variant="brand" padding="sm" style={{ width: '100%', maxWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Pro Team Tier</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>$29/mo</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>
                      Includes unlimited design tokens & priority support.
                    </div>
                  </NeuronCard>
                </div>
              </div>

            </div>
          </div>

          {/* ── Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            <div className="dodont-grid">
              {/* Rule 1 */}
              <RuleCard type="do">
                <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <NeuronCard variant="default" padding="sm">
                    <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>Clear Visual Structure</div>
                    <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Concise 2-line summary followed by single primary action.</div>
                    <div style={{ marginTop: '10px' }}><NeuronButton size="xs" variant="primary">Proceed</NeuronButton></div>
                  </NeuronCard>
                </div>
                <div className="rule-card__title">{gl.do1Title}</div>
                <div className="rule-card__desc">{gl.do1Desc}</div>
              </RuleCard>

              <RuleCard type="dont">
                <div style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <NeuronCard variant="default" padding="sm">
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Overloaded with 5 competing buttons and paragraphs of raw unformatted text creating visual chaos.</div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <NeuronButton size="xs" variant="primary">Save</NeuronButton>
                      <NeuronButton size="xs" variant="secondary">Cancel</NeuronButton>
                      <NeuronButton size="xs" variant="outline" style={{ color: 'var(--red-600)', borderColor: 'var(--red-300)' }}>Delete</NeuronButton>
                    </div>
                  </NeuronCard>
                </div>
                <div className="rule-card__title">{gl.dont1Title}</div>
                <div className="rule-card__desc">{gl.dont1Desc}</div>
              </RuleCard>

              {/* Rule 2 */}
              <RuleCard type="do">
                <div style={{ padding: 'var(--space-3)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <NeuronCard variant="default" padding="sm" style={{ height: '90px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600 }}>Grid Item 1</span>
                    </NeuronCard>
                    <NeuronCard variant="default" padding="sm" style={{ height: '90px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600 }}>Grid Item 2</span>
                    </NeuronCard>
                  </div>
                </div>
                <div className="rule-card__title">{gl.do2Title}</div>
                <div className="rule-card__desc">{gl.do2Desc}</div>
              </RuleCard>

              <RuleCard type="dont">
                <div style={{ padding: 'var(--space-3)' }}>
                  <NeuronCard variant="default" padding="sm">
                    <div style={{ fontSize: '11px', fontWeight: 600 }}>Outer Card</div>
                    <div style={{ marginTop: '6px' }}>
                      <NeuronCard variant="default" padding="sm">
                        <span style={{ fontSize: '10px', color: 'var(--color-danger)' }}>Nested Inner Card (Avoid)</span>
                      </NeuronCard>
                    </div>
                  </NeuronCard>
                </div>
                <div className="rule-card__title">{gl.dont2Title}</div>
                <div className="rule-card__desc">{gl.dont2Desc}</div>
              </RuleCard>

              {/* Rule 3 */}
              <RuleCard type="do">
                <div style={{ padding: 'var(--space-3)' }}>
                  <NeuronCard variant="glass" hoverable padding="sm" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600 }}>Glass Card (Glow Refraction)</span>
                      <span style={{ fontSize: '10px', color: 'var(--brand-600)', fontWeight: 600 }}>Tailored</span>
                    </div>
                  </NeuronCard>
                </div>
                <div className="rule-card__title">{gl.do3Title}</div>
                <div className="rule-card__desc">{gl.do3Desc}</div>
              </RuleCard>

              <RuleCard type="dont">
                <div style={{ padding: 'var(--space-3)' }}>
                  <div style={{ transform: 'translateY(-6px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.45)', borderRadius: 'var(--radius-md)', padding: '10px 12px', background: 'rgba(255, 255, 255, 0.8)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-danger)', fontWeight: 500 }}>Harsh pop-up shadow on glass (Unnatural)</span>
                  </div>
                </div>
                <div className="rule-card__title">{gl.dont3Title}</div>
                <div className="rule-card__desc">{gl.dont3Desc}</div>
              </RuleCard>
            </div>
          </div>

          {/* ── Padding & Radius Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.sizeTitle}</h2>
            <p className="section-description">{gl.sizeDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>sm (12px padding)</div>
                <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{gl.sizeSmUsage}</div>
              </div>
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>md (18px padding · Default)</div>
                <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{gl.sizeMdUsage}</div>
              </div>
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>lg (24px padding)</div>
                <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{gl.sizeLgUsage}</div>
              </div>
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>xl (32px padding)</div>
                <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{gl.sizeXlUsage}</div>
              </div>
            </div>
          </div>

          {/* ── Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.a11yTitle}</h2>
            <p className="section-description">{gl.a11yDesc}</p>

            <div className="a11y-list">
              <div className="a11y-item">
                <div className="a11y-icon"><ShieldCheck size={16} /></div>
                <div>
                  <div className="a11y-title">{gl.a11yLandmarkTitle}</div>
                  <div className="a11y-desc">{gl.a11yLandmarkDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon"><Activity size={16} /></div>
                <div>
                  <div className="a11y-title">{gl.a11yKeyboardTitle}</div>
                  <div className="a11y-desc">{gl.a11yKeyboardDesc}</div>
                </div>
              </div>

              <div className="a11y-item">
                <div className="a11y-icon"><Check size={16} /></div>
                <div>
                  <div className="a11y-title">{gl.a11yScreenReaderTitle}</div>
                  <div className="a11y-desc">{gl.a11yScreenReaderDesc}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 2: PLAYBOOK
      ═══════════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 1. STYLE VARIANTS SHOWCASE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.card.variantsTitle}</h2>
            <p className="section-description">{t.card.variantsDesc}</p>

            <div className="component-showcase-grid component-showcase-grid--wide" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-5)' }}>
              {VARIANTS.map((v) => {
                const isGlass = v.id === 'glass';
                const cardElement = (
                  <NeuronCard
                    key={v.id}
                    variant={v.id}
                    hoverable
                    header={
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>{v.label}</span>
                        <NeuronBadge size="sm" variant={v.id === 'brand' ? 'brand' : 'gray'}>
                          {v.id}
                        </NeuronBadge>
                      </div>
                    }
                  >
                    <p style={{ fontSize: 'var(--fs-text-xs)', margin: 0, lineHeight: 1.5, opacity: v.id === 'brand' ? 0.9 : 0.75 }}>
                      {v.desc}
                    </p>
                  </NeuronCard>
                );

                if (isGlass) {
                  return (
                    <div 
                      key={v.id}
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1px',
                        background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.4) 0%, rgba(99, 102, 241, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)',
                      }}
                    >
                      {cardElement}
                    </div>
                  );
                }

                return cardElement;
              })}
            </div>
          </div>

          {/* ── 2. HIGH-IMPACT INDUSTRY PRODUCTION CARD PATTERNS ── */}
          <div className="section-card">
            <h2 className="section-title">{t.card.industryTitle}</h2>
            <p className="section-description">{t.card.industryDesc}</p>

            {/* Pattern 1: Analytics KPI Metric Cards Grid */}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t.card.kpiTitle}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                
                {/* Metric 1: Total Revenue */}
                <NeuronCard variant="elevated" hoverable padding="md">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Total Revenue</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '8px' }}>
                    $128,450.00
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: 'var(--fs-text-xs)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: 'var(--emerald-600)', fontWeight: 600 }}>
                      <TrendingUp size={14} /> +14.2%
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>vs last month</span>
                  </div>
                </NeuronCard>

                {/* Metric 2: Active Subscriptions */}
                <NeuronCard variant="elevated" hoverable padding="md">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Active Subscriptions</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '8px' }}>
                    4,290 <span style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 400, color: 'var(--color-text-secondary)' }}>users</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: 'var(--fs-text-xs)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: 'var(--emerald-600)', fontWeight: 600 }}>
                      <TrendingUp size={14} /> +8.5%
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>vs last month</span>
                  </div>
                </NeuronCard>

                {/* Metric 3: System Latency */}
                <NeuronCard variant="elevated" hoverable padding="md">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>API Response Time</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'var(--emerald-50)', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '8px' }}>
                    42 <span style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 400, color: 'var(--color-text-secondary)' }}>ms</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: 'var(--fs-text-xs)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: 'var(--emerald-600)', fontWeight: 600 }}>
                      <TrendingDown size={14} /> -12.0%
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>ultra fast</span>
                  </div>
                </NeuronCard>

              </div>
            </div>

            {/* Pattern 2 & 3: Fintech Glassmorphism Card & SaaS Pricing Card */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              
              {/* Fintech Glassmorphism Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.card.glassTitle}
                </div>

                <div style={{ 
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                  padding: 'var(--space-6)', 
                  borderRadius: 'var(--radius-2xl)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <NeuronCard 
                    variant="glass" 
                    padding="lg" 
                    hoverEffect="glow"
                    style={{ 
                      color: '#ffffff', 
                      background: 'rgba(255, 255, 255, 0.12)', 
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: 'var(--radius-xl)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.85)' }}>
                        Neudela Platinum
                      </span>
                      <CreditCard size={24} style={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                    </div>

                    <div style={{ margin: '32px 0 24px 0' }}>
                      <div style={{ fontSize: '18px', letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 600, color: '#ffffff' }}>
                        •••• •••• •••• 8842
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <div>
                        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card Holder</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>ALEXANDER WARD</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expires</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>08/29</div>
                      </div>
                      <div style={{ width: '36px', height: '24px', borderRadius: '4px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', opacity: 0.9 }} />
                    </div>
                  </NeuronCard>
                </div>
              </div>

              {/* SaaS Pricing Tier Card (Gradient Glow) */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.card.pricingTitle}
                </div>

                <NeuronCard 
                  variant="gradient-border" 
                  hoverEffect="glow"
                  padding="lg"
                  style={{ position: 'relative' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 'var(--fs-text-lg)', fontWeight: 700 }}>Pro Plan</h3>
                      <p style={{ margin: '2px 0 0 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>For scaling teams & companies</p>
                    </div>
                    <NeuronBadge size="sm" variant="brand">Most Popular</NeuronBadge>
                  </div>

                  <div style={{ margin: '20px 0 16px 0', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-text-primary)' }}>$29</span>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>/ month</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
                    {[
                      'Unlimited Design Tokens & Assets',
                      'High-Performance UI Component Library',
                      'Full WAI-ARIA Accessibility Testing',
                      'Priority 24/7 Developer Support'
                    ].map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-xs)' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--brand-100)', color: 'var(--brand-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span style={{ color: 'var(--color-text-primary)' }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <NeuronButton variant="primary" size="md" style={{ width: '100%', justifyContent: 'center' }}>
                    Upgrade to Pro <ArrowRight size={16} />
                  </NeuronButton>
                </NeuronCard>
              </div>

            </div>

            {/* Pattern 4, 5 & 6: Editorial Media, Profile Card, E-commerce Product */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              
              {/* Editorial Media Article Card */}
              <NeuronCard 
                variant="elevated" 
                hoverable
                padding="none"
              >
                <div className="neuron-card-media" style={{ height: '160px', position: 'relative' }}>
                  <img src={ARTICLE_IMG} alt="Article cover" />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <NeuronBadge size="sm" variant="brand">Design System</NeuronBadge>
                  </div>
                  <button 
                    type="button" 
                    aria-label="Bookmark" 
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <Bookmark size={14} />
                  </button>
                </div>

                <div className="neuron-card-body" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                    <Clock size={12} /> 4 min read · August 19, 2026
                  </div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: 'var(--fs-text-md)', fontWeight: 600, lineHeight: 1.4 }}>
                    Architecting High-Speed Design Tokens with Neudela 2.0
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Learn how modern engineering teams synchronize design variables across web and mobile.
                  </p>
                </div>

                <div className="neuron-card-footer" style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={PROFILE_AVATAR} alt="Author" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>Elena Rostova</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--brand-600)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </NeuronCard>

              {/* Social User Profile Card */}
              <NeuronCard 
                variant="default" 
                hoverable
                padding="none"
              >
                <div style={{ height: '70px', backgroundImage: `url(${PROFILE_BANNER})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }} />
                
                <div style={{ padding: '0 16px 16px 16px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-28px', marginBottom: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={PROFILE_AVATAR} 
                        alt="Profile" 
                        style={{ width: '56px', height: '56px', borderRadius: '50%', border: '3px solid var(--color-bg-surface)', objectFit: 'cover' }} 
                      />
                      <span style={{ position: 'absolute', bottom: '3px', right: '3px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--emerald-500)', border: '2px solid var(--color-bg-surface)' }} />
                    </div>
                    <NeuronButton size="xs" variant="primary">Follow</NeuronButton>
                  </div>

                  <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>Sarah Jenkins</h3>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Lead Product Designer @ Neudela</div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-primary)', margin: '10px 0', lineHeight: 1.4 }}>
                    Crafting accessible design tokens and interactive component systems.
                  </p>

                  <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '10px', fontSize: '11px' }}>
                    <div><strong style={{ color: 'var(--color-text-primary)' }}>1,420</strong> <span style={{ color: 'var(--color-text-secondary)' }}>Followers</span></div>
                    <div><strong style={{ color: 'var(--color-text-primary)' }}>340</strong> <span style={{ color: 'var(--color-text-secondary)' }}>Projects</span></div>
                  </div>
                </div>
              </NeuronCard>

              {/* E-Commerce Product Card */}
              <NeuronCard 
                variant="elevated" 
                hoverable
                padding="none"
              >
                <div className="neuron-card-media" style={{ height: '160px', position: 'relative' }}>
                  <img src={PRODUCT_IMG} alt="Product" />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <NeuronBadge size="sm" variant="error">-25% OFF</NeuronBadge>
                  </div>
                  <button 
                    type="button" 
                    aria-label="Add to Wishlist"
                    onClick={() => setWishlistActive(!wishlistActive)}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--color-bg-surface)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: wishlistActive ? 'var(--red-500)' : 'var(--slate-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <Heart size={14} fill={wishlistActive ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="neuron-card-body" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--amber-500)', marginBottom: '4px' }}>
                    <Star size={12} fill="currentColor" />
                    <span style={{ fontWeight: 600 }}>4.9</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>(128 reviews)</span>
                  </div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: 'var(--fs-text-sm)', fontWeight: 600 }}>
                    Neuron Wireless Studio Pro
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: 'var(--fs-text-md)', fontWeight: 700, color: 'var(--color-text-primary)' }}>$249.00</span>
                    <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', textDecoration: 'line-through' }}>$329.00</span>
                  </div>
                </div>

                <div className="neuron-card-footer" style={{ padding: '10px 16px' }}>
                  <NeuronButton size="xs" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Add to Cart
                  </NeuronButton>
                </div>
              </NeuronCard>

            </div>
          </div>

          {/* ── 3. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronCard {t.compShared.playground}</h2>
            <Playground
              name="NeuronCard"
              knobs={[
                { 
                  name: 'variant', 
                  type: 'select', 
                  options: ['default', 'elevated', 'flat', 'glass', 'gradient', 'gradient-border', 'brand', 'ghost'], 
                  default: 'elevated', 
                  label: t.card.knobVariant 
                },
                { 
                  name: 'hoverEffect', 
                  type: 'select', 
                  options: ['auto', 'glow', 'border', 'tint', 'lift', 'scale', 'none'], 
                  default: 'auto', 
                  label: t.card.knobHoverable 
                },
                { 
                  name: 'padding', 
                  type: 'select', 
                  options: ['none', 'sm', 'md', 'lg', 'xl'], 
                  default: 'md', 
                  label: t.card.knobPadding 
                },
                { 
                  name: 'radius', 
                  type: 'select', 
                  options: ['sm', 'md', 'lg', 'xl', '2xl'], 
                  default: 'lg', 
                  label: t.card.knobRadius 
                },
                { 
                  name: 'hasHeader', 
                  type: 'boolean', 
                  default: true, 
                  label: t.card.knobHasHeader 
                },
                { 
                  name: 'hasFooter', 
                  type: 'boolean', 
                  default: true, 
                  label: t.card.knobHasFooter 
                },
                { 
                  name: 'title', 
                  type: 'text', 
                  default: 'Design System Card', 
                  label: t.card.knobTitle 
                },
                { 
                  name: 'bodyText', 
                  type: 'text', 
                  default: 'Neudela components empower developers to build beautiful, responsive, and accessible digital interfaces.', 
                  label: t.card.knobBody 
                },
                { 
                  name: 'footerText', 
                  type: 'text', 
                  default: 'Last updated 10 mins ago', 
                  label: t.card.knobFooter 
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.variant !== 'default') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }
                if (knobs.hoverEffect !== 'auto' && knobs.hoverEffect !== 'none') {
                  reactProps.push(`hoverEffect="${knobs.hoverEffect}"`);
                  vueProps.push(`hover-effect="${knobs.hoverEffect}"`);
                }
                if (knobs.padding !== 'md') {
                  reactProps.push(`padding="${knobs.padding}"`);
                  vueProps.push(`padding="${knobs.padding}"`);
                }
                if (knobs.radius !== 'lg') {
                  reactProps.push(`radius="${knobs.radius}"`);
                  vueProps.push(`radius="${knobs.radius}"`);
                }

                if (knobs.hasHeader) {
                  reactProps.push(`header={<h3>${knobs.title}</h3>}`);
                }
                if (knobs.hasFooter) {
                  reactProps.push(`footer={<span>${knobs.footerText}</span>}`);
                }

                const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
                const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

                const vueHeader = knobs.hasHeader ? `\n  <template #header>\n    <h3>${knobs.title}</h3>\n  </template>` : '';
                const vueFooter = knobs.hasFooter ? `\n  <template #footer>\n    <span>${knobs.footerText}</span>\n  </template>` : '';

                let htmlClasses = `neuron-card neuron-card--${knobs.variant} neuron-card--pad-${knobs.padding} neuron-card--radius-${knobs.radius}`;
                if (knobs.hoverEffect !== 'none') {
                  htmlClasses += knobs.hoverEffect === 'auto' ? ' neuron-card--hover-auto' : ` neuron-card--hover-${knobs.hoverEffect}`;
                }

                return {
                  react: `<NeuronCard${reactAttr}>\n  <p>${knobs.bodyText}</p>\n</NeuronCard>`,
                  vue: `<NeuronCard${vueAttr}>${vueHeader}\n  <p>${knobs.bodyText}</p>${vueFooter}\n</NeuronCard>`,
                  html: `<div class="${htmlClasses}">\n${knobs.hasHeader ? `  <div class="neuron-card-header">\n    <h3>${knobs.title}</h3>\n  </div>\n` : ''}  <div class="neuron-card-body">\n    <p>${knobs.bodyText}</p>\n  </div>\n${knobs.hasFooter ? `  <div class="neuron-card-footer">\n    <span>${knobs.footerText}</span>\n  </div>\n` : ''}</div>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ width: '100%', maxWidth: '420px' }}>
                  <NeuronCard
                    variant={knobs.variant as NeuronCardVariant}
                    hoverEffect={knobs.hoverEffect as NeuronCardHoverEffect}
                    padding={knobs.padding as NeuronCardPadding}
                    radius={knobs.radius as NeuronCardRadius}
                    header={
                      knobs.hasHeader ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <h3 style={{ margin: 0, fontSize: 'var(--fs-text-sm)', fontWeight: 600 }}>{knobs.title as string}</h3>
                          <MoreVertical size={16} style={{ color: 'var(--color-text-secondary)', cursor: 'pointer' }} />
                        </div>
                      ) : undefined
                    }
                    footer={
                      knobs.hasFooter ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: 'var(--fs-text-xs)' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{knobs.footerText as string}</span>
                          <NeuronButton size="xs" variant="primary">Action</NeuronButton>
                        </div>
                      ) : undefined
                    }
                  >
                    <p style={{ margin: 0, fontSize: 'var(--fs-text-sm)', lineHeight: 1.5, opacity: knobs.variant === 'brand' ? 0.9 : 0.8 }}>
                      {knobs.bodyText as string}
                    </p>
                  </NeuronCard>
                </div>
              )}
            </Playground>
          </div>

          {/* ── 4. API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{t.compShared.prop}</th>
                    <th>{t.compShared.type}</th>
                    <th>{t.compShared.default}</th>
                    <th>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'elevated' | 'flat' | 'glass' | 'gradient' | 'gradient-border' | 'brand' | 'ghost'</code></td>
                    <td><code>'default'</code></td>
                    <td>{t.card.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>hoverable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.card.apiHoverable}</td>
                  </tr>
                  <tr>
                    <td><code>hoverEffect</code></td>
                    <td><code>'auto' | 'glow' | 'border' | 'tint' | 'lift' | 'scale' | 'none'</code></td>
                    <td><code>'auto'</code></td>
                    <td>{t.card.apiHoverEffect}</td>
                  </tr>
                  <tr>
                    <td><code>padding</code></td>
                    <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.card.apiPadding}</td>
                  </tr>
                  <tr>
                    <td><code>radius</code></td>
                    <td><code>'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'</code></td>
                    <td><code>'lg'</code></td>
                    <td>{t.card.apiRadius}</td>
                  </tr>
                  <tr>
                    <td><code>header</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.card.apiHeader}</td>
                  </tr>
                  <tr>
                    <td><code>media</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.card.apiMedia}</td>
                  </tr>
                  <tr>
                    <td><code>mediaPosition</code></td>
                    <td><code>'top' | 'bottom'</code></td>
                    <td><code>'top'</code></td>
                    <td>{t.card.apiMediaPosition}</td>
                  </tr>
                  <tr>
                    <td><code>footer</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.card.apiFooter}</td>
                  </tr>
                  <tr>
                    <td><code>href</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.card.apiHref}</td>
                  </tr>
                  <tr>
                    <td><code>isClickable</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.card.apiIsClickable}</td>
                  </tr>
                  <tr>
                    <td><code>onClick</code></td>
                    <td><code>(e: MouseEvent) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.card.apiOnClick}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-input', label: t.nav.compInput }}
        next={{ id: 'comp-badge', label: t.nav.compBadge }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
