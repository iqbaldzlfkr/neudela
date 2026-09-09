import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import NeuronTable, { NeuronTableColumn } from '../components/NeuronTable';
import NeuronBadge from '../components/NeuronBadge';
import NeuronAvatar from '../components/NeuronAvatar';
import NeuronCheckbox from '../components/NeuronCheckbox';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import {
  MoreHorizontal,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Cpu,
  Activity,
  Layers,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
  Filter,
  CheckSquare,
  Search,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  List,
  BarChart2,
  FileText
} from 'lucide-react';

interface TableViewProps {
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
// Anatomy Card Component
// ─────────────────────────────────────────────
interface TableAnatomyCardProps {
  number: number;
  label: string;
  desc: string;
  tokens: string[];
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function TableAnatomyCard({
  number,
  label,
  desc,
  tokens,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: TableAnatomyCardProps) {
  return (
    <div
      className={`table-anatomy-card ${isActive ? 'is-active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="table-anatomy-card-top">
        <span className={`table-anatomy-marker-pin ${isActive ? 'is-active' : ''}`}>{number}</span>
        <span className="table-anatomy-card-title">{label}</span>
      </div>
      <p className="table-anatomy-card-desc">{desc}</p>
      <div className="table-anatomy-card-tokens">
        {tokens.map((tok, i) => (
          <span key={i} className="table-anatomy-token-pill">
            {tok}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Types for Sample Datasets
// ─────────────────────────────────────────────
interface ProjectTaskRecord {
  id: number;
  no: number;
  projectName: string;
  category: string;
  owner: string;
  status: 'Approved' | 'In Review' | 'Active' | 'Pending';
  priority: 'High' | 'Medium' | 'Low';
  recordsCount: number;
  created: string;
}

interface UserManagementRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  department: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

interface FinancialRecord {
  id: string;
  invoice: string;
  customer: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Refunded';
  date: string;
  method: string;
}

interface ServerMetricRecord {
  id: string;
  node: string;
  region: string;
  cpu: number;
  memory: number;
  network: string;
  uptime: string;
  health: 'Healthy' | 'Warning' | 'Critical';
}

// ─────────────────────────────────────────────
// Dataset: Generic Enterprise Projects & Tasks (Dummy Data)
// ─────────────────────────────────────────────
const DUMMY_PROJECT_DATA: ProjectTaskRecord[] = [
  { id: 1, no: 1, projectName: 'Design System Token Migration', category: 'Design System', owner: 'Alex Morgan', status: 'Approved', priority: 'High', recordsCount: 1420, created: '2026-03-15' },
  { id: 2, no: 2, projectName: 'Cloud Infrastructure Audit', category: 'DevOps', owner: 'Sarah Chen', status: 'Pending', priority: 'Medium', recordsCount: 890, created: '2026-03-12' },
  { id: 3, no: 3, projectName: 'API Gateway Rate Limiting', category: 'Backend', owner: 'Marcus Brody', status: 'Active', priority: 'High', recordsCount: 3240, created: '2026-03-10' },
  { id: 4, no: 4, projectName: 'Customer Portal Redesign', category: 'Frontend', owner: 'Elena Rostova', status: 'In Review', priority: 'Medium', recordsCount: 512, created: '2026-03-08' },
  { id: 5, no: 5, projectName: 'OAuth 2.1 Security Protocols', category: 'Security', owner: 'David Kim', status: 'Approved', priority: 'High', recordsCount: 2048, created: '2026-03-05' },
  { id: 6, no: 6, projectName: 'Real-time Analytics Pipeline', category: 'Data Platform', owner: 'Sophia Taylor', status: 'Active', priority: 'High', recordsCount: 1840, created: '2026-03-01' },
  { id: 7, no: 7, projectName: 'Global CDN Cache Optimization', category: 'Infrastructure', owner: 'Lucas Vance', status: 'In Review', priority: 'Medium', recordsCount: 960, created: '2026-02-26' },
  { id: 8, no: 8, projectName: 'Automated Billing Service', category: 'Finance', owner: 'Aria Patel', status: 'Approved', priority: 'High', recordsCount: 4200, created: '2026-02-22' },
  { id: 9, no: 9, projectName: 'Mobile Push Notification Engine', category: 'Mobile', owner: 'Noah Williams', status: 'Active', priority: 'Low', recordsCount: 680, created: '2026-02-18' },
  { id: 10, no: 10, projectName: 'Microservices Health Check', category: 'DevOps', owner: 'Chloe Bennet', status: 'Pending', priority: 'Medium', recordsCount: 1150, created: '2026-02-14' },
  { id: 11, no: 11, projectName: 'Single Sign-On (SSO) Rollout', category: 'Security', owner: 'Ethan Hunt', status: 'Approved', priority: 'High', recordsCount: 2890, created: '2026-02-10' },
  { id: 12, no: 12, projectName: 'Database Sharding & Indexing', category: 'Database', owner: 'Grace Hopper', status: 'Active', priority: 'High', recordsCount: 5600, created: '2026-02-05' },
];

// ─────────────────────────────────────────────
// Dataset: User Management
// ─────────────────────────────────────────────
const USER_MANAGEMENT_DATA: UserManagementRecord[] = [
  { id: 'usr-1', name: 'Iqbal Dzulfikar', email: 'iqbal@neudela.design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', role: 'Admin', department: 'Product Design', status: 'Active', lastActive: '2 mins ago' },
  { id: 'usr-2', name: 'Phoenix Baker', email: 'phoenix@neudela.design', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'Admin', department: 'Engineering', status: 'Active', lastActive: '14 mins ago' },
  { id: 'usr-3', name: 'Lana Steiner', email: 'lana@neudela.design', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Editor', department: 'Marketing & Brand', status: 'Active', lastActive: '1 hour ago' },
  { id: 'usr-4', name: 'Demi Wilkinson', email: 'demi@neudela.design', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80', role: 'Editor', department: 'Design System', status: 'Invited', lastActive: 'Yesterday' },
  { id: 'usr-5', name: 'Candice Wu', email: 'candice@neudela.design', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', role: 'Viewer', department: 'Finance & Ops', status: 'Active', lastActive: '3 days ago' },
  { id: 'usr-6', name: 'Natali Craig', email: 'natali@neudela.design', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', role: 'Viewer', department: 'Customer Success', status: 'Suspended', lastActive: '2 weeks ago' },
];

// ─────────────────────────────────────────────
// Dataset: Financial Invoices
// ─────────────────────────────────────────────
const FINANCIAL_DATA: FinancialRecord[] = [
  { id: 'inv-101', invoice: 'INV-2026-0089', customer: 'Acme Telecom Global', amount: 14250.00, currency: 'USD', status: 'Paid', date: 'Jul 2, 2026', method: 'Wire Transfer' },
  { id: 'inv-102', invoice: 'INV-2026-0090', customer: 'Starlight Networks Pte', amount: 8900.50, currency: 'USD', status: 'Paid', date: 'Jul 1, 2026', method: 'Credit Card' },
  { id: 'inv-103', invoice: 'INV-2026-0091', customer: 'Pacific Fiber Link Ltd', amount: 24700.00, currency: 'USD', status: 'Pending', date: 'Jun 28, 2026', method: 'ACH Transfer' },
  { id: 'inv-104', invoice: 'INV-2026-0092', customer: 'Nordic Cloud Data AS', amount: 5320.25, currency: 'USD', status: 'Overdue', date: 'Jun 15, 2026', method: 'Wire Transfer' },
  { id: 'inv-105', invoice: 'INV-2026-0093', customer: 'Apex Data Exchange', amount: 1240.00, currency: 'USD', status: 'Refunded', date: 'Jun 10, 2026', method: 'Credit Card' },
];

// ─────────────────────────────────────────────
// Dataset: Server Telemetry
// ─────────────────────────────────────────────
const SERVER_METRIC_DATA: ServerMetricRecord[] = [
  { id: 'srv-1', node: 'ap-southeast-1a', region: 'Singapore', cpu: 24.5, memory: 42.1, network: '1.2 Gbps', uptime: '99.98%', health: 'Healthy' },
  { id: 'srv-2', node: 'ap-southeast-1b', region: 'Singapore', cpu: 78.2, memory: 86.4, network: '3.8 Gbps', uptime: '99.95%', health: 'Warning' },
  { id: 'srv-3', node: 'us-east-1a', region: 'Virginia', cpu: 32.0, memory: 55.7, network: '2.1 Gbps', uptime: '100.00%', health: 'Healthy' },
  { id: 'srv-4', node: 'eu-west-1a', region: 'Ireland', cpu: 94.1, memory: 91.2, network: '5.6 Gbps', uptime: '98.42%', health: 'Critical' },
  { id: 'srv-5', node: 'ap-northeast-1a', region: 'Tokyo', cpu: 18.3, memory: 34.9, network: '840 Mbps', uptime: '99.99%', health: 'Healthy' },
];

// ─────────────────────────────────────────────
// Main View
// ─────────────────────────────────────────────
export default function TableView({ setActiveTab }: TableViewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');

  const dt = t.table;
  const gl = dt.guideline;

  // Visual Specification state management
  const [specToolbar, setSpecToolbar] = useState(true);
  const [specFilter, setSpecFilter] = useState(true);
  const [specSort, setSpecSort] = useState(true);
  const [specSearch, setSpecSearch] = useState(true);
  const [specSelectable, setSpecSelectable] = useState(false);
  const [specStickyAction, setSpecStickyAction] = useState(true);
  const [specVariant, setSpecVariant] = useState<'default' | 'striped' | 'bordered'>('default');
  const [specSize, setSpecSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [specSelectedKeys, setSpecSelectedKeys] = useState<(string | number)[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Playbook user selection state
  const [selectedUserKeys, setSelectedUserKeys] = useState<(string | number)[]>([]);

  // Anatomy interactive highlight zone state
  const [activeAnatomyZone, setActiveAnatomyZone] = useState<number | null>(null);

  // Anatomy interactive checkbox selection states
  const [anatomyRow1Selected, setAnatomyRow1Selected] = useState(true);
  const [anatomyRow2Selected, setAnatomyRow2Selected] = useState(false);

  const isAnatomyAllSelected = anatomyRow1Selected && anatomyRow2Selected;
  const isAnatomyIndeterminate = (anatomyRow1Selected || anatomyRow2Selected) && !isAnatomyAllSelected;

  const handleAnatomySelectAll = (checked: boolean) => {
    setAnatomyRow1Selected(checked);
    setAnatomyRow2Selected(checked);
  };

  // Anatomy table horizontal scroll tracking for dynamic sticky column shadow
  const anatomyWrapperRef = useRef<HTMLDivElement>(null);
  const [anatomyScrollRight, setAnatomyScrollRight] = useState(false);
  const [anatomyScrollLeft, setAnatomyScrollLeft] = useState(false);

  // Anatomy pagination state
  const [anatomyPage, setAnatomyPage] = useState(1);
  const [anatomyPageSize, setAnatomyPageSize] = useState('10');

  const checkAnatomyScroll = useCallback(() => {
    const el = anatomyWrapperRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const hasOverflow = scrollWidth > clientWidth + 2;
    const atLeft = scrollLeft <= 2;
    const atRight = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2;

    setAnatomyScrollLeft(hasOverflow && !atLeft);
    setAnatomyScrollRight(hasOverflow && !atRight);
  }, []);

  useEffect(() => {
    const el = anatomyWrapperRef.current;
    if (!el) return;

    checkAnatomyScroll();

    el.addEventListener('scroll', checkAnatomyScroll, { passive: true });
    window.addEventListener('resize', checkAnatomyScroll);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => checkAnatomyScroll());
      ro.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', checkAnatomyScroll);
      window.removeEventListener('resize', checkAnatomyScroll);
      if (ro) ro.disconnect();
    };
  }, [checkAnatomyScroll]);

  // Action toast auto-dismiss
  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 2500);
  };

  // Reset Visual Specification controls to default
  const handleResetSpec = () => {
    setSpecToolbar(true);
    setSpecFilter(true);
    setSpecSort(true);
    setSpecSearch(true);
    setSpecSelectable(false);
    setSpecStickyAction(true);
    setSpecVariant('default');
    setSpecSize('md');
    setSpecSelectedKeys([]);
    showNotice('Visual specification controls reset to default');
  };

  // ── Column Definitions: Generic Enterprise Project Tasks (Dummy Data) ──
  const projectTaskColumns: NeuronTableColumn<ProjectTaskRecord>[] = useMemo(() => {
    const cols: NeuronTableColumn<ProjectTaskRecord>[] = [
      {
        key: 'no',
        label: 'No',
        width: 56,
        align: 'left',
      },
      {
        key: 'projectName',
        label: 'Project Name',
        sortable: specSort,
        render: (value) => (
          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {value}
          </span>
        ),
      },
      {
        key: 'category',
        label: 'Category',
        sortable: specSort,
        render: (value) => (
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
            {value}
          </span>
        ),
      },
      {
        key: 'owner',
        label: 'Owner',
        sortable: specSort,
        render: (value) => (
          <span style={{ color: 'var(--color-text-secondary)' }}>
            {value}
          </span>
        ),
      },
      {
        key: 'status',
        label: 'Status',
        sortable: specSort,
        width: 120,
        render: (value: 'Approved' | 'In Review' | 'Active' | 'Pending') => {
          const badgeSize = specSize === 'sm' ? 'sm' : 'md';
          const variantMap = {
            Approved: 'success',
            Active: 'brand',
            'In Review': 'warning',
            Pending: 'neutral',
          } as const;

          return (
            <NeuronBadge
              variant={variantMap[value] || 'neutral'}
              size={badgeSize}
              pill
              style={{ minWidth: 80, justifyContent: 'center' }}
            >
              {value}
            </NeuronBadge>
          );
        },
      },
      {
        key: 'priority',
        label: 'Priority',
        sortable: specSort,
        width: 100,
        render: (value: 'High' | 'Medium' | 'Low') => {
          const badgeSize = specSize === 'sm' ? 'sm' : 'md';
          const variantMap = {
            High: 'error',
            Medium: 'warning',
            Low: 'gray',
          } as const;

          return (
            <NeuronBadge
              variant={variantMap[value] || 'gray'}
              size={badgeSize}
              pill
              style={{ minWidth: 64, justifyContent: 'center' }}
            >
              {value}
            </NeuronBadge>
          );
        },
      },
      {
        key: 'recordsCount',
        label: 'Records',
        align: 'right',
        sortable: specSort,
        render: (value) => (
          <span style={{ fontFamily: 'var(--font-family-mono, monospace)', color: 'var(--color-text-secondary)' }}>
            {Number(value).toLocaleString()}
          </span>
        ),
      },
      {
        key: 'created',
        label: 'Created',
        sortable: specSort,
        render: (value) => (
          <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', fontSize: '13px' }}>
            {value}
          </span>
        ),
      },
    ];

    if (specStickyAction) {
      cols.push({
        key: 'action',
        label: 'Action',
        width: 80,
        align: 'center',
        sticky: 'right',
        render: (_, record) => (
          <button
            type="button"
            className="neuron-table-action-btn"
            title="Options"
            aria-label={`Options for ${record.projectName}`}
            onClick={(e) => {
              e.stopPropagation();
              showNotice(`Action clicked for ${record.projectName} (Row #${record.no})`);
            }}
          >
            <MoreHorizontal size={18} />
          </button>
        ),
      });
    }

    return cols;
  }, [specStickyAction, specSort, specSize]);

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
          {/* Action Notification Toast */}
          {actionNotice && (
            <div className="copy-toast show">
              <Sparkles size={16} color="var(--brand-400)" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* ── 1. Visual Specification ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.overviewTitle}</h2>
            <p className="section-description">{gl.overviewDesc}</p>

            {/* Quick Architecture & Token Highlights */}
            <div className="table-spec-highlight-grid">
              <div className="table-spec-highlight-card">
                <div
                  className="table-spec-highlight-icon"
                  style={{ backgroundColor: 'rgba(223, 126, 48, 0.12)', color: 'var(--brand-600)' }}
                >
                  <Sliders size={18} />
                </div>
                <div className="table-spec-highlight-content">
                  <span className="table-spec-highlight-label">Row Density</span>
                  <span className="table-spec-highlight-val">3 Scales</span>
                  <span className="table-spec-highlight-sub">sm (36px) · md (48px) · lg (56px)</span>
                </div>
              </div>

              <div className="table-spec-highlight-card">
                <div
                  className="table-spec-highlight-icon"
                  style={{ backgroundColor: 'rgba(14, 165, 233, 0.12)', color: '#0ea5e9' }}
                >
                  <Layers size={18} />
                </div>
                <div className="table-spec-highlight-content">
                  <span className="table-spec-highlight-label">Style Variants</span>
                  <span className="table-spec-highlight-val">3 Formats</span>
                  <span className="table-spec-highlight-sub">Default · Striped (Zebra) · Bordered</span>
                </div>
              </div>

              <div className="table-spec-highlight-card">
                <div
                  className="table-spec-highlight-icon"
                  style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}
                >
                  <Filter size={18} />
                </div>
                <div className="table-spec-highlight-content">
                  <span className="table-spec-highlight-label">Enterprise Toolbar</span>
                  <span className="table-spec-highlight-val">Full Suite</span>
                  <span className="table-spec-highlight-sub">Debounced Search, Filter & Sort</span>
                </div>
              </div>

              <div className="table-spec-highlight-card">
                <div
                  className="table-spec-highlight-icon"
                  style={{ backgroundColor: 'rgba(168, 85, 247, 0.12)', color: '#a855f7' }}
                >
                  <CheckSquare size={18} />
                </div>
                <div className="table-spec-highlight-content">
                  <span className="table-spec-highlight-label">Record Operations</span>
                  <span className="table-spec-highlight-val">Select & Sticky</span>
                  <span className="table-spec-highlight-sub">Batch actions & Pinned Actions</span>
                </div>
              </div>
            </div>

            {/* Master Interactive Showcase Card */}
            <div className="table-spec-card">
              {/* Header with Title and Segmented Controls */}
              <div className="table-spec-header">
                <div className="table-spec-title-group">
                  <div className="table-spec-title">{gl.overviewGridTitle}</div>
                  <div className="table-spec-subtitle">{gl.overviewGridDesc}</div>
                </div>

                <div className="table-spec-controls-group">
                  {/* Style Variant Segmented Selector */}
                  <div className="badge-spec-filter-group" title="Select Table Style Variant">
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${specVariant === 'default' ? 'is-active' : ''}`}
                      onClick={() => setSpecVariant('default')}
                    >
                      Default
                    </button>
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${specVariant === 'striped' ? 'is-active' : ''}`}
                      onClick={() => setSpecVariant('striped')}
                    >
                      Striped
                    </button>
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${specVariant === 'bordered' ? 'is-active' : ''}`}
                      onClick={() => setSpecVariant('bordered')}
                    >
                      Bordered
                    </button>
                  </div>

                  {/* Density Scale Segmented Selector */}
                  <div className="badge-spec-filter-group" title="Select Table Row Density">
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${specSize === 'sm' ? 'is-active' : ''}`}
                      onClick={() => setSpecSize('sm')}
                    >
                      sm (36px)
                    </button>
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${specSize === 'md' ? 'is-active' : ''}`}
                      onClick={() => setSpecSize('md')}
                    >
                      md (48px)
                    </button>
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${specSize === 'lg' ? 'is-active' : ''}`}
                      onClick={() => setSpecSize('lg')}
                    >
                      lg (56px)
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-bar: Interactive Feature Toggles */}
              <div className="table-spec-toolbar">
                <div className="table-spec-toggle-group">
                  <span className="table-spec-toggle-label">Features:</span>

                  <button
                    type="button"
                    onClick={() => setSpecToolbar(prev => !prev)}
                    className={`table-spec-toggle-btn ${specToolbar ? 'is-active' : ''}`}
                    title="Toggle Top Toolbar Visibility"
                  >
                    <span className="table-spec-toggle-indicator" />
                    <span>Toolbar: {specToolbar ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecSearch(prev => !prev)}
                    disabled={!specToolbar}
                    className={`table-spec-toggle-btn ${specSearch && specToolbar ? 'is-active' : ''}`}
                    style={{ opacity: !specToolbar ? 0.45 : 1, cursor: !specToolbar ? 'not-allowed' : 'pointer' }}
                    title="Toggle Search Input"
                  >
                    <span className="table-spec-toggle-indicator" />
                    <span>Search: {specSearch && specToolbar ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecFilter(prev => !prev)}
                    disabled={!specToolbar}
                    className={`table-spec-toggle-btn ${specFilter && specToolbar ? 'is-active' : ''}`}
                    style={{ opacity: !specToolbar ? 0.45 : 1, cursor: !specToolbar ? 'not-allowed' : 'pointer' }}
                    title="Toggle Filter Trigger Button"
                  >
                    <span className="table-spec-toggle-indicator" />
                    <span>Filter: {specFilter && specToolbar ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecSort(prev => !prev)}
                    className={`table-spec-toggle-btn ${specSort ? 'is-active' : ''}`}
                    title="Toggle Column Header Sorting"
                  >
                    <span className="table-spec-toggle-indicator" />
                    <span>Sort: {specSort ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSpecSelectable(prev => !prev);
                      if (specSelectable) setSpecSelectedKeys([]);
                    }}
                    className={`table-spec-toggle-btn ${specSelectable ? 'is-active' : ''}`}
                    title="Toggle Row Selection Checkboxes"
                  >
                    <span className="table-spec-toggle-indicator" />
                    <span>Row Select: {specSelectable ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecStickyAction(prev => !prev)}
                    className={`table-spec-toggle-btn ${specStickyAction ? 'is-active' : ''}`}
                    title="Toggle Sticky Right Action Column"
                  >
                    <span className="table-spec-toggle-indicator" />
                    <span>Sticky Action: {specStickyAction ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleResetSpec}
                  className="table-spec-reset-btn"
                  title="Reset all toggles and configurations to initial state"
                >
                  <RotateCcw size={12} />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Selection Notification Banner */}
              {specSelectable && specSelectedKeys.length > 0 && (
                <div className="table-spec-banner">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--brand-600)" />
                    <span>
                      <strong>{specSelectedKeys.length} items selected</strong> across current table
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => showNotice(`Exported ${specSelectedKeys.length} selected project records.`)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '4px 10px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <Download size={13} />
                      <span>Export</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        showNotice(`Marked ${specSelectedKeys.length} selected records as Approved.`);
                        setSpecSelectedKeys([]);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '4px 10px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <Check size={13} />
                      <span>Approve</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpecSelectedKeys([])}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        marginLeft: '4px',
                      }}
                    >
                      Deselect All
                    </button>
                  </div>
                </div>
              )}

              {/* Table Wrapper */}
              <div className="table-spec-table-wrap">
                <NeuronTable
                  columns={projectTaskColumns}
                  data={DUMMY_PROJECT_DATA}
                  rowKey="id"
                  size={specSize}
                  variant={specVariant}
                  selectable={specSelectable}
                  selectedRowKeys={specSelectedKeys}
                  onSelectChange={(keys) => setSpecSelectedKeys(keys)}
                  showToolbar={specToolbar}
                  showFilter={specFilter}
                  showSort={specSort}
                  showSearch={specSearch}
                  filterLabel="Filter"
                  sortLabel="Sort By"
                  onFilterClick={() => showNotice('Filter trigger: Opens query modal / facet drawer')}
                  onSortClick={() => showNotice('Sort trigger: Opens multi-column sort modal')}
                  pagination={{
                    pageSize: 10,
                    pageSizeOptions: [10, 25, 50],
                  }}
                />
              </div>

              {/* Visual Spec Token Reference Footer */}
              <div className="table-spec-tokens">
                <div className="table-spec-token-item">
                  <span className="table-spec-token-label">Header Cell</span>
                  <span className="table-spec-token-val">12px · 700 Uppercase</span>
                  <span className="table-spec-token-desc">tracking 0.05em · var(--color-bg-subtle) · sticky support</span>
                </div>
                <div className="table-spec-token-item">
                  <span className="table-spec-token-label">Active Density</span>
                  <span className="table-spec-token-val">{specSize.toUpperCase()} · {specSize === 'sm' ? '36px' : specSize === 'md' ? '48px' : '56px'} height</span>
                  <span className="table-spec-token-desc">Padding: {specSize === 'sm' ? '8px 12px' : specSize === 'md' ? '12px 16px' : '16px 20px'}</span>
                </div>
                <div className="table-spec-token-item">
                  <span className="table-spec-token-label">Active Variant</span>
                  <span className="table-spec-token-val">{specVariant.toUpperCase()}</span>
                  <span className="table-spec-token-desc">{specVariant === 'default' ? 'Clean subtle horizontal dividers' : specVariant === 'striped' ? 'Zebra alternating background' : 'Enclosed grid border frame'}</span>
                </div>
                <div className="table-spec-token-item">
                  <span className="table-spec-token-label">Sticky Column Pinning</span>
                  <span className="table-spec-token-val">Right 0px · Z-Index 3</span>
                  <span className="table-spec-token-desc">Elevated frosted shadow indicator · Pinned on horizontal scroll</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.anatomyTitle}</h2>
            <p className="section-description">{gl.anatomyDesc}</p>

            <div className="table-anatomy-container">
              {/* Interactive Blueprint Schematic Frame */}
              <div className="table-anatomy-blueprint">
                {/* Blueprint Header Status Bar */}
                <div className="table-anatomy-blueprint-bar">
                  <span className="table-anatomy-badge">
                    <Cpu size={13} /> SCHEMATIC · TABLE ANATOMY
                  </span>
                  <span className="table-anatomy-hint">
                    <Sparkles size={13} color="var(--brand-500)" />
                    Hover markers or cards below to highlight zones
                  </span>
                </div>

                {/* The Annotated Table Frame (Zone 1) */}
                <div
                  className={`table-anatomy-frame ${activeAnatomyZone === 1 ? 'is-highlighted' : ''}`}
                  onMouseEnter={() => setActiveAnatomyZone(1)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                >
                  {/* Marker 1: Table Container Outer Frame Pin */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      zIndex: 25,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    title="1. Table Container"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setActiveAnatomyZone(1);
                    }}
                    onMouseLeave={() => setActiveAnatomyZone(null)}
                  >
                    <span className={`table-anatomy-marker-pin ${activeAnatomyZone === 1 ? 'is-active' : ''}`}>
                      1
                    </span>
                  </div>

                  {/* Zone 2: Top Toolbar */}
                  <div
                    className={`neuron-table-toolbar table-anatomy-zone ${activeAnatomyZone === 2 ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveAnatomyZone(2)}
                    onMouseLeave={() => setActiveAnatomyZone(null)}
                    style={{ paddingLeft: '48px' }}
                  >
                    <div className="neuron-table-toolbar__left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        className={`table-anatomy-marker-pin ${activeAnatomyZone === 2 ? 'is-active' : ''}`}
                        title="2. Top Toolbar"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setActiveAnatomyZone(2);
                        }}
                      >
                        2
                      </span>
                      <button type="button" className="neuron-table-btn is-active" style={{ pointerEvents: 'none' }}>
                        <Filter size={14} className="neuron-table-btn__icon" />
                        <span>Filter</span>
                      </button>
                      <button type="button" className="neuron-table-btn" style={{ pointerEvents: 'none' }}>
                        <ArrowUpDown size={14} className="neuron-table-btn__icon" />
                        <span>Sort By</span>
                      </button>
                    </div>

                    <div className="neuron-table-toolbar__right">
                      <div className="neuron-table-search">
                        <Search size={14} className="neuron-table-search__icon" />
                        <input
                          type="text"
                          className="neuron-table-search__input"
                          placeholder="Search projects..."
                          defaultValue="design system"
                          readOnly
                          style={{ pointerEvents: 'none' }}
                        />
                        <button type="button" className="neuron-table-search__clear" style={{ pointerEvents: 'none' }}>
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table Element (Zone 3, Zone 4, Zone 5) */}
                  <div 
                    ref={anatomyWrapperRef}
                    className={`neuron-table-wrapper ${anatomyScrollRight ? 'neuron-table-wrapper--has-scroll-right' : ''} ${anatomyScrollLeft ? 'neuron-table-wrapper--has-scroll-left' : ''}`}
                    style={{ overflowX: 'auto' }}
                    onScroll={checkAnatomyScroll}
                  >
                    <table className="neuron-table neuron-table--md neuron-table--hoverable">
                      {/* Zone 3: Column Headers */}
                      <thead
                        className={`neuron-table__head table-anatomy-zone ${activeAnatomyZone === 3 ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveAnatomyZone(3)}
                        onMouseLeave={() => setActiveAnatomyZone(null)}
                      >
                        <tr className="neuron-table__tr neuron-table__tr--head">
                          <th className="neuron-table__th neuron-table__th--checkbox" style={{ width: 44 }}>
                            <div className="neuron-table__checkbox-wrap">
                              <NeuronCheckbox
                                checked={isAnatomyAllSelected}
                                indeterminate={isAnatomyIndeterminate}
                                onChange={handleAnatomySelectAll}
                                size="md"
                                variant="brand"
                                aria-label="Select all rows"
                              />
                            </div>
                          </th>
                          <th className="neuron-table__th" style={{ width: 70 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span
                                className={`table-anatomy-marker-pin ${activeAnatomyZone === 3 ? 'is-active' : ''}`}
                                title="3. Column Headers"
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setActiveAnatomyZone(3);
                                }}
                              >
                                3
                              </span>
                              <span>NO</span>
                            </div>
                          </th>
                          <th className="neuron-table__th neuron-table__th--sortable">
                            <div className="neuron-table__th-inner">
                              <span>PROJECT NAME</span>
                              <span className="neuron-table__sort-icon is-active">
                                <ArrowUpDown size={12} />
                              </span>
                            </div>
                          </th>
                          <th className="neuron-table__th neuron-table__th--sortable">
                            <div className="neuron-table__th-inner">
                              <span>STATUS</span>
                              <span className="neuron-table__sort-neutral">
                                <ArrowUpDown size={12} />
                              </span>
                            </div>
                          </th>
                          <th className="neuron-table__th">
                            <div className="neuron-table__th-inner">
                              <span>OWNER</span>
                            </div>
                          </th>
                          <th className="neuron-table__th">
                            <div className="neuron-table__th-inner">
                              <span>CREATED</span>
                            </div>
                          </th>
                          {/* Zone 5: Sticky Right Action Column Header */}
                          <th
                            className={`neuron-table__th neuron-table__col--sticky-right table-anatomy-zone ${activeAnatomyZone === 5 ? 'is-active' : ''}`}
                            style={{ width: 84, textAlign: 'center' }}
                            onMouseEnter={() => setActiveAnatomyZone(5)}
                            onMouseLeave={() => setActiveAnatomyZone(3)}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                              <span
                                className={`table-anatomy-marker-pin ${activeAnatomyZone === 5 ? 'is-active' : ''}`}
                                title="5. Action Column"
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setActiveAnatomyZone(5);
                                }}
                              >
                                5
                              </span>
                              <span>ACTION</span>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      {/* Zone 4: Data Rows & Cells */}
                      <tbody
                        className={`neuron-table__body table-anatomy-zone ${activeAnatomyZone === 4 ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveAnatomyZone(4)}
                        onMouseLeave={() => setActiveAnatomyZone(null)}
                      >
                        {/* Sample Row 1 */}
                        <tr className={`neuron-table__tr ${anatomyRow1Selected ? 'neuron-table__tr--selected' : ''}`}>
                          <td className="neuron-table__td neuron-table__td--checkbox">
                            <div className="neuron-table__checkbox-wrap">
                              <NeuronCheckbox
                                checked={anatomyRow1Selected}
                                onChange={(checked) => setAnatomyRow1Selected(checked)}
                                size="md"
                                variant="brand"
                                aria-label="Select row 1"
                              />
                            </div>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ color: 'var(--color-text-secondary)' }}>1</span>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              Design System Token Migration
                            </span>
                          </td>
                          <td className="neuron-table__td">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                className={`table-anatomy-marker-pin ${activeAnatomyZone === 4 ? 'is-active' : ''}`}
                                title="4. Data Rows & Cells"
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setActiveAnatomyZone(4);
                                }}
                              >
                                4
                              </span>
                              <NeuronBadge variant="success" size="md" pill style={{ minWidth: 80, justifyContent: 'center' }}>
                                Approved
                              </NeuronBadge>
                            </div>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ color: 'var(--color-text-secondary)' }}>Alex Morgan</span>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>2026-03-15</span>
                          </td>
                          <td
                            className={`neuron-table__td neuron-table__col--sticky-right table-anatomy-zone ${activeAnatomyZone === 5 ? 'is-active' : ''}`}
                            style={{ textAlign: 'center' }}
                            onMouseEnter={() => setActiveAnatomyZone(5)}
                            onMouseLeave={() => setActiveAnatomyZone(4)}
                          >
                            <button type="button" className="neuron-table-action-btn" style={{ pointerEvents: 'none' }}>
                              <MoreHorizontal size={18} />
                            </button>
                          </td>
                        </tr>

                        {/* Sample Row 2 */}
                        <tr className={`neuron-table__tr ${anatomyRow2Selected ? 'neuron-table__tr--selected' : ''}`}>
                          <td className="neuron-table__td neuron-table__td--checkbox">
                            <div className="neuron-table__checkbox-wrap">
                              <NeuronCheckbox
                                checked={anatomyRow2Selected}
                                onChange={(checked) => setAnatomyRow2Selected(checked)}
                                size="md"
                                variant="brand"
                                aria-label="Select row 2"
                              />
                            </div>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ color: 'var(--color-text-secondary)' }}>2</span>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              Cloud Infrastructure Audit
                            </span>
                          </td>
                          <td className="neuron-table__td">
                            <NeuronBadge variant="warning" size="md" pill style={{ minWidth: 80, justifyContent: 'center' }}>
                              Pending
                            </NeuronBadge>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ color: 'var(--color-text-secondary)' }}>Sarah Chen</span>
                          </td>
                          <td className="neuron-table__td">
                            <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>2026-03-12</span>
                          </td>
                          <td
                            className={`neuron-table__td neuron-table__col--sticky-right table-anatomy-zone ${activeAnatomyZone === 5 ? 'is-active' : ''}`}
                            style={{ textAlign: 'center' }}
                            onMouseEnter={() => setActiveAnatomyZone(5)}
                            onMouseLeave={() => setActiveAnatomyZone(4)}
                          >
                            <button type="button" className="neuron-table-action-btn" style={{ pointerEvents: 'none' }}>
                              <MoreHorizontal size={18} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Zone 6: Pagination Bar */}
                  <div
                    className={`neuron-table-pagination table-anatomy-zone ${activeAnatomyZone === 6 ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveAnatomyZone(6)}
                    onMouseLeave={() => setActiveAnatomyZone(null)}
                  >
                    {/* Left: Zone Marker 6 + Rows per page selector */}
                    <div className="neuron-table-pagination__rows-per-page">
                      <span
                        className={`table-anatomy-marker-pin ${activeAnatomyZone === 6 ? 'is-active' : ''}`}
                        title="6. Pagination Bar"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setActiveAnatomyZone(6);
                        }}
                      >
                        6
                      </span>
                      <label htmlFor="anatomy-rows-select" className="neuron-table-pagination__label">
                        Rows per page
                      </label>
                      <div className="neuron-table-select-wrap">
                        <select
                          id="anatomy-rows-select"
                          className="neuron-table-select"
                          value={anatomyPageSize}
                          onChange={(e) => {
                            setAnatomyPageSize(e.target.value);
                            setAnatomyPage(1);
                          }}
                          aria-label="Rows per page"
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                        </select>
                        <ChevronDown size={14} className="neuron-table-select__chevron" />
                      </div>
                    </div>

                    {/* Center: Numeric Page Buttons with active terracotta pill */}
                    <div className="neuron-table-pagination__pages" role="navigation" aria-label="Table pagination">
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          type="button"
                          className={`neuron-table-page-btn ${anatomyPage === page ? 'is-active' : ''}`}
                          onClick={() => setAnatomyPage(page)}
                          aria-current={anatomyPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Right: Previous and Next Action Buttons */}
                    <div className="neuron-table-pagination__actions">
                      <button
                        type="button"
                        className="neuron-table-nav-btn neuron-table-nav-btn--prev"
                        onClick={() => setAnatomyPage((p) => Math.max(1, p - 1))}
                        disabled={anatomyPage <= 1}
                        aria-label="Previous page"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="neuron-table-nav-btn neuron-table-nav-btn--next"
                        onClick={() => setAnatomyPage((p) => Math.min(3, p + 1))}
                        disabled={anatomyPage >= 3}
                        aria-label="Next page"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anatomy Cards Grid with Tokens & Direct Interactivity */}
              <div className="table-anatomy-cards-grid">
                <TableAnatomyCard
                  number={1}
                  label={gl.anatomyContainer}
                  desc={gl.anatomyContainerDesc}
                  tokens={['radius-xl (12px)', 'border: 1px solid', 'bg-surface', 'shadow-xs']}
                  isActive={activeAnatomyZone === 1}
                  onMouseEnter={() => setActiveAnatomyZone(1)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                />
                <TableAnatomyCard
                  number={2}
                  label={gl.anatomyToolbar}
                  desc={gl.anatomyToolbarDesc}
                  tokens={['height: 56px', 'padding: 12px 16px', 'display: flex-between', 'gap: 12px']}
                  isActive={activeAnatomyZone === 2}
                  onMouseEnter={() => setActiveAnatomyZone(2)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                />
                <TableAnatomyCard
                  number={3}
                  label={gl.anatomyHeader}
                  desc={gl.anatomyHeaderDesc}
                  tokens={['12px uppercase', 'weight-700', 'tracking-0.05em', 'bg-subtle']}
                  isActive={activeAnatomyZone === 3}
                  onMouseEnter={() => setActiveAnatomyZone(3)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                />
                <TableAnatomyCard
                  number={4}
                  label={gl.anatomyCell}
                  desc={gl.anatomyCellDesc}
                  tokens={['height: 48px (md)', '14px typography', 'hover: bg-subtle', 'border-b-1px']}
                  isActive={activeAnatomyZone === 4}
                  onMouseEnter={() => setActiveAnatomyZone(4)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                />
                <TableAnatomyCard
                  number={5}
                  label={gl.anatomyAction}
                  desc={gl.anatomyActionDesc}
                  tokens={['position: sticky', 'right: 0px', 'dynamic shadow on scroll', 'z-index: 3']}
                  isActive={activeAnatomyZone === 5}
                  onMouseEnter={() => setActiveAnatomyZone(5)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                />
                <TableAnatomyCard
                  number={6}
                  label={gl.anatomyPagination}
                  desc={gl.anatomyPaginationDesc}
                  tokens={['height: 52px', 'active-pill: brand-500', 'border-t-1px', 'rows-per-page']}
                  isActive={activeAnatomyZone === 6}
                  onMouseEnter={() => setActiveAnatomyZone(6)}
                  onMouseLeave={() => setActiveAnatomyZone(null)}
                />
              </div>
            </div>
          </div>

          {/* ── 3. Variants ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.variantsTitle}</h2>
            <p className="section-description">{gl.variantsDesc}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-6)' }}>
              {/* Default */}
              <div>
                <h3 className="section-subtitle">{gl.variantDefaultTitle}</h3>
                <p className="section-description" style={{ marginBottom: 'var(--space-4)' }}>{gl.variantDefaultDesc}</p>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 60 },
                    { key: 'projectName', label: 'Project Name', sortable: true },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status', render: (v) => <NeuronBadge variant={v === 'Approved' ? 'success' : v === 'Active' ? 'brand' : 'warning'} pill>{v}</NeuronBadge> },
                    { key: 'recordsCount', label: 'Records', align: 'right', render: (v) => Number(v).toLocaleString() },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={DUMMY_PROJECT_DATA.slice(0, 3)}
                  rowKey="id"
                  variant="default"
                />
              </div>

              {/* Striped */}
              <div>
                <h3 className="section-subtitle">{gl.variantStripedTitle}</h3>
                <p className="section-description" style={{ marginBottom: 'var(--space-4)' }}>{gl.variantStripedDesc}</p>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 60 },
                    { key: 'projectName', label: 'Project Name', sortable: true },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status', render: (v) => <NeuronBadge variant={v === 'Approved' ? 'success' : v === 'Active' ? 'brand' : 'warning'} pill>{v}</NeuronBadge> },
                    { key: 'recordsCount', label: 'Records', align: 'right', render: (v) => Number(v).toLocaleString() },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={DUMMY_PROJECT_DATA.slice(3, 7)}
                  rowKey="id"
                  variant="striped"
                />
              </div>

              {/* Bordered */}
              <div>
                <h3 className="section-subtitle">{gl.variantBorderedTitle}</h3>
                <p className="section-description" style={{ marginBottom: 'var(--space-4)' }}>{gl.variantBorderedDesc}</p>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 60 },
                    { key: 'projectName', label: 'Project Name', sortable: true },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status', render: (v) => <NeuronBadge variant={v === 'Approved' ? 'success' : v === 'Active' ? 'brand' : 'warning'} pill>{v}</NeuronBadge> },
                    { key: 'recordsCount', label: 'Records', align: 'right', render: (v) => Number(v).toLocaleString() },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={DUMMY_PROJECT_DATA.slice(0, 4)}
                  rowKey="id"
                  variant="bordered"
                />
              </div>
            </div>
          </div>

          {/* ── 4. Sizes ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.sizesTitle}</h2>
            <p className="section-description">{gl.sizesDesc}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-6)' }}>
              {/* Small */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{gl.sizeSmLabel}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>— {gl.sizeSmUsage}</span>
                </div>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 50 },
                    { key: 'projectName', label: 'Project Name' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status', render: (v) => <NeuronBadge size="sm" variant={v === 'Approved' ? 'success' : 'brand'} pill>{v}</NeuronBadge> },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={DUMMY_PROJECT_DATA.slice(0, 3)}
                  rowKey="id"
                  size="sm"
                />
              </div>

              {/* Medium */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{gl.sizeMdLabel}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>— {gl.sizeMdUsage}</span>
                </div>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 60 },
                    { key: 'projectName', label: 'Project Name' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status', render: (v) => <NeuronBadge size="md" variant={v === 'Approved' ? 'success' : 'brand'} pill>{v}</NeuronBadge> },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={DUMMY_PROJECT_DATA.slice(0, 3)}
                  rowKey="id"
                  size="md"
                />
              </div>

              {/* Large */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{gl.sizeLgLabel}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>— {gl.sizeLgUsage}</span>
                </div>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 70 },
                    { key: 'projectName', label: 'Project Name' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status', render: (v) => <NeuronBadge size="lg" variant={v === 'Approved' ? 'success' : 'brand'} pill>{v}</NeuronBadge> },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={DUMMY_PROJECT_DATA.slice(0, 3)}
                  rowKey="id"
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* ── 5. States ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.statesTitle}</h2>
            <p className="section-description">{gl.statesDesc}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-6)' }}>
              {/* Loading State */}
              <div>
                <h3 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="var(--brand-500)" />
                  <span>{gl.stateLoading}</span>
                </h3>
                <p className="section-description" style={{ marginBottom: 'var(--space-4)' }}>
                  Animated shimmering skeleton rows provide graceful perceptual performance while data is asynchronously loaded.
                </p>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 60 },
                    { key: 'projectName', label: 'Project Name' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status' },
                    { key: 'recordsCount', label: 'Records' },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={[]}
                  loading={true}
                />
              </div>

              {/* Empty State */}
              <div>
                <h3 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} color="var(--color-text-secondary)" />
                  <span>{gl.stateEmpty}</span>
                </h3>
                <p className="section-description" style={{ marginBottom: 'var(--space-4)' }}>
                  Clear empty message presented when search queries return 0 matches or before any records exist.
                </p>
                <NeuronTable
                  columns={[
                    { key: 'no', label: 'No', width: 60 },
                    { key: 'projectName', label: 'Project Name' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'status', label: 'Status' },
                    { key: 'created', label: 'Created' },
                  ]}
                  data={[]}
                  emptyText="No project records available."
                />
              </div>
            </div>
          </div>

          {/* ── 6. When to Use ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.whenTitle}</h2>
            <p className="section-description">{gl.whenDesc}</p>

            {/* Core Decision Rules Banner */}
            <div
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4) var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--brand-500)', flexShrink: 0 }} />
                <strong>
                  {isId
                    ? 'Aturan Utama: Gunakan Tabel saat pengguna perlu membandingkan, mengurutkan, dan bertindak atas data berstruktur dengan atribut seragam.'
                    : 'Core Principle: Use Table when users need to compare, sort, and act upon multi-attribute data sharing consistent columns.'}
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--slate-400)', flexShrink: 0 }} />
                <span>
                  {isId
                    ? 'Pertimbangkan alternatif (Cards atau List) jika data memiliki konten visual dominan, jumlah kolom sangat sedikit (1–2), atau diakses pada layar mobile sempit.'
                    : 'Consider alternatives (Cards or Lists) if items are image-heavy, contain very few attributes (1–2), or are tailored for narrow mobile viewports.'}
                </span>
              </div>
            </div>

            {/* 4 Primary Scenario Cards */}
            <div className="when-to-use-grid">
              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'var(--brand-50)', color: 'var(--brand-600)' }}>
                    <Layers size={18} />
                  </div>
                  <NeuronBadge variant="brand" size="xs">Comparison</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenDataTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenDataDesc}</p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px dashed var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <span>{isId ? 'Rekomendasi:' : 'Best for:'}</span>
                  <span style={{ fontFamily: 'var(--font-family-mono, monospace)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                    Density md · Multi-sort
                  </span>
                </div>
              </div>

              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <CheckSquare size={18} />
                  </div>
                  <NeuronBadge variant="success" size="xs">Multi-Select</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenBulkTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenBulkDesc}</p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px dashed var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <span>{isId ? 'Rekomendasi:' : 'Best for:'}</span>
                  <span style={{ fontFamily: 'var(--font-family-mono, monospace)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                    Checkbox · Batch toolbar
                  </span>
                </div>
              </div>

              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}>
                    <Clock size={18} />
                  </div>
                  <NeuronBadge variant="info" size="xs">Audit Trail</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenAuditTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenAuditDesc}</p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px dashed var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <span>{isId ? 'Rekomendasi:' : 'Best for:'}</span>
                  <span style={{ fontFamily: 'var(--font-family-mono, monospace)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                    Pills · Chronological
                  </span>
                </div>
              </div>

              <div className="when-to-use-card">
                <div className="when-to-use-card__header">
                  <div className="when-to-use-card__icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                    <Cpu size={18} />
                  </div>
                  <NeuronBadge variant="neutral" size="xs">High Density</NeuronBadge>
                </div>
                <h4 className="when-to-use-card__title">{gl.whenSystemTitle}</h4>
                <p className="when-to-use-card__desc">{gl.whenSystemDesc}</p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 'var(--space-3)',
                    borderTop: '1px dashed var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <span>{isId ? 'Rekomendasi:' : 'Best for:'}</span>
                  <span style={{ fontFamily: 'var(--font-family-mono, monospace)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                    sm (40px) · Sticky actions
                  </span>
                </div>
              </div>
            </div>

            {/* Alternatives Comparison (When NOT to use Tables) */}
            <div className="alternatives-container">
              <div className="alternatives-title">
                {isId ? 'Kapan Menggunakan Komponen Lain (Alternatif Tabel)' : 'When to Use Alternatives to Tables'}
              </div>
              <p className="alternatives-subtitle">
                {isId
                  ? 'Tabel dirancang untuk pembandingan data multi-atribut. Pertimbangkan alternatif berikut jika kebutuhan visual atau alur kerja Anda berbeda:'
                  : 'Tables are optimized for dense multi-attribute scanning. Consider these alternatives when your layout requires a different presentation modality:'}
              </p>

              <div className="alternatives-grid">
                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'var(--brand-50)', color: 'var(--brand-600)' }}>
                        <LayoutGrid size={16} />
                      </div>
                      <span className="alternative-card__name">Card Grid</span>
                    </div>
                    <NeuronBadge variant="brand" size="xs">{isId ? 'Visual' : 'Visual'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan ketika setiap item memiliki media gambar dominan, data heterogen, atau ketika tata letak kartu ramah sentuhan lebih pas untuk perangkat mobile.'
                      : 'Use when records have prominent images, heterogeneous content, or when responsive card wrapping is required on consumer mobile apps.'}
                  </p>
                </div>

                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}>
                        <List size={16} />
                      </div>
                      <span className="alternative-card__name">Key-Value List</span>
                    </div>
                    <NeuronBadge variant="info" size="xs">{isId ? '1 Rekord' : 'Single Item'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan untuk inspeksi satu rekord tunggal, panel detail (drawer/modal), atau ringkasan metadata yang tidak memerlukan pembandingan antar banyak baris.'
                      : 'Use for single-item detail sheets, drawer panels, or metadata properties where scanning across multiple entities is unnecessary.'}
                  </p>
                </div>

                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <BarChart2 size={16} />
                      </div>
                      <span className="alternative-card__name">Charts & Graphs</span>
                    </div>
                    <NeuronBadge variant="success" size="xs">{isId ? 'Tren' : 'Trends'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan saat pengguna lebih membutuhkan pengenalan pola tren, lonjakan anomali, atau agregasi waktu dibanding mencari angka persis di dalam sel.'
                      : 'Use when recognizing patterns, anomaly spikes, or period-over-period rates of change is more impactful than looking up cell values.'}
                  </p>
                </div>

                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                        <FileText size={16} />
                      </div>
                      <span className="alternative-card__name">Simple List</span>
                    </div>
                    <NeuronBadge variant="neutral" size="xs">{isId ? 'Ringkas' : 'Compact'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan untuk koleksi kecil (< 5 item) dengan 1–2 atribut sederhana, seperti umpan aktivitas pendek atau menu navigasi pengaturan.'
                      : 'Use for concise collections (< 5 items) with 1–2 attributes, such as recent activity feeds or basic settings lists.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 7. Do's & Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.dodontTitle}</h2>
            <p className="section-description">{gl.dodontDesc}</p>

            <div className="dodont-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              <div>
                <RuleCard type="do">
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{gl.do1Title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>{gl.do1Desc}</p>
                </RuleCard>
              </div>
              <div>
                <RuleCard type="dont">
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{gl.dont1Title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>{gl.dont1Desc}</p>
                </RuleCard>
              </div>
              <div>
                <RuleCard type="do">
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{gl.do2Title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>{gl.do2Desc}</p>
                </RuleCard>
              </div>
              <div>
                <RuleCard type="dont">
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{gl.dont2Title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>{gl.dont2Desc}</p>
                </RuleCard>
              </div>
              <div>
                <RuleCard type="do">
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{gl.do3Title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>{gl.do3Desc}</p>
                </RuleCard>
              </div>
              <div>
                <RuleCard type="dont">
                  <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{gl.dont3Title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>{gl.dont3Desc}</p>
                </RuleCard>
              </div>
            </div>
          </div>

          {/* ── 8. Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">{gl.a11yTitle}</h2>
            <p className="section-description">{gl.a11yDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{gl.a11yRoleTitle}</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{gl.a11yRoleDesc}</p>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{gl.a11yKeyboardTitle}</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{gl.a11yKeyboardDesc}</p>
              </div>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{gl.a11yScreenReaderTitle}</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{gl.a11yScreenReaderDesc}</p>
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
          {/* Action Notification Toast */}
          {actionNotice && (
            <div className="copy-toast show">
              <Sparkles size={16} color="var(--brand-400)" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* ── Pattern 1: Enterprise Project & Resource Monitor ── */}
          <div className="section-card">
            <h2 className="section-title">1. {dt.pattern1Title}</h2>
            <p className="section-description">{dt.pattern1Desc}</p>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <NeuronTable
                columns={projectTaskColumns}
                data={DUMMY_PROJECT_DATA}
                rowKey="id"
                showToolbar={true}
                showFilter={true}
                showSort={true}
                showSearch={true}
                filterLabel="Filter"
                sortLabel="Sort By"
                onFilterClick={() => showNotice('Filter drawer opened')}
                onSortClick={() => showNotice('Sort options triggered')}
                pagination={{
                  pageSize: 9,
                  pageSizeOptions: [9, 18, 27],
                }}
              />
            </div>
          </div>

          {/* ── Pattern 2: User & Access Management ── */}
          <div className="section-card">
            <h2 className="section-title">2. {dt.pattern2Title}</h2>
            <p className="section-description">{dt.pattern2Desc}</p>

            <div style={{ marginTop: 'var(--space-6)' }}>
              {selectedUserKeys.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  marginBottom: '12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(223, 126, 48, 0.08)',
                  border: '1px solid rgba(223, 126, 48, 0.3)',
                  color: 'var(--brand-700)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}>
                  <span>{selectedUserKeys.length} user(s) selected for bulk management</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => showNotice(`Updated permissions for ${selectedUserKeys.length} users`)}
                      style={{
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '4px 10px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Change Role
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUserKeys([])}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <NeuronTable<UserManagementRecord>
                columns={[
                  {
                    key: 'name',
                    label: 'User Name',
                    sortable: true,
                    render: (_, rec) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <NeuronAvatar src={rec.avatar} name={rec.name} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{rec.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{rec.email}</div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'role',
                    label: 'Role',
                    sortable: true,
                    render: (role) => (
                      <NeuronBadge
                        variant={role === 'Admin' ? 'brand' : role === 'Editor' ? 'indigo' : 'gray'}
                        size="sm"
                        pill
                      >
                        {role}
                      </NeuronBadge>
                    ),
                  },
                  {
                    key: 'department',
                    label: 'Department',
                    render: (v) => <span style={{ color: 'var(--color-text-secondary)' }}>{v}</span>,
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    sortable: true,
                    render: (v) => (
                      <NeuronBadge
                        variant={v === 'Active' ? 'success' : v === 'Invited' ? 'warning' : 'error'}
                        size="sm"
                        dot
                        pill
                      >
                        {v}
                      </NeuronBadge>
                    ),
                  },
                  {
                    key: 'lastActive',
                    label: 'Last Active',
                    render: (v) => <span style={{ color: 'var(--color-text-tertiary)', fontSize: '13px' }}>{v}</span>,
                  },
                  {
                    key: 'actions',
                    label: 'Action',
                    width: 80,
                    align: 'center',
                    sticky: 'right',
                    render: (_, rec) => (
                      <button
                        type="button"
                        className="neuron-table-action-btn"
                        onClick={() => showNotice(`Managing account: ${rec.name}`)}
                        aria-label={`Manage ${rec.name}`}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    ),
                  },
                ]}
                data={USER_MANAGEMENT_DATA}
                rowKey="id"
                selectable={true}
                selectedRowKeys={selectedUserKeys}
                onSelectChange={(keys) => setSelectedUserKeys(keys)}
                showToolbar={true}
                showSearch={true}
                searchPlaceholder="Search team members..."
                pagination={false}
              />
            </div>
          </div>

          {/* ── Pattern 3: Financial History ── */}
          <div className="section-card">
            <h2 className="section-title">3. {dt.pattern3Title}</h2>
            <p className="section-description">{dt.pattern3Desc}</p>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <NeuronTable<FinancialRecord>
                columns={[
                  {
                    key: 'invoice',
                    label: 'Invoice #',
                    sortable: true,
                    render: (v) => <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-text-primary)' }}>{v}</span>,
                  },
                  {
                    key: 'customer',
                    label: 'Client / Account',
                    sortable: true,
                  },
                  {
                    key: 'amount',
                    label: 'Amount',
                    align: 'right',
                    sortable: true,
                    render: (amount, rec) => (
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    ),
                  },
                  {
                    key: 'status',
                    label: 'Payment Status',
                    sortable: true,
                    render: (status) => {
                      const v = status === 'Paid' ? 'success' : status === 'Pending' ? 'warning' : status === 'Overdue' ? 'error' : 'gray';
                      return (
                        <NeuronBadge variant={v} size="sm" pill>
                          {status}
                        </NeuronBadge>
                      );
                    },
                  },
                  {
                    key: 'date',
                    label: 'Billing Date',
                    render: (v) => <span style={{ color: 'var(--color-text-secondary)' }}>{v}</span>,
                  },
                  {
                    key: 'actions',
                    label: 'Action',
                    width: 90,
                    align: 'center',
                    sticky: 'right',
                    render: (_, rec) => (
                      <button
                        type="button"
                        className="neuron-table-btn"
                        style={{ height: '28px', padding: '0 10px', fontSize: '11px', gap: '4px' }}
                        onClick={() => showNotice(`Downloading receipt for ${rec.invoice}`)}
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    ),
                  },
                ]}
                data={FINANCIAL_DATA}
                rowKey="id"
                variant="striped"
                showToolbar={true}
                showSearch={true}
                searchPlaceholder="Search invoices by client or ID..."
              />
            </div>
          </div>

          {/* ── Pattern 4: Server Metric Density Grid ── */}
          <div className="section-card">
            <h2 className="section-title">4. {dt.pattern4Title}</h2>
            <p className="section-description">{dt.pattern4Desc}</p>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <NeuronTable<ServerMetricRecord>
                columns={[
                  {
                    key: 'node',
                    label: 'Node Hostname',
                    sortable: true,
                    render: (v) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Cpu size={14} color="var(--brand-500)" />
                        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>{v}</span>
                      </div>
                    ),
                  },
                  { key: 'region', label: 'Region' },
                  {
                    key: 'cpu',
                    label: 'CPU Usage',
                    align: 'right',
                    sortable: true,
                    render: (v) => (
                      <span style={{ fontWeight: 600, color: v > 90 ? 'var(--color-error)' : v > 70 ? 'var(--color-warning)' : 'inherit' }}>
                        {v}%
                      </span>
                    ),
                  },
                  {
                    key: 'memory',
                    label: 'Memory',
                    align: 'right',
                    sortable: true,
                    render: (v) => `${v}%`,
                  },
                  { key: 'network', label: 'Throughput', align: 'right' },
                  { key: 'uptime', label: 'Uptime', align: 'right' },
                  {
                    key: 'health',
                    label: 'Health',
                    align: 'center',
                    render: (v) => (
                      <NeuronBadge
                        size="xs"
                        variant={v === 'Healthy' ? 'success' : v === 'Warning' ? 'warning' : 'error'}
                        dot
                        pill
                      >
                        {v}
                      </NeuronBadge>
                    ),
                  },
                ]}
                data={SERVER_METRIC_DATA}
                rowKey="id"
                size="sm"
                variant="bordered"
              />
            </div>
          </div>

          {/* ── 5. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">5. {t.compShared.playground}</h2>
            <p className="section-description">
              Configure properties interactively to preview layout variants, sizes, and code snippets across frameworks.
            </p>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <Playground
                name="NeuronTable"
                previewStyle={{ width: '100%', overflowX: 'auto' }}
                knobs={[
                  {
                    name: 'size',
                    label: 'Size',
                    type: 'select',
                    options: ['sm', 'md', 'lg'],
                    default: 'md',
                  },
                  {
                    name: 'variant',
                    label: 'Variant',
                    type: 'select',
                    options: ['default', 'striped', 'bordered'],
                    default: 'default',
                  },
                  {
                    name: 'selectable',
                    label: 'Selectable Rows',
                    type: 'boolean',
                    default: false,
                  },
                  {
                    name: 'showToolbar',
                    label: 'Show Toolbar',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'stickyAction',
                    label: 'Sticky Action Column',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'pagination',
                    label: 'Pagination',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'loading',
                    label: 'Loading State',
                    type: 'boolean',
                    default: false,
                  },
                ]}
                codeTemplates={(state) => {
                  const sizeProp = state.size !== 'md' ? ` size="${state.size}"` : '';
                  const variantProp = state.variant !== 'default' ? ` variant="${state.variant}"` : '';
                  const selProp = state.selectable ? ' selectable' : '';
                  const toolbarProp = state.showToolbar ? ' showToolbar' : '';
                  const pagProp = state.pagination ? ' pagination' : '';
                  const loadProp = state.loading ? ' loading' : '';

                  return {
                    react: `<NeuronTable
  columns={columns}
  data={data}
  rowKey="id"${sizeProp}${variantProp}${selProp}${toolbarProp}${pagProp}${loadProp}
/>`,
                    vue: `<NeuronTable
  :columns="columns"
  :data="data"
  row-key="id"${state.size !== 'md' ? ` size="${state.size}"` : ''}${state.variant !== 'default' ? ` variant="${state.variant}"` : ''}${state.selectable ? ' selectable' : ''}${state.showToolbar ? ' show-toolbar' : ''}${state.pagination ? ' pagination' : ''}${state.loading ? ' loading' : ''}
/>`,
                    html: `<!-- Neudela Table Component -->
<div class="neuron-table-container neuron-table-container--${state.size}">
  ${state.showToolbar ? `<div class="neuron-table-toolbar">
    <div class="neuron-table-toolbar__left">
      <button class="neuron-table-btn">Filter</button>
      <button class="neuron-table-btn">Sort By</button>
    </div>
    <div class="neuron-table-search">
      <input class="neuron-table-search__input" placeholder="Search..." />
    </div>
  </div>` : ''}
  <div class="neuron-table-wrapper">
    <table class="neuron-table neuron-table--${state.size} neuron-table--${state.variant}">
      <thead>
        <tr>
          <th>No</th>
          <th>Project Name</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Design System Token Migration</td>
          <td><span class="neuron-badge neuron-badge--success neuron-badge--pill">Approved</span></td>
          <td>2026-03-15</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
                  };
                }}
              >
                {(state) => {
                  const size = (state.size as 'sm' | 'md' | 'lg') || 'md';
                  const variant = (state.variant as 'default' | 'striped' | 'bordered') || 'default';
                  const selectable = Boolean(state.selectable);
                  const showToolbar = Boolean(state.showToolbar);
                  const stickyAction = Boolean(state.stickyAction);
                  const pagination = Boolean(state.pagination);
                  const loading = Boolean(state.loading);

                  const playgroundCols: NeuronTableColumn<ProjectTaskRecord>[] = [
                    { key: 'no', label: 'No', width: 50 },
                    { key: 'projectName', label: 'Project Name', sortable: true },
                    { key: 'owner', label: 'Owner' },
                    {
                      key: 'status',
                      label: 'Status',
                      render: (v) => (
                        <NeuronBadge variant={v === 'Approved' ? 'success' : v === 'Active' ? 'brand' : 'warning'} pill size={size === 'sm' ? 'sm' : 'md'}>
                          {v}
                        </NeuronBadge>
                      ),
                    },
                    { key: 'category', label: 'Category' },
                    { key: 'recordsCount', label: 'Records', align: 'right', render: (v) => Number(v).toLocaleString() },
                    { key: 'created', label: 'Created' },
                  ];

                  if (stickyAction) {
                    playgroundCols.push({
                      key: 'action',
                      label: 'Action',
                      width: 70,
                      align: 'center',
                      sticky: 'right',
                      render: (_, rec) => (
                        <button
                          type="button"
                          className="neuron-table-action-btn"
                          onClick={() => showNotice(`Selected ${rec.projectName}`)}
                          aria-label="Options"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      ),
                    });
                  }

                  return (
                    <div style={{ width: '100%', minWidth: '600px' }}>
                      <NeuronTable
                        columns={playgroundCols}
                        data={DUMMY_PROJECT_DATA}
                        rowKey="id"
                        size={size}
                        variant={variant}
                        selectable={selectable}
                        showToolbar={showToolbar}
                        showFilter={true}
                        showSort={true}
                        showSearch={true}
                        loading={loading}
                        pagination={pagination ? { pageSize: 5, pageSizeOptions: [5, 10, 20] } : false}
                      />
                    </div>
                  );
                }}
              </Playground>
            </div>
          </div>
        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-radio', label: t.nav.compRadio }}
        next={{ id: 'comp-toggle', label: t.nav.compToggle }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
