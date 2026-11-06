import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronCheckbox from '../../components/NeuronCheckbox';
import NeuronCard from '../../components/NeuronCard';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronButtonGroup from '../../components/NeuronButtonGroup';
import NeuronDivider from '../../components/NeuronDivider';
import NeuronAlert from '../../components/NeuronAlert';
import { NeuronToggle } from '../../components/NeuronToggle';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  MessageSquare,
  Building2,
  Users,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Tablet,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Fingerprint,
  RefreshCw,
  Search,
  Globe,
  Plus,
  Trash2,
  Laptop,
  Layers,
  FileCode,
  Shield,
  HelpCircle,
  Server,
  Code2,
  Sliders,
  LayoutDashboard,
  X,
  MapPin,
  Clock,
  LogOut,
  KeyRound,
  History,
  Download,
  ShieldAlert,
} from 'lucide-react';

interface AuthPatternViewProps {
  setActiveTab: (tabId: string) => void;
}

export type AuthVariantId =
  | 'split-screen-login'
  | 'sso-saml-enterprise'
  | 'mfa-totp-verify'
  | 'magic-link-passwordless'
  | 'reset-password-flow'
  | 'workspace-tenant-picker'
  | 'minimal-card-login'
  | 'user-profile-security';

export interface AuthVariantMeta {
  id: AuthVariantId;
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

export const AUTH_VARIANTS: AuthVariantMeta[] = [
  {
    id: 'split-screen-login',
    nameEn: 'Enterprise Split-Screen Login',
    nameId: 'Login Enterprise Layar Terpisah',
    taglineEn: 'Dual-column immersive authentication pairing brand storytelling with a frictionless sign-in form.',
    taglineId: 'Autentikasi dua kolom imersif yang memadukan visual merek dengan formulir login terfokus.',
    descEn: 'A high-impact enterprise authentication layout featuring branded visual art, trust badges (SOC-2, ISO 27001), social proof quotes on the left, and a multi-provider sign-in form with email/password and SSO options on the right.',
    descId: 'Tata letak autentikasi enterprise berdampak tinggi: visual branding, lencana kepatuhan SOC-2 dan ISO 27001, kutipan testimoni di sisi kiri, serta form login multi-provider di sisi kanan.',
    tags: ['Dual Column', 'Brand Showcase', 'SSO Buttons', 'Security Badges', 'Flagship'],
    bestForEn: 'Enterprise SaaS Platforms, Cloud Consoles, B2B Portals, High-Trust Admin Apps',
    bestForId: 'Platform SaaS Enterprise, Konsol Cloud, Portal B2B, Aplikasi Admin High-Trust',
    badge: 'Flagship Pattern',
    accentColor: '#df7e30',
  },
  {
    id: 'sso-saml-enterprise',
    nameEn: 'Corporate SAML 2.0 & Okta SSO',
    nameId: 'SSO Korporat SAML 2.0 & Okta',
    taglineEn: 'Dynamic corporate identity provider discovery with single-sign-on redirect routing.',
    taglineId: 'Deteksi otomatis penyedia identitas korporat (IdP) dengan pengalihan SSO sekali klik.',
    descEn: 'Designed for strict B2B tenants: typing a corporate email automatically resolves their Identity Provider (Okta, Microsoft Entra, Google Workspace) and prompts direct corporate federation.',
    descId: 'Dirancang untuk pelanggan B2B: memasukkan email korporat otomatis mendeteksi penyedia identitas (Okta, Azure AD, Google) dan mengaktifkan pengalihan federasi identitas.',
    tags: ['Domain Discovery', 'SAML 2.0', 'Okta SSO', 'Entra ID', 'Enterprise Security'],
    bestForEn: 'B2B Multi-Tenant SaaS, Banking Systems, Healthcare Portals, Fortune 500 Apps',
    bestForId: 'SaaS B2B Multi-Tenant, Sistem Perbankan, Portal Medis, Aplikasi Korporat',
    badge: 'B2B Standard',
    accentColor: '#2563eb',
  },
  {
    id: 'mfa-totp-verify',
    nameEn: 'Multi-Factor Auth (MFA / 2FA)',
    nameId: 'Autentikasi Multi-Faktor (MFA / 2FA)',
    taglineEn: 'Segmented 6-digit verification code with alternative fallback methods and countdown timer.',
    taglineId: 'Verifikasi kode numerik 6 digit terpisah dengan metode cadangan dan pengatur waktu kirim ulang.',
    descEn: 'Step-up security challenge with segmented auto-advancing OTP input boxes, real-time resend countdown timer, method switcher (Authenticator App vs SMS vs Recovery Codes), and device trust toggle.',
    descId: 'Tantangan keamanan lanjutan dengan kotak input OTP 6-digit auto-focus, hitung mundur kirim ulang, pengalih metode (Aplikasi Authenticator, SMS, Kode Cadangan), dan opsi simpan perangkat.',
    tags: ['6-Digit OTP', 'Auto-Advancing', 'Timer Countdown', 'Backup Codes', 'Step-Up Auth'],
    bestForEn: 'FinTech, Crypto Exchanges, Admin Escalation, Critical Settings Access',
    bestForId: 'FinTech, Pertukaran Kripto, Eskalasi Admin, Akses Pengaturan Kritis',
    badge: 'High Security',
    accentColor: '#10b981',
  },
  {
    id: 'magic-link-passwordless',
    nameEn: 'Passwordless Magic Link Flow',
    nameId: 'Alur Login Tanpa Password (Magic Link)',
    taglineEn: 'Frictionless password-free sign in sending instant cryptographically-signed access links to email.',
    taglineId: 'Login tanpa sandi yang praktis dengan mengirimkan tautan akses terenkripsi instan ke email.',
    descEn: 'Zero-password authentication reducing drop-off rates: user inputs email, receives an instant magic link, and transitions to an interactive status screen with direct webmail shortcuts.',
    descId: 'Autentikasi tanpa sandi yang meminimalkan friksi pengguna: input email, terima tautan sekali klik, dan layar konfirmasi interaktif dengan tombol pintas buka webmail.',
    tags: ['Passwordless', 'Magic Link', 'Instant Email', 'Low Friction', 'User-Centric'],
    bestForEn: 'Consumer SaaS, Mobile-First Apps, Newsletters, Fast Onboarding',
    bestForId: 'SaaS Konsumen, Aplikasi Mobile-First, Komunitas, Onboarding Cepat',
    badge: 'Modern UX',
    accentColor: '#8b5cf6',
  },
  {
    id: 'reset-password-flow',
    nameEn: 'Account Recovery & Password Reset',
    nameId: 'Pemulihan Akun & Reset Kata Sandi',
    taglineEn: 'Multi-step recovery flow with real-time interactive password strength validation meter.',
    taglineId: 'Alur pemulihan bertahap dengan meteran kekuatan kata sandi interaktif real-time.',
    descEn: 'Guiding users from forgotten credential recovery to new password creation, featuring live 4-criteria validation (length, uppercase, numbers, symbols) and confirmation matching.',
    descId: 'Memandu pengguna dari permintaan link pemulihan hingga pembuatan kata sandi baru lengkap dengan indikator kekuatan real-time (panjang, huruf kapital, angka, simbol).',
    tags: ['Password Strength', 'Interactive Checklist', 'Match Indicator', 'Account Recovery'],
    bestForEn: 'Any web application requiring safe self-service credential recovery',
    bestForId: 'Semua aplikasi web yang membutuhkan pemulihan kredensial mandiri yang aman',
    badge: 'Essential',
    accentColor: '#f59e0b',
  },
  {
    id: 'workspace-tenant-picker',
    nameEn: 'Multi-Tenant Workspace Selector',
    nameId: 'Pemilih Ruang Kerja Multi-Tenant',
    taglineEn: 'Organization switching gateway displaying user roles, member counts, and enterprise plans.',
    taglineId: 'Gerbang pemilihan organisasi yang menampilkan peran pengguna, jumlah anggota, dan paket langganan.',
    descEn: 'Post-login routing interface for users belonging to multiple teams: searchable organization list with role badges (Owner, Tech Lead, Member), member counts, and quick switch CTAs.',
    descId: 'Antarmuka pasca-login bagi pengguna dengan banyak organisasi: daftar ruang kerja dengan pencarian, badge peran (Owner, Lead, Member), jumlah anggota, dan aksi masuk instan.',
    tags: ['Workspace Picker', 'Tenant Switcher', 'Role Badges', 'Organization List', 'B2B Routing'],
    bestForEn: 'Collaboration Tools, Multi-Tenant SaaS, Cloud Infrastructure Consoles',
    bestForId: 'Alat Kolaborasi, SaaS Multi-Tenant, Konsol Infrastruktur Cloud',
    badge: 'Multi-Tenant',
    accentColor: '#0ea5e9',
  },
  {
    id: 'minimal-card-login',
    nameEn: 'Compact Floating Card Sign-In',
    nameId: 'Kartu Melayang Ringkas (Modal/Card)',
    taglineEn: 'Lightweight centered card layout with smooth tabs between Sign In and Registration.',
    taglineId: 'Tata letak kartu melayang terpusat yang ringan dengan tab transisi antara Masuk dan Daftar.',
    descEn: 'Compact elevated card designed for modal dialogs, mobile screens, or minimalist applications with clean inputs, social auth icons, remember me, and privacy compliance.',
    descId: 'Kartu ringkas terpusat yang ideal untuk dialog modal, layar ponsel, atau aplikasi minimalis dengan input bersih, tombol sosial, dan persetujuan privasi.',
    tags: ['Centered Card', 'Tabs Switcher', 'Social Auth', 'Modal Ready', 'Lightweight'],
    bestForEn: 'Modal Dialogs, Embedded Widgets, Lightweight Apps, Landing Page Popups',
    bestForId: 'Dialog Modal, Widget Tersemat, Aplikasi Ringan, Popup Halaman Landing',
    badge: 'Versatile',
    accentColor: '#ec4899',
  },
  {
    id: 'user-profile-security',
    nameEn: 'Security & Active Sessions Manager',
    nameId: 'Keamanan Akun & Sesi Login Aktif',
    taglineEn: 'In-app security hub with password update, 2FA status, and multi-device active session audit.',
    taglineId: 'Pusat keamanan dalam aplikasi: ubah kata sandi, status 2FA, dan audit sesi login aktif.',
    descEn: 'Essential in-app identity governance: change password form, 2FA authenticator toggle, and an active login sessions list with device/browser info, IP address, and one-click session revocation.',
    descId: 'Tata kelola identitas akun dalam aplikasi: form ganti sandi, aktivasi 2FA, serta tabel riwayat sesi login aktif antar-perangkat dengan opsi hentikan semua sesi lain.',
    tags: ['Session Governance', 'Active Devices', 'Revoke Sessions', 'In-App Security', 'Audit Trail'],
    bestForEn: 'Account Settings, Security Centers, Enterprise Governance, Privacy Dashboards',
    bestForId: 'Pengaturan Akun, Pusat Keamanan, Tata Kelola Enterprise, Dashboard Privasi',
    badge: 'In-App Hub',
    accentColor: '#6366f1',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Mini Architecture Silhouettes for Overview Cards
// ─────────────────────────────────────────────────────────────────────────────

function AuthMiniSilhouette({ id, accentColor }: { id: AuthVariantId; accentColor: string }) {
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
        padding: '10px',
        justifyContent: 'center',
      }}
    >
      {id === 'split-screen-login' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, height: '100%' }}>
          <div style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #b85d18 100%)`, borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff', opacity: 0.9 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '80%', height: 3, background: '#fff', opacity: 0.8, borderRadius: 2 }} />
              <div style={{ width: '50%', height: 3, background: '#fff', opacity: 0.6, borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '4px 2px', justifyContent: 'center' }}>
            <div style={{ width: 30, height: 4, background: 'var(--color-text-primary)', opacity: 0.7, borderRadius: 2 }} />
            <div style={{ height: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
            <div style={{ height: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
            <div style={{ height: 10, background: accentColor, borderRadius: 3 }} />
          </div>
        </div>
      )}

      {id === 'sso-saml-enterprise' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 700 }}>O</div>
            <div style={{ width: 40, height: 4, background: 'var(--color-text-primary)', opacity: 0.8, borderRadius: 2 }} />
          </div>
          <div style={{ width: '85%', height: 14, background: 'var(--color-bg-surface)', border: `1px solid ${accentColor}`, borderRadius: 4, padding: '0 6px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '60%', height: 3, background: accentColor, borderRadius: 1.5 }} />
          </div>
          <div style={{ width: '85%', height: 12, background: accentColor, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 45, height: 3, background: '#fff', borderRadius: 1.5 }} />
          </div>
        </div>
      )}

      {id === 'mfa-totp-verify' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${accentColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor }} />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ width: 12, height: 16, background: 'var(--color-bg-surface)', border: i <= 4 ? `1.5px solid ${accentColor}` : '1px solid var(--color-border)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i <= 4 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor }} />}
              </div>
            ))}
          </div>
          <div style={{ width: 50, height: 3, background: 'var(--color-text-tertiary)', borderRadius: 1.5 }} />
        </div>
      )}

      {id === 'magic-link-passwordless' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: `${accentColor}20`, border: `1px solid ${accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 10, height: 8, border: `1.5px solid ${accentColor}`, borderRadius: 2 }} />
          </div>
          <div style={{ width: 60, height: 4, background: 'var(--color-text-primary)', opacity: 0.8, borderRadius: 2 }} />
          <div style={{ width: 80, height: 3, background: 'var(--color-text-tertiary)', borderRadius: 1.5 }} />
          <div style={{ width: '70%', height: 12, background: accentColor, borderRadius: 4, marginTop: 2 }} />
        </div>
      )}

      {id === 'reset-password-flow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center', height: '100%', padding: '0 8px' }}>
          <div style={{ width: 45, height: 4, background: 'var(--color-text-primary)', opacity: 0.8, borderRadius: 2 }} />
          <div style={{ height: 12, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
          {/* Strength bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            <div style={{ height: 3, borderRadius: 1.5, background: accentColor }} />
            <div style={{ height: 3, borderRadius: 1.5, background: accentColor }} />
            <div style={{ height: 3, borderRadius: 1.5, background: accentColor }} />
            <div style={{ height: 3, borderRadius: 1.5, background: 'var(--color-border)' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: accentColor }} />
            <div style={{ width: 35, height: 3, background: 'var(--color-text-tertiary)', borderRadius: 1.5 }} />
          </div>
        </div>
      )}

      {id === 'workspace-tenant-picker' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', height: '100%' }}>
          <div style={{ width: 50, height: 4, background: 'var(--color-text-primary)', opacity: 0.8, borderRadius: 2, marginBottom: 2 }} />
          {[0, 1].map(idx => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', background: idx === 0 ? `${accentColor}15` : 'var(--color-bg-surface)', border: idx === 0 ? `1px solid ${accentColor}` : '1px solid var(--color-border)', borderRadius: 4 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: idx === 0 ? accentColor : 'var(--color-border)' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ width: '60%', height: 3, background: 'var(--color-text-primary)', borderRadius: 1 }} />
                <div style={{ width: '40%', height: 2.5, background: 'var(--color-text-tertiary)', borderRadius: 1 }} />
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: idx === 0 ? `2px solid ${accentColor}` : '1px solid var(--color-border)', background: idx === 0 ? accentColor : 'transparent' }} />
            </div>
          ))}
        </div>
      )}

      {id === 'minimal-card-login' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ width: '75%', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 2 }}>
              <div style={{ width: 22, height: 3, background: accentColor, borderRadius: 1.5 }} />
              <div style={{ width: 22, height: 3, background: 'var(--color-border)', borderRadius: 1.5 }} />
            </div>
            <div style={{ height: 9, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 2 }} />
            <div style={{ height: 9, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 2 }} />
            <div style={{ height: 10, background: accentColor, borderRadius: 2 }} />
          </div>
        </div>
      )}

      {id === 'user-profile-security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', height: '100%', padding: '0 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 40, height: 4, background: 'var(--color-text-primary)', opacity: 0.8, borderRadius: 2 }} />
            <div style={{ width: 18, height: 8, background: '#10b981', borderRadius: 4 }} />
          </div>
          <div style={{ height: 1, background: 'var(--color-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--color-bg-surface)', padding: 4, borderRadius: 4, border: '1px solid var(--color-border)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: accentColor }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '50%', height: 3, background: 'var(--color-text-primary)', borderRadius: 1 }} />
              <div style={{ width: '35%', height: 2.5, background: 'var(--color-text-tertiary)', borderRadius: 1 }} />
            </div>
            <div style={{ width: 14, height: 6, background: '#ef4444', borderRadius: 2 }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 1: Split-Screen Enterprise Login
// ─────────────────────────────────────────────────────────────────────────────

function SplitScreenLoginForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [email, setEmail] = useState('alex.turner@enterprise.com');
  const [password, setPassword] = useState('NeudelaSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatusMsg({ type: 'error', text: isId ? 'Email dan kata sandi wajib diisi.' : 'Email and password are required.' });
      return;
    }
    setStatusMsg({ type: 'success', text: isId ? 'Autentikasi berhasil. Mengalihkan ke konsol...' : 'Authentication successful. Redirecting to workspace...' });
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '560px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
        background: 'var(--color-bg-surface)',
      }}
    >
      {/* Left Branding Hero Section */}
      <div
        style={{
          background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Ambient Background Ring */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(223, 126, 48, 0.28) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Brand Header */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, var(--color-primary, #df7e30) 0%, #ea580c 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '18px',
                boxShadow: '0 4px 14px rgba(223, 126, 48, 0.4)',
              }}
            >
              N
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '0.04em' }}>NEUDELA CONSOLE</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Enterprise Digital Ecosystem</div>
            </div>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1.3, marginBottom: '14px', color: '#f8fafc' }}>
            {isId ? 'Fondasi Desain & Rekayasa Enterprise Tangguh' : 'Resilient Enterprise Digital Architecture'}
          </h2>
          <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '380px' }}>
            {isId
              ? 'Akses terpadu seluruh subsistem operasional, orkestrasi pipeline delivery, dan kontrol tata kelola multi-tenant.'
              : 'Unified access across mission-critical services, SLA delivery telemetry, and sovereign multi-tenant cluster management.'}
          </p>
        </div>

        {/* Social Proof Quote & Compliance Badges */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: '36px' }}>
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              marginBottom: '20px',
            }}
          >
            <p style={{ fontSize: '12.5px', color: '#e2e8f0', fontStyle: 'italic', margin: '0 0 10px 0', lineHeight: 1.5 }}>
              "Neudela reduced our cross-squad UI delivery cycle time from 22 days to under 14 days with zero SLA disputes."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                RC
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>Raymond Chandra</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Chief Digital Officer · FinTech Core</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ShieldCheck size={12} /> SOC-2 Type II
            </span>
            <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Shield size={12} /> ISO 27001 Certified
            </span>
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '360px', width: '100%', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px 0' }}>
              {isId ? 'Selamat Datang Kembali' : 'Welcome back'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
              {isId ? 'Masukkan kredensial Anda untuk mengakses sistem.' : 'Enter your enterprise credentials to access your console.'}
            </p>
          </div>

          {/* Social SSO Quick Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-canvas)',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              <Globe size={15} color="var(--color-primary)" /> Google
            </button>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-canvas)',
                fontSize: '12.5px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              <Building2 size={15} color="#2563eb" /> Microsoft
            </button>
          </div>

          <NeuronDivider spacing="md">
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isId ? 'atau lewat email' : 'or with email'}
            </span>
          </NeuronDivider>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                {isId ? 'Alamat Email Korporat' : 'Corporate Email Address'}
              </label>
              <NeuronInput
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leadingIcon={<Mail size={16} />}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Kata Sandi' : 'Password'}
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); setStatusMsg({ type: 'success', text: isId ? 'Tautan reset kata sandi telah dikirim ke email.' : 'Password reset link sent to your corporate email.' }); }} style={{ fontSize: '11.5px', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  {isId ? 'Lupa Sandi?' : 'Forgot password?'}
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <NeuronInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leadingIcon={<Lock size={16} />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <NeuronCheckbox
                checked={rememberMe}
                onChange={setRememberMe}
                size="sm"
                variant="brand"
                label={isId ? 'Ingat sesi saya selama 30 hari' : 'Remember session for 30 days'}
              />
            </div>

            {statusMsg && (
              <NeuronAlert
                variant={statusMsg.type === 'success' ? 'success' : 'danger'}
                size="sm"
                fill="subtle"
                description={statusMsg.text}
                dismissible
                onDismiss={() => setStatusMsg(null)}
              />
            )}

            <NeuronButton type="submit" variant="primary" size="md">
              {isId ? 'Masuk ke Konsol Neudela' : 'Sign In to Neudela Console'}
            </NeuronButton>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '11.5px', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
            {isId ? 'Dengan masuk, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi Neudela.' : 'By signing in, you agree to Neudela Terms of Service and Privacy Policy.'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 2: Corporate SAML 2.0 & Okta SSO
// ─────────────────────────────────────────────────────────────────────────────

function SsoSamlEnterpriseForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [email, setEmail] = useState('johndoe@neuronworks.com');
  const [isDetected, setIsDetected] = useState(true);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [ssoStatus, setSsoStatus] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  useEffect(() => {
    setIsDetected(email.includes('@neuronworks.com') || email.includes('@acme.corp'));
    setSsoStatus(null);
  }, [email]);

  const handleSsoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ssoLoading) return;
    setSsoLoading(true);
    setSsoStatus(null);
    setTimeout(() => {
      setSsoLoading(false);
      setSsoStatus({
        type: 'success',
        text: isId
          ? 'Handshake Okta SAML 2.0 terverifikasi! Mengalihkan ke gateway federasi neuronworks.okta.com...'
          : 'Okta SAML 2.0 handshake verified! Redirecting to neuronworks.okta.com federated gateway...',
      });
    }, 600);
  };

  const handleStandardLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setSsoStatus({
      type: 'info',
      text: isId
        ? 'Domain email terverifikasi untuk autentikasi standar.'
        : 'Corporate email verified for standard authentication.',
    });
  };

  const handleMasterCredentials = (e: React.MouseEvent) => {
    e.preventDefault();
    setSsoStatus({
      type: 'success',
      text: isId
        ? 'Kredensial master darurat terverifikasi. Sesi cluster aktif.'
        : 'Emergency master credentials verified. Cluster session authenticated.',
    });
  };

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="xl"
      style={{
        maxWidth: '460px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <Building2 size={24} />
        </div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Login SSO Korporat Enterprise' : 'Single Sign-On (SSO)'}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {isId ? 'Masukkan email kantor Anda untuk mendeteksi portal identitas korporat.' : 'Enter your corporate work email to detect your federated identity provider.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            {isId ? 'Email Perusahaan' : 'Company Work Email'}
          </label>
          <NeuronInput
            type="email"
            placeholder="username@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leadingIcon={<Mail size={16} />}
          />
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            {isId ? 'Coba masukkan @neuronworks.com atau @acme.corp' : 'Try typing @neuronworks.com or @acme.corp'}
          </div>
        </div>

        {/* Dynamic Tenant Discovery Card */}
        {isDetected ? (
          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isId ? 'Domain Korporat Terverifikasi' : 'Verified Enterprise Domain'}
              </span>
              <NeuronBadge size="xs" variant="info">Okta SAML 2.0</NeuronBadge>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              Neuronworks Digital Ecosystem Portal
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Organisasi Anda mewajibkan autentikasi terpusat via Okta Identity Cloud.' : 'Your organization enforces federated login via Okta Identity Cloud.'}
            </div>

            <button
              type="button"
              disabled={ssoLoading}
              onClick={handleSsoClick}
              style={{
                marginTop: '6px',
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                background: ssoLoading ? '#1d4ed8' : '#2563eb',
                color: '#ffffff',
                border: '1px solid #1d4ed8',
                fontSize: '13px',
                fontWeight: 600,
                cursor: ssoLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.15s ease',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                outline: 'none',
              }}
            >
              {ssoLoading ? (
                <>
                  <span className="neuron-spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }} />
                  <span>{isId ? 'Menghubungkan ke Okta...' : 'Connecting to Okta SAML Gateway...'}</span>
                </>
              ) : (
                <>
                  <Building2 size={16} />
                  <span>{isId ? 'Lanjutkan via Okta SSO' : 'Continue with Corporate Okta SSO'}</span>
                </>
              )}
            </button>

            {ssoStatus && (
              <div style={{ marginTop: '6px' }}>
                <NeuronAlert
                  variant={ssoStatus.type === 'success' ? 'success' : 'info'}
                  size="sm"
                  fill="subtle"
                  description={ssoStatus.text}
                  dismissible
                  onDismiss={() => setSsoStatus(null)}
                />
              </div>
            )}
          </div>
        ) : (
          <NeuronButton
            variant="secondary"
            size="md"
            onClick={handleStandardLogin}
          >
            {isId ? 'Lanjutkan' : 'Continue'}
          </NeuronButton>
        )}

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => setFallbackMode(!fallbackMode)}
            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
          >
            {fallbackMode ? (isId ? '← Kembali ke deteksi SSO' : '← Back to SSO detection') : (isId ? 'Gunakan ID Pegawai / Kredensial Khusus' : 'Sign in with Employee ID & Master Password')}
          </button>
        </div>

        {fallbackMode && (
          <div style={{ marginTop: '12px', padding: '14px', borderRadius: '8px', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <NeuronInput placeholder="Employee ID (e.g. EMP-9921)" leadingIcon={<Key size={14} />} />
            <NeuronInput type="password" placeholder="Master Credential" leadingIcon={<Lock size={14} />} />
            <NeuronButton size="sm" variant="outline" onClick={handleMasterCredentials}>
              {isId ? 'Verifikasi Kredensial Darurat' : 'Authenticate Master Credentials'}
            </NeuronButton>
          </div>
        )}
      </div>
    </NeuronCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 3: Multi-Factor Authentication (MFA / 2FA)
// ─────────────────────────────────────────────────────────────────────────────

function MfaTotpVerifyForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [digits, setDigits] = useState(['4', '8', '2', '1', '1', '3']);
  const [backupCode, setBackupCode] = useState('8492-4819');
  const [timer, setTimer] = useState(48);
  const [method, setMethod] = useState<'app' | 'sms' | 'backup'>('app');
  const [trustDevice, setTrustDevice] = useState(true);
  const [mfaStatus, setMfaStatus] = useState<string | null>(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '');
    if (cleanVal.length > 1) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        if (cleanVal[i]) newDigits[i] = cleanVal[i];
      }
      setDigits(newDigits);
      setMfaStatus(null);
      const nextIdx = Math.min(cleanVal.length, 5);
      const el = document.getElementById(`mfa-digit-${nextIdx}`);
      if (el) (el as HTMLInputElement).focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanVal ? cleanVal.slice(-1) : '';
    setDigits(newDigits);
    setMfaStatus(null);

    if (cleanVal && index < 5) {
      const nextEl = document.getElementById(`mfa-digit-${index + 1}`);
      if (nextEl) (nextEl as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevEl = document.getElementById(`mfa-digit-${index - 1}`);
      if (prevEl) (prevEl as HTMLInputElement).focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = method === 'backup' ? backupCode : digits.join('');
    setMfaStatus(
      isId
        ? `Kode ${method === 'backup' ? 'cadangan' : 'OTP'} ${code || '••••••'} berhasil diverifikasi! Sesi aman aktif.`
        : `${method === 'backup' ? 'Backup code' : 'OTP code'} ${code || '••••••'} verified successfully! Secure session active.`
    );
  };

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="xl"
      style={{
        maxWidth: '460px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16, 185, 129, 0.12)', color: 'var(--emerald-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
        <Fingerprint size={26} />
      </div>

      <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
        {isId ? 'Verifikasi Dua Langkah (2FA)' : 'Two-Factor Authentication'}
      </h3>
      <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        {method === 'app'
          ? (isId ? 'Buka aplikasi Authenticator Anda (Google/Microsoft/1Password) dan masukkan 6-digit kode.' : 'Enter the 6-digit verification code from your Authenticator app.')
          : method === 'sms'
          ? (isId ? 'Kami mengirimkan kode SMS ke nomor +62 812-••••-8890.' : 'We sent an SMS security code to +62 812-••••-8890.')
          : (isId ? 'Masukkan salah satu dari 8-karakter Emergency Recovery Code Anda.' : 'Enter one of your 8-character Emergency Backup Recovery Codes.')}
      </p>

      {/* Code Input (Segmented OTP Digits or Backup Alphanumeric Input) */}
      {method === 'backup' ? (
        <div style={{ marginBottom: '20px' }}>
          <NeuronInput
            placeholder="e.g. 8492-4819"
            value={backupCode}
            onChange={(e) => {
              setBackupCode(e.target.value);
              setMfaStatus(null);
            }}
            leadingIcon={<Key size={16} />}
          />
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '6px' }}>
            {isId ? 'Format: 8 karakter alfanumerik dari lembar pemulihan darurat Anda' : 'Format: 8 alphanumeric characters from your emergency recovery kit'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              id={`mfa-digit-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              style={{
                width: '46px',
                height: '52px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                fontVariantNumeric: 'tabular-nums',
                borderRadius: '8px',
                border: digit ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: digit ? 'rgba(223, 126, 48, 0.05)' : 'var(--color-bg-canvas)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                transition: 'all 0.15s ease',
                boxShadow: digit ? '0 0 0 3px rgba(223, 126, 48, 0.12)' : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Resend Timer (for App/SMS) & Trust Device using NeuronCheckbox */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        {method !== 'backup' && (
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-tertiary)' }}>
            {timer > 0 ? (
              <span>{isId ? `Kirim ulang kode dalam 00:${timer < 10 ? '0' : ''}${timer}` : `Resend code in 00:${timer < 10 ? '0' : ''}${timer}`}</span>
            ) : (
              <button
                type="button"
                onClick={() => setTimer(60)}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px' }}
              >
                {isId ? 'Kirim Ulang Kode Sekarang' : 'Resend Code Now'}
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NeuronCheckbox
            checked={trustDevice}
            onChange={setTrustDevice}
            size="sm"
            variant="brand"
            label={isId ? 'Percayai browser ini selama 30 hari' : 'Trust this browser for 30 days'}
          />
        </div>
      </div>

      <NeuronButton
        variant="primary"
        size="md"
        style={{ width: '100%', marginBottom: '16px' }}
        onClick={handleVerifyOtp}
      >
        {isId ? 'Verifikasi & Masuk' : 'Verify & Continue'}
      </NeuronButton>

      {mfaStatus && (
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <NeuronAlert
            variant="success"
            size="sm"
            fill="subtle"
            title={isId ? 'Verifikasi Berhasil' : 'Verification Success'}
            description={mfaStatus}
            dismissible
            onDismiss={() => setMfaStatus(null)}
          />
        </div>
      )}

      {/* ── Refined Alternative Verification Method Section ── */}
      <NeuronDivider spacing="lg">
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--color-text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Shield size={13} style={{ color: 'var(--color-primary)' }} />
          {isId ? 'Pilihan Metode Alternatif' : 'Alternative Verification Method'}
        </span>
      </NeuronDivider>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginTop: '6px',
        }}
      >
        {[
          {
            id: 'app',
            label: isId ? 'Aplikasi Auth' : 'Auth App',
            subtitle: 'TOTP',
            icon: Smartphone,
          },
          {
            id: 'sms',
            label: 'SMS OTP',
            subtitle: isId ? 'Pesan SMS' : 'SMS Code',
            icon: MessageSquare,
          },
          {
            id: 'backup',
            label: isId ? 'Kode Cadangan' : 'Backup Key',
            subtitle: isId ? 'Pemulihan' : 'Recovery',
            icon: Key,
          },
        ].map((item) => {
          const isSelected = method === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMethod(item.id as 'app' | 'sms' | 'backup');
                setMfaStatus(null);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px 6px',
                borderRadius: '12px',
                border: isSelected
                  ? '1.5px solid var(--color-primary)'
                  : '1px solid var(--color-border)',
                background: isSelected
                  ? 'rgba(223, 126, 48, 0.06)'
                  : 'var(--color-bg-canvas)',
                color: isSelected
                  ? 'var(--color-primary)'
                  : 'var(--color-text-primary)',
                cursor: 'pointer',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                boxShadow: isSelected
                  ? '0 0 0 1px var(--color-primary), 0 4px 14px rgba(223, 126, 48, 0.15)'
                  : '0 1px 3px rgba(0, 0, 0, 0.02)',
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                  }}
                />
              )}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isSelected
                    ? 'rgba(223, 126, 48, 0.15)'
                    : 'var(--color-bg-subtle)',
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.18s ease',
                }}
              >
                <IconComponent size={16} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: isSelected ? 700 : 600,
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-text-tertiary)',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Contextual Hint Banner */}
      <div
        style={{
          marginTop: '12px',
          padding: '8px 12px',
          borderRadius: '8px',
          background: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          fontSize: '11.5px',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        {method === 'app' && (
          <>
            <ShieldCheck size={14} style={{ color: 'var(--emerald-600)', flexShrink: 0 }} />
            <span>{isId ? 'Direkomendasikan: Kode aman berbasis waktu (TOTP)' : 'Recommended: Secure time-based one-time code (TOTP)'}</span>
          </>
        )}
        {method === 'sms' && (
          <>
            <MessageSquare size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>{isId ? 'Kode SMS dikirim ke nomor terdaftar: +62 812-••••-8890' : 'SMS security code dispatched to: +62 812-••••-8890'}</span>
          </>
        )}
        {method === 'backup' && (
          <>
            <Key size={14} style={{ color: '#d97706', flexShrink: 0 }} />
            <span>{isId ? 'Gunakan salah satu dari 10 kode pemulihan darurat sekali pakai' : 'Use one of your 10 single-use emergency backup recovery keys'}</span>
          </>
        )}
      </div>
    </NeuronCard>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 4: Passwordless Magic Link Flow
// ─────────────────────────────────────────────────────────────────────────────

function MagicLinkPasswordlessForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [email, setEmail] = useState('sarah.developer@acme.com');
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(60);

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="xl"
      style={{
        maxWidth: '460px',
        margin: '0 auto',
      }}
    >
      {!isSent ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Sparkles size={24} />
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isId ? 'Login Tanpa Sandi (Magic Link)' : 'Passwordless Magic Link'}
          </h3>
          <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            {isId ? 'Kami akan mengirimkan link login sekali pakai langsung ke email Anda.' : 'Enter your email and we will send an instant one-click login link directly to your inbox.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <NeuronInput
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leadingIcon={<Mail size={16} />}
            />

            <NeuronButton
              variant="primary"
              size="md"
              style={{ width: '100%' }}
              onClick={() => setIsSent(true)}
            >
              {isId ? 'Kirim Tautan Magic Link' : 'Send Magic Login Link'}
            </NeuronButton>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Mail size={28} />
          </div>

          <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isId ? 'Periksa Kotak Masuk Anda!' : 'Check your email inbox!'}
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {isId ? 'Kami telah mengirimkan tautan masuk ke ' : 'We have dispatched an instant login link to '}
            <strong style={{ color: 'var(--color-text-primary)' }}>{email}</strong>
          </p>

          <NeuronAlert
            variant="info"
            size="sm"
            fill="subtle"
            title={isId ? 'Tips Keamanan' : 'Security Note'}
            description={isId ? 'Tautan hanya berlaku selama 10 menit dan hanya dapat digunakan satu kali.' : 'This link is valid for 10 minutes and expires upon single use.'}
            style={{ marginBottom: '20px', textAlign: 'left' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <NeuronButton
              variant="outline"
              size="md"
              onClick={() => window.open('https://mail.google.com', '_blank')}
            >
              <ExternalLink size={14} style={{ marginRight: 6 }} />
              {isId ? 'Buka Webmail' : 'Open Webmail Client'}
            </NeuronButton>

            <button
              type="button"
              onClick={() => setIsSent(false)}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginTop: 4 }}
            >
              {isId ? 'Gunakan email lain' : 'Use a different email address'}
            </button>
          </div>
        </div>
      )}
    </NeuronCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 5: Account Recovery & Password Reset
// ─────────────────────────────────────────────────────────────────────────────

function ResetPasswordFlowForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [newPassword, setNewPassword] = useState('Neudela#2026');
  const [confirmPassword, setConfirmPassword] = useState('Neudela#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Strength calculation
  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const criteriaPassed = [hasMinLength, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
  const isMatching = newPassword && newPassword === confirmPassword;

  const strengthColor = criteriaPassed <= 1 ? '#ef4444' : criteriaPassed <= 2 ? '#f59e0b' : criteriaPassed <= 3 ? '#3b82f6' : '#10b981';
  const strengthLabel = criteriaPassed <= 1 ? (isId ? 'Lemah' : 'Weak') : criteriaPassed <= 2 ? (isId ? 'Cukup' : 'Fair') : criteriaPassed <= 3 ? (isId ? 'Kuat' : 'Good') : (isId ? 'Sangat Kuat' : 'Strong');

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="xl"
      style={{
        maxWidth: '460px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <Lock size={22} />
        </div>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Perbarui Kata Sandi' : 'Reset New Password'}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {isId ? 'Buat kata sandi baru yang kuat untuk akun Anda.' : 'Choose a strong, unique password to secure your enterprise identity.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            {isId ? 'Kata Sandi Baru' : 'New Password'}
          </label>
          <div style={{ position: 'relative' }}>
            <NeuronInput
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              leadingIcon={<Lock size={16} />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)' }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Strength Bar */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Kekuatan Kata Sandi:' : 'Password Strength:'}</span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: strengthColor }}>{strengthLabel}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} style={{ height: '4px', borderRadius: '2px', background: idx <= criteriaPassed ? strengthColor : 'var(--color-border)', transition: 'all 0.2s ease' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Checklist */}
        <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: hasMinLength ? 'var(--emerald-600)' : 'var(--color-text-tertiary)' }}>
            <CheckCircle2 size={13} color={hasMinLength ? 'var(--emerald-600)' : 'var(--color-border)'} />
            <span>{isId ? 'Min. 8 Karakter' : '8+ characters'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: hasUpper ? 'var(--emerald-600)' : 'var(--color-text-tertiary)' }}>
            <CheckCircle2 size={13} color={hasUpper ? 'var(--emerald-600)' : 'var(--color-border)'} />
            <span>{isId ? 'Huruf Besar (A-Z)' : 'Uppercase letter'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: hasNumber ? 'var(--emerald-600)' : 'var(--color-text-tertiary)' }}>
            <CheckCircle2 size={13} color={hasNumber ? 'var(--emerald-600)' : 'var(--color-border)'} />
            <span>{isId ? 'Angka (0-9)' : 'Numeric digit'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: hasSymbol ? 'var(--emerald-600)' : 'var(--color-text-tertiary)' }}>
            <CheckCircle2 size={13} color={hasSymbol ? 'var(--emerald-600)' : 'var(--color-border)'} />
            <span>{isId ? 'Simbol (@, #, $)' : 'Special symbol'}</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            {isId ? 'Konfirmasi Kata Sandi' : 'Confirm Password'}
          </label>
          <NeuronInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leadingIcon={<Key size={16} />}
          />
          {confirmPassword && (
            <div style={{ fontSize: '11.5px', marginTop: '4px', color: isMatching ? 'var(--emerald-600)' : 'var(--color-danger)', fontWeight: 600 }}>
              {isMatching ? (isId ? '✓ Kata sandi cocok' : '✓ Passwords match') : (isId ? '✗ Kata sandi belum cocok' : '✗ Passwords do not match')}
            </div>
          )}
        </div>

        <NeuronButton
          variant="primary"
          size="md"
          disabled={criteriaPassed < 3 || !isMatching}
          onClick={() => setResetSuccess(true)}
        >
          {isId ? 'Simpan Kata Sandi & Masuk' : 'Save New Password & Sign In'}
        </NeuronButton>

        {resetSuccess && (
          <div style={{ textAlign: 'left' }}>
            <NeuronAlert
              variant="success"
              size="sm"
              fill="subtle"
              title={isId ? 'Kata Sandi Diperbarui' : 'Password Reset Successfully'}
              description={
                isId
                  ? 'Kata sandi baru berhasil disimpan! Kredensial telah diperbarui di sistem keamanan.'
                  : 'New password saved successfully! Credentials updated in security system.'
              }
              dismissible
              onDismiss={() => setResetSuccess(false)}
            />
          </div>
        )}
      </div>
    </NeuronCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 6: Multi-Tenant Workspace Selector
// ─────────────────────────────────────────────────────────────────────────────

function WorkspaceTenantPickerForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [selectedTenant, setSelectedTenant] = useState('t-neuronworks');
  const [search, setSearch] = useState('');
  const [workspaceNotice, setWorkspaceNotice] = useState<string | null>(null);

  const tenants = [
    {
      id: 't-neuronworks',
      name: 'Neuronworks Enterprise Core',
      slug: 'neuronworks.neudela.cloud',
      role: isId ? 'Pemilik (Owner)' : 'Owner',
      roleVariant: 'brand' as const,
      members: 142,
      plan: 'Enterprise Sovereign',
      avatarColor: 'var(--color-primary)',
    },
    {
      id: 't-fintech',
      name: 'FinTech Payment Gateway Squad',
      slug: 'fintech-core.neudela.cloud',
      role: isId ? 'Lead Arsitek' : 'Tech Lead',
      roleVariant: 'success' as const,
      members: 36,
      plan: 'Production Dedicated',
      avatarColor: '#2563eb',
    },
    {
      id: 't-retail',
      name: 'Omnichannel Retail Partner',
      slug: 'omnichannel.neudela.cloud',
      role: isId ? 'Anggota Dev' : 'Engineer',
      roleVariant: 'neutral' as const,
      members: 84,
      plan: 'Pro Team',
      avatarColor: '#10b981',
    },
  ];

  const filtered = tenants.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.slug.includes(search.toLowerCase()));

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="xl"
      style={{
        maxWidth: '540px',
        margin: '0 auto',
      }}
    >
      {/* User profile pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ID
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>iqbal@neuronworks.com</div>
          </div>
        </div>
        <NeuronButton size="xs" variant="outline" onClick={() => setWorkspaceNotice(isId ? 'Sesi akun berhasil dikeluarkan.' : 'Account session signed out successfully.')}>
          {isId ? 'Keluar' : 'Sign out'}
        </NeuronButton>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Pilih Ruang Kerja Organisasi' : 'Select your workspace'}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {isId ? 'Akun Anda memiliki akses ke beberapa cluster organisasi berikut:' : 'Your credentials grant access to the following enterprise clusters:'}
        </p>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <NeuronInput
          placeholder={isId ? 'Cari nama ruang kerja...' : 'Search organization or cluster...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leadingIcon={<Search size={14} />}
        />
      </div>

      {/* Tenant List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {filtered.map(t => {
          const isSelected = selectedTenant === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setSelectedTenant(t.id)}
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: isSelected ? 'rgba(223, 126, 48, 0.05)' : 'var(--color-bg-canvas)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: t.avatarColor, color: '#fff', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>{t.slug}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <NeuronBadge size="xs" variant={t.roleVariant}>{t.role}</NeuronBadge>
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: isSelected ? '5px solid var(--color-primary)' : '1px solid var(--color-border)', background: isSelected ? '#fff' : 'transparent' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <NeuronButton
          variant="outline"
          size="md"
          style={{ flex: 1 }}
          leadingIcon={<Plus size={14} />}
          onClick={() => setWorkspaceNotice(isId ? 'Membuka dialog buat ruang kerja organisasi baru...' : 'Opening create organization workspace modal...')}
        >
          {isId ? 'Buat Baru' : 'New Workspace'}
        </NeuronButton>
        <NeuronButton
          variant="primary"
          size="md"
          style={{ flex: 1.5 }}
          onClick={() => setWorkspaceNotice(isId ? `Menghubungkan ke cluster: ${selectedTenant}...` : `Connecting to cluster: ${selectedTenant}...`)}
        >
          {isId ? 'Masuk ke Ruang Kerja' : 'Launch Workspace'}
        </NeuronButton>
      </div>

      {workspaceNotice && (
        <div style={{ marginTop: '14px', textAlign: 'left' }}>
          <NeuronAlert
            variant="success"
            size="sm"
            fill="subtle"
            description={workspaceNotice}
            dismissible
            onDismiss={() => setWorkspaceNotice(null)}
          />
        </div>
      )}
    </NeuronCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 7: Minimal Floating Card Sign-In & Sign-Up
// ─────────────────────────────────────────────────────────────────────────────

function MinimalCardLoginForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="xl"
      style={{
        maxWidth: '420px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--color-primary)', color: '#fff', fontSize: '16px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          N
        </div>
        <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {activeTab === 'signin' ? (isId ? 'Masuk ke Akun' : 'Sign in to account') : (isId ? 'Buat Akun Baru' : 'Create an account')}
        </h3>
      </div>

      {/* Tabs using NeuronButtonGroup */}
      <div style={{ marginBottom: '20px' }}>
        <NeuronButtonGroup
          variant="secondary"
          size="sm"
          type="radio"
          attached
          fullWidth
          value={activeTab}
          onChange={(val) => setActiveTab(val as 'signin' | 'signup')}
          options={[
            { value: 'signin', label: isId ? 'Masuk' : 'Sign In' },
            { value: 'signup', label: isId ? 'Daftar' : 'Sign Up' },
          ]}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <NeuronInput
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leadingIcon={<Mail size={15} />}
        />
        <NeuronInput
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leadingIcon={<Lock size={15} />}
        />

        <NeuronButton variant="primary" size="md">
          {activeTab === 'signin' ? (isId ? 'Masuk' : 'Sign In') : (isId ? 'Buat Akun' : 'Create Account')}
        </NeuronButton>
      </div>
    </NeuronCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 8: In-App Security & Active Sessions Governance
// ─────────────────────────────────────────────────────────────────────────────

interface SessionItem {
  id: string;
  type: 'laptop' | 'mobile' | 'desktop';
  deviceName: string;
  os: string;
  browser: string;
  location: string;
  countryCode: string;
  ip: string;
  isCurrent: boolean;
  lastActive: string;
  lastActiveId: string;
  clientType: string;
}

const INITIAL_SESSIONS: SessionItem[] = [
  {
    id: 'sess-1',
    type: 'laptop',
    deviceName: 'MacBook Pro 16"',
    os: 'macOS Sequoia 15.1',
    browser: 'Chrome 129.0',
    location: 'Jakarta, Indonesia',
    countryCode: 'ID',
    ip: '103.144.18.22',
    isCurrent: true,
    lastActive: 'Active now',
    lastActiveId: 'Aktif saat ini',
    clientType: 'Desktop Web App',
  },
  {
    id: 'sess-2',
    type: 'mobile',
    deviceName: 'iPhone 15 Pro',
    os: 'iOS 18.1',
    browser: 'Safari Mobile 18.0',
    location: 'Bandung, Indonesia',
    countryCode: 'ID',
    ip: '182.253.11.90',
    isCurrent: false,
    lastActive: '2 hours ago',
    lastActiveId: '2 jam yang lalu',
    clientType: 'Native iOS Client',
  },
  {
    id: 'sess-3',
    type: 'desktop',
    deviceName: 'Dell Precision Workstation',
    os: 'Windows 11 Pro (23H2)',
    browser: 'Firefox 131.0',
    location: 'Surabaya, Indonesia',
    countryCode: 'ID',
    ip: '114.124.205.14',
    isCurrent: false,
    lastActive: '3 days ago',
    lastActiveId: '3 hari yang lalu',
    clientType: 'Corporate VPN Client',
  },
];

interface SecurityAuditEvent {
  id: string;
  type: 'login' | 'mfa' | 'token' | 'password' | 'blocked';
  titleEn: string;
  titleId: string;
  detailEn: string;
  detailId: string;
  ip: string;
  location: string;
  timeEn: string;
  timeId: string;
  badgeVariant: 'success' | 'brand' | 'secondary' | 'warning' | 'error';
  badgeEn: string;
  badgeId: string;
}

const AUDIT_EVENTS: SecurityAuditEvent[] = [
  {
    id: 'ev-1',
    type: 'login',
    titleEn: 'Successful Web Sign-In',
    titleId: 'Berhasil Masuk Akun Web',
    detailEn: 'MacBook Pro 16" · Chrome 129.0 · SSO Federation',
    detailId: 'MacBook Pro 16" · Chrome 129.0 · Federasi SSO',
    ip: '103.144.18.22',
    location: 'Jakarta, ID',
    timeEn: 'Just now',
    timeId: 'Baru saja',
    badgeVariant: 'success',
    badgeEn: 'Authorized',
    badgeId: 'Terverifikasi',
  },
  {
    id: 'ev-2',
    type: 'mfa',
    titleEn: 'Two-Factor Challenge Passed',
    titleId: 'Tantangan 2FA TOTP Lolos',
    detailEn: 'Hardware-bound Authenticator TOTP App verified',
    detailId: 'Aplikasi Authenticator TOTP berhasil diverifikasi',
    ip: '103.144.18.22',
    location: 'Jakarta, ID',
    timeEn: 'Just now',
    timeId: 'Baru saja',
    badgeVariant: 'success',
    badgeEn: '2FA Valid',
    badgeId: '2FA Valid',
  },
  {
    id: 'ev-3',
    type: 'token',
    titleEn: 'OAuth Refresh Token Issued',
    titleId: 'Penyegaran Token Sesi OAuth',
    detailEn: 'iPhone 15 Pro · Safari Mobile 18.0 background refresh',
    detailId: 'iPhone 15 Pro · Safari Mobile 18.0 penyegaran background',
    ip: '182.253.11.90',
    location: 'Bandung, ID',
    timeEn: '2 hours ago',
    timeId: '2 jam yang lalu',
    badgeVariant: 'brand',
    badgeEn: 'Token Active',
    badgeId: 'Token Aktif',
  },
  {
    id: 'ev-4',
    type: 'password',
    titleEn: 'Account Password Updated',
    titleId: 'Pembaruan Kata Sandi Akun',
    detailEn: 'Primary account password rotated via security portal',
    detailId: 'Kata sandi utama dirotasi melalui portal pengaturan akun',
    ip: '103.144.18.22',
    location: 'Jakarta, ID',
    timeEn: '24 days ago',
    timeId: '24 hari yang lalu',
    badgeVariant: 'secondary',
    badgeEn: 'Rotated',
    badgeId: 'Dirotasi',
  },
  {
    id: 'ev-5',
    type: 'blocked',
    titleEn: 'Suspicious Login Blocked',
    titleId: 'Percobaan Masuk Ditolak (Anomali)',
    detailEn: 'Firefox Linux · Moscow, RU · Blocked by AI Geofence perimeter rule',
    detailId: 'Firefox Linux · Moskow, RU · Diblokir otomatis oleh aturan perimeter AI Geofence',
    ip: '185.220.101.5',
    location: 'Moscow, RU',
    timeEn: '5 days ago',
    timeId: '5 hari yang lalu',
    badgeVariant: 'error',
    badgeEn: 'Blocked',
    badgeId: 'Diblokir',
  },
];

function UserProfileSecurityForm() {
  const { language } = useLanguage();
  const isId = language === 'id';
  
  const [activeTab, setActiveTab] = useState<'sessions' | 'mfa' | 'audit'>('sessions');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [sessions, setSessions] = useState<SessionItem[]>(INITIAL_SESSIONS);
  const [alertMessage, setAlertMessage] = useState<{ title: string; desc: string; variant: 'success' | 'warning' } | null>(null);
  const [auditFilter, setAuditFilter] = useState<'all' | 'login' | 'blocked'>('all');

  const securityScore = useMemo(() => {
    let score = 70;
    if (mfaEnabled) score += 25;
    if (sessions.length <= 3) score += 5;
    return score;
  }, [mfaEnabled, sessions.length]);

  const handleRevoke = (id: string) => {
    const target = sessions.find(s => s.id === id);
    setSessions(prev => prev.filter(s => s.id !== id));
    setAlertMessage({
      title: isId ? 'Sesi Perangkat Dicabut' : 'Session Revoked',
      desc: isId 
        ? `Akses sesi untuk "${target?.deviceName || 'Perangkat'}" telah berhasil diputus.`
        : `Session access for "${target?.deviceName || 'Device'}" has been terminated immediately.`,
      variant: 'success',
    });
  };

  const handleRevokeOther = () => {
    const revokedCount = sessions.filter(s => !s.isCurrent).length;
    setSessions(prev => prev.filter(s => s.isCurrent));
    setAlertMessage({
      title: isId ? 'Semua Sesi Lain Berhasil Dihentikan' : 'All Other Sessions Terminated',
      desc: isId
        ? `${revokedCount} sesi perangkat lain telah dikeluarkan. Hanya sesi di perangkat ini yang tetap aktif.`
        : `${revokedCount} remote sessions were disconnected. Only your current browser remains authenticated.`,
      variant: 'success',
    });
  };

  const handleResetSessions = () => {
    setSessions(INITIAL_SESSIONS);
    setAlertMessage({
      title: isId ? 'Sesi Demo Dipulihkan' : 'Demo Sessions Restored',
      desc: isId
        ? 'Daftar perangkat demo telah dikembalikan ke kondisi awal.'
        : 'Demo device session inventory restored to initial test state.',
      variant: 'success',
    });
  };

  const filteredAuditEvents = useMemo(() => {
    if (auditFilter === 'login') return AUDIT_EVENTS.filter(e => e.type === 'login' || e.type === 'mfa');
    if (auditFilter === 'blocked') return AUDIT_EVENTS.filter(e => e.type === 'blocked');
    return AUDIT_EVENTS;
  }, [auditFilter]);

  return (
    <NeuronCard
      variant="elevated"
      radius="xl"
      padding="lg"
      style={{
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto',
        transition: 'all 0.25s ease',
      }}
    >
      {/* ── Inner Direct Container with Compact, Refined Spacing ── */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* ── Section 1: Page Header with Security Score Badge ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.16), rgba(99, 102, 241, 0.14))',
                border: '1px solid rgba(223, 126, 48, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(223, 126, 48, 0.1)',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ margin: '0 0 3px 0', fontSize: '16.5px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                {isId ? 'Pusat Keamanan & Tata Kelola Sesi Akun' : 'Identity Governance & Security Center'}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                {isId
                  ? 'Audit perangkat terhubung, amankan autentikasi dua langkah, dan pantau aktivitas sesi.'
                  : 'Audit active device sessions, configure multi-factor security, and track authentication logs.'}
              </p>
            </div>
          </div>

          {/* Security Health Score Pill - Anchored to right */}
          <div
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '5px 12px',
              borderRadius: '20px',
              background: mfaEnabled ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
              border: `1px solid ${mfaEnabled ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: mfaEnabled ? '#10b981' : '#f59e0b',
                boxShadow: mfaEnabled ? '0 0 6px #10b981' : 'none',
              }}
            />
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: mfaEnabled ? 'var(--emerald-600)' : '#d97706' }}>
              {isId ? `Skor: ${securityScore}/100` : `Score: ${securityScore}/100`}
            </span>
            <NeuronBadge size="xs" variant={mfaEnabled ? 'success' : 'warning'}>
              {mfaEnabled ? (isId ? 'Optimal' : 'Optimal') : (isId ? 'Perlu 2FA' : 'Needs 2FA')}
            </NeuronBadge>
          </div>
        </div>

        {/* ── Top Clean Divider Line (Compact 16px margins) ── */}
        <div style={{ height: '1px', background: 'var(--color-border)', width: '100%', marginBottom: '16px' }} />

        {/* ── Section 2: Executive Summary / Navigation Metric Cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          {/* Tab Card 1: Active Sessions */}
          <button
            type="button"
            onClick={() => setActiveTab('sessions')}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: activeTab === 'sessions' ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
              border: activeTab === 'sessions' ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
              boxShadow: activeTab === 'sessions' ? '0 3px 12px rgba(223, 126, 48, 0.1)' : 'none',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '9px',
                  background: activeTab === 'sessions' ? 'rgba(223, 126, 48, 0.16)' : 'rgba(223, 126, 48, 0.08)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Laptop size={17} />
              </div>
              <NeuronBadge size="xs" variant={activeTab === 'sessions' ? 'brand' : 'secondary'}>
                {sessions.length} {isId ? 'Perangkat' : 'Devices'}
              </NeuronBadge>
            </div>

            <div>
              <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                {isId ? 'Sesi Perangkat' : 'Connected Sessions'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                {sessions.length} {isId ? 'Perangkat Aktif' : 'Active Devices'}
              </div>
              <div style={{ fontSize: '11px', color: activeTab === 'sessions' ? 'var(--color-primary)' : 'var(--color-text-secondary)', marginTop: '3px', fontWeight: activeTab === 'sessions' ? 600 : 400 }}>
                {isId ? `1 sesi ini · ${Math.max(0, sessions.length - 1)} remote` : `1 this browser · ${Math.max(0, sessions.length - 1)} remote`}
              </div>
            </div>
          </button>

          {/* Tab Card 2: Two-Factor Auth */}
          <button
            type="button"
            onClick={() => setActiveTab('mfa')}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: activeTab === 'mfa' ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
              border: activeTab === 'mfa' ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
              boxShadow: activeTab === 'mfa' ? '0 3px 12px rgba(223, 126, 48, 0.1)' : 'none',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '9px',
                  background: mfaEnabled ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.12)',
                  color: mfaEnabled ? 'var(--emerald-600)' : 'var(--color-danger)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={17} />
              </div>
              <NeuronBadge size="xs" variant={mfaEnabled ? 'success' : 'error'}>
                {mfaEnabled ? (isId ? 'Aktif' : 'Active') : (isId ? 'Nonaktif' : 'Disabled')}
              </NeuronBadge>
            </div>

            <div>
              <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                {isId ? 'Autentikasi 2FA' : 'Two-Factor (2FA)'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                {mfaEnabled ? (isId ? 'Aktif (TOTP App)' : 'Active (TOTP App)') : (isId ? 'Nonaktif' : 'Disabled')}
              </div>
              <div style={{ fontSize: '11px', color: activeTab === 'mfa' ? 'var(--color-primary)' : 'var(--color-text-secondary)', marginTop: '3px', fontWeight: activeTab === 'mfa' ? 600 : 400 }}>
                {isId ? 'Google Auth / 1Password' : 'Google Auth / 1Password'}
              </div>
            </div>
          </button>

          {/* Tab Card 3: Security Audit Trail */}
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: activeTab === 'audit' ? 'var(--color-bg-surface)' : 'var(--color-bg-subtle)',
              border: activeTab === 'audit' ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
              boxShadow: activeTab === 'audit' ? '0 3px 12px rgba(223, 126, 48, 0.1)' : 'none',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '9px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <History size={17} />
              </div>
              <NeuronBadge size="xs" variant="secondary">
                90d Log
              </NeuronBadge>
            </div>

            <div>
              <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                {isId ? 'Log Aktivitas' : 'Audit Trail'}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                {isId ? '5 Aktivitas' : '5 Logged Events'}
              </div>
              <div style={{ fontSize: '11px', color: activeTab === 'audit' ? 'var(--color-primary)' : 'var(--color-text-secondary)', marginTop: '3px', fontWeight: activeTab === 'audit' ? 600 : 400 }}>
                {isId ? 'Audit tamper-proof' : 'Enterprise tamper-proof'}
              </div>
            </div>
          </button>
        </div>

        {/* ── Middle Divider Line (Compact 16px margins) ── */}
        <div style={{ height: '1px', background: 'var(--color-border)', width: '100%', marginBottom: '16px' }} />

        {/* ── Optional Notification Banner ── */}
        {alertMessage && (
          <div style={{ marginBottom: '14px' }}>
            <NeuronAlert
              variant={alertMessage.variant}
              size="sm"
              title={alertMessage.title}
              description={alertMessage.desc}
              dismissible
              onDismiss={() => setAlertMessage(null)}
            />
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: ACTIVE SESSIONS INVENTORY                                         */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'sessions' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Section Toolbar - Compact & Refined */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14.5px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                  {isId ? 'Daftar Perangkat & Sesi Terverifikasi' : 'Verified Devices & Active Sessions'}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {isId
                    ? 'Perangkat yang saat ini memiliki token sesi terenkripsi untuk mengakses akun Anda.'
                    : 'Authorized endpoints currently holding active cryptographic session credentials.'}
                </div>
              </div>

              {sessions.length > 1 ? (
                <NeuronButton
                  size="xs"
                  variant="secondary"
                  onClick={handleRevokeOther}
                  style={{
                    color: 'var(--color-danger)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    fontSize: '11.5px',
                  }}
                >
                  <LogOut size={13} />
                  <span>{isId ? 'Hentikan Sesi Lain' : 'Revoke Other Sessions'}</span>
                </NeuronButton>
              ) : (
                <NeuronBadge size="sm" variant="success">
                  {isId ? 'Hanya Sesi Ini Yang Aktif' : 'Only Current Session Active'}
                </NeuronBadge>
              )}
            </div>

            {/* Sessions List - Compact 10px Gap Between Sleek Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sessions.map(s => {
                const isCurrent = s.isCurrent;
                return (
                  <div
                    key={s.id}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: isCurrent
                        ? '1.5px solid rgba(223, 126, 48, 0.45)'
                        : '1px solid var(--color-border)',
                      background: isCurrent
                        ? 'rgba(223, 126, 48, 0.035)'
                        : 'var(--color-bg-canvas)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px',
                      boxShadow: isCurrent ? '0 2px 10px rgba(223, 126, 48, 0.08)' : '0 1px 4px rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Left Device Details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 300px' }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: '10px',
                          background: isCurrent ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-subtle)',
                          color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: isCurrent ? '1px solid rgba(223, 126, 48, 0.28)' : '1px solid var(--color-border)',
                        }}
                      >
                        {s.type === 'laptop' && <Laptop size={19} />}
                        {s.type === 'mobile' && <Smartphone size={19} />}
                        {s.type === 'desktop' && <Monitor size={19} />}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {s.deviceName}
                          </span>

                          {isCurrent && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontSize: '10.5px',
                                fontWeight: 700,
                                background: 'rgba(223, 126, 48, 0.14)',
                                color: 'var(--color-primary)',
                                border: '1px solid rgba(223, 126, 48, 0.3)',
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: '50%',
                                  background: '#10b981',
                                  display: 'inline-block',
                                  boxShadow: '0 0 5px #10b981',
                                }}
                              />
                              {isId ? 'Sesi Ini' : 'This Device'}
                            </span>
                          )}

                          <span
                            style={{
                              fontSize: '11px',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              background: 'var(--color-bg-subtle)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text-secondary)',
                              fontWeight: 500,
                            }}
                          >
                            {s.os}
                          </span>

                          <span
                            style={{
                              fontSize: '11px',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              background: 'var(--color-bg-subtle)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text-secondary)',
                              fontWeight: 500,
                            }}
                          >
                            {s.browser}
                          </span>
                        </div>

                        {/* Geographic & Network Metadata */}
                        <div
                          style={{
                            fontSize: '11.5px',
                            color: 'var(--color-text-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} style={{ color: 'var(--color-text-secondary)' }} />
                            {s.location}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Globe size={12} style={{ color: 'var(--color-text-secondary)' }} />
                            {s.ip}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} style={{ color: isCurrent ? 'var(--emerald-600)' : 'var(--color-text-secondary)' }} />
                            <strong style={{ color: isCurrent ? 'var(--emerald-600)' : 'var(--color-text-secondary)', fontWeight: 600 }}>
                              {isId ? s.lastActiveId : s.lastActive}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action Button */}
                    <div>
                      {isCurrent ? (
                        <span
                          style={{
                            fontSize: '11.5px',
                            color: 'var(--color-text-tertiary)',
                            fontStyle: 'italic',
                            padding: '4px 8px',
                          }}
                        >
                          {isId ? 'Koneksi Langsung' : 'Active Channel'}
                        </span>
                      ) : (
                        <NeuronButton
                          size="xs"
                          variant="outline"
                          onClick={() => handleRevoke(s.id)}
                          style={{
                            color: 'var(--color-danger)',
                            borderColor: 'rgba(239, 68, 68, 0.28)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '4px 10px',
                            fontSize: '11.5px',
                          }}
                        >
                          <Trash2 size={12} />
                          <span>{isId ? 'Hentikan Sesi' : 'Revoke'}</span>
                        </NeuronButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Security Policy & Reset Link */}
            <div
              style={{
                marginTop: '14px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(223, 126, 48, 0.035)',
                border: '1px dashed rgba(223, 126, 48, 0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                fontSize: '11.5px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>
                  {isId
                    ? 'Kebijakan Keamanan: Sesi tidak aktif > 30 hari otomatis dicabut oleh Identity Provider.'
                    : 'Corporate Invariant: Inactive sessions over 30 days are purged automatically by IAM.'}
                </span>
              </div>

              {sessions.length < INITIAL_SESSIONS.length && (
                <button
                  type="button"
                  onClick={handleResetSessions}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                >
                  {isId ? 'Pulihkan Sesi Demo' : 'Restore Demo Sessions'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: TWO-FACTOR AUTHENTICATION GOVERNANCE                              */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'mfa' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Section Toolbar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14.5px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                  {isId ? 'Tata Kelola Autentikasi Dua Langkah (2FA)' : 'Two-Factor Authentication (2FA) Governance'}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {isId
                    ? 'Wajibkan token keamanan hardware atau aplikasi TOTP untuk mengamankan akses akun.'
                    : 'Enforce hardware security tokens and TOTP authenticator apps for elevated session safety.'}
                </div>
              </div>
            </div>

            {/* Master 2FA Switch Card */}
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                background: mfaEnabled ? 'rgba(16, 185, 129, 0.05)' : 'var(--color-bg-subtle)',
                border: `1px solid ${mfaEnabled ? 'rgba(16, 185, 129, 0.3)' : 'var(--color-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '14px',
                boxShadow: mfaEnabled ? '0 2px 8px rgba(16, 185, 129, 0.05)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: mfaEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: mfaEnabled ? 'var(--emerald-600)' : 'var(--color-danger)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Wajibkan Autentikasi Dua Langkah (2FA)' : 'Enforce Two-Factor Authentication (2FA)'}
                    </span>
                    <NeuronBadge size="xs" variant={mfaEnabled ? 'success' : 'error'}>
                      {mfaEnabled ? (isId ? 'Aktif' : 'Active') : (isId ? 'Nonaktif' : 'Disabled')}
                    </NeuronBadge>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {isId
                      ? 'Memerlukan langkah verifikasi kedua setiap kali Anda masuk dari browser atau IP baru.'
                      : 'Require a secondary verification credential when signing in from an unfamiliar device.'}
                  </div>
                </div>
              </div>

              <NeuronToggle
                checked={mfaEnabled}
                onChange={(val) => {
                  setMfaEnabled(val);
                  setAlertMessage({
                    title: val ? (isId ? '2FA Diaktifkan' : '2FA Enabled') : (isId ? '2FA Dinonaktifkan' : '2FA Disabled'),
                    desc: val
                      ? (isId ? 'Akun Anda kini dilindungi oleh autentikator berbasis waktu (TOTP).' : 'Your account is now defended by time-based one-time passwords.')
                      : (isId ? 'Peringatan: Tingkat keamanan akun Anda berkurang tanpa 2FA.' : 'Warning: Account security reduced without secondary verification factor.'),
                    variant: val ? 'success' : 'warning',
                  });
                }}
                size="sm"
                variant={mfaEnabled ? 'brand' : 'gray'}
              />
            </div>

            {/* 4 Methods Configuration Grid - Compact 10px Gap */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '10px',
              }}
            >
              {/* Method 1: Authenticator App */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={16} style={{ color: 'var(--color-primary)' }} />
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Authenticator App
                      </span>
                    </div>
                    <NeuronBadge size="xs" variant="success">{isId ? 'Primer' : 'Primary'}</NeuronBadge>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                    {isId
                      ? 'Google Authenticator, Microsoft Authenticator, 1Password, atau Apple Keychain.'
                      : 'Compatible with Google Authenticator, 1Password, Microsoft Authenticator, or Bitwarden.'}
                  </div>
                </div>
                <NeuronButton size="xs" variant="outline" style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: '11px' }}>
                  {isId ? 'Ubah Kunci QR' : 'Change QR Device'}
                </NeuronButton>
              </div>

              {/* Method 2: SMS Verification */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MessageSquare size={16} style={{ color: 'var(--color-primary)' }} />
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        SMS Security OTP
                      </span>
                    </div>
                    <NeuronBadge size="xs" variant="secondary">{isId ? 'Cadangan' : 'Backup'}</NeuronBadge>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                    {isId
                      ? 'Kode verifikasi darurat dikirim ke nomor seluler: +62 812-••••-8890.'
                      : 'Emergency backup OTP dispatched via SMS to: +62 812-••••-8890.'}
                  </div>
                </div>
                <NeuronButton size="xs" variant="outline" style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: '11px' }}>
                  {isId ? 'Ganti Nomor' : 'Update Phone'}
                </NeuronButton>
              </div>

              {/* Method 3: Backup Recovery Keys */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Key size={16} style={{ color: '#d97706' }} />
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Recovery Keys
                      </span>
                    </div>
                    <NeuronBadge size="xs" variant="warning">{isId ? '8 Tersisa' : '8 Remaining'}</NeuronBadge>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                    {isId
                      ? '10 kode sekali pakai offline jika Anda kehilangan akses ke ponsel atau aplikasi authenticator.'
                      : 'Single-use offline emergency codes in case you misplace your mobile authenticator.'}
                  </div>
                </div>
                <NeuronButton size="xs" variant="outline" style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: '11px' }}>
                  {isId ? 'Lihat / Buat Ulang' : 'View / Regenerate'}
                </NeuronButton>
              </div>

              {/* Method 4: FIDO2 Hardware Key */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <KeyRound size={16} style={{ color: '#6366f1' }} />
                      <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Hardware Passkey (FIDO2)
                      </span>
                    </div>
                    <NeuronBadge size="xs" variant="brand">WebAuthn</NeuronBadge>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                    {isId
                      ? 'Kunci USB/NFC fisik seperti YubiKey, Apple Touch ID, atau Windows Hello.'
                      : 'Cryptographic physical tokens including YubiKey, Apple Touch ID, or Windows Hello.'}
                  </div>
                </div>
                <NeuronButton size="xs" variant="primary" style={{ alignSelf: 'flex-start', padding: '4px 12px', fontSize: '11px' }}>
                  {isId ? '+ Daftarkan Passkey' : '+ Add Security Key'}
                </NeuronButton>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: ENTERPRISE AUDIT TRAIL & RECENT SECURITY LOGS                     */}
        {/* ═════════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'audit' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Filter Bar with Sleek Proportions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14.5px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                  {isId ? 'Rekam Jejak Autentikasi & Log Audit' : 'Authentication Activity & Audit Trail'}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {isId
                    ? 'Catatan log tamper-proof dari 90 hari aktivitas akses akun Anda.'
                    : 'Tamper-proof event logs recording the last 90 days of account access events.'}
                </div>
              </div>

              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setAuditFilter('all')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: auditFilter === 'all' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: auditFilter === 'all' ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-canvas)',
                    color: auditFilter === 'all' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isId ? 'Semua' : 'All'}
                </button>
                <button
                  type="button"
                  onClick={() => setAuditFilter('login')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: auditFilter === 'login' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: auditFilter === 'login' ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-canvas)',
                    color: auditFilter === 'login' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isId ? 'Log Masuk' : 'Logins'}
                </button>
                <button
                  type="button"
                  onClick={() => setAuditFilter('blocked')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: auditFilter === 'blocked' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: auditFilter === 'blocked' ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-canvas)',
                    color: auditFilter === 'blocked' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isId ? 'Anomali / Diblokir' : 'Threats'}
                </button>
              </div>
            </div>

            {/* Audit Events List - 8px Gap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredAuditEvents.map(ev => (
                <div
                  key={ev.id}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-canvas)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 280px' }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        background:
                          ev.type === 'blocked'
                            ? 'rgba(239, 68, 68, 0.12)'
                            : ev.type === 'mfa' || ev.type === 'login'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : 'rgba(99, 102, 241, 0.12)',
                        color:
                          ev.type === 'blocked'
                            ? 'var(--color-danger)'
                            : ev.type === 'mfa' || ev.type === 'login'
                            ? 'var(--emerald-600)'
                            : '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {ev.type === 'blocked' && <ShieldAlert size={16} />}
                      {ev.type === 'mfa' && <ShieldCheck size={16} />}
                      {ev.type === 'login' && <CheckCircle2 size={16} />}
                      {ev.type === 'token' && <RotateCcw size={16} />}
                      {ev.type === 'password' && <Key size={16} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {isId ? ev.titleId : ev.titleEn}
                        </span>
                        <NeuronBadge size="xs" variant={ev.badgeVariant}>
                          {isId ? ev.badgeId : ev.badgeEn}
                        </NeuronBadge>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {isId ? ev.detailId : ev.detailEn} · <span style={{ color: 'var(--color-text-tertiary)' }}>{ev.location} ({ev.ip})</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
                    {isId ? ev.timeId : ev.timeEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Export Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <NeuronButton
                size="xs"
                variant="secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', fontSize: '11.5px' }}
              >
                <Download size={13} />
                <span>{isId ? 'Ekspor Log Audit (.CSV)' : 'Export Audit Log (.CSV)'}</span>
              </NeuronButton>
            </div>
          </div>
        )}
      </div>
    </NeuronCard>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Render Live Preview Dispatcher
// ─────────────────────────────────────────────────────────────────────────────

export function renderLiveAuthPreview(variantId: AuthVariantId) {
  switch (variantId) {
    case 'split-screen-login': return <SplitScreenLoginForm />;
    case 'sso-saml-enterprise': return <SsoSamlEnterpriseForm />;
    case 'mfa-totp-verify': return <MfaTotpVerifyForm />;
    case 'magic-link-passwordless': return <MagicLinkPasswordlessForm />;
    case 'reset-password-flow': return <ResetPasswordFlowForm />;
    case 'workspace-tenant-picker': return <WorkspaceTenantPickerForm />;
    case 'minimal-card-login': return <MinimalCardLoginForm />;
    case 'user-profile-security': return <UserProfileSecurityForm />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Code Templates Generator (React, Vue 3, HTML)
// ─────────────────────────────────────────────────────────────────────────────

function getAuthCodeSnippet(variantId: AuthVariantId, tab: 'tsx' | 'vue' | 'html'): string {
  if (tab === 'tsx') {
    switch (variantId) {
      case 'split-screen-login':
        return `import React, { useState } from 'react';
import { NeuronInput, NeuronButton, NeuronCheckbox } from '@neudela/react';
import { Mail, Lock, ShieldCheck } from 'lucide-react';

export default function SplitScreenLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="neudela-split-login">
      {/* Brand Hero Panel */}
      <div className="login-hero-panel">
        <div className="brand-badge">NEUDELA CONSOLE</div>
        <h2>Resilient Enterprise Digital Architecture</h2>
        <div className="compliance-tag"><ShieldCheck size={14} /> SOC-2 Type II Certified</div>
      </div>

      {/* Form Panel */}
      <div className="login-form-panel">
        <h3>Welcome back</h3>
        <NeuronInput type="email" placeholder="name@company.com" leadingIcon={<Mail size={16} />} value={email} onChange={(e) => setEmail(e.target.value)} />
        <NeuronInput type="password" placeholder="••••••••••••" leadingIcon={<Lock size={16} />} value={password} onChange={(e) => setPassword(e.target.value)} />
        <NeuronButton variant="primary" size="md">Sign In to Console</NeuronButton>
      </div>
    </div>
  );
}`;
      case 'mfa-totp-verify':
        return `import React, { useState } from 'react';
import { NeuronButton } from '@neudela/react';
import { Fingerprint } from 'lucide-react';

export default function MfaVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  return (
    <div className="mfa-verify-card">
      <Fingerprint size={32} className="text-emerald" />
      <h3>Two-Factor Authentication</h3>
      <div className="otp-digit-group">
        {otp.map((digit, i) => (
          <input key={i} maxLength={1} value={digit} className="otp-box" />
        ))}
      </div>
      <NeuronButton variant="primary" size="md">Verify & Continue</NeuronButton>
    </div>
  );
}`;
      default:
        return `// Neudela Enterprise Auth Pattern - ${variantId}
import React from 'react';
import { NeuronButton, NeuronInput } from '@neudela/react';

export default function AuthComponent() {
  return (
    <div className="neudela-auth-container">
      {/* Authentication Workflow */}
      <NeuronButton variant="primary">Authenticate</NeuronButton>
    </div>
  );
};`;
    }
  }

  if (tab === 'vue') {
    return `<template>
  <div class="neudela-auth-card">
    <h2>{{ title }}</h2>
    <NeuronInput v-model="email" type="email" placeholder="name@company.com" />
    <NeuronButton variant="primary" @click="handleAuth">Sign In</NeuronButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref('');
const title = 'Enterprise Sign In';
const handleAuth = () => { /* Execute SSO federation */ };
</script>`;
  }

  return `<!-- Neudela Design System: Enterprise Authentication -->
<div class="neudela-auth-container">
  <div class="neudela-auth-card">
    <h2 class="neudela-auth-title">Welcome back</h2>
    <input type="email" class="neuron-input" placeholder="name@company.com" />
    <button class="neuron-btn neuron-btn--primary">Sign In</button>
  </div>
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page View Component
// ─────────────────────────────────────────────────────────────────────────────

export default function AuthPatternView({ setActiveTab }: AuthPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  // Dedicated interactive preview modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<AuthVariantId>('split-screen-login');
  const [modalTab, setModalTab] = useState<'preview' | 'tsx' | 'vue' | 'html'>('preview');
  const [modalViewport, setModalViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [modalTheme, setModalTheme] = useState<'light' | 'dark'>('light');
  const [copiedModalCode, setCopiedModalCode] = useState(false);

  const activeModalMeta = AUTH_VARIANTS.find(v => v.id === modalVariant) || AUTH_VARIANTS[0];

  const handleOpenModal = (variantId: AuthVariantId) => {
    setModalVariant(variantId);
    setModalTab('preview');
    setModalViewport('desktop');
    setIsModalOpen(true);
  };

  const handleOpenStandalone = (varId: AuthVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(`#preview-auth-${varId}`, '_blank');
  };

  // Keyboard escape listener & body scroll lock
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen]);

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

  return (
    <div className="pattern-auth-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Autentikasi & Akun' : 'Authentication & Identity'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur autentikasi enterprise tingkat lanjut yang dibangun dengan mengorkestrasi token Neudela dan komponen Neuron (NeuronInput, NeuronButton, NeuronCheckbox, NeuronBadge, NeuronAvatar). Klik "Preview di Modal" untuk menguji interaktivitas atau "Tab Baru" untuk menjalankan alur autentikasi layar penuh.'
            : 'Enterprise-grade composite authentication architectures composed using Neudela Design System tokens and core Neuron components (NeuronInput, NeuronButton, NeuronCheckbox, NeuronBadge, NeuronAvatar). Click "Preview in Modal" to inspect live interactivity or "New Tab" for a dedicated fullscreen browser window.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <LayoutDashboard size={14} color="#df7e30" />
            <span>{isId ? 'Total Varian:' : 'Total Variants:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>8 {isId ? 'Pola Layout' : 'Layout Patterns'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <ShieldCheck size={14} color="#df7e30" />
            <span>{isId ? 'Dukungan Tab Baru:' : 'Fullscreen Mode:'}</span>
            <strong>Real App Mode Ready</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Sliders size={14} color="#df7e30" />
            <span>{isId ? 'Warna Khas:' : 'Brand Theme:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>Neudela Terracotta (#df7e30)</strong>
          </div>
        </div>
      </div>

      {/* ── Section 1: Overview Variant Catalog (Gallery Grid) ── */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Katalog Varian Arsitektur Autentikasi' : 'Authentication Architecture Catalog'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
              {isId 
                ? 'Pilih varian untuk melihat preview di modal pop-up atau buka langsung di tab baru secara utuh.' 
                : 'Select any variant to inspect in a modal pop-up, or open directly in a new tab as a real app.'}
            </p>
          </div>
          <NeuronBadge size="sm" variant="brand">8 Flagship Layouts</NeuronBadge>
        </div>

        {/* Variant Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {AUTH_VARIANTS.map(variant => {
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
                  overflow: 'hidden',
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
                    color: variant.accentColor,
                  }}>
                    {variant.id === 'split-screen-login' && <ShieldCheck size={20} />}
                    {variant.id === 'sso-saml-enterprise' && <Building2 size={20} />}
                    {variant.id === 'mfa-totp-verify' && <Fingerprint size={20} />}
                    {variant.id === 'magic-link-passwordless' && <Mail size={20} />}
                    {variant.id === 'reset-password-flow' && <Key size={20} />}
                    {variant.id === 'workspace-tenant-picker' && <Layers size={20} />}
                    {variant.id === 'minimal-card-login' && <Lock size={20} />}
                    {variant.id === 'user-profile-security' && <Laptop size={20} />}
                  </div>

                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px',
                    background: 'var(--color-bg-canvas)',
                    color: variant.accentColor,
                    border: `1px solid ${variant.accentColor}40`,
                  }}>
                    {variant.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 style={{
                    fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0',
                    color: 'var(--color-text-primary)',
                  }}>
                    {isId ? variant.nameId : variant.nameEn}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {isId ? variant.taglineId : variant.taglineEn}
                  </p>
                </div>

                {/* Visual Architecture Silhouette */}
                <div style={{ margin: '4px 0' }}>
                  <AuthMiniSilhouette id={variant.id} accentColor={variant.accentColor} />
                </div>

                {/* Feature Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {variant.tags.map(tag => (
                    <span 
                      key={tag}
                      style={{
                        fontSize: '10.5px', background: 'var(--color-bg-canvas)',
                        padding: '2px 8px', borderRadius: '6px', color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Dual Action Buttons */}
                <div style={{
                  marginTop: 'auto', paddingTop: 'var(--space-3)',
                  display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)',
                }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(variant.id);
                    }}
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
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Eye size={14} />
                    <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStandalone(variant.id, e);
                    }}
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
                      transition: 'all 0.15s ease',
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
        marginBottom: 'var(--space-10)',
      }}>
        {/* Anatomy Card */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Layers size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Anatomi Komponen Neudela yang Digunakan' : 'Composite Component Anatomy'}
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            {isId 
              ? 'Pola autentikasi Neudela merupakan orkestrasi dari berbagai komponen atomik:' 
              : 'The Neudela authentication pattern orchestrates multiple atomic building blocks:'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>01</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronInput with Leading Icons & Eye Toggle:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Bidang input email dan password dengan ikon pemandu serta toggle visibilitas sandi on-demand.' : 'Email and password fields with leading icons and on-demand password visibility show/hide toggle.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>02</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronButton with Loading Spinners:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Tombol aksi utama (CTA) dengan animasi pemrosesan saat memvalidasi kredensial atau federasi SSO.' : 'Primary action buttons with instant processing states during SAML federation or credential checking.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>03</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronCheckbox & Persistent Tokens:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pilihan simpan sesi login 30 hari atau trust browser untuk bypass tantangan 2FA selanjutnya.' : '30-day session retention toggle and trusted browser cookie flag for subsequent login bypass.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>04</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>NeuronBadge (Security & Compliance):</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Menyorot lencana sertifikasi SOC-2, ISO 27001, serta status peran (Owner, Admin) pada workspace.' : 'Displays SOC-2 Type II badges, ISO 27001 compliance tags, and role badges in workspace pickers.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: 13 }}>05</span>
              <div>
                <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Segmented 6-Digit OTP Inputs:</strong>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Input verifikasi terpisah dengan auto-focus, paste listener, dan countdown timer kirim ulang.' : 'Segmented verification inputs with auto-advancing focus, paste parsing, and countdown resend timer.'}
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
          padding: 'var(--space-5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sliders size={18} color="#0ea5e9" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Spesifikasi Ergonomi & Token Desain' : 'Ergonomics & Design Token Specifications'}
            </h3>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            {isId 
              ? 'Token desain Neudela yang menjamin konsistensi visual dan kepatuhan kontras WCAG 2.1 AA:' 
              : 'Calibrated Neudela design tokens ensuring visual harmony and WCAG 2.1 AA contrast compliance:'}
          </p>

          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-tertiary)' }}>
                <th style={{ padding: '6px 0' }}>{isId ? 'Nama Token' : 'Token Name'}</th>
                <th style={{ padding: '6px 0' }}>{isId ? 'Nilai CSS Variable' : 'CSS Variable Value'}</th>
                <th style={{ padding: '6px 0' }}>{isId ? 'Fungsi dalam Pola' : 'Usage in Pattern'}</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text-secondary)' }}>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Brand Accent</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>var(--color-primary, #df7e30)</code></td>
                <td>{isId ? 'Tombol CTA, border aktif, OTP' : 'Primary CTA, active focus, OTP'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Card Surface</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>var(--color-bg-surface)</code></td>
                <td>{isId ? 'Permukaan kartu login & dialog' : 'Elevated login card and modal'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Canvas Background</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>var(--color-bg-canvas)</code></td>
                <td>{isId ? 'Latar belakang area input' : 'Input field backdrop and inactive'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Border Standard</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>var(--color-border)</code></td>
                <td>{isId ? 'Garis pembatas dan input outline' : 'Dividers and input outlines'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>Border Radius LG</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>var(--radius-lg, 16px)</code></td>
                <td>{isId ? 'Sudut melengkung kartu login' : 'Auth card container rounding'}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 600, color: 'var(--color-text-primary)' }}>High Elevation Shadow</td>
                <td><code style={{ fontSize: 11, background: 'var(--color-bg-canvas)', padding: '2px 4px', borderRadius: 4 }}>0 12px 36px rgba(0,0,0,0.08)</code></td>
                <td>{isId ? 'Elevasi bayangan kartu melayang' : 'Floating card depth'}</td>
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
        marginBottom: 'var(--space-10)',
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--color-text-primary)' }}>
          {isId ? 'Panduan Implementasi: Do & Don\'t Keamanan' : 'Implementation Guidelines: Security Do\'s and Don\'ts'}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>
          {isId
            ? 'Prinsip desain keamanan dan kegunaan untuk alur identitas & autentikasi enterprise.'
            : 'Core security and usability principles for enterprise authentication and identity governance.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{
            background: 'var(--color-bg-canvas)', border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 12, padding: 14, borderLeft: '4px solid #10b981',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <Check size={16} />
              <span>DO: {isId ? 'Gunakan Anti-Enumeration & Pesan Error Generik' : 'Use Generic Anti-Enumeration Messages'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId 
                ? 'Hindari pesan seperti "Email tidak terdaftar" yang dapat dimanfaatkan penyerang untuk menebak keberadaan akun. Gunakan formulasi seperti "Kredensial salah atau periksa kotak masuk email Anda".' 
                : 'Never inform attackers whether an email exists in the database. Use ambiguous messages like "Invalid credentials or check your inbox for verification instructions".'}
            </p>
          </div>

          <div style={{
            background: 'var(--color-bg-canvas)', border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 12, padding: 14, borderLeft: '4px solid #ef4444',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <span>✕</span>
              <span>DON\'T: {isId ? 'Jangan Memblokir Tempel (Paste) Password/OTP' : 'Never Disable Paste in Password/OTP Fields'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId 
                ? 'Memblokir tempel pada kolom kata sandi atau kode 2FA merusak alur password manager (1Password, Bitwarden) dan justru mendorong pengguna membuat kata sandi yang lemah.' 
                : 'Disabling copy/paste harms password manager adoption (1Password, Bitwarden) and degrades user safety by encouraging simple memorized passwords.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation Footer ── */}
      <NextPrevious 
        prev={{ id: 'pat-data-grid', label: isId ? 'Tabel & Manajemen Data' : 'Data Grid & Table' }}
        next={{ id: 'pat-maps', label: isId ? 'Peta & Geospasial' : 'Maps & Geospatial' }}
        setActiveTab={setActiveTab}
      />

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE MODAL POP-UP FOR AUTH PREVIEW
      ══════════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.75)',
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
              {/* Left: Title & Variant Badge (NO LOV, JUST TITLE) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: activeModalMeta.accentColor,
                    boxShadow: `0 0 10px ${activeModalMeta.accentColor}`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {isId ? activeModalMeta.nameId : activeModalMeta.nameEn}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: `${activeModalMeta.accentColor}20`,
                        color: activeModalMeta.accentColor,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {activeModalMeta.badge}
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
                    title={isId ? activeModalMeta.taglineId : activeModalMeta.taglineEn}
                  >
                    {isId ? activeModalMeta.taglineId : activeModalMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Right Side: Subtabs + Action Buttons (ALWAYS pinned in top right corner) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Modal Subtabs (Interactive Canvas vs TSX) */}
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
                    type="button"
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    type="button"
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    React (TSX)
                  </button>
                </div>

                {/* Right: Standalone New Tab Button + Close */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={(e) => handleOpenStandalone(modalVariant, e)}
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>{isId ? 'Buka di Tab Baru (Real App)' : 'Open in New Tab (Real App)'}</span>
                  </button>

                  <button
                    type="button"
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
                    title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
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
                          type="button"
                          onClick={() => setModalViewport('desktop')}
                          style={{
                            background: modalViewport === 'desktop' ? 'var(--color-primary)' : 'transparent',
                            color: modalViewport === 'desktop' ? '#fff' : 'var(--color-text-secondary)',
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
                          type="button"
                          onClick={() => setModalViewport('tablet')}
                          style={{
                            background: modalViewport === 'tablet' ? 'var(--color-primary)' : 'transparent',
                            color: modalViewport === 'tablet' ? '#fff' : 'var(--color-text-secondary)',
                            border: 'none',
                            borderRadius: 4,
                            padding: '3px 8px',
                            cursor: 'pointer',
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          Tablet
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalViewport('mobile')}
                          style={{
                            background: modalViewport === 'mobile' ? 'var(--color-primary)' : 'transparent',
                            color: modalViewport === 'mobile' ? '#fff' : 'var(--color-text-secondary)',
                            border: 'none',
                            borderRadius: 4,
                            padding: '3px 8px',
                            cursor: 'pointer',
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          Mobile
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Ketik dan berinteraksilah langsung dengan alur otentikasi!' : 'Type and interact directly with the authentication workflow!'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalTheme(modalTheme === 'dark' ? 'light' : 'dark')}
                        style={{
                          background: 'var(--color-bg-canvas)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 6,
                          padding: '4px 8px',
                          fontSize: 11,
                          cursor: 'pointer',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        {modalTheme === 'dark' ? <Sun size={12} color="#f59e0b" /> : <Moon size={12} />}
                        Theme: {modalTheme.toUpperCase()}
                      </button>
                    </div>
                  </div>

                  {/* Render Live Preview Frame */}
                  <div
                    style={{
                      flex: 1,
                      background: modalTheme === 'dark' ? '#090d16' : '#f8fafc',
                      padding: '24px',
                      overflowY: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      data-theme={modalTheme === 'dark' ? 'dark' : 'light'}
                      className={modalTheme === 'dark' ? 'dark-theme' : 'light-theme'}
                      style={{
                        width: modalViewport === 'mobile' ? '420px' : modalViewport === 'tablet' ? '768px' : '100%',
                        maxWidth: '1080px',
                        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {renderLiveAuthPreview(modalVariant)}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'tsx' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: 'var(--color-bg-canvas)' }}>
                  <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(getAuthCodeSnippet(modalVariant, 'tsx'));
                          setCopiedModalCode(true);
                          setTimeout(() => setCopiedModalCode(false), 2000);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          borderRadius: 6,
                          border: '1px solid var(--color-border)',
                          background: 'var(--color-bg-surface)',
                          color: 'var(--color-text-primary)',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {copiedModalCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedModalCode ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode' : 'Copy Code')}</span>
                      </button>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        padding: '20px',
                        borderRadius: '12px',
                        background: '#0a0f1d',
                        color: '#f1f5f9',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '13px',
                        lineHeight: 1.6,
                        overflowX: 'auto',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <code>{getAuthCodeSnippet(modalVariant, 'tsx')}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

