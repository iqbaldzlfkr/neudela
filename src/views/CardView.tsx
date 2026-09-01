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
  ShoppingBag,
  Bell,
  MessageSquare,
  Sparkles,
  Zap,
  Globe,
  Lock,
  Mail,
  ChevronRight,
  Quote,
  UserPlus,
  X,
  AlertTriangle,
  BarChart2,
  Cpu,
  GitBranch,
  Play
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
                          background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.55) 0%, rgba(241, 206, 150, 0.3) 50%, rgba(162, 60, 27, 0.5) 100%)',
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

            {/* ── Padding Scale ── */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Padding Scale</h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>Controls internal spacing — use <code>sm</code> for dense UIs, <code>lg</code> / <code>xl</code> for hero or feature cards.</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {(['sm', 'md', 'lg', 'xl'] as const).map((p) => (
                  <div key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 120 }}>
                    <NeuronCard variant="default" padding={p} style={{ width: '100%' }}>
                      <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 4, height: 10, width: '100%', marginBottom: 4 }} />
                      <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 4, height: 10, width: '70%' }} />
                    </NeuronCard>
                    <NeuronBadge size="sm" variant="gray">padding="{p}"</NeuronBadge>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Border Radius Scale ── */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Border Radius Scale</h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>Controls corner rounding — pair <code>sm</code> with dense data cards, <code>2xl</code> with hero or modal cards.</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((r) => (
                  <div key={r} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 100 }}>
                    <NeuronCard variant="elevated" padding="md" radius={r} style={{ width: '100%' }}>
                      <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 4, height: 10, width: '100%', marginBottom: 4 }} />
                      <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 4, height: 10, width: '60%' }} />
                    </NeuronCard>
                    <NeuronBadge size="sm" variant="gray">radius="{r}"</NeuronBadge>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Hover Effects ── */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Hover Effects</h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>Hover over each card to preview the interaction feedback.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-4)' }}>
                {(['glow', 'border', 'tint', 'lift', 'scale'] as const).map((effect) => (
                  <div key={effect} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <NeuronCard variant="elevated" padding="md" hoverable hoverEffect={effect} style={{ width: '100%', textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', marginBottom: 6 }}>
                        {effect === 'glow' ? '✦' : effect === 'border' ? '⬡' : effect === 'tint' ? '◈' : effect === 'lift' ? '⬆' : '⤢'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Hover me</div>
                    </NeuronCard>
                    <NeuronBadge size="sm" variant="gray">{effect}</NeuronBadge>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Card States ── */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Card States</h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>Visual states for selected, disabled, and loading skeleton scenarios.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>

                {/* Selected / Active */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="default" padding="md" style={{ border: '2px solid var(--brand-500)', background: 'var(--brand-50)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-700)' }}>Pro Plan</span>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} strokeWidth={3} style={{ color: '#fff' }} />
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--brand-600)', lineHeight: 1.4 }}>Currently selected plan</p>
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>selected</NeuronBadge>
                </div>

                {/* Disabled */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="default" padding="md" style={{ opacity: 0.45, pointerEvents: 'none', cursor: 'not-allowed' }}>
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Enterprise Plan</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Not available on your tier</p>
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>disabled</NeuronBadge>
                </div>

                {/* Loading Skeleton */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="default" padding="md">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-bg-subtle)' }} />
                      <div style={{ flex: 1 }}>
                        <div className="skeleton" style={{ height: 10, borderRadius: 4, background: 'var(--color-bg-subtle)', marginBottom: 6 }} />
                        <div className="skeleton" style={{ height: 8, width: '60%', borderRadius: 4, background: 'var(--color-bg-subtle)' }} />
                      </div>
                    </div>
                    <div className="skeleton" style={{ height: 8, borderRadius: 4, background: 'var(--color-bg-subtle)', marginBottom: 6 }} />
                    <div className="skeleton" style={{ height: 8, width: '80%', borderRadius: 4, background: 'var(--color-bg-subtle)' }} />
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>skeleton</NeuronBadge>
                </div>

              </div>
            </div>

            {/* ── Media Cards ── */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Media Cards</h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>Cards with top or side image regions using the <code>neuron-card-media</code> slot.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>

                {/* Top image */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="elevated" padding="none" hoverable>
                    <div className="neuron-card-media" style={{ height: 120, position: 'relative' }}>
                      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" alt="Top media" />
                      <div style={{ position: 'absolute', top: 10, left: 10 }}>
                        <NeuronBadge size="sm" variant="brand">Featured</NeuronBadge>
                      </div>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600 }}>Top Media Card</p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Image positioned at the top of the card.</p>
                    </div>
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>mediaPosition="top"</NeuronBadge>
                </div>

                {/* Side image / horizontal */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="elevated" padding="none" hoverable>
                    <div style={{ display: 'flex', overflow: 'hidden', borderRadius: 'inherit' }}>
                      <div style={{ width: 90, flexShrink: 0, background: 'var(--brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={28} style={{ color: 'var(--brand-500)' }} />
                      </div>
                      <div style={{ padding: '14px 16px', flex: 1 }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 600 }}>Side Media Card</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Horizontal layout with icon or image on the left.</p>
                      </div>
                    </div>
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>horizontal layout</NeuronBadge>
                </div>

              </div>
            </div>

            {/* ── Clickable / Link Cards ── */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>Clickable & Link Cards</h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>Use <code>isClickable</code> or <code>href</code> to make the entire card a navigation target.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>

                {/* onClick card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="default" padding="md" isClickable hoverable hoverEffect="lift" onClick={() => {}}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Clickable Card</span>
                      <ArrowRight size={14} style={{ color: 'var(--color-text-secondary)' }} />
                    </div>
                    <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Entire card acts as a button. Keyboard accessible.</p>
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>isClickable</NeuronBadge>
                </div>

                {/* href / link card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <NeuronCard variant="default" padding="md" href="#" hoverable hoverEffect="border">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>Link Card</span>
                      <ArrowRight size={14} style={{ color: 'var(--brand-500)' }} />
                    </div>
                    <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>Renders as an <code>&lt;a&gt;</code> tag. Opens URL on click.</p>
                  </NeuronCard>
                  <NeuronBadge size="sm" variant="gray" style={{ alignSelf: 'center' }}>href="#"</NeuronBadge>
                </div>

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
                        background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.55) 0%, rgba(241, 206, 150, 0.3) 50%, rgba(162, 60, 27, 0.5) 100%)',
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
                  background: 'radial-gradient(circle at 15% 25%, rgba(223, 126, 48, 0.3) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(195, 87, 28, 0.25) 0%, transparent 50%), linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
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

          {/* ── SHOWCASE: NOTIFICATION FEED + AI FEATURE ── */}
          <div className="section-card">
            <h2 className="section-title">Notification & AI Feature Cards</h2>
            <p className="section-description">Real-world patterns from top-tier products like Linear, Vercel, and Notion.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>

              {/* Notification Feed Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notification Feed</div>
                <NeuronCard variant="elevated" padding="none" hoverable>
                  <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Bell size={14} style={{ color: 'var(--color-text-secondary)' }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Notifications</span>
                    </div>
                    <NeuronBadge size="sm" variant="brand">3 new</NeuronBadge>
                  </div>
                  {[
                    { icon: <Check size={13} />, color: 'var(--emerald-600)', bg: 'var(--emerald-50)', msg: 'Pull request #142 merged', sub: 'neudela/design-tokens', time: '2m ago', unread: true },
                    { icon: <MessageSquare size={13} />, color: 'var(--blue-600)', bg: 'var(--blue-50)', msg: 'Iqbal commented on your spec', sub: 'ButtonView.tsx · Line 89', time: '18m ago', unread: true },
                    { icon: <AlertTriangle size={13} />, color: 'var(--amber-600)', bg: 'var(--amber-50)', msg: 'Bundle size warning exceeded', sub: 'main.css · 127.7 kB', time: '1h ago', unread: true },
                    { icon: <ShieldCheck size={13} />, color: 'var(--slate-500)', bg: 'var(--slate-100)', msg: 'Security scan passed', sub: '0 vulnerabilities found', time: '3h ago', unread: false },
                  ].map((n, i, arr) => (
                    <div key={i} style={{ padding: '12px 18px', display: 'flex', alignItems: 'flex-start', gap: 12, background: n.unread ? 'rgba(223,126,48,0.03)' : 'transparent', borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none', cursor: 'pointer' }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: n.bg, color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: n.unread ? 600 : 400, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          {n.msg}
                          {n.unread && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-500)', display: 'inline-block', flexShrink: 0 }} />}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.sub}</div>
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', flexShrink: 0, paddingTop: 2 }}>{n.time}</span>
                    </div>
                  ))}
                </NeuronCard>
              </div>

              {/* AI Feature Spotlight Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Feature Spotlight</div>
                <NeuronCard variant="brand" padding="lg" hoverEffect="glow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={18} style={{ color: '#fff' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Neudela AI</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Powered by Gemini 2.5 Pro</div>
                    </div>
                    <NeuronBadge size="sm" variant="success" style={{ marginLeft: 'auto' }}>Beta</NeuronBadge>
                  </div>

                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                    Generate production-ready component code, design tokens, and accessibility audits instantly from natural language.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                    {[
                      { icon: <Zap size={12} />, label: '10x faster component generation' },
                      { icon: <ShieldCheck size={12} />, label: 'WCAG 2.1 AA auto-compliance' },
                      { icon: <GitBranch size={12} />, label: 'Design-to-code sync pipeline' },
                    ].map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>
                        <span style={{ opacity: 0.8 }}>{f.icon}</span>
                        {f.label}
                      </div>
                    ))}
                  </div>

                  <NeuronButton variant="outline" size="sm" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                    <Play size={13} style={{ marginRight: 6 }} /> Try it now
                  </NeuronButton>
                </NeuronCard>
              </div>

            </div>
          </div>

          {/* ── SHOWCASE: TESTIMONIAL + TEAM INVITE ── */}
          <div className="section-card">
            <h2 className="section-title">Testimonial & Team Invite Cards</h2>
            <p className="section-description">Social proof and collaborative onboarding patterns seen in Stripe, Figma, and Loom.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>

              {/* Testimonial / Review Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Testimonial</div>
                <NeuronCard variant="gradient-border" padding="lg" hoverEffect="glow">
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} fill="var(--amber-400)" style={{ color: 'var(--amber-400)' }} />
                    ))}
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginLeft: 6 }}>5.0</span>
                  </div>

                  <div style={{ position: 'relative', paddingLeft: 20, marginBottom: 18 }}>
                    <Quote size={28} style={{ position: 'absolute', top: -4, left: -4, color: 'var(--brand-200)', opacity: 0.6 }} />
                    <p style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
                      "Neudela cut our design-to-production cycle in half. The token system alone saved us weeks of QA time across 3 platforms."
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid var(--color-border)' }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces" alt="Reviewer" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Priya Mehta</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>VP of Design · Axiom Cloud</div>
                    </div>
                    <NeuronBadge size="sm" variant="gray" style={{ marginLeft: 'auto' }}>Verified</NeuronBadge>
                  </div>
                </NeuronCard>
              </div>

              {/* Team Invite Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team Invite</div>
                <NeuronCard variant="elevated" padding="lg">
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--brand-50)', color: 'var(--brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                      <UserPlus size={22} />
                    </div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700 }}>Join the Neudela workspace</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</strong> invited you to collaborate on the Neudela Design System
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--color-bg-subtle)', borderRadius: 10, border: '1px solid var(--color-border)', marginBottom: 16 }}>
                    <Mail size={14} style={{ color: 'var(--color-text-secondary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', flex: 1 }}>you@company.com</span>
                    <Lock size={12} style={{ color: 'var(--color-text-tertiary)' }} />
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    <NeuronButton variant="primary" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Accept Invite</NeuronButton>
                    <NeuronButton variant="outline" size="sm" style={{ flex: 1, justifyContent: 'center' }}>Decline</NeuronButton>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                    {['#df7e30','#10b981','#3b82f6','#a855f7'].map((c, i) => (
                      <div key={i} title="Team member" style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: '2px solid var(--color-bg-surface)', marginLeft: i > 0 ? -8 : 0 }} />
                    ))}
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginLeft: 6 }}>+12 team members</span>
                  </div>
                </NeuronCard>
              </div>

            </div>
          </div>

          {/* ── SHOWCASE: CHANGELOG + DEPLOY STATUS ── */}
          <div className="section-card">
            <h2 className="section-title">Changelog & Deploy Status Cards</h2>
            <p className="section-description">Developer-focused patterns from Vercel, Linear, and GitHub dashboards.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>

              {/* Changelog Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Changelog</div>
                <NeuronCard variant="default" padding="none">
                  <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <GitBranch size={14} style={{ color: 'var(--color-text-secondary)' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>What's New · v2.4.0</span>
                    <NeuronBadge size="sm" variant="success" style={{ marginLeft: 'auto' }}>Latest</NeuronBadge>
                  </div>
                  {[
                    { type: 'new', label: 'New', color: 'var(--emerald-600)', bg: 'var(--emerald-50)', msg: 'NeuronTooltip — 12 placement variants + focus trigger mode' },
                    { type: 'improved', label: 'Improved', color: 'var(--blue-600)', bg: 'var(--blue-50)', msg: 'Glassmorphism card ambient glow now uses brand color tokens' },
                    { type: 'fix', label: 'Fix', color: 'var(--amber-700)', bg: 'var(--amber-50)', msg: 'Arrow anchor offset corrected for -start / -end placements' },
                    { type: 'new', label: 'New', color: 'var(--emerald-600)', bg: 'var(--emerald-50)', msg: 'Playground code generator — Vue, React, HTML tabs' },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ padding: '12px 18px', display: 'flex', alignItems: 'flex-start', gap: 10, borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: item.color, background: item.bg, padding: '2px 7px', borderRadius: 4, flexShrink: 0, marginTop: 1 }}>{item.label}</span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{item.msg}</span>
                    </div>
                  ))}
                  <div style={{ padding: '10px 18px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ fontSize: '12px', color: 'var(--brand-600)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      Full changelog <ChevronRight size={12} />
                    </button>
                  </div>
                </NeuronCard>
              </div>

              {/* Deploy Status Card */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deploy Status</div>
                <NeuronCard variant="elevated" padding="md" hoverEffect="border">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Production · neudela.design</span>
                    </div>
                    <NeuronBadge size="sm" variant="success">Ready</NeuronBadge>
                  </div>

                  {[
                    { label: 'Branch', val: 'main', icon: <GitBranch size={12} /> },
                    { label: 'Commit', val: 'fix: glass gradient token', icon: <Check size={12} /> },
                    { label: 'Build time', val: '23s', icon: <Zap size={12} /> },
                    { label: 'Region', val: 'sin1 · Jakarta', icon: <Globe size={12} /> },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none', fontSize: '12px' }}>
                      <span style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>{row.icon}{row.label}</span>
                      <span style={{ fontWeight: 500, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px' }}>{row.val}</span>
                    </div>
                  ))}

                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    <NeuronButton size="xs" variant="outline" style={{ flex: 1, justifyContent: 'center' }}>View logs</NeuronButton>
                    <NeuronButton size="xs" variant="primary" style={{ flex: 1, justifyContent: 'center' }}>Visit site <ArrowRight size={12} /></NeuronButton>
                  </div>
                </NeuronCard>
              </div>

            </div>
          </div>


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
        prev={{ id: 'comp-button-group', label: t.nav.compButtonGroup }}
        next={{ id: 'comp-checkbox', label: t.nav.compCheckbox }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
