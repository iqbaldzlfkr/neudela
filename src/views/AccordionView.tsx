import React, { useState } from 'react';
import NeuronAccordion, {
  AccordionType,
  AccordionVariant,
  AccordionSize,
  AccordionIconPosition,
  AccordionIconType,
  AccordionItem,
} from '../components/NeuronAccordion';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NeuronInput from '../components/NeuronInput';
import NeuronToggle from '../components/NeuronToggle';
import NextPrevious from '../components/NextPrevious';
import Playground from '../components/Playground';
import AccordionStyleGallery from './AccordionStyleGallery';
import { useLanguage } from '../context/LanguageContext';
import {
  HelpCircle,
  ShieldCheck,
  Bell,
  CreditCard,
  User,
  Sliders,
  Check,
  Info,
  Sparkles,
  ChevronDown,
  Layers,
  FileText,
  Lock,
  Search,
  ThumbsUp,
  ThumbsDown,
  Package,
  Truck,
  ExternalLink,
  Copy,
  RotateCcw,
  Palette,
  Sun,
  Moon,
  Laptop,
  Database,
  Zap,
  Terminal,
  X,
} from 'lucide-react';

interface AccordionViewProps {
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
  w3c: string;
  desc: string;
  tip: string;
}

function AccordionAnatomyViewer({ isId }: { isId: boolean }) {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const activeZone = hoveredZone ?? selectedZone;

  const handleCopyToken = (tokenStr: string) => {
    navigator.clipboard.writeText(tokenStr);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleZoneEnter = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setHoveredZone(id);
  };

  const anatomyItems: AnatomyItem[] = [
    {
      id: 1,
      name: isId ? 'Wadah Utama (Root Container)' : 'Root Accordion Container',
      category: 'Layout',
      token: '.neuron-accordion',
      w3c: 'role="presentation"',
      desc: isId
        ? 'Wadah terluar yang membungkus seluruh rangkaian item akordion. Mengatur border perimeter, kelengkungan sudut (radius-lg), background surface, dan batas kliping konten.'
        : 'Outer flex container wrapping all accordion items. Controls outer border boundaries, rounded radius-lg clipping, and overall variant layout.',
      tip: isId
        ? 'Mendukung varian default (kontainer utuh), separated (kartu terpisah), flush (tanpa border), dan boxed.'
        : 'Supports default (bordered container), separated (gap cards), flush (borderless), and boxed styles.',
    },
    {
      id: 2,
      name: isId ? 'Baris Item Akordion (Item Row)' : 'Accordion Item Row',
      category: 'Structure',
      token: '.neuron-accordion__item',
      w3c: 'data-state="open|collapsed"',
      desc: isId
        ? 'Unit modular diskret yang memadukan tombol trigger dan panel konten terlipat. Menyimpan data-state reflektif untuk styling CSS.'
        : 'Discrete modular item pairing the trigger header and expandable collapse region with data-state reflection.',
      tip: isId
        ? 'Dapat dinonaktifkan secara terisolasi menggunakan prop disabled={true}.'
        : 'Can be independently disabled without affecting sibling accordion items.',
    },
    {
      id: 3,
      name: isId ? 'Tombol Pemicu (Trigger Button)' : 'Trigger Button Surface',
      category: 'Interactive',
      token: '.neuron-accordion__trigger',
      w3c: '<button aria-expanded aria-controls>',
      desc: isId
        ? 'Elemen tombol interaktif penuh dengan tinggi target sentuh minimal 44px (standar aksesibilitas WCAG), feedback hover halus, dan cincin fokus terlihat.'
        : 'Full-width accessible button surface ensuring minimum 44px touch targets (WCAG), subtle hover tint, and high-contrast focus rings.',
      tip: isId
        ? 'Jangan pernah menaruh elemen tombol sekunder lain di dalam trigger untuk mencegah konflik interaksi.'
        : 'Never nest secondary action buttons inside trigger headers to avoid interactive HTML invalidation.',
    },
    {
      id: 4,
      name: isId ? 'Ikon Semantik Kiri (Leading Icon)' : 'Leading Semantic Icon',
      category: 'Iconography',
      token: '.neuron-accordion__leading-icon',
      w3c: 'aria-hidden="true"',
      desc: isId
        ? 'Glif visual 18–20px di sisi kiri judul untuk mempercepat pengenalan topik kategori secara instan (misal: Keamanan, Profil, Pembayaran).'
        : 'Visual 18–20px glyph positioned to the left of the title providing immediate category recognition.',
      tip: isId
        ? 'Ikon bersifat dekoratif; selalu disembunyikan dari pembaca layar menggunakan aria-hidden="true".'
        : 'Always hide decorative category icons from assistive tech using aria-hidden="true".',
    },
    {
      id: 5,
      name: isId ? 'Judul Utama Section (Heading Title)' : 'Section Heading Title',
      category: 'Typography',
      token: '.neuron-accordion__title',
      w3c: 'font-weight: 600',
      desc: isId
        ? 'Teks judul semibold yang ringkas dan padat makna. Berfungsi sebagai pemindai visual primer bagi pengguna dan nama aksesibel bagi screen reader.'
        : 'Primary semibold heading text describing the topic succinctly for quick visual skimming and screen reader announcement.',
      tip: isId
        ? 'Gunakan frasa ringkas (2–5 kata) agar tidak terpotong atau membungkus berlebih pada layar perangkat mobile.'
        : 'Keep heading text direct (2–5 words) to avoid awkward multi-line wrapping on compact viewports.',
    },
    {
      id: 6,
      name: isId ? 'Teks Subtitle / Deskripsi Bantuan' : 'Subtitle & Helper Metadata',
      category: 'Typography',
      token: '.neuron-accordion__subtitle',
      w3c: 'color: var(--color-text-tertiary)',
      desc: isId
        ? 'Teks sekunder di bawah judul yang menampilkan status ringkas atau penjelasan tambahan tanpa mewajibkan pengguna membuka panel terlebih dahulu.'
        : 'Secondary muted helper text stacked below title providing concise context or status summary without requiring expansion.',
      tip: isId
        ? 'Sangat efektif untuk menampilkan informasi status (misal: "Aktif · Terakhir diperbarui 2 jam lalu").'
        : 'Ideal for displaying brief metadata (e.g., "Active · Last updated 2 hours ago").',
    },
    {
      id: 7,
      name: isId ? 'Badge Status Semantik' : 'Semantic Status Badge',
      category: 'Feedback',
      token: '.neuron-accordion__badge',
      w3c: '<NeuronBadge>',
      desc: isId
        ? 'Komponen chip status (NeuronBadge) yang diposisikan di sisi kanan sebelum chevron untuk menandakan status section secara cepat.'
        : 'Semantic status chip positioned on the right before the chevron to communicate state, urgency, or count.',
      tip: isId
        ? 'Gunakan warna semantik seperti success (Aktif), warning (Perlu Tindakan), atau brand (Baru).'
        : 'Use semantic tokens such as success for active, warning for action needed, or brand for new features.',
    },
    {
      id: 8,
      name: isId ? 'Indikator Ekspansi (Toggle Chevron)' : 'Expansion Toggle Chevron',
      category: 'Visual State',
      token: '.neuron-accordion__indicator',
      w3c: 'transform: rotate(180deg)',
      desc: isId
        ? 'Ikon rotasi dinamis 180° dengan transisi halus 250ms saat panel dibuka, memberikan kepastian visual arah ekspansi.'
        : 'Dynamic chevron glyph rotating 180° with butter-smooth 250ms cubic-bezier transition upon expansion.',
      tip: isId
        ? 'Dapat diganti dengan gaya glyph alternatif: chevron (standar), plus-minus (+/-), atau panah (arrow).'
        : 'Supports alternative glyph styles: chevron (default), plus-minus (+/-), or arrow.',
    },
    {
      id: 9,
      name: isId ? 'Panel Konten Terlipat (Content Region)' : 'Collapsible Content Region',
      category: 'Content',
      token: '.neuron-accordion__content',
      w3c: 'role="region" aria-labelledby',
      desc: isId
        ? 'Wilayah yang menampung detail konten (teks, formulir, atau tabel) yang muncul dengan animasi ekspansi CSS Grid 0fr ke 1fr tanpa pemotongan.'
        : 'Accessible container holding expanded content (text, forms, tables) animating smoothly using CSS Grid 0fr to 1fr.',
      tip: isId
        ? 'Terkait otomatis dengan ID tombol trigger melalui atribut aria-labelledby untuk aksesibilitas pembaca layar.'
        : 'Automatically linked to the trigger button ID via aria-labelledby for screen reader accessibility.',
    },
  ];

  const activeItem = anatomyItems.find((item) => item.id === activeZone);

  return (
    <div className="accordion-anatomy-container">
      {/* ── Visual Stage Card ── */}
      <div className="accordion-anatomy-stage-card">
        {/* Stage Header */}
        <div className="accordion-anatomy-stage-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isId ? 'Kanvas Anatomi Interaktif' : 'Interactive Anatomy Canvas'}
            </span>
            <NeuronBadge size="sm" variant="brand">
              {isId ? '9 Zona Komponen' : '9 Component Zones'}
            </NeuronBadge>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
              {isId ? 'Pilih zona di bawah atau klik pin bernomor' : 'Select a zone or click numbered pins'}
            </span>
            {activeZone !== null && (
              <button
                type="button"
                onClick={() => { setSelectedZone(null); setHoveredZone(null); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-surface)',
                  color: 'var(--color-text-secondary)',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={11} />
                {isId ? 'Reset' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* Quick Anatomy Zone Switcher Bar */}
        <div className="accordion-anatomy-quick-nav">
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', marginRight: 4 }}>
            {isId ? 'PILIH ELEMEN:' : 'INSPECT ZONE:'}
          </span>
          {anatomyItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`accordion-anatomy-nav-chip ${activeZone === item.id ? 'is-active' : ''}`}
              onClick={() => setSelectedZone(prev => prev === item.id ? null : item.id)}
              onMouseEnter={() => setHoveredZone(item.id)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <span className="chip-dot">{item.id}</span>
              <span>{item.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>

        {/* Stage Body Canvas */}
        <div className="accordion-anatomy-stage-body" onMouseLeave={() => setHoveredZone(null)}>
          <div className="accordion-anatomy-board">

            {/* ── Mock Accordion Board ── */}
            <div
              className={`accordion-anatomy-zone ${activeZone === 1 ? 'is-active' : ''}`}
              style={{
                width: '100%',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg, 8px)',
                overflow: 'visible',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
              }}
              onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 1 ? null : 1); }}
              onMouseEnter={(e) => handleZoneEnter(e, 1)}
            >
              {/* PIN 1: Container (Top-Left outer corner with tall stem 56px) */}
              <div
                className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeZone === 1 ? 'is-active' : ''}`}
                style={{ left: 16, top: 0 }}
                title={isId ? '1. Wadah Utama (Root Container)' : '1. Root Accordion Container'}
              >
                <span
                  className="accordion-anatomy-pin__dot"
                  onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 1 ? null : 1); }}
                  onMouseEnter={(e) => handleZoneEnter(e, 1)}
                >
                  1
                </span>
                <span className="accordion-anatomy-pin__stem" style={{ height: 56 }} />
              </div>

              {/* ── ITEM 1: Expanded Item ── */}
              <div
                className={`accordion-anatomy-zone ${activeZone === 2 ? 'is-active' : ''}`}
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  position: 'relative',
                  borderTopLeftRadius: 'var(--radius-lg, 8px)',
                  borderTopRightRadius: 'var(--radius-lg, 8px)',
                }}
                onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 2 ? null : 2); }}
                onMouseEnter={(e) => handleZoneEnter(e, 2)}
              >
                {/* PIN 2: Item Row (Points from LEFT horizontally at y=28) */}
                <div
                  className={`accordion-anatomy-pin accordion-anatomy-pin--left ${activeZone === 2 ? 'is-active' : ''}`}
                  style={{ left: 0, top: 28 }}
                  title={isId ? '2. Baris Item Akordion' : '2. Accordion Item Row'}
                >
                  <span className="accordion-anatomy-pin__stem" style={{ width: 24 }} />
                  <span
                    className="accordion-anatomy-pin__dot"
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 2 ? null : 2); }}
                    onMouseEnter={(e) => handleZoneEnter(e, 2)}
                  >
                    2
                  </span>
                </div>

                {/* PIN 6: Subtitle (Points from LEFT horizontally at y=58) */}
                <div
                  className={`accordion-anatomy-pin accordion-anatomy-pin--left ${activeZone === 6 ? 'is-active' : ''}`}
                  style={{ left: 0, top: 58 }}
                  title={isId ? '6. Subtitle / Metadata' : '6. Subtitle & Helper Metadata'}
                >
                  <span className="accordion-anatomy-pin__stem" style={{ width: 24 }} />
                  <span
                    className="accordion-anatomy-pin__dot"
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 6 ? null : 6); }}
                    onMouseEnter={(e) => handleZoneEnter(e, 6)}
                  >
                    6
                  </span>
                </div>

                {/* PIN 3: Trigger Surface (Points from RIGHT horizontally at y=28) */}
                <div
                  className={`accordion-anatomy-pin accordion-anatomy-pin--right ${activeZone === 3 ? 'is-active' : ''}`}
                  style={{ right: 0, top: 28 }}
                  title={isId ? '3. Tombol Pemicu (Trigger Button)' : '3. Trigger Button Surface'}
                >
                  <span className="accordion-anatomy-pin__stem" style={{ width: 24 }} />
                  <span
                    className="accordion-anatomy-pin__dot"
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 3 ? null : 3); }}
                    onMouseEnter={(e) => handleZoneEnter(e, 3)}
                  >
                    3
                  </span>
                </div>

                {/* ── Trigger Row ── */}
                <div
                  className={`accordion-anatomy-zone ${activeZone === 3 ? 'is-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 18px',
                    gap: 12,
                    background: 'transparent',
                    position: 'relative',
                  }}
                  onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 3 ? null : 3); }}
                  onMouseEnter={(e) => handleZoneEnter(e, 3)}
                >
                  {/* Zone 4: Leading Icon */}
                  <div
                    className={`accordion-anatomy-zone ${activeZone === 4 ? 'is-active' : ''}`}
                    style={{
                      padding: '4px',
                      borderRadius: 4,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 4 ? null : 4); }}
                    onMouseEnter={(e) => handleZoneEnter(e, 4)}
                    title={isId ? '4. Ikon Semantik Kiri' : '4. Leading Semantic Icon'}
                  >
                    {/* PIN 4: Stem 30px pointing straight down */}
                    <div
                      className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeZone === 4 ? 'is-active' : ''}`}
                      style={{ left: '50%', top: 0 }}
                      title={isId ? '4. Ikon Semantik Kiri' : '4. Leading Semantic Icon'}
                    >
                      <span
                        className="accordion-anatomy-pin__dot"
                        onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 4 ? null : 4); }}
                        onMouseEnter={(e) => handleZoneEnter(e, 4)}
                      >
                        4
                      </span>
                      <span className="accordion-anatomy-pin__stem" style={{ height: 30 }} />
                    </div>
                    <ShieldCheck size={20} color="var(--color-primary, #b25e40)" />
                  </div>

                  {/* Zone 5 & 6: Title & Subtitle Stack */}
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, gap: 2 }}>
                    {/* Zone 5: Title */}
                    <div
                      className={`accordion-anatomy-zone ${activeZone === 5 ? 'is-active' : ''}`}
                      style={{
                        padding: '2px 6px',
                        borderRadius: 4,
                        width: 'fit-content',
                        position: 'relative',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 5 ? null : 5); }}
                      onMouseEnter={(e) => handleZoneEnter(e, 5)}
                      title={isId ? '5. Judul Utama Section' : '5. Section Heading Title'}
                    >
                      {/* PIN 5: Stem 30px pointing straight down */}
                      <div
                        className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeZone === 5 ? 'is-active' : ''}`}
                        style={{ left: 100, top: 0 }}
                        title={isId ? '5. Judul Utama Section' : '5. Section Heading Title'}
                      >
                        <span
                          className="accordion-anatomy-pin__dot"
                          onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 5 ? null : 5); }}
                          onMouseEnter={(e) => handleZoneEnter(e, 5)}
                        >
                          5
                        </span>
                        <span className="accordion-anatomy-pin__stem" style={{ height: 30 }} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Keamanan Akun & Autentikasi Dua Faktor (2FA)' : 'Account Security & Two-Factor Authentication'}
                      </span>
                    </div>

                    {/* Zone 6: Subtitle */}
                    <div
                      className={`accordion-anatomy-zone ${activeZone === 6 ? 'is-active' : ''}`}
                      style={{
                        padding: '2px 6px',
                        borderRadius: 4,
                        width: 'fit-content',
                        position: 'relative',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 6 ? null : 6); }}
                      onMouseEnter={(e) => handleZoneEnter(e, 6)}
                      title={isId ? '6. Teks Subtitle / Deskripsi Bantuan' : '6. Subtitle & Helper Metadata'}
                    >
                      <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Diperlukan kode verifikasi TOTP saat login dari perangkat baru' : 'Requires TOTP authentication when logging in from new devices'}
                      </span>
                    </div>
                  </div>

                  {/* Trailing: Badge (7) and Chevron (8) */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
                    {/* Zone 7: Badge */}
                    <div
                      className={`accordion-anatomy-zone ${activeZone === 7 ? 'is-active' : ''}`}
                      style={{
                        padding: '2px 4px',
                        borderRadius: 4,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 7 ? null : 7); }}
                      onMouseEnter={(e) => handleZoneEnter(e, 7)}
                      title={isId ? '7. Badge Status Semantik' : '7. Semantic Status Badge'}
                    >
                      {/* PIN 7: Stem 30px */}
                      <div
                        className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeZone === 7 ? 'is-active' : ''}`}
                        style={{ left: '50%', top: 0 }}
                        title={isId ? '7. Badge Status Semantik' : '7. Semantic Status Badge'}
                      >
                        <span
                          className="accordion-anatomy-pin__dot"
                          onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 7 ? null : 7); }}
                          onMouseEnter={(e) => handleZoneEnter(e, 7)}
                        >
                          7
                        </span>
                        <span className="accordion-anatomy-pin__stem" style={{ height: 30 }} />
                      </div>
                      <NeuronBadge size="sm" variant="success">
                        {isId ? 'Aktif' : 'Active'}
                      </NeuronBadge>
                    </div>

                    {/* Zone 8: Expansion Indicator (Chevron) */}
                    <div
                      className={`accordion-anatomy-zone ${activeZone === 8 ? 'is-active' : ''}`}
                      style={{
                        padding: '4px',
                        borderRadius: 4,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 8 ? null : 8); }}
                      onMouseEnter={(e) => handleZoneEnter(e, 8)}
                      title={isId ? '8. Indikator Ekspansi' : '8. Expansion Toggle Chevron'}
                    >
                      {/* PIN 8: Stem 30px */}
                      <div
                        className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeZone === 8 ? 'is-active' : ''}`}
                        style={{ left: '50%', top: 0 }}
                        title={isId ? '8. Indikator Ekspansi' : '8. Expansion Toggle Chevron'}
                      >
                        <span
                          className="accordion-anatomy-pin__dot"
                          onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 8 ? null : 8); }}
                          onMouseEnter={(e) => handleZoneEnter(e, 8)}
                        >
                          8
                        </span>
                        <span className="accordion-anatomy-pin__stem" style={{ height: 30 }} />
                      </div>
                      <ChevronDown size={18} color="var(--color-primary, #b25e40)" style={{ transform: 'rotate(180deg)', transition: 'transform 0.25s ease' }} />
                    </div>
                  </div>
                </div>

                {/* ── Zone 9: Content Panel ── */}
                <div
                  className={`accordion-anatomy-zone ${activeZone === 9 ? 'is-active' : ''}`}
                  style={{
                    padding: '4px 18px 20px 18px',
                    position: 'relative',
                    background: 'var(--color-bg-surface)',
                  }}
                  onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 9 ? null : 9); }}
                  onMouseEnter={(e) => handleZoneEnter(e, 9)}
                  title={isId ? '9. Panel Konten Terlipat' : '9. Collapsible Content Region'}
                >
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                    {isId
                      ? 'Autentikasi dua faktor menambahkan lapisan proteksi tambahan pada akun workspace Anda. Setiap kali ada login dari peramban baru, kode verifikasi 6 digit yang dihasilkan aplikasi authenticator Anda akan diminta secara otomatis.'
                      : 'Two-factor authentication enforces an additional verification step on your workspace account. Each sign-in from an unrecognized browser prompts for a time-based 6-digit verification code.'}
                  </p>

                  {/* PIN 9: Bottom stem pointing down, centered under content */}
                  <div
                    className={`accordion-anatomy-pin accordion-anatomy-pin--bottom ${activeZone === 9 ? 'is-active' : ''}`}
                    style={{ left: '50%', bottom: 0 }}
                    title={isId ? '9. Panel Konten Terlipat' : '9. Collapsible Content Region'}
                  >
                    <span className="accordion-anatomy-pin__stem" style={{ height: 30 }} />
                    <span
                      className="accordion-anatomy-pin__dot"
                      onClick={(e) => { e.stopPropagation(); setSelectedZone(prev => prev === 9 ? null : 9); }}
                      onMouseEnter={(e) => handleZoneEnter(e, 9)}
                    >
                      9
                    </span>
                  </div>
                </div>
              </div>

              {/* ── ITEM 2: Collapsed Item ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 18px',
                  gap: 12,
                  borderBottomLeftRadius: 'var(--radius-lg, 8px)',
                  borderBottomRightRadius: 'var(--radius-lg, 8px)',
                  background: 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bell size={20} color="var(--color-text-tertiary)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Preferensi Notifikasi & Laporan Mingguan' : 'Notification Preferences & Weekly Digests'}
                  </span>
                  <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                    {isId ? 'Pengiriman email ringkasan aktivitas otomatis' : 'Automated email summary dispatch'}
                  </span>
                </div>
                <ChevronDown size={18} color="var(--color-text-tertiary)" />
              </div>

            </div>

          </div>
        </div>

        {/* ── Stage Footer: Live Token Inspector (Zero Layout Shift) ── */}
        <div className="accordion-anatomy-stage-footer">
          {activeItem ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 12,
                overflow: 'hidden',
              }}
            >
              {/* Left Side: Pin ID, Name, Category, and Ellipsized Desc */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  minWidth: 0,
                  flex: 1,
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--color-primary, #b25e40)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11.5,
                    fontWeight: 700,
                    boxShadow: '0 2px 6px rgba(178, 94, 64, 0.35)',
                    flexShrink: 0,
                  }}
                >
                  {activeItem.id}
                </span>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    minWidth: 0,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: '13px',
                      color: 'var(--color-text-primary)',
                      flexShrink: 0,
                    }}
                  >
                    {activeItem.name}
                  </span>
                  <NeuronBadge size="sm" variant="brand">
                    {activeItem.category}
                  </NeuronBadge>
                  <span
                    style={{
                      color: 'var(--color-text-tertiary)',
                      fontSize: 12,
                      margin: '0 2px',
                      flexShrink: 0,
                    }}
                  >
                    •
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--color-text-secondary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      minWidth: 0,
                    }}
                    title={activeItem.desc}
                  >
                    {activeItem.desc}
                  </span>
                </div>
              </div>

              {/* Right Side: CSS Token Copy & WAI-ARIA tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                {/* CSS Token with Copy Button */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-md, 6px)',
                    background: 'var(--color-bg-subtle, #f9fafb)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <code style={{ fontSize: 11, color: 'var(--color-primary, #b25e40)', fontWeight: 600 }}>
                    {activeItem.token}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyToken(activeItem.token)}
                    title={isId ? 'Salin token CSS' : 'Copy CSS selector'}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: copiedToken ? 'var(--color-success, #10b981)' : 'var(--color-text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {copiedToken ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>

                {/* W3C ARIA attribute pill */}
                <div
                  style={{
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-md, 6px)',
                    background: 'rgba(178, 94, 64, 0.06)',
                    border: '1px solid rgba(178, 94, 64, 0.15)',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    color: 'var(--color-primary, #b25e40)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeItem.w3c}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 12,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minWidth: 0,
                  overflow: 'hidden',
                }}
              >
                <Info size={15} color="var(--color-primary, #b25e40)" style={{ flexShrink: 0 }} />
                <span
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isId
                    ? 'Arahkan kursor atau klik pin di atas untuk memeriksa token CSS dan atribut WAI-ARIA.'
                    : 'Hover or click pins above to inspect CSS tokens and WAI-ARIA attributes.'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                {anatomyItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedZone(item.id)}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-subtle)',
                      color: 'var(--color-text-secondary)',
                      fontSize: 11,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                    title={item.name}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Anatomy Cards Grid ── */}
      <div className="accordion-anatomy-grid">
        {anatomyItems.map((item) => {
          const isSelected = activeZone === item.id;
          return (
            <div
              key={item.id}
              className={`accordion-anatomy-card ${isSelected ? 'is-active' : ''}`}
              onClick={() => setSelectedZone(prev => prev === item.id ? null : item.id)}
              onMouseEnter={() => setHoveredZone(item.id)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: isSelected ? 'var(--color-primary, #b25e40)' : 'var(--color-bg-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 2px 6px rgba(178, 94, 64, 0.35)' : 'none',
                      }}
                    >
                      {item.id}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </span>
                  </div>
                  <NeuronBadge size="sm" variant={isSelected ? 'brand' : 'default'}>
                    {item.category}
                  </NeuronBadge>
                </div>
                <p style={{ margin: '0 0 12px 0', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px dashed var(--color-border)', marginTop: 'auto' }}>
                <code style={{ fontSize: 11, color: 'var(--color-primary, #b25e40)', fontWeight: 600 }}>
                  {item.token}
                </code>
                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontStyle: 'italic', maxWidth: '50%', textAlign: 'right', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={item.tip}>
                  {item.tip}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Anatomy Specification Matrix Table ── */}
      <div className="section-card" style={{ padding: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {isId ? 'Tabel Spesifikasi Anatomi Komponen' : 'Component Anatomy Specification Matrix'}
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Pemetaan komprehensif elemen antarmuka, token CSS standar Neudela, dan peran semantiknya.'
            : 'Comprehensive mapping of component regions, Neudela CSS class tokens, and semantic roles.'}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-primary)', width: 44 }}>#</th>
                <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{isId ? 'Elemen Anatomi' : 'Anatomy Element'}</th>
                <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Token CSS</th>
                <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>WAI-ARIA / Element</th>
                <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{isId ? 'Fungsi & Pedoman Desain' : 'Design Purpose & Guidelines'}</th>
              </tr>
            </thead>
            <tbody>
              {anatomyItems.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    background: activeZone === item.id ? 'rgba(178, 94, 64, 0.04)' : undefined,
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onClick={() => setSelectedZone(prev => prev === item.id ? null : item.id)}
                  onMouseEnter={() => setHoveredZone(item.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <td style={{ padding: '9px 12px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {item.id}
                  </td>
                  <td style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '9px 12px' }}>
                    <code style={{ fontSize: 11, color: 'var(--color-primary)', background: 'var(--color-bg-subtle)', padding: '2px 6px', borderRadius: 4 }}>
                      {item.token}
                    </code>
                  </td>
                  <td style={{ padding: '9px 12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace', fontSize: 11.5 }}>
                    {item.w3c}
                  </td>
                  <td style={{ padding: '9px 12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main AccordionView
// ─────────────────────────────────────────────────────────────────────────────
export default function AccordionView({ setActiveTab }: AccordionViewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';
  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // FAQ Search state for Playbook use case
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState<'all' | 'billing' | 'security' | 'integration'>('all');

  // Settings interactive state for Use Case 2
  const [settings2FA, setSettings2FA] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [auditLogRetention, setAuditLogRetention] = useState('90');

  // Order summary coupon state for Use Case 3
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState('NEUDELA15');
  const [couponError, setCouponError] = useState('');

  // Master Specification Matrix interactive state
  const [matrixView, setMatrixView] = useState<'visual' | 'dimensions'>('visual');
  const [matrixSize, setMatrixSize] = useState<AccordionSize>('sm');
  const [matrixIconPosition, setMatrixIconPosition] = useState<AccordionIconPosition>('right');
  const [matrixIconType, setMatrixIconType] = useState<AccordionIconType>('chevron');
  const [matrixType, setMatrixType] = useState<AccordionType>('single');
  const [previewTheme, setPreviewTheme] = useState<'system' | 'dark' | 'light'>('system');
  const [highContrast, setHighContrast] = useState(false);
  const [previewTypography, setPreviewTypography] = useState<'compact' | 'standard' | 'spacious'>('standard');
  const [backupTriggered, setBackupTriggered] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [matrixActive, setMatrixActive] = useState<Record<string, string>>({
    default: 'm-def-1',
    separated: 'm-sep-1',
    flush: 'm-flu-1',
    boxed: 'm-box-1',
  });

  const matrixPreviewWidth = matrixSize === 'lg' ? '600px' : matrixSize === 'md' ? '480px' : '420px';
  const matrixColumnMinWidth = matrixSize === 'lg' ? '600px' : matrixSize === 'md' ? '480px' : '400px';

  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.nav.compAccordion || 'Accordion'}</h1>
            <p className="page-subtitle">
              {isId
                ? 'Komponen panel buka-tutup (collapsible) modular untuk mengorganisir informasi bertingkat dan menghemat ruang layar secara efisien.'
                : 'Modular expandable container component designed for progressive disclosure of complex information and efficient vertical space conservation.'}
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
                ? 'Accordion digunakan saat antarmuka memiliki volume informasi besar yang tidak perlu dibaca secara bersamaan, memungkinkan pengguna memindai topik utama secara instan dan membuka detail sesuai kebutuhan.'
                : 'Accordions group and conceal non-essential details until explicitly requested by the user, dramatically simplifying visual scannability and reducing cognitive load.'}
            </p>

            {/* Key Pillars Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {[
                {
                  icon: <Layers size={20} strokeWidth={2} />,
                  title: isId ? 'Pengungkapan Bertahap' : 'Progressive Disclosure',
                  desc: isId
                    ? 'Menjaga antarmuka tetap bersih dan rapi dengan menyajikan judul ikhtisar dan menyingkap detail granular saat dibutuhkan.'
                    : 'Surfaces top-level summaries first while preserving instant access to granular content on-demand.',
                },
                {
                  icon: <Sliders size={20} strokeWidth={2} />,
                  title: isId ? 'Konservasi Ruang Vertikal' : 'Vertical Density',
                  desc: isId
                    ? 'Menghemat scrolling panjang pada perangkat mobile dan dasbor enterprise dengan mengelompokkan blok informasi secara efisien.'
                    : 'Compresses lengthy pages into digestible sections, avoiding scroll fatigue on compact mobile screens.',
                },
                {
                  icon: <Sparkles size={20} strokeWidth={2} />,
                  title: isId ? 'Fleksibilitas Varian Visual' : 'Adaptive Visual Variants',
                  desc: isId
                    ? 'Tersedia 4 gaya tampilan teruji: Default (kontainer utuh), Separated (kartu mandiri), Flush (tanpa border), dan Boxed (header berlatar).'
                    : 'Offers 4 refined aesthetic variants suited for modal dialogues, settings pages, and marketing FAQ hubs.',
                },
                {
                  icon: <ShieldCheck size={20} strokeWidth={2} />,
                  title: isId ? 'Aksesibilitas & Semantik Bersih' : 'Clean Semantic Accessibility',
                  desc: isId
                    ? 'Dilengkapi atribut semantik aria-expanded dan target interaktif yang nyaman untuk semua pengguna.'
                    : 'Equipped with semantic aria-expanded attributes and accessible interactive targets for all users.',
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4) var(--space-5)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md, 6px)',
                      background: 'var(--color-primary-light, rgba(178, 94, 64, 0.08))',
                      color: 'var(--color-primary, #b25e40)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', marginBottom: 3 }}>
                      {pillar.title}
                    </div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Master Specification Matrix Card */}
            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">
                    {isId ? 'Matriks Spesifikasi Akordion' : 'Accordion Specification Matrix'}
                  </div>
                  <div className="badge-spec-subtitle">
                    {isId
                      ? '4 Varian Visual × 3 Skala Ukuran — Indikator Dinamis & Live Interactive Preview'
                      : '4 Visual Variants × 3 Scale Sizes — Dynamic Indicator & Live Interactive Preview'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {/* Size quick pills */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-subtle)', padding: '2px 4px', borderRadius: 'var(--radius-md, 6px)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-tertiary)', padding: '0 4px', letterSpacing: '0.04em' }}>UKURAN:</span>
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setMatrixSize(s)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          border: 'none',
                          background: matrixSize === s ? 'var(--color-primary)' : 'transparent',
                          color: matrixSize === s ? '#ffffff' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Icon position pills */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-subtle)', padding: '2px 4px', borderRadius: 'var(--radius-md, 6px)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-tertiary)', padding: '0 4px', letterSpacing: '0.04em' }}>POSISI:</span>
                    {(['right', 'left'] as const).map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setMatrixIconPosition(pos)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          border: 'none',
                          background: matrixIconPosition === pos ? 'var(--color-primary)' : 'transparent',
                          color: matrixIconPosition === pos ? '#ffffff' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {pos === 'right' ? (isId ? 'Kanan' : 'Right') : (isId ? 'Kiri' : 'Left')}
                      </button>
                    ))}
                  </div>

                  {/* Glyph style pills */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-subtle)', padding: '2px 4px', borderRadius: 'var(--radius-md, 6px)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-tertiary)', padding: '0 4px', letterSpacing: '0.04em' }}>GLIF:</span>
                    {(['chevron', 'plus-minus', 'arrow'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setMatrixIconType(g)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          border: 'none',
                          background: matrixIconType === g ? 'var(--color-primary)' : 'transparent',
                          color: matrixIconType === g ? '#ffffff' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {g === 'plus-minus' ? '+ / −' : g}
                      </button>
                    ))}
                  </div>

                  {/* Expansion Type pills */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-subtle)', padding: '2px 4px', borderRadius: 'var(--radius-md, 6px)', border: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-tertiary)', padding: '0 4px', letterSpacing: '0.04em' }}>TIPE:</span>
                    {(['single', 'multiple'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setMatrixType(t)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          border: 'none',
                          background: matrixType === t ? 'var(--color-primary)' : 'transparent',
                          color: matrixType === t ? '#ffffff' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {t === 'single' ? (isId ? 'Tunggal' : 'Single') : (isId ? 'Multi' : 'Multiple')}
                      </button>
                    ))}
                  </div>

                  {/* Mode switcher tabs: Visual / Dimensions */}
                  <div className="badge-spec-filter-group">
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${matrixView === 'visual' ? 'is-active' : ''}`}
                      onClick={() => setMatrixView('visual')}
                    >
                      {isId ? 'Matriks Visual Interaktif' : 'Interactive Visual Matrix'}
                    </button>
                    <button
                      type="button"
                      className={`badge-spec-filter-btn ${matrixView === 'dimensions' ? 'is-active' : ''}`}
                      onClick={() => setMatrixView('dimensions')}
                    >
                      {isId ? 'Spesifikasi Arsitektural' : 'Architectural Specs'}
                    </button>
                  </div>
                </div>
              </div>

              {matrixView === 'visual' ? (
                <div className="badge-spec-table-wrap">
                  <table className="badge-matrix-table">
                    <thead>
                      <tr>
                        <th style={{ width: '150px' }}>Variant</th>
                        <th style={{ minWidth: matrixColumnMinWidth, width: matrixPreviewWidth, transition: 'all 0.25s ease' }}>{isId ? 'Preview Interaktif Langsung' : 'Live Interactive Preview'}</th>
                        <th style={{ minWidth: '160px' }}>{isId ? 'Mekanisme & Indikator' : 'Motion & Indicator'}</th>
                        <th style={{ minWidth: '200px' }}>{isId ? 'Penggunaan Ideal' : 'Recommended Use'}</th>
                        <th style={{ width: '110px' }}>Sizes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 1. Default Contained */}
                      <tr>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                              Default Contained
                            </span>
                            <code style={{ fontSize: '11px', color: 'var(--color-primary)' }}>variant="default"</code>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'normal' }}>
                          <div style={{ width: '100%', maxWidth: matrixPreviewWidth, transition: 'max-width 0.25s ease' }}>
                            <NeuronAccordion
                              variant="default"
                              size={matrixSize}
                              iconPosition={matrixIconPosition}
                              iconType={matrixIconType}
                              type={matrixType}
                              value={matrixActive.default}
                              onValueChange={(val: string | string[]) => setMatrixActive((p) => ({ ...p, default: Array.isArray(val) ? (val[0] ?? '') : val }))}
                              items={[
                                {
                                  id: 'm-def-1',
                                  icon: <Palette size={16} />,
                                  title: isId ? 'Tema Tampilan & Mode Antarmuka' : 'Display Theme & Color Modes',
                                  subtitle: isId ? 'Pilihan mode gelap, terang, & sinkronisasi OS' : 'Dark mode, light mode, & system preference',
                                  badge: <NeuronBadge size="xs" variant="brand" dot>{previewTheme.toUpperCase()}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                      <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                                        {isId ? 'Pilih mode tampilan utama antarmuka:' : 'Select primary interface visual mode:'}
                                      </span>
                                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {(['system', 'light', 'dark'] as const).map((mode) => (
                                          <button
                                            key={mode}
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setPreviewTheme(mode); }}
                                            style={{
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              gap: 5,
                                              padding: '5px 10px',
                                              borderRadius: 'var(--radius-md, 6px)',
                                              fontSize: 11.5,
                                              fontWeight: 600,
                                              border: previewTheme === mode ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                                              background: previewTheme === mode ? 'rgba(178, 94, 64, 0.08)' : 'var(--color-bg-subtle)',
                                              color: previewTheme === mode ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                              cursor: 'pointer',
                                              transition: 'all 0.15s ease',
                                            }}
                                          >
                                            {mode === 'system' && <Laptop size={12} />}
                                            {mode === 'light' && <Sun size={12} />}
                                            {mode === 'dark' && <Moon size={12} />}
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                          </button>
                                        ))}
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px dashed var(--color-border)', marginTop: 2 }}>
                                        <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                                          {isId ? 'Mode Kontras Tinggi (WCAG AAA)' : 'High Contrast Mode (WCAG AAA)'}
                                        </span>
                                        <NeuronToggle
                                          size="sm"
                                          checked={highContrast}
                                          onChange={() => setHighContrast((v) => !v)}
                                        />
                                      </div>
                                    </div>
                                  ),
                                },
                                {
                                  id: 'm-def-2',
                                  icon: <Sliders size={16} />,
                                  title: isId ? 'Tipografi & Skala Kepadatan' : 'Typography & Scaling Density',
                                  subtitle: isId ? 'Kustomisasi ukuran teks komponen' : 'Global font scale across components',
                                  badge: <NeuronBadge size="xs" variant="default">{previewTypography === 'compact' ? '13px' : previewTypography === 'standard' ? '14px' : '16px'}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      <div style={{ display: 'flex', gap: 6 }}>
                                        {(['compact', 'standard', 'spacious'] as const).map((density) => (
                                          <button
                                            key={density}
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setPreviewTypography(density); }}
                                            style={{
                                              padding: '4px 8px',
                                              borderRadius: 'var(--radius-sm, 4px)',
                                              fontSize: 11,
                                              border: previewTypography === density ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                              background: previewTypography === density ? 'rgba(178, 94, 64, 0.08)' : 'var(--color-bg-subtle)',
                                              color: previewTypography === density ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            {density === 'compact' ? (isId ? 'Ringkas (13px)' : 'Compact (13px)') : density === 'standard' ? (isId ? 'Standar (14px)' : 'Standard (14px)') : (isId ? 'Lega (16px)' : 'Spacious (16px)')}
                                          </button>
                                        ))}
                                      </div>
                                      <span style={{ fontSize: previewTypography === 'compact' ? 12 : previewTypography === 'standard' ? 13 : 14, color: 'var(--color-text-tertiary)', fontStyle: 'italic', transition: 'font-size 0.15s ease' }}>
                                        {isId ? 'Pratinjau teks: Desain sistem Neudela memprioritaskan estetika premium.' : 'Preview text: Neudela design tokens guarantee high visual clarity.'}
                                      </span>
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div>
                              <NeuronBadge variant="brand" size="xs">CSS Grid 1fr</NeuronBadge>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                              Aksen bar kiri + rotasi 180°
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {isId
                            ? 'Panel preferensi form, pengaturan akun, dan konfigurasi bertahap'
                            : 'Form settings, account profiles, and sequential workflows'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <span className="badge-size-tag">sm</span>
                            <span className="badge-size-tag">md</span>
                            <span className="badge-size-tag">lg</span>
                          </div>
                        </td>
                      </tr>

                      {/* 2. Separated Cards */}
                      <tr>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                              Separated Cards
                            </span>
                            <code style={{ fontSize: '11px', color: 'var(--color-primary)' }}>variant="separated"</code>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'normal' }}>
                          <div style={{ width: '100%', maxWidth: matrixPreviewWidth, transition: 'max-width 0.25s ease' }}>
                            <NeuronAccordion
                              variant="separated"
                              size={matrixSize}
                              iconPosition={matrixIconPosition}
                              iconType={matrixIconType}
                              type={matrixType}
                              value={matrixActive.separated}
                              onValueChange={(val: string | string[]) => setMatrixActive((p) => ({ ...p, separated: Array.isArray(val) ? (val[0] ?? '') : val }))}
                              items={[
                                {
                                  id: 'm-sep-1',
                                  icon: <Zap size={16} />,
                                  title: isId ? 'Paket Enterprise Cloud Pro' : 'Enterprise Cloud Pro Plan',
                                  subtitle: isId ? 'Aktif • Tagihan tahunan diperpanjang Des 2026' : 'Active • Annual billing renews Dec 2026',
                                  badge: <NeuronBadge size="xs" variant="success" dot>{isId ? 'Aktif' : 'Active'}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                      <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}>
                                          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                                            {isId ? 'Penggunaan Kuota Cloud' : 'Cloud Storage Quota'}
                                          </span>
                                          <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>782 GB / 1,000 GB (78%)</span>
                                        </div>
                                        <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'var(--color-border)', overflow: 'hidden' }}>
                                          <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, var(--color-primary, #b25e40), #e28462)', borderRadius: 3 }} />
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 }}>
                                        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                                          SLA 99.99% • Dedicated 24/7
                                        </span>
                                        <NeuronButton
                                          size="sm"
                                          variant="primary"
                                          onClick={(e) => { e.stopPropagation(); }}
                                        >
                                          {isId ? 'Kelola Paket' : 'Manage Tier'}
                                        </NeuronButton>
                                      </div>
                                    </div>
                                  ),
                                },
                                {
                                  id: 'm-sep-2',
                                  icon: <Database size={16} />,
                                  title: isId ? 'Pencadangan Otomatis Multi-Region' : 'Automated Multi-Region Backups',
                                  subtitle: isId ? 'Snapshot terenkripsi harian di 3 data center' : 'Daily encrypted snapshots across 3 regions',
                                  badge: <NeuronBadge size="xs" variant="brand">{isId ? 'Harian 02:00' : 'Daily 02:00'}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-success, #10b981)', display: 'inline-block' }} />
                                        <span>{isId ? 'Snapshot terakhir selesai 42 menit lalu (14.2 GB)' : 'Last snapshot succeeded 42 mins ago (14.2 GB)'}</span>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                                        <NeuronButton
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setBackupTriggered(true);
                                            setTimeout(() => setBackupTriggered(false), 2500);
                                          }}
                                        >
                                          {backupTriggered ? (isId ? 'Mencadangkan...' : 'Backing up...') : (isId ? 'Cadangkan Sekarang' : 'Backup Now')}
                                        </NeuronButton>
                                      </div>
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div>
                              <NeuronBadge variant="default" size="xs">Discrete Cards</NeuronBadge>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                              Elevasi terpisah (gap 12px)
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {isId
                            ? 'Katalog produk, kartu langganan, dan modul dasbor terpisah'
                            : 'Product catalog, pricing tiers, and modular dashboard widgets'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <span className="badge-size-tag">sm</span>
                            <span className="badge-size-tag">md</span>
                            <span className="badge-size-tag">lg</span>
                          </div>
                        </td>
                      </tr>

                      {/* 3. Flush Minimalist */}
                      <tr>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                              Flush Minimalist
                            </span>
                            <code style={{ fontSize: '11px', color: 'var(--color-primary)' }}>variant="flush"</code>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'normal' }}>
                          <div style={{ width: '100%', maxWidth: matrixPreviewWidth, transition: 'max-width 0.25s ease' }}>
                            <NeuronAccordion
                              variant="flush"
                              size={matrixSize}
                              iconPosition={matrixIconPosition}
                              iconType={matrixIconType}
                              type={matrixType}
                              value={matrixActive.flush}
                              onValueChange={(val: string | string[]) => setMatrixActive((p) => ({ ...p, flush: Array.isArray(val) ? (val[0] ?? '') : val }))}
                              items={[
                                {
                                  id: 'm-flu-1',
                                  icon: <Terminal size={16} />,
                                  title: isId ? 'Kunci Rahasia API Produksi' : 'Production API Secret Keys',
                                  subtitle: isId ? 'Bearer token otentikasi REST API' : 'Bearer auth token for REST endpoints',
                                  badge: <NeuronBadge size="xs" variant="warning">{isId ? 'Live Key' : 'Live Key'}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md, 6px)', border: '1px solid var(--color-border)' }}>
                                        <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                          neu_live_984f891a27e49c71b
                                        </code>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText('neu_live_984f891a27e49c71b');
                                            setApiKeyCopied(true);
                                            setTimeout(() => setApiKeyCopied(false), 2000);
                                          }}
                                          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: apiKeyCopied ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}
                                          title={isId ? 'Salin Kunci API' : 'Copy API Key'}
                                        >
                                          {apiKeyCopied ? <Check size={13} /> : <Copy size={13} />}
                                        </button>
                                      </div>
                                      <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                                        {isId ? 'Batas kuota 1.200 req/menit • TLS 1.3 enkripsi aktif' : 'Quota 1,200 req/min • TLS 1.3 enforced'}
                                      </span>
                                    </div>
                                  ),
                                },
                                {
                                  id: 'm-flu-2',
                                  icon: <Bell size={16} />,
                                  title: isId ? 'Webhooks & Event Dispatches' : 'Webhooks & Event Dispatches',
                                  subtitle: isId ? 'Kirim payload JSON real-time ke server' : 'Real-time JSON event push notifications',
                                  badge: <NeuronBadge size="xs" variant="success" dot>200 OK</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5 }}>
                                        <code style={{ fontSize: 11, color: 'var(--color-text-primary)' }}>POST /api/v1/webhook</code>
                                        <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>99.98% SLA</span>
                                      </div>
                                      <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                        {isId
                                          ? 'Mendukung signature HMAC-SHA256 pada header X-Neudela-Signature untuk verifikasi integritas data payload.'
                                          : 'Signed with HMAC-SHA256 via X-Neudela-Signature header for payload integrity and authenticity.'}
                                      </p>
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div>
                              <NeuronBadge variant="brand" size="xs">Borderless Divider</NeuronBadge>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                              Garis pemisah tipis 1px
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {isId
                            ? 'Hub FAQ dokumentasi, dialog modal, dan sidebar filter ramping'
                            : 'Documentation FAQ hubs, modal dialogues, and sleek filter sidebars'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <span className="badge-size-tag">sm</span>
                            <span className="badge-size-tag">md</span>
                            <span className="badge-size-tag">lg</span>
                          </div>
                        </td>
                      </tr>

                      {/* 4. Boxed Header */}
                      <tr>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                              Boxed Header
                            </span>
                            <code style={{ fontSize: '11px', color: 'var(--color-primary)' }}>variant="boxed"</code>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', whiteSpace: 'normal' }}>
                          <div style={{ width: '100%', maxWidth: matrixPreviewWidth, transition: 'max-width 0.25s ease' }}>
                            <NeuronAccordion
                              variant="boxed"
                              size={matrixSize}
                              iconPosition={matrixIconPosition}
                              iconType={matrixIconType}
                              type={matrixType}
                              value={matrixActive.boxed}
                              onValueChange={(val: string | string[]) => setMatrixActive((p) => ({ ...p, boxed: Array.isArray(val) ? (val[0] ?? '') : val }))}
                              items={[
                                {
                                  id: 'm-box-1',
                                  icon: <ShieldCheck size={16} />,
                                  title: isId ? 'Autentikasi Dua Faktor (2FA)' : 'Two-Factor Authentication (2FA)',
                                  subtitle: isId ? 'Proteksi ekstra untuk sesi perangkat baru' : 'Enforced authentication for new sessions',
                                  badge: <NeuronBadge size="xs" variant="success" dot>{isId ? 'Terproteksi' : 'Protected'}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Aplikasi TOTP:</span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>1Password / Authenticator</span>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Kode Cadangan:</span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>10 kode aktif</span>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                                        <NeuronButton
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => { e.stopPropagation(); }}
                                        >
                                          {isId ? 'Kelola 2FA' : 'Configure 2FA'}
                                        </NeuronButton>
                                      </div>
                                    </div>
                                  ),
                                },
                                {
                                  id: 'm-box-2',
                                  icon: <User size={16} />,
                                  title: isId ? 'Integrasi Okta Enterprise SSO' : 'Okta Enterprise SSO SAML 2.0',
                                  subtitle: isId ? 'Sinkronisasi 248 akun direktori korporat' : 'Identity federation for 248 seats',
                                  badge: <NeuronBadge size="xs" variant="brand">{isId ? 'Tersinkron' : 'Synced'}</NeuronBadge>,
                                  content: (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                      <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                        {isId ? 'Sertifikat X.509 SAML berlaku aktif hingga 14 Nov 2028.' : 'SAML X.509 certificate active until Nov 14, 2028.'}
                                      </span>
                                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <NeuronButton
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => { e.stopPropagation(); }}
                                        >
                                          {isId ? 'Uji Koneksi SAML' : 'Test SAML Connection'}
                                        </NeuronButton>
                                      </div>
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div>
                              <NeuronBadge variant="default" size="xs">Tinted Header Surface</NeuronBadge>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                              Header berlatar kontras halus
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {isId
                            ? 'Panel data audit, dokumen kebijakan, dan inspeksi berlapis'
                            : 'Data audit panels, compliance documents, and nested inspectors'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <span className="badge-size-tag">sm</span>
                            <span className="badge-size-tag">md</span>
                            <span className="badge-size-tag">lg</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="badge-spec-table-wrap">
                  <table className="api-table" style={{ width: '100%', margin: 0 }}>
                    <thead>
                      <tr>
                        <th style={{ width: '18%' }}>{isId ? 'Dimensi' : 'Dimension'}</th>
                        <th style={{ width: '32%' }}>{isId ? 'Nilai / Opsi' : 'Values / Options'}</th>
                        <th style={{ width: '14%' }}>{isId ? 'Default' : 'Default'}</th>
                        <th style={{ width: '36%' }}>{isId ? 'Keterangan Arsitektural' : 'Architectural Notes'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code className="api-prop-code">variant</code></td>
                        <td><code className="api-type-code">default | separated | flush | boxed</code></td>
                        <td><code className="api-default-code">default</code></td>
                        <td>{isId ? 'Gaya kontainer visual (bordered terpadu, kartu melayang, borderless flush, atau header berlatar)' : 'Visual surface style (contained border, floating cards, borderless flush, or boxed header)'}</td>
                      </tr>
                      <tr>
                        <td><code className="api-prop-code">size</code></td>
                        <td><code className="api-type-code">sm (40px) | md (48px) | lg (56px)</code></td>
                        <td><code className="api-default-code">md</code></td>
                        <td>{isId ? 'Target sentuh minimal, skala tipografi (13/14/16px), dan padding isi' : 'Touch target height, typography scale, and content padding'}</td>
                      </tr>
                      <tr>
                        <td><code className="api-prop-code">type</code></td>
                        <td><code className="api-type-code">single | multiple</code></td>
                        <td><code className="api-default-code">single</code></td>
                        <td>{isId ? 'Mode ekspansi eksklusif tunggal atau multi-panel terbuka bersamaan' : 'Single exclusive expansion or concurrent multi-panel inspection'}</td>
                      </tr>
                      <tr>
                        <td><code className="api-prop-code">collapsible</code></td>
                        <td><code className="api-type-code">boolean</code></td>
                        <td><code className="api-default-code">true</code></td>
                        <td>{isId ? 'Pada mode single, mengizinkan penutupan seluruh panel' : 'In single mode, allows collapsing all items'}</td>
                      </tr>
                      <tr>
                        <td><code className="api-prop-code">iconPosition</code></td>
                        <td><code className="api-type-code">right | left</code></td>
                        <td><code className="api-default-code">right</code></td>
                        <td>{isId ? 'Posisi penempatan indikator toggle ekspansi buka-tutup' : 'Placement side for expansion toggle indicator'}</td>
                      </tr>
                      <tr>
                        <td><code className="api-prop-code">iconType</code></td>
                        <td><code className="api-type-code">chevron | plus-minus | arrow | none</code></td>
                        <td><code className="api-default-code">chevron</code></td>
                        <td>{isId ? 'Gaya glif visual indikator rotasi atau transisi status' : 'Glyph icon style signaling expand/collapse capability'}</td>
                      </tr>
                      <tr>
                        <td><code className="api-prop-code">keyboard</code></td>
                        <td><code className="api-type-code">↑, ↓, Home, End, Enter, Space</code></td>
                        <td><code className="api-default-code">W3C APG</code></td>
                        <td>{isId ? 'Navigasi fokus siklis antar-trigger tanpa menjebak tab' : 'Cyclic roving focus navigation across triggers without trapping Tab'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ── 2. Interactive Anatomy Viewer ── */}
          <section>
            <h2 className="section-title">
              {isId ? '2. Anatomi Komponen Interaktif' : '2. Interactive Component Anatomy'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Struktur akordion Neudela terdiri dari elemen trigger tombol aksesibel, slot ikon dan badge opsional, serta panel konten animasi Grid CSS.'
                : 'The Neudela accordion is engineered with accessible trigger headers, flexible metadata slots, and responsive CSS Grid expansion panels.'}
            </p>

            <AccordionAnatomyViewer isId={isId} />
          </section>

          {/* ── 3. Visual Variants & 10 Style Showcase ── */}
          <section className="section-card" style={{ padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div>
                <h2 className="section-title" style={{ margin: 0 }}>
                  {isId ? '3. Galeri Desain Akordion: 10 Varian Visual' : '3. Accordion Design Showcase: 10 Visual Styles'}
                </h2>
                <p className="section-description" style={{ margin: '8px 0 0 0' }}>
                  {isId
                    ? 'Koleksi lengkap 10 varian dan pola layout akordion siap pakai berstandar WCAG AAA, mulai dari FAQ 2 kolom, tab kategori, hero banner split, hingga kartu gradasi kontras tinggi.'
                    : 'Curated gallery of 10 production-grade accordion styles and layout patterns, covering two-column FAQ grids, categorized filter tabs, split hero banners, and high-impact gradients.'}
                </p>
              </div>
              <NeuronBadge size="md" variant="brand">10 Production Styles</NeuronBadge>
            </div>

            <AccordionStyleGallery isId={isId} />
          </section>

          {/* ── 4. Sizing Matrix ── */}
          <section>
            <h2 className="section-title">
              {isId ? '4. Skala Ukuran & Spacing' : '4. Sizing Scale & Touch Targets'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Neudela Accordion menyediakan tiga skala ukuran standar (sm, md, lg) dengan target klik yang dioptimalkan untuk perangkat sentuh dan desktop.'
                : 'Three standardized sizing options ensure proportional typography, comfortable touch targets, and balanced padding.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
              {/* SM */}
              <div className="section-card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <NeuronBadge size="sm" variant="default">size="sm"</NeuronBadge>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Small · Min-Height: 36px · Font: 12px · Padding: 9px 12px
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                    {isId ? 'Cocok untuk panel samping padat & dialog ringkas' : 'Compact sidebars & dense property panels'}
                  </span>
                </div>
                <NeuronAccordion
                  size="sm"
                  variant="default"
                  defaultValue="1"
                  items={[
                    {
                      id: '1',
                      title: isId ? 'Filter Status Server (Kecil)' : 'Server Status Filter (Small)',
                      content: isId ? 'Pilihan filter ringkas untuk monitoring node Kubernetes cluster.' : 'Compact filter toggles for Kubernetes cluster node health monitoring.',
                    },
                  ]}
                />
              </div>

              {/* MD */}
              <div className="section-card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <NeuronBadge size="sm" variant="brand">size="md" (Default)</NeuronBadge>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Medium · Min-Height: 44px · Font: 14px · Padding: 13px 16px
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                    {isId ? 'Standar utama untuk formulir & halaman pengaturan' : 'Standard default for forms and settings'}
                  </span>
                </div>
                <NeuronAccordion
                  size="md"
                  variant="default"
                  defaultValue="1"
                  items={[
                    {
                      id: '1',
                      title: isId ? 'Pengaturan Notifikasi Email & SMS' : 'Email & SMS Notification Routing',
                      content: isId ? 'Tentukan kanal komunikasi pilihan untuk menerima alert keamanan penting.' : 'Specify preferred delivery channels for receiving high-priority security notifications.',
                    },
                  ]}
                />
              </div>

              {/* LG */}
              <div className="section-card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <NeuronBadge size="sm" variant="default">size="lg"</NeuronBadge>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Large · Min-Height: 52px · Font: 16px · Padding: 17px 20px
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                    {isId ? 'Optimal untuk halaman FAQ pemasaran & layar sentuh mobile' : 'Marketing FAQ & touch-friendly landing pages'}
                  </span>
                </div>
                <NeuronAccordion
                  size="lg"
                  variant="default"
                  defaultValue="1"
                  items={[
                    {
                      id: '1',
                      title: isId ? 'Bagaimana cara migrasi data dari sistem lama?' : 'How does enterprise data migration work?',
                      content: isId ? 'Tim onboarding dedicated kami menyediakan skrip impor otomatis untuk database Postgres, MySQL, dan MongoDB.' : 'Our dedicated onboarding specialists provide automated migration tooling for Postgres, MySQL, and MongoDB.',
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ── 5. Expansion Types (Single vs Multiple) ── */}
          <section>
            <h2 className="section-title">
              {isId ? '5. Tipe Ekspansi & Perilaku Buka-Tutup' : '5. Expansion Types & Collapsible Behaviors'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Tentukan apakah hanya satu panel yang boleh terbuka sekaligus (single) atau pengguna dapat membuka beberapa panel bersamaan (multiple).'
                : 'Configure single-open mutual exclusivity or allow multi-item concurrent inspection based on user task context.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              {/* Single Mode */}
              <div className="section-card" style={{ padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Single Mode (Eksklusif Tunggal)' : 'Single Expansion Mode'}
                  </h3>
                  <NeuronBadge size="sm" variant="brand">type="single"</NeuronBadge>
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                  {isId
                    ? 'Membuka satu item akan otomatis menutup item lainnya. Paling ideal ketika membandingkan beberapa opsi yang berdiri sendiri.'
                    : 'Opening one item automatically collapses all other items, keeping the user focused on a single topic.'}
                </p>
                <NeuronAccordion
                  type="single"
                  collapsible={true}
                  defaultValue="faq-1"
                  items={[
                    {
                      id: 'faq-1',
                      title: isId ? 'Topik A: Layanan Cloud Database' : 'Topic A: Managed Cloud Database',
                      content: isId ? 'Detail spesifikasi dan opsi replikasi multi-region untuk basis data cloud terkelola.' : 'Detailed cluster configurations, read-replicas, and automated failover mechanics.',
                    },
                    {
                      id: 'faq-2',
                      title: isId ? 'Topik B: Jaringan CDN Global' : 'Topic B: Global Edge CDN Caching',
                      content: isId ? 'Distribusi konten statis melalui 300+ Point of Presence di seluruh dunia.' : 'Ultra-low latency static asset delivery backed by over 300 global edge points of presence.',
                    },
                    {
                      id: 'faq-3',
                      title: isId ? 'Topik C: Firewall & Perlindungan DDoS' : 'Topic C: Web Application Firewall & DDoS',
                      content: isId ? 'Mitigasi serangan Layer 7 secara otomatis dengan kecerdasan AI real-time.' : 'Automated Layer 7 mitigation with adaptive heuristics protecting your microservices.',
                    },
                  ]}
                />
              </div>

              {/* Multiple Mode */}
              <div className="section-card" style={{ padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Multiple Mode (Bisa Buka Bersamaan)' : 'Multiple Expansion Mode'}
                  </h3>
                  <NeuronBadge size="sm" variant="success">type="multiple"</NeuronBadge>
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                  {isId
                    ? 'Pengguna dapat membuka beberapa panel sekaligus untuk membandingkan informasi atau mengisi formulir bertahap.'
                    : 'Allows users to keep multiple sections open concurrently for side-by-side verification and cross-referencing.'}
                </p>
                <NeuronAccordion
                  type="multiple"
                  defaultValue={['multi-1', 'multi-2']}
                  items={[
                    {
                      id: 'multi-1',
                      title: isId ? 'Bagian 1: Ringkasan Biaya Langganan' : 'Section 1: Subscription Breakdown',
                      content: isId ? 'Rincian biaya bulanan per kursi pengguna dan opsi diskon tahunan.' : 'Monthly license cost per active seat and enterprise volume discount tiers.',
                    },
                    {
                      id: 'multi-2',
                      title: isId ? 'Bagian 2: Alokasi Kuota Penyimpanan' : 'Section 2: Storage Quota Allocation',
                      content: isId ? 'Alokasi penyimpanan SSD NVMe berkecepatan tinggi yang dapat diperluas dinamis.' : 'High-throughput NVMe SSD allocation with dynamic auto-scaling thresholds.',
                    },
                    {
                      id: 'multi-3',
                      title: isId ? 'Bagian 3: Batas Permintaan API / Menit' : 'Section 3: Rate Limiting & API Throughput',
                      content: isId ? 'Batas request per menit berdasarkan token otentikasi API workspace.' : 'Maximum burst request limits configured per provisioned access token.',
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ── 6. Do's and Don'ts ── */}
          <section>
            <h2 className="section-title">
              {isId ? '6. Panduan Praktik Terbaik (Do’s & Don’ts)' : '6. Best Practice Rules (Do’s & Don’ts)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Ikuti panduan berikut agar pengalaman pengguna saat menggunakan akordion tetap nyaman, jelas, dan mudah dipahami.'
                : 'Ensure seamless usability, clean layouts, and predictable interactions by following these core guidelines.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              
              {/* Pair 1: Topic-Oriented Descriptive Trigger Title vs. Vague / Numbered Placeholder */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <CreditCard size={16} color="var(--color-primary)" />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Metode Pembayaran & Faktur' : 'Payment Methods & Invoices'}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontWeight: 400 }}>
                              {isId ? 'Kartu kredit & riwayat tagihan' : 'Credit cards & billing history'}
                            </div>
                          </div>
                        </div>
                        <ChevronDown size={16} color="var(--color-text-secondary)" />
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Judul spesifik & topik langsung jelas' : 'Specific heading with immediate topic clarity'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Gunakan judul trigger yang jelas, spesifik, dan berorientasi topik'
                        : 'Use clear, specific, and topic-oriented trigger headings'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Tuliskan label yang secara eksplisit merangkum isi informasi di dalamnya sehingga pengguna dapat memindai (skimming) konten tanpa perlu membuka setiap panel satu per satu.'
                        : 'Write headings that explicitly summarize the hidden content so users can easily skim sections without needing to expand every panel blindly.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <HelpCircle size={16} color="var(--color-text-tertiary)" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Opsi 1 / Lainnya' : 'Option 1 / More Info'}
                          </span>
                        </div>
                        <ChevronDown size={16} color="var(--color-text-tertiary)" />
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Samar, memaksa pengguna menebak' : 'Vague label forces trial-and-error guessing'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Jangan gunakan judul yang ambigu, samar, atau sekadar nomor urut'
                        : 'Don’t use ambiguous, generic, or numbered placeholder headings'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Hindari label generik seperti "Opsi 1", "Informasi Tambahan", atau "Detail". Label tanpa makna memperlambat pencarian dan membuat navigasi membingungkan.'
                        : 'Avoid unhelpful labels like "Option 1", "Additional Details", or "More Info". Generic labels increase cognitive load and hinder efficient navigation.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 2: Entire Trigger as Single Accessible Button vs. Nested Interactive Controls (WCAG violation) */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <User size={16} color="var(--color-primary)" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Profil Pengguna & Keamanan' : 'User Profile & Security'}
                          </span>
                        </div>
                        <ChevronDown size={16} color="var(--color-primary)" style={{ transform: 'rotate(180deg)' }} />
                      </div>
                      <div className="accordion-dodont-content">
                        <div style={{ marginBottom: 8, color: 'var(--color-text-secondary)', fontSize: 11.5 }}>
                          {isId ? 'Akun aktif: admin@acme.corp' : 'Active account: admin@acme.corp'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <NeuronButton size="xs" variant="secondary">
                            {isId ? 'Ubah Profil' : 'Edit Profile'}
                          </NeuronButton>
                          <NeuronButton size="xs" variant="outline">
                            {isId ? 'Salin ID' : 'Copy ID'}
                          </NeuronButton>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'WCAG Compliant (Aksi berada di dalam panel)' : 'WCAG Compliant (Actions placed in panel body)'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Pertahankan trigger sebagai satu tombol dan letakkan aksi di dalam panel'
                        : 'Keep the trigger as a single toggle button and place actions inside the panel'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Jadikan seluruh baris trigger sebagai tombol pemicu buka/tutup yang bersih. Sediakan tombol aksi sekunder (seperti edit, hapus, atau salin) di dalam area konten yang terungkap.'
                        : 'Make the entire trigger row a single accessible toggle button. House secondary actions (like edit, delete, or copy) cleanly inside the revealed content body.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                          <User size={16} color="var(--color-text-secondary)" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {isId ? 'Profil Pengguna' : 'User Profile'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                          <span style={{
                            border: '1px dashed var(--color-danger)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '2px 6px',
                            fontSize: 10,
                            color: 'var(--color-danger)',
                            fontWeight: 600,
                            background: 'rgba(239, 68, 68, 0.08)',
                          }}>
                            {isId ? 'Hapus ✕' : 'Delete ✕'}
                          </span>
                          <ChevronDown size={16} color="var(--color-text-secondary)" />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Pelanggaran WCAG: Kontrol bersarang' : 'WCAG Violation: Nested interactive controls'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Jangan menyematkan tombol aksi atau tautan di dalam baris trigger'
                        : 'Don’t nest action buttons or links inside the trigger header'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Menaruh tombol "Hapus", switch toggle, atau hyperlink di dalam elemen header melanggar standar WCAG 4.1.2 dan memicu kesalahan klik fatal saat ditekan pada layar sentuh.'
                        : 'Placing clickable buttons, toggle switches, or links inside the trigger header creates nested interactive elements violating WCAG 4.1.2 and causing accidental clicks on touch screens.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 3: Grouping Rich / Chunked / Secondary Content vs. Hiding Single-Sentence Text */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--do">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Database size={16} color="var(--color-primary)" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Spesifikasi Cluster Database' : 'Database Cluster Specs'}
                          </span>
                        </div>
                        <ChevronDown size={16} color="var(--color-primary)" style={{ transform: 'rotate(180deg)' }} />
                      </div>
                      <div className="accordion-dodont-content" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                          <span style={{ color: 'var(--color-text-tertiary)' }}>Memory:</span>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>32 GB DDR5 ECC</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                          <span style={{ color: 'var(--color-text-tertiary)' }}>Storage:</span>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>1 TB NVMe RAID-10</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                          <span style={{ color: 'var(--color-text-tertiary)' }}>High Availability:</span>
                          <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>3 Multi-AZ Replicas</span>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Menghemat ruang untuk konten padat' : 'Conserves space for dense data'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Gunakan akordion untuk mengelompokkan informasi kompleks atau sekunder'
                        : 'Use accordions to organize complex, dense, or secondary information'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Sangat efektif untuk daftar FAQ, spesifikasi teknis mendalam, atau riwayat transaksi yang jika ditampilkan sekaligus akan membuat halaman terlalu panjang.'
                        : 'Highly effective for FAQs, in-depth technical specs, or transaction records that would otherwise clutter the page and cause excessive scrolling.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div className="accordion-dodont-box accordion-dodont-box--dont">
                      <div className="accordion-dodont-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Info size={16} color="var(--color-text-secondary)" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Catatan Rilis Versi Aplikasi' : 'App Release Version Note'}
                          </span>
                        </div>
                        <ChevronDown size={16} color="var(--color-text-tertiary)" />
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        background: 'var(--color-bg-subtle)',
                        fontSize: 11,
                        color: 'var(--color-text-tertiary)',
                        fontStyle: 'italic',
                        borderTop: '1px dashed var(--color-border)',
                      }}>
                        {isId ? 'Hanya menyembunyikan: "Versi 2.4 aktif."' : 'Hides only: "Version 2.4 is active."'}
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Biaya klik sia-sia untuk 1 kalimat' : 'Unnecessary click cost for 1 brief line'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Jangan sembunyikan kalimat pendek atau informasi penting krusial'
                        : 'Don’t hide single-sentence snippets or critical information'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Jika konten penjelasannya hanya berupa satu kalimat pendek atau pengumuman penting, tampilkan langsung secara inline. Jangan bebani pengguna dengan klik yang tidak bernilai.'
                        : 'If information is only a single brief sentence or critical notice, display it directly inline. Imposing an interaction barrier for trivial snippets frustrates users.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 4: Consistent Visual Chevron Affordance with 180° Smooth Rotation vs. Inconsistent / Missing Expand Indicators */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360 }}>
                      <div className="accordion-dodont-box accordion-dodont-box--do" style={{ boxShadow: 'none' }}>
                        <div className="accordion-dodont-header" style={{ padding: '8px 12px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Item 1: Tertutup' : 'Item 1: Collapsed'}
                          </span>
                          <ChevronDown size={16} color="var(--color-text-secondary)" style={{ transition: 'transform 0.2s ease' }} />
                        </div>
                      </div>
                      <div className="accordion-dodont-box accordion-dodont-box--do" style={{ boxShadow: 'none' }}>
                        <div className="accordion-dodont-header" style={{ padding: '8px 12px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary)' }}>
                            {isId ? 'Item 2: Terbuka (Rotasi 180°)' : 'Item 2: Expanded (180° Rotated)'}
                          </span>
                          <ChevronDown size={16} color="var(--color-primary)" style={{ transform: 'rotate(180deg)', transition: 'transform 0.2s ease' }} />
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--do">
                      <Check size={12} strokeWidth={2.5} />
                      {isId ? 'Affordance konsisten & visual feedback jelas' : 'Consistent affordance & clear visual cue'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Sediakan indikator chevron konsisten dengan rotasi status yang jelas'
                        : 'Provide a consistent chevron indicator with clear state rotation'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Letakkan ikon ekspansi (chevron) di posisi seragam (standarnya di sisi kanan) pada seluruh item dan berikan animasi rotasi 180° yang mulus untuk menegaskan perubahan status terbuka/tertutup.'
                        : 'Keep expansion icons in a uniform position (standard right alignment) across all items and use smooth 180° rotation to clearly communicate the toggled state.'}
                    </p>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview accordion-dodont-preview">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360 }}>
                      <div className="accordion-dodont-box accordion-dodont-box--dont" style={{ boxShadow: 'none' }}>
                        <div className="accordion-dodont-header" style={{ padding: '8px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ChevronDown size={16} color="var(--color-danger)" />
                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {isId ? 'Ikon di kiri acak' : 'Icon misplaced on left'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-dodont-box accordion-dodont-box--dont" style={{ boxShadow: 'none' }}>
                        <div className="accordion-dodont-header" style={{ padding: '8px 12px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                            {isId ? 'Tanpa ikon chevron sama sekali' : 'No chevron indicator at all'}
                          </span>
                          <span style={{ fontSize: 10, color: 'var(--color-danger)', fontStyle: 'italic' }}>
                            {isId ? '(Tampak statis)' : '(Looks static)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-dodont-tag accordion-dodont-tag--dont">
                      <X size={12} strokeWidth={2.5} />
                      {isId ? 'Inkonsistensi & tanpa tanda interaktif' : 'Inconsistent & lacks expand affordance'}
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId
                        ? 'Jangan acak posisi ikon atau hilangkan penanda keterbukaan (affordance)'
                        : 'Don’t scramble icon positions or omit expansion affordances'}
                    </div>
                    <p className="rule-card__desc">
                      {isId
                        ? 'Menaruh ikon di tempat berbeda-beda pada satu grup atau menghilangkan ikon sama sekali membuat pengguna tidak mengenali bahwa baris tersebut dapat diklik.'
                        : 'Inconsistently placing icons or omitting visual cues leaves users uncertain whether a row is expandable or merely static text.'}
                    </p>
                  </div>
                </RuleCard>
              </div>

            </div>
          </section>

          {/* Next Previous Navigation Footer */}
          <NextPrevious
            prev={{ id: 'comp-stepper', label: 'Stepper' }}
            next={{ id: 'comp-alert', label: 'Alert' }}
            setActiveTab={setActiveTab}
          />

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
                  ? 'Eksplorasi ragam konfigurasi Accordion secara real-time. Salin kode siap pakai untuk framework React, Vue 3, atau HTML/CSS.'
                  : 'Customize accordion props in real-time, preview reactive behaviors, and copy production-ready code for React, Vue 3, or HTML/CSS.'}
              </p>

              <Playground
                name="NeuronAccordion"
                defaultTab="react"
                knobs={[
                  {
                    name: 'variant',
                    label: isId ? 'Varian Tampilan' : 'Visual Variant',
                    type: 'select',
                    options: [
                      'default',
                      'separated',
                      'flush',
                      'boxed',
                      'minimal',
                      'gradient',
                      'accent-left',
                      'floating',
                      'pill',
                      'numbered',
                    ],
                    default: 'default',
                  },
                  {
                    name: 'columns',
                    label: isId ? 'Kolom Grid' : 'Grid Columns',
                    type: 'select',
                    options: ['1', '2'],
                    default: '1',
                  },
                  {
                    name: 'size',
                    label: isId ? 'Skala Ukuran' : 'Size Scale',
                    type: 'select',
                    options: ['sm', 'md', 'lg'],
                    default: 'md',
                  },
                  {
                    name: 'type',
                    label: isId ? 'Tipe Ekspansi' : 'Expansion Type',
                    type: 'select',
                    options: ['single', 'multiple'],
                    default: 'single',
                  },
                  {
                    name: 'collapsible',
                    label: isId ? 'Dapat Diciutkan Penuh (Collapsible)' : 'Collapsible',
                    type: 'boolean',
                    default: true,
                    condition: (s) => s.type === 'single',
                  },
                  {
                    name: 'iconPosition',
                    label: isId ? 'Posisi Indikator' : 'Icon Position',
                    type: 'select',
                    options: ['right', 'left'],
                    default: 'right',
                  },
                  {
                    name: 'iconType',
                    label: isId ? 'Gaya Ikon Ekspansi' : 'Icon Glyph Style',
                    type: 'select',
                    options: ['chevron', 'plus-minus', 'arrow', 'none'],
                    default: 'chevron',
                  },
                  {
                    name: 'hasSubtitle',
                    label: isId ? 'Sertakan Subtitle' : 'Include Subtitle',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'hasLeadingIcon',
                    label: isId ? 'Sertakan Ikon Kiri' : 'Include Leading Icon',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'hasBadge',
                    label: isId ? 'Sertakan Badge Status' : 'Include Status Badge',
                    type: 'boolean',
                    default: true,
                  },
                  {
                    name: 'disabledFirst',
                    label: isId ? 'Nonaktifkan Item Pertama' : 'Disable First Item',
                    type: 'boolean',
                    default: false,
                  },
                ]}
                codeTemplates={(state) => {
                  const variant = (state.variant as AccordionVariant) || 'default';
                  const size = (state.size as AccordionSize) || 'md';
                  const type = (state.type as AccordionType) || 'single';
                  const columns = state.columns === '2' ? 2 : 1;
                  const collapsible = state.collapsible !== false;
                  const iconPosition = (state.iconPosition as AccordionIconPosition) || 'right';
                  const iconType = (state.iconType as AccordionIconType) || 'chevron';
                  const hasSubtitle = !!state.hasSubtitle;
                  const hasLeadingIcon = !!state.hasLeadingIcon;
                  const hasBadge = !!state.hasBadge;
                  const disabledFirst = !!state.disabledFirst;

                  const reactProps: string[] = [
                    `type="${type}"`,
                    `variant="${variant}"`,
                    `size="${size}"`,
                  ];
                  if (columns === 2) {
                    reactProps.push('columns={2}');
                  }
                  if (type === 'single' && !collapsible) {
                    reactProps.push(':collapsible="false"');
                  }
                  if (iconPosition !== 'right') {
                    reactProps.push(`iconPosition="${iconPosition}"`);
                  }
                  if (iconType !== 'chevron') {
                    reactProps.push(`iconType="${iconType}"`);
                  }
                  reactProps.push('defaultValue="item-1"');

                  return {
                    react: `import { NeuronAccordion } from '@neudela/ui';
${hasLeadingIcon ? `import { ShieldCheck, User, CreditCard } from 'lucide-react';\n` : ''}
export default function AccordionExample() {
  const items = [
    {
      id: 'item-1',
      title: 'Security & Authentication',
      ${hasSubtitle ? "subtitle: 'Multi-factor authentication & password policy',\n      " : ''}${hasLeadingIcon ? 'icon: <ShieldCheck size={18} />,\n      ' : ''}${hasBadge ? "badge: <span className=\"neuron-badge neuron-badge--success\">Active</span>,\n      " : ''}${disabledFirst ? 'disabled: true,\n      ' : ''}content: 'Configure session timeout, SSO providers, and biometric device authentication.',
    },
    {
      id: 'item-2',
      title: 'Personal Profile & Identity',
      ${hasSubtitle ? "subtitle: 'Public username, avatar, and contact email',\n      " : ''}${hasLeadingIcon ? 'icon: <User size={18} />,\n      ' : ''}content: 'Manage public profile visibility, portfolio links, and communication preferences.',
    },
    {
      id: 'item-3',
      title: 'Billing & Invoice History',
      ${hasSubtitle ? "subtitle: 'Payment cards, invoices, and billing contact',\n      " : ''}${hasLeadingIcon ? 'icon: <CreditCard size={18} />,\n      ' : ''}content: 'View past receipts, change card on file, and download tax compliance certificates.',
    },
  ];

  return (
    <NeuronAccordion
      ${reactProps.join('\n      ')}
      items={items}
    />
  );
}`,
                    vue: `<template>
  <NeuronAccordion
    type="${type}"
    variant="${variant}"
    size="${size}"
    ${iconPosition !== 'right' ? `icon-position="${iconPosition}"\n    ` : ''}${iconType !== 'chevron' ? `icon-type="${iconType}"\n    ` : ''}:items="accordionItems"
    default-value="item-1"
  />
</template>

<script setup lang="ts">
import { NeuronAccordion } from '@neudela/vue';

const accordionItems = [
  {
    id: 'item-1',
    title: 'Security & Authentication',
    ${hasSubtitle ? "subtitle: 'Multi-factor authentication & password policy',\n    " : ''}${disabledFirst ? 'disabled: true,\n    ' : ''}content: 'Configure session timeout, SSO providers, and biometric device authentication.',
  },
  {
    id: 'item-2',
    title: 'Personal Profile & Identity',
    ${hasSubtitle ? "subtitle: 'Public username, avatar, and contact email',\n    " : ''}content: 'Manage public profile visibility, portfolio links, and communication preferences.',
  },
  {
    id: 'item-3',
    title: 'Billing & Invoice History',
    ${hasSubtitle ? "subtitle: 'Payment cards, invoices, and billing contact',\n    " : ''}content: 'View past receipts, change card on file, and download tax compliance certificates.',
  },
];
</script>`,
                    html: `<!-- Neudela Accordion (${variant}, ${size}, ${type}) -->
<div class="neuron-accordion neuron-accordion--${variant} neuron-accordion--${size} neuron-accordion--icon-${iconPosition}">
  <!-- Item 1 -->
  <div class="neuron-accordion__item is-open" data-state="open">
    <div class="neuron-accordion__header">
      <button
        type="button"
        class="neuron-accordion__trigger neuron-accordion__trigger--${variant} neuron-accordion__trigger--${size} is-open"
        aria-expanded="true"
        aria-controls="panel-1"
        id="header-1"
      >
        <div class="neuron-accordion__title-group">
          <span class="neuron-accordion__title">Security &amp; Authentication</span>
          ${hasSubtitle ? '<span class="neuron-accordion__subtitle">Multi-factor authentication &amp; password policy</span>' : ''}
        </div>
        <span class="neuron-accordion__indicator neuron-accordion__indicator--right">
          <svg class="neuron-accordion__icon-glyph is-open" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
    </div>
    <div id="panel-1" class="neuron-accordion__collapse is-open" role="region" aria-labelledby="header-1">
      <div class="neuron-accordion__collapse-wrapper">
        <div class="neuron-accordion__content neuron-accordion__content--${variant} neuron-accordion__content--${size}">
          Configure session timeout, SSO providers, and biometric device authentication.
        </div>
      </div>
    </div>
  </div>
</div>`,
                  };
                }}
              >
                {(state) => {
                  const variant = (state.variant as AccordionVariant) || 'default';
                  const size = (state.size as AccordionSize) || 'md';
                  const type = (state.type as AccordionType) || 'single';
                  const columns = state.columns === '2' ? 2 : 1;
                  const collapsible = state.collapsible !== false;
                  const iconPosition = (state.iconPosition as AccordionIconPosition) || 'right';
                  const iconType = (state.iconType as AccordionIconType) || 'chevron';
                  const hasSubtitle = !!state.hasSubtitle;
                  const hasLeadingIcon = !!state.hasLeadingIcon;
                  const hasBadge = !!state.hasBadge;
                  const disabledFirst = !!state.disabledFirst;

                  const items: AccordionItem[] = [
                    {
                      id: 'item-1',
                      title: isId ? 'Keamanan Akun & Autentikasi' : 'Security & Authentication',
                      subtitle: hasSubtitle
                        ? (isId ? 'Autentikasi dua faktor & kebijakan kata sandi' : 'Multi-factor authentication & password policy')
                        : undefined,
                      icon: hasLeadingIcon ? <ShieldCheck size={18} /> : undefined,
                      badge: hasBadge ? <NeuronBadge size="sm" variant="success">Aktif</NeuronBadge> : undefined,
                      disabled: disabledFirst,
                      content: isId
                        ? 'Konfigurasi batas waktu sesi login, penyedia identitas SSO enterprise, dan kunci keamanan biometrik FIDO2.'
                        : 'Configure session expiration timeout, enterprise SSO identity providers, and FIDO2 biometric security keys.',
                    },
                    {
                      id: 'item-2',
                      title: isId ? 'Profil Pribadi & Informasi Publik' : 'Personal Profile & Public Info',
                      subtitle: hasSubtitle
                        ? (isId ? 'Nama pengguna, foto profil, dan email' : 'Username, display picture, and contact email')
                        : undefined,
                      icon: hasLeadingIcon ? <User size={18} /> : undefined,
                      badge: hasBadge ? <NeuronBadge size="sm" variant="brand">Publik</NeuronBadge> : undefined,
                      content: isId
                        ? 'Kelola visibilitas profil Anda pada direktori publik organisasi, tautan portofolio, dan preferensi bahasa sistem.'
                        : 'Manage your profile visibility across organization directories, public portfolio links, and preferred locale.',
                    },
                    {
                      id: 'item-3',
                      title: isId ? 'Penagihan & Riwayat Faktur' : 'Billing & Invoice History',
                      subtitle: hasSubtitle
                        ? (isId ? 'Kartu kredit, faktur pajak, dan kontak' : 'Payment cards, invoices, and billing contact')
                        : undefined,
                      icon: hasLeadingIcon ? <CreditCard size={18} /> : undefined,
                      content: isId
                        ? 'Lihat rincian riwayat transaksi pembayaran bulanan, unduh faktur resmi dalam format PDF, dan perbarui kartu pembayaran.'
                        : 'Review monthly billing charges, download official tax compliance invoices in PDF, and update credit card details.',
                    },
                  ];

                  return (
                    <div style={{ width: '100%', maxWidth: columns === 2 ? 800 : 680, margin: '0 auto' }}>
                      <NeuronAccordion
                        key={`${variant}-${size}-${type}-${collapsible}-${iconPosition}-${iconType}-${disabledFirst}-${columns}`}
                        variant={variant}
                        size={size}
                        type={type}
                        columns={columns as 1 | 2}
                        collapsible={collapsible}
                        iconPosition={iconPosition}
                        iconType={iconType}
                        defaultValue="item-1"
                        items={items}
                      />
                    </div>
                  );
                }}
              </Playground>
            </div>
          </section>

          {/* ── 2. Real-World Use Case 1: Knowledgebase / FAQ Hub ── */}
          <section>
            <div className="section-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 'var(--fs-text-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Use Case 1: Pusat Bantuan & Pertanyaan Umum (FAQ Hub)' : 'Use Case 1: Knowledgebase & FAQ Hub'}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Desain kartu Separated dengan kolom pencarian interaktif dan tombol penilaian respons jawaban.'
                      : 'Separated cards accordion with real-time search query filtering and helpfulness feedback buttons.'}
                  </p>
                </div>
                <NeuronBadge size="sm" variant="brand">FAQ Pattern</NeuronBadge>
              </div>

              {/* Search & Category Filter */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                  <input
                    type="text"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder={isId ? 'Cari pertanyaan (misal: penagihan, kata sandi)...' : 'Search questions (e.g. billing, password)...'}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 36px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-surface)',
                      color: 'var(--color-text-primary)',
                      fontSize: 'var(--fs-text-sm)',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['all', 'billing', 'security', 'integration'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFaqCategory(cat)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 12,
                        fontWeight: 600,
                        border: faqCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: faqCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                        color: faqCategory === cat ? '#ffffff' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion with Reactive Filter */}
              {(() => {
                const faqList = [
                  {
                    id: 'faq-item-1',
                    category: 'all',
                    title: isId ? 'Bagaimana cara menambahkan anggota tim ke dalam workspace?' : 'How do I invite additional team collaborators to my workspace?',
                    subtitle: isId ? 'Panduan pengelolaan izin akses dan peran (RBAC)' : 'Role-based access controls and permissions guide',
                    icon: <User size={18} />,
                    badge: <NeuronBadge size="sm" variant="default">Akun</NeuronBadge>,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                          {isId
                            ? 'Buka Pengaturan Workspace > Anggota Tim, klik tombol "Undang Anggota", lalu masukkan alamat email rekan Anda. Anda dapat menentukan perannya sebagai Admin, Editor, atau Viewer.'
                            : 'Navigate to Workspace Settings > Team Members, click "Invite Member", and enter their corporate email addresses. You can assign Admin, Editor, or Viewer roles.'}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--color-border)', marginTop: 4 }}>
                          <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                            {isId ? 'Apakah jawaban ini membantu Anda?' : 'Did you find this answer helpful?'}
                          </span>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <NeuronButton size="sm" variant="text">
                              <ThumbsUp size={14} style={{ marginRight: 4 }} /> {isId ? 'Ya' : 'Yes'}
                            </NeuronButton>
                            <NeuronButton size="sm" variant="text">
                              <ThumbsDown size={14} style={{ marginRight: 4 }} /> {isId ? 'Tidak' : 'No'}
                            </NeuronButton>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'faq-item-2',
                    category: 'billing',
                    title: isId ? 'Bagaimana sistem penagihan prorata saat upgrade paket?' : 'How does prorated billing work when upgrading our subscription?',
                    subtitle: isId ? 'Perhitungan biaya otomatis berdasarkan sisa hari pemakaian' : 'Automated credit calculation based on unused cycle days',
                    icon: <CreditCard size={18} />,
                    badge: <NeuronBadge size="sm" variant="brand">Billing</NeuronBadge>,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                          {isId
                            ? 'Saat Anda melakukan upgrade, sistem akan menghitung kredit saldo dari sisa hari paket sebelumnya dan memotongkannya langsung dari tagihan paket baru secara transparan.'
                            : 'When upgrading mid-cycle, unused days on your previous tier are immediately credited towards your new subscription invoice balance.'}
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: 'faq-item-3',
                    category: 'security',
                    title: isId ? 'Apakah data kami dienkripsi saat transit dan at rest?' : 'Is our stored organizational data encrypted in transit and at rest?',
                    subtitle: isId ? 'Sertifikasi kepatuhan SOC 2 Type II dan ISO 27001' : 'SOC 2 Type II and ISO 27001 security compliance',
                    icon: <ShieldCheck size={18} />,
                    badge: <NeuronBadge size="sm" variant="success">Security</NeuronBadge>,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                          {isId
                            ? 'Seluruh data disimpan menggunakan enkripsi AES-256 at rest dan dienkripsi via TLS 1.3 saat transit. Kunci enkripsi dikelola menggunakan AWS KMS dengan audit jejak ketat.'
                            : 'All customer data is encrypted at rest via AES-256 and protected in transit using modern TLS 1.3 ciphers with automated key rotation in AWS KMS.'}
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: 'faq-item-4',
                    category: 'integration',
                    title: isId ? 'Bagaimana cara menghubungkan webhook ke kanal Slack atau Discord?' : 'How do I connect webhook events to Slack or Discord?',
                    subtitle: isId ? 'Integrasi pengiriman alert real-time dengan payload JSON' : 'Real-time JSON payload dispatch integration',
                    icon: <ExternalLink size={18} />,
                    badge: <NeuronBadge size="sm" variant="brand">Webhook</NeuronBadge>,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                          {isId
                            ? 'Buka Integrasi > Webhook Baru, masukkan Incoming Webhook URL dari Slack/Discord Anda, pilih event yang ingin dipantau (misal: build failed, order completed), lalu klik Simpan.'
                            : 'Navigate to Integrations > New Webhook, enter your Slack/Discord incoming webhook URL, select events to subscribe to, and save your endpoint.'}
                        </p>
                      </div>
                    ),
                  },
                ];

                const filtered = faqList.filter((item) => {
                  const matchCat = faqCategory === 'all' || item.category === faqCategory;
                  const matchSearch =
                    !faqSearch.trim() ||
                    item.title.toLowerCase().includes(faqSearch.toLowerCase()) ||
                    (item.subtitle && item.subtitle.toLowerCase().includes(faqSearch.toLowerCase()));
                  return matchCat && matchSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div
                      style={{
                        padding: '36px 20px',
                        textAlign: 'center',
                        background: 'var(--color-bg-subtle)',
                        borderRadius: 'var(--radius-lg, 8px)',
                        border: '1px dashed var(--color-border)',
                      }}
                    >
                      <HelpCircle size={32} style={{ color: 'var(--color-text-tertiary)', margin: '0 auto 8px auto' }} />
                      <p style={{ margin: '0 0 6px 0', fontSize: 13.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Tidak ada pertanyaan yang cocok' : 'No matching questions found'}
                      </p>
                      <p style={{ margin: '0 0 12px 0', fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Coba ubah kata kunci atau ganti filter kategori di atas.' : 'Try adjusting your search query or select another category.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => { setFaqSearch(''); setFaqCategory('all'); }}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-border)',
                          background: 'var(--color-bg-surface)',
                          color: 'var(--color-text-primary)',
                          fontSize: 12,
                          cursor: 'pointer',
                        }}
                      >
                        {isId ? 'Reset Pencarian' : 'Reset Search'}
                      </button>
                    </div>
                  );
                }

                return (
                  <NeuronAccordion
                    key={`${faqCategory}-${faqSearch}`}
                    variant="separated"
                    type="single"
                    defaultValue={filtered[0]?.id}
                    items={filtered}
                  />
                );
              })()}
            </div>
          </section>

          {/* ── 3. Real-World Use Case 2: Account & Security Settings ── */}
          <section>
            <div className="section-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 'var(--fs-text-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Use Case 2: Pengaturan Akun & Preferensi Keamanan' : 'Use Case 2: System Settings & Security Preferences'}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Integrasi akordion Default Contained dengan kontrol interaktif seperti NeuronToggle, dropdown, dan tombol aksi langsung.'
                      : 'Default contained accordion housing live nested form controls such as NeuronToggle, input fields, and action buttons.'}
                  </p>
                </div>
                <NeuronBadge size="sm" variant="default">Settings Pattern</NeuronBadge>
              </div>

              <NeuronAccordion
                variant="default"
                type="multiple"
                defaultValue={['set-1', 'set-2']}
                items={[
                  {
                    id: 'set-1',
                    title: isId ? 'Autentikasi Dua Faktor (2FA)' : 'Two-Factor Authentication (2FA)',
                    subtitle: isId ? 'Tingkatkan perlindungan akun saat login dari perangkat asing' : 'Safeguard your login credentials with time-based one-time passcodes',
                    icon: <Lock size={18} />,
                    badge: <NeuronBadge size="sm" variant={settings2FA ? 'success' : 'default'}>{settings2FA ? 'Aktif' : 'Nonaktif'}</NeuronBadge>,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block' }}>
                              {isId ? 'Wajibkan kode TOTP Authenticator' : 'Require TOTP Authenticator Code'}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                              {isId ? 'Gunakan Google Authenticator, Authy, atau 1Password' : 'Compatible with Google Authenticator, Authy, or 1Password'}
                            </span>
                          </div>
                          <NeuronToggle
                            checked={settings2FA}
                            onChange={(val) => setSettings2FA(val)}
                            size="md"
                          />
                        </div>
                        {settings2FA && (
                          <div style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                              {isId ? 'Kode pemulihan darurat (Recovery codes)' : 'Emergency recovery codes remaining: 8 of 10'}
                            </span>
                            <NeuronButton size="sm" variant="outline">
                              {isId ? 'Buat Ulang Kode' : 'Generate New Codes'}
                            </NeuronButton>
                          </div>
                        )}
                      </div>
                    ),
                  },
                  {
                    id: 'set-2',
                    title: isId ? 'Preferensi Email & Laporan Mingguan' : 'Email Digest & Activity Notifications',
                    subtitle: isId ? 'Kelola frekuensi pengiriman ringkasan aktivitas tim' : 'Configure delivery schedules for team analytics and digest reports',
                    icon: <Bell size={18} />,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block' }}>
                              {isId ? 'Kirim email ringkasan mingguan setiap Senin' : 'Send weekly analytics digest on Mondays'}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                              {isId ? 'Termasuk statistik performa API dan penggunaan storage' : 'Includes storage usage charts and API error rate summaries'}
                            </span>
                          </div>
                          <NeuronToggle
                            checked={emailDigest}
                            onChange={(val) => setEmailDigest(val)}
                            size="md"
                          />
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'set-3',
                    title: isId ? 'Retensi Jejak Audit & Kepatuhan' : 'Compliance & Audit Log Retention',
                    subtitle: isId ? 'Durasi penyimpanan riwayat aktivitas sebelum diarsipkan permanen' : 'Duration before administrative events are securely archived into cold storage',
                    icon: <FileText size={18} />,
                    content: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                            {isId ? 'Masa Simpan Log:' : 'Log Retention Period:'}
                          </span>
                          <select
                            value={auditLogRetention}
                            onChange={(e) => setAuditLogRetention(e.target.value)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-bg-surface)',
                              color: 'var(--color-text-primary)',
                              fontSize: 12,
                            }}
                          >
                            <option value="30">30 {isId ? 'Hari' : 'Days'}</option>
                            <option value="90">90 {isId ? 'Hari (Rekomendasi)' : 'Days (Recommended)'}</option>
                            <option value="365">1 {isId ? 'Tahun (Enterprise)' : 'Year (Enterprise)'}</option>
                          </select>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </section>

          {/* ── 4. Real-World Use Case 3: Order Summary & Checkout Breakdown ── */}
          <section>
            <div className="section-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 'var(--fs-text-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Use Case 3: Rincian Pesanan & Kalkulasi Checkout' : 'Use Case 3: Order Summary & Checkout Breakdown'}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Varian Boxed dengan kalkulasi harga interaktif dan slot voucher diskon.'
                      : 'Boxed variant displaying categorized line items, coupon redemption, and delivery timeline.'}
                  </p>
                </div>
                <NeuronBadge size="sm" variant="brand">E-Commerce Pattern</NeuronBadge>
              </div>

              <div style={{ maxWidth: 640, margin: '0 auto' }}>
                <NeuronAccordion
                  variant="boxed"
                  defaultValue="order-1"
                  items={[
                    {
                      id: 'order-1',
                      title: isId ? 'Rincian Item Produk (3 Barang)' : 'Purchased Items (3 Items)',
                      subtitle: couponApplied
                        ? (isId ? 'Total: Rp 2.082.500 (Hemat 15%)' : 'Total: $140.25 (15% Saved)')
                        : (isId ? 'Subtotal: Rp 2.450.000' : 'Subtotal: $165.00'),
                      icon: <Package size={18} />,
                      badge: couponApplied
                        ? <NeuronBadge size="sm" variant="success">-15% Applied</NeuronBadge>
                        : <NeuronBadge size="sm" variant="default">3 items</NeuronBadge>,
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {[
                            { name: 'Neuron Ergonomic Mesh Chair', qty: 1, price: '$120.00' },
                            { name: 'Dual Monitor Desk Arm Mount', qty: 1, price: '$35.00' },
                            { name: 'Braided Thunderbolt 4 Cable 2m', qty: 1, price: '$10.00' },
                          ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: '1px dashed var(--color-border)', paddingBottom: 6 }}>
                              <span>{item.name} <span style={{ color: 'var(--color-text-tertiary)' }}>(x{item.qty})</span></span>
                              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.price}</span>
                            </div>
                          ))}
                          {couponApplied && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-success, #10b981)', paddingBottom: 4 }}>
                              <span>{isId ? 'Diskon Kupon (NEUDELA15 -15%)' : 'Voucher Discount (NEUDELA15 -15%)'}</span>
                              <span style={{ fontWeight: 600 }}>-$24.75</span>
                            </div>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', paddingTop: 6, borderTop: '1px solid var(--color-border)' }}>
                            <span>{isId ? 'Estimasi Total' : 'Estimated Total'}</span>
                            <span style={{ color: 'var(--color-primary, #b25e40)' }}>{couponApplied ? '$140.25' : '$165.00'}</span>
                          </div>
                        </div>
                      ),
                    },
                    {
                      id: 'order-2',
                      title: isId ? 'Opsi Pengiriman & Estimasi Tiba' : 'Shipping Method & Delivery Address',
                      subtitle: isId ? 'Kurir Express · Tiba besok pukul 14:00' : 'Express Air Courier · Arrives tomorrow by 2:00 PM',
                      icon: <Truck size={18} />,
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Alamat Pengiriman:' : 'Dispatch Destination:'}
                          </span>
                          <span style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                            Iqbal Dzulfikar · Gedung Menara Cyber Lt. 18, Jl. HR Rasuna Said Blok X-5, Jakarta Selatan 12950
                          </span>
                        </div>
                      ),
                    },
                    {
                      id: 'order-3',
                      title: isId ? 'Kupon Promosi & Kode Diskon' : 'Promotional Vouchers & Discounts',
                      subtitle: couponApplied ? (isId ? 'Diskon 15% diterapkan!' : '15% Discount voucher applied!') : (isId ? 'Masukkan kode voucher Anda' : 'Redeem your discount coupon'),
                      icon: <Sparkles size={18} />,
                      badge: couponApplied ? <NeuronBadge size="sm" variant="success">-15%</NeuronBadge> : undefined,
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <NeuronInput
                                placeholder={isId ? 'Masukkan kode kupon (cth. NEUDELA15)' : 'Enter coupon code (e.g. NEUDELA15)'}
                                value={couponCode}
                                onChange={(e) => {
                                  setCouponCode(e.target.value);
                                  if (couponError) setCouponError('');
                                }}
                                leadingIcon={<Sparkles size={15} color="var(--color-primary)" />}
                                state={couponApplied ? 'success' : (couponError ? 'error' : 'default')}
                                hintText={
                                  couponApplied
                                    ? (isId ? '✓ Kupon NEUDELA15 aktif (-15% potongan pesanan).' : '✓ Coupon NEUDELA15 active (-15% discount applied).')
                                    : (couponError || (isId ? 'Gunakan kode NEUDELA15 untuk diskon 15%.' : 'Use code NEUDELA15 for 15% off.'))
                                }
                                disabled={couponApplied}
                              />
                            </div>
                            <NeuronButton
                              size="md"
                              variant={couponApplied ? 'outline' : 'primary'}
                              onClick={() => {
                                if (couponApplied) {
                                  setCouponApplied(false);
                                  setCouponCode('');
                                  setCouponError('');
                                } else {
                                  if (!couponCode.trim()) {
                                    setCouponError(isId ? 'Silakan masukkan kode kupon terlebih dahulu.' : 'Please enter a coupon code first.');
                                    return;
                                  }
                                  if (couponCode.trim().toUpperCase() === 'NEUDELA15') {
                                    setCouponApplied(true);
                                    setCouponError('');
                                  } else {
                                    setCouponError(isId ? 'Kode kupon tidak valid atau kedaluwarsa.' : 'Invalid or expired coupon code.');
                                  }
                                }
                              }}
                              style={{ height: 40, flexShrink: 0 }}
                            >
                              {couponApplied ? (isId ? 'Hapus' : 'Remove') : (isId ? 'Gunakan' : 'Apply')}
                            </NeuronButton>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ── 5. Component API Reference ── */}
          <section>
            <div className="section-card" style={{ padding: 'var(--space-6)' }}>
              <h3 style={{ margin: '0 0 14px 0', fontSize: 'var(--fs-text-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {isId ? 'Referensi API Komponen (Props Reference)' : 'Component API Props Reference'}
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                {isId
                  ? 'Daftar lengkap properti yang diterima oleh komponen NeuronAccordion dan tipe itemnya.'
                  : 'Complete specification of props supported by NeuronAccordion, Compound triggers, and AccordionItem objects.'}
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                      <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Prop</th>
                      <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Type</th>
                      <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Default</th>
                      <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { prop: 'items', type: 'AccordionItem[]', def: '[]', desc: 'Array of data items for declarative accordion generation' },
                      { prop: 'type', type: "'single' | 'multiple'", def: "'single'", desc: 'Single open item exclusivity or multi-item concurrent opening' },
                      { prop: 'collapsible', type: 'boolean', def: 'true', desc: 'In single mode, allows collapsing all items (zero items opened)' },
                      { prop: 'variant', type: "'default' | 'separated' | 'flush' | 'boxed' | 'minimal' | 'gradient' | 'accent-left' | 'floating' | 'pill' | 'numbered'", def: "'default'", desc: 'Visual style variant container rendering' },
                      { prop: 'size', type: "'sm' | 'md' | 'lg'", def: "'md'", desc: 'Dimensional sizing scale controlling font, touch target, and padding' },
                      { prop: 'columns', type: '1 | 2', def: '1', desc: 'Number of responsive grid columns (1 for vertical stack, 2 for dual-column grid)' },
                      { prop: 'numberPrefix', type: 'boolean', def: 'false', desc: 'Automatically prepends 2-digit index numbers (01, 02...) before trigger titles' },
                      { prop: 'iconPosition', type: "'left' | 'right'", def: "'right'", desc: 'Placement side of the expansion toggle glyph' },
                      { prop: 'iconType', type: "'chevron' | 'plus-minus' | 'arrow' | 'none'", def: "'chevron'", desc: 'Glyph style used for indicating expanded/collapsed state' },
                      { prop: 'value', type: 'string | string[]', def: 'undefined', desc: 'Controlled value of currently opened item ID(s)' },
                      { prop: 'defaultValue', type: 'string | string[]', def: 'undefined', desc: 'Uncontrolled initial opened item ID(s)' },
                      { prop: 'onChange', type: '(value: string | string[]) => void', def: 'undefined', desc: 'Callback invoked upon expansion toggle change' },
                      { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Disables all accordion triggers globally' },
                      { prop: 'headingLevel', type: '2 | 3 | 4 | 5 | 6', def: 'undefined', desc: 'Wraps trigger in semantic <h2-h6> heading for document structure' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-primary)' }}>
                          <code>{row.prop}</code>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace', fontSize: 12 }}>
                          {row.type}
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--color-text-tertiary)', fontFamily: 'monospace', fontSize: 12 }}>
                          {row.def}
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {row.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Next Previous Navigation Footer */}
          <NextPrevious
            prev={{ id: 'comp-stepper', label: 'Stepper' }}
            next={{ id: 'comp-alert', label: 'Alert' }}
            setActiveTab={setActiveTab}
          />

        </div>
      )}
    </div>
  );
}
