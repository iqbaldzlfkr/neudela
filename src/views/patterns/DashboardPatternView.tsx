import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronTooltip from '../../components/NeuronTooltip';
import NeuronDivider from '../../components/NeuronDivider';
import NeuronModal from '../../components/NeuronModal';
import { NeuronCard } from '../../components/NeuronCard';
import {
  ExecutiveSaasDashboard,
  OperationsFleetDashboard,
  MarketingGrowthDashboard,
  FintechTreasuryDashboard,
  DevopsTelemetryDashboard,
  CustomerSuccessDashboard,
  SystemSettingsDashboard,
  ProcurementSlaDashboard,
} from './dashboard-variants';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Server,
  Truck,
  Package,
  Calendar,
  Filter,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Eye,
  ExternalLink,
  Layers,
  Settings,
  Maximize2,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Copy,
  Plus,
  ArrowRight,
  Building2,
  CreditCard,
  Cpu,
  HelpCircle,
  FileText,
  Sliders,
  X,
  Play,
  RotateCcw,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Bell,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

export type DashboardVariantId =
  | 'executive-saas'
  | 'operations-fleet'
  | 'analytics-marketing'
  | 'fintech-treasury'
  | 'devops-telemetry'
  | 'customer-success'
  | 'procurement-sla';

export interface DashboardVariantMeta {
  id: DashboardVariantId;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  badge: string;
  accentColor: string;
  tags: string[];
  bestForEn: string;
  bestForId: string;
  kpis: { labelEn: string; labelId: string; value: string; change: string; positive: boolean }[];
}

export const DASHBOARD_VARIANTS: DashboardVariantMeta[] = [
  {
    id: 'executive-saas',
    nameEn: 'Executive SaaS & Revenue Performance',
    nameId: 'Kinerja SaaS & Pendapatan Eksekutif',
    taglineEn: 'Real-time ARR, MRR, retention cohorts, revenue trajectory, and contract renewals.',
    taglineId: 'Pemantauan real-time ARR, MRR, kohort retensi, tren pendapatan, dan pembaruan kontrak.',
    descEn: 'High-altitude strategic executive cockpit featuring key subscription KPIs, 12-month bezier revenue growth charts, plan distribution breakdown, and actionable enterprise contracts table.',
    descId: 'Cockpit eksekutif strategis tingkat tinggi dengan metrik langganan utama, grafik pertumbuhan pendapatan 12 bulan, pembagian tier paket, dan tabel kontrak enterprise.',
    badge: 'Flagship Architecture',
    accentColor: '#df7e30',
    tags: ['ARR/MRR', 'Revenue Curve', 'Plan Donut', 'Enterprise Contracts', 'Executive Export'],
    bestForEn: 'B2B SaaS Founders, Chief Revenue Officers, Board Directors, Venture Backends',
    bestForId: 'Founder B2B SaaS, Chief Revenue Officer, Direksi & Investor, Backend Startup',
    kpis: [
      { labelEn: 'Annual Recurring Revenue', labelId: 'Pendapatan Berulang Tahunan (ARR)', value: '$4.82M', change: '+24.8% YoY', positive: true },
      { labelEn: 'Monthly Recurring Revenue', labelId: 'Pendapatan Berulang Bulanan (MRR)', value: '$402.5K', change: '+8.4% MoM', positive: true },
      { labelEn: 'Net Revenue Retention', labelId: 'Net Revenue Retention (NRR)', value: '118.4%', change: '+3.2%', positive: true },
      { labelEn: 'Customer Churn Rate', labelId: 'Tingkat Churn Pelanggan', value: '0.84%', change: '-0.16% opt', positive: true },
    ],
  },
  {
    id: 'operations-fleet',
    nameEn: 'Logistics & Fleet Operations Control',
    nameId: 'Kontrol Logistik & Operasional Armada',
    taglineEn: 'Live dispatch tracking, hub throughput, courier telemetry, and SLA alerts.',
    taglineId: 'Pelacakan pengiriman langsung, throughput gudang, telemetri kurir, dan peringatan SLA.',
    descEn: 'Mission-critical dispatch board displaying real-time sorting center throughput, delivery courier utilization, on-time SLA metrics, and interactive delivery manifests.',
    descId: 'Papan kendali logistik misi kritis dengan throughput pusat sortir real-time, utilisasi kurir pengiriman, metrik SLA tepat waktu, dan manifes pengiriman interaktif.',
    badge: 'Logistics & Supply',
    accentColor: '#df7e30',
    tags: ['Live Throughput', 'Courier Roster', 'Manifest Table', 'SLA Breaches', 'Dispatch Actions'],
    bestForEn: 'Logistics Hubs, Supply Chain Providers, Last-Mile Couriers, Warehousing Operations',
    bestForId: 'Hub Logistik, Penyedia Supply Chain, Pengiriman Last-Mile, Manajemen Pergudangan',
    kpis: [
      { labelEn: 'Active Shipments in Transit', labelId: 'Paket Aktif dalam Perjalanan', value: '14,892', change: '94% on-schedule', positive: true },
      { labelEn: 'Fleet Vehicle Utilization', labelId: 'Utilisasi Armada Kendaraan', value: '88.4%', change: '340 of 385 active', positive: true },
      { labelEn: 'First-Attempt Delivery SLA', labelId: 'SLA Pengiriman Percobaan Pertama', value: '96.8%', change: '+1.4% vs target', positive: true },
      { labelEn: 'Critical Exception Alerts', labelId: 'Peringatan Kendala Kritis', value: '8 pkgs', change: '-4 resolved', positive: true },
    ],
  },
  {
    id: 'analytics-marketing',
    nameEn: 'Growth & Multi-Channel Marketing Hub',
    nameId: 'Pusat Pertumbuhan & Pemasaran Multi-Saluran',
    taglineEn: 'Campaign attribution, blended CAC, ROAS returns, and funnel conversions.',
    taglineId: 'Atribusi kampanye, CAC terpadu, laba ROAS, dan konversi corong akuisisi.',
    descEn: 'Performance marketing dashboard visualizing acquisition channels, spend attribution, conversion rate velocity, and quick status toggles for active campaign adsets.',
    descId: 'Dashboard kinerja pemasaran yang memvisualisasikan saluran akuisisi, atribusi anggaran, kecepatan rasio konversi, dan sakelar status untuk adset aktif.',
    badge: 'Growth Analytics',
    accentColor: '#df7e30',
    tags: ['Multi-Touch Attribution', 'ROAS Analysis', 'Conversion Funnel', 'Campaign Toggles', 'CPA Tracker'],
    bestForEn: 'Growth Marketing Teams, Ad Agency Dashboards, E-Commerce Growth, Brand Managers',
    bestForId: 'Tim Growth Marketing, Dashboard Agensi Iklan, E-Commerce Brand, Pengelola Kampanye',
    kpis: [
      { labelEn: 'Unique Traffic Visitors', labelId: 'Pengunjung Unik Bulanan', value: '648.2K', change: '+18.2% MoM', positive: true },
      { labelEn: 'Blended Acquisition (CAC)', labelId: 'Biaya Akuisisi Terpadu (CAC)', value: '$38.40', change: '-12.6% optimized', positive: true },
      { labelEn: 'Qualified MQL Leads', labelId: 'Prospek Berkualitas (MQL)', value: '12,480', change: '5.2% CVR', positive: true },
      { labelEn: 'Blended Ad Return (ROAS)', labelId: 'Laba Belanja Iklan (ROAS)', value: '4.85x', change: '+0.65x lift', positive: true },
    ],
  },
  {
    id: 'fintech-treasury',
    nameEn: 'Fintech Treasury & Multi-Currency Liquidity',
    nameId: 'Perbendaharaan Fintech & Likuiditas Multi-Mata Uang',
    taglineEn: 'Runway monitoring, FX liquidity reserves, real-time wires, and payment approvals.',
    taglineId: 'Pemantauan runway kas, cadangan likuiditas FX, kliring transfer kawat, dan persetujuan dana.',
    descEn: 'Corporate treasury console for multi-currency cash reserves (USD, EUR, GBP, IDR), burn rate tracking, available runway forecasting, and high-value wire transfers with dual-signature workflows.',
    descId: 'Konsol perbendaharaan perusahaan untuk cadangan kas multi-mata uang (USD, EUR, GBP, IDR), pemantauan burn rate, proyeksi runway, dan transfer kawat dengan persetujuan ganda.',
    badge: 'Corporate Finance',
    accentColor: '#df7e30',
    tags: ['Multi-Currency', 'Runway Gauge', 'Wire Clearing', 'Approval Dual-Sign', 'Cash Trajectory'],
    bestForEn: 'CFO Office, Treasury Desks, Fintech Neobanks, Global Payment Gateways',
    bestForId: 'Kantor CFO, Tim Treasury, Neobank Fintech, Gerbang Pembayaran Global',
    kpis: [
      { labelEn: 'Total Liquid Treasury', labelId: 'Total Likuiditas Kas', value: '$18.45M', change: '+4.2% balance', positive: true },
      { labelEn: 'Net Monthly Burn Rate', labelId: 'Tingkat Burn Kas Bulanan', value: '$312.4K', change: 'Steady variance', positive: true },
      { labelEn: 'Available Cash Runway', labelId: 'Runway Kas Tersedia', value: '59.1 mos', change: 'Above threshold', positive: true },
      { labelEn: 'Pending Approvals', labelId: 'Menunggu Persetujuan Transfer', value: '3 wires', change: '$148.0K queued', positive: false },
    ],
  },
  {
    id: 'devops-telemetry',
    nameEn: 'Cloud Infrastructure & Pod Telemetry',
    nameId: 'Telemetri Infrastruktur Cloud & Pod',
    taglineEn: 'Cluster telemetry, P99 API response latencies, error budgets, and workload replicas.',
    taglineId: 'Telemetri kluster k8s, latensi respon P99, anggaran error, dan replika beban kerja.',
    descEn: 'Engineered for Site Reliability Engineers (SRE) and DevOps leads, featuring microservice cluster health, P99 latency anomaly curves, pod resource utilization gauges, and deployment rollbacks.',
    descId: 'Dirancang untuk Site Reliability Engineer (SRE) dan DevOps, menampilkan kesehatan kluster microservice, grafik anomali latensi P99, penggunaan sumber daya pod, dan aksi rollback deployment.',
    badge: 'SRE & DevOps',
    accentColor: '#df7e30',
    tags: ['P99 Latency', 'Error Budgets', 'Pod Gauges', 'Workload Replicas', 'Canary Rollback'],
    bestForEn: 'DevOps Engineers, SRE Teams, Platform Infrastructure Leads, Cloud Architects',
    bestForId: 'Engineer DevOps, Tim SRE, Lead Infrastruktur Platform, Arsitek Cloud',
    kpis: [
      { labelEn: 'P99 API Latency', labelId: 'Latensi API P99', value: '38.2 ms', change: '-4.6ms vs SLA', positive: true },
      { labelEn: 'Error Budget Rate', labelId: 'Rasio Anggaran Error', value: '0.008%', change: '99.992% uptime', positive: true },
      { labelEn: 'Pod CPU Utilization', labelId: 'Utilisasi CPU Rata-Rata', value: '62.4%', change: '48 nodes balanced', positive: true },
      { labelEn: 'Cluster Memory Pressure', labelId: 'Tekanan Memori Kluster', value: '58.6%', change: 'Within safe margins', positive: true },
    ],
  },
  {
    id: 'customer-success',
    nameEn: 'Customer Success & Enterprise Support Queue',
    nameId: 'Customer Success & Antrean Dukungan Enterprise',
    taglineEn: 'Priority ticket triage, first response time (FRT), CSAT ratings, and SLA countdowns.',
    taglineId: 'Triase tiket prioritas, waktu respon awal (FRT), skor CSAT, dan hitung mundur SLA.',
    descEn: 'Customer operations hub for enterprise accounts featuring tier priority queues, first response telemetry, CSAT satisfaction gauges, and live agent resolution workflows.',
    descId: 'Pusat operasional dukungan pelanggan untuk akun enterprise dengan antrean prioritas berjenjang, telemetri respon pertama, pengukur kepuasan CSAT, dan alur resolusi agen.',
    badge: 'Customer Ops',
    accentColor: '#df7e30',
    tags: ['Priority Triage', 'CSAT Gauge', 'FRT Response', 'SLA Timers', 'Resolution Action'],
    bestForEn: 'Customer Support Leaders, CSM Teams, Client Services, Technical Account Managers',
    bestForId: 'Pimpinan Support, Tim Customer Success, Akun Manajer Teknis, Layanan Klien',
    kpis: [
      { labelEn: 'Open Priority Tickets', labelId: 'Tiket Prioritas Terbuka', value: '34 tickets', change: '98% within SLA', positive: true },
      { labelEn: 'Median First Response (FRT)', labelId: 'Waktu Respon Pertama (FRT)', value: '3m 42s', change: '-45s benchmark', positive: true },
      { labelEn: 'CSAT Customer Satisfaction', labelId: 'Kepuasan Pelanggan (CSAT)', value: '4.92 / 5.0', change: '+0.12 pts', positive: true },
      { labelEn: '7-Day Resolution Rate', labelId: 'Rasio Resolusi 7-Hari', value: '95.6%', change: '+2.1% efficiency', positive: true },
    ],
  },
  {
    id: 'procurement-sla',
    nameEn: 'IT Project Delivery SLA & Dual-Clock Engine',
    nameId: 'SLA Delivery Proyek IT & Dual-Clock Engine',
    taglineEn: 'Dual-clock engine (active dev vs client blocker days), SDLC funnel velocity, and auditable timeline dispute elimination.',
    taglineId: 'Dual-clock engine (hari dev aktif vs blocker klien), velocity funnel SDLC, dan eliminasi sengketa timeline audit-proof.',
    descEn: 'Engineering and CDO delivery governance dashboard featuring dual-clock timers (active engineering man-days vs paused client blocker days), 6 standard blocker taxonomy codes (BLK-01 to BLK-06), 5-phase SDLC velocity tracking, and dispute-free audit trail.',
    descId: 'Dashboard tata kelola delivery IT & CDO dengan dual-clock (hari rekayasa aktif vs blocker dependensi klien), 6 taksonomi standar blocker (BLK-01 s/d BLK-06), pelacakan kecepatan 5 fase SDLC, dan jejak audit penghilang sengketa kontrak.',
    badge: 'IT Delivery Governance',
    accentColor: '#df7e30',
    tags: ['Dual-Clock SLA', 'Freeze Engine', 'Squad / Client / Module', 'SDLC Milestones', 'Deliverables Monitor'],
    bestForEn: 'Chief Delivery Officers (CDO), Lead Technical Project Managers (TPM), Engineering Directors, Scrum Masters, Tech Leads',
    bestForId: 'Chief Delivery Officer (CDO), Lead Technical Project Manager (TPM), VP Engineering, Scrum Master, Tech Lead',
    kpis: [
      { labelEn: 'Milestone Adherence Rate', labelId: 'Kepatuhan Delivery SLA', value: '94.6%', change: '+2.4% vs baseline', positive: true },
      { labelEn: 'Avg Dev Cycle Time', labelId: 'Siklus Waktu Dev (TAT)', value: '14.2 days', change: '-3.8d cycle speedup', positive: true },
      { labelEn: 'Client Blocker Days Saved', labelId: 'Hari Blocker Klien Dikecualikan', value: '286 days', change: '42 freeze events', positive: true },
      { labelEn: 'Active Sprints Running', labelId: 'Deliverable Berjalan', value: '38 tickets', change: '6 in UAT verification', positive: true },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Card Mini Silhouette Visual Previews
// ─────────────────────────────────────────────────────────────────────────────

function CardMiniSilhouette({ id, accentColor }: { id: DashboardVariantId; accentColor: string }) {
  return (
    <div
      style={{
        height: '136px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-canvas)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
        padding: '8px 10px',
        gap: '6px',
      }}
    >
      {/* ── Executive SaaS Silhouette ── */}
      {id === 'executive-saas' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)' }}>ARR Velocity Cockpit</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: 4 }}>
              +24.8% YoY
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>ARR</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: accentColor }}>$4.82M</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>MRR</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-primary)' }}>$402.5K</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>NRR</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>118.4%</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1.4, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>12-Mo Revenue Trajectory</span>
                <span style={{ fontSize: '8px', color: accentColor, fontWeight: 700 }}>$4.8M Target ●</span>
              </div>
              <div style={{ position: 'relative', height: 28, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                <svg width="100%" height="28" viewBox="0 0 100 28" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="execSaasGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
                      <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,24 Q25,20 45,15 T75,9 T100,2 L100,28 L0,28 Z" fill="url(#execSaasGrad)" />
                  <path d="M0,24 Q25,20 45,15 T75,9 T100,2" fill="none" stroke={accentColor} strokeWidth="2" />
                  <circle cx="100" cy="2" r="2.5" fill="#fff" stroke={accentColor} strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div style={{ flex: 0.9, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <div style={{ width: 34, height: 34, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" r="12" fill="none" stroke="rgba(223,126,48,0.2)" strokeWidth="4.5" />
                  <circle cx="17" cy="17" r="12" fill="none" stroke={accentColor} strokeWidth="4.5" strokeDasharray="50 100" strokeDashoffset="12" />
                  <circle cx="17" cy="17" r="12" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="25 100" strokeDashoffset="-38" />
                </svg>
                <span style={{ position: 'absolute', fontSize: '7.5px', fontWeight: 800, color: 'var(--color-text-primary)' }}>Tier</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '7.5px' }}>
                  <div style={{ width: 4, height: 4, borderRadius: 1, background: accentColor }} />
                  <span>Ent 52%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '7.5px' }}>
                  <div style={{ width: 4, height: 4, borderRadius: 1, background: '#f59e0b' }} />
                  <span>Scale 31%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Logistics Fleet Silhouette ── */}
      {id === 'operations-fleet' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Dispatch Hub Radar</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10b981' }} />
              96.8% On-Time SLA
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>In Transit</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: accentColor }}>14,892</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Fleet Active</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-primary)' }}>88.4%</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Exceptions</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444' }}>8 pkgs</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1.1, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                <span>Hourly Hub Throughput</span>
                <span style={{ color: accentColor }}>Peak: 14:00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28, width: '100%', paddingBottom: 2 }}>
                {[8, 14, 18, 24, 21, 28, 17, 12, 19].map((h, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${h}px`,
                      borderRadius: '2px 2px 0 0',
                      background: idx === 5 ? accentColor : `rgba(223, 126, 48, ${0.35 + (idx * 0.05)})`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ flex: 1.2, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              {[
                { route: 'Van #04 ➔ JFK Hub', status: 'In-Transit', color: '#10b981' },
                { route: 'Truck #12 ➔ SFO Gate', status: 'Staging', color: '#f59e0b' },
                { route: 'Cargo #08 ➔ ORD Air', status: 'Delivered', color: '#64748b' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '8px' }}>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{r.route}</span>
                  <span style={{ color: r.color, background: `${r.color}15`, padding: '1px 4px', borderRadius: 3, fontWeight: 700, fontSize: '7.5px' }}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Growth Marketing Silhouette ── */}
      {id === 'analytics-marketing' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Multi-Channel Acquisition</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: accentColor, background: 'rgba(223,126,48,0.12)', padding: '1px 5px', borderRadius: 4 }}>
              4.85x Blended ROAS
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Visitors</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-primary)' }}>648.2K</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>CAC</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>$38.40</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>MQL Leads</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: accentColor }}>12,480</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1.1, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                <span>Attribution Funnel</span>
                <span style={{ color: accentColor }}>5.2% CVR</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <div style={{ width: '96%', height: 6, borderRadius: 2, background: 'rgba(223, 126, 48, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '6.5px', color: '#fff', fontWeight: 800 }}>648K Traffic (100%)</span>
                </div>
                <div style={{ width: '68%', height: 6, borderRadius: 2, background: 'rgba(223, 126, 48, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '6.5px', color: '#fff', fontWeight: 800 }}>12.5K MQL (5.2%)</span>
                </div>
                <div style={{ width: '38%', height: 6, borderRadius: 2, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '6.5px', color: '#fff', fontWeight: 800 }}>1.8K Paid (14%)</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1.1, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Top Ad Channels</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { channel: 'Google Search', pct: '48%', color: accentColor },
                  { channel: 'Meta Retargeting', pct: '32%', color: '#f59e0b' },
                  { channel: 'Organic Direct', pct: '20%', color: '#10b981' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '7.5px', color: 'var(--color-text-secondary)', width: '42px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.channel}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--color-bg-canvas)', overflow: 'hidden' }}>
                      <div style={{ width: c.pct, height: '100%', background: c.color, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: '7.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{c.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Fintech Treasury Silhouette ── */}
      {id === 'fintech-treasury' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Treasury Liquidity Vault</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: 4 }}>
              USD · EUR · IDR
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Total Liquidity</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: accentColor }}>$18.45M</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Monthly Burn</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-primary)' }}>$312.4K</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Cash Runway</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>59.1 mos</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1.1, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                <span>Inbound vs Outbound</span>
                <span style={{ color: '#10b981' }}>+$1.2M Net</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 28, width: '100%', paddingBottom: 2 }}>
                {[
                  { in: 18, out: 12 },
                  { in: 22, out: 15 },
                  { in: 26, out: 14 },
                  { in: 28, out: 13 },
                ].map((bar, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    <div style={{ width: 6, height: `${bar.in}px`, borderRadius: '1.5px 1.5px 0 0', background: '#10b981' }} />
                    <div style={{ width: 6, height: `${bar.out}px`, borderRadius: '1.5px 1.5px 0 0', background: accentColor }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1.2, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              {[
                { tag: 'Wire In', amount: '+$142,500', note: 'Enterprise Corp', color: '#10b981' },
                { tag: 'Batch Out', amount: '-$38,200', note: 'Payroll AWS', color: accentColor },
                { tag: 'Settlement', amount: '+$89,100', note: 'Stripe Global', color: '#10b981' },
              ].map((tx, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: '7px', fontWeight: 700, padding: '1px 3px', borderRadius: 2, background: `${tx.color}15`, color: tx.color }}>
                      {tx.tag}
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '7.5px' }}>{tx.note}</span>
                  </div>
                  <strong style={{ color: tx.color, fontSize: '8px' }}>{tx.amount}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DevOps SRE Silhouette ── */}
      {id === 'devops-telemetry' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'monospace' }}>k8s-prod-cluster-01</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: 4, fontFamily: 'monospace' }}>
              99.992% Uptime
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>P99 Latency</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', fontFamily: 'monospace' }}>38.2ms</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>CPU Load</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: accentColor, fontFamily: 'monospace' }}>62.4%</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Error Rate</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>0.008%</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                <span>Node Health Matrix</span>
                <span style={{ color: '#10b981', fontFamily: 'monospace' }}>48/48 OK</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    style={{
                      height: 11,
                      borderRadius: 2,
                      background: n === 3 ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.18)',
                      border: `1px solid ${n === 3 ? '#f59e0b' : '#10b981'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '6.5px',
                      fontFamily: 'monospace',
                      color: n === 3 ? '#f59e0b' : '#10b981',
                      fontWeight: 700,
                    }}
                  >
                    pod-{n + 1}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1.2, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7.5px', marginBottom: 2 }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>CPU Cores</span>
                  <strong style={{ color: accentColor, fontFamily: 'monospace' }}>62%</strong>
                </div>
                <div style={{ height: 3.5, borderRadius: 2, background: 'var(--color-bg-canvas)', overflow: 'hidden' }}>
                  <div style={{ width: '62%', height: '100%', background: accentColor }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7.5px', marginBottom: 2 }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Memory</span>
                  <strong style={{ color: '#10b981', fontFamily: 'monospace' }}>58%</strong>
                </div>
                <div style={{ height: 3.5, borderRadius: 2, background: 'var(--color-bg-canvas)', overflow: 'hidden' }}>
                  <div style={{ width: '58%', height: '100%', background: '#10b981' }} />
                </div>
              </div>
              <div style={{ fontSize: '7px', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                › pods: 48 healthy / 0 fail
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Customer Success Silhouette ── */}
      {id === 'customer-success' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Account Health & CSAT</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: accentColor, background: 'rgba(223,126,48,0.12)', padding: '1px 5px', borderRadius: 4 }}>
              ★ 4.92 / 5.0 CSAT
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>CSAT Rating</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: accentColor }}>4.92 ★</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>First Response</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>3m 42s</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Resolution</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-primary)' }}>95.6%</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 0.9, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 34, height: 34, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" r="12" fill="none" stroke="rgba(223,126,48,0.2)" strokeWidth="4" />
                  <circle cx="17" cy="17" r="12" fill="none" stroke={accentColor} strokeWidth="4" strokeDasharray="72 100" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <span style={{ position: 'absolute', fontSize: '8px', fontWeight: 800, color: accentColor }}>98%</span>
              </div>
              <span style={{ fontSize: '7.5px', color: 'var(--color-text-secondary)', fontWeight: 600, marginTop: 2 }}>High Health</span>
            </div>

            <div style={{ flex: 1.3, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              {[
                { tier: 'P0 Critical', count: '2 open', timer: '14m SLA', color: '#ef4444' },
                { tier: 'P1 High', count: '8 open', timer: '1h 42m', color: '#f59e0b' },
                { tier: 'P2 Normal', count: '24 open', timer: '98% on-time', color: '#10b981' },
              ].map((t, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.color }} />
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{t.tier}</span>
                  </div>
                  <span style={{ color: t.color, fontSize: '7.5px', fontWeight: 700 }}>{t.timer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── IT Project Delivery SLA Silhouette ── */}
      {id === 'procurement-sla' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: accentColor }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)' }}>IT Delivery SLA & Dual-Clock</span>
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '1px 5px', borderRadius: 4 }}>
              94.6% SLA On-Track
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Active SLA</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: accentColor }}>11.4d</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Freeze Time</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0ea5e9' }}>5.2d paused</div>
            </div>
            <div style={{ background: 'var(--color-bg-surface)', padding: '3px 5px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>Packages</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-primary)' }}>42 pkgs</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1.1, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                <span>Dual-Clock Engine</span>
                <span style={{ color: '#0ea5e9', fontWeight: 700 }}>Freeze Active ⏸</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: 'var(--color-bg-canvas)' }}>
                  <div style={{ width: '55%', background: accentColor }} title="Active Time" />
                  <div style={{ width: '25%', background: '#0ea5e9' }} title="Freeze Time" />
                  <div style={{ width: '20%', background: 'var(--color-border)' }} title="Remaining SLA" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: 'var(--color-text-tertiary)' }}>
                  <span style={{ color: accentColor }}>■ 9d Aktif</span>
                  <span style={{ color: '#0ea5e9' }}>■ 5d Freeze</span>
                  <span>■ 4d Sisa</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1.2, background: 'var(--color-bg-surface)', borderRadius: 6, border: '1px solid var(--color-border)', padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              {[
                { title: 'Server GPU AI (PIC: Iqbal)', status: 'Berjalan', color: '#10b981' },
                { title: 'Turbin Generator Unit 3', status: 'Freeze', color: '#0ea5e9' },
                { title: 'Software ERP Core', status: 'Warning', color: '#f59e0b' },
              ].map((p, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '8px' }}>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85px' }}>{p.title}</span>
                  <span style={{ color: p.color, background: `${p.color}15`, padding: '1px 4px', borderRadius: 3, fontWeight: 700, fontSize: '7.5px' }}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Live Dashboard Renders
// ─────────────────────────────────────────────────────────────────────────────

export function renderDashboardLive(
  variantId: DashboardVariantId,
  isId: boolean,
  previewTheme: 'light' | 'dark',
  onTriggerModal?: (title: string, content: React.ReactNode) => void
) {
  return (
    <div
      className={`dashboard-live-canvas ${previewTheme === 'dark' ? 'dark-theme' : ''}`}
      style={{
        background: previewTheme === 'dark' ? '#0a0f1d' : 'var(--color-bg-canvas)',
        color: previewTheme === 'dark' ? '#f1f5f9' : 'var(--color-text-primary)',
        padding: '24px',
        minHeight: '680px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {variantId === 'executive-saas' && (
        <ExecutiveSaasDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
      {variantId === 'operations-fleet' && (
        <OperationsFleetDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
      {variantId === 'analytics-marketing' && (
        <MarketingGrowthDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
      {variantId === 'fintech-treasury' && (
        <FintechTreasuryDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
      {variantId === 'devops-telemetry' && (
        <DevopsTelemetryDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
      {variantId === 'customer-success' && (
        <CustomerSuccessDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
      {variantId === 'procurement-sla' && (
        <ProcurementSlaDashboard
          isId={isId}
          previewTheme={previewTheme}
          onTriggerModal={onTriggerModal}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TSX Code Generator
// ─────────────────────────────────────────────────────────────────────────────

function getDashboardCodeSnippet(variantId: DashboardVariantId): string {
  return `// Neudela Enterprise Dashboard: ${variantId}
// Purely constructed using Neudela Design System & Neuron components
import React, { useState } from 'react';
import {
  NeuronCard,
  NeuronChart,
  NeuronTable,
  NeuronBadge,
  NeuronButton,
  NeuronAvatar,
  NeuronProgress,
  NeuronInput,
} from 'neudela';
import { Download, Calendar, Zap, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';
import 'neudela/style.css';

export function ${variantId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Dashboard() {
  const [period, setPeriod] = useState('30d');

  const kpis = [
    { label: 'Primary Telemetry', value: '$4.82M', change: '+24.8%', progress: 84 },
    { label: 'Monthly Growth', value: '$402.5K', change: '+8.4%', progress: 68 },
    { label: 'Retention Rate', value: '118.4%', change: '+3.2%', progress: 92 },
    { label: 'SLA Benchmark', value: '99.98%', change: '+0.1%', progress: 98 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', background: 'var(--color-bg-canvas)' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
            Enterprise Telemetry Console
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Real-time orchestrated telemetry on Neudela Design System
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <NeuronButton variant="secondary" size="sm" leadingIcon={<Download size={13} />}>
            Export Deck
          </NeuronButton>
          <NeuronButton variant="primary" size="sm" leadingIcon={<Zap size={13} />}>
            Sync Live
          </NeuronButton>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {kpis.map((k, i) => (
          <NeuronCard key={i} variant="default" padding="md" hoverable>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '4px 0' }}>
              {k.value}
            </div>
            <NeuronProgress value={k.progress} variant="brand" size="xs" />
          </NeuronCard>
        ))}
      </div>

      {/* Trajectory Area & Donut Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <NeuronCard variant="default" padding="lg">
          <NeuronChart
            type="line"
            colorScheme="brand"
            smooth
            showArea
            categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
            series={[{ name: 'FY26 Revenue', data: [310, 340, 380, 410, 440, 490] }]}
          />
        </NeuronCard>
        <NeuronCard variant="default" padding="lg">
          <NeuronChart
            type="donut"
            colorScheme="brand"
            innerRadius={0.65}
            data={[
              { label: 'Tier 1 Enterprise', value: 54 },
              { label: 'Scale Growth', value: 30 },
              { label: 'Starter', value: 16 },
            ]}
          />
        </NeuronCard>
      </div>
    </div>
  );
}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Full Enterprise Dashboard Application Shell Layout (Header + Sidebar + Canvas)
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardShellLayout({
  variantId,
  isId,
  previewTheme,
  viewportMode = 'desktop',
  onSelectVariant,
  onTriggerModal,
}: {
  variantId: DashboardVariantId;
  isId: boolean;
  previewTheme: 'light' | 'dark';
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  onSelectVariant?: (id: DashboardVariantId) => void;
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}) {
  const currentMeta = DASHBOARD_VARIANTS.find((v) => v.id === variantId) || DASHBOARD_VARIANTS[0];
  const [isCollapsed, setIsCollapsed] = useState(viewportMode === 'tablet');

  const variantToNavMap: Record<DashboardVariantId, string> = {
    'executive-saas': 'dashboard',
    'analytics-marketing': 'analytics',
    'operations-fleet': 'operations',
    'fintech-treasury': 'treasury',
    'customer-success': 'customers',
    'devops-telemetry': 'infrastructure',
    'procurement-sla': 'procurement',
  };

  const navToVariantMap: Record<string, DashboardVariantId> = {
    dashboard: 'executive-saas',
    analytics: 'analytics-marketing',
    operations: 'operations-fleet',
    treasury: 'fintech-treasury',
    customers: 'customer-success',
    infrastructure: 'devops-telemetry',
    procurement: 'procurement-sla',
  };

  const [activeNav, setActiveNav] = useState(variantToNavMap[variantId] || 'dashboard');
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    if (variantToNavMap[variantId]) {
      setActiveNav(variantToNavMap[variantId]);
    }
  }, [variantId]);

  useEffect(() => {
    if (viewportMode === 'tablet') {
      setIsCollapsed(true);
    } else if (viewportMode === 'desktop') {
      setIsCollapsed(false);
    }
  }, [viewportMode]);

  const navItems = [
    { id: 'dashboard', labelEn: 'Executive Dashboard', labelId: 'Dashboard Eksekutif', icon: <LayoutDashboard size={18} /> },
    { id: 'procurement', labelEn: 'IT Delivery & SLA', labelId: 'SLA Delivery IT', icon: <Clock size={18} />, badge: 'Dual-Clock' },
    { id: 'analytics', labelEn: 'Telemetry & Metrics', labelId: 'Telemetri & Metrik', icon: <Activity size={18} />, badge: 'Live' },
    { id: 'operations', labelEn: 'Logistics & Fleet', labelId: 'Operasional & Armada', icon: <Truck size={18} /> },
    { id: 'treasury', labelEn: 'Treasury & Cash Flow', labelId: 'Kas & Buku Besar', icon: <CreditCard size={18} /> },
    { id: 'customers', labelEn: 'Customer Success', labelId: 'Akun Pelanggan', icon: <Users size={18} /> },
    { id: 'infrastructure', labelEn: 'Cluster Nodes & SRE', labelId: 'Node Kluster & SRE', icon: <Server size={18} /> },
    { id: 'settings', labelEn: 'System Settings', labelId: 'Pengaturan Sistem', icon: <Settings size={18} /> },
  ];

  const filteredNavItems = searchVal.trim()
    ? navItems.filter((i) =>
        (isId ? i.labelId : i.labelEn).toLowerCase().includes(searchVal.toLowerCase())
      )
    : navItems;

  const effectiveCollapsed = viewportMode === 'mobile' ? true : isCollapsed;
  const isMobile = viewportMode === 'mobile';

  return (
    <div
      className={`dashboard-full-layout-shell ${previewTheme === 'dark' ? 'dark-theme' : ''}`}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        minHeight: 0,
        background: previewTheme === 'dark' ? '#0a0f1d' : 'var(--color-bg-canvas)',
        color: previewTheme === 'dark' ? '#f1f5f9' : 'var(--color-text-primary)',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Default Left Sidebar ── */}
      {!isMobile && (
        <aside
          style={{
            width: effectiveCollapsed ? '64px' : '230px',
            background: previewTheme === 'dark' ? '#0d1322' : 'var(--color-bg-surface)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: effectiveCollapsed ? '16px 8px' : '16px 12px',
            flexShrink: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {/* Sidebar Top: Logo & Tenant Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: effectiveCollapsed ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: effectiveCollapsed ? 'center' : 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--color-border)',
              gap: effectiveCollapsed ? '8px' : '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #df7e30, #c05e16)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  boxShadow: '0 2px 8px rgba(223, 126, 48, 0.3)',
                  flexShrink: 0,
                }}
              >
                ND
              </div>
              {!effectiveCollapsed && (
                <div>
                  <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                    Neudela Console
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Neuronworks
                  </div>
                </div>
              )}
            </div>

            {!effectiveCollapsed && !isMobile && (
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <PanelLeftClose size={15} />
              </button>
            )}

            {effectiveCollapsed && !isMobile && (
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                title="Expand sidebar"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 4,
                }}
              >
                <PanelLeftOpen size={15} />
              </button>
            )}
          </div>

          {/* Quick Search */}
          {!effectiveCollapsed && (
            <div style={{ marginBottom: '14px' }}>
              <NeuronInput
                size="sm"
                placeholder={isId ? 'Cari menu (⌘K)...' : 'Quick search (⌘K)...'}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                leadingIcon={<Search size={13} />}
              />
            </div>
          )}

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {filteredNavItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    if (navToVariantMap[item.id] && onSelectVariant) {
                      onSelectVariant(navToVariantMap[item.id]);
                    }
                  }}
                  title={effectiveCollapsed ? (isId ? item.labelId : item.labelEn) : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: effectiveCollapsed ? '8px 0' : '8px 10px',
                    justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '6px',
                        bottom: '6px',
                        width: '3px',
                        borderRadius: '0 2px 2px 0',
                        background: 'var(--color-primary)',
                      }}
                    />
                  )}
                  <span style={{ display: 'flex', color: isActive ? 'var(--color-primary)' : 'inherit' }}>
                    {item.icon}
                  </span>
                  {!effectiveCollapsed && (
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {isId ? item.labelId : item.labelEn}
                    </span>
                  )}
                  {!effectiveCollapsed && item.badge && (
                    <NeuronBadge size="xs" variant="brand">{item.badge}</NeuronBadge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom: Storage Progress & User Profile */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '12px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {!effectiveCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  <span>Cloud Storage</span>
                  <strong>74%</strong>
                </div>
                <NeuronProgress value={74} variant="brand" size="xs" />
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: effectiveCollapsed ? '4px 0' : '6px',
                justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
                borderRadius: '8px',
                background: previewTheme === 'dark' ? '#0a0f1d' : 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
              }}
            >
              <NeuronAvatar name="Iqbal Dzulfikar" size="sm" variant="brand" status="online" />
              {!effectiveCollapsed && (
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    Iqbal Dzulfikar
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                    Enterprise Admin
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* ── Main Area: Top Default Header + Dashboard Canvas ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Default Top Header */}
        <header
          style={{
            height: '52px',
            background: previewTheme === 'dark' ? '#0d1322' : 'var(--color-bg-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          {/* Left: Breadcrumbs & Live Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            {isMobile && (
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '11px',
                  flexShrink: 0,
                }}
              >
                ND
              </div>
            )}
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Workspaces / Analytics /
            </span>
            <strong style={{ fontSize: '13px', color: 'var(--color-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeNav === 'settings'
                ? (isId ? 'Pengaturan Sistem & Tata Kelola' : 'System Settings & Governance')
                : (isId ? currentMeta.nameId : currentMeta.nameEn)}
            </strong>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(223, 126, 48, 0.1)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-primary)',
                flexShrink: 0,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              <span>Live Synced</span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {!isMobile && (
              <div style={{ width: '180px' }}>
                <NeuronInput
                  size="xs"
                  placeholder="Search... ⌘K"
                  leadingIcon={<Search size={12} />}
                />
              </div>
            )}

            <button
              type="button"
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-surface)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              title="Notifications"
            >
              <Bell size={14} />
              <span
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                }}
              />
            </button>

            <NeuronAvatar name="Iqbal Dzulfikar" size="xs" variant="brand" status="online" />
          </div>
        </header>

        {/* Dashboard Canvas Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeNav === 'settings' ? (
            <div
              className={`dashboard-live-canvas ${previewTheme === 'dark' ? 'dark-theme' : ''}`}
              style={{
                background: previewTheme === 'dark' ? '#0a0f1d' : 'var(--color-bg-canvas)',
                color: previewTheme === 'dark' ? '#f1f5f9' : 'var(--color-text-primary)',
                padding: '24px',
                minHeight: '680px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <SystemSettingsDashboard isId={isId} previewTheme={previewTheme} />
            </div>
          ) : (
            renderDashboardLive(variantId, isId, previewTheme, onTriggerModal)
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main DashboardPatternView Component
// ─────────────────────────────────────────────────────────────────────────────

interface DashboardPatternViewProps {
  setActiveTab: (tabId: string) => void;
}

export default function DashboardPatternView({ setActiveTab }: DashboardPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [activeVariant, setActiveVariant] = useState<DashboardVariantId>('executive-saas');

  // Modal inspection dialog for table cells
  const [modalState, setModalState] = useState<{ open: boolean; title: string; content: React.ReactNode }>({
    open: false,
    title: '',
    content: null,
  });

  // Dedicated interactive preview modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [modalViewport, setModalViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [modalTheme, setModalTheme] = useState<'light' | 'dark'>('light');
  const [copiedModalCode, setCopiedModalCode] = useState(false);

  const currentMeta = DASHBOARD_VARIANTS.find((v) => v.id === activeVariant) || DASHBOARD_VARIANTS[0];

  const handleOpenModal = (variantId: DashboardVariantId) => {
    setActiveVariant(variantId);
    setModalTab('preview');
    setModalViewport('desktop');
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOpenStandalone = (varId: DashboardVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(`#preview-dashboard-${varId}`, '_blank');
  };

  return (
    <div className="pattern-dashboard-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          Dashboards
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur dashboard aplikasi enterprise tingkat lanjut yang dibangun dengan mengorkestrasi token Neudela dan komponen Neuron (NeuronCard, NeuronChart, NeuronTable, NeuronBadge, NeuronAvatar). Klik "Buka di Tab Baru" untuk menjalankan dashboard layar penuh di tab terpisah.'
            : 'Enterprise-grade composite dashboard architectures composed using Neudela Design System tokens and core Neuron components (NeuronCard, NeuronChart, NeuronTable, NeuronBadge, NeuronAvatar). Click "Open in New Tab" to test drive the dashboard in a dedicated fullscreen browser window.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <LayoutDashboard size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>7 {isId ? 'Varian Enterprise' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <ShieldCheck size={14} color="#df7e30" />
            <span>{isId ? 'Dukungan Tab Baru:' : 'Fullscreen Mode:'}</span>
            <strong>Real App Mode Ready</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Sliders size={14} color="#df7e30" />
            <span>{isId ? 'Warna Khas:' : 'Brand Theme:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>Neudela Terracotta (#df7e30)</strong>
          </div>
        </div>
      </div>

      {/* ── Section 1: Overview Variant Catalog ── */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Katalog Arsitektur Dashboard' : 'Dashboard Architecture Catalog'}
            </h2>
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Pilih salah satu dari 7 varian untuk menguji dashboard interaktif dan menyalin kodenya.' : 'Select any of the 7 architectures below to inspect live telemetry and copy production code.'}
            </span>
          </div>
          <NeuronBadge size="sm" variant="brand">7 Flagship Layouts</NeuronBadge>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {DASHBOARD_VARIANTS.map((variant) => {
            return (
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
                    }}
                  >
                    {variant.id === 'executive-saas' && <TrendingUp size={20} />}
                    {variant.id === 'operations-fleet' && <Truck size={20} />}
                    {variant.id === 'analytics-marketing' && <Activity size={20} />}
                    {variant.id === 'fintech-treasury' && <CreditCard size={20} />}
                    {variant.id === 'devops-telemetry' && <Server size={20} />}
                    {variant.id === 'customer-success' && <Users size={20} />}
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

                {/* Flagship Micro-Metric Strip */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: `${variant.accentColor}0d`,
                    border: `1px solid ${variant.accentColor}25`,
                    fontSize: '11px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '10.5px' }}>
                      {isId ? variant.kpis[0].labelId.split('(')[0].trim() : variant.kpis[0].labelEn.split('(')[0].trim()}:
                    </span>
                    <strong style={{ color: variant.accentColor, fontWeight: 800 }}>
                      {variant.kpis[0].value}
                    </strong>
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: variant.kpis[0].positive ? '#10b981' : variant.accentColor,
                      background: variant.kpis[0].positive ? 'rgba(16, 185, 129, 0.12)' : `${variant.accentColor}18`,
                      padding: '1px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {variant.kpis[0].change}
                  </span>
                </div>

                {/* Visual Architecture Silhouette */}
                <div style={{ margin: '2px 0' }}>
                  <CardMiniSilhouette id={variant.id} accentColor={variant.accentColor} />
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(variant.id);
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'rgba(223, 126, 48, 0.1)',
                      color: 'var(--color-primary)',
                      border: '1px solid rgba(223, 126, 48, 0.25)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Eye size={14} />
                    <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStandalone(variant.id, e);
                    }}
                    title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'var(--color-bg-canvas)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

{/* ── Section 2: Architecture Principles & Guidelines ── */}
      {/* ── Section 3: Architecture Principles & Guidelines ── */}
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 var(--space-4) 0', color: 'var(--color-text-primary)' }}>
          {isId ? 'Prinsip Arsitektur Dashboard Neudela' : 'Dashboard Architecture Principles'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <NeuronCard variant="default" padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Zap size={16} color="var(--color-primary)" />
              <strong style={{ fontSize: 14 }}>{isId ? 'Baseline 8pt & Komposisi Token' : '8pt Baseline & Token System'}</strong>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Seluruh jarak antar kartu KPI, padding header, dan kontainer grafik mengacu pada skala token 8pt Neudela (--space-*).'
                : 'All KPI card gutters, header paddings, and chart canvas boundaries adhere strictly to the Neudela 8pt baseline.'}
            </p>
          </NeuronCard>

          <NeuronCard variant="default" padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Activity size={16} color="var(--color-primary)" />
              <strong style={{ fontSize: 14 }}>{isId ? 'Komposisi Komponen Asli' : 'Native Component Composition'}</strong>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Dashboard dibangun 100% dengan mengonsumsi NeuronCard, NeuronChart, NeuronTable, NeuronBadge, dan NeuronAvatar tanpa perulangan kode dari 0.'
                : 'Composed entirely from established NeuronCard, NeuronChart, NeuronTable, NeuronBadge, and NeuronAvatar primitives without zero-state duplication.'}
            </p>
          </NeuronCard>

          <NeuronCard variant="default" padding="md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <ShieldCheck size={16} color="var(--color-primary)" />
              <strong style={{ fontSize: 14 }}>{isId ? 'Aksentuasi Terracotta Neudela' : 'Neudela Terracotta Accent'}</strong>
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Semua aksen interaktif, grafik aktif, dan tombol aksi konsisten mengusung palet warna terracotta Neudela (#df7e30) yang elegan dan berkarakter.'
                : 'All primary interactive strokes, chart fills, and CTA buttons adhere consistently to the authentic Neudela terracotta brand palette (#df7e30).'}
            </p>
          </NeuronCard>
        </div>
      </div>

      {/* ── Interactive Modal Dialog for Cell Inspection ── */}
      <NeuronModal
        open={modalState.open}
        size="2xl"
        className="neuron-modal--inspect-wide"
        onClose={() => setModalState({ open: false, title: '', content: null })}
        title={modalState.title}
        confirmText={isId ? 'Tutup' : 'Close'}
        cancelText={null}
        onConfirm={() => setModalState({ open: false, title: '', content: null })}
      >
        {modalState.content}
      </NeuronModal>

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE MODAL POP-UP FOR DASHBOARD PREVIEW
      ══════════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.72)',
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
              width: '98vw',
              maxWidth: '1580px',
              height: '95vh',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
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

              {/* Right Side: Subtabs + Controls + Actions (ALWAYS pinned in top right corner) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Modal Subtabs (Preview vs TSX) */}
                <div
                  style={{
                    display: 'flex',
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
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '5px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('tsx')}
                    style={{
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '5px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    React (TSX)
                  </button>
                </div>

                {/* Right Controls: Viewport, Theme, Real App New Tab & Close */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {modalTab === 'preview' && (
                    <>
                      {/* Viewport Width Buttons */}
                      <div style={{ display: 'flex', background: 'var(--color-bg-surface)', borderRadius: '6px', padding: '2px', border: '1px solid var(--color-border)' }}>
                        <button
                          type="button"
                          onClick={() => setModalViewport('desktop')}
                          title="Desktop (100%)"
                          style={{
                            border: 'none',
                            background: modalViewport === 'desktop' ? 'var(--color-bg-canvas)' : 'transparent',
                            color: modalViewport === 'desktop' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Monitor size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalViewport('tablet')}
                          title="Tablet (768px)"
                          style={{
                            border: 'none',
                            background: modalViewport === 'tablet' ? 'var(--color-bg-canvas)' : 'transparent',
                            color: modalViewport === 'tablet' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Tablet size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalViewport('mobile')}
                          title="Mobile (420px)"
                          style={{
                            border: 'none',
                            background: modalViewport === 'mobile' ? 'var(--color-bg-canvas)' : 'transparent',
                            color: modalViewport === 'mobile' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                          }}
                        >
                          <Smartphone size={14} />
                        </button>
                      </div>

                      {/* Theme Toggle */}
                      <button
                        type="button"
                        onClick={() => setModalTheme(modalTheme === 'light' ? 'dark' : 'light')}
                        style={{
                          background: 'var(--color-bg-surface)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-primary)',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                        }}
                      >
                        {modalTheme === 'light' ? <Moon size={13} /> : <Sun size={13} color="#f59e0b" />}
                        <span>{modalTheme === 'light' ? 'Dark' : 'Light'}</span>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleOpenStandalone(activeVariant, e)}
                    title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(223, 126, 48, 0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>{isId ? 'Tab Baru (Real App)' : 'New Tab (Real App)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      padding: 6,
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Close modal (Esc)"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div
              style={{
                flex: 1,
                overflowY: modalTab === 'tsx' ? 'auto' : 'hidden',
                background: modalTheme === 'dark' ? '#070b14' : '#f1f5f9',
                display: 'flex',
                justifyContent: 'center',
                padding: modalViewport === 'desktop' ? '0' : '20px 0',
                minHeight: 0,
              }}
            >
              {modalTab === 'preview' ? (
                <div
                  style={{
                    width: modalViewport === 'desktop' ? '100%' : modalViewport === 'tablet' ? '768px' : '420px',
                    height: '100%',
                    transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: modalViewport !== 'desktop' ? '0 16px 48px rgba(0,0,0,0.3)' : 'none',
                    borderRadius: modalViewport !== 'desktop' ? '12px' : '0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <DashboardShellLayout
                    variantId={activeVariant}
                    isId={isId}
                    previewTheme={modalTheme}
                    viewportMode={modalViewport}
                    onSelectVariant={(v) => setActiveVariant(v)}
                    onTriggerModal={(title, content) => setModalState({ open: true, title, content })}
                  />
                </div>
              ) : (
                <div style={{ width: '100%', background: '#0f172a', padding: '24px', position: 'relative', overflowX: 'auto' }}>
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <NeuronButton
                      size="xs"
                      variant="primary"
                      leadingIcon={copiedModalCode ? <Check size={12} /> : <Copy size={12} />}
                      onClick={() => {
                        navigator.clipboard.writeText(getDashboardCodeSnippet(activeVariant));
                        setCopiedModalCode(true);
                        setTimeout(() => setCopiedModalCode(false), 2000);
                      }}
                    >
                      {copiedModalCode ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode TSX' : 'Copy TSX Code')}
                    </NeuronButton>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      fontSize: '12.5px',
                      lineHeight: 1.6,
                      color: '#e2e8f0',
                      fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
                    }}
                  >
                    <code>{getDashboardCodeSnippet(activeVariant)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'pat-forms', label: isId ? 'Pola Formulir (Forms)' : 'Form Patterns' }}
        next={{ id: 'pat-data-grid', label: isId ? 'Tabel & Manajemen Data' : 'Data Grid & Table' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
