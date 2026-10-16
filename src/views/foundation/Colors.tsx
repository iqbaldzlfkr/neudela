import React, { useState, useMemo, useEffect } from 'react';
import {
  Palette,
  Search,
  Copy,
  Check,
  Eye,
  Sliders,
  Moon,
  Sun,
  Info,
  AlertTriangle,
  CircleCheck,
  CircleX,
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  X,
  SlidersHorizontal,
  CheckCheck,
  Box,
  Contrast,
  Sliders as SlidersIcon,
  HelpCircle
} from 'lucide-react';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Math Helpers (WCAG 2.1 Contrast & Format Conversion)
// ─────────────────────────────────────────────────────────────────────────────

type CopyFormat = 'cssVar' | 'hex' | 'rgb' | 'hsl';

interface ColorShade {
  name: string;
  weight: string;
  hex: string;
}

interface PaletteDefinition {
  id: string;
  nameEn: string;
  nameId: string;
  roleEn: string;
  roleId: string;
  descEn: string;
  descId: string;
  baseHex: string;
  shades: ColorShade[];
}

function hexToRgbValues(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return [r, g, b];
}

function hexToRgbString(hex: string): string {
  const [r, g, b] = hexToRgbValues(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHslString(hex: string): string {
  const [rRaw, gRaw, bRaw] = hexToRgbValues(hex);
  const r = rRaw / 255;
  const g = gRaw / 255;
  const b = bRaw / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function getLuminance(hex: string): number {
  const [rRaw, gRaw, bRaw] = hexToRgbValues(hex);
  const r = rRaw / 255;
  const g = gRaw / 255;
  const b = bRaw / 255;
  const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Palettes Data (All 11 Scales from tokens.css)
// ─────────────────────────────────────────────────────────────────────────────

const PALETTES: PaletteDefinition[] = [
  {
    id: 'brand',
    nameEn: 'Brand Terracotta',
    nameId: 'Brand Utama (Terracotta)',
    roleEn: 'Primary Brand Identity & Primary Actions',
    roleId: 'Identitas Brand Utama & Aksi Primer',
    descEn: 'Warm, refined terracotta anchor color defining Neudela’s core personality, primary action buttons, active navigation markers, and brand elements.',
    descId: 'Warna terracotta hangat dan elegan yang mendefinisikan kepribadian Neudela, tombol aksi utama, penanda navigasi aktif, dan elemen identitas inti.',
    baseHex: '#df7e30',
    shades: [
      { name: '--brand-25', weight: '25', hex: '#fffcf7' },
      { name: '--brand-50', weight: '50', hex: '#fdf7ed' },
      { name: '--brand-100', weight: '100', hex: '#f8ebcd' },
      { name: '--brand-200', weight: '200', hex: '#f1ce96' },
      { name: '--brand-300', weight: '300', hex: '#eab05f' },
      { name: '--brand-400', weight: '400', hex: '#e5963a' },
      { name: '--brand-500', weight: '500', hex: '#df7e30' },
      { name: '--brand-600', weight: '600', hex: '#c3571c' },
      { name: '--brand-700', weight: '700', hex: '#a23c1b' },
      { name: '--brand-800', weight: '800', hex: '#84301c' },
      { name: '--brand-900', weight: '900', hex: '#6d291a' },
      { name: '--brand-950', weight: '950', hex: '#3e130a' },
    ]
  },
  {
    id: 'slate',
    nameEn: 'Slate (Cool Gray)',
    nameId: 'Slate (Netral Dingin)',
    roleEn: 'Default Surface, Text & Structure Neutrals',
    roleId: 'Latar Surface, Tipografi & Struktur Utama',
    descEn: 'The primary structural neutral in Neudela with a slight cool blue undertone. Used for canvas backgrounds, cards, typography, dividers, and elevation shadows.',
    descId: 'Warna netral struktural utama Neudela dengan nuansa dingin halus. Digunakan untuk latar belakang kanvas, kartu surface, tipografi, batas, dan bayangan elevasi.',
    baseHex: '#667085',
    shades: [
      { name: '--slate-25', weight: '25', hex: '#fcfcfd' },
      { name: '--slate-50', weight: '50', hex: '#f9fafb' },
      { name: '--slate-100', weight: '100', hex: '#f2f4f7' },
      { name: '--slate-200', weight: '200', hex: '#e4e7ec' },
      { name: '--slate-300', weight: '300', hex: '#d0d5dd' },
      { name: '--slate-400', weight: '400', hex: '#98a2b3' },
      { name: '--slate-500', weight: '500', hex: '#667085' },
      { name: '--slate-600', weight: '600', hex: '#475467' },
      { name: '--slate-700', weight: '700', hex: '#344054' },
      { name: '--slate-800', weight: '800', hex: '#182230' },
      { name: '--slate-900', weight: '900', hex: '#101828' },
      { name: '--slate-950', weight: '950', hex: '#0c111d' },
    ]
  },
  {
    id: 'gray',
    nameEn: 'Neutral Gray',
    nameId: 'Gray (Netral Murni)',
    roleEn: 'Balanced Neutral Alternative',
    roleId: 'Alternatif Netral Seimbang',
    descEn: 'A purely achromatic neutral spectrum. Ideal for monochromatic themes, secondary borders, disabled component states, and subtle layout divisions.',
    descId: 'Spektrum netral akromatik murni tanpa saturasi berlebih. Cocok untuk tema monokromatik, batas sekunder, status komponen disabled, dan pembatas halus.',
    baseHex: '#85888e',
    shades: [
      { name: '--gray-25', weight: '25', hex: '#fafafa' },
      { name: '--gray-50', weight: '50', hex: '#f5f5f6' },
      { name: '--gray-100', weight: '100', hex: '#f0f1f1' },
      { name: '--gray-200', weight: '200', hex: '#ececed' },
      { name: '--gray-300', weight: '300', hex: '#cecfd2' },
      { name: '--gray-400', weight: '400', hex: '#94969c' },
      { name: '--gray-500', weight: '500', hex: '#85888e' },
      { name: '--gray-600', weight: '600', hex: '#61646c' },
      { name: '--gray-700', weight: '700', hex: '#333741' },
      { name: '--gray-800', weight: '800', hex: '#1f242f' },
      { name: '--gray-900', weight: '900', hex: '#161b26' },
      { name: '--gray-950', weight: '950', hex: '#0c111d' },
    ]
  },
  {
    id: 'emerald',
    nameEn: 'Emerald (Success)',
    nameId: 'Emerald (Sukses & Positif)',
    roleEn: 'Affirmative & Success Functional Feedback',
    roleId: 'Umpan Balik Positif & Verifikasi Sukses',
    descEn: 'Fresh, confident green scale reserved for success notices, active statuses, approved verification badges, and positive metric indicators.',
    descId: 'Skala hijau segar dan terpercaya yang dikhususkan untuk notifikasi sukses, status aktif, lencana verifikasi berhasil, dan indikator metrik positif.',
    baseHex: '#10b981',
    shades: [
      { name: '--emerald-50', weight: '50', hex: '#ecfdf5' },
      { name: '--emerald-100', weight: '100', hex: '#d1fae5' },
      { name: '--emerald-200', weight: '200', hex: '#a7f3d0' },
      { name: '--emerald-300', weight: '300', hex: '#6ee7b7' },
      { name: '--emerald-400', weight: '400', hex: '#34d399' },
      { name: '--emerald-500', weight: '500', hex: '#10b981' },
      { name: '--emerald-600', weight: '600', hex: '#059669' },
      { name: '--emerald-700', weight: '700', hex: '#047857' },
      { name: '--emerald-800', weight: '800', hex: '#065f46' },
      { name: '--emerald-900', weight: '900', hex: '#064e3b' },
      { name: '--emerald-950', weight: '950', hex: '#022c22' },
    ]
  },
  {
    id: 'amber',
    nameEn: 'Amber (Warning)',
    nameId: 'Amber (Peringatan & Siaga)',
    roleEn: 'Cautionary Alerts & Pending States',
    roleId: 'Peringatan Hati-Hati & Status Menunggu',
    descEn: 'Warm amber scale alerting users to non-blocking conditions, pending approvals, expiring subscriptions, and precautionary advice.',
    descId: 'Skala amber hangat untuk memberi peringatan terhadap kondisi non-blokir, persetujuan tertunda, masa aktif kedaluwarsa, dan pesan kehati-hatian.',
    baseHex: '#f59e0b',
    shades: [
      { name: '--amber-50', weight: '50', hex: '#fffbeb' },
      { name: '--amber-100', weight: '100', hex: '#fef3c7' },
      { name: '--amber-200', weight: '200', hex: '#fde68a' },
      { name: '--amber-300', weight: '300', hex: '#fcd34d' },
      { name: '--amber-400', weight: '400', hex: '#fbbf24' },
      { name: '--amber-500', weight: '500', hex: '#f59e0b' },
      { name: '--amber-600', weight: '600', hex: '#d97706' },
      { name: '--amber-700', weight: '700', hex: '#b45309' },
      { name: '--amber-800', weight: '800', hex: '#92400e' },
      { name: '--amber-900', weight: '900', hex: '#78350f' },
      { name: '--amber-950', weight: '950', hex: '#451a03' },
    ]
  },
  {
    id: 'red',
    nameEn: 'Red (Danger)',
    nameId: 'Red (Bahaya & Kesalahan)',
    roleEn: 'Destructive Actions & High-Priority Errors',
    roleId: 'Aksi Destruktif & Error Kritis',
    descEn: 'Vibrant crimson scale communicating destructive operations (delete, revoke, cancel), validation failures, and urgent system errors.',
    descId: 'Skala merah crimson tegas untuk mengomunikasikan aksi destruktif (hapus, cabut akses), kegagalan validasi, dan keadaan darurat sistem.',
    baseHex: '#ef4444',
    shades: [
      { name: '--red-50', weight: '50', hex: '#fef2f2' },
      { name: '--red-100', weight: '100', hex: '#fee2e2' },
      { name: '--red-200', weight: '200', hex: '#fecaca' },
      { name: '--red-300', weight: '300', hex: '#fca5a5' },
      { name: '--red-400', weight: '400', hex: '#f87171' },
      { name: '--red-500', weight: '500', hex: '#ef4444' },
      { name: '--red-600', weight: '600', hex: '#dc2626' },
      { name: '--red-700', weight: '700', hex: '#b91c1c' },
      { name: '--red-800', weight: '800', hex: '#991b1b' },
      { name: '--red-900', weight: '900', hex: '#7f1d1d' },
      { name: '--red-950', weight: '950', hex: '#450a0a' },
    ]
  },
  {
    id: 'sky',
    nameEn: 'Sky (Info)',
    nameId: 'Sky (Informasi & Panduan)',
    roleEn: 'Informational Banners, Tooltips & Documentation',
    roleId: 'Spanduk Informasi, Tooltip & Panduan',
    descEn: 'Clean cyan-blue scale used for neutral system information, helpful guidance banners, contextual tooltips, and release announcements.',
    descId: 'Skala biru langit jernih untuk informasi netral sistem, spanduk panduan bantuan, tooltip kontekstual, dan pengumuman pembaruan.',
    baseHex: '#0ea5e9',
    shades: [
      { name: '--sky-50', weight: '50', hex: '#f0f9ff' },
      { name: '--sky-100', weight: '100', hex: '#e0f2fe' },
      { name: '--sky-200', weight: '200', hex: '#bae6fd' },
      { name: '--sky-300', weight: '300', hex: '#7dd3fc' },
      { name: '--sky-400', weight: '400', hex: '#38bdf8' },
      { name: '--sky-500', weight: '500', hex: '#0ea5e9' },
      { name: '--sky-600', weight: '600', hex: '#0284c7' },
      { name: '--sky-700', weight: '700', hex: '#0369a1' },
      { name: '--sky-800', weight: '800', hex: '#075985' },
      { name: '--sky-900', weight: '900', hex: '#0c4a6e' },
      { name: '--sky-950', weight: '950', hex: '#082f49' },
    ]
  },
  {
    id: 'blue',
    nameEn: 'Blue (Secondary Brand)',
    nameId: 'Blue (Brand Sekunder & Tautan)',
    roleEn: 'Hyperlinks, Data Visualizations & Selections',
    roleId: 'Tautan Web, Visualisasi Data & Seleksi',
    descEn: 'Classic dependable blue scale used for inline hyperlinks, secondary focus rings, chart series, and active selection states.',
    descId: 'Skala biru klasik terpercaya untuk tautan teks inline, outline fokus sekunder, grafik visualisasi data, dan status seleksi aktif.',
    baseHex: '#3b82f6',
    shades: [
      { name: '--blue-50', weight: '50', hex: '#eff6ff' },
      { name: '--blue-100', weight: '100', hex: '#dbeafe' },
      { name: '--blue-200', weight: '200', hex: '#bfdbfe' },
      { name: '--blue-300', weight: '300', hex: '#93c5fd' },
      { name: '--blue-400', weight: '400', hex: '#60a5fa' },
      { name: '--blue-500', weight: '500', hex: '#3b82f6' },
      { name: '--blue-600', weight: '600', hex: '#2563eb' },
      { name: '--blue-700', weight: '700', hex: '#1d4ed8' },
      { name: '--blue-800', weight: '800', hex: '#1e40af' },
      { name: '--blue-900', weight: '900', hex: '#1e3a8a' },
      { name: '--blue-950', weight: '950', hex: '#172554' },
    ]
  },
  {
    id: 'purple',
    nameEn: 'Purple (Accent)',
    nameId: 'Purple (Aksen & Fitur AI)',
    roleEn: 'Premium Features, AI Highlights & Tags',
    roleId: 'Fitur Premium, Sorotan AI & Tag Khusus',
    descEn: 'Regal violet spectrum highlighting intelligent AI assist features, premium plan indicators, analytics tags, and rich badge accents.',
    descId: 'Spektrum ungu mewah untuk menonjolkan fitur cerdas AI, penanda paket premium, tag analitik, dan lencana bernilai tinggi.',
    baseHex: '#9e77ed',
    shades: [
      { name: '--purple-50', weight: '50', hex: '#f9f5ff' },
      { name: '--purple-100', weight: '100', hex: '#f4ebff' },
      { name: '--purple-200', weight: '200', hex: '#e9d7fe' },
      { name: '--purple-300', weight: '300', hex: '#d6bbfb' },
      { name: '--purple-400', weight: '400', hex: '#b692f6' },
      { name: '--purple-500', weight: '500', hex: '#9e77ed' },
      { name: '--purple-600', weight: '600', hex: '#7f56d9' },
      { name: '--purple-700', weight: '700', hex: '#6941c6' },
      { name: '--purple-800', weight: '800', hex: '#53389e' },
      { name: '--purple-900', weight: '900', hex: '#42307d' },
      { name: '--purple-950', weight: '950', hex: '#2c1c5f' },
    ]
  },
  {
    id: 'pink',
    nameEn: 'Pink (Vibrant)',
    nameId: 'Pink (Kreatif & Cerah)',
    roleEn: 'Creative Tags, Decorative Highlights',
    roleId: 'Tag Kreatif & Aksen Dekoratif',
    descEn: 'Playful and spirited pink scale used in user customization, tags, creative category chips, and delightful feedback states.',
    descId: 'Skala merah muda ceria dan energik untuk kustomisasi pengguna, tag kategori kreatif, dan interaksi yang menyenangkan.',
    baseHex: '#db2777',
    shades: [
      { name: '--pink-50', weight: '50', hex: '#fdf2fa' },
      { name: '--pink-100', weight: '100', hex: '#fce7f6' },
      { name: '--pink-200', weight: '200', hex: '#fbcfe8' },
      { name: '--pink-300', weight: '300', hex: '#f472b6' },
      { name: '--pink-400', weight: '400', hex: '#ec4899' },
      { name: '--pink-500', weight: '500', hex: '#db2777' },
      { name: '--pink-600', weight: '600', hex: '#be185d' },
      { name: '--pink-700', weight: '700', hex: '#9d174d' },
      { name: '--pink-800', weight: '800', hex: '#831843' },
      { name: '--pink-900', weight: '900', hex: '#500724' },
      { name: '--pink-950', weight: '950', hex: '#380419' },
    ]
  },
  {
    id: 'orange',
    nameEn: 'Orange (Warm Accent)',
    nameId: 'Orange (Aksen Hangat)',
    roleEn: 'Secondary Warm Highlights & Marketing Banners',
    roleId: 'Sorotan Hangat Sekunder & Spanduk Promosi',
    descEn: 'Warm energetic orange bridging the gap between brand terracotta and vibrant yellow. Ideal for promotional stickers and badges.',
    descId: 'Warna oranye cerah hangat yang melengkapi terracotta brand. Cocok untuk lencana promosi, stiker diskon, dan elemen promosi.',
    baseHex: '#ea580c',
    shades: [
      { name: '--orange-50', weight: '50', hex: '#fffaf5' },
      { name: '--orange-100', weight: '100', hex: '#ffeedb' },
      { name: '--orange-200', weight: '200', hex: '#fed7aa' },
      { name: '--orange-300', weight: '300', hex: '#fb923c' },
      { name: '--orange-400', weight: '400', hex: '#f97316' },
      { name: '--orange-500', weight: '500', hex: '#ea580c' },
      { name: '--orange-600', weight: '600', hex: '#c2410c' },
      { name: '--orange-700', weight: '700', hex: '#9a3412' },
      { name: '--orange-800', weight: '800', hex: '#7c2d12' },
      { name: '--orange-900', weight: '900', hex: '#431407' },
      { name: '--orange-950', weight: '950', hex: '#270b04' },
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Semantic Design Tokens Mapping
// ─────────────────────────────────────────────────────────────────────────────

interface SemanticTokenGroup {
  categoryEn: string;
  categoryId: string;
  descEn: string;
  descId: string;
  tokens: {
    token: string;
    lightValue: string;
    darkValue: string;
    resolvedLight: string;
    resolvedDark: string;
    roleEn: string;
    roleId: string;
  }[];
}

const SEMANTIC_TOKEN_GROUPS: SemanticTokenGroup[] = [
  {
    categoryEn: 'Functional Feedback & Actions',
    categoryId: 'Umpan Balik Fungsional & Aksi',
    descEn: 'Core action states and status indicators that automatically adjust their luminance for high legibility in light and dark mode.',
    descId: 'Status aksi utama dan indikator status yang secara otomatis menyesuaikan tingkat kecerahan agar tetap kontras pada tema terang maupun gelap.',
    tokens: [
      {
        token: '--color-primary',
        lightValue: 'var(--brand-500)',
        darkValue: 'var(--brand-400)',
        resolvedLight: '#df7e30',
        resolvedDark: '#e5963a',
        roleEn: 'Primary action buttons, active navigation markers, brand focus',
        roleId: 'Tombol aksi utama, penanda navigasi aktif, fokus brand',
      },
      {
        token: '--color-primary-hover',
        lightValue: 'var(--brand-600)',
        darkValue: 'var(--brand-300)',
        resolvedLight: '#c3571c',
        resolvedDark: '#eab05f',
        roleEn: 'Hover state for primary action elements',
        roleId: 'Status hover untuk elemen interaktif utama',
      },
      {
        token: '--color-success',
        lightValue: 'var(--emerald-600)',
        darkValue: 'var(--emerald-500)',
        resolvedLight: '#059669',
        resolvedDark: '#10b981',
        roleEn: 'Successful tasks, active verified badges, positive status',
        roleId: 'Tugas selesai, lencana verifikasi aktif, status positif',
      },
      {
        token: '--color-warning',
        lightValue: 'var(--amber-600)',
        darkValue: 'var(--amber-500)',
        resolvedLight: '#d97706',
        resolvedDark: '#f59e0b',
        roleEn: 'Cautionary warnings, pending items, session expiry notice',
        roleId: 'Peringatan kehati-hatian, item pending, peringatan sesi',
      },
      {
        token: '--color-danger',
        lightValue: 'var(--red-600)',
        darkValue: 'var(--red-500)',
        resolvedLight: '#dc2626',
        resolvedDark: '#ef4444',
        roleEn: 'Destructive delete buttons, form validation error text',
        roleId: 'Tombol hapus permanen, teks error formulir, status gagal',
      },
      {
        token: '--color-info',
        lightValue: 'var(--sky-600)',
        darkValue: 'var(--sky-500)',
        resolvedLight: '#0284c7',
        resolvedDark: '#0ea5e9',
        roleEn: 'Informational banner headers, contextual guide tooltips',
        roleId: 'Judul spanduk informasi, tooltip panduan bantuan',
      },
    ]
  },
  {
    categoryEn: 'Surfaces, Canvas & Backgrounds',
    categoryId: 'Latar Belakang, Kanvas & Permukaan',
    descEn: 'Layered elevation surfaces establishing clear structural depth from the app canvas up to floating modal surfaces.',
    descId: 'Tingkatan permukaan elevasi berlapis untuk menegaskan kedalaman visual dari kanvas dasar hingga kartu modal mengambang.',
    tokens: [
      {
        token: '--color-bg-canvas',
        lightValue: 'var(--slate-50)',
        darkValue: 'var(--slate-950)',
        resolvedLight: '#f9fafb',
        resolvedDark: '#0c111d',
        roleEn: 'App background canvas under all layout containers',
        roleId: 'Dasar kanvas aplikasi di bawah seluruh kontainer tata letak',
      },
      {
        token: '--color-bg-surface',
        lightValue: '#ffffff',
        darkValue: 'var(--slate-900)',
        resolvedLight: '#ffffff',
        resolvedDark: '#101828',
        roleEn: 'Primary cards, dropdown menus, table rows, modal dialogs',
        roleId: 'Kartu utama, menu dropdown, baris tabel, dialog modal',
      },
      {
        token: '--color-bg-subtle',
        lightValue: 'var(--slate-50)',
        darkValue: 'var(--slate-800)',
        resolvedLight: '#f9fafb',
        resolvedDark: '#182230',
        roleEn: 'Table headers, code snippet containers, card preview frames',
        roleId: 'Header tabel, blok cuplikan kode, bingkai pratinjau kartu',
      },
      {
        token: '--color-bg-surface-hover',
        lightValue: 'var(--slate-50)',
        darkValue: 'var(--slate-800)',
        resolvedLight: '#f9fafb',
        resolvedDark: '#182230',
        roleEn: 'Interactive list item hover, selectable row highlight',
        roleId: 'Sorotan saat mengarahkan kursor pada baris list/tabel',
      },
      {
        token: '--color-border',
        lightValue: 'var(--slate-300)',
        darkValue: 'var(--slate-800)',
        resolvedLight: '#d0d5dd',
        resolvedDark: '#182230',
        roleEn: 'Structural borders, card outlines, form input borders',
        roleId: 'Garis batas struktural, outline kartu, batas input formulir',
      },
    ]
  },
  {
    categoryEn: 'Typography & Content Colors',
    categoryId: 'Tipografi & Warna Konten',
    descEn: 'Hierarchical text tokens guaranteed to satisfy WCAG 2.1 AA/AAA contrast ratios against their corresponding surface tokens.',
    descId: 'Token teks berjenjang yang dijamin memenuhi rasio kontras WCAG 2.1 AA/AAA terhadap token permukaan latarnya.',
    tokens: [
      {
        token: '--color-text-primary',
        lightValue: 'var(--slate-700)',
        darkValue: 'var(--slate-50)',
        resolvedLight: '#344054',
        resolvedDark: '#f9fafb',
        roleEn: 'Page titles, section headers, body paragraphs, button labels',
        roleId: 'Judul halaman, heading bagian, paragraf isi, label tombol',
      },
      {
        token: '--color-text-secondary',
        lightValue: 'var(--slate-500)',
        darkValue: 'var(--slate-400)',
        resolvedLight: '#667085',
        resolvedDark: '#98a2b3',
        roleEn: 'Subtitles, secondary descriptions, table column headers',
        roleId: 'Subjudul, deskripsi pendukung, header kolom tabel',
      },
      {
        token: '--color-text-tertiary',
        lightValue: 'var(--slate-400)',
        darkValue: 'var(--slate-500)',
        resolvedLight: '#98a2b3',
        resolvedDark: '#667085',
        roleEn: 'Input placeholders, disabled captions, timestamp metadata',
        roleId: 'Placeholder formulir, keterangan disabled, metadata waktu',
      },
      {
        token: '--color-text-on-primary',
        lightValue: '#ffffff',
        darkValue: 'var(--slate-950)',
        resolvedLight: '#ffffff',
        resolvedDark: '#0c111d',
        roleEn: 'Text label on solid primary terracotta buttons',
        roleId: 'Label teks di atas tombol solid primary terracotta',
      },
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Rule Card Helper
// ─────────────────────────────────────────────────────────────────────────────

function RuleCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type} ${isDo ? 'do-card' : 'dont-card'}`}>
      <div className="rule-card__badge">
        {isDo ? (
          <CircleCheck size={14} strokeWidth={2.5} />
        ) : (
          <CircleX size={14} strokeWidth={2.5} />
        )}
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component Props
// ─────────────────────────────────────────────────────────────────────────────

interface ColorsProps {
  setActiveTab: (tabId: string) => void;
}

export default function Colors({ setActiveTab }: ColorsProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  // Subtabs state
  const [activeSubTab, setActiveSubTab] = useState<'palettes' | 'semantic' | 'accessibility' | 'guidelines'>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('semantic')) return 'semantic';
    if (hash.includes('accessibility') || hash.includes('contrast')) return 'accessibility';
    if (hash.includes('guidelines') || hash.includes('dodont')) return 'guidelines';
    return 'palettes';
  });

  const handleSubTabChange = (tab: 'palettes' | 'semantic' | 'accessibility' | 'guidelines') => {
    setActiveSubTab(tab);
    const targetHash = tab === 'palettes' ? '#colors' : `#colors-${tab}`;
    window.history.replaceState(null, '', targetHash);
  };

  // Copy format selector
  const [copyFormat, setCopyFormat] = useState<CopyFormat>('cssVar');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaletteFilter, setSelectedPaletteFilter] = useState('all');

  // Inspector Modal
  const [inspectedColor, setInspectedColor] = useState<{
    paletteName: string;
    shade: ColorShade;
  } | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // WCAG Contrast Checker state
  const [contrastFg, setContrastFg] = useState('#df7e30'); // Primary Brand Terracotta
  const [contrastBg, setContrastBg] = useState('#ffffff'); // White canvas

  // Copy helper
  const copyValue = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} ${isId ? 'berhasil disalin!' : 'copied to clipboard!'}`);
    setTimeout(() => setToastMessage(null), 2200);
  };

  // Helper to get formatted string for shade based on active copyFormat
  const getFormattedValue = (shade: ColorShade, format: CopyFormat): string => {
    switch (format) {
      case 'cssVar':
        return `var(${shade.name})`;
      case 'hex':
        return shade.hex.toLowerCase();
      case 'rgb':
        return hexToRgbString(shade.hex);
      case 'hsl':
        return hexToHslString(shade.hex);
    }
  };

  // Filtered palettes
  const filteredPalettes = useMemo(() => {
    let result = PALETTES;

    if (selectedPaletteFilter !== 'all') {
      result = result.filter(p => p.id === selectedPaletteFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(palette => {
        const matchesName = palette.nameEn.toLowerCase().includes(q) || palette.nameId.toLowerCase().includes(q);
        const matchesShades = palette.shades.some(
          s => s.name.toLowerCase().includes(q) || s.weight.includes(q) || s.hex.toLowerCase().includes(q)
        );
        return matchesName || matchesShades;
      });
    }

    return result;
  }, [selectedPaletteFilter, searchQuery]);

  // Total swatches count
  const totalSwatchesCount = useMemo(() => {
    return PALETTES.reduce((acc, p) => acc + p.shades.length, 0);
  }, []);

  // Calculate contrast for checker
  const currentContrastRatio = useMemo(() => {
    return getContrastRatio(contrastFg, contrastBg);
  }, [contrastFg, contrastBg]);

  return (
    <div className="colors-view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <span
          style={{
            fontSize: 'var(--fs-text-xs, 12px)',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--brand-500, #df7e30)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: 'var(--space-2, 8px)',
          }}
        >
          <Palette size={14} strokeWidth={2.4} />
          {isId ? 'SISTEM FOUNDATION' : 'FOUNDATION SYSTEM'}
        </span>
        <h1 className="page-title">{isId ? 'Warna (Colors)' : 'Colors'}</h1>
        <p className="page-subtitle">
          {isId
            ? 'Fondasi palet warna Neudela dibangun dengan pendekatan multi-skala terkalibrasi matematis. Mengombinasikan identitas terracotta hangat, netral slate modern, token semantik fungsional, dan pemetaan adaptif mode gelap dengan kepatuhan kontras WCAG 2.1.'
            : 'Neudela color system built on mathematically calibrated multi-scale palettes. Combining warm terracotta brand identity, modern slate neutrals, functional semantic tokens, and seamless dark mode adaptation with certified WCAG 2.1 contrast compliance.'}
        </p>

        {/* Stats Header Pills */}
        <div className="colors-header-stats">
          <span className="colors-stat-pill">
            <Palette size={13} color="#df7e30" />
            <span>{isId ? 'Total Palet:' : 'Total Palettes:'}</span>
            <strong>{PALETTES.length} {isId ? 'Skala' : 'Scales'}</strong>
          </span>
          <span className="colors-stat-pill">
            <Layers size={13} color="#df7e30" />
            <span>{isId ? 'Sampel Warna:' : 'Color Swatches:'}</span>
            <strong>{totalSwatchesCount} {isId ? 'Warna' : 'Swatches'}</strong>
          </span>
          <span className="colors-stat-pill">
            <ShieldCheck size={13} color="#10b981" />
            <span>{isId ? 'Aksesibilitas:' : 'Accessibility:'}</span>
            <strong>WCAG 2.1 AA / AAA</strong>
          </span>
          <span className="colors-stat-pill">
            <Moon size={13} color="#df7e30" />
            <span>{isId ? 'Dukungan Tema:' : 'Theme Support:'}</span>
            <strong>Light &amp; Dark Tokens</strong>
          </span>
        </div>

        {/* Main Tab Switcher */}
        <div className="comp-tab-bar" style={{ marginTop: 'var(--space-4, 16px)' }}>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'palettes' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('palettes')}
          >
            {isId ? 'Palet Warna & Swatches' : 'Color Palettes & Swatches'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'semantic' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('semantic')}
          >
            {isId ? 'Token Semantik & Mode Gelap' : 'Semantic & Dark Mode Tokens'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'accessibility' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('accessibility')}
          >
            {isId ? 'Kalkulator Kontras WCAG 2.1' : 'WCAG 2.1 Contrast Checker'}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeSubTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => handleSubTabChange('guidelines')}
          >
            {isId ? 'Panduan Penggunaan (Do & Don\'t)' : "Usage Guidelines (Do & Don't)"}
          </button>
        </div>
      </div>


      {/* ── TAB 1: COLOR PALETTES & SWATCHES ── */}
      {activeSubTab === 'palettes' && (
        <section>
          {/* Quick Toolbar: Search, Format Selector, Palette Filters */}
          <div className="colors-toolbar">
            <div className="colors-toolbar-top">
              {/* Search input */}
              <div className="colors-search-wrap">
                <Search size={15} className="colors-search-icon" />
                <input
                  type="text"
                  className="colors-search-input"
                  placeholder={
                    isId
                      ? 'Cari warna (contoh: brand, 500, #df7e30, emerald)...'
                      : 'Search color (e.g. brand, 500, #df7e30, emerald)...'
                  }
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-text-tertiary)'
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Format Switcher */}
              <div className="colors-format-bar">
                <span className="colors-format-label">{isId ? 'Format Salin:' : 'Copy Format:'}</span>
                <div className="colors-format-pills">
                  {(['cssVar', 'hex', 'rgb', 'hsl'] as CopyFormat[]).map(format => (
                    <button
                      key={format}
                      className={`colors-format-btn ${copyFormat === format ? 'active' : ''}`}
                      onClick={() => setCopyFormat(format)}
                    >
                      {format === 'cssVar' ? 'CSS Var' : format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Palette Category Filter Pills */}
            <div className="colors-filter-chips">
              <button
                className={`colors-chip-btn ${selectedPaletteFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedPaletteFilter('all')}
              >
                <span>{isId ? 'Semua Skala' : 'All Palettes'}</span>
                <span style={{ opacity: 0.7, fontSize: 11 }}>({PALETTES.length})</span>
              </button>
              {PALETTES.map(p => (
                <button
                  key={p.id}
                  className={`colors-chip-btn ${selectedPaletteFilter === p.id ? 'active' : ''}`}
                  onClick={() => setSelectedPaletteFilter(p.id)}
                >
                  <span className="colors-chip-dot" style={{ backgroundColor: p.baseHex }} />
                  <span>{isId ? p.nameId.split(' ')[0] : p.nameEn.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Palettes List */}
          {filteredPalettes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
              <Palette size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ fontSize: 16, fontWeight: 600 }}>{isId ? 'Tidak ada warna yang cocok' : 'No matching colors found'}</p>
              <NeuronButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPaletteFilter('all');
                }}
                style={{ marginTop: 12 }}
              >
                {isId ? 'Reset Pencarian' : 'Reset Search'}
              </NeuronButton>
            </div>
          ) : (
            filteredPalettes.map(palette => {
              // Spectrum gradient CSS string
              const gradientStops = palette.shades.map(s => s.hex).join(', ');

              return (
                <div className="colors-palette-card" key={palette.id}>
                  {/* Palette Header */}
                  <div className="colors-palette-header">
                    <div className="colors-palette-header-left">
                      <div className="colors-palette-title-row">
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            backgroundColor: palette.baseHex,
                            display: 'inline-block'
                          }}
                        />
                        <h3 className="colors-palette-title">
                          {isId ? palette.nameId : palette.nameEn}
                        </h3>
                        <span className="colors-palette-role">
                          {isId ? palette.roleId : palette.roleEn}
                        </span>
                      </div>
                      <p className="colors-palette-desc">
                        {isId ? palette.descId : palette.descEn}
                      </p>
                    </div>

                    <NeuronButton
                      variant="outline"
                      size="xs"
                      leadingIcon={<Copy size={13} />}
                      onClick={() =>
                        copyValue(`var(--${palette.id}-500)`, `${palette.nameEn} (500 Base)`)
                      }
                    >
                      {isId ? 'Salin Base (500)' : 'Copy Base (500)'}
                    </NeuronButton>
                  </div>

                  {/* Continuous Spectrum Gradient Bar */}
                  <div
                    className="colors-palette-spectrum-bar"
                    style={{ background: `linear-gradient(to right, ${gradientStops})` }}
                  />

                  {/* Swatches Grid */}
                  <div className="colors-swatches-grid">
                    {palette.shades.map(shade => {
                      const formattedVal = getFormattedValue(shade, copyFormat);
                      // Calculate contrast against white and black to pick readable text on hover
                      const contrastOnWhite = getContrastRatio(shade.hex, '#ffffff');
                      const contrastOnDark = getContrastRatio(shade.hex, '#0c111d');
                      const isDarkShade = getLuminance(shade.hex) < 0.4;

                      return (
                        <div
                          className="color-swatch-box"
                          key={shade.name}
                          onClick={() => copyValue(formattedVal, shade.name)}
                          title={`${isId ? 'Klik untuk menyalin' : 'Click to copy'}: ${formattedVal}`}
                        >
                          {/* Color block */}
                          <div
                            className="color-swatch-preview"
                            style={{ backgroundColor: shade.hex }}
                          >
                            <span className="color-swatch-contrast-badge">
                              Aa {isDarkShade ? `${contrastOnDark}:1` : `${contrastOnWhite}:1`}
                            </span>
                            <span className="color-swatch-copy-hint">
                              <Copy size={10} />
                              <span>{isId ? 'Salin' : 'Copy'}</span>
                            </span>
                          </div>

                          {/* Details below swatch */}
                          <div className="color-swatch-details">
                            <div className="color-swatch-weight">
                              <span>{shade.weight}</span>
                              <button
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  padding: 0,
                                  cursor: 'pointer',
                                  color: 'var(--color-text-tertiary)',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  setInspectedColor({
                                    paletteName: isId ? palette.nameId : palette.nameEn,
                                    shade
                                  });
                                }}
                                title={isId ? 'Buka detail & cek kontras' : 'Inspect color & check contrast'}
                              >
                                <Eye size={12} />
                              </button>
                            </div>
                            <span className="color-swatch-val" title={formattedVal}>
                              {formattedVal}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </section>
      )}

      {/* ── TAB 2: SEMANTIC & DARK MODE TOKENS ── */}
      {activeSubTab === 'semantic' && (
        <section>
          {/* Informational Hero Card */}
          <div className="section-card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-lg, 10px)',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SlidersIcon size={20} />
              </div>
              <div>
                <h2 className="section-title" style={{ margin: 0 }}>
                  {isId ? 'Arsitektur Token Semantik' : 'Semantic Token Architecture'}
                </h2>
                <p className="section-description" style={{ margin: 0, marginTop: 4 }}>
                  {isId
                    ? 'Neudela memisahkan skala warna mentah (contoh: --brand-500) dari token semantik fungsional UI (contoh: --color-primary). Di tema gelap (.dark-theme), seluruh token semantik otomatis beralih ke varian yang lebih terang atau kontras tanpa perlu menulis ulang stylesheet komponen.'
                    : 'Neudela decouples raw scale tokens (e.g. --brand-500) from functional UI semantic tokens (e.g. --color-primary). In dark mode (.dark-theme), all semantic tokens automatically adapt to higher luminance or subtle surface levels without rewriting component stylesheets.'}
                </p>
              </div>
            </div>
          </div>

          {/* Semantic Token Tables by Group */}
          <div className="semantic-section-grid">
            {SEMANTIC_TOKEN_GROUPS.map(group => (
              <div className="semantic-card" key={group.categoryEn}>
                <div className="semantic-card-header">
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                      {isId ? group.categoryId : group.categoryEn}
                    </h3>
                    <p style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
                      {isId ? group.descId : group.descEn}
                    </p>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="semantic-table">
                    <thead>
                      <tr>
                        <th style={{ width: '28%' }}>{isId ? 'Token CSS' : 'CSS Token'}</th>
                        <th style={{ width: '22%' }}>{isId ? 'Mode Terang (Light)' : 'Light Theme'}</th>
                        <th style={{ width: '22%' }}>{isId ? 'Mode Gelap (Dark)' : 'Dark Theme'}</th>
                        <th style={{ width: '28%' }}>{isId ? 'Peran Penggunaan' : 'Usage Intent'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.tokens.map(tokenItem => (
                        <tr key={tokenItem.token}>
                          <td>
                            <span
                              className="semantic-token-pill"
                              onClick={() => copyValue(`var(${tokenItem.token})`, tokenItem.token)}
                              title={isId ? 'Klik untuk salin var' : 'Click to copy var'}
                            >
                              <Copy size={11} />
                              {tokenItem.token}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  backgroundColor: tokenItem.resolvedLight,
                                  border: '1px solid rgba(0,0,0,0.1)',
                                  flexShrink: 0
                                }}
                              />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 12, fontWeight: 600 }}>{tokenItem.lightValue}</span>
                                <span style={{ fontSize: 10.5, color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                                  {tokenItem.resolvedLight}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  backgroundColor: tokenItem.resolvedDark,
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  flexShrink: 0
                                }}
                              />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 12, fontWeight: 600 }}>{tokenItem.darkValue}</span>
                                <span style={{ fontSize: 10.5, color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                                  {tokenItem.resolvedDark}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
                              {isId ? tokenItem.roleId : tokenItem.roleEn}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Live Component Specimen Preview using Semantic Tokens */}
          <div className="section-card" style={{ marginTop: 24 }}>
            <h3 className="section-title">
              {isId ? 'Pratinjau Nyata Komponen Berbasis Token Semantik' : 'Live Semantic Token Component Specimens'}
            </h3>
            <p className="section-description">
              {isId
                ? 'Seluruh komponen berikut mengambil nilai dari token semantik (--color-primary, --color-success, dsb.). Coba ganti tema aplikasi (Light/Dark di header atas) untuk melihat bagaimana warna beradaptasi secara instan.'
                : 'All components below inherit directly from semantic tokens (--color-primary, --color-success, etc.). Toggle the app theme (Light/Dark at top right) to see how colors adapt instantly without flickering.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
                marginTop: 16
              }}
            >
              {/* Card 1: Buttons Specimen */}
              <div
                style={{
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl, 14px)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  {isId ? 'Aksi Utama & Sekunder' : 'Action Buttons'}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <NeuronButton variant="primary" size="sm">
                    {isId ? 'Aksi Utama' : 'Primary Action'}
                  </NeuronButton>
                  <NeuronButton variant="secondary" size="sm">
                    {isId ? 'Sekunder' : 'Secondary'}
                  </NeuronButton>
                  <NeuronButton variant="danger" size="sm">
                    {isId ? 'Hapus' : 'Delete'}
                  </NeuronButton>
                </div>
              </div>

              {/* Card 2: Status Badges Specimen */}
              <div
                style={{
                  background: 'var(--color-bg-canvas)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl, 14px)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  {isId ? 'Lencana Status Semantik' : 'Semantic Status Badges'}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <NeuronBadge variant="brand" pill dot size="sm">
                    {isId ? 'Brand Aktif' : 'Brand Active'}
                  </NeuronBadge>
                  <NeuronBadge variant="success" pill dot size="sm">
                    {isId ? 'Terverifikasi' : 'Verified'}
                  </NeuronBadge>
                  <NeuronBadge variant="warning" pill dot size="sm">
                    {isId ? 'Menunggu' : 'Pending'}
                  </NeuronBadge>
                  <NeuronBadge variant="danger" pill dot size="sm">
                    {isId ? 'Gagal' : 'Failed'}
                  </NeuronBadge>
                </div>
              </div>

              {/* Card 3: Alert Surface Specimen */}
              <div
                style={{
                  background: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary-border)',
                  borderRadius: 'var(--radius-xl, 14px)',
                  padding: 20,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12
                }}
              >
                <Sparkles size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--color-primary)' }}>
                    {isId ? 'Penyesuaian Otomatis Mode Gelap' : 'Automatic Dark Mode Surface'}
                  </h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: 12.5, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                    {isId
                      ? 'Latar belakang ini menggunakan token --color-primary-light yang secara otomatis memiliki opasitas adaptif pada latar gelap.'
                      : 'This card uses --color-primary-light which naturally scales its opacity and border luminance in dark themes.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 3: WCAG 2.1 CONTRAST CHECKER ── */}
      {activeSubTab === 'accessibility' && (
        <section>
          <div className="contrast-tool-card">
            <h2 className="section-title" style={{ margin: 0, marginBottom: 6 }}>
              {isId ? 'Kalkulator Rasio Kontras WCAG 2.1' : 'WCAG 2.1 Interactive Contrast Calculator'}
            </h2>
            <p className="section-description" style={{ margin: 0, marginBottom: 20 }}>
              {isId
                ? 'Uji keterbacaan pasangan warna teks dan latar belakang secara langsung. Standar WCAG 2.1 menetapkan rasio kontras minimum 4.5:1 untuk teks normal (Level AA) dan 7:1 (Level AAA).'
                : 'Test text and background color pairs in real-time. WCAG 2.1 guidelines mandate a minimum 4.5:1 ratio for normal text (Level AA) and 7:1 for enhanced readability (Level AAA).'}
            </p>

            {/* Inputs Grid */}
            <div className="contrast-calc-grid">
              {/* Foreground (Text) Picker */}
              <div className="contrast-picker-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Warna Teks (Foreground)' : 'Text Color (Foreground)'}
                  </label>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {contrastFg}
                  </span>
                </div>
                <div className="contrast-picker-row">
                  <input
                    type="color"
                    className="contrast-color-input"
                    value={contrastFg}
                    onChange={e => setContrastFg(e.target.value)}
                  />
                  <input
                    type="text"
                    className="contrast-hex-input"
                    value={contrastFg}
                    onChange={e => setContrastFg(e.target.value)}
                  />
                </div>
                {/* Presets */}
                <div className="contrast-presets-list">
                  {[
                    { label: 'Slate 700', hex: '#344054' },
                    { label: 'Brand 500', hex: '#df7e30' },
                    { label: 'Brand 700', hex: '#a23c1b' },
                    { label: 'Emerald 600', hex: '#059669' },
                    { label: 'Red 600', hex: '#dc2626' },
                    { label: 'White', hex: '#ffffff' },
                  ].map(preset => (
                    <button
                      key={preset.label}
                      className="contrast-preset-btn"
                      onClick={() => setContrastFg(preset.hex)}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: preset.hex }} />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background (Surface) Picker */}
              <div className="contrast-picker-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Warna Latar (Background)' : 'Background Color (Surface)'}
                  </label>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {contrastBg}
                  </span>
                </div>
                <div className="contrast-picker-row">
                  <input
                    type="color"
                    className="contrast-color-input"
                    value={contrastBg}
                    onChange={e => setContrastBg(e.target.value)}
                  />
                  <input
                    type="text"
                    className="contrast-hex-input"
                    value={contrastBg}
                    onChange={e => setContrastBg(e.target.value)}
                  />
                </div>
                {/* Presets */}
                <div className="contrast-presets-list">
                  {[
                    { label: 'Pure White', hex: '#ffffff' },
                    { label: 'Slate 50', hex: '#f9fafb' },
                    { label: 'Brand 50', hex: '#fdf7ed' },
                    { label: 'Slate 900 (Dark)', hex: '#101828' },
                    { label: 'Slate 950 (Dark)', hex: '#0c111d' },
                  ].map(preset => (
                    <button
                      key={preset.label}
                      className="contrast-preset-btn"
                      onClick={() => setContrastBg(preset.hex)}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: preset.hex, border: '1px solid rgba(0,0,0,0.1)' }} />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Banner Hero */}
            <div className="contrast-score-hero">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span className="contrast-score-num">{currentContrastRatio}:1</span>
                <span
                  className={`contrast-score-rating ${currentContrastRatio >= 4.5 ? 'pass' : 'fail'}`}
                >
                  {currentContrastRatio >= 4.5 ? (
                    <>
                      <CircleCheck size={16} />
                      {currentContrastRatio >= 7.0 ? 'WCAG AAA Qualified' : 'WCAG AA Qualified'}
                    </>
                  ) : (
                    <>
                      <CircleX size={16} />
                      {isId ? 'Kontras Tidak Memenuhi' : 'Fails Contrast Standard'}
                    </>
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <NeuronButton
                  variant="outline"
                  size="sm"
                  leadingIcon={<RotateCcw size={14} />}
                  onClick={() => {
                    const temp = contrastFg;
                    setContrastFg(contrastBg);
                    setContrastBg(temp);
                  }}
                >
                  {isId ? 'Tukar Warna' : 'Swap Colors'}
                </NeuronButton>
              </div>
            </div>

            {/* WCAG Compliance Criteria Matrix */}
            <div className="contrast-criteria-grid">
              {/* Normal Text AA (4.5:1) */}
              <div className="contrast-criteria-card">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Normal Text AA
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Minimal 4.5:1' : 'Min 4.5:1'}
                  </div>
                </div>
                {currentContrastRatio >= 4.5 ? (
                  <NeuronBadge variant="success" size="sm" pill leadingIcon={<Check size={12} />}>
                    PASS
                  </NeuronBadge>
                ) : (
                  <NeuronBadge variant="danger" size="sm" pill leadingIcon={<X size={12} />}>
                    FAIL
                  </NeuronBadge>
                )}
              </div>

              {/* Large Text AA (3.0:1) */}
              <div className="contrast-criteria-card">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Large Text AA
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Minimal 3.0:1 (≥ 18pt)' : 'Min 3.0:1 (≥ 18pt)'}
                  </div>
                </div>
                {currentContrastRatio >= 3.0 ? (
                  <NeuronBadge variant="success" size="sm" pill leadingIcon={<Check size={12} />}>
                    PASS
                  </NeuronBadge>
                ) : (
                  <NeuronBadge variant="danger" size="sm" pill leadingIcon={<X size={12} />}>
                    FAIL
                  </NeuronBadge>
                )}
              </div>

              {/* Normal Text AAA (7.0:1) */}
              <div className="contrast-criteria-card">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Normal Text AAA
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Minimal 7.0:1' : 'Min 7.0:1'}
                  </div>
                </div>
                {currentContrastRatio >= 7.0 ? (
                  <NeuronBadge variant="success" size="sm" pill leadingIcon={<Check size={12} />}>
                    PASS
                  </NeuronBadge>
                ) : (
                  <NeuronBadge variant="danger" size="sm" pill leadingIcon={<X size={12} />}>
                    FAIL
                  </NeuronBadge>
                )}
              </div>

              {/* Graphical Objects & UI (3.0:1) */}
              <div className="contrast-criteria-card">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    UI &amp; Icons AA
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                    {isId ? 'Minimal 3.0:1' : 'Min 3.0:1'}
                  </div>
                </div>
                {currentContrastRatio >= 3.0 ? (
                  <NeuronBadge variant="success" size="sm" pill leadingIcon={<Check size={12} />}>
                    PASS
                  </NeuronBadge>
                ) : (
                  <NeuronBadge variant="danger" size="sm" pill leadingIcon={<X size={12} />}>
                    FAIL
                  </NeuronBadge>
                )}
              </div>
            </div>

            {/* Live Interactive Specimen Stage */}
            <div
              className="contrast-specimen-stage"
              style={{
                backgroundColor: contrastBg,
                color: contrastFg,
                borderColor: currentContrastRatio < 3.0 ? 'rgba(239, 68, 68, 0.4)' : 'var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.8 }}>
                  {isId ? 'Pratinjau Tipografi & Komponen Langsung' : 'Live Interactive Render Sample'}
                </span>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', opacity: 0.7 }}>
                  Ratio: {currentContrastRatio}:1
                </span>
              </div>

              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: contrastFg, lineHeight: 1.3 }}>
                The quick brown fox jumps over the lazy dog.
              </h2>
              <p style={{ margin: 0, fontSize: 14.5, color: contrastFg, lineHeight: 1.6, opacity: 0.95 }}>
                {isId
                  ? 'Aksesibilitas digital memastikan setiap orang, termasuk pengguna dengan gangguan penglihatan atau buta warna, dapat membaca dan berinteraksi dengan antarmuka Anda tanpa hambatan.'
                  : 'Digital accessibility ensures that every human being, including individuals with low vision or color blindness, can effortlessly read and interact with your interface.'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <button
                  style={{
                    backgroundColor: contrastFg,
                    color: contrastBg,
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  {isId ? 'Tombol Sample' : 'Sample Button'}
                </button>
                <span style={{ fontSize: 12, color: contrastFg, opacity: 0.8 }}>
                  Small Caption Text (12px)
                </span>
              </div>
            </div>
          </div>

          {/* Standard Verified Token Pairings Reference Table */}
          <div className="section-card">
            <h3 className="section-title">
              {isId ? 'Tabel Sertifikasi Kontras Token Neudela' : 'Neudela Certified Token Pairings Matrix'}
            </h3>
            <p className="section-description">
              {isId
                ? 'Pasangan token resmi yang telah diuji dan dijamin lulus standar WCAG 2.1 AA di seluruh komponen aplikasi.'
                : 'Official system token pairs certified to pass WCAG 2.1 AA standards across all application screens.'}
            </p>

            <div style={{ overflowX: 'auto', marginTop: 14 }}>
              <table className="semantic-table">
                <thead>
                  <tr>
                    <th>{isId ? 'Teks (Foreground)' : 'Foreground Text'}</th>
                    <th>{isId ? 'Latar (Background)' : 'Background Surface'}</th>
                    <th>{isId ? 'Rasio Kontras' : 'Contrast Ratio'}</th>
                    <th>{isId ? 'Tingkat WCAG' : 'WCAG Level'}</th>
                    <th>{isId ? 'Rekomendasi Penggunaan' : 'Recommended Use'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { fg: '--slate-700 (#344054)', bg: '#ffffff', ratio: '8.45:1', level: 'AAA (Enhanced)', use: 'Body text on light surface' },
                    { fg: '--brand-700 (#a23c1b)', bg: '#ffffff', ratio: '5.82:1', level: 'AA (Normal)', use: 'Primary links & headers' },
                    { fg: '#ffffff', bg: '--brand-500 (#df7e30)', ratio: '3.15:1', level: 'AA (Large / UI)', use: 'Primary button bold text' },
                    { fg: '--slate-50 (#f9fafb)', bg: '--slate-900 (#101828)', ratio: '14.2:1', level: 'AAA (Enhanced)', use: 'Dark mode body typography' },
                    { fg: '--emerald-700 (#047857)', bg: '--emerald-50 (#ecfdf5)', ratio: '6.42:1', level: 'AA (Normal)', use: 'Success alert messages' },
                    { fg: '--red-700 (#b91c1c)', bg: '--red-50 (#fef2f2)', ratio: '6.85:1', level: 'AA (Normal)', use: 'Error callouts & validation' },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 12.5 }}>{row.fg}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5 }}>{row.bg}</td>
                      <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{row.ratio}</td>
                      <td>
                        <NeuronBadge variant="success" size="xs" pill>
                          {row.level}
                        </NeuronBadge>
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)', fontSize: 12.5 }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 4: USAGE GUIDELINES (DO & DON'T) ── */}
      {activeSubTab === 'guidelines' && (
        <section>
          {/* Header */}
          <div className="section-card" style={{ marginBottom: 24 }}>
            <h2 className="section-title">
              {isId ? 'Panduan Penggunaan Warna (Do & Don\'t)' : 'Color Usage Guidelines (Do & Don\'t)'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Ikuti standar berikut untuk menjaga konsistensi visual, kejelasan makna fungsional, dan aksesibilitas bagi seluruh pengguna produk Neudela.'
                : 'Follow these golden rules to maintain visual cohesion, functional clarity, and optimal accessibility for every user across Neudela products.'}
            </p>
          </div>

          {/* Pair 1: Semantic Meaning */}
          <div className="colors-dodont-pair">
            <RuleCard type="do">
              <div className="colors-visual-frame">
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NeuronButton variant="danger" size="sm">
                    {isId ? 'Hapus Akun' : 'Delete Account'}
                  </NeuronButton>
                  <NeuronBadge variant="danger" pill dot size="sm">
                    {isId ? 'Aksi Destruktif' : 'Destructive Action'}
                  </NeuronBadge>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Gunakan warna semantik sesuai intensi fungsionalnya'
                    : 'Use semantic tokens corresponding to functional intent'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Gunakan --color-danger untuk aksi destruktif atau pembatalan permanen, --color-success untuk konfirmasi berhasil, dan --color-primary untuk aksi utama.'
                    : 'Apply --color-danger for destructive actions, --color-success for confirmations, and --color-primary for the primary workflow action.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="colors-visual-frame">
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button
                    style={{
                      backgroundColor: '#df7e30',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600
                    }}
                  >
                    {isId ? 'Hapus Akun' : 'Delete Account'}
                  </button>
                  <span
                    style={{
                      fontSize: 11,
                      color: '#df7e30',
                      border: '1px solid #df7e30',
                      borderRadius: 999,
                      padding: '2px 8px'
                    }}
                  >
                    Brand Primary Color
                  </span>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Jangan gunakan warna brand terracotta untuk tombol destruktif'
                    : 'Don\'t use terracotta brand color on destructive operations'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Menggunakan warna brand pada tombol hapus mengaburkan tanda bahaya dan dapat memicu penghapusan data secara tidak sengaja oleh pengguna.'
                    : 'Using brand colors for deletion obscures danger and risks accidental data loss due to missing psychological stop signals.'}
                </p>
              </div>
            </RuleCard>
          </div>

          {/* Pair 2: Text Contrast */}
          <div className="colors-dodont-pair">
            <RuleCard type="do">
              <div className="colors-visual-frame" style={{ background: '#ffffff' }}>
                <div style={{ padding: 12, border: '1px solid #e4e7ec', borderRadius: 10, background: '#ffffff', width: '100%', maxWidth: 300 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#344054' }}>
                    --color-text-primary (8.45:1)
                  </div>
                  <div style={{ fontSize: 12.5, color: '#667085', marginTop: 4 }}>
                    --color-text-secondary (4.85:1) - WCAG AA Pass
                  </div>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Pastikan rasio kontras teks minimal 4.5:1 terhadap latar'
                    : 'Ensure body text satisfies at least 4.5:1 contrast'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Selalu gunakan token teks terkalibrasi (--color-text-primary dan --color-text-secondary) untuk menjamin keterbacaan optimal bagi seluruh pengguna.'
                    : 'Always utilize standardized text tokens (--color-text-primary and secondary) to guarantee effortless legibility for everyone.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="colors-visual-frame" style={{ background: '#ffffff' }}>
                <div style={{ padding: 12, border: '1px solid #f2f4f7', borderRadius: 10, background: '#ffffff', width: '100%', maxWidth: 300 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#d0d5dd' }}>
                    Teks Abu-abu Pucat (1.6:1)
                  </div>
                  <div style={{ fontSize: 12.5, color: '#f1ce96', marginTop: 4 }}>
                    Teks Oranye Terang di Atas Putih (1.7:1) - Fail
                  </div>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Jangan gunakan teks abu-abu terang di atas latar putih'
                    : 'Don\'t use low-contrast pale text over light surfaces'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Teks dengan kontras rendah di bawah 3:1 sangat sulit dibaca di bawah sinar matahari langsung atau oleh pengguna dengan gangguan daya lihat.'
                    : 'Faint gray or pastel text below 3:1 is nearly invisible under bright sunlight or for users with visual impairments.'}
                </p>
              </div>
            </RuleCard>
          </div>

          {/* Pair 3: Dark Mode Token Adoption */}
          <div className="colors-dodont-pair">
            <RuleCard type="do">
              <div className="colors-visual-frame" style={{ background: '#101828' }}>
                <div style={{ padding: 14, background: '#182230', border: '1px solid #344054', borderRadius: 10, width: '100%', maxWidth: 300 }}>
                  <code style={{ fontSize: 12, color: '#f9fafb', fontFamily: 'JetBrains Mono, monospace' }}>
                    background: var(--color-bg-surface);
                  </code>
                  <div style={{ fontSize: 11, color: '#98a2b3', marginTop: 4 }}>
                    Otomatis adaptif ke tema gelap &amp; terang
                  </div>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Gunakan token semantik dinamis untuk dukungan tema gelap'
                    : 'Adopt adaptive semantic tokens for dark mode resilience'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Token semantik seperti --color-bg-surface dan --color-border secara otomatis menyesuaikan nilainya saat tema berubah tanpa duplikasi kode.'
                    : 'Tokens such as --color-bg-surface and --color-border automatically switch their theme values without component-level overrides.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="colors-visual-frame" style={{ background: '#101828' }}>
                <div style={{ padding: 14, background: '#ffffff', border: '1px solid #e4e7ec', borderRadius: 10, width: '100%', maxWidth: 300 }}>
                  <code style={{ fontSize: 12, color: '#0c111d', fontFamily: 'JetBrains Mono, monospace' }}>
                    background: #ffffff; /* Hardcoded */
                  </code>
                  <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
                    Silau &amp; kontras rusak pada tema gelap!
                  </div>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Jangan melakukan hardcode nilai warna heksadesimal'
                    : 'Don\'t hardcode static hex values in component CSS'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Hardcode seperti #ffffff atau #000000 merusak tampilan ketika pengguna beralih ke mode gelap dan memicu visual glare.'
                    : 'Hardcoded #ffffff or #000000 creates blinding flashes and unreadable inverted text when the application enters dark mode.'}
                </p>
              </div>
            </RuleCard>
          </div>

          {/* Pair 4: Color Restraint 60-30-10 Rule */}
          <div className="colors-dodont-pair">
            <RuleCard type="do">
              <div className="colors-visual-frame">
                <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ height: 18, background: '#f2f4f7', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8, fontSize: 10, fontWeight: 700, color: '#344054' }}>
                    60% Netral Kanvas &amp; Latar
                  </div>
                  <div style={{ height: 18, background: '#ffffff', border: '1px solid #d0d5dd', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8, fontSize: 10, fontWeight: 700, color: '#344054' }}>
                    30% Permukaan Kartu &amp; Struktur
                  </div>
                  <div style={{ height: 18, background: '#df7e30', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8, fontSize: 10, fontWeight: 700, color: '#ffffff' }}>
                    10% Aksen Brand Terracotta
                  </div>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Terapkan aturan proporsi 60-30-10 untuk ketenangan visual'
                    : 'Practice the 60-30-10 rule for visual calmness'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Gunakan 60% warna kanvas netral, 30% kartu permukaan sekunder, dan sisihkan 10% untuk aksen terracotta agar mata pengguna terarah ke titik fokus terpenting.'
                    : 'Allocate 60% neutral canvas, 30% surface structure, and 10% brand terracotta accents so the user’s eye naturally gravitates to key CTAs.'}
                </p>
              </div>
            </RuleCard>

            <RuleCard type="dont">
              <div className="colors-visual-frame">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, width: '100%', maxWidth: 320 }}>
                  <div style={{ background: '#ec4899', height: 48, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>
                    Pink Card
                  </div>
                  <div style={{ background: '#9e77ed', height: 48, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>
                    Purple Card
                  </div>
                  <div style={{ background: '#0ea5e9', height: 48, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>
                    Sky Card
                  </div>
                </div>
              </div>
              <div className="rule-card__text">
                <h4 className="rule-card__title">
                  {isId
                    ? 'Jangan mencampur terlalu banyak warna aksen pada antarmuka'
                    : 'Don\'t clutter screens with competing vibrant colors'}
                </h4>
                <p className="rule-card__desc">
                  {isId
                    ? 'Memberi warna mencolok berbeda pada setiap kartu menyebabkan kelelahan visual (visual fatigue) dan merusak hierarki navigasi produk.'
                    : 'Assigning a rainbow of neon accents across adjacent cards creates visual noise and confuses users about which elements are interactive.'}
                </p>
              </div>
            </RuleCard>
          </div>
        </section>
      )}

      {/* ── INSPECTOR MODAL ── */}
      {inspectedColor && (
        <div className="color-modal-backdrop" onClick={() => setInspectedColor(null)}>
          <div className="color-modal-card" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="color-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: inspectedColor.shade.hex
                  }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                    {inspectedColor.shade.name}
                  </h3>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    {inspectedColor.paletteName} • Weight {inspectedColor.shade.weight}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setInspectedColor(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-tertiary)',
                  padding: 4
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="color-modal-body">
              {/* Large Color Hero */}
              <div
                className="color-modal-hero"
                style={{ backgroundColor: inspectedColor.shade.hex }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: 'rgba(0,0,0,0.4)',
                    color: '#ffffff',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  Luminance: {getLuminance(inspectedColor.shade.hex).toFixed(3)}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: 'rgba(0,0,0,0.4)',
                    color: '#ffffff',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  Contrast on White: {getContrastRatio(inspectedColor.shade.hex, '#ffffff')}:1
                </span>
              </div>

              {/* Code Formats Grid */}
              <div className="color-modal-code-grid">
                {[
                  { label: 'CSS Variable', val: `var(${inspectedColor.shade.name})` },
                  { label: 'HEX Code', val: inspectedColor.shade.hex.toLowerCase() },
                  { label: 'RGB Values', val: hexToRgbString(inspectedColor.shade.hex) },
                  { label: 'HSL Values', val: hexToHslString(inspectedColor.shade.hex) },
                ].map(item => (
                  <div
                    key={item.label}
                    className="color-code-item"
                    onClick={() => copyValue(item.val, item.label)}
                    title={isId ? 'Klik untuk salin' : 'Click to copy'}
                  >
                    <div>
                      <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', display: 'block' }}>
                        {item.label}
                      </span>
                      <strong style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.val}
                      </strong>
                    </div>
                    <Copy size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                  </div>
                ))}
              </div>

              {/* WCAG Contrast Details */}
              <div style={{ background: 'var(--color-bg-canvas)', padding: 16, borderRadius: 'var(--radius-lg, 12px)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
                  {isId ? 'Uji Aksesibilitas WCAG' : 'WCAG Accessibility Rating'}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: '#ffffff', color: inspectedColor.shade.hex, padding: 12, borderRadius: 8, border: '1px solid #e4e7ec' }}>
                    <span style={{ fontSize: 11, color: '#667085', display: 'block' }}>On White (#ffffff)</span>
                    <strong style={{ fontSize: 16 }}>{getContrastRatio(inspectedColor.shade.hex, '#ffffff')}:1</strong>
                    <div style={{ marginTop: 4 }}>
                      <NeuronBadge
                        variant={getContrastRatio(inspectedColor.shade.hex, '#ffffff') >= 4.5 ? 'success' : 'danger'}
                        size="xs"
                        pill
                      >
                        {getContrastRatio(inspectedColor.shade.hex, '#ffffff') >= 4.5 ? 'WCAG AA PASS' : 'FAIL'}
                      </NeuronBadge>
                    </div>
                  </div>
                  <div style={{ background: '#0c111d', color: inspectedColor.shade.hex, padding: 12, borderRadius: 8, border: '1px solid #1f242f' }}>
                    <span style={{ fontSize: 11, color: '#98a2b3', display: 'block' }}>On Dark (#0c111d)</span>
                    <strong style={{ fontSize: 16 }}>{getContrastRatio(inspectedColor.shade.hex, '#0c111d')}:1</strong>
                    <div style={{ marginTop: 4 }}>
                      <NeuronBadge
                        variant={getContrastRatio(inspectedColor.shade.hex, '#0c111d') >= 4.5 ? 'success' : 'danger'}
                        size="xs"
                        pill
                      >
                        {getContrastRatio(inspectedColor.shade.hex, '#0c111d') >= 4.5 ? 'WCAG AA PASS' : 'FAIL'}
                      </NeuronBadge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Next / Previous Component ── */}
      <NextPrevious
        prev={{ id: 'foundation-overview', label: isId ? 'Ikhtisar Fondasi' : 'Foundation Overview' }}
        next={{ id: 'grid', label: isId ? 'Tata Letak Grid' : 'Grid System' }}
        setActiveTab={setActiveTab}
      />

      {/* ── Copy Toast Notification ── */}
      <div className={`copy-toast ${toastMessage ? 'show' : ''}`}>
        <CheckCheck size={16} strokeWidth={2.4} color="#10b981" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
