import React from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import NeuronProgress from '../../../components/NeuronProgress';
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Award,
} from 'lucide-react';

interface ExecutiveSaasDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export default function ExecutiveSaasDashboard({
  isId,
  onTriggerModal,
}: ExecutiveSaasDashboardProps) {
  const monthsData = [
    { month: 'Jan', actual: 280, target: 250 },
    { month: 'Feb', actual: 310, target: 275 },
    { month: 'Mar', actual: 345, target: 300, milestone: 'Series B ($3.2M)' },
    { month: 'Apr', actual: 360, target: 325 },
    { month: 'May', actual: 380, target: 350 },
    { month: 'Jun', actual: 405, target: 380 },
    { month: 'Jul', actual: 425, target: 400 },
    { month: 'Aug', actual: 450, target: 425, milestone: 'Enterprise Tier' },
    { month: 'Sep', actual: 468, target: 450 },
    { month: 'Oct', actual: 482, target: 475, current: true },
    { month: 'Nov', projected: 505, target: 495 },
    { month: 'Dec', projected: 528, target: 515, milestone: '$5.2M Target' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ── Annual Goal Progress Strip ── */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(223, 126, 48, 0.12) 0%, rgba(223, 126, 48, 0.04) 100%)',
          border: '1px solid rgba(223, 126, 48, 0.25)',
          borderRadius: '12px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'var(--color-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Award size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Target ARR FY26: $5.00M' : 'FY26 ARR Milestone Goal: $5.00M'}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Pencapaian saat ini $4.82M · Hanya butuh $180K lagi untuk mencapai target tahunan' : 'Current ARR: $4.82M · Only $180K remaining to hit full-year budget projection'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
          <div style={{ flex: 1 }}>
            <NeuronProgress value={96.4} variant="brand" size="sm" />
          </div>
          <strong style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 800 }}>96.4%</strong>
        </div>
      </div>

      {/* ── 4 Strategic C-Suite KPI Cards ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Card 1: ARR */}
        <NeuronCard variant="default" padding="md" hoverable style={{ borderLeft: '3px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'ARR Tahunan' : 'Annual Recurring Revenue'}
            </span>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(223, 126, 48, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <DollarSign size={15} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              $4.82M
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} />
              +24.8% YoY
            </span>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <NeuronProgress value={84} size="xs" variant="brand" />
          </div>
        </NeuronCard>

        {/* Card 2: MRR */}
        <NeuronCard variant="default" padding="md" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'MRR Bulanan' : 'Monthly Recurring Revenue'}
            </span>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(223, 126, 48, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <TrendingUp size={15} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              $402.5K
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowUpRight size={13} />
              +8.4% MoM
            </span>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <NeuronProgress value={78} size="xs" variant="brand" />
          </div>
        </NeuronCard>

        {/* Card 3: NRR */}
        <NeuronCard variant="default" padding="md" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Net Revenue Retention' : 'Net Revenue Retention (NRR)'}
            </span>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(223, 126, 48, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ShieldCheck size={15} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em' }}>
              118.4%
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4 }}>
              Top Decile
            </span>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <NeuronProgress value={92} size="xs" variant="brand" />
          </div>
        </NeuronCard>

        {/* Card 4: Churn */}
        <NeuronCard variant="default" padding="md" hoverable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Tingkat Churn Logo' : 'Logo Churn Rate'}
            </span>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(223, 126, 48, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Activity size={15} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              0.84%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowDownRight size={13} />
              -0.16% opt
            </span>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <NeuronProgress value={22} size="xs" variant="brand" />
          </div>
        </NeuronCard>
      </div>

      {/* ── Main Middle Section: Asymmetric Dual Layout ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.1fr)',
          gap: '20px',
        }}
      >
        {/* Left: Custom SVG 12-Month ARR Bezier Curve with Target Projection */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Trajektori Pendapatan & Proyeksi Target FY26' : '12-Month Revenue & Target Projection Band'}
                </h3>
                <NeuronBadge size="xs" variant="brand">Real-Time Bezier</NeuronBadge>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {isId ? 'Garis solid merepresentasikan actuals; garis putus-putus menunjukkan proyeksi Q4.' : 'Solid spline indicates audited actuals; dashed trajectory extends to FY26 exit run-rate.'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: 10, height: 3, background: 'var(--color-primary)', borderRadius: 2 }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Actual ARR</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: 10, height: 3, borderTop: '2px dashed #f59e0b' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Projection Band</span>
              </div>
            </div>
          </div>

          {/* Bespoke Interactive SVG Bezier Chart */}
          <div style={{ width: '100%', height: '240px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 700 240" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="saasAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#df7e30" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#df7e30" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#df7e30" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 90, 140, 190].map((y) => (
                <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="var(--color-border)" strokeDasharray="3 3" opacity={0.6} />
              ))}

              {/* Actuals Area Fill (Jan to Oct: x 20 to 560) */}
              <path
                d="M 20,200 Q 140,185 240,160 T 420,105 T 560,55 L 560,200 L 20,200 Z"
                fill="url(#saasAreaGrad)"
              />

              {/* Projected Area Fill (Oct to Dec: x 560 to 680) */}
              <path
                d="M 560,55 Q 620,40 680,24 L 680,200 L 560,200 Z"
                fill="url(#projGrad)"
              />

              {/* Solid Actuals Spline */}
              <path
                d="M 20,200 Q 140,185 240,160 T 420,105 T 560,55"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Dashed Projected Spline */}
              <path
                d="M 560,55 Q 620,40 680,24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />

              {/* Series B Milestone Pin (x=160, y=175) */}
              <circle cx="160" cy="175" r="5" fill="#fff" stroke="var(--color-primary)" strokeWidth="2.5" />
              <g transform="translate(130, 140)">
                <rect width="70" height="20" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-border)" />
                <text x="35" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-primary)">Series B ($3.2M)</text>
              </g>

              {/* Enterprise Launch Milestone Pin (x=460, y=90) */}
              <circle cx="460" cy="90" r="5" fill="#fff" stroke="var(--color-primary)" strokeWidth="2.5" />
              <g transform="translate(425, 55)">
                <rect width="80" height="20" rx="4" fill="var(--color-bg-surface)" stroke="var(--color-border)" />
                <text x="40" y="14" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-primary)">Enterprise Launch</text>
              </g>

              {/* Current Node (Oct: x=560, y=55) */}
              <circle cx="560" cy="55" r="7" fill="var(--color-primary)" />
              <circle cx="560" cy="55" r="14" fill="rgba(223, 126, 48, 0.25)" />
              <circle cx="560" cy="55" r="3" fill="#fff" />
              <g transform="translate(525, 18)">
                <rect width="75" height="22" rx="5" fill="var(--color-primary)" />
                <text x="37" y="15" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">$4.82M (Oct)</text>
              </g>

              {/* Year End Target Node (Dec: x=680, y=24) */}
              <circle cx="680" cy="24" r="5" fill="#f59e0b" />
              <g transform="translate(635, 34)">
                <rect width="65" height="18" rx="4" fill="var(--color-bg-surface)" stroke="#f59e0b" />
                <text x="32" y="13" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b">$5.28M EOY</text>
              </g>

              {/* X Axis Month Labels */}
              {monthsData.map((m, i) => {
                const x = 20 + i * 60;
                return (
                  <text key={m.month} x={x} y="225" textAnchor="middle" fontSize="10" fill="var(--color-text-secondary)" fontWeight={m.current ? 700 : 500}>
                    {m.month}
                  </text>
                );
              })}
            </svg>
          </div>
        </NeuronCard>

        {/* Right: Concentric Multi-Ring Retention & Expansion Gauges */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                {isId ? 'Indeks Retensi Konsentris' : 'Concentric Retention Cohort'}
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {isId ? '3 Cincin Metrik: NRR, Gross, dan Logo.' : 'Triple-ring telemetry: NRR, GRR & Logo.'}
              </span>
            </div>
            <NeuronBadge size="xs" variant="brand">Cohort AA</NeuronBadge>
          </div>

          {/* Concentric Gauge SVG */}
          <div style={{ height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="170" height="170" viewBox="0 0 170 170">
              {/* Outer Ring: NRR (118.4% -> full ring + glow) */}
              <circle cx="85" cy="85" r="70" fill="none" stroke="rgba(223, 126, 48, 0.15)" strokeWidth="8" />
              <circle cx="85" cy="85" r="70" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray="400 440" strokeLinecap="round" />

              {/* Middle Ring: GRR (94.2%) */}
              <circle cx="85" cy="85" r="54" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="8" />
              <circle cx="85" cy="85" r="54" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="300 340" strokeLinecap="round" />

              {/* Inner Ring: Logo Retention (96.5%) */}
              <circle cx="85" cy="85" r="38" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="8" />
              <circle cx="85" cy="85" r="38" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="220 240" strokeLinecap="round" />
            </svg>

            {/* Center Label */}
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>118.4%</div>
              <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>NRR Net Score</div>
            </div>
          </div>

          {/* Gauge Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />
                <span>Net Revenue Retention (NRR)</span>
              </div>
              <strong style={{ color: 'var(--color-primary)' }}>118.4%</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                <span>Gross Revenue Retention</span>
              </div>
              <strong style={{ color: '#f59e0b' }}>94.2%</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                <span>Logo Customer Retention</span>
              </div>
              <strong style={{ color: '#10b981' }}>96.5%</strong>
            </div>
          </div>
        </NeuronCard>
      </div>

      {/* ── Bottom Section: Revenue Composition & Strategic Enterprise Accounts ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: '20px',
        }}
      >
        {/* Subscription Plan Breakdown */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                {isId ? 'Komposisi Paket Langganan' : 'Subscription Tier Composition'}
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {isId ? 'Beban pendapatan berdasarkan kategori akun.' : 'Revenue breakdown across enterprise tiers.'}
              </span>
            </div>
            <NeuronBadge size="xs" variant="brand">3 Tiers</NeuronBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Enterprise Suite ($15k+/mo)</span>
                <strong style={{ color: 'var(--color-primary)' }}>$2.51M (52%)</strong>
              </div>
              <NeuronProgress value={52} variant="brand" size="sm" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Scale Growth ($5k/mo)</span>
                <strong style={{ color: '#f59e0b' }}>$1.54M (32%)</strong>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--color-bg-canvas)', overflow: 'hidden' }}>
                <div style={{ width: '32%', height: '100%', background: '#f59e0b' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Team Starter ($1.5k/mo)</span>
                <strong style={{ color: 'var(--color-text-secondary)' }}>$771K (16%)</strong>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--color-bg-canvas)', overflow: 'hidden' }}>
                <div style={{ width: '16%', height: '100%', background: 'var(--color-text-tertiary)' }} />
              </div>
            </div>

            <div style={{ paddingTop: 10, borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <div>
                <div style={{ color: 'var(--color-text-secondary)' }}>Average Contract Value (ACV)</div>
                <strong style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>$17,680 / yr</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--color-text-secondary)' }}>Net Expansion YoY</div>
                <strong style={{ fontSize: '15px', color: '#10b981' }}>+18.2% lift</strong>
              </div>
            </div>
          </div>
        </NeuronCard>

        {/* Strategic Enterprise Accounts Table / Deal Cards */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                {isId ? 'Antrean Perpanjangan Kontrak Strategis' : 'Strategic Accounts Renewal Pipeline'}
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {isId ? 'Akun enterprise bernilai tinggi yang siap diperpanjang.' : 'High-ACV contracts in 90-day renewal evaluation.'}
              </span>
            </div>
            <NeuronBadge size="xs" variant="success">98.6% Renewal Target</NeuronBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Acme Enterprise Global', arr: '$180,000 / yr', term: '3-Year Term', days: '14 days', health: '98 Health', status: 'Approved' },
              { name: 'Snowflake Analytics B.V.', arr: '$310,000 / yr', term: 'Annual Multi', days: '45 days', health: '94 Health', status: 'Reviewing' },
              { name: 'Datadog EMEA Infrastructure', arr: '$195,000 / yr', term: 'Annual Direct', days: '72 days', health: '96 Health', status: 'Expanding' },
              { name: 'CloudScale Hypervisor Corp', arr: '$95,000 / yr', term: '2-Year Term', days: '88 days', health: '88 Health', status: 'Reviewing' },
            ].map((deal, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  fontSize: '12.5px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 6, background: 'rgba(223,126,48,0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{deal.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{deal.term} · {deal.days} left</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '13px' }}>{deal.arr}</div>
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>● {deal.health}</span>
                  </div>
                  <NeuronButton
                    size="xs"
                    variant="secondary"
                    onClick={() => {
                      if (onTriggerModal) {
                        onTriggerModal(
                          `Review Renewal: ${deal.name}`,
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div><strong>Contract ARR:</strong> {deal.arr}</div>
                            <div><strong>Renewal Target:</strong> {deal.days}</div>
                            <div><strong>Health Score:</strong> {deal.health}</div>
                            <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                              Executive discount approved up to 10% for 3-year pre-pay commitment.
                            </p>
                          </div>
                        );
                      }
                    }}
                  >
                    {isId ? 'Tinjau' : 'Review'}
                  </NeuronButton>
                </div>
              </div>
            ))}
          </div>
        </NeuronCard>
      </div>
    </div>
  );
}
