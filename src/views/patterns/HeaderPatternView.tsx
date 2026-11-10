import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronButton from '../../components/NeuronButton';
import NeuronTooltip from '../../components/NeuronTooltip';
import NeuronSelect from '../../components/NeuronSelect';
import {
  Check,
  Copy,
  Eye,
  X,
  Search,
  Bell,
  ChevronDown,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Sparkles,
  Zap,
  Globe,
  ShoppingCart,
  HelpCircle,
  LogOut,
  User,
  CreditCard,
  Command,
  Layers,
  Package,
  LayoutGrid,
  ShieldCheck,
  Star,
  Bookmark,
  ArrowRight,
  ExternalLink,
  Sliders,
  FileText,
} from 'lucide-react';

interface HeaderPatternViewProps {
  setActiveTab: (tabId: string) => void;
}

export type HeaderVariantId =
  | 'classic-saas'
  | 'minimal-centered'
  | 'dashboard-topbar'
  | 'mega-menu'
  | 'command-bar'
  | 'marketing-nav'
  | 'ecommerce-header'
  | 'docs-navbar';

interface VariantMeta {
  id: HeaderVariantId;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  tags: string[];
  bestForEn: string;
  bestForId: string;
  badge: string;
  accentColor: string;
}

export const HEADER_VARIANTS: VariantMeta[] = [
  {
    id: 'classic-saas',
    nameEn: 'Classic SaaS Topbar',
    nameId: 'Topbar SaaS Klasik',
    taglineEn: 'The standard enterprise product header with logo, nav links, and user avatar.',
    taglineId: 'Header produk enterprise standar dengan logo, tautan navigasi, dan avatar pengguna.',
    descEn: 'A full-width sticky header featuring a branded logo, horizontal main navigation, notification bell with badge counter, quick-search shortcut, and a user avatar dropdown with role badge.',
    descId: 'Header sticky lebar penuh dengan logo bermerek, navigasi horizontal utama, lonceng notifikasi dengan penghitung badge, pintasan pencarian cepat, dan dropdown avatar pengguna dengan badge peran.',
    tags: ['Sticky', 'Logo + Nav', 'Notification Bell', 'User Dropdown', 'Search Shortcut'],
    bestForEn: 'SaaS Dashboards, Admin Panels, CRM, B2B Platforms, Enterprise Apps',
    bestForId: 'Dashboard SaaS, Panel Admin, CRM, Platform B2B, Aplikasi Enterprise',
    badge: 'Flagship Pattern',
    accentColor: '#df7e30',
  },
  {
    id: 'minimal-centered',
    nameEn: 'Minimal Centered Header',
    nameId: 'Header Terpusat Minimalis',
    taglineEn: 'Clean, symmetric centered navigation ideal for landing pages and marketing sites.',
    taglineId: 'Navigasi simetris terpusat yang bersih, ideal untuk halaman landing dan situs pemasaran.',
    descEn: 'Transparent-to-solid adaptive header with centered logo, symmetric navigation links, and a CTA button group. Supports glassmorphic backdrop effect on scroll.',
    descId: 'Header adaptif transparan-ke-solid dengan logo terpusat, tautan navigasi simetris, dan grup tombol CTA. Mendukung efek kaca buram pada scroll.',
    tags: ['Centered Logo', 'Transparent Scroll', 'CTA Button', 'Glassmorphism', 'Clean'],
    bestForEn: 'Marketing Sites, Landing Pages, Portfolios, SaaS Homepages',
    bestForId: 'Situs Pemasaran, Landing Page, Portofolio, Halaman SaaS',
    badge: 'Marketing Ready',
    accentColor: '#6366f1',
  },
  {
    id: 'dashboard-topbar',
    nameEn: 'Dashboard Topbar (Breadcrumb)',
    nameId: 'Topbar Dashboard (Breadcrumb)',
    taglineEn: 'Contextual app header with breadcrumb trail, page actions, and workspace switcher.',
    taglineId: 'Header aplikasi kontekstual dengan breadcrumb, aksi halaman, dan penukar ruang kerja.',
    descEn: 'A secondary-tier application header designed to complement a sidebar layout: displays breadcrumb context, page-level action buttons, last-saved indicator, and workspace selector dropdown.',
    descId: 'Header aplikasi sekunder untuk melengkapi tata letak sidebar: breadcrumb, tombol aksi, indikator terakhir disimpan, dan pemilih ruang kerja.',
    tags: ['Breadcrumb', 'Page Actions', 'Workspace Switcher', 'Last Saved', 'Sidebar Companion'],
    bestForEn: 'Admin Dashboards, Project Tools, CMS Editors, ERP Systems',
    bestForId: 'Dashboard Admin, Alat Proyek, Editor CMS, Sistem ERP',
    badge: 'App Shell',
    accentColor: '#0ea5e9',
  },
  {
    id: 'mega-menu',
    nameEn: 'Mega Menu Header',
    nameId: 'Header Mega Menu',
    taglineEn: 'Wide dropdown mega-menu revealing rich categorized navigation content panels.',
    taglineId: 'Mega menu dropdown lebar yang menampilkan panel navigasi konten terkategorisasi kaya.',
    descEn: 'Full-width mega dropdown with grouped categories, icon-labeled links, featured content cards, and secondary quick-link columns. Perfect for complex product suites.',
    descId: 'Mega dropdown lebar penuh dengan kategori terkelompok, tautan berlabel ikon, kartu konten unggulan. Sempurna untuk rangkaian produk kompleks.',
    tags: ['Mega Dropdown', 'Grouped Categories', 'Feature Cards', 'Rich Navigation', 'Multi-column'],
    bestForEn: 'Product Suites, Enterprise Platforms, E-Commerce, Documentation Portals',
    bestForId: 'Rangkaian Produk, Platform Enterprise, E-Commerce, Portal Dokumentasi',
    badge: 'Rich Navigation',
    accentColor: '#10b981',
  },
  {
    id: 'command-bar',
    nameEn: 'Command Bar Header (⌘K)',
    nameId: 'Header Command Bar (⌘K)',
    taglineEn: 'Keyboard-first expanded search command bar with omnisearch and quick actions.',
    taglineId: 'Bar perintah pencarian berbasis keyboard dengan pencarian universal dan aksi cepat.',
    descEn: 'A productivity-first header featuring a prominent command-bar input with AI-powered suggestions, recent history pills, quick-action shortcuts.',
    descId: 'Header berbasis produktivitas dengan input command-bar dengan saran AI dan pintasan aksi cepat.',
    tags: ['⌘K Command', 'Omnisearch', 'AI Suggestions', 'Quick Actions', 'Keyboard First'],
    bestForEn: 'Developer Tools, Design Platforms, AI Interfaces, Notion-like Apps',
    bestForId: 'Alat Developer, Platform Desain, Antarmuka AI, Aplikasi Mirip Notion',
    badge: 'Keyboard First',
    accentColor: '#df7e30',
  },
  {
    id: 'marketing-nav',
    nameEn: 'Marketing Nav with Announcement',
    nameId: 'Navigasi Pemasaran dengan Pengumuman',
    taglineEn: 'Two-tier header with dismissible top announcement banner and social proof metrics.',
    taglineId: 'Header dua tingkat dengan spanduk pengumuman yang dapat ditutup dan metrik bukti sosial.',
    descEn: 'Two-tier header: a dismissible top announcement bar for product launches, and a main navbar with logo, links, social proof metrics (stars/users count), and dual CTA buttons.',
    descId: 'Header dua tingkat: bar pengumuman yang dapat ditutup untuk peluncuran produk, dan navbar utama dengan logo, tautan, metrik bukti sosial, dan tombol CTA ganda.',
    tags: ['Announcement Bar', 'Social Proof', 'Dual CTA', 'Dismissible Banner', 'Launch Ready'],
    bestForEn: 'SaaS Launches, Product Hunt, App Landing Pages, Startup Websites',
    bestForId: 'Peluncuran SaaS, Product Hunt, Landing Aplikasi, Situs Startup',
    badge: 'Launch Ready',
    accentColor: '#f59e0b',
  },
  {
    id: 'ecommerce-header',
    nameEn: 'E-Commerce Storefront Header',
    nameId: 'Header Toko E-Commerce',
    taglineEn: 'Retail header with category nav, search bar, cart badge, and wishlist counter.',
    taglineId: 'Header ritel dengan navigasi kategori, bilah pencarian, badge keranjang, dan penghitung wishlist.',
    descEn: 'Dedicated storefront header with full-width search bar, category navigation row, shopping cart with item count, wishlist icon, and a promotional banner strip.',
    descId: 'Header toko khusus dengan bilah pencarian, baris navigasi kategori, keranjang belanja dengan jumlah item, ikon wishlist, dan strip banner promosi.',
    tags: ['Search Bar', 'Cart Badge', 'Category Nav', 'Wishlist', 'Promo Banner'],
    bestForEn: 'Online Stores, Marketplaces, Product Catalogs, Retail Brands',
    bestForId: 'Toko Online, Marketplace, Katalog Produk, Merek Ritel',
    badge: 'Commerce Ready',
    accentColor: '#df7e30',
  },
  {
    id: 'docs-navbar',
    nameEn: 'Documentation Navbar',
    nameId: 'Navbar Dokumentasi',
    taglineEn: 'Developer-focused docs header with version badge, GitHub link, and global search.',
    taglineId: 'Header dokumentasi developer dengan badge versi, tautan GitHub, dan pencarian global.',
    descEn: 'A developer documentation navbar featuring package version badge, tabbed section navigation (Guide / API / Components / Changelog), global search with keyboard shortcut, and a GitHub star count.',
    descId: 'Navbar dokumentasi dengan badge versi paket, navigasi seksi bertab, pencarian global dengan pintasan keyboard, dan jumlah bintang GitHub.',
    tags: ['Version Badge', 'Section Tabs', 'GitHub Stars', 'Global Search', 'API Docs'],
    bestForEn: 'Developer Docs, Component Libraries, Open Source Projects, Design Systems',
    bestForId: 'Dokumentasi Developer, Library Komponen, Proyek Open Source, Design System',
    badge: 'Dev Docs',
    accentColor: '#64748b',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Card Mini Architecture Silhouette
// ─────────────────────────────────────────────────────────────────────────────

function CardMiniSilhouette({ id, accentColor }: { id: HeaderVariantId; accentColor: string }) {
  return (
    <div
      style={{
        height: '110px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-canvas)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      {id === 'classic-saas' && (
        <>
          <div style={{ height: 26, borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6, flexShrink: 0 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: accentColor }} />
            <div style={{ height: 4, width: 20, borderRadius: 2, background: accentColor, opacity: 0.8 }} />
            <div style={{ display: 'flex', gap: 5, marginLeft: 8 }}>
              {[accentColor, 'var(--color-border)', 'var(--color-border)'].map((c, i) => (
                <div key={i} style={{ height: 4, width: 16, borderRadius: 2, background: c, opacity: i === 0 ? 0.8 : 1 }} />
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ width: 20, height: 7, borderRadius: 2, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -2, right: -2, width: 4, height: 4, borderRadius: '50%', background: '#ef4444' }} />
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor }} />
            </div>
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ height: 5, width: '25%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.7 }} />
              <div style={{ height: 5, width: 20, borderRadius: 3, background: 'rgba(16,185,129,0.25)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
              {[0,1,2].map(i => <div key={i} style={{ height: 28, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />)}
            </div>
          </div>
        </>
      )}

      {id === 'minimal-centered' && (
        <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accentColor}0a, ${accentColor}05)`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 8, display: 'flex', gap: 6 }}>
              {[0,1].map(i => <div key={i} style={{ height: 4, width: 14, borderRadius: 2, background: 'var(--color-text-secondary)', opacity: 0.5 }} />)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: `linear-gradient(135deg, ${accentColor}, #4338ca)` }} />
              <div style={{ height: 4, width: 22, borderRadius: 2, background: accentColor }} />
            </div>
            <div style={{ position: 'absolute', right: 8, display: 'flex', gap: 4 }}>
              <div style={{ height: 10, width: 18, borderRadius: 3, border: '1px solid var(--color-border)' }} />
              <div style={{ height: 10, width: 22, borderRadius: 3, background: accentColor }} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '0 8px' }}>
            <div style={{ height: 8, width: '65%', borderRadius: 3, background: 'var(--color-text-primary)', opacity: 0.7 }} />
            <div style={{ height: 5, width: '50%', borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ height: 12, width: 28, borderRadius: 4, background: accentColor }} />
              <div style={{ height: 12, width: 24, borderRadius: 4, border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>
      )}

      {id === 'dashboard-topbar' && (
        <>
          <div style={{ height: 26, borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {['var(--color-text-tertiary)', 'var(--color-text-secondary)', accentColor].map((c, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ fontSize: 6, color: 'var(--color-text-tertiary)' }}>/</span>}
                  <div style={{ height: 4, width: i === 2 ? 20 : 12, borderRadius: 2, background: c, opacity: i === 0 ? 0.5 : 1 }} />
                </React.Fragment>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
              <div style={{ height: 8, width: 16, borderRadius: 2, border: '1px solid var(--color-border)' }} />
              <div style={{ height: 8, width: 20, borderRadius: 2, background: accentColor }} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: 22, background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[accentColor, 'var(--color-border)', 'var(--color-border)', 'var(--color-border)'].map((c, i) => <div key={i} style={{ height: 6, borderRadius: 2, background: c }} />)}
            </div>
            <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                {[0,1].map(i => <div key={i} style={{ height: 18, borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />)}
              </div>
              <div style={{ flex: 1, borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </>
      )}

      {id === 'mega-menu' && (
        <>
          <div style={{ height: 26, borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: accentColor }} />
            <div style={{ height: 4, width: 20, borderRadius: 2, background: accentColor, opacity: 0.9 }} />
            <div style={{ display: 'flex', gap: 5, marginLeft: 6 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ height: 4, width: i === 0 ? 18 : 14, borderRadius: 2, background: i === 0 ? `${accentColor}80` : 'var(--color-border)' }} />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', padding: 6, gap: 6 }}>
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 4, width: '60%', background: accentColor, borderRadius: 2 }} />
              {[0,1,2].map(i => (
                <div key={i} style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: `${accentColor}30` }} />
                  <div>
                    <div style={{ height: 3, width: 22, borderRadius: 1, background: 'var(--color-text-secondary)', marginBottom: 2 }} />
                    <div style={{ height: 2.5, width: 32, borderRadius: 1, background: 'var(--color-border)' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 4, width: '50%', background: 'var(--color-border)', borderRadius: 2 }} />
              <div style={{ flex: 1, borderRadius: 4, background: `${accentColor}12`, border: `1px solid ${accentColor}30`, padding: 4 }}>
                <div style={{ height: 3, width: '70%', borderRadius: 1, background: accentColor, opacity: 0.7 }} />
              </div>
            </div>
          </div>
        </>
      )}

      {id === 'command-bar' && (
        <div style={{ width: '100%', height: '100%', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 30, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5, borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: accentColor }} />
            <div style={{ flex: 1, height: 16, borderRadius: 5, border: `1.5px solid ${accentColor}`, background: `${accentColor}08`, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: 1, background: accentColor, opacity: 0.7 }} />
              <div style={{ height: 3.5, flex: 1, borderRadius: 1, background: `${accentColor}30` }} />
              <div style={{ height: 8, width: 14, borderRadius: 2, border: '1px solid var(--color-border)', fontSize: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)' }}>⌘K</div>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />)}
            </div>
          </div>
          <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 3, width: '25%', borderRadius: 1, background: 'var(--color-text-tertiary)', opacity: 0.5 }} />
            {[0,1,2].map(i => (
              <div key={i} style={{ height: 10, borderRadius: 3, background: i === 0 ? `${accentColor}15` : 'var(--color-bg-subtle)', border: i === 0 ? `1px solid ${accentColor}30` : '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 5px', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: 1, background: i === 0 ? accentColor : 'var(--color-border)' }} />
                <div style={{ height: 3, width: i === 0 ? '40%' : '30%', borderRadius: 1, background: i === 0 ? accentColor : 'var(--color-border)', opacity: i === 0 ? 0.7 : 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {id === 'marketing-nav' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 14, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <div style={{ height: 3, width: 40, borderRadius: 1, background: 'rgba(255,255,255,0.7)' }} />
            <div style={{ height: 3, width: 14, borderRadius: 1, background: 'rgba(255,255,255,0.9)' }} />
          </div>
          <div style={{ height: 22, borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: accentColor }} />
              <div style={{ height: 4, width: 16, borderRadius: 2, background: accentColor }} />
            </div>
            <div style={{ display: 'flex', gap: 5, marginLeft: 4 }}>
              {[0,1,2].map(i => <div key={i} style={{ height: 3.5, width: 12, borderRadius: 2, background: 'var(--color-border)' }} />)}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {[0,1,2,3].map(i => <div key={i} style={{ width: 4, height: 4, background: accentColor, opacity: 0.8, borderRadius: 1 }} />)}
              </div>
              <div style={{ height: 10, width: 22, borderRadius: 3, background: accentColor }} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <div style={{ height: 6, width: '70%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.7 }} />
            <div style={{ height: 4, width: '50%', borderRadius: 2, background: 'var(--color-border)' }} />
          </div>
        </div>
      )}

      {id === 'ecommerce-header' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 11, background: `${accentColor}20`, borderBottom: `1px solid ${accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ height: 3, width: 50, borderRadius: 1, background: accentColor, opacity: 0.6 }} />
          </div>
          <div style={{ height: 24, background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: accentColor }} />
              <div style={{ height: 4, width: 14, borderRadius: 2, background: accentColor, opacity: 0.8 }} />
            </div>
            <div style={{ flex: 1, height: 13, borderRadius: 3, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 4px', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 3, flex: 1, borderRadius: 1, background: 'var(--color-border)', opacity: 0.5 }} />
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 7, height: 7, borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
                <div style={{ position: 'absolute', top: -2, right: -2, width: 4, height: 4, borderRadius: '50%', background: accentColor }} />
              </div>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8' }} />
            </div>
          </div>
          <div style={{ height: 16, background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6 }}>
            {[0,1,2,3,4].map(i => <div key={i} style={{ height: 3.5, width: i === 1 ? 18 : 14, borderRadius: 2, background: i === 1 ? `${accentColor}60` : 'var(--color-border)', borderBottom: i === 1 ? `1.5px solid ${accentColor}` : 'none' }} />)}
          </div>
          <div style={{ flex: 1, padding: 6, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />)}
          </div>
        </div>
      )}

      {id === 'docs-navbar' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 26, borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: accentColor, opacity: 0.8 }} />
              <div style={{ height: 4, width: 18, borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.8 }} />
              <div style={{ height: 10, width: 18, borderRadius: 3, border: `1px solid ${accentColor}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 5, color: accentColor }}>v0.2</div>
            </div>
            <div style={{ display: 'flex', gap: 2, marginLeft: 4 }}>
              {['Guide', 'API', 'Comp'].map((_, i) => (
                <div key={i} style={{ height: 14, width: 18, borderRadius: 3, background: i === 0 ? `${accentColor}15` : 'transparent', borderBottom: i === 0 ? `1.5px solid ${accentColor}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ height: 3, width: 10, borderRadius: 1, background: i === 0 ? accentColor : 'var(--color-border)' }} />
                </div>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
              <div style={{ height: 13, width: 32, borderRadius: 3, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
              <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
                <div style={{ height: 3, width: 10, borderRadius: 1, background: 'var(--color-border)' }} />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: 30, borderRight: '1px solid var(--color-border)', padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[60, 45, 55, 40].map((w, i) => (
                <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 1, background: i === 0 ? accentColor : 'var(--color-border)', opacity: i === 0 ? 0.8 : 0.5 }} />
              ))}
            </div>
            <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 5, width: '50%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.7 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[80, 90, 70].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 1, background: 'var(--color-border)' }} />)}
              </div>
              <div style={{ height: 16, borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 4 }}>
                <div style={{ height: 3, width: '80%', borderRadius: 1, background: `${accentColor}40` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Interactive Previews
// ─────────────────────────────────────────────────────────────────────────────

function ClassicSaasHeader() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={15} />, badge: 'Live' },
    { id: 'customers', label: 'Customers', icon: <Users size={15} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={15} /> },
  ];
  return (
    <header style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #df7e30, #b25816)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15 }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)', letterSpacing: '-0.3px' }}>Neudela</span>
        <NeuronBadge size="xs" variant="brand">Pro</NeuronBadge>
      </div>
      <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveNav(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeNav === item.id ? 'rgba(223, 126, 48, 0.1)' : 'transparent', color: activeNav === item.id ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: activeNav === item.id ? 600 : 500, fontSize: 13.5, transition: 'all 0.15s ease' }}>
            {item.icon}
            {item.label}
            {item.badge && <NeuronBadge size="xs" variant="info">{item.badge}</NeuronBadge>}
          </button>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', color: 'var(--color-text-tertiary)', fontSize: 12.5, cursor: 'pointer' }}>
          <Search size={13} />
          <span>Search…</span>
          <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10, fontFamily: 'monospace' }}>⌘K</kbd>
        </button>
        <NeuronTooltip content="Notifications" placement="bottom">
          <button style={{ position: 'relative', width: 36, height: 36, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
            <Bell size={17} />
            <span style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: '50%', background: '#ef4444', border: '1.5px solid var(--color-bg-surface)' }} />
          </button>
        </NeuronTooltip>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setUserMenuOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px 5px 5px', borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', cursor: 'pointer' }}>
            <NeuronAvatar name="Iqbal Dzulfikar" size="xs" status="online" />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</span>
            <ChevronDown size={13} style={{ color: 'var(--color-text-tertiary)', transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {userMenuOpen && (
            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 200, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: 6, zIndex: 100 }}>
              {[{ icon: <User size={14} />, label: 'My Profile' }, { icon: <CreditCard size={14} />, label: 'Billing' }, { icon: <Settings size={14} />, label: 'Settings' }].map(item => (
                <button key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: 13 }}>
                  {item.icon} {item.label}
                </button>
              ))}
              <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', borderRadius: 7, border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontSize: 13 }}>
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MinimalCenteredHeader() {
  const [activeNav, setActiveNav] = useState('');
  return (
    <header style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
      <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
        {['Features', 'Pricing'].map(item => (
          <button key={item} onClick={() => setActiveNav(item)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: activeNav === item ? 'rgba(99,102,241,0.08)' : 'transparent', color: activeNav === item ? '#6366f1' : 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{item}</button>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>N</div>
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px', color: 'var(--color-text-primary)' }}>Neudela</span>
      </div>
      <nav style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {['Docs', 'Blog'].map(item => (
          <button key={item} onClick={() => setActiveNav(item)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: activeNav === item ? 'rgba(99,102,241,0.08)' : 'transparent', color: activeNav === item ? '#6366f1' : 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{item}</button>
        ))}
        <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 4px' }} />
        <NeuronButton size="sm" variant="text">Sign In</NeuronButton>
        <NeuronButton size="sm" variant="primary">Get Started →</NeuronButton>
      </nav>
    </header>
  );
}

function DashboardTopbar() {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const breadcrumbs = ['Workspace', 'Projects', 'Q4 Analytics'];
  return (
    <header style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ position: 'relative' }}>
        <button onClick={() => setWorkspaceOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 800 }}>A</div>
          Acme Corp
          <ChevronDown size={13} style={{ color: 'var(--color-text-tertiary)' }} />
        </button>
        {workspaceOpen && (
          <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: 200, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', padding: 6, zIndex: 100 }}>
            {['Acme Corp', 'Studio Lab', 'Beta Projects'].map((w, i) => (
              <button key={w} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', borderRadius: 7, border: 'none', background: i === 0 ? 'rgba(14,165,233,0.08)' : 'transparent', cursor: 'pointer', fontSize: 13, color: i === 0 ? '#0ea5e9' : 'var(--color-text-secondary)' }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: ['#0ea5e9', '#8b5cf6', '#10b981'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9, fontWeight: 800 }}>{w[0]}</div>
                {w}
                {i === 0 && <Check size={12} style={{ marginLeft: 'auto', color: '#0ea5e9' }} />}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ width: 1, height: 20, background: 'var(--color-border)' }} />
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb}>
            <button style={{ fontSize: 13, color: i === breadcrumbs.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)', fontWeight: i === breadcrumbs.length - 1 ? 600 : 400, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>{crumb}</button>
            {i < breadcrumbs.length - 1 && <span style={{ color: 'var(--color-text-tertiary)', fontSize: 14 }}>/</span>}
          </React.Fragment>
        ))}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Saved 2m ago</span>
        <NeuronButton size="sm" variant="text">Share</NeuronButton>
        <NeuronButton size="sm" variant="primary">Publish</NeuronButton>
        <NeuronAvatar name="Iqbal Dzulfikar" size="sm" status="online" />
      </div>
    </header>
  );
}

function MegaMenuHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const productItems = [
    { title: 'Platform', items: [{ icon: <LayoutGrid size={15} />, label: 'Dashboard Builder', desc: 'Drag-and-drop analytics' }, { icon: <Layers size={15} />, label: 'Data Pipeline', desc: 'ETL & streaming ingestion' }, { icon: <Package size={15} />, label: 'Component SDK', desc: 'Reusable UI primitives' }] },
    { title: 'Integrations', items: [{ icon: <Globe size={15} />, label: 'API Gateway', desc: 'Unified REST & GraphQL' }, { icon: <Zap size={15} />, label: 'Webhooks', desc: 'Real-time event streams' }] },
  ];
  return (
    <header style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 50 }} onMouseLeave={() => setOpenMenu(null)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)', letterSpacing: '-0.3px' }}>Neudela</span>
      </div>
      <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
        {['Products', 'Solutions', 'Resources'].map(menu => (
          <div key={menu} style={{ position: 'relative' }}>
            <button onMouseEnter={() => setOpenMenu(menu)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 8, border: 'none', background: openMenu === menu ? 'rgba(16,185,129,0.08)' : 'transparent', color: openMenu === menu ? '#10b981' : 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              {menu} <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: openMenu === menu ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
        ))}
        <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Pricing</button>
      </nav>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <NeuronButton size="sm" variant="text">Sign In</NeuronButton>
        <NeuronButton size="sm" variant="primary">Start Free Trial</NeuronButton>
      </div>
      {openMenu === 'Products' && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', padding: '24px', display: 'flex', gap: 32, zIndex: 200 }}>
          {productItems.map(cat => (
            <div key={cat.title} style={{ minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-tertiary)', marginBottom: 12 }}>{cat.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {cat.items.map(item => (
                  <button key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 10px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04))', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <NeuronBadge variant="success" size="sm">New</NeuronBadge>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 8, marginBottom: 6 }}>What's New in v2.0</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Neudela 2.0 ships with dark mode, 40+ new components, and enhanced token system.</div>
            </div>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#10b981', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginTop: 16 }}>
              Read release notes <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function CommandBarHeader() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const suggestions = [
    { icon: <LayoutDashboard size={14} />, label: 'Go to Dashboard', shortcut: '↵' },
    { icon: <Users size={14} />, label: 'View All Customers', shortcut: '⌘U' },
    { icon: <BarChart3 size={14} />, label: 'Open Analytics', shortcut: '⌘A' },
    { icon: <Sparkles size={14} />, label: 'Ask AI Assistant', shortcut: '⌘I' },
  ];
  const filtered = query ? suggestions.filter(s => s.label.toLowerCase().includes(query.toLowerCase())) : suggestions;
  return (
    <header style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-brand, #df7e30), #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>N</div>
      </div>
      <div style={{ flex: 1, position: 'relative', maxWidth: 560, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 14px',
          height: 40,
          borderRadius: 10,
          border: `1.5px solid ${focused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}`,
          background: focused ? 'rgba(223, 126, 48, 0.04)' : 'var(--color-bg-subtle)',
          boxShadow: focused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
          transition: 'all 0.2s ease',
        }}>
          <Command size={16} style={{ color: focused ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)', flexShrink: 0 }} />
          <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 200)} placeholder="Search or jump to… (⌘K)" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: 'var(--color-text-primary)' } as React.CSSProperties} />
          {query && <button onClick={() => setQuery('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'flex' }}><X size={14} /></button>}
        </div>
        {focused && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 12, boxShadow: '0 12px 36px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 200 }}>
            <div style={{ padding: '8px 14px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-tertiary)' }}>Quick Actions</div>
            {filtered.map((s, i) => (
              <button
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '9px 14px',
                  border: 'none',
                  background: i === 0 ? 'rgba(223, 126, 48, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: 13.5,
                  color: i === 0 ? 'var(--color-brand, #df7e30)' : 'var(--color-text-primary)',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(223, 126, 48, 0.1)';
                  e.currentTarget.style.color = 'var(--color-brand, #df7e30)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = i === 0 ? 'rgba(223, 126, 48, 0.08)' : 'transparent';
                  e.currentTarget.style.color = i === 0 ? 'var(--color-brand, #df7e30)' : 'var(--color-text-primary)';
                }}
              >
                <span style={{ color: i === 0 ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)' }}>{s.icon}</span>
                <span style={{ flex: 1 }}>{s.label}</span>
                <kbd style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 6px', fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>{s.shortcut}</kbd>
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {[<Bell key="bell" size={17} />, <Star key="star" size={17} />, <HelpCircle key="help" size={17} />].map((icon, i) => (
          <button key={i} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>{icon}</button>
        ))}
        <NeuronAvatar name="Iqbal Dzulfikar" size="sm" status="online" />
      </div>
    </header>
  );
}

function MarketingNavHeader() {
  const [showBanner, setShowBanner] = useState(true);
  const [activeNav, setActiveNav] = useState('');
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {showBanner && (
        <div style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
          <Sparkles size={14} style={{ color: '#fff' }} />
          <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>🎉 Neudela v2.0 is live — <strong>40+ new components & dark mode!</strong></span>
          <button style={{ marginLeft: 8, padding: '3px 10px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>See what's new →</button>
          <button onClick={() => setShowBanner(false)} style={{ position: 'absolute', right: 16, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', display: 'flex' }}><X size={16} /></button>
        </div>
      )}
      <header style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--color-border)', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.3px', color: 'var(--color-text-primary)' }}>Neudela</span>
        </div>
        <nav style={{ display: 'flex', gap: 4 }}>
          {['Features', 'Pricing', 'Docs', 'Changelog'].map(item => (
            <button key={item} onClick={() => setActiveNav(item)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: activeNav === item ? 'rgba(245,158,11,0.1)' : 'transparent', color: activeNav === item ? '#f59e0b' : 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{item}</button>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
            <div style={{ display: 'flex' }}>{[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#f59e0b" style={{ color: '#f59e0b' }} />)}</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)' }}>4.9</span>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>2.4k users</span>
          </div>
          <NeuronButton size="sm" variant="text">Sign In</NeuronButton>
          <NeuronButton size="sm" variant="primary">Start for Free</NeuronButton>
        </div>
      </header>
    </div>
  );
}

function EcommerceHeader({ cartCount = 3 }: { cartCount?: number }) {
  const [wishlistCount] = useState(7);
  const [currency, setCurrency] = useState('IDR');
  const [activeCategory, setActiveCategory] = useState('new-arrivals');
  const [searchFocused, setSearchFocused] = useState(false);
  const categories = ['New Arrivals', 'Men', 'Women', 'Accessories', 'Sale'];
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--color-bg-surface)' }}>
      <div style={{ background: 'linear-gradient(90deg, rgba(223, 126, 48, 0.12), rgba(194, 101, 30, 0.06))', borderBottom: '1px solid rgba(223, 126, 48, 0.18)', padding: '6px 0', textAlign: 'center' }}>
        <span style={{ fontSize: 12.5, color: 'var(--color-brand, #df7e30)', fontWeight: 600 }}>🎁 Free shipping on orders above <strong>Rp 500.000</strong> · Use code <strong>NEUDELA20</strong></span>
      </div>
      <header style={{ borderBottom: '1px solid var(--color-border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-brand, #df7e30), #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.3px', color: 'var(--color-text-primary)' }}>NeuStore</span>
        </div>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          height: 40,
          borderRadius: 10,
          border: `1.5px solid ${searchFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}`,
          boxShadow: searchFocused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
          background: searchFocused ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
          padding: '0 4px 0 12px',
          maxWidth: 520,
          transition: 'all 0.2s ease',
        }}>
          <Search size={15} style={{ color: searchFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)', marginRight: 8, flexShrink: 0 }} />
          <input
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search sneakers, apparel, bags…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: 'var(--color-text-primary)', minWidth: 0 } as React.CSSProperties}
          />
          <div style={{ width: 1, height: 18, background: 'var(--color-border)', margin: '0 8px', flexShrink: 0 }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <select
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                border: 'none',
                background: 'transparent',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                outline: 'none',
                paddingRight: 16,
                paddingLeft: 2,
              }}
            >
              <option>All Categories</option>
              <option>Footwear</option>
              <option>Apparel</option>
              <option>Accessories</option>
            </select>
            <ChevronDown size={11} style={{ position: 'absolute', right: 2, pointerEvents: 'none', color: 'var(--color-text-tertiary)' }} />
          </div>
          <button style={{ height: 32, padding: '0 12px', background: 'var(--color-brand, #df7e30)', border: 'none', borderRadius: 7, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 6, fontSize: 12.5, fontWeight: 600 }}>
            <Search size={13} />
            <span>Search</span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
          <div style={{ width: 110 }}>
            <NeuronSelect
              size="sm"
              value={currency}
              onChange={(val) => setCurrency(val as string)}
              options={[
                { value: 'IDR', label: 'IDR (Rp)' },
                { value: 'USD', label: 'USD ($)' },
              ]}
              leadingType="icon"
              leadingIcon={<Globe size={13} />}
            />
          </div>
          <NeuronTooltip content="Wishlist" placement="bottom">
            <button style={{ position: 'relative', width: 36, height: 36, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
              <Bookmark size={16} />
              {wishlistCount > 0 && <span style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--color-brand, #df7e30)', color: '#fff', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{wishlistCount}</span>}
            </button>
          </NeuronTooltip>
          <button style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 8, border: 'none', background: 'var(--color-brand, #df7e30)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(223, 126, 48, 0.25)' }}>
            <ShoppingCart size={15} />
            <span>Cart</span>
            {cartCount > 0 && <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>{cartCount}</span>}
          </button>
          <NeuronAvatar name="Jane Doe" size="sm" />
        </div>
      </header>
      <nav style={{ borderBottom: '1px solid var(--color-border)', padding: '0 24px', height: 44, display: 'flex', alignItems: 'center', gap: 4 }}>
        {categories.map(cat => {
          const key = cat.toLowerCase().replace(' ', '-');
          const isActive = activeCategory === key;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(key)}
              style={{
                height: 44,
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2.5px solid var(--color-brand, #df7e30)' : '2.5px solid transparent',
                marginBottom: -1,
                borderRadius: 0,
                color: isActive ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'color 0.15s ease, border-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              {cat}
            </button>
          );
        })}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--color-brand, #df7e30)', fontWeight: 600 }}>
          <span>⚡ Flash Deals end in <strong>04:18:22</strong></span>
        </div>
      </nav>
    </div>
  );
}

function DocsNavbar() {
  const [activeSection, setActiveSection] = useState('guide');
  const [searchVal, setSearchVal] = useState('');
  const [docsFocused, setDocsFocused] = useState(false);
  const sections = ['Guide', 'API Reference', 'Components', 'Changelog'];
  return (
    <header style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-brand, #df7e30), #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-text-primary)' }}>Neudela</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-brand, #df7e30)', background: 'rgba(223, 126, 48, 0.1)', border: '1px solid rgba(223, 126, 48, 0.25)', borderRadius: 5, padding: '2px 7px' }}>v0.2.1</span>
          <NeuronBadge size="xs" variant="brand">Stable</NeuronBadge>
        </div>
      </div>
      <nav style={{ display: 'flex', gap: 0, flex: 1 }}>
        {sections.map(sec => (
          <button key={sec} onClick={() => setActiveSection(sec.toLowerCase())} style={{ padding: '18px 16px', border: 'none', background: 'transparent', fontSize: 13.5, fontWeight: activeSection === sec.toLowerCase() ? 600 : 500, color: activeSection === sec.toLowerCase() ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)', cursor: 'pointer', borderBottom: activeSection === sec.toLowerCase() ? '2px solid var(--color-brand, #df7e30)' : '2px solid transparent', transition: 'all 0.15s ease' }}>{sec}</button>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 12px',
          borderRadius: 8,
          border: `1.5px solid ${docsFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}`,
          background: docsFocused ? 'rgba(223, 126, 48, 0.04)' : 'var(--color-bg-subtle)',
          boxShadow: docsFocused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
          minWidth: 180,
          transition: 'all 0.2s ease',
        }}>
          <Search size={13} style={{ color: docsFocused ? 'var(--color-brand, #df7e30)' : 'var(--color-text-tertiary)' }} />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onFocus={() => setDocsFocused(true)}
            onBlur={() => setDocsFocused(false)}
            placeholder="Search docs…"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: 'var(--color-text-primary)', flex: 1, minWidth: 0 } as React.CSSProperties}
          />
          <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10, color: 'var(--color-text-tertiary)', fontFamily: 'monospace', flexShrink: 0 }}>⌘K</kbd>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', fontSize: 13, cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 9, color: '#fff', fontWeight: 800 }}>gh</span></div>
          <Star size={13} style={{ color: '#f59e0b' }} />
          <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>2.4k</span>
        </button>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Render Live Preview
// ─────────────────────────────────────────────────────────────────────────────

function renderLivePreview(variantId: HeaderVariantId, cartCount: number = 3) {
  switch (variantId) {
    case 'classic-saas': return <ClassicSaasHeader />;
    case 'minimal-centered': return <MinimalCenteredHeader />;
    case 'dashboard-topbar': return <DashboardTopbar />;
    case 'mega-menu': return <MegaMenuHeader />;
    case 'command-bar': return <CommandBarHeader />;
    case 'marketing-nav': return <MarketingNavHeader />;
    case 'ecommerce-header': return <EcommerceHeader cartCount={cartCount} />;
    case 'docs-navbar': return <DocsNavbar />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeaderPatternView({ setActiveTab }: HeaderPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [selectedVariant, setSelectedVariant] = useState<HeaderVariantId>('classic-saas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx' | 'css'>('preview');
  const [viewportWidth, setViewportWidth] = useState<'desktop' | 'laptop'>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [copiedCodeTab, setCopiedCodeTab] = useState(false);
  const [ecomCartCount, setEcomCartCount] = useState(3);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [docsActiveSection, setDocsActiveSection] = useState('overview');

  const currentMeta = useMemo(
    () => HEADER_VARIANTS.find(v => v.id === selectedVariant) || HEADER_VARIANTS[0],
    [selectedVariant],
  );

  // Open standalone real app in a new browser tab
  const handleOpenRealAppNewTab = (variantId: HeaderVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-header-${variantId}`;
    window.open(url, '_blank');
  };

  const CODE_SNIPPETS: Record<HeaderVariantId, string> = {
    'classic-saas': `import { useState } from 'react';
import { Search, Bell, ChevronDown, User, CreditCard, Settings, LogOut, LayoutDashboard, BarChart3, Users } from 'lucide-react';
import { NeuronAvatar, NeuronBadge, NeuronTooltip } from 'neudela';
import 'neudela/style.css';

export function ClassicSaasHeader() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header style={{
      background: 'var(--color-bg-surface)',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 24px', height: 60,
      display: 'flex', alignItems: 'center', gap: 24,
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #df7e30, #b25816)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15 }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Neudela</span>
        <NeuronBadge size="xs" variant="brand">Pro</NeuronBadge>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
        {[{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> }].map(item => (
          <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: 'none',
            background: activeNav === item.id ? 'rgba(223, 126, 48, 0.1)' : 'transparent',
            color: activeNav === item.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: activeNav === item.id ? 600 : 500, fontSize: 13.5, cursor: 'pointer',
          }}>
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', color: 'var(--color-text-tertiary)', fontSize: 12.5, cursor: 'pointer' }}>
          <Search size={13} /> Search…
          <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10 }}>⌘K</kbd>
        </button>
        <button style={{ position: 'relative', width: 36, height: 36, borderRadius: 8, border: '1px solid var(--color-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
          <Bell size={17} />
          <span style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: '50%', background: '#ef4444', border: '1.5px solid var(--color-bg-surface)' }} />
        </button>
        <button onClick={() => setUserMenuOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px 5px 5px', borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', cursor: 'pointer' }}>
          <NeuronAvatar name="Iqbal Dzulfikar" size="xs" status="online" />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Iqbal Dzulfikar</span>
          <ChevronDown size={13} />
        </button>
      </div>
    </header>
  );
}`,
    'minimal-centered': `import { useState } from 'react';
import { NeuronButton } from 'neudela';
import 'neudela/style.css';

export function MinimalCenteredHeader() {
  return (
    <header style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 32px', height: 64,
      display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Left Nav */}
      <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
        {['Features', 'Pricing'].map(item => (
          <button key={item} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', fontSize: 14, cursor: 'pointer' }}>{item}</button>
        ))}
      </nav>

      {/* Center Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16 }}>N</div>
        <span style={{ fontWeight: 800, fontSize: 16 }}>Neudela</span>
      </div>

      {/* Right CTA */}
      <nav style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {['Docs', 'Blog'].map(item => (
          <button key={item} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', fontSize: 14, cursor: 'pointer' }}>{item}</button>
        ))}
        <NeuronButton size="sm" variant="text">Sign In</NeuronButton>
        <NeuronButton size="sm" variant="primary">Get Started →</NeuronButton>
      </nav>
    </header>
  );
}`,
    'dashboard-topbar': `// Dashboard Topbar — sidebar companion header
// Requires NeuronButton, NeuronAvatar from 'neudela'
import 'neudela/style.css';

export function DashboardTopbar() {
  return (
    <header style={{
      background: 'var(--color-bg-surface)',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 20px', height: 52,
      display: 'flex', alignItems: 'center', gap: 16,
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      {/* Workspace Switcher, Breadcrumb, Actions here */}
    </header>
  );
}`,
    'mega-menu': `// Mega Menu — hover-triggered wide dropdown
// Uses onMouseEnter/onMouseLeave for activation
import 'neudela/style.css';

export function MegaMenuHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  return (
    <header onMouseLeave={() => setOpenMenu(null)} style={{ position: 'relative', height: 60 }}>
      {/* Logo, nav items with onMouseEnter, mega dropdown panel */}
    </header>
  );
}`,
    'command-bar': `// Command Bar — ⌘K centered omnisearch
import { useState } from 'react';
import { Command, X } from 'lucide-react';
import 'neudela/style.css';

export function CommandBarHeader() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <header style={{ height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ flex: 1, position: 'relative', maxWidth: 560, margin: '0 auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, height: 40,
          borderRadius: 10, border: \`1.5px solid \${focused ? 'var(--color-brand, #df7e30)' : 'var(--color-border)'}\`,
          background: focused ? 'rgba(223, 126, 48, 0.04)' : 'var(--color-bg-subtle)',
          boxShadow: focused ? '0 0 0 3px rgba(223, 126, 48, 0.2)' : 'none',
          padding: '0 14px', transition: 'all 0.2s ease',
        }}>
          <Command size={16} />
          <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Search or jump to… (⌘K)"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14 }}
          />
          <kbd style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '1px 5px', fontSize: 10 }}>⌘K</kbd>
        </div>
        {/* Suggestions dropdown when focused */}
      </div>
    </header>
  );
}`,
    'marketing-nav': `// Marketing Nav — with announcement banner
import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { NeuronButton } from 'neudela';
import 'neudela/style.css';

export function MarketingNavHeader() {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {showBanner && (
        <div style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: 13, color: '#fff' }}>🎉 New release — <strong>See what's new →</strong></span>
          <button onClick={() => setShowBanner(false)} style={{ position: 'absolute', right: 16, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}><X size={16} /></button>
        </div>
      )}
      <header style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', height: 60, display: 'flex', alignItems: 'center', padding: '0 28px' }}>
        {/* Logo, Nav, Social Proof, CTA */}
      </header>
    </div>
  );
}`,
    'ecommerce-header': `// E-Commerce Storefront Header
import { useState } from 'react';
import { Search, ShoppingCart, Bookmark, Globe } from 'lucide-react';
import { NeuronTooltip, NeuronAvatar } from 'neudela';
import 'neudela/style.css';

export function EcommerceHeader() {
  const [cartCount] = useState(3);
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Promo Banner */}
      <div style={{ background: 'rgba(223, 126, 48, 0.12)', padding: '6px 0', textAlign: 'center' }}>
        <span style={{ fontSize: 12.5, color: '#df7e30' }}>Free shipping · Use code NEUDELA20</span>
      </div>
      {/* Main Header */}
      <header style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16 }}>
        {/* Logo, Search Bar, Cart, Wishlist, Avatar */}
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, background: '#df7e30', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <ShoppingCart size={16} /> Cart <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 10, padding: '1px 7px' }}>{cartCount}</span>
        </button>
      </header>
      {/* Category Navigation */}
      <nav style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid var(--color-border)' }}>
        {/* Category tabs */}
      </nav>
    </div>
  );
}`,
    'docs-navbar': `// Documentation Navbar
import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { NeuronBadge } from 'neudela';
import 'neudela/style.css';

export function DocsNavbar() {
  const [activeSection, setActiveSection] = useState('guide');
  return (
    <header style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Logo + Version */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #df7e30, #c2651e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>N</div>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Neudela</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#df7e30', background: 'rgba(223, 126, 48, 0.1)', border: '1px solid rgba(223, 126, 48, 0.25)', borderRadius: 5, padding: '2px 7px' }}>v0.2.1</span>
        <NeuronBadge size="xs" variant="brand">Stable</NeuronBadge>
      </div>

      {/* Section Tabs */}
      <nav style={{ display: 'flex', flex: 1 }}>
        {['Guide', 'API Reference', 'Components', 'Changelog'].map(sec => (
          <button key={sec} onClick={() => setActiveSection(sec.toLowerCase())} style={{ padding: '18px 16px', border: 'none', background: 'transparent', fontSize: 13.5, fontWeight: activeSection === sec.toLowerCase() ? 600 : 500, color: activeSection === sec.toLowerCase() ? '#df7e30' : 'var(--color-text-secondary)', cursor: 'pointer', borderBottom: activeSection === sec.toLowerCase() ? '2px solid #df7e30' : '2px solid transparent' }}>{sec}</button>
        ))}
      </nav>

      {/* Search + GitHub Stars */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input placeholder="Search docs… ⌘K" style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '7px 12px', background: 'var(--color-bg-subtle)', fontSize: 13, outline: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Star size={13} style={{ color: '#f59e0b' }} />
          <strong>2.4k</strong>
        </div>
      </div>
    </header>
  );
}`,
  };

  const handleOpenModal = (variantId: HeaderVariantId) => {
    setSelectedVariant(variantId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const cssTokensCode = useMemo(() => {
    return `/* ── Neudela Header Pattern Architecture Tokens ── */
:root {
  --header-height-standard: 60px;
  --header-height-compact: 52px;
  --header-height-expanded: 72px;
  --header-announcement-height: 36px;
  --header-bg: var(--color-bg-surface);
  --header-bg-glass: rgba(255, 255, 255, 0.85);
  --header-border: var(--color-border);
  --header-z-index: 50;
  --header-padding-x: var(--space-6, 24px);
  --header-nav-gap: var(--space-2, 8px);
  --header-nav-item-padding: var(--space-2, 8px) var(--space-3, 12px);
  --header-nav-item-radius: var(--radius-md, 8px);
  --header-item-hover-bg: rgba(223, 126, 48, 0.08);
  --header-item-active-bg: rgba(223, 126, 48, 0.14);
  --header-item-active-color: var(--color-primary);
  --header-backdrop-blur: 12px;
  --header-transition-timing: cubic-bezier(0.16, 1, 0.3, 1);
}`;
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeTab(true);
    setTimeout(() => setCopiedCodeTab(false), 2000);
  };

  return (
    <div className="pattern-header-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>

      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Pola Navigasi Header (Header Pattern)' : 'Header Navigation Pattern'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Koleksi arsitektur header navigasi Neudela siap pakai. Klik "Preview di Modal" untuk menguji interaktivitas secara langsung dalam dialog pop-up, atau periksa dan salin implementasi kode TSX untuk aplikasi Anda.'
            : 'Turnkey enterprise header navigation architectures. Click "Preview in Modal" to test drive live interactions inside an interactive dialog, or inspect and copy ready-to-use TSX code for your application.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <LayoutGrid size={14} color="#df7e30" />
            <span>{isId ? 'Total Varian:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>8 {isId ? 'Varian Teruji' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>{isId ? 'Dukungan Modal & Tab Baru:' : 'Modal & New Tab:'}</span>
            <strong>Full Real App Mode</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Sparkles size={14} color="#0ea5e9" />
            <span>{isId ? 'Komponen Terpadu:' : 'Composite Atoms:'}</span>
            <strong>8+ Neuron Components</strong>
          </div>
        </div>
      </div>

      {/* ── Section 1: Overview Variant Catalog (Gallery Grid) ── */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Katalog Varian Arsitektur Header' : 'Header Architecture Catalog'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
              {isId 
                ? 'Pilih varian untuk melihat preview di modal pop-up atau salin implementasi kode TSX.' 
                : 'Select any variant to inspect in a modal pop-up, or copy the TSX code implementation.'}
            </p>
          </div>
        </div>

        {/* Variant Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
        }}>
        {HEADER_VARIANTS.map(variant => {
          return (
            <div
              key={variant.id}
              onClick={() => handleOpenModal(variant.id)}
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                padding: 'var(--space-5)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="header-pattern-card sidebar-pattern-card"
            >
              {/* Accent Top Border with Gradient */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px',
                background: `linear-gradient(90deg, ${variant.accentColor} 0%, ${variant.accentColor}30 100%)`,
              }} />

              {/* Card Header & Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: `${variant.accentColor}18`,
                  border: `1px solid ${variant.accentColor}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: variant.accentColor
                }}>
                  {variant.id === 'classic-saas' && <LayoutDashboard size={20} />}
                  {variant.id === 'minimal-centered' && <Sparkles size={20} />}
                  {variant.id === 'dashboard-topbar' && <Layers size={20} />}
                  {variant.id === 'mega-menu' && <LayoutGrid size={20} />}
                  {variant.id === 'command-bar' && <Command size={20} />}
                  {variant.id === 'marketing-nav' && <Star size={20} />}
                  {variant.id === 'ecommerce-header' && <ShoppingCart size={20} />}
                  {variant.id === 'docs-navbar' && <FileText size={20} />}
                </div>

                <span style={{
                  fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px',
                  background: 'var(--color-bg-canvas)',
                  color: variant.accentColor,
                  border: `1px solid ${variant.accentColor}40`
                }}>
                  {variant.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 style={{
                  fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0',
                  color: 'var(--color-text-primary)'
                }}>
                  {isId ? variant.nameId : variant.nameEn}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId ? variant.taglineId : variant.taglineEn}
                </p>
              </div>

              {/* Visual Architecture Silhouette */}
              <div style={{ margin: '4px 0' }}>
                <CardMiniSilhouette id={variant.id} accentColor={variant.accentColor} />
              </div>

              {/* Feature Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {variant.tags.map(tag => (
                  <span 
                    key={tag}
                    style={{
                      fontSize: '10.5px', background: 'var(--color-bg-canvas)',
                      padding: '2px 8px', borderRadius: '6px', color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Dual Action Buttons */}
              <div style={{
                marginTop: 'auto', paddingTop: 'var(--space-3)',
                display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)'
              }}>
                <button
                  onClick={() => handleOpenModal(variant.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'rgba(223, 126, 48, 0.1)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(223, 126, 48, 0.25)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Eye size={14} />
                  <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
                </button>

                <button
                  onClick={(e) => handleOpenRealAppNewTab(variant.id, e)}
                  title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'var(--color-bg-canvas)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <ExternalLink size={14} />
                  <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* ── Section 2: Architecture Anatomy & Design Tokens Breakdown ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-10)'
      }}>
        {/* Anatomy Card */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Layers size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Anatomi Komponen Neudela yang Digunakan' : 'Composite Component Anatomy'}
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            {isId 
              ? 'Pola header Neudela merupakan orkestrasi dari berbagai komponen atomik:' 
              : 'The Neudela header pattern orchestrates multiple atomic building blocks:'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>01</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronAvatar & User Profile:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Menampilkan foto profil pengguna aktif, nama, email, dan menu dropdown pengaturan akun.' : 'Displays active user identity, role tags, and quick-access account preference dropdowns.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>02</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronBadge & Status Indicators:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Indikator counter notifikasi, badge verifikasi tier plan (Pro/Enterprise), dan status rilis versi.' : 'Counters on notification bells, tier subscription badges (Pro/Enterprise), and version tags.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>03</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Command Bar & Search Hub (⌘K):</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pencarian global terintegrasi dengan pintasan keyboard ⌘K untuk navigasi cepat dan aksi sistem.' : 'Global search shortcut triggering command palette filtering and direct action triggers.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>04</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronTooltip:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Memberikan keterangan label pada tombol ikon seperti notifikasi, help, dan keranjang belanja.' : 'Provides instant hover hints on icon action buttons like notifications, help, and cart.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>05</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronButton (Primary, Ghost & Icon):</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Tombol konversi utama (CTA), tombol Sign In dengan varian text/ghost, dan selector workspace.' : 'Primary conversion call-to-actions, text sign-in buttons, and tenant switcher toggles.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>06</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Mega Menu & Dropdown Panels:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Panel bertingkat multi-kolom yang mengelompokkan kategori produk dan solusi bisnis terstruktur.' : 'Multi-column flyout panels organizing expansive product suites and business solutions.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>07</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Vertical Separator & Dividers:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pemisah semantik bersih antar logo brand, navigasi utama, dan grup aksi pengguna kanan.' : 'Clean semantic boundaries between brand mark, main navigation, and right utility actions.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spatial Guidelines Card */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sliders size={18} color="#0ea5e9" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Spesifikasi Ergonomi & Spatial Baseline' : 'Ergonomics & Spatial Specifications'}
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            {isId 
              ? 'Dimensi terkalibrasi berbasis kelipatan 8pt untuk kenyamanan navigasi atas:' 
              : '8pt spatial baseline dimensions tuned for top navigation ergonomics:'}
          </p>

          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-tertiary)' }}>
                <th style={{ padding: '6px 0' }}>{isId ? 'Properti' : 'Property'}</th>
                <th style={{ padding: '6px 0' }}>{isId ? 'Token Nilai' : 'Token Value'}</th>
                <th style={{ padding: '6px 0' }}>{isId ? 'Fungsi' : 'Usage'}</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text-secondary)' }}>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Standard Height</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>56px - 64px</code></td>
                <td>{isId ? 'Tinggi standar topbar nyaman dipandang' : 'Optimal desktop topbar height'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Max Container Width</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>1280px - 1440px</code></td>
                <td>{isId ? 'Batas lebar konten terpusat' : 'Constrained max-width layout'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Elevation & Z-Index</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>sticky (z: 50)</code></td>
                <td>{isId ? 'Tingkat elevasi tetap di atas kanvas' : 'Sticky stacking over page content'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Command Bar Width</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>480px - 560px</code></td>
                <td>{isId ? 'Area klik pencarian proporsional' : 'Proportional central search hub'}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Horizontal Padding</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>20px - 28px</code></td>
                <td>{isId ? 'Jarak aman sisi kiri & kanan' : 'Fluid side gutters (--space-5/6)'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 3: Do's and Don'ts Best Practices ── */}
      <div style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-10)'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--color-text-primary)' }}>
          {isId ? 'Panduan Implementasi: Do & Don\'t' : 'Implementation Guidelines: Do\'s and Don\'ts'}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>
          {isId
            ? 'Prinsip desain untuk memastikan header navigasi Anda ergonomis, rapi, dan mudah diakses pengguna.'
            : 'Core design rules to ensure your top navigation remains ergonomic, clean, and accessible.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{
            background: 'var(--color-bg-canvas)', border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 12, padding: 14, borderLeft: '4px solid #10b981'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <Check size={16} />
              <span>DO: {isId ? 'Berikan Feedback Visual pada Navigasi Aktif' : 'Provide Clear Active Indicators'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId 
                ? 'Selalu sertakan indikator aktif (warna teks kontras atau garis aksen bawah) pada rute/tautan navigasi yang sedang dibuka agar pengguna segera memahami posisi halaman mereka.' 
                : 'Always provide clear visual cues (contrasting text or accent underline indicator) on currently active route links so users immediately orient themselves.'}
            </p>
          </div>

          <div style={{
            background: 'var(--color-bg-canvas)', border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 12, padding: 14, borderLeft: '4px solid #ef4444'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <span>✕</span>
              <span>DON\'T: {isId ? 'Hindari Memasukkan Terlalu Banyak Item Menu Utama' : 'Avoid Overcrowding Main Navigation'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId 
                ? 'Jangan menaruh lebih dari 6-7 tautan menu di header utama tanpa pengelompokan. Gunakan varian Mega Menu atau menu dropdown bertingkat jika aplikasi Anda memiliki banyak fitur.' 
                : 'Never place more than 6-7 main top navigation links without grouping. Migrate to a Mega Menu variant or categorized dropdowns if your product suite is expansive.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Next / Previous ── */}
      <NextPrevious
        prev={{ id: 'pat-sidebar', label: 'Sidebar Navigation' }}
        next={{ id: 'pat-forms', label: isId ? 'Form Patterns' : 'Form Patterns' }}
        setActiveTab={setActiveTab}
      />

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE MODAL POP-UP FOR HEADER PREVIEW
      ══════════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '95vw',
              maxWidth: '1360px',
              height: '90vh',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 22px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-bg-canvas)',
                gap: '16px',
                flexShrink: 0,
              }}
            >
              {/* Left: Title & Variant Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: currentMeta.accentColor,
                    boxShadow: `0 0 10px ${currentMeta.accentColor}`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {isId ? currentMeta.nameId : currentMeta.nameEn}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: `${currentMeta.accentColor}20`,
                        color: currentMeta.accentColor,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {currentMeta.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  >
                    {isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Right Side: Subtabs + Action Buttons (ALWAYS pinned in top right corner) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Modal Subtabs (Preview vs TSX vs CSS) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 36,
                    boxSizing: 'border-box',
                    background: 'var(--color-bg-surface)',
                    padding: 3,
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <button
                    onClick={() => setModalTab('preview')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    onClick={() => setModalTab('tsx')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    React (TSX)
                  </button>
                  <button
                    onClick={() => setModalTab('css')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'css' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'css' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    CSS Tokens
                  </button>
                </div>

                {/* Real App in New Tab + Close */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={(e) => handleOpenRealAppNewTab(selectedVariant, e)}
                    title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 36,
                      boxSizing: 'border-box',
                      gap: 6,
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(223, 126, 48, 0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>{isId ? 'Buka di Tab Baru (Real App)' : 'Open in New Tab (Real App)'}</span>
                  </button>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      height: 36,
                      width: 36,
                      boxSizing: 'border-box',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      padding: 0,
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body: Active Tab Display */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {modalTab === 'preview' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* Canvas Toolbar inside Modal */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 20px',
                      background: 'var(--color-bg-surface)',
                      borderBottom: '1px solid var(--color-border)',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                        {isId ? 'Ukuran Kanvas:' : 'Viewport:'}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          background: 'var(--color-bg-canvas)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          padding: 2,
                        }}
                      >
                        <button
                          onClick={() => setViewportWidth('desktop')}
                          style={{
                            background: viewportWidth === 'desktop' ? 'var(--color-primary)' : 'transparent',
                            color: viewportWidth === 'desktop' ? '#fff' : 'var(--color-text-secondary)',
                            border: 'none',
                            borderRadius: 4,
                            padding: '3px 8px',
                            cursor: 'pointer',
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          Desktop
                        </button>
                        <button
                          onClick={() => setViewportWidth('laptop')}
                          style={{
                            background: viewportWidth === 'laptop' ? 'var(--color-primary)' : 'transparent',
                            color: viewportWidth === 'laptop' ? '#fff' : 'var(--color-text-secondary)',
                            border: 'none',
                            borderRadius: 4,
                            padding: '3px 8px',
                            cursor: 'pointer',
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          Laptop
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Klik menu di header untuk menguji interaksi langsung!' : 'Click header menus to test live interactions!'}
                      </span>
                      <button
                        onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : previewTheme === 'light' ? 'auto' : 'dark')}
                        style={{
                          background: 'var(--color-bg-canvas)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 6,
                          padding: '4px 8px',
                          fontSize: 11,
                          cursor: 'pointer',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        Theme: {previewTheme.toUpperCase()}
                      </button>
                    </div>
                  </div>

                  {/* Render Live Preview Frame */}
                  <div
                    style={{
                      flex: 1,
                      background: previewTheme === 'dark' ? '#090d16' : previewTheme === 'light' ? '#f8fafc' : 'var(--color-bg-canvas)',
                      padding: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      data-theme={previewTheme === 'dark' ? 'dark' : previewTheme === 'light' ? 'light' : undefined}
                      className={previewTheme === 'dark' ? 'dark-theme' : previewTheme === 'light' ? 'light-theme' : ''}
                      style={{
                        width: viewportWidth === 'laptop' ? '980px' : '100%',
                        height: '100%',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        background: previewTheme === 'dark' ? '#0f172a' : 'var(--color-bg-surface)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Top Header */}
                      <div style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
                        {renderLivePreview(selectedVariant, ecomCartCount)}
                      </div>

                      {/* Main Simulated Area underneath */}
                      <main style={{ flex: 1, padding: 24, overflowY: 'auto', background: previewTheme === 'dark' ? '#0b1120' : 'var(--color-bg-canvas)' }}>
                        {/* Variant 1: Classic SaaS */}
                        {selectedVariant === 'classic-saas' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                  {isId ? 'Ikhtisar Konsol SaaS' : 'SaaS Console Overview'}
                                </h4>
                                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                  {isId ? 'Simulasi dashboard aktif yang terhubung dengan navigasi header Neudela' : 'Simulated live console synced with Neudela topbar navigation'}
                                </span>
                              </div>
                              <NeuronBadge size="sm" variant="success">Cluster Online · 99.98%</NeuronBadge>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>{isId ? 'Throughput API' : 'API Throughput'}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)' }}>98.4M reqs</div>
                                <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>↑ 12.4% vs last week</div>
                              </div>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>{isId ? 'Pengguna Aktif' : 'Active Users'}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)' }}>24,892</div>
                                <div style={{ fontSize: 11, color: '#0ea5e9', marginTop: 4 }}>+340 new today</div>
                              </div>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>Latency P99</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)' }}>18 ms</div>
                                <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>SLA target &lt; 50ms</div>
                              </div>
                            </div>

                            <div style={{ background: 'var(--color-bg-surface)', borderRadius: 10, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{isId ? 'Status Microservices Terkini' : 'Recent Microservice Deployments'}</span>
                                <NeuronBadge size="xs" variant="brand">3 Services</NeuronBadge>
                              </div>
                              {[
                                { name: 'auth-service', version: 'v2.4.1', region: 'us-east-1', status: 'Healthy', latency: '12ms' },
                                { name: 'billing-engine', version: 'v3.0.0', region: 'eu-central-1', status: 'Healthy', latency: '19ms' },
                                { name: 'analytics-stream', version: 'v1.8.2', region: 'ap-southeast-1', status: 'Processing', latency: '24ms' },
                              ].map((svc, i) => (
                                <div key={svc.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none', fontSize: 12.5 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{svc.name}</span>
                                    <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>({svc.version})</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>{svc.region}</span>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 11.5 }}>{svc.latency}</span>
                                    <NeuronBadge size="xs" variant="success">{svc.status}</NeuronBadge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Variant 2: Minimal Centered */}
                        {selectedVariant === 'minimal-centered' && (
                          <div style={{ textAlign: 'center', maxWidth: 640, margin: '20px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <NeuronBadge size="sm" variant="brand" style={{ marginBottom: 16 }}>
                              ✨ Neudela 3.0 Public Beta
                            </NeuronBadge>
                            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px', color: 'var(--color-text-primary)' }}>
                              {isId ? 'Cara paling elegan membangun software bersama.' : 'The cleanest way to build software together.'}
                            </h2>
                            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 24px' }}>
                              {isId
                                ? 'Design system terpadu yang dirancang untuk tim pengembang modern. Nol bloat, kejelasan instan, dan kepatuhan aksesibilitas tinggi.'
                                : 'A streamlined, intentional design system crafted for modern development teams. Zero bloat, instant clarity, and full accessibility.'}
                            </p>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
                              <NeuronButton size="sm" variant="primary">{isId ? 'Mulai Sekarang' : 'Start Building Now'}</NeuronButton>
                              <NeuronButton size="sm" variant="outline">{isId ? 'Baca Dokumentasi' : 'Read Documentation'}</NeuronButton>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%', textAlign: 'left' }}>
                              {[
                                { title: isId ? 'Setup Cepat' : 'Instant Setup', desc: isId ? 'Token CSS siap pakai tanpa bundler' : 'Zero-config vanilla CSS tokens' },
                                { title: isId ? 'Aksesibilitas' : 'Accessible', desc: isId ? 'Kepatuhan WCAG 2.1 AA/AAA' : 'WCAG 2.1 AA/AAA compliant' },
                                { title: isId ? '8pt Grid' : 'Spatial Rhythm', desc: isId ? 'Ritme ruang konsisten dan presisi' : 'Predictable 8pt spatial baseline' },
                              ].map(item => (
                                <div key={item.title} style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: 'var(--color-text-primary)' }}>{item.title}</div>
                                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{item.desc}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Variant 3: Dashboard Topbar */}
                        {selectedVariant === 'dashboard-topbar' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                  Acme Corp · {isId ? 'Sprint Analitik Q4' : 'Q4 Analytics Project'}
                                </h4>
                                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                  Workspace / Projects / Q4 Analytics
                                </span>
                              </div>
                              <NeuronBadge size="sm" variant="brand">Sprint 14 Active</NeuronBadge>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{isId ? 'Kelajuan Sprint' : 'Sprint Velocity'}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#0ea5e9' }}>92%</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>24 of 26 tasks complete</div>
                              </div>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{isId ? 'Pull Request Aktif' : 'Open PRs'}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)' }}>18</div>
                                <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>6 approved for merge</div>
                              </div>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{isId ? 'Cakupan Tes' : 'Test Coverage'}</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>94.2%</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>+1.8% this sprint</div>
                              </div>
                            </div>

                            <div style={{ background: 'var(--color-bg-surface)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 16 }}>
                              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--color-text-primary)' }}>
                                {isId ? 'Tugas Aktif dalam Sprint Ini' : 'Tasks In Progress (Current Sprint)'}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                  { tag: 'IN REVIEW', title: isId ? 'Migrasi token warna ke Neudela 2.0 Dark Theme' : 'Migrate color tokens to Neudela 2.0 Dark Theme', user: 'Iqbal Dzulfikar' },
                                  { tag: 'IN PROGRESS', title: isId ? 'Integrasi pintasan keyboard ⌘K untuk navigasi cepat' : 'Integrate ⌘K keyboard shortcut for global navigation', user: 'Sarah Jenkins' },
                                  { tag: 'DONE', title: isId ? 'Implementasi header responsif dan drawer seluler' : 'Implement responsive header and mobile drawer', user: 'David Kim' },
                                ].map((t, idx) => (
                                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                      <NeuronBadge size="xs" variant={t.tag === 'DONE' ? 'success' : t.tag === 'IN REVIEW' ? 'info' : 'warning'}>{t.tag}</NeuronBadge>
                                      <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--color-text-primary)' }}>{t.title}</span>
                                    </div>
                                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{t.user}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Variant 4: Mega Menu */}
                        {selectedVariant === 'mega-menu' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                  {isId ? 'Platform Cloud Enterprise' : 'Enterprise Cloud & API Mesh'}
                                </h4>
                                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                  {isId ? 'Arahkan kursor ke menu Products di header untuk membuka panel mega menu' : 'Hover over Products in the header to trigger the mega menu layout'}
                                </span>
                              </div>
                              <NeuronBadge size="sm" variant="success">Global Mesh 100%</NeuronBadge>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Edge Regions</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>34 PoPs</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>North America, EMEA, APAC</div>
                              </div>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>SSL Gateways</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)' }}>100% Valid</div>
                                <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>Auto-renewed zero downtime</div>
                              </div>
                              <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 10, border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Data Transferred</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-text-primary)' }}>4.8 PB</div>
                                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>Past 30 days throughput</div>
                              </div>
                            </div>

                            <div style={{ background: 'var(--color-bg-surface)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 16 }}>
                              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--color-text-primary)' }}>
                                {isId ? 'Produk Platform Utama' : 'Core Architecture Stack'}
                              </div>
                              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                {isId
                                  ? 'Mega Menu memfasilitasi navigasi bertingkat banyak tanpa membingungkan hierarki visual. Pengguna dapat langsung melompat ke Platform Engine, Data Pipeline, atau Integrasi SDK dari bilah navigasi atas.'
                                  : 'Mega Menu handles deep multi-level capability hierarchies without cluttering page visual rhythm. Developers and operators can jump directly to Platform Engines, Data Ingestion, or SDKs in a single click.'}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Variant 5: Command Bar */}
                        {selectedVariant === 'command-bar' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                  {isId ? 'Pusat Perintah & Navigasi Cepat' : 'Command Dispatch & Fast Navigation Hub'}
                                </h4>
                                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                  {isId ? 'Klik input pencarian di header untuk melihat daftar aksi cepat' : 'Click the search bar in the header to trigger quick action suggestions'}
                                </span>
                              </div>
                              <NeuronBadge size="sm" variant="brand">⌘K Hub Ready</NeuronBadge>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                              {[
                                { label: isId ? 'Buka Dashboard' : 'Go to Dashboard', key: '↵' },
                                { label: isId ? 'Lihat Pelanggan' : 'View Customers', key: '⌘U' },
                                { label: isId ? 'Buka Analitik' : 'Open Analytics', key: '⌘A' },
                                { label: isId ? 'Asisten AI' : 'Ask AI Copilot', key: '⌘I' },
                              ].map(cmd => (
                                <div key={cmd.key} style={{ background: 'var(--color-bg-surface)', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{cmd.label}</span>
                                  <kbd style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '2px 6px', fontSize: 11, fontFamily: 'monospace' }}>{cmd.key}</kbd>
                                </div>
                              ))}
                            </div>

                            <div style={{ background: 'var(--color-bg-surface)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 16 }}>
                              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--color-text-primary)' }}>
                                {isId ? 'Riwayat Perintah Terakhir' : 'Recent Command Activity'}
                              </div>
                              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                {isId ? 'Audit log mencatat setiap perintah yang dijalankan melalui hub navigasi.' : 'Audit trail registers every command triggered through the centralized command topbar.'}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Variant 6: Marketing Nav */}
                        {selectedVariant === 'marketing-nav' && (
                          <div style={{ textAlign: 'center', maxWidth: 640, margin: '20px auto' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                              <Sparkles size={13} />
                              <span>{isId ? 'Rilis Versi 2.0 Resmi Diluncurkan' : 'Version 2.0 Official Launch'}</span>
                            </div>
                            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px', color: 'var(--color-text-primary)' }}>
                              {isId ? 'Tingkatkan Kecepatan Rilis Aplikasi Anda.' : 'Ship Production Web Apps 10x Faster.'}
                            </h2>
                            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 24px' }}>
                              {isId
                                ? 'Neudela menyediakan komponen antarmuka berkualitas enterprise dengan arsitektur header modern, dukungan mode gelap, dan kepatuhan WCAG 2.1.'
                                : 'Neudela provides enterprise-grade UI components with modern topbar headers, instant dark mode, and complete WCAG 2.1 compliance.'}
                            </p>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                              <NeuronButton size="sm" variant="primary">{isId ? 'Coba Gratis 14 Hari' : 'Start 14-Day Free Trial'}</NeuronButton>
                              <NeuronButton size="sm" variant="outline">{isId ? 'Jadwalkan Demo' : 'Book a Demo'}</NeuronButton>
                            </div>
                          </div>
                        )}

                        {/* Variant 7: E-commerce Storefront */}
                        {selectedVariant === 'ecommerce-header' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                              <div>
                                <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                  {isId ? 'Katalog Produk Pilihan · Musim Semi 2026' : 'Featured Storefront Catalog · Spring 2026'}
                                </h4>
                                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                  {isId ? 'Klik tombol "+ Tambah ke Keranjang" untuk melihat pembaruan badge keranjang secara langsung!' : 'Click "+ Add to Cart" to see the header cart badge update live!'}
                                </span>
                              </div>
                              {addedProduct && (
                                <div style={{ background: '#10b981', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 700, animation: 'fadeIn 0.2s ease' }}>
                                  ✓ {isId ? `${addedProduct} ditambahkan ke keranjang!` : `${addedProduct} added to cart!`}
                                </div>
                              )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                              {[
                                { name: 'Neudela Pro Mechanical Keyboard', price: 'Rp 1.499.000', rating: '4.9', reviews: 128, tag: 'Best Seller', icon: '⌨️' },
                                { name: 'Ergonomic Studio Chair v2', price: 'Rp 3.250.000', rating: '4.8', reviews: 84, tag: 'Ergonomic', icon: '🪑' },
                                { name: 'Noise-Cancelling Studio Headset', price: 'Rp 2.100.000', rating: '5.0', reviews: 312, tag: 'Popular', icon: '🎧' },
                              ].map(prod => (
                                <div key={prod.name} style={{ background: 'var(--color-bg-surface)', borderRadius: 12, border: '1px solid var(--color-border)', padding: 16, display: 'flex', flexDirection: 'column' }}>
                                  <div style={{ height: 90, borderRadius: 8, background: 'var(--color-bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 12 }}>
                                    {prod.icon}
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <NeuronBadge size="xs" variant="brand">{prod.tag}</NeuronBadge>
                                    <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>★ {prod.rating} ({prod.reviews})</span>
                                  </div>
                                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4, flex: 1 }}>{prod.name}</div>
                                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-brand, #df7e30)', margin: '8px 0 12px' }}>{prod.price}</div>
                                  <button
                                    onClick={() => {
                                      setEcomCartCount(c => c + 1);
                                      setAddedProduct(prod.name.split(' ')[0]);
                                      setTimeout(() => setAddedProduct(null), 2500);
                                    }}
                                    style={{
                                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                      padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--color-brand, #df7e30)',
                                      color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                                    }}
                                  >
                                    <ShoppingCart size={13} />
                                    <span>{isId ? '+ Tambah ke Keranjang' : '+ Add to Cart'}</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Variant 8: Developer Docs */}
                        {selectedVariant === 'docs-navbar' && (
                          <div style={{ display: 'flex', gap: 20, height: '100%' }}>
                            {/* Mini Docs Sidebar */}
                            <div style={{ width: 180, borderRight: '1px solid var(--color-border)', paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', marginBottom: 6 }}>GETTING STARTED</div>
                              {['Overview', 'Installation', 'Color Tokens', '8pt Spatial Grid'].map(item => (
                                <button
                                  key={item}
                                  onClick={() => setDocsActiveSection(item.toLowerCase())}
                                  style={{
                                    textAlign: 'left', padding: '6px 10px', borderRadius: 6, border: 'none',
                                    background: docsActiveSection === item.toLowerCase() ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                                    color: docsActiveSection === item.toLowerCase() ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                                    fontWeight: docsActiveSection === item.toLowerCase() ? 700 : 500, fontSize: 12, cursor: 'pointer',
                                  }}
                                >
                                  {item}
                                </button>
                              ))}
                              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', marginTop: 12, marginBottom: 6 }}>PATTERNS</div>
                              {['Header Navigation', 'Sidebar Navigation', 'Form Workflows'].map(item => (
                                <button
                                  key={item}
                                  onClick={() => setDocsActiveSection(item.toLowerCase())}
                                  style={{
                                    textAlign: 'left', padding: '6px 10px', borderRadius: 6, border: 'none',
                                    background: docsActiveSection === item.toLowerCase() ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                                    color: docsActiveSection === item.toLowerCase() ? 'var(--color-brand, #df7e30)' : 'var(--color-text-secondary)',
                                    fontWeight: docsActiveSection === item.toLowerCase() ? 700 : 500, fontSize: 12, cursor: 'pointer',
                                  }}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>

                            {/* Docs Content */}
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <NeuronBadge size="xs" variant="neutral">Documentation</NeuronBadge>
                                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Updated today</span>
                              </div>
                              <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 10px', color: 'var(--color-text-primary)' }}>
                                Header Navigation Architecture
                              </h3>
                              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
                                {isId
                                  ? 'Header Navigation Neudela menyatukan logo brand, link navigasi tingkat atas, bilah pencarian global, dan menu profil ke dalam satu baris sticky yang ergonomis dan konsisten di seluruh aplikasi.'
                                  : 'The Neudela Header Navigation pattern standardizes topbars across desktop and laptop viewports with a 60px baseline height and 8pt spatial grid.'}
                              </p>
                              <div style={{ background: '#0d1117', padding: 14, borderRadius: 8, color: '#e6edf3', fontSize: 11.5, fontFamily: 'monospace' }}>
                                <code>npm install neudela</code>
                              </div>
                            </div>
                          </div>
                        )}
                      </main>
                    </div>
                  </div>
                </div>
              )}

              {/* Code TSX Tab inside Modal */}
              {modalTab === 'tsx' && (
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Production React (TypeScript) Code</span>
                    <NeuronButton size="sm" variant="primary" onClick={() => handleCopyCode(CODE_SNIPPETS[selectedVariant] || '')}>
                      {copiedCodeTab ? <Check size={14} /> : <Copy size={14} />}
                      <span style={{ marginLeft: 6 }}>{copiedCodeTab ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin TSX' : 'Copy TSX')}</span>
                    </NeuronButton>
                  </div>
                  <pre style={{ background: '#0d1117', padding: 16, borderRadius: 10, color: '#e6edf3', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", overflowX: 'auto', margin: 0 }}>
                    <code>{CODE_SNIPPETS[selectedVariant]}</code>
                  </pre>
                </div>
              )}

              {/* CSS Tokens Tab inside Modal */}
              {modalTab === 'css' && (
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>CSS Tokens & Architecture</span>
                    <NeuronButton size="sm" variant="primary" onClick={() => handleCopyCode(cssTokensCode)}>
                      {copiedCodeTab ? <Check size={14} /> : <Copy size={14} />}
                      <span style={{ marginLeft: 6 }}>{copiedCodeTab ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin CSS' : 'Copy CSS')}</span>
                    </NeuronButton>
                  </div>
                  <pre style={{ background: '#0d1117', padding: 16, borderRadius: 10, color: '#e6edf3', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", overflowX: 'auto', margin: 0 }}>
                    <code>{cssTokensCode}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
