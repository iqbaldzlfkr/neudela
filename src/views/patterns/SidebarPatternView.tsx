import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronTooltip from '../../components/NeuronTooltip';
import NeuronDivider from '../../components/NeuronDivider';
import {
  LayoutGrid,
  Layers,
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Sparkles,
  Check,
  Copy,
  GitBranch,
  Database,
  Cloud,
  Mail,
  Sliders,
  ShieldCheck,
  Compass,
  ExternalLink,
  Eye,
  X,
  ShoppingBag,
  Store,
  TrendingUp,
  Package,
  Truck,
  Inbox,
  CheckSquare,
  Target,
  ListChecks,
  Search,
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
  Workflow,
} from 'lucide-react';

interface SidebarPatternViewProps {
  setActiveTab: (tabId: string) => void;
}

export type SidebarVariantId = 
  | 'enterprise-suite' 
  | 'compact-rail' 
  | 'dual-tier' 
  | 'floating-dock' 
  | 'workspace-tree'
  | 'ecommerce-merchant'
  | 'productivity-spaces'
  | 'workflow-stepper';

interface VariantMeta {
  id: SidebarVariantId;
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

const SIDEBAR_VARIANTS: VariantMeta[] = [
  {
    id: 'enterprise-suite',
    nameEn: 'Enterprise Suite (Collapsible)',
    nameId: 'Enterprise Suite (Dapat Dilipat)',
    taglineEn: 'The flagship corporate workspace navigation with submenus & tenant selector.',
    taglineId: 'Navigasi korporat unggulan dengan submenu bertingkat & pemilih tenant.',
    descEn: 'Standard 260px wide sidebar featuring workspace switching, search filtering, nested collapsible groups, notification badge counts, and user profile drawer.',
    descId: 'Sidebar standar lebar 260px dengan pengganti ruang kerja, pencarian instan, grup collapsible, indikator badge notifikasi, dan profil pengguna terintegrasi.',
    tags: ['Collapsible', 'Submenus', 'Search Filter', 'Tenant Switcher', 'Profile Card'],
    bestForEn: 'SaaS Platforms, ERP, CRM, Cloud Dashboards, Multi-Tenant Admins',
    bestForId: 'Platform SaaS, ERP, CRM, Dashboard Cloud, Multi-Tenant Admin',
    badge: 'Flagship Pattern',
    accentColor: '#df7e30',
  },
  {
    id: 'compact-rail',
    nameEn: 'Compact Icon Rail (Slim Mini)',
    nameId: 'Rel Ikon Ringkas (Slim Mini)',
    taglineEn: 'Space-saving 68px icon rail maximizing dashboard canvas.',
    taglineId: 'Rel ikon hemat tempat 68px untuk memaksimalkan area kerja aplikasi.',
    descEn: 'Slim vertical navigation with active glow indicators, tooltips on hover, quick-action center trigger, and interactive flyout menu for deep navigation.',
    descId: 'Navigasi ramping dengan indikator aktif tegas, tooltip melayang saat kursor diarahkan, tombol aksi cepat, dan panel flyout interaktif.',
    tags: ['Ultra Compact', 'Tooltips', 'Flyout Submenu', 'Action Center', 'Canvas Focus'],
    bestForEn: 'Design Tools, Analytics Canvases, Media Editors, Fullscreen Viewports',
    bestForId: 'Aplikasi Desain, Kanvas Analitik, Editor Media, Tampilan Layar Penuh',
    badge: 'Space Saver',
    accentColor: '#0ea5e9',
  },
  {
    id: 'dual-tier',
    nameEn: 'Dual-Tier Split Sidebar (Rail + Context)',
    nameId: 'Sidebar Tingkat Ganda (Rel + Panel Konteks)',
    taglineEn: 'Primary module rail coupled with contextual sub-navigation panel.',
    taglineId: 'Rel modul utama terhubung dengan panel navigasi konteks sekunder.',
    descEn: 'Separates global application modules (64px rail) from module-specific contextual views (220px tree panel), inspired by Slack, Discord, and Linear.',
    descId: 'Memisahkan modul aplikasi global (rel 64px) dari sub-halaman kontekstual modul terkait (panel 220px), seperti pola Slack, Discord, dan Linear.',
    tags: ['Two Columns', 'Context Switching', 'Channel/Tag Lists', 'Quick Filter', 'Modular'],
    bestForEn: 'Communication Tools, Documentation Hubs, Mail Clients, Multi-App Suites',
    bestForId: 'Alat Komunikasi, Pusat Dokumentasi, Klien Email, Suite Multi-Aplikasi',
    badge: 'High Density',
    accentColor: '#10b981',
  },
  {
    id: 'floating-dock',
    nameEn: 'Floating Glassmorphic Dock',
    nameId: 'Dock Melayang Glassmorphic',
    taglineEn: 'Detached modern floating dock with frosted glass aesthetics.',
    taglineId: 'Dock modern melayang terpisah dengan estetika kaca buram elegan.',
    descEn: 'Detached rounded sidebar floating 16px off viewport boundaries with translucent blur backdrop, modern border gradient, and sleek micro-interactions.',
    descId: 'Sidebar melayang dengan sudut melengkung 18px berjarak 16px dari tepi layar, latar kaca buram tembus pandang, dan mikro-interaksi modern.',
    tags: ['Glassmorphism', 'Floating Island', 'Modern Aesthetics', 'Integrated Theme Switch', 'Minimalist'],
    bestForEn: 'Modern Web3 Apps, Portfolios, Creative Studios, AI Chat Interfaces',
    bestForId: 'Aplikasi Web3 Modern, Portofolio, Studio Kreatif, Antarmuka AI',
    badge: 'Ultra Modern',
    accentColor: '#8b5cf6',
  },
  {
    id: 'workspace-tree',
    nameEn: 'Workspace & File Tree (IDE / Hub)',
    nameId: 'Pohon Berkas & Workspace (IDE / Hub)',
    taglineEn: 'Hierarchical nested folder tree with branch selector & quota gauge.',
    taglineId: 'Pohon berkas hirarkis dengan pemilih git branch & indikator kuota.',
    descEn: 'Engineered for file hierarchies, multi-level repositories, branch selection, quick file creation, and project storage quota monitoring.',
    descId: 'Dirancang untuk struktur repositori berkas, cabang git, pintasan buat berkas cepat, serta pemantauan kuota penyimpanan proyek.',
    tags: ['Nested Tree', 'Git Branch Selector', 'File Actions', 'Storage Progress', 'Project Hub'],
    bestForEn: 'Cloud IDEs, Code Repositories, Knowledge Bases, Asset Managers',
    bestForId: 'IDE Cloud, Repositori Kode, Basis Pengetahuan, Manajer Aset',
    badge: 'Data Heavy',
    accentColor: '#f59e0b',
  },
  {
    id: 'ecommerce-merchant',
    nameEn: 'E-Commerce & Merchant Console',
    nameId: 'Konsol Merchant & E-Commerce',
    taglineEn: 'Storefront operations with multi-store switcher, real-time order badges, and payout stats.',
    taglineId: 'Operasional toko dengan pemilih multi-store, badge pesanan real-time, dan status payout.',
    descEn: 'Engineered for retail hubs with live store status, inventory low-stock alerts, sales channel navigation, customer CRM, and quick balance withdrawal widgets.',
    descId: 'Dirancang untuk bisnis ritel dengan status toko langsung, peringatan stok menipis, navigasi multi-channel, CRM pelanggan, dan widget penarikan saldo instan.',
    tags: ['Storefront Switcher', 'Live Counters', 'Order Pipeline', 'Inventory Badges', 'Finance Widget'],
    bestForEn: 'E-Commerce Platforms, Retail Dashboards, POS Backends, Multi-Store Operations',
    bestForId: 'Platform E-Commerce, Dashboard Ritel, Backend POS, Operasional Multi-Store',
    badge: 'Operations Heavy',
    accentColor: '#10b981',
  },
  {
    id: 'productivity-spaces',
    nameEn: 'Command Hub & Productivity Spaces',
    nameId: 'Command Hub & Ruang Produktivitas',
    taglineEn: 'Keyboard-first project workspace with quick search, pinned favorites, and team spaces.',
    taglineId: 'Ruang kerja berbasis keyboard dengan pencarian cepat, favorit tersemat, dan ruang tim.',
    descEn: 'Linear and Notion-inspired navigation featuring ⌘K quick switcher, personal task inboxes, segmented team spaces (Engineering, Design, Ops), and active sprint roadmaps.',
    descId: 'Navigasi terinspirasi Linear dan Notion dengan pencarian ⌘K instan, kotak masuk tugas pribadi, ruang kerja tim terkotak, dan peta jalan sprint aktif.',
    tags: ['Command Search (⌘K)', 'Pinned Favorites', 'Team Spaces', 'Sprint Views', 'Issue Counters'],
    bestForEn: 'Project Management, Issue Trackers, Collaborative Workspaces, Product Teams',
    bestForId: 'Manajemen Proyek, Pelacak Isu, Ruang Kolaboratif, Tim Produk Agile',
    badge: 'Keyboard First',
    accentColor: '#6366f1',
  },
  {
    id: 'workflow-stepper',
    nameEn: 'Guided Workflow & Lifecycle Stepper',
    nameId: 'Alur Terpandu & Lifecycle Stepper',
    taglineEn: 'Step-by-step progress navigation for complex enterprise audits & onboarding.',
    taglineId: 'Navigasi progres langkah demi langkah untuk audit enterprise & onboarding terpandu.',
    descEn: 'Multi-stage pipeline sidebar displaying completion milestones, locked dependency gates, active configuration checklists, and overall verification gauge.',
    descId: 'Sidebar alur multi-tahap yang menampilkan capaian milestone, gerbang dependensi terkunci, daftar periksa konfigurasi aktif, dan pengukur verifikasi total.',
    tags: ['Stage Stepper', 'Milestone Checkmarks', 'Completion Progress', 'Gatekeeper Locks', 'Step Notes'],
    bestForEn: 'KYC Verification, Security Audits, Multi-Step Onboarding, Cloud Setup Wizards',
    bestForId: 'Verifikasi KYC, Audit Keamanan, Onboarding Bertahap, Wizard Setup Cloud',
    badge: 'Guided Stepper',
    accentColor: '#ea580c',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Card Mini Architecture Silhouette
// ─────────────────────────────────────────────────────────────────────────────

function CardMiniSilhouette({ id, accentColor }: { id: SidebarVariantId; accentColor: string }) {
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
        position: 'relative',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      {/* 1. Enterprise Suite: Standard 260px collapsible with search, groups, footer */}
      {id === 'enterprise-suite' && (
        <>
          <div style={{ width: '38%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: accentColor, flexShrink: 0 }} />
              <div style={{ height: 5, width: '60%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.8 }} />
            </div>
            <div style={{ height: 7, borderRadius: 3, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', width: '100%' }} />
            <div style={{ height: 5, borderRadius: 2, background: accentColor, width: '80%' }} />
            <div style={{ height: 5, borderRadius: 2, background: 'var(--color-border)', width: '70%' }} />
            <div style={{ height: 4, width: '40%', background: 'var(--color-text-tertiary)', opacity: 0.5, marginTop: 2 }} />
            <div style={{ paddingLeft: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)', width: '75%' }} />
              <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)', width: '60%' }} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4, borderTop: '1px solid var(--color-border)', paddingTop: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} />
              <div style={{ height: 4, width: '50%', background: 'var(--color-border)' }} />
            </div>
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(0,0,0,0.01)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ height: 6, width: '35%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
              <div style={{ height: 6, width: 20, borderRadius: 4, background: 'rgba(16,185,129,0.2)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              <div style={{ height: 20, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 20, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 20, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
          </div>
        </>
      )}

      {/* 2. Compact Rail: Slim 64px vertical icon rail */}
      {id === 'compact-rail' && (
        <>
          <div style={{ width: '18%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '6px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: accentColor, color: '#fff', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>N</div>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: `${accentColor}25`, borderLeft: `2px solid ${accentColor}` }} />
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--color-bg-subtle)' }} />
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--color-bg-subtle)' }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, border: `1px dashed ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, fontSize: 8 }}>+</div>
            <div style={{ marginTop: 'auto', width: 10, height: 10, borderRadius: '50%', background: '#94a3b8' }} />
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 6, width: '40%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
              <div style={{ height: 22, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 22, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 22, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 22, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
          </div>
        </>
      )}

      {/* 3. Dual-Tier Split: TWO COLUMNS (Rail + Context) */}
      {id === 'dual-tier' && (
        <>
          <div style={{ width: '13%', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 0', gap: 5 }}>
            <div style={{ width: 11, height: 11, borderRadius: 3, background: accentColor }} />
            <div style={{ width: 11, height: 11, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ width: 11, height: 11, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <div style={{ width: '32%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '6px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 4, width: '50%', background: accentColor, borderRadius: 2 }} />
            <div style={{ height: 6, borderRadius: 3, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
            <div style={{ height: 5, borderRadius: 2, background: `${accentColor}25`, borderLeft: `2px solid ${accentColor}` }} />
            <div style={{ height: 5, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ height: 5, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ height: 5, borderRadius: 2, background: 'var(--color-border)' }} />
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ height: 6, width: '45%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
            <div style={{ flex: 1, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 12, borderRadius: 3, background: 'var(--color-bg-subtle)' }} />
              <div style={{ height: 12, borderRadius: 3, background: 'var(--color-bg-subtle)' }} />
            </div>
          </div>
        </>
      )}

      {/* 4. Floating Glassmorphic Dock: Detached rounded glass island */}
      {id === 'floating-dock' && (
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.25), transparent 70%)', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <div
            style={{
              width: '38%',
              height: '84%',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(139,92,246,0.4)',
              boxShadow: '0 6px 16px rgba(139,92,246,0.18)',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', flexShrink: 0 }} />
              <div style={{ height: 4, width: '45%', borderRadius: 2, background: '#8b5cf6' }} />
            </div>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(139,92,246,0.25)' }} />
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.06)' }} />
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.06)' }} />
            <div style={{ marginTop: 'auto', height: 4, borderRadius: 2, background: 'rgba(139,92,246,0.3)', width: '70%' }} />
          </div>
          <div style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 6, width: '50%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
            <div style={{ flex: 1, borderRadius: 6, background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(139,92,246,0.15)' }} />
          </div>
        </div>
      )}

      {/* 5. Workspace Tree: IDE Hierarchical Folder Tree */}
      {id === 'workspace-tree' && (
        <>
          <div style={{ width: '42%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 5, width: '45%', background: 'var(--color-text-primary)', opacity: 0.8 }} />
              <div style={{ height: 5, width: 20, borderRadius: 3, background: 'rgba(245,158,11,0.25)' }} />
            </div>
            <div style={{ height: 6, borderRadius: 2, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 7, color: '#f59e0b' }}>📁</span>
              <div style={{ height: 4, width: '40%', background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 7, color: '#f59e0b' }}>📁</span>
                <div style={{ height: 4, width: '45%', background: 'var(--color-text-secondary)' }} />
              </div>
              <div style={{ paddingLeft: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ height: 4, width: '70%', background: `${accentColor}40`, borderRadius: 1 }} />
                <div style={{ height: 4, width: '55%', background: 'var(--color-border)', borderRadius: 1 }} />
              </div>
            </div>
            <div style={{ marginTop: 'auto', height: 3, borderRadius: 2, background: accentColor, width: '70%' }} />
          </div>
          <div style={{ flex: 1, padding: 6, background: 'rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 5, width: '30%', borderRadius: 2, background: '#f59e0b', opacity: 0.8 }} />
            <div style={{ flex: 1, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 4, width: '60%', background: '#0ea5e9', opacity: 0.7 }} />
              <div style={{ height: 4, width: '80%', background: 'var(--color-border)' }} />
              <div style={{ height: 4, width: '45%', background: 'var(--color-border)' }} />
            </div>
          </div>
        </>
      )}

      {/* 6. E-Commerce Merchant: Storefront with order pills & green payout card */}
      {id === 'ecommerce-merchant' && (
        <>
          <div style={{ width: '42%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '6px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 5, width: '55%', background: 'var(--color-text-primary)', opacity: 0.8 }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 4, width: '40%', background: 'var(--color-text-secondary)' }} />
              <div style={{ height: 6, width: 14, borderRadius: 3, background: '#10b981', color: '#fff', fontSize: 5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>14</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 4, width: '45%', background: 'var(--color-text-secondary)' }} />
              <div style={{ height: 6, width: 12, borderRadius: 3, background: '#f59e0b', color: '#fff', fontSize: 5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
            </div>
            <div style={{ height: 4, width: '50%', background: 'var(--color-text-secondary)' }} />
            {/* Green Payout Card */}
            <div style={{ marginTop: 'auto', padding: '3px 4px', borderRadius: 4, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ height: 4, color: '#10b981', fontSize: 6, fontWeight: 800 }}>$18,490</div>
              <div style={{ height: 6, borderRadius: 2, background: '#10b981', width: '100%' }} />
            </div>
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 6, width: '45%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
              <div style={{ height: 22, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 22, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
            <div style={{ flex: 1, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
          </div>
        </>
      )}

      {/* 7. Productivity Spaces: Linear-style ⌘K, favorites, team dots, sprint */}
      {id === 'productivity-spaces' && (
        <>
          <div style={{ width: '42%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 7, color: '#6366f1' }}>⚡</span>
                <div style={{ height: 5, width: 35, background: 'var(--color-text-primary)', opacity: 0.8 }} />
              </div>
              <div style={{ height: 6, width: 12, borderRadius: 2, border: '1px solid var(--color-border)', fontSize: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⌘K</div>
            </div>
            <div style={{ height: 3, width: '35%', background: 'var(--color-text-tertiary)', opacity: 0.5, marginTop: 1 }} />
            <div style={{ height: 4, width: '65%', background: `${accentColor}35`, borderRadius: 1 }} />
            <div style={{ height: 4, width: '55%', background: 'var(--color-border)', borderRadius: 1 }} />
            <div style={{ height: 3, width: '35%', background: 'var(--color-text-tertiary)', opacity: 0.5, marginTop: 1 }} />
            <div style={{ display: 'flex', gap: 3 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ height: 3, width: '50%', background: accentColor }} />
              <div style={{ height: 3, borderRadius: 2, background: 'var(--color-bg-subtle)', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: accentColor }} />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 6, width: '40%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, flex: 1 }}>
              <div style={{ borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ borderRadius: 3, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </>
      )}

      {/* 8. Workflow Stepper: Vertical timeline with connected step circles */}
      {id === 'workflow-stepper' && (
        <>
          <div style={{ width: '46%', borderRight: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', padding: '6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 4, width: '60%', background: '#ea580c', borderRadius: 2 }} />
            <div style={{ height: 3, borderRadius: 2, background: 'var(--color-bg-subtle)', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: '#ea580c' }} />
            </div>
            <div style={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <div style={{ height: 4, width: '60%', background: 'var(--color-text-primary)', opacity: 0.8 }} />
              </div>
              <div style={{ width: 1, height: 6, background: '#10b981', marginLeft: 3.5 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                <div style={{ height: 4, width: '60%', background: 'var(--color-text-primary)', opacity: 0.8 }} />
              </div>
              <div style={{ width: 1, height: 6, background: '#ea580c', marginLeft: 3.5 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ea580c', color: '#fff', fontSize: 5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                <div style={{ height: 4, width: '55%', background: '#ea580c' }} />
              </div>
            </div>
            <div style={{ marginTop: 'auto', height: 7, borderRadius: 3, border: '1px solid #ea580c', width: '100%' }} />
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 6, width: '50%', borderRadius: 2, background: 'var(--color-text-primary)', opacity: 0.6 }} />
            <div style={{ flex: 1, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 10, borderRadius: 2, background: 'rgba(234,88,12,0.1)' }} />
              <div style={{ height: 10, borderRadius: 2, background: 'var(--color-bg-subtle)' }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SidebarPatternView({ setActiveTab }: SidebarPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  // Selected Variant & Modal State
  const [selectedVariant, setSelectedVariant] = useState<SidebarVariantId>('enterprise-suite');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx' | 'css'>('preview');

  // Preview Canvas Controls inside Modal
  const [viewportWidth, setViewportWidth] = useState<'desktop' | 'laptop'>('desktop');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<'auto' | 'dark' | 'light'>('auto');
  
  // Interactive Simulation State
  const [activeRoute, setActiveRoute] = useState<string>('dashboard');
  const [selectedPrimaryModule, setSelectedPrimaryModule] = useState<'cloud' | 'mail' | 'analytics' | 'docs' | 'settings'>('cloud');
  const [modalSearch, setModalSearch] = useState('');
  const [copiedCodeTab, setCopiedCodeTab] = useState(false);
  const [srcFolderOpen, setSrcFolderOpen] = useState(true);
  const [componentsFolderOpen, setComponentsFolderOpen] = useState(true);
  const [stylesFolderOpen, setStylesFolderOpen] = useState(false);

  // Active Meta
  const currentMeta = useMemo(() => {
    return SIDEBAR_VARIANTS.find(v => v.id === selectedVariant) || SIDEBAR_VARIANTS[0];
  }, [selectedVariant]);

  // Open modal preview helper
  const handleOpenModal = (variantId: SidebarVariantId) => {
    setSelectedVariant(variantId);
    setIsSidebarCollapsed(false);
    setModalSearch('');
    setModalTab('preview');
    setIsModalOpen(true);
  };

  // Open standalone real app in a new browser tab
  const handleOpenRealAppNewTab = (variantId: SidebarVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-sidebar-${variantId}`;
    window.open(url, '_blank');
  };

  // Keyboard escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeTab(true);
    setTimeout(() => setCopiedCodeTab(false), 2000);
  };

  // TSX Code for selected variant
  const generatedCode = useMemo(() => {
    switch (selectedVariant) {
      case 'enterprise-suite':
        return `import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, Users, CreditCard, 
  Settings, HelpCircle, ChevronDown, ChevronRight, 
  Search, Bell, LogOut, PanelLeftClose, PanelLeftOpen 
} from 'lucide-react';
import { NeuronAvatar, NeuronBadge, NeuronInput } from 'neudela';

export function EnterpriseSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [managementOpen, setManagementOpen] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <aside 
      className={\`enterprise-sidebar \${isCollapsed ? 'collapsed' : ''}\`}
      style={{
        width: isCollapsed ? '72px' : '260px',
        height: '100vh',
        background: 'var(--color-bg-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: 'var(--space-4)',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Workspace Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #df7e30, #b25816)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13
            }}>
              AC
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>Acme Corp</div>
              <NeuronBadge size="xs" variant="brand">Enterprise Pro</NeuronBadge>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'transparent', border: '1px solid var(--color-border)',
            borderRadius: 6, padding: 6, cursor: 'pointer', color: 'var(--color-text-secondary)'
          }}
        >
          {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* ── Search Input ── */}
      {!isCollapsed && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <NeuronInput 
            size="sm" 
            placeholder="Quick search (⌘K)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* ── Navigation Items ── */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        <SidebarNavItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          active={activeItem === 'dashboard'} 
          onClick={() => setActiveItem('dashboard')}
          collapsed={isCollapsed}
        />
        <SidebarNavItem 
          icon={<BarChart3 size={18} />} 
          label="Analytics" 
          badge={<NeuronBadge size="xs" variant="info">Live</NeuronBadge>}
          active={activeItem === 'analytics'} 
          onClick={() => setActiveItem('analytics')}
          collapsed={isCollapsed}
        />
        <SidebarNavItem 
          icon={<Users size={18} />} 
          label="Customers" 
          active={activeItem === 'customers'} 
          onClick={() => setActiveItem('customers')}
          collapsed={isCollapsed}
        />

        {/* Collapsible Sub-Group */}
        <div style={{ marginTop: 'var(--space-3)' }}>
          {!isCollapsed && (
            <div 
              onClick={() => setManagementOpen(!managementOpen)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 8px', fontSize: '11px', fontWeight: 700,
                color: 'var(--color-text-tertiary)', textTransform: 'uppercase', cursor: 'pointer'
              }}
            >
              <span>Administration</span>
              {managementOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          )}
          {managementOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: isCollapsed ? 0 : '8px' }}>
              <SidebarNavItem 
                icon={<CreditCard size={18} />} 
                label="Billing & Plans" 
                active={activeItem === 'billing'} 
                onClick={() => setActiveItem('billing')}
                collapsed={isCollapsed}
              />
              <SidebarNavItem 
                icon={<Settings size={18} />} 
                label="System Settings" 
                active={activeItem === 'settings'} 
                onClick={() => setActiveItem('settings')}
                collapsed={isCollapsed}
              />
            </div>
          )}
        </div>
      </nav>

      {/* ── User Footer Profile ── */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--space-3)',
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)'
      }}>
        <NeuronAvatar name="Sarah Connor" size="sm" status="online" />
        {!isCollapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sarah Connor</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>sarah@acme.io</div>
          </div>
        )}
      </div>
    </aside>
  );
}

function SidebarNavItem({ icon, label, active, badge, onClick, collapsed }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '8px 10px', borderRadius: '8px',
        border: 'none', background: active ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
        color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        fontWeight: active ? 600 : 500, fontSize: '13px', cursor: 'pointer',
        justifyContent: collapsed ? 'center' : 'flex-start',
        transition: 'all 0.15s ease'
      }}
    >
      {icon}
      {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>}
      {!collapsed && badge}
    </button>
  );
}`;

      case 'compact-rail':
        return `import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, Users, Folder, 
  Settings, Plus, HelpCircle 
} from 'lucide-react';
import { NeuronAvatar, NeuronBadge, NeuronTooltip } from 'neudela';

export function CompactRailSidebar() {
  const [active, setActive] = useState('dashboard');

  return (
    <aside style={{
      width: '68px',
      height: '100vh',
      background: 'var(--color-bg-surface)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 0',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: 'var(--color-primary)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 24
      }}>
        N
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <RailButton icon={<LayoutDashboard size={20} />} label="Overview" active={active === 'dashboard'} onClick={() => setActive('dashboard')} />
        <RailButton icon={<BarChart3 size={20} />} label="Analytics" active={active === 'analytics'} badge="3" onClick={() => setActive('analytics')} />
        <RailButton icon={<Users size={20} />} label="Audience" active={active === 'users'} onClick={() => setActive('users')} />
        <RailButton icon={<Folder size={20} />} label="Projects" active={active === 'projects'} onClick={() => setActive('projects')} />
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <RailButton icon={<Settings size={19} />} label="Settings" active={active === 'settings'} onClick={() => setActive('settings')} />
        <NeuronAvatar name="John Doe" size="sm" status="online" />
      </div>
    </aside>
  );
}

function RailButton({ icon, label, active, badge, onClick }: any) {
  return (
    <NeuronTooltip content={label} placement="right">
      <button
        onClick={onClick}
        style={{
          width: 42, height: 42, borderRadius: 10,
          background: active ? 'var(--color-primary)' : 'transparent',
          color: active ? '#fff' : 'var(--color-text-secondary)',
          border: 'none', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', position: 'relative',
          transition: 'all 0.18s ease'
        }}
      >
        {icon}
        {badge && (
          <span style={{
            position: 'absolute', top: -2, right: -2,
            background: '#ef4444', color: '#fff', fontSize: 10,
            borderRadius: 10, padding: '1px 5px', fontWeight: 700
          }}>
            {badge}
          </span>
        )}
      </button>
    </NeuronTooltip>
  );
}`;

      case 'dual-tier':
        return `import React, { useState } from 'react';
import { Cloud, Mail, Database, Settings, Hash, Plus } from 'lucide-react';
import { NeuronProgress, NeuronInput } from 'neudela';

export function DualTierSidebar() {
  const [activeModule, setActiveModule] = useState<'cloud' | 'mail' | 'db'>('cloud');
  const [activeChannel, setActiveChannel] = useState('prod-cluster');

  return (
    <div style={{ display: 'flex', height: '100vh', borderRight: '1px solid var(--color-border)' }}>
      {/* Tier 1: Primary Rail */}
      <div style={{
        width: 64, background: 'var(--color-bg-canvas)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '16px 0', gap: 12
      }}>
        <RailIcon icon={<Cloud size={20} />} active={activeModule === 'cloud'} onClick={() => setActiveModule('cloud')} />
        <RailIcon icon={<Mail size={20} />} active={activeModule === 'mail'} onClick={() => setActiveModule('mail')} />
        <RailIcon icon={<Database size={20} />} active={activeModule === 'db'} onClick={() => setActiveModule('db')} />
        <div style={{ flex: 1 }} />
        <RailIcon icon={<Settings size={20} />} active={false} onClick={() => {}} />
      </div>

      {/* Tier 2: Contextual Panel */}
      <div style={{
        width: 220, background: 'var(--color-bg-surface)',
        display: 'flex', flexDirection: 'column', padding: '14px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase' }}>
            {activeModule === 'cloud' ? 'Cloud Services' : activeModule === 'mail' ? 'Mailboxes' : 'Databases'}
          </span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
            <Plus size={16} />
          </button>
        </div>

        <NeuronInput size="sm" placeholder="Filter channels..." />

        <div style={{ flex: 1, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['prod-cluster', 'staging-cluster', 'ci-runners'].map(item => (
            <button
              key={item}
              onClick={() => setActiveChannel(item)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px', borderRadius: 6, border: 'none',
                background: activeChannel === item ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                color: activeChannel === item ? '#10b981' : 'var(--color-text-secondary)',
                fontSize: 12.5, fontWeight: activeChannel === item ? 600 : 500,
                cursor: 'pointer', textAlign: 'left'
              }}
            >
              <Hash size={14} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`;

      case 'floating-dock':
        return `import React, { useState } from 'react';
import { Compass, Layers, Sparkles } from 'lucide-react';
import { NeuronAvatar, NeuronBadge } from 'neudela';

export function FloatingDockSidebar() {
  const [active, setActive] = useState('explore');

  return (
    <aside style={{
      width: '240px',
      margin: '16px',
      height: 'calc(100vh - 32px)',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff'
        }}>
          <Sparkles size={16} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Aura Studio</div>
          <NeuronBadge size="xs" variant="brand">v3.2 Glass</NeuronBadge>
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <DockItem icon={<Compass size={18} />} label="Discover" active={active === 'explore'} onClick={() => setActive('explore')} />
        <DockItem icon={<Layers size={18} />} label="Components" active={active === 'components'} onClick={() => setActive('components')} />
      </nav>
    </aside>
  );
}`;

      case 'workspace-tree':
        return `import React, { useState } from 'react';
import { GitBranch, Folder, FolderOpen, FileCode } from 'lucide-react';
import { NeuronProgress } from 'neudela';

export function WorkspaceTreeSidebar() {
  const [srcOpen, setSrcOpen] = useState(true);
  const [activeFile, setActiveFile] = useState('App.tsx');

  return (
    <aside style={{
      width: '260px', height: '100vh',
      background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)',
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
    }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>neudela-design-system</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-text-secondary)' }}>
          <GitBranch size={12} color="#f59e0b" />
          <span>git:main</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        <TreeFolder label="src" open={srcOpen} onClick={() => setSrcOpen(!srcOpen)}>
          <TreeFile label="App.tsx" active={activeFile === 'App.tsx'} onClick={() => setActiveFile('App.tsx')} />
        </TreeFolder>
      </div>
    </aside>
  );
} \`;

      case 'ecommerce-merchant':
        return \`import React, { useState } from 'react';
import { Store, LayoutDashboard, ShoppingBag, Package, Users, TrendingUp, Truck } from 'lucide-react';
import { NeuronBadge, NeuronButton } from 'neudela';

export function EcommerceMerchantSidebar() {
  const [active, setActive] = useState('orders');

  return (
    <aside style={{ width: 250, height: '100vh', background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 14, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Store size={16} color="#10b981" /> Shibuya Boutique
          </span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>tokyo-shibuya.store.jp</div>
      </div>
      <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MerchantNavItem icon={<LayoutDashboard size={17} />} label="Overview" active={active === 'dashboard'} onClick={() => setActive('dashboard')} />
        <MerchantNavItem icon={<ShoppingBag size={17} />} label="Orders" badge="14 New" active={active === 'orders'} onClick={() => setActive('orders')} />
        <MerchantNavItem icon={<Package size={17} />} label="Products" badge="3 Low" active={active === 'products'} onClick={() => setActive('products')} />
        <MerchantNavItem icon={<Users size={17} />} label="Customers" active={active === 'customers'} onClick={() => setActive('customers')} />
        <MerchantNavItem icon={<TrendingUp size={17} />} label="Analytics" active={active === 'analytics'} onClick={() => setActive('analytics')} />
        <MerchantNavItem icon={<Truck size={17} />} label="Shipments" active={active === 'shipments'} onClick={() => setActive('shipments')} />
      </nav>
      <div style={{ padding: 12, borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Available Payout</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#10b981' }}>$18,490.00</div>
        <NeuronButton size="sm" variant="primary" style={{ width: '100%', marginTop: 6 }}>Instant Payout</NeuronButton>
      </div>
    </aside>
  );
}\`;

      case 'productivity-spaces':
        return \`import React, { useState } from 'react';
import { Target, Inbox, CheckSquare, Sparkles, Users } from 'lucide-react';
import { NeuronAvatar } from 'neudela';

export function ProductivitySpacesSidebar() {
  const [active, setActive] = useState('inbox');

  return (
    <aside style={{ width: 240, height: '100vh', background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>⚡</div>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Linear Space</span>
        </div>
        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)', padding: '1px 5px', borderRadius: 4 }}>⌘K</span>
      </div>
      <div style={{ padding: 8, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', padding: '4px 6px' }}>FAVORITES</div>
        <SpaceItem icon={<Inbox size={15} />} label="My Inbox" badge="4" active={active === 'inbox'} onClick={() => setActive('inbox')} />
        <SpaceItem icon={<CheckSquare size={15} />} label="Assigned to Me" badge="9" active={active === 'tasks'} onClick={() => setActive('tasks')} />
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', padding: '10px 6px 4px' }}>TEAMS & SPACES</div>
        <SpaceItem icon={<Target size={15} />} label="Core Engine" active={active === 'engine'} onClick={() => setActive('engine')} />
        <SpaceItem icon={<Sparkles size={15} />} label="Design System" active={active === 'design'} onClick={() => setActive('design')} />
        <SpaceItem icon={<Users size={15} />} label="Product Ops" active={active === 'ops'} onClick={() => setActive('ops')} />
      </div>
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <NeuronAvatar name="Alex Vance" size="xs" status="online" />
        <div style={{ fontSize: 12, fontWeight: 600 }}>Alex Vance</div>
      </div>
    </aside>
  );
}\`;

      case 'workflow-stepper':
        return \`import React, { useState } from 'react';

export function WorkflowStepperSidebar() {
  const [activeStep, setActiveStep] = useState(3);

  const steps = [
    { step: 1, title: 'Identity & SSO', status: 'done', desc: 'SAML 2.0 bound' },
    { step: 2, title: 'Data Encryption', status: 'done', desc: 'AES-256 enabled' },
    { step: 3, title: 'Access Control Policies', status: 'active', desc: 'Role matrix pending' },
    { step: 4, title: 'Continuous Observability', status: 'pending', desc: 'Agent sync required' },
    { step: 5, title: 'Executive Sign-Off', status: 'locked', desc: 'Final audit gate' },
  ];

  return (
    <aside style={{ width: 260, height: '100vh', background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 14, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#ea580c', marginBottom: 4 }}>Audit & Deployment</div>
        <div style={{ fontSize: 14, fontWeight: 800 }}>FedRAMP Audit v2</div>
        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
            <span>Overall Progress</span>
            <strong style={{ color: '#ea580c' }}>60%</strong>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--color-bg-subtle)' }}>
            <div style={{ width: '60%', height: '100%', background: '#ea580c', borderRadius: 3 }} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map(s => (
          <div key={s.step} onClick={() => setActiveStep(s.step)} style={{ padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: activeStep === s.step ? 'rgba(234,88,12,0.08)' : 'transparent', display: 'flex', gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: s.status === 'done' ? '#10b981' : s.status === 'active' ? '#ea580c' : '#e2e8f0', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.status === 'done' ? '✓' : s.status === 'locked' ? '🔒' : s.step}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: activeStep === s.step ? 700 : 500, color: activeStep === s.step ? '#ea580c' : 'inherit' }}>{s.title}</div>
              <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}`;
    }
  }, [selectedVariant]);

  const cssTokensCode = useMemo(() => {
    return `/* ── Neudela Sidebar Pattern Architecture Tokens ── */
:root {
  --sidebar-width-expanded: 260px;
  --sidebar-width-collapsed: 72px;
  --sidebar-width-rail: 64px;
  --sidebar-item-height: 38px;
  --sidebar-item-padding: var(--space-2) var(--space-3);
  --sidebar-item-radius: var(--radius-md, 8px);
  --sidebar-transition-timing: cubic-bezier(0.16, 1, 0.3, 1);
  --sidebar-bg: var(--color-bg-surface);
  --sidebar-border: var(--color-border);
  --sidebar-item-hover-bg: rgba(223, 126, 48, 0.08);
  --sidebar-item-active-bg: rgba(223, 126, 48, 0.14);
  --sidebar-item-active-color: var(--color-primary);
}`;
  }, []);

  return (
    <div className="pattern-sidebar-view" style={{ paddingBottom: 'var(--space-16)' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Pola Navigasi Sidebar (Sidebar Pattern)' : 'Sidebar Navigation Pattern'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Koleksi arsitektur sidebar Neudela siap pakai. Klik "Preview di Modal" untuk menguji interaktivitas secara langsung dalam dialog pop-up, atau klik "Preview Real (Tab Baru)" untuk menjalankan navbar di tab baru secara utuh sebagai aplikasi nyata.'
            : 'Turnkey enterprise sidebar architectures. Click "Preview in Modal" to test drive live interactions inside an interactive dialog, or click "Real App (New Tab)" to launch the sidebar in a dedicated browser tab as a full-screen application.'}
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
              {isId ? 'Katalog Varian Arsitektur Sidebar' : 'Sidebar Architecture Catalog'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
              {isId 
                ? 'Pilih varian untuk melihat preview di modal pop-up atau buka langsung di tab baru secara utuh.' 
                : 'Select any variant to inspect in a modal pop-up, or open directly in a new tab as a real app.'}
            </p>
          </div>
        </div>

        {/* Variant Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {SIDEBAR_VARIANTS.map(variant => {
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
                className="sidebar-pattern-card"
              >
                {/* Accent Top Border */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px',
                  background: variant.accentColor
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
                    {variant.id === 'enterprise-suite' && <LayoutDashboard size={20} />}
                    {variant.id === 'compact-rail' && <Sliders size={20} />}
                    {variant.id === 'dual-tier' && <Layers size={20} />}
                    {variant.id === 'floating-dock' && <Sparkles size={20} />}
                    {variant.id === 'workspace-tree' && <GitBranch size={20} />}
                    {variant.id === 'ecommerce-merchant' && <ShoppingBag size={20} />}
                    {variant.id === 'productivity-spaces' && <Target size={20} />}
                    {variant.id === 'workflow-stepper' && <ListChecks size={20} />}
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
              ? 'Pola sidebar Neudela merupakan orkestrasi dari berbagai komponen atomik:' 
              : 'The Neudela sidebar pattern orchestrates multiple atomic building blocks:'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>01</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronAvatar & Status Dot:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Menampilkan identitas pengguna aktif dan indikator status online di footer sidebar.' : 'Provides user profile representation and online presence indicator in the sidebar footer.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>02</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronBadge & Pill Tags:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Menyorot notifikasi baru, tier paket (Enterprise/Pro), dan status branch git.' : 'Highlights unread counts, feature flags, subscription tiers, and git branch tags.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>03</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronInput with Prefix & Trailing Text:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Kotak pencarian terintegrasi dengan leading search icon dan pintasan keyboard ⌘K untuk filtering menu instan.' : 'Integrated search input with search leading icon and ⌘K keyboard shortcut for rapid menu filtering.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>04</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronTooltip:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Memberikan label kontekstual instan saat sidebar dalam mode rel ikon ringkas.' : 'Delivers instant contextual labels when collapsed to compact rail mode.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>05</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronButton (Actions & Toggles):</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Aksi cepat seperti Instant Payout, tombol lipat/buka (collapse toggle), dan pemicu review pipeline.' : 'Micro actions like Instant Payouts, collapse/expand icon toggles, and pipeline review triggers.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>06</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronProgress:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Indikator persentase penyelesaian audit kepatuhan, kuota ruang penyimpanan, dan milestone proyek.' : 'Visual completion gauge for compliance audits, storage quotas, and sprint progress.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>07</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronDivider:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pemisah semantik bersih antar grup navigasi, modul sekunder, dan footer pengguna.' : 'Semantic separator between navigation groups, secondary tiers, and user footers.'}
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
              ? 'Dimensi terkalibrasi berbasis kelipatan 8pt untuk kenyamanan motorik:' 
              : '8pt spatial baseline dimensions tuned for enterprise motor ergonomics:'}
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
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Expanded Width</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>260px</code></td>
                <td>{isId ? 'Lebar standar nyaman membaca label' : 'Optimum reading line'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Collapsed Rail</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>64px - 72px</code></td>
                <td>{isId ? 'Target klik sentuh minimal' : 'Minimum touch target'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Item Height</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>38px - 40px</code></td>
                <td>{isId ? 'Tinggi baris menu standar' : 'Standard clickable height'}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Active Bar Indicator</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>3px Terracotta</code></td>
                <td>{isId ? 'Jangkar penanda rute aktif' : 'Active route visual anchor'}</td>
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
            ? 'Prinsip desain untuk memastikan sidebar Anda ergonomis, rapi, dan mudah dinavigasi oleh pengguna.'
            : 'Core design rules to ensure your application sidebar remains ergonomic, clean, and accessible.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{
            background: 'var(--color-bg-canvas)', border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 12, padding: 14, borderLeft: '4px solid #10b981'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <Check size={16} />
              <span>DO: {isId ? 'Berikan Tooltip saat Sidebar Dilipat' : 'Provide Tooltips When Collapsed'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId 
                ? 'Selalu sertakan komponen NeuronTooltip pada tombol rel saat sidebar dilipat menjadi mode ikon agar pengguna tidak kebingungan dengan arti ikon tanpa teks.' 
                : 'Always attach NeuronTooltip wrappers when sidebar items collapse to icon-only rails so users never have to guess symbol meanings.'}
            </p>
          </div>

          <div style={{
            background: 'var(--color-bg-canvas)', border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 12, padding: 14, borderLeft: '4px solid #ef4444'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <span>✕</span>
              <span>DON\'T: {isId ? 'Hindari Hirarki Bersarang Melebihi 2 Level' : 'Avoid Deep Nesting Beyond 2 Levels'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId 
                ? 'Jangan membuat submenu bertingkat 3 atau 4 lapis di dalam sidebar utama. Gunakan pola Dual-Tier atau halaman tabs sekunder jika data Anda terlalu kompleks.' 
                : 'Never nest accordion menus 3 or 4 levels deep in the main sidebar. Migrate to a Dual-Tier split sidebar or tabbed secondary page instead.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation Footer ── */}
      <NextPrevious 
        prev={{ id: 'comp-tree', label: isId ? 'Pohon Tampilan (Tree View)' : 'Tree View' }}
        next={{ id: 'pat-forms', label: isId ? 'Formulir (Forms)' : 'Forms Pattern' }}
        setActiveTab={setActiveTab}
      />

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE MODAL POP-UP FOR SIDEBAR PREVIEW
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
                flexWrap: 'wrap',
                gap: '12px',
                flexShrink: 0,
              }}
            >
              {/* Left: Title & Variant Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: currentMeta.accentColor,
                    boxShadow: `0 0 10px ${currentMeta.accentColor}`,
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
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
                      }}
                    >
                      {currentMeta.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Center: Modal Subtabs (Preview vs TSX vs CSS) */}
              <div
                style={{
                  display: 'flex',
                  background: 'var(--color-bg-surface)',
                  padding: 3,
                  borderRadius: 8,
                  border: '1px solid var(--color-border)',
                }}
              >
                <button
                  onClick={() => setModalTab('preview')}
                  style={{
                    background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                    color: modalTab === 'preview' ? '#fff' : 'var(--color-text-secondary)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '5px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                </button>
                <button
                  onClick={() => setModalTab('tsx')}
                  style={{
                    background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                    color: modalTab === 'tsx' ? '#fff' : 'var(--color-text-secondary)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '5px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  React (TSX)
                </button>
                <button
                  onClick={() => setModalTab('css')}
                  style={{
                    background: modalTab === 'css' ? 'var(--color-primary)' : 'transparent',
                    color: modalTab === 'css' ? '#fff' : 'var(--color-text-secondary)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '5px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  CSS Tokens
                </button>
              </div>

              {/* Right: Real App in New Tab + Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Standalone New Tab Button */}
                <button
                  onClick={(e) => handleOpenRealAppNewTab(selectedVariant, e)}
                  title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'var(--color-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(223, 126, 48, 0.3)',
                  }}
                >
                  <ExternalLink size={14} />
                  <span>{isId ? 'Buka di Tab Baru (Real App)' : 'Open in New Tab (Real App)'}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: 6,
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Close modal (Esc)"
                >
                  <X size={16} />
                </button>
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

                      {(selectedVariant === 'enterprise-suite' || selectedVariant === 'workspace-tree') && (
                        <button
                          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            background: 'var(--color-bg-canvas)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          <Sliders size={12} />
                          <span>{isSidebarCollapsed ? (isId ? 'Perlebar' : 'Expand') : (isId ? 'Lipat' : 'Collapse')}</span>
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Klik menu di sidebar untuk melihat reaksi konten!' : 'Click sidebar menus to interact!'}
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
                      style={{
                        width: viewportWidth === 'laptop' ? '980px' : '100%',
                        height: '100%',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        background: selectedVariant === 'floating-dock'
                          ? (previewTheme === 'dark' 
                              ? 'radial-gradient(ellipse at 25% 40%, rgba(139, 92, 246, 0.35) 0%, rgba(15, 23, 42, 0.98) 60%)' 
                              : 'radial-gradient(ellipse at 25% 40%, rgba(139, 92, 246, 0.2) 0%, #f8fafc 60%)')
                          : (previewTheme === 'dark' ? '#0f172a' : 'var(--color-bg-surface)'),
                        display: 'flex',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Varian 1 */}
                      {selectedVariant === 'enterprise-suite' && (
                        <aside
                          style={{
                            width: isSidebarCollapsed ? '70px' : '250px',
                            height: '100%',
                            background: previewTheme === 'dark' ? '#111827' : 'var(--color-bg-surface)',
                            borderRight: '1px solid var(--color-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            flexShrink: 0,
                          }}
                        >
                          <div style={{ padding: '14px', borderBottom: '1px solid var(--color-border)' }}>
                            {!isSidebarCollapsed ? (
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <div style={{ width: 26, height: 26, borderRadius: 6, background: '#df7e30', color: '#fff', fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    AC
                                  </div>
                                  <div>
                                    <div style={{ fontSize: 13, fontWeight: 600 }}>Acme Corp</div>
                                    <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>Enterprise</div>
                                  </div>
                                </div>
                                <NeuronButton
                                  size="xs"
                                  variant="text"
                                  iconOnly
                                  onClick={() => setIsSidebarCollapsed(true)}
                                  title="Collapse"
                                  leadingIcon={<PanelLeftClose size={15} />}
                                />
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 30, height: 30, borderRadius: 6, background: '#df7e30', color: '#fff', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  AC
                                </div>
                                <NeuronButton
                                  size="xs"
                                  variant="text"
                                  iconOnly
                                  onClick={() => setIsSidebarCollapsed(false)}
                                  title="Expand"
                                  leadingIcon={<PanelLeftOpen size={15} />}
                                />
                              </div>
                            )}
                          </div>

                          {!isSidebarCollapsed && (
                            <>
                              <div style={{ padding: '8px 8px 4px' }}>
                                <NeuronInput
                                  placeholder="Search menu (⌘K)..."
                                  leadingIcon={<Search size={13} />}
                                  trailingText="⌘K"
                                  value={modalSearch}
                                  onChange={(e) => setModalSearch(e.target.value)}
                                />
                              </div>
                              <div style={{ padding: '2px 8px' }}>
                                <NeuronDivider />
                              </div>
                            </>
                          )}

                          <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
                            <MockModalNavItem icon={<LayoutDashboard size={17} />} label="Dashboard" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} collapsed={isSidebarCollapsed} />
                            <MockModalNavItem icon={<BarChart3 size={17} />} label="Analytics" badge="Live" active={activeRoute === 'analytics'} onClick={() => setActiveRoute('analytics')} collapsed={isSidebarCollapsed} />
                            <MockModalNavItem icon={<Users size={17} />} label="Customers" active={activeRoute === 'customers'} onClick={() => setActiveRoute('customers')} collapsed={isSidebarCollapsed} />
                            <MockModalNavItem icon={<CreditCard size={17} />} label="Invoices" active={activeRoute === 'invoices'} onClick={() => setActiveRoute('invoices')} collapsed={isSidebarCollapsed} />
                            <MockModalNavItem icon={<Settings size={17} />} label="Settings" active={activeRoute === 'settings'} onClick={() => setActiveRoute('settings')} collapsed={isSidebarCollapsed} />
                          </nav>

                          <div style={{ borderTop: '1px solid var(--color-border)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <NeuronAvatar name="Sarah Connor" size="sm" status="online" />
                            {!isSidebarCollapsed && <span style={{ fontSize: 12, fontWeight: 600 }}>Sarah C.</span>}
                          </div>
                        </aside>
                      )}

                      {/* Varian 2 */}
                      {selectedVariant === 'compact-rail' && (
                        <aside style={{ width: '66px', height: '100%', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: 8, flexShrink: 0 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: '#0ea5e9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 8 }}>N</div>
                          <MockModalRailItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} />
                          <MockModalRailItem icon={<BarChart3 size={18} />} label="Analytics" active={activeRoute === 'analytics'} onClick={() => setActiveRoute('analytics')} />
                          <MockModalRailItem icon={<Users size={18} />} label="Customers" active={activeRoute === 'customers'} onClick={() => setActiveRoute('customers')} />
                          <div style={{ margin: '4px 0' }}>
                            <NeuronTooltip content="Quick Create (+)" placement="right">
                              <NeuronButton size="sm" variant="outline" iconOnly leadingIcon={<Plus size={16} />} aria-label="Quick Create" />
                            </NeuronTooltip>
                          </div>
                          <div style={{ flex: 1 }} />
                          <MockModalRailItem icon={<Settings size={18} />} label="Settings" active={activeRoute === 'settings'} onClick={() => setActiveRoute('settings')} />
                          <NeuronAvatar name="John Doe" size="xs" status="online" />
                        </aside>
                      )}

                      {/* Varian 3 */}
                      {selectedVariant === 'dual-tier' && (
                        <div style={{ display: 'flex', height: '100%', flexShrink: 0 }}>
                          {/* Tier 1: Dark Narrow Module Rail */}
                          <aside
                            style={{
                              width: '64px',
                              borderRight: '1px solid var(--color-border)',
                              background: previewTheme === 'dark' ? '#090d16' : '#0f172a',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              padding: '14px 0',
                              gap: 10,
                            }}
                          >
                            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginBottom: 8, boxShadow: '0 4px 12px rgba(16,185,129,0.35)' }}>
                              DT
                            </div>
                            <NeuronTooltip content="Cloud Infrastructure" placement="right">
                              <MockModalRailItem icon={<Cloud size={19} />} label="Cloud" active={selectedPrimaryModule === 'cloud'} onClick={() => setSelectedPrimaryModule('cloud')} />
                            </NeuronTooltip>
                            <NeuronTooltip content="Event Messaging" placement="right">
                              <MockModalRailItem icon={<Mail size={19} />} label="Mail" active={selectedPrimaryModule === 'mail'} onClick={() => setSelectedPrimaryModule('mail')} />
                            </NeuronTooltip>
                            <NeuronTooltip content="Data Warehousing" placement="right">
                              <MockModalRailItem icon={<Database size={19} />} label="DB" active={selectedPrimaryModule === 'analytics'} onClick={() => setSelectedPrimaryModule('analytics')} />
                            </NeuronTooltip>
                            <div style={{ flex: 1 }} />
                            <MockModalRailItem icon={<Settings size={18} />} label="Config" active={selectedPrimaryModule === 'settings'} onClick={() => setSelectedPrimaryModule('settings')} />
                          </aside>

                          {/* Tier 2: Contextual Resource List */}
                          <aside
                            style={{
                              width: '230px',
                              borderRight: '1px solid var(--color-border)',
                              background: previewTheme === 'dark' ? '#111827' : 'var(--color-bg-surface)',
                              padding: 14,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'capitalize' }}>{selectedPrimaryModule} Hub</div>
                                <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>US-East Region (Active)</div>
                              </div>
                              <NeuronBadge size="xs" variant="success">Tier 2</NeuronBadge>
                            </div>

                            <NeuronInput
                              placeholder={`Search ${selectedPrimaryModule}...`}
                              leadingIcon={<Search size={13} />}
                              value={modalSearch}
                              onChange={(e) => setModalSearch(e.target.value)}
                            />

                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 4 }}>
                              DEPLOYED WORKLOADS
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto' }}>
                              {(selectedPrimaryModule === 'cloud'
                                ? [
                                    { id: 'k8s-prod-us', label: '#prod-k8s-us', status: 'Healthy', ping: '12ms' },
                                    { id: 'k8s-staging-eu', label: '#staging-eu', status: 'Healthy', ping: '45ms' },
                                    { id: 'redis-cache-tier', label: '#redis-cache', status: 'Optimal', ping: '4ms' },
                                    { id: 'edge-gateway', label: '#edge-gateway', status: 'Syncing', ping: '8ms' },
                                  ]
                                : [
                                    { id: `${selectedPrimaryModule}-primary`, label: `#${selectedPrimaryModule}-primary`, status: 'Active', ping: '10ms' },
                                    { id: `${selectedPrimaryModule}-backup`, label: `#${selectedPrimaryModule}-backup`, status: 'Standby', ping: '20ms' },
                                  ]
                              ).filter(r => !modalSearch || r.label.toLowerCase().includes(modalSearch.toLowerCase()))
                              .map(item => (
                                <button
                                  key={item.id}
                                  onClick={() => setActiveRoute(item.id)}
                                  style={{
                                    padding: '8px 10px',
                                    borderRadius: 6,
                                    border: 'none',
                                    background: activeRoute === item.id ? 'rgba(16,185,129,0.14)' : 'transparent',
                                    color: activeRoute === item.id ? '#10b981' : 'inherit',
                                    textAlign: 'left',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    fontWeight: activeRoute === item.id ? 600 : 400,
                                  }}
                                >
                                  <div>
                                    <div>{item.label}</div>
                                    <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>{item.ping}</div>
                                  </div>
                                  <span style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 600 }}>{item.status}</span>
                                </button>
                              ))}
                            </div>

                            <NeuronButton size="xs" variant="outline" leadingIcon={<Plus size={12} />} style={{ width: '100%', marginTop: 'auto' }}>
                              Add Resource
                            </NeuronButton>
                          </aside>
                        </div>
                      )}

                      {/* Varian 4 */}
                      {selectedVariant === 'floating-dock' && (
                        <aside
                          style={{
                            width: '230px',
                            margin: '18px 0 18px 18px',
                            borderRadius: '20px',
                            background: previewTheme === 'dark' ? 'rgba(30, 27, 75, 0.65)' : 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(139, 92, 246, 0.35)',
                            boxShadow: '0 20px 45px -10px rgba(139, 92, 246, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                            padding: '16px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                            flexShrink: 0,
                            zIndex: 10,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)' }}>
                                <Sparkles size={16} />
                              </div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>Aura Studio</div>
                                <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>Floating Glass</div>
                              </div>
                            </div>
                            <NeuronBadge size="xs" variant="brand">Glass Pro</NeuronBadge>
                          </div>

                          <div style={{ padding: '2px 0 6px 0' }}>
                            <NeuronInput
                              placeholder="Quick jump..."
                              leadingIcon={<Search size={13} />}
                              value={modalSearch}
                              onChange={(e) => setModalSearch(e.target.value)}
                            />
                          </div>

                          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                            <MockModalNavItem icon={<Compass size={17} />} label="Discover" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} collapsed={false} />
                            <MockModalNavItem icon={<Layers size={17} />} label="Components" badge="92" active={activeRoute === 'components'} onClick={() => setActiveRoute('components')} collapsed={false} />
                            <MockModalNavItem icon={<Sliders size={17} />} label="Theme Tokens" active={activeRoute === 'tokens'} onClick={() => setActiveRoute('tokens')} collapsed={false} />
                            <MockModalNavItem icon={<Workflow size={17} />} label="Canvas Flows" active={activeRoute === 'flows'} onClick={() => setActiveRoute('flows')} collapsed={false} />
                            <MockModalNavItem icon={<Settings size={17} />} label="Studio Settings" active={activeRoute === 'settings'} onClick={() => setActiveRoute('settings')} collapsed={false} />
                          </nav>

                          <div style={{ marginTop: 'auto', padding: '12px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(99,102,241,0.08))', border: '1px solid rgba(139,92,246,0.25)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6' }}>Pro Workspace</span>
                              <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>v2.4</span>
                            </div>
                            <div style={{ fontSize: 10.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                              Full glassmorphic surface blur active.
                            </div>
                            <NeuronButton size="xs" variant="primary" style={{ width: '100%', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                              Explore Presets
                            </NeuronButton>
                          </div>
                        </aside>
                      )}

                      {/* Varian 5 */}
                      {selectedVariant === 'workspace-tree' && (
                        <aside
                          style={{
                            width: isSidebarCollapsed ? '64px' : '260px',
                            height: '100%',
                            borderRight: '1px solid var(--color-border)',
                            background: previewTheme === 'dark' ? '#0f172a' : 'var(--color-bg-surface)',
                            display: 'flex',
                            flexDirection: 'column',
                            flexShrink: 0,
                            transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        >
                          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {!isSidebarCollapsed ? (
                              <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                                  <FolderOpen size={16} color="#f59e0b" />
                                  <span style={{ fontSize: 12.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>neudela-ui-core</span>
                                </div>
                                <NeuronBadge size="xs" variant="neutral">git:main</NeuronBadge>
                              </>
                            ) : (
                              <div style={{ margin: '0 auto' }}>
                                <FolderOpen size={18} color="#f59e0b" />
                              </div>
                            )}
                          </div>

                          {!isSidebarCollapsed && (
                            <>
                              <div style={{ padding: '8px 10px 4px' }}>
                                <NeuronInput
                                  placeholder="Filter files (⌘P)..."
                                  leadingIcon={<Search size={13} />}
                                  value={modalSearch}
                                  onChange={(e) => setModalSearch(e.target.value)}
                                />
                              </div>

                              <div style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                                <span>Explorer</span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <NeuronTooltip content="New File" placement="top">
                                    <span style={{ cursor: 'pointer' }}>+📄</span>
                                  </NeuronTooltip>
                                  <NeuronTooltip content="New Folder" placement="top">
                                    <span style={{ cursor: 'pointer' }}>+📁</span>
                                  </NeuronTooltip>
                                </div>
                              </div>

                              <div style={{ flex: 1, padding: '0 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Folder: src */}
                                <div>
                                  <div
                                    onClick={() => setSrcFolderOpen(!srcFolderOpen)}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 6,
                                      padding: '4px 6px',
                                      borderRadius: 4,
                                      cursor: 'pointer',
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: 'var(--color-text-primary)',
                                    }}
                                  >
                                    {srcFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    {srcFolderOpen ? <FolderOpen size={14} color="#f59e0b" /> : <Folder size={14} color="#f59e0b" />}
                                    <span>src</span>
                                  </div>

                                  {srcFolderOpen && (
                                    <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                      {/* Subfolder: components */}
                                      <div
                                        onClick={() => setComponentsFolderOpen(!componentsFolderOpen)}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 6,
                                          padding: '4px 6px',
                                          borderRadius: 4,
                                          cursor: 'pointer',
                                          fontSize: 12,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {componentsFolderOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                        {componentsFolderOpen ? <FolderOpen size={13} color="#f59e0b" /> : <Folder size={13} color="#f59e0b" />}
                                        <span>components</span>
                                      </div>

                                      {componentsFolderOpen && (
                                        <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          {[
                                            { name: 'NeuronSidebar.tsx', icon: <FileCode size={13} color="#0ea5e9" />, badge: 'M' },
                                            { name: 'NeuronButton.tsx', icon: <FileCode size={13} color="#0ea5e9" /> },
                                            { name: 'NeuronBadge.tsx', icon: <FileCode size={13} color="#0ea5e9" /> },
                                            { name: 'NeuronInput.tsx', icon: <FileCode size={13} color="#0ea5e9" /> },
                                          ].filter(f => !modalSearch || f.name.toLowerCase().includes(modalSearch.toLowerCase()))
                                          .map(file => (
                                            <div
                                              key={file.name}
                                              onClick={() => setActiveRoute(file.name)}
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '4px 8px',
                                                borderRadius: 4,
                                                cursor: 'pointer',
                                                fontSize: 11.5,
                                                background: activeRoute === file.name ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                                                color: activeRoute === file.name ? '#f59e0b' : 'inherit',
                                                fontWeight: activeRoute === file.name ? 600 : 400,
                                              }}
                                            >
                                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                {file.icon}
                                                <span>{file.name}</span>
                                              </div>
                                              {file.badge && (
                                                <span style={{ fontSize: 9.5, fontWeight: 700, color: '#f59e0b' }}>{file.badge}</span>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Subfolder: styles */}
                                      <div
                                        onClick={() => setStylesFolderOpen(!stylesFolderOpen)}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 6,
                                          padding: '4px 6px',
                                          borderRadius: 4,
                                          cursor: 'pointer',
                                          fontSize: 12,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {stylesFolderOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                        {stylesFolderOpen ? <FolderOpen size={13} color="#f59e0b" /> : <Folder size={13} color="#f59e0b" />}
                                        <span>styles</span>
                                      </div>

                                      {stylesFolderOpen && (
                                        <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          {[
                                            { name: 'tokens.css', icon: <FileCode size={13} color="#ec4899" /> },
                                            { name: 'neudela.css', icon: <FileCode size={13} color="#ec4899" /> },
                                          ].filter(f => !modalSearch || f.name.toLowerCase().includes(modalSearch.toLowerCase()))
                                          .map(file => (
                                            <div
                                              key={file.name}
                                              onClick={() => setActiveRoute(file.name)}
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '4px 8px',
                                                borderRadius: 4,
                                                cursor: 'pointer',
                                                fontSize: 11.5,
                                                background: activeRoute === file.name ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                                                color: activeRoute === file.name ? '#f59e0b' : 'inherit',
                                                fontWeight: activeRoute === file.name ? 600 : 400,
                                                gap: 6,
                                              }}
                                            >
                                              {file.icon}
                                              <span>{file.name}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      <div
                                        onClick={() => setActiveRoute('App.tsx')}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          padding: '4px 8px',
                                          borderRadius: 4,
                                          cursor: 'pointer',
                                          fontSize: 11.5,
                                          background: activeRoute === 'App.tsx' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                                          color: activeRoute === 'App.tsx' ? '#f59e0b' : 'inherit',
                                          fontWeight: activeRoute === 'App.tsx' ? 600 : 400,
                                          gap: 6,
                                        }}
                                      >
                                        <FileCode size={13} color="#0ea5e9" />
                                        <span>App.tsx</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Root Files */}
                                {[
                                  { name: 'package.json', icon: <FileCode size={13} color="#10b981" /> },
                                  { name: 'tsconfig.json', icon: <FileCode size={13} color="#6366f1" /> },
                                ].filter(f => !modalSearch || f.name.toLowerCase().includes(modalSearch.toLowerCase()))
                                .map(file => (
                                  <div
                                    key={file.name}
                                    onClick={() => setActiveRoute(file.name)}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: '4px 8px',
                                      borderRadius: 4,
                                      cursor: 'pointer',
                                      fontSize: 11.5,
                                      background: activeRoute === file.name ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                                      color: activeRoute === file.name ? '#f59e0b' : 'inherit',
                                      fontWeight: activeRoute === file.name ? 600 : 400,
                                      gap: 6,
                                    }}
                                  >
                                    {file.icon}
                                    <span>{file.name}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Bottom Storage Quota */}
                              <div style={{ borderTop: '1px solid var(--color-border)', padding: '10px 14px', background: 'var(--color-bg-subtle)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginBottom: 4 }}>
                                  <span style={{ color: 'var(--color-text-tertiary)' }}>Cloud IDE Storage</span>
                                  <span style={{ fontWeight: 700, color: '#f59e0b' }}>1.2 GB / 5.0 GB</span>
                                </div>
                                <NeuronProgress value={24} variant="warning" size="xs" />
                              </div>
                            </>
                          )}
                        </aside>
                      )}

                      {/* Varian 6: E-Commerce Merchant */}
                      {selectedVariant === 'ecommerce-merchant' && (
                        <aside style={{ width: '250px', height: '100%', borderRight: '1px solid var(--color-border)', background: previewTheme === 'dark' ? '#0f172a' : 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                          <div style={{ padding: '14px', borderBottom: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                              <span style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Store size={16} color="#10b981" /> Shibuya Boutique
                              </span>
                              <NeuronBadge size="xs" variant="success">Live</NeuronBadge>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>tokyo-shibuya.store.jp</div>
                          </div>
                          <div style={{ padding: '8px 8px 4px' }}>
                            <NeuronInput
                              placeholder="Search orders, SKUs..."
                              leadingIcon={<Search size={13} />}
                              value={modalSearch}
                              onChange={(e) => setModalSearch(e.target.value)}
                            />
                          </div>
                          <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
                            <MockModalNavItem icon={<LayoutDashboard size={17} />} label="Overview" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} />
                            <MockModalNavItem icon={<ShoppingBag size={17} />} label="Orders" badge="14 New" active={activeRoute === 'orders'} onClick={() => setActiveRoute('orders')} />
                            <MockModalNavItem icon={<Package size={17} />} label="Products" badge="3 Low" active={activeRoute === 'products'} onClick={() => setActiveRoute('products')} />
                            <MockModalNavItem icon={<Users size={17} />} label="Customers" active={activeRoute === 'customers'} onClick={() => setActiveRoute('customers')} />
                            <MockModalNavItem icon={<TrendingUp size={17} />} label="Analytics" active={activeRoute === 'analytics'} onClick={() => setActiveRoute('analytics')} />
                            <MockModalNavItem icon={<Truck size={17} />} label="Shipments" active={activeRoute === 'shipments'} onClick={() => setActiveRoute('shipments')} />
                          </nav>
                          <div style={{ padding: 12, borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Available Payout</div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: '#10b981', margin: '2px 0 6px 0' }}>$18,490.00</div>
                            <NeuronButton size="sm" variant="primary" style={{ width: '100%' }}>Instant Payout</NeuronButton>
                          </div>
                        </aside>
                      )}

                      {/* Varian 7: Productivity Spaces */}
                      {selectedVariant === 'productivity-spaces' && (
                        <aside style={{ width: '240px', height: '100%', borderRight: '1px solid var(--color-border)', background: previewTheme === 'dark' ? '#0f172a' : 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>⚡</div>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>Linear Space</span>
                              </div>
                              <NeuronBadge size="xs" variant="neutral">⌘K</NeuronBadge>
                            </div>
                          </div>
                          <div style={{ padding: '8px 8px 4px' }}>
                            <NeuronInput
                              placeholder="Search spaces or ⌘K..."
                              leadingIcon={<Search size={13} />}
                              trailingText="⌘K"
                              value={modalSearch}
                              onChange={(e) => setModalSearch(e.target.value)}
                            />
                          </div>
                          <div style={{ padding: '4px 8px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', padding: '4px 6px' }}>FAVORITES</div>
                            <MockModalNavItem icon={<Inbox size={15} />} label="My Inbox" badge="4" active={activeRoute === 'dashboard'} onClick={() => setActiveRoute('dashboard')} />
                            <MockModalNavItem icon={<CheckSquare size={15} />} label="Assigned to Me" badge="9" active={activeRoute === 'tasks'} onClick={() => setActiveRoute('tasks')} />
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', padding: '10px 6px 4px' }}>TEAMS & SPACES</div>
                            <MockModalNavItem icon={<Target size={15} />} label="Core Engine" active={activeRoute === 'engine'} onClick={() => setActiveRoute('engine')} />
                            <MockModalNavItem icon={<Sparkles size={15} />} label="Design System" active={activeRoute === 'design'} onClick={() => setActiveRoute('design')} />
                            <MockModalNavItem icon={<Users size={15} />} label="Product Ops" active={activeRoute === 'ops'} onClick={() => setActiveRoute('ops')} />
                          </div>
                          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <NeuronAvatar name="Alex Vance" size="xs" status="online" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 12, fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Alex Vance</div>
                              <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>🎯 Sprint Planning</div>
                            </div>
                          </div>
                        </aside>
                      )}

                      {/* Varian 8: Workflow Stepper */}
                      {selectedVariant === 'workflow-stepper' && (
                        <aside style={{ width: '260px', height: '100%', borderRight: '1px solid var(--color-border)', background: previewTheme === 'dark' ? '#0f172a' : 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                          <div style={{ padding: '14px', borderBottom: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#ea580c', marginBottom: 4 }}>Audit & Deployment</div>
                            <div style={{ fontSize: 14, fontWeight: 800 }}>FedRAMP Audit v2</div>
                            <div style={{ marginTop: 8 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                                <span>Overall Progress</span>
                                <strong style={{ color: '#ea580c' }}>60%</strong>
                              </div>
                              <NeuronProgress value={60} variant="warning" size="sm" />
                            </div>
                          </div>
                          <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {[
                              { step: '1', title: 'Identity & SSO', status: 'done', desc: 'SAML 2.0 bound' },
                              { step: '2', title: 'Data Encryption', status: 'done', desc: 'AES-256 enabled' },
                              { step: '3', title: 'Access Control Policies', status: 'active', desc: 'Role matrix pending' },
                              { step: '4', title: 'Continuous Observability', status: 'pending', desc: 'Agent sync required' },
                              { step: '5', title: 'Executive Sign-Off', status: 'locked', desc: 'Final audit gate' },
                            ].map((s, idx) => (
                              <div key={s.step} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                  onClick={() => setActiveRoute(`step-${s.step}`)}
                                  style={{
                                    padding: '8px 10px',
                                    borderRadius: 8,
                                    border: activeRoute === `step-${s.step}` ? '1px solid #ea580c' : '1px solid transparent',
                                    background: activeRoute === `step-${s.step}` ? 'rgba(234,88,12,0.08)' : 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 10,
                                  }}
                                >
                                  <div style={{
                                    width: 22, height: 22, borderRadius: '50%',
                                    background: s.status === 'done' ? '#10b981' : s.status === 'active' ? '#ea580c' : 'var(--color-bg-subtle)',
                                    color: s.status === 'done' || s.status === 'active' ? '#fff' : 'var(--color-text-tertiary)',
                                    fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                                    boxShadow: s.status === 'active' ? '0 0 0 3px rgba(234,88,12,0.2)' : 'none',
                                  }}>
                                    {s.status === 'done' ? '✓' : s.status === 'locked' ? <Lock size={11} /> : s.step}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: s.status === 'active' ? 700 : 500, color: s.status === 'active' ? '#ea580c' : 'inherit' }}>{s.title}</div>
                                    <div style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>{s.desc}</div>
                                  </div>
                                </div>
                                {idx < 4 && (
                                  <div style={{
                                    width: 2, height: 12,
                                    background: s.status === 'done' ? '#10b981' : 'var(--color-border)',
                                    marginLeft: 20,
                                    marginRight: 'auto',
                                  }} />
                                )}
                              </div>
                            ))}
                          </div>
                          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                            <NeuronButton size="xs" variant="outline" style={{ width: '100%' }}>
                              Request Fast-Track Review
                            </NeuronButton>
                          </div>
                        </aside>
                      )}

                      {/* Main Simulated Area */}
                      <main style={{ flex: 1, padding: 20, overflowY: 'auto', background: previewTheme === 'dark' ? '#0b1120' : 'var(--color-bg-canvas)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                          <div>
                            <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, textTransform: 'capitalize' }}>
                              {activeRoute} View
                            </h4>
                            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                              Simulated dynamic console state
                            </span>
                          </div>
                          <NeuronBadge size="sm" variant="success">Online</NeuronBadge>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                          <div style={{ background: 'var(--color-bg-surface)', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Throughput</div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>1.42M req</div>
                          </div>
                          <div style={{ background: 'var(--color-bg-surface)', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Active Users</div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>8,492</div>
                          </div>
                          <div style={{ background: 'var(--color-bg-surface)', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Latency P99</div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>28 ms</div>
                          </div>
                        </div>

                        <div style={{ background: 'var(--color-bg-surface)', padding: 14, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Recent Events</div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                            Active cluster workload synced with the Neudela sidebar navigation.
                          </div>
                        </div>
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
                    <NeuronButton size="sm" variant="primary" onClick={() => handleCopyCode(generatedCode || '')}>
                      {copiedCodeTab ? <Check size={14} /> : <Copy size={14} />}
                      <span style={{ marginLeft: 6 }}>{copiedCodeTab ? 'Copied!' : 'Copy TSX'}</span>
                    </NeuronButton>
                  </div>
                  <pre style={{ background: '#0d1117', padding: 16, borderRadius: 10, color: '#e6edf3', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", overflowX: 'auto', margin: 0 }}>
                    <code>{generatedCode}</code>
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
                      <span style={{ marginLeft: 6 }}>{copiedCodeTab ? 'Copied!' : 'Copy CSS'}</span>
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

// ─────────────────────────────────────────────────────────────────────────────
// Modal Nav Micro-components
// ─────────────────────────────────────────────────────────────────────────────

function MockModalNavItem({ icon, label, active, collapsed, badge, onClick }: any) {
  const item = (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '7px 10px',
        borderRadius: 6,
        border: 'none',
        background: active ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
        color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        fontWeight: active ? 600 : 500,
        fontSize: 12.5,
        cursor: 'pointer',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
    >
      {icon}
      {!collapsed && <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>}
      {!collapsed && badge && (
        typeof badge === 'string' ? (
          <NeuronBadge
            size="xs"
            variant={
              badge.toLowerCase().includes('live') || badge.toLowerCase().includes('new')
                ? 'success'
                : badge.toLowerCase().includes('low')
                ? 'warning'
                : 'neutral'
            }
          >
            {badge}
          </NeuronBadge>
        ) : (
          badge
        )
      )}
    </button>
  );

  if (collapsed) {
    return (
      <NeuronTooltip content={label} placement="right">
        {item}
      </NeuronTooltip>
    );
  }

  return item;
}

function MockModalRailItem({ icon, label, active, onClick }: any) {
  return (
    <NeuronTooltip content={label} placement="right">
      <button
        onClick={onClick}
        aria-label={label}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: active ? 'var(--color-primary)' : 'transparent',
          color: active ? '#fff' : 'var(--color-text-secondary)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        {icon}
      </button>
    </NeuronTooltip>
  );
}
