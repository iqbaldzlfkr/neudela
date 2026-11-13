import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronSelect from '../../components/NeuronSelect';
import {
  FileQuestion,
  Search,
  Plus,
  RefreshCw,
  CheckCircle2,
  Circle,
  ExternalLink,
  X,
  Copy,
  Check,
  Eye,
  ShieldAlert,
  Lock,
  ServerCrash,
  Compass,
  Home,
  HelpCircle,
  Send,
  Terminal,
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Cpu,
  Database,
  Shield,
  ArrowRight,
  Play,
} from 'lucide-react';

export type EmptyStateVariantId =
  | 'zero-data-search'
  | 'onboarding-checklist'
  | 'error-404'
  | 'error-403'
  | 'error-500';

export interface EmptyStateVariantMeta {
  id: EmptyStateVariantId;
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

export const EMPTY_STATE_VARIANTS: EmptyStateVariantMeta[] = [
  {
    id: 'zero-data-search',
    nameEn: 'Zero Data State & Filter No Results',
    nameId: 'Data Kosong & Pencarian Nihil',
    taglineEn: 'Contextual feedback for empty databases and search failures with 1-click starter blueprints.',
    taglineId: 'Umpan balik kontekstual saat tabel kosong atau filter pencarian tidak menemukan data dengan blueprint siap pakai.',
    descEn: 'Cloud-workload caliber zero data architecture: Clean visual states for unpopulated Kubernetes clusters and filtered search failures, featuring quick search resets, 1-click starter template cloning, copyable CLI deployment commands, and populated workload telemetry.',
    descId: 'Arsitektur data kosong berstandar cloud enterprise: Tampilan visual modern untuk kluster workload yang belum diisi dan kegagalan pencarian filter, dilengkapi tombol reset instan, kloning template microservice siap pakai, perintah CLI deploy, dan telemetri pod terisi.',
    tags: ['Empty Workloads', 'Search No Results', 'Starter Blueprints', 'Filter Reset', 'CLI Deployment'],
    bestForEn: 'Cloud Workloads, Microservice Clusters, Data Grids, Task Boards, Inventory Catalogs',
    bestForId: 'Kluster Microservice, Tabel Data Grid, Manajemen Tugas Sprint, Katalog Inventaris, Halaman Pencarian',
    badge: 'Discovery & Tables',
    accentColor: '#df7e30',
  },
  {
    id: 'onboarding-checklist',
    nameEn: 'Interactive Onboarding Checklist & Welcome Tour',
    nameId: 'Checklist Onboarding & Panduan Pengguna Baru',
    taglineEn: 'Enterprise onboarding suite with progress tracking, simulated payments, and milestone feedback.',
    taglineId: 'Panduan onboarding enterprise dengan pemantauan progres, simulasi transaksi webhook, dan umpan balik penyelesaian.',
    descEn: 'Drive rapid product activation: Interactive multi-step setup card tracking setup milestones (workspace, team RBAC, API credentials, simulated live payment webhooks, custom SSL domain) with real-time percentage progress and dedicated account manager scheduling.',
    descId: 'Mendorong pengguna baru mencapai nilai produk dengan cepat: Kartu panduan interaktif dengan persentase progres real-time, 5 tonggak persiapan kritis, simulasi event webhook transaksi langsung, verifikasi DNS SSL, dan integrasi jadwal sesi onboarding 1-on-1.',
    tags: ['Enterprise Activation', 'Milestone Checklist', 'Progress Bar', 'Simulated Webhooks', '1-on-1 Demo'],
    bestForEn: 'FinTech Portals, SaaS First-Run, Workspace Creation, Regulatory Compliance Setup',
    bestForId: 'Portal FinTech, Pengguna Baru SaaS, Pembuatan Workspace Enterprise, Kepatuhan Regulasi',
    badge: 'User Activation',
    accentColor: '#3b82f6',
  },
  {
    id: 'error-404',
    nameEn: '404 Not Found & Resource Relocation',
    nameId: 'Halaman 404 & Sumber Daya Tidak Ditemukan',
    taglineEn: 'Humanized page-not-found layout with breadcrumb trail, smart suggestions, and instant search.',
    taglineId: 'Tata letak halaman tidak ditemukan yang ramah pengguna dengan jejak breadcrumb, rekomendasi cerdas, dan pencarian cepat.',
    descEn: 'High-empathy error recovery: Large typographic 404 layout with floating compass graphics, target path diagnostics, embedded alternative search bar, and shortcuts to Dashboard and Help Center.',
    descId: 'Pemulihan kesalahan yang bersahabat: Tipografi 404 modern dengan grafis kompas dan tautan terputus, diagnostik URL yang dituju, kolom pencarian cepat, serta pintasan kembali ke Dashboard dan Pusat Bantuan.',
    tags: ['HTTP 404', 'Broken Link Recovery', 'Smart Suggestions', 'Path Diagnostics', 'Helpful Navigation'],
    bestForEn: 'Deleted Invoices, Expired Links, Route Typos, Migrated Endpoints, Public Portals',
    bestForId: 'Faktur Terhapus, Tautan Kedaluwarsa, Typo URL, Endpoint yang Dipindahkan, Portal Publik',
    badge: 'Client Error',
    accentColor: '#8b5cf6',
  },
  {
    id: 'error-403',
    nameEn: '403 Forbidden & Access Permission Gate',
    nameId: 'Akses Ditolak & Pembatasan Izin RBAC (403)',
    taglineEn: 'Governance gate with user-vs-privilege comparison, supervisory routing, and access request form.',
    taglineId: 'Gerbang tata kelola izin dengan komparasi identitas vs izin, perutean supervisor, dan formulir pengajuan izin.',
    descEn: 'Security-conscious RBAC gate: Clearly informs users of their current role tier (Viewer), specifies required privileges (Administrator / Billing Manager), and includes an in-place access request workflow.',
    descId: 'Antarmuka gerbang keamanan hak akses: Menjelaskan peran aktif pengguna saat ini (misal: Viewer), merinci izin yang dibutuhkan, serta menyediakan formulir interaktif pengajuan izin ke admin dengan catatan alasan.',
    tags: ['HTTP 403', 'RBAC Permission Gate', 'Supervisor Routing', 'Role Comparison', 'Security Shield'],
    bestForEn: 'Financial Modules, Danger Zones, Audit Trails, Admin Portals, Multi-Seat Licenses',
    bestForId: 'Modul Keuangan, Zona Berbahaya, Log Audit SOC2, Portal Admin, Manajemen Lisensi Tim',
    badge: 'Permission Gate',
    accentColor: '#f59e0b',
  },
  {
    id: 'error-500',
    nameEn: '500 Internal Server Error & Service Recovery',
    nameId: 'Gangguan Server & Pemulihan Sistem (500/503)',
    taglineEn: 'SRE incident war room with live multi-step health ping simulator and microservice telemetry.',
    taglineId: 'Pusat penanganan insiden SRE dengan simulator pengujian koneksi bertingkat dan telemetri microservice.',
    descEn: 'Resilient enterprise outage handling: Displays incident tracking reference ID (#INC-9012-SYS), copyable debug stack trace, animated reconnection retrier, and verified public cloud uptime status.',
    descId: 'Penanganan gangguan server yang tangguh: Menampilkan kode insiden unik (#INC-9012-SYS), cuplikan jejak debug JSON yang dapat disalin developer, tombol coba ulang koneksi interaktif, dan tautan ke status cloud.',
    tags: ['HTTP 500 / 503', 'SRE War Room', 'Live Health Ping', 'Incident Timeline', 'Telemetry Matrix'],
    bestForEn: 'Database Timeouts, API Gateway Failures, Unhandled Exceptions, Infrastructure Maintenance',
    bestForId: 'Batas Waktu Database, Kegagalan Gateway API, Eksepsi Server, Pemeliharaan Infrastruktur',
    badge: 'Server Health',
    accentColor: '#ef4444',
  },
];

// ─────────────────────────────────────────────
// Mini Architecture Silhouettes for Gallery Cards
// ─────────────────────────────────────────────
function EmptyStateMiniSilhouette({ id, isDarkMode }: { id: EmptyStateVariantId; isDarkMode: boolean }) {
  const bgSurface = isDarkMode ? '#1e293b' : '#ffffff';
  const border = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  switch (id) {
    case 'zero-data-search':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', gap: '8px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(223, 126, 48, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#df7e30' }}>
            <FileQuestion size={22} />
          </div>
          <div style={{ width: 120, height: 7, borderRadius: 4, background: '#df7e30', opacity: 0.8 }} />
          <div style={{ width: 180, height: 5, borderRadius: 3, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <div style={{ width: 64, height: 18, borderRadius: 4, background: '#df7e30', opacity: 0.9 }} />
            <div style={{ width: 54, height: 18, borderRadius: 4, background: 'var(--color-bg-canvas)', border: `1px solid ${border}` }} />
          </div>
        </div>
      );

    case 'onboarding-checklist':
      return (
        <div style={{ width: '100%', height: '100%', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 90, height: 6, borderRadius: 3, background: '#3b82f6' }} />
            <div style={{ width: 30, height: 5, borderRadius: 2, background: '#3b82f6', opacity: 0.6 }} />
          </div>
          <div style={{ width: '100%', height: 4, borderRadius: 2, background: 'rgba(59, 130, 246, 0.2)', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: '#3b82f6' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', borderRadius: 4, background: bgSurface, border: `1px solid ${border}` }}>
              <CheckCircle2 size={10} color="#10b981" />
              <div style={{ width: 110, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', borderRadius: 4, background: bgSurface, border: `1px solid ${border}` }}>
              <CheckCircle2 size={10} color="#10b981" />
              <div style={{ width: 95, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', borderRadius: 4, background: bgSurface, border: `1px solid #3b82f6` }}>
              <Circle size={10} color="#3b82f6" />
              <div style={{ width: 120, height: 4, borderRadius: 2, background: '#3b82f6' }} />
            </div>
          </div>
        </div>
      );

    case 'error-404':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px', gap: '6px' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em', color: '#8b5cf6', lineHeight: 1 }}>
            404
          </div>
          <div style={{ width: 130, height: 6, borderRadius: 3, background: 'var(--color-text-primary)', opacity: 0.8 }} />
          <div style={{ width: 160, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
          <div style={{ width: 140, height: 16, borderRadius: 12, background: 'var(--color-bg-canvas)', border: `1px solid ${border}`, marginTop: 4, display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
            <Search size={8} color="#8b5cf6" />
            <div style={{ width: 60, height: 3, borderRadius: 1.5, background: 'var(--color-text-tertiary)' }} />
          </div>
        </div>
      );

    case 'error-403':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px', gap: '6px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <Lock size={18} />
          </div>
          <div style={{ width: 120, height: 6, borderRadius: 3, background: '#f59e0b' }} />
          <div style={{ width: 170, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
          <div style={{ width: 110, height: 18, borderRadius: 6, background: '#f59e0b', opacity: 0.9, marginTop: 4 }} />
        </div>
      );

    case 'error-500':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px', gap: '6px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <ServerCrash size={20} />
          </div>
          <div style={{ width: 110, height: 6, borderRadius: 3, background: '#ef4444' }} />
          <div style={{ width: 150, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 70, height: 4, borderRadius: 2, background: 'var(--color-text-tertiary)' }} />
          </div>
        </div>
      );
  }
}

// ─────────────────────────────────────────────
// Variant 1: Zero Data State & Filter No Results
// ─────────────────────────────────────────────
interface WorkloadPod {
  id: string;
  name: string;
  namespace: 'production' | 'staging' | 'canary';
  imageTag: string;
  pods: string;
  cpuUsage: number;
  memoryUsage: string;
  uptime: string;
  latency: string;
  status: 'Running' | 'Pending' | 'Degraded';
}

const SAMPLE_WORKLOADS: WorkloadPod[] = [
  { id: 'srv-01', name: 'payment-gateway-grpc', namespace: 'production', imageTag: 'v2.8.4', pods: '4/4', cpuUsage: 34, memoryUsage: '1.2 GB / 4 GB', uptime: '99.98%', latency: '14ms', status: 'Running' },
  { id: 'srv-02', name: 'order-dispatch-worker', namespace: 'production', imageTag: 'v1.12.0', pods: '6/6', cpuUsage: 62, memoryUsage: '2.8 GB / 8 GB', uptime: '99.95%', latency: '28ms', status: 'Running' },
  { id: 'srv-03', name: 'customer-auth-oidc', namespace: 'canary', imageTag: 'v3.0.0-rc2', pods: '2/2', cpuUsage: 18, memoryUsage: '820 MB / 2 GB', uptime: '100%', latency: '9ms', status: 'Running' },
];

function ZeroDataSearchPreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [mode, setMode] = useState<'empty' | 'no-search' | 'populated'>('empty');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNamespace, setSelectedNamespace] = useState('ALL');
  const [workloads, setWorkloads] = useState<WorkloadPod[]>([]);
  const [cliCopied, setCliCopied] = useState(false);

  useEffect(() => {
    if (mode === 'empty') {
      setWorkloads([]);
      setSearchQuery('');
    } else if (mode === 'no-search') {
      setWorkloads(SAMPLE_WORKLOADS);
      setSearchQuery('elastic-search-cluster');
    } else {
      setWorkloads(SAMPLE_WORKLOADS);
      setSearchQuery('');
    }
  }, [mode]);

  const filteredWorkloads = workloads.filter((w) => {
    const matchQuery =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.imageTag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchNs = selectedNamespace === 'ALL' || w.namespace === selectedNamespace;
    return matchQuery && matchNs;
  });

  const handleDeployTemplate = (templateName: string, imageTag: string) => {
    const newPod: WorkloadPod = {
      id: `srv-${Math.floor(Math.random() * 900) + 100}`,
      name: templateName,
      namespace: 'production',
      imageTag,
      pods: '2/2',
      cpuUsage: Math.floor(Math.random() * 30) + 15,
      memoryUsage: '940 MB / 2 GB',
      uptime: '100%',
      latency: `${Math.floor(Math.random() * 15) + 8}ms`,
      status: 'Running',
    };
    setWorkloads([newPod, ...workloads]);
    setMode('populated');
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedNamespace('ALL');
    setWorkloads(SAMPLE_WORKLOADS);
    setMode('populated');
  };

  const cliCommand = 'curl -fsSL https://get.neudela.dev/cli | bash && neudela deploy --cluster prod-jkt-01 --namespace production';

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCliCopied(true);
    setTimeout(() => setCliCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1020px', margin: '0 auto' }}>
      {/* ── State Switcher & Simulation Toolbar ── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'var(--color-bg-canvas)',
          padding: '12px 18px',
          borderRadius: '14px',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            {isId ? 'Simulasi Status Tampilan:' : 'Live State Simulator:'}
          </span>
          <div style={{ display: 'flex', background: 'var(--color-bg-surface)', padding: 3, borderRadius: 8, border: '1px solid var(--color-border)', gap: 3 }}>
            <button
              type="button"
              onClick={() => setMode('empty')}
              style={{
                border: 'none',
                background: mode === 'empty' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'empty' ? '#ffffff' : 'var(--color-text-secondary)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {isId ? 'Kluster Kosong (Zero Data)' : 'Zero Data'}
            </button>
            <button
              type="button"
              onClick={() => setMode('no-search')}
              style={{
                border: 'none',
                background: mode === 'no-search' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'no-search' ? '#ffffff' : 'var(--color-text-secondary)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {isId ? 'Pencarian Nihil (No Results)' : 'Search No Results'}
            </button>
            <button
              type="button"
              onClick={() => setMode('populated')}
              style={{
                border: 'none',
                background: mode === 'populated' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'populated' ? '#ffffff' : 'var(--color-text-secondary)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {isId ? 'Workload Terisi (Populated)' : 'Populated Cluster'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NeuronButton
            size="xs"
            variant="secondary"
            leadingIcon={<Plus size={13} />}
            onClick={() => handleDeployTemplate('auth-proxy-service', 'v1.4.0')}
          >
            {isId ? '+ Deploy Pod Sampel' : '+ Deploy Sample Pod'}
          </NeuronButton>
        </div>
      </div>

      {/* ── Enterprise Real-Case Header Card & Metrics Ribbon ── */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Cluster Status Top Strip */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            background: 'var(--color-bg-canvas)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(223, 126, 48, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#df7e30' }}>
              <Cpu size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Manajemen Workload & Kluster Microservice' : 'Cloud Workloads & Microservice Clusters'}
                </h3>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  ap-southeast-3 (Jakarta)
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {isId
                  ? 'Kluster Kubernetes produksi `k8s-prod-apac-01`. Pantau alokasi pod, konsumsi CPU, dan latensi gateway.'
                  : 'Kubernetes cluster `k8s-prod-apac-01`. Monitor pod allocations, memory ceilings, and edge ingress latencies.'}
              </p>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ padding: '6px 12px', borderRadius: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontSize: '11.5px', display: 'flex', gap: 6 }}>
              <span style={{ color: 'var(--color-text-tertiary)' }}>Deployments:</span>
              <strong style={{ color: 'var(--color-text-primary)' }}>{filteredWorkloads.length} / 12</strong>
            </div>
            <div style={{ padding: '6px 12px', borderRadius: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontSize: '11.5px', display: 'flex', gap: 6 }}>
              <span style={{ color: 'var(--color-text-tertiary)' }}>Uptime 30d:</span>
              <strong style={{ color: '#10b981' }}>99.98%</strong>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', maxWidth: '420px' }}>
            <div style={{ flex: 1 }}>
              <NeuronInput
                size="sm"
                placeholder={isId ? 'Cari nama pod microservice...' : 'Search microservice name or tag...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leadingIcon={<Search size={14} />}
              />
            </div>
            <div style={{ width: '130px' }}>
              <NeuronSelect
                size="sm"
                value={selectedNamespace}
                onChange={(val) => setSelectedNamespace(val as string)}
                options={[
                  { value: 'ALL', label: 'All Namespaces' },
                  { value: 'production', label: 'production' },
                  { value: 'staging', label: 'staging' },
                  { value: 'canary', label: 'canary' },
                ]}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <NeuronButton
              size="sm"
              variant="primary"
              leadingIcon={<Plus size={13} />}
              onClick={() => handleDeployTemplate('payment-gateway-grpc', 'v2.8.4')}
            >
              {isId ? 'Deploy Container' : 'Deploy Container'}
            </NeuronButton>
          </div>
        </div>

        {/* ── Content View ── */}
        {mode === 'empty' || (mode !== 'no-search' && workloads.length === 0) ? (
          /* ── 1. REAL-CASE ZERO DATA STATE ── */
          <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Customized Layered SVG Illustration with Glow */}
            <div style={{ position: 'relative', width: 90, height: 90, marginBottom: 20 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(223, 126, 48, 0.25) 0%, rgba(223, 126, 48, 0) 70%)',
                  animation: 'pulseGlow 2.5s infinite ease-in-out',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed rgba(223, 126, 48, 0.5)',
                  boxShadow: '0 8px 30px rgba(223, 126, 48, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#df7e30',
                }}
              >
                <Database size={42} strokeWidth={1.6} />
              </div>
            </div>

            <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Belum Ada Microservice yang Di-deploy' : 'No Microservice Deployments Running'}
            </h4>
            <p style={{ margin: '0 auto 24px auto', maxWidth: '480px', fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
              {isId
                ? 'Kluster `k8s-prod-apac-01` telah siap menerima trafik produksi. Mulai dengan meng-clone salah satu blueprint cloud-native terverifikasi di bawah ini atau jalankan deployment via CLI.'
                : 'Cluster `k8s-prod-apac-01` is provisioned and awaiting workloads. Deploy your first service using the certified starter blueprints below, or trigger container rollout via CLI.'}
            </p>

            {/* 3 Clickable Cloud Blueprint Cards */}
            <div style={{ width: '100%', maxWidth: '820px', marginBottom: '28px', textAlign: 'left' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '10px' }}>
                {isId ? 'Blueprint Produksi Siap Pakai (1-Klik Deploy):' : 'Pre-Engineered Starter Blueprints (1-Click Deploy):'}
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {[
                  { name: 'fastapi-auth-proxy', tag: 'v2.1.0', stack: 'Python 3.12 · Redis · Edge TLS', desc: isId ? 'Gateway autentikasi OIDC token JWT performa tinggi' : 'High-throughput JWT verification edge gateway' },
                  { name: 'nextjs-enterprise-portal', tag: 'v15.0.2', stack: 'Node.js 22 · React 19 · SSR', desc: isId ? 'Antarmuka web portal dengan streaming server-side' : 'Modern web console with streaming SSR hydration' },
                  { name: 'golang-payment-worker', tag: 'v1.8.4', stack: 'Go 1.23 · Kafka · Postgres HA', desc: isId ? 'Pemroses transaksi idempotent dengan antrean zero-loss' : 'Idempotent transaction ledger worker with zero loss' },
                ].map((bp, i) => (
                  <div
                    key={i}
                    onClick={() => handleDeployTemplate(bp.name, bp.tag)}
                    style={{
                      background: 'var(--color-bg-canvas)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#df7e30';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{bp.name}</strong>
                      <span style={{ fontSize: '10.5px', fontFamily: 'monospace', padding: '1px 6px', borderRadius: '4px', background: 'rgba(223, 126, 48, 0.15)', color: '#df7e30' }}>
                        {bp.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{bp.desc}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{bp.stack}</span>
                      <span style={{ color: '#df7e30', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                        Deploy <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer CLI Terminal Snippet */}
            <div
              style={{
                width: '100%',
                maxWidth: '820px',
                borderRadius: '12px',
                background: '#0d1322',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f8fafc',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                fontSize: '12px',
                fontFamily: 'monospace',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                <Terminal size={15} color="#df7e30" style={{ flexShrink: 0 }} />
                <span style={{ color: '#94a3b8' }}>$</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cliCommand}</span>
              </div>
              <NeuronButton
                size="xs"
                variant="secondary"
                leadingIcon={cliCopied ? <Check size={12} /> : <Copy size={12} />}
                onClick={handleCopyCli}
                style={{ color: '#fff', background: 'rgba(255,255,255,0.12)', border: 'none', flexShrink: 0 }}
              >
                {cliCopied ? (isId ? 'Tersalin' : 'Copied') : (isId ? 'Salin CLI' : 'Copy CLI')}
              </NeuronButton>
            </div>
          </div>
        ) : filteredWorkloads.length === 0 ? (
          /* ── 2. REAL-CASE SEARCH NO RESULTS STATE (With Radar Animation) ── */
          <div style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 72, height: 72, marginBottom: 16 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(223, 126, 48, 0.4)',
                  animation: 'radarPing 1.8s infinite cubic-bezier(0, 0.2, 0.8, 1)',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Search size={28} />
              </div>
            </div>

            <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Tidak Ditemukan Workload yang Cocok' : 'No Matching Pod Deployments Found'}
            </h4>
            <p style={{ margin: '0 auto 16px auto', maxWidth: '440px', fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
              {isId ? (
                <>
                  Pencarian untuk kueri <strong style={{ color: 'var(--color-primary)' }}>"{searchQuery}"</strong> pada namespace <strong>`{selectedNamespace}`</strong> tidak menghasilkan pod aktif.
                </>
              ) : (
                <>
                  No active workloads matched query <strong style={{ color: 'var(--color-primary)' }}>"{searchQuery}"</strong> inside namespace <strong>`{selectedNamespace}`</strong>.
                </>
              )}
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <NeuronButton size="sm" variant="secondary" leadingIcon={<RefreshCw size={13} />} onClick={handleResetFilters}>
                {isId ? 'Reset Kueri & Tampilkan Semua Pod' : 'Reset Filters & Show All Pods'}
              </NeuronButton>
            </div>
          </div>
        ) : (
          /* ── 3. POPULATED HIGH-DENSITY CLUSTER TABLE ── */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg-canvas)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: 700 }}>
                  <th style={{ padding: '12px 18px' }}>{isId ? 'Nama Microservice' : 'Service & Tag'}</th>
                  <th style={{ padding: '12px 18px' }}>Namespace</th>
                  <th style={{ padding: '12px 18px' }}>{isId ? 'Status Pod' : 'Pod Status'}</th>
                  <th style={{ padding: '12px 18px' }}>{isId ? 'Alokasi CPU & Memori' : 'Resource Allocation'}</th>
                  <th style={{ padding: '12px 18px' }}>Uptime & Latency</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right' }}>{isId ? 'Aksi Cepat' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkloads.map((pod) => (
                  <tr key={pod.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{pod.name}</div>
                      <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>tag: {pod.imageTag}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: pod.namespace === 'production' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: pod.namespace === 'production' ? '#3b82f6' : '#f59e0b' }}>
                        {pod.namespace}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#10b981' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.25)' }} />
                        <span>{pod.pods} Replicas</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginBottom: '3px' }}>{pod.memoryUsage}</div>
                      <div style={{ width: '100px', height: '4px', borderRadius: '2px', background: 'var(--color-border)', overflow: 'hidden' }}>
                        <div style={{ width: `${pod.cpuUsage}%`, height: '100%', background: pod.cpuUsage > 50 ? '#f59e0b' : '#3b82f6' }} />
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: '12px' }}>
                      <div style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{pod.uptime}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{pod.latency} avg</div>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <NeuronButton size="xs" variant="secondary" onClick={() => alert(`Triggering rollout restart for ${pod.name}`)}>
                        Restart
                      </NeuronButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Variant 2: Product Onboarding & First-Run Wizard
// ─────────────────────────────────────────────
interface OnboardingStep {
  id: string;
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
  actionEn: string;
  actionId: string;
  completed: boolean;
  timeEst: string;
  badge: string;
}

const DEFAULT_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'profile',
    titleEn: 'Corporate Identity & AML Compliance Verification',
    titleId: 'Verifikasi Identitas Korporat & Kepatuhan Legal (AML/KYC)',
    descEn: 'Upload legal enterprise registry documents, tax ID (NPWP), and establish primary settlement jurisdiction.',
    descId: 'Unggah berkas akta pendirian, Nomor Pokok Wajib Pajak (NPWP), dan tentukan yurisdiksi penyelesaian utama.',
    actionEn: 'View Verification',
    actionId: 'Lihat Verifikasi',
    completed: true,
    timeEst: '2 mins',
    badge: 'Legal & KYC',
  },
  {
    id: 'team',
    titleEn: 'Invite Department Colleagues & Assign RBAC',
    titleId: 'Undang Anggota Tim & Tetapkan Peran RBAC',
    descEn: 'Provision department seats with strict role boundaries (Admin, SecOps, Finance Lead, Viewer).',
    descId: 'Kirim undangan akses tim dengan peran terperinci yang disesuaikan dengan tanggung jawab operasional.',
    actionEn: 'Manage Roster',
    actionId: 'Kelola Tim',
    completed: true,
    timeEst: '3 mins',
    badge: 'Governance',
  },
  {
    id: 'api-token',
    titleEn: 'Connect Production Payment Gateway & Webhook Endpoints',
    titleId: 'Hubungkan Gateway Pembayaran & Webhook Event',
    descEn: 'Wire bank virtual accounts, QRIS static/dynamic APIs, and register live transactional webhook endpoints.',
    descId: 'Hubungkan akun virtual bank, QRIS dinamis, dan daftarkan endpoint webhook penerima event transaksi.',
    actionEn: 'Inspect Keys',
    actionId: 'Periksa Kunci',
    completed: true,
    timeEst: '2 mins',
    badge: 'FinTech Rails',
  },
  {
    id: 'first-workflow',
    titleEn: 'Simulate First Checkout Payment & Webhook Ping',
    titleId: 'Jalankan Simulasi Transaksi Pembayaran & Webhook',
    descEn: 'Execute a sandboxed payment intent to verify automated event emission and balance ledger booking.',
    descId: 'Jalankan simulasi pembayaran sandbox untuk menguji emisi event webhook dan pembukuan saldo transaksi.',
    actionEn: 'Simulate Now',
    actionId: 'Simulasikan Sekarang',
    completed: false,
    timeEst: '4 mins',
    badge: 'Live Transaction',
  },
  {
    id: 'custom-domain',
    titleEn: 'Verify Custom SSL Domain & DNS Propagation',
    titleId: 'Pemetaan Domain Kustom & Sertifikat TLS',
    descEn: 'Route CNAME `app.perusahaan.com` to Neudela Edge Ingress and provision automated Let’s Encrypt certs.',
    descId: 'Arahkan rekaman CNAME domain perusahaan ke Neudela Edge Ingress dan terbitkan sertifikat TLS otomatis.',
    actionEn: 'Verify DNS',
    actionId: 'Verifikasi DNS',
    completed: false,
    timeEst: '5 mins',
    badge: 'Security & DNS',
  },
];

function OnboardingChecklistPreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [steps, setSteps] = useState<OnboardingStep[]>(DEFAULT_ONBOARDING_STEPS);
  const [activeStepId, setActiveStepId] = useState<string>('first-workflow');
  const [isSimulatingTx, setIsSimulatingTx] = useState(false);
  const [txPayload, setTxPayload] = useState<string | null>(null);

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const handleToggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === stepId) {
          return { ...s, completed: !s.completed };
        }
        return s;
      })
    );
  };

  const handleTriggerSimulatedPayment = () => {
    setIsSimulatingTx(true);
    setTimeout(() => {
      const mockPayload = JSON.stringify(
        {
          event: 'payment.settled',
          id: `evt_${Date.now()}`,
          created: new Date().toISOString(),
          data: {
            transaction_id: 'TRX-ID-992140',
            amount: 15000000,
            currency: 'IDR',
            payment_method: 'BCA_VIRTUAL_ACCOUNT',
            customer: { name: 'PT Nusantara Sentosa', email: 'finance@nusantara.co.id' },
            status: 'SETTLED',
            clearing_bank: 'Bank Central Asia',
          },
        },
        null,
        2
      );
      setTxPayload(mockPayload);
      setIsSimulatingTx(false);

      // Auto complete step 4
      setSteps((prev) =>
        prev.map((s) => (s.id === 'first-workflow' ? { ...s, completed: true } : s))
      );
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '980px', margin: '0 auto' }}>
      {/* ── Welcome Header Card with Real-Case Metrics ── */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                Acme Corporation Global
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>•</span>
              <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>ID: `org_acme_889102`</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)' }}>
                14 Hari Tersisa di Trial Enterprise
              </span>
            </div>
            <h2 style={{ margin: '4px 0 6px 0', fontSize: '22px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Panduan Aktivasi Ruang Kerja Produksi 🚀' : 'Production Enterprise Workspace Activation 🚀'}
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '620px', lineHeight: 1.5 }}>
              {isId
                ? 'Selesaikan 5 langkah aktivasi fondasi ini untuk mengaktifkan pemrosesan transaksi real-time, mengonfigurasi sertifikat SSL kustom, dan menjamin kepatuhan SOC2 Type II.'
                : 'Complete these 5 mission-critical activation milestones to enable real-time transactional clearing, map verified SSL domains, and ensure SOC2 compliance.'}
            </p>
          </div>

          <div
            style={{
              padding: '14px 20px',
              borderRadius: '14px',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '130px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              {isId ? 'Kesiapan Sistem' : 'Readiness'}
            </span>
            <div style={{ fontSize: '28px', fontWeight: 900, color: progressPercent === 100 ? '#10b981' : '#3b82f6', margin: '2px 0' }}>
              {progressPercent}%
            </div>
            <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
              {completedCount} {isId ? 'dari' : 'of'} {steps.length} {isId ? 'Selesai' : 'Done'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--color-border)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: progressPercent === 100 ? '#10b981' : 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)',
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* ── Two-Column Architecture: Left Checklist + Right Assistant Deck ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'flex-start' }}>
        {/* Left Column: 5 Milestone Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: '1.6' }}>
          {steps.map((step, idx) => {
            const isCurrentExpanded = activeStepId === step.id;

            return (
              <div
                key={step.id}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: isCurrentExpanded ? '1px solid #3b82f6' : '1px solid var(--color-border)',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  transition: 'all 0.2s ease',
                  boxShadow: isCurrentExpanded ? '0 4px 16px rgba(59, 130, 246, 0.08)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <button
                      type="button"
                      onClick={() => handleToggleStep(step.id)}
                      title={step.completed ? 'Mark incomplete' : 'Mark complete'}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: step.completed ? 'none' : '2px solid var(--color-border)',
                        background: step.completed ? '#10b981' : 'transparent',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      {step.completed ? <Check size={15} strokeWidth={3} /> : <span style={{ fontSize: '11.5px', fontWeight: 800, color: 'var(--color-text-secondary)' }}>{idx + 1}</span>}
                    </button>

                    <div style={{ minWidth: 0, cursor: 'pointer' }} onClick={() => setActiveStepId(isCurrentExpanded ? '' : step.id)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: step.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                            textDecoration: step.completed ? 'line-through' : 'none',
                          }}
                        >
                          {isId ? step.titleId : step.titleEn}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                          {step.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {isId ? step.descId : step.descEn}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <NeuronButton
                      size="xs"
                      variant={step.completed ? 'secondary' : 'primary'}
                      onClick={() => {
                        if (step.id === 'first-workflow' && !step.completed) {
                          setActiveStepId('first-workflow');
                        } else {
                          handleToggleStep(step.id);
                        }
                      }}
                    >
                      {step.completed ? (isId ? 'Selesai ✓' : 'Done ✓') : (isId ? step.actionId : step.actionEn)}
                    </NeuronButton>

                    <button
                      type="button"
                      onClick={() => setActiveStepId(isCurrentExpanded ? '' : step.id)}
                      style={{ border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 4, display: 'flex' }}
                    >
                      {isCurrentExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Interactive Area */}
                {isCurrentExpanded && (
                  <div
                    style={{
                      marginTop: '14px',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--color-border)',
                      fontSize: '12.5px',
                      background: 'var(--color-bg-canvas)',
                      padding: '14px 18px',
                      borderRadius: '10px',
                    }}
                  >
                    {step.id === 'first-workflow' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Simulasi Event Webhook Transaksi Sandbox:' : 'Sandboxed Transaction Webhook Ping:'}
                          </span>
                          <NeuronButton
                            size="xs"
                            variant="primary"
                            leadingIcon={<Play size={11} />}
                            disabled={isSimulatingTx}
                            onClick={handleTriggerSimulatedPayment}
                          >
                            {isSimulatingTx
                              ? (isId ? 'Mengirim Event...' : 'Emitting Webhook...')
                              : (isId ? 'Jalankan Uji Transaksi' : 'Trigger Test Payment')}
                          </NeuronButton>
                        </div>

                        {txPayload && (
                          <div style={{ marginTop: '4px' }}>
                            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={13} />
                              <span>{isId ? 'Event Webhook Berhasil Diterima (HTTP 200 OK):' : 'Webhook Dispatched Successfully (HTTP 200 OK):'}</span>
                            </div>
                            <pre style={{ margin: 0, padding: 12, borderRadius: 8, background: '#0d1322', color: '#38bdf8', fontSize: '11px', fontFamily: 'monospace', lineHeight: 1.5, overflowX: 'auto' }}>
                              {txPayload}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {step.id === 'custom-domain' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Konfigurasi Rekaman DNS CNAME:' : 'DNS CNAME Records Mapping:'}
                        </span>
                        <div style={{ padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, fontFamily: 'monospace', fontSize: '11.5px', display: 'flex', justifyContent: 'space-between' }}>
                          <span>app.perusahaan.com</span>
                          <span style={{ color: '#3b82f6' }}>CNAME</span>
                          <span>ingress.neudela.cloud</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                          <NeuronButton size="xs" variant="primary" onClick={() => handleToggleStep('custom-domain')}>
                            {isId ? 'Verifikasi Propagasi DNS' : 'Verify DNS Propagation'}
                          </NeuronButton>
                        </div>
                      </div>
                    )}

                    {step.id !== 'first-workflow' && step.id !== 'custom-domain' && (
                      <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        {isId ? step.descId : step.descEn}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Customer Success Deck & Resources */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: '1' }}>
          {/* Account Manager Card */}
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>
              {isId ? 'Customer Success Partner' : 'Enterprise Success'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #df7e30 0%, #f59e0b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px' }}>
                SJ
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-primary)' }}>Sarah Jenkins</div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>VP of Customer Engineering</div>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '12px 0' }}>
              {isId
                ? 'Perlu bantuan dalam integrasi API gateway atau arsitektur multi-tenant? Jadwalkan panggilan teknis langsung.'
                : 'Need architectural guidance with API routing or compliance setup? Schedule a direct 1-on-1 walkthrough.'}
            </p>
            <NeuronButton size="sm" variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
              {isId ? 'Jadwalkan Sesi 1-on-1 (30 Menit)' : 'Schedule 1-on-1 Session (30m)'}
            </NeuronButton>
          </div>

          {/* Compliance & Security Badge */}
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '13px' }}>
              <Shield size={16} />
              <span>SOC2 Type II & ISO 27001 Certified</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '8px 0 0 0' }}>
              {isId
                ? 'Semua data transaksi dienkripsi dengan standar AES-256 dan diisolasi pada zona kedaulatan data Jakarta (AWS ap-southeast-3).'
                : 'All payload logs are protected with AES-256 encryption at rest and isolated strictly within the Jakarta cloud region.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Variant 3: HTTP 404 Page Not Found
// ─────────────────────────────────────────────
function Error404Preview({ onBackToDashboard }: { onBackToDashboard?: () => void }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [query, setQuery] = useState('');
  const [reportSent, setReportSent] = useState(false);

  const candidateLinks = [
    { title: 'INV-2026-90213-ID', client: 'Bank Mandiri Digital Services', status: 'PAID', date: '04 Nov 2026' },
    { title: 'INV-2026-90215-ID', client: 'Telkom Indonesia Cloud Infra', status: 'DRAFT', date: '05 Nov 2026' },
    { title: 'Laporan Rekonsiliasi Pajak Q4-2026', client: 'Astra International', status: 'FINAL', date: '01 Nov 2026' },
  ];

  const filteredCandidates = candidateLinks.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.client.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Main High-Impact 404 Diagnostic Window Card ── */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Diagnostic URL & Route Header Bar */}
        <div
          style={{
            padding: '12px 20px',
            background: 'var(--color-bg-canvas)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Icon Badge + Context Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b5cf6',
                flexShrink: 0,
              }}
            >
              <Compass size={14} strokeWidth={2} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Diagnostik URL' : 'URL Diagnostics'}
              </span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>·</span>
              <span>Dashboard</span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>/</span>
              <span>{isId ? 'Keuangan' : 'Finance'}</span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>/</span>
              <span style={{ color: '#8b5cf6', fontWeight: 600, fontFamily: 'monospace' }}>INV-2026-90214-ID</span>
            </div>
          </div>

          {/* Right: HTTP 404 Status Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'monospace',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(139, 92, 246, 0.12)',
                color: '#8b5cf6',
                border: '1px solid rgba(139, 92, 246, 0.25)',
              }}
            >
              HTTP 404 · NOT FOUND
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: '40px 32px 36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 404 Large Typographic Header */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '104px',
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              404
            </span>
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '-18px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--color-bg-surface)',
                border: '2px solid #8b5cf6',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b5cf6',
              }}
            >
              <Compass size={24} />
            </div>
          </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '20px',
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            color: '#8b5cf6',
            fontSize: '11.5px',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '0.01em',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#8b5cf6',
              display: 'inline-block',
              boxShadow: '0 0 6px #8b5cf6',
            }}
          />
          <span>HTTP 404 • Resource Relocated or Retention Expired</span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--color-text-primary)' }}>
          {isId ? 'Dokumen atau Halaman yang Anda Cari Tidak Ditemukan' : 'Requested Invoice Record Cannot Be Found'}
        </h2>
        <p style={{ margin: '0 auto 24px auto', maxWidth: '540px', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Nomor faktur `INV-2026-90214-ID` mungkin telah diarsipkan, dibatalkan oleh penerbit, atau alamat URL yang Anda tuju mengalami kesalahan ketik.'
            : 'The invoice reference `INV-2026-90214-ID` may have been archived under the 90-day retention policy, revoked by the issuer, or moved.'}
        </p>

        {/* Embedded Live Search Input */}
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto 28px auto' }}>
          <NeuronInput
            size="md"
            placeholder={isId ? 'Cari nomor faktur, nama klien, atau berkas lain...' : 'Search invoice ID, client name, or documents...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leadingIcon={<Search size={16} />}
          />
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
          <NeuronButton size="md" variant="primary" leadingIcon={<Home size={15} />} onClick={onBackToDashboard}>
            {isId ? 'Kembali ke Dashboard Utama' : 'Return to Dashboard'}
          </NeuronButton>
          <NeuronButton size="md" variant="secondary" leadingIcon={<HelpCircle size={15} />}>
            {isId ? 'Buka Pusat Bantuan' : 'Help & Documentation'}
          </NeuronButton>
          <NeuronButton
            size="md"
            variant="outline"
            leadingIcon={<Send size={15} />}
            onClick={() => {
              setReportSent(true);
              setTimeout(() => setReportSent(false), 2500);
            }}
          >
            {reportSent ? (isId ? 'Laporan Terkirim!' : 'Report Sent!') : (isId ? 'Laporkan Tautan Rusak' : 'Report Broken Link')}
          </NeuronButton>
        </div>

        {/* Smart Suggested Matches Grid */}
        <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto', textAlign: 'left' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '10px' }}>
            {isId ? 'Dokumen Serupa yang Baru Saja Diperbarui:' : 'Recent Matching Documents in This Workspace:'}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
            {filteredCandidates.map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--color-text-primary)' }}>{c.title}</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: 4, background: c.status === 'PAID' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)', color: c.status === 'PAID' ? '#10b981' : '#3b82f6' }}>
                    {c.status}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>{c.client}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

// ─────────────────────────────────────────────
// Variant 4: HTTP 403 Forbidden & Access Gate
// ─────────────────────────────────────────────
function Error403Preview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [requestedRole, setRequestedRole] = useState('Billing Specialist');
  const [approver, setApprover] = useState('sarah.j@acme.com');
  const [reason, setReason] = useState('');
  const [accessDuration, setAccessDuration] = useState<'24h' | 'permanent'>('24h');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

  const handleApplyPresetChip = (text: string) => {
    setReason((prev) => (prev ? `${prev} · ${text}` : text));
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── 403 Security Header ── */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* IAM Gateway Verification Header */}
        <div
          style={{
            padding: '12px 20px',
            background: 'var(--color-bg-canvas)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Icon Badge + Gateway Route */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706',
                flexShrink: 0,
              }}
            >
              <ShieldAlert size={14} strokeWidth={2} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Otorisasi IAM Gateway' : 'IAM Gateway Clearance'}
              </span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>·</span>
              <span style={{ fontFamily: 'monospace', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
                iam.neudela.dev/rbac/clearance-denied
              </span>
            </div>
          </div>

          {/* Right: HTTP 403 Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'monospace',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.12)',
                color: '#d97706',
                border: '1px solid rgba(245, 158, 11, 0.25)',
              }}
            >
              HTTP 403 · RESTRICTED
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b',
              flexShrink: 0,
            }}
          >
            <ShieldAlert size={36} strokeWidth={1.8} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#d97706',
                fontSize: '11.5px',
                fontWeight: 800,
                marginBottom: '10px',
                letterSpacing: '0.01em',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#f59e0b',
                  display: 'inline-block',
                  boxShadow: '0 0 6px rgba(245, 158, 11, 0.8)',
                  animation: 'pulseGlow 2s infinite ease-in-out',
                }}
              />
              <span>HTTP 403 • Restricted Permission Clearance Required</span>
            </div>

            <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Akses Dibatasi: Hak Otorisasi Tidak Mencukupi' : 'Access Restricted: Permission Required'}
            </h2>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
              {isId
                ? 'Akun Anda tidak memiliki hak otorisasi yang memadai untuk membuka modul Penagihan Enterprise, Pembayaran Treasury, dan Zona Berbahaya ini.'
                : 'Your current account credentials lack clearance to inspect Financial Billing, Treasury Payouts, and Danger Zone actions.'}
            </p>
          </div>
        </div>

        {/* ── User vs Required Clearance Dual Matrix ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '24px' }}>
          {/* Card Left: Current Identity */}
          <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
              {isId ? 'Identitas Pengguna Anda' : 'Your Current Identity'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                ID
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>iqbal.dzulfikar@neudela.design</div>
              </div>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Peran:</span>
              <strong style={{ color: '#3b82f6' }}>Viewer (Read-Only)</strong>
              <span style={{ color: '#10b981', fontWeight: 600 }}>• 2FA Aktif</span>
            </div>
          </div>

          {/* Card Right: Required Privilege */}
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
              {isId ? 'Persyaratan Izin Modul' : 'Required Privilege Level'}
            </span>
            <div style={{ marginTop: '8px', fontWeight: 700, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
              Billing Specialist / Administrator
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Scope: `billing:invoices:export` & `treasury:payouts`
            </div>
            <div style={{ marginTop: '10px', fontSize: '11px', color: '#d97706', fontWeight: 600 }}>
              Kebijakan Keamanan: IAM-POLICY-SEC-FIN-09 (SOC2)
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Access Escalation Form ── */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {isId ? 'Formulir Permohonan Izin Akses Instan' : 'Request Access Clearance from Supervisors'}
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Permohonan akan langsung dikirimkan ke supervisor terkait via Slack & Email untuk proses verifikasi bertingkat.'
            : 'Your request is forwarded via real-time Slack alert and authenticated email for approval.'}
        </p>

        {requestSubmitted ? (
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 800 }}>
              <CheckCircle size={18} />
              <span>{isId ? 'Permintaan Akses Berhasil Terkirim ke Supervisor!' : 'Access Request Submitted Successfully!'}</span>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Nomor tiket permintaan: #REQ-403-9182. Menunggu persetujuan Sarah Jenkins (Owner). Anda akan menerima notifikasi begitu izin disetujui.'
                : 'Escalation Ticket ID: #REQ-403-9182. Awaiting review from Sarah Jenkins. You will be paged via in-app alert upon approval.'}
            </p>
            <div style={{ marginTop: '10px' }}>
              <NeuronButton size="sm" variant="secondary" onClick={() => setRequestSubmitted(false)}>
                {isId ? 'Buat Permintaan Baru' : 'Submit Another Request'}
              </NeuronButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Peran yang Diminta' : 'Requested Role Clearance'}
                </label>
                <NeuronSelect
                  size="sm"
                  value={requestedRole}
                  onChange={(val) => setRequestedRole(val as string)}
                  options={[
                    { value: 'Billing Specialist', label: 'Billing Specialist' },
                    { value: 'Security Engineer', label: 'Security Engineer' },
                    { value: 'Workspace Administrator', label: 'Workspace Administrator' },
                  ]}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  {isId ? 'Supervisor Penyetuju' : 'Approving Supervisor'}
                </label>
                <NeuronSelect
                  size="sm"
                  value={approver}
                  onChange={(val) => setApprover(val as string)}
                  options={[
                    { value: 'sarah.j@acme.com', label: 'Sarah Jenkins (Owner & VP Engineering)' },
                    { value: 'rian.p@acme.com', label: 'Rian Pratama (Workspace Administrator)' },
                  ]}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                {isId ? 'Durasi Hak Akses' : 'Access Duration'}
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="duration"
                    checked={accessDuration === '24h'}
                    onChange={() => setAccessDuration('24h')}
                  />
                  <span>{isId ? 'Sementara (24 Jam untuk Kebutuhan Tertentu)' : 'Temporary Access (24 Hours)'}</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="duration"
                    checked={accessDuration === 'permanent'}
                    onChange={() => setAccessDuration('permanent')}
                  />
                  <span>{isId ? 'Permanen (Eskalasi Jabatan)' : 'Permanent Role Upgrade'}</span>
                </label>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Alasan Kebutuhan Bisnis' : 'Business Justification'}
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Audit Pajak Q4', 'Tutup Buku', 'Rekonsiliasi'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleApplyPresetChip(chip)}
                      style={{ border: 'none', background: 'var(--color-bg-canvas)', fontSize: '10.5px', padding: '2px 6px', borderRadius: 4, cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                    >
                      +{chip}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={isId ? 'Sebutkan alasan kebutuhan akses dan nomor tiket pekerjaan terkait...' : 'Specify why this module clearance is required and any relevant Jira ticket ID...'}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  color: 'var(--color-text-primary)',
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
              <NeuronButton type="submit" size="sm" variant="primary" leadingIcon={<Send size={13} />}>
                {isId ? 'Kirim Permohonan Akses ke Sarah Jenkins' : 'Submit Access Petition to Supervisor'}
              </NeuronButton>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Variant 5: HTTP 500 / 503 Server Outage
// ─────────────────────────────────────────────
function Error500Preview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [pingStage, setPingStage] = useState<'idle' | 'checking-gateway' | 'pinging-cache' | 'restoring-db' | 'restored'>('idle');
  const [showTrace, setShowTrace] = useState(false);
  const [copiedTrace, setCopiedTrace] = useState(false);

  const incidentCode = 'INC-2026-9021-SYS';
  const debugTrace = `[HTTP 500 Internal Server Error]
Timestamp: 2026-11-06T15:25:00.128Z
TraceId: 7f8a9b1c2d3e4f50-JKT-04
Cluster: ap-southeast-3 (Jakarta Edge Gateway #04)
Exception: PgConnectionPoolTimeoutException: Connection acquisition timed out after 30000ms
  at Pool.connect (/app/node_modules/pg-pool/index.js:78:12)
  at LedgerDatabase.queryBillingBatch (/app/services/billing.ts:142:19)
  at TransactionFlowController.handleDispatch (/app/controllers/checkout.ts:89:11)
Failover Replica: jkt-db-standby-03 synchronized at 99.4%`;

  const handleStartMultiPing = () => {
    setPingStage('checking-gateway');
    setTimeout(() => {
      setPingStage('pinging-cache');
      setTimeout(() => {
        setPingStage('restoring-db');
        setTimeout(() => {
          setPingStage('restored');
        }, 1200);
      }, 1000);
    }, 900);
  };

  const handleCopyTrace = () => {
    navigator.clipboard.writeText(debugTrace);
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ── Main 500 SRE War Room Card ── */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* SRE Incident Console Header */}
        <div
          style={{
            padding: '12px 20px',
            background: 'var(--color-bg-canvas)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Icon Badge + Cluster Host + Incident Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                flexShrink: 0,
              }}
            >
              <Activity size={14} strokeWidth={2} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Konsol Insiden SRE' : 'SRE Incident Console'}
              </span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>·</span>
              <span style={{ fontFamily: 'monospace', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
                cluster-db-primary.jkt
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ef4444',
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '1px 6px',
                  borderRadius: '4px',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', animation: 'pulseGlow 1.5s infinite ease-in-out' }} />
                SEV-1 FAILOVER
              </span>
            </div>
          </div>

          {/* Right: HTTP Status Code Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'monospace',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
              }}
            >
              HTTP 500 · CRITICAL
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: '40px 32px 36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Server Alert Graphic */}
          <div style={{ position: 'relative', width: '84px', height: '84px', marginBottom: '18px' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(239, 68, 68, 0) 70%)',
              animation: 'pulseGlow 2.4s infinite ease-in-out',
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1.5px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 12px 30px rgba(239, 68, 68, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
            }}
          >
            <ServerCrash size={42} strokeWidth={1.8} />
          </div>
        </div>

        {/* Severity Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '20px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#dc2626',
            fontSize: '11.5px',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '0.01em',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#ef4444',
              display: 'inline-block',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)',
              animation: 'pulseGlow 1.8s infinite ease-in-out',
            }}
          />
          <span>CRITICAL SEV-1 • Cluster Database Failover Engaged</span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--color-text-primary)' }}>
          {isId ? 'Layanan Mengalami Kendala Teknis Sementara' : 'System Encountered an Unexpected Outage'}
        </h2>
        <p style={{ margin: '0 auto 20px auto', maxWidth: '560px', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Infrastruktur database cluster `jkt-db-02` mengalami lonjakan latensi sesaat. Tim Site Reliability Engineering (SRE) telah menerima peringatan otomatis dan mitigasi failover replika cadangan sedang berlangsung.'
            : 'Our primary database cluster encountered a transient latency threshold spike. Site Reliability Engineers have been paged and automated standby failover mitigations are currently engaged.'}
        </p>

        {/* Incident Code Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '8px',
            background: 'var(--color-bg-canvas)',
            border: '1px solid var(--color-border)',
            fontSize: '12px',
            fontFamily: 'monospace',
            color: 'var(--color-text-secondary)',
            marginBottom: '24px',
          }}
        >
          <span>Incident Reference ID:</span>
          <strong style={{ color: '#ef4444' }}>{incidentCode}</strong>
        </div>

        {/* Interactive Multi-Step Reconnection Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
          <NeuronButton
            size="md"
            variant="primary"
            leadingIcon={<RefreshCw size={14} className={pingStage !== 'idle' && pingStage !== 'restored' ? 'spin-animation' : ''} />}
            onClick={handleStartMultiPing}
            disabled={pingStage !== 'idle' && pingStage !== 'restored'}
          >
            {pingStage === 'idle'
              ? (isId ? 'Uji & Sambungkan Kembali Sekarang' : 'Test & Reconnect Now')
              : pingStage === 'restored'
              ? (isId ? 'Uji Ulang Status' : 'Re-test Status')
              : (isId ? 'Memeriksa Kluster...' : 'Verifying Reconnection...')}
          </NeuronButton>

          <NeuronButton size="md" variant="secondary" leadingIcon={<Activity size={14} />}>
            {isId ? 'Status Layanan Publik (99.98%)' : 'Public Status Page (99.98%)'}
          </NeuronButton>

          <NeuronButton size="md" variant="outline" leadingIcon={<Terminal size={14} />} onClick={() => setShowTrace(!showTrace)}>
            {showTrace ? (isId ? 'Sembunyikan Trace' : 'Hide Trace') : (isId ? 'Lihat Trace Developer' : 'Developer Trace')}
          </NeuronButton>
        </div>

        {/* Multi-Step Ping Progress Card */}
        {pingStage !== 'idle' && (
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto 20px auto',
              padding: '16px',
              borderRadius: '12px',
              background: pingStage === 'restored' ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-bg-canvas)',
              border: `1px solid ${pingStage === 'restored' ? 'rgba(16, 185, 129, 0.3)' : 'var(--color-border)'}`,
              textAlign: 'left',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {pingStage !== 'checking-gateway' ? <CheckCircle2 size={14} color="#10b981" /> : <RefreshCw size={14} className="spin-animation" color="#3b82f6" />}
              <span>Gateway Edge Ingress (Jakarta Node 04): <strong>Online (2ms)</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {pingStage === 'pinging-cache' ? <RefreshCw size={14} className="spin-animation" color="#3b82f6" /> : (pingStage === 'restoring-db' || pingStage === 'restored') ? <CheckCircle2 size={14} color="#10b981" /> : <Circle size={14} color="var(--color-text-tertiary)" />}
              <span>Redis Distributed Cache Cluster: <strong>Healthy (4ms)</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {pingStage === 'restoring-db' ? <RefreshCw size={14} className="spin-animation" color="#3b82f6" /> : pingStage === 'restored' ? <CheckCircle2 size={14} color="#10b981" /> : <Circle size={14} color="var(--color-text-tertiary)" />}
              <span>Primary PostgreSQL Failover Replica: <strong>{pingStage === 'restored' ? 'Fully Synchronized (12ms) ✓' : 'Syncing standby-03...'}</strong></span>
            </div>

            {pingStage === 'restored' && (
              <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 700, textAlign: 'center' }}>
                {isId ? 'Semua Layanan Berhasil Dipulihkan! Silakan Muat Ulang Halaman.' : 'All Microservices Restored! System Operational.'}
              </div>
            )}
          </div>
        )}

        {/* Expandable Developer Trace Container */}
        {showTrace && (
          <div
            style={{
              textAlign: 'left',
              marginTop: '16px',
              borderRadius: '12px',
              background: '#0d1322',
              color: '#f8fafc',
              padding: '16px',
              fontSize: '11.5px',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8', fontWeight: 700 }}>Stack Diagnostics Trace</span>
              <NeuronButton
                size="xs"
                variant="secondary"
                leadingIcon={copiedTrace ? <Check size={12} /> : <Copy size={12} />}
                onClick={handleCopyTrace}
                style={{ color: '#fff', background: 'rgba(255,255,255,0.12)', border: 'none' }}
              >
                {copiedTrace ? (isId ? 'Tersalin' : 'Copied') : (isId ? 'Salin Trace' : 'Copy Trace')}
              </NeuronButton>
            </div>
            <pre style={{ margin: 0, overflowX: 'auto' }}>{debugTrace}</pre>
          </div>
        )}
        </div>
      </div>

      {/* Microservice Health Matrix Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
        {[
          { name: 'OIDC Identity & SSO', latency: '14ms', status: 'Operational', color: '#10b981' },
          { name: 'Payment Webhook Dispatcher', latency: '38ms', status: 'Operational', color: '#10b981' },
          { name: 'PostgreSQL Billing Cluster', latency: 'Failover', status: 'Recovering', color: '#f59e0b' },
          { name: 'S3 Document Archival', latency: '18ms', status: 'Operational', color: '#10b981' },
        ].map((svc, i) => (
          <div key={i} style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--color-text-primary)' }}>{svc.name}</span>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: svc.color }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              <span>{svc.status}</span>
              <span style={{ fontWeight: 600 }}>{svc.latency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Master Render Live Preview Helper
// ─────────────────────────────────────────────
export function renderLiveEmptyStatePreview(
  variantId: EmptyStateVariantId,
  _isDarkMode: boolean,
  setActiveTab?: (tab: string) => void
) {
  switch (variantId) {
    case 'zero-data-search':
      return <ZeroDataSearchPreview />;
    case 'onboarding-checklist':
      return <OnboardingChecklistPreview />;
    case 'error-404':
      return <Error404Preview onBackToDashboard={() => setActiveTab?.('overview')} />;
    case 'error-403':
      return <Error403Preview />;
    case 'error-500':
      return <Error500Preview />;
    default:
      return <ZeroDataSearchPreview />;
  }
}

// ─────────────────────────────────────────────
// TSX Code Snippets for Modal React Tab
// ─────────────────────────────────────────────
const EMPTY_STATE_SNIPPETS: Record<EmptyStateVariantId, string> = {
  'zero-data-search': `import React, { useState } from 'react';
import { NeuronButton, NeuronInput } from 'neudela';
import { Database, Search, Plus, RefreshCw, Terminal } from 'lucide-react';

export function ZeroDataWorkloadsState({ onDeployTemplate, onResetSearch, query }: {
  onDeployTemplate: (name: string, tag: string) => void;
  onResetSearch: () => void;
  query?: string;
}) {
  if (query) {
    return (
      <div className="neuron-empty-state neuron-empty-state--search">
        <div className="neuron-radar-icon">
          <Search size={32} />
        </div>
        <h4>No Matching Pod Deployments Found</h4>
        <p>No active workloads matched query <strong>"{query}"</strong>.</p>
        <NeuronButton variant="secondary" onClick={onResetSearch} leadingIcon={<RefreshCw size={14} />}>
          Reset Query & Show All Pods
        </NeuronButton>
      </div>
    );
  }

  return (
    <div className="neuron-empty-state neuron-empty-state--zero">
      <div className="neuron-empty-icon"><Database size={42} /></div>
      <h4>No Microservice Deployments Running</h4>
      <p>Cluster is provisioned and awaiting workloads. Deploy from starter blueprints below.</p>
      
      <div className="blueprint-grid">
        <button onClick={() => onDeployTemplate('fastapi-auth-proxy', 'v2.1.0')}>
          Deploy FastAPI Gateway (v2.1.0)
        </button>
        <button onClick={() => onDeployTemplate('nextjs-portal', 'v15.0.2')}>
          Deploy Next.js Portal (v15.0.2)
        </button>
      </div>
    </div>
  );
}`,

  'onboarding-checklist': `import React, { useState } from 'react';
import { NeuronButton } from 'neudela';
import { Check, Clock, ChevronDown, ChevronUp, Play } from 'lucide-react';

export function FinTechOnboardingChecklist({ steps, onTriggerSimulation }) {
  const completed = steps.filter(s => s.completed).length;
  const progress = Math.round((completed / steps.length) * 100);

  return (
    <div className="neuron-onboarding-deck">
      <div className="neuron-onboarding-hero">
        <h3>Production Enterprise Workspace Activation</h3>
        <span>{completed} of {steps.length} Milestones Done ({progress}%)</span>
        <div className="neuron-progress-bar">
          <div style={{ width: \`\${progress}%\` }} />
        </div>
      </div>
      
      <div className="onboarding-steps-container">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            <span>{step.title}</span>
            <NeuronButton size="xs" variant="primary" onClick={() => onTriggerSimulation(step.id)}>
              {step.action}
            </NeuronButton>
          </div>
        ))}
      </div>
    </div>
  );
}`,

  'error-404': `import React from 'react';
import { NeuronButton, NeuronInput } from 'neudela';
import { Compass, Home, Search, Send, HelpCircle } from 'lucide-react';

export function NotFound404Recovery({ onHome, onReportLink }) {
  return (
    <div className="neuron-error-page neuron-error-404">
      <div className="breadcrumb-path">Dashboard / Billing / Invoices / [INV-90214 ✕]</div>
      <div className="neuron-error-code">404</div>
      <h2>Requested Invoice Record Cannot Be Found</h2>
      <p>The record may have been moved under retention policy or contains a typo.</p>
      
      <NeuronInput placeholder="Search invoice ID or client..." leadingIcon={<Search size={16} />} />
      
      <div className="neuron-actions">
        <NeuronButton variant="primary" leadingIcon={<Home size={14} />} onClick={onHome}>
          Return to Dashboard
        </NeuronButton>
        <NeuronButton variant="tertiary" leadingIcon={<Send size={14} />} onClick={onReportLink}>
          Report Broken Link
        </NeuronButton>
      </div>
    </div>
  );
}`,

  'error-403': `import React, { useState } from 'react';
import { NeuronButton, NeuronSelect } from 'neudela';
import { ShieldAlert, Send } from 'lucide-react';

export function AccessForbidden403({ currentRole = 'Viewer', onRequestAccess }) {
  const [role, setRole] = useState('Billing Specialist');
  const [supervisor, setSupervisor] = useState('sarah.j@acme.com');
  const [reason, setReason] = useState('');

  return (
    <div className="neuron-forbidden-gate">
      <div className="neuron-gate-icon"><ShieldAlert size={36} /></div>
      <h2>Access Restricted: Permission Required</h2>
      
      <div className="matrix-comparison">
        <div className="current-identity">Your Role: <strong>{currentRole}</strong></div>
        <div className="required-clearance">Required: <strong>Billing Specialist / Admin</strong></div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onRequestAccess({ role, supervisor, reason }); }}>
        <NeuronSelect label="Requested Role" value={role} onChange={setRole} options={[...]} />
        <textarea placeholder="Business justification..." value={reason} onChange={e => setReason(e.target.value)} />
        <NeuronButton type="submit" variant="primary" leadingIcon={<Send size={14} />}>
          Submit Access Petition
        </NeuronButton>
      </form>
    </div>
  );
}`,

  'error-500': `import React, { useState } from 'react';
import { NeuronButton } from 'neudela';
import { ServerCrash, RefreshCw, Activity, Terminal } from 'lucide-react';

export function ServerError500SRE({ incidentId = 'INC-2026-9021-SYS', onMultiPing }) {
  const [testing, setTesting] = useState(false);

  return (
    <div className="neuron-outage-war-room">
      <div className="neuron-outage-icon"><ServerCrash size={38} /></div>
      <span className="severity-badge">SEV-1 • Cluster Database Failover Engaged</span>
      <h2>System Encountered an Unexpected Outage</h2>
      <div className="incident-id">Incident Reference: <strong>{incidentId}</strong></div>
      
      <NeuronButton
        variant="primary"
        leadingIcon={<RefreshCw size={14} className={testing ? 'spin' : ''} />}
        onClick={onMultiPing}
      >
        Test & Reconnect Now
      </NeuronButton>
    </div>
  );
}`,
};

// ─────────────────────────────────────────────
// Master Pattern View Component
// ─────────────────────────────────────────────
interface EmptyStatePatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export default function EmptyStatePatternView({
  setActiveTab,
  isDarkMode: isDarkProp = false,
}: EmptyStatePatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = isDarkProp;

  const [selectedVariant, setSelectedVariant] = useState<EmptyStateVariantId>('zero-data-search');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentMeta =
    EMPTY_STATE_VARIANTS.find((v) => v.id === selectedVariant) || EMPTY_STATE_VARIANTS[0];

  const handleOpenModal = (vId: EmptyStateVariantId) => {
    setSelectedVariant(vId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  const handleOpenNewTab = (vId: EmptyStateVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-empty-state-${vId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyTSX = () => {
    const code = EMPTY_STATE_SNIPPETS[selectedVariant] || '';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Keyboard Escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="pattern-empty-state-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header (100% Neudela Blueprint Parity) ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Status Data Kosong, Panduan Onboarding & Halaman Error' : 'Empty States, Onboarding & Error Pages'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur penanganan kondisi batas (edge cases) dan aktivasi pengguna enterprise: Umpan balik visual data kluster microservice kosong & pencarian nihil dengan template siap pakai, panduan aktivasi onboarding FinTech dengan simulasi transaksi webhook, pemulihan cerdas halaman 404 dengan saran dokumen relevan, gerbang otorisasi RBAC 403 dengan alur eskalasi supervisor, serta pusat mitigasi gangguan server 500 dengan telemetri SRE.'
            : 'Enterprise-grade edge-case handling and first-run user experience blueprints: Zero-data Kubernetes clusters & search failures with 1-click starter blueprints, activation onboarding milestones with live webhook payload simulations, high-empathy 404 broken link recovery with intelligent document matching, security-conscious 403 RBAC permission gates with supervisor routing, and resilient 500 system outage recovery with live health pings.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <FileQuestion size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>5 {isId ? 'Varian Pola' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Compass size={14} color="#3b82f6" />
            <span>{isId ? 'Cakupan Penanganan:' : 'Coverage Scope:'}</span>
            <strong style={{ color: '#3b82f6' }}>Workloads · Onboarding · 404 · 403 RBAC · SRE 500</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span>{isId ? 'Kesiapan Produksi:' : 'Production Standard:'}</span>
            <strong style={{ color: '#10b981' }}>WCAG 2.1 AA · High-Empathy Recovery</strong>
          </div>
        </div>
      </div>

      {/* ── Pattern Cards Gallery Grid (Exact Blueprint Parity) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginTop: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {EMPTY_STATE_VARIANTS.map((variant) => (
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
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3.5px',
                background: `linear-gradient(90deg, ${variant.accentColor} 0%, ${variant.accentColor}30 100%)`,
              }}
            />

            {/* Card Header & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: `${variant.accentColor}18`,
                  border: `1px solid ${variant.accentColor}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: variant.accentColor,
                  flexShrink: 0,
                }}
              >
                {variant.id === 'zero-data-search' && <FileQuestion size={20} />}
                {variant.id === 'onboarding-checklist' && <CheckCircle2 size={20} />}
                {variant.id === 'error-404' && <Compass size={20} />}
                {variant.id === 'error-403' && <Lock size={20} />}
                {variant.id === 'error-500' && <ServerCrash size={20} />}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  background: 'var(--color-bg-canvas)',
                  color: variant.accentColor,
                  border: `1px solid ${variant.accentColor}40`,
                }}
              >
                {variant.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  margin: '0 0 6px 0',
                  color: 'var(--color-text-primary)',
                }}
              >
                {isId ? variant.nameId : variant.nameEn}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {isId ? variant.taglineId : variant.taglineEn}
              </p>
            </div>

            {/* Visual Architecture Silhouette */}
            <div style={{ margin: '4px 0' }}>
              <div
                style={{
                  height: '145px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <EmptyStateMiniSilhouette id={variant.id} isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {variant.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '10.5px',
                    background: 'var(--color-bg-canvas)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Card Dual Action Buttons */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 'var(--space-3)',
                display: 'flex',
                gap: '8px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
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
                  handleOpenNewTab(variant.id);
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

      {/* ── Interactive Modal Preview (100% Invariant Blueprint Parity) ── */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
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
            {/* Modal Header (100% Invariant Blueprint Parity) */}
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
              {/* Sisi Kiri: Dot, Judul, Badge, Tagline */}
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

              {/* Sisi Kanan: Subtabs Tab, Tombol Buka di Tab Baru, Tombol Tutup (X) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Subtabs Tab */}
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
                      color: modalTab === 'preview' ? '#ffffff' : 'var(--color-text-secondary)',
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
                      color: modalTab === 'tsx' ? '#ffffff' : 'var(--color-text-secondary)',
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

                {/* Tombol Tab Baru: solid terracotta */}
                <button
                  type="button"
                  onClick={() => handleOpenNewTab(selectedVariant)}
                  title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 36,
                    boxSizing: 'border-box',
                    gap: 6,
                    background: 'var(--color-primary)',
                    color: '#ffffff',
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

                {/* Tombol Tutup (X): bordered berlatar surface */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  style={{
                    height: 36,
                    width: 36,
                    boxSizing: 'border-box',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: 0,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {modalTab === 'preview' && (
                <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '24px' }}>
                  {renderLiveEmptyStatePreview(selectedVariant, isDarkMode, setActiveTab)}
                </div>
              )}

              {modalTab === 'tsx' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--color-bg-canvas)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                      {currentMeta.nameEn} Component TSX
                    </span>
                    <NeuronButton
                      size="sm"
                      variant="primary"
                      leadingIcon={copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      onClick={handleCopyTSX}
                    >
                      {copiedCode ? (isId ? 'Tersalin ke Clipboard' : 'Copied to Clipboard') : (isId ? 'Salin Kode TSX' : 'Copy TSX Code')}
                    </NeuronButton>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: 16,
                      borderRadius: 12,
                      background: isDarkMode ? '#0d1322' : '#1e293b',
                      color: '#f8fafc',
                      fontSize: 12.5,
                      fontFamily: 'monospace',
                      lineHeight: 1.6,
                      overflowX: 'auto',
                    }}
                  >
                    {EMPTY_STATE_SNIPPETS[selectedVariant] || ''}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer Navigation ── */}
      <NextPrevious
        previous={{
          label: isId ? 'Pengaturan Ruang Kerja & Akses RBAC' : 'Workspace Settings & RBAC',
          onClick: () => {
            window.location.hash = '#pat-settings';
            setActiveTab('pat-settings');
          },
        }}
        next={{
          label: isId ? 'Notifikasi & Pusat Aktivitas' : 'Notifications & Activity Center',
          onClick: () => {
            window.location.hash = '#pat-notifications';
            setActiveTab('pat-notifications');
          },
        }}
      />
    </div>
  );
}
