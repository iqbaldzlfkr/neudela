import React from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import NeuronProgress from '../../../components/NeuronProgress';
import {
  Star,
  Clock,
  AlertTriangle,
  Smile,
  Building2,
} from 'lucide-react';

interface CustomerSuccessDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export default function CustomerSuccessDashboard({
  isId,
  previewTheme,
  onTriggerModal,
}: CustomerSuccessDashboardProps) {
  const isDark = previewTheme === 'dark';

  const enterpriseAccounts = [
    {
      name: 'Snowflake Inc',
      arr: '$240,000',
      healthScore: 98,
      status: 'Champion Tier',
      csm: 'Iqbal Dzulfikar',
      lastTouch: 'Yesterday (Executive Check-in)',
      nps: 10,
      badgeVariant: 'success' as const,
    },
    {
      name: 'Stripe Payments UK',
      arr: '$420,000',
      healthScore: 94,
      status: 'Renewal in 42 Days',
      csm: 'Alex Rivera',
      lastTouch: '3 days ago (QBR Prep)',
      nps: 9,
      badgeVariant: 'primary' as const,
    },
    {
      name: 'Datadog Observability',
      arr: '$180,000',
      healthScore: 91,
      status: 'Feature Pilot Active',
      csm: 'Sarah Lin',
      lastTouch: 'Last week (API SCIM review)',
      nps: 9,
      badgeVariant: 'info' as const,
    },
    {
      name: 'BioHealth Corp',
      arr: '$95,000',
      healthScore: 62,
      status: 'At Risk (Low Usage)',
      csm: 'Marcus Vance',
      lastTouch: '12 days ago (Ticket Follow-up)',
      nps: 6,
      badgeVariant: 'danger' as const,
    },
  ];

  const triageLanes = [
    {
      lane: 'P0 Critical SLA (< 1h)',
      color: '#ef4444',
      tickets: [
        {
          id: 'TCK-4819',
          title: 'SSO Okta SAML Signature Certificate Expired',
          account: 'BioHealth Corp',
          timer: '00:14:22 remaining',
          assignee: 'DevOps Escalation Tier',
        },
      ],
    },
    {
      lane: 'P1 High Priority (< 4h)',
      color: '#df7e30',
      tickets: [
        {
          id: 'TCK-4812',
          title: 'Webhook delivery retry backoff failure on 504 gateway',
          account: 'Datadog Observability',
          timer: '01:45:00 remaining',
          assignee: 'Iqbal Dzulfikar',
        },
        {
          id: 'TCK-4808',
          title: 'Custom export schema missing parent workspace ID',
          account: 'Stripe Payments UK',
          timer: '02:30:15 remaining',
          assignee: 'Sarah Lin',
        },
      ],
    },
    {
      lane: 'P2 Normal Inquiries (< 12h)',
      color: '#3b82f6',
      tickets: [
        {
          id: 'TCK-4799',
          title: 'Billing invoice VAT tax exemption certificate update',
          account: 'FinServe Global',
          timer: '07:12:00 remaining',
          assignee: 'Finance Ops',
        },
        {
          id: 'TCK-4795',
          title: 'Seat license allocation increase (+50 developer seats)',
          account: 'Snowflake Inc',
          timer: '09:40:00 remaining',
          assignee: 'Iqbal Dzulfikar',
        },
      ],
    },
  ];

  const vocFeed = [
    {
      author: 'David Miller',
      role: 'VP Engineering at Snowflake',
      rating: 5,
      sentiment: 'Delighted',
      comment:
        'The Neudela enterprise component library cut our dashboard sprint timeline by 3 weeks. Incredible craftsmanship and token architecture.',
      tag: '#component-design',
      time: '2 hours ago',
    },
    {
      author: 'Claire Zhang',
      role: 'Staff Product Designer at Stripe',
      rating: 5,
      sentiment: 'Champion',
      comment:
        'Customer success team was instantly on our Slack bridge during the API migration. Fastest SLA turnaround we’ve experienced from any vendor.',
      tag: '#support-sla',
      time: '5 hours ago',
    },
    {
      author: 'Henrik Lindqvist',
      role: 'Lead Architect at BioHealth',
      rating: 4,
      sentiment: 'Constructive',
      comment:
        'High quality components. We’d love more documentation on customizing dark mode CSS token overrides for healthcare compliance.',
      tag: '#documentation',
      time: 'Yesterday',
    },
  ];

  const handleActionClick = (title: string, details: string) => {
    if (onTriggerModal) {
      onTriggerModal(
        title,
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: isDark ? '#94a3b8' : '#64748b' }}>
            {details}
          </p>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: isDark ? '#1e293b' : '#f8fafc',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              fontFamily: 'monospace',
              fontSize: '0.82rem',
            }}
          >
            <div>STATUS: ACTION_SCHEDULED</div>
            <div>CSM_AUTOMATION: Hubspot_Salesforce_Sync</div>
            <div>TIMESTAMP: {new Date().toISOString()}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <NeuronButton variant="primary" size="sm">
              Confirm CSM Action
            </NeuronButton>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ── Key Retention Metrics ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          {
            label: isId ? 'Indeks CSAT Rata-rata' : 'Average CSAT Score',
            value: '4.92 / 5.0',
            sub: '98.4% positive ratings',
            positive: true,
            icon: Star,
            color: '#df7e30',
          },
          {
            label: isId ? 'Net Promoter Score (NPS)' : 'Net Promoter Score (NPS)',
            value: '+74',
            sub: 'Promoters 82% vs Detractors 4%',
            positive: true,
            icon: Smile,
            color: '#10b981',
          },
          {
            label: isId ? 'Waktu Resolusi Pertama SLA' : 'Avg First Response SLA',
            value: '1.4 hrs',
            sub: 'Target: < 2.0 hrs (-30%)',
            positive: true,
            icon: Clock,
            color: '#3b82f6',
          },
          {
            label: isId ? 'Akun Dalam Risiko Churn' : 'Accounts Flagged At-Risk',
            value: '1 of 148',
            sub: 'BioHealth Corp (Intervention active)',
            positive: false,
            icon: AlertTriangle,
            color: '#ef4444',
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                padding: '16px 20px',
                borderRadius: '10px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.74rem', color: item.positive ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CSAT Radial Gauge & NPS Distribution & Enterprise Accounts Health ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: '20px',
        }}
      >
        {/* Radial CSAT Satisfaction Gauge */}
        <NeuronCard
          title={isId ? 'Indeks Kepuasan Pelanggan (CSAT)' : 'CSAT Radial Satisfaction Index'}
          subtitle={isId ? 'Berdasarkan 1.420 survei purna jual kuartal berjalan' : 'Based on 1,420 post-resolution customer responses'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            {/* SVG Circular Gauge */}
            <svg viewBox="0 0 200 120" style={{ width: '180px', height: '110px' }}>
              <defs>
                <linearGradient id="csatArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#df7e30" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              {/* Background semi-circle track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={isDark ? '#334155' : '#e2e8f0'}
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Filled arc (98.4%) */}
              <path
                d="M 20 100 A 80 80 0 0 1 176 92"
                fill="none"
                stroke="url(#csatArcGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251"
                strokeDashoffset="10"
              />
              <text
                x="100"
                y="85"
                textAnchor="middle"
                fill={isDark ? '#f8fafc' : '#0f172a'}
                fontSize="24"
                fontWeight="800"
              >
                4.92
              </text>
              <text
                x="100"
                y="102"
                textAnchor="middle"
                fill={isDark ? '#94a3b8' : '#64748b'}
                fontSize="10"
                fontWeight="600"
              >
                out of 5.0 Stars
              </text>
            </svg>

            {/* NPS Breakdown Bars */}
            <div style={{ width: '100%', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Promoters (9-10)</span>
                <strong>82% (1,164)</strong>
              </div>
              <NeuronProgress value={82} color="success" height={5} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#df7e30', fontWeight: 600 }}>Passives (7-8)</span>
                <strong>14% (198)</strong>
              </div>
              <NeuronProgress value={14} color="primary" height={5} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>Detractors (0-6)</span>
                <strong>4% (58)</strong>
              </div>
              <NeuronProgress value={4} color="danger" height={5} />
            </div>
          </div>
        </NeuronCard>

        {/* Enterprise Accounts Health Matrix */}
        <NeuronCard
          title={isId ? 'Matriks Kesehatan Portofolio Akun Enterprise' : 'Enterprise Accounts Health & Renewal Radar'}
          subtitle={isId ? 'Skor kesehatan prediktif berbasis pemakaian API dan interaksi CSM' : 'Predictive health scoring based on feature adoption and support tickets'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {enterpriseAccounts.map((acc, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                  border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#df7e30',
                    }}
                  >
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', fontSize: '0.9rem' }}>
                        {acc.name}
                      </span>
                      <NeuronBadge variant={acc.badgeVariant} size="sm">
                        {acc.status}
                      </NeuronBadge>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: '2px' }}>
                      ARR: <strong>{acc.arr}</strong> • CSM: {acc.csm} • {acc.lastTouch}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: acc.healthScore > 80 ? '#10b981' : '#ef4444' }}>
                      {acc.healthScore} / 100
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      Health Score
                    </div>
                  </div>
                  <NeuronButton
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleActionClick(
                        `Diagnostik Akun: ${acc.name}`,
                        `Skor kesehatan: ${acc.healthScore}/100. NPS: ${acc.nps}. Kontak CSM: ${acc.csm}.`
                      )
                    }
                  >
                    Inspect
                  </NeuronButton>
                </div>
              </div>
            ))}
          </div>
        </NeuronCard>
      </div>

      {/* ── Priority SLA Ticket Triage Lanes ── */}
      <div>
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
            {isId ? 'Jalur Triase Tiket Dukungan Berbasis SLA' : 'Priority SLA Support Ticket Triage Lanes'}
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>
            {isId ? 'Penanganan cepat insiden kritis sebelum batas waktu komitmen SLA terlampaui' : 'Real-time countdown to SLA breach per urgency category'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {triageLanes.map((lane, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '10px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${lane.color}`, paddingBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.86rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                  {lane.lane}
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '10px',
                    backgroundColor: `${lane.color}20`,
                    color: lane.color,
                    fontSize: '0.74rem',
                    fontWeight: 700,
                  }}
                >
                  {lane.tickets.length} Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lane.tickets.map((tck) => (
                  <div
                    key={tck.id}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                      border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.76rem', color: '#df7e30' }}>
                        {tck.id}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: lane.color, fontWeight: 700, fontFamily: 'monospace' }}>
                        {tck.timer}
                      </span>
                    </div>

                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {tck.title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: '4px' }}>
                      <span>Account: <strong>{tck.account}</strong></span>
                      <button
                        onClick={() =>
                          handleActionClick(
                            `Ambil Alih Tiket ${tck.id}`,
                            `Tiket ${tck.id} dialihkan ke pimpinan tim CSM untuk investigasi langsung.`
                          )
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#df7e30',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '0.74rem',
                          padding: 0,
                        }}
                      >
                        Triage Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Voice of Customer (VoC) Live Feedback Feed ── */}
      <NeuronCard
        title={isId ? 'Umpan Balik Pelanggan Langsung (Voice of Customer)' : 'Verified Voice of Customer (VoC) Feedback Feed'}
        subtitle={isId ? 'Komentar terverifikasi dari eksekutif teknik dan pengguna enterprise' : 'Real-time customer feedback stream with sentiment rating and direct CSM tags'}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '12px' }}>
          {vocFeed.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s < item.rating ? '#df7e30' : 'none'}
                      color={s < item.rating ? '#df7e30' : '#94a3b8'}
                    />
                  ))}
                </div>
                <NeuronBadge variant="primary" size="sm">
                  {item.sentiment}
                </NeuronBadge>
              </div>

              <p style={{ margin: 0, fontSize: '0.82rem', color: isDark ? '#cbd5e1' : '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                "{item.comment}"
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`, paddingTop: '8px', fontSize: '0.74rem' }}>
                <div>
                  <div style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
                    {item.author}
                  </div>
                  <div style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                    {item.role}
                  </div>
                </div>
                <span style={{ color: '#df7e30', fontWeight: 600 }}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </NeuronCard>
    </div>
  );
}
