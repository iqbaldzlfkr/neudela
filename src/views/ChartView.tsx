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
} from 'lucide-react';
import NeuronChart, {
  NeuronChartType,
  NeuronChartSize,
  NeuronChartColorScheme,
  NeuronChartOrientation,
  ChartDataPoint,
  ChartSeries,
} from '../components/NeuronChart';
import NeuronBadge from '../components/NeuronBadge';
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

const SAMPLE_LINE_DATA: ChartDataPoint[] = [
  { label: 'Mon', value: 240 },
  { label: 'Tue', value: 380 },
  { label: 'Wed', value: 320 },
  { label: 'Thu', value: 510 },
  { label: 'Fri', value: 470 },
  { label: 'Sat', value: 620 },
  { label: 'Sun', value: 550 },
];

const SAMPLE_PIE_DATA: ChartDataPoint[] = [
  { label: 'Chrome', value: 63 },
  { label: 'Safari', value: 19 },
  { label: 'Firefox', value: 8 },
  { label: 'Edge', value: 6 },
  { label: 'Other', value: 4 },
];

const SAMPLE_RADAR_DATA: ChartDataPoint[] = [
  { label: 'Speed', value: 85 },
  { label: 'Reliability', value: 90 },
  { label: 'Comfort', value: 70 },
  { label: 'Safety', value: 95 },
  { label: 'Efficiency', value: 80 },
  { label: 'Design', value: 75 },
];

const SAMPLE_SPARKLINE_DATA: ChartDataPoint[] = [
  { label: '1', value: 30 }, { label: '2', value: 45 }, { label: '3', value: 28 },
  { label: '4', value: 60 }, { label: '5', value: 52 }, { label: '6', value: 71 },
  { label: '7', value: 65 }, { label: '8', value: 80 }, { label: '9', value: 74 },
  { label: '10', value: 92 },
];

const SAMPLE_MULTI_SERIES: ChartSeries[] = [
  { name: 'Revenue', data: [320, 450, 380, 520, 610, 490] },
  { name: 'Expenses', data: [200, 300, 250, 310, 380, 290] },
  { name: 'Profit', data: [120, 150, 130, 210, 230, 200] },
];
const SAMPLE_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ChartView({ setActiveTab }: { setActiveTab: (tabId: string) => void }) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

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

  // Playground data based on type
  const getPlaygroundData = () => {
    switch (pgType) {
      case 'bar': return { data: SAMPLE_BAR_DATA };
      case 'line': return { data: SAMPLE_LINE_DATA };
      case 'pie': return { data: SAMPLE_PIE_DATA };
      case 'donut': return { data: SAMPLE_PIE_DATA };
      case 'radar': return { data: SAMPLE_RADAR_DATA };
      case 'sparkline': return { data: SAMPLE_SPARKLINE_DATA };
      default: return { data: SAMPLE_BAR_DATA };
    }
  };

  // Code generation
  const generateCode = () => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
      {/* 1. Overview & Design Pillars */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-primary)',
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Ikhtisar & Pilar Desain' : 'Overview & Design Pillars'}
            </h2>
            <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Prinsip inti visualisasi data Neudela' : 'Core principles for Neudela data visualization'}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)',
        }}>
          {[
            {
              icon: '📊',
              title: isId ? 'Kejelasan Data' : 'Data Clarity',
              desc: isId ? 'Setiap elemen visual harus melayani fungsi informatif tanpa noise.' : 'Every visual element must serve an informative purpose without noise.',
            },
            {
              icon: '🎨',
              title: isId ? 'Warna Semantik' : 'Semantic Coloring',
              desc: isId ? 'Palet warna konsisten dengan design token Neudela untuk identitas brand.' : 'Color palettes align with Neudela design tokens for brand identity.',
            },
            {
              icon: '♿',
              title: isId ? 'Aksesibilitas' : 'Accessibility First',
              desc: isId ? 'Rasio kontras, label ARIA, dan pattern fallback untuk semua pengguna.' : 'Contrast ratios, ARIA labels, and pattern fallbacks for all users.',
            },
            {
              icon: '📱',
              title: isId ? 'Responsif' : 'Responsive by Default',
              desc: isId ? 'Chart menggunakan SVG viewBox untuk scaling otomatis di semua ukuran layar.' : 'Charts use SVG viewBox for automatic scaling across all screen sizes.',
            },
          ].map((pillar, i) => (
            <div key={i} className="section-card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{ fontSize: 28 }}>{pillar.icon}</span>
              <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', margin: 0, color: 'var(--color-text-primary)' }}>{pillar.title}</h3>
              <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Chart Type Showcase */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Galeri Tipe Chart' : 'Chart Type Gallery'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {isId ? 'Semua tipe chart yang tersedia dengan data contoh.' : 'All available chart types with sample data.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)' }}>
          {/* Bar Chart */}
          <div className="section-card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <BarChart3 size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)' }}>Bar Chart</h3>
              <NeuronBadge size="sm" variant="brand">Vertical</NeuronBadge>
            </div>
            <NeuronChart type="bar" data={SAMPLE_BAR_DATA} size="sm" colorScheme="spectrum" showLegend={false} title="" />
          </div>

          {/* Line Chart */}
          <div className="section-card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <LineChartIcon size={18} style={{ color: 'var(--sky-500)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)' }}>Line Chart</h3>
              <NeuronBadge size="sm" variant="info">Smooth</NeuronBadge>
            </div>
            <NeuronChart type="line" data={SAMPLE_LINE_DATA} size="sm" colorScheme="spectrum" smooth showArea showDots showLegend={false} />
          </div>

          {/* Pie Chart */}
          <div className="section-card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <PieChartIcon size={18} style={{ color: 'var(--emerald-500)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)' }}>Pie Chart</h3>
              <NeuronBadge size="sm" variant="success">Standard</NeuronBadge>
            </div>
            <NeuronChart type="pie" data={SAMPLE_PIE_DATA} size="sm" colorScheme="spectrum" showLabels />
          </div>

          {/* Donut Chart */}
          <div className="section-card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <PieChartIcon size={18} style={{ color: 'var(--purple-500)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)' }}>Donut Chart</h3>
              <NeuronBadge size="sm" variant="default">Hollow Center</NeuronBadge>
            </div>
            <NeuronChart type="donut" data={SAMPLE_PIE_DATA} size="sm" colorScheme="vivid" innerRadius={0.55} showLabels />
          </div>

          {/* Radar Chart */}
          <div className="section-card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <Radar size={18} style={{ color: 'var(--amber-500)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)' }}>Radar Chart</h3>
              <NeuronBadge size="sm" variant="warning">Multi-axis</NeuronBadge>
            </div>
            <NeuronChart type="radar" data={SAMPLE_RADAR_DATA} size="sm" colorScheme="brand" />
          </div>

          {/* Sparkline */}
          <div className="section-card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <Activity size={18} style={{ color: 'var(--pink-500)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)' }}>Sparkline</h3>
              <NeuronBadge size="sm" variant="error">Inline</NeuronBadge>
            </div>
            <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-3)' }}>
              {isId ? 'Chart kompak inline untuk metrik cepat.' : 'Compact inline chart for quick metrics.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Revenue</span>
                <NeuronChart type="sparkline" data={SAMPLE_SPARKLINE_DATA} colorScheme="brand" smooth showArea />
                <span style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-success)' }}>+12.4%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>Users</span>
                <NeuronChart type="sparkline" data={[
                  { label: '1', value: 50 }, { label: '2', value: 40 }, { label: '3', value: 55 },
                  { label: '4', value: 48 }, { label: '5', value: 62 }, { label: '6', value: 58 },
                  { label: '7', value: 70 }, { label: '8', value: 68 },
                ]} colorScheme="spectrum" smooth showArea />
                <span style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-success)' }}>+8.2%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Color Scheme Gallery */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Galeri Skema Warna' : 'Color Scheme Gallery'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {isId ? 'Lima palet warna yang tersedia untuk semua tipe chart.' : 'Five color palettes available for all chart types.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {(['brand', 'spectrum', 'mono', 'pastel', 'vivid'] as NeuronChartColorScheme[]).map(scheme => (
            <div key={scheme} className="section-card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <NeuronBadge size="sm" variant="brand" style={{ textTransform: 'capitalize' }}>{scheme}</NeuronBadge>
              </div>
              <NeuronChart
                type="bar"
                data={SAMPLE_BAR_DATA}
                size="sm"
                colorScheme={scheme}
                showGrid={false}
                showLegend={false}
                showTooltip={false}
                animated={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Size Matrix */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Matriks Ukuran' : 'Size Matrix'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {isId ? 'Empat ukuran yang tersedia: sm, md, lg, xl.' : 'Four available sizes: sm, md, lg, xl.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {(['sm', 'md', 'lg'] as NeuronChartSize[]).map(sz => (
            <div key={sz} className="section-card" style={{ padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <NeuronBadge size="sm" variant="default">size="{sz}"</NeuronBadge>
                <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>
                  {sz === 'sm' ? '320×200' : sz === 'md' ? '480×300' : '640×400'}
                </span>
              </div>
              <NeuronChart
                type="line"
                data={SAMPLE_LINE_DATA}
                size={sz}
                colorScheme="spectrum"
                smooth
                showArea
                showDots
                showLegend={false}
                animated={false}
                title={`${sz.toUpperCase()} Size Chart`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Do's & Don'ts */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? 'Praktik Terbaik' : 'Best Practices'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {isId ? 'Panduan do\'s dan don\'ts untuk penggunaan chart yang efektif.' : "Do's and don'ts guidelines for effective chart usage."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          <RuleCard type="do">
            <p style={{ margin: 0, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>
                {isId ? 'Gunakan maksimal 5 data series' : 'Use max 5 data series'}
              </strong><br />
              {isId ? 'Batasi jumlah series agar chart tetap mudah dibaca. Gunakan legend dan warna yang kontras.' : 'Limit series count to keep charts readable. Use legend and contrasting colors.'}
            </p>
            <div style={{ marginTop: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <NeuronChart type="bar" size="sm" colorScheme="spectrum" showGrid={false} showLegend={false} animated={false}
                data={[
                  { label: 'A', value: 80 }, { label: 'B', value: 65 }, { label: 'C', value: 90 },
                  { label: 'D', value: 45 },
                ]} />
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <p style={{ margin: 0, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>
                {isId ? 'Terlalu banyak data dalam satu chart' : 'Too many data points in one chart'}
              </strong><br />
              {isId ? 'Chart yang terlalu padat akan sulit dibaca dan membingungkan pengguna.' : 'Overcrowded charts are hard to read and confuse users.'}
            </p>
            <div style={{ marginTop: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <NeuronChart type="bar" size="sm" colorScheme="mono" showGrid={false} showLegend={false} animated={false}
                data={[
                  { label: 'A', value: 30 }, { label: 'B', value: 45 }, { label: 'C', value: 22 },
                  { label: 'D', value: 60 }, { label: 'E', value: 38 }, { label: 'F', value: 50 },
                  { label: 'G', value: 42 }, { label: 'H', value: 55 }, { label: 'I', value: 33 },
                  { label: 'J', value: 48 }, { label: 'K', value: 27 }, { label: 'L', value: 62 },
                ]} />
            </div>
          </RuleCard>

          <RuleCard type="do">
            <p style={{ margin: 0, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>
                {isId ? 'Selalu sertakan legend untuk multi-series' : 'Always include legend for multi-series'}
              </strong><br />
              {isId ? 'Legend membantu pengguna memahami makna setiap series data.' : 'Legends help users understand the meaning of each data series.'}
            </p>
            <div style={{ marginTop: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <NeuronChart type="line" size="sm" colorScheme="spectrum" smooth showDots showLegend animated={false}
                series={[
                  { name: 'Sales', data: [40, 60, 80, 55, 70] },
                  { name: 'Costs', data: [30, 35, 40, 38, 45] },
                ]}
                categories={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']} />
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <p style={{ margin: 0, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>
                {isId ? 'Jangan gunakan pie chart untuk >6 kategori' : "Don't use pie chart for >6 categories"}
              </strong><br />
              {isId ? 'Pie chart dengan terlalu banyak slice akan sulit dibandingkan. Gunakan bar chart sebagai gantinya.' : 'Pie charts with too many slices are hard to compare. Use bar charts instead.'}
            </p>
            <div style={{ marginTop: 'var(--space-3)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <NeuronChart type="pie" size="sm" colorScheme="mono" showLegend={false} animated={false} showLabels
                data={[
                  { label: 'A', value: 15 }, { label: 'B', value: 12 }, { label: 'C', value: 10 },
                  { label: 'D', value: 9 }, { label: 'E', value: 8 }, { label: 'F', value: 7 },
                  { label: 'G', value: 6 }, { label: 'H', value: 5 },
                ]} />
            </div>
          </RuleCard>
        </div>
      </section>
    </div>
  );

  // ─── PLAYBOOK TAB ────────────────────────────────────────────────────────
  const renderPlaybook = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
      {/* 1. Interactive Playground */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-primary)',
          }}>
            <Sliders size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Playground Interaktif' : 'Interactive Playground'}
            </h2>
            <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Sesuaikan semua properti chart secara langsung.' : 'Adjust all chart properties in real-time.'}
            </p>
          </div>
        </div>

        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                {isId ? 'Kontrol' : 'Controls'}
              </h3>

              {/* Chart Type */}
              <div>
                <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {isId ? 'Tipe Chart' : 'Chart Type'}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                  {(['bar', 'line', 'pie', 'donut', 'radar', 'sparkline'] as NeuronChartType[]).map(t => (
                    <button key={t} onClick={() => setPgType(t)}
                      style={{
                        padding: '6px 12px', fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)',
                        border: '1px solid', borderColor: pgType === t ? 'var(--color-primary)' : 'var(--color-border)',
                        background: pgType === t ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                        color: pgType === t ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        borderRadius: 'var(--radius-sm)', cursor: 'pointer', textTransform: 'capitalize',
                        transition: 'all 0.15s ease',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Scheme */}
              <div>
                <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {isId ? 'Skema Warna' : 'Color Scheme'}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                  {(['brand', 'spectrum', 'mono', 'pastel', 'vivid'] as NeuronChartColorScheme[]).map(cs => (
                    <button key={cs} onClick={() => setPgColorScheme(cs)}
                      style={{
                        padding: '6px 12px', fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)',
                        border: '1px solid', borderColor: pgColorScheme === cs ? 'var(--color-primary)' : 'var(--color-border)',
                        background: pgColorScheme === cs ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                        color: pgColorScheme === cs ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        borderRadius: 'var(--radius-sm)', cursor: 'pointer', textTransform: 'capitalize',
                        transition: 'all 0.15s ease',
                      }}>
                      {cs}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                  Size
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                  {(['sm', 'md', 'lg'] as NeuronChartSize[]).map(sz => (
                    <button key={sz} onClick={() => setPgSize(sz)}
                      style={{
                        padding: '6px 12px', fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)',
                        border: '1px solid', borderColor: pgSize === sz ? 'var(--color-primary)' : 'var(--color-border)',
                        background: pgSize === sz ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                        color: pgSize === sz ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        borderRadius: 'var(--radius-sm)', cursor: 'pointer', textTransform: 'uppercase',
                        transition: 'all 0.15s ease',
                      }}>
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional controls */}
              {pgType === 'bar' && (
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                      Orientation
                    </label>
                    <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                      {(['vertical', 'horizontal'] as NeuronChartOrientation[]).map(o => (
                        <button key={o} onClick={() => setPgOrientation(o)}
                          style={{
                            padding: '6px 12px', fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)',
                            border: '1px solid', borderColor: pgOrientation === o ? 'var(--color-primary)' : 'var(--color-border)',
                            background: pgOrientation === o ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                            color: pgOrientation === o ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            borderRadius: 'var(--radius-sm)', cursor: 'pointer', textTransform: 'capitalize',
                            transition: 'all 0.15s ease',
                          }}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {pgType === 'donut' && (
                <div>
                  <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 'var(--space-2)' }}>
                    Inner Radius: {pgInnerRadius}
                  </label>
                  <input type="range" min="0.1" max="0.85" step="0.05" value={pgInnerRadius}
                    onChange={e => setPgInnerRadius(parseFloat(e.target.value))}
                    style={{ width: '100%' }} />
                </div>
              )}

              {/* Toggle Options */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                {pgType !== 'sparkline' && pgType !== 'pie' && pgType !== 'donut' && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                    <input type="checkbox" checked={pgShowGrid} onChange={e => setPgShowGrid(e.target.checked)} /> Grid
                  </label>
                )}
                {pgType !== 'sparkline' && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                    <input type="checkbox" checked={pgShowLegend} onChange={e => setPgShowLegend(e.target.checked)} /> Legend
                  </label>
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                  <input type="checkbox" checked={pgShowTooltip} onChange={e => setPgShowTooltip(e.target.checked)} /> Tooltip
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                  <input type="checkbox" checked={pgShowLabels} onChange={e => setPgShowLabels(e.target.checked)} /> Labels
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                  <input type="checkbox" checked={pgAnimated} onChange={e => setPgAnimated(e.target.checked)} /> Animated
                </label>
                {pgType === 'line' && (
                  <>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                      <input type="checkbox" checked={pgSmooth} onChange={e => setPgSmooth(e.target.checked)} /> Smooth
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                      <input type="checkbox" checked={pgShowArea} onChange={e => setPgShowArea(e.target.checked)} /> Area Fill
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--fs-text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                      <input type="checkbox" checked={pgShowDots} onChange={e => setPgShowDots(e.target.checked)} /> Dots
                    </label>
                  </>
                )}
              </div>

              {/* Reset button */}
              <button onClick={() => {
                setPgType('bar'); setPgSize('md'); setPgColorScheme('spectrum');
                setPgOrientation('vertical'); setPgSmooth(true); setPgShowArea(false);
                setPgShowDots(true); setPgShowGrid(true); setPgShowLegend(true);
                setPgShowTooltip(true); setPgShowLabels(false); setPgAnimated(true);
                setPgStacked(false); setPgInnerRadius(0.55);
              }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                  padding: '6px 12px', fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-medium)',
                  background: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer', width: 'fit-content', transition: 'all 0.15s ease',
                }}>
                <RotateCcw size={12} /> {isId ? 'Reset' : 'Reset All'}
              </button>
            </div>

            {/* Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                {isId ? 'Pratinjau' : 'Preview'}
              </h3>
              <div style={{
                border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)', background: 'var(--color-bg-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200,
              }}>
                <NeuronChart
                  type={pgType}
                  data={getPlaygroundData().data}
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
            </div>
          </div>

          {/* Code Output */}
          <div style={{ marginTop: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <h4 style={{ margin: 0, fontSize: 'var(--fs-text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>
                {isId ? 'Kode JSX yang Dihasilkan' : 'Generated JSX Code'}
              </h4>
              <button onClick={copyCode}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                  padding: '4px 10px', fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-medium)',
                  background: copiedCode ? 'var(--color-success-light)' : 'var(--color-bg-subtle)',
                  color: copiedCode ? 'var(--color-success)' : 'var(--color-text-secondary)',
                  border: '1px solid', borderColor: copiedCode ? 'var(--color-success-border)' : 'var(--color-border)',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.15s ease',
                }}>
                {copiedCode ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <pre style={{
              background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-4)',
              fontSize: 'var(--fs-text-xs)', lineHeight: 1.7, overflow: 'auto',
              color: 'var(--color-text-primary)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace',",
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
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Page Header */}
      <div className="page-header">
        <span style={{
          fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1px',
          display: 'block', marginBottom: 'var(--space-2)',
        }}>
          {isId ? 'Komponen' : 'Components'}
        </span>
        <h1 className="page-title">Chart</h1>
        <p className="page-subtitle">
          {isId
            ? 'Komponen visualisasi data berbasis SVG dengan 6 tipe chart, 5 skema warna, animasi masuk, dan tooltip interaktif.'
            : 'SVG-based data visualization component with 6 chart types, 5 color schemes, animated entries, and interactive tooltips.'}
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-8)',
        borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-1)',
      }}>
        {(['guideline', 'playbook'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveViewTab(tab)}
            style={{
              padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-text-sm)',
              fontWeight: 'var(--font-weight-semibold)', cursor: 'pointer',
              background: 'transparent', border: 'none',
              borderBottom: activeViewTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeViewTab === tab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              transition: 'all 0.15s ease', textTransform: 'capitalize',
            }}
          >
            {tab === 'guideline'
              ? (isId ? 'Panduan' : 'Guideline')
              : (isId ? 'Buku Panduan' : 'Playbook')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeViewTab === 'guideline' ? renderGuideline() : renderPlaybook()}

      {/* Navigation */}
      <div style={{ marginTop: 'var(--space-10)' }}>
        <NextPrevious
          prev={{ id: 'comp-checkbox', label: 'Checkbox' }}
          next={{ id: 'comp-datepicker', label: 'Date Picker' }}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
