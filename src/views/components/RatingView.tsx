import React, { useState, ReactNode } from 'react';
import {
  Star,
  Heart,
  ThumbsUp,
  Smile,
  Frown,
  Meh,
  Sparkles,
  Sliders,
  Layers,
  Eye,
  Palette,
  Check,
  Copy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  ShoppingCart,
  UserCheck,
  TrendingUp,
  Award,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  Info,
} from 'lucide-react';
import NeuronRating, {
  NeuronRatingSize,
  NeuronRatingVariant,
  NeuronRatingIconType,
} from '../components/NeuronRating';
import NeuronBadge from '../components/NeuronBadge';
import NeuronCheckbox from '../components/NeuronCheckbox';
import NeuronTabBar from '../components/NeuronTabBar';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Rule Card (Do / Don't)
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
      <div className="rule-card__body">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sizing Data
// ─────────────────────────────────────────────────────────────────────────────
interface SizeProfile {
  id: NeuronRatingSize;
  label: string;
  iconPx: number;
  gapPx: number;
  fontPx: number;
  touchTarget: string;
  useCase: { id: string; en: string };
  desc: { id: string; en: string };
}

const SIZE_PROFILES: SizeProfile[] = [
  {
    id: 'sm',
    label: 'Small (SM)',
    iconPx: 16,
    gapPx: 4,
    fontPx: 12,
    touchTarget: '24×24px (Read-only / dense)',
    useCase: {
      id: 'Tabel data ringkas, kartu produk mini, daftar hasil pencarian',
      en: 'Compact data tables, mini product cards, search result listings',
    },
    desc: {
      id: 'Ukuran padat yang dioptimalkan untuk konsumsi data berdensitas tinggi tanpa menyita ruang vertikal.',
      en: 'Dense scale optimized for high-density layouts where vertical space is constrained.',
    },
  },
  {
    id: 'md',
    label: 'Medium (MD)',
    iconPx: 22,
    gapPx: 6,
    fontPx: 14,
    touchTarget: '32×32px (Standar web)',
    useCase: {
      id: 'Formulir ulasan standar, kartu testimoni, halaman detail produk',
      en: 'Standard review forms, testimonial cards, product detail pages',
    },
    desc: {
      id: 'Ukuran default yang paling fleksibel untuk interaksi mouse dan sentuhan standar desktop/tablet.',
      en: 'The most versatile default size for standard mouse and touch interactions across devices.',
    },
  },
  {
    id: 'lg',
    label: 'Large (LG)',
    iconPx: 30,
    gapPx: 8,
    fontPx: 16,
    touchTarget: '40×40px (Mobile-friendly)',
    useCase: {
      id: 'Modal dialog penilaian, ulasan driver/kurir pada mobile, survei kepuasan',
      en: 'Rating modal dialogs, mobile driver/courier reviews, satisfaction surveys',
    },
    desc: {
      id: 'Target sentuh luas yang nyaman untuk jempol pengguna smartphone dan input interaktif utama.',
      en: 'Generous touch target ideal for mobile users and primary interactive review prompts.',
    },
  },
  {
    id: 'xl',
    label: 'Extra Large (XL)',
    iconPx: 38,
    gapPx: 10,
    fontPx: 18,
    touchTarget: '48×48px (Fitts Law accessible)',
    useCase: {
      id: 'Kios swalayan, hero section survei, layar apresiasi pelanggan akhir transaksi',
      en: 'Self-service kiosks, survey hero sections, post-checkout celebration screens',
    },
    desc: {
      id: 'Ukuran impresif untuk menarik atensi maksimal dan kemudahan interaksi tanpa kesalahan tekan.',
      en: 'Prominent hero scale designed for maximum visual engagement and effortless tap accuracy.',
    },
  },
];

const RATING_FEEDBACK_LABELS: Record<number, { id: string; en: string }> = {
  1: { id: 'Sangat Mengecewakan', en: 'Very Dissatisfied' },
  2: { id: 'Kurang Memuaskan', en: 'Needs Improvement' },
  3: { id: 'Cukup Baik', en: 'Average / Neutral' },
  4: { id: 'Sangat Baik', en: 'Great Experience' },
  5: { id: 'Luar Biasa Memuaskan', en: 'Exceptional Service' },
};

const RATING_FEEDBACK_LABELS_10: Record<number, { id: string; en: string }> = {
  1: { id: 'Sangat Buruk', en: 'Very Poor' },
  2: { id: 'Buruk', en: 'Poor' },
  3: { id: 'Mengecewakan', en: 'Disappointing' },
  4: { id: 'Kurang Memuaskan', en: 'Subpar' },
  5: { id: 'Cukup', en: 'Average' },
  6: { id: 'Cukup Baik', en: 'Fair' },
  7: { id: 'Baik', en: 'Good' },
  8: { id: 'Sangat Baik', en: 'Great' },
  9: { id: 'Istimewa', en: 'Excellent' },
  10: { id: 'Luar Biasa', en: 'Exceptional' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component View
// ─────────────────────────────────────────────────────────────────────────────
export default function RatingView({ setActiveTab }: { setActiveTab: (tabId: string) => void }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Anatomy Interactive Element
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  // Size Matrix Interactive State
  const [activeSizeStage, setActiveSizeStage] = useState<NeuronRatingSize>('md');
  const [stageRatingVal, setStageRatingVal] = useState<number>(4);

  // Playground State
  const [pgValue, setPgValue] = useState<number>(4);
  const [pgMax, setPgMax] = useState<number>(5);
  const [pgSize, setPgSize] = useState<NeuronRatingSize>('md');
  const [pgVariant, setPgVariant] = useState<NeuronRatingVariant>('amber');
  const [pgIcon, setPgIcon] = useState<NeuronRatingIconType>('star');
  const [pgPrecision, setPgPrecision] = useState<number>(0.5);
  const [pgReadOnly, setPgReadOnly] = useState<boolean>(false);
  const [pgDisabled, setPgDisabled] = useState<boolean>(false);
  const [pgClearable, setPgClearable] = useState<boolean>(true);
  const [pgShowValue, setPgShowValue] = useState<boolean>(true);
  const [pgShowLabel, setPgShowLabel] = useState<boolean>(true);
  const [pgShowCount, setPgShowCount] = useState<boolean>(true);
  const [pgHighlightSelectedOnly, setPgHighlightSelectedOnly] = useState<boolean>(false);
  const [pgCodeTab, setPgCodeTab] = useState<'react' | 'vue' | 'html' | 'json'>('react');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Demo Interactive States for Use Cases
  const [productRating, setProductRating] = useState<number>(4.8);
  const [serviceRating, setServiceRating] = useState<number>(5);
  const [csatMood, setCsatMood] = useState<number>(4);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Pengiriman Cepat', 'Packing Aman']);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // Reset Playground
  const handleResetPlayground = () => {
    setPgValue(4);
    setPgMax(5);
    setPgSize('md');
    setPgVariant('amber');
    setPgIcon('star');
    setPgPrecision(0.5);
    setPgReadOnly(false);
    setPgDisabled(false);
    setPgClearable(true);
    setPgShowValue(true);
    setPgShowLabel(true);
    setPgShowCount(true);
    setPgHighlightSelectedOnly(false);
  };

  // Generate Code Output
  const generateCode = () => {
    if (pgCodeTab === 'json') {
      const configObj: Record<string, any> = {
        value: pgValue,
        max: pgMax,
        size: pgSize,
        variant: pgVariant,
        icon: pgIcon,
        precision: pgPrecision,
        readOnly: pgReadOnly,
        disabled: pgDisabled,
        clearable: pgClearable,
        showValue: pgShowValue,
        showLabel: pgShowLabel,
        highlightSelectedOnly: pgHighlightSelectedOnly,
        count: pgShowCount ? 1420 : undefined,
      };
      return JSON.stringify(configObj, null, 2);
    }

    if (pgCodeTab === 'vue') {
      const vueProps: string[] = ['v-model="rating"'];
      if (pgMax !== 5) vueProps.push(`:max="${pgMax}"`);
      if (pgSize !== 'md') vueProps.push(`size="${pgSize}"`);
      if (pgVariant !== 'amber') vueProps.push(`variant="${pgVariant}"`);
      if (pgIcon !== 'star') vueProps.push(`icon="${pgIcon}"`);
      if (pgPrecision !== 1) vueProps.push(`:precision="${pgPrecision}"`);
      if (pgReadOnly) vueProps.push(`:read-only="true"`);
      if (pgDisabled) vueProps.push(`:disabled="true"`);
      if (!pgClearable) vueProps.push(`:clearable="false"`);
      if (pgHighlightSelectedOnly) vueProps.push(`:highlight-selected-only="true"`);
      if (pgShowValue) vueProps.push(`show-value`);
      if (pgShowLabel) vueProps.push(`show-label`);
      if (pgShowCount) vueProps.push(`:count="1420"`);

      return `<template>
  <NeuronRating
    ${vueProps.join('\n    ')}
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NeuronRating } from '@neudela/vue';

const rating = ref(${pgValue});
</script>`;
    }

    if (pgCodeTab === 'html') {
      const iconGlyph = pgIcon === 'heart' ? '♥' : pgIcon === 'thumb' ? '👍' : pgIcon === 'smile' ? '😊' : '★';
      const items = Array.from({ length: pgMax }, (_, i) => {
        const isFilled = i < Math.floor(pgValue);
        const isHalf = !isFilled && i < pgValue;
        return `    <button type="button" class="neuron-rating__item${isFilled ? ' is-filled' : isHalf ? ' is-half' : ''}" role="radio" aria-checked="${i + 1 === Math.round(pgValue)}">${iconGlyph}</button>`;
      }).join('\n');

      return `<!-- Neudela Rating Component (${pgSize}, ${pgVariant}, ${pgIcon}) -->
<div class="neuron-rating neuron-rating--${pgSize} neuron-rating--${pgVariant}" role="radiogroup" aria-label="Rating">
  <div class="neuron-rating__items">
${items}
  </div>${pgShowValue ? `\n  <span class="neuron-rating__value">${pgValue.toFixed(1)}</span>` : ''}${pgShowLabel ? `\n  <span class="neuron-rating__label">Very Good</span>` : ''}${pgShowCount ? `\n  <span class="neuron-rating__count">(1,420)</span>` : ''}
</div>`;
    }

    const lines = [`<NeuronRating`];
    if (pgValue !== 0) lines.push(`  value={${pgValue}}`);
    if (pgMax !== 5) lines.push(`  max={${pgMax}}`);
    if (pgSize !== 'md') lines.push(`  size="${pgSize}"`);
    if (pgVariant !== 'amber') lines.push(`  variant="${pgVariant}"`);
    if (pgIcon !== 'star') lines.push(`  icon="${pgIcon}"`);
    if (pgPrecision !== 1) lines.push(`  precision={${pgPrecision}}`);
    if (pgReadOnly) lines.push(`  readOnly`);
    if (pgDisabled) lines.push(`  disabled`);
    if (!pgClearable) lines.push(`  clearable={false}`);
    if (pgHighlightSelectedOnly) lines.push(`  highlightSelectedOnly`);
    if (pgShowValue) lines.push(`  showValue`);
    if (pgShowLabel) lines.push(`  showLabel`);
    if (pgShowCount) lines.push(`  count={1420}`);
    lines.push(`  onChange={(val) => setRating(val)}`);
    lines.push(`/>`);
    return lines.join('\n');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // TAB 1: GUIDELINE
  // ─────────────────────────────────────────────────────────────────────────
  const renderGuideline = () => (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      {/* 1. Overview & Design Pillars */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '1. Ikhtisar & Pilar Desain' : '1. Overview & Design Pillars'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronRating adalah komponen evaluasi terpadu untuk menyajikan skor kuantitatif dan mengumpulkan umpan balik pengguna dengan metafora visual yang intuitif.'
            : 'NeuronRating is a unified evaluation component for displaying quantitative scores and gathering user feedback with intuitive visual metaphors.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          {[
            {
              icon: <Eye size={18} />,
              title: isId ? 'Kejelasan Visual Instan' : 'Visual Immediacy',
              desc: isId
                ? 'Pengguna dapat memahami reputasi produk atau tingkat kepuasan dalam fraksi detik lewat isian warna yang kontras.'
                : 'Users can grasp product reputation or satisfaction scores in a fraction of a second via high-contrast icon fills.',
            },
            {
              icon: <Palette size={18} />,
              title: isId ? 'Fleksibilitas Metafora' : 'Multi-Icon Metaphors',
              desc: isId
                ? 'Dukungan bawaan bintang, hati (favorit), jempol (rekomendasi), hingga emotikon suasana hati (CSAT).'
                : 'Native support for stars, hearts (favorites), thumbs (recommendations), and mood smileys (CSAT).',
            },
            {
              icon: <Sparkles size={18} />,
              title: isId ? 'Presisi Fraksi Halus' : 'Fractional Precision',
              desc: isId
                ? 'Mendukung skor penuh (1.0), setengah bintang (0.5), hingga desimal persis (misal 4.7) dengan teknik SVG clip-overlay.'
                : 'Seamlessly handles whole values, half-star steps (0.5), and arbitrary decimals (e.g. 4.7) via SVG clip overlays.',
            },
            {
              icon: <ShieldCheck size={18} />,
              title: isId ? 'Aksesibilitas Teruji' : 'Accessibility by Default',
              desc: isId
                ? 'Dilengkapi role radiogroup, navigasi tombol panah keyboard, dan pengumuman pembaca layar yang ramah WCAG.'
                : 'Built-in radiogroup roles, smooth keyboard arrow interactions, and screen-reader announcements matching WCAG.',
            },
          ].map((pillar, idx) => (
            <div key={idx} style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 'var(--radius-md)',
                background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Component Anatomy */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '2. Anatomi Komponen' : '2. Component Anatomy'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Struktur elemen visual pembangun komponen NeuronRating. Pilih nomor elemen pada canvas atau kartu di bawah untuk melihat spesifikasi detail dan perannya.'
            : 'Visual building blocks of the NeuronRating component. Select an element number on the canvas or cards below to inspect its detailed specifications and functional role.'}
        </p>

        {/* Live Anatomy Stage */}
        {(() => {
          const activeElement = hoveredElement !== null ? hoveredElement : selectedElement;

          const anatomyElements = [
            {
              id: 1,
              name: isId ? '1. Container & Track' : '1. Rating Track Container',
              shortName: isId ? 'Track' : 'Track',
              category: 'Layout',
              desc: isId ? 'Wadah flexbox yang membungkus deretan ikon bintang dengan gap terstandarisasi antar item.' : 'Flexbox wrapper providing standardized gap tokens between individual rating glyph items.',
              token: '.neuron-rating__track',
              w3c: 'role="radiogroup"',
              tip: 'gap: 6px, flex-row',
            },
            {
              id: 2,
              name: isId ? '2. Glif Terisi Penuh' : '2. Active Filled Glyph',
              shortName: isId ? 'Glif Penuh' : 'Filled Glyph',
              category: 'Interactive',
              desc: isId ? 'Ikon dengan isian warna solid semantik 100% yang merepresentasikan nilai rating tercapai.' : 'Icon with 100% semantic solid fill representing attained or selected rating score.',
              token: '.neuron-rating__item.is-full',
              w3c: 'aria-checked="true"',
              tip: 'fill: #f59e0b, 100%',
            },
            {
              id: 3,
              name: isId ? '3. Lapisan Fraksional' : '3. Fractional Overlay',
              shortName: isId ? 'Fraksional' : 'Overlay',
              category: 'Visual',
              desc: isId ? 'Lapisan overlay SVG dengan kliping presisi untuk fraksi setengah bintang atau nilai desimal.' : 'Precision clipped overlay rendering fractional values and half-star ratings without icon distortion.',
              token: '.neuron-rating__overlay',
              w3c: 'overflow: hidden',
              tip: 'width: 50%, clip-path',
            },
            {
              id: 4,
              name: isId ? '4. Glif Kosong (Inactive)' : '4. Inactive Empty Glyph',
              shortName: isId ? 'Glif Kosong' : 'Empty Glyph',
              category: 'Visual',
              desc: isId ? 'Ikon dasar dengan garis tepi abu-abu netral untuk batas skala nilai yang belum terisi.' : 'Neutral bordered empty icon marking pending or unselected rating range capacity.',
              token: '.neuron-rating__glyph--empty',
              w3c: 'aria-hidden="true"',
              tip: 'stroke: var(--color-border)',
            },
            {
              id: 5,
              name: isId ? '5. Badge Nilai Angka' : '5. Numeric Score Badge',
              shortName: isId ? 'Skor Angka' : 'Score Badge',
              category: 'Typography',
              desc: isId ? 'Tipografi angka tabular yang memperjelas skor matematis eksak (misal: 3.5).' : 'Tabular figures displaying the exact numerical score with high contrast.',
              token: '.neuron-rating__value-badge',
              w3c: 'font-mono tabular',
              tip: 'font-feature: "tnum"',
            },
            {
              id: 6,
              name: isId ? '6. Label Feedback Dinamis' : '6. Dynamic Feedback Label',
              shortName: isId ? 'Feedback' : 'Label',
              category: 'Content',
              desc: isId ? 'Predikat tekstual humanis (misal: "Cukup Baik") yang berubah dinamis sesuai rating terpilih.' : 'Human-readable verbal qualifier dynamically adapting to the user selection.',
              token: '.neuron-rating__feedback-label',
              w3c: 'aria-live="polite"',
              tip: 'color: #d97706',
            },
            {
              id: 7,
              name: isId ? '7. Penghitung Total Ulasan' : '7. Total Review Counter',
              shortName: isId ? 'Total Ulasan' : 'Counter',
              category: 'Social Proof',
              desc: isId ? 'Informasi jumlah responden/ulasan dalam kurung untuk bukti sosial kredibel.' : 'Enclosed review sample size providing credible social proof.',
              token: '.neuron-rating__count',
              w3c: 'font-size: 0.9em',
              tip: 'opacity: 0.8',
            },
          ];

          const activeItem = anatomyElements.find(item => item.id === activeElement);

          return (
            <div className="accordion-anatomy-container">
              {/* Visual Stage Card */}
              <div className="accordion-anatomy-stage-card">
                {/* Stage Header */}
                <div
                  className="accordion-anatomy-stage-header"
                  style={{ minHeight: 56, height: 56, boxSizing: 'border-box' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Kanvas Anatomi Interaktif' : 'Interactive Anatomy Canvas'}
                    </span>
                    <NeuronBadge size="sm" variant="brand">
                      {isId ? '7 Elemen Komponen' : '7 Component Elements'}
                    </NeuronBadge>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                      {isId ? 'Klik pin bernomor atau kartu di bawah' : 'Click a numbered pin or card below'}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setSelectedElement(null); setHoveredElement(null); }}
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
                        visibility: activeElement !== null ? 'visible' : 'hidden',
                        pointerEvents: activeElement !== null ? 'auto' : 'none',
                      }}
                    >
                      <RotateCcw size={11} />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Quick Anatomy Element Switcher Chips */}
                <div className="accordion-anatomy-quick-nav">
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', marginRight: 4 }}>
                    {isId ? 'PILIH ELEMEN:' : 'INSPECT ELEMENT:'}
                  </span>
                  {anatomyElements.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`accordion-anatomy-nav-chip ${activeElement === item.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedElement(prev => prev === item.id ? null : item.id)}
                      onMouseEnter={() => setHoveredElement(item.id)}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <span className="chip-dot">{item.id}</span>
                      <span>{item.shortName}</span>
                    </button>
                  ))}
                </div>

                {/* Stage Body Canvas */}
                <div
                  className="accordion-anatomy-stage-body"
                  onMouseLeave={() => setHoveredElement(null)}
                  style={{
                    padding: '80px 40px 72px',
                    minHeight: '340px',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    className="accordion-anatomy-board"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* ── Subject: Rating Component Card (Zone 1) ── */}
                    <div
                      className={`accordion-anatomy-zone ${activeElement === 1 ? 'is-active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 1 ? null : 1); }}
                      onMouseEnter={() => setHoveredElement(1)}
                      style={{
                        padding: '16px 24px',
                        background: 'var(--color-bg-surface)',
                        borderRadius: 'var(--radius-lg, 10px)',
                        border: '1px solid var(--color-border)',
                        boxShadow: activeElement === 1
                          ? '0 0 0 2px var(--color-primary), var(--shadow-sm)'
                          : 'var(--shadow-xs)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 16,
                        position: 'relative',
                        userSelect: 'none',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
                      }}
                    >
                      {/* PIN 1: Container Pin (Top Left of card) */}
                      <div
                        className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeElement === 1 ? 'is-active' : ''}`}
                        style={{ left: 24, top: 0 }}
                        title={isId ? '1. Container & Track' : '1. Rating Track Container'}
                      >
                        <span
                          className="accordion-anatomy-pin__dot"
                          onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 1 ? null : 1); }}
                          onMouseEnter={() => setHoveredElement(1)}
                        >
                          1
                        </span>
                        <span className="accordion-anatomy-pin__stem" style={{ height: 36 }} />
                      </div>

                      {/* Track with 5 Stars */}
                      <div
                        className="neuron-rating__track"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        {/* Star 1: Filled */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                          }}
                        >
                          <Star size={24} fill="#f59e0b" stroke="#f59e0b" />
                        </div>

                        {/* Zone 2: Active Filled Glyph (Star 2) */}
                        <div
                          className={`accordion-anatomy-zone ${activeElement === 2 ? 'is-active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 2 ? null : 2); }}
                          onMouseEnter={() => setHoveredElement(2)}
                          style={{
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                          title={isId ? '2. Glif Terisi Penuh' : '2. Active Filled Glyph'}
                        >
                          {/* PIN 2: Stem 32px pointing straight down to Star 2 */}
                          <div
                            className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeElement === 2 ? 'is-active' : ''}`}
                            style={{ left: '50%', top: 0 }}
                          >
                            <span
                              className="accordion-anatomy-pin__dot"
                              onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 2 ? null : 2); }}
                              onMouseEnter={() => setHoveredElement(2)}
                            >
                              2
                            </span>
                            <span className="accordion-anatomy-pin__stem" style={{ height: 32 }} />
                          </div>

                          <Star size={24} fill="#f59e0b" stroke="#f59e0b" />
                        </div>

                        {/* Star 3: Filled */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                          }}
                        >
                          <Star size={24} fill="#f59e0b" stroke="#f59e0b" />
                        </div>

                        {/* Zone 3: Fractional Overlay (Star 4 - Half Star) */}
                        <div
                          className={`accordion-anatomy-zone ${activeElement === 3 ? 'is-active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 3 ? null : 3); }}
                          onMouseEnter={() => setHoveredElement(3)}
                          style={{
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                          title={isId ? '3. Lapisan Fraksional (Half/Overlay)' : '3. Fractional Overlay'}
                        >
                          {/* PIN 3: Stem 32px pointing straight down to Star 4 */}
                          <div
                            className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeElement === 3 ? 'is-active' : ''}`}
                            style={{ left: '50%', top: 0 }}
                          >
                            <span
                              className="accordion-anatomy-pin__dot"
                              onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 3 ? null : 3); }}
                              onMouseEnter={() => setHoveredElement(3)}
                            >
                              3
                            </span>
                            <span className="accordion-anatomy-pin__stem" style={{ height: 32 }} />
                          </div>

                          {/* Empty star base + 50% clipped filled overlay */}
                          <div style={{ position: 'relative', width: 24, height: 24 }}>
                            <Star size={24} fill="none" stroke="var(--color-border-subtle, #cbd5e1)" />
                            <div
                              className="neuron-rating__overlay"
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '50%',
                                height: '100%',
                                overflow: 'hidden',
                              }}
                            >
                              <Star size={24} fill="#f59e0b" stroke="#f59e0b" style={{ minWidth: 24 }} />
                            </div>
                          </div>
                        </div>

                        {/* Zone 4: Inactive Empty Glyph (Star 5) */}
                        <div
                          className={`accordion-anatomy-zone ${activeElement === 4 ? 'is-active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 4 ? null : 4); }}
                          onMouseEnter={() => setHoveredElement(4)}
                          style={{
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                          title={isId ? '4. Glif Kosong (Inactive)' : '4. Inactive Empty Glyph'}
                        >
                          {/* PIN 4: Stem 32px pointing straight down to Star 5 */}
                          <div
                            className={`accordion-anatomy-pin accordion-anatomy-pin--top ${activeElement === 4 ? 'is-active' : ''}`}
                            style={{ left: '50%', top: 0 }}
                          >
                            <span
                              className="accordion-anatomy-pin__dot"
                              onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 4 ? null : 4); }}
                              onMouseEnter={() => setHoveredElement(4)}
                            >
                              4
                            </span>
                            <span className="accordion-anatomy-pin__stem" style={{ height: 32 }} />
                          </div>

                          <Star size={24} fill="none" stroke="var(--color-border-subtle, #cbd5e1)" />
                        </div>
                      </div>

                      {/* Zone 5: Numeric Score Badge */}
                      <div
                        className={`accordion-anatomy-zone ${activeElement === 5 ? 'is-active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 5 ? null : 5); }}
                        onMouseEnter={() => setHoveredElement(5)}
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                        title={isId ? '5. Badge Nilai Angka' : '5. Numeric Score Badge'}
                      >
                        {/* PIN 5: Stem 32px pointing straight up from below */}
                        <div
                          className={`accordion-anatomy-pin accordion-anatomy-pin--bottom ${activeElement === 5 ? 'is-active' : ''}`}
                          style={{ left: '50%', bottom: 0 }}
                        >
                          <span className="accordion-anatomy-pin__stem" style={{ height: 32 }} />
                          <span
                            className="accordion-anatomy-pin__dot"
                            onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 5 ? null : 5); }}
                            onMouseEnter={() => setHoveredElement(5)}
                          >
                            5
                          </span>
                        </div>

                        <span
                          className="neuron-rating__value-badge"
                          style={{
                            fontWeight: 700,
                            fontSize: '15px',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-mono, monospace)',
                          }}
                        >
                          3.5
                        </span>
                      </div>

                      {/* Zone 6: Dynamic Feedback Label */}
                      <div
                        className={`accordion-anatomy-zone ${activeElement === 6 ? 'is-active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 6 ? null : 6); }}
                        onMouseEnter={() => setHoveredElement(6)}
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                        title={isId ? '6. Label Feedback Dinamis' : '6. Dynamic Feedback Label'}
                      >
                        {/* PIN 6: Stem 32px pointing straight up from below */}
                        <div
                          className={`accordion-anatomy-pin accordion-anatomy-pin--bottom ${activeElement === 6 ? 'is-active' : ''}`}
                          style={{ left: '50%', bottom: 0 }}
                        >
                          <span className="accordion-anatomy-pin__stem" style={{ height: 32 }} />
                          <span
                            className="accordion-anatomy-pin__dot"
                            onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 6 ? null : 6); }}
                            onMouseEnter={() => setHoveredElement(6)}
                          >
                            6
                          </span>
                        </div>

                        <span
                          className="neuron-rating__feedback-label"
                          style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#d97706',
                          }}
                        >
                          {isId ? 'Cukup Baik' : 'Good'}
                        </span>
                      </div>

                      {/* Zone 7: Total Review Counter */}
                      <div
                        className={`accordion-anatomy-zone ${activeElement === 7 ? 'is-active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 7 ? null : 7); }}
                        onMouseEnter={() => setHoveredElement(7)}
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                        title={isId ? '7. Penghitung Total Ulasan' : '7. Total Review Counter'}
                      >
                        {/* PIN 7: Stem 32px pointing straight up from below */}
                        <div
                          className={`accordion-anatomy-pin accordion-anatomy-pin--bottom ${activeElement === 7 ? 'is-active' : ''}`}
                          style={{ left: '50%', bottom: 0 }}
                        >
                          <span className="accordion-anatomy-pin__stem" style={{ height: 32 }} />
                          <span
                            className="accordion-anatomy-pin__dot"
                            onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 7 ? null : 7); }}
                            onMouseEnter={() => setHoveredElement(7)}
                          >
                            7
                          </span>
                        </div>

                        <span
                          className="neuron-rating__count"
                          style={{
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          (2,840)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Stage Footer: Zero Layout Shift Live Inspector ── */}
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
                      {/* Left: ID, Name, Category, Description */}
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
                            background: 'var(--color-primary)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 11.5,
                            fontWeight: 700,
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
                          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 12, margin: '0 2px', flexShrink: 0 }}>
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

                      {/* Right: CSS Token with Copy Button & W3C pill */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '3px 9px',
                            borderRadius: 'var(--radius-md, 6px)',
                            background: 'var(--color-bg-subtle)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <code style={{ fontSize: 11, color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>
                            {activeItem.token}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyToken(activeItem.token)}
                            title={isId ? 'Salin selector CSS' : 'Copy CSS selector'}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              color: copiedToken === activeItem.token ? 'var(--color-success, #10b981)' : 'var(--color-text-tertiary)',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {copiedToken === activeItem.token ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>

                        <div
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-md, 6px)',
                            background: 'var(--color-bg-subtle)',
                            border: '1px solid var(--color-border)',
                            fontSize: 11,
                            fontFamily: 'monospace',
                            color: 'var(--color-primary)',
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
                        <Info size={15} color="var(--color-primary)" style={{ flexShrink: 0 }} />
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
                            ? 'Arahkan kursor atau klik pin di atas untuk memeriksa token CSS dan spesifikasi komponen.'
                            : 'Hover or click pins above to inspect CSS tokens and component specifications.'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                        {anatomyElements.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedElement(item.id)}
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

              {/* ── 7 Structured Element Cards Grid ── */}
              <div className="accordion-anatomy-grid">
                {anatomyElements.map((item) => {
                  const isSelected = activeElement === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`accordion-anatomy-card ${isSelected ? 'is-active' : ''}`}
                      onClick={() => setSelectedElement(selectedElement === item.id ? null : item.id)}
                      onMouseEnter={() => setHoveredElement(item.id)}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                background: isSelected ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                                color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                                fontSize: 11,
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease',
                                boxShadow: isSelected ? '0 2px 6px rgba(178, 94, 64, 0.35)' : 'none',
                                flexShrink: 0,
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
                        <code style={{ fontSize: 11, color: 'var(--color-primary)', fontWeight: 600 }}>
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
            </div>
          );
        })()}
      </div>

      {/* 3. Icon Metaphors & Styles Gallery */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '3. Galeri Ragam Metafora Ikon' : '3. Icon Metaphors & Styles'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronRating menyediakan berbagai metafora visual untuk menyesuaikan konteks sentimen aplikasi.'
            : 'NeuronRating supports various icon styles to align with different application sentiments and domains.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          {/* Preset 1: Golden Star */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                {isId ? 'Bintang Klasik (Golden Star)' : 'Classic Star'}
              </span>
              <NeuronBadge size="sm" variant="brand">E-Commerce</NeuronBadge>
            </div>
            <div style={{ margin: '14px 0' }}>
              <NeuronRating defaultValue={4.5} allowHalf size="md" variant="amber" showValue count={1820} />
            </div>
            <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Standar de facto untuk ulasan e-commerce, rating hotel, dan reputasi driver.' : 'Industry standard for marketplace products, hotel ratings, and merchant reputation.'}
            </p>
          </div>

          {/* Preset 2: Heart / Favorite */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                {isId ? 'Hati / Favorit (Heart)' : 'Heart Favorites'}
              </span>
              <NeuronBadge size="sm" variant="gray">Social & Media</NeuronBadge>
            </div>
            <div style={{ margin: '14px 0' }}>
              <NeuronRating defaultValue={5} max={5} icon="heart" size="md" variant="red" showValue valueFormat={(v, m) => `${v}/${m} Cinta`} />
            </div>
            <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Cocok untuk kurasi konten, artikel blog, playlist musik, dan bookmark favorit.' : 'Ideal for content curation, saved playlists, creator support, and bookmarking.'}
            </p>
          </div>

          {/* Preset 3: Thumbs Up */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                {isId ? 'Rekomendasi (Thumbs)' : 'Recommendation Thumbs'}
              </span>
              <NeuronBadge size="sm" variant="gray">Help Center</NeuronBadge>
            </div>
            <div style={{ margin: '14px 0' }}>
              <NeuronRating defaultValue={4} icon="thumb" size="md" variant="blue" showValue />
            </div>
            <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Digunakan untuk artikel dokumentasi, FAQ, dan umpan balik kelayakan fitur.' : 'Used for knowledge base articles, FAQ helpfulness, and feature voting.'}
            </p>
          </div>

          {/* Preset 4: CSAT Mood Smileys */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-sm)' }}>
                {isId ? 'Sentimen CSAT (Smileys)' : 'CSAT Sentiment Moods'}
              </span>
              <NeuronBadge size="sm" variant="brand">Surveys</NeuronBadge>
            </div>
            <div style={{ margin: '14px 0' }}>
              <NeuronRating
                defaultValue={4}
                icon="smile"
                size="md"
                variant="emerald"
                highlightSelectedOnly
                showLabel
                labels={['Sangat Buruk', 'Buruk', 'Cukup', 'Puas', 'Sangat Puas']}
              />
            </div>
            <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Menyorot hanya emotikon aktif terpilih untuk survei Customer Satisfaction (CSAT).' : 'Highlights only the active selected mood for Customer Satisfaction (CSAT) surveys.'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Sizing Matrix (SM, MD, LG, XL) */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '4. Matriks Ukuran & Target Sentuh' : '4. Size Matrix & Touch Targets'}
        </h2>
        <p className="section-description">
          {isId
            ? 'Empat skala ukuran responsif untuk menjamin keterbacaan proporsional dan kemudahan interaksi di semua resolusi layar.'
            : 'Four responsive sizing scales ensuring ergonomic tap targets and proportional legibility across display sizes.'}
        </p>

        {/* Stage Focus Selector (Segmented Control) */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          marginTop: 'var(--space-6)',
          marginBottom: 'var(--space-4)',
          background: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '100%',
          overflowX: 'auto',
        }}>
          {SIZE_PROFILES.map(prof => {
            const isActive = activeSizeStage === prof.id;
            return (
              <button
                key={prof.id}
                type="button"
                onClick={() => setActiveSizeStage(prof.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                  background: isActive ? 'var(--color-bg-surface)' : 'transparent',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{prof.label}</span>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--color-primary-light)' : 'color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                  fontWeight: 600,
                }}>
                  {prof.iconPx}px
                </span>
              </button>
            );
          })}
        </div>

        {/* Focused Size Display Card */}
        {(() => {
          const currentProf = SIZE_PROFILES.find(p => p.id === activeSizeStage) || SIZE_PROFILES[1];
          return (
            <div style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}>
              {/* Card Header with aligned Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {currentProf.label} — {currentProf.iconPx}×{currentProf.iconPx}px Icon Glyph
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {isId ? currentProf.desc.id : currentProf.desc.en}
                  </p>
                </div>
                <NeuronBadge size="sm" variant="brand">
                  {isId ? `Target Sentuh: ${currentProf.touchTarget}` : `Touch Target: ${currentProf.touchTarget}`}
                </NeuronBadge>
              </div>

              {/* Interactive Demo Area */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.04))',
              }}>
                <NeuronRating
                  value={stageRatingVal}
                  onChange={setStageRatingVal}
                  allowHalf
                  size={currentProf.id}
                  variant="amber"
                  showValue
                  showLabel
                  count={4120}
                  labels={{
                    1: isId ? 'Mengecewakan' : 'Poor',
                    2: isId ? 'Cukup' : 'Fair',
                    3: isId ? 'Bagus' : 'Good',
                    4: isId ? 'Sangat Baik' : 'Very Good',
                    5: isId ? 'Sempurna' : 'Excellent',
                  }}
                />
                <span style={{
                  fontSize: '12px',
                  color: 'var(--color-text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <Info size={13} />
                  {isId
                    ? 'Klik atau arahkan kursor untuk menguji interaktivitas ukuran ini'
                    : 'Click or hover stars to test interactive feedback at this scale'}
                </span>
              </div>

              {/* Quick Spec Metrics Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 'var(--space-3)',
              }}>
                <div style={{
                  background: 'var(--color-bg-surface)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ color: 'var(--color-text-tertiary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px', fontWeight: 600 }}>
                    {isId ? 'Ukuran Ikon' : 'Icon Size'}
                  </div>
                  <strong style={{ color: 'var(--color-text-primary)', fontSize: '13px' }}>{currentProf.iconPx}×{currentProf.iconPx}px</strong>
                </div>
                <div style={{
                  background: 'var(--color-bg-surface)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ color: 'var(--color-text-tertiary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px', fontWeight: 600 }}>
                    {isId ? 'Jarak Bintang' : 'Item Spacing'}
                  </div>
                  <strong style={{ color: 'var(--color-text-primary)', fontSize: '13px' }}>{currentProf.gapPx}px</strong>
                </div>
                <div style={{
                  background: 'var(--color-bg-surface)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ color: 'var(--color-text-tertiary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px', fontWeight: 600 }}>
                    {isId ? 'Ukuran Tipografi' : 'Typography'}
                  </div>
                  <strong style={{ color: 'var(--color-text-primary)', fontSize: '13px' }}>{currentProf.fontPx}px</strong>
                </div>
                <div style={{
                  background: 'var(--color-bg-surface)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ color: 'var(--color-text-tertiary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px', fontWeight: 600 }}>
                    {isId ? 'Target Sentuh' : 'Touch Target'}
                  </div>
                  <strong style={{ color: 'var(--color-text-primary)', fontSize: '13px' }}>{currentProf.touchTarget}</strong>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Technical Comparison Table */}
        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>{isId ? 'Token Ukuran' : 'Size Token'}</th>
                <th>{isId ? 'Ukuran Ikon' : 'Icon Size'}</th>
                <th>{isId ? 'Jarak (Gap)' : 'Gap Spacing'}</th>
                <th>{isId ? 'Tipografi' : 'Typography'}</th>
                <th>{isId ? 'Target Sentuh Minimum' : 'Touch Target'}</th>
                <th>{isId ? 'Rekomendasi Penggunaan' : 'Recommended Use Case'}</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_PROFILES.map(p => {
                const isSelected = activeSizeStage === p.id;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setActiveSizeStage(p.id)}
                    style={{
                      cursor: 'pointer',
                      background: isSelected ? 'color-mix(in srgb, var(--color-primary) 6%, var(--color-bg-surface))' : undefined,
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <code>size="{p.id}"</code>
                        {isSelected && (
                          <NeuronBadge size="sm" variant="brand">
                            {isId ? 'Aktif' : 'Active'}
                          </NeuronBadge>
                        )}
                      </div>
                    </td>
                    <td><code className="api-type-code">{p.iconPx}px</code></td>
                    <td><code className="api-type-code">{p.gapPx}px</code></td>
                    <td><code className="api-type-code">{p.fontPx}px</code></td>
                    <td>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        {p.touchTarget}
                      </span>
                    </td>
                    <td style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {isId ? p.useCase.id : p.useCase.en}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Precision & Fractional Calculations */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '5. Presisi & Perhitungan Fraksi Bintang' : '5. Precision & Fractional Steps'}
        </h2>
        <p className="section-description">
          {isId
            ? 'NeuronRating memisahkan presisi untuk interaksi input pengguna (langkah 1.0 atau 0.5) dan display agregasi analitik (desimal arbitrer seperti 4.3 atau 4.75).'
            : 'NeuronRating separates user input precision (1.0 or 0.5 steps) from aggregate analytic display scores (arbitrary decimals like 4.3 or 4.75).'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          {/* Integer */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700 }}>
              {isId ? 'Langkah Penuh (Integer: precision={1})' : 'Whole Step (Integer: precision={1})'}
            </h4>
            <NeuronRating defaultValue={4} precision={1} size="md" showValue />
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '10px' }}>
              {isId ? 'Formulir survei cepat saat pengguna hanya perlu memilih 1 hingga 5 bintang bulat.' : 'Quick surveys where users simply pick whole numbers from 1 to 5.'}
            </p>
          </div>

          {/* Half Step */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700 }}>
              {isId ? 'Setengah Bintang (allowHalf / precision={0.5})' : 'Half Step (allowHalf / precision={0.5})'}
            </h4>
            <NeuronRating defaultValue={3.5} allowHalf size="md" showValue />
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '10px' }}>
              {isId ? 'Memberi fleksibilitas lebih granular bagi pengguna yang merasa nilainya di antara 3 dan 4.' : 'Gives granular flexibility for reviewers feeling between good and great.'}
            </p>
          </div>

          {/* Fractional Decimal */}
          <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 700 }}>
              {isId ? 'Desimal Agregasi (Read-only: value={4.72})' : 'Aggregate Decimal (Read-only: value={4.72})'}
            </h4>
            <NeuronRating value={4.72} readOnly size="md" showValue count={948} />
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '10px' }}>
              {isId ? 'Kliping SVG horizontal menampilkan persis 72% pada bintang kelima secara matematis.' : 'Horizontal SVG clipping renders exact 72% fill on the 5th star.'}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Best Practices (Paired Do's & Don'ts) */}
      <div className="section-card">
        <h2 className="section-title">
          {isId ? '6. Praktik Terbaik (Do\'s & Don\'ts)' : '6. Best Practices (Do\'s & Don\'ts)'}
        </h2>
        <p className="section-description">
          {isId
            ? '6 pasang panduan praktis untuk memastikan rating mudah digunakan, etis, dan komunikatif.'
            : '6 paired guidelines to ensure ratings are ergonomic, honest, and communicative.'}
        </p>

        {/* Pair 1: Total Stars Count */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={4} max={5} size="md" variant="amber" showValue />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Gunakan skala 5 bintang standar' : 'Use standard 5-star scales'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Skala 5 bintang sudah menjadi standar mental umum bagi pengguna digital di seluruh dunia.' : 'A 5-star scale matches global mental models, making evaluation immediate and intuitive.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={14} max={20} size="sm" variant="gray" />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Jangan gunakan terlalu banyak bintang (>10)' : 'Avoid overly long star rows (>10)'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Deretan 20 bintang membingungkan pengguna dan menyulitkan penghitungan visual sekilas.' : 'Showing 15 or 20 stars causes cognitive fatigue and makes visual counting tedious.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 2: Clear Verbal Labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={5} size="md" variant="amber" showLabel labels={{ 5: 'Luar Biasa' }} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Sertakan label teks predikat ulasan' : 'Provide descriptive text labels'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Label seperti "Sangat Baik" atau "Mengecewakan" menepis keraguan makna setiap tingkat bintang.' : 'Labels like "Great" or "Poor" eliminate ambiguity about what each star count represents.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={2} size="md" variant="amber" />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Jangan biarkan arti bintang tanpa konteks' : 'Avoid unlabeled ambiguous rating forms'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Tanpa label pada formulir kritik, sebagian pengguna bingung apakah bintang 1 berarti terbaik atau terburuk.' : 'In survey contexts, unlabeled stars leave users wondering if 1 is top rank or lowest score.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 3: Semantic Coloring */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={5} size="md" variant="amber" showValue />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Gunakan warna kuning/emas untuk bintang' : 'Use warm amber/gold for star ratings'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Warna kuning keemasan (#f59e0b) diasosiasikan kuat dengan penghargaan dan kualitas bintang.' : 'Warm golden amber (#f59e0b) universally signifies quality awards and high distinction.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={5} size="md" variant="red" showValue />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Hindari warna merah bahaya untuk bintang positif' : 'Don\'t use error red for positive stars'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Bintang berwarna merah menyala mengirimkan sinyal bahaya atau peringatan yang membingungkan.' : 'Bright red stars trigger error/warning associations, confusing positive ratings.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 4: Read-Only vs Interactive */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronRating value={4.8} readOnly size="sm" showValue count={920} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Tandai readOnly pada katalog produk' : 'Set readOnly on showcase catalog cards'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Beri indikasi visual skor agregat serta jumlah suara ulasan pembeli terverifikasi.' : 'Display aggregated community score with review counts without false click affordances.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={4.8} size="sm" showValue />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Jangan biarkan kartu katalog bereaksi klik palsu' : 'Don\'t leave catalog ratings clickable without action'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Jika bintang bisa diklik tetapi tidak menyimpan rating, pengguna akan merasa antarmuka rusak.' : 'Clickable rating stars in a product list that do not persist input feel broken to users.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 5: Touch Targets on Mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={4} size="lg" variant="amber" />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Gunakan size="lg" atau "xl" untuk formulir mobile' : 'Use size="lg" or "xl" for mobile touch forms'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Ukuran glif 30–38px memastikan jempol pengguna dapat menekan bintang dengan akurat.' : 'Glyphs sized 30–38px provide ergonomic tap targets matching human thumb dimensions.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={3} size="sm" variant="amber" />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Jangan gunakan size="sm" sebagai input utama' : 'Don\'t use size="sm" for primary interactive inputs'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Bintang 16px sangat sulit ditekan di layar sentuh ponsel dan sering menghasilkan salah klik.' : 'Tiny 16px stars are frustrating to tap on touchscreens, causing mis-clicks.'}
              </div>
            </div>
          </RuleCard>
        </div>

        {/* Pair 6: Moods & Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
          <RuleCard type="do">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={4} icon="smile" variant="emerald" highlightSelectedOnly showLabel labels={['1', '2', '3', 'Puas', '5']} />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Gunakan highlightSelectedOnly untuk emotikon CSAT' : 'Use highlightSelectedOnly for mood smileys'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Hanya wajah yang dipilih yang menyala, karena wajah sedih dan tersenyum tidak bersifat kumulatif.' : 'Only the chosen face lights up, since emotional faces are mutually exclusive, not cumulative.'}
              </div>
            </div>
          </RuleCard>

          <RuleCard type="dont">
            <div className="rule-card__preview">
              <NeuronRating defaultValue={4} icon="smile" variant="amber" />
            </div>
            <div className="rule-card__text">
              <div className="rule-card__title">
                {isId ? 'Jangan warnai semua wajah sebelumnya' : 'Don\'t fill preceding faces cumulatively'}
              </div>
              <div className="rule-card__desc">
                {isId ? 'Mengisi 4 emotikon senyum sekaligus membingungkan makna survei kepuasan pelanggan.' : 'Lighting 4 smileys simultaneously contradicts the intended single-mood choice.'}
              </div>
            </div>
          </RuleCard>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // TAB 2: PLAYBOOK
  // ─────────────────────────────────────────────────────────────────────────
  const renderPlaybook = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
      {/* 1. Interactive Playground */}
      <section>
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
                  ? 'Konfigurasikan seluruh properti NeuronRating secara real-time dan salin kode JSX siap pakai.'
                  : 'Customize all NeuronRating properties in real-time with instant visual feedback and copy ready code.'}
              </p>
            </div>
          </div>
          <NeuronBadge size="sm" variant="brand">Live Component</NeuronBadge>
        </div>

        {/* Playground Container Card */}
        <div className="section-card" style={{ padding: 'var(--space-6)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 420px) minmax(320px, 1fr)',
            gap: 'var(--space-6)',
            alignItems: 'start',
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
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* Controls Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={14} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {isId ? 'Konfigurasi Rating' : 'Rating Controls'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetPlayground}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '4px 8px', fontSize: '11px', fontWeight: 'var(--font-weight-medium)',
                    background: 'transparent', color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                  }}
                >
                  <RotateCcw size={11} /> {isId ? 'Reset' : 'Reset All'}
                </button>
              </div>

              {/* 1. Icon Metaphor */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  {isId ? '1. Metafora Ikon' : '1. Icon Metaphor'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {([
                    { id: 'star', label: 'Star', icon: <Star size={13} /> },
                    { id: 'heart', label: 'Heart', icon: <Heart size={13} /> },
                    { id: 'thumb', label: 'Thumb', icon: <ThumbsUp size={13} /> },
                    { id: 'smile', label: 'Smile', icon: <Smile size={13} /> },
                  ] as { id: NeuronRatingIconType; label: string; icon: ReactNode }[]).map(ic => {
                    const active = pgIcon === ic.id;
                    return (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setPgIcon(ic.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                          padding: '7px 8px', fontSize: '12px', fontWeight: active ? 700 : 500,
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        {ic.icon}
                        <span>{ic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Scale & Sizing */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  {isId ? '2. Skala Ukuran' : '2. Canvas Size'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {(['sm', 'md', 'lg', 'xl'] as NeuronRatingSize[]).map(sz => {
                    const active = pgSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setPgSize(sz)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          padding: '6px 4px', fontSize: '12px',
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontWeight: active ? 700 : 600 }}>{sz.toUpperCase()}</span>
                        <span style={{ fontSize: '10px', opacity: 0.75 }}>
                          {sz === 'sm' ? '16px' : sz === 'md' ? '22px' : sz === 'lg' ? '30px' : '38px'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Color Theme Palette */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  {isId ? '3. Tema Warna' : '3. Color Theme'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {([
                    { id: 'amber', label: 'Amber', color: '#f59e0b' },
                    { id: 'brand', label: 'Brand', color: '#f97316' },
                    { id: 'red', label: 'Red', color: '#ef4444' },
                    { id: 'emerald', label: 'Emerald', color: '#10b981' },
                    { id: 'purple', label: 'Purple', color: '#a855f7' },
                    { id: 'blue', label: 'Blue', color: '#3b82f6' },
                    { id: 'yellow', label: 'Yellow', color: '#eab308' },
                    { id: 'gray', label: 'Gray', color: '#64748b' },
                  ] as { id: NeuronRatingVariant; label: string; color: string }[]).map(c => {
                    const active = pgVariant === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setPgVariant(c.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '6px 8px', fontSize: '11px', fontWeight: active ? 700 : 500,
                          border: '1px solid', borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                          background: active ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
                        <span>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Precision & Max Items */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                    {isId ? 'Presisi Step' : 'Precision Step'}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {[
                      { val: 1, label: '1.0 (Full)' },
                      { val: 0.5, label: '0.5 (Half)' },
                    ].map(p => (
                      <button
                        key={p.val}
                        type="button"
                        onClick={() => setPgPrecision(p.val)}
                        style={{
                          padding: '6px 8px', fontSize: '12px', fontWeight: pgPrecision === p.val ? 700 : 500,
                          border: '1px solid', borderColor: pgPrecision === p.val ? 'var(--color-primary)' : 'var(--color-border)',
                          background: pgPrecision === p.val ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: pgPrecision === p.val ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                    {isId ? 'Maksimal Item' : 'Max Items'}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {[5, 10].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setPgMax(m);
                          if (pgValue > m) setPgValue(m);
                        }}
                        style={{
                          padding: '6px 8px', fontSize: '12px', fontWeight: pgMax === m ? 700 : 500,
                          border: '1px solid', borderColor: pgMax === m ? 'var(--color-primary)' : 'var(--color-border)',
                          background: pgMax === m ? 'var(--color-primary-light)' : 'var(--color-bg-surface)',
                          color: pgMax === m ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                        }}
                      >
                        {m} Items
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Features & Flags */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                  {isId ? '5. Opsi & Fitur Tampilan' : '5. Display Options & Flags'}
                </label>
                <div style={{
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-3)',
                }}>
                  <NeuronCheckbox size="sm" checked={pgShowValue} onChange={setPgShowValue} label={isId ? 'Tampilkan Nilai' : 'Show Value'} />
                  <NeuronCheckbox size="sm" checked={pgShowLabel} onChange={setPgShowLabel} label={isId ? 'Label Predikat' : 'Show Label'} />
                  <NeuronCheckbox size="sm" checked={pgShowCount} onChange={setPgShowCount} label={isId ? 'Total Ulasan' : 'Review Count'} />
                  <NeuronCheckbox size="sm" checked={pgClearable} onChange={setPgClearable} label={isId ? 'Dapat Direset' : 'Clearable'} />
                  <NeuronCheckbox size="sm" checked={pgReadOnly} onChange={setPgReadOnly} label="Read Only" />
                  <NeuronCheckbox size="sm" checked={pgDisabled} onChange={setPgDisabled} label="Disabled" />
                  <NeuronCheckbox size="sm" checked={pgHighlightSelectedOnly} onChange={setPgHighlightSelectedOnly} label={isId ? 'Hanya Pilihan' : 'Selected Only'} />
                </div>
              </div>
            </div>

            {/* Right: Live Canvas Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%' }}>
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
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
                  gap: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Kanvas Pratinjau Interaktif' : 'Live Interactive Canvas'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <NeuronBadge size="sm" variant="brand">{pgIcon.toUpperCase()}</NeuronBadge>
                    <NeuronBadge size="sm" variant="gray">{pgSize.toUpperCase()}</NeuronBadge>
                    <NeuronBadge size="sm" variant="outline">{pgVariant}</NeuronBadge>
                  </div>
                </div>

                {/* Canvas Center Stage */}
                <div style={{
                  padding: 'var(--space-8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '340px',
                  background: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  overflowX: 'auto',
                  flex: 1,
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minWidth: pgMax === 10
                      ? (pgSize === 'xl' ? '700px' : pgSize === 'lg' ? '580px' : '480px')
                      : (pgSize === 'xl' ? '460px' : '360px'),
                    transition: 'min-width 0.2s ease',
                  }}>
                    <NeuronRating
                      value={pgValue}
                      onChange={setPgValue}
                      max={pgMax}
                      size={pgSize}
                      variant={pgVariant}
                      icon={pgIcon}
                      precision={pgPrecision}
                      readOnly={pgReadOnly}
                      disabled={pgDisabled}
                      clearable={pgClearable}
                      showValue={pgShowValue}
                      showLabel={pgShowLabel}
                      count={pgShowCount ? 1420 : undefined}
                      highlightSelectedOnly={pgHighlightSelectedOnly}
                      labels={pgMax === 10 ? {
                        1: isId ? RATING_FEEDBACK_LABELS_10[1].id : RATING_FEEDBACK_LABELS_10[1].en,
                        2: isId ? RATING_FEEDBACK_LABELS_10[2].id : RATING_FEEDBACK_LABELS_10[2].en,
                        3: isId ? RATING_FEEDBACK_LABELS_10[3].id : RATING_FEEDBACK_LABELS_10[3].en,
                        4: isId ? RATING_FEEDBACK_LABELS_10[4].id : RATING_FEEDBACK_LABELS_10[4].en,
                        5: isId ? RATING_FEEDBACK_LABELS_10[5].id : RATING_FEEDBACK_LABELS_10[5].en,
                        6: isId ? RATING_FEEDBACK_LABELS_10[6].id : RATING_FEEDBACK_LABELS_10[6].en,
                        7: isId ? RATING_FEEDBACK_LABELS_10[7].id : RATING_FEEDBACK_LABELS_10[7].en,
                        8: isId ? RATING_FEEDBACK_LABELS_10[8].id : RATING_FEEDBACK_LABELS_10[8].en,
                        9: isId ? RATING_FEEDBACK_LABELS_10[9].id : RATING_FEEDBACK_LABELS_10[9].en,
                        10: isId ? RATING_FEEDBACK_LABELS_10[10].id : RATING_FEEDBACK_LABELS_10[10].en,
                      } : {
                        1: isId ? RATING_FEEDBACK_LABELS[1].id : RATING_FEEDBACK_LABELS[1].en,
                        2: isId ? RATING_FEEDBACK_LABELS[2].id : RATING_FEEDBACK_LABELS[2].en,
                        3: isId ? RATING_FEEDBACK_LABELS[3].id : RATING_FEEDBACK_LABELS[3].en,
                        4: isId ? RATING_FEEDBACK_LABELS[4].id : RATING_FEEDBACK_LABELS[4].en,
                        5: isId ? RATING_FEEDBACK_LABELS[5].id : RATING_FEEDBACK_LABELS[5].en,
                      }}
                    />
                  </div>
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
                  color: 'var(--color-text-secondary)',
                }}>
                  <span>
                    {isId ? `Nilai saat ini: ${pgValue} / ${pgMax}` : `Current score: ${pgValue} / ${pgMax}`}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={11} style={{ color: 'var(--color-primary)' }} />
                    Interactive SVG • WCAG Compliant
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
            boxShadow: 'var(--shadow-md)',
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
              gap: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setPgCodeTab('react')}
                    style={{
                      padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                      borderRadius: 'var(--radius-sm)', border: 'none',
                      background: pgCodeTab === 'react' ? 'var(--color-primary)' : 'transparent',
                      color: pgCodeTab === 'react' ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer', transition: 'all 0.15s ease',
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
                      cursor: 'pointer', transition: 'all 0.15s ease',
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
                      cursor: 'pointer', transition: 'all 0.15s ease',
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
                      cursor: 'pointer', transition: 'all 0.15s ease',
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
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.15s ease',
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
              background: 'transparent',
            }}>
              {generateCode()}
            </pre>
          </div>
        </div>
      </section>

      {/* 2. Real-World Use Cases & Production Patterns */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? '2. Pola Penerapan Nyata (Production Patterns)' : '2. Production Patterns & Real-World Use Cases'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {isId
            ? 'Pola implementasi siap pakai untuk berbagai skenario aplikasi modern.'
            : 'Production-ready patterns illustrating typical review journeys in modern apps.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Pattern 1: E-Commerce Product Rating Card */}
          <div className="section-card" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                  {isId ? 'Pola 1: Ulasan Produk & Distribusi Rating E-Commerce' : 'Pattern 1: E-Commerce Rating Summary & Breakdown'}
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Menampilkan rerata skor ulasan pembeli beserta grafik sebaran bintang 1–5.' : 'Displays average community score alongside 1–5 star distribution progress bars.'}
                </p>
              </div>
              <NeuronBadge size="sm" variant="brand">E-Commerce</NeuronBadge>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 280px) 1fr',
              gap: 'var(--space-6)',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              alignItems: 'center',
            }}>
              {/* Left Score Box */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--space-4)',
                borderRight: '1px solid var(--color-border)',
              }}>
                <span style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1, color: 'var(--color-text-primary)' }}>
                  {productRating}
                </span>
                <div style={{ margin: '10px 0' }}>
                  <NeuronRating value={productRating} readOnly size="md" variant="amber" />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  {isId ? 'Berdasarkan 3,428 ulasan pembeli' : 'Based on 3,428 buyer reviews'}
                </span>
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} /> {isId ? '98% Pembeli Merekomendasikan' : '98% Customers Recommend'}
                </span>
              </div>

              {/* Right Breakdown Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { star: 5, pct: 76, count: 2605 },
                  { star: 4, pct: 15, count: 514 },
                  { star: 3, pct: 6, count: 205 },
                  { star: 2, pct: 2, count: 68 },
                  { star: 1, pct: 1, count: 36 },
                ].map(row => (
                  <div key={row.star} className="rating-breakdown-bar">
                    <span style={{ width: '42px', fontWeight: 600 }}>{row.star} ★</span>
                    <div className="rating-breakdown-bar__track">
                      <div className="rating-breakdown-bar__fill" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span style={{ width: '38px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{row.pct}%</span>
                    <span style={{ width: '50px', textAlign: 'right', color: 'var(--color-text-tertiary)', fontSize: '11px' }}>({row.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pattern 2: Interactive Service Review Card */}
          <div className="section-card" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                  {isId ? 'Pola 2: Dialog Penilaian Layanan & Kurir Interaktif' : 'Pattern 2: Interactive Service Delivery Rating Form'}
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pengalaman memberi penilaian cepat dengan bintang, tag chip, dan ucapan terima kasih.' : 'Quick review submission with interactive stars, tag chips, and instant submission state.'}
                </p>
              </div>
              <NeuronBadge size="sm" variant="gray">Feedback Dialog</NeuronBadge>
            </div>

            <div style={{
              maxWidth: '560px',
              margin: '0 auto',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-md)',
            }}>
              {reviewSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%', background: 'var(--color-success-light)',
                    color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '12px',
                  }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700 }}>
                    {isId ? 'Terima Kasih Atas Ulasan Anda!' : 'Thank You for Your Feedback!'}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>
                    {isId ? 'Ulasan Anda sangat berarti untuk membantu kami menjaga kualitas layanan.' : 'Your rating helps us continuously improve our service quality.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setReviewSubmitted(false)}
                    style={{
                      padding: '6px 16px', fontSize: '12px', fontWeight: 600,
                      borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {isId ? 'Beri Nilai Lain' : 'Submit Another Rating'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
                      {isId ? 'Pesanan #ND-9842 Selesai' : 'Order #ND-9842 Delivered'}
                    </div>
                    <h4 style={{ margin: '6px 0 2px 0', fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Bagaimana Pengalaman Pengiriman Anda?' : 'How Was Your Delivery Experience?'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                      Kurir: <strong>Budi Hartanto</strong> (Honda Vario • B 4821 KLA)
                    </p>
                  </div>

                  {/* Stars input */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
                    <NeuronRating
                      value={serviceRating}
                      onChange={setServiceRating}
                      size="xl"
                      variant="amber"
                      showLabel
                      labelPosition="bottom"
                      labels={{
                        1: isId ? 'Mengecewakan' : 'Terrible',
                        2: isId ? 'Kurang Memuaskan' : 'Disappointing',
                        3: isId ? 'Cukup Saja' : 'Average',
                        4: isId ? 'Bagus & Cepat' : 'Very Good',
                        5: isId ? 'Luar Biasa Memuaskan!' : 'Outstanding Service!',
                      }}
                    />
                  </div>

                  {/* Quick Tag Chips */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px' }}>
                      {isId ? 'Pilih hal yang Anda sukai:' : 'What went well?'}
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {[
                        'Tepat Waktu',
                        'Kurir Ramah',
                        'Packing Aman',
                        'Barang Sesuai',
                        'Komunikasi Jelas',
                      ].map(tag => {
                        const active = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setSelectedTags(prev =>
                                active ? prev.filter(t => t !== tag) : [...prev, tag]
                              );
                            }}
                            style={{
                              padding: '5px 12px', fontSize: '12px', fontWeight: 500,
                              borderRadius: 'var(--radius-full)', border: '1px solid',
                              borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                              background: active ? 'var(--color-primary-light)' : 'var(--color-bg-subtle)',
                              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                              cursor: 'pointer', transition: 'all 0.15s ease',
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={() => setReviewSubmitted(true)}
                    style={{
                      marginTop: '6px',
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: 700,
                      background: 'var(--color-primary)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)',
                    }}
                  >
                    {isId ? 'Kirim Ulasan Bintang' : 'Submit Review'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. API Reference & Props Specifications */}
      <section>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
          {isId ? '3. Referensi Properti API (Props Reference)' : '3. API & Props Specification'}
        </h2>
        <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {isId
            ? 'Dokumentasi lengkap interface TypeScript untuk komponen NeuronRating.'
            : 'Comprehensive TypeScript interface specification for NeuronRating component.'}
        </p>

        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>value</code></td>
                <td><code>number</code></td>
                <td><code>undefined</code></td>
                <td>Controlled rating value supporting whole numbers or floating fractions (e.g. 4.5).</td>
              </tr>
              <tr>
                <td><code>defaultValue</code></td>
                <td><code>number</code></td>
                <td><code>0</code></td>
                <td>Initial rating value for uncontrolled state.</td>
              </tr>
              <tr>
                <td><code>onChange</code></td>
                <td><code>(value: number) =&gt; void</code></td>
                <td><code>-</code></td>
                <td>Callback triggered on click or keyboard change.</td>
              </tr>
              <tr>
                <td><code>max</code></td>
                <td><code>number</code></td>
                <td><code>5</code></td>
                <td>Total count of rating items displayed.</td>
              </tr>
              <tr>
                <td><code>precision</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>Granular step size: 1 for integer stars, 0.5 for half stars.</td>
              </tr>
              <tr>
                <td><code>allowHalf</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Shortcut alias setting precision to 0.5.</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'sm' | 'md' | 'lg' | 'xl'</code></td>
                <td><code>'md'</code></td>
                <td>Icon dimension: sm (16px), md (22px), lg (30px), xl (38px).</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>'brand' | 'amber' | 'yellow' | 'red' | 'purple' | 'blue' | 'emerald' | 'gray'</code></td>
                <td><code>'amber'</code></td>
                <td>Semantic active fill color palette.</td>
              </tr>
              <tr>
                <td><code>icon</code></td>
                <td><code>'star' | 'heart' | 'thumb' | 'smile' | ReactNode</code></td>
                <td><code>'star'</code></td>
                <td>Icon metaphor preset or custom glyph node.</td>
              </tr>
              <tr>
                <td><code>readOnly</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disables all hover and click interactions for display-only badges.</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Renders grayed-out state with disabled pointer events.</td>
              </tr>
              <tr>
                <td><code>clearable</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Clicking currently active value resets the score to 0.</td>
              </tr>
              <tr>
                <td><code>showValue</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Shows numeric badge beside rating glyphs.</td>
              </tr>
              <tr>
                <td><code>showLabel</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Renders dynamic verbal predicate text based on active score.</td>
              </tr>
              <tr>
                <td><code>count</code></td>
                <td><code>number</code></td>
                <td><code>undefined</code></td>
                <td>Enclosed total review count to append beside stars.</td>
              </tr>
              <tr>
                <td><code>highlightSelectedOnly</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Lights up only the active icon instead of cumulative preceding items.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">
              {t.nav.componentsSection || (isId ? 'Komponen' : 'Components')}
            </span>
            <h1 className="page-title">{t.nav.compRating || 'Rating'}</h1>
            <p className="page-subtitle">
              {isId
                ? 'Komponen penilaian interaktif dan tampilan skor berbasis bintang, hati, dan emotikon untuk feedback pengguna, ulasan produk, dan metrik kepuasan (CSAT).'
                : 'Interactive evaluation and score display component supporting stars, hearts, and moods for user feedback, product reviews, and customer satisfaction (CSAT) metrics.'}
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

      {/* Main Tab Content */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        {activeViewTab === 'guideline' ? renderGuideline() : renderPlaybook()}
      </div>

      {/* Footer Navigation */}
      <NextPrevious
        prev={{ id: 'comp-radio', label: t.nav.compRadio || 'Radio' }}
        next={{ id: 'comp-slider', label: t.nav.compSlider || 'Slider' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
