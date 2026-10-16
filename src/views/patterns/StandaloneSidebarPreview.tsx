import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Plus,
  Folder,
  FolderOpen,
  FileCode,
  Sparkles,
  Layers,
  ArrowLeft,
  Sun,
  Moon,
  Sliders,
  PanelLeftClose,
  PanelLeftOpen,
  Cloud,
  Mail,
  Database,
  Compass,
  Workflow,
  CheckCircle2,
  Filter,
  Download,
  Store,
  ShoppingBag,
  TrendingUp,
  Package,
  Truck,
  Inbox,
  CheckSquare,
  Target,
  ListChecks,
  Lock,
  Check
} from 'lucide-react';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronButton from '../../components/NeuronButton';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronTooltip from '../../components/NeuronTooltip';
import NeuronInput from '../../components/NeuronInput';
import NeuronDivider from '../../components/NeuronDivider';
import type { SidebarVariantId } from './SidebarPatternView';

interface StandaloneSidebarPreviewProps {
  variantId?: string;
  onBackToDocs: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function StandaloneSidebarPreview({
  variantId = 'enterprise-suite',
  onBackToDocs,
  isDarkMode,
  setIsDarkMode,
}: StandaloneSidebarPreviewProps) {
  const [activeVariant, setActiveVariant] = useState<SidebarVariantId>(
    (variantId as SidebarVariantId) || 'enterprise-suite'
  );

  useEffect(() => {
    if (variantId) {
      setActiveVariant(variantId as SidebarVariantId);
    }
  }, [variantId]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [primaryModule, setPrimaryModule] = useState<'cloud' | 'mail' | 'db' | 'docs' | 'settings'>('cloud');
  const [srcOpen, setSrcOpen] = useState(true);
  const [compOpen, setCompOpen] = useState(true);
  const [stylesOpen, setStylesOpen] = useState(false);
  const [activeFile, setActiveFile] = useState('App.tsx');

  const variantTitles: Record<SidebarVariantId, string> = {
    'enterprise-suite': 'Enterprise Suite (Collapsible)',
    'compact-rail': 'Compact Icon Rail (Slim Mini)',
    'dual-tier': 'Dual-Tier Split Sidebar',
    'floating-dock': 'Floating Glassmorphic Dock',
    'workspace-tree': 'Workspace & File Tree (IDE Hub)',
    'ecommerce-merchant': 'E-Commerce & Merchant Console',
    'productivity-spaces': 'Command Hub & Productivity Spaces',
    'workflow-stepper': 'Guided Workflow & Lifecycle Stepper',
  };

  return (
    <div
      className={`standalone-sidebar-app ${isDarkMode ? 'dark-theme' : ''}`}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-canvas)',
        color: 'var(--color-text-primary)',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Top Floating Neudela Controller Banner ── */}
      <div
        style={{
          height: '42px',
          background: isDarkMode ? '#0a0f1d' : '#1e293b',
          color: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          fontSize: '12.5px',
          zIndex: 100,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          flexShrink: 0,
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#94a3b8' }}>Real Application Preview:</span>
            <strong style={{ color: '#df7e30' }}>{variantTitles[activeVariant]}</strong>
            <span
              style={{
                fontSize: '10px',
                background: 'rgba(223, 126, 48, 0.2)',
                color: '#df7e30',
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              100% Fullscreen
            </span>
          </div>
        </div>

        {/* Right: Variant Quick Switcher & Theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Ganti Varian:</span>
            <select
              value={activeVariant}
              onChange={(e) => setActiveVariant(e.target.value as SidebarVariantId)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '11.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="enterprise-suite" style={{ background: '#1e293b' }}>Enterprise Suite</option>
              <option value="compact-rail" style={{ background: '#1e293b' }}>Compact Icon Rail</option>
              <option value="dual-tier" style={{ background: '#1e293b' }}>Dual-Tier Split</option>
              <option value="floating-dock" style={{ background: '#1e293b' }}>Floating Dock</option>
              <option value="workspace-tree" style={{ background: '#1e293b' }}>Workspace Tree</option>
              <option value="ecommerce-merchant" style={{ background: '#1e293b' }}>E-Commerce Merchant</option>
              <option value="productivity-spaces" style={{ background: '#1e293b' }}>Productivity Spaces</option>
              <option value="workflow-stepper" style={{ background: '#1e293b' }}>Workflow Stepper</option>
            </select>
          </div>

          <NeuronButton
            size="xs"
            variant="secondary"
            iconOnly
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Light / Dark Mode"
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </NeuronButton>
        </div>
      </div>

      {/* ── Main Application Viewport Shell ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          background: activeVariant === 'floating-dock'
            ? (isDarkMode 
                ? 'radial-gradient(ellipse at 25% 40%, rgba(139, 92, 246, 0.35) 0%, rgba(15, 23, 42, 0.98) 60%)' 
                : 'radial-gradient(ellipse at 25% 40%, rgba(139, 92, 246, 0.2) 0%, #f8fafc 60%)')
            : 'var(--color-bg-canvas)',
        }}
      >
        
        {/* ════════════════════════════════════════════════════════
            VARIANT 1: ENTERPRISE SUITE
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'enterprise-suite' && (
          <aside
            style={{
              width: isCollapsed ? '70px' : '250px',
              height: '100%',
              background: 'var(--color-bg-surface)',
              borderRight: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxSizing: 'border-box',
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            {/* Workspace / Tenant Header */}
            <div style={{ padding: '14px', borderBottom: '1px solid var(--color-border)' }}>
              {!isCollapsed ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: '#df7e30', color: '#fff', fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      AC
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>Acme Corp</div>
                      <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>Enterprise</div>
                    </div>
                  </div>
                  <NeuronButton
                    size="xs"
                    variant="text"
                    iconOnly
                    onClick={() => setIsCollapsed(true)}
                    title="Collapse"
                    leadingIcon={<PanelLeftClose size={15} />}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 6, background: '#df7e30', color: '#fff', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    AC
                  </div>
                  <NeuronButton
                    size="xs"
                    variant="text"
                    iconOnly
                    onClick={() => setIsCollapsed(false)}
                    title="Expand"
                    leadingIcon={<PanelLeftOpen size={15} />}
                  />
                </div>
              )}
            </div>

            {!isCollapsed && (
              <>
                <div style={{ padding: '8px 8px 4px' }}>
                  <NeuronInput
                    placeholder="Search menu (⌘K)..."
                    leadingIcon={<Search size={13} />}
                    trailingText="⌘K"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div style={{ padding: '2px 8px' }}>
                  <NeuronDivider />
                </div>
              </>
            )}

            <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
              <RealNavItem icon={<LayoutDashboard size={17} />} label="Dashboard" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} collapsed={isCollapsed} />
              <RealNavItem icon={<BarChart3 size={17} />} label="Analytics" badge="Live" active={activeRoute === 'analytics'} onClick={() => setActiveRoute('analytics')} collapsed={isCollapsed} />
              <RealNavItem icon={<Users size={17} />} label="Customers" active={activeRoute === 'customers'} onClick={() => setActiveRoute('customers')} collapsed={isCollapsed} />
              <RealNavItem icon={<CreditCard size={17} />} label="Invoices" active={activeRoute === 'invoices'} onClick={() => setActiveRoute('invoices')} collapsed={isCollapsed} />
              <RealNavItem icon={<Settings size={17} />} label="Settings" active={activeRoute === 'settings'} onClick={() => setActiveRoute('settings')} collapsed={isCollapsed} />
            </nav>

            <div style={{ borderTop: '1px solid var(--color-border)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <NeuronAvatar name="Sarah Connor" size="sm" status="online" />
              {!isCollapsed && <span style={{ fontSize: 12, fontWeight: 600 }}>Sarah C.</span>}
            </div>
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 2: COMPACT ICON RAIL
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'compact-rail' && (
          <aside
            style={{
              width: '66px',
              height: '100%',
              background: 'var(--color-bg-surface)',
              borderRight: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '14px 0',
              gap: 8,
              boxSizing: 'border-box',
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: '#0ea5e9',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              N
            </div>

            <RealRailItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={activeRoute === 'dashboard'}
              accentColor="#0ea5e9"
              onClick={() => setActiveRoute('dashboard')}
            />
            <RealRailItem
              icon={<BarChart3 size={18} />}
              label="Analytics"
              active={activeRoute === 'analytics'}
              accentColor="#0ea5e9"
              onClick={() => setActiveRoute('analytics')}
            />
            <RealRailItem
              icon={<Users size={18} />}
              label="Customers"
              active={activeRoute === 'customers'}
              accentColor="#0ea5e9"
              onClick={() => setActiveRoute('customers')}
            />
            <div style={{ margin: '4px 0' }}>
              <NeuronTooltip content="Quick Create (+)" placement="right">
                <NeuronButton
                  size="sm"
                  variant="outline"
                  iconOnly
                  leadingIcon={<Plus size={16} />}
                  aria-label="Quick Create (+)"
                />
              </NeuronTooltip>
            </div>
            <div style={{ flex: 1 }} />
            <RealRailItem
              icon={<Settings size={18} />}
              label="Settings"
              active={activeRoute === 'settings'}
              accentColor="#0ea5e9"
              onClick={() => setActiveRoute('settings')}
            />
            <NeuronAvatar name="John Doe" size="xs" status="online" />
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 3: DUAL-TIER SPLIT SIDEBAR
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'dual-tier' && (
          <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
            {/* Primary Rail */}
            <aside
              style={{
                width: '64px',
                background: isDarkMode ? '#090d16' : '#0f172a',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 0',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 14,
                  marginBottom: 10,
                  boxShadow: '0 4px 12px rgba(16,185,129,0.35)',
                }}
              >
                DT
              </div>

              <RealRailItem
                icon={<Cloud size={19} />}
                label="Cloud Infrastructure"
                active={primaryModule === 'cloud'}
                accentColor="#10b981"
                onClick={() => setPrimaryModule('cloud')}
              />
              <RealRailItem
                icon={<Mail size={19} />}
                label="Event Messaging"
                badge="3"
                active={primaryModule === 'mail'}
                accentColor="#10b981"
                onClick={() => setPrimaryModule('mail')}
              />
              <RealRailItem
                icon={<Database size={19} />}
                label="Data Warehousing"
                active={primaryModule === 'db'}
                accentColor="#10b981"
                onClick={() => setPrimaryModule('db')}
              />
              <div style={{ flex: 1 }} />
              <RealRailItem
                icon={<Settings size={19} />}
                label="Config"
                active={primaryModule === 'settings'}
                accentColor="#10b981"
                onClick={() => setPrimaryModule('settings')}
              />
            </aside>

            {/* Contextual Subnav */}
            <aside
              style={{
                width: '240px',
                background: isDarkMode ? '#111827' : 'var(--color-bg-surface)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                boxSizing: 'border-box',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'capitalize' }}>
                    {primaryModule} Hub
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--color-text-tertiary)' }}>US-East Region (Active)</div>
                </div>
                <NeuronBadge size="xs" variant="success">Tier 2</NeuronBadge>
              </div>

              <div style={{ margin: '4px 0' }}>
                <NeuronInput
                  placeholder={`Search ${primaryModule}...`}
                  leadingIcon={<Search size={13} />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 4 }}>
                DEPLOYED WORKLOADS
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                {(primaryModule === 'cloud'
                  ? [
                      { id: 'k8s-prod-us', label: '#prod-k8s-us', status: 'Healthy', ping: '12ms' },
                      { id: 'k8s-staging-eu', label: '#staging-eu', status: 'Healthy', ping: '45ms' },
                      { id: 'redis-cache-tier', label: '#redis-cache', status: 'Optimal', ping: '4ms' },
                      { id: 'edge-gateway', label: '#edge-gateway', status: 'Syncing', ping: '8ms' },
                    ]
                  : [
                      { id: `${primaryModule}-primary`, label: `#${primaryModule}-primary`, status: 'Active', ping: '10ms' },
                      { id: `${primaryModule}-backup`, label: `#${primaryModule}-backup`, status: 'Standby', ping: '20ms' },
                    ]
                ).filter(r => !search || r.label.toLowerCase().includes(search.toLowerCase()))
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveRoute(item.id)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 6,
                      border: 'none',
                      background: activeRoute === item.id ? 'rgba(16, 185, 129, 0.14)' : 'transparent',
                      color: activeRoute === item.id ? '#10b981' : 'inherit',
                      textAlign: 'left',
                      fontSize: 12.5,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: activeRoute === item.id ? 600 : 400,
                    }}
                  >
                    <div>
                      <div>{item.label}</div>
                      <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>{item.ping}</div>
                    </div>
                    <span style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 600 }}>{item.status}</span>
                  </button>
                ))}
              </div>

              <NeuronButton size="xs" variant="outline" leadingIcon={<Plus size={12} />} style={{ width: '100%', marginTop: 'auto' }}>
                Add Resource
              </NeuronButton>
            </aside>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 4: FLOATING GLASSMORPHIC DOCK
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'floating-dock' && (
          <aside
            style={{
              width: '230px',
              margin: '18px 0 18px 18px',
              borderRadius: '20px',
              background: isDarkMode ? 'rgba(30, 27, 75, 0.65)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              boxShadow: '0 20px 45px -10px rgba(139, 92, 246, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxSizing: 'border-box',
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)' }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>Aura Studio</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>Floating Glass</div>
                </div>
              </div>
              <NeuronBadge size="xs" variant="brand">Glass Pro</NeuronBadge>
            </div>

            <div style={{ padding: '2px 0 6px 0' }}>
              <NeuronInput
                placeholder="Quick jump..."
                leadingIcon={<Search size={13} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
              <RealNavItem icon={<Compass size={17} />} label="Discover" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} collapsed={false} accentColor="#8b5cf6" />
              <RealNavItem icon={<Layers size={17} />} label="Components" badge="92" active={activeRoute === 'components'} onClick={() => setActiveRoute('components')} collapsed={false} accentColor="#8b5cf6" />
              <RealNavItem icon={<Sliders size={17} />} label="Theme Tokens" active={activeRoute === 'tokens'} onClick={() => setActiveRoute('tokens')} collapsed={false} accentColor="#8b5cf6" />
              <RealNavItem icon={<Workflow size={17} />} label="Canvas Flows" active={activeRoute === 'flows'} onClick={() => setActiveRoute('flows')} collapsed={false} accentColor="#8b5cf6" />
              <RealNavItem icon={<Settings size={17} />} label="Studio Settings" active={activeRoute === 'settings'} onClick={() => setActiveRoute('settings')} collapsed={false} accentColor="#8b5cf6" />
            </nav>

            <div style={{ marginTop: 'auto', padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(99,102,241,0.08))', border: '1px solid rgba(139,92,246,0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6' }}>Pro Workspace</span>
                <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>v2.4</span>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                Full glassmorphic surface blur active.
              </div>
              <NeuronButton size="xs" variant="primary" style={{ width: '100%', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                Explore Presets
              </NeuronButton>
            </div>
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 5: WORKSPACE & FILE TREE
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'workspace-tree' && (
          <aside
            style={{
              width: isCollapsed ? '64px' : '260px',
              height: '100%',
              borderRight: '1px solid var(--color-border)',
              background: 'var(--color-bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              boxSizing: 'border-box',
              transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {!isCollapsed ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <FolderOpen size={16} color="#f59e0b" />
                    <span style={{ fontSize: 12.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>neudela-ui-core</span>
                  </div>
                  <NeuronBadge size="xs" variant="neutral">git:main</NeuronBadge>
                </>
              ) : (
                <div style={{ margin: '0 auto' }}>
                  <FolderOpen size={18} color="#f59e0b" />
                </div>
              )}
            </div>

            {!isCollapsed && (
              <>
                <div style={{ padding: '8px 10px 4px' }}>
                  <NeuronInput
                    placeholder="Filter files (⌘P)..."
                    leadingIcon={<Search size={13} />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                  <span>Explorer</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <NeuronTooltip content="New File" placement="top">
                      <span style={{ cursor: 'pointer' }}>+📄</span>
                    </NeuronTooltip>
                    <NeuronTooltip content="New Folder" placement="top">
                      <span style={{ cursor: 'pointer' }}>+📁</span>
                    </NeuronTooltip>
                  </div>
                </div>

                <div style={{ flex: 1, padding: '0 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Folder: src */}
                  <div>
                    <div
                      onClick={() => setSrcOpen(!srcOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 6px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {srcOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      {srcOpen ? <FolderOpen size={14} color="#f59e0b" /> : <Folder size={14} color="#f59e0b" />}
                      <span>src</span>
                    </div>

                    {srcOpen && (
                      <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {/* Subfolder: components */}
                        <div
                          onClick={() => setCompOpen(!compOpen)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 6px',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {compOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          {compOpen ? <FolderOpen size={13} color="#f59e0b" /> : <Folder size={13} color="#f59e0b" />}
                          <span>components</span>
                        </div>

                        {compOpen && (
                          <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {[
                              { name: 'NeuronSidebar.tsx', icon: <FileCode size={13} color="#0ea5e9" />, badge: 'M' },
                              { name: 'NeuronButton.tsx', icon: <FileCode size={13} color="#0ea5e9" /> },
                              { name: 'NeuronBadge.tsx', icon: <FileCode size={13} color="#0ea5e9" /> },
                              { name: 'NeuronInput.tsx', icon: <FileCode size={13} color="#0ea5e9" /> },
                            ].filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()))
                            .map(file => (
                              <div
                                key={file.name}
                                onClick={() => { setActiveFile(file.name); setActiveRoute(file.name); }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '4px 8px',
                                  borderRadius: 4,
                                  cursor: 'pointer',
                                  fontSize: 11.5,
                                  background: (activeFile === file.name || activeRoute === file.name) ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                                  color: (activeFile === file.name || activeRoute === file.name) ? '#f59e0b' : 'inherit',
                                  fontWeight: (activeFile === file.name || activeRoute === file.name) ? 600 : 400,
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  {file.icon}
                                  <span>{file.name}</span>
                                </div>
                                {file.badge && (
                                  <span style={{ fontSize: 9.5, fontWeight: 700, color: '#f59e0b' }}>{file.badge}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Subfolder: styles */}
                        <div
                          onClick={() => setStylesOpen(!stylesOpen)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 6px',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {stylesOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          {stylesOpen ? <FolderOpen size={13} color="#f59e0b" /> : <Folder size={13} color="#f59e0b" />}
                          <span>styles</span>
                        </div>

                        {stylesOpen && (
                          <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {[
                              { name: 'tokens.css', icon: <FileCode size={13} color="#ec4899" /> },
                              { name: 'neudela.css', icon: <FileCode size={13} color="#ec4899" /> },
                            ].filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()))
                            .map(file => (
                              <div
                                key={file.name}
                                onClick={() => { setActiveFile(file.name); setActiveRoute(file.name); }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '4px 8px',
                                  borderRadius: 4,
                                  cursor: 'pointer',
                                  fontSize: 11.5,
                                  background: (activeFile === file.name || activeRoute === file.name) ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                                  color: (activeFile === file.name || activeRoute === file.name) ? '#f59e0b' : 'inherit',
                                  fontWeight: (activeFile === file.name || activeRoute === file.name) ? 600 : 400,
                                  gap: 6,
                                }}
                              >
                                {file.icon}
                                <span>{file.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div
                          onClick={() => { setActiveFile('App.tsx'); setActiveRoute('App.tsx'); }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px 8px',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 11.5,
                            background: (activeFile === 'App.tsx' || activeRoute === 'App.tsx') ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                            color: (activeFile === 'App.tsx' || activeRoute === 'App.tsx') ? '#f59e0b' : 'inherit',
                            fontWeight: (activeFile === 'App.tsx' || activeRoute === 'App.tsx') ? 600 : 400,
                            gap: 6,
                          }}
                        >
                          <FileCode size={13} color="#0ea5e9" />
                          <span>App.tsx</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Root Files */}
                  {[
                    { name: 'package.json', icon: <FileCode size={13} color="#10b981" /> },
                    { name: 'tsconfig.json', icon: <FileCode size={13} color="#6366f1" /> },
                  ].filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()))
                  .map(file => (
                    <div
                      key={file.name}
                      onClick={() => { setActiveFile(file.name); setActiveRoute(file.name); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px 8px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 11.5,
                        background: (activeFile === file.name || activeRoute === file.name) ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                        color: (activeFile === file.name || activeRoute === file.name) ? '#f59e0b' : 'inherit',
                        fontWeight: (activeFile === file.name || activeRoute === file.name) ? 600 : 400,
                        gap: 6,
                      }}
                    >
                      {file.icon}
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Storage Quota */}
                <div style={{ borderTop: '1px solid var(--color-border)', padding: '10px 14px', background: 'var(--color-bg-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 4 }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>Cloud IDE Storage</span>
                    <span style={{ fontWeight: 700, color: '#f59e0b' }}>1.2 GB / 5.0 GB</span>
                  </div>
                  <NeuronProgress value={24} variant="warning" size="xs" />
                </div>
              </>
            )}
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 6: E-COMMERCE & MERCHANT CONSOLE
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'ecommerce-merchant' && (
          <aside
            style={{
              width: isCollapsed ? '72px' : '250px',
              height: '100%',
              background: 'var(--color-bg-surface)',
              borderRight: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              flexShrink: 0,
              zIndex: 10,
              transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ padding: '14px', borderBottom: '1px solid var(--color-border)' }}>
              {!isCollapsed ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Store size={16} color="#10b981" /> Shibuya Boutique
                    </span>
                    <NeuronBadge size="xs" variant="success">Live</NeuronBadge>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>tokyo-shibuya.store.jp</div>
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Store size={18} color="#10b981" />
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ padding: '8px 8px 4px' }}>
                <NeuronInput
                  placeholder="Search orders, SKUs..."
                  leadingIcon={<Search size={13} />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}

            <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
              <RealNavItem icon={<LayoutDashboard size={17} />} label="Overview" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} collapsed={isCollapsed} accentColor="#10b981" />
              <RealNavItem icon={<ShoppingBag size={17} />} label="Orders" badge="14 New" active={activeRoute === 'orders'} onClick={() => setActiveRoute('orders')} collapsed={isCollapsed} accentColor="#10b981" />
              <RealNavItem icon={<Package size={17} />} label="Products" badge="3 Low" active={activeRoute === 'products'} onClick={() => setActiveRoute('products')} collapsed={isCollapsed} accentColor="#10b981" />
              <RealNavItem icon={<Users size={17} />} label="Customers" active={activeRoute === 'customers'} onClick={() => setActiveRoute('customers')} collapsed={isCollapsed} accentColor="#10b981" />
              <RealNavItem icon={<TrendingUp size={17} />} label="Analytics" active={activeRoute === 'analytics'} onClick={() => setActiveRoute('analytics')} collapsed={isCollapsed} accentColor="#10b981" />
              <RealNavItem icon={<Truck size={17} />} label="Shipments" active={activeRoute === 'shipments'} onClick={() => setActiveRoute('shipments')} collapsed={isCollapsed} accentColor="#10b981" />
            </nav>

            <div style={{ padding: 12, borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
              {!isCollapsed ? (
                <>
                  <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Available Payout</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#10b981', margin: '2px 0 6px 0' }}>$18,490.00</div>
                  <NeuronButton size="sm" variant="primary" style={{ width: '100%', background: '#10b981', borderColor: '#10b981' }}>Instant Payout</NeuronButton>
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NeuronTooltip content="Available Payout: $18,490.00" placement="right">
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981' }}>$18k</span>
                  </NeuronTooltip>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 7: COMMAND HUB & PRODUCTIVITY SPACES
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'productivity-spaces' && (
          <aside
            style={{
              width: isCollapsed ? '72px' : '240px',
              height: '100%',
              background: 'var(--color-bg-surface)',
              borderRight: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              flexShrink: 0,
              zIndex: 10,
              transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)' }}>
              {!isCollapsed ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>⚡</div>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Linear Space</span>
                  </div>
                  <NeuronBadge size="xs" variant="neutral">⌘K</NeuronBadge>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>⚡</div>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ padding: '8px 8px 4px' }}>
                <NeuronInput
                  placeholder="Search spaces or ⌘K..."
                  leadingIcon={<Search size={13} />}
                  trailingText="⌘K"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}

            <div style={{ padding: '4px 8px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {!isCollapsed && (
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', padding: '4px 6px' }}>FAVORITES</div>
              )}
              <RealNavItem icon={<Inbox size={15} />} label="My Inbox" badge="4" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} collapsed={isCollapsed} accentColor="#6366f1" />
              <RealNavItem icon={<CheckSquare size={15} />} label="Assigned to Me" badge="9" active={activeRoute === 'tasks'} onClick={() => setActiveRoute('tasks')} collapsed={isCollapsed} accentColor="#6366f1" />
              
              {!isCollapsed && (
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', padding: '10px 6px 4px' }}>TEAMS & SPACES</div>
              )}
              <RealNavItem icon={<Target size={15} />} label="Core Engine" active={activeRoute === 'engine'} onClick={() => setActiveRoute('engine')} collapsed={isCollapsed} accentColor="#6366f1" />
              <RealNavItem icon={<Sparkles size={15} />} label="Design System" active={activeRoute === 'design'} onClick={() => setActiveRoute('design')} collapsed={isCollapsed} accentColor="#6366f1" />
              <RealNavItem icon={<Users size={15} />} label="Product Ops" active={activeRoute === 'ops'} onClick={() => setActiveRoute('ops')} collapsed={isCollapsed} accentColor="#6366f1" />
            </div>

            <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <NeuronAvatar name="Alex Vance" size="xs" status="online" />
              {!isCollapsed && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Alex Vance</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>🎯 Sprint Planning</div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            VARIANT 8: GUIDED WORKFLOW & LIFECYCLE STEPPER
        ════════════════════════════════════════════════════════ */}
        {activeVariant === 'workflow-stepper' && (
          <aside
            style={{
              width: isCollapsed ? '72px' : '260px',
              height: '100%',
              background: 'var(--color-bg-surface)',
              borderRight: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              boxSizing: 'border-box',
              zIndex: 10,
              transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ padding: '14px', borderBottom: '1px solid var(--color-border)' }}>
              {!isCollapsed ? (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#ea580c', marginBottom: 4 }}>Audit & Deployment</div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>FedRAMP Audit v2</div>
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                      <span>Overall Progress</span>
                      <strong style={{ color: '#ea580c' }}>60%</strong>
                    </div>
                    <NeuronProgress value={60} variant="warning" size="sm" />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ListChecks size={20} color="#ea580c" />
                </div>
              )}
            </div>

            <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { step: '1', title: 'Identity & SSO', status: 'done', desc: 'SAML 2.0 bound' },
                { step: '2', title: 'Data Encryption', status: 'done', desc: 'AES-256 enabled' },
                { step: '3', title: 'Access Control Policies', status: 'active', desc: 'Role matrix pending' },
                { step: '4', title: 'Continuous Observability', status: 'pending', desc: 'Agent sync required' },
                { step: '5', title: 'Executive Sign-Off', status: 'locked', desc: 'Final audit gate' },
              ].map((s, idx) => (
                <div key={s.step} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    onClick={() => setActiveRoute(`step-${s.step}`)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: activeRoute === `step-${s.step}` ? '1px solid #ea580c' : '1px solid transparent',
                      background: activeRoute === `step-${s.step}` ? 'rgba(234,88,12,0.08)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: s.status === 'done' ? '#10b981' : s.status === 'active' ? '#ea580c' : 'var(--color-bg-subtle)',
                      color: s.status === 'done' || s.status === 'active' ? '#fff' : 'var(--color-text-tertiary)',
                      fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                      boxShadow: s.status === 'active' ? '0 0 0 3px rgba(234,88,12,0.2)' : 'none',
                    }}>
                      {s.status === 'done' ? '✓' : s.status === 'locked' ? <Lock size={11} /> : s.step}
                    </div>
                    {!isCollapsed && (
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: s.status === 'active' ? 700 : 500, color: s.status === 'active' ? '#ea580c' : 'inherit' }}>{s.title}</div>
                        <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>{s.desc}</div>
                      </div>
                    )}
                  </div>
                  {idx < 4 && !isCollapsed && (
                    <div style={{
                      width: 2, height: 12,
                      background: s.status === 'done' ? '#10b981' : 'var(--color-border)',
                      marginLeft: 20,
                      marginRight: 'auto',
                    }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ padding: '10px 12px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
              {!isCollapsed ? (
                <NeuronButton size="xs" variant="outline" style={{ width: '100%' }}>
                  Request Fast-Track Review
                </NeuronButton>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NeuronTooltip content="Request Fast-Track Review" placement="right">
                    <Check size={14} color="#ea580c" />
                  </NeuronTooltip>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ════════════════════════════════════════════════════════
            MAIN FULLSCREEN APPLICATION CONTENT PANE
        ════════════════════════════════════════════════════════ */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            background: 'var(--color-bg-canvas)',
            overflow: 'hidden',
          }}
        >
          {/* Real Application Topbar */}
          <header
            style={{
              height: '56px',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                {activeVariant === 'ecommerce-merchant'
                  ? 'Storefront /'
                  : activeVariant === 'productivity-spaces'
                  ? 'Linear Space /'
                  : activeVariant === 'workflow-stepper'
                  ? 'FedRAMP Audit /'
                  : 'App /'}
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>
                {activeRoute}
              </span>
              <NeuronBadge
                size="xs"
                variant={
                  activeVariant === 'ecommerce-merchant'
                    ? 'success'
                    : activeVariant === 'productivity-spaces'
                    ? 'primary'
                    : activeVariant === 'workflow-stepper'
                    ? 'warning'
                    : 'brand'
                }
              >
                {activeVariant === 'ecommerce-merchant'
                  ? 'STORE-LIVE'
                  : activeVariant === 'productivity-spaces'
                  ? 'SPRINT-ACTIVE'
                  : activeVariant === 'workflow-stepper'
                  ? 'GATE-REVIEW'
                  : 'PROD-US-EAST'}
              </NeuronBadge>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: 'var(--color-bg-canvas)',
                  fontSize: 11.5,
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: activeVariant === 'workflow-stepper' ? '#ea580c' : '#10b981',
                  }}
                />
                <span>
                  {activeVariant === 'ecommerce-merchant'
                    ? 'POS Gateway Connected'
                    : activeVariant === 'productivity-spaces'
                    ? 'Real-Time Sync 12ms'
                    : activeVariant === 'workflow-stepper'
                    ? 'Continuous Compliance'
                    : 'Cluster Health 99.98%'}
                </span>
              </div>
              <NeuronButton
                size="xs"
                variant="text"
                iconOnly
                title="Notifications"
                leadingIcon={
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Bell size={18} />
                    <span
                      style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: '#df7e30',
                      }}
                    />
                  </div>
                }
              />
            </div>
          </header>

          {/* Real Dynamic Page Content */}
          <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 6px 0', color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>
                  {activeVariant === 'ecommerce-merchant'
                    ? `${activeRoute} Merchant Console`
                    : activeVariant === 'productivity-spaces'
                    ? `${activeRoute} Linear Workspace`
                    : activeVariant === 'workflow-stepper'
                    ? `Stage Review: ${activeRoute}`
                    : `${activeRoute} Workspace Console`}
                </h1>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                  Live interactive workspace executing under the Neudela {variantTitles[activeVariant]} architecture.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <NeuronButton size="sm" variant="outline">
                  <Download size={14} style={{ marginRight: 6 }} />
                  {activeVariant === 'ecommerce-merchant'
                    ? 'Export CSV'
                    : activeVariant === 'workflow-stepper'
                    ? 'Export Audit PDF'
                    : 'Export Data'}
                </NeuronButton>
                <NeuronButton size="sm" variant="primary">
                  <Plus size={14} style={{ marginRight: 6 }} />
                  {activeVariant === 'ecommerce-merchant'
                    ? 'Add Product'
                    : activeVariant === 'productivity-spaces'
                    ? 'New Issue (C)'
                    : activeVariant === 'workflow-stepper'
                    ? 'Submit Evidence'
                    : 'New Project'}
                </NeuronButton>
              </div>
            </div>

            {/* Metric KPI Cards (Contextualized per variant) */}
            {activeVariant === 'ecommerce-merchant' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Gross Merchandise Value</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#10b981' }}>$348,920.00</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>↑ +22.4% vs last month</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Total Orders (MTD)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>2,841 orders</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>98.6% fulfillment rate</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Average Basket Size</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>$122.80</div>
                  <div style={{ fontSize: 11, color: '#0ea5e9', marginTop: 4, fontWeight: 600 }}>Nominal retail basket</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Low Stock Alerts</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b' }}>3 SKUs</div>
                  <div style={{ fontSize: 11, color: '#f59e0b', marginTop: 4, fontWeight: 600 }}>Restock PO dispatched</div>
                </div>
              </div>
            ) : activeVariant === 'productivity-spaces' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Sprint 24 Velocity</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#6366f1' }}>54 / 60 pts</div>
                  <div style={{ fontSize: 11, color: '#6366f1', marginTop: 4, fontWeight: 600 }}>90% target velocity reached</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Resolved Issues</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>38 closed</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>74% sprint completion</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Cycle Time (P50)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>1.8 days</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>Fast merge turnaround</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Open Blockers</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>0 blockers</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>Critical paths clear</div>
                </div>
              </div>
            ) : activeVariant === 'workflow-stepper' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Compliance Score</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#ea580c' }}>94 / 100</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>Passing audit threshold</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Controls Verified</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>42 of 48</div>
                  <div style={{ fontSize: 11, color: '#ea580c', marginTop: 4, fontWeight: 600 }}>6 controls pending</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Gatekeeper Sign-offs</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>3 of 5 signed</div>
                  <div style={{ fontSize: 11, color: '#0ea5e9', marginTop: 4, fontWeight: 600 }}>SecOps review active</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Target Milestone</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>Oct 24, 2026</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>On schedule (12 days)</div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Total Revenue (MTD)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>$128,490.00</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>↑ +14.2% vs last month</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Active Cloud Workloads</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>84 pods</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>100% healthy replicas</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>API Requests / Sec</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>4,892 rps</div>
                  <div style={{ fontSize: 11, color: '#0ea5e9', marginTop: 4, fontWeight: 600 }}>Peak throughput nominal</div>
                </div>
                <div style={{ background: 'var(--color-bg-surface)', padding: 18, borderRadius: 12, border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>Mean Response Time</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text-primary)' }}>28 ms</div>
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontWeight: 600 }}>Edge caching active</div>
                </div>
              </div>
            )}

            {/* Interactive Data Table */}
            <div
              style={{
                background: 'var(--color-bg-surface)',
                borderRadius: 14,
                border: '1px solid var(--color-border)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 2px 0', color: 'var(--color-text-primary)' }}>
                    {activeVariant === 'ecommerce-merchant'
                      ? 'Recent Orders & Fulfillment Activity'
                      : activeVariant === 'productivity-spaces'
                      ? 'Active Issues & Sprint Backlog'
                      : activeVariant === 'workflow-stepper'
                      ? 'Stage Audit Trail & Evidence Verification'
                      : 'Production Events & Cloud Activity'}
                  </h3>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    {activeVariant === 'ecommerce-merchant'
                      ? 'Showing real-time retail orders across Tokyo store locations'
                      : activeVariant === 'productivity-spaces'
                      ? 'Showing team execution tasks, PR reviews, and sprint items'
                      : activeVariant === 'workflow-stepper'
                      ? 'Immutable audit log validating FedRAMP controls across pipeline'
                      : 'Showing real-time events triggered inside the active workspace'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <NeuronButton
                    variant="outline"
                    size="xs"
                    leadingIcon={<Filter size={13} />}
                  >
                    Filter Logs
                  </NeuronButton>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(activeVariant === 'ecommerce-merchant'
                  ? [
                      { id: 'ORD-9821', name: 'Shibuya Flagship - 2x Premium Canvas Backpack ($240.00)', time: '4 mins ago', status: 'Success' },
                      { id: 'ORD-9822', name: 'Omotesando Online - 1x Ceramic Matte Mug ($34.00)', time: '18 mins ago', status: 'Success' },
                      { id: 'ORD-9823', name: 'Harajuku Pop-up - 3x Minimalist Tee Pack ($115.00)', time: '1 hour ago', status: 'Success' },
                      { id: 'ORD-9824', name: 'Shibuya Flagship - 1x Leather Cardholder ($55.00)', time: '2 hours ago', status: 'Notice' },
                    ]
                  : activeVariant === 'productivity-spaces'
                  ? [
                      { id: 'ENG-402', name: 'Support dark mode auto-detection in StandaloneSidebarPreview', time: '12 mins ago', status: 'Success' },
                      { id: 'DES-119', name: 'Refactor button token elevation states for accessibility', time: '45 mins ago', status: 'Success' },
                      { id: 'OPS-304', name: 'Scale Redis cluster read-replicas for Tokyo region', time: '2 hours ago', status: 'Success' },
                      { id: 'ENG-405', name: 'Implement keyboard shortcut listeners (⌘K search palette)', time: '4 hours ago', status: 'Notice' },
                    ]
                  : activeVariant === 'workflow-stepper'
                  ? [
                      { id: 'SEC-AUD-01', name: 'SAML 2.0 IdP metadata XML signature validated by Auth0', time: '10 mins ago', status: 'Success' },
                      { id: 'SEC-AUD-02', name: 'KMS customer-managed key rotation policy confirmed (90 days)', time: '35 mins ago', status: 'Success' },
                      { id: 'SEC-AUD-03', name: 'RBAC least-privilege matrix submitted for Engineering cluster', time: '1 hour ago', status: 'Notice' },
                      { id: 'SEC-AUD-04', name: 'Penetration testing scope and vendor NDA documentation', time: '3 hours ago', status: 'Success' },
                    ]
                  : [
                      { id: 'EVT-8901', name: 'Auto-scaling group k8s-us-east-1 deployed 4 new replicas', time: '2 mins ago', status: 'Success' },
                      { id: 'EVT-8902', name: 'Stripe webhook payment intent confirmed ($3,400.00)', time: '14 mins ago', status: 'Success' },
                      { id: 'EVT-8903', name: 'SSL Certificate renewed automatically for *.neudela.io', time: '1 hour ago', status: 'Success' },
                      { id: 'EVT-8904', name: 'Redis cache eviction triggered - memory consumption nominal', time: '3 hours ago', status: 'Notice' },
                    ]
                ).map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'var(--color-bg-canvas)',
                      border: '1px solid var(--color-border)',
                      fontSize: 12.5,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color={ev.status === 'Success' ? '#10b981' : '#df7e30'} />
                      <strong style={{ color: 'var(--color-text-primary)' }}>{ev.id}</strong>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{ev.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{ev.time}</span>
                      <NeuronBadge size="xs" variant={ev.status === 'Success' ? 'success' : 'warning'}>
                        {ev.status}
                      </NeuronBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Real Navigation Micro-components
// ─────────────────────────────────────────────────────────────────────────────

interface RealNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  badge?: React.ReactNode;
  accentColor?: string;
  onClick: () => void;
}

function RealNavItem({ icon, label, active, collapsed, badge, accentColor, onClick }: RealNavItemProps) {
  const activeBg = accentColor ? `${accentColor}1c` : 'rgba(223, 126, 48, 0.14)';
  const activeColor = accentColor || 'var(--color-primary)';

  const item = (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '7px 10px',
        borderRadius: 6,
        border: 'none',
        background: active ? activeBg : 'transparent',
        color: active ? activeColor : 'var(--color-text-secondary)',
        fontWeight: active ? 600 : 500,
        fontSize: 12.5,
        cursor: 'pointer',
        justifyContent: collapsed ? 'center' : 'flex-start',
        position: 'relative',
        transition: 'all 0.15s ease',
      }}
    >
      {active && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 5,
            bottom: 5,
            width: 3.5,
            borderRadius: '0 4px 4px 0',
            background: activeColor,
          }}
        />
      )}
      <span style={{ display: 'flex', color: active ? activeColor : 'inherit' }}>
        {icon}
      </span>
      {!collapsed && (
        <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {label}
        </span>
      )}
      {!collapsed && badge && (
        typeof badge === 'string' ? (
          <NeuronBadge
            size="xs"
            variant={
              badge.toLowerCase().includes('live') || badge.toLowerCase().includes('new')
                ? 'success'
                : badge.toLowerCase().includes('low')
                ? 'warning'
                : 'neutral'
            }
          >
            {badge}
          </NeuronBadge>
        ) : (
          badge
        )
      )}
    </button>
  );

  if (collapsed) {
    return (
      <NeuronTooltip content={label} placement="right">
        {item}
      </NeuronTooltip>
    );
  }

  return item;
}

function RealRailItem({
  icon,
  label,
  active,
  badge,
  accentColor = '#0ea5e9',
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: string;
  accentColor?: string;
  onClick: () => void;
}) {
  return (
    <NeuronTooltip content={label} placement="right">
      <button
        onClick={onClick}
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: active ? `${accentColor}22` : 'transparent',
          color: active ? accentColor : 'var(--color-text-secondary)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.18s ease',
        }}
      >
        {active && (
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 8,
              width: 3.5,
              background: accentColor,
              borderRadius: '0 3px 3px 0',
            }}
          />
        )}
        {icon}
        {badge && (
          <span
            style={{
              position: 'absolute',
              top: -3,
              right: -3,
              background: '#ef4444',
              color: '#fff',
              fontSize: 10,
              borderRadius: 10,
              padding: '1px 5px',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {badge}
          </span>
        )}
      </button>
    </NeuronTooltip>
  );
}
