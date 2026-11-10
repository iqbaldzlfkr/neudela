import React, { useState, useEffect } from 'react';
import NeuronButton from '../../components/NeuronButton';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronTooltip from '../../components/NeuronTooltip';
import NeuronSelect from '../../components/NeuronSelect';
import type { HeaderVariantId } from './HeaderPatternView';
import { HEADER_VARIANTS } from './HeaderPatternView';
import {
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  PanelTop,
  Search,
  Bell,
  ChevronDown,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Zap,
  Globe,
  ShoppingCart,
  LogOut,
  User,
  CreditCard,
  Command,
  Layers,
  Package,
  LayoutGrid,
  Star,
  Bookmark,
  Check,
  X,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Menu,
} from 'lucide-react';

interface StandaloneHeaderPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function StandaloneHeaderPreview({
  variantId = 'classic-saas',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneHeaderPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<HeaderVariantId>(
    (variantId as HeaderVariantId) || 'classic-saas'
  );

  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    if (variantId) {
      setActiveVariant(variantId as HeaderVariantId);
    }
  }, [variantId]);

  // Variant metadata

  // ── Variant 1: Classic SaaS state
  const [saasActiveNav, setSaasActiveNav] = useState('dashboard');
  const [saasUserMenuOpen, setSaasUserMenuOpen] = useState(false);
  const [saasNotifOpen, setSaasNotifOpen] = useState(false);

  // ── Variant 2: Minimal Centered state
  const [minimalActiveNav, setMinimalActiveNav] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Variant 3: Dashboard Topbar state
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState('Acme Corp');

  // ── Variant 4: Mega Menu state
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);

  // ── Variant 5: Command Bar state
  const [cmdQuery, setCmdQuery] = useState('');
  const [cmdFocused, setCmdFocused] = useState(false);

  // ── Variant 6: Marketing Nav state
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // ── Variant 7: E-commerce state
  const [cartCount, setCartCount] = useState(3);
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [ecomCategory, setEcomCategory] = useState('all');
  const [ecomSearchFocused, setEcomSearchFocused] = useState(false);

  // ── Variant 8: Docs Navbar state
  const [docsVersion] = useState('v0.2.1');
  const [docsActiveSection, setDocsActiveSection] = useState('guide');
  const [docsSidebarItem, setDocsSidebarItem] = useState('overview');
  const [docsSearch, setDocsSearch] = useState('');
  const [docsFocused, setDocsFocused] = useState(false);

  const currentMeta = HEADER_VARIANTS.find(v => v.id === activeVariant) || HEADER_VARIANTS[0];

  // Viewport width styling
  const getViewportContainerStyle = (): React.CSSProperties => {
    switch (viewportMode) {
      case 'tablet':
        return {
          width: '768px',
          maxWidth: '100%',
          height: '100%',
          margin: '0 auto',
          borderLeft: '1px solid var(--color-border)',
          borderRight: '1px solid var(--color-border)',
          boxShadow: '0 0 40px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-canvas)',
          overflowY: 'auto',
          position: 'relative',
        };
      case 'mobile':
        return {
          width: '420px',
          maxWidth: '100%',
          height: '100%',
          margin: '0 auto',
          borderLeft: '1px solid var(--color-border)',
          borderRight: '1px solid var(--color-border)',
          boxShadow: '0 0 50px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-canvas)',
          overflowY: 'auto',
          position: 'relative',
        };
      case 'desktop':
      default:
        return {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-canvas)',
          overflowY: 'auto',
          position: 'relative',
        };
    }
  };

  return (
    <div
      className={`standalone-header-app ${isDarkMode ? 'dark-theme' : ''}`}
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
            <span style={{ color: '#94a3b8' }}>Header Pattern:</span>
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
              options={HEADER_VARIANTS.map((v) => ({
                value: v.id,
                label: v.nameEn,
                description: v.badge,
              }))}
              value={activeVariant}
              onChange={(val) => setActiveVariant(val as HeaderVariantId)}
              leadingIcon={<PanelTop size={13} />}
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

      {/* ── Main Application Viewport Shell ── */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          background: isDarkMode ? '#060a12' : '#e2e8f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <div style={getViewportContainerStyle()}>

          {/* ════════════════════════════════════════════════════════
              VARIANT 1: CLASSIC SAAS TOPBAR
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'classic-saas' && (
            <>
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: viewportMode === 'mobile' ? '0 12px' : '0 24px',
                  height: 62,
                  display: 'flex',
                  alignItems: 'center',
                  gap: viewportMode === 'mobile' ? 10 : 20,
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  flexShrink: 0,
                }}
              >
                {/* Logo & Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: 'linear-gradient(135deg, #df7e30, #b25816)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 15,
                    }}
                  >
                    N
                  </div>
                  {viewportMode !== 'mobile' && (
                    <>
                      <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-text-primary)' }}>Neudela</span>
                      <NeuronBadge size="xs" variant="brand">Pro</NeuronBadge>
                    </>
                  )}
                </div>

                {/* Nav Links */}
                {viewportMode !== 'mobile' && (
                  <nav style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
                      { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={15} /> },
                      { id: 'customers', label: 'Customers', icon: <Users size={15} /> },
                      { id: 'settings', label: 'Settings', icon: <Settings size={15} /> },
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setSaasActiveNav(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 12px',
                          borderRadius: 8,
                          border: 'none',
                          background: saasActiveNav === item.id ? 'rgba(223, 126, 48, 0.1)' : 'transparent',
                          color: saasActiveNav === item.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          fontSize: 13.5,
                          fontWeight: saasActiveNav === item.id ? 600 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </nav>
                )}

                {/* Right items: Search shortcut, Notification, User */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => setActiveVariant('command-bar')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-subtle)',
                      color: 'var(--color-text-tertiary)',
                      fontSize: 12.5,
                      cursor: 'pointer',
                    }}
                  >
                    <Search size={14} />
                    {viewportMode === 'desktop' && <span>Search features…</span>}
                    <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10 }}>⌘K</kbd>
                  </button>

                  {/* Notification Bell */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setSaasNotifOpen(!saasNotifOpen)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                        position: 'relative',
                      }}
                    >
                      <Bell size={16} />
                      <span
                        style={{
                          position: 'absolute',
                          top: 5,
                          right: 5,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#ef4444',
                          border: '2px solid var(--color-bg-surface)',
                        }}
                      />
                    </button>

                    {saasNotifOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          width: 290,
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 12,
                          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                          padding: 12,
                          zIndex: 100,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid var(--color-border)' }}>
                          <span style={{ fontWeight: 700, fontSize: 13 }}>Notifications</span>
                          <span style={{ fontSize: 11, color: 'var(--color-primary)', cursor: 'pointer' }}>Mark all read</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div style={{ padding: 8, borderRadius: 8, background: 'var(--color-bg-subtle)', fontSize: 12 }}>
                            <div style={{ fontWeight: 600 }}>🚀 Deploy succeeded</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: 11 }}>Production v2.4 live 5 mins ago</div>
                          </div>
                          <div style={{ padding: 8, borderRadius: 8, background: 'var(--color-bg-subtle)', fontSize: 12 }}>
                            <div style={{ fontWeight: 600 }}>💳 Invoice paid</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: 11 }}>Team plan renewed ($120.00)</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Profile Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setSaasUserMenuOpen(!saasUserMenuOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 3,
                        borderRadius: 8,
                      }}
                    >
                      <NeuronAvatar name="Iqbal Dzulfikar" size="sm" status="online" />
                      {viewportMode === 'desktop' && (
                        <>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</div>
                            <div style={{ fontSize: 10.5, color: 'var(--color-text-tertiary)' }}>Administrator</div>
                          </div>
                          <ChevronDown size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                        </>
                      )}
                    </button>

                    {saasUserMenuOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          width: 220,
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 12,
                          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                          padding: 6,
                          zIndex: 100,
                        }}
                      >
                        <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--color-border)', marginBottom: 4 }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>Iqbal Dzulfikar</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>iqbal.dzulfikar@neudela.dev</div>
                        </div>
                        {[
                          { icon: <User size={14} />, label: 'My Profile' },
                          { icon: <CreditCard size={14} />, label: 'Billing & Plans' },
                          { icon: <Settings size={14} />, label: 'Preferences' },
                        ].map(item => (
                          <button
                            key={item.label}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              width: '100%',
                              padding: '8px 10px',
                              borderRadius: 6,
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              fontSize: 12.5,
                              color: 'var(--color-text-secondary)',
                              textAlign: 'left',
                            }}
                          >
                            {item.icon} {item.label}
                          </button>
                        ))}
                        <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: 6,
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: 12.5,
                            color: '#ef4444',
                            textAlign: 'left',
                          }}
                        >
                          <LogOut size={14} /> Log Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Page Content: Dashboard metrics */}
              <div style={{ padding: viewportMode === 'mobile' ? '16px' : '28px 32px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
                      Executive Analytics Overview
                    </h1>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                      Real-time operational metrics across active production workspaces.
                    </p>
                  </div>
                  <NeuronButton size="sm" variant="primary" leadingIcon={<Plus size={14} />}>
                    Create Project
                  </NeuronButton>
                </div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: viewportMode === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, marginBottom: 24 }}>
                  {[
                    { label: 'Total Revenue', val: '$48,290.40', trend: '+14.2%', icon: <TrendingUp size={16} color="#10b981" /> },
                    { label: 'Active Sessions', val: '12,480', trend: '+8.1%', icon: <Users size={16} color="#0ea5e9" /> },
                    { label: 'Conversion Rate', val: '4.82%', trend: '+1.4%', icon: <Zap size={16} color="#8b5cf6" /> },
                    { label: 'Avg Server Latency', val: '24ms', trend: '-6ms', icon: <Clock size={16} color="#df7e30" /> },
                  ].map(kpi => (
                    <div
                      key={kpi.label}
                      style={{
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 12,
                        padding: '16px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: 12, marginBottom: 8 }}>
                        <span>{kpi.label}</span>
                        {kpi.icon}
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>{kpi.val}</div>
                      <div style={{ fontSize: 11.5, color: '#10b981', fontWeight: 600, marginTop: 4 }}>
                        {kpi.trend} vs last month
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Transactions Table */}
                <div
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 12,
                    padding: '20px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Recent Workspace Activity</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { user: 'Iqbal Dzulfikar', action: 'Deployed commit d8a9f2 to staging', time: '4m ago', status: 'Success' },
                      { user: 'Marcus Vance', action: 'Generated quarterly revenue export', time: '18m ago', status: 'Completed' },
                      { user: 'Elena Rostova', action: 'Updated security access rules for API gateway', time: '42m ago', status: 'Success' },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: 8,
                          background: 'var(--color-bg-subtle)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <NeuronAvatar name={row.user} size="sm" />
                          <div>
                            <span style={{ fontWeight: 600, fontSize: 13 }}>{row.user}</span>
                            <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>{row.action}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>{row.time}</span>
                          <NeuronBadge size="xs" variant="success">{row.status}</NeuronBadge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 2: MINIMAL CENTERED HEADER
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'minimal-centered' && (
            <>
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 28px',
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  flexShrink: 0,
                }}
              >
                {/* Left Nav */}
                {viewportMode !== 'mobile' ? (
                  <nav style={{ display: 'flex', gap: 6, flex: 1 }}>
                    {['Product', 'Customers', 'Pricing'].map(item => (
                      <button
                        key={item}
                        onClick={() => setMinimalActiveNav(item)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 8,
                          border: 'none',
                          background: minimalActiveNav === item ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                          color: minimalActiveNav === item ? '#6366f1' : 'var(--color-text-secondary)',
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                ) : (
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}
                  >
                    <Menu size={20} />
                  </button>
                )}

                {/* Center Brand Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    ✦
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.3px', color: 'var(--color-text-primary)' }}>
                    Zenith
                  </span>
                </div>

                {/* Right Nav & CTA */}
                <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                  {viewportMode !== 'mobile' && (
                    <>
                      <button
                        onClick={() => setMinimalActiveNav('Docs')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 8,
                          border: 'none',
                          background: minimalActiveNav === 'Docs' ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                          color: minimalActiveNav === 'Docs' ? '#6366f1' : 'var(--color-text-secondary)',
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        Docs
                      </button>
                      <button
                        onClick={() => setMinimalActiveNav('Blog')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: 8,
                          border: 'none',
                          background: minimalActiveNav === 'Blog' ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                          color: minimalActiveNav === 'Blog' ? '#6366f1' : 'var(--color-text-secondary)',
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        Blog
                      </button>
                      <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 4px' }} />
                    </>
                  )}
                  <NeuronButton size="sm" variant="text">Sign In</NeuronButton>
                  <NeuronButton size="sm" variant="primary">Get Started →</NeuronButton>
                </div>
              </header>

              {/* Page Content: Minimal Landing Section */}
              <div style={{ padding: viewportMode === 'mobile' ? '32px 16px' : '64px 32px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
                <NeuronBadge size="sm" variant="brand" style={{ marginBottom: 16 }}>
                  ✨ Version 3.0 Public Beta
                </NeuronBadge>
                <h1 style={{ fontSize: viewportMode === 'mobile' ? 28 : 42, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px' }}>
                  The cleanest way to build software together.
                </h1>
                <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 28px' }}>
                  A streamlined, intentional design system crafted for modern development teams. Zero bloat, instant clarity.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <NeuronButton size="md" variant="primary">Start Building Now</NeuronButton>
                  <NeuronButton size="md" variant="secondary">Read Documentation</NeuronButton>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 3: DASHBOARD TOPBAR WITH WORKSPACE
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'dashboard-topbar' && (
            <>
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 20px',
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  position: 'sticky',
                  top: 0,
                  zIndex: 40,
                  flexShrink: 0,
                }}
              >
                {/* Workspace Switcher */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setWorkspaceOpen(!workspaceOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 10px',
                      borderRadius: 8,
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-subtle)',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        background: '#0ea5e9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      {activeWorkspace[0]}
                    </div>
                    {activeWorkspace}
                    <ChevronDown size={13} style={{ color: 'var(--color-text-tertiary)' }} />
                  </button>

                  {workspaceOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        width: 200,
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 10,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                        padding: 6,
                        zIndex: 100,
                      }}
                    >
                      {['Acme Corp', 'Studio Lab', 'Beta Projects'].map((w, i) => (
                        <button
                          key={w}
                          onClick={() => {
                            setActiveWorkspace(w);
                            setWorkspaceOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            width: '100%',
                            padding: '7px 10px',
                            borderRadius: 7,
                            border: 'none',
                            background: activeWorkspace === w ? 'rgba(14,165,233,0.08)' : 'transparent',
                            cursor: 'pointer',
                            fontSize: 13,
                            color: activeWorkspace === w ? '#0ea5e9' : 'var(--color-text-secondary)',
                          }}
                        >
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 4,
                              background: ['#0ea5e9', '#8b5cf6', '#10b981'][i],
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontSize: 9,
                              fontWeight: 800,
                            }}
                          >
                            {w[0]}
                          </div>
                          {w}
                          {activeWorkspace === w && <Check size={12} style={{ marginLeft: 'auto', color: '#0ea5e9' }} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ width: 1, height: 20, background: 'var(--color-border)' }} />

                {/* Breadcrumbs */}
                {viewportMode !== 'mobile' && (
                  <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {['Workspace', 'Projects', 'Q4 Analytics'].map((crumb, i, arr) => (
                      <React.Fragment key={crumb}>
                        <span
                          style={{
                            fontSize: 13,
                            color: i === arr.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                            fontWeight: i === arr.length - 1 ? 600 : 400,
                          }}
                        >
                          {crumb}
                        </span>
                        {i < arr.length - 1 && <span style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>/</span>}
                      </React.Fragment>
                    ))}
                  </nav>
                )}

                {/* Right controls */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Saved 2m ago</span>
                  <NeuronButton size="sm" variant="text">Share</NeuronButton>
                  <NeuronButton size="sm" variant="primary">Publish</NeuronButton>
                  <NeuronAvatar name="Iqbal Dzulfikar" size="sm" status="online" />
                </div>
              </header>

              {/* Workspace Body */}
              <div style={{ padding: '24px', flex: 1 }}>
                <div style={{ border: '2px dashed var(--color-border)', borderRadius: 14, padding: 32, textAlign: 'center', background: 'var(--color-bg-surface)' }}>
                  <LayoutGrid size={32} style={{ color: '#0ea5e9', marginBottom: 12 }} />
                  <h3 style={{ margin: '0 0 6px', fontSize: 18 }}>{activeWorkspace} Project Canvas</h3>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 13 }}>
                    Connected to synchronized live state. Changes made here persist across team members.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 4: ENTERPRISE MEGA MENU HEADER
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'mega-menu' && (
            <>
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 24px',
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  flexShrink: 0,
                }}
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>
                    N
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)' }}>Neudela</span>
                </div>

                {viewportMode !== 'mobile' && (
                  <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
                    {['Products', 'Solutions', 'Resources'].map(menu => (
                      <button
                        key={menu}
                        onMouseEnter={() => setMegaMenuOpen(menu)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '6px 14px',
                          borderRadius: 8,
                          border: 'none',
                          background: megaMenuOpen === menu ? 'rgba(16,185,129,0.08)' : 'transparent',
                          color: megaMenuOpen === menu ? '#10b981' : 'var(--color-text-secondary)',
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {menu} <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: megaMenuOpen === menu ? 'rotate(180deg)' : 'none' }} />
                      </button>
                    ))}
                    <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                      Pricing
                    </button>
                  </nav>
                )}

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <NeuronButton size="sm" variant="text">Sign In</NeuronButton>
                  <NeuronButton size="sm" variant="primary">Start Free Trial</NeuronButton>
                </div>

                {/* Mega Menu Dropdown */}
                {megaMenuOpen === 'Products' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      background: 'var(--color-bg-surface)',
                      borderBottom: '1px solid var(--color-border)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                      padding: '24px 32px',
                      display: 'flex',
                      gap: 36,
                      zIndex: 200,
                    }}
                  >
                    {[
                      {
                        title: 'Platform',
                        items: [
                          { icon: <LayoutGrid size={15} />, label: 'Dashboard Builder', desc: 'Drag-and-drop analytics' },
                          { icon: <Layers size={15} />, label: 'Data Pipeline', desc: 'ETL & streaming ingestion' },
                          { icon: <Package size={15} />, label: 'Component SDK', desc: 'Reusable UI primitives' },
                        ],
                      },
                      {
                        title: 'Integrations',
                        items: [
                          { icon: <Globe size={15} />, label: 'API Gateway', desc: 'Unified REST & GraphQL' },
                          { icon: <Zap size={15} />, label: 'Webhooks', desc: 'Real-time event streams' },
                        ],
                      },
                    ].map(cat => (
                      <div key={cat.title} style={{ minWidth: 220 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: 12 }}>
                          {cat.title}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {cat.items.map(item => (
                            <button
                              key={item.label}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                                padding: '8px 10px',
                                borderRadius: 8,
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                textAlign: 'left',
                              }}
                            >
                              <div style={{ width: 30, height: 30, borderRadius: 6, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                                {item.icon}
                              </div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.label}</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{item.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* What's New section card */}
                    <div
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04))',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 12,
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <NeuronBadge variant="success" size="sm">New</NeuronBadge>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 8, marginBottom: 6 }}>
                          What's New in v2.0
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          Neudela 2.0 ships with dark mode, 40+ new components, and enhanced token system.
                        </div>
                      </div>
                      <button
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          fontSize: 13,
                          color: '#10b981',
                          fontWeight: 600,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          marginTop: 16,
                        }}
                      >
                        Read release notes <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </header>

              {/* Mega menu landing showcase */}
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <span style={{ fontSize: 13, color: '#10b981', fontWeight: 700 }}>NEUDELA ENTERPRISE SUITE</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, margin: '8px 0 14px' }}>Hover over 'Products' in the header above</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto', fontSize: 14 }}>
                  Inspect the multi-column mega menu dropdown panel designed for expansive enterprise software architectures.
                </p>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 5: COMMAND BAR HEADER (⌘K HUB)
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'command-bar' && (
            <>
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 24px',
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  flexShrink: 0,
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-brand, #df7e30), #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                  <Command size={18} />
                </div>

                {/* Command Bar Center input */}
                <div style={{ flex: 1, position: 'relative', maxWidth: 560, margin: '0 auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      height: 40,
                      borderRadius: 10,
                      border: `1.5px solid ${cmdFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}`,
                      background: cmdFocused ? 'rgba(223, 126, 48, 0.04)' : 'var(--color-bg-subtle)',
                      boxShadow: cmdFocused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
                      padding: '0 14px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Command size={16} style={{ color: cmdFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)' }} />
                    <input
                      value={cmdQuery}
                      onChange={(e) => setCmdQuery(e.target.value)}
                      onFocus={() => setCmdFocused(true)}
                      onBlur={() => setTimeout(() => setCmdFocused(false), 200)}
                      placeholder="Type a command or search… (⌘K)"
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontSize: 13.5,
                        color: 'var(--color-text-primary)',
                      }}
                    />
                    <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10, color: 'var(--color-text-tertiary)' }}>⌘K</kbd>
                  </div>

                  {/* Command Dropdown Suggestions */}
                  {cmdFocused && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        right: 0,
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 10,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                        padding: 8,
                        zIndex: 100,
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', padding: '4px 8px' }}>QUICK ACTIONS</div>
                      {[
                        { label: 'Create new project workspace', shortcut: '⌘N' },
                        { label: 'Invite collaborators to team', shortcut: '⌘I' },
                        { label: 'Export telemetry report to CSV', shortcut: '⌘E' },
                      ].map((action, idx) => (
                        <div
                          key={action.label}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 10px',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontSize: 13,
                            background: idx === 0 ? 'rgba(223, 126, 48, 0.08)' : 'transparent',
                            color: idx === 0 ? 'var(--color-brand, #df7e30)' : 'var(--color-text-primary)',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(223, 126, 48, 0.1)';
                            e.currentTarget.style.color = 'var(--color-brand, #df7e30)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = idx === 0 ? 'rgba(223, 126, 48, 0.08)' : 'transparent';
                            e.currentTarget.style.color = idx === 0 ? 'var(--color-brand, #df7e30)' : 'var(--color-text-primary)';
                          }}
                        >
                          <span>{action.label}</span>
                          <kbd style={{ background: 'var(--color-bg-subtle)', padding: '1px 5px', borderRadius: 4, fontSize: 10, color: 'var(--color-text-tertiary)' }}>{action.shortcut}</kbd>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <NeuronAvatar name="Iqbal Dzulfikar" size="sm" />
                </div>
              </header>

              <div style={{ padding: '32px 24px', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: 24 }}>
                  <h3 style={{ margin: '0 0 8px' }}>Keyboard-First Navigation Experience</h3>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 13.5 }}>
                    Click the command bar above or press ⌘K to open keyboard actions. Designed for developer hubs and power user workflows.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 6: MARKETING NAV WITH ANNOUNCEMENT
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'marketing-nav' && (
            <>
              {showAnnouncement && (
                <div
                  style={{
                    background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                    color: '#fff',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <span>
                    🎉 <strong>Neudela 3.0 Launch:</strong> Explore our new component patterns suite.{' '}
                    <span style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>See release notes →</span>
                  </span>
                  <button
                    onClick={() => setShowAnnouncement(false)}
                    style={{ position: 'absolute', right: 12, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 28px',
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                    ★
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 16 }}>Neudela</span>
                </div>

                {viewportMode !== 'mobile' && (
                  <nav style={{ display: 'flex', gap: 16, marginLeft: 16 }}>
                    {['Features', 'Integrations', 'Pricing', 'Changelog'].map(item => (
                      <button key={item} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                        {item}
                      </button>
                    ))}
                  </nav>
                )}

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                  {viewportMode === 'desktop' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                      <div style={{ display: 'flex' }}>{[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />)}</div>
                      <span style={{ fontWeight: 700 }}>4.9/5</span>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>(2.4k reviews)</span>
                    </div>
                  )}
                  <NeuronButton size="sm" variant="text">Log In</NeuronButton>
                  <NeuronButton size="sm" variant="primary">Start Free Trial</NeuronButton>
                </div>
              </header>

              <div style={{ padding: '60px 24px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
                <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>
                  Supercharge your user experience with prebuilt design patterns.
                </h1>
                <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', margin: '0 0 24px' }}>
                  Everything you need to ship world-class software interfaces in days, not months.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <NeuronButton size="md" variant="primary">Get Started Free</NeuronButton>
                  <NeuronButton size="md" variant="secondary">Book Demo</NeuronButton>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 7: E-COMMERCE STOREFRONT HEADER
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'ecommerce-header' && (
            <>
              {/* Promo ribbon */}
              <div
                style={{
                  background: 'linear-gradient(90deg, rgba(223, 126, 48, 0.12), rgba(194, 101, 30, 0.06))',
                  borderBottom: '1px solid rgba(223, 126, 48, 0.18)',
                  padding: '6px 0',
                  textAlign: 'center',
                  fontSize: 12.5,
                  color: 'var(--color-brand, #df7e30)',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                🎁 Free express delivery on orders over <strong>Rp 500.000</strong> · Code: <strong>NEUDELA20</strong>
              </div>

              {/* Main Storefront Header */}
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 24px',
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-brand, #df7e30), #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                    <ShoppingBagIcon />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--color-text-primary)' }}>NeuStore</span>
                </div>

                {/* Search in Categories */}
                {viewportMode !== 'mobile' && (
                  <div style={{ flex: 1, maxWidth: 540, margin: '0 20px', position: 'relative' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: ecomSearchFocused ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
                      border: `1.5px solid ${ecomSearchFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}`,
                      boxShadow: ecomSearchFocused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
                      borderRadius: 10,
                      height: 40,
                      padding: '0 4px 0 12px',
                      transition: 'all 0.2s ease',
                    }}>
                      <Search size={15} style={{ color: ecomSearchFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)', marginRight: 8, flexShrink: 0 }} />
                      <input
                        onFocus={() => setEcomSearchFocused(true)}
                        onBlur={() => setEcomSearchFocused(false)}
                        placeholder="Search sneakers, apparel, bags…"
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: 13,
                          color: 'var(--color-text-primary)',
                          minWidth: 0,
                        }}
                      />
                      {/* Vertical separator */}
                      <div style={{ width: 1, height: 18, background: 'var(--color-border)', margin: '0 8px', flexShrink: 0 }} />
                      {/* Category select with custom icon */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <select
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            border: 'none',
                            background: 'transparent',
                            fontSize: 12,
                            fontWeight: 500,
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            outline: 'none',
                            paddingRight: 16,
                            paddingLeft: 2,
                          }}
                        >
                          <option>All Categories</option>
                          <option>Footwear</option>
                          <option>Apparel</option>
                          <option>Accessories</option>
                        </select>
                        <ChevronDown size={11} style={{ position: 'absolute', right: 2, pointerEvents: 'none', color: 'var(--color-text-tertiary)' }} />
                      </div>
                      {/* Search submit button */}
                      <button
                        style={{
                          height: 32,
                          padding: '0 12px',
                          borderRadius: 7,
                          border: 'none',
                          background: 'var(--color-brand, #df7e30)',
                          color: '#fff',
                          fontSize: 12.5,
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          marginLeft: 6,
                          flexShrink: 0,
                          transition: 'filter 0.15s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                      >
                        <Search size={13} />
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Right: Currency, Wishlist, Cart, User */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <div style={{ width: 110 }}>
                    <NeuronSelect
                      size="sm"
                      value={currency}
                      onChange={(val) => setCurrency(val as any)}
                      options={[
                        { value: 'IDR', label: 'IDR (Rp)' },
                        { value: 'USD', label: 'USD ($)' },
                      ]}
                      leadingType="icon"
                      leadingIcon={<Globe size={13} />}
                    />
                  </div>

                  {/* Wishlist Button */}
                  <NeuronTooltip content="Wishlist" placement="bottom">
                    <button
                      style={{
                        position: 'relative',
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid var(--color-border)',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--color-text-secondary)',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-brand, #df7e30)';
                        e.currentTarget.style.color = 'var(--color-brand, #df7e30)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}
                    >
                      <Bookmark size={16} />
                      <span style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: 'var(--color-brand, #df7e30)',
                        color: '#fff',
                        fontSize: 9,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}>
                        7
                      </span>
                    </button>
                  </NeuronTooltip>

                  {/* Cart Button */}
                  <button
                    onClick={() => setCartCount(c => c + 1)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      height: 36,
                      padding: '0 14px',
                      borderRadius: 8,
                      background: 'var(--color-brand, #df7e30)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 13,
                      boxShadow: '0 2px 8px rgba(223, 126, 48, 0.25)',
                      transition: 'filter 0.15s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                  >
                    <ShoppingCart size={15} />
                    <span>Cart</span>
                    <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 10, padding: '1px 6px', fontSize: 11, fontWeight: 700 }}>
                      {cartCount}
                    </span>
                  </button>

                  <NeuronAvatar name="Iqbal Dzulfikar" size="sm" />
                </div>
              </header>

              {/* Sub-Category Navigation Bar (Clean Flush Tabs) */}
              <nav
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 24px',
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  flexShrink: 0,
                  overflowX: 'auto',
                }}
              >
                {['All Items', 'New Arrivals', 'Men', 'Women', 'Accessories', 'Sale 🔥'].map((cat, i) => {
                  const isSelected = ecomCategory === cat || (ecomCategory === 'all' && i === 0);
                  return (
                    <button
                      key={cat}
                      onClick={() => setEcomCategory(cat)}
                      style={{
                        height: 44,
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0 16px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: isSelected ? '2.5px solid var(--color-brand, #df7e30)' : '2.5px solid transparent',
                        marginBottom: -1,
                        borderRadius: 0,
                        color: isSelected ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: 13.5,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.color = 'var(--color-text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ⚡ Flash Deals end in <strong style={{ color: 'var(--color-brand, #df7e30)' }}>04:18:22</strong>
                  </span>
                </div>
              </nav>

              {/* Storefront Products Grid */}
              <div style={{ padding: '24px', flex: 1 }}>
                <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Featured Products</h3>
                <div style={{ display: 'grid', gridTemplateColumns: viewportMode === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {[
                    { name: 'Neudela Tech Runner', price: 'Rp 1.250.000', tag: 'Bestseller' },
                    { name: 'Minimal Canvas Backpack', price: 'Rp 650.000', tag: 'New' },
                    { name: 'Waterproof Storm Jacket', price: 'Rp 1.850.000', tag: 'Sale' },
                    { name: 'Studio Audio Headphones', price: 'Rp 2.450.000', tag: 'Limited' },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 12,
                        padding: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div style={{ height: 110, borderRadius: 8, background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                        👟
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-brand, #df7e30)', fontWeight: 700 }}>{p.tag}</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-brand, #df7e30)' }}>{p.price}</div>
                      <NeuronButton
                        size="xs"
                        variant="primary"
                        onClick={() => setCartCount(c => c + 1)}
                        style={{ marginTop: 'auto', background: 'var(--color-brand, #df7e30)' }}
                      >
                        + Add to Cart
                      </NeuronButton>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              VARIANT 8: DEVELOPER DOCUMENTATION NAVBAR
          ════════════════════════════════════════════════════════ */}
          {activeVariant === 'docs-navbar' && (
            <>
              <header
                style={{
                  background: 'var(--color-bg-surface)',
                  borderBottom: '1px solid var(--color-border)',
                  padding: '0 24px',
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  position: 'sticky',
                  top: 0,
                  zIndex: 50,
                  flexShrink: 0,
                }}
              >
                {/* Brand + Version Badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-brand, #df7e30), #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>
                    N
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)' }}>Neudela</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-brand, #df7e30)', background: 'rgba(223, 126, 48, 0.1)', border: '1px solid rgba(223, 126, 48, 0.25)', borderRadius: 5, padding: '2px 7px' }}>
                      {docsVersion}
                    </span>
                    <NeuronBadge size="xs" variant="brand">Stable</NeuronBadge>
                  </div>
                </div>

                {/* Section Navigation Tabs */}
                {viewportMode !== 'mobile' && (
                  <nav style={{ display: 'flex', gap: 0, flex: 1, height: 60, overflowX: 'auto' }}>
                    {['Guide', 'API Reference', 'Components', 'Changelog'].map(sec => {
                      const key = sec.toLowerCase();
                      const isActive = docsActiveSection === key;
                      return (
                        <button
                          key={sec}
                          onClick={() => setDocsActiveSection(key)}
                          style={{
                            height: 60,
                            padding: '0 16px',
                            border: 'none',
                            background: 'transparent',
                            fontSize: 13.5,
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            borderBottom: isActive ? '2px solid var(--color-brand, #df7e30)' : '2px solid transparent',
                            transition: 'all 0.15s ease',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
                          }}
                        >
                          {sec}
                        </button>
                      );
                    })}
                  </nav>
                )}

                {/* Right: Search & GitHub Stars */}
                <div style={{ marginLeft: viewportMode === 'mobile' ? 'auto' : 0, display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 12px',
                    borderRadius: 8,
                    border: `1.5px solid ${docsFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}`,
                    background: docsFocused ? 'rgba(223, 126, 48, 0.04)' : 'var(--color-bg-subtle)',
                    boxShadow: docsFocused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
                    minWidth: viewportMode === 'mobile' ? 120 : 180,
                    transition: 'all 0.2s ease',
                  }}>
                    <Search size={13} style={{ color: docsFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)', flexShrink: 0 }} />
                    <input
                      value={docsSearch}
                      onChange={e => setDocsSearch(e.target.value)}
                      onFocus={() => setDocsFocused(true)}
                      onBlur={() => setDocsFocused(false)}
                      placeholder="Search docs…"
                      style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: 'var(--color-text-primary)', flex: 1, minWidth: 0 }}
                    />
                    <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10, color: 'var(--color-text-tertiary)', fontFamily: 'monospace', flexShrink: 0 }}>⌘K</kbd>
                  </div>

                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '7px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-subtle)',
                      fontSize: 13,
                      cursor: 'pointer',
                      color: 'var(--color-text-secondary)',
                      flexShrink: 0,
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-brand, #df7e30)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  >
                    <div style={{ width: 16, height: 16, borderRadius: 3, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 9, color: '#fff', fontWeight: 800 }}>gh</span>
                    </div>
                    <Star size={13} style={{ color: '#f59e0b' }} />
                    <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>2.4k</span>
                  </button>
                </div>
              </header>

              {/* Docs Two-Column Layout */}
              <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {viewportMode !== 'mobile' && (
                  <aside style={{ width: 220, borderRight: '1px solid var(--color-border)', padding: '20px 16px', background: 'var(--color-bg-surface)', flexShrink: 0, overflowY: 'auto' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', marginBottom: 8, letterSpacing: '0.04em' }}>GETTING STARTED</div>
                    {['Overview', 'Installation', 'Color Tokens', '8pt Spatial Grid'].map(item => {
                      const key = item.toLowerCase().replace(/ /g, '-');
                      const isActive = docsSidebarItem === key;
                      return (
                        <button
                          key={item}
                          onClick={() => setDocsSidebarItem(key)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '7px 10px',
                            borderRadius: 6,
                            border: 'none',
                            background: isActive ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                            color: isActive ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: 12.5,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            marginBottom: 2,
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', marginTop: 16, marginBottom: 8, letterSpacing: '0.04em' }}>PATTERNS</div>
                    {['Header Navigation', 'Sidebar Navigation', 'Form Workflows'].map(item => {
                      const key = item.toLowerCase().replace(/ /g, '-');
                      const isActive = docsSidebarItem === key;
                      return (
                        <button
                          key={item}
                          onClick={() => setDocsSidebarItem(key)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '7px 10px',
                            borderRadius: 6,
                            border: 'none',
                            background: isActive ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                            color: isActive ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: 12.5,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            marginBottom: 2,
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </aside>
                )}

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <NeuronBadge size="xs" variant="brand">Documentation</NeuronBadge>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Updated today</span>
                  </div>
                  <h1 style={{ fontSize: 28, fontWeight: 800, margin: '8px 0 12px', color: 'var(--color-text-primary)' }}>
                    Header Navigation Architecture
                  </h1>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6, maxWidth: 700, marginBottom: 20 }}>
                    The Neudela Header Navigation pattern standardizes topbars across desktop and laptop viewports with a 60px baseline height and 8pt spatial grid. It unifies branding, global navigation tabs, interactive search, and repository statistics into a cohesive developer experience.
                  </p>
                  <pre style={{ background: '#0d1117', border: '1px solid var(--color-border)', borderRadius: 10, padding: 16, fontSize: 13, color: '#e6edf3', maxWidth: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                    <code>npm install neudela lucide-react</code>
                  </pre>
                </main>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
