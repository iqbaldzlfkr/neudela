import React, { useState } from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import {
  Key,
} from 'lucide-react';

interface FintechTreasuryDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export default function FintechTreasuryDashboard({
  isId,
  previewTheme,
  onTriggerModal,
}: FintechTreasuryDashboardProps) {
  const isDark = previewTheme === 'dark';
  const [burnRateMultiplier, setBurnRateMultiplier] = useState<number>(0); // -30% to +50%

  const baseRunwayMonths = 28.4;
  const currentRunway = (baseRunwayMonths / (1 + burnRateMultiplier / 100)).toFixed(1);
  const baseMonthlyBurn = 420000;
  const simulatedBurn = Math.round(baseMonthlyBurn * (1 + burnRateMultiplier / 100));

  const multiCurrencyVaults = [
    {
      code: 'USD',
      symbol: '$',
      name: 'USD Operating Vault',
      bank: 'JPMorgan Chase (NY Fed)',
      balance: '12,450,200',
      convertedUsd: '$12,450,200',
      apy: '4.85%',
      delta24h: '+$184,200',
      positive: true,
      flag: '🇺🇸',
    },
    {
      code: 'EUR',
      symbol: '€',
      name: 'EUR Eurozone Treasury',
      bank: 'BNP Paribas (ECB Prime)',
      balance: '3,820,400',
      convertedUsd: '$4,164,236',
      apy: '3.75%',
      delta24h: '+$42,100',
      positive: true,
      flag: '🇪🇺',
    },
    {
      code: 'GBP',
      symbol: '£',
      name: 'GBP London Clearing',
      bank: 'Barclays Institutional',
      balance: '1,240,000',
      convertedUsd: '$1,624,400',
      apy: '4.20%',
      delta24h: '-£15,000',
      positive: false,
      flag: '🇬🇧',
    },
    {
      code: 'IDR',
      symbol: 'Rp',
      name: 'IDR APAC Operations',
      bank: 'Bank Central Asia (BCA)',
      balance: '18,500,000,000',
      convertedUsd: '$1,156,250',
      apy: '5.80%',
      delta24h: '+Rp 320M',
      positive: true,
      flag: '🇮🇩',
    },
  ];

  // Cashflow bi-directional data (inflow vs outflow)
  const cashflowTimeline = [
    { day: 'Mon', inflow: 380, outflow: 140, net: 240 },
    { day: 'Tue', inflow: 420, outflow: 210, net: 210 },
    { day: 'Wed', inflow: 290, outflow: 320, net: -30 }, // negative net
    { day: 'Thu', inflow: 510, outflow: 190, net: 320 },
    { day: 'Fri', inflow: 640, outflow: 280, net: 360 },
    { day: 'Sat', inflow: 180, outflow: 90, net: 90 },
    { day: 'Sun', inflow: 220, outflow: 110, net: 110 },
  ];

  const pendingWires = [
    {
      ref: 'TX-9941-USD',
      beneficiary: 'AWS Cloud Infrastructure Inc',
      amount: '$148,500.00',
      type: 'Vendor Outflow',
      compliance: 'OFAC & AML Verified',
      status: 'Awaiting Dual Key 2/2',
      signer1: 'CFO (Approved)',
      signer2: 'Treasury Dir (Pending)',
    },
    {
      ref: 'TX-9938-EUR',
      beneficiary: 'Neudela Europe BV (Subsid.)',
      amount: '€250,000.00',
      type: 'Intercompany Liquidity',
      compliance: 'Cross-Border EU Cleared',
      status: 'Awaiting Dual Key 1/2',
      signer1: 'Treasury Dir (Pending)',
      signer2: 'CFO (Pending)',
    },
    {
      ref: 'TX-9922-GBP',
      beneficiary: 'Latham & Watkins LLP',
      amount: '£45,200.00',
      type: 'Legal Retainer',
      compliance: 'KYC Verified Tier 3',
      status: 'Approved Ready to Clear',
      signer1: 'CFO (Approved)',
      signer2: 'Treasury Dir (Approved)',
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
            <div>SWIFT_GPI_TRACKER: UETR-88392019-3382-4112</div>
            <div>COMPLIANCE_STATUS: PASS_AUTOMATED_SANCTIONS</div>
            <div>SETTLEMENT_RAIL: Fedwire_Realtime_Gross</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <NeuronButton variant="primary" size="sm">
              Confirm Authorization
            </NeuronButton>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ── Multi-Currency Institutional Vault Cards ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {multiCurrencyVaults.map((vault) => (
          <div
            key={vault.code}
            style={{
              padding: '18px 20px',
              borderRadius: '12px',
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem' }}>{vault.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isDark ? '#f8fafc' : '#0f172a' }}>
                    {vault.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    {vault.bank}
                  </div>
                </div>
              </div>
              <NeuronBadge variant="info" size="sm">
                APY {vault.apy}
              </NeuronBadge>
            </div>

            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', letterSpacing: '-0.5px' }}>
                {vault.symbol} {vault.balance}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.76rem' }}>
                <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                  USD Equiv: <strong>{vault.convertedUsd}</strong>
                </span>
                <span style={{ color: vault.positive ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                  {vault.delta24h}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                borderTop: `1px solid ${isDark ? '#334155' : '#f1f5f9'}`,
                paddingTop: '10px',
              }}
            >
              <button
                onClick={() =>
                  handleActionClick(
                    `Konversi Valas / Swap: ${vault.code}`,
                    `Kurs live terjamin selama 60 detik. Saldo tersedia untuk konversi: ${vault.symbol} ${vault.balance}`
                  )
                }
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
                  backgroundColor: 'transparent',
                  color: isDark ? '#cbd5e1' : '#475569',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                FX Swap
              </button>
              <button
                onClick={() =>
                  handleActionClick(
                    `Penyetoran Likuiditas: ${vault.code}`,
                    `Rekening penampung di ${vault.bank} siap menerima deposit sweep harian.`
                  )
                }
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(223, 126, 48, 0.12)',
                  color: '#df7e30',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Transfer Out
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bi-Directional Cashflow Inflow vs Outflow Waterfall Chart ── */}
      <NeuronCard
        title={isId ? 'Air Terjun Arus Kas Bersih Harian (Bi-Directional Cashflow Waterfall)' : 'Daily Bi-Directional Inflow vs Outflow Waterfall'}
        subtitle={isId ? 'Visualisasi inflow (penerimaan di atas nol) vs outflow (pengeluaran di bawah nol)' : 'Ascending green bars represent daily inflows; descending terracotta bars indicate disbursements'}
      >
        <div style={{ marginTop: '16px' }}>
          {/* Custom SVG Waterfall Chart */}
          <svg
            viewBox="0 0 560 220"
            style={{
              width: '100%',
              height: 'auto',
              backgroundColor: isDark ? '#0f172a' : '#f8fafc',
              borderRadius: '10px',
              border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
            }}
          >
            <defs>
              <linearGradient id="inflowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#df7e30" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#df7e30" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Zero Baseline Axis */}
            <line
              x1="40"
              y1="110"
              x2="530"
              y2="110"
              stroke={isDark ? '#475569' : '#94a3b8'}
              strokeWidth="1.5"
            />
            <text
              x="20"
              y="114"
              fill={isDark ? '#94a3b8' : '#64748b'}
              fontSize="10"
              fontWeight="600"
            >
              $0
            </text>
            <text
              x="12"
              y="30"
              fill="#10b981"
              fontSize="9"
              fontWeight="700"
            >
              +$700k
            </text>
            <text
              x="14"
              y="190"
              fill="#df7e30"
              fontSize="9"
              fontWeight="700"
            >
              -$400k
            </text>

            {/* Guide Gridlines */}
            <line x1="40" y1="30" x2="530" y2="30" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="3,3" />
            <line x1="40" y1="70" x2="530" y2="70" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="3,3" />
            <line x1="40" y1="150" x2="530" y2="150" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="3,3" />
            <line x1="40" y1="190" x2="530" y2="190" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="3,3" />

            {/* Daily Bars */}
            {cashflowTimeline.map((item, idx) => {
              const xPos = 70 + idx * 68;
              // scale: 110 is zero. Max inflow 700k -> y = 30 (height 80). So ratio = 80 / 700 = 0.114
              const inflowHeight = (item.inflow / 700) * 80;
              const outflowHeight = (item.outflow / 400) * 75;

              return (
                <g key={idx}>
                  {/* Inflow bar (above zero) */}
                  <rect
                    x={xPos - 14}
                    y={110 - inflowHeight}
                    width="12"
                    height={inflowHeight}
                    rx="3"
                    fill="url(#inflowGrad)"
                  />
                  {/* Outflow bar (below zero) */}
                  <rect
                    x={xPos + 2}
                    y={110}
                    width="12"
                    height={outflowHeight}
                    rx="3"
                    fill="url(#outflowGrad)"
                  />

                  {/* Day label */}
                  <text
                    x={xPos}
                    y="210"
                    textAnchor="middle"
                    fill={isDark ? '#94a3b8' : '#64748b'}
                    fontSize="10"
                    fontWeight="600"
                  >
                    {item.day}
                  </text>

                  {/* Net badge callout */}
                  <circle
                    cx={xPos}
                    cy={110 - (item.net / 700) * 80}
                    r="4"
                    fill={item.net >= 0 ? '#3b82f6' : '#ef4444'}
                  />
                </g>
              );
            })}

            {/* Net Liquidity Spline connecting the net dots */}
            <path
              d="M 70 82 Q 138 86 138 86 T 206 113 T 274 73 T 342 68 T 410 100 T 478 97"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
          </svg>

          {/* Legend and Summary */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '14px',
              fontSize: '0.82rem',
              color: isDark ? '#94a3b8' : '#64748b',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981' }} />
                <span>Collections & Inflow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#df7e30' }} />
                <span>Disbursements & Outflow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '3px', backgroundColor: '#3b82f6' }} />
                <span>Net Daily Delta Curve</span>
              </div>
            </div>
            <div style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
              7-Day Net Cash Generated: <strong style={{ color: '#10b981' }}>+$1,190,000 USD</strong>
            </div>
          </div>
        </div>
      </NeuronCard>

      {/* ── Runway Stress Simulator & Dual-Signature Wire Clearance ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.4fr)',
          gap: '20px',
        }}
      >
        {/* Runway Scenario Stress Simulator */}
        <NeuronCard
          title={isId ? 'Simulator Skenario Runway & Burn Rate' : 'Runway Scenario Stress Simulator'}
          subtitle={isId ? 'Simulasi dampak peningkatan biaya operasional terhadap sisa masa hidup kas' : 'Interactive sensitivity slider for hiring & expansion burn variations'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                  Simulated Runway Horizon
                </span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#df7e30' }}>
                  {currentRunway} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Months</span>
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: '4px' }}>
                Monthly Net Burn: <strong>${(simulatedBurn / 1000).toFixed(0)}k / mo</strong> (Base: $420k)
              </div>
            </div>

            {/* Slider control */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '8px', fontWeight: 600 }}>
                <span>Burn Variance:</span>
                <span style={{ color: burnRateMultiplier > 0 ? '#ef4444' : burnRateMultiplier < 0 ? '#10b981' : isDark ? '#f8fafc' : '#0f172a' }}>
                  {burnRateMultiplier > 0 ? `+${burnRateMultiplier}% (Expansion)` : burnRateMultiplier < 0 ? `${burnRateMultiplier}% (Efficiency)` : 'Baseline (0%)'}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                step="5"
                value={burnRateMultiplier}
                onChange={(e) => setBurnRateMultiplier(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#df7e30',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: isDark ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                <span>-30% (Freeze)</span>
                <span>0% (Plan)</span>
                <span>+50% (Hyper-Scale)</span>
              </div>
            </div>

            <div
              style={{
                fontSize: '0.78rem',
                padding: '10px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                lineHeight: 1.4,
              }}
            >
              ✓ Safe zone: Runway extends well beyond Q2 2028 under current revenue growth pacing.
            </div>
          </div>
        </NeuronCard>

        {/* Dual-Signature Wire Clearance Queue */}
        <NeuronCard
          title={isId ? 'Antrean Otorisasi Kawat Dual-Key (> $50k)' : 'Dual-Signature Wire Clearance & Compliance Queue'}
          subtitle={isId ? 'Otorisasi institusional memerlukan persetujuan CFO dan Treasury Director' : 'Mandatory dual cryptographic key authorization for transactions exceeding $50k'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {pendingWires.map((wire, idx) => (
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
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.82rem', color: '#df7e30' }}>
                      {wire.ref}
                    </span>
                    <NeuronBadge variant="outline" size="sm">
                      {wire.compliance}
                    </NeuronBadge>
                  </div>
                  <div style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a', fontSize: '0.88rem', marginTop: '2px' }}>
                    {wire.beneficiary}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    Key 1: {wire.signer1} • Key 2: {wire.signer2}
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {wire.amount}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#df7e30', fontWeight: 600 }}>
                      {wire.status}
                    </div>
                  </div>
                  <NeuronButton
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      handleActionClick(
                        `Otorisasi Kawat: ${wire.ref}`,
                        `Pemberian kunci kriptografis kedua untuk transfer senilai ${wire.amount} ke ${wire.beneficiary}.`
                      )
                    }
                  >
                    <Key size={13} style={{ marginRight: '4px' }} /> Sign Wire
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
