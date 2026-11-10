import React, { useState } from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronButton from '../../../components/NeuronButton';
import NeuronProgress from '../../../components/NeuronProgress';
import {
  TrendingUp,
  Target,
  MousePointerClick,
  DollarSign,
  Play,
  Pause,
} from 'lucide-react';

interface MarketingGrowthDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export default function MarketingGrowthDashboard({
  isId,
  previewTheme,
  onTriggerModal,
}: MarketingGrowthDashboardProps) {
  const isDark = previewTheme === 'dark';
  const [adStatuses, setAdStatuses] = useState<Record<string, boolean>>({
    'ad-1': true,
    'ad-2': true,
    'ad-3': false,
    'ad-4': true,
  });

  const funnelStages = [
    { name: isId ? 'Tayangan Iklan (Impressions)' : 'Total Impressions', volume: '2,840,000', convRate: '22.8%', nextLabel: 'Click Through', dropoff: '77.2%', widthPct: 100, color: '#64748b' },
    { name: isId ? 'Pengunjung Situs (Visitors)' : 'Site Visitors', volume: '648,000', convRate: '1.93%', nextLabel: 'Lead Conversion', dropoff: '98.07%', widthPct: 78, color: '#3b82f6' },
    { name: isId ? 'Lead Kualifikasi Pemasaran (MQL)' : 'Marketing Qualified (MQL)', volume: '12,500', convRate: '30.5%', nextLabel: 'Sales Qualified', dropoff: '69.5%', widthPct: 56, color: '#8b5cf6' },
    { name: isId ? 'Peluang Penjualan (SQL / Demo)' : 'Sales Qualified (SQL)', volume: '3,820', convRate: '48.2%', nextLabel: 'Closed-Won Deal', dropoff: '51.8%', widthPct: 38, color: '#df7e30' },
    { name: isId ? 'Pelanggan Berbayar (Customers)' : 'Paid Active Customers', volume: '1,840', convRate: 'N/A', nextLabel: 'Cohort Retained', dropoff: '0%', widthPct: 24, color: '#10b981' },
  ];

  const channelAttribution = [
    { channel: 'Google Search Ads', spend: '$42,500', roas: '5.72x', cac: '$38.20', conv: '1,112', budgetPacing: 88, status: 'Scaling' },
    { channel: 'Meta Paid Social', spend: '$28,400', roas: '4.50x', cac: '$44.50', conv: '638', budgetPacing: 72, status: 'Healthy' },
    { channel: 'LinkedIn B2B Ads', spend: '$19,800', roas: '4.19x', cac: '$86.00', conv: '230', budgetPacing: 95, status: 'Target High LTV' },
    { channel: 'Organic Search / SEO', spend: '$6,200', roas: '12.40x', cac: '$14.10', conv: '440', budgetPacing: 45, status: 'Compounding' },
    { channel: 'Newsletter & Influencer', spend: '$8,500', roas: '3.80x', cac: '$52.00', conv: '164', budgetPacing: 60, status: 'Testing' },
  ];

  const cohortData = [
    { cohort: 'Jan 2026', m0: '100%', m1: '78%', m2: '64%', m3: '58%', m4: '54%', m5: '52%' },
    { cohort: 'Feb 2026', m0: '100%', m1: '81%', m2: '68%', m3: '61%', m4: '57%', m5: '-' },
    { cohort: 'Mar 2026', m0: '100%', m1: '84%', m2: '72%', m3: '66%', m4: '-', m5: '-' },
    { cohort: 'Apr 2026', m0: '100%', m1: '86%', m2: '75%', m3: '-', m4: '-', m5: '-' },
    { cohort: 'May 2026', m0: '100%', m1: '89%', m2: '-', m3: '-', m4: '-', m5: '-' },
    { cohort: 'Jun 2026', m0: '100%', m1: '-', m2: '-', m3: '-', m4: '-', m5: '-' },
  ];

  const liveCampaigns = [
    {
      id: 'ad-1',
      title: 'Enterprise Q4 Scale - Search US/EU',
      channel: 'Google Search',
      dailyBudget: '$1,500/day',
      spentToday: '$1,140',
      ctr: '4.82%',
      roas: '5.8x',
    },
    {
      id: 'ad-2',
      title: 'Retargeting Demo Abandoners - Video Reel',
      channel: 'Meta Social',
      dailyBudget: '$800/day',
      spentToday: '$520',
      ctr: '3.15%',
      roas: '4.6x',
    },
    {
      id: 'ad-3',
      title: 'DevOps & CTO Sponsored Benchmark Whitepaper',
      channel: 'LinkedIn B2B',
      dailyBudget: '$600/day',
      spentToday: '$0',
      ctr: '1.95%',
      roas: '3.4x',
    },
    {
      id: 'ad-4',
      title: 'High-Intent Comparison Page Search Ads',
      channel: 'Google Search',
      dailyBudget: '$950/day',
      spentToday: '$890',
      ctr: '6.20%',
      roas: '7.1x',
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
            <div>STATUS: CAMPAIGN_UPDATED</div>
            <div>OPTIMIZER_ENGINE: MultiTouch_Markov_Attribution</div>
            <div>AUDIT_STAMP: {new Date().toISOString()}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <NeuronButton variant="primary" size="sm">
              Apply Optimization
            </NeuronButton>
          </div>
        </div>
      );
    }
  };

  const toggleCampaign = (id: string) => {
    setAdStatuses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ── Key Marketing KPIs ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          {
            label: isId ? 'Rata-rata Blended CAC' : 'Blended CAC',
            value: '$42.10',
            sub: 'Target: < $48.00 (-12.3%)',
            positive: true,
            icon: Target,
            color: '#10b981',
          },
          {
            label: isId ? 'Total Blended ROAS' : 'Blended ROAS',
            value: '4.85x',
            sub: '+0.65x vs previous quarter',
            positive: true,
            icon: TrendingUp,
            color: '#df7e30',
          },
          {
            label: isId ? 'Rasio Konversi Corong' : 'Overall Funnel Conversion',
            value: '3.42%',
            sub: 'Top decile benchmark',
            positive: true,
            icon: MousePointerClick,
            color: '#3b82f6',
          },
          {
            label: isId ? 'Nilai Rata-rata LTV' : 'Estimated LTV / Customer',
            value: '$1,840',
            sub: 'LTV:CAC Ratio 43.7x',
            positive: true,
            icon: DollarSign,
            color: '#8b5cf6',
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
                <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Geometric 5-Stage Conversion Funnel Visualizer ── */}
      <NeuronCard
        title={isId ? 'Corong Konversi Pelanggan Bertahap (Geometric Conversion Funnel)' : '5-Stage Geometric Conversion Waterfall'}
        subtitle={isId ? 'Analisis efisiensi transisi per tahap dari tayangan iklan hingga pelanggan aktif' : 'Step-by-step conversion efficiency, drop-off rates, and acquisition volume'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          {funnelStages.map((stage, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 1fr 140px',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              }}
            >
              {/* Stage Title and Count */}
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: stage.color, marginTop: '2px' }}>
                  {stage.volume}
                </div>
              </div>

              {/* Geometric Visual Bar with Dropoff indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    height: '24px',
                    width: `${stage.widthPct}%`,
                    backgroundColor: stage.color,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 2px 8px ${stage.color}35`,
                  }}
                >
                  Step {idx + 1}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                  <span>Transition: <strong style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>{stage.convRate}</strong></span>
                  {idx < funnelStages.length - 1 && (
                    <span style={{ color: '#ef4444' }}>Dropoff: {stage.dropoff}</span>
                  )}
                </div>
              </div>

              {/* Next Step Metric Pill */}
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
                    color: isDark ? '#cbd5e1' : '#475569',
                  }}
                >
                  {stage.nextLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </NeuronCard>

      {/* ── Channel Attribution Matrix & Cohort Retention Heatmap ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          gap: '20px',
        }}
      >
        {/* Channel Attribution Matrix */}
        <NeuronCard
          title={isId ? 'Matriks Atribusi Saluran Pemasaran' : 'Multi-Channel Attribution Matrix'}
          subtitle={isId ? 'Efisiensi belanja iklan dan rasio ROAS per saluran' : 'Real-time spend pacing, CPA, and return on ad spend'}
        >
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${isDark ? '#334155' : '#e2e8f0'}`, color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.75rem' }}>
                  <th style={{ padding: '8px 12px' }}>Channel</th>
                  <th style={{ padding: '8px 12px' }}>Spend / Pacing</th>
                  <th style={{ padding: '8px 12px' }}>ROAS</th>
                  <th style={{ padding: '8px 12px' }}>CAC</th>
                  <th style={{ padding: '8px 12px' }}>Conversions</th>
                </tr>
              </thead>
              <tbody>
                {channelAttribution.map((ch, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}` }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {ch.channel}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600 }}>{ch.spend}</div>
                      <div style={{ width: '90px', marginTop: '4px' }}>
                        <NeuronProgress value={ch.budgetPacing} color="primary" height={4} />
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#df7e30' }}>
                      {ch.roas}
                    </td>
                    <td style={{ padding: '12px', color: isDark ? '#cbd5e1' : '#334155' }}>
                      {ch.cac}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#10b981' }}>
                      {ch.conv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeuronCard>

        {/* Cohort Retention Heatmap Matrix */}
        <NeuronCard
          title={isId ? 'Matriks Retensi Cohort Pengguna' : 'User Retention Cohort Heatmap'}
          subtitle={isId ? 'Persentase pengguna yang kembali bertransaksi setelah M0' : 'Percentage of retained users across consecutive months'}
        >
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${isDark ? '#334155' : '#e2e8f0'}`, color: isDark ? '#94a3b8' : '#64748b' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Cohort</th>
                  <th style={{ padding: '8px' }}>M0</th>
                  <th style={{ padding: '8px' }}>M1</th>
                  <th style={{ padding: '8px' }}>M2</th>
                  <th style={{ padding: '8px' }}>M3</th>
                  <th style={{ padding: '8px' }}>M4</th>
                  <th style={{ padding: '8px' }}>M5</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}` }}>
                    <td style={{ padding: '8px', textAlign: 'left', fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {row.cohort}
                    </td>
                    {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, cIdx) => {
                      const num = parseInt(val.replace('%', ''));
                      let bg = 'transparent';
                      let textColor = isDark ? '#cbd5e1' : '#334155';

                      if (!isNaN(num)) {
                        if (num >= 85) {
                          bg = 'rgba(223, 126, 48, 0.9)';
                          textColor = '#ffffff';
                        } else if (num >= 70) {
                          bg = 'rgba(223, 126, 48, 0.65)';
                          textColor = '#ffffff';
                        } else if (num >= 55) {
                          bg = 'rgba(223, 126, 48, 0.35)';
                        } else {
                          bg = 'rgba(223, 126, 48, 0.15)';
                        }
                      }

                      return (
                        <td key={cIdx} style={{ padding: '6px' }}>
                          <div
                            style={{
                              padding: '6px 4px',
                              borderRadius: '4px',
                              backgroundColor: bg,
                              color: textColor,
                              fontWeight: 600,
                            }}
                          >
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeuronCard>
      </div>

      {/* ── Live Adset & Experimentation Controls ── */}
      <NeuronCard
        title={isId ? 'Kontrol Langsung Kampanye & Split Test A/B' : 'Live Adset Campaigns & A/B Experimentation Engine'}
        subtitle={isId ? 'Pengendalian status tayang iklan dan optimasi anggaran real-time' : 'Pause or activate ad sets directly with immediate budget pacing adjustments'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
          {liveCampaigns.map((ad) => {
            const isActive = adStatuses[ad.id] ?? true;

            return (
              <div
                key={ad.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                  border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={() => toggleCampaign(ad.id)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isActive ? '#df7e30' : isDark ? '#334155' : '#cbd5e1',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isActive ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <div>
                    <div style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a', fontSize: '0.9rem' }}>
                      {ad.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      Channel: <strong>{ad.channel}</strong> • CTR: <strong>{ad.ctr}</strong> • ROAS: <strong style={{ color: '#10b981' }}>{ad.roas}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.76rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      Budget / Spent Today
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {ad.spentToday} / {ad.dailyBudget}
                    </div>
                  </div>

                  <NeuronButton
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleActionClick(
                        `Sesuaikan Anggaran: ${ad.title}`,
                        `Anggaran harian saat ini: ${ad.dailyBudget}. Anda dapat meningkatkan alokasi ke $2.000/hari untuk memperluas jangkauan pemirsa.`
                      )
                    }
                  >
                    Adjust Budget
                  </NeuronButton>
                </div>
              </div>
            );
          })}
        </div>
      </NeuronCard>
    </div>
  );
}
