import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronButton from '../../components/NeuronButton';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronInput from '../../components/NeuronInput';
import NeuronSelect from '../../components/NeuronSelect';
import NeuronCheckbox from '../../components/NeuronCheckbox';
import {
  Check,
  Copy,
  Eye,
  X,
  Search,
  Filter,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Table,
  LayoutGrid,
  Columns,
  Database,
  Sparkles,
  Cpu,
  Server,
  Activity,
  ExternalLink,
  Save,
  Undo2,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Layers,
  FileSpreadsheet,
  CheckSquare,
} from 'lucide-react';

interface DataGridPatternViewProps {
  setActiveTab: (tabId: string) => void;
}

export type DataGridVariantId =
  | 'master-detail'
  | 'bulk-actions'
  | 'faceted-filter'
  | 'multi-view'
  | 'inline-editable';

interface VariantMeta {
  id: DataGridVariantId;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  tags: string[];
  bestForEn: string;
  bestForId: string;
  badge: string;
  accentColor: string;
}

export const DATA_GRID_VARIANTS: VariantMeta[] = [
  {
    id: 'master-detail',
    nameEn: 'Master-Detail Split Inspector',
    nameId: 'Inspektor Terpisah Master-Detail',
    taglineEn: 'High-density telemetry grid with an animated slideover inspection drawer for deep workload diagnostics.',
    taglineId: 'Kisi telemetri berkepadatan tinggi dengan panel inspeksi samping untuk diagnostik beban kerja mendalam.',
    descEn: 'Mission-critical cloud container & infrastructure table. Clicking any row smoothly slides open an inspection drawer showing live CPU/RAM gauges, Kubernetes YAML configs, pod events, and instant lifecycle commands.',
    descId: 'Tabel manajemen kontainer dan infrastruktur awan tingkat enterprise. Mengklik baris akan membuka panel inspeksi samping dengan visualisasi CPU/RAM langsung, konfigurasi YAML pod, log peristiwa, dan perintah siklus hidup.',
    tags: ['Split Pane', 'Inspection Drawer', 'Live Telemetry', 'Quick Commands', 'Deep Diagnostics'],
    bestForEn: 'Cloud Computing, Microservices Orchestration, IoT Telemetry, Customer 360',
    bestForId: 'Komputasi Awan, Orkestrasi Microservices, Telemetri IoT, Profil Pelanggan 360',
    badge: 'DevOps & Telemetry',
    accentColor: '#df7e30',
  },
  {
    id: 'bulk-actions',
    nameEn: 'Batch Processing & Floating Action Dock',
    nameId: 'Pemrosesan Massal & Dok Aksi Mengambang',
    taglineEn: 'Multi-select data table with an animated glassmorphic bottom command bar for rapid high-volume operations.',
    taglineId: 'Tabel data multiselect dengan bilah perintah mengambang glassmorphic untuk eksekusi operasi bervolume tinggi.',
    descEn: 'Enterprise financial billing ledger with master & row-level checkboxes. Selecting rows slides up a floating command dock showing selected item counts, total monetary amount, and one-click bulk operations (Mark as Paid, Batch CSV Export, Apply Tax Tag, Bulk Void).',
    descId: 'Buku besar keuangan & penagihan enterprise dengan checkbox tingkat baris dan master. Memilih baris akan memunculkan dok perintah mengambang dengan ringkasan jumlah item, akumulasi nominal, dan aksi massal instan.',
    tags: ['Multi-Select', 'Floating Dock', 'Batch Operations', 'Indeterminate State', 'Financial Ledger'],
    bestForEn: 'Invoice Processing, Order Fulfillment, User Provisioning, Mass Communication',
    bestForId: 'Pemrosesan Invoice, Pemenuhan Pesanan, Provisi Pengguna Massal, Operasi Finansial',
    badge: 'FinTech & Billing',
    accentColor: '#10b981',
  },
  {
    id: 'faceted-filter',
    nameEn: 'Faceted Filter & Query Builder',
    nameId: 'Filter Faset & Penyusun Kueri Kompleks',
    taglineEn: 'Multi-parameter search with dismissible active filter badges, value ranges, and saved views.',
    taglineId: 'Pencarian multi-parameter dengan badge filter aktif yang dapat dihapus, rentang nilai, dan preset kueri tersimpan.',
    descEn: 'Advanced enterprise CRM & pipeline opportunity table. Features real-time typeahead searching, faceted categorical dropdowns (Deal Stage, Region, Account Owner), deal value thresholds, active filter chips with one-click dismiss, and saved view switching.',
    descId: 'Tabel pipeline penjualan & CRM enterprise tingkat lanjut. Dilengkapi pencarian instan, filter faset bertingkat (Tahap Kesepakatan, Wilayah, Pemilik Akun), batas nominal kesepakatan, chip filter aktif, dan pemilih tampilan tersimpan.',
    tags: ['Faceted Dropdowns', 'Active Filter Chips', 'Saved Views', 'Threshold Sliders', 'Query Builder'],
    bestForEn: 'CRM Pipelines, Global Asset Inventory, Candidate Recruitment, Procurement Portals',
    bestForId: 'Pipeline CRM, Inventaris Aset Global, Rekrutmen Kandidat, Portal Pengadaan',
    badge: 'CRM & Pipeline',
    accentColor: '#3b82f6',
  },
  {
    id: 'multi-view',
    nameEn: 'Multi-Modal View Switcher (Table, Cards, Kanban)',
    nameId: 'Peralihan Tampilan Multi-Modal (Tabel, Kartu, Kanban)',
    taglineEn: 'Flexible presentation switcher allowing users to toggle seamlessly between dense tabular rows, visual cards, and Kanban swimlanes.',
    taglineId: 'Pengalih presentasi fleksibel yang memungkinkan pengguna beralih mulus antara baris tabel padat, kartu visual, dan papan Kanban.',
    descEn: 'Digital product & engineering release management matrix. Users can switch on the fly between Dense Table (maximum metric density), Card Grid (visual cards with progress rings & maintainer avatars), and Kanban Swimlanes (grouped by release lifecycle stage).',
    descId: 'Matriks manajemen rilis produk digital dan rekayasa perangkat lunak. Pengguna dapat berganti instan antara Tabel Padat (kepadatan informasi maksimal), Kartu Visual, dan Papan Kanban.',
    tags: ['View Toggle', 'Dense Table', 'Visual Cards', 'Kanban Swimlanes', 'Lifecycle Grouping'],
    bestForEn: 'Product Portfolios, Sprint Backlogs, Digital Asset Management, Creative Projects',
    bestForId: 'Portofolio Produk, Backlog Sprint, Manajemen Aset Digital, Proyek Kreatif',
    badge: 'Product & Agile',
    accentColor: '#8b5cf6',
  },
  {
    id: 'inline-editable',
    nameEn: 'Inline Editable Spreadsheet Grid',
    nameId: 'Kisi Spreadsheet Dapat Diedit Langsung',
    taglineEn: 'Direct in-cell editing for numbers, text, status dropdowns, and toggles with live dirty-state tracking and batch save.',
    taglineId: 'Pengeditan langsung dalam sel untuk angka, teks, dropdown status, dan sakelar dengan pelacakan baris termodifikasi dan simpan massal.',
    descEn: 'Financial budgeting and inventory allocation grid. Clicking any cell enables direct inline input, dropdown selection, or toggle. Modified rows display an amber dirty indicator dot, while a sticky bottom bar provides real-time calculation totals, Discard, and Save All changes.',
    descId: 'Kisi anggaran finansial dan alokasi stok inventaris. Mengklik sel mana pun akan mengaktifkan input teks, dropdown, atau sakelar langsung dengan penghitungan total instan dan bilah simpan.',
    tags: ['Inline Editing', 'Live Calculations', 'Dirty State Tracking', 'Sticky Save Bar', 'Financial Ledger'],
    bestForEn: 'Budget Planning, Inventory Adjustments, Price Matrix Editors, Bulk Data Entry',
    bestForId: 'Perencanaan Anggaran, Penyesuaian Stok, Editor Matriks Harga, Entri Data Massal',
    badge: 'Spreadsheet & ERP',
    accentColor: '#f59e0b',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Variant 1: Master-Detail Split Inspector
// ─────────────────────────────────────────────────────────────────────────────

interface PodService {
  id: string;
  name: string;
  namespace: string;
  region: string;
  status: 'healthy' | 'degraded' | 'scaling' | 'restarting';
  cpu: number;
  memory: number;
  replicas: string;
  version: string;
  latency: string;
  uptime: string;
  restarts: number;
}

const INITIAL_PODS: PodService[] = [
  { id: 'pod-1', name: 'auth-gateway-edge', namespace: 'production-core', region: 'ap-southeast-3', status: 'healthy', cpu: 28, memory: 512, replicas: '8/8', version: 'v2.4.1', latency: '12ms', uptime: '99.98%', restarts: 0 },
  { id: 'pod-2', name: 'payment-stream-kafka', namespace: 'fintech-bus', region: 'ap-southeast-1', status: 'scaling', cpu: 74, memory: 1420, replicas: '12/16', version: 'v3.1.0', latency: '24ms', uptime: '99.94%', restarts: 1 },
  { id: 'pod-3', name: 'user-session-redis', namespace: 'production-cache', region: 'ap-southeast-3', status: 'healthy', cpu: 18, memory: 890, replicas: '4/4', version: 'v7.2.4', latency: '2ms', uptime: '99.99%', restarts: 0 },
  { id: 'pod-4', name: 'search-indexer-es', namespace: 'search-cluster', region: 'us-east-1', status: 'degraded', cpu: 91, memory: 3840, replicas: '3/6', version: 'v8.11.2', latency: '148ms', uptime: '98.85%', restarts: 4 },
  { id: 'pod-5', name: 'billing-worker-cron', namespace: 'fintech-bus', region: 'ap-southeast-3', status: 'healthy', cpu: 34, memory: 640, replicas: '3/3', version: 'v2.0.8', latency: '35ms', uptime: '99.95%', restarts: 0 },
  { id: 'pod-6', name: 'media-transcoder-gpu', namespace: 'media-pipeline', region: 'us-west-2', status: 'restarting', cpu: 62, memory: 2048, replicas: '2/4', version: 'v1.9.4', latency: '85ms', uptime: '97.40%', restarts: 2 },
  { id: 'pod-7', name: 'api-ingress-envoy', namespace: 'production-core', region: 'ap-southeast-3', status: 'healthy', cpu: 42, memory: 768, replicas: '10/10', version: 'v1.28.0', latency: '8ms', uptime: '99.99%', restarts: 0 },
  { id: 'pod-8', name: 'ml-inference-cluster', namespace: 'ai-platform', region: 'us-east-1', status: 'healthy', cpu: 55, memory: 4096, replicas: '6/6', version: 'v4.0.2', latency: '68ms', uptime: '99.91%', restarts: 0 },
];

function MasterDetailDataGrid() {
  const [pods] = useState<PodService[]>(INITIAL_PODS);
  const [selectedPodId, setSelectedPodId] = useState<string | null>('pod-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeInspectorTab, setActiveInspectorTab] = useState<'telemetry' | 'yaml' | 'events'>('telemetry');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredPods = useMemo(() => {
    return pods.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.namespace.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [pods, searchQuery, statusFilter]);

  const selectedPod = useMemo(() => {
    return pods.find(p => p.id === selectedPodId) || null;
  }, [pods, selectedPodId]);

  const triggerAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const getStatusBadge = (status: PodService['status']) => {
    switch (status) {
      case 'healthy':
        return <NeuronBadge variant="success" size="sm" dot>Healthy</NeuronBadge>;
      case 'scaling':
        return <NeuronBadge variant="info" size="sm" dot>Auto-Scaling</NeuronBadge>;
      case 'degraded':
        return <NeuronBadge variant="error" size="sm" dot>Degraded</NeuronBadge>;
      case 'restarting':
        return <NeuronBadge variant="warning" size="sm" dot>Restarting</NeuronBadge>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Action Notification Banner */}
      {actionNotice && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(223, 126, 48, 0.12)',
          border: '1px solid rgba(223, 126, 48, 0.3)',
          borderRadius: 8,
          color: 'var(--color-primary, #df7e30)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: '13px',
          fontWeight: 600,
          animation: 'fadeIn 0.25s ease',
        }}>
          <Sparkles size={16} />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Grid Controls Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '14px 16px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
          <div style={{ position: 'relative', width: 280 }}>
            <NeuronInput
              size="sm"
              placeholder="Search service or namespace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leadingIcon={<Search size={14} color="var(--color-text-secondary)" />}
            />
          </div>
          <div style={{ width: 160 }}>
            <NeuronSelect
              size="sm"
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'healthy', label: 'Healthy Only' },
                { value: 'scaling', label: 'Auto-Scaling' },
                { value: 'degraded', label: 'Degraded' },
                { value: 'restarting', label: 'Restarting' },
              ]}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val as string)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronButton
            size="sm"
            variant="secondary"
            leadingIcon={<RefreshCw size={13} />}
            onClick={() => triggerAction('Refreshing cluster state from Kubernetes API...')}
          >
            Sync State
          </NeuronButton>
          <NeuronButton
            size="sm"
            variant="primary"
            leadingIcon={<Plus size={13} />}
            onClick={() => triggerAction('Opening deployment manifest wizard...')}
          >
            Deploy Workload
          </NeuronButton>
        </div>
      </div>

      {/* Split Pane: Master Table + Detail Inspector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedPod ? 'minmax(0, 1.4fr) minmax(360px, 1fr)' : '1fr',
        gap: 16,
        alignItems: 'start',
        transition: 'all 0.3s ease',
      }}>
        {/* Master Table Container */}
        <div className="neuron-table-container" style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div className="neuron-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="neuron-table neuron-table--hoverable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{
                  background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Workload / Pod</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Region</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Status</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>CPU Load</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Memory</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Replicas</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px', textAlign: 'right' }}>Inspect</th>
                </tr>
              </thead>
              <tbody>
                {filteredPods.map((pod) => {
                  const isSelected = selectedPodId === pod.id;
                  return (
                    <tr
                      key={pod.id}
                      className="neuron-table__tr"
                      onClick={() => setSelectedPodId(isSelected ? null : pod.id)}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        background: isSelected
                          ? 'rgba(223, 126, 48, 0.08)'
                          : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'var(--color-bg-subtle, rgba(0,0,0,0.02))';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: isSelected ? '#df7e30' : 'rgba(0,0,0,0.06)',
                            color: isSelected ? '#fff' : 'var(--color-text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <Server size={16} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{pod.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{pod.namespace}</div>
                          </div>
                        </div>
                      </td>
                      <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                        {pod.region}
                      </td>
                      <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                        {getStatusBadge(pod.status)}
                      </td>
                      <td className="neuron-table__td" style={{ padding: '12px 14px', width: 120 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1 }}>
                            <NeuronProgress
                              value={pod.cpu}
                              color={pod.cpu > 80 ? 'error' : pod.cpu > 60 ? 'warning' : 'primary'}
                              size="xs"
                            />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, width: 28 }}>{pod.cpu}%</span>
                        </div>
                      </td>
                      <td className="neuron-table__td" style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        {pod.memory} MB
                      </td>
                      <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                        <NeuronBadge variant="neutral" size="sm">{pod.replicas}</NeuronBadge>
                      </td>
                      <td className="neuron-table__td" style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <ChevronRight
                          size={16}
                          style={{
                            color: isSelected ? '#df7e30' : 'var(--color-text-secondary)',
                            transform: isSelected ? 'rotate(90deg)' : 'none',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
          }}>
            <span>Showing {filteredPods.length} active microservices</span>
            <span>Cluster telemetry latency: 14ms (P99)</span>
          </div>
        </div>

        {/* Detail Inspection Drawer / Pane */}
        {selectedPod && (
          <div style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeIn 0.25s ease',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Inspector Header */}
            <div style={{
              padding: '16px 18px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(223, 126, 48, 0.15)',
                  color: '#df7e30',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Cpu size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)' }}>
                    {selectedPod.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {selectedPod.namespace} · {selectedPod.version}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {getStatusBadge(selectedPod.status)}
                <button
                  type="button"
                  onClick={() => setSelectedPodId(null)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--color-text-secondary)',
                    padding: 4,
                  }}
                  title="Close Inspector"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--color-border)',
              padding: '0 16px',
              gap: 16,
              background: 'var(--color-bg-surface)',
            }}>
              {(['telemetry', 'yaml', 'events'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveInspectorTab(tab)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '10px 0',
                    cursor: 'pointer',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: activeInspectorTab === tab ? '#df7e30' : 'var(--color-text-secondary)',
                    borderBottom: activeInspectorTab === tab ? '2px solid #df7e30' : '2px solid transparent',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Inspector Tab Content */}
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeInspectorTab === 'telemetry' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ padding: 12, borderRadius: 8, border: '1px solid var(--color-border)', background: 'rgba(0,0,0,0.02)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>CPU Core Allocation</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, margin: '4px 0', color: 'var(--color-text-primary)' }}>
                        {selectedPod.cpu}% <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>/ 4 Cores</span>
                      </div>
                      <NeuronProgress value={selectedPod.cpu} color={selectedPod.cpu > 80 ? 'error' : 'primary'} size="xs" />
                    </div>

                    <div style={{ padding: 12, borderRadius: 8, border: '1px solid var(--color-border)', background: 'rgba(0,0,0,0.02)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>RAM Consumption</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, margin: '4px 0', color: 'var(--color-text-primary)' }}>
                        {selectedPod.memory} MB <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>/ 8 GB</span>
                      </div>
                      <NeuronProgress value={(selectedPod.memory / 8192) * 100} color="info" size="xs" />
                    </div>
                  </div>

                  <div style={{
                    padding: 12,
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    fontSize: '12px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>P99 Request Latency:</span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{selectedPod.latency}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Historical Uptime:</span>
                      <strong style={{ color: '#10b981' }}>{selectedPod.uptime}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Crash Restarts:</span>
                      <strong style={{ color: selectedPod.restarts > 0 ? '#ef4444' : 'var(--color-text-secondary)' }}>
                        {selectedPod.restarts} occurrences
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Deployment Target:</span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>AWS EKS ap-southeast-3</strong>
                    </div>
                  </div>

                  {/* Lifecycle Commands */}
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 14 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                      Pod Lifecycle Operations
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      <NeuronButton
                        size="xs"
                        variant="secondary"
                        leadingIcon={<RefreshCw size={12} />}
                        onClick={() => triggerAction(`Rolling restart initiated for ${selectedPod.name}`)}
                      >
                        Rolling Restart
                      </NeuronButton>
                      <NeuronButton
                        size="xs"
                        variant="secondary"
                        leadingIcon={<TrendingUp size={12} />}
                        onClick={() => triggerAction(`Horizontal pod autoscaling limit increased for ${selectedPod.name}`)}
                      >
                        Scale Replicas
                      </NeuronButton>
                      <NeuronButton
                        size="xs"
                        variant="danger"
                        leadingIcon={<Trash2 size={12} />}
                        onClick={() => triggerAction(`Drain node command sent for ${selectedPod.name}`)}
                      >
                        Drain Workload
                      </NeuronButton>
                    </div>
                  </div>
                </>
              )}

              {activeInspectorTab === 'yaml' && (
                <div style={{
                  background: 'var(--color-bg-canvas, #0f172a)',
                  color: '#e2e8f0',
                  padding: 12,
                  borderRadius: 6,
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  lineHeight: 1.5,
                  overflowX: 'auto',
                }}>
                  <pre style={{ margin: 0 }}>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${selectedPod.name}
  namespace: ${selectedPod.namespace}
spec:
  replicas: 8
  template:
    spec:
      containers:
      - name: app
        image: registry.neudela.io/${selectedPod.name}:${selectedPod.version}
        resources:
          limits:
            cpu: "4000m"
            memory: "8Gi"`}</pre>
                </div>
              )}

              {activeInspectorTab === 'events' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '12px' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={14} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Pod scheduled successfully</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>2 minutes ago · node-ip-10-0-4-12</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={14} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Readiness probe passed</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>3 minutes ago · HTTP 200 /healthz</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Activity size={14} color="#df7e30" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Telemetry agent connected</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>14 minutes ago · Prometheus scraper</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant 2: Batch Processing & Floating Action Dock
// ─────────────────────────────────────────────────────────────────────────────

interface InvoiceRecord {
  id: string;
  invoiceNo: string;
  client: string;
  clientInitial: string;
  clientColor: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  method: string;
}

const INITIAL_INVOICES: InvoiceRecord[] = [
  { id: 'inv-1', invoiceNo: 'INV-2026-8891', client: 'Stripe Payments Singapore', clientInitial: 'SP', clientColor: '#6366f1', issueDate: '2026-10-15', dueDate: '2026-11-15', amount: 48500, status: 'paid', method: 'Wire Transfer' },
  { id: 'inv-2', invoiceNo: 'INV-2026-8892', client: 'Figma Cloud Workspace', clientInitial: 'FC', clientColor: '#ec4899', issueDate: '2026-10-22', dueDate: '2026-11-05', amount: 19200, status: 'pending', method: 'Corporate Visa' },
  { id: 'inv-3', invoiceNo: 'INV-2026-8893', client: 'Snowflake Data Warehouse', clientInitial: 'SD', clientColor: '#0ea5e9', issueDate: '2026-09-10', dueDate: '2026-10-10', amount: 84600, status: 'overdue', method: 'ACH Direct' },
  { id: 'inv-4', invoiceNo: 'INV-2026-8894', client: 'OpenAI API Platform', clientInitial: 'OA', clientColor: '#10b981', issueDate: '2026-10-28', dueDate: '2026-11-28', amount: 32000, status: 'pending', method: 'Wire Transfer' },
  { id: 'inv-5', invoiceNo: 'INV-2026-8895', client: 'Datadog Observability', clientInitial: 'DO', clientColor: '#7c3aed', issueDate: '2026-10-01', dueDate: '2026-10-31', amount: 15400, status: 'paid', method: 'Corporate Amex' },
  { id: 'inv-6', invoiceNo: 'INV-2026-8896', client: 'Amazon Web Services EMEA', clientInitial: 'AW', clientColor: '#f59e0b', issueDate: '2026-09-18', dueDate: '2026-10-18', amount: 96300, status: 'overdue', method: 'ACH Direct' },
  { id: 'inv-7', invoiceNo: 'INV-2026-8897', client: 'Vercel Enterprise Platform', clientInitial: 'VE', clientColor: '#000000', issueDate: '2026-10-25', dueDate: '2026-11-25', amount: 22800, status: 'pending', method: 'Corporate Visa' },
  { id: 'inv-8', invoiceNo: 'INV-2026-8898', client: 'Cloudflare Zero Trust', clientInitial: 'CZ', clientColor: '#f97316', issueDate: '2026-10-18', dueDate: '2026-11-18', amount: 11200, status: 'paid', method: 'Wire Transfer' },
];

function BulkActionDataGrid() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['inv-2', 'inv-4']));
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'pending' | 'overdue' | 'paid'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredInvoices = useMemo(() => {
    if (activeTabFilter === 'all') return invoices;
    return invoices.filter(inv => inv.status === activeTabFilter);
  }, [invoices, activeTabFilter]);

  const allVisibleSelected = filteredInvoices.length > 0 && filteredInvoices.every(i => selectedIds.has(i.id));
  const someVisibleSelected = filteredInvoices.some(i => selectedIds.has(i.id)) && !allVisibleSelected;

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const next = new Set(selectedIds);
      filteredInvoices.forEach(i => next.delete(i.id));
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      filteredInvoices.forEach(i => next.add(i.id));
      setSelectedIds(next);
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectedInvoices = useMemo(() => {
    return invoices.filter(i => selectedIds.has(i.id));
  }, [invoices, selectedIds]);

  const totalSelectedAmount = useMemo(() => {
    return selectedInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  }, [selectedInvoices]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBulkMarkPaid = () => {
    setInvoices(prev => prev.map(inv => selectedIds.has(inv.id) ? { ...inv, status: 'paid' } : inv));
    showToast(`Successfully marked ${selectedIds.size} invoices as Paid!`);
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    setInvoices(prev => prev.filter(inv => !selectedIds.has(inv.id)));
    showToast(`Removed ${selectedIds.size} invoices from ledger.`);
    setSelectedIds(new Set());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: 8,
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: '13px',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease',
        }}>
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        padding: '12px 16px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {(['all', 'pending', 'overdue', 'paid'] as const).map(tab => {
            const count = tab === 'all' ? invoices.length : invoices.filter(i => i.status === tab).length;
            const isActive = activeTabFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTabFilter(tab)}
                style={{
                  border: 'none',
                  background: isActive ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                  color: isActive ? '#df7e30' : 'var(--color-text-secondary)',
                  padding: '6px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab} Invoices</span>
                <span style={{
                  fontSize: '11px',
                  background: isActive ? '#df7e30' : 'rgba(0,0,0,0.06)',
                  color: isActive ? '#fff' : 'var(--color-text-secondary)',
                  padding: '1px 6px',
                  borderRadius: 10,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NeuronButton
            size="sm"
            variant="secondary"
            leadingIcon={<Download size={13} />}
            onClick={() => showToast('Exporting active invoice view to CSV...')}
          >
            Export All CSV
          </NeuronButton>
        </div>
      </div>

      {/* Table Container */}
      <div className="neuron-table-container" style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="neuron-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="neuron-table neuron-table--hoverable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{
                background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                borderBottom: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 44 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NeuronCheckbox
                      size="sm"
                      variant="brand"
                      checked={allVisibleSelected}
                      indeterminate={someVisibleSelected && !allVisibleSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all invoices"
                    />
                  </div>
                </th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Invoice ID</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Client Organization</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Issue Date</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Due Date</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Total Amount</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Payment Status</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => {
                const isChecked = selectedIds.has(inv.id);
                return (
                  <tr
                    key={inv.id}
                    className="neuron-table__tr"
                    onClick={() => toggleSelectRow(inv.id)}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      background: isChecked ? 'rgba(223, 126, 48, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }} onClick={(e) => e.stopPropagation()}>
                      <NeuronCheckbox
                        size="sm"
                        variant="brand"
                        checked={isChecked}
                        onChange={() => toggleSelectRow(inv.id)}
                        aria-label={`Select invoice ${inv.invoiceNo}`}
                      />
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {inv.invoiceNo}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <NeuronAvatar name={inv.client} size="xs" />
                        <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{inv.client}</span>
                      </div>
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-secondary)', fontSize: '12.5px' }}>
                      {inv.issueDate}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-secondary)', fontSize: '12.5px' }}>
                      {inv.dueDate}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      ${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      {inv.status === 'paid' && <NeuronBadge variant="success" size="sm">Paid</NeuronBadge>}
                      {inv.status === 'pending' && <NeuronBadge variant="warning" size="sm">Pending</NeuronBadge>}
                      {inv.status === 'overdue' && <NeuronBadge variant="error" size="sm">Overdue</NeuronBadge>}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                      {inv.method}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Batch Action Command Dock */}
      {selectedIds.size > 0 && (
        <div style={{
          position: 'sticky',
          bottom: 20,
          margin: '0 auto',
          width: 'fit-content',
          maxWidth: '92%',
          background: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)',
          color: '#f8fafc',
          padding: '10px 18px',
          borderRadius: 40,
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          zIndex: 100,
          animation: 'fadeIn 0.2s ease',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: '#df7e30',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 12,
            }}>
              {selectedIds.size}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500 }}>
              Selected (${totalSelectedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })})
            </span>
          </div>

          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NeuronButton
              size="xs"
              variant="primary"
              leadingIcon={<Check size={12} />}
              onClick={handleBulkMarkPaid}
            >
              Mark as Paid
            </NeuronButton>
            <NeuronButton
              size="xs"
              variant="secondary"
              leadingIcon={<Download size={12} />}
              onClick={() => showToast(`Exported batch of ${selectedIds.size} invoices`)}
              style={{ color: '#fff', background: 'rgba(255,255,255,0.12)', border: 'none' }}
            >
              Export Batch
            </NeuronButton>
            <NeuronButton
              size="xs"
              variant="danger"
              leadingIcon={<Trash2 size={12} />}
              onClick={handleBulkDelete}
            >
              Void Selected
            </NeuronButton>
          </div>

          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '4px 6px',
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant 3: Faceted Filter & Query Builder
// ─────────────────────────────────────────────────────────────────────────────

interface CRMAccount {
  id: string;
  company: string;
  industry: string;
  stage: 'Discovery' | 'Proposal Sent' | 'Negotiation' | 'Closed Won';
  dealValue: number;
  owner: string;
  region: 'APAC' | 'EMEA' | 'NA';
  healthScore: number;
}

const CRM_DATA: CRMAccount[] = [
  { id: 'crm-1', company: 'Vertex Dynamics Enterprise', industry: 'FinTech', stage: 'Negotiation', dealValue: 340000, owner: 'Alex Mercer', region: 'APAC', healthScore: 94 },
  { id: 'crm-2', company: 'Starlight Global Logistics', industry: 'Supply Chain', stage: 'Proposal Sent', dealValue: 185000, owner: 'Sarah Connor', region: 'NA', healthScore: 78 },
  { id: 'crm-3', company: 'Hyperion Capital & Securities', industry: 'Banking', stage: 'Closed Won', dealValue: 520000, owner: 'David Vance', region: 'EMEA', healthScore: 98 },
  { id: 'crm-4', company: 'Apex Healthcare Telematics', industry: 'Healthcare', stage: 'Discovery', dealValue: 95000, owner: 'Elena Rostova', region: 'APAC', healthScore: 82 },
  { id: 'crm-5', company: 'Quantum Telecom Infrastructure', industry: 'Telecommunications', stage: 'Negotiation', dealValue: 410000, owner: 'Alex Mercer', region: 'EMEA', healthScore: 89 },
  { id: 'crm-6', company: 'Nordic Media Streaming', industry: 'Entertainment', stage: 'Proposal Sent', dealValue: 160000, owner: 'Sarah Connor', region: 'EMEA', healthScore: 85 },
  { id: 'crm-7', company: 'Omni Retail Supercenters', industry: 'Retail', stage: 'Closed Won', dealValue: 680000, owner: 'David Vance', region: 'NA', healthScore: 96 },
  { id: 'crm-8', company: 'CyberShield Cloud Defense', industry: 'Cybersecurity', stage: 'Discovery', dealValue: 120000, owner: 'Elena Rostova', region: 'NA', healthScore: 74 },
];

function FacetedFilterDataGrid() {
  const [data] = useState<CRMAccount[]>(CRM_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [minValue, setMinValue] = useState<number>(0);
  const [activeView, setActiveView] = useState<string>('all');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.owner.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStage = selectedStage === 'all' || item.stage === selectedStage;
      const matchRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const matchValue = item.dealValue >= minValue;
      return matchSearch && matchStage && matchRegion && matchValue;
    });
  }, [data, searchQuery, selectedStage, selectedRegion, minValue]);

  const activeFiltersCount = (selectedStage !== 'all' ? 1 : 0) +
                             (selectedRegion !== 'all' ? 1 : 0) +
                             (minValue > 0 ? 1 : 0) +
                             (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStage('all');
    setSelectedRegion('all');
    setMinValue(0);
    setActiveView('all');
  };

  const handleSavedViewSelect = (view: string) => {
    setActiveView(view);
    if (view === 'high-value') {
      setSelectedStage('all');
      setSelectedRegion('all');
      setMinValue(300000);
    } else if (view === 'closing-soon') {
      setSelectedStage('Negotiation');
      setSelectedRegion('all');
      setMinValue(0);
    } else if (view === 'apac-pipeline') {
      setSelectedStage('all');
      setSelectedRegion('APAC');
      setMinValue(0);
    } else {
      resetFilters();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Faceted Filters Toolbar */}
      <div style={{
        padding: '16px 18px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {/* Saved Views Segmented Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginRight: 4 }}>
              Saved Views:
            </span>
            {[
              { id: 'all', label: 'All Deals' },
              { id: 'high-value', label: 'Enterprise >$300k' },
              { id: 'closing-soon', label: 'In Negotiation' },
              { id: 'apac-pipeline', label: 'APAC Hub' },
            ].map(v => (
              <button
                key={v.id}
                type="button"
                onClick={() => handleSavedViewSelect(v.id)}
                style={{
                  border: '1px solid',
                  borderColor: activeView === v.id ? '#df7e30' : 'var(--color-border)',
                  background: activeView === v.id ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                  color: activeView === v.id ? '#df7e30' : 'var(--color-text-secondary)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          <NeuronButton
            size="xs"
            variant="secondary"
            leadingIcon={<Download size={13} />}
          >
            Export View (CSV)
          </NeuronButton>
        </div>

        {/* Filter Inputs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <NeuronInput
            size="sm"
            placeholder="Search account, industry, owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leadingIcon={<Search size={14} color="var(--color-text-secondary)" />}
          />

          <NeuronSelect
            size="sm"
            options={[
              { value: 'all', label: 'All Stages' },
              { value: 'Discovery', label: 'Discovery' },
              { value: 'Proposal Sent', label: 'Proposal Sent' },
              { value: 'Negotiation', label: 'Negotiation' },
              { value: 'Closed Won', label: 'Closed Won' },
            ]}
            value={selectedStage}
            onChange={(val) => { setSelectedStage(val as string); setActiveView('custom'); }}
          />

          <NeuronSelect
            size="sm"
            options={[
              { value: 'all', label: 'All Regions' },
              { value: 'APAC', label: 'APAC (Asia Pacific)' },
              { value: 'EMEA', label: 'EMEA (Europe/Middle East)' },
              { value: 'NA', label: 'NA (North America)' },
            ]}
            value={selectedRegion}
            onChange={(val) => { setSelectedRegion(val as string); setActiveView('custom'); }}
          />

          <NeuronSelect
            size="sm"
            options={[
              { value: '0', label: 'Any Deal Size' },
              { value: '150000', label: 'Min. $150,000+' },
              { value: '300000', label: 'Min. $300,000+' },
              { value: '500000', label: 'Min. $500,000+' },
            ]}
            value={minValue.toString()}
            onChange={(val) => { setMinValue(Number(val)); setActiveView('custom'); }}
          />
        </div>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 8,
            paddingTop: 8,
            borderTop: '1px solid var(--color-border)',
            fontSize: '12px',
          }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Active Filters ({activeFiltersCount}):</span>
            {searchQuery && (
              <span style={{
                background: 'rgba(223, 126, 48, 0.12)',
                color: '#df7e30',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                "{searchQuery}"
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
              </span>
            )}
            {selectedStage !== 'all' && (
              <span style={{
                background: 'rgba(59, 130, 246, 0.12)',
                color: '#3b82f6',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                Stage: {selectedStage}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedStage('all')} />
              </span>
            )}
            {selectedRegion !== 'all' && (
              <span style={{
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                Region: {selectedRegion}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedRegion('all')} />
              </span>
            )}
            {minValue > 0 && (
              <span style={{
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#8b5cf6',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                Min. ${minValue.toLocaleString()}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setMinValue(0)} />
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '11.5px',
              }}
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Table Data */}
      <div className="neuron-table-container" style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="neuron-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="neuron-table neuron-table--hoverable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{
                background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                borderBottom: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Target Account</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Industry</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Deal Stage</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Deal Value</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Region</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Deal Lead</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Health Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="neuron-table__td" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <AlertCircle size={28} color="var(--color-text-secondary)" />
                      <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>No matching deals found</strong>
                      <span style={{ fontSize: '12px' }}>Try adjusting your active filter parameters or query string.</span>
                      <NeuronButton size="xs" variant="secondary" onClick={resetFilters} style={{ marginTop: 8 }}>
                        Reset Filters
                      </NeuronButton>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="neuron-table__tr"
                    style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-subtle, rgba(0,0,0,0.02))'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{item.company}</strong>
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                      {item.industry}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      {item.stage === 'Closed Won' && <NeuronBadge variant="success" size="sm">Closed Won</NeuronBadge>}
                      {item.stage === 'Negotiation' && <NeuronBadge variant="warning" size="sm">Negotiation</NeuronBadge>}
                      {item.stage === 'Proposal Sent' && <NeuronBadge variant="info" size="sm">Proposal Sent</NeuronBadge>}
                      {item.stage === 'Discovery' && <NeuronBadge variant="neutral" size="sm">Discovery</NeuronBadge>}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      ${item.dealValue.toLocaleString()}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      <NeuronBadge variant="neutral" size="sm">{item.region}</NeuronBadge>
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <NeuronAvatar name={item.owner} size="xs" />
                        <span>{item.owner}</span>
                      </div>
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', width: 130 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <NeuronProgress value={item.healthScore} color={item.healthScore > 85 ? 'success' : 'primary'} size="xs" />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700 }}>{item.healthScore}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant 4: Multi-Modal View Switcher (Table, Cards, Kanban)
// ─────────────────────────────────────────────────────────────────────────────

interface ProductAsset {
  id: string;
  name: string;
  category: string;
  stage: 'Planning' | 'In Development' | 'Beta Testing' | 'Production Ready';
  version: string;
  lead: string;
  health: number;
  downloads: string;
}

const ASSET_CATALOG: ProductAsset[] = [
  { id: 'ast-1', name: 'Neudela Design System Core', category: 'Design System', stage: 'Production Ready', version: 'v2.4.1', lead: 'Sarah Connor', health: 98, downloads: '142k' },
  { id: 'ast-2', name: 'Neuron Mobile Kit (React Native)', category: 'Mobile Framework', stage: 'In Development', version: 'v0.9.0', lead: 'Alex Mercer', health: 84, downloads: '18k' },
  { id: 'ast-3', name: 'Enterprise SAML Auth Gateway', category: 'Security & IAM', stage: 'Production Ready', version: 'v3.2.0', lead: 'David Vance', health: 95, downloads: '89k' },
  { id: 'ast-4', name: 'Realtime Telemetry & Ingestion', category: 'Observability', stage: 'Beta Testing', version: 'v1.4.0', lead: 'Elena Rostova', health: 88, downloads: '34k' },
  { id: 'ast-5', name: 'Billing & Stripe Connect Service', category: 'FinTech', stage: 'Production Ready', version: 'v2.1.2', lead: 'Sarah Connor', health: 96, downloads: '67k' },
  { id: 'ast-6', name: 'AI Assistant IDE Plugin (Antigravity)', category: 'Developer Tools', stage: 'In Development', version: 'v0.8.4', lead: 'Alex Mercer', health: 79, downloads: '12k' },
  { id: 'ast-7', name: 'Kubernetes Helm Chart Suite', category: 'Infrastructure', stage: 'Production Ready', version: 'v1.18.0', lead: 'David Vance', health: 99, downloads: '110k' },
  { id: 'ast-8', name: 'Interactive Documentation Engine', category: 'Developer Tools', stage: 'Planning', version: 'v0.1.0', lead: 'Elena Rostova', health: 70, downloads: '2k' },
];

function MultiViewDataGrid() {
  const [items] = useState<ProductAsset[]>(ASSET_CATALOG);
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'kanban'>('table');
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));
  }, [items, search]);

  const kanbanColumns = ['Planning', 'In Development', 'Beta Testing', 'Production Ready'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* View Switcher Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        padding: '12px 16px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
      }}>
        <div style={{ position: 'relative', width: 280 }}>
          <NeuronInput
            size="sm"
            placeholder="Search digital assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leadingIcon={<Search size={14} color="var(--color-text-secondary)" />}
          />
        </div>

        {/* View Switcher Segmented Control */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: 36,
          boxSizing: 'border-box',
          background: 'var(--color-bg-subtle, rgba(0,0,0,0.06))',
          borderRadius: 8,
          padding: 3,
        }}>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            style={{
              height: 28,
              boxSizing: 'border-box',
              border: 'none',
              background: viewMode === 'table' ? 'var(--color-bg-surface)' : 'transparent',
              color: viewMode === 'table' ? '#df7e30' : 'var(--color-text-secondary)',
              padding: '0 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: viewMode === 'table' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Table size={14} />
            <span>Dense Table</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('cards')}
            style={{
              height: 28,
              boxSizing: 'border-box',
              border: 'none',
              background: viewMode === 'cards' ? 'var(--color-bg-surface)' : 'transparent',
              color: viewMode === 'cards' ? '#df7e30' : 'var(--color-text-secondary)',
              padding: '0 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: viewMode === 'cards' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <LayoutGrid size={14} />
            <span>Card Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('kanban')}
            style={{
              height: 28,
              boxSizing: 'border-box',
              border: 'none',
              background: viewMode === 'kanban' ? 'var(--color-bg-surface)' : 'transparent',
              color: viewMode === 'kanban' ? '#df7e30' : 'var(--color-text-secondary)',
              padding: '0 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: viewMode === 'kanban' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <Columns size={14} />
            <span>Kanban Board</span>
          </button>
        </div>
      </div>

      {/* 1. Dense Table View */}
      {viewMode === 'table' && (
        <div className="neuron-table-container" style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div className="neuron-table-wrapper" style={{ overflowX: 'auto' }}>
            <table className="neuron-table neuron-table--hoverable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{
                  background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Asset Name</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Category</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Lifecycle Stage</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Release Version</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Tech Lead</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Weekly Pulls</th>
                  <th className="neuron-table__th" style={{ padding: '12px 14px' }}>Health</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} className="neuron-table__tr" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>{item.category}</td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      {item.stage === 'Production Ready' && <NeuronBadge variant="success" size="sm">Production</NeuronBadge>}
                      {item.stage === 'Beta Testing' && <NeuronBadge variant="warning" size="sm">Beta</NeuronBadge>}
                      {item.stage === 'In Development' && <NeuronBadge variant="info" size="sm">Dev</NeuronBadge>}
                      {item.stage === 'Planning' && <NeuronBadge variant="neutral" size="sm">Planning</NeuronBadge>}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '12px' }}>{item.version}</td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <NeuronAvatar name={item.lead} size="xs" />
                        <span>{item.lead}</span>
                      </div>
                    </td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', fontWeight: 600 }}>{item.downloads}</td>
                    <td className="neuron-table__td" style={{ padding: '12px 14px', width: 120 }}>
                      <NeuronProgress value={item.health} color={item.health > 85 ? 'success' : 'primary'} size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Card Grid View */}
      {viewMode === 'cards' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 10,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }}>
                  {item.version}
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-text-primary)' }}>
                {item.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Lead: {item.lead}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#df7e30' }}>{item.downloads} downloads</span>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {item.stage === 'Production Ready' && <NeuronBadge variant="success" size="sm">Production</NeuronBadge>}
                {item.stage === 'Beta Testing' && <NeuronBadge variant="warning" size="sm">Beta</NeuronBadge>}
                {item.stage === 'In Development' && <NeuronBadge variant="info" size="sm">Dev</NeuronBadge>}
                {item.stage === 'Planning' && <NeuronBadge variant="neutral" size="sm">Planning</NeuronBadge>}

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Score:</span>
                  <strong style={{ fontSize: '12px' }}>{item.health}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Kanban Board View */}
      {viewMode === 'kanban' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(240px, 1fr))',
          gap: 14,
          alignItems: 'start',
          overflowX: 'auto',
          paddingBottom: 10,
        }}>
          {kanbanColumns.map(col => {
            const columnItems = filteredItems.filter(i => i.stage === col);
            return (
              <div
                key={col}
                style={{
                  background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  minHeight: 340,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6, borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{col}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(0,0,0,0.06)', padding: '2px 7px', borderRadius: 10 }}>
                    {columnItems.length}
                  </span>
                </div>

                {columnItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      padding: 12,
                      boxShadow: 'var(--shadow-xs)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{item.category}</div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>{item.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: 6 }}>
                      <span>{item.lead}</span>
                      <span style={{ fontFamily: 'monospace' }}>{item.version}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant 5: Inline Editable Spreadsheet Grid
// ─────────────────────────────────────────────────────────────────────────────

interface BudgetRow {
  id: string;
  name: string;
  department: 'Engineering' | 'Product' | 'Security' | 'Marketing' | 'Operations';
  q1Allocated: number;
  q2Projected: number;
  priority: 'High' | 'Medium' | 'Low';
  approved: boolean;
}

const INITIAL_BUDGETS: BudgetRow[] = [
  { id: 'b-1', name: 'Multi-Cloud Infrastructure (AWS/GCP)', department: 'Engineering', q1Allocated: 240000, q2Projected: 275000, priority: 'High', approved: true },
  { id: 'b-2', name: 'Core Engineering Salaries & Retention', department: 'Engineering', q1Allocated: 820000, q2Projected: 850000, priority: 'High', approved: true },
  { id: 'b-3', name: 'Product Design & Prototyping Tools', department: 'Product', q1Allocated: 45000, q2Projected: 48000, priority: 'Medium', approved: true },
  { id: 'b-4', name: 'SOC2 & ISO27001 Annual Audits', department: 'Security', q1Allocated: 60000, q2Projected: 65000, priority: 'High', approved: true },
  { id: 'b-5', name: 'Performance Marketing & Brand Ads', department: 'Marketing', q1Allocated: 120000, q2Projected: 140000, priority: 'Medium', approved: false },
  { id: 'b-6', name: 'Customer Success & Zendesk Seats', department: 'Operations', q1Allocated: 38000, q2Projected: 42000, priority: 'Low', approved: true },
  { id: 'b-7', name: 'Enterprise Hardware Refresh (M3 Pro)', department: 'Operations', q1Allocated: 95000, q2Projected: 70000, priority: 'Medium', approved: false },
  { id: 'b-8', name: 'AI LLM API Tokens & Copilot Hub', department: 'Engineering', q1Allocated: 85000, q2Projected: 130000, priority: 'High', approved: true },
];

const DEPARTMENT_OPTIONS = [
  { value: 'Engineering', label: 'Engineering', dotColor: '#3b82f6' },
  { value: 'Product', label: 'Product', dotColor: '#8b5cf6' },
  { value: 'Security', label: 'Security', dotColor: '#ef4444' },
  { value: 'Marketing', label: 'Marketing', dotColor: '#f59e0b' },
  { value: 'Operations', label: 'Operations', dotColor: '#10b981' },
];

const PRIORITY_OPTIONS = [
  { value: 'High', label: 'High', dotColor: '#ef4444' },
  { value: 'Medium', label: 'Medium', dotColor: '#f59e0b' },
  { value: 'Low', label: 'Low', dotColor: '#10b981' },
];

function InlineEditableDataGrid() {
  const [rows, setRows] = useState<BudgetRow[]>(INITIAL_BUDGETS);
  const [dirtyRowIds, setDirtyRowIds] = useState<Set<string>>(new Set());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const updateRow = <K extends keyof BudgetRow>(id: string, field: K, value: BudgetRow[K]) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    setDirtyRowIds(prev => new Set(prev).add(id));
  };

  const totalQ1 = useMemo(() => rows.reduce((acc, r) => acc + r.q1Allocated, 0), [rows]);
  const totalQ2 = useMemo(() => rows.reduce((acc, r) => acc + r.q2Projected, 0), [rows]);
  const overallVariance = totalQ1 > 0 ? (((totalQ2 - totalQ1) / totalQ1) * 100).toFixed(1) : '0';

  const handleSave = () => {
    setDirtyRowIds(new Set());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRevert = () => {
    setRows(INITIAL_BUDGETS);
    setDirtyRowIds(new Set());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
      {/* Save Success Alert */}
      {savedSuccess && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: 8,
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: '13px',
          fontWeight: 600,
        }}>
          <CheckCircle2 size={16} />
          <span>All budget allocations successfully persisted to backend ledger!</span>
        </div>
      )}

      {/* Grid Meta Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        padding: '12px 16px',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Click any cell to edit inline. Live variance & totals compute automatically.
          </div>
          {dirtyRowIds.size > 0 && (
            <span style={{
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#d97706',
              fontSize: '11.5px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 12,
            }}>
              {dirtyRowIds.size} row(s) modified
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronButton
            size="xs"
            variant="secondary"
            leadingIcon={<Undo2 size={12} />}
            onClick={handleRevert}
            disabled={dirtyRowIds.size === 0}
          >
            Revert Changes
          </NeuronButton>
          <NeuronButton
            size="xs"
            variant="primary"
            leadingIcon={<Save size={12} />}
            onClick={handleSave}
            disabled={dirtyRowIds.size === 0}
          >
            Save All Changes
          </NeuronButton>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <div className="neuron-table-container" style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="neuron-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="neuron-table neuron-table--bordered neuron-table--hoverable neuron-table--sm" style={{ width: '100%', minWidth: 1060, borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{
                background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                borderBottom: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 44, textAlign: 'center' }}></th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', minWidth: 260 }}>Line Item Name</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 175 }}>Department</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 165 }}>Q1 Budget ($)</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 165 }}>Q2 Target ($)</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 110, textAlign: 'right' }}>Variance</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 145 }}>Priority</th>
                <th className="neuron-table__th" style={{ padding: '12px 14px', width: 90, textAlign: 'center' }}>Approved</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const isDirty = dirtyRowIds.has(row.id);
                const variance = row.q1Allocated > 0
                  ? (((row.q2Projected - row.q1Allocated) / row.q1Allocated) * 100).toFixed(1)
                  : '0';
                const isPositive = Number(variance) > 0;

                return (
                  <tr
                    key={row.id}
                    className="neuron-table__tr"
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      background: isDirty ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                    }}
                  >
                    <td className="neuron-table__td" style={{ padding: '8px 10px', textAlign: 'center' }}>
                      {isDirty ? (
                        <div
                          title="Modified in memory (unsaved)"
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#f59e0b',
                            boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)',
                            margin: '0 auto',
                          }}
                        />
                      ) : (
                        <div style={{ width: 8, height: 8 }} />
                      )}
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px' }}>
                      <NeuronInput
                        size="sm"
                        value={row.name}
                        onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                        placeholder="Line item name"
                      />
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px' }}>
                      <NeuronSelect
                        size="sm"
                        options={DEPARTMENT_OPTIONS}
                        value={row.department}
                        onChange={(val) => updateRow(row.id, 'department', (Array.isArray(val) ? val[0] : val) as any)}
                      />
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px' }}>
                      <NeuronInput
                        size="sm"
                        type="text"
                        value={row.q1Allocated.toLocaleString('en-US')}
                        onChange={(e) => {
                          const numeric = Number(e.target.value.replace(/[^0-9]/g, ''));
                          updateRow(row.id, 'q1Allocated', isNaN(numeric) ? 0 : numeric);
                        }}
                        leadingText="$"
                      />
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px' }}>
                      <NeuronInput
                        size="sm"
                        type="text"
                        value={row.q2Projected.toLocaleString('en-US')}
                        onChange={(e) => {
                          const numeric = Number(e.target.value.replace(/[^0-9]/g, ''));
                          updateRow(row.id, 'q2Projected', isNaN(numeric) ? 0 : numeric);
                        }}
                        leadingText="$"
                      />
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px', textAlign: 'right' }}>
                      <NeuronBadge
                        variant={isPositive ? 'success' : 'neutral'}
                        size="sm"
                        pill
                      >
                        {isPositive ? `+${variance}%` : `${variance}%`}
                      </NeuronBadge>
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px' }}>
                      <NeuronSelect
                        size="sm"
                        options={PRIORITY_OPTIONS}
                        value={row.priority}
                        onChange={(val) => updateRow(row.id, 'priority', (Array.isArray(val) ? val[0] : val) as any)}
                      />
                    </td>
                    <td className="neuron-table__td" style={{ padding: '6px 10px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <NeuronCheckbox
                          size="sm"
                          variant="brand"
                          checked={row.approved}
                          onChange={(checked) => updateRow(row.id, 'approved', checked)}
                          aria-label={`Approve ${row.name}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot style={{
              background: 'var(--color-bg-subtle, rgba(0,0,0,0.03))',
              borderTop: '2px solid var(--color-border)',
              fontWeight: 700,
              fontSize: '13px',
            }}>
              <tr>
                <td></td>
                <td style={{ padding: '12px 14px' }}>Total Ledger Sum</td>
                <td style={{ padding: '12px 14px' }}>
                  <NeuronBadge variant="brand" size="sm" pill>{rows.length} Line Items</NeuronBadge>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'monospace' }}>
                  ${totalQ1.toLocaleString()}
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right', color: '#df7e30', fontFamily: 'monospace' }}>
                  ${totalQ2.toLocaleString()}
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <NeuronBadge variant={Number(overallVariance) > 0 ? 'success' : 'neutral'} size="sm" pill>
                    +{overallVariance}%
                  </NeuronBadge>
                </td>
                <td colSpan={2} style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <NeuronBadge variant="info" size="xs">Live Synced</NeuronBadge>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Render Live Preview Function
// ─────────────────────────────────────────────────────────────────────────────

export function renderLiveDataGridPreview(variantId: DataGridVariantId) {
  switch (variantId) {
    case 'master-detail': return <MasterDetailDataGrid />;
    case 'bulk-actions': return <BulkActionDataGrid />;
    case 'faceted-filter': return <FacetedFilterDataGrid />;
    case 'multi-view': return <MultiViewDataGrid />;
    case 'inline-editable': return <InlineEditableDataGrid />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Visual Architecture Silhouette Component for Data Grid Cards
// ─────────────────────────────────────────────────────────────────────────────

function DataGridMiniSilhouette({ id, accentColor }: { id: DataGridVariantId; accentColor: string }) {
  return (
    <div
      style={{
        height: '110px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-canvas)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
        padding: '8px',
        justifyContent: 'center',
      }}
    >
      {/* Variant 1: Master-Detail Split Inspector */}
      {id === 'master-detail' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 6, height: '100%', width: '100%' }}>
          {/* Left: Table with Active Row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '6px 8px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--color-border)', paddingBottom: 4 }}>
              <div style={{ width: 10, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ width: 14, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
            </div>
            {/* Row 1 - Active */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${accentColor}18`, border: `1px solid ${accentColor}40`, borderRadius: 4, padding: '3px 4px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor }} />
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: accentColor }} />
              <div style={{ width: 10, height: 4, borderRadius: 2, background: `${accentColor}80` }} />
            </div>
            {/* Row 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 4px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
              <div style={{ width: 10, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.3 }} />
            </div>
            {/* Row 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 4px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#3b82f6' }} />
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
              <div style={{ width: 10, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.3 }} />
            </div>
          </div>
          {/* Right: Inspection Drawer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--color-bg-surface)', border: `1px solid ${accentColor}50`, borderRadius: 6, padding: '6px 8px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 4 }}>
              <div style={{ height: 4, width: 24, borderRadius: 2, background: accentColor }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor }} />
            </div>
            {/* Mini gauges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ height: 3, width: 14, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
                <div style={{ height: 3, width: 10, borderRadius: 1.5, background: accentColor }} />
              </div>
              <div style={{ height: 3, width: '100%', background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '70%', background: accentColor, borderRadius: 2 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <div style={{ height: 3, width: 14, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
                <div style={{ height: 3, width: 10, borderRadius: 1.5, background: '#10b981' }} />
              </div>
              <div style={{ height: 3, width: '100%', background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '45%', background: '#10b981', borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variant 2: Batch Processing & Floating Action Dock */}
      {id === 'bulk-actions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%', width: '100%', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '6px 8px', flex: 1 }}>
            {/* Header with checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid var(--color-border)', paddingBottom: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, border: `1.5px solid ${accentColor}`, background: `${accentColor}30` }} />
              <div style={{ height: 4, width: '30%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ height: 4, width: '25%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5, marginLeft: 'auto' }} />
            </div>
            {/* Selected Row 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: `${accentColor}14`, borderRadius: 3, padding: '2px 4px' }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 3, height: 2, borderBottom: '1px solid #fff', borderLeft: '1px solid #fff', transform: 'rotate(-45deg)' }} />
              </div>
              <div style={{ height: 4, width: '40%', borderRadius: 2, background: accentColor }} />
              <div style={{ height: 4, width: '20%', borderRadius: 2, background: accentColor, marginLeft: 'auto', opacity: 0.8 }} />
            </div>
            {/* Selected Row 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: `${accentColor}14`, borderRadius: 3, padding: '2px 4px' }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 3, height: 2, borderBottom: '1px solid #fff', borderLeft: '1px solid #fff', transform: 'rotate(-45deg)' }} />
              </div>
              <div style={{ height: 4, width: '35%', borderRadius: 2, background: accentColor }} />
              <div style={{ height: 4, width: '20%', borderRadius: 2, background: accentColor, marginLeft: 'auto', opacity: 0.8 }} />
            </div>
            {/* Unselected Row 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '2px 4px' }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, border: '1px solid var(--color-border)' }} />
              <div style={{ height: 4, width: '38%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
              <div style={{ height: 4, width: '18%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.3, marginLeft: 'auto' }} />
            </div>
          </div>
          {/* Floating Action Dock */}
          <div style={{
            position: 'absolute',
            bottom: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-bg-surface)',
            border: `1.5px solid ${accentColor}`,
            boxShadow: `0 4px 12px ${accentColor}30`,
            borderRadius: 20,
            padding: '3px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            zIndex: 2,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor }} />
            <div style={{ height: 4, width: 28, borderRadius: 2, background: accentColor }} />
            <div style={{ height: 8, width: 14, borderRadius: 3, background: accentColor, opacity: 0.9 }} />
            <div style={{ height: 8, width: 14, borderRadius: 3, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }} />
          </div>
        </div>
      )}

      {/* Variant 3: Faceted Filter & Query Builder */}
      {id === 'faceted-filter' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, height: '100%', width: '100%' }}>
          {/* Toolbar with Search and Facet Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '4px 6px' }}>
            <div style={{ width: 35, height: 10, borderRadius: 3, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 3px' }}>
              <div style={{ width: 3, height: 3, borderRadius: '50%', border: '1px solid var(--color-text-secondary)' }} />
            </div>
            {/* Active Chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: `${accentColor}20`, border: `1px solid ${accentColor}60`, borderRadius: 10, padding: '2px 5px' }}>
              <div style={{ height: 3, width: 14, borderRadius: 1.5, background: accentColor }} />
              <div style={{ fontSize: 6, color: accentColor, fontWeight: 700, lineHeight: 1 }}>×</div>
            </div>
            {/* Inactive Chip 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '2px 5px' }}>
              <div style={{ height: 3, width: 16, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
              <div style={{ fontSize: 5, color: 'var(--color-text-secondary)' }}>▼</div>
            </div>
            {/* Inactive Chip 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '2px 5px' }}>
              <div style={{ height: 3, width: 12, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
              <div style={{ fontSize: 5, color: 'var(--color-text-secondary)' }}>▼</div>
            </div>
          </div>
          {/* Table Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '5px 7px', flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--color-border)', paddingBottom: 3 }}>
              <div style={{ height: 3, width: '30%', borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ height: 3, width: '25%', borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ height: 3, width: '20%', borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.5, marginLeft: 'auto' }} />
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
                <div style={{ height: 4, width: '28%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
                <div style={{ height: 8, width: 22, borderRadius: 3, background: `${accentColor}18`, border: `1px solid ${accentColor}40` }} />
                <div style={{ height: 4, width: '18%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.4, marginLeft: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Variant 4: Multi-Modal View Switcher (Table, Cards, Kanban) */}
      {id === 'multi-view' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, height: '100%', width: '100%' }}>
          {/* Top Switcher Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '3px 6px' }}>
            <div style={{ height: 4, width: 30, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
            {/* View Segments */}
            <div style={{ display: 'flex', gap: 2, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 4, padding: 1.5 }}>
              <div style={{ width: 14, height: 10, borderRadius: 2, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Table size={7} color="var(--color-text-secondary)" />
              </div>
              <div style={{ width: 14, height: 10, borderRadius: 2, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LayoutGrid size={7} color="#fff" />
              </div>
              <div style={{ width: 14, height: 10, borderRadius: 2, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Columns size={7} color="var(--color-text-secondary)" />
              </div>
            </div>
          </div>
          {/* Visual Cards / Kanban Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, flex: 1 }}>
            {[
              { border: '#3b82f6', bg: '#3b82f615' },
              { border: accentColor, bg: `${accentColor}18` },
              { border: '#10b981', bg: '#10b98115' },
            ].map((col, idx) => (
              <div key={idx} style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 5, padding: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ height: 3, width: '60%', borderRadius: 1.5, background: col.border }} />
                <div style={{ flex: 1, background: col.bg, border: `1px solid ${col.border}40`, borderRadius: 3, padding: '3px 4px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ height: 3, width: '85%', borderRadius: 1.5, background: 'var(--color-text-primary)', opacity: 0.7 }} />
                  <div style={{ height: 3, width: '40%', borderRadius: 1.5, background: col.border }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Variant 5: Inline Editable Spreadsheet Grid */}
      {id === 'inline-editable' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, flex: 1, overflow: 'hidden' }}>
            {/* Header row with columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '16px 1.4fr 1fr 1fr', background: 'var(--color-bg-canvas)', borderBottom: '1px solid var(--color-border)', padding: '3px 4px' }}>
              <div style={{ height: 3, width: 6, borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
              <div style={{ height: 3, width: 22, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
              <div style={{ height: 3, width: 14, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
              <div style={{ height: 3, width: 16, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
            </div>
            {/* Row 1 - Normal */}
            <div style={{ display: 'grid', gridTemplateColumns: '16px 1.4fr 1fr 1fr', borderBottom: '1px solid var(--color-border)', padding: '3px 4px', alignItems: 'center' }}>
              <div style={{ height: 3, width: 6, borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.3 }} />
              <div style={{ height: 4, width: '70%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
              <div style={{ height: 4, width: '50%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ height: 6, width: 16, borderRadius: 2, background: '#10b98125', border: '1px solid #10b98160' }} />
            </div>
            {/* Row 2 - Dirty State with Active In-Cell Edit */}
            <div style={{ display: 'grid', gridTemplateColumns: '16px 1.4fr 1fr 1fr', borderBottom: '1px solid var(--color-border)', padding: '2px 4px', alignItems: 'center', background: `${accentColor}0c` }}>
              {/* Amber dirty dot */}
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ height: 4, width: '65%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.7 }} />
              {/* Active cell outline */}
              <div style={{ height: 11, background: 'var(--color-bg-surface)', border: `1.5px solid ${accentColor}`, borderRadius: 2, display: 'flex', alignItems: 'center', padding: '0 3px' }}>
                <div style={{ height: 4, width: 10, borderRadius: 1.5, background: accentColor }} />
              </div>
              <div style={{ height: 6, width: 16, borderRadius: 2, background: `${accentColor}25`, border: `1px solid ${accentColor}60` }} />
            </div>
            {/* Row 3 - Normal */}
            <div style={{ display: 'grid', gridTemplateColumns: '16px 1.4fr 1fr 1fr', padding: '3px 4px', alignItems: 'center' }}>
              <div style={{ height: 3, width: 6, borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.3 }} />
              <div style={{ height: 4, width: '55%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
              <div style={{ height: 4, width: '45%', borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
              <div style={{ height: 6, width: 16, borderRadius: 2, background: '#3b82f625', border: '1px solid #3b82f660' }} />
            </div>
          </div>
          {/* Bottom Sticky Calculation Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-bg-surface)', border: `1px solid ${accentColor}40`, borderRadius: 4, padding: '2px 6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ height: 3, width: 22, borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.7 }} />
            </div>
            <div style={{ height: 7, width: 18, borderRadius: 2, background: accentColor }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Documentation View Component
// ─────────────────────────────────────────────────────────────────────────────

export default function DataGridPatternView({ setActiveTab }: DataGridPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [selectedVariant, setSelectedVariant] = useState<DataGridVariantId>('master-detail');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedCodeTab, setCopiedCodeTab] = useState(false);

  const currentMeta = useMemo(
    () => DATA_GRID_VARIANTS.find(v => v.id === selectedVariant) || DATA_GRID_VARIANTS[0],
    [selectedVariant]
  );

  const handleOpenRealAppNewTab = (variantId: DataGridVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-data-grid-${variantId}`;
    window.open(url, '_blank');
  };

  const handleOpenModal = (variantId: DataGridVariantId) => {
    setSelectedVariant(variantId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const copyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeTab(true);
    setTimeout(() => setCopiedCodeTab(false), 2000);
  };

  return (
    <div className="pattern-data-grid-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Tabel & Manajemen Data' : 'Data Grid & Table'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur kisi data dan tabel operasional enterprise tingkat lanjut yang dibangun dengan mengorkestrasi komponen Neuron (NeuronTable, NeuronBadge, NeuronButton, NeuronSelect, NeuronProgress, NeuronCheckbox). Klik "Preview di Modal" untuk menguji interaktivitas tabel secara langsung, atau klik "Tab Baru" untuk menjalankan kisi data layar penuh sebagai aplikasi nyata.'
            : 'Enterprise-grade data grid and tabular management architectures composed using Neudela Design System tokens and core Neuron components (NeuronTable, NeuronBadge, NeuronButton, NeuronSelect, NeuronProgress, NeuronCheckbox). Click "Preview in Modal" to inspect live interactions or "New Tab" for a dedicated fullscreen browser window.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Database size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary, #df7e30)' }}>{DATA_GRID_VARIANTS.length} Patterns</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Layers size={14} color="#10b981" />
            <span>{isId ? 'Standar:' : 'Compliance:'}</span>
            <strong style={{ color: '#10b981' }}>WCAG 2.1 AA / High-Density</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <FileSpreadsheet size={14} color="#3b82f6" />
            <span>{isId ? 'Fitur Utama:' : 'Key Capabilities:'}</span>
            <strong style={{ color: '#3b82f6' }}>Split Inspector · Batch Dock · Faceted Filter · Multi-View · In-Cell Edit</strong>
          </div>
        </div>
      </div>

      {/* ── Pattern Architecture Cards Grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-12)',
      }}>
        {DATA_GRID_VARIANTS.map((variant) => (
          <div
            key={variant.id}
            onClick={() => handleOpenModal(variant.id)}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: 'var(--space-5)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="header-pattern-card sidebar-pattern-card"
          >
            {/* Accent Top Border with Gradient */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px',
              background: `linear-gradient(90deg, ${variant.accentColor} 0%, ${variant.accentColor}30 100%)`,
            }} />

            {/* Card Header & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: `${variant.accentColor}18`,
                border: `1px solid ${variant.accentColor}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: variant.accentColor,
              }}>
                {variant.id === 'master-detail' && <Server size={20} />}
                {variant.id === 'bulk-actions' && <CheckSquare size={20} />}
                {variant.id === 'faceted-filter' && <Filter size={20} />}
                {variant.id === 'multi-view' && <LayoutGrid size={20} />}
                {variant.id === 'inline-editable' && <FileSpreadsheet size={20} />}
              </div>

              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px',
                background: 'var(--color-bg-canvas)',
                color: variant.accentColor,
                border: `1px solid ${variant.accentColor}40`,
              }}>
                {variant.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 style={{
                fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0',
                color: 'var(--color-text-primary)',
              }}>
                {isId ? variant.nameId : variant.nameEn}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {isId ? variant.taglineId : variant.taglineEn}
              </p>
            </div>

            {/* Visual Architecture Silhouette */}
            <div style={{ margin: '4px 0' }}>
              <DataGridMiniSilhouette id={variant.id} accentColor={variant.accentColor} />
            </div>

            {/* Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {variant.tags.map(tag => (
                <span 
                  key={tag}
                  style={{
                    fontSize: '10.5px', background: 'var(--color-bg-canvas)',
                    padding: '2px 8px', borderRadius: '6px', color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Card Dual Action Buttons */}
            <div style={{
              marginTop: 'auto', paddingTop: 'var(--space-3)',
              display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)',
            }}>
              <button
                type="button"
                className="pattern-btn-modal-preview"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(variant.id);
                }}
              >
                <Eye size={14} />
                <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
              </button>

              <button
                type="button"
                className="pattern-btn-new-tab"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenRealAppNewTab(variant.id, e);
                }}
                title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
              >
                <ExternalLink size={14} />
                <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Interactive Modal Preview ── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '95vw',
              maxWidth: '1360px',
              height: '90vh',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 22px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-bg-canvas)',
                gap: '16px',
                flexShrink: 0,
              }}
            >
              {/* Left: Title & Variant Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: currentMeta.accentColor,
                    boxShadow: `0 0 10px ${currentMeta.accentColor}`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {isId ? currentMeta.nameId : currentMeta.nameEn}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: `${currentMeta.accentColor}20`,
                        color: currentMeta.accentColor,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {currentMeta.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  >
                    {isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Right Side: Subtabs + Action Buttons (ALWAYS pinned in top right corner) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Modal Subtabs (Interactive Canvas vs TSX) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 36,
                    boxSizing: 'border-box',
                    background: 'var(--color-bg-surface)',
                    padding: 3,
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('tsx')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    React (TSX)
                  </button>
                </div>

                {/* Real App in New Tab + Close */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={(e) => handleOpenRealAppNewTab(selectedVariant, e)}
                    title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 36,
                      boxSizing: 'border-box',
                      gap: 6,
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(223, 126, 48, 0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>{isId ? 'Buka di Tab Baru (Real App)' : 'Open in New Tab (Real App)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      height: 36,
                      width: 36,
                      boxSizing: 'border-box',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      padding: 0,
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 24, overflowY: 'auto', flex: 1, background: 'var(--color-bg-canvas)' }}>
              {modalTab === 'preview' && (
                <div>{renderLiveDataGridPreview(selectedVariant)}</div>
              )}

              {modalTab === 'tsx' && (
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => copyCode(`// Neudela Design System - Data Grid Pattern: ${currentMeta.nameEn}\n// Variant ID: ${currentMeta.id}\nimport { NeuronTable, NeuronBadge, NeuronButton } from '@neudela/neuron';\n\nexport default function ${currentMeta.id.replace(/-([a-z])/g, g => g[1].toUpperCase())}Grid() {\n  return (\n    <div className="data-grid-container">\n      {/* Pattern Implementation */}\n    </div>\n  );\n}`)}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      zIndex: 10,
                    }}
                  >
                    {copiedCodeTab ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copiedCodeTab ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <pre style={{
                    margin: 0,
                    padding: 20,
                    borderRadius: 8,
                    background: '#0f172a',
                    color: '#e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '12.5px',
                    lineHeight: 1.6,
                    overflowX: 'auto',
                  }}>
{`// ─────────────────────────────────────────────────────────────────────────────
// Neudela Pattern: ${currentMeta.nameEn}
// Pattern Module: Data Management & Data Grid
// Key Components: NeuronTable, NeuronBadge, NeuronButton, NeuronSelect, NeuronProgress
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { NeuronBadge, NeuronButton, NeuronProgress, NeuronInput } from '@neudela/neuron';

export function ${currentMeta.id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}DataGrid() {
  // Production-grade state management, query parameters & live interactions
  const [data, setData] = useState([...]);
  const [selectedIds, setSelectedIds] = useState(new Set());

  return (
    <div className="neudela-data-grid-shell">
      {/* 1. Integrated Search & Filter Controls */}
      {/* 2. High-Density Tabular Surface with Sticky Header */}
      {/* 3. Realtime Status Badges & Responsive Inspector */}
    </div>
  );
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{
          id: 'pat-layouts',
          label: isId ? 'Dashboards' : 'Dashboards',
        }}
        next={{
          id: 'pat-auth',
          label: isId ? 'Autentikasi & Akun' : 'Authentication & Identity',
        }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
