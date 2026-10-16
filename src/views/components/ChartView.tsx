import { useState, ReactNode } from 'react';
import {
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Activity,
  Radar,
  Eye,
  Palette,
  Smartphone,
  LayoutGrid,
  Layers,
  TrendingUp,
  Workflow,
  CircleDot,
} from 'lucide-react';
import NeuronChart, {
  NeuronChartType,
  NeuronChartSize,
  NeuronChartColorScheme,
  NeuronChartOrientation,
  ChartDataPoint,
  ChartSeries,
  SankeyData,
} from '../components/NeuronChart';
import NeuronBadge from '../components/NeuronBadge';
import NeuronCheckbox from '../components/NeuronCheckbox';
import NeuronTabBar from '../components/NeuronTabBar';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Do / Don't Rule Card
// ─────────────────────────────────────────────────────────────────────────────
function RuleCard({ type, children }: { type: 'do' | 'dont'; children: ReactNode }) {
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
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sample Data
// ─────────────────────────────────────────────────────────────────────────────
const SAMPLE_BAR_DATA: ChartDataPoint[] = [
  { label: 'Jan', value: 420 },
  { label: 'Feb', value: 680 },
  { label: 'Mar', value: 530 },
  { label: 'Apr', value: 910 },
  { label: 'May', value: 750 },
  { label: 'Jun', value: 860 },
];

const SAMPLE_HORIZONTAL_BAR_DATA: ChartDataPoint[] = [
  { label: 'Direct Web', value: 840 },
  { label: 'Organic Search', value: 670 },
  { label: 'Referral Link', value: 490 },
  { label: 'Social Media', value: 380 },
  { label: 'Email Promo', value: 260 },
];

const SAMPLE_GROUPED_SERIES: ChartSeries[] = [
  { name: 'Actual', data: [420, 580, 710, 890] },
  { name: 'Target', data: [400, 550, 650, 800] },
];
const SAMPLE_QUARTER_CATEGORIES = ['Q1', 'Q2', 'Q3', 'Q4'];

const SAMPLE_STACKED_SERIES: ChartSeries[] = [
  { name: 'Desktop', data: [280, 320, 310, 360] },
  { name: 'Mobile', data: [190, 240, 290, 340] },
  { name: 'Tablet', data: [80, 95, 110, 125] },
];

const SAMPLE_LINE_DATA: ChartDataPoint[] = [
  { label: 'Mon', value: 240 },
  { label: 'Tue', value: 380 },
  { label: 'Wed', value: 320 },
  { label: 'Thu', value: 510 },
  { label: 'Fri', value: 470 },
  { label: 'Sat', value: 620 },
  { label: 'Sun', value: 550 },
];

const SAMPLE_MULTI_LINE_SERIES: ChartSeries[] = [
  { name: 'Gross Revenue', data: [450, 520, 480, 610, 590, 720] },
  { name: 'Operating Cost', data: [280, 310, 300, 340, 330, 370] },
];
const SAMPLE_MONTH_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const SAMPLE_LINEAR_DATA: ChartDataPoint[] = [
  { label: '00:00', value: 24 },
  { label: '04:00', value: 18 },
  { label: '08:00', value: 64 },
  { label: '12:00', value: 92 },
  { label: '16:00', value: 78 },
  { label: '20:00', value: 46 },
];

const SAMPLE_PIE_DATA: ChartDataPoint[] = [
  { label: 'Chrome', value: 63 },
  { label: 'Safari', value: 19 },
  { label: 'Firefox', value: 8 },
  { label: 'Edge', value: 6 },
  { label: 'Other', value: 4 },
];

const SAMPLE_DONUT_BUDGET: ChartDataPoint[] = [
  { label: 'Engineering', value: 42 },
  { label: 'Marketing', value: 24 },
  { label: 'Operations', value: 18 },
  { label: 'Design', value: 16 },
];

const SAMPLE_RING_STORAGE: ChartDataPoint[] = [
  { label: 'Media Assets', value: 48 },
  { label: 'Databases', value: 26 },
  { label: 'Code Builds', value: 16 },
  { label: 'Logs Backup', value: 10 },
];

const SAMPLE_RADAR_DATA: ChartDataPoint[] = [
  { label: 'Speed', value: 85 },
  { label: 'Reliability', value: 90 },
  { label: 'Comfort', value: 70 },
  { label: 'Safety', value: 95 },
  { label: 'Efficiency', value: 80 },
  { label: 'Design', value: 75 },
];

const SAMPLE_RADAR_MULTI_SERIES: ChartSeries[] = [
  { name: 'Target', data: [90, 85, 80, 95, 88, 82] },
  { name: 'Actual', data: [75, 92, 68, 85, 78, 90] },
];
const SAMPLE_RADAR_CATEGORIES = ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'];

const SAMPLE_RADAR_SYSTEM: ChartDataPoint[] = [
  { label: 'Uptime', value: 99 },
  { label: 'Throughput', value: 88 },
  { label: 'Fault Tol.', value: 92 },
  { label: 'Low Latency', value: 85 },
  { label: 'Security', value: 96 },
];

const SAMPLE_SPARKLINE_DATA: ChartDataPoint[] = [
  { label: '1', value: 30 }, { label: '2', value: 45 }, { label: '3', value: 28 },
  { label: '4', value: 60 }, { label: '5', value: 52 }, { label: '6', value: 71 },
  { label: '7', value: 65 }, { label: '8', value: 80 }, { label: '9', value: 74 },
  { label: '10', value: 92 },
];

const SAMPLE_SPARKLINE_UP: ChartDataPoint[] = [
  { label: '1', value: 20 }, { label: '2', value: 28 }, { label: '3', value: 35 },
  { label: '4', value: 42 }, { label: '5', value: 48 }, { label: '6', value: 60 },
  { label: '7', value: 68 }, { label: '8', value: 75 }, { label: '9', value: 82 },
  { label: '10', value: 95 },
];

const SAMPLE_SPARKLINE_DOWN: ChartDataPoint[] = [
  { label: '1', value: 85 }, { label: '2', value: 80 }, { label: '3', value: 68 },
  { label: '4', value: 72 }, { label: '5', value: 55 }, { label: '6', value: 45 },
  { label: '7', value: 40 }, { label: '8', value: 32 }, { label: '9', value: 28 },
  { label: '10', value: 22 },
];

const SAMPLE_MULTI_SERIES: ChartSeries[] = [
  { name: 'Revenue', data: [320, 450, 380, 520, 610, 490] },
  { name: 'Expenses', data: [200, 300, 250, 310, 380, 290] },
  { name: 'Profit', data: [120, 150, 130, 210, 230, 200] },
];
const SAMPLE_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Sankey Sample Data (Direct reference to user's Intake -> Governance -> Outcome architecture)
const SAMPLE_SANKEY_GOVERNANCE: SankeyData = {
  stages: ['Intake', 'Governance', 'Outcome'],
  nodes: [
    // Stage 0: Intake
    { id: 'non-linear', label: 'Non-Linear', stage: 0, color: '#8b5cf6' },
    { id: 'linear', label: 'Linear', stage: 0, color: '#2563eb' },
    { id: 'untyped', label: 'Untyped', stage: 0, color: '#9ca3af' },

    // Stage 1: Governance
    { id: 'declined', label: 'Declined', stage: 1, color: '#ef4444' },
    { id: 'approved', label: 'Approved', stage: 1, color: '#10b981' },
    { id: 'faulted', label: 'Faulted', stage: 1, color: '#f97316' },
    { id: 'waiting', label: 'Waiting approval', stage: 1, color: '#eab308' },
    { id: 'deferred', label: 'Deferred', stage: 1, color: '#a855f7' },

    // Stage 2: Outcome
    { id: 'lost', label: 'Lost', stage: 2, color: '#ef4444' },
    { id: 'pipeline', label: 'Held in pipeline', stage: 2, color: '#eab308' },
    { id: 'delivered', label: 'Delivered', stage: 2, color: '#10b981' },
  ],
  links: [
    // Intake -> Governance
    { source: 'non-linear', target: 'declined', value: 36 },
    { source: 'non-linear', target: 'waiting', value: 4 },
    { source: 'non-linear', target: 'deferred', value: 4 },
    { source: 'non-linear', target: 'approved', value: 2 },

    { source: 'linear', target: 'approved', value: 9 },
    { source: 'linear', target: 'faulted', value: 6 },
    { source: 'linear', target: 'waiting', value: 3 },
    { source: 'linear', target: 'declined', value: 2 },

    { source: 'untyped', target: 'declined', value: 8 },
    { source: 'untyped', target: 'faulted', value: 5 },
    { source: 'untyped', target: 'waiting', value: 3 },
    { source: 'untyped', target: 'approved', value: 3 },

    // Governance -> Outcome
    { source: 'declined', target: 'lost', value: 46 },
    { source: 'faulted', target: 'lost', value: 11 },
    { source: 'waiting', target: 'pipeline', value: 10 },
    { source: 'approved', target: 'pipeline', value: 9 },
    { source: 'approved', target: 'delivered', value: 5 },
    { source: 'deferred', target: 'pipeline', value: 4 },
  ],
};

const SAMPLE_SANKEY_JOURNEY: SankeyData = {
  stages: ['Traffic Source', 'User Engagement', 'Conversion Outcome'],
  nodes: [
    // Stage 0: Traffic
    { id: 'organic', label: 'Organic Search', stage: 0, color: '#0ea5e9' },
    { id: 'paid', label: 'Paid Campaigns', stage: 0, color: '#f59e0b' },
    { id: 'referral', label: 'Partner Referral', stage: 0, color: '#8b5cf6' },

    // Stage 1: Engagement
    { id: 'landing', label: 'Landing Page', stage: 1, color: '#3b82f6' },
    { id: 'docs', label: 'Documentation', stage: 1, color: '#10b981' },
    { id: 'demo', label: 'Interactive Demo', stage: 1, color: '#ec4899' },

    // Stage 2: Outcome
    { id: 'subscribed', label: 'Pro Subscription', stage: 2, color: '#10b981' },
    { id: 'trial', label: 'Active Trial', stage: 2, color: '#f59e0b' },
    { id: 'bounced', label: 'Churn / Bounced', stage: 2, color: '#ef4444' },
  ],
  links: [
    { source: 'organic', target: 'landing', value: 55 },
    { source: 'organic', target: 'docs', value: 25 },
    { source: 'paid', target: 'landing', value: 40 },
    { source: 'paid', target: 'demo', value: 30 },
    { source: 'referral', target: 'demo', value: 20 },
    { source: 'referral', target: 'docs', value: 10 },

    { source: 'landing', target: 'trial', value: 45 },
    { source: 'landing', target: 'bounced', value: 50 },
    { source: 'docs', target: 'subscribed', value: 20 },
    { source: 'docs', target: 'trial', value: 15 },
    { source: 'demo', target: 'subscribed', value: 30 },
    { source: 'demo', target: 'trial', value: 20 },
  ],
};

const SAMPLE_SANKEY_FLOW: SankeyData = {
  stages: ['Intake', 'Routing', 'Outcome'],
  nodes: [
    { id: 'direct', label: 'Direct', stage: 0 },
    { id: 'partner', label: 'Partner', stage: 0 },
    { id: 'auto', label: 'Automated', stage: 1 },
    { id: 'manual', label: 'Review', stage: 1 },
    { id: 'delivered', label: 'Delivered', stage: 2 },
    { id: 'escalated', label: 'Escalated', stage: 2 },
  ],
  links: [
    { source: 'direct', target: 'auto', value: 50 },
    { source: 'direct', target: 'manual', value: 15 },
    { source: 'partner', target: 'auto', value: 25 },
    { source: 'partner', target: 'manual', value: 20 },
    { source: 'auto', target: 'delivered', value: 65 },
    { source: 'auto', target: 'escalated', value: 10 },
    { source: 'manual', target: 'delivered', value: 20 },
    { source: 'manual', target: 'escalated', value: 15 },
  ],
};

// Size-specific Sankey datasets for Section 4 — increasing complexity per size tier
const SANKEY_SM: SankeyData = {
  stages: ['Input', 'Output'],
  nodes: [
    { id: 'web', label: 'Web', stage: 0 },
    { id: 'api', label: 'API', stage: 0 },
    { id: 'ok', label: 'Success', stage: 1 },
  ],
  links: [
    { source: 'web', target: 'ok', value: 70 },
    { source: 'api', target: 'ok', value: 30 },
  ],
};

const SANKEY_MD: SankeyData = {
  stages: ['Source', 'Process', 'Result'],
  nodes: [
    { id: 'direct', label: 'Direct', stage: 0 },
    { id: 'partner', label: 'Partner', stage: 0 },
    { id: 'auto', label: 'Automated', stage: 1 },
    { id: 'manual', label: 'Review', stage: 1 },
    { id: 'done', label: 'Delivered', stage: 2 },
    { id: 'esc', label: 'Escalated', stage: 2 },
  ],
  links: [
    { source: 'direct', target: 'auto', value: 50 },
    { source: 'direct', target: 'manual', value: 15 },
    { source: 'partner', target: 'auto', value: 25 },
    { source: 'partner', target: 'manual', value: 20 },
    { source: 'auto', target: 'done', value: 65 },
    { source: 'auto', target: 'esc', value: 10 },
    { source: 'manual', target: 'done', value: 20 },
    { source: 'manual', target: 'esc', value: 15 },
  ],
};

const SANKEY_LG: SankeyData = {
  stages: ['Acquisition', 'Triage', 'Processing', 'Outcome'],
  nodes: [
    { id: 'organic', label: 'Organic', stage: 0 },
    { id: 'paid', label: 'Paid Ads', stage: 0 },
    { id: 'referral', label: 'Referral', stage: 0 },
    { id: 'qualify', label: 'Qualified', stage: 1 },
    { id: 'discard', label: 'Discarded', stage: 1 },
    { id: 'fast', label: 'Fast Track', stage: 2 },
    { id: 'standard', label: 'Standard', stage: 2 },
    { id: 'converted', label: 'Converted', stage: 3 },
    { id: 'lost', label: 'Lost', stage: 3 },
  ],
  links: [
    { source: 'organic', target: 'qualify', value: 45 },
    { source: 'organic', target: 'discard', value: 5 },
    { source: 'paid', target: 'qualify', value: 30 },
    { source: 'paid', target: 'discard', value: 15 },
    { source: 'referral', target: 'qualify', value: 20 },
    { source: 'qualify', target: 'fast', value: 40 },
    { source: 'qualify', target: 'standard', value: 55 },
    { source: 'fast', target: 'converted', value: 38 },
    { source: 'fast', target: 'lost', value: 2 },
    { source: 'standard', target: 'converted', value: 35 },
    { source: 'standard', target: 'lost', value: 20 },
    { source: 'discard', target: 'lost', value: 20 },
  ],
};

const SANKEY_XL: SankeyData = {
  stages: ['Channel', 'Intake', 'Analysis', 'Decision', 'Resolution'],
  nodes: [
    { id: 'web', label: 'Web Portal', stage: 0 },
    { id: 'mobile', label: 'Mobile App', stage: 0 },
    { id: 'email', label: 'Email', stage: 0 },
    { id: 'chat', label: 'Live Chat', stage: 0 },
    { id: 'tier1', label: 'Tier 1', stage: 1 },
    { id: 'tier2', label: 'Tier 2', stage: 1 },
    { id: 'auto_ai', label: 'AI Engine', stage: 2 },
    { id: 'human', label: 'Analyst', stage: 2 },
    { id: 'approve', label: 'Approved', stage: 3 },
    { id: 'reject', label: 'Rejected', stage: 3 },
    { id: 'review', label: 'In Review', stage: 3 },
    { id: 'resolved', label: 'Resolved', stage: 4 },
    { id: 'pending', label: 'Pending', stage: 4 },
    { id: 'archived', label: 'Archived', stage: 4 },
  ],
  links: [
    { source: 'web', target: 'tier1', value: 40 },
    { source: 'web', target: 'tier2', value: 10 },
    { source: 'mobile', target: 'tier1', value: 30 },
    { source: 'email', target: 'tier1', value: 15 },
    { source: 'email', target: 'tier2', value: 5 },
    { source: 'chat', target: 'tier1', value: 20 },
    { source: 'tier1', target: 'auto_ai', value: 70 },
    { source: 'tier1', target: 'human', value: 35 },
    { source: 'tier2', target: 'human', value: 15 },
    { source: 'auto_ai', target: 'approve', value: 55 },
    { source: 'auto_ai', target: 'reject', value: 10 },
    { source: 'auto_ai', target: 'review', value: 5 },
    { source: 'human', target: 'approve', value: 30 },
    { source: 'human', target: 'reject', value: 8 },
    { source: 'human', target: 'review', value: 12 },
    { source: 'approve', target: 'resolved', value: 80 },
    { source: 'approve', target: 'pending', value: 5 },
    { source: 'reject', target: 'archived', value: 18 },
    { source: 'review', target: 'resolved', value: 10 },
    { source: 'review', target: 'pending', value: 7 },
  ],
};

const SANKEY_BY_SIZE: Record<string, SankeyData> = {
  sm: SANKEY_SM,
  md: SANKEY_MD,
  lg: SANKEY_LG,
  xl: SANKEY_XL,
};

// ─────────────────────────────────────────────────────────────────────────────
// Color Scheme Profiles & Definitions
// ─────────────────────────────────────────────────────────────────────────────
interface SchemeSwatch {
  label: string;
  token: string;
  hex: string;
}

interface SchemeProfile {
  id: NeuronChartColorScheme;
  nameEn: string;
  nameId: string;
  tagEn: string;
  tagId: string;
  badgeVariant: 'brand' | 'sky' | 'default' | 'purple' | 'orange';
  descEn: string;
  descId: string;
  bestForEn: string[];
  bestForId: string[];
  wcagContrast: string;
  visualToneEn: string;
  visualToneId: string;
  recommendedTypesEn: string;
  recommendedTypesId: string;
  swatches: SchemeSwatch[];
}

const SCHEME_PROFILES: SchemeProfile[] = [
  {
    id: 'brand',
    nameEn: 'Brand Monochromatic',
    nameId: 'Monokromatik Brand',
    tagEn: 'Primary Identity',
    tagId: 'Identitas Utama',
    badgeVariant: 'brand',
    descEn: 'Warm terracotta hues aligned with Neudela brand identity. Engineered for executive summaries, revenue benchmarks, and corporate storytelling.',
    descId: 'Rona terracotta hangat yang diselaraskan dengan identitas Neudela. Dirancang untuk ringkasan eksekutif, tolok ukur pendapatan, dan presentasi korporat.',
    bestForEn: ['Revenue & ARR', 'Executive Reports', 'Brand Dashboards'],
    bestForId: ['Pendapatan & ARR', 'Laporan Eksekutif', 'Dashboard Brand'],
    wcagContrast: 'AAA / AA (4.5:1+)',
    visualToneEn: 'Warm, Authoritative, Corporate, Cohesive',
    visualToneId: 'Hangat, Berwibawa, Korporat, Padu',
    recommendedTypesEn: 'Single Bar, KPI Area, Sparkline',
    recommendedTypesId: 'Bar Tunggal, Area KPI, Sparkline',
    swatches: [
      { label: 'Brand 500', token: 'var(--brand-500)', hex: '#df7e30' },
      { label: 'Brand 300', token: 'var(--brand-300)', hex: '#eab05f' },
      { label: 'Brand 700', token: 'var(--brand-700)', hex: '#a23c1b' },
      { label: 'Brand 200', token: 'var(--brand-200)', hex: '#f1ce96' },
      { label: 'Brand 600', token: 'var(--brand-600)', hex: '#c3571c' },
      { label: 'Brand 400', token: 'var(--brand-400)', hex: '#e5963a' },
      { label: 'Brand 100', token: 'var(--brand-100)', hex: '#f8ebcd' },
      { label: 'Brand 800', token: 'var(--brand-800)', hex: '#84301c' },
    ],
  },
  {
    id: 'spectrum',
    nameEn: 'Multi-Hue Spectrum',
    nameId: 'Spektrum Multi-Warna',
    tagEn: 'Categorical Default',
    tagId: 'Standar Kategorikal',
    badgeVariant: 'sky',
    descEn: 'Eight distinct, perceptually balanced chromatic hues. Guarantees maximum differentiation across multi-series datasets without hue collisions.',
    descId: 'Delapan rona kromatik berimbang secara visual. Menjamin diferensiasi optimal pada dataset multi-series tanpa konflik warna.',
    bestForEn: ['Pie & Donut', 'Multi-Series Bars', 'Category Comparison'],
    bestForId: ['Pie & Donut', 'Bar Multi-Series', 'Komparasi Kategori'],
    wcagContrast: 'AA Compliant (4.5:1+)',
    visualToneEn: 'Vibrant, Diverse, Balanced, Readable',
    visualToneId: 'Dinamis, Beragam, Seimbang, Jelas',
    recommendedTypesEn: 'Donut, Grouped Bar, Multi-Line',
    recommendedTypesId: 'Donut, Bar Berkelompok, Multi-Line',
    swatches: [
      { label: 'Brand 500', token: 'var(--brand-500)', hex: '#df7e30' },
      { label: 'Sky 500', token: 'var(--sky-500)', hex: '#0ea5e9' },
      { label: 'Emerald 500', token: 'var(--emerald-500)', hex: '#10b981' },
      { label: 'Purple 500', token: 'var(--purple-500)', hex: '#9e77ed' },
      { label: 'Amber 500', token: 'var(--amber-500)', hex: '#f59e0b' },
      { label: 'Pink 500', token: 'var(--pink-500)', hex: '#db2777' },
      { label: 'Blue 500', token: 'var(--blue-500)', hex: '#3b82f6' },
      { label: 'Red 500', token: 'var(--red-500)', hex: '#ef4444' },
    ],
  },
  {
    id: 'mono',
    nameEn: 'Slate Monochrome',
    nameId: 'Monokrom Slate',
    tagEn: 'Neutral & Secondary',
    tagId: 'Netral & Sekunder',
    badgeVariant: 'default',
    descEn: 'Understated cool slate grayscale gradation. Ideal for secondary telemetry, background reference series, dense audit logs, and clean black-and-white print exports.',
    descId: 'Gradasi grayscale slate netral yang tenang. Ideal untuk telemetri sekunder, seri referensi latar belakang, log audit, dan ekspor cetak hitam-putih.',
    bestForEn: ['Secondary Metrics', 'Print / PDF Exports', 'Audit Telemetry'],
    bestForId: ['Metrik Sekunder', 'Ekspor Cetak / PDF', 'Telemetri Audit'],
    wcagContrast: 'AAA Compliant (7:1+)',
    visualToneEn: 'Minimalist, Technical, Clean, Quiet',
    visualToneId: 'Minimalis, Teknis, Bersih, Kalem',
    recommendedTypesEn: 'Single Bar, Area Fill, Sparkline',
    recommendedTypesId: 'Bar Tunggal, Isian Area, Sparkline',
    swatches: [
      { label: 'Slate 700', token: 'var(--slate-700)', hex: '#344054' },
      { label: 'Slate 500', token: 'var(--slate-500)', hex: '#667085' },
      { label: 'Slate 400', token: 'var(--slate-400)', hex: '#98a2b3' },
      { label: 'Slate 300', token: 'var(--slate-300)', hex: '#d0d5dd' },
      { label: 'Slate 600', token: 'var(--slate-600)', hex: '#475467' },
      { label: 'Slate 200', token: 'var(--slate-200)', hex: '#e4e7ec' },
      { label: 'Slate 800', token: 'var(--slate-800)', hex: '#182230' },
      { label: 'Slate 100', token: 'var(--slate-100)', hex: '#f2f4f7' },
    ],
  },
  {
    id: 'pastel',
    nameEn: 'Soft Pastel',
    nameId: 'Pastel Lembut',
    tagEn: 'Low-Glare Analytics',
    tagId: 'Bebas Silau & Padat',
    badgeVariant: 'purple',
    descEn: 'Gentle desaturated pastel tones specifically engineered for dense analytical grids, stacked area charts, and multi-layer radar polygons without eye strain.',
    descId: 'Nuansa pastel lembut berdaya silau rendah yang dirancang khusus untuk dashboard analitik padat, stacked area, dan radar poligon multi-lapisan tanpa membuat mata lelah.',
    bestForEn: ['Stacked Area Charts', 'Radar Polygons', 'All-Day Operations'],
    bestForId: ['Grafik Stacked Area', 'Poligon Radar', 'Operasi Seharian'],
    wcagContrast: 'AA (Optimized for Text Halos)',
    visualToneEn: 'Soft, Calming, Airy, Modern',
    visualToneId: 'Lembut, Menenangkan, Lapang, Modern',
    recommendedTypesEn: 'Stacked Area, Multi-Radar, Bubble',
    recommendedTypesId: 'Stacked Area, Multi-Radar, Bubble',
    swatches: [
      { label: 'Brand 200', token: 'var(--brand-200)', hex: '#f1ce96' },
      { label: 'Sky 200', token: 'var(--sky-200)', hex: '#bae6fd' },
      { label: 'Emerald 200', token: 'var(--emerald-200)', hex: '#a7f3d0' },
      { label: 'Purple 200', token: 'var(--purple-200)', hex: '#e9d7fe' },
      { label: 'Amber 200', token: 'var(--amber-200)', hex: '#fde68a' },
      { label: 'Pink 200', token: 'var(--pink-200)', hex: '#fbcfe8' },
      { label: 'Blue 200', token: 'var(--blue-200)', hex: '#bfdbfe' },
      { label: 'Red 200', token: 'var(--red-200)', hex: '#fecaca' },
    ],
  },
  {
    id: 'vivid',
    nameEn: 'High-Contrast Vivid',
    nameId: 'Vivid Kontras Tinggi',
    tagEn: 'Alerts & Dark Mode',
    tagId: 'Alert & Mode Gelap',
    badgeVariant: 'orange',
    descEn: 'Deep saturated 600-weight jewel tones delivering maximum luminosity. Perfect for dark interfaces, threshold breaches, security alerts, and high-impact presentations.',
    descId: 'Rona pekat berbobot-600 dengan saturasi tinggi untuk luminositas maksimal. Sempurna untuk tema gelap, indikator ambang batas kritis, dan layar presentasi proyektor.',
    bestForEn: ['Dark Mode UI', 'Critical Alert Thresholds', 'Keynote Displays'],
    bestForId: ['UI Mode Gelap', 'Ambang Batas Kritis', 'Layar Keynote'],
    wcagContrast: 'AAA / AA (Enhanced Luminance)',
    visualToneEn: 'Punchy, High-Impact, Intense, Assertive',
    visualToneId: 'Tajam, Berdampak Tinggi, Kuat, Tegas',
    recommendedTypesEn: 'Line Trends, Donut Ring, Critical Bar',
    recommendedTypesId: 'Tren Garis, Cincin Donut, Bar Kritis',
    swatches: [
      { label: 'Brand 600', token: 'var(--brand-600)', hex: '#c3571c' },
      { label: 'Sky 600', token: 'var(--sky-600)', hex: '#0284c7' },
      { label: 'Emerald 600', token: 'var(--emerald-600)', hex: '#059669' },
      { label: 'Purple 600', token: 'var(--purple-600)', hex: '#7f56d9' },
      { label: 'Amber 600', token: 'var(--amber-600)', hex: '#d97706' },
      { label: 'Pink 600', token: 'var(--pink-600)', hex: '#be185d' },
      { label: 'Blue 600', token: 'var(--blue-600)', hex: '#2563eb' },
      { label: 'Red 600', token: 'var(--red-600)', hex: '#dc2626' },
    ],
  },
];

interface SizeProfile {
  id: NeuronChartSize;
  nameId: string;
  nameEn: string;
  tagId: string;
  tagEn: string;
  isDefault?: boolean;
  width: number;
  height: number;
  padding: number;
  aspectRatio: string;
  titleSize: string;
  subtitleSize: string;
  axisSize: string;
  donutCenterSize: string;
  recommendedGridId: string;
  recommendedGridEn: string;
  gridSpan: string;
  dataCapacityId: string;
  dataCapacityEn: string;
  descId: string;
  descEn: string;
  bestForId: string[];
  bestForEn: string[];
}

const SIZE_PROFILES: SizeProfile[] = [
  {
    id: 'sm',
    nameId: 'Kompak & Ringkas',
    nameEn: 'Compact Metric Widget',
    tagId: 'Kompak / Mini',
    tagEn: 'Compact / Mini',
    width: 320,
    height: 200,
    padding: 32,
    aspectRatio: '16:10',
    titleSize: '14px',
    subtitleSize: '12px',
    axisSize: '10px',
    donutCenterSize: '18px',
    recommendedGridId: '4-Kolom / Sidebar Widget (25% Lebar)',
    recommendedGridEn: '4-Column / Sidebar Widget (25% Width)',
    gridSpan: 'col-span-3 (25%)',
    dataCapacityId: 'Maks. 5–7 data points · 1–2 series · 2–3 tahap alur',
    dataCapacityEn: 'Max 5–7 data points · 1–2 series · 2–3 flow stages',
    descId: 'Dirancang untuk kartu telemetri berdensitas tinggi, panel sidebar, dan grid 4-kolom. Mengutamakan pemindaian instan dengan label esensial tanpa membuat antarmuka terasa sesak.',
    descEn: 'Engineered for dense telemetry cards, sidebar panels, and 4-column widgets. Prioritizes rapid at-a-glance scanning with essential labels and minimal visual overhead.',
    bestForId: ['Widget KPI', 'Panel Sidebar', 'Grid Multi-Kartu', 'Alternatif Sparkline'],
    bestForEn: ['KPI Widgets', 'Sidebar Panels', 'Multi-Card Grids', 'Sparkline Alt'],
  },
  {
    id: 'md',
    nameId: 'Standar Enterprise (Default)',
    nameEn: 'Standard Analytics (Default)',
    tagId: 'Standar / Default',
    tagEn: 'Standard / Default',
    isDefault: true,
    width: 480,
    height: 300,
    padding: 40,
    aspectRatio: '16:10',
    titleSize: '16px',
    subtitleSize: '13px',
    axisSize: '10px',
    donutCenterSize: '20px',
    recommendedGridId: '2-Kolom Split Grid (50% Lebar)',
    recommendedGridEn: '2-Column Split Grid (50% Width)',
    gridSpan: 'col-span-6 (50%)',
    dataCapacityId: '7–12 data points · 2–3 series · 3 tahap alur',
    dataCapacityEn: '7–12 data points · 2–3 series · 3 flow stages',
    descId: 'Ukuran acuan Neudela untuk visualisasi analitik harian. Memberikan proporsi ideal antara ruang grafik, label sumbu, legenda, dan tooltip interaktif pada dashboard modern.',
    descEn: 'The baseline standard for daily enterprise analytics. Delivers the ideal balance between canvas surface, axis readability, legends, and rich interactive tooltips.',
    bestForId: ['Dashboard Split 2-Kolom', 'Dialog Modal', 'Tren Bulanan', 'Analisis Komparatif'],
    bestForEn: ['Split 2-Col Dashboards', 'Modal Dialogs', 'Monthly Trends', 'Comparative Analysis'],
  },
  {
    id: 'lg',
    nameId: 'Ekspansif Bagian Utama',
    nameEn: 'Expanded Section Focus',
    tagId: 'Ekspansif / Bagian Utama',
    tagEn: 'Expanded / Section',
    width: 640,
    height: 400,
    padding: 48,
    aspectRatio: '16:10',
    titleSize: '18px',
    subtitleSize: '14px',
    axisSize: '11px',
    donutCenterSize: '24px',
    recommendedGridId: '1-Kolom / Fokus Bagian Utama (75–100%)',
    recommendedGridEn: '1-Column / Main Section Focus (75–100%)',
    gridSpan: 'col-span-12 (75–100%)',
    dataCapacityId: '12–18 data points · 3–5 series · 4–5 tahap alur',
    dataCapacityEn: '12–18 data points · 3–5 series · 4–5 flow stages',
    descId: 'Dioptimalkan untuk tab analitik primer dan eksplorasi data mendalam. Mampu menyajikan kurva multi-series, stacked bar komparatif, dan time-series rapat dengan kejelasan tinggi.',
    descEn: 'Optimized for primary analytics sections and deep analytical exploration. Comfortably accommodates multi-series curves, stacked comparative bars, and dense time series.',
    bestForId: ['Tab Analitik Utama', 'Komparasi Multi-Series', 'Proyeksi Pendapatan Tahunan', 'Laporan Drill-down'],
    bestForEn: ['Primary Analytics Tabs', 'Multi-Series Comparisons', 'Annual Revenue Forecast', 'Drill-down Reports'],
  },
  {
    id: 'xl',
    nameId: 'Command Center & Hero Eksekutif',
    nameEn: 'Executive Command Center',
    tagId: 'Eksekutif / Layar Penuh',
    tagEn: 'Executive / Hero',
    width: 800,
    height: 500,
    padding: 56,
    aspectRatio: '16:10',
    titleSize: '20px',
    subtitleSize: '14px',
    axisSize: '12px',
    donutCenterSize: '28px',
    recommendedGridId: 'Hero Viewport / Layar Penuh (100% Canvas)',
    recommendedGridEn: 'Hero Viewport / Fullscreen (100% Canvas)',
    gridSpan: 'col-span-12 (100% Hero)',
    dataCapacityId: '16–30 data points · 4–6 series · Alur multi-tahap penuh',
    dataCapacityEn: '16–30 data points · 4–6 series · Full multi-stage journey',
    descId: 'Dirancang khusus untuk layar presentasi dewan direksi, control room 4K, dan narasi data layar penuh. Menonjolkan nilai pusat donut besar (28px) dan tipografi impresif.',
    descEn: 'Engineered for executive boardrooms, 4K control rooms, and fullscreen data storytelling. Features prominent typography, expanded 28px donut center values, and maximum visual punch.',
    bestForId: ['Command Center Eksekutif', 'Presentasi Keynote', 'Tampilan Kinerja Hero', 'Audit Densitas Tinggi'],
    bestForEn: ['Executive Command Center', 'Keynote Presentations', 'Hero Performance Canvas', 'High-Density Audits'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ChartView({ setActiveTab }: { setActiveTab: (tabId: string) => void }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'bar' | 'line' | 'pie' | 'radar' | 'sparkline' | 'sankey'>('all');

  // Section 3: Color Scheme Gallery state
  const [schemeChartType, setSchemeChartType] = useState<'bar' | 'line' | 'donut' | 'radar' | 'sankey'>('bar');
  const [copiedSchemeCode, setCopiedSchemeCode] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopyText = (text: string, type: 'scheme' | 'token') => {
    navigator.clipboard.writeText(text);
    if (type === 'scheme') {
      setCopiedSchemeCode(text);
      setTimeout(() => setCopiedSchemeCode(null), 2000);
    } else {
      setCopiedToken(text);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  // Section 4: Size Matrix state
  const [sizeInspectSize, setSizeInspectSize] = useState<NeuronChartSize>('md');
  const [sizeInspectChartType, setSizeInspectChartType] = useState<'line' | 'bar' | 'donut' | 'radar' | 'sankey'>('line');
  const [sizeConstrainWidth, setSizeConstrainWidth] = useState<boolean>(true);
  const [sizeViewMode, setSizeViewMode] = useState<'stage' | 'all'>('stage');
  const [copiedSizeCode, setCopiedSizeCode] = useState<string | null>(null);

  const handleCopySize = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSizeCode(text);
    setTimeout(() => setCopiedSizeCode(null), 2000);
  };

  // Playground state
  const [pgType, setPgType] = useState<NeuronChartType>('bar');
  const [pgSize, setPgSize] = useState<NeuronChartSize>('md');
  const [pgColorScheme, setPgColorScheme] = useState<NeuronChartColorScheme>('spectrum');
  const [pgOrientation, setPgOrientation] = useState<NeuronChartOrientation>('vertical');
  const [pgSmooth, setPgSmooth] = useState(true);
  const [pgShowArea, setPgShowArea] = useState(false);
  const [pgShowDots, setPgShowDots] = useState(true);
  const [pgShowGrid, setPgShowGrid] = useState(true);
  const [pgShowLegend, setPgShowLegend] = useState(true);
  const [pgShowTooltip, setPgShowTooltip] = useState(true);
  const [pgShowLabels, setPgShowLabels] = useState(false);
  const [pgAnimated, setPgAnimated] = useState(true);
  const [pgStacked, setPgStacked] = useState(false);
  const [pgInnerRadius, setPgInnerRadius] = useState(0.55);
  const [copiedCode, setCopiedCode] = useState(false);
  const [pgCodeTab, setPgCodeTab] = useState<'react' | 'vue' | 'html' | 'json'>('react');

  // Playground data based on type
  const getPlaygroundData = () => {
    switch (pgType) {
      case 'bar': return { data: SAMPLE_BAR_DATA };
      case 'line': return { data: SAMPLE_LINE_DATA };
      case 'pie': return { data: SAMPLE_PIE_DATA };
      case 'donut': return { data: SAMPLE_PIE_DATA };
      case 'radar': return { data: SAMPLE_RADAR_DATA };
      case 'sparkline': return { data: SAMPLE_SPARKLINE_DATA };
      case 'sankey': return { data: [], sankeyData: SANKEY_BY_SIZE[pgSize] || SAMPLE_SANKEY_GOVERNANCE };
      default: return { data: SAMPLE_BAR_DATA };
    }
  };

  // Reset all playground settings to defaults
  const handleResetPlayground = () => {
    setPgType('bar');
    setPgSize('md');
    setPgColorScheme('spectrum');
    setPgOrientation('vertical');
    setPgSmooth(true);
    setPgShowArea(false);
    setPgShowDots(true);
    setPgShowGrid(true);
    setPgShowLegend(true);
    setPgShowTooltip(true);
    setPgShowLabels(false);
    setPgAnimated(true);
    setPgStacked(false);
    setPgInnerRadius(0.55);
  };

  // Code generation
  const generateCode = () => {
    if (pgCodeTab === 'json') {
      const configObj: Record<string, any> = {
        type: pgType,
        size: pgSize,
        colorScheme: pgColorScheme,
      };
      if (pgType === 'bar') {
        configObj.orientation = pgOrientation;
        if (pgStacked) configObj.stacked = true;
      }
      if (pgType === 'line') {
        configObj.smooth = pgSmooth;
        configObj.showArea = pgShowArea;
        configObj.showDots = pgShowDots;
      }
      if (pgType === 'donut') {
        configObj.innerRadius = pgInnerRadius;
      }
      configObj.showGrid = pgShowGrid;
      configObj.showLegend = pgShowLegend;
      configObj.showTooltip = pgShowTooltip;
      configObj.showLabels = pgShowLabels;
      configObj.animated = pgAnimated;
      if (pgType === 'sankey') {
        configObj.sankeyData = SANKEY_BY_SIZE[pgSize] || SAMPLE_SANKEY_GOVERNANCE;
      } else {
        configObj.data = getPlaygroundData().data;
      }
      return JSON.stringify(configObj, null, 2);
    }

    if (pgCodeTab === 'vue') {
      if (pgType === 'sankey') {
        return `<template>
  <NeuronChart
    type="sankey"
    :sankey-data="sankeyData"
    size="${pgSize}"
    :animated="${pgAnimated}"
  />
</template>

<script setup lang="ts">
import { NeuronChart } from '@neudela/vue';
</script>`;
      }
      const pd = getPlaygroundData().data;
      const vueLines = [`type="${pgType}"`];
      if (pgType === 'bar' && pgOrientation !== 'vertical') vueLines.push(`orientation="${pgOrientation}"`);
      if (pgType === 'bar' && pgStacked) vueLines.push(`stacked`);
      if (pgType === 'line' && !pgSmooth) vueLines.push(`:smooth="false"`);
      if (pgType === 'line' && pgShowArea) vueLines.push(`show-area`);
      if (pgType === 'line' && !pgShowDots) vueLines.push(`:show-dots="false"`);
      if (pgType === 'donut') vueLines.push(`:inner-radius="${pgInnerRadius}"`);
      if (pgSize !== 'md') vueLines.push(`size="${pgSize}"`);
      if (pgColorScheme !== 'spectrum') vueLines.push(`color-scheme="${pgColorScheme}"`);
      if (!pgShowGrid) vueLines.push(`:show-grid="false"`);
      if (!pgShowLegend) vueLines.push(`:show-legend="false"`);
      if (!pgShowTooltip) vueLines.push(`:show-tooltip="false"`);
      if (pgShowLabels) vueLines.push(`show-labels`);
      if (!pgAnimated) vueLines.push(`:animated="false"`);
      vueLines.push(`:data="chartData"`);

      return `<template>
  <NeuronChart
    ${vueLines.join('\n    ')}
  />
</template>

<script setup lang="ts">
import { NeuronChart } from '@neudela/vue';

const chartData = ${JSON.stringify(pd, null, 2).replace(/\n/g, '\n')};
</script>`;
    }

    if (pgCodeTab === 'html') {
      const pd = getPlaygroundData().data;
      return `<!-- Neudela Chart (${pgType}, ${pgSize}, ${pgColorScheme}) -->
<div class="neuron-chart neuron-chart--${pgType} neuron-chart--${pgSize} neuron-chart--${pgColorScheme}" role="region" aria-label="${pgType} chart preview">
  <div class="neuron-chart__canvas">
    <svg viewBox="0 0 500 240" class="neuron-chart__svg" style="width: 100%; height: auto;">
      ${pgShowGrid ? '<line x1="40" y1="40" x2="480" y2="40" stroke="var(--color-border)" stroke-dasharray="3 3"/>\n      <line x1="40" y1="120" x2="480" y2="120" stroke="var(--color-border)" stroke-dasharray="3 3"/>\n      <line x1="40" y1="200" x2="480" y2="200" stroke="var(--color-border)"/>' : '<line x1="40" y1="200" x2="480" y2="200" stroke="var(--color-border)"/>'}
      <!-- Data Elements -->
      ${pd.slice(0, 6).map((d, i) => {
        const x = 60 + i * 70;
        const h = Math.max(10, Math.min(150, (d.value / 100) * 140));
        return `<rect x="${x}" y="${200 - h}" width="32" height="${h}" rx="4" fill="var(--color-primary)"/>`;
      }).join('\n      ')}
    </svg>
  </div>${pgShowLegend ? `\n  <div class="neuron-chart__legend">\n    ${pd.slice(0, 4).map(d => `<span class="neuron-chart__legend-item"><span class="neuron-chart__dot"></span>${d.label}</span>`).join('\n    ')}\n  </div>` : ''}
</div>`;
    }

    if (pgType === 'sankey') {
      return `<NeuronChart\n  type="sankey"\n  sankeyData={SANKEY_DATA}\n  size="${pgSize}"\n  animated={${pgAnimated}}\n/>`;
    }
    const lines = [`<NeuronChart`, `  type="${pgType}"`];
    if (pgType === 'bar' && pgOrientation !== 'vertical') lines.push(`  orientation="${pgOrientation}"`);
    if (pgType === 'bar' && pgStacked) lines.push(`  stacked`);
    if (pgType === 'line' && !pgSmooth) lines.push(`  smooth={false}`);
    if (pgType === 'line' && pgShowArea) lines.push(`  showArea`);
    if (pgType === 'line' && !pgShowDots) lines.push(`  showDots={false}`);
    if (pgType === 'donut') lines.push(`  innerRadius={${pgInnerRadius}}`);
    if (pgSize !== 'md') lines.push(`  size="${pgSize}"`);
    if (pgColorScheme !== 'spectrum') lines.push(`  colorScheme="${pgColorScheme}"`);
    if (!pgShowGrid) lines.push(`  showGrid={false}`);
    if (!pgShowLegend) lines.push(`  showLegend={false}`);
    if (!pgShowTooltip) lines.push(`  showTooltip={false}`);
    if (pgShowLabels) lines.push(`  showLabels`);
    if (!pgAnimated) lines.push(`  animated={false}`);
    lines.push(`  data={[`);
    const pd = getPlaygroundData().data;
    pd.forEach((d, i) => {
      lines.push(`    { label: '${d.label}', value: ${d.value} }${i < pd.length - 1 ? ',' : ''}`);
    });
    lines.push(`  ]}`);
    lines.push(`/>`);
    return lines.join('\n');
  };

  const generatedCode = generateCode();

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ─── GUIDELINE TAB ────────────────────────────────────────────────────────
  const renderGuideline = () => (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      {/* 1. Overview & Design Pillars */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '1. Ikhtisar & Pilar Desain' : '1. Overview & Design Pillars'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronChart dirancang untuk menyajikan visualisasi data yang jernih, semantik, dan aksesibel — dibangun sepenuhnya dari SVG tanpa library eksternal.'
            : 'NeuronChart is designed for clear, semantic, and accessible data visualization — built entirely from SVG without external libraries.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Eye size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Kejelasan Data' : 'Data Clarity'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Setiap elemen visual harus melayani fungsi informatif tanpa noise yang mengganggu pembacaan data.'
                : 'Every visual element must serve an informative purpose without noise that disrupts data readability.'}
            </p>
          </div>

          <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Warna Semantik' : 'Semantic Coloring'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Palet warna konsisten dengan design token Neudela untuk menjaga identitas brand di seluruh chart.'
                : 'Color palettes align with Neudela design tokens to maintain brand identity across all charts.'}
            </p>
          </div>

          <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Aksesibilitas' : 'Accessibility First'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Rasio kontras memadai, label ARIA otomatis, dan pattern fallback untuk semua pengguna.'
                : 'Adequate contrast ratios, automatic ARIA labels, and pattern fallbacks for all users.'}
            </p>
          </div>

          <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Responsif' : 'Responsive by Default'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {isId
                ? 'Chart menggunakan SVG viewBox untuk scaling otomatis di semua ukuran layar tanpa distorsi.'
                : 'Charts use SVG viewBox for automatic scaling across all screen sizes without distortion.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Chart Type & Variant Gallery */}
      <div className="section-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <div>
            <h2 className="section-title" style={{ margin: '0 0 var(--space-1) 0' }}>
              {isId ? '2. Galeri Tipe & Varian Chart' : '2. Chart Type & Variant Gallery'}
            </h2>
            <p className="section-description" style={{ margin: 0 }}>
              {isId
                ? 'Koleksi lengkap 16 varian representasi visual data NeuronChart — dari kolom & bar horizontal, multi-series berkelompok & bertumpuk, kurva area temporal, donat metrik pusat, radar kapabilitas, mikro-sparkline kartu KPI, hingga diagram Sankey alur proses multi-tahap.'
                : 'Comprehensive collection of 16 interactive NeuronChart visual variants — from columns & horizontal bars, grouped & stacked series, smooth area curves, center KPI donuts, radar capability matrices, executive KPI sparklines, to multi-stage Sankey process flows.'}
            </p>
          </div>
          <NeuronBadge variant="brand" size="sm">
            {isId ? '16 Varian Tersedia' : '16 Variants Available'}
          </NeuronBadge>
        </div>

        {/* Filter Tabs using NeuronTabBar */}
        <div style={{ margin: 'var(--space-6) 0 var(--space-6)' }}>
          <NeuronTabBar
            variant="segment"
            size="md"
            value={galleryFilter}
            onChange={(id) => setGalleryFilter(id as any)}
            items={[
              { id: 'all', label: isId ? 'Semua Varian' : 'All Variants', badge: 16, icon: <LayoutGrid size={15} /> },
              { id: 'bar', label: isId ? 'Bar & Kolom' : 'Bar & Column', badge: 4, icon: <BarChart3 size={15} /> },
              { id: 'line', label: isId ? 'Garis & Area' : 'Line & Area', badge: 3, icon: <LineChartIcon size={15} /> },
              { id: 'pie', label: isId ? 'Pie & Donat' : 'Pie & Donut', badge: 3, icon: <PieChartIcon size={15} /> },
              { id: 'radar', label: isId ? 'Radar Multi-Aksis' : 'Radar Multi-Axis', badge: 2, icon: <Radar size={15} /> },
              { id: 'sparkline', label: isId ? 'Sparkline & KPI' : 'Sparkline & KPI', badge: 2, icon: <Activity size={15} /> },
              { id: 'sankey', label: isId ? 'Sankey & Alur' : 'Sankey & Flow', badge: 2, icon: <Workflow size={15} /> },
            ]}
            renderPanels={false}
          />
        </div>

        {/* Gallery Cards Grid */}
        <div
          key={galleryFilter}
          className="chart-gallery-fade-in"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}
        >
          {([
            {
              id: 'vertical-bar',
              family: 'bar' as const,
              familyLabel: isId ? 'Keluarga Bar' : 'Bar Family',
              title: isId ? 'Kolom Vertikal Standar' : 'Standard Vertical Column',
              badgeText: 'Vertical',
              badgeVariant: 'brand' as const,
              icon: <BarChart3 size={16} />,
              description: isId
                ? 'Format paling intuitif untuk membandingkan metrik diskret antar urutan waktu atau kategori berkala.'
                : 'Standard format for comparing discrete metrics across sequential time periods or distinct categories.',
              codeSnippet: 'type="bar" orientation="vertical"',
              useCase: isId ? 'Tren metrik bulanan' : 'Monthly metric trends',
              renderChart: () => (
                <NeuronChart type="bar" data={SAMPLE_BAR_DATA} size="sm" colorScheme="spectrum" showLegend={false} title="" />
              ),
            },
            {
              id: 'horizontal-bar',
              family: 'bar' as const,
              familyLabel: isId ? 'Keluarga Bar' : 'Bar Family',
              title: isId ? 'Bar Horizontal (Rankings)' : 'Horizontal Bar (Rankings)',
              badgeText: 'Horizontal',
              badgeVariant: 'info' as const,
              icon: <BarChart3 size={16} style={{ transform: 'rotate(90deg)' }} />,
              description: isId
                ? 'Orientasi horizontal memberi ruang optimal bagi label kategori berteks panjang dan perankingan skor.'
                : 'Horizontal orientation provides ample room for long category strings and ranked leaderboards.',
              codeSnippet: 'type="bar" orientation="horizontal"',
              useCase: isId ? 'Perankingan & survei kanal' : 'Rankings & channel surveys',
              renderChart: () => (
                <NeuronChart type="bar" orientation="horizontal" data={SAMPLE_HORIZONTAL_BAR_DATA} size="sm" colorScheme="spectrum" showLegend={false} />
              ),
            },
            {
              id: 'grouped-bar',
              family: 'bar' as const,
              familyLabel: isId ? 'Keluarga Bar' : 'Bar Family',
              title: isId ? 'Bar Terkelompok (Multi-Series)' : 'Grouped Bar (Multi-Series)',
              badgeText: 'Grouped',
              badgeVariant: 'brand' as const,
              icon: <Layers size={16} />,
              description: isId
                ? 'Membandingkan dua metrik atau lebih secara berdampingan dalam setiap segmen kuartal (Realisasi vs Target).'
                : 'Compares multiple metrics side-by-side in each quarter bucket (Actual vs Target performance).',
              codeSnippet: 'series={[...]} categories={...}',
              useCase: isId ? 'Target vs Realisasi Kuartal' : 'Target vs Actual Quarters',
              renderChart: () => (
                <NeuronChart type="bar" series={SAMPLE_GROUPED_SERIES} categories={SAMPLE_QUARTER_CATEGORIES} size="sm" colorScheme="spectrum" showLegend />
              ),
            },
            {
              id: 'stacked-bar',
              family: 'bar' as const,
              familyLabel: isId ? 'Keluarga Bar' : 'Bar Family',
              title: isId ? 'Bar Bertumpuk (Part-to-Whole)' : 'Stacked Bar (Part-to-Whole)',
              badgeText: 'Stacked',
              badgeVariant: 'warning' as const,
              icon: <Layers size={16} />,
              description: isId
                ? 'Menampilkan akumulasi nilai total sekaligus rincian segmen internal seperti perangkat desktop, mobile, & tablet.'
                : 'Displays total aggregated volume along with individual segment breakdowns (Desktop, Mobile, Tablet).',
              codeSnippet: 'type="bar" stacked series={[...]}',
              useCase: isId ? 'Dekomposisi segmen traffic' : 'Device traffic breakdown',
              renderChart: () => (
                <NeuronChart type="bar" series={SAMPLE_STACKED_SERIES} categories={SAMPLE_QUARTER_CATEGORIES} stacked size="sm" colorScheme="spectrum" showLegend />
              ),
            },
            {
              id: 'smooth-area',
              family: 'line' as const,
              familyLabel: isId ? 'Keluarga Garis' : 'Line Family',
              title: isId ? 'Garis Area Halus (Smooth Area)' : 'Smooth Area Line',
              badgeText: 'Curved + Area',
              badgeVariant: 'brand' as const,
              icon: <LineChartIcon size={16} />,
              description: isId
                ? 'Interpolasi kurva bezier halus dengan isian gradien di bawah kurva untuk menekankan akumulasi volume tren temporal.'
                : 'Smooth bezier interpolation with soft gradient fill below the curve emphasizing temporal volume trends.',
              codeSnippet: 'type="line" smooth showArea showDots',
              useCase: isId ? 'Volume trafik aktif mingguan' : 'Weekly active traffic volume',
              renderChart: () => (
                <NeuronChart type="line" data={SAMPLE_LINE_DATA} size="sm" colorScheme="brand" smooth showArea showDots showLegend={false} />
              ),
            },
            {
              id: 'multi-line',
              family: 'line' as const,
              familyLabel: isId ? 'Keluarga Garis' : 'Line Family',
              title: isId ? 'Garis Multi-Metrik (Multi-Line)' : 'Comparative Multi-Line',
              badgeText: 'Comparative',
              badgeVariant: 'info' as const,
              icon: <LineChartIcon size={16} />,
              description: isId
                ? 'Melacak korelasi dan dinamika pergerakan dua garis kontinu (Pendapatan Kotor vs Beban Operasional).'
                : 'Tracks simultaneous progression of multiple continuous time series (Gross Revenue vs Operating Cost).',
              codeSnippet: 'series={[...]} categories={[...]}',
              useCase: isId ? 'Korelasi finansial multi-metrik' : 'Financial multi-metric correlation',
              renderChart: () => (
                <NeuronChart type="line" series={SAMPLE_MULTI_LINE_SERIES} categories={SAMPLE_MONTH_CATEGORIES} size="sm" colorScheme="spectrum" smooth showDots showLegend />
              ),
            },
            {
              id: 'linear-line',
              family: 'line' as const,
              familyLabel: isId ? 'Keluarga Garis' : 'Line Family',
              title: isId ? 'Garis Linear Presisi (Linear Line)' : 'Straight / Linear Line',
              badgeText: 'Linear',
              badgeVariant: 'default' as const,
              icon: <Activity size={16} />,
              description: isId
                ? 'Segmen garis lurus tegas tanpa interpolasi kurva untuk menjaga ketepatan data diskret atau log telemetri server.'
                : 'Crisp straight-line segments without bezier curves to preserve precision for telemetry or server latency.',
              codeSnippet: 'type="line" smooth={false} showDots',
              useCase: isId ? 'Telemetri & latensi server' : 'Telemetry & latency logs',
              renderChart: () => (
                <NeuronChart type="line" data={SAMPLE_LINEAR_DATA} size="sm" colorScheme="vivid" smooth={false} showDots showGrid showLegend={false} />
              ),
            },
            {
              id: 'classic-pie',
              family: 'pie' as const,
              familyLabel: isId ? 'Keluarga Melingkar' : 'Circular Family',
              title: isId ? 'Diagram Lingkaran (Classic Pie)' : 'Classic Pie Chart',
              badgeText: 'Proportions',
              badgeVariant: 'success' as const,
              icon: <PieChartIcon size={16} />,
              description: isId
                ? 'Format klasik representasi proporsi bagian terhadap keseluruhan untuk pembagian kategori hingga 5 segmen.'
                : 'Classic part-to-whole slice proportioning, recommended for datasets with up to 5 slices.',
              codeSnippet: 'type="pie" showLabels',
              useCase: isId ? 'Pangsa pasar peramban (≤5 segmen)' : 'Browser market share (≤5 slices)',
              renderChart: () => (
                <NeuronChart type="pie" data={SAMPLE_PIE_DATA} size="sm" colorScheme="spectrum" showLabels />
              ),
            },
            {
              id: 'kpi-donut',
              family: 'pie' as const,
              familyLabel: isId ? 'Keluarga Melingkar' : 'Circular Family',
              title: isId ? 'Donat Metrik Pusat (KPI Donut)' : 'Donut with Center Metric',
              badgeText: 'Hollow 55%',
              badgeVariant: 'brand' as const,
              icon: <PieChartIcon size={16} />,
              description: isId
                ? 'Rongga tengah donat berdiameter 55% yang bersih menampilkan akumulasi total (100) dan rasio alokasi departemen.'
                : 'Clean 55% inner diameter donut ring prominently displaying the cumulative total (100) at its core.',
              codeSnippet: 'type="donut" innerRadius={0.55} showLabels',
              useCase: isId ? 'Alokasi anggaran departemen' : 'Departmental budget breakdown',
              renderChart: () => (
                <NeuronChart type="donut" data={SAMPLE_DONUT_BUDGET} size="sm" colorScheme="spectrum" innerRadius={0.55} showLabels />
              ),
            },
            {
              id: 'thin-ring',
              family: 'pie' as const,
              familyLabel: isId ? 'Keluarga Melingkar' : 'Circular Family',
              title: isId ? 'Cincin Donat Tipis (Thin Ring)' : 'Thin Ring Progress Donut',
              badgeText: 'Inner 75%',
              badgeVariant: 'purple' as const,
              icon: <PieChartIcon size={16} />,
              description: isId
                ? 'Profil cincin tipis modern dengan rongga 75% yang hemat ruang visual, cocok untuk alokasi storage & kuota.'
                : 'Modern minimalist thin ring with 75% inner void, ideal for storage quotas and compact gauge displays.',
              codeSnippet: 'type="donut" innerRadius={0.75} colorScheme="vivid"',
              useCase: isId ? 'Distribusi kuota penyimpanan cloud' : 'Cloud storage & quota distribution',
              renderChart: () => (
                <NeuronChart type="donut" data={SAMPLE_RING_STORAGE} size="sm" colorScheme="vivid" innerRadius={0.75} showLabels />
              ),
            },
            {
              id: 'radar-matrix',
              family: 'radar' as const,
              familyLabel: isId ? 'Keluarga Radar' : 'Radar Family',
              title: isId ? 'Radar Matriks Performa (Matrix)' : 'Radar Performance Matrix',
              badgeText: '6-Axis Matrix',
              badgeVariant: 'warning' as const,
              icon: <Radar size={16} />,
              description: isId
                ? 'Evaluasi kapabilitas multi-dimensi seimbang untuk penilaian kompetensi atau kekuatan fitur produk.'
                : 'Multi-dimensional balanced capability matrix for skill or product evaluation across 6 axes.',
              codeSnippet: 'type="radar" colorScheme="brand"',
              useCase: isId ? 'Skor fitur produk & kapabilitas' : 'Feature capability scoring',
              renderChart: () => (
                <NeuronChart type="radar" data={SAMPLE_RADAR_DATA} size="sm" colorScheme="brand" />
              ),
            },
            {
              id: 'system-radar',
              family: 'radar' as const,
              familyLabel: isId ? 'Keluarga Radar' : 'Radar Family',
              title: isId ? 'Radar Keandalan Sistem (Health)' : 'System Architecture Radar',
              badgeText: '5-Axis System',
              badgeVariant: 'info' as const,
              icon: <Radar size={16} />,
              description: isId
                ? 'Pemetaan 5 pilar kesehatan infrastruktur mencakup uptime, throughput, keamanan, latensi, dan toleransi gangguan.'
                : 'Mapping 5 infrastructure health pillars spanning uptime, throughput, security, latency, and fault tolerance.',
              codeSnippet: 'type="radar" colorScheme="vivid"',
              useCase: isId ? 'Audit reliabilitas infrastruktur' : 'Infrastructure reliability audits',
              renderChart: () => (
                <NeuronChart type="radar" data={SAMPLE_RADAR_SYSTEM} size="sm" colorScheme="vivid" />
              ),
            },
            {
              id: 'micro-sparkline',
              family: 'sparkline' as const,
              familyLabel: isId ? 'Keluarga Sparkline' : 'Sparkline Family',
              title: isId ? 'Sparkline Mikro Inline (Micro)' : 'Micro Inline Sparklines',
              badgeText: 'Micro Inline',
              badgeVariant: 'brand' as const,
              icon: <Activity size={16} />,
              description: isId
                ? 'Grafik mini bebas label sumbu yang hemat ruang visual untuk disematkan langsung di dalam sel tabel atau baris status.'
                : 'Axis-free mini charts designed for inline embedding within table cells, list items, or status rows.',
              codeSnippet: '<NeuronChart type="sparkline" smooth showArea />',
              useCase: isId ? 'Baris tabel & status metrik' : 'Table rows & status metrics',
              renderChart: () => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%', maxWidth: 340 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Revenue Flow</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>$128.4K</div>
                    </div>
                    <NeuronChart type="sparkline" data={SAMPLE_SPARKLINE_DATA} colorScheme="brand" smooth showArea />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>+12.4%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Active Users</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>42,910</div>
                    </div>
                    <NeuronChart type="sparkline" data={SAMPLE_SPARKLINE_UP} colorScheme="spectrum" smooth showArea />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>+8.2%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>API Latency</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>28.4 ms</div>
                    </div>
                    <NeuronChart type="sparkline" data={SAMPLE_SPARKLINE_DOWN} colorScheme="vivid" smooth showArea />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>-15.3%</span>
                  </div>
                </div>
              ),
            },
            {
              id: 'kpi-stat-cards',
              family: 'sparkline' as const,
              familyLabel: isId ? 'Keluarga Sparkline' : 'Sparkline Family',
              title: isId ? 'Kartu KPI Dasbor (KPI Cards)' : 'Executive KPI Stat Cards',
              badgeText: 'Dashboard',
              badgeVariant: 'success' as const,
              icon: <TrendingUp size={16} />,
              description: isId
                ? 'Pola kartu ringkasan KPI eksekutif modern yang menggabungkan angka metrik utama, badge delta pertumbuhan, dan kurva tren.'
                : 'Modern executive KPI summary pattern uniting primary numbers, growth delta badges, and trend sparklines.',
              codeSnippet: 'Card + Metric + <NeuronChart type="sparkline" />',
              useCase: isId ? 'Kartu ringkasan dasbor eksekutif' : 'Dashboard KPI executive tiles',
              renderChart: () => (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', width: '100%', maxWidth: 340 }}>
                  <div style={{
                    padding: 'var(--space-3)',
                    background: 'var(--color-bg-subtle)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>MRR</span>
                      <NeuronBadge size="xs" variant="success">+16.8%</NeuronBadge>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                      $54,290
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                      <NeuronChart type="sparkline" data={SAMPLE_SPARKLINE_UP} colorScheme="brand" smooth showArea />
                    </div>
                  </div>
                  <div style={{
                    padding: 'var(--space-3)',
                    background: 'var(--color-bg-subtle)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Signups</span>
                      <NeuronBadge size="xs" variant="success">+22.4%</NeuronBadge>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                      1,840
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                      <NeuronChart type="sparkline" data={SAMPLE_SPARKLINE_DATA} colorScheme="spectrum" smooth showArea />
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'sankey-governance',
              family: 'sankey' as const,
              familyLabel: isId ? 'Keluarga Sankey & Alur' : 'Sankey & Flow Family',
              title: isId ? 'Alur Tata Kelola Multi-Tahap (Intake → Governance → Outcome)' : 'Process Governance Flow (Intake → Governance → Outcome)',
              badgeText: '3-Stage Flow',
              badgeVariant: 'brand' as const,
              icon: <Workflow size={16} />,
              description: isId
                ? 'Diagram alur multi-tahap dengan pita kurva Bezier proporsional untuk memetakan transformasi volume dari masukan intake hingga hasil akhir outcome.'
                : 'Multi-stage flow diagram with proportional cubic Bezier ribbons mapping volume distribution from initial intake through final outcomes.',
              codeSnippet: 'type="sankey" sankeyData={SAMPLE_SANKEY_GOVERNANCE} size="lg"',
              useCase: isId ? 'Audit pipeline, triage permintaan, & lifecycle proses' : 'Pipeline audit, request triage, & process lifecycle',
              renderChart: () => (
                <NeuronChart
                  type="sankey"
                  sankeyData={SAMPLE_SANKEY_GOVERNANCE}
                  size="lg"
                  showLegend={false}
                />
              ),
            },
            {
              id: 'sankey-journey',
              family: 'sankey' as const,
              familyLabel: isId ? 'Keluarga Sankey & Alur' : 'Sankey & Flow Family',
              title: isId ? 'Funnel Konversi & Customer Journey' : 'Conversion Funnel & Customer Journey',
              badgeText: 'User Journey',
              badgeVariant: 'info' as const,
              icon: <Workflow size={16} />,
              description: isId
                ? 'Memvisualisasikan jalur perpindahan pengunjung web dari akuisisi kanal hingga titik konversi langganan atau churn drop-off.'
                : 'Visualizes web visitor pathways from acquisition channels to subscription conversion or churn drop-offs.',
              codeSnippet: 'type="sankey" sankeyData={SAMPLE_SANKEY_JOURNEY} size="lg"',
              useCase: isId ? 'Analisis retensi, churn, & alur konversi pengguna' : 'Retention analysis, churn, & user conversion paths',
              renderChart: () => (
                <NeuronChart
                  type="sankey"
                  sankeyData={SAMPLE_SANKEY_JOURNEY}
                  size="lg"
                  showLegend={false}
                />
              ),
            },
          ])
            .filter(v => galleryFilter === 'all' || v.family === galleryFilter)
            .map(variant => (
              <div
                key={variant.id}
                style={{
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all 0.2s ease',
                  gridColumn: variant.family === 'sankey' ? '1 / -1' : undefined,
                }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(178, 94, 64, 0.1)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {variant.icon}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {variant.title}
                      </h3>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        {variant.familyLabel}
                      </span>
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant={variant.badgeVariant}>{variant.badgeText}</NeuronBadge>
                </div>

                {/* Description */}
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5, minHeight: '36px' }}>
                  {variant.description}
                </p>

                {/* Chart Container */}
                <div
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                    overflow: 'hidden',
                  }}
                >
                  {variant.renderChart()}
                </div>

                {/* Props Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 'var(--space-2)',
                    borderTop: '1px solid var(--color-border)',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                    marginTop: 'auto',
                  }}
                >
                  <code
                    style={{
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: 'var(--color-primary)',
                      background: 'rgba(178, 94, 64, 0.08)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    {variant.codeSnippet}
                  </code>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    {variant.useCase}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 3. Color Scheme Gallery */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '3. Galeri Skema Warna' : '3. Color Scheme Gallery'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Lima sistem palet warna harmonis yang dirancang khusus untuk memandu pemahaman visual data tanpa kebingungan warna.'
            : 'Five harmonized color systems purposefully engineered for effortless data comprehension and visual hierarchy.'}
        </p>

        {/* Toolbar: Preview Chart Type Switcher */}
        <div className="color-scheme-toolbar">
          <div className="color-scheme-toolbar__info">
            <span className="color-scheme-toolbar__label">
              <Palette size={16} color="var(--brand-500)" />
              {isId ? 'Tinjau Palet Pada Tipe Chart:' : 'Preview Palette on Chart Type:'}
            </span>
            <span className="color-scheme-toolbar__sublabel">
              {isId
                ? 'Ganti tipe chart untuk melihat bagaimana setiap skema warna beradaptasi.'
                : 'Switch chart topology to inspect how each scheme adapts across representations.'}
            </span>
          </div>

          <div className="color-scheme-toolbar__switcher">
            <NeuronTabBar
              variant="segment"
              size="sm"
              scrollable={false}
              value={schemeChartType}
              onChange={(id) => setSchemeChartType(id as any)}
              items={[
                { id: 'bar', label: isId ? 'Kolom / Bar' : 'Bar', icon: <BarChart3 size={14} /> },
                { id: 'line', label: isId ? 'Garis / Area' : 'Line', icon: <LineChartIcon size={14} /> },
                { id: 'donut', label: isId ? 'Donut / Pie' : 'Donut', icon: <PieChartIcon size={14} /> },
                { id: 'radar', label: isId ? 'Radar Sumbu' : 'Radar', icon: <Radar size={14} /> },
                { id: 'sankey', label: isId ? 'Sankey / Alur' : 'Sankey Flow', icon: <Workflow size={14} /> },
              ]}
              renderPanels={false}
            />
          </div>
        </div>

        {/* Helper function to render preview chart */}
        {(() => {
          const renderCard = (profile: SchemeProfile) => (
            <div key={profile.id} className="color-scheme-card">
              {/* Header */}
              <div className="color-scheme-card__header">
                <div>
                  <div className="color-scheme-card__badge-row">
                    <NeuronBadge size="sm" variant={profile.badgeVariant} style={{ textTransform: 'capitalize' }}>
                      {profile.id}
                    </NeuronBadge>
                    <NeuronBadge size="xs" variant="gray">
                      {isId ? profile.tagId : profile.tagEn}
                    </NeuronBadge>
                  </div>
                  <h3 className="color-scheme-card__title">
                    {isId ? profile.nameId : profile.nameEn}
                  </h3>
                  <p className="color-scheme-card__desc">
                    {isId ? profile.descId : profile.descEn}
                  </p>
                </div>

                <button
                  type="button"
                  className="color-scheme-card__copy-btn"
                  onClick={() => handleCopyText(`colorScheme="${profile.id}"`, 'scheme')}
                  title={isId ? 'Klik untuk menyalin prop' : 'Click to copy prop snippet'}
                >
                  {copiedSchemeCode === `colorScheme="${profile.id}"` ? (
                    <>
                      <Check size={12} color="var(--emerald-500)" />
                      <span style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>
                        {isId ? 'Tersalin' : 'Copied'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>colorScheme="{profile.id}"</span>
                    </>
                  )}
                </button>
              </div>

              {/* 8-Step Interactive Swatch Bar */}
              <div className="color-scheme-card__swatches-wrapper">
                <div className="color-scheme-card__swatch-track">
                  {profile.swatches.map((swatch, idx) => (
                    <div
                      key={idx}
                      className="color-scheme-card__swatch-item"
                      style={{ background: swatch.token }}
                      title={`${swatch.label} (${swatch.hex}) • ${swatch.token} — ${isId ? 'Klik untuk salin token' : 'Click to copy token'}`}
                      onClick={() => handleCopyText(swatch.token, 'token')}
                    />
                  ))}
                </div>
                <div className="color-scheme-card__swatch-meta">
                  <span>01: {profile.swatches[0].label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                    {copiedToken?.includes(profile.id) ? (
                      <span style={{ color: 'var(--emerald-500)' }}>
                        {isId ? '✓ Token Tersalin!' : '✓ Token Copied!'}
                      </span>
                    ) : (
                      isId ? '8 Rona Warna Berurutan' : '8-Token Progression'
                    )}
                  </span>
                  <span>08: {profile.swatches[7].label}</span>
                </div>
              </div>

              {/* Live Interactive Chart Box */}
              <div className="color-scheme-card__chart-box">
                {schemeChartType === 'bar' && (
                  <NeuronChart
                    type="bar"
                    data={SAMPLE_BAR_DATA}
                    size="sm"
                    colorScheme={profile.id}
                    showGrid
                    showTooltip
                    animated={false}
                    showLegend={false}
                  />
                )}
                {schemeChartType === 'line' && (
                  <NeuronChart
                    type="line"
                    series={SAMPLE_MULTI_LINE_SERIES}
                    categories={SAMPLE_MONTH_CATEGORIES}
                    size="sm"
                    colorScheme={profile.id}
                    smooth
                    showArea
                    showDots
                    showGrid
                    showTooltip
                    animated={false}
                    showLegend={false}
                  />
                )}
                {schemeChartType === 'donut' && (
                  <NeuronChart
                    type="donut"
                    data={SAMPLE_DONUT_BUDGET}
                    size="sm"
                    colorScheme={profile.id}
                    innerRadius={0.6}
                    showLabels
                    showTooltip
                    animated={false}
                    showLegend={false}
                  />
                )}
                {schemeChartType === 'radar' && (
                  <NeuronChart
                    type="radar"
                    series={SAMPLE_RADAR_MULTI_SERIES}
                    categories={SAMPLE_RADAR_CATEGORIES}
                    size="sm"
                    colorScheme={profile.id}
                    showTooltip
                    animated={false}
                    showLegend={false}
                  />
                )}
                {schemeChartType === 'sankey' && (
                  <NeuronChart
                    type="sankey"
                    sankeyData={SAMPLE_SANKEY_FLOW}
                    size="sm"
                    colorScheme={profile.id}
                    showTooltip
                    animated={false}
                    showLegend={false}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="color-scheme-card__footer">
                <div className="color-scheme-card__tags">
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginRight: 2 }}>
                    {isId ? 'Rekomendasi:' : 'Best for:'}
                  </span>
                  {(isId ? profile.bestForId : profile.bestForEn).map((tag, i) => (
                    <NeuronBadge key={i} size="xs" variant="gray">
                      {tag}
                    </NeuronBadge>
                  ))}
                </div>
                <div className="color-scheme-card__meta-bar">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)' }} />
                    {profile.wcagContrast}
                  </span>
                  <span style={{ fontStyle: 'italic', fontSize: '10.5px' }}>
                    {isId ? profile.recommendedTypesId : profile.recommendedTypesEn}
                  </span>
                </div>
              </div>
            </div>
          );

          return (
            <>
              {/* Row 1: Flagship Palettes (Brand & Spectrum) */}
              <div className="color-scheme-grid-featured">
                {SCHEME_PROFILES.slice(0, 2).map(renderCard)}
              </div>

              {/* Row 2: Secondary & Contextual Palettes (Mono, Pastel, Vivid) */}
              <div className="color-scheme-grid-secondary">
                {SCHEME_PROFILES.slice(2).map(renderCard)}
              </div>
            </>
          );
        })()}

        {/* Color Scheme Comparison Matrix Table */}
        <div className="color-scheme-matrix">
          <div className="color-scheme-matrix__header">
            <div>
              <h3 className="color-scheme-matrix__title">
                <Palette size={16} color="var(--brand-500)" />
                {isId ? 'Matriks Komparasi Skema Warna' : 'Color Scheme Comparison Matrix'}
              </h3>
              <p className="color-scheme-matrix__subtitle">
                {isId
                  ? 'Panduan teknis pemilihan palet, kontras WCAG, dan kesesuaian visual pada visualisasi data.'
                  : 'Technical specification for palette selection, WCAG contrast, and visual topology.'}
              </p>
            </div>
            <NeuronBadge size="sm" variant="brand">
              {isId ? '5 Palet Standar' : '5 Standard Palettes'}
            </NeuronBadge>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="color-scheme-matrix__table">
              <thead>
                <tr>
                  <th>{isId ? 'Skema Warna' : 'Color Scheme'}</th>
                  <th>{isId ? 'Urutan Palet 8-Warna' : '8-Color Sequence'}</th>
                  <th>{isId ? 'Karakter Visual' : 'Visual Tone'}</th>
                  <th>{isId ? 'Tipe Chart Ideal' : 'Recommended Charts'}</th>
                  <th>{isId ? 'Aksesibilitas' : 'Accessibility'}</th>
                </tr>
              </thead>
              <tbody>
                {SCHEME_PROFILES.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <NeuronBadge size="sm" variant={p.badgeVariant} style={{ textTransform: 'capitalize' }}>
                          {p.id}
                        </NeuronBadge>
                        <span style={{ fontWeight: 600 }}>
                          {isId ? p.nameId : p.nameEn}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="color-scheme-matrix__mini-strip" title={p.swatches.map(s => s.label).join(', ')}>
                        {p.swatches.map((s, idx) => (
                          <div
                            key={idx}
                            className="color-scheme-matrix__mini-swatch"
                            style={{ background: s.token }}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>
                      {isId ? p.visualToneId : p.visualToneEn}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'var(--brand-600)' }}>
                        {isId ? p.recommendedTypesId : p.recommendedTypesEn}
                      </span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)' }} />
                        {p.wcagContrast}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Size Matrix */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '4. Matriks Ukuran' : '4. Size Matrix'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Empat dimensi terkalibrasi dengan rasio aspek standar 16:10, dirancang dari widget kartu berdensitas tinggi hingga command center eksekutif.'
            : 'Four calibrated dimensions built on standard 16:10 aspect ratios, engineered from high-density metric widgets up to executive command centers.'}
        </p>

        {/* ── Toolbar: Size Selector ── */}
        <div className="size-matrix-toolbar">
          <div className="size-matrix-toolbar__info">
            <span className="size-matrix-toolbar__label">
              <Sliders size={16} color="var(--brand-500)" />
              {isId ? 'Pilih Ukuran Chart:' : 'Select Chart Size:'}
            </span>
            <span className="size-matrix-toolbar__sublabel">
              {isId
                ? 'Tinjau adaptasi skala koordinat, padding internal, dan hierarki tipografi.'
                : 'Inspect coordinate scale adaptation, internal padding, and font hierarchy.'}
            </span>
          </div>

          <div className="size-matrix-toolbar__switcher">
            <NeuronTabBar
              variant="segment"
              size="sm"
              scrollable={false}
              value={sizeInspectSize}
              onChange={(id) => setSizeInspectSize(id as NeuronChartSize)}
              items={[
                { id: 'sm', label: 'sm · 320×200' },
                { id: 'md', label: 'md · 480×300 (Default)' },
                { id: 'lg', label: 'lg · 640×400' },
                { id: 'xl', label: 'xl · 800×500' },
              ]}
              renderPanels={false}
            />
          </div>
        </div>

        {/* ── Secondary Controls Subbar: Topology + View Mode + Copy ── */}
        <div className="size-matrix-subbar">
          {/* Chart Topology Group */}
          <div className="size-matrix-subbar__group">
            <span className="size-matrix-subbar__label">
              {isId ? 'Topologi:' : 'Topology:'}
            </span>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeInspectChartType === 'line' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeInspectChartType('line')}
            >
              <LineChartIcon size={13} />
              <span>{isId ? 'Garis' : 'Line'}</span>
            </button>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeInspectChartType === 'bar' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeInspectChartType('bar')}
            >
              <BarChart3 size={13} />
              <span>{isId ? 'Kolom' : 'Bar'}</span>
            </button>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeInspectChartType === 'donut' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeInspectChartType('donut')}
            >
              <PieChartIcon size={13} />
              <span>Donut</span>
            </button>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeInspectChartType === 'radar' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeInspectChartType('radar')}
            >
              <Radar size={13} />
              <span>Radar</span>
            </button>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeInspectChartType === 'sankey' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeInspectChartType('sankey')}
            >
              <Workflow size={13} />
              <span>{isId ? 'Sankey / Alur' : 'Sankey Flow'}</span>
            </button>
          </div>

          {/* View Mode & Bounds Toggle */}
          <div className="size-matrix-subbar__group">
            <span className="size-matrix-subbar__label">
              {isId ? 'Tampilan:' : 'View:'}
            </span>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeViewMode === 'stage' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeViewMode('stage')}
              title={isId ? 'Panggung interaktif untuk satu ukuran' : 'Interactive stage for selected size'}
            >
              <Eye size={13} />
              <span>{isId ? 'Panggung Fokus' : 'Stage Focus'}</span>
            </button>
            <button
              type="button"
              className={`size-matrix-toggle-btn ${sizeViewMode === 'all' ? 'size-matrix-toggle-btn--active' : ''}`}
              onClick={() => setSizeViewMode('all')}
              title={isId ? 'Tampilkan semua 4 ukuran dalam grid komparasi' : 'Show all 4 sizes in comparison grid'}
            >
              <LayoutGrid size={13} />
              <span>{isId ? 'Semua 4 Ukuran' : 'All 4 Sizes'}</span>
            </button>

            {sizeViewMode === 'stage' && (
              <button
                type="button"
                className={`size-matrix-toggle-btn ${sizeConstrainWidth ? 'size-matrix-toggle-btn--active' : ''}`}
                onClick={() => setSizeConstrainWidth(!sizeConstrainWidth)}
                title={isId ? 'Beralih antara skala proporsional alami atau memenuhi kontainer' : 'Toggle between natural proportional bounds or fit width'}
              >
                <Layers size={13} />
                <span>{sizeConstrainWidth ? (isId ? 'Skala Alami' : 'Natural Scale') : (isId ? 'Lebar Penuh' : 'Fit Container')}</span>
              </button>
            )}

            {/* Quick Copy Prop */}
            <button
              type="button"
              className="color-scheme-card__copy-btn"
              onClick={() => handleCopySize(`size="${sizeInspectSize}"`)}
              title={isId ? 'Salin prop snippet' : 'Copy size prop'}
            >
              {copiedSizeCode === `size="${sizeInspectSize}"` ? (
                <>
                  <Check size={12} color="var(--emerald-500)" />
                  <span style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>
                    {isId ? 'Tersalin' : 'Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>size="{sizeInspectSize}"</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Mode 1: Interactive Stage Focus ── */}
        {sizeViewMode === 'stage' && (() => {
          const profile = SIZE_PROFILES.find(p => p.id === sizeInspectSize)!;
          return (
            <div className="size-matrix-stage">
              {/* Header */}
              <div className="size-matrix-stage__header">
                <div className="size-matrix-stage__title-area">
                  <div className="size-matrix-stage__badge-row">
                    <NeuronBadge size="sm" variant={profile.isDefault ? 'brand' : 'default'}>
                      size="{profile.id}"
                    </NeuronBadge>
                    {profile.isDefault && (
                      <NeuronBadge size="xs" variant="brand">
                        {isId ? 'Default' : 'Default Standard'}
                      </NeuronBadge>
                    )}
                    <NeuronBadge size="xs" variant="gray">
                      {profile.aspectRatio} Aspect Ratio
                    </NeuronBadge>
                    <NeuronBadge size="xs" variant="gray">
                      ViewBox: {profile.width} × {profile.height} px
                    </NeuronBadge>
                    <NeuronBadge size="xs" variant="gray">
                      Safe Padding: {profile.padding}px
                    </NeuronBadge>
                  </div>
                  <h3 className="size-matrix-stage__title">
                    {profile.id.toUpperCase()} · {isId ? profile.nameId : profile.nameEn}
                  </h3>
                  <p className="size-matrix-stage__desc">
                    {isId ? profile.descId : profile.descEn}
                  </p>
                </div>
              </div>

              {/* Canvas Outer with Rulers & Bounded Box */}
              <div className="size-matrix-stage__canvas-outer">
                <div className="size-matrix-stage__ruler-bar">
                  <span>0 px</span>
                  <div className="size-matrix-stage__ruler-line" />
                  <span>{sizeConstrainWidth ? `${profile.width} px (Natural ViewBox)` : 'Responsive (100% Fluid)'}</span>
                </div>

                <div
                  className="size-matrix-stage__chart-box"
                  style={{
                    maxWidth: sizeConstrainWidth ? `${profile.width}px` : '100%',
                  }}
                >
                  {(() => {
                    const titleText = `${profile.id.toUpperCase()} • ${isId ? profile.nameId : profile.nameEn}`;
                    const subtitleText = `${profile.width} × ${profile.height} px (Padding: ${profile.padding}px) · ${isId ? profile.gridSpan : profile.gridSpan}`;
                    switch (sizeInspectChartType) {
                      case 'line':
                        return (
                          <NeuronChart
                            type="line"
                            series={SAMPLE_MULTI_LINE_SERIES}
                            categories={SAMPLE_MONTH_CATEGORIES}
                            size={profile.id}
                            colorScheme="spectrum"
                            smooth
                            showArea
                            showDots
                            showGrid
                            showLegend
                            showTooltip
                            animated={false}
                            title={titleText}
                            subtitle={subtitleText}
                          />
                        );
                      case 'bar':
                        return (
                          <NeuronChart
                            type="bar"
                            data={SAMPLE_BAR_DATA}
                            size={profile.id}
                            colorScheme="brand"
                            showGrid
                            showLegend={false}
                            showTooltip
                            animated={false}
                            title={titleText}
                            subtitle={subtitleText}
                          />
                        );
                      case 'donut':
                        return (
                          <NeuronChart
                            type="donut"
                            data={SAMPLE_DONUT_BUDGET}
                            size={profile.id}
                            colorScheme="spectrum"
                            innerRadius={0.6}
                            showLabels
                            showLegend
                            showTooltip
                            animated={false}
                            title={titleText}
                            subtitle={subtitleText}
                          />
                        );
                      case 'radar':
                        return (
                          <NeuronChart
                            type="radar"
                            series={SAMPLE_RADAR_MULTI_SERIES}
                            categories={SAMPLE_RADAR_CATEGORIES}
                            size={profile.id}
                            colorScheme="brand"
                            showLegend
                            showTooltip
                            animated={false}
                            title={titleText}
                            subtitle={subtitleText}
                          />
                        );
                      case 'sankey':
                        return (
                          <NeuronChart
                            type="sankey"
                            sankeyData={SANKEY_BY_SIZE[profile.id] || SAMPLE_SANKEY_FLOW}
                            size={profile.id}
                            colorScheme="brand"
                            showTooltip
                            animated={false}
                            title={titleText}
                            subtitle={subtitleText}
                          />
                        );
                    }
                  })()}
                </div>
              </div>

              {/* Technical Specs Strip */}
              <div className="size-matrix-stage__specs">
                <div className="size-matrix-spec-card">
                  <span className="size-matrix-spec-card__label">
                    {isId ? 'Rekomendasi Grid' : 'Recommended Grid'}
                  </span>
                  <span className="size-matrix-spec-card__value">
                    {profile.gridSpan}
                  </span>
                  <span className="size-matrix-spec-card__subtext">
                    {isId ? profile.recommendedGridId : profile.recommendedGridEn}
                  </span>
                </div>

                <div className="size-matrix-spec-card">
                  <span className="size-matrix-spec-card__label">
                    {isId ? 'Padding Internal' : 'Internal Padding'}
                  </span>
                  <span className="size-matrix-spec-card__value">
                    {profile.padding} px
                  </span>
                  <span className="size-matrix-spec-card__subtext">
                    {isId ? 'Margin aman canvas SVG' : 'SVG canvas safe margin'}
                  </span>
                </div>

                <div className="size-matrix-spec-card">
                  <span className="size-matrix-spec-card__label">
                    {isId ? 'Hierarki Tipografi' : 'Typography Scale'}
                  </span>
                  <span className="size-matrix-spec-card__value">
                    Title {profile.titleSize} · Axis {profile.axisSize}
                  </span>
                  <span className="size-matrix-spec-card__subtext">
                    Subtitle {profile.subtitleSize} · Donut {profile.donutCenterSize}
                  </span>
                </div>

                <div className="size-matrix-spec-card">
                  <span className="size-matrix-spec-card__label">
                    {isId ? 'Kapasitas Data Ideal' : 'Ideal Data Capacity'}
                  </span>
                  <span className="size-matrix-spec-card__value">
                    {isId ? profile.dataCapacityId : profile.dataCapacityEn}
                  </span>
                  <span className="size-matrix-spec-card__subtext">
                    {isId ? 'Untuk keterbacaan optimal' : 'For optimal cognitive readability'}
                  </span>
                </div>
              </div>

              {/* Footer: Best For Badges */}
              <div className="size-matrix-stage__tags-row">
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
                  {isId ? 'Kasus Penggunaan Optimal:' : 'Optimal Use Cases:'}
                </span>
                {(isId ? profile.bestForId : profile.bestForEn).map((tag, idx) => (
                  <NeuronBadge key={idx} size="xs" variant="gray">
                    {tag}
                  </NeuronBadge>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── Mode 2: All 4 Sizes Comparative Grid ── */}
        {sizeViewMode === 'all' && (
          <div className="size-matrix-grid">
            {SIZE_PROFILES.map((profile) => (
              <div key={profile.id} className="size-matrix-card">
                <div className="size-matrix-card__header">
                  <div>
                    <div className="size-matrix-card__badge-row">
                      <NeuronBadge size="sm" variant={profile.isDefault ? 'brand' : 'default'}>
                        size="{profile.id}"
                      </NeuronBadge>
                      {profile.isDefault && (
                        <NeuronBadge size="xs" variant="brand">
                          Default
                        </NeuronBadge>
                      )}
                      <NeuronBadge size="xs" variant="gray">
                        {profile.width} × {profile.height}
                      </NeuronBadge>
                    </div>
                    <h3 className="size-matrix-card__title">
                      {profile.id.toUpperCase()} · {isId ? profile.nameId : profile.nameEn}
                    </h3>
                    <p className="size-matrix-card__desc">
                      {isId ? profile.descId : profile.descEn}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="color-scheme-card__copy-btn"
                    onClick={() => handleCopySize(`size="${profile.id}"`)}
                    title={isId ? 'Salin prop' : 'Copy prop'}
                  >
                    {copiedSizeCode === `size="${profile.id}"` ? (
                      <>
                        <Check size={12} color="var(--emerald-500)" />
                        <span style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>
                          {isId ? 'Tersalin' : 'Copied'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>size="{profile.id}"</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="size-matrix-card__chart-wrapper">
                  <div style={{ width: '100%', maxWidth: `${profile.width}px` }}>
                    {(() => {
                      const titleText = `${profile.id.toUpperCase()} Chart`;
                      switch (sizeInspectChartType) {
                        case 'line':
                          return (
                            <NeuronChart
                              type="line"
                              series={SAMPLE_MULTI_LINE_SERIES}
                              categories={SAMPLE_MONTH_CATEGORIES}
                              size={profile.id}
                              colorScheme="spectrum"
                              smooth
                              showArea
                              showDots
                              showGrid
                              showLegend={false}
                              showTooltip
                              animated={false}
                              title={titleText}
                            />
                          );
                        case 'bar':
                          return (
                            <NeuronChart
                              type="bar"
                              data={SAMPLE_BAR_DATA}
                              size={profile.id}
                              colorScheme="brand"
                              showGrid
                              showLegend={false}
                              showTooltip
                              animated={false}
                              title={titleText}
                            />
                          );
                        case 'donut':
                          return (
                            <NeuronChart
                              type="donut"
                              data={SAMPLE_DONUT_BUDGET}
                              size={profile.id}
                              colorScheme="spectrum"
                              innerRadius={0.6}
                              showLabels
                              showLegend={false}
                              showTooltip
                              animated={false}
                              title={titleText}
                            />
                          );
                        case 'radar':
                          return (
                            <NeuronChart
                              type="radar"
                              series={SAMPLE_RADAR_MULTI_SERIES}
                              categories={SAMPLE_RADAR_CATEGORIES}
                              size={profile.id}
                              colorScheme="brand"
                              showLegend={false}
                              showTooltip
                              animated={false}
                              title={titleText}
                            />
                          );
                        case 'sankey':
                          return (
                            <NeuronChart
                              type="sankey"
                              sankeyData={SANKEY_BY_SIZE[profile.id] || SAMPLE_SANKEY_FLOW}
                              size={profile.id}
                              colorScheme="brand"
                              showTooltip
                              animated={false}
                              title={titleText}
                            />
                          );
                      }
                    })()}
                  </div>
                </div>

                <div className="size-matrix-card__footer">
                  <span style={{ fontSize: '11px', color: 'var(--brand-600)', fontWeight: 600 }}>
                    {profile.gridSpan}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Padding: {profile.padding}px · Title: {profile.titleSize}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Responsive Architecture Callout ── */}
        <div className="size-matrix-callout">
          <div className="size-matrix-callout__icon">
            <Sparkles size={16} />
          </div>
          <div className="size-matrix-callout__content">
            <h4 className="size-matrix-callout__title">
              {isId ? 'Arsitektur Vektor Responsif SVG' : 'Responsive SVG Vector Architecture'}
            </h4>
            <p className="size-matrix-callout__text">
              {isId
                ? 'Semua NeuronChart dirender menggunakan koordinat SVG murni dengan rasio aspek terkunci 16:10. Properti size mengontrol kepadatan visual (pembagian sumbu, margin internal, dan skala tipografi), sementara chart itu sendiri secara otomatis menyesuaikan lebar (width: 100%) dengan kontainer induknya tanpa distorsi piksel pada layar Retina / 4K.'
                : 'All NeuronChart components are rendered via pure SVG vector coordinates locked to a 16:10 aspect ratio. The size prop controls internal visual density (axis divisions, safe margins, and font scaling), while the chart automatically scales to fit 100% of its parent container without pixelation on Retina and 4K displays.'}
            </p>
          </div>
        </div>

        {/* ── Technical Size Specifications Matrix Table ── */}
        <div className="color-scheme-matrix">
          <div className="color-scheme-matrix__header">
            <div>
              <h3 className="color-scheme-matrix__title">
                <Sliders size={16} color="var(--brand-500)" />
                {isId ? 'Matriks Spesifikasi Teknis Ukuran' : 'Size Specifications & Layout Matrix'}
              </h3>
              <p className="color-scheme-matrix__subtitle">
                {isId
                  ? 'Panduan pemilihan ukuran berdasarkan rasio aspek, padding aman, tipografi, dan penempatan grid dashboard.'
                  : 'Sizing criteria reference based on aspect ratios, safe paddings, typography scales, and dashboard grid allocations.'}
              </p>
            </div>
            <NeuronBadge size="sm" variant="brand">
              4 Dimension Specs
            </NeuronBadge>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="color-scheme-matrix__table">
              <thead>
                <tr>
                  <th>{isId ? 'Ukuran / Prop' : 'Size Token'}</th>
                  <th>{isId ? 'Dimensi ViewBox' : 'ViewBox Dimensions'}</th>
                  <th>{isId ? 'Aspek Rasio & Padding' : 'Ratio & Padding'}</th>
                  <th>{isId ? 'Skala Tipografi' : 'Typography Scale'}</th>
                  <th>{isId ? 'Alokasi Grid Ideal' : 'Ideal Grid Placement'}</th>
                  <th>{isId ? 'Kapasitas Data' : 'Data Capacity'}</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_PROFILES.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <NeuronBadge size="sm" variant={p.isDefault ? 'brand' : 'default'}>
                          size="{p.id}"
                        </NeuronBadge>
                        {p.isDefault && (
                          <NeuronBadge size="xs" variant="brand">
                            Default
                          </NeuronBadge>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, fontSize: '11.5px' }}>
                        {p.width} × {p.height} px
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {p.aspectRatio} · Padding {p.padding}px
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-primary)' }}>
                        Title {p.titleSize} · Axis {p.axisSize}
                        {p.donutCenterSize !== '—' && ` · Donut ${p.donutCenterSize}`}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span style={{ fontWeight: 600, fontSize: '11.5px', color: 'var(--brand-600)' }}>
                          {p.gridSpan}
                        </span>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
                          {isId ? p.recommendedGridId : p.recommendedGridEn}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        {isId ? p.dataCapacityId : p.dataCapacityEn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Do's & Don'ts */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '5. Praktik Terbaik' : '5. Best Practices'}
        </h2>
        <p className="section-description">
          {isId ? 'Panduan do\'s dan don\'ts untuk penggunaan chart yang efektif dan konsisten.' : "Paired do's and don'ts guidelines for effective, consistent chart usage."}
        </p>

        {/* Pair 1: Data Density */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronChart type="bar" size="sm" colorScheme="spectrum" showGrid={false} showLegend={false} animated={false}
                data={[
                  { label: 'Q1', value: 80 }, { label: 'Q2', value: 65 }, { label: 'Q3', value: 90 },
                  { label: 'Q4', value: 72 },
                ]} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Batasi maksimal 5–7 data points' : 'Limit to 5–7 data points'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Jumlah data yang terkontrol membuat chart mudah dipindai dalam sekejap. Gunakan warna kontras dan label yang jelas.' : 'A controlled data count makes charts scannable at a glance. Use contrasting colors and clear labels.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronChart type="bar" size="sm" colorScheme="mono" showGrid={false} showLegend={false} animated={false}
                data={[
                  { label: 'A', value: 30 }, { label: 'B', value: 45 }, { label: 'C', value: 22 },
                  { label: 'D', value: 60 }, { label: 'E', value: 38 }, { label: 'F', value: 50 },
                  { label: 'G', value: 42 }, { label: 'H', value: 55 }, { label: 'I', value: 33 },
                  { label: 'J', value: 48 }, { label: 'K', value: 27 }, { label: 'L', value: 62 },
                ]} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Terlalu banyak data dalam satu chart' : 'Too many data points in one chart'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Chart yang terlalu padat menyulitkan pembacaan dan membingungkan pengguna. Pecah menjadi beberapa chart atau gunakan filtering.' : 'Overcrowded charts are hard to read and confuse users. Split into multiple charts or use data filtering.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 2: Legends */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronChart type="line" size="sm" colorScheme="spectrum" smooth showDots showLegend animated={false}
                series={[
                  { name: 'Revenue', data: [40, 60, 80, 55, 70] },
                  { name: 'Expenses', data: [30, 35, 40, 38, 45] },
                ]}
                categories={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Selalu sertakan legend untuk multi-series' : 'Always include legend for multi-series'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Legend membantu pengguna memahami makna setiap series tanpa menebak berdasarkan warna saja.' : 'Legends help users understand each series without guessing from colors alone.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronChart type="line" size="sm" colorScheme="mono" smooth showDots showLegend={false} animated={false}
                series={[
                  { name: 'A', data: [40, 60, 80, 55, 70] },
                  { name: 'B', data: [30, 35, 40, 38, 45] },
                  { name: 'C', data: [50, 45, 30, 60, 55] },
                ]}
                categories={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Multi-series tanpa legend membingungkan' : 'Multi-series without legend is confusing'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Tanpa legend, pengguna tidak bisa membedakan mana series "Revenue" dan mana "Costs" — terutama dalam monokrom.' : 'Without legends, users cannot tell which line is "Revenue" vs "Costs" — especially in monochrome schemes.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 3: Pie / Donut Limits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronChart type="donut" size="sm" colorScheme="spectrum" showLegend={false} showLabels animated={false} innerRadius={0.55}
                data={[
                  { label: 'Product', value: 45 }, { label: 'Service', value: 30 },
                  { label: 'Support', value: 15 }, { label: 'Other', value: 10 },
                ]} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Donut/Pie ≤ 5 kategori untuk kejelasan' : 'Donut/Pie ≤ 5 categories for clarity'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Batasi slice pada 4–5 kategori agar proporsi mudah dibandingkan secara visual. Gabungkan kategori kecil ke "Lainnya".' : 'Keep slices to 4–5 categories so proportions are easy to compare visually. Merge small categories into "Other".'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronChart type="pie" size="sm" colorScheme="mono" showLegend={false} animated={false} showLabels
                data={[
                  { label: 'A', value: 15 }, { label: 'B', value: 12 }, { label: 'C', value: 10 },
                  { label: 'D', value: 9 }, { label: 'E', value: 8 }, { label: 'F', value: 7 },
                  { label: 'G', value: 6 }, { label: 'H', value: 5 },
                ]} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Pie chart >6 kategori sulit dibaca' : "Pie chart >6 categories is hard to read"}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Terlalu banyak slice membuat perbandingan proporsi hampir mustahil. Gunakan bar chart horizontal sebagai alternatif.' : 'Too many slices make proportion comparison nearly impossible. Use horizontal bar chart as an alternative.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 4: Sizing Appropriateness */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronChart type="bar" size="sm" colorScheme="brand" showGrid showLegend={false} animated={false}
                data={[
                  { label: 'Web', value: 420 }, { label: 'App', value: 310 },
                  { label: 'API', value: 180 },
                ]}
                title={isId ? 'Ukuran Tepat' : 'Right Size'} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Pilih size sesuai konteks tampilan' : 'Choose size matching the display context'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'sm untuk widget sidebar, md untuk dashboard 2-kolom, lg untuk seksi utama, xl untuk hero/presentasi. Sesuaikan size dengan jumlah data.' : 'sm for sidebar widgets, md for 2-column dashboards, lg for main sections, xl for hero/presentations. Match size to data density.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronChart type="line" size="sm" colorScheme="mono" smooth showDots showGrid showLegend={false} animated={false}
                series={[
                  { name: 'A', data: [40, 60, 80, 55, 70, 85, 60, 75, 90, 65, 50, 70] },
                  { name: 'B', data: [30, 35, 40, 38, 45, 50, 42, 48, 55, 40, 35, 42] },
                  { name: 'C', data: [50, 45, 30, 60, 55, 40, 65, 50, 35, 55, 60, 48] },
                ]}
                categories={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Data padat pada ukuran kecil' : 'Dense data on small sizes'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Memaksakan 12 bulan × 3 series ke size="sm" menghasilkan chart sesak yang tidak terbaca. Gunakan size="lg" atau filter data.' : 'Forcing 12 months × 3 series into size="sm" produces an unreadable cramped chart. Use size="lg" or filter the data.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 5: Color Scheme Choice */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronChart type="donut" size="sm" colorScheme="spectrum" showLegend showLabels={false} animated={false} innerRadius={0.55}
                data={[
                  { label: 'Marketing', value: 35 }, { label: 'Engineering', value: 40 },
                  { label: 'Design', value: 25 },
                ]} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Gunakan skema warna semantik' : 'Use semantic color schemes'}
              </div>
              <div className="rule-card__desc">
                {isId ? '"spectrum" untuk data kategorikal berbeda, "brand" untuk data primer perusahaan, "pastel" untuk tone profesional yang lembut.' : '"spectrum" for distinct categorical data, "brand" for primary company data, "pastel" for soft professional tones.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronChart type="bar" size="sm" colorScheme="mono" showGrid={false} showLegend={false} animated={false}
                data={[
                  { label: 'Sales', value: 55 }, { label: 'Marketing', value: 50 },
                  { label: 'Support', value: 48 }, { label: 'R&D', value: 45 },
                  { label: 'Ops', value: 42 },
                ]} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Monokrom untuk data kategorikal berbeda' : 'Monochrome for distinct categories'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Skema "mono" hanya cocok untuk single-metric atau trend. Untuk membandingkan kategori berbeda, gunakan warna yang kontras.' : '"mono" scheme only fits single-metric or trends. For comparing different categories, use contrasting color schemes.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 6: Sankey / Flow Best Practices */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronChart type="sankey" size="sm" colorScheme="brand" showTooltip animated={false}
                sankeyData={{
                  stages: ['Input', 'Process', 'Output'],
                  nodes: [
                    { id: 'web', label: 'Web', stage: 0 },
                    { id: 'api', label: 'API', stage: 0 },
                    { id: 'proc', label: 'Process', stage: 1 },
                    { id: 'done', label: 'Done', stage: 2 },
                  ],
                  links: [
                    { source: 'web', target: 'proc', value: 60 },
                    { source: 'api', target: 'proc', value: 40 },
                    { source: 'proc', target: 'done', value: 100 },
                  ],
                }} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Sankey: batasi 3–4 tahap alur' : 'Sankey: limit to 3–4 flow stages'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Alur yang ringkas dengan tahap jelas lebih mudah dipahami. Gunakan label singkat dan pastikan setiap node memiliki konteks.' : 'Concise flows with clear stages are easier to understand. Use short labels and ensure every node has context.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronChart type="sankey" size="sm" colorScheme="mono" showTooltip animated={false}
                sankeyData={{
                  stages: ['A', 'B', 'C', 'D', 'E'],
                  nodes: [
                    { id: 'n1', label: 'N1', stage: 0 }, { id: 'n2', label: 'N2', stage: 0 },
                    { id: 'n3', label: 'N3', stage: 0 }, { id: 'n4', label: 'N4', stage: 1 },
                    { id: 'n5', label: 'N5', stage: 1 }, { id: 'n6', label: 'N6', stage: 2 },
                    { id: 'n7', label: 'N7', stage: 2 }, { id: 'n8', label: 'N8', stage: 3 },
                    { id: 'n9', label: 'N9', stage: 3 }, { id: 'n10', label: 'N10', stage: 4 },
                  ],
                  links: [
                    { source: 'n1', target: 'n4', value: 20 }, { source: 'n1', target: 'n5', value: 10 },
                    { source: 'n2', target: 'n4', value: 15 }, { source: 'n3', target: 'n5', value: 25 },
                    { source: 'n4', target: 'n6', value: 20 }, { source: 'n4', target: 'n7', value: 15 },
                    { source: 'n5', target: 'n6', value: 10 }, { source: 'n5', target: 'n7', value: 25 },
                    { source: 'n6', target: 'n8', value: 18 }, { source: 'n6', target: 'n9', value: 12 },
                    { source: 'n7', target: 'n8', value: 22 }, { source: 'n7', target: 'n9', value: 18 },
                    { source: 'n8', target: 'n10', value: 40 }, { source: 'n9', target: 'n10', value: 30 },
                  ],
                }} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Sankey terlalu kompleks pada ukuran kecil' : 'Overly complex Sankey on small sizes'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Terlalu banyak tahap dan node pada size="sm" menghasilkan alur yang tidak terbaca. Gunakan size="lg" atau sederhanakan data.' : 'Too many stages and nodes at size="sm" produces an unreadable flow. Use size="lg" or simplify the data.'}
              </div>
            </div>
          </RuleCard>
        </div>
      </div>
    </div>
  );

  // ─── PLAYBOOK TAB ────────────────────────────────────────────────────────
  const renderPlaybook = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
      {/* 1. Interactive Playground */}
      <section>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 'var(--radius-lg)',
              background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-primary)',
            }}>
              <Sliders size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', margin: 0, color: 'var(--color-text-primary)' }}>
                Interactive Playground
              </h2>
              <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                {isId
                  ? 'Sesuaikan semua properti chart secara langsung dengan pratinjau real-time dan salin kode siap pakai.'
                  : 'Customize all chart properties in real-time with instant visual feedback and copy ready-to-use code.'}
              </p>
            </div>
          </div>
          <NeuronBadge size="sm" variant="brand">
            Live Component
          </NeuronBadge>
        </div>

        {/* Playground Container Card */}
        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 410px) minmax(320px, 1fr)',
            gap: 'var(--space-6)',
            alignItems: 'start'
          }}>
            {/* Left: Controls Panel */}
            <div style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Controls Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={14} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {isId ? 'Konfigurasi Properti' : 'Chart Controls'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetPlayground}
                  title={isId ? 'Kembalikan ke pengaturan awal' : 'Reset to default settings'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '4px 8px', fontSize: '11px', fontWeight: 'var(--font-weight-medium)',
                    background: 'transparent', color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <RotateCcw size={11} /> {isId ? 'Reset' : 'Reset All'}
                </button>
              </div>

              {/* 1. Chart Type */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {isId ? '1. Tipe Visualisasi' : '1. Chart Type'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {([
                    { id: 'bar', label: 'Bar', icon: <BarChart3 size={13} /> },
                    { id: 'line', label: 'Line', icon: <LineChartIcon size={13} /> },
                    { id: 'pie', label: 'Pie', icon: <PieChartIcon size={13} /> },
                    { id: 'donut', label: 'Donut', icon: <CircleDot size={13} /> },
                  ] as { id: NeuronChartType; label: string; icon: ReactNode }[]).map(t => {
                    const active = pgType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPgType(t.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                          padding: '7px 8px', fontSize: 'var(--fs-text-xs)', fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '6px' }}>
                  {([
                    { id: 'radar', label: 'Radar', icon: <Radar size={13} /> },
                    { id: 'sparkline', label: 'Sparkline', icon: <Activity size={13} /> },
                    { id: 'sankey', label: 'Sankey', icon: <Workflow size={13} /> },
                  ] as { id: NeuronChartType; label: string; icon: ReactNode }[]).map(t => {
                    const active = pgType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPgType(t.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                          padding: '7px 8px', fontSize: 'var(--fs-text-xs)', fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Size */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {isId ? '2. Ukuran Canvas' : '2. Canvas Size'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {([
                    { id: 'sm', label: 'SM', sub: '320px' },
                    { id: 'md', label: 'MD', sub: '480px' },
                    { id: 'lg', label: 'LG', sub: '640px' },
                    { id: 'xl', label: 'XL', sub: '800px' },
                  ] as { id: NeuronChartSize; label: string; sub: string }[]).map(sz => {
                    const active = pgSize === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setPgSize(sz.id)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          padding: '6px 4px', fontSize: 'var(--fs-text-xs)',
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-semibold)' }}>{sz.label}</span>
                        <span style={{ fontSize: '10px', opacity: 0.75 }}>{sz.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Color Scheme */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {isId ? '3. Skema Warna' : '3. Color Palette'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                  {([
                    { id: 'brand', label: 'Brand', bg: '#f97316' },
                    { id: 'spectrum', label: 'Spectrum', bg: 'linear-gradient(135deg, #f97316, #0ea5e9, #10b981)' },
                    { id: 'mono', label: 'Mono', bg: '#64748b' },
                    { id: 'pastel', label: 'Pastel', bg: 'linear-gradient(135deg, #fbcfe8, #c7d2fe)' },
                    { id: 'vivid', label: 'Vivid', bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
                  ] as { id: NeuronChartColorScheme; label: string; bg: string }[]).map(cs => {
                    const active = pgColorScheme === cs.id;
                    return (
                      <button
                        key={cs.id}
                        type="button"
                        onClick={() => setPgColorScheme(cs.id)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          padding: '6px 4px', fontSize: '11px', fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: cs.bg, display: 'inline-block' }} />
                        <span>{cs.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional: Orientation & Stacked for Bar */}
              {pgType === 'bar' && (
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)'
                }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                      {isId ? 'Orientasi Bar' : 'Bar Orientation'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {(['vertical', 'horizontal'] as NeuronChartOrientation[]).map(o => {
                        const active = pgOrientation === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            onClick={() => setPgOrientation(o)}
                            style={{
                              padding: '6px 10px', fontSize: 'var(--fs-text-xs)', fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                              border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                              background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                              borderRadius: 'var(--radius-sm)', cursor: 'pointer', textTransform: 'capitalize',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <NeuronCheckbox
                      size="sm"
                      checked={pgStacked}
                      onChange={setPgStacked}
                      label={isId ? 'Mode Bertumpuk (Stacked)' : 'Stacked Mode'}
                    />
                  </div>
                </div>
              )}

              {/* Conditional: Inner Radius for Donut */}
              {pgType === 'donut' && (
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Inner Radius
                    </label>
                    <NeuronBadge size="sm" variant="brand">
                      {Math.round(pgInnerRadius * 100)}%
                    </NeuronBadge>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.85"
                    step="0.05"
                    value={pgInnerRadius}
                    onChange={e => setPgInnerRadius(parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--color-primary)',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              )}

              {/* 4. Display Features & Annotations */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {isId ? '4. Fitur & Anotasi' : '4. Features & Display'}
                </label>
                <div style={{
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-3)',
                  alignItems: 'center'
                }}>
                  {pgType !== 'sparkline' && pgType !== 'pie' && pgType !== 'donut' && pgType !== 'sankey' && (
                    <NeuronCheckbox
                      size="sm"
                      checked={pgShowGrid}
                      onChange={setPgShowGrid}
                      label={isId ? 'Garis Grid' : 'Grid Lines'}
                    />
                  )}
                  {pgType !== 'sparkline' && pgType !== 'sankey' && (
                    <NeuronCheckbox
                      size="sm"
                      checked={pgShowLegend}
                      onChange={setPgShowLegend}
                      label="Legend"
                    />
                  )}
                  <NeuronCheckbox
                    size="sm"
                    checked={pgShowTooltip}
                    onChange={setPgShowTooltip}
                    label="Tooltip"
                  />
                  <NeuronCheckbox
                    size="sm"
                    checked={pgShowLabels}
                    onChange={setPgShowLabels}
                    label={isId ? 'Label Data' : 'Data Labels'}
                  />
                  <NeuronCheckbox
                    size="sm"
                    checked={pgAnimated}
                    onChange={setPgAnimated}
                    label={isId ? 'Animasi' : 'Animated'}
                  />
                  {pgType === 'line' && (
                    <>
                      <NeuronCheckbox
                        size="sm"
                        checked={pgSmooth}
                        onChange={setPgSmooth}
                        label={isId ? 'Kurva Halus' : 'Smooth Curve'}
                      />
                      <NeuronCheckbox
                        size="sm"
                        checked={pgShowArea}
                        onChange={setPgShowArea}
                        label={isId ? 'Isian Area' : 'Area Fill'}
                      />
                      <NeuronCheckbox
                        size="sm"
                        checked={pgShowDots}
                        onChange={setPgShowDots}
                        label={isId ? 'Titik Data' : 'Data Dots'}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Live Canvas Preview */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              height: '100%'
            }}>
              {/* Preview Canvas Card */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                {/* Canvas Top Bar */}
                <div style={{
                  padding: '12px 18px',
                  background: 'var(--color-bg-subtle)',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    <span style={{ fontSize: '13px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                      {isId ? 'Pratinjau Langsung' : 'Live Canvas Preview'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <NeuronBadge size="sm" variant="brand">
                      {pgType.toUpperCase()}
                    </NeuronBadge>
                    <NeuronBadge size="sm" variant="gray">
                      {pgSize.toUpperCase()} ({pgSize === 'sm' ? '320×200' : pgSize === 'md' ? '480×300' : pgSize === 'lg' ? '640×400' : '800×500'})
                    </NeuronBadge>
                    <NeuronBadge size="sm" variant="outline">
                      {pgColorScheme}
                    </NeuronBadge>
                  </div>
                </div>

                {/* Canvas Center Area */}
                <div style={{
                  padding: 'var(--space-8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '380px',
                  background: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  overflowX: 'auto',
                  flex: 1
                }}>
                  <NeuronChart
                    type={pgType}
                    data={getPlaygroundData().data}
                    sankeyData={pgType === 'sankey' ? (SANKEY_BY_SIZE[pgSize] || SAMPLE_SANKEY_GOVERNANCE) : undefined}
                    size={pgSize}
                    colorScheme={pgColorScheme}
                    orientation={pgOrientation}
                    stacked={pgStacked}
                    smooth={pgSmooth}
                    showArea={pgShowArea}
                    showDots={pgShowDots}
                    innerRadius={pgInnerRadius}
                    showGrid={pgShowGrid}
                    showLegend={pgShowLegend}
                    showTooltip={pgShowTooltip}
                    showLabels={pgShowLabels}
                    animated={pgAnimated}
                  />
                </div>

                {/* Canvas Footer Status */}
                <div style={{
                  padding: '10px 18px',
                  background: 'var(--color-bg-subtle)',
                  borderTop: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)'
                }}>
                  <span>
                    {pgType === 'sankey'
                      ? (isId ? 'Alur Sankey bertingkat' : 'Multi-stage Sankey flow')
                      : (isId ? `Data: ${getPlaygroundData().data.length} titik nilai` : `Data: ${getPlaygroundData().data.length} data points`)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={11} style={{ color: 'var(--color-primary)' }} />
                    Interactive SVG • Responsive
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Viewer Section */}
          <div style={{
            marginTop: 'var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid #1e293b',
            background: '#0f172a',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Code Header Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              background: '#020617',
              borderBottom: '1px solid #1e293b',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Mac window dots */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                </div>
                {/* Tab switchers */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setPgCodeTab('react')}
                    style={{
                      padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                      borderRadius: 'var(--radius-sm)', border: 'none',
                      background: pgCodeTab === 'react' ? 'var(--color-primary)' : 'transparent',
                      color: pgCodeTab === 'react' ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    React
                  </button>
                  <button
                    type="button"
                    onClick={() => setPgCodeTab('vue')}
                    style={{
                      padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                      borderRadius: 'var(--radius-sm)', border: 'none',
                      background: pgCodeTab === 'vue' ? 'var(--color-primary)' : 'transparent',
                      color: pgCodeTab === 'vue' ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    Vue 3
                  </button>
                  <button
                    type="button"
                    onClick={() => setPgCodeTab('html')}
                    style={{
                      padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                      borderRadius: 'var(--radius-sm)', border: 'none',
                      background: pgCodeTab === 'html' ? 'var(--color-primary)' : 'transparent',
                      color: pgCodeTab === 'html' ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    HTML/CSS
                  </button>
                  <button
                    type="button"
                    onClick={() => setPgCodeTab('json')}
                    style={{
                      padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                      borderRadius: 'var(--radius-sm)', border: 'none',
                      background: pgCodeTab === 'json' ? 'var(--color-primary)' : 'transparent',
                      color: pgCodeTab === 'json' ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    JSON
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={copyCode}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '5px 12px', fontSize: '12px', fontWeight: 500,
                  background: copiedCode ? '#059669' : '#1e293b',
                  color: '#ffffff',
                  border: '1px solid', borderColor: copiedCode ? '#10b981' : '#334155',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.15s ease'
                }}
              >
                {copiedCode ? <><Check size={13} /> {isId ? 'Tersalin!' : 'Copied!'}</> : <><Copy size={13} /> {isId ? 'Salin Kode' : 'Copy Code'}</>}
              </button>
            </div>

            {/* Code Content */}
            <pre style={{
              margin: 0,
              padding: 'var(--space-4)',
              fontSize: '12px',
              lineHeight: 1.65,
              overflowX: 'auto',
              color: '#e2e8f0',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
              background: 'transparent'
            }}>
              {generatedCode}
            </pre>
          </div>
        </div>
      </section>

      {/* 2. Use Case 1: Sales Dashboard KPI */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Kasus 1: Dashboard Penjualan KPI' : 'Use Case 1: Sales Dashboard KPI'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          {isId ? 'Bar chart grouped menampilkan revenue, expenses, dan profit per kuartal.' : 'Grouped bar chart showing revenue, expenses, and profit per quarter.'}
        </p>
        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <NeuronChart
            type="bar"
            series={SAMPLE_MULTI_SERIES}
            categories={SAMPLE_CATEGORIES}
            size="lg"
            colorScheme="spectrum"
            showGrid
            showLegend
            title={isId ? 'Laporan Keuangan Q1–Q6' : 'Financial Report Q1–Q6'}
            subtitle={isId ? 'Revenue vs Expenses vs Profit (dalam ribuan USD)' : 'Revenue vs Expenses vs Profit (in thousands USD)'}
          />
        </div>
      </section>

      {/* 3. Use Case 2: Analytics Traffic Trend */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Kasus 2: Tren Traffic Analytics' : 'Use Case 2: Analytics Traffic Trend'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          {isId ? 'Line chart multi-line dengan area fill menampilkan daily visits.' : 'Multi-line chart with area fill showing daily visits.'}
        </p>
        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <NeuronChart
            type="line"
            series={[
              { name: 'Page Views', data: [1200, 1900, 1700, 2400, 2100, 2800, 2500] },
              { name: 'Unique Visitors', data: [800, 1200, 1100, 1600, 1400, 1900, 1700] },
              { name: 'Sessions', data: [600, 950, 850, 1300, 1100, 1500, 1300] },
            ]}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            size="lg"
            colorScheme="spectrum"
            smooth
            showArea
            showDots
            title={isId ? 'Traffic Mingguan' : 'Weekly Traffic Overview'}
            subtitle={isId ? 'Page Views, Unique Visitors, dan Sessions' : 'Page Views, Unique Visitors, and Sessions'}
          />
        </div>
      </section>

      {/* 4. Use Case 3: Market Share Distribution */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Kasus 3: Distribusi Market Share' : 'Use Case 3: Market Share Distribution'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          {isId ? 'Donut chart dengan legend menampilkan browser usage.' : 'Donut chart with legend showing browser/platform usage.'}
        </p>
        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
            <NeuronChart
              type="donut"
              data={[
                { label: 'Chrome', value: 63 },
                { label: 'Safari', value: 19 },
                { label: 'Firefox', value: 8 },
                { label: 'Edge', value: 6 },
                { label: 'Other', value: 4 },
              ]}
              size="md"
              colorScheme="vivid"
              innerRadius={0.6}
              showLabels
              title={isId ? 'Pangsa Browser Desktop' : 'Desktop Browser Share'}
              subtitle="Q3 2026"
            />
            <NeuronChart
              type="pie"
              data={[
                { label: 'iOS', value: 52 },
                { label: 'Android', value: 41 },
                { label: 'Other', value: 7 },
              ]}
              size="md"
              colorScheme="brand"
              showLabels
              title={isId ? 'Pangsa OS Mobile' : 'Mobile OS Share'}
              subtitle="Q3 2026"
            />
          </div>
        </div>
      </section>

      {/* 5. Use Case 4: Performance Radar & Sparkline Metrics */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Kasus 4: Radar Performa & Metrik Sparkline' : 'Use Case 4: Performance Radar & Sparkline Metrics'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          {isId ? 'Radar chart untuk team KPI + sparkline inline mini charts.' : 'Radar chart for team KPI + sparkline inline mini charts.'}
        </p>
        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
            <NeuronChart
              type="radar"
              series={[
                { name: 'Team Alpha', data: [85, 90, 70, 95, 80, 75] },
                { name: 'Team Beta', data: [70, 80, 85, 75, 90, 65] },
              ]}
              categories={['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design']}
              size="md"
              colorScheme="spectrum"
              title={isId ? 'Perbandingan Performa Tim' : 'Team Performance Comparison'}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                {isId ? 'Metrik Cepat' : 'Quick Metrics'}
              </h3>
              {[
                { label: isId ? 'Pendapatan' : 'Revenue', value: '$24.5K', change: '+12.4%', positive: true, sparkData: SAMPLE_SPARKLINE_DATA },
                { label: isId ? 'Pengguna' : 'Users', value: '8,421', change: '+8.2%', positive: true, sparkData: [
                  { label: '1', value: 50 }, { label: '2', value: 42 }, { label: '3', value: 55 },
                  { label: '4', value: 48 }, { label: '5', value: 62 }, { label: '6', value: 58 },
                  { label: '7', value: 70 }, { label: '8', value: 68 },
                ]},
                { label: isId ? 'Konversi' : 'Conversion', value: '3.2%', change: '-1.5%', positive: false, sparkData: [
                  { label: '1', value: 40 }, { label: '2', value: 38 }, { label: '3', value: 42 },
                  { label: '4', value: 35 }, { label: '5', value: 30 }, { label: '6', value: 32 },
                  { label: '7', value: 28 }, { label: '8', value: 25 },
                ]},
                { label: isId ? 'Waktu Respon' : 'Response Time', value: '142ms', change: '-18.3%', positive: true, sparkData: [
                  { label: '1', value: 200 }, { label: '2', value: 180 }, { label: '3', value: 190 },
                  { label: '4', value: 170 }, { label: '5', value: 160 }, { label: '6', value: 155 },
                  { label: '7', value: 148 }, { label: '8', value: 142 },
                ]},
              ].map((metric, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 'var(--font-weight-medium)' }}>{metric.label}</p>
                    <p style={{ margin: 0, fontSize: 'var(--fs-text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>{metric.value}</p>
                  </div>
                  <NeuronChart type="sparkline" data={metric.sparkData} colorScheme={metric.positive ? 'brand' : 'vivid'} smooth showArea />
                  <span style={{
                    fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)',
                    color: metric.positive ? 'var(--color-success)' : 'var(--color-danger)',
                    minWidth: 50, textAlign: 'right',
                  }}>
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. API Reference */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Referensi API Komponen' : 'Component API Reference'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          {isId ? 'Daftar lengkap properti NeuronChart.' : 'Complete list of NeuronChart properties.'}
        </p>

        <div className="section-card" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-text-sm)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Type</th>
                <th style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Default</th>
                <th style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-semibold)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['type', "'bar' | 'line' | 'pie' | 'donut' | 'radar' | 'sparkline'", '—', 'Chart visualization type (required)'],
                ['data', 'ChartDataPoint[]', '—', 'Data points for single-series charts'],
                ['series', 'ChartSeries[]', '—', 'Multi-series data for grouped/stacked charts'],
                ['categories', 'string[]', '—', 'Category labels for x-axis (used with series)'],
                ['orientation', "'vertical' | 'horizontal'", "'vertical'", 'Bar chart direction'],
                ['stacked', 'boolean', 'false', 'Stack bars on top of each other'],
                ['smooth', 'boolean', 'true', 'Use smooth bezier curves for line chart'],
                ['showArea', 'boolean', 'false', 'Show area fill under line'],
                ['showDots', 'boolean', 'true', 'Show data point dots on line chart'],
                ['innerRadius', 'number', '0.55', 'Donut inner radius ratio (0–0.9)'],
                ['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Component size'],
                ['colorScheme', "'brand' | 'spectrum' | 'mono' | 'pastel' | 'vivid'", "'spectrum'", 'Color palette'],
                ['showGrid', 'boolean', 'true', 'Show grid lines'],
                ['showLegend', 'boolean', 'true', 'Show legend'],
                ['showTooltip', 'boolean', 'true', 'Enable interactive tooltip'],
                ['showLabels', 'boolean', 'false', 'Show value labels on data points'],
                ['animated', 'boolean', 'true', 'Animate chart entry'],
                ['title', 'string', '—', 'Chart title'],
                ['subtitle', 'string', '—', 'Chart subtitle'],
                ['ariaLabel', 'string', '—', 'Accessibility label'],
                ['className', 'string', "''", 'Additional CSS class name'],
                ['style', 'CSSProperties', '—', 'Additional inline styles'],
              ].map(([prop, type, def, desc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary)', fontSize: 'var(--fs-text-xs)' }}>{prop}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: "'JetBrains Mono', monospace", color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-xs)' }}>{type}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: "'JetBrains Mono', monospace", color: 'var(--color-text-tertiary)', fontSize: 'var(--fs-text-xs)' }}>{def}</td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  // ─── MAIN RENDER ──────────────────────────────────────────────────────────
  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{isId ? 'Komponen' : 'Components'}</span>
            <h1 className="page-title">Chart</h1>
            <p className="page-subtitle">
              {isId
                ? 'Komponen visualisasi data berbasis SVG dengan 6 tipe chart, 5 skema warna, animasi masuk, dan tooltip interaktif.'
                : 'SVG-based data visualization component with 6 chart types, 5 color schemes, animated entries, and interactive tooltips.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('guideline')}
          >
            {isId ? 'Panduan' : 'Guideline'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div key={activeViewTab} className="chart-gallery-fade-in">
        {activeViewTab === 'guideline' ? renderGuideline() : renderPlaybook()}
      </div>

      {/* Navigation */}
      <div style={{ marginTop: 'var(--space-10)' }}>
        <NextPrevious
          prev={{ id: 'comp-card', label: t.nav.compCard }}
          next={{ id: 'comp-checkbox', label: t.nav.compCheckbox }}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
