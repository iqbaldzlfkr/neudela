import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NeuronDropdown, { DropdownOption } from '../components/NeuronDropdown';
import NeuronButton from '../components/NeuronButton';
import NeuronDropdownMenu, {
  DropdownMenuGroup,
  DropdownMenuHeader,
} from '../components/NeuronDropdownMenu';
import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import NeuronAvatar from '../components/NeuronAvatar';
import {
  ChevronDown,
  Users,
  Search,
  Tag,
  ListFilter,
  ShieldCheck,
  Layers,
  Palette,
  Code,
  Briefcase,
  Folder,
  Globe,
  User,
  Settings,
  Command,
  UserPlus,
  FileText,
  HelpCircle,
  LogOut,
  MoreHorizontal,
  SlidersHorizontal,
  Check,
  Edit3,
  Trash2,
  Copy,
  Share2,
  MessageSquare,
  Grid,
  ArrowUpRight,
  X,
} from 'lucide-react';

interface DropdownViewProps {
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
// Anatomy Label
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

// ─────────────────────────────────────────────
// Shared Demo Options
// ─────────────────────────────────────────────
const DEFAULT_ROLE_OPTIONS: DropdownOption[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'moderator', label: 'Moderator' },
];

const ICON_DEPARTMENT_OPTIONS: DropdownOption[] = [
  { value: 'design', label: 'Design System', icon: <Palette size={16} /> },
  { value: 'engineering', label: 'Engineering', icon: <Code size={16} /> },
  { value: 'marketing', label: 'Marketing & PR', icon: <Globe size={16} /> },
  { value: 'security', label: 'Security & Auth', icon: <ShieldCheck size={16} /> },
  { value: 'sales', label: 'Sales & CRM', icon: <Briefcase size={16} /> },
];

const AVATAR_USER_OPTIONS: DropdownOption[] = [
  { value: 'phoenix', label: 'Phoenix Baker', username: 'phoenix', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { value: 'iqbal', label: 'Iqbal Dzulfikar', username: 'iqbal', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { value: 'lana', label: 'Lana Steiner', username: 'lana', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
  { value: 'demi', label: 'Demi Wilkinson', username: 'demi', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80' },
  { value: 'candice', label: 'Candice Wu', username: 'candice', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
];

const DOT_STATUS_OPTIONS: DropdownOption[] = [
  { value: 'online', label: 'Online / Active', dotColor: '#10B981' },
  { value: 'busy', label: 'Busy / Meeting', dotColor: '#F59E0B' },
  { value: 'in-progress', label: 'In Progress', dotColor: '#6366F1' },
  { value: 'offline', label: 'Offline / Away', dotColor: '#94A3B8' },
  { value: 'dnd', label: 'Do Not Disturb', dotColor: '#EF4444' },
];

const SUPPORTING_PLAN_OPTIONS: DropdownOption[] = [
  { value: 'enterprise', label: 'Enterprise Plan', description: 'Unlimited workspaces & dedicated 24/7 SLA', dotColor: '#DF7E30' },
  { value: 'team', label: 'Team Pro Tier', description: 'Up to 50 active workspace members with roles', dotColor: '#6366F1' },
  { value: 'starter', label: 'Starter Workspace', description: 'Free essential features for up to 5 members', dotColor: '#10B981' },
  { value: 'viewer', label: 'Guest Observer', description: 'Read-only access across public boards', dotColor: '#94A3B8' },
];

const TEAM_OPTIONS: DropdownOption[] = AVATAR_USER_OPTIONS;
const ROLE_OPTIONS: DropdownOption[] = DEFAULT_ROLE_OPTIONS;

const COUNTRY_OPTIONS: DropdownOption[] = [
  { value: 'id', label: 'Indonesia' },
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'sg', label: 'Singapore' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'ca', label: 'Canada' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
];

const CATEGORY_OPTIONS: DropdownOption[] = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'product', label: 'Product' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
];

// ─────────────────────────────────────────────
// Main View
// ─────────────────────────────────────────────
export default function DropdownView({ setActiveTab }: DropdownViewProps) {
  const { t } = useLanguage();
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');
  const dt = t.dropdown || t.select;
  const gl = dt.guideline;

  // Visual Specification state management (1 field per state)
  const [showSupportingText, setShowSupportingText] = useState(false);
  const [valDefault, setValDefault] = useState('');
  const [valIcon, setValIcon] = useState('');
  const [valAvatar, setValAvatar] = useState('');
  const [valDot, setValDot] = useState('');
  const [valSupport, setValSupport] = useState('');

  // Button-Triggered Dropdown Menu states
  const [prefDark, setPrefDark] = useState(true);
  const [prefNotify, setPrefNotify] = useState(true);
  const [prefSounds, setPrefSounds] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Profile Menu Header definition
  const profileMenuHeader: DropdownMenuHeader = {
    name: 'Iqbal Dzulfikar',
    email: 'iqbal.dzulfikar@neudela.design',
    avatar: '/avatars/iqbal.jpg',
    badge: 'Pro',
    onClick: () => setLastAction('Clicked profile header'),
  };

  // Menu groups definitions
  const accountMenuGroups: DropdownMenuGroup[] = [
    {
      items: [
        { id: 'profile', label: gl.menuViewProfile || 'View profile', icon: <User size={16} />, shortcut: '⌘P', onClick: () => setLastAction('View profile') },
        { id: 'settings', label: gl.menuSettings || 'Settings', icon: <Settings size={16} />, shortcut: '⌘S', onClick: () => setLastAction('Settings') },
        { id: 'shortcuts', label: gl.menuShortcuts || 'Keyboard shortcuts', icon: <Command size={16} />, shortcut: '⌘K', onClick: () => setLastAction('Keyboard shortcuts') },
      ],
    },
    {
      items: [
        { id: 'team', label: gl.menuTeam || 'Team members', icon: <Users size={16} />, badge: '4', onClick: () => setLastAction('Team members') },
        { id: 'invite', label: gl.menuInvite || 'Invite colleagues', icon: <UserPlus size={16} />, shortcut: '⇧⌘I', onClick: () => setLastAction('Invite colleagues') },
      ],
    },
    {
      items: [
        { id: 'changelog', label: gl.menuChangelog || 'Changelog', icon: <FileText size={16} />, onClick: () => setLastAction('Changelog') },
        { id: 'slack', label: gl.menuSlack || 'Slack Community', icon: <MessageSquare size={16} />, onClick: () => setLastAction('Slack Community') },
        { id: 'support', label: gl.menuSupport || 'Support', icon: <HelpCircle size={16} />, onClick: () => setLastAction('Support') },
        { id: 'api', label: gl.menuApi || 'API documentation', icon: <Code size={16} />, onClick: () => setLastAction('API documentation') },
      ],
    },
    {
      items: [
        { id: 'logout', label: gl.menuLogout || 'Log out', icon: <LogOut size={16} />, shortcut: '⌥⇧Q', destructive: true, onClick: () => setLastAction('Logged out') },
      ],
    },
  ];

  const kebabMenuGroups: DropdownMenuGroup[] = [
    {
      items: [
        { id: 'edit', label: 'Edit details', icon: <Edit3 size={16} />, shortcut: '⌘E', onClick: () => setLastAction('Edit details') },
        { id: 'duplicate', label: 'Duplicate item', icon: <Copy size={16} />, shortcut: '⌘D', onClick: () => setLastAction('Duplicate item') },
        { id: 'share', label: 'Share link', icon: <Share2 size={16} />, shortcut: '⇧⌘S', onClick: () => setLastAction('Share link') },
      ],
    },
    {
      items: [
        { id: 'archive', label: 'Archive project', icon: <Briefcase size={16} />, onClick: () => setLastAction('Archive project') },
        { id: 'delete', label: 'Delete permanently', icon: <Trash2 size={16} />, destructive: true, onClick: () => setLastAction('Deleted item') },
      ],
    },
  ];



  // State demo
  const [stateDefault, setStateDefault] = useState('');
  const [stateFilled, setStateFilled] = useState('iqbal');
  const [stateError, setStateError] = useState('');
  const [stateSuccess, setStateSuccess] = useState('iqbal');

  // Variant demos
  const [varSingle, setVarSingle] = useState('');
  const [varAvatar, setVarAvatar] = useState('');
  const [varMulti, setVarMulti] = useState<string[]>(['design', 'engineering']);
  const [varMultiAvatar, setVarMultiAvatar] = useState<string[]>(['phoenix', 'iqbal']);
  const [varSearch, setVarSearch] = useState('');

  // Playbook demos
  const [playTeam, setPlayTeam] = useState('');
  const [playMultiCat, setPlayMultiCat] = useState<string[]>([]);
  const [playCountry, setPlayCountry] = useState('');

  // Playground value state
  const [pgValue, setPgValue] = useState<string | string[]>('');

  // Figma Variant Playground State (1:1 with Figma Dropdown menu variants)
  const [figmaIcon, setFigmaIcon] = useState<boolean>(false);
  const [figmaCheckbox, setFigmaCheckbox] = useState<boolean>(false);
  const [figmaShortcut, setFigmaShortcut] = useState<boolean>(false);
  const [figmaHeader, setFigmaHeader] = useState<boolean>(false);

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">COMPONENTS</span>
            <h1 className="page-title">{dt.pageTitle}</h1>
            <p className="page-subtitle">{dt.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setTab('guideline')}
          >
            {gl.tabName}
          </button>
          <button
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setTab('playbook')}
          >
            {gl.playbookTabName}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">
          {/* ── Overview Visual Specification ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)',
              marginBottom: 'var(--space-4)',
              paddingBottom: 'var(--space-3)',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <div>
                <h3 className="section-subtitle" style={{ margin: 0, fontSize: 'var(--fs-text-md)' }}>
                  {gl.overviewGridTitle}
                </h3>
                <p className="section-description" style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-text-sm)' }}>
                  {gl.overviewGridDesc}
                </p>
              </div>

              {/* Supporting Text Toggle Option */}
              <button
                type="button"
                onClick={() => setShowSupportingText(prev => !prev)}
                className={`badge-spec-filter-btn ${showSupportingText ? 'is-active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                  background: showSupportingText ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-subtle)',
                  color: showSupportingText ? 'var(--brand-600)' : 'var(--color-text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                  transition: 'all 0.15s ease',
                }}
                aria-pressed={showSupportingText}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: showSupportingText ? 'var(--brand-500)' : 'var(--color-text-tertiary)',
                    boxShadow: showSupportingText ? '0 0 0 2px rgba(223, 126, 48, 0.25)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                />
                <span>{gl.toggleSupportingText || 'Supporting Text'}: {showSupportingText ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* ── Overview: 1 Field Per State Stacked Downwards ── */}
            <div className="select-overview-stack">
              {/* State 1: Default */}
              <div className="select-overview-card">
                <div className="select-overview-card__header">
                  <div className="select-overview-card__info">
                    <span className="select-overview-card__heading">{gl.colDefault}</span>
                    <p className="select-overview-card__desc">{gl.descDefault}</p>
                  </div>
                  <span className="select-overview-card__badge">{gl.colDefault}</span>
                </div>
                <div className="select-overview-card__body">
                  <NeuronDropdown
                    label="Role"
                    placeholder="Select role"
                    options={DEFAULT_ROLE_OPTIONS}
                    value={valDefault}
                    onChange={(v) => setValDefault(v as string)}
                    helperText={showSupportingText ? 'Choose primary account role' : undefined}
                  />
                </div>
              </div>

              {/* State 2: Icon Leading */}
              <div className="select-overview-card">
                <div className="select-overview-card__header">
                  <div className="select-overview-card__info">
                    <span className="select-overview-card__heading">{gl.colIcon}</span>
                    <p className="select-overview-card__desc">{gl.descIcon}</p>
                  </div>
                  <span className="select-overview-card__badge">{gl.colIcon}</span>
                </div>
                <div className="select-overview-card__body">
                  <NeuronDropdown
                    label="Department"
                    placeholder="Select department"
                    options={ICON_DEPARTMENT_OPTIONS}
                    value={valIcon}
                    onChange={(v) => setValIcon(v as string)}
                    leadingType="icon"
                    leadingIcon={<Folder size={16} />}
                    helperText={showSupportingText ? 'Department determines folder access' : undefined}
                  />
                </div>
              </div>

              {/* State 3: Avatar Leading */}
              <div className="select-overview-card">
                <div className="select-overview-card__header">
                  <div className="select-overview-card__info">
                    <span className="select-overview-card__heading">{gl.colAvatar}</span>
                    <p className="select-overview-card__desc">{gl.descAvatar}</p>
                  </div>
                  <span className="select-overview-card__badge">{gl.colAvatar}</span>
                </div>
                <div className="select-overview-card__body">
                  <NeuronDropdown
                    label="Assignee"
                    placeholder="Select team member"
                    options={AVATAR_USER_OPTIONS}
                    value={valAvatar}
                    onChange={(v) => setValAvatar(v as string)}
                    withAvatar
                    helperText={showSupportingText ? 'Assigned member receives alerts' : undefined}
                  />
                </div>
              </div>

              {/* State 4: Dot Leading */}
              <div className="select-overview-card">
                <div className="select-overview-card__header">
                  <div className="select-overview-card__info">
                    <span className="select-overview-card__heading">{gl.colDot}</span>
                    <p className="select-overview-card__desc">{gl.descDot}</p>
                  </div>
                  <span className="select-overview-card__badge">{gl.colDot}</span>
                </div>
                <div className="select-overview-card__body">
                  <NeuronDropdown
                    label="Availability"
                    placeholder="Select status"
                    options={DOT_STATUS_OPTIONS}
                    value={valDot}
                    onChange={(v) => setValDot(v as string)}
                    withDot
                    helperText={showSupportingText ? 'Broadcasts availability to channels' : undefined}
                  />
                </div>
              </div>

              {/* State 5: With Supporting Text */}
              <div className="select-overview-card">
                <div className="select-overview-card__header">
                  <div className="select-overview-card__info">
                    <span className="select-overview-card__heading">{gl.colSupportingText}</span>
                    <p className="select-overview-card__desc">{gl.descSupport}</p>
                  </div>
                  <span className="select-overview-card__badge">{gl.colSupportingText}</span>
                </div>
                <div className="select-overview-card__body">
                  <NeuronDropdown
                    label="Subscription Plan"
                    placeholder="Select plan tier"
                    options={SUPPORTING_PLAN_OPTIONS}
                    value={valSupport}
                    onChange={(v) => setValSupport(v as string)}
                    helperText="Choose a billing tier for workspace capacity"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Button-Triggered Dropdown Menus (Action Menu) ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              <div>
                <h2 className="section-title">{gl.buttonTriggerTitle || 'Button-Triggered Action Menus'}</h2>
                <p className="section-description">{gl.buttonTriggerDesc || 'Dropdown menus triggered by buttons, icon buttons, or avatars to present action lists, navigation, and user account settings.'}</p>
              </div>
              <NeuronBadge variant="brand" size="xs">NEW PATTERN</NeuronBadge>
            </div>

            {/* Notification when an action is clicked */}
            {lastAction && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(223, 126, 48, 0.12)',
                border: '1px solid rgba(223, 126, 48, 0.25)',
                color: 'var(--brand-600)',
                fontSize: 'var(--fs-text-xs)',
                fontWeight: 500,
                marginTop: 'var(--space-3)',
                marginBottom: 'var(--space-2)',
              }}>
                <span>✓ Action executed: <strong>{lastAction}</strong></span>
                <button
                  type="button"
                  onClick={() => setLastAction(null)}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 13, padding: 0 }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Interactive Triggers Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              padding: 'var(--space-5)',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              marginTop: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}>
              {/* Trigger 1: Button Trigger */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  {gl.triggerButtonLabel || 'Button Trigger'}
                </span>
                <NeuronDropdownMenu
                  trigger={
                    <NeuronButton variant="secondary" trailingIcon={<ChevronDown size={15} />}>
                      Account options
                    </NeuronButton>
                  }
                  header={profileMenuHeader}
                  groups={accountMenuGroups}
                  align="start"
                  width={260}
                />
              </div>

              {/* Trigger 2: Icon Button (Kebab) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  {gl.triggerKebabLabel || 'Icon Button Trigger'}
                </span>
                <NeuronDropdownMenu
                  trigger={
                    <NeuronButton variant="secondary" iconOnly aria-label="More options" leadingIcon={<MoreHorizontal size={18} />} />
                  }
                  groups={kebabMenuGroups}
                  align="start"
                  width={220}
                />
              </div>

              {/* Trigger 3: Avatar Trigger */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  {gl.triggerAvatarLabel || 'Avatar Trigger'}
                </span>
                <NeuronDropdownMenu
                  trigger={
                    <button type="button" className="neuron-dropdown-avatar-trigger" aria-label="Open profile menu">
                      <img
                        src="/avatars/iqbal.jpg"
                        alt="Iqbal Dzulfikar"
                        className="neuron-dropdown-avatar-trigger__img"
                      />
                      <span className="neuron-dropdown-avatar-trigger__dot" />
                    </button>
                  }
                  header={profileMenuHeader}
                  groups={accountMenuGroups}
                  align="start"
                  width={260}
                />
              </div>
            </div>

            {/* ── Figma Variant Matrix (Visual Specification) ── */}
            <h3 className="section-subtitle" style={{ fontSize: 'var(--fs-text-md)', marginBottom: 'var(--space-2)' }}>
              {gl.figmaMatrixTitle || 'Figma Variant Matrix (Visual Specification)'}
            </h3>
            <p className="section-description" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-text-xs)' }}>
              {gl.figmaMatrixDesc || 'Common component configurations derived directly from Figma property combinations.'}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-5)',
            }}>
              {/* Variant 1: Minimal (All False) */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                      {gl.figmaVariantMinimal || 'Minimal (All False)'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Icon: False · Checkbox: False · Shortcut: False · Header: False
                    </div>
                  </div>
                  <NeuronBadge variant="gray" size="xs">Base</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={false}
                    checkbox={false}
                    shortcut={false}
                    header={false}
                    width={240}
                  />
                </div>
              </div>

              {/* Variant 2: With Leading Icons */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                      {gl.figmaVariantWithIcons || 'With Leading Icons'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Icon: True · Checkbox: False · Shortcut: False · Header: False
                    </div>
                  </div>
                  <NeuronBadge variant="brand" size="xs">Icons</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={true}
                    checkbox={false}
                    shortcut={false}
                    header={false}
                    width={240}
                  />
                </div>
              </div>

              {/* Variant 3: With Shortcuts */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                      {gl.figmaVariantWithShortcuts || 'With Shortcuts'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Icon: True · Checkbox: False · Shortcut: True · Header: False
                    </div>
                  </div>
                  <NeuronBadge variant="brand" size="xs">Shortcuts</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={true}
                    checkbox={false}
                    shortcut={true}
                    header={false}
                    width={250}
                  />
                </div>
              </div>

              {/* Variant 4: With Profile Header */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                      {gl.figmaVariantWithHeader || 'With Profile Header'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Icon: True · Checkbox: False · Shortcut: True · Header: True
                    </div>
                  </div>
                  <NeuronBadge variant="success" size="xs">Account</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={true}
                    checkbox={false}
                    shortcut={true}
                    header={true}
                    width={250}
                  />
                </div>
              </div>

              {/* Variant 5: With Checkboxes */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                      {gl.figmaVariantWithCheckbox || 'With Checkboxes'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Icon: False · Checkbox: True · Shortcut: False · Header: False
                    </div>
                  </div>
                  <NeuronBadge variant="warning" size="xs">Toggleable</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={false}
                    checkbox={true}
                    shortcut={false}
                    header={false}
                    width={240}
                  />
                </div>
              </div>

              {/* Variant 6: Full Featured */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                      {gl.figmaVariantFull || 'Full Featured'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Icon: True · Checkbox: True · Shortcut: True · Header: True
                    </div>
                  </div>
                  <NeuronBadge variant="brand" size="xs">All Variants</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={true}
                    checkbox={true}
                    shortcut={true}
                    header={true}
                    width={250}
                  />
                </div>
              </div>
            </div>

            {/* Playbook Callout */}
            <div style={{
              marginTop: 'var(--space-5)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px dashed var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <SlidersHorizontal size={18} color="var(--brand-600)" />
                <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  Looking for the full interactive <strong>Figma Component Variants Inspector</strong> (Icon, Checkbox, Shortcut, Header)?
                </span>
              </div>
              <button
                type="button"
                className="neuron-btn neuron-btn--secondary neuron-btn--xs"
                onClick={() => setTab('playbook')}
              >
                View in Playbook →
              </button>
            </div>
          </div>

          {/* ── Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>
            <div className="anatomy-diagram">
              <div
                className="anatomy-preview"
                style={{
                  minHeight: '390px',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflowX: 'auto',
                }}
              >
                {/* Precision Blueprint Schematic Diagram Frame (520px × 350px) */}
                <div
                  style={{
                    position: 'relative',
                    width: '520px',
                    height: '350px',
                    background: 'var(--color-bg-surface)',
                    border: '1px dashed var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xs)',
                    overflow: 'visible',
                    flexShrink: 0,
                  }}
                >
                  {/* SVG Precision Connector Lines & Terminals */}
                  <svg
                    width="520"
                    height="350"
                    viewBox="0 0 520 350"
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}
                  >
                    {/* Marker 1: Label (Left straight to "Team members" label text) */}
                    <line x1="42" y1="52" x2="98" y2="52" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="98" cy="52" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 2: Trigger Container (Left straight to trigger box border) */}
                    <line x1="42" y1="92" x2="98" y2="92" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="98" cy="92" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 6: Tag / Chip (Top straight down to selected tag chip) */}
                    <line x1="172" y1="34" x2="172" y2="76" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="172" cy="76" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 3: Chevron Icon (Right straight to rotating Chevron arrow) */}
                    <line x1="478" y1="92" x2="416" y2="92" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="416" cy="92" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 4: Dropdown Panel (Left straight to panel menu container border) */}
                    <line x1="42" y1="144" x2="98" y2="144" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="98" cy="144" r="3" fill="var(--color-text-primary)" />

                    {/* Marker 5: Option Item (Right straight into selected/focused option row) */}
                    <line x1="478" y1="168" x2="414" y2="168" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                    <circle cx="414" cy="168" r="3" fill="var(--color-text-primary)" />
                  </svg>

                  {/* Target Component: Interactive Dropdown Showcase (Center 320px) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '100px',
                      top: '40px',
                      width: '320px',
                      zIndex: 2,
                      pointerEvents: 'none',
                    }}
                  >
                    {/* 1. Label */}
                    <label
                      className="neuron-label"
                      style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: 'var(--fs-text-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      Team members <span className="neuron-label__required">*</span>
                    </label>

                    {/* 2. Trigger Container */}
                    <div
                      className="neuron-dropdown__trigger neuron-select__trigger neuron-dropdown--open neuron-dropdown--focused"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '42px',
                        padding: '0 10px',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--brand-600)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 0 0 3px rgba(223, 126, 48, 0.22)',
                        boxSizing: 'border-box',
                        width: '100%',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                        {/* 6. Tag / Chip */}
                        <span
                          className="neuron-dropdown__tag neuron-select__tag"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--color-bg-subtle)',
                            border: '1px solid var(--color-border)',
                            fontSize: '12px',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--color-text-primary)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <NeuronAvatar
                            size="2xs"
                            name="Olivia Rhye"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=faces"
                          />
                          <span>Olivia Rhye</span>
                          <X size={12} style={{ opacity: 0.6 }} />
                        </span>
                        <span style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>Select team...</span>
                      </div>

                      {/* 3. Chevron Icon */}
                      <ChevronDown
                        size={16}
                        style={{
                          transform: 'rotate(180deg)',
                          color: 'var(--brand-600)',
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {/* 4. Dropdown Panel */}
                    <div
                      className="neuron-dropdown__dropdown neuron-select__dropdown"
                      style={{
                        position: 'relative',
                        top: '4px',
                        left: 0,
                        right: 0,
                        width: '100%',
                        zIndex: 10,
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                        padding: '4px 0',
                        animation: 'none',
                      }}
                    >
                      {/* Option 1: Phoenix Baker */}
                      <div
                        className="neuron-dropdown__option neuron-select__option"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          fontSize: 'var(--fs-text-sm)',
                        }}
                      >
                        <NeuronAvatar
                          size="xs"
                          name="Phoenix Baker"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces"
                        />
                        <div className="neuron-dropdown__option-text neuron-select__option-text">
                          <div className="neuron-dropdown__option-header neuron-select__option-header">
                            <span className="neuron-dropdown__option-label neuron-select__option-label">Phoenix Baker</span>
                            <span className="neuron-dropdown__option-username neuron-select__option-username">@phoenix</span>
                          </div>
                        </div>
                      </div>

                      {/* 5. Option Item (Focused / Selected Row with Checkmark) */}
                      <div
                        className="neuron-dropdown__option neuron-select__option neuron-dropdown__option--focused neuron-dropdown__option--selected neuron-select__option--focused neuron-select__option--selected"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          fontSize: 'var(--fs-text-sm)',
                          backgroundColor: 'var(--color-bg-subtle)',
                        }}
                      >
                        <NeuronAvatar
                          size="xs"
                          name="Demi Wilkinson"
                          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=faces"
                        />
                        <div className="neuron-dropdown__option-text neuron-select__option-text">
                          <div className="neuron-dropdown__option-header neuron-select__option-header">
                            <span
                              className="neuron-dropdown__option-label neuron-select__option-label"
                              style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--brand-700)' }}
                            >
                              Demi Wilkinson
                            </span>
                            <span
                              className="neuron-dropdown__option-username neuron-select__option-username"
                              style={{ color: 'var(--brand-600)' }}
                            >
                              @demi
                            </span>
                          </div>
                        </div>
                        <Check size={16} strokeWidth={2.5} style={{ color: 'var(--brand-600)', flexShrink: 0 }} />
                      </div>

                      {/* Option 3: Lana Steiner */}
                      <div
                        className="neuron-dropdown__option neuron-select__option"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          fontSize: 'var(--fs-text-sm)',
                        }}
                      >
                        <NeuronAvatar
                          size="xs"
                          name="Lana Steiner"
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces"
                        />
                        <div className="neuron-dropdown__option-text neuron-select__option-text">
                          <div className="neuron-dropdown__option-header neuron-select__option-header">
                            <span className="neuron-dropdown__option-label neuron-select__option-label">Lana Steiner</span>
                            <span className="neuron-dropdown__option-username neuron-select__option-username">@lana</span>
                          </div>
                        </div>
                      </div>

                      {/* Option 4: Candice Wu */}
                      <div
                        className="neuron-dropdown__option neuron-select__option"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          fontSize: 'var(--fs-text-sm)',
                        }}
                      >
                        <NeuronAvatar
                          size="xs"
                          name="Candice Wu"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces"
                        />
                        <div className="neuron-dropdown__option-text neuron-select__option-text">
                          <div className="neuron-dropdown__option-header neuron-select__option-header">
                            <span className="neuron-dropdown__option-label neuron-select__option-label">Candice Wu</span>
                            <span className="neuron-dropdown__option-username neuron-select__option-username">@candice</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Marker 1: Label (Top Left) */}
                  <div style={{ position: 'absolute', left: '20px', top: '41px', zIndex: 20 }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: Trigger Container (Mid Left) */}
                  <div style={{ position: 'absolute', left: '20px', top: '81px', zIndex: 20 }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 6: Tag / Chip (Top Center) */}
                  <div style={{ position: 'absolute', left: '161px', top: '12px', zIndex: 20 }}>
                    <span className="anatomy-marker">6</span>
                  </div>

                  {/* Marker 3: Chevron Icon (Mid Right) */}
                  <div style={{ position: 'absolute', left: '478px', top: '81px', zIndex: 20 }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Dropdown Panel (Lower Left) */}
                  <div style={{ position: 'absolute', left: '20px', top: '133px', zIndex: 20 }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Option Item (Lower Right) */}
                  <div style={{ position: 'absolute', left: '478px', top: '157px', zIndex: 20 }}>
                    <span className="anatomy-marker">5</span>
                  </div>
                </div>
              </div>

              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={gl.anatomyLabel} desc={gl.anatomyLabelDesc} />
                <AnatomyLabel number={2} label={gl.anatomyTrigger} desc={gl.anatomyTriggerDesc} />
                <AnatomyLabel number={3} label={gl.anatomyChevron} desc={gl.anatomyChevronDesc} />
                <AnatomyLabel number={4} label={gl.anatomyDropdown} desc={gl.anatomyDropdownDesc} />
                <AnatomyLabel number={5} label={gl.anatomyOption} desc={gl.anatomyOptionDesc} />
                <AnatomyLabel number={6} label={gl.anatomyTag} desc={gl.anatomyTagDesc} />
              </div>
            </div>
          </div>

          {/* ── Variants ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.variantsTitle}</h2>
            <p className="section-description">{gl.variantsDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
              {/* Single */}
              <div>
                <h4 className="section-subtitle" style={{ marginBottom: 'var(--space-2)' }}>{gl.variantSingleTitle}</h4>
                <p className="section-description" style={{ marginBottom: 'var(--space-3)' }}>{gl.variantSingleDesc}</p>
                <NeuronDropdown
                  label="Role"
                  placeholder="Select role"
                  options={ROLE_OPTIONS}
                  value={varSingle}
                  onChange={(v) => setVarSingle(v as string)}
                />
              </div>

              {/* With Avatar */}
              <div>
                <h4 className="section-subtitle" style={{ marginBottom: 'var(--space-2)' }}>{gl.variantAvatarTitle}</h4>
                <p className="section-description" style={{ marginBottom: 'var(--space-3)' }}>{gl.variantAvatarDesc}</p>
                <NeuronDropdown
                  label="Team member"
                  placeholder="Select team member"
                  options={TEAM_OPTIONS}
                  value={varAvatar}
                  onChange={(v) => setVarAvatar(v as string)}
                  withAvatar
                />
              </div>

              {/* Multi-Select with Tags */}
              <div>
                <h4 className="section-subtitle" style={{ marginBottom: 'var(--space-2)' }}>{gl.variantMultiTitle}</h4>
                <p className="section-description" style={{ marginBottom: 'var(--space-3)' }}>{gl.variantMultiDesc}</p>
                <NeuronDropdown
                  label="Category"
                  placeholder="Select category"
                  options={CATEGORY_OPTIONS}
                  value={varMulti}
                  onChange={(v) => setVarMulti(v as string[])}
                  multiple
                />
              </div>

              {/* Multi-Select with Search */}
              <div>
                <h4 className="section-subtitle" style={{ marginBottom: 'var(--space-2)' }}>{gl.variantMultiAvatarTitle}</h4>
                <p className="section-description" style={{ marginBottom: 'var(--space-3)' }}>{gl.variantMultiAvatarDesc}</p>
                <NeuronDropdown
                  label="Team member"
                  placeholder="Search team member..."
                  options={TEAM_OPTIONS}
                  value={varMultiAvatar}
                  onChange={(v) => setVarMultiAvatar(v as string[])}
                  multiple
                  withAvatar
                  searchable
                />
              </div>

              {/* Searchable */}
              <div>
                <h4 className="section-subtitle" style={{ marginBottom: 'var(--space-2)' }}>{gl.variantSearchTitle}</h4>
                <p className="section-description" style={{ marginBottom: 'var(--space-3)' }}>{gl.variantSearchDesc}</p>
                <NeuronDropdown
                  label="Country"
                  placeholder="Search country..."
                  options={COUNTRY_OPTIONS}
                  value={varSearch}
                  onChange={(v) => setVarSearch(v as string)}
                  searchable
                />
              </div>
            </div>
          </div>

          {/* ── Sizes ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.sizesTitle}</h2>
            <p className="section-description">{gl.sizesDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-5)' }}>
              <div>
                <NeuronBadge variant="gray" size="xs" style={{ marginBottom: 'var(--space-2)' }}>{gl.sizeSmLabel}</NeuronBadge>
                <NeuronDropdown
                  label="Team member"
                  placeholder="Select member"
                  options={TEAM_OPTIONS}
                  value="iqbal"
                  onChange={() => {}}
                  size="sm"
                  withAvatar
                />
                <p className="section-description" style={{ marginTop: 'var(--space-2)', fontSize: 'var(--fs-text-xs)' }}>{gl.sizeSmUsage}</p>
              </div>
              <div>
                <NeuronBadge variant="brand" size="xs" style={{ marginBottom: 'var(--space-2)' }}>{gl.sizeMdLabel}</NeuronBadge>
                <NeuronDropdown
                  label="Team member"
                  placeholder="Select member"
                  options={TEAM_OPTIONS}
                  value="iqbal"
                  onChange={() => {}}
                  size="md"
                  withAvatar
                />
                <p className="section-description" style={{ marginTop: 'var(--space-2)', fontSize: 'var(--fs-text-xs)' }}>{gl.sizeMdUsage}</p>
              </div>
              <div>
                <NeuronBadge variant="gray" size="xs" style={{ marginBottom: 'var(--space-2)' }}>{gl.sizeLgLabel}</NeuronBadge>
                <NeuronDropdown
                  label="Team member"
                  placeholder="Select member"
                  options={TEAM_OPTIONS}
                  value="iqbal"
                  onChange={() => {}}
                  size="lg"
                  withAvatar
                />
                <p className="section-description" style={{ marginTop: 'var(--space-2)', fontSize: 'var(--fs-text-xs)' }}>{gl.sizeLgUsage}</p>
              </div>
            </div>
          </div>

          {/* ── States ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.statesTitle}</h2>
            <p className="section-description">{gl.statesDesc}</p>

            <div className="select-states-grid" style={{ marginTop: 'var(--space-5)' }}>
              <div className="select-state-item">
                <div className="select-state-item__label">{gl.stateDefault}</div>
                <NeuronDropdown
                  placeholder="Select team member"
                  options={TEAM_OPTIONS}
                  value={stateDefault}
                  onChange={(v) => setStateDefault(v as string)}
                />
              </div>
              <div className="select-state-item">
                <div className="select-state-item__label">{gl.stateFilled}</div>
                <NeuronDropdown
                  placeholder="Select team member"
                  options={TEAM_OPTIONS}
                  value={stateFilled}
                  onChange={(v) => setStateFilled(v as string)}
                />
              </div>
              <div className="select-state-item">
                <div className="select-state-item__label">{gl.stateDisabled}</div>
                <NeuronDropdown
                  placeholder="Select team member"
                  options={TEAM_OPTIONS}
                  value="iqbal"
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="select-state-item">
                <div className="select-state-item__label">{gl.stateError}</div>
                <NeuronDropdown
                  placeholder="Select team member"
                  options={TEAM_OPTIONS}
                  value={stateError}
                  onChange={(v) => setStateError(v as string)}
                  state="error"
                  helperText="This field is required"
                />
              </div>
              <div className="select-state-item">
                <div className="select-state-item__label">{gl.stateSuccess}</div>
                <NeuronDropdown
                  placeholder="Select team member"
                  options={TEAM_OPTIONS}
                  value={stateSuccess}
                  onChange={(v) => setStateSuccess(v as string)}
                  state="success"
                  helperText="Valid selection"
                />
              </div>
            </div>
          </div>

          {/* ── When to Use ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenTitle}</h2>
            <p className="section-description">{gl.whenDesc}</p>

            <div className="when-to-use-grid">
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--brand-50)', color: 'var(--brand-600)' }}>
                    <ListFilter size={18} />
                  </div>
                  <NeuronBadge variant="brand" size="xs">Single Select</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenFormTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenFormDesc}</p>
              </div>
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}>
                    <Users size={18} />
                  </div>
                  <NeuronBadge variant="neutral" size="xs">Avatar + Search</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenTeamTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenTeamDesc}</p>
              </div>
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--sky-50)', color: 'var(--sky-600)' }}>
                    <Search size={18} />
                  </div>
                  <NeuronBadge variant="info" size="xs">Searchable</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenFilterTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenFilterDesc}</p>
              </div>
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}>
                    <Tag size={18} />
                  </div>
                  <NeuronBadge variant="success" size="xs">Multi-Select</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenMultiTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenMultiDesc}</p>
              </div>
            </div>
          </div>

          {/* ── Do's & Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              <RuleCard type="do">
                <strong>{gl.do1Title}</strong>
                <p>{gl.do1Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <strong>{gl.dont1Title}</strong>
                <p>{gl.dont1Desc}</p>
              </RuleCard>
              <RuleCard type="do">
                <strong>{gl.do2Title}</strong>
                <p>{gl.do2Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <strong>{gl.dont2Title}</strong>
                <p>{gl.dont2Desc}</p>
              </RuleCard>
              <RuleCard type="do">
                <strong>{gl.do3Title}</strong>
                <p>{gl.do3Desc}</p>
              </RuleCard>
              <RuleCard type="dont">
                <strong>{gl.dont3Title}</strong>
                <p>{gl.dont3Desc}</p>
              </RuleCard>
            </div>
          </div>

          {/* ── Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.a11yTitle}</h2>
            <p className="section-description">{gl.a11yDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--sky-50)', color: 'var(--sky-600)' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <NeuronBadge variant="info" size="xs">ARIA 1.2</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.a11yRoleTitle}</h4>
                <p className="when-to-use-card__desc">{gl.a11yRoleDesc}</p>
              </div>
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}>
                    <ChevronDown size={18} />
                  </div>
                  <NeuronBadge variant="neutral" size="xs">Keyboard</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.a11yKeyboardTitle}</h4>
                <p className="when-to-use-card__desc">{gl.a11yKeyboardDesc}</p>
              </div>
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}>
                    <Layers size={18} />
                  </div>
                  <NeuronBadge variant="success" size="xs">Focus Ring</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.a11yFocusTitle}</h4>
                <p className="when-to-use-card__desc">{gl.a11yFocusDesc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">
          {/* ── Pattern 1: Team Member Assignment ── */}
          <div className="section-card">
            <h2 className="section-title">1. {dt.pattern1Title}</h2>
            <p className="section-description">{dt.pattern1Desc}</p>

            <div style={{ maxWidth: 400, marginTop: 'var(--space-5)' }}>
              <NeuronDropdown
                label="Team member"
                placeholder="Select team member"
                options={TEAM_OPTIONS}
                value={playTeam}
                onChange={(v) => setPlayTeam(v as string)}
                withAvatar
                required
              />
            </div>
          </div>

          {/* ── Pattern 2: Multi-Tag Category Filter ── */}
          <div className="section-card">
            <h2 className="section-title">2. {dt.pattern2Title}</h2>
            <p className="section-description">{dt.pattern2Desc}</p>

            <div style={{ maxWidth: 400, marginTop: 'var(--space-5)' }}>
              <NeuronDropdown
                label="Categories"
                placeholder="Select categories"
                options={CATEGORY_OPTIONS}
                value={playMultiCat}
                onChange={(v) => setPlayMultiCat(v as string[])}
                multiple
              />
            </div>
          </div>

          {/* ── Pattern 3: Country Picker ── */}
          <div className="section-card">
            <h2 className="section-title">3. {dt.pattern3Title}</h2>
            <p className="section-description">{dt.pattern3Desc}</p>

            <div style={{ maxWidth: 400, marginTop: 'var(--space-5)' }}>
              <NeuronDropdown
                label="Country"
                placeholder="Search country..."
                options={COUNTRY_OPTIONS}
                value={playCountry}
                onChange={(v) => setPlayCountry(v as string)}
                searchable
              />
            </div>
          </div>

          {/* ── Pattern 4: Figma Component Variants (Dropdown menu) ── */}
          <div className="section-card">
            <h2 className="section-title">4. {dt.pattern4Title || 'Figma Component Variants (Dropdown menu)'}</h2>
            <p className="section-description">
              {dt.pattern4Desc || 'Interactive Figma component inspector and 6-variant matrix matching Figma properties: Icon, Checkbox, Shortcut, and Header.'}
            </p>

            {/* Figma Properties Inspector Workbench */}
            <div className="figma-workbench-container">
              {/* Left: Figma Properties Inspector (matching the Figma sidebar panel screenshot) */}
              <div className="figma-inspector-card">
                <div className="figma-inspector-panel">
                  {/* Card Header: Dropdown menu + Figma action icons */}
                  <div className="figma-inspector-header">
                    <span className="figma-inspector-title">Dropdown menu</span>
                    <div className="figma-inspector-top-actions">
                      <button type="button" className="figma-inspector-action-btn" title="Component">
                        <Layers size={15} />
                      </button>
                      <button type="button" className="figma-inspector-action-btn" title="Component set">
                        <Grid size={15} />
                      </button>
                      <button type="button" className="figma-inspector-action-btn" title="Variants">
                        <SlidersHorizontal size={15} />
                      </button>
                      <button type="button" className="figma-inspector-action-btn" title="More options">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Section Label: Current variant */}
                  <div className="figma-inspector-section-label">
                    <span>{gl.currentVariant || 'Current variant'}</span>
                    <button type="button" className="figma-inspector-action-btn" title="Go to main component">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  {/* 4 Variant Select Rows */}
                  <div className="figma-inspector-rows">
                    {/* Row 1: Icon */}
                    <div className="figma-inspector-row">
                      <span className="figma-inspector-row-label">{gl.figmaPropIcon || 'Icon'}</span>
                      <div className="figma-inspector-select-wrapper">
                        <select
                          className="figma-inspector-select"
                          value={figmaIcon ? 'True' : 'False'}
                          onChange={(e) => setFigmaIcon(e.target.value === 'True')}
                        >
                          <option value="False">False</option>
                          <option value="True">True</option>
                        </select>
                        <span className="figma-inspector-select-icon">
                          <ChevronDown size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Row 2: Checkbox */}
                    <div className="figma-inspector-row">
                      <span className="figma-inspector-row-label">{gl.figmaPropCheckbox || 'Checkbox'}</span>
                      <div className="figma-inspector-select-wrapper">
                        <select
                          className="figma-inspector-select"
                          value={figmaCheckbox ? 'True' : 'False'}
                          onChange={(e) => setFigmaCheckbox(e.target.value === 'True')}
                        >
                          <option value="False">False</option>
                          <option value="True">True</option>
                        </select>
                        <span className="figma-inspector-select-icon">
                          <ChevronDown size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Row 3: Shortcut */}
                    <div className="figma-inspector-row">
                      <span className="figma-inspector-row-label">{gl.figmaPropShortcut || 'Shortcut'}</span>
                      <div className="figma-inspector-select-wrapper">
                        <select
                          className="figma-inspector-select"
                          value={figmaShortcut ? 'True' : 'False'}
                          onChange={(e) => setFigmaShortcut(e.target.value === 'True')}
                        >
                          <option value="False">False</option>
                          <option value="True">True</option>
                        </select>
                        <span className="figma-inspector-select-icon">
                          <ChevronDown size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Row 4: Header */}
                    <div className="figma-inspector-row">
                      <span className="figma-inspector-row-label">{gl.figmaPropHeader || 'Header'}</span>
                      <div className="figma-inspector-select-wrapper">
                        <select
                          className="figma-inspector-select"
                          value={figmaHeader ? 'True' : 'False'}
                          onChange={(e) => setFigmaHeader(e.target.value === 'True')}
                        >
                          <option value="False">False</option>
                          <option value="True">True</option>
                        </select>
                        <span className="figma-inspector-select-icon">
                          <ChevronDown size={14} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Code preview banner */}
                  <div style={{
                    marginTop: 'var(--space-2)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-subtle)',
                    border: '1px solid var(--color-border)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: 'var(--color-text-secondary)',
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                  }}>
{`<NeuronDropdownMenu
  icon={${figmaIcon}}
  checkbox={${figmaCheckbox}}
  shortcut={${figmaShortcut}}
  header={${figmaHeader}}
/>`}
                  </div>
                </div>
              </div>

              {/* Right: Live Interactive Stage */}
              <div className="figma-preview-stage">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                      {gl.figmaLivePreview || 'Live Interactive Canvas'}
                    </span>
                    <NeuronBadge variant="brand" size="xs">
                      {`Icon: ${figmaIcon ? 'True' : 'False'} · Checkbox: ${figmaCheckbox ? 'True' : 'False'} · Shortcut: ${figmaShortcut ? 'True' : 'False'} · Header: ${figmaHeader ? 'True' : 'False'}`}
                    </NeuronBadge>
                  </div>
                  {/* Test Trigger Button */}
                  <NeuronDropdownMenu
                    icon={figmaIcon}
                    checkbox={figmaCheckbox}
                    shortcut={figmaShortcut}
                    header={figmaHeader}
                    trigger={
                      <NeuronButton variant="secondary" size="sm" trailingIcon={<ChevronDown size={14} />}>
                        Test Trigger
                      </NeuronButton>
                    }
                    align="end"
                    width={260}
                  />
                </div>

                {/* Embedded static preview rendering current Figma variants */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <NeuronDropdownMenu
                    embedded
                    icon={figmaIcon}
                    checkbox={figmaCheckbox}
                    shortcut={figmaShortcut}
                    header={figmaHeader}
                    width={260}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Playground ── */}
          <div className="section-card">
            <h2 className="section-title">5. {t.compShared.playground}</h2>
            <p className="section-description">
              Configure props interactively and see the generated Vue 3, React, and HTML code in real time.
            </p>

            <Playground
              name="NeuronDropdown"
              knobs={[
                {
                  name: 'size',
                  label: 'Size',
                  type: 'select' as const,
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                },
                {
                  name: 'state',
                  label: 'State',
                  type: 'select' as const,
                  options: ['default', 'error', 'success'],
                  default: 'default',
                },
                {
                  name: 'multiple',
                  label: 'Multiple',
                  type: 'boolean' as const,
                  default: false,
                },
                {
                  name: 'searchable',
                  label: 'Searchable',
                  type: 'boolean' as const,
                  default: false,
                },
                {
                  name: 'withAvatar',
                  label: 'With Avatar',
                  type: 'boolean' as const,
                  default: false,
                },
                {
                  name: 'disabled',
                  label: 'Disabled',
                  type: 'boolean' as const,
                  default: false,
                },
              ]}
              codeTemplates={(state) => {
                const reactLines = [
                  `  label="Team member"`,
                  `  placeholder="Select team member"`,
                  `  options={options}`,
                  `  size="${state.size}"`,
                ];
                if (state.multiple)   reactLines.push(`  multiple`);
                if (state.searchable) reactLines.push(`  searchable`);
                if (state.withAvatar) reactLines.push(`  withAvatar`);
                if (state.disabled)   reactLines.push(`  disabled`);
                if (state.state !== 'default') reactLines.push(`  state="${state.state}"`);

                const vueLines = [
                  `  label="Team member"`,
                  `  placeholder="Select team member"`,
                  `  :options="options"`,
                  `  size="${state.size}"`,
                ];
                if (state.multiple)   vueLines.push(`  multiple`);
                if (state.searchable) vueLines.push(`  searchable`);
                if (state.withAvatar) vueLines.push(`  with-avatar`);
                if (state.disabled)   vueLines.push(`  disabled`);
                if (state.state !== 'default') vueLines.push(`  state="${state.state}"`);

                const disabledCls = state.disabled ? ' neuron-dropdown--disabled' : '';
                const stateCls = state.state !== 'default' ? ` neuron-dropdown--${state.state}` : '';

                return {
                  react: `<NeuronDropdown\n${reactLines.join('\n')}\n/>`,
                  vue:   `<NeuronDropdown\n${vueLines.join('\n')}\n/>`,
                  html:  `<div class="neuron-dropdown neuron-dropdown--${state.size}${disabledCls}${stateCls}">\n  <button class="neuron-dropdown__trigger">\n    Select team member\n    <svg class="neuron-dropdown__chevron">...</svg>\n  </button>\n</div>`,
                };
              }}
            >
              {(state) => (
                <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
                  <NeuronDropdown
                    label="Team member"
                    placeholder="Select team member"
                    options={TEAM_OPTIONS}
                    value={pgValue}
                    onChange={(v) => setPgValue(v)}
                    size={state.size as 'sm' | 'md' | 'lg'}
                    multiple={state.multiple as boolean}
                    searchable={state.searchable as boolean}
                    withAvatar={state.withAvatar as boolean}
                    disabled={state.disabled as boolean}
                    state={state.state as 'default' | 'error' | 'success'}
                    helperText={
                      state.state === 'error'   ? 'This field is required' :
                      state.state === 'success' ? 'Valid selection' : ''
                    }
                  />
                </div>
              )}
            </Playground>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-datepicker', label: t.nav.compDatePicker }}
        next={{ id: 'comp-input', label: t.nav.compInput }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export { DropdownView as SelectView };
