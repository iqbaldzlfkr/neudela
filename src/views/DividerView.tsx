import { useState, ReactNode } from 'react';
import { 
  Sliders, 
  Copy, 
  Check, 
  X,
  RotateCcw, 
  Sparkles, 
  Layers,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Download,
  ShieldAlert,
  CreditCard
} from 'lucide-react';
import NeuronDivider, { 
  NeuronDividerOrientation, 
  NeuronDividerVariant, 
  NeuronDividerThickness, 
  NeuronDividerColor, 
  NeuronDividerContentPosition, 
  NeuronDividerSpacing 
} from '../components/NeuronDivider';
import NeuronButton from '../components/NeuronButton';
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

export default function DividerView({ setActiveTab }: { setActiveTab: (tabId: string) => void }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Playground state
  const [pgOrientation, setPgOrientation] = useState<NeuronDividerOrientation>('horizontal');
  const [pgVariant, setPgVariant] = useState<NeuronDividerVariant>('solid');
  const [pgThickness, setPgThickness] = useState<NeuronDividerThickness>('thin');
  const [pgColor, setPgColor] = useState<NeuronDividerColor>('default');
  const [pgContentPosition, setPgContentPosition] = useState<NeuronDividerContentPosition>('center');
  const [pgSpacing, setPgSpacing] = useState<NeuronDividerSpacing>('md');
  const [pgInset, setPgInset] = useState(false);
  const [pgHasContent, setPgHasContent] = useState(true);
  const [pgContentText, setPgContentText] = useState('SECTION DIVIDER');
  const [pgContentType, setPgContentType] = useState<'text' | 'badge' | 'icon'>('badge');
  const [copiedCode, setCopiedCode] = useState(false);

  // Playground code generation
  const generatedCode = `<NeuronDivider
  orientation="${pgOrientation}"
  variant="${pgVariant}"
  thickness="${pgThickness}"
  color="${pgColor}"${pgOrientation === 'horizontal' && pgHasContent ? `\n  contentPosition="${pgContentPosition}"` : ''}
  spacing="${pgSpacing}"${pgInset ? `\n  inset` : ''}
>${pgOrientation === 'horizontal' && pgHasContent ? `\n  ${pgContentType === 'badge' ? `<NeuronBadge size="sm" variant="brand">${pgContentText}</NeuronBadge>` : pgContentType === 'icon' ? `<Sparkles size={14} color="var(--color-primary)" />` : `<span>${pgContentText}</span>`}\n` : ''}</NeuronDivider>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetPlayground = () => {
    setPgOrientation('horizontal');
    setPgVariant('solid');
    setPgThickness('thin');
    setPgColor('default');
    setPgContentPosition('center');
    setPgSpacing('md');
    setPgInset(false);
    setPgHasContent(true);
    setPgContentText('SECTION DIVIDER');
    setPgContentType('badge');
  };

  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{isId ? 'Pemisah (Divider)' : 'Divider'}</h1>
            <p className="page-subtitle">
              {isId
                ? 'Garis pemisah struktural untuk mengorganisir hierarki informasi, membedakan kelompok konten, dan menyajikan jeda visual yang proporsional.'
                : 'Structural separator element establishing spatial rhythm, semantic groupings, and visual hierarchy across containers and toolbars.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher: 2 Tabs (Guideline & Playbook) */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveViewTab('guideline')}
          >
            Guideline
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

      {/* ══════════════════════════════════════════════════════════════════
          GUIDELINE TAB
         ══════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          
          {/* ── 1. Overview & Key Pillars ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '1. Ikhtisar & Pilar Desain' : '1. Overview & Design Pillars'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Komponen Divider dirancang untuk menghadirkan pembagian ruang yang bersih tanpa membebani kognisi pengguna. Digunakan saat pemisahan whitespace saja belum cukup memberikan kejelasan batasan antar section.'
                : 'The Divider component provides clean structural partitioning without visual noise, applied when whitespace alone is insufficient to clarify contextual boundaries.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Layers size={16} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Hierarki & Ritme Spasial' : 'Spatial Hierarchy & Rhythm'}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {isId
                    ? 'Memberikan pembagian zona fungsional yang intuitif pada formulir panjang, panel pengaturan, atau dialog modal.'
                    : 'Establishes clear spatial boundaries across complex forms, settings panes, and multi-tier modal layouts.'}
                </p>
              </div>

              <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Label Kontekstual Bersarang' : 'Contextual Label Slotting'}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {isId
                    ? 'Dapat menampung teks percabangan (seperti "ATAU" / "OR"), chip status NeuronBadge, atau ikon mini di berbagai posisi.'
                    : 'Hosts semantic chips, branch keywords (like "OR"), or icon indicators at left, center, or right alignments.'}
                </p>
              </div>

              <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sliders size={16} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Orientasi Dual & Inset Cerdas' : 'Dual Orientation & Inset Control'}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {isId
                    ? 'Mendukung mode horizontal penuh, horizontal berindentasi (inset), maupun mode vertikal inline antar tombol toolbar.'
                    : 'Seamlessly toggles between full-width rules, inset indented lines, and inline vertical separators for toolbars.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── 2. Visual Style Variants Showcase ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '2. Galeri Varian Garis Visual' : '2. Visual Style Variants'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Pemisah Neudela menyediakan 5 gaya goresan garis untuk berbagai tingkat kontras visual.'
                : 'Neudela Divider provides 5 distinct stroke styles tailored to diverse aesthetic densities.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              {/* Solid */}
              <div className="divider-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Solid (Standard)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>variant="solid"</code>
                </div>
                <div style={{ padding: '16px 0' }}>
                  <NeuronDivider variant="solid" spacing="none" />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Garis halus kontinu standar untuk membatasi section utama.' : 'Baseline continuous hairline rule for clean container partitioning.'}
                </span>
              </div>

              {/* Dashed */}
              <div className="divider-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Dashed (Perforated)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>variant="dashed"</code>
                </div>
                <div style={{ padding: '16px 0' }}>
                  <NeuronDivider variant="dashed" spacing="none" />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Pola putus-putus untuk kupon, pemisah draft, atau jeda sekunder.' : 'Perforated dash cadence ideal for draft dividers and voucher bounds.'}
                </span>
              </div>

              {/* Dotted */}
              <div className="divider-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Dotted (Minimal)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>variant="dotted"</code>
                </div>
                <div style={{ padding: '16px 0' }}>
                  <NeuronDivider variant="dotted" spacing="none" />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Rangkaian titik lembut untuk daftar item berdensitas tinggi.' : 'Subtle point sequence for dense inline item arrays.'}
                </span>
              </div>

              {/* Gradient */}
              <div className="divider-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Gradient (Feathered Edge)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>variant="gradient"</code>
                </div>
                <div style={{ padding: '16px 0' }}>
                  <NeuronDivider variant="gradient" color="brand" spacing="none" />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Gradasi transparan khas Neudela yang memudar di kedua tepian.' : 'Signature feathered fade softening rule perimeter edges.'}
                </span>
              </div>

              {/* Double */}
              <div className="divider-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Double (Formal Landmark)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>variant="double"</code>
                </div>
                <div style={{ padding: '16px 0' }}>
                  <NeuronDivider variant="double" spacing="none" />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Dua garis sejajar untuk penanda bab atau bagian formal.' : 'Dual parallel rule strokes for formal section boundaries.'}
                </span>
              </div>

              {/* Inset */}
              <div className="divider-showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Inset Boundary (Indented)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>inset</code>
                </div>
                <div style={{ padding: '16px 0', background: 'var(--color-bg-subtle)', borderRadius: 6 }}>
                  <NeuronDivider inset spacing="none" />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Indentasi 16px dari tepi kartu agar tidak memotong border luar.' : '16px indent preventing line collisions against card frames.'}
                </span>
              </div>
            </div>
          </div>

          {/* ── 3. Thickness & Spacing Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '3. Matriks Ketebalan & Jarak Margin' : '3. Thickness & Spacing Matrix'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Standar bobot garis (0.5px s/d 4px) dan variasi jarak margin untuk menjaga keselarasan spasial desain.'
                : 'Calibrated stroke weights (0.5px to 4px) and proportional spacing tokens.'}
            </p>

            <div style={{ overflowX: 'auto', marginTop: 'var(--space-4)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ketebalan</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Stroke Size</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Token Props</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Rekomendasi Penggunaan</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600, width: 220 }}>Visual Sample</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Hairline</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>0.5px</td>
                    <td style={{ padding: '12px 14px' }}><code style={{ fontSize: 11, color: 'var(--color-primary)' }}>thickness="hairline"</code></td>
                    <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>Daftar baris tabel rapat, submenu dropdown kompak.</td>
                    <td style={{ padding: '12px 14px' }}><NeuronDivider thickness="hairline" spacing="none" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Thin (Default)</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>1.0px</td>
                    <td style={{ padding: '12px 14px' }}><code style={{ fontSize: 11, color: 'var(--color-primary)' }}>thickness="thin"</code></td>
                    <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>Pemisah standar antar kartu, formulir section, dialog.</td>
                    <td style={{ padding: '12px 14px' }}><NeuronDivider thickness="thin" spacing="none" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Medium</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>2.0px</td>
                    <td style={{ padding: '12px 14px' }}><code style={{ fontSize: 11, color: 'var(--color-primary)' }}>thickness="medium"</code></td>
                    <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>Penanda kelompok penting, transisi zona interaktif.</td>
                    <td style={{ padding: '12px 14px' }}><NeuronDivider thickness="medium" spacing="none" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Thick</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace' }}>4.0px</td>
                    <td style={{ padding: '12px 14px' }}><code style={{ fontSize: 11, color: 'var(--color-primary)' }}>thickness="thick"</code></td>
                    <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>Landmark utama halaman, pemisah antar modul besar.</td>
                    <td style={{ padding: '12px 14px' }}><NeuronDivider thickness="thick" spacing="none" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 4. Content Alignment & Label Badging ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '4. Penyelarasan Konten & Label' : '4. Content Alignment & Label Badging'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Konten label dapat diposisikan di tengah, kiri, atau kanan untuk memberikan fleksibilitas konteks visual.'
                : 'Align content badges flexibly to center, left, or right positions.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 'var(--space-4)' }}>
              {/* Left Aligned */}
              <div style={{ padding: '18px 24px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Left Aligned Label</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>contentPosition="left"</code>
                </div>
                <NeuronDivider contentPosition="left" spacing="none">
                  <NeuronBadge size="sm" variant="brand">SECTION HEADING</NeuronBadge>
                </NeuronDivider>
              </div>

              {/* Center Aligned */}
              <div style={{ padding: '18px 24px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Center Aligned Label (Default)</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>contentPosition="center"</code>
                </div>
                <NeuronDivider contentPosition="center" spacing="none">
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: 1 }}>OR CONTINUE WITH</span>
                </NeuronDivider>
              </div>

              {/* Right Aligned */}
              <div style={{ padding: '18px 24px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Right Aligned Action Tag</span>
                  <code style={{ fontSize: 11, color: 'var(--color-primary)' }}>contentPosition="right"</code>
                </div>
                <NeuronDivider contentPosition="right" spacing="none">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-primary)' }}>
                    <Sparkles size={12} /> AI Assisted
                  </span>
                </NeuronDivider>
              </div>
            </div>
          </div>

          {/* ── 5. Vertical Divider Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '5. Penerapan Pemisah Vertikal' : '5. Vertical Divider Implementations'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Pemisah vertikal inline menjaga pemisahan kelompok tindakan pada toolbar, kartu KPI, dan navigasi.'
                : 'Vertical dividers enforce clear inline boundaries between action clusters in toolbars and metric strips.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 'var(--space-4)' }}>
              {/* Toolbar preview */}
              <div style={{ padding: '14px 20px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', display: 'block', marginBottom: 10 }}>
                  TEXT EDITOR TOOLBAR
                </span>
                <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--color-bg-surface)', padding: '4px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', gap: 4 }}>
                  <NeuronButton variant="text" size="xs"><Bold size={13} /></NeuronButton>
                  <NeuronButton variant="text" size="xs"><Italic size={13} /></NeuronButton>
                  <NeuronButton variant="text" size="xs"><Underline size={13} /></NeuronButton>
                  
                  <NeuronDivider orientation="vertical" spacing="sm" style={{ height: 18 }} />
                  
                  <NeuronButton variant="text" size="xs"><AlignLeft size={13} /></NeuronButton>
                  <NeuronButton variant="text" size="xs"><AlignCenter size={13} /></NeuronButton>
                  <NeuronButton variant="text" size="xs"><AlignRight size={13} /></NeuronButton>
                  
                  <NeuronDivider orientation="vertical" spacing="sm" style={{ height: 18 }} />
                  
                  <NeuronButton variant="text" size="xs"><List size={13} /></NeuronButton>
                  <NeuronButton variant="text" size="xs"><Link size={13} /></NeuronButton>
                </div>
              </div>

              {/* KPI Strip preview */}
              <div style={{ padding: '16px 20px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', display: 'block', marginBottom: 12 }}>
                  ANALYTICS KPI STRIP
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-bg-surface)', padding: '16px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Total Volume</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 2 }}>$248,500</div>
                  </div>

                  <NeuronDivider orientation="vertical" spacing="lg" style={{ height: 36 }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Active Accounts</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 2 }}>14,280</div>
                  </div>

                  <NeuronDivider orientation="vertical" spacing="lg" style={{ height: 36 }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Conversion</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-success)', marginTop: 2 }}>4.85%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '6. Panduan Praktik Terbaik (Do\'s & Don\'ts)' : '6. Best Practice Guidelines (Do\'s & Don\'ts)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Ikuti panduan berikut untuk menjaga ritme visual, hierarki antarmuka, dan kenyamanan pemindaian konten.'
                : 'Follow these foundational rules to prevent visual clutter, maintain layout rhythm, and support predictable scanning.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              
              {/* Pair 1: Calibration of Stroke Weight */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{isId ? 'Profil Pengguna' : 'User Profile'}</span>
                        </div>
                        <NeuronBadge size="xs" variant="default">{isId ? 'Aktif' : 'Active'}</NeuronBadge>
                      </div>
                      <div style={{ padding: '0 14px' }}>
                        <NeuronDivider spacing="xs" thickness="thin" />
                      </div>
                      <div style={{ padding: '8px 14px 12px 14px', fontSize: 11, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Preferensi keamanan & autentikasi 2 langkah' : 'Security preferences & 2-factor auth'}
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Garis 1px halus, visual seimbang & bernafas' : 'Subtle 1px stroke keeps layout balanced'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Gunakan ketebalan 1px (thin) atau hairline untuk pemisah internal kartu'
                        : 'Use subtle 1px (thin) or hairline strokes inside content cards'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Terapkan garis 1px halus untuk memisahkan kelompok field atau subbagian konten dalam kartu. Garis halus memandu mata tanpa mengalihkan fokus dari teks utama.'
                        : 'Apply default 1px thin dividers for internal card sections. Dividers should subtly guide the eye without competing with primary headings or inputs.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)' }} />
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{isId ? 'Profil Pengguna' : 'User Profile'}</span>
                        </div>
                        <NeuronBadge size="xs" variant="default">{isId ? 'Aktif' : 'Active'}</NeuronBadge>
                      </div>
                      <div style={{ padding: '0 14px' }}>
                        <NeuronDivider spacing="xs" thickness="thick" color="strong" />
                      </div>
                      <div style={{ padding: '8px 14px 12px 14px', fontSize: 11, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Preferensi keamanan & autentikasi 2 langkah' : 'Security preferences & 2-factor auth'}
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Garis 4px terlalu tebal & memotong alur baca' : 'Overly bold 4px stroke fragments the card'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Hindari garis tebal (thick / 4px) di dalam kontainer konten kecil'
                        : 'Avoid heavy thick divider strokes inside compact content cards'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Jangan menggunakan garis 3px/4px gelap di dalam kartu formulir atau dialog. Garis yang terlalu berat menciptakan sekat visual keras dan memotong alur baca pengguna.'
                        : 'Do not place heavy 3px/4px borders within compact cards or modal bodies. Overly bold strokes fragment the surface into harsh disjointed segments.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 2: Concise Labels for Content Dividers */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do" style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ height: 28, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, border: '1px solid var(--color-border)' }}>
                          {isId ? 'Masuk dengan Akun Google' : 'Sign in with Google'}
                        </div>
                        <NeuronDivider contentPosition="center" spacing="xs">
                          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: 0.8 }}>
                            {isId ? 'ATAU' : 'OR'}
                          </span>
                        </NeuronDivider>
                        <div style={{ height: 28, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, border: '1px solid var(--color-border)' }}>
                          {isId ? 'Lanjutkan dengan Email' : 'Continue with Email'}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Label 1–2 kata, percabangan logika instan' : 'Concise 1-2 word keyword for instant clarity'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Gunakan label singkat & padat (1–3 kata) untuk pemisah konten'
                        : 'Keep divider content labels concise (1–3 keywords)'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Batasi teks dalam slot pemisah pada kata kunci percabangan ringkas seperti "ATAU", "METODE LAIN", atau chip badge pendek agar garis horizontal tetap memegang kontinuitas visual.'
                        : 'Restrict divider labels to short keywords (e.g., "OR", "OTHER METHODS") or a compact badge chip so the horizontal rule retains structural continuity.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont" style={{ padding: '16px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ height: 28, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, border: '1px solid var(--color-border)' }}>
                          {isId ? 'Masuk dengan Akun Google' : 'Sign in with Google'}
                        </div>
                        <NeuronDivider contentPosition="center" spacing="xs">
                          <span style={{ fontSize: 9.5, color: 'var(--color-text-secondary)', maxWidth: 180, textAlign: 'center', lineHeight: 1.3 }}>
                            {isId ? 'Silakan pilih metode masuk alternatif di bawah ini jika terkendala' : 'Please select an alternate authentication method below'}
                          </span>
                        </NeuronDivider>
                        <div style={{ height: 28, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, border: '1px solid var(--color-border)' }}>
                          {isId ? 'Lanjutkan dengan Email' : 'Continue with Email'}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Kalimat panjang merusak keterbacaan & garis' : 'Long multi-line sentence clutters the rule'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Hindari menaruh kalimat instruksi panjang di dalam slot divider'
                        : 'Never embed multi-line sentences or instructional paragraphs'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Slot divider bukan wadah teks instruksi atau penjelasan panjang. Gunakan paragraf tipografi normal di bawah heading jika membutuhkan panduan deskriptif.'
                        : 'Divider content slots are not designed for explanatory instructions. Use standard body text or helper paragraphs rather than overloading the divider.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 3: Inset Margins for Card Lists */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                      <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{isId ? 'Notifikasi Email' : 'Email Alerts'}</span>
                        <NeuronBadge size="xs" variant="success">{isId ? 'Aktif' : 'On'}</NeuronBadge>
                      </div>
                      <NeuronDivider inset spacing="none" />
                      <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{isId ? 'SMS Verifikasi' : 'SMS Verify'}</span>
                        <NeuronBadge size="xs" variant="default">{isId ? 'Nonaktif' : 'Off'}</NeuronBadge>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Indentasi 16px rapi, sudut kartu tetap bersih' : '16px inset keeps rounded corners clean'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Gunakan mode inset pada daftar baris dalam kartu bersudut lengkung'
                        : 'Apply inset dividers for list rows inside rounded card surfaces'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Aktifkan prop inset={true} (margin 16px) untuk memisahkan baris item di dalam kartu atau dialog modal. Ini mencegah garis bertabrakan langsung dengan border lengkung terluar.'
                        : 'Enable the inset prop (16px horizontal indent) when dividing list rows inside rounded card containers. This prevents clumsy collisions with perimeter border radii.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                      <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{isId ? 'Notifikasi Email' : 'Email Alerts'}</span>
                        <NeuronBadge size="xs" variant="success">{isId ? 'Aktif' : 'On'}</NeuronBadge>
                      </div>
                      <NeuronDivider spacing="none" thickness="medium" />
                      <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{isId ? 'SMS Verifikasi' : 'SMS Verify'}</span>
                        <NeuronBadge size="xs" variant="default">{isId ? 'Nonaktif' : 'Off'}</NeuronBadge>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Garis menempel kaku ke sudut border kartu' : 'Full-bleed line crashes into card corner radius'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Hindari garis pemisah full-bleed di dalam kontainer yang memiliki padding'
                        : 'Avoid edge-to-edge full-bleed dividers in padded rounded cards'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Garis pemisah yang menabrak langsung ke pinggiran kartu menciptakan perpotongan T-junction kaku yang merusak kehalusan estetika desain kartu beradius.'
                        : 'Extending dividers edge-to-edge across padded cards creates harsh visual T-junctions that detract from modern rounded corner aesthetics.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 4: Vertical Dividers Constraint */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--color-bg-surface)', padding: '4px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', gap: 4 }}>
                        <span style={{ padding: '3px 8px', fontSize: 11, fontWeight: 700, borderRadius: 4, background: 'var(--color-bg-subtle)' }}>B</span>
                        <span style={{ padding: '3px 8px', fontSize: 11, fontStyle: 'italic', borderRadius: 4, background: 'var(--color-bg-subtle)' }}>I</span>
                        <NeuronDivider orientation="vertical" spacing="xs" style={{ height: 16 }} />
                        <span style={{ padding: '3px 8px', fontSize: 11, borderRadius: 4, background: 'var(--color-bg-subtle)' }}>H1</span>
                        <span style={{ padding: '3px 8px', fontSize: 11, borderRadius: 4, background: 'var(--color-bg-subtle)' }}>H2</span>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Tinggi 16px proporsional & selaras tombol' : '16px height centered gracefully with actions'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Batasi tinggi pemisah vertikal agar selaras dengan elemen sekitarnya'
                        : 'Constrain vertical divider height to match adjacent inline elements'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Atur tinggi pemisah vertikal (14px–20px) dan gunakan perataan tengah (align-self: center). Ini menciptakan pemisahan kelompok tindakan yang proporsional dan elegan.'
                        : 'Limit vertical separator heights (typically 14px–20px) so they align neatly with adjacent inline items, preserving toolbar harmony.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--color-bg-surface)', padding: '4px 8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', gap: 4, height: 48 }}>
                        <span style={{ padding: '3px 8px', fontSize: 11, fontWeight: 700, borderRadius: 4, background: 'var(--color-bg-subtle)' }}>B</span>
                        <span style={{ padding: '3px 8px', fontSize: 11, fontStyle: 'italic', borderRadius: 4, background: 'var(--color-bg-subtle)' }}>I</span>
                        <NeuronDivider orientation="vertical" spacing="xs" style={{ height: '100%', borderColor: 'var(--color-text-primary)' }} />
                        <span style={{ padding: '3px 8px', fontSize: 11, borderRadius: 4, background: 'var(--color-bg-subtle)' }}>H1</span>
                        <span style={{ padding: '3px 8px', fontSize: 11, borderRadius: 4, background: 'var(--color-bg-subtle)' }}>H2</span>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Tinggi melar 100% memotong kesatuan toolbar' : 'Full-height stroke splits the toolbar clumsily'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Jangan biarkan pemisah vertikal melar melebihi gugus tombol tindakan'
                        : 'Avoid overstretched vertical dividers that dominate toolbars'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Pemisah vertikal yang dibiarkan meregang penuh setinggi kontainer membelah toolbar menjadi balok-balok kaku, merusak tampilan visual bilah alat yang terintegrasi.'
                        : 'Stretching vertical dividers to 100% container height cuts the toolbar into awkward boxed columns rather than maintaining a unified tool strip.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PLAYBOOK TAB
         ══════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          
          {/* ── 1. Interactive Playground ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <div>
                <h2 className="section-title">
                  {isId ? '1. Playground Interaktif' : '1. Interactive Playground'}
                </h2>
                <p className="section-description">
                  {isId
                    ? 'Uji coba seluruh kombinasi orientasi, varian visual, ketebalan, warna, dan posisi label dengan generator kode langsung.'
                    : 'Experiment with all orientation, stroke variant, thickness, color, and content positioning configurations.'}
                </p>
              </div>

              <NeuronButton variant="outline" size="sm" onClick={handleResetPlayground}>
                <RotateCcw size={13} /> {isId ? 'Reset Nilai' : 'Reset Controls'}
              </NeuronButton>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 'var(--space-6)' }}>
              {/* Controls Column */}
              <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Orientation */}
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                    Orientation
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {(['horizontal', 'vertical'] as NeuronDividerOrientation[]).map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setPgOrientation(o)}
                        className={`accordion-anatomy-nav-chip ${pgOrientation === o ? 'is-active' : ''}`}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variant */}
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                    Variant
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(['solid', 'dashed', 'dotted', 'gradient', 'double'] as NeuronDividerVariant[]).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPgVariant(v)}
                        className={`accordion-anatomy-nav-chip ${pgVariant === v ? 'is-active' : ''}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thickness */}
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                    Thickness
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(['hairline', 'thin', 'medium', 'thick'] as NeuronDividerThickness[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPgThickness(t)}
                        className={`accordion-anatomy-nav-chip ${pgThickness === t ? 'is-active' : ''}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Intent */}
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                    Color
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(['default', 'subtle', 'strong', 'brand', 'accent', 'success', 'warning', 'error'] as NeuronDividerColor[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPgColor(c)}
                        className={`accordion-anatomy-nav-chip ${pgColor === c ? 'is-active' : ''}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spacing */}
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                    Spacing Margin
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as NeuronDividerSpacing[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setPgSpacing(s)}
                        className={`accordion-anatomy-nav-chip ${pgSpacing === s ? 'is-active' : ''}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inset Switch */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>Inset Padding</span>
                  <input
                    type="checkbox"
                    checked={pgInset}
                    onChange={(e) => setPgInset(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>

                {/* Content controls (horizontal only) */}
                {pgOrientation === 'horizontal' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 10, borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>Enable Label Content</span>
                      <input
                        type="checkbox"
                        checked={pgHasContent}
                        onChange={(e) => setPgHasContent(e.target.checked)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>

                    {pgHasContent && (
                      <>
                        <div>
                          <label style={{ fontSize: 11, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
                            Content Position
                          </label>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {(['left', 'center', 'right'] as NeuronDividerContentPosition[]).map((pos) => (
                              <button
                                key={pos}
                                type="button"
                                onClick={() => setPgContentPosition(pos)}
                                className={`accordion-anatomy-nav-chip ${pgContentPosition === pos ? 'is-active' : ''}`}
                                style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}
                              >
                                {pos}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: 11, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
                            Label Text
                          </label>
                          <input
                            type="text"
                            value={pgContentText}
                            onChange={(e) => setPgContentText(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-bg-surface)',
                              fontSize: 12,
                              color: 'var(--color-text-primary)',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: 11, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
                            Label Wrapper Type
                          </label>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {(['badge', 'text', 'icon'] as const).map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setPgContentType(type)}
                                className={`accordion-anatomy-nav-chip ${pgContentType === type ? 'is-active' : ''}`}
                                style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Preview & Code Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Live Preview Canvas */}
                <div style={{ flex: 1, padding: 32, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 240, overflow: 'hidden' }}>
                  {pgOrientation === 'horizontal' ? (
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
                        Top Section Content Block
                      </div>

                      <NeuronDivider
                        orientation={pgOrientation}
                        variant={pgVariant}
                        thickness={pgThickness}
                        color={pgColor}
                        contentPosition={pgContentPosition}
                        spacing={pgSpacing}
                        inset={pgInset}
                      >
                        {pgHasContent && (
                          pgContentType === 'badge' ? (
                            <NeuronBadge size="sm" variant={pgColor === 'brand' || pgColor === 'accent' ? 'brand' : 'default'}>
                              {pgContentText}
                            </NeuronBadge>
                          ) : pgContentType === 'icon' ? (
                            <Sparkles size={15} color="var(--color-primary)" />
                          ) : (
                            <span style={{ fontWeight: 600, fontSize: 12 }}>{pgContentText}</span>
                          )
                        )}
                      </NeuronDivider>

                      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 8 }}>
                        Bottom Section Content Block
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, height: 120 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>Previous Item</div>
                      <NeuronDivider
                        orientation="vertical"
                        variant={pgVariant}
                        thickness={pgThickness}
                        color={pgColor}
                        spacing={pgSpacing}
                        inset={pgInset}
                        style={{ height: 60 }}
                      />
                      <div style={{ fontSize: 13, fontWeight: 500 }}>Next Item</div>
                    </div>
                  )}
                </div>

                {/* Generated Code Snippet */}
                <div style={{ position: 'relative', background: 'var(--slate-900, #0f172a)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', color: '#f8fafc', fontFamily: 'monospace', fontSize: 12, overflowX: 'auto' }}>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: copiedCode ? '#34d399' : '#fff',
                      borderRadius: 4,
                      padding: '4px 8px',
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
                  </button>
                  <pre style={{ margin: 0, paddingRight: 60 }}>{generatedCode}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Real-World Use Case 1: Account Profile & Billing Settings ── */}
          <div className="section-card">
            <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isId ? '2. Studi Kasus Nyata 1: Pengaturan Profil & Zona Berbahaya' : '2. Real-World Use Case 1: Account Profile & Danger Zone'}
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId
                ? 'Menggunakan pemisah berlabel untuk mengelompokkan data umum, rincian langganan, dan pemisah semantik merah untuk zona bahaya.'
                : 'Using labeled dividers to cluster profile data, billing subscription tier, and a warning red divider for destructive actions.'}
            </p>

            <div style={{ maxWidth: 640, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl, 12px)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                  ID
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Iqbal Dzulfikar</h4>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Lead Design Systems Engineer · Admin</span>
                </div>
              </div>

              {/* General Settings Divider */}
              <NeuronDivider contentPosition="left" spacing="lg">
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'DETAIL AKUN & AUTENTIKASI' : 'ACCOUNT & AUTHENTICATION'}
                </span>
              </NeuronDivider>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Email Address</span>
                  <span style={{ fontWeight: 500 }}>iqbal@neudela.design</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Two-Factor Security</span>
                  <NeuronBadge size="xs" variant="success">Active TOTP</NeuronBadge>
                </div>
              </div>

              {/* Subscription Plan Divider */}
              <NeuronDivider contentPosition="left" spacing="lg">
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'PAKET & PENAGIHAN' : 'SUBSCRIPTION & BILLING'}
                </span>
              </NeuronDivider>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-bg-subtle)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>Enterprise Scale License</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>Renews automatically on Oct 14, 2026</div>
                </div>
                <NeuronButton variant="outline" size="xs">Manage Plan</NeuronButton>
              </div>

              {/* Danger Zone Divider */}
              <NeuronDivider color="error" contentPosition="center" spacing="xl">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-error)', fontWeight: 600, fontSize: 11.5 }}>
                  <ShieldAlert size={14} /> {isId ? 'ZONA BAHAYA (DANGER ZONE)' : 'DANGER ZONE'}
                </span>
              </NeuronDivider>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-error)' }}>Delete Workspace & Account</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>Permanently erase all design system tokens and team libraries.</div>
                </div>
                <NeuronButton variant="destructive" size="sm">Delete Account</NeuronButton>
              </div>
            </div>
          </div>

          {/* ── 3. Real-World Use Case 2: Document Editor Toolbar ── */}
          <div className="section-card">
            <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isId ? '3. Studi Kasus Nyata 2: Toolbar Editor Dokumen' : '3. Real-World Use Case 2: Document Editor Application Toolbar'}
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId
                ? 'Pemisah vertikal inline mengelompokkan aksi-aksi format teks, perataan paragraf, dan tombol riwayat revisi secara rapi.'
                : 'Inline vertical dividers clustering text formatting, paragraph alignments, and undo/redo histories.'}
            </p>

            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {/* Toolbar Bar */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '8px 14px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', gap: 4, flexWrap: 'wrap' }}>
                <NeuronButton variant="outline" size="xs">Paragraph</NeuronButton>

                <NeuronDivider orientation="vertical" spacing="sm" style={{ height: 20 }} />

                <NeuronButton variant="text" size="xs"><Bold size={14} /></NeuronButton>
                <NeuronButton variant="text" size="xs"><Italic size={14} /></NeuronButton>
                <NeuronButton variant="text" size="xs"><Underline size={14} /></NeuronButton>

                <NeuronDivider orientation="vertical" spacing="sm" style={{ height: 20 }} />

                <NeuronButton variant="text" size="xs"><AlignLeft size={14} /></NeuronButton>
                <NeuronButton variant="text" size="xs"><AlignCenter size={14} /></NeuronButton>
                <NeuronButton variant="text" size="xs"><AlignRight size={14} /></NeuronButton>

                <NeuronDivider orientation="vertical" spacing="sm" style={{ height: 20 }} />

                <NeuronButton variant="text" size="xs"><List size={14} /></NeuronButton>
                <NeuronButton variant="text" size="xs"><Link size={14} /></NeuronButton>

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <NeuronButton variant="text" size="xs"><Download size={14} /> Export</NeuronButton>
                  <NeuronDivider orientation="vertical" spacing="xs" style={{ height: 20 }} />
                  <NeuronButton variant="primary" size="xs">Save Changes</NeuronButton>
                </div>
              </div>

              {/* Editor Sheet Content */}
              <div style={{ padding: '24px 28px', minHeight: 120, fontSize: 13, lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: 'var(--color-text-primary)' }}>Neudela UI Architecture Specification</h3>
                <p style={{ margin: 0 }}>
                  A unified, enterprise-scale design framework engineered for accessibility, high-contrast clarity, and zero-layout-shift micro-interactions.
                </p>
              </div>
            </div>
          </div>

          {/* ── 4. Real-World Use Case 3: E-Commerce Checkout Breakdown ── */}
          <div className="section-card">
            <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isId ? '4. Studi Kasus Nyata 3: Checkout Pembayaran & Pemisah "OR"' : '4. Real-World Use Case 3: E-Commerce Checkout & "OR" Divider'}
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId
                ? 'Pemisah berlabel "OR" untuk memisahkan express checkout (Google Pay/Apple Pay) dengan pembayaran kartu kredit.'
                : 'Branch divider with "OR" text cleanly bisecting instant digital wallets from traditional card inputs.'}
            </p>

            <div style={{ maxWidth: 480, margin: '0 auto', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl, 12px)', padding: 28, boxShadow: 'var(--shadow-md)' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: 16, fontWeight: 700 }}>Express Checkout</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <NeuronButton variant="outline" size="md" style={{ width: '100%', fontWeight: 700 }}>
                   Pay
                </NeuronButton>
                <NeuronButton variant="outline" size="md" style={{ width: '100%', fontWeight: 700 }}>
                  G Pay
                </NeuronButton>
              </div>

              {/* "OR" Divider */}
              <NeuronDivider contentPosition="center" spacing="lg">
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', letterSpacing: 1 }}>
                  {isId ? 'ATAU BAYAR DENGAN KARTU' : 'OR PAY WITH CARD'}
                </span>
              </NeuronDivider>

              {/* Card Form Mock */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>Card Number</label>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                    <CreditCard size={16} color="var(--color-text-tertiary)" style={{ marginRight: 8 }} />
                    <span style={{ fontSize: 12.5, color: 'var(--color-text-primary)' }}>4111 ···· ···· 8924</span>
                  </div>
                </div>

                {/* Subtotal Item Breakdown with Inset Hairline Dividers */}
                <NeuronDivider inset spacing="md" variant="dotted" thickness="thin" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>$129.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                    <span>Enterprise Tax (8%)</span>
                    <span>$10.32</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 14, color: 'var(--color-text-primary)', marginTop: 4 }}>
                    <span>Total Due</span>
                    <span>$139.32</span>
                  </div>
                </div>

                <NeuronButton variant="primary" size="md" style={{ marginTop: 12 }}>
                  Complete Payment →
                </NeuronButton>
              </div>
            </div>
          </div>

          {/* ── 5. Component API Reference ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '5. Referensi API Komponen' : '5. Component API Reference'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Daftar properti (props), tipe TypeScript, nilai bawaan, dan fungsionalitas komponen NeuronDivider.'
                : 'Detailed specification of props, TypeScript types, defaults, and architectural behaviors.'}
            </p>

            <div style={{ overflowX: 'auto', marginTop: 'var(--space-4)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Prop</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Default</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>orientation</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'horizontal' | 'vertical'</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'horizontal'</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Arah bentangan garis pemisah (horizontal memanjang atau vertikal inline).</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>variant</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'solid' | 'dashed' | 'dotted' | 'gradient' | 'double'</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'solid'</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Gaya goresan garis visual (garis penuh, putus-putus, titik, gradasi memudar, atau ganda).</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>thickness</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'hairline' | 'thin' | 'medium' | 'thick'</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'thin'</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Ketebalan garis stroke (hairline: 0.5px, thin: 1px, medium: 2px, thick: 4px).</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>color</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'default' | 'subtle' | 'strong' | 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'info'</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'default'</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Tema warna dan intensitas semantik pemisah.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>contentPosition</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'center' | 'left' | 'right'</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'center'</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Penyelarasan letak teks/badge label di sepanjang garis horizontal.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>spacing</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>'md'</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Jarak margin ruang kosong di sekeliling garis pemisah.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>inset</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>boolean | number | string</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>false</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Indentasi jarak tepi agar garis tidak menempel pada batas kontainer terluar.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-primary)' }}>children</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>React.ReactNode</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>undefined</td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)' }}>Konten label teks, badge, atau ikon yang disisipkan di garis pemisah.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Footer Navigation */}
      <NextPrevious
        prev={{ id: 'comp-datepicker', label: t.nav.compDatePicker }}
        next={{ id: 'comp-dropdown', label: t.nav.compDropdown || 'Dropdown' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
