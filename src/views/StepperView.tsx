import React, { useState } from 'react';
import NeuronStepper, {
  StepperVariant,
  StepperOrientation,
  StepperSize,
  StepperConnector,
  StepperLabelPlacement,
  StepperStep,
} from '../components/NeuronStepper';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NextPrevious from '../components/NextPrevious';
import Playground from '../components/Playground';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  AlertCircle,
  User,
  CreditCard,
  Package,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Settings,
  Bell,
  Layers,
  Code,
  MapPin,
  FileText,
  Check,
  X,
  Info,
  Sparkles,
  ArrowRight,
  Copy,
  RotateCcw,
  Truck,
  PackageCheck,
  ShoppingCart,
  Fingerprint,
} from 'lucide-react';

interface StepperViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Do / Don't Rule Card
// ─────────────────────────────────────────────────────────────────────────────
function RuleCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
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
// Interactive Anatomy Viewer
// ─────────────────────────────────────────────────────────────────────────────
interface AnatomyItem {
  id: number;
  name: string;
  category: string;
  token: string;
  desc: string;
  tip: string;
}

function StepperAnatomyViewer({ isId }: { isId: boolean }) {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const activeZone = hoveredZone ?? selectedZone;

  const anatomyItems: AnatomyItem[] = [
    {
      id: 1,
      name: isId ? 'Landmark Navigasi' : 'Navigation Landmark',
      category: 'Accessibility',
      token: '<nav role="navigation">',
      desc: isId
        ? 'Wadah terluar <nav> dengan aria-label yang mendeklarasikan seluruh alur stepper sebagai wilayah navigasi terstruktur bagi assistive technology.'
        : 'Outer accessible <nav> container with aria-label identifying the entire multi-step process as a distinct navigation landmark.',
      tip: isId
        ? 'Selalu sertakan aria-label deskriptif seperti "Checkout Progress" atau "Alur Pendaftaran".'
        : 'Always provide a descriptive aria-label like "Checkout Progress" or "Registration Steps".',
    },
    {
      id: 2,
      name: isId ? 'Kolom Langkah' : 'Step Column Item',
      category: isId ? 'Kontainer Layout' : 'Layout Container',
      token: '.neuron-step',
      desc: isId
        ? 'Elemen kolom fleksibel yang menampung kepala indikator (lingkaran & rel garis) dan blok teks label dengan pembagian ruang merata.'
        : 'Flexible column item orchestrating the indicator head (circle & rail line segments) and label text with balanced flex distribution.',
      tip: isId
        ? 'Mendukung prop labelPlacement="bottom" (default) atau "inline" untuk fleksibilitas ruang.'
        : 'Supports labelPlacement="bottom" (default) or "inline" for responsive layout adaptation.',
    },
    {
      id: 3,
      name: isId ? 'Indikator Lingkaran' : 'Circle Indicator',
      category: isId ? 'Elemen Visual' : 'Visual Element',
      token: '.neuron-step__indicator',
      desc: isId
        ? 'Lingkaran indikator status yang menampilkan nomor urut progresif, ikon centang saat selesai, atau glif semantik pada varian icon.'
        : 'High-contrast circular badge displaying sequential step numbers, completion checkmarks, or semantic glyphs in icon variant.',
      tip: isId
        ? 'Tersedia 3 skala ukuran: sm (28px), md (36px), dan lg (44px) yang proporsional.'
        : 'Available in 3 standardized sizes: sm (28px), md (36px), and lg (44px) with high contrast.',
    },
    {
      id: 4,
      name: isId ? 'Garis Konektor Kontinu' : 'Continuous Connector Line',
      category: isId ? 'Rel Penghubung' : 'Connector Track',
      token: '.neuron-step__line',
      desc: isId
        ? 'Garis rel penghubung horizontal tanpa putus yang mengalir langsung antar lingkaran. Otomatis berwarna brand solid pada langkah yang telah selesai.'
        : 'Seamless unbroken horizontal railway track connecting step circles without text interruption. Fills with solid brand color upon step completion.',
      tip: isId
        ? 'Mendukung 4 gaya visual: solid, dashed, dotted, dan gradient untuk berbagai estetika UI.'
        : 'Supports 4 visual styles: solid, dashed, dotted, and gradient for versatile UI aesthetics.',
    },
    {
      id: 5,
      name: isId ? 'Judul / Label Langkah' : 'Step Title (Label)',
      category: isId ? 'Tipografi' : 'Typography',
      token: '.neuron-step__title',
      desc: isId
        ? 'Teks judul primer berbobot semibold yang memuat nama langkah secara ringkas dan mudah dipindai (scannable).'
        : 'Primary semibold heading text presenting the concise name of the step for immediate visual scannability.',
      tip: isId
        ? 'Batasi judul pada 1–2 kata ringkas (contoh: "Akun", "Pembayaran", "Selesai") agar rapi.'
        : 'Keep titles to 1–2 concise words (e.g. "Account", "Payment", "Review") to avoid wrapping.',
    },
    {
      id: 6,
      name: isId ? 'Deskripsi / Subteks' : 'Step Description',
      category: isId ? 'Panduan Kontekstual' : 'Contextual Subtext',
      token: '.neuron-step__desc',
      desc: isId
        ? 'Teks sekunder di bawah judul untuk memberikan instruksi singkat atau status ringkas (misal: "Personal info", "In progress").'
        : 'Secondary subtext beneath the title providing brief status or additional guidance (e.g. "Personal info", "In progress").',
      tip: isId
        ? 'Gunakan warna teks tersier (muted) agar tidak bersaing dengan hierarki judul utama.'
        : 'Rendered in muted tertiary tone so it never competes with the primary title hierarchy.',
    },
  ];

  const activeItem = activeZone !== null ? anatomyItems.find(a => a.id === activeZone) : null;

  return (
    <div className="stepper-anatomy-container">
      {/* ── Stage Card ── */}
      <div className="stepper-anatomy-stage-card">
        {/* Stage Header */}
        <div className="stepper-anatomy-stage-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
              {isId ? 'Kanvas Anatomi Interaktif' : 'Interactive Anatomy Canvas'}
            </span>
            <NeuronBadge size="sm" variant="brand">
              {isId ? '6 Zona Komponen' : '6 Component Zones'}
            </NeuronBadge>
          </div>
          <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>
            {isId ? '↗ Arahkan kursor atau klik nomor zona untuk menyorot bagian' : '↗ Hover or click numbered zones to inspect elements'}
          </span>
        </div>

        {/* Stage Body */}
        <div className="stepper-anatomy-stage-body">
          {/* Board wrapper for Zone 1: Navigation Landmark */}
          <div
            className={`stepper-anatomy-board ${activeZone === 1 ? 'is-active' : ''}`}
            onClick={() => setSelectedZone(prev => prev === 1 ? null : 1)}
            onMouseEnter={() => setHoveredZone(1)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            {/* Pin 1: Navigation Landmark (Top-Left of board) */}
            <div
              className={`stepper-anatomy-pin stepper-anatomy-pin--top ${activeZone === 1 ? 'is-active' : ''}`}
              style={{ left: 24 }}
              onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 1 ? null : 1); }}
              onMouseEnter={(e) => { e.stopPropagation(); setHoveredZone(1); }}
              onMouseLeave={() => setHoveredZone(null)}
              title={isId ? '1. Landmark Navigasi' : '1. Navigation Landmark'}
            >
              <span className="stepper-anatomy-pin__dot">1</span>
              <span className="stepper-anatomy-pin__stem" style={{ height: 26 }} />
            </div>

            {/* The 3-Step Stepper Display */}
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', position: 'relative' }}>
              
              {/* ── STEP 1 (Completed) ── */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Head: Left blank line, Circle 1, Right brand line */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {/* Left Line (Transparent for first step) */}
                  <div style={{ flex: 1, height: 2 }} />

                  {/* Indicator Circle 1 (Zone 3) */}
                  <div
                    className={`stepper-anatomy-zone ${activeZone === 3 ? 'is-active' : ''}`}
                    style={{ borderRadius: '50%', padding: 0 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 3 ? null : 3); }}
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredZone(3); }}
                    onMouseLeave={() => setHoveredZone(null)}
                    title={isId ? '3. Indikator Lingkaran' : '3. Circle Indicator'}
                  >
                    {/* Pin 3: Circle Indicator */}
                    <div
                      className={`stepper-anatomy-pin stepper-anatomy-pin--top ${activeZone === 3 ? 'is-active' : ''}`}
                      style={{ left: '50%' }}
                    >
                      <span className="stepper-anatomy-pin__dot">3</span>
                      <span className="stepper-anatomy-pin__stem" style={{ height: 22 }} />
                    </div>

                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      boxShadow: '0 2px 6px rgba(178, 94, 64, 0.25)',
                    }}>
                      <Check size={18} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Right Line (Solid Brand Color) connecting to Step 2 */}
                  <div
                    className={`stepper-anatomy-zone ${activeZone === 4 ? 'is-active' : ''}`}
                    style={{ flex: 1, height: 2, background: 'var(--color-primary)', position: 'relative' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 4 ? null : 4); }}
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredZone(4); }}
                    onMouseLeave={() => setHoveredZone(null)}
                    title={isId ? '4. Garis Konektor Kontinu' : '4. Continuous Connector Line'}
                  >
                    {/* Pin 4: Continuous Connector Line (placed at center of this line segment) */}
                    <div
                      className={`stepper-anatomy-pin stepper-anatomy-pin--top ${activeZone === 4 ? 'is-active' : ''}`}
                      style={{ left: '50%' }}
                    >
                      <span className="stepper-anatomy-pin__dot">4</span>
                      <span className="stepper-anatomy-pin__stem" style={{ height: 22 }} />
                    </div>
                  </div>
                </div>

                {/* Labels Block for Step 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, textAlign: 'center' }}>
                  {/* Title (Zone 5) */}
                  <div
                    className={`stepper-anatomy-zone ${activeZone === 5 ? 'is-active' : ''}`}
                    style={{ padding: '2px 8px', borderRadius: 4, position: 'relative' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 5 ? null : 5); }}
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredZone(5); }}
                    onMouseLeave={() => setHoveredZone(null)}
                    title={isId ? '5. Judul / Label Langkah' : '5. Step Title (Label)'}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Akun' : 'Account'}
                    </span>

                    {/* Pin 5: Step Title (Pointing UP from below) */}
                    <div
                      className={`stepper-anatomy-pin stepper-anatomy-pin--bottom ${activeZone === 5 ? 'is-active' : ''}`}
                      style={{ left: '50%' }}
                    >
                      <span className="stepper-anatomy-pin__stem" style={{ height: 18 }} />
                      <span className="stepper-anatomy-pin__dot">5</span>
                    </div>
                  </div>

                  {/* Subtext */}
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                    {isId ? 'Terverifikasi' : 'Verified'}
                  </span>
                </div>
              </div>

              {/* ── STEP 2 (Active) (Zone 2: Step Column Item) ── */}
              <div
                className={`stepper-anatomy-zone ${activeZone === 2 ? 'is-active' : ''}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  borderRadius: 8,
                  padding: '0 4px',
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 2 ? null : 2); }}
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredZone(2); }}
                onMouseLeave={() => setHoveredZone(null)}
                title={isId ? '2. Kolom Langkah (Container)' : '2. Step Column Item'}
              >
                {/* Pin 2: Step Column Container */}
                <div
                  className={`stepper-anatomy-pin stepper-anatomy-pin--top ${activeZone === 2 ? 'is-active' : ''}`}
                  style={{ left: '50%' }}
                >
                  <span className="stepper-anatomy-pin__dot">2</span>
                  <span className="stepper-anatomy-pin__stem" style={{ height: 36 }} />
                </div>

                {/* Head: Left brand line, Circle 2, Right gray line */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {/* Left Line (Matches brand color of previous step) */}
                  <div style={{ flex: 1, height: 2, background: 'var(--color-primary)' }} />

                  {/* Indicator Circle 2 (Active state with halo) */}
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'var(--color-bg-surface)',
                    border: '2px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    boxShadow: '0 0 0 5px rgba(178, 94, 64, 0.16)',
                    zIndex: 2,
                  }}>
                    2
                  </div>

                  {/* Right Line (Gray border track) */}
                  <div style={{ flex: 1, height: 2, background: 'var(--color-border)' }} />
                </div>

                {/* Labels Block for Step 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary)' }}>
                    {isId ? 'Profil Pengguna' : 'Profile Details'}
                  </span>

                  {/* Description Subtext (Zone 6) */}
                  <div
                    className={`stepper-anatomy-zone ${activeZone === 6 ? 'is-active' : ''}`}
                    style={{ padding: '2px 8px', borderRadius: 4, position: 'relative', marginTop: 2 }}
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 6 ? null : 6); }}
                    onMouseEnter={(e) => { e.stopPropagation(); setHoveredZone(6); }}
                    onMouseLeave={() => setHoveredZone(null)}
                    title={isId ? '6. Deskripsi / Subteks' : '6. Step Description'}
                  >
                    <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {isId ? 'Sedang diisi' : 'In progress'}
                    </span>

                    {/* Pin 6: Step Description (Pointing UP from below) */}
                    <div
                      className={`stepper-anatomy-pin stepper-anatomy-pin--bottom ${activeZone === 6 ? 'is-active' : ''}`}
                      style={{ left: '50%' }}
                    >
                      <span className="stepper-anatomy-pin__stem" style={{ height: 18 }} />
                      <span className="stepper-anatomy-pin__dot">6</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── STEP 3 (Upcoming) ── */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Head: Left gray line, Circle 3, Right blank line */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {/* Left Line */}
                  <div style={{ flex: 1, height: 2, background: 'var(--color-border)' }} />

                  {/* Indicator Circle 3 (Upcoming) */}
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'var(--color-bg-surface)',
                    border: '2px solid var(--color-border)',
                    color: 'var(--color-text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 14,
                  }}>
                    3
                  </div>

                  {/* Right Line (Blank for last step) */}
                  <div style={{ flex: 1, height: 2 }} />
                </div>

                {/* Labels Block for Step 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Konfirmasi' : 'Confirmation'}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                    {isId ? 'Menunggu' : 'Pending'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Stage Footer (Zero Layout Shift) */}
        <div className="stepper-anatomy-stage-footer">
          {activeItem ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', background: 'var(--color-primary)',
                  color: '#fff', fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {activeItem.id}
                </span>
                {activeItem.name}
              </span>
              <code style={{ background: 'var(--color-bg-surface)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 11 }}>
                {activeItem.token}
              </code>
              <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>{activeItem.desc}</span>
            </div>
          ) : (
            <span style={{ color: 'var(--color-text-tertiary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Info size={14} />
              {isId
                ? 'Arahkan kursor atau klik nomor zona di atas / kartu di bawah untuk melihat rincian token dan peran aksesibilitas.'
                : 'Hover or click numbered zones above or cards below to inspect element tokens and accessibility roles.'}
            </span>
          )}
        </div>
      </div>

      {/* Grid of 6 Anatomy Cards (Balanced 3x2 Grid) */}
      <div className="stepper-anatomy-grid">
        {anatomyItems.map(item => {
          const isSelected = activeZone === item.id;
          return (
            <div
              key={item.id}
              className={`stepper-anatomy-card ${isSelected ? 'is-active' : ''}`}
              onMouseEnter={() => setHoveredZone(item.id)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => setSelectedZone(prev => prev === item.id ? null : item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: isSelected ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                    border: isSelected ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    color: isSelected ? '#fff' : 'var(--color-text-secondary)',
                    transition: 'all 0.15s ease',
                  }}>
                    {item.id}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                    {item.name}
                  </span>
                </div>
                <NeuronBadge size="sm" variant={isSelected ? 'brand' : 'neutral'}>
                  {item.category}
                </NeuronBadge>
              </div>

              <code style={{
                fontSize: 11,
                background: 'var(--color-bg-subtle)',
                padding: '3px 8px',
                borderRadius: 4,
                color: 'var(--color-primary)',
                border: '1px solid var(--color-border)',
                width: 'fit-content',
                fontFamily: 'monospace',
                margin: '8px 0 6px',
              }}>
                {item.token}
              </code>

              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {item.desc}
              </p>

              <div style={{
                marginTop: 'auto',
                paddingTop: 'var(--space-3, 12px)',
                borderTop: '1px dashed var(--color-border)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6,
              }}>
                <Info size={13} style={{ flexShrink: 0, marginTop: 2, color: 'var(--color-primary)' }} />
                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', lineHeight: 1.45 }}>
                  {item.tip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main StepperView
// ─────────────────────────────────────────────────────────────────────────────
export default function StepperView({ setActiveTab }: StepperViewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';
  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // ── Playground Active Step State ──────────────────────────────────────────
  const [pgActiveStep, setPgActiveStep] = useState(1);

  const playgroundSteps: StepperStep[] = [
    { id: 1, label: isId ? 'Akun' : 'Account', description: isId ? 'Info login dasar' : 'Basic login info', icon: <User size={18} strokeWidth={2} /> },
    { id: 2, label: isId ? 'Profil' : 'Profile', description: isId ? 'Data pengguna' : 'User details', icon: <FileText size={18} strokeWidth={2} /> },
    { id: 3, label: isId ? 'Keamanan' : 'Security', description: isId ? 'Verifikasi OTP' : 'OTP verification', icon: <ShieldCheck size={18} strokeWidth={2} /> },
    { id: 4, label: isId ? 'Selesai' : 'Done', description: isId ? 'Siap digunakan' : 'Ready to go', icon: <CheckCircle2 size={18} strokeWidth={2} /> },
  ];

  // ── Checkout scenario ─────────────────────────────────────────────────────
  const [checkoutStep, setCheckoutStep] = useState(1);
  const checkoutSteps: StepperStep[] = [
    { id: 1, label: isId ? 'Keranjang' : 'Cart', icon: <ShoppingCart size={16} strokeWidth={2} /> },
    { id: 2, label: isId ? 'Alamat' : 'Address', icon: <MapPin size={16} strokeWidth={2} /> },
    { id: 3, label: isId ? 'Pembayaran' : 'Payment', icon: <CreditCard size={16} strokeWidth={2} /> },
    { id: 4, label: isId ? 'Konfirmasi' : 'Confirm', icon: <ShieldCheck size={16} strokeWidth={2} /> },
    { id: 5, label: isId ? 'Pengiriman' : 'Delivery', icon: <Truck size={16} strokeWidth={2} /> },
  ];

  // ── Onboarding scenario ───────────────────────────────────────────────────
  const [onboardStep, setOnboardStep] = useState(1);
  const onboardSteps: StepperStep[] = [
    {
      id: 1, label: isId ? 'Buat Akun' : 'Create Account',
      description: isId ? 'Email & kata sandi' : 'Email & password',
      icon: <User size={16} strokeWidth={2} />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
            {isId ? 'Masukkan detail akun Anda untuk memulai proses pendaftaran.' : 'Enter your account details to get started with registration.'}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <NeuronButton size="sm" variant="primary" onClick={() => setOnboardStep(2)}>
              {isId ? 'Lanjut' : 'Continue'}
            </NeuronButton>
          </div>
        </div>
      ),
    },
    {
      id: 2, label: isId ? 'Info Organisasi' : 'Company Info',
      description: isId ? 'Detail perusahaan' : 'Organization details',
      icon: <Layers size={16} strokeWidth={2} />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
            {isId ? 'Tambahkan nama dan informasi bidang usaha Anda.' : 'Add your company name and industry details.'}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <NeuronButton size="sm" variant="outline" onClick={() => setOnboardStep(1)}>
              {isId ? 'Kembali' : 'Back'}
            </NeuronButton>
            <NeuronButton size="sm" variant="primary" onClick={() => setOnboardStep(3)}>
              {isId ? 'Lanjut' : 'Continue'}
            </NeuronButton>
          </div>
        </div>
      ),
    },
    {
      id: 3, label: isId ? 'Undang Tim' : 'Invite Team',
      description: isId ? 'Tambah rekan kerja' : 'Add collaborators',
      icon: <Bell size={16} strokeWidth={2} />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
            {isId ? 'Undang anggota tim Anda via email untuk bergabung ke workspace.' : 'Invite your team members via email to join workspace.'}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <NeuronButton size="sm" variant="outline" onClick={() => setOnboardStep(2)}>
              {isId ? 'Kembali' : 'Back'}
            </NeuronButton>
            <NeuronButton size="sm" variant="primary" onClick={() => setOnboardStep(4)}>
              {isId ? 'Selesai' : 'Finish'}
            </NeuronButton>
          </div>
        </div>
      ),
    },
    {
      id: 4, label: isId ? 'Siap Digunakan' : 'All Ready',
      description: isId ? 'Workspace aktif' : 'Active workspace',
      icon: <CheckCircle2 size={16} strokeWidth={2} />,
    },
  ];



  return (
    <div className="view-container">
      {/* ── Standard Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.nav.compStepper || 'Stepper'}</h1>
            <p className="page-subtitle">
              {isId
                ? 'Komponen navigasi tahapan multi-langkah dengan garis konektor kontinu tanpa jeda, varian icon interaktif, dan kontrol layout horizontal & vertikal.'
                : 'Multi-step progress guide component featuring continuous unbroken connectors, rich icon circle indicators, and flexible layout options.'}
            </p>
          </div>
        </div>
        {/* Tab switcher */}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

          {/* ── 1. Overview & Key Pillars ── */}
          <section>
            <h2 className="section-title">
              {isId ? '1. Ikhtisar & Pilar Utama' : '1. Overview & Key Pillars'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Stepper memandu pengguna menyelesaikan tugas yang terbagi menjadi beberapa fase terstruktur, menyajikan garis koneksi yang kontinu dan status langkah yang jelas.'
                : 'Steppers guide users through multi-phase structured workflows, presenting clean continuous connector lines and intuitive state indicators.'}
            </p>

            {/* Pillar cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              {[
                { icon: <Sparkles size={22} strokeWidth={1.75} />, title: isId ? 'Garis Konektor Kontinu' : 'Unbroken Line Flow', desc: isId ? 'Garis konektor menghubungkan antar lingkaran langkah secara presisi tanpa terputus atau tergeser oleh label teks.' : 'Connector lines bridge between circle indicators seamlessly without gaps or misalignment caused by text.' },
                { icon: <User size={22} strokeWidth={1.75} />, title: isId ? 'Indikator Ikon & Nomor' : 'Icons & Numbered Circles', desc: isId ? 'Mendukung nomor urut otomatis maupun ikon visual representatif (User, Cart, Card, Truck, Check).' : 'Supports sequential numeric badges or rich semantic icons for immediate domain recognition.' },
                { icon: <Settings size={22} strokeWidth={1.75} />, title: isId ? 'State Machine Dinamis' : 'Dynamic State Machine', desc: isId ? 'Empat state terintegrasi: Upcoming, Active (pulse halo), Completed (centang/ikon), dan Error (silang).' : 'Four integrated states: Upcoming, Active (soft pulse halo), Completed (check/icon), and Error (cross).' },
                { icon: <Layers size={22} strokeWidth={1.75} />, title: isId ? 'Tata Letak Fleksibel' : 'Flexible Layouts', desc: isId ? 'Mendukung label di bawah lingkaran (centered), label sejajar (inline), serta orientasi vertikal.' : 'Supports label beneath circle (centered), inline beside circle, and full vertical rail layouts.' },
              ].map((p, i) => (
                <div key={i} className="section-card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light, rgba(178,94,64,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', marginBottom: 4 }}>{p.title}</div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec matrix */}
            <div className="section-card" style={{ marginTop: 'var(--space-6)', padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)', fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                {isId ? 'Matriks Spesifikasi' : 'Specification Matrix'}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="api-table" style={{ minWidth: 540 }}>
                  <thead>
                    <tr>
                      <th>{isId ? 'Dimensi' : 'Dimension'}</th>
                      <th>{isId ? 'Nilai' : 'Values'}</th>
                      <th>{isId ? 'Default' : 'Default'}</th>
                      <th>{isId ? 'Keterangan' : 'Notes'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code className="api-prop-code">variant</code></td><td><code className="api-type-code">default | icon | compact | dot | numbered</code></td><td><code className="api-default-code">default</code></td><td>{isId ? 'Varian tampilan lingkaran atau segmen' : 'Visual presentation variant'}</td></tr>
                    <tr><td><code className="api-prop-code">labelPlacement</code></td><td><code className="api-type-code">bottom | inline</code></td><td><code className="api-default-code">bottom</code></td><td>{isId ? 'Posisi label terhadap lingkaran langkah' : 'Position of label relative to indicator'}</td></tr>
                    <tr><td><code className="api-prop-code">orientation</code></td><td><code className="api-type-code">horizontal | vertical</code></td><td><code className="api-default-code">horizontal</code></td><td>{isId ? 'Arah aliran langkah navigasi' : 'Flow direction of the steps'}</td></tr>
                    <tr><td><code className="api-prop-code">size</code></td><td><code className="api-type-code">sm (28px) | md (36px) | lg (44px)</code></td><td><code className="api-default-code">md</code></td><td>{isId ? 'Diameter lingkaran indikator' : 'Diameter of the circle indicators'}</td></tr>
                    <tr><td><code className="api-prop-code">connectorStyle</code></td><td><code className="api-type-code">solid | dashed | dotted | gradient</code></td><td><code className="api-default-code">solid</code></td><td>{isId ? 'Gaya garis konektor kontinu' : 'Style of connecting line between steps'}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── 2. Visual Variants ── */}
          <section>
            <h2 className="section-title">{isId ? '2. Varian Visual' : '2. Visual Variants'}</h2>
            <p className="section-description">
              {isId ? 'Pilihan varian visual yang disesuaikan untuk berbagai konteks — dari nomor urut standar, ikon tematik, hingga progress bar kompak.' : 'Visual variants tailored for diverse user journeys — from numbered steps, semantic icons, to compact progress bars.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
              {[
                {
                  name: isId ? '1. Default (Bernomor)' : '1. Default (Numbered)',
                  badge: 'variant="default"',
                  desc: isId ? 'Lingkaran bernomor dengan garis kontinu sempurna dan label di bawah. Cocok untuk alur form standar.' : 'Numbered circles with continuous unbroken lines and centered labels below. Ideal for standard workflows.',
                  steps: [
                    { id: 1, label: isId ? 'Isi Data' : 'Fill Data', description: isId ? 'Informasi akun' : 'Account info' },
                    { id: 2, label: isId ? 'Konfirmasi' : 'Confirm', description: isId ? 'Tinjau ringkasan' : 'Review summary' },
                    { id: 3, label: isId ? 'Kirim' : 'Submit', description: isId ? 'Selesai transaksi' : 'Complete action' },
                  ],
                  active: 1, variant: 'default' as StepperVariant,
                },
                {
                  name: isId ? '2. Icon Stepper (Lingkaran Berikon)' : '2. Icon Stepper (Icon Circles)',
                  badge: 'variant="icon"',
                  desc: isId ? 'Lingkaran berikon representatif di setiap tahapan. Sangat visual dan intuitif untuk alur belanja atau KYC.' : 'Circles featuring semantic icons per step. Highly visual and intuitive for checkout or onboarding.',
                  steps: [
                    { id: 1, label: isId ? 'Daftar' : 'Register', description: isId ? 'Akun baru' : 'Account', icon: <User size={18} strokeWidth={2} /> },
                    { id: 2, label: isId ? 'Identitas' : 'Identity', description: isId ? 'Verifikasi KTP' : 'KYC Docs', icon: <FileText size={18} strokeWidth={2} /> },
                    { id: 3, label: isId ? 'Bayar' : 'Payment', description: isId ? 'Kartu kredit' : 'Billing', icon: <CreditCard size={18} strokeWidth={2} /> },
                    { id: 4, label: isId ? 'Selesai' : 'Success', description: isId ? 'Akun aktif' : 'Ready', icon: <CheckCircle2 size={18} strokeWidth={2} /> },
                  ],
                  active: 1, variant: 'icon' as StepperVariant,
                },
                {
                  name: isId ? '3. Compact (Progress Bar)' : '3. Compact (Progress Bar)',
                  badge: 'variant="compact"',
                  desc: isId ? 'Bilah segmen tipis dengan nama langkah aktif di bawah. Paling hemat ruang untuk header atau widget modal.' : 'Thin segmented track with current step name beneath. Space-saving for modal headers or cards.',
                  steps: [
                    { id: 1, label: isId ? 'Langkah 1' : 'Step 1' },
                    { id: 2, label: isId ? 'Langkah 2' : 'Step 2', description: isId ? 'Sedang berjalan' : 'In progress' },
                    { id: 3, label: isId ? 'Langkah 3' : 'Step 3' },
                    { id: 4, label: isId ? 'Langkah 4' : 'Step 4' },
                  ],
                  active: 1, variant: 'compact' as StepperVariant,
                },
                {
                  name: isId ? '4. Minimal (Titik / Dots)' : '4. Minimal (Dots)',
                  badge: 'variant="dot"',
                  desc: isId ? 'Hanya titik indikator bersih tanpa teks. Ideal untuk carousel foto, onboarding slide, atau panduan visual.' : 'Clean minimalist dots without labels. Perfect for image carousels or onboarding walkthroughs.',
                  steps: [
                    { id: 1, label: '1' },
                    { id: 2, label: '2' },
                    { id: 3, label: '3' },
                    { id: 4, label: '4' },
                    { id: 5, label: '5' },
                  ],
                  active: 2, variant: 'dot' as StepperVariant,
                },
              ].map((v, i) => (
                <div key={i} className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{v.name}</span>
                    <code style={{ fontSize: 10, background: 'var(--color-bg-subtle)', padding: '1px 6px', borderRadius: 4, color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>{v.badge}</code>
                  </div>
                  <div style={{ padding: 'var(--space-6) var(--space-5)', display: 'flex', justifyContent: 'center' }}>
                    <NeuronStepper
                      steps={v.steps as StepperStep[]}
                      activeStep={v.active}
                      variant={v.variant}
                      orientation="horizontal"
                      labelPlacement="bottom"
                      size="md"
                    />
                  </div>
                  <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Dedicated Icon Stepper Showcase ── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              <h2 className="section-title" style={{ margin: 0 }}>{isId ? '3. Stepper dengan Ikon (Icon-Based Stepper)' : '3. Icon-Based Stepper Showcase'}</h2>
              <NeuronBadge size="sm" variant="brand">Enhanced</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Penggunaan ikon di dalam lingkaran indikator memberikan konteks semantik instan kepada pengguna tanpa perlu membaca label teks secara menyeluruh. Sangat direkomendasikan untuk alur transaksi dan onboarding.'
                : 'Using icons inside circle indicators delivers instantaneous semantic meaning to users without requiring them to read each text label. Highly recommended for checkout and onboarding flows.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
              {/* Scenario 1: E-Commerce */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <ShoppingCart size={15} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                      {isId ? 'Alur Belanja E-Commerce (E-Commerce Checkout Flow)' : 'E-Commerce Order Checkout Flow'}
                    </span>
                  </div>
                  <NeuronBadge size="sm" variant="neutral">4 Steps</NeuronBadge>
                </div>
                <div style={{ padding: 'var(--space-6) var(--space-6)' }}>
                  <NeuronStepper
                    steps={[
                      { id: 1, label: isId ? 'Keranjang' : 'Cart', description: isId ? '3 Produk terpilih' : '3 Items selected', icon: <ShoppingCart size={17} strokeWidth={2} /> },
                      { id: 2, label: isId ? 'Alamat Kirim' : 'Shipping', description: isId ? 'Rumah / Kantor' : 'Home / Office', icon: <MapPin size={17} strokeWidth={2} /> },
                      { id: 3, label: isId ? 'Pembayaran' : 'Payment', description: isId ? 'Pilih metode bayar' : 'Choose payment', icon: <CreditCard size={17} strokeWidth={2} /> },
                      { id: 4, label: isId ? 'Konfirmasi' : 'Confirmation', description: isId ? 'Pesanan selesai' : 'Order complete', icon: <PackageCheck size={17} strokeWidth={2} /> },
                    ]}
                    activeStep={2}
                    variant="icon"
                    size="md"
                    orientation="horizontal"
                    labelPlacement="bottom"
                  />
                </div>
              </div>

              {/* Scenario 2: KYC Verification */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Fingerprint size={15} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                      {isId ? 'Verifikasi Keamanan KYC (Identity Verification Flow)' : 'KYC Security Identity Flow'}
                    </span>
                  </div>
                  <NeuronBadge size="sm" variant="neutral">4 Steps</NeuronBadge>
                </div>
                <div style={{ padding: 'var(--space-6) var(--space-6)' }}>
                  <NeuronStepper
                    steps={[
                      { id: 1, label: isId ? 'Data Diri' : 'Profile', description: isId ? 'Nama & kontak' : 'Personal info', icon: <User size={17} strokeWidth={2} /> },
                      { id: 2, label: isId ? 'Foto KTP' : 'National ID', description: isId ? 'Unggah dokumen' : 'Upload scan', icon: <FileText size={17} strokeWidth={2} /> },
                      { id: 3, label: isId ? 'Biometrik' : 'Biometrics', description: isId ? 'Pindai wajah' : 'Facial match', icon: <Fingerprint size={17} strokeWidth={2} /> },
                      { id: 4, label: isId ? 'Terverifikasi' : 'Verified', description: isId ? 'Akun aktif penuh' : 'Full access', icon: <ShieldCheck size={17} strokeWidth={2} /> },
                    ]}
                    activeStep={1}
                    variant="icon"
                    size="md"
                    orientation="horizontal"
                    labelPlacement="bottom"
                  />
                </div>
              </div>

              {/* Scenario 3: DevOps Release Pipeline */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Code size={15} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                      {isId ? 'Pipeline Deploy Cloud (CI/CD Automated Deployment)' : 'Cloud CI/CD Release Pipeline'}
                    </span>
                  </div>
                  <NeuronBadge size="sm" variant="neutral">4 Steps</NeuronBadge>
                </div>
                <div style={{ padding: 'var(--space-6) var(--space-6)' }}>
                  <NeuronStepper
                    steps={[
                      { id: 1, label: isId ? 'Build' : 'Build', description: isId ? 'Kompilasi kode' : 'Bundle compiled', icon: <Code size={17} strokeWidth={2} /> },
                      { id: 2, label: isId ? 'Testing' : 'Testing', description: isId ? 'Unit & E2E lolos' : 'Tests passed', icon: <Layers size={17} strokeWidth={2} /> },
                      { id: 3, label: isId ? 'Keamanan' : 'Security', description: isId ? 'Pemindaian celah' : 'Vulnerability scan', icon: <Sparkles size={17} strokeWidth={2} /> },
                      { id: 4, label: isId ? 'Production' : 'Production', description: isId ? 'Rilis ke server' : 'Deployed live', icon: <Bell size={17} strokeWidth={2} /> },
                    ]}
                    activeStep={2}
                    variant="icon"
                    size="md"
                    connectorStyle="gradient"
                    orientation="horizontal"
                    labelPlacement="bottom"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. Orientations & Label Placement ── */}
          <section>
            <h2 className="section-title">{isId ? '4. Orientasi & Penempatan Label' : '4. Orientations & Label Placement'}</h2>
            <p className="section-description">
              {isId ? 'Pilih orientasi dan peletakan label yang paling sesuai dengan ruang layar dan hierarki informasi Anda.' : 'Choose orientation and label placement best matched with screen real-estate and layout hierarchy.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
              {/* Horizontal - Label Bottom */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>Horizontal (Label Bottom)</span>
                  <code style={{ fontSize: 10, background: 'var(--color-bg-subtle)', padding: '1px 6px', borderRadius: 4, color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>labelPlacement="bottom"</code>
                </div>
                <div style={{ padding: 'var(--space-6) var(--space-5)' }}>
                  <NeuronStepper
                    steps={[
                      { id: 1, label: isId ? 'Pilih Paket' : 'Plan', description: isId ? 'Langganan' : 'Subscription' },
                      { id: 2, label: isId ? 'Bayar' : 'Payment', description: isId ? 'Kartu' : 'Credit Card' },
                      { id: 3, label: isId ? 'Aktivasi' : 'Activate', description: isId ? 'Selesai' : 'Instant' },
                    ]}
                    activeStep={1}
                    variant="default"
                    orientation="horizontal"
                    labelPlacement="bottom"
                    size="md"
                  />
                </div>
                <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {isId ? 'Lingkaran di atas dengan garis kontinu lurus antar lingkaran; label terpusat di bawah.' : 'Circles at top connected continuously; labels centered beneath.'}
                  </p>
                </div>
              </div>

              {/* Horizontal - Label Inline */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>Horizontal (Label Inline)</span>
                  <code style={{ fontSize: 10, background: 'var(--color-bg-subtle)', padding: '1px 6px', borderRadius: 4, color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>labelPlacement="inline"</code>
                </div>
                <div style={{ padding: 'var(--space-6) var(--space-5)' }}>
                  <NeuronStepper
                    steps={[
                      { id: 1, label: isId ? 'Detail' : 'Details' },
                      { id: 2, label: isId ? 'Alamat' : 'Address' },
                      { id: 3, label: isId ? 'Kirim' : 'Submit' },
                    ]}
                    activeStep={1}
                    variant="default"
                    orientation="horizontal"
                    labelPlacement="inline"
                    size="md"
                  />
                </div>
                <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {isId ? 'Label sejajar di sebelah kanan lingkaran dengan garis jembatan yang bersih.' : 'Labels aligned beside circles with clean bridging connector lines.'}
                  </p>
                </div>
              </div>

              {/* Vertical */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>Vertical (Rail Layout)</span>
                  <code style={{ fontSize: 10, background: 'var(--color-bg-subtle)', padding: '1px 6px', borderRadius: 4, color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>orientation="vertical"</code>
                </div>
                <div style={{ padding: 'var(--space-5) var(--space-5)' }}>
                  <NeuronStepper
                    steps={[
                      {
                        id: 1, label: isId ? 'Buat Akun' : 'Create Account',
                        description: isId ? 'Email & kata sandi' : 'Email & password',
                      },
                      {
                        id: 2, label: isId ? 'Verifikasi' : 'Verify',
                        description: isId ? 'Konfirmasi SMS' : 'SMS confirmation',
                        content: <p style={{ fontSize: 'var(--fs-text-xs)', margin: 0 }}>{isId ? 'Masukkan kode OTP 6-digit di sini.' : 'Enter 6-digit OTP code here.'}</p>
                      },
                      {
                        id: 3, label: isId ? 'Selesai' : 'Done',
                        description: isId ? 'Siap digunakan' : 'Ready to use',
                      },
                    ]}
                    activeStep={1}
                    variant="default"
                    orientation="vertical"
                    size="md"
                  />
                </div>
                <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {isId ? 'Rel vertikal dengan garis lurus kontinu dan slot konten di setiap langkah aktif.' : 'Vertical rail with continuous straight lines and inline content slots.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. Interactive Anatomy ── */}
          <section>
            <h2 className="section-title">{isId ? '5. Anatomi Komponen' : '5. Component Anatomy'}</h2>
            <p className="section-description">
              {isId ? 'Detail bagian-bagian penyusun stepper, token CSS, dan panduan aksesibilitas untuk masing-masing zona.' : 'Detailed breakdown of stepper components, CSS tokens, and accessibility guidance for each zone.'}
            </p>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <StepperAnatomyViewer isId={isId} />
            </div>
          </section>

          {/* ── 6. Step States & Error Handling ── */}
          <section>
            <h2 className="section-title">{isId ? '6. Status Siklus Langkah (Step States)' : '6. Step States & Lifecycle'}</h2>
            <p className="section-description">
              {isId ? 'Setiap langkah memiliki 4 status visual yang jelas: Upcoming, Active, Completed, dan Error.' : 'Each step features 4 unambiguous visual states: Upcoming, Active, Completed, and Error.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              {[
                {
                  title: '1. Upcoming (Mendatang)', badge: 'upcoming',
                  desc: isId ? 'Langkah belum tercapai. Border netral, teks abu-abu, tidak dapat diklik secara acak.' : 'Step not yet reached. Neutral border, muted gray text, inactive.',
                  step: { id: 1, label: isId ? 'Langkah Belum' : 'Upcoming Step', description: isId ? 'Menunggu giliran' : 'Pending turn', status: 'upcoming' as const },
                },
                {
                  title: '2. Active (Sedang Aktif)', badge: 'active',
                  desc: isId ? 'Langkah yang sedang dikerjakan. Latar brand solid dengan animasi denyut ring halus.' : 'Step currently in progress. Solid brand fill with gentle pulsing halo.',
                  step: { id: 2, label: isId ? 'Langkah Aktif' : 'Active Step', description: isId ? 'Sedang diisi' : 'In progress', status: 'active' as const },
                },
                {
                  title: '3. Completed (Selesai)', badge: 'completed',
                  desc: isId ? 'Langkah telah berhasil diselesaikan. Warna brand solid dengan ikon centang tajam.' : 'Step successfully completed. Solid brand fill with crisp checkmark.',
                  step: { id: 3, label: isId ? 'Langkah Selesai' : 'Completed Step', description: isId ? 'Tervalidasi' : 'Validated', status: 'completed' as const },
                },
                {
                  title: '4. Error (Gagal Validasi)', badge: 'error',
                  desc: isId ? 'Langkah mengalami kesalahan validasi. Latar merah peringatan dengan ikon silang.' : 'Step encountered validation failure. Crimson red fill with cross icon.',
                  step: { id: 4, label: isId ? 'Langkah Gagal' : 'Error Step', description: isId ? 'Perbaiki data' : 'Fix data', status: 'error' as const },
                },
              ].map((s, i) => (
                <div key={i} className="section-card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>{s.title}</span>
                    <NeuronBadge size="sm" variant={s.badge === 'active' || s.badge === 'completed' ? 'brand' : s.badge === 'error' ? 'danger' : 'neutral'}>
                      {s.badge}
                    </NeuronBadge>
                  </div>
                  <div style={{ padding: 'var(--space-4) 0', display: 'flex', justifyContent: 'center' }}>
                    <NeuronStepper
                      steps={[s.step]}
                      activeStep={0}
                      variant="default"
                      orientation="horizontal"
                      size="md"
                    />
                  </div>
                  <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 7. Do's & Don'ts ── */}
          <section>
            <h2 className="section-title">Do's & Don'ts</h2>
            <p className="section-description">
              {isId ? 'Panduan praktis agar alur tahapan stepper memberikan pengalaman terbaik bagi pengguna.' : 'Practical guidelines for optimal user experience with multi-step workflows.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              {/* Pair 1 */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview">
                    <NeuronStepper
                      steps={[
                        { id: 1, label: isId ? 'Akun' : 'Account' },
                        { id: 2, label: isId ? 'Alamat' : 'Address' },
                        { id: 3, label: isId ? 'Bayar' : 'Payment' },
                        { id: 4, label: isId ? 'Selesai' : 'Done' },
                      ]}
                      activeStep={1}
                      variant="default"
                      size="sm"
                    />
                  </div>
                  <div className="rule-card__body">
                    <div className="rule-card__title">{isId ? 'Gunakan 3–5 langkah logis' : 'Keep to 3–5 logical steps'}</div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Kelompokkan bidang form yang berhubungan ke dalam 3–5 langkah. Jumlah langkah yang terlalu banyak membuat pengguna enggan menyelesaikan.'
                        : 'Group related form fields into 3–5 logical steps. Too many steps increases abandonment rate.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview">
                    <NeuronStepper
                      steps={[
                        { id: 1, label: '1' }, { id: 2, label: '2' }, { id: 3, label: '3' },
                        { id: 4, label: '4' }, { id: 5, label: '5' }, { id: 6, label: '6' },
                        { id: 7, label: '7' }, { id: 8, label: '8' },
                      ]}
                      activeStep={2}
                      variant="default"
                      size="sm"
                    />
                  </div>
                  <div className="rule-card__body">
                    <div className="rule-card__title">{isId ? 'Jangan gunakan lebih dari 6 langkah' : "Don't overload with 6+ steps"}</div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Menampilkan lebih dari 6 langkah pada layar horizontal membuat tampilan padat dan terasa melelahkan bagi pengguna.'
                        : 'Displaying more than 6 steps horizontally crowds the screen and creates psychological fatigue.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 2 */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview">
                    <NeuronStepper
                      steps={[
                        { id: 1, label: isId ? 'Pengiriman' : 'Shipping', icon: <Truck size={15} strokeWidth={2} /> },
                        { id: 2, label: isId ? 'Pembayaran' : 'Payment', icon: <CreditCard size={15} strokeWidth={2} /> },
                        { id: 3, label: isId ? 'Selesai' : 'Complete', icon: <CheckCircle2 size={15} strokeWidth={2} /> },
                      ]}
                      activeStep={1}
                      variant="icon"
                      size="sm"
                    />
                  </div>
                  <div className="rule-card__body">
                    <div className="rule-card__title">{isId ? 'Gunakan ikon semantik yang jelas' : 'Use intuitive semantic icons'}</div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Ikon seperti Keranjang, Kartu Kredit, atau Truk langsung dikenali secara visual tanpa perlu membaca teks panjang.'
                        : 'Icons like Cart, Credit Card, or Truck are instantly recognized without reading lengthy labels.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 11, color: 'var(--color-danger, #ef4444)', fontWeight: 600 }}>
                        {isId ? 'Langkah 1: Mengisi formulir data profil pengguna' : 'Step 1: Fill out user profile information form'}
                      </span>
                    </div>
                  </div>
                  <div className="rule-card__body">
                    <div className="rule-card__title">{isId ? 'Jangan membuat label terlalu panjang' : "Don't use overly long labels"}</div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Label yang panjang menyebabkan teks terpotong atau tumpang tindih. Gunakan maksimal 2 kata padat.'
                        : 'Lengthy labels cause awkward wrapping and truncation. Keep labels strictly under 2–3 words.'}
                    </p>
                  </div>
                </RuleCard>
              </div>
            </div>
          </section>

          {/* ── 8. Accessibility ── */}
          <section>
            <h2 className="section-title">{isId ? '8. Aksesibilitas (WAI-ARIA)' : '8. Accessibility (WAI-ARIA)'}</h2>
            <p className="section-description">
              {isId ? 'Panduan aksesibilitas untuk memastikan stepper dapat dinavigasi oleh pengguna pembaca layar dan keyboard.' : 'Accessibility guidelines to ensure steppers are fully navigable for screen readers and keyboard users.'}
            </p>

            <div className="section-card" style={{ marginTop: 'var(--space-6)', padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)', fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                {isId ? 'Navigasi Keyboard & ARIA Pattern' : 'Keyboard Navigation & ARIA Pattern'}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '25%' }}>{isId ? 'Tombol / Atribut' : 'Key / Attribute'}</th>
                      <th style={{ width: '30%' }}>Target</th>
                      <th style={{ width: '45%' }}>{isId ? 'Fungsi / Perilaku' : 'Function / Behavior'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><kbd className="api-kbd">Tab</kbd></td><td>Indikator Langkah</td><td>{isId ? 'Fokus ke langkah berikutnya yang dapat diklik.' : 'Move focus to the next clickable step.'}</td></tr>
                    <tr><td><kbd className="api-kbd">Shift</kbd> + <kbd className="api-kbd">Tab</kbd></td><td>Indikator Langkah</td><td>{isId ? 'Fokus ke langkah sebelumnya yang dapat diklik.' : 'Move focus to the previous clickable step.'}</td></tr>
                    <tr><td><kbd className="api-kbd">Enter</kbd> / <kbd className="api-kbd">Space</kbd></td><td>Indikator Langkah</td><td>{isId ? 'Mengaktifkan langkah yang sedang difokus.' : 'Activate the currently focused step.'}</td></tr>
                    <tr><td><code className="api-prop-code">role="navigation"</code></td><td>Kontainer {'<nav>'}</td><td>{isId ? 'Menyatakan komponen sebagai landmark navigasi halaman.' : 'Declares the component as a page navigation landmark.'}</td></tr>
                    <tr><td><code className="api-prop-code">aria-current="step"</code></td><td>Langkah Aktif</td><td>{isId ? 'Mengumumkan langkah yang sedang dikerjakan ke pembaca layar.' : 'Announces the active step to screen reader users.'}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PLAYBOOK TAB
         ══════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

          {/* ── 1. Interactive Playground ── */}
          <section>
            <div className="section-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 className="section-title" style={{ margin: 0 }}>
                    {isId ? '1. Playground Interaktif' : '1. Interactive Playground'}
                  </h2>
                </div>
                <NeuronBadge size="sm" variant="brand">
                  Live Component
                </NeuronBadge>
              </div>
              <p className="section-description" style={{ marginBottom: 'var(--space-6)' }}>
                {isId
                  ? 'Ubah properti secara real-time dan lihat hasilnya langsung pada pratinjau. Salin kode siap pakai untuk framework React, Vue 3, atau HTML/CSS.'
                  : 'Customize properties in real-time to preview styles, behavior, and generate ready-to-copy code across React, Vue 3, and HTML/CSS.'}
              </p>

              <Playground
                name="NeuronStepper"
                defaultTab="react"
                knobs={[
                  {
                    name: 'variant',
                    label: isId ? 'Varian' : 'Variant',
                    type: 'select',
                    options: ['default', 'icon', 'dot', 'compact'],
                    default: 'default',
                  },
                  {
                    name: 'orientation',
                    label: isId ? 'Orientasi' : 'Orientation',
                    type: 'select',
                    options: ['horizontal', 'vertical'],
                    default: 'horizontal',
                  },
                  {
                    name: 'size',
                    label: isId ? 'Ukuran' : 'Size',
                    type: 'select',
                    options: ['sm', 'md', 'lg'],
                    default: 'md',
                  },
                  {
                    name: 'labelPlacement',
                    label: isId ? 'Posisi Label' : 'Label Placement',
                    type: 'select',
                    options: ['bottom', 'inline'],
                    default: 'bottom',
                    condition: (s) => s.orientation === 'horizontal',
                  },
                  {
                    name: 'connectorStyle',
                    label: isId ? 'Gaya Konektor' : 'Connector Style',
                    type: 'select',
                    options: ['solid', 'dashed', 'dotted', 'gradient'],
                    default: 'solid',
                  },
                  {
                    name: 'completedIconMode',
                    label: isId ? 'Mode Ikon Selesai' : 'Completed Icon Mode',
                    type: 'select',
                    options: ['check', 'icon'],
                    default: 'check',
                    condition: (s) => s.variant === 'icon',
                  },
                  {
                    name: 'clickable',
                    label: isId ? 'Dapat Diklik (Clickable)' : 'Clickable Steps',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'showStepCount',
                    label: isId ? 'Tampilkan Counter Langkah' : 'Show Step Counter',
                    type: 'boolean',
                    default: false,
                  },
                ]}
                codeTemplates={(state) => {
                  const variant = (state.variant as StepperVariant) || 'default';
                  const orientation = (state.orientation as StepperOrientation) || 'horizontal';
                  const size = (state.size as StepperSize) || 'md';
                  const labelPlacement = (state.labelPlacement as StepperLabelPlacement) || 'bottom';
                  const connectorStyle = (state.connectorStyle as StepperConnector) || 'solid';
                  const completedIconMode = (state.completedIconMode as 'check' | 'icon') || 'check';
                  const clickable = state.clickable !== false;
                  const showStepCount = !!state.showStepCount;

                  const reactProps: string[] = [
                    'steps={steps}',
                    'activeStep={activeStep}',
                    `variant="${variant}"`,
                    `orientation="${orientation}"`,
                    `size="${size}"`,
                  ];
                  if (orientation === 'horizontal' && labelPlacement !== 'bottom') {
                    reactProps.push(`labelPlacement="${labelPlacement}"`);
                  }
                  if (connectorStyle !== 'solid') {
                    reactProps.push(`connectorStyle="${connectorStyle}"`);
                  }
                  if (variant === 'icon' && completedIconMode !== 'check') {
                    reactProps.push(`completedIconMode="${completedIconMode}"`);
                  }
                  if (!clickable) {
                    reactProps.push('clickable={false}');
                  }
                  if (showStepCount) {
                    reactProps.push('showStepCount');
                  }
                  reactProps.push('onStepClick={(index) => setActiveStep(index)}');

                  const vueProps: string[] = [
                    ':steps="steps"',
                    ':active-step="activeStep"',
                    `variant="${variant}"`,
                    `orientation="${orientation}"`,
                    `size="${size}"`,
                  ];
                  if (orientation === 'horizontal' && labelPlacement !== 'bottom') {
                    vueProps.push(`label-placement="${labelPlacement}"`);
                  }
                  if (connectorStyle !== 'solid') {
                    vueProps.push(`connector-style="${connectorStyle}"`);
                  }
                  if (variant === 'icon' && completedIconMode !== 'check') {
                    vueProps.push(`completed-icon-mode="${completedIconMode}"`);
                  }
                  if (!clickable) {
                    vueProps.push(':clickable="false"');
                  }
                  if (showStepCount) {
                    vueProps.push('show-step-count');
                  }
                  vueProps.push('@step-click="handleStepClick"');

                  return {
                    react: `import { NeuronStepper } from '@neudela/ui';
import { User, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function StepperPlayground() {
  const [activeStep, setActiveStep] = useState(${pgActiveStep});

  const steps = [
    { id: 1, label: 'Account', description: 'Basic login info', icon: <User size={18} /> },
    { id: 2, label: 'Profile', description: 'User details', icon: <FileText size={18} /> },
    { id: 3, label: 'Security', description: 'OTP verification', icon: <ShieldCheck size={18} /> },
    { id: 4, label: 'Done', description: 'Ready to go', icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <NeuronStepper
      ${reactProps.join('\n      ')}
    />
  );
}`,
                    vue: `<template>
  <NeuronStepper
    ${vueProps.join('\n    ')}
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NeuronStepper } from '@neudela/vue';

const activeStep = ref(${pgActiveStep});

const steps = [
  { id: 1, label: 'Account', description: 'Basic login info' },
  { id: 2, label: 'Profile', description: 'User details' },
  { id: 3, label: 'Security', description: 'OTP verification' },
  { id: 4, label: 'Done', description: 'Ready to go' },
];

const handleStepClick = (index: number) => {
  activeStep.value = index;
};
</script>`,
                    html: `<!-- Neudela Stepper Component (${variant}, ${orientation}, ${size}) -->
<nav
  class="neuron-stepper neuron-stepper--${variant} neuron-stepper--${orientation} neuron-stepper--${size}"
  aria-label="Progress steps"
>
  <ol class="neuron-stepper__list neuron-stepper__list--${orientation}">
    <!-- Step 1 (Completed) -->
    <li class="neuron-step neuron-step--${orientation} neuron-step--completed">
      <div class="neuron-step__head">
        <span class="neuron-step__indicator neuron-step__indicator--completed">✓</span>
      </div>
      <div class="neuron-step__text">
        <span class="neuron-step__label neuron-step__label--completed">Account</span>
        <span class="neuron-step__description">Basic login info</span>
      </div>
    </li>
    <!-- Step 2 (Active) -->
    <li class="neuron-step neuron-step--${orientation} neuron-step--active" aria-current="step">
      <div class="neuron-step__head">
        <span class="neuron-step__indicator neuron-step__indicator--active">2</span>
      </div>
      <div class="neuron-step__text">
        <span class="neuron-step__label neuron-step__label--active">Profile</span>
        <span class="neuron-step__description">User details</span>
      </div>
    </li>
    <!-- Step 3 (Upcoming) -->
    <li class="neuron-step neuron-step--${orientation} neuron-step--upcoming">
      <div class="neuron-step__head">
        <span class="neuron-step__indicator neuron-step__indicator--upcoming">3</span>
      </div>
      <div class="neuron-step__text">
        <span class="neuron-step__label neuron-step__label--upcoming">Security</span>
        <span class="neuron-step__description">OTP verification</span>
      </div>
    </li>
    <!-- Step 4 (Upcoming) -->
    <li class="neuron-step neuron-step--${orientation} neuron-step--upcoming">
      <div class="neuron-step__head">
        <span class="neuron-step__indicator neuron-step__indicator--upcoming">4</span>
      </div>
      <div class="neuron-step__text">
        <span class="neuron-step__label neuron-step__label--upcoming">Done</span>
        <span class="neuron-step__description">Ready to go</span>
      </div>
    </li>
  </ol>
</nav>`,
                  };
                }}
              >
                {(state) => {
                  const variant = (state.variant as StepperVariant) || 'default';
                  const orientation = (state.orientation as StepperOrientation) || 'horizontal';
                  const size = (state.size as StepperSize) || 'md';
                  const labelPlacement = (state.labelPlacement as StepperLabelPlacement) || 'bottom';
                  const connectorStyle = (state.connectorStyle as StepperConnector) || 'solid';
                  const completedIconMode = (state.completedIconMode as 'check' | 'icon') || 'check';
                  const clickable = state.clickable !== false;
                  const showStepCount = !!state.showStepCount;

                  const currentStepItem = playgroundSteps[pgActiveStep] || playgroundSteps[0];
                  const pct = Math.round(((pgActiveStep + 1) / playgroundSteps.length) * 100);

                  const interactiveSteps = playgroundSteps.map((step, idx) => ({
                    ...step,
                    content: idx === pgActiveStep && orientation === 'vertical' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {isId
                            ? `Langkah ${idx + 1} (${step.label}) sedang aktif. Masukkan data yang diperlukan sebelum melanjutkan.`
                            : `Step ${idx + 1} (${step.label}) is currently active. Provide required information to proceed.`}
                        </p>
                      </div>
                    ) : undefined,
                  }));

                  return (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-6)',
                      }}
                    >
                      {/* Live Preview Header Toolbar */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 'var(--space-3)',
                          padding: 'var(--space-3) var(--space-4)',
                          background: 'var(--color-bg-subtle)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                          <NeuronBadge size="sm" variant="brand">
                            {isId ? `Langkah ${pgActiveStep + 1} dari ${playgroundSteps.length}` : `Step ${pgActiveStep + 1} of ${playgroundSteps.length}`}: {currentStepItem.label}
                          </NeuronBadge>
                          <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                            {pct}% {isId ? 'Selesai' : 'Completed'}
                          </span>
                        </div>

                        <NeuronButton
                          size="xs"
                          variant="outline"
                          onClick={() => setPgActiveStep(0)}
                          disabled={pgActiveStep === 0}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          <RotateCcw size={12} />
                          {isId ? 'Mulai Ulang' : 'Reset Flow'}
                        </NeuronButton>
                      </div>

                      {/* Stepper Main Canvas */}
                      <div
                        style={{
                          width: '100%',
                          maxWidth: orientation === 'horizontal' ? 680 : 380,
                          margin: '0 auto',
                          padding: orientation === 'horizontal' ? 'var(--space-4) 0' : 'var(--space-2) 0',
                        }}
                      >
                        <NeuronStepper
                          steps={interactiveSteps}
                          activeStep={pgActiveStep}
                          variant={variant}
                          orientation={orientation}
                          labelPlacement={orientation === 'vertical' ? 'inline' : labelPlacement}
                          size={size}
                          connectorStyle={connectorStyle}
                          completedIconMode={completedIconMode}
                          clickable={clickable}
                          showStepCount={showStepCount}
                          onStepClick={(i) => setPgActiveStep(i)}
                        />
                      </div>

                      {/* Live Preview Navigation Footer */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 'var(--space-3)',
                          paddingTop: 'var(--space-4)',
                          borderTop: '1px solid var(--color-border)',
                        }}
                      >
                        <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>
                          {isId
                            ? '💡 Klik lingkaran langkah langsung atau gunakan tombol di samping'
                            : '💡 Click any step circle directly or use the buttons beside'}
                        </span>

                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                          <NeuronButton
                            size="sm"
                            variant="outline"
                            disabled={pgActiveStep === 0}
                            onClick={() => setPgActiveStep((s) => Math.max(0, s - 1))}
                          >
                            <ChevronLeft size={14} /> {isId ? 'Kembali' : 'Back'}
                          </NeuronButton>
                          <NeuronButton
                            size="sm"
                            variant="primary"
                            disabled={pgActiveStep === playgroundSteps.length - 1}
                            onClick={() => setPgActiveStep((s) => Math.min(playgroundSteps.length - 1, s + 1))}
                          >
                            {pgActiveStep === playgroundSteps.length - 1 ? (
                              <>
                                <CheckCircle2 size={14} /> {isId ? 'Selesai' : 'Complete'}
                              </>
                            ) : (
                              <>
                                {isId ? 'Lanjut' : 'Next'} <ChevronRight size={14} />
                              </>
                            )}
                          </NeuronButton>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Playground>
            </div>
          </section>

          {/* ── 2. Real-World Production Recipes ── */}
          <section>
            <h2 className="section-title">{isId ? '2. Resep Skenario Nyata' : '2. Real-World Scenarios'}</h2>
            <p className="section-description">
              {isId ? 'Implementasi pola umum stepper dalam aplikasi produksi — alur checkout e-commerce, wizard onboarding, dan pemulihan error.' : 'Common stepper implementations in production applications — e-commerce checkout, onboarding wizards, and error recovery.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              {/* Scenario 1: E-Commerce Multi-Step Checkout */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? 'Alur Checkout E-Commerce (Multi-Step Checkout)' : 'E-Commerce Multi-Step Checkout'}
                    </span>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      {isId ? 'Navigasi bertahap dari keranjang belanja hingga konfirmasi pesanan.' : 'Step-by-step navigation from cart to order confirmation.'}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="brand">{isId ? `Langkah ${checkoutStep} dari 5` : `Step ${checkoutStep} of 5`}</NeuronBadge>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <NeuronStepper
                    steps={checkoutSteps}
                    activeStep={checkoutStep - 1}
                    variant="icon"
                    size="md"
                    labelPlacement="bottom"
                    clickable
                    onStepClick={(i) => setCheckoutStep(i + 1)}
                  />
                  <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <NeuronButton size="sm" variant="outline" disabled={checkoutStep === 1} onClick={() => setCheckoutStep(s => s - 1)}>
                      <ChevronLeft size={14} /> {isId ? 'Sebelumnya' : 'Previous'}
                    </NeuronButton>
                    <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>
                      {checkoutSteps[checkoutStep - 1]?.label} — {checkoutSteps[checkoutStep - 1]?.description || (isId ? 'Langkah Aktif' : 'Active Step')}
                    </span>
                    <NeuronButton size="sm" variant="primary" disabled={checkoutStep === checkoutSteps.length} onClick={() => setCheckoutStep(s => s + 1)}>
                      {isId ? 'Lanjutkan' : 'Proceed'} <ChevronRight size={14} />
                    </NeuronButton>
                  </div>
                </div>
              </div>

              {/* Scenario 2: Vertical Onboarding Wizard */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? 'Wizard Onboarding Vertikal (Vertical Wizard)' : 'Vertical Onboarding Wizard'}
                    </span>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      {isId ? 'Stepper vertikal dengan slot konten form inline di setiap langkah aktif.' : 'Vertical stepper with inline form content slots inside active steps.'}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="neutral">orientation="vertical"</NeuronBadge>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <NeuronStepper
                    steps={onboardSteps}
                    activeStep={onboardStep - 1}
                    variant="icon"
                    orientation="vertical"
                    size="md"
                  />
                </div>
              </div>

              {/* Scenario 3: Error Recovery */}
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? 'Penanganan & Pemulihan Error (Error State Recovery)' : 'Error Handling & Recovery Flow'}
                    </span>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                      {isId ? 'Menampilkan langkah yang gagal validasi dengan tombol aksi coba lagi.' : 'Displays validation failure with actionable retry controls.'}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="danger">status="error"</NeuronBadge>
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <NeuronStepper
                    steps={[
                      { id: 1, label: isId ? 'Identitas' : 'Identity', status: 'completed' },
                      { id: 2, label: isId ? 'Dokumen KTP' : 'ID Document', status: 'error', description: isId ? 'Gagal unggah' : 'Upload failed' },
                      { id: 3, label: isId ? 'Verifikasi Wajah' : 'Selfie Verification', status: 'upcoming' },
                      { id: 4, label: isId ? 'Aktivasi' : 'Activation', status: 'upcoming' },
                    ]}
                    activeStep={1}
                    variant="default"
                    orientation="horizontal"
                    labelPlacement="bottom"
                  />
                  <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'rgba(239, 68, 68, 0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <AlertCircle size={20} style={{ color: 'var(--color-danger, #ef4444)', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      <div>
                        <p style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 700, color: 'var(--color-danger, #ef4444)', margin: '0 0 2px' }}>
                          {isId ? 'Langkah 2 memerlukan perbaikan dokumen' : 'Step 2 requires document revision'}
                        </p>
                        <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                          {isId ? 'Foto KTP buram atau tidak terbaca. Silakan unggah ulang dengan pencahayaan terang.' : 'ID photo is blurred or unreadable. Please re-upload with clear lighting.'}
                        </p>
                      </div>
                      <NeuronButton size="sm" variant="outline" style={{ flexShrink: 0 }}>
                        <RotateCcw size={12} /> {isId ? 'Coba Lagi' : 'Retry Upload'}
                      </NeuronButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. Component API Reference ── */}
          <section>
            <h2 className="section-title">{isId ? '3. Component API Reference' : '3. Component API Reference'}</h2>
            <p className="section-description">
              {isId ? 'Referensi lengkap seluruh props yang tersedia pada komponen NeuronStepper dan interface StepperStep.' : 'Complete reference for all available props on the NeuronStepper component and StepperStep interface.'}
            </p>

            {/* NeuronStepperProps */}
            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>NeuronStepperProps</span>
                <NeuronBadge size="sm" variant="brand">NeuronStepper</NeuronBadge>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>Prop</th>
                      <th style={{ width: '30%' }}>Type</th>
                      <th style={{ width: '12%' }}>Default</th>
                      <th style={{ width: '40%' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code className="api-prop-code">steps</code></td><td><code className="api-type-code">StepperStep[]</code></td><td><span className="api-req-badge">REQUIRED</span></td><td>{isId ? 'Daftar terurut langkah-langkah stepper.' : 'Ordered list of stepper steps.'}</td></tr>
                    <tr><td><code className="api-prop-code">activeStep</code></td><td><code className="api-type-code">number</code></td><td><code className="api-default-code">0</code></td><td>{isId ? 'Indeks (0-based) langkah yang sedang aktif.' : '0-based index of the currently active step.'}</td></tr>
                    <tr><td><code className="api-prop-code">variant</code></td><td><code className="api-type-code">'default' | 'icon' | 'compact' | 'dot' | 'numbered'</code></td><td><code className="api-default-code">'default'</code></td><td>{isId ? 'Varian tampilan visual komponen.' : 'Visual presentation variant.'}</td></tr>
                    <tr><td><code className="api-prop-code">labelPlacement</code></td><td><code className="api-type-code">'bottom' | 'inline'</code></td><td><code className="api-default-code">'bottom'</code></td><td>{isId ? 'Posisi label teks terhadap lingkaran langkah.' : 'Position of label text relative to indicator.'}</td></tr>
                    <tr><td><code className="api-prop-code">orientation</code></td><td><code className="api-type-code">'horizontal' | 'vertical'</code></td><td><code className="api-default-code">'horizontal'</code></td><td>{isId ? 'Arah layout langkah-langkah.' : 'Layout direction of steps.'}</td></tr>
                    <tr><td><code className="api-prop-code">size</code></td><td><code className="api-type-code">'sm' | 'md' | 'lg'</code></td><td><code className="api-default-code">'md'</code></td><td>{isId ? 'Skala ukuran elemen indikator (28px / 36px / 44px).' : 'Size scale of indicator elements (28px / 36px / 44px).'}</td></tr>
                    <tr><td><code className="api-prop-code">connectorStyle</code></td><td><code className="api-type-code">'solid' | 'dashed' | 'dotted' | 'gradient'</code></td><td><code className="api-default-code">'solid'</code></td><td>{isId ? 'Gaya visual garis konektor kontinu antar langkah.' : 'Visual style of continuous connecting line between steps.'}</td></tr>
                    <tr><td><code className="api-prop-code">completedIconMode</code></td><td><code className="api-type-code">'check' | 'icon'</code></td><td><code className="api-default-code">'check'</code></td><td>{isId ? 'Tampilkan tanda centang ✓ atau pertahankan ikon kustom saat langkah selesai.' : 'Display checkmark ✓ or keep custom icon when step is completed.'}</td></tr>
                    <tr><td><code className="api-prop-code">clickable</code></td><td><code className="api-type-code">boolean</code></td><td><code className="api-default-code">false</code></td><td>{isId ? 'Izinkan pengguna mengklik indikator untuk navigasi langkah.' : 'Allow users to click indicators to navigate steps.'}</td></tr>
                    <tr><td><code className="api-prop-code">onStepClick</code></td><td><code className="api-type-code">{'(index: number, step: StepperStep) => void'}</code></td><td><code className="api-default-code">undefined</code></td><td>{isId ? 'Callback yang dipanggil saat indikator langkah diklik.' : 'Callback invoked when a step indicator is clicked.'}</td></tr>
                    <tr><td><code className="api-prop-code">showStepCount</code></td><td><code className="api-type-code">boolean</code></td><td><code className="api-default-code">false</code></td><td>{isId ? 'Tampilkan teks penghitung "Step X of Y" di atas stepper.' : 'Show "Step X of Y" counter above the stepper.'}</td></tr>
                    <tr><td><code className="api-prop-code">ariaLabel</code></td><td><code className="api-type-code">string</code></td><td><code className="api-default-code">"Progress steps"</code></td><td>{isId ? 'Label aksesibilitas untuk elemen nav landmark.' : 'Accessibility label for the nav landmark element.'}</td></tr>
                    <tr><td><code className="api-prop-code">className</code></td><td><code className="api-type-code">string</code></td><td><code className="api-default-code">""</code></td><td>{isId ? 'Class CSS tambahan untuk kontainer utama.' : 'Additional CSS class names for the root container.'}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* StepperStep interface */}
            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>StepperStep Interface</span>
                <NeuronBadge size="sm" variant="neutral">steps[]</NeuronBadge>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>Field</th>
                      <th style={{ width: '30%' }}>Type</th>
                      <th style={{ width: '12%' }}>Required</th>
                      <th style={{ width: '40%' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code className="api-prop-code">id</code></td><td><code className="api-type-code">string | number</code></td><td><span className="api-req-badge">REQUIRED</span></td><td>{isId ? 'Identifikasi unik untuk langkah ini.' : 'Unique identifier for the step.'}</td></tr>
                    <tr><td><code className="api-prop-code">label</code></td><td><code className="api-type-code">string</code></td><td><span className="api-req-badge">REQUIRED</span></td><td>{isId ? 'Label teks utama yang ditampilkan di langkah.' : 'Primary text label displayed for the step.'}</td></tr>
                    <tr><td><code className="api-prop-code">description</code></td><td><code className="api-type-code">string</code></td><td><code className="api-default-code">undefined</code></td><td>{isId ? 'Deskripsi sekunder penjelas di bawah label.' : 'Secondary explanatory description below label.'}</td></tr>
                    <tr><td><code className="api-prop-code">icon</code></td><td><code className="api-type-code">React.ReactNode</code></td><td><code className="api-default-code">undefined</code></td><td>{isId ? 'Elemen ikon kustom (Lucide / SVG) untuk ditampilkan di dalam lingkaran langkah.' : 'Custom icon node (Lucide / SVG) rendered inside the circle indicator.'}</td></tr>
                    <tr><td><code className="api-prop-code">completedIcon</code></td><td><code className="api-type-code">React.ReactNode</code></td><td><code className="api-default-code">undefined</code></td><td>{isId ? 'Ikon khusus ketika langkah telah selesai (opsional).' : 'Specific icon to show when step is completed (optional).'}</td></tr>
                    <tr><td><code className="api-prop-code">status</code></td><td><code className="api-type-code">'upcoming' | 'active' | 'completed' | 'error'</code></td><td><code className="api-default-code">derived</code></td><td>{isId ? 'Status manual langkah (menimpa kalkulasi otomatis activeStep).' : 'Manual step status override.'}</td></tr>
                    <tr><td><code className="api-prop-code">content</code></td><td><code className="api-type-code">React.ReactNode</code></td><td><code className="api-default-code">undefined</code></td><td>{isId ? 'Konten tubuh langkah (khusus untuk orientasi vertikal).' : 'Step body content node (for vertical orientation).'}</td></tr>
                    <tr><td><code className="api-prop-code">disabled</code></td><td><code className="api-type-code">boolean</code></td><td><code className="api-default-code">false</code></td><td>{isId ? 'Nonaktifkan interaksi klik pada langkah ini.' : 'Disable click interaction for this step.'}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── Footer Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-slider', label: t.nav.compSlider || 'Slider' }}
        next={{ id: 'comp-table', label: t.nav.compTable || 'Table' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
