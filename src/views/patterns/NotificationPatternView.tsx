import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronSelect from '../../components/NeuronSelect';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronCheckbox from '../../components/NeuronCheckbox';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  Search,
  ExternalLink,
  X,
  Copy,
  Check,
  Eye,
  Shield,
  Send,
  SlidersHorizontal,
  Mail,
  MessageSquare,
  Smartphone,
  ChevronRight,
  Flame,
  Radio,
  GitPullRequest,
  CheckCheck,
  CreditCard,
  Cpu,
} from 'lucide-react';

export type NotificationVariantId =
  | 'popover-drawer'
  | 'split-inbox'
  | 'toast-queue'
  | 'audit-stream'
  | 'announcement-banner'
  | 'channel-preferences';

export interface NotificationVariantMeta {
  id: NotificationVariantId;
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

export const NOTIFICATION_VARIANTS: NotificationVariantMeta[] = [
  {
    id: 'popover-drawer',
    nameEn: 'Navbar Bell Popover & Slide-Out Drawer',
    nameId: 'Popover Lonceng Navbar & Slide-Out Drawer',
    taglineEn: 'Floating notification center with category filtering, date groupings, inline responses, and 1-click read marks.',
    taglineId: 'Pusat notifikasi melayang dengan filter kategori, pengelompokan tanggal, balasan instan, dan penanda sudah dibaca.',
    descEn: 'Everyday SaaS operational hub: Compact navbar bell trigger with unread badge counter, expandable into a slide-out drawer or floating card with tabbed views (All, Unread, Mentions, System Alerts), inline action buttons, and individual dismissals.',
    descId: 'Pusat operasional aplikasi harian: Tombol lonceng navbar dengan penghitung belum dibaca, dapat dibuka menjadi flyout melayang dengan tab (Semua, Belum Dibaca, Mention @, Notifikasi Sistem), tombol aksi langsung, dan tanda selesai.',
    tags: ['Navbar Popover', 'Tabbed Filtering', 'Date Grouping', 'Inline Quick Reply', '1-Click Read All'],
    bestForEn: 'Global Top Navbars, Admin Portals, Collaboration Apps, SaaS Workspaces',
    bestForId: 'Navbar Utama Aplikasi, Portal Admin, Aplikasi Kolaborasi Tim, Workspace SaaS',
    badge: 'Navigation & Alerts',
    accentColor: '#df7e30',
  },
  {
    id: 'split-inbox',
    nameEn: 'Full Workspace Notification Inbox',
    nameId: 'Pusat Inbox & Detail Notifikasi Lengkap',
    taglineEn: 'Dual-pane master-detail notification workspace with category feeds, markdown payload, and archive actions.',
    taglineId: 'Ruang kerja notifikasi panel ganda dengan feed kategori, tampilan payload lengkap, dan tindakan arsip.',
    descEn: 'High-density productivity inbox (GitHub/Linear caliber): Left navigation pane with quick filters (Mentions, Pull Requests, Security, Billing), middle item queue with unread status dots, and right pane showing full context details with snooze and archive workflows.',
    descId: 'Ruang kerja notifikasi berdensitas tinggi ala GitHub dan Linear: Panel filter navigasi, daftar antrean notifikasi dengan penanda belum dibaca, dan panel detail penuh untuk meninjau log perubahan, snooze waktu, atau arsip seketika.',
    tags: ['Split-Pane Layout', 'Master-Detail View', 'Archive & Snooze', 'Multi-channel Tags', 'Full Context Inspector'],
    bestForEn: 'Developer Platforms, Project Management Suites, Triage Centers, Issue Trackers',
    bestForId: 'Platform Developer, Manajemen Proyek, Pusat Triase Tiket, Pelacak Bug & Isu',
    badge: 'Productivity Inbox',
    accentColor: '#3b82f6',
  },
  {
    id: 'toast-queue',
    nameEn: 'Global Toast Stack & Notification Queue',
    nameId: 'Sistem Toast Stack & Antrean Notifikasi',
    taglineEn: 'Orchestrated toast notification stack with timer progress bars, undo triggers, and semantic urgency tiers.',
    taglineId: 'Antrean notifikasi melayang dengan bilah waktu otomatis, aksi batalkan (undo), dan tingkat urgensi semantik.',
    descEn: 'Enterprise notification queuing system: Supports stacked toasts (Success, Warning, Error, Info) with animated countdown timer bars, pause-on-hover mechanics, undo action callbacks, and responsive viewport position selectors.',
    descId: 'Sistem antrean notifikasi melayang enterprise: Mendukung tumpukan toast (Sukses, Peringatan, Error, Info) dengan bilah waktu hitung mundur, jeda saat kursor diarahkan, tombol aksi batalkan (undo), dan kontrol posisi sudut layar.',
    tags: ['Stacked Toasts', 'Auto-dismiss Timer', 'Action Undo Button', 'Position Selector', 'Severity Levels'],
    bestForEn: 'Background Job Completion, Destructive Operation Undos, Real-time Webhook Alerts',
    bestForId: 'Proses Latar Belakang Selesai, Pembatalan Aksi Berbahaya, Notifikasi Webhook Nyata',
    badge: 'Feedback & Toasts',
    accentColor: '#10b981',
  },
  {
    id: 'audit-stream',
    nameEn: 'Security Audit Trail & Activity Feed',
    nameId: 'Log Audit Keamanan & Aliran Aktivitas',
    taglineEn: 'SOC2 & ISO27001 compliant activity audit timeline with actor avatars, IP geolocations, and JSON inspectors.',
    taglineId: 'Garis waktu audit kepatuhan SOC2 dengan avatar aktor, geolokasi IP, dan inspektur payload JSON.',
    descEn: 'Regulatory compliance activity stream: Chronological event timeline recording authenticated actor identities, event types (login, API key rotate, database dump, role elevation), geolocation IP stamps, and expandable structured JSON inspection modals.',
    descId: 'Garis waktu audit aktivitas kepatuhan regulasi SOC2: Mencatat identitas pengguna terautentikasi, jenis aksi (login, rotasi API key, perubahan izin role, dump database), alamat IP geolokasi, dan inspektur payload JSON terstruktur.',
    tags: ['Chronological Timeline', 'IP Geolocation', 'JSON Payload Viewer', 'CSV Export', 'Actor Attribution'],
    bestForEn: 'SOC2 Compliance, IAM Centers, Security Dashboards, Sensitive Enterprise Tenants',
    bestForId: 'Kepatuhan Regulasi SOC2, Pusat Manajemen Akses IAM, Dasbor Keamanan Siber',
    badge: 'Security & SOC2',
    accentColor: '#8b5cf6',
  },
  {
    id: 'announcement-banner',
    nameEn: 'System Announcements & Maintenance Banners',
    nameId: 'Banner Pengumuman & Pemeliharaan Sistem',
    taglineEn: 'Persistent broadcast banners for planned downtime countdowns, critical outages, and product updates.',
    taglineId: 'Banner siaran penting untuk hitung mundur pemeliharaan, insiden kritis, dan rilis fitur baru.',
    descEn: 'High-visibility system broadcast ribbons: Top persistent banners featuring dynamic countdown timers for scheduled maintenance, pulsing critical outage indicators, product release teasers, and sticky dismiss persistence.',
    descId: 'Pita siaran sistem dengan visibilitas tinggi: Banner atas persisten yang menampilkan hitung mundur waktu pemeliharaan terjadwal, indikator gangguan kritis berdenyut, pengumuman pembaruan fitur, dan opsi sembunyikan sementara.',
    tags: ['Countdown Timer', 'Critical Outages', 'Release Announcements', 'Dismissible Banners', 'Priority Stacking'],
    bestForEn: 'Planned Maintenance, SRE Incident Alerts, Enterprise Platform Announcements',
    bestForId: 'Jadwal Pemeliharaan Server, Peringatan Insiden SRE, Pengumuman Platform Enterprise',
    badge: 'System Broadcast',
    accentColor: '#f59e0b',
  },
  {
    id: 'channel-preferences',
    nameEn: 'Granular Notification Routing & Matrix',
    nameId: 'Preferensi & Matriks Saluran Notifikasi',
    taglineEn: 'Enterprise notification dispatch matrix across In-App, Email, Slack, and PagerDuty with Quiet Hours.',
    taglineId: 'Matriks pengaturan saluran notifikasi (In-App, Email, Slack, PagerDuty) dengan jadwal Jangan Ganggu (DND).',
    descEn: 'User-centric notification governance: Matrix configuration enabling users to toggle discrete event notifications across 4 dispatch channels (In-App Bell, Work Email, Slack Bot, SMS), plus configurable Quiet Hours / Do Not Disturb schedules.',
    descId: 'Tata kelola notifikasi personal: Matriks konfigurasi yang memungkinkan pengguna mengatur saluran pengiriman (Lonceng In-App, Email Kantor, Bot Slack, SMS Darurat) per kategori kejadian, ditambah jadwal Jangan Ganggu (DND) yang fleksibel.',
    tags: ['Channel Matrix', 'Quiet Hours (DND)', 'Slack Integration', 'Granular Toggles', 'Test Dispatch'],
    bestForEn: 'User Profile Settings, Enterprise Notification Governance, Team Alert Routing',
    bestForId: 'Pengaturan Profil Pengguna, Tata Kelola Komunikasi Tim, Perutean Panggilan On-Call',
    badge: 'User Preferences',
    accentColor: '#06b6d4',
  },
];

// ─────────────────────────────────────────────
// Mini Silhouettes for Gallery Cards
// ─────────────────────────────────────────────
function NotificationMiniSilhouette({ id }: { id: NotificationVariantId }) {
  switch (id) {
    case 'popover-drawer':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#df7e30' }} />
              <div style={{ width: 48, height: 4, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ width: 22, height: 6, borderRadius: 3, background: 'rgba(223, 126, 48, 0.2)' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            <div style={{ width: 24, height: 8, borderRadius: 3, background: '#df7e30' }} />
            <div style={{ width: 28, height: 8, borderRadius: 3, background: 'var(--color-border)' }} />
            <div style={{ width: 20, height: 8, borderRadius: 3, background: 'var(--color-border)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
            <div style={{ height: 16, borderRadius: 4, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
              <div style={{ width: 70, height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ height: 16, borderRadius: 4, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              <div style={{ width: 55, height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
            </div>
          </div>
        </div>
      );
    case 'split-inbox':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', padding: 8, gap: 6 }}>
          <div style={{ width: '38%', display: 'flex', flexDirection: 'column', gap: 3, borderRight: '1px solid var(--color-border)', paddingRight: 6 }}>
            <div style={{ height: 6, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ height: 14, borderRadius: 3, background: 'rgba(59, 130, 246, 0.15)', borderLeft: '2px solid #3b82f6' }} />
            <div style={{ height: 14, borderRadius: 3, background: 'var(--color-bg-canvas)' }} />
            <div style={{ height: 14, borderRadius: 3, background: 'var(--color-bg-canvas)' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 2 }}>
            <div style={{ width: '60%', height: 6, borderRadius: 2, background: 'var(--color-text-primary)' }} />
            <div style={{ width: '90%', height: 4, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            <div style={{ width: '80%', height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
              <div style={{ width: 24, height: 8, borderRadius: 2, background: '#3b82f6' }} />
              <div style={{ width: 24, height: 8, borderRadius: 2, background: 'var(--color-border)' }} />
            </div>
          </div>
        </div>
      );
    case 'toast-queue':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: '10px 14px', gap: 6 }}>
          <div style={{ width: '85%', height: 18, borderRadius: 4, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            <div style={{ width: 60, height: 3, borderRadius: 1.5, background: 'var(--color-text-primary)' }} />
          </div>
          <div style={{ width: '95%', height: 18, borderRadius: 4, background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 75, height: 3, borderRadius: 1.5, background: 'var(--color-text-primary)' }} />
          </div>
          <div style={{ width: '75%', height: 18, borderRadius: 4, background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
            <div style={{ width: 45, height: 3, borderRadius: 1.5, background: 'var(--color-text-primary)' }} />
          </div>
        </div>
      );
    case 'audit-stream':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }} />
            <div style={{ width: 50, height: 3.5, borderRadius: 2, background: 'var(--color-text-primary)' }} />
            <div style={{ marginLeft: 'auto', width: 24, height: 5, borderRadius: 2, background: 'rgba(139, 92, 246, 0.2)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4, borderLeft: '1.5px solid var(--color-border)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            <div style={{ width: 65, height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4, borderLeft: '1.5px solid var(--color-border)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 55, height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4, borderLeft: '1.5px solid var(--color-border)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 45, height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
          </div>
        </div>
      );
    case 'announcement-banner':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 12px', gap: 6 }}>
          <div style={{ height: 16, borderRadius: 4, background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ width: 60, height: 3, borderRadius: 1.5, background: '#ffffff' }} />
          </div>
          <div style={{ height: 16, borderRadius: 4, background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ width: 80, height: 3, borderRadius: 1.5, background: '#ffffff' }} />
          </div>
          <div style={{ height: 16, borderRadius: 4, background: 'linear-gradient(90deg, #df7e30 0%, #c2410c 100%)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffffff' }} />
            <div style={{ width: 70, height: 3, borderRadius: 1.5, background: '#ffffff' }} />
          </div>
        </div>
      );
    case 'channel-preferences':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 12px', gap: 4 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 3, marginBottom: 2 }}>
            <div style={{ height: 4, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
          </div>
          {[1, 2, 3].map((row) => (
            <div key={row} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 3, alignItems: 'center', height: 14 }}>
              <div style={{ height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
              <div style={{ width: 10, height: 6, borderRadius: 3, background: row % 2 === 0 ? '#06b6d4' : 'var(--color-border)' }} />
              <div style={{ width: 10, height: 6, borderRadius: 3, background: row !== 2 ? '#06b6d4' : 'var(--color-border)' }} />
              <div style={{ width: 10, height: 6, borderRadius: 3, background: row === 1 ? '#06b6d4' : 'var(--color-border)' }} />
            </div>
          ))}
        </div>
      );
  }
}

// ─────────────────────────────────────────────
// Interactive Variant 1: Navbar Bell Popover & Slide-Out Drawer
// ─────────────────────────────────────────────
interface NotificationItem {
  id: string;
  category: 'mention' | 'pr' | 'billing' | 'system' | 'security';
  title: string;
  actor: string;
  actorAvatar?: string;
  time: string;
  unread: boolean;
  message: string;
  actionLabel?: string;
  actionDone?: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'mention',
    title: 'Sarah Jenkins menyebut Anda dalam diskusi',
    actor: 'Sarah Jenkins',
    actorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    time: '2 menit lalu',
    unread: true,
    message: '@bale tolong review konfigurasi rate limiter untuk microservice billing sebelum deploy ke staging.',
    actionLabel: 'Balas Komentar',
  },
  {
    id: 'notif-2',
    category: 'pr',
    title: 'Permintaan review Pull Request #849',
    actor: 'Rian Pratama',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    time: '18 menit lalu',
    unread: true,
    message: 'feat(auth): implement biometric passkey authentication with FIDO2 WebAuthn standard.',
    actionLabel: 'Tinjau PR',
  },
  {
    id: 'notif-3',
    category: 'billing',
    title: 'Pembayaran invoice otomatis tertunda (HTTP 402)',
    actor: 'Stripe Gateway Bot',
    time: '1 jam lalu',
    unread: true,
    message: 'Kartu kredit korporat Visa ending in 4242 gagal didebit. Perbarui metode bayar untuk menghindari suspensi.',
    actionLabel: 'Perbarui Kartu',
  },
  {
    id: 'notif-4',
    category: 'system',
    title: 'Deployment kluster jakarta-prod-02 sukses',
    actor: 'ArgoCD Pipeline',
    time: '3 jam lalu',
    unread: false,
    message: '14 pods microservice berhasil dimutakhirkan ke image digest tag v2.4.8-hotfix-1.',
    actionLabel: 'Lihat Log Deploy',
  },
  {
    id: 'notif-5',
    category: 'security',
    title: 'Akses login terdeteksi dari lokasi baru',
    actor: 'IAM Security Shield',
    time: 'Kemarin, 21:40 WIB',
    unread: false,
    message: 'Sesi login berhasil dari IP 103.144.12.8 (Jakarta, Indonesia) via macOS Chrome. 2FA terverifikasi.',
  },
];

function PopoverDrawerPreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions' | 'system'>('all');
  const [inlineReplyId, setInlineReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const unreadCount = items.filter((n) => n.unread).length;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeTab === 'unread') return item.unread;
      if (activeTab === 'mentions') return item.category === 'mention';
      if (activeTab === 'system') return item.category === 'system' || item.category === 'security';
      return true;
    });
  }, [items, activeTab]);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    setToastMessage(isId ? 'Semua notifikasi ditandai sudah dibaca' : 'All notifications marked as read');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const handleAction = (id: string, label: string) => {
    if (label.includes('Balas') || label.includes('Reply')) {
      setInlineReplyId(inlineReplyId === id ? null : id);
      return;
    }
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, actionDone: true, unread: false } : n))
    );
    setToastMessage(isId ? `Aksi "${label}" berhasil diproses!` : `Action "${label}" processed successfully!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;
    setInlineReplyId(null);
    setReplyText('');
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setToastMessage(isId ? 'Balasan terkirim ke Sarah Jenkins!' : 'Reply sent to Sarah Jenkins!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div style={{ width: '100%', maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box' }}>
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-text-primary)',
            padding: '10px 16px',
            borderRadius: 8,
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={16} color="var(--color-primary)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Mock Navigation Header with Notification Bell Launcher ── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#df7e30' }} />
          <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            Acme Platform Portal
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>•</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {isId ? 'Pratinjau Navigasi Global' : 'Global Navigation Preview'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Bell Trigger with Live Count */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
              }}
            >
              <Bell size={18} />
            </button>
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 800,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 2px var(--color-bg-surface)',
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #df7e30 0%, #b45309 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '13px',
            }}
          >
            BD
          </div>
        </div>
      </div>

      {/* ── Main Notification Popover Flyout Card ── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: 560,
          minHeight: 560,
          maxHeight: 560,
          flexShrink: 0,
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '14px 20px',
            background: 'var(--color-bg-canvas)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: 'rgba(223, 126, 48, 0.12)',
                border: '1px solid rgba(223, 126, 48, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#df7e30',
              }}
            >
              <Bell size={14} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-text-primary)' }}>
                  {isId ? 'Pusat Notifikasi' : 'Notification Center'}
                </span>
                {unreadCount > 0 && (
                  <NeuronBadge size="xs" variant="brand">
                    {unreadCount} {isId ? 'Baru' : 'New'}
                  </NeuronBadge>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NeuronButton
              size="xs"
              variant="outline"
              leadingIcon={<CheckCheck size={13} />}
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              {isId ? 'Tandai Semua Dibaca' : 'Mark All Read'}
            </NeuronButton>
            <NeuronButton
              size="xs"
              variant="outline"
              leadingIcon={<SlidersHorizontal size={13} />}
              onClick={() => alert(isId ? 'Membuka pengaturan notifikasi...' : 'Opening notification settings...')}
            >
              {isId ? 'Filter' : 'Filter'}
            </NeuronButton>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '8px 20px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            gap: 6,
            background: 'var(--color-bg-surface)',
            flexShrink: 0,
          }}
        >
          {[
            { id: 'all', label: isId ? 'Semua' : 'All', count: items.length },
            { id: 'unread', label: isId ? 'Belum Dibaca' : 'Unread', count: unreadCount },
            { id: 'mentions', label: isId ? 'Mention @' : 'Mentions', count: items.filter((i) => i.category === 'mention').length },
            { id: 'system', label: isId ? 'Sistem & Keamanan' : 'System', count: items.filter((i) => i.category === 'system' || i.category === 'security').length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 5px',
                    borderRadius: 10,
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--color-bg-canvas)',
                    color: isActive ? '#ffffff' : 'var(--color-text-tertiary)',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Notification List (Scrollable within fixed height) */}
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {filteredItems.length === 0 ? (
            <div
              style={{
                width: '100%',
                boxSizing: 'border-box',
                flex: 1,
                padding: '48px 20px',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={36} color="#10b981" style={{ marginBottom: 12 }} />
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-primary)' }}>
                {isId ? 'Semua notifikasi beres!' : 'You are all caught up!'}
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                {isId ? 'Tidak ada pemberitahuan baru dalam kategori ini.' : 'No active notifications in this view.'}
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isReplying = inlineReplyId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '16px 20px',
                    borderBottom: index < filteredItems.length - 1 ? '1px solid var(--color-border)' : 'none',
                    background: item.unread ? 'rgba(223, 126, 48, 0.03)' : 'transparent',
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {/* Category / Actor Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {item.actorAvatar ? (
                      <img
                        src={item.actorAvatar}
                        alt={item.actor}
                        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background:
                            item.category === 'billing'
                              ? 'rgba(239, 68, 68, 0.12)'
                              : item.category === 'pr'
                                ? 'rgba(59, 130, 246, 0.12)'
                                : 'rgba(16, 185, 129, 0.12)',
                          color:
                            item.category === 'billing'
                              ? '#ef4444'
                              : item.category === 'pr'
                                ? '#3b82f6'
                                : '#10b981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.category === 'billing' ? (
                          <CreditCard size={18} />
                        ) : item.category === 'pr' ? (
                          <GitPullRequest size={18} />
                        ) : (
                          <Cpu size={18} />
                        )}
                      </div>
                    )}
                    {item.unread && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: '#df7e30',
                          border: '2px solid var(--color-bg-surface)',
                        }}
                      />
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                          {item.title}
                        </span>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: 2 }}>
                          {item.actor} • {item.time}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleRead(item.id)}
                        title={item.unread ? (isId ? 'Tandai sudah dibaca' : 'Mark as read') : (isId ? 'Tandai belum dibaca' : 'Mark as unread')}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: item.unread ? '#df7e30' : 'var(--color-text-tertiary)',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '2px 4px',
                        }}
                      >
                        {item.unread ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#df7e30' }} /> : null}
                        <span>{item.unread ? (isId ? 'Baru' : 'Unread') : (isId ? 'Sudah Dibaca' : 'Read')}</span>
                      </button>
                    </div>

                    <p style={{ margin: '6px 0 10px 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {item.message}
                    </p>

                    {/* Action button */}
                    {item.actionLabel && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <NeuronButton
                          size="xs"
                          variant={item.actionDone ? 'outline' : 'primary'}
                          onClick={() => handleAction(item.id, item.actionLabel!)}
                          disabled={item.actionDone}
                        >
                          {item.actionDone ? (isId ? '✓ Berhasil Selesai' : '✓ Completed') : item.actionLabel}
                        </NeuronButton>
                      </div>
                    )}

                    {/* Inline Reply Box for @Mentions */}
                    {isReplying && (
                      <div
                        style={{
                          marginTop: 10,
                          padding: 10,
                          borderRadius: 8,
                          background: 'var(--color-bg-canvas)',
                          border: '1px solid var(--color-border)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        <NeuronInput
                          size="sm"
                          placeholder={isId ? 'Tulis balasan langsung ke @sarah...' : 'Type direct reply to @sarah...'}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                          <NeuronButton size="xs" variant="outline" onClick={() => setInlineReplyId(null)}>
                            {isId ? 'Batal' : 'Cancel'}
                          </NeuronButton>
                          <NeuronButton size="xs" variant="primary" leadingIcon={<Send size={12} />} onClick={() => handleSendReply(item.id)}>
                            {isId ? 'Kirim' : 'Reply'}
                          </NeuronButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 2: Full Workspace Split-Pane Inbox
// ─────────────────────────────────────────────
interface InboxMessage {
  id: string;
  sender: string;
  role: string;
  subject: string;
  date: string;
  category: 'security' | 'billing' | 'engineering' | 'compliance';
  preview: string;
  fullBody: string;
  status: 'unread' | 'read' | 'archived';
  channel: string;
  incidentId?: string;
}

const SAMPLE_INBOX_MESSAGES: InboxMessage[] = [
  {
    id: 'msg-1',
    sender: 'SRE Incident Commander',
    role: 'Automated Bot · PagerDuty',
    subject: '[P1-CRITICAL] Primary PostgreSQL Cluster Failover Engaged',
    date: '10:42 WIB',
    category: 'engineering',
    preview: 'Replica replica-02 has been promoted to master due to heartbeat timeout on node-01.',
    fullBody: `### Ringkasan Insiden #INC-9821
Pada pukul **10:41:04 UTC**, sistem monitoring Prometheus mendeteksi kehilangan heartbeat TCP pada node database primer \`pg-prod-jkt-01\`.

#### Tindakan Otomatis Dilakukan:
1. **Health-Check Retry:** 3x ping gagal dengan toleransi 1500ms.
2. **Failover Execution:** Node replica standby \`pg-prod-jkt-02\` dipromosikan sebagai master write node.
3. **DNS Mapping:** CNAME database diarahkan ke endpoint baru dalam 400ms.
4. **Data Loss Assessment:** Zero data loss diverifikasi via LSN replication check.

Harap lead engineer memeriksa konsol CloudWatch untuk memvalidasi performa IOPS IO2.`,
    status: 'unread',
    channel: 'In-App & Slack (#sre-war-room)',
    incidentId: 'INC-9821',
  },
  {
    id: 'msg-2',
    sender: 'Finance Operations',
    role: 'Billing Team · PT Neudela Solusi',
    subject: 'Faktur Pajak Elektronik Seri INV-2026-90214 Telah Terbit',
    date: 'Kemarin, 14:15 WIB',
    category: 'billing',
    preview: 'Faktur pajak PPN 11% untuk langganan Dedicated Kubernetes Cluster telah siap diunduh.',
    fullBody: `Yth. Finance Administrator,

Terlampir bukti pemotongan PPh 23 dan e-Faktur Pajak resmi Direktorat Jenderal Pajak untuk transaksi periode berjalan:
- **No. Faktur:** \`010.002-26.90214819\`
- **NPWP:** \`01.234.567.8-012.000\`
- **Total Pembayaran:** \`Rp 42.500.000\` (Termasuk PPN 11%)

Berkas PDF dan XML e-Faktur siap diunduh pada tab Dokumen Keuangan.`,
    status: 'unread',
    channel: 'Billing Portal & Email',
  },
  {
    id: 'msg-3',
    sender: 'Security & Compliance Lead',
    role: 'Sarah Jenkins · CISO Office',
    subject: 'SOC2 Type II Annual Re-certification Audit Passed with 0 Findings',
    date: '9 Nov 2026',
    category: 'compliance',
    preview: 'Hasil audit kepatuhan eksternal Ernst & Young untuk Neudela Cloud Platform dinyatakan lulus penuh.',
    fullBody: `Tim Teknik & Operasi,

Kabar baik untuk seluruh organisasi! Laporan final evaluasi audit **SOC2 Type II** dan **ISO/IEC 27001:2022** telah diterbitkan oleh auditor independen EY.

Hasil evaluasi menunjukkan:
- 0 Temuan Mayor (Zero Major Non-Conformities)
- Enkripsi Data At-Rest & In-Transit 100% patuh standar FIPS 140-3
- Uptime SLA kuartal 4 mencapai 99.982%`,
    status: 'read',
    channel: 'Security Bulletin',
  },
];

function SplitInboxPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [messages, setMessages] = useState<InboxMessage[]>(SAMPLE_INBOX_MESSAGES);
  const [selectedId, setSelectedId] = useState<string>(SAMPLE_INBOX_MESSAGES[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const selectedMsg = messages.find((m) => m.id === selectedId) || messages[0];

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchCat = filterCategory === 'all' || m.category === filterCategory;
      const matchSearch =
        m.subject.toLowerCase().includes(search.toLowerCase()) ||
        m.sender.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch && m.status !== 'archived';
    });
  }, [messages, filterCategory, search]);

  const handleArchive = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'archived' } : m)));
    const remaining = messages.filter((m) => m.id !== id && m.status !== 'archived');
    if (remaining.length > 0) setSelectedId(remaining[0].id);
  };

  const handleToggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === 'unread' ? 'read' : 'unread' } : m))
    );
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 560,
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          padding: '12px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3b82f6',
            }}
          >
            <Mail size={14} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            {isId ? 'Inbox Notifikasi Kerja' : 'Workspace Notification Inbox'}
          </span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
            inbox:production.acme
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronBadge size="xs" variant="brand">
            {messages.filter((m) => m.status === 'unread').length} {isId ? 'Belum Dibaca' : 'Unread'}
          </NeuronBadge>
        </div>
      </div>

      {/* Main Split-Pane */}
      <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : undefined, gridTemplateColumns: !isMobile ? 'minmax(280px, 340px) 1fr' : undefined, minHeight: 490 }}>
        {/* Left Pane: Message List */}
        {(!isMobile || !selectedId) && (
          <div style={{ flex: 1, borderRight: !isMobile ? '1px solid var(--color-border)' : 'none', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-surface)' }}>
            {/* Filter & Search Toolbar */}
            <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <NeuronInput
                size="sm"
                placeholder={isId ? 'Cari judul notifikasi...' : 'Search subject or sender...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leadingIcon={<Search size={13} />}
              />
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 2 }}>
                {['all', 'engineering', 'billing', 'compliance'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: '11px',
                      fontWeight: 600,
                      border: '1px solid var(--color-border)',
                      background: filterCategory === cat ? 'var(--color-primary)' : 'transparent',
                      color: filterCategory === cat ? '#fff' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List items */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredMessages.map((msg) => {
                const isSelected = msg.id === selectedId;
                return (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedId(msg.id)}
                    style={{
                      padding: '12px 14px',
                      borderBottom: '1px solid var(--color-border)',
                      background: isSelected
                        ? 'rgba(59, 130, 246, 0.08)'
                        : msg.status === 'unread'
                        ? 'rgba(223, 126, 48, 0.03)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 3, background: 'var(--color-primary)' }} />
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                        {msg.sender}
                      </span>
                      <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>{msg.date}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: msg.status === 'unread' ? 800 : 600, color: 'var(--color-text-primary)', marginBottom: 4, lineHeight: 1.3 }}>
                      {msg.subject}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.preview}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Pane: Full Details */}
        {(!isMobile || Boolean(selectedId)) && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-bg-canvas)' }}>
            {selectedMsg ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Top Action Toolbar */}
                <div
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isMobile && (
                      <NeuronButton size="xs" variant="ghost" onClick={() => setSelectedId('')}>
                        ← {isId ? 'Kembali' : 'Back'}
                      </NeuronButton>
                    )}
                    <NeuronBadge size="xs" variant={selectedMsg.category === 'engineering' ? 'error' : selectedMsg.category === 'billing' ? 'warning' : 'success'}>
                      {selectedMsg.category.toUpperCase()}
                    </NeuronBadge>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)' }}>
                      {selectedMsg.channel}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <NeuronButton size="xs" variant="outline" onClick={() => handleToggleRead(selectedMsg.id)}>
                      {selectedMsg.status === 'unread' ? (isId ? 'Tandai Dibaca' : 'Mark as Read') : (isId ? 'Tandai Belum Dibaca' : 'Mark as Unread')}
                    </NeuronButton>
                    <NeuronButton size="xs" variant="outline" onClick={() => handleArchive(selectedMsg.id)}>
                      {isId ? 'Arsipkan' : 'Archive'}
                    </NeuronButton>
                  </div>
              </div>

              {/* Message Header & Meta */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {selectedMsg.subject}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>
                      {selectedMsg.sender[0]}
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{selectedMsg.sender}</span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>({selectedMsg.role})</span>
                  </div>
                  <span>•</span>
                  <span>{selectedMsg.date}</span>
                </div>
              </div>

              {/* Payload Body */}
              <div style={{ padding: '24px', flex: 1, overflowY: 'auto', background: 'var(--color-bg-canvas)' }}>
                <div
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 12,
                    padding: '20px',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {selectedMsg.fullBody}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
              Pilih pesan untuk melihat detail
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 3: Toast Stack & Queue Hub
// ─────────────────────────────────────────────
interface ToastEntry {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  canUndo?: boolean;
}

function ToastQueuePreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [toasts, setToasts] = useState<ToastEntry[]>([
    {
      id: 'toast-sample-1',
      type: 'success',
      title: 'Kluster Pod Kubernetes Diperbarui',
      message: 'Deployment microservice auth-service v2.8 aktif di zona ap-southeast-3.',
    },
    {
      id: 'toast-sample-2',
      type: 'warning',
      title: 'Kunci API Kedaluwarsa dalam 3 Hari',
      message: 'Kunci API "production-ro-client" akan berakhir. Lakukan rotasi rahasia.',
      canUndo: true,
    },
  ]);
  const [position, setPosition] = useState<'top-right' | 'bottom-right' | 'bottom-left' | 'top-center'>('bottom-right');

  const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const id = `toast-${Date.now()}`;
    const newEntry: ToastEntry =
      type === 'success'
        ? { id, type, title: isId ? 'Sesi Konfigurasi Disimpan' : 'Configuration Saved', message: isId ? 'Perubahan kebijakan RBAC berhasil diterapkan ke 42 node.' : 'RBAC policy synced to 42 nodes.' }
        : type === 'error'
          ? { id, type, title: isId ? 'Gagal Menghubungi Gateway (HTTP 502)' : 'Gateway Error (HTTP 502)', message: isId ? 'Koneksi ke backend webhook timeout setelah 15.000ms.' : 'Webhook gateway timed out after 15,000ms.' }
          : type === 'warning'
            ? { id, type, title: isId ? 'Tindakan Berbahaya Dibatalkan' : 'Destructive Action Scheduled', message: isId ? 'Database snapshot test-db akan dihapus permanen.' : 'Database snapshot will be purged.', canUndo: true }
            : { id, type, title: isId ? 'Pemeliharaan Terjadwal Dimulai' : 'Scheduled Maintenance', message: isId ? 'Jendela pemeliharaan cloud dimulai pukul 00:00 WIB.' : 'Cloud maintenance window opens at midnight.' };

    setToasts((prev) => [newEntry, ...prev]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Interactive Trigger Control Card */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '14px 20px',
            background: 'var(--color-bg-canvas)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <Radio size={14} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-text-primary)' }}>
              {isId ? 'Simulator Orkestrasi Toast Global' : 'Global Toast Notification Orchestrator'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Posisi:</span>
            <div style={{ width: 140 }}>
              <NeuronSelect
                size="sm"
                value={position}
                onChange={(val) => setPosition(val as any)}
                options={[
                  { value: 'bottom-right', label: 'Bottom Right' },
                  { value: 'top-right', label: 'Top Right' },
                  { value: 'bottom-left', label: 'Bottom Left' },
                  { value: 'top-center', label: 'Top Center' },
                ]}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <NeuronButton size="sm" variant="primary" leadingIcon={<CheckCircle2 size={13} />} onClick={() => addToast('success')}>
            {isId ? '+ Trigger Sukses' : '+ Trigger Success'}
          </NeuronButton>
          <NeuronButton size="sm" variant="danger" leadingIcon={<AlertCircle size={13} />} onClick={() => addToast('error')}>
            {isId ? '+ Trigger Error Kritis' : '+ Trigger Error'}
          </NeuronButton>
          <NeuronButton size="sm" variant="secondary" leadingIcon={<AlertTriangle size={13} />} onClick={() => addToast('warning')}>
            {isId ? '+ Trigger Peringatan (Undo)' : '+ Trigger Warning (Undo)'}
          </NeuronButton>
          <NeuronButton size="sm" variant="outline" leadingIcon={<Info size={13} />} onClick={() => addToast('info')}>
            {isId ? '+ Trigger Informasi' : '+ Trigger Info'}
          </NeuronButton>
        </div>
      </div>

      {/* Live Stack Preview Container */}
      <div
        style={{
          background: 'var(--color-bg-canvas)',
          border: '1px dashed var(--color-border)',
          borderRadius: 16,
          minHeight: 280,
          position: 'relative',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: position.includes('right') ? 'flex-end' : position.includes('center') ? 'center' : 'flex-start',
          justifyContent: position.includes('bottom') ? 'flex-end' : 'flex-start',
        }}
      >
        <span style={{ position: 'absolute', top: 12, left: 16, fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
          {isId ? `Area Tampilan Layar (${position})` : `Active Viewport Area (${position})`}
        </span>

        {/* The Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 380, zIndex: 10 }}>
          {toasts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--color-text-secondary)', fontSize: '12.5px' }}>
              {isId ? 'Tidak ada toast aktif. Klik tombol di atas untuk memicu toast baru.' : 'No active toasts. Click buttons above to push notifications.'}
            </div>
          ) : (
            toasts.map((toast) => {
              const borderAccent =
                toast.type === 'success'
                  ? '#10b981'
                  : toast.type === 'error'
                    ? '#ef4444'
                    : toast.type === 'warning'
                      ? '#f59e0b'
                      : '#3b82f6';
              return (
                <div
                  key={toast.id}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderLeft: `4px solid ${borderAccent}`,
                    borderRadius: 10,
                    padding: '12px 14px',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    position: 'relative',
                  }}
                >
                  <div style={{ marginTop: 2 }}>
                    {toast.type === 'success' && <CheckCircle2 size={16} color="#10b981" />}
                    {toast.type === 'error' && <AlertCircle size={16} color="#ef4444" />}
                    {toast.type === 'warning' && <AlertTriangle size={16} color="#f59e0b" />}
                    {toast.type === 'info' && <Info size={16} color="#3b82f6" />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {toast.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                      {toast.message}
                    </div>

                    {toast.canUndo && (
                      <div style={{ marginTop: 8 }}>
                        <NeuronButton
                          size="xs"
                          variant="outline"
                          onClick={() => {
                            removeToast(toast.id);
                            alert(isId ? 'Tindakan berhasil dibatalkan (Undo)!' : 'Action successfully undone!');
                          }}
                        >
                          {isId ? 'Batalkan (Undo)' : 'Undo Action'}
                        </NeuronButton>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeToast(toast.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--color-text-tertiary)',
                      cursor: 'pointer',
                      padding: 2,
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 4: Security Audit Trail & Activity Feed
// ─────────────────────────────────────────────
interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  location: string;
  status: 'SUCCESS' | 'BLOCKED' | 'ELEVATED';
  payloadJson: Record<string, any>;
}

const SAMPLE_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'evt-901',
    timestamp: '2026-11-10T08:42:19Z',
    actor: 'sarah.jenkins@acme.com',
    role: 'Security Administrator',
    action: 'iam.policy.update',
    target: 'policy/pci-dss-compliance',
    ip: '103.144.12.8',
    location: 'Jakarta, ID',
    status: 'ELEVATED',
    payloadJson: {
      version: '2026-11-01',
      rules_modified: ['enforce_hardware_mfa', 'restrict_export_csv'],
      soc2_control: 'CC6.1',
    },
  },
  {
    id: 'evt-902',
    timestamp: '2026-11-10T07:15:02Z',
    actor: 'deploy-agent-sa@acme-cloud.internal',
    role: 'Service Account',
    action: 'k8s.cluster.rollout',
    target: 'deployments/checkout-grpc-service',
    ip: '10.240.1.44',
    location: 'Internal VPC',
    status: 'SUCCESS',
    payloadJson: {
      image: 'registry.acme.com/checkout:v2.9.1',
      replicas: 16,
      canary_percent: 25,
    },
  },
  {
    id: 'evt-903',
    timestamp: '2026-11-10T05:33:41Z',
    actor: 'unknown-intruder@anonymized.tor',
    role: 'Unauthenticated',
    action: 'auth.brute_force.attempt',
    target: 'api/v1/auth/token',
    ip: '185.220.101.5',
    location: 'Frankfurt, DE',
    status: 'BLOCKED',
    payloadJson: {
      attempts_count: 42,
      mitigation: 'Cloudflare WAF IP Blocked for 24h',
      rate_limit_exceeded: true,
    },
  },
];

function AuditStreamPreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [events] = useState<AuditEvent[]>(SAMPLE_AUDIT_EVENTS);
  const [expandedId, setExpandedId] = useState<string | null>('evt-901');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyJson = (id: string, payload: any) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Audit Header */}
      <div
        style={{
          padding: '14px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8b5cf6',
            }}
          >
            <Shield size={14} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            {isId ? 'Log Audit Kepatuhan & Aktivitas SOC2' : 'SOC2 Security Audit Log & Activity Stream'}
          </span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
            retention:365d-immutable
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronButton
            size="xs"
            variant="outline"
            onClick={() => alert(isId ? 'Mengekspor berkas audit CSV...' : 'Exporting audit CSV...')}
          >
            {isId ? 'Ekspor CSV' : 'Export CSV'}
          </NeuronButton>
        </div>
      </div>

      {/* Timeline Stream */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {events.map((evt) => {
          const isExpanded = expandedId === evt.id;
          return (
            <div
              key={evt.id}
              style={{
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                style={{
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  cursor: 'pointer',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: evt.status === 'SUCCESS' ? '#10b981' : evt.status === 'BLOCKED' ? '#ef4444' : '#8b5cf6',
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                        {evt.action}
                      </span>
                      <NeuronBadge size="xs" variant={evt.status === 'SUCCESS' ? 'success' : evt.status === 'BLOCKED' ? 'error' : 'purple'}>
                        {evt.status}
                      </NeuronBadge>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                      {evt.actor} ({evt.role}) • Target: <code style={{ fontFamily: 'monospace' }}>{evt.target}</code>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '11.5px', color: 'var(--color-text-tertiary)' }}>
                  <span>{evt.ip} ({evt.location})</span>
                  <span>•</span>
                  <span>{evt.timestamp}</span>
                  <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }} />
                </div>
              </div>

              {/* Expandable JSON Inspector */}
              {isExpanded && (
                <div style={{ padding: '14px 18px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      Audit Payload Event Details
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyJson(evt.id, evt.payloadJson)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--color-border)',
                        borderRadius: 4,
                        padding: '2px 8px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {copiedId === evt.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copiedId === evt.id ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: 12,
                      borderRadius: 6,
                      background: 'var(--color-bg-canvas)',
                      fontFamily: 'monospace',
                      fontSize: '11.5px',
                      color: 'var(--color-text-primary)',
                      overflowX: 'auto',
                    }}
                  >
                    {JSON.stringify(evt.payloadJson, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 5: System Announcements & Banners
// ─────────────────────────────────────────────
function AnnouncementBannerPreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [dismissedBanners, setDismissedBanners] = useState<Record<string, boolean>>({});

  const toggleDismiss = (id: string) => {
    setDismissedBanners((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 1. Critical Outage Banner */}
      {!dismissedBanners['outage'] && (
        <div
          style={{
            background: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff', animation: 'pulse 1.5s infinite' }} />
            <div>
              <span style={{ fontWeight: 800, fontSize: '13px' }}>
                {isId ? 'PERINGATAN SRE: ' : 'SEV-1 ACTIVE OUTAGE: '}
              </span>
              <span style={{ fontSize: '12.5px', opacity: 0.95 }}>
                {isId
                  ? 'Failover kluster database wilayah Jakarta sedang berjalan. Sistem beralih ke mode read-only sementara.'
                  : 'Emergency database failover in progress across Jakarta region. Platform temporarily read-only.'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={() => alert(isId ? 'Membuka status page...' : 'Opening status page...')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isId ? 'Cek Status' : 'Live Status'}
            </button>
            <button
              type="button"
              onClick={() => toggleDismiss('outage')}
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 2 }}
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Scheduled Maintenance Countdown Banner */}
      {!dismissedBanners['maint'] && (
        <div
          style={{
            background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Clock size={16} />
            <div>
              <span style={{ fontWeight: 800, fontSize: '13px' }}>
                {isId ? 'PEMELIHARAAN TERJADWAL: ' : 'PLANNED MAINTENANCE: '}
              </span>
              <span style={{ fontSize: '12.5px', opacity: 0.95 }}>
                {isId
                  ? 'Pembaruan sertifikat TLS dan upgrade PostgreSQL dimulai dalam 02:44:18. Harap simpan sesi pekerjaan Anda.'
                  : 'TLS renewal & PostgreSQL upgrade starts in 02:44:18. Save open changes.'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={() => toggleDismiss('maint')}
              style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 2 }}
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* 3. New Feature Broadcast Banner */}
      {!dismissedBanners['feature'] && (
        <div
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-text-primary)',
            padding: '14px 20px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Flame size={18} color="var(--color-primary)" />
            <div>
              <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--color-primary)' }}>
                {isId ? 'Rilis Baru Neudela v2.4: ' : 'New Release v2.4: '}
              </span>
              <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                {isId
                  ? 'Modul Notification & Activity Center kini siap produksi dengan dukungan webhook real-time dan audit stream.'
                  : 'Notification & Activity Center pattern is now production ready with multi-channel routing.'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NeuronButton size="xs" variant="primary">
              {isId ? 'Jelajahi Fitur' : 'Explore Now'}
            </NeuronButton>
            <button
              type="button"
              onClick={() => toggleDismiss('feature')}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-text-tertiary)', cursor: 'pointer', padding: 2 }}
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Controls to Restore Dismissed */}
      {Object.values(dismissedBanners).some(Boolean) && (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <NeuronButton size="xs" variant="outline" onClick={() => setDismissedBanners({})}>
            {isId ? 'Pulihkan Semua Banner Pengumuman' : 'Reset Dismissed Banners'}
          </NeuronButton>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 6: Granular Channel Matrix & Preferences
// ─────────────────────────────────────────────
interface ChannelRule {
  id: string;
  category: string;
  inApp: boolean;
  email: boolean;
  slack: boolean;
  sms: boolean;
}

const INITIAL_RULES: ChannelRule[] = [
  { id: 'sec', category: 'Keamanan, IAM & Percobaan Login Tidak Sah', inApp: true, email: true, slack: true, sms: true },
  { id: 'bill', category: 'Tagihan Faktur, Saldo Minimum & Invoice', inApp: true, email: true, slack: true, sms: false },
  { id: 'k8s', category: 'Deployment Kluster & Kegagalan Pod SRE', inApp: true, email: false, slack: true, sms: true },
  { id: 'ment', category: 'Penyebutan Akun (@Mention) & Komentar Tim', inApp: true, email: true, slack: false, sms: false },
  { id: 'news', category: 'Kabar Produk & Ringkasan Metrik Mingguan', inApp: false, email: true, slack: false, sms: false },
];

function ChannelPreferencesPreview() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [rules, setRules] = useState<ChannelRule[]>(INITIAL_RULES);
  const [dndEnabled, setDndEnabled] = useState(true);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const toggleChannel = (ruleId: string, channel: 'inApp' | 'email' | 'slack' | 'sms') => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, [channel]: !r[channel] } : r))
    );
  };

  const handleTestDispatch = () => {
    setToastNotice(isId ? 'Tes notifikasi berhasil dikirimkan ke Slack (#eng-alerts) dan email terdaftar!' : 'Test notification sent to Slack (#eng-alerts) and primary email!');
    setTimeout(() => setToastNotice(null), 3000);
  };

  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {toastNotice && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            padding: '10px 20px',
            fontSize: '12.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <CheckCircle2 size={16} />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          padding: '14px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#06b6d4',
            }}
          >
            <SlidersHorizontal size={14} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            {isId ? 'Matriks Saluran Distribusi Notifikasi' : 'Notification Channel Routing Matrix'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronButton size="xs" variant="primary" onClick={handleTestDispatch}>
            {isId ? 'Kirim Tes Disparitas' : 'Send Test Notification'}
          </NeuronButton>
        </div>
      </div>

      {/* Matrix Table */}
      <div style={{ overflowX: 'auto', padding: '16px 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                {isId ? 'Kategori Kejadian' : 'Event Category'}
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Bell size={13} /> In-App</div>
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Mail size={13} /> Email</div>
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MessageSquare size={13} /> Slack</div>
              </th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Smartphone size={13} /> SMS/Alert</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {rule.category}
                </td>
                {(['inApp', 'email', 'slack', 'sms'] as const).map((ch) => {
                  const isChecked = rule[ch];
                  return (
                    <td key={ch} style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <NeuronCheckbox
                          size="sm"
                          variant="brand"
                          checked={isChecked}
                          onChange={() => toggleChannel(rule.id, ch)}
                          aria-label={`${rule.category} - ${ch}`}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quiet Hours (DND) Card */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text-primary)' }}>
            {isId ? 'Mode Jangan Ganggu (Quiet Hours)' : 'Quiet Hours / Do Not Disturb'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
            {isId ? 'Senyapkan notifikasi non-kritis antara pukul 22:00 - 07:00 WIB (Kecuali SEV-1).' : 'Suppress non-critical alerts between 10:00 PM and 7:00 AM local time.'}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDndEnabled(!dndEnabled)}
          style={{
            padding: '5px 12px',
            borderRadius: 20,
            border: 'none',
            background: dndEnabled ? 'var(--color-primary)' : 'var(--color-border)',
            color: '#fff',
            fontSize: '11.5px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {dndEnabled ? (isId ? '✓ Aktif (22:00 - 07:00)' : '✓ Active (10pm - 7am)') : (isId ? 'Nonaktif' : 'Disabled')}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Live Preview Switcher
// ─────────────────────────────────────────────
export function renderLiveNotificationPreview(
  variantId: NotificationVariantId,
  _isDarkMode?: boolean,
  _onNavigate?: () => void,
  viewportMode?: 'desktop' | 'tablet' | 'mobile'
) {
  switch (variantId) {
    case 'popover-drawer':
      return <PopoverDrawerPreview />;
    case 'split-inbox':
      return <SplitInboxPreview viewportMode={viewportMode} />;
    case 'toast-queue':
      return <ToastQueuePreview />;
    case 'audit-stream':
      return <AuditStreamPreview />;
    case 'announcement-banner':
      return <AnnouncementBannerPreview />;
    case 'channel-preferences':
      return <ChannelPreferencesPreview />;
    default:
      return <PopoverDrawerPreview />;
  }
}

// ─────────────────────────────────────────────
// TSX Code Snippets for Modal View
// ─────────────────────────────────────────────
const NOTIFICATION_TSX_SNIPPETS: Record<NotificationVariantId, string> = {
  'popover-drawer': `import React, { useState } from 'react';
import { Bell, CheckCircle2, SlidersHorizontal, CheckCheck } from 'lucide-react';
import { NeuronButton, NeuronBadge, NeuronInput } from 'neudela';

export function NotificationPopoverDrawer() {
  const [unreadCount, setUnreadCount] = useState(4);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  return (
    <div className="notification-center">
      <div className="notification-header">
        <div className="title-group">
          <Bell size={16} />
          <h4>Notification Center</h4>
          <NeuronBadge size="xs" variant="brand">{unreadCount} New</NeuronBadge>
        </div>
        <NeuronButton size="xs" variant="outline" onClick={() => setUnreadCount(0)}>
          Mark All Read
        </NeuronButton>
      </div>
      {/* Tabbed view and notification list */}
    </div>
  );
}`,
  'split-inbox': `import React, { useState } from 'react';
import { Mail, Search, Archive } from 'lucide-react';
import { NeuronInput, NeuronButton, NeuronBadge } from 'neudela';

export function SplitInboxWorkspace() {
  const [selectedId, setSelectedId] = useState('msg-1');
  return (
    <div className="split-inbox-grid">
      <div className="pane-list">
        <NeuronInput size="sm" placeholder="Search notifications..." leadingIcon={<Search size={13} />} />
        {/* List items */}
      </div>
      <div className="pane-details">
        {/* Full markdown payload and action buttons */}
      </div>
    </div>
  );
}`,
  'toast-queue': `import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { NeuronButton } from 'neudela';

export function ToastQueueManager() {
  const [toasts, setToasts] = useState([]);

  const triggerToast = (type, message) => {
    setToasts(prev => [...prev, { id: Date.now(), type, message }]);
  };

  return (
    <div className="toast-stack-container">
      {toasts.map(toast => (
        <div key={toast.id} className={\`toast-card toast-\${toast.type}\`}>
          <span>{toast.message}</span>
          <button onClick={() => remove(toast.id)}><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}`,
  'audit-stream': `import React, { useState } from 'react';
import { Shield, ChevronRight, Copy } from 'lucide-react';
import { NeuronBadge, NeuronButton } from 'neudela';

export function SecurityAuditTrail() {
  return (
    <div className="audit-timeline">
      {/* Event list with JSON inspector */}
    </div>
  );
}`,
  'announcement-banner': `import React, { useState } from 'react';
import { Clock, X } from 'lucide-react';

export function AnnouncementBanner() {
  return (
    <div className="maintenance-banner">
      <Clock size={16} />
      <span>Scheduled maintenance starts in 02:44:18.</span>
    </div>
  );
}`,
  'channel-preferences': `import React, { useState } from 'react';
import { NeuronCheckbox } from 'neudela';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

export function NotificationChannelMatrix() {
  const [rules, setRules] = useState([
    { id: 'sec', category: 'Security & Auth', inApp: true, email: true, slack: true, sms: true },
    { id: 'bill', category: 'Billing & Invoices', inApp: true, email: true, slack: true, sms: false },
    { id: 'deploy', category: 'Cluster Deployments', inApp: true, email: false, slack: true, sms: true },
  ]);

  const toggle = (id: string, channel: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, [channel]: !r[channel] } : r));
  };

  return (
    <table className="matrix-table">
      <thead>
        <tr>
          <th>Category</th>
          <th><Bell size={13} /> In-App</th>
          <th><Mail size={13} /> Email</th>
          <th><MessageSquare size={13} /> Slack</th>
          <th><Smartphone size={13} /> SMS</th>
        </tr>
      </thead>
      <tbody>
        {rules.map(rule => (
          <tr key={rule.id}>
            <td>{rule.category}</td>
            {(['inApp', 'email', 'slack', 'sms'] as const).map(ch => (
              <td key={ch} style={{ textAlign: 'center' }}>
                <NeuronCheckbox
                  size="sm"
                  variant="brand"
                  checked={rule[ch]}
                  onChange={() => toggle(rule.id, ch)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`,
};

// ─────────────────────────────────────────────
// Main NotificationPatternView Component
// ─────────────────────────────────────────────
interface NotificationPatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export default function NotificationPatternView({
  setActiveTab,
}: NotificationPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [selectedVariant, setSelectedVariant] = useState<NotificationVariantId>('popover-drawer');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedTSX, setCopiedTSX] = useState(false);

  const activeMeta =
    NOTIFICATION_VARIANTS.find((v) => v.id === selectedVariant) || NOTIFICATION_VARIANTS[0];

  const handleOpenModal = (vId: NotificationVariantId) => {
    setSelectedVariant(vId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  const handleOpenNewTab = (vId: NotificationVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-notification-${vId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyTSX = () => {
    const code = NOTIFICATION_TSX_SNIPPETS[selectedVariant] || '';
    navigator.clipboard.writeText(code);
    setCopiedTSX(true);
    setTimeout(() => setCopiedTSX(false), 2000);
  };

  return (
    <div className="pattern-notification-view" style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── 1. Page Header (Strict GEMINI.md Invariant) ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>
        <h1
          className="page-title"
          style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}
        >
          {isId ? 'Pusat Notifikasi & Aliran Aktivitas' : 'Notification & Activity Center'}
        </h1>
        <p
          className="page-subtitle"
          style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}
        >
          {isId
            ? 'Arsitektur lengkap komunikasi pengguna dan telemetri aktivitas sistem: popover navbar cerdas, inbox kerja panel ganda, antrean toast dengan timer mundur, log audit keamanan SOC2, banner pemeliharaan terjadwal, dan matriks saluran routing (Slack/Email/SMS). Klik "Preview di Modal" untuk menguji interaktivitas notifikasi secara langsung, atau klik "Tab Baru" untuk menjalankan modul layar penuh sebagai aplikasi nyata.'
            : 'Comprehensive enterprise notification & activity architecture: intelligent navbar flyouts, dual-pane productivity inboxes, orchestrated toast stacks with timer progress, SOC2 compliance audit streams, scheduled downtime countdown banners, and multi-channel routing matrices. Click "Preview in Modal" to inspect live interactions or "New Tab" for a dedicated fullscreen browser window.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Bell size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary, #df7e30)' }}>{NOTIFICATION_VARIANTS.length} Patterns</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Shield size={14} color="#10b981" />
            <span>{isId ? 'Standar Kepatuhan:' : 'Compliance Standard:'}</span>
            <strong style={{ color: '#10b981' }}>SOC2 Type II & Audit Trail</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Send size={14} color="#3b82f6" />
            <span>{isId ? 'Kanal Terpadu:' : 'Channels Supported:'}</span>
            <strong style={{ color: '#3b82f6' }}>In-App · Email · Slack · PagerDuty</strong>
          </div>
        </div>
      </div>

      {/* ── 2. Gallery Overview Cards Grid (Strict GEMINI.md Invariant) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {NOTIFICATION_VARIANTS.map((variant) => (
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
            {/* Top Accent Gradient Line (3.5px) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3.5px',
                background: `linear-gradient(90deg, ${variant.accentColor} 0%, ${variant.accentColor}30 100%)`,
              }}
            />

            {/* Header: Avatar Icon & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: `${variant.accentColor}18`,
                  border: `1px solid ${variant.accentColor}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: variant.accentColor,
                  flexShrink: 0,
                }}
              >
                {variant.id === 'popover-drawer' && <Bell size={20} />}
                {variant.id === 'split-inbox' && <Mail size={20} />}
                {variant.id === 'toast-queue' && <Radio size={20} />}
                {variant.id === 'audit-stream' && <Shield size={20} />}
                {variant.id === 'announcement-banner' && <Clock size={20} />}
                {variant.id === 'channel-preferences' && <SlidersHorizontal size={20} />}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: `${variant.accentColor}18`,
                  color: variant.accentColor,
                  border: `1px solid ${variant.accentColor}30`,
                }}
              >
                {variant.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 style={{ margin: '4px 0 6px 0', fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? variant.nameId : variant.nameEn}
              </h3>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {isId ? variant.taglineId : variant.taglineEn}
              </p>
            </div>

            {/* Mini Silhouette Frame */}
            <div
              style={{
                height: 100,
                borderRadius: 8,
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 'auto',
              }}
            >
              <NotificationMiniSilhouette id={variant.id} />
            </div>

            {/* Bottom Action Buttons (Strict GEMINI.md Invariant) */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 'var(--space-3)',
                display: 'flex',
                gap: '8px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <button
                type="button"
                className="pattern-btn-modal-preview"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(variant.id);
                }}
              >
                <Eye size={14} />
                <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
              </button>

              <button
                type="button"
                className="pattern-btn-new-tab"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenNewTab(variant.id, e);
                }}
                title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
              >
                <ExternalLink size={14} />
                <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── 3. Interactive Modal Preview (Strict GEMINI.md Invariant) ── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1120px',
              height: '90vh',
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Blueprint */}
            <div
              style={{
                height: '64px',
                padding: '0 20px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                background: 'var(--color-bg-surface)',
              }}
            >
              {/* Left Side: Dot + Title + Badge + Subtitle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: activeMeta.accentColor,
                    boxShadow: `0 0 8px ${activeMeta.accentColor}80`,
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? activeMeta.nameId : activeMeta.nameEn}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backgroundColor: `${activeMeta.accentColor}20`,
                        color: activeMeta.accentColor,
                        fontWeight: 600,
                      }}
                    >
                      {activeMeta.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {isId ? activeMeta.taglineId : activeMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Right Side: Subtabs + Open New Tab + Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Subtabs without icons */}
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
                    type="button"
                    onClick={() => setModalTab('preview')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#ffffff' : 'var(--color-text-secondary)',
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
                    type="button"
                    onClick={() => setModalTab('tsx')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#ffffff' : 'var(--color-text-secondary)',
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
                </div>

                {/* Open New Tab: Solid Terracotta */}
                <button
                  type="button"
                  onClick={() => handleOpenNewTab(selectedVariant)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 36,
                    boxSizing: 'border-box',
                    gap: 6,
                    background: 'var(--color-primary)',
                    color: '#ffffff',
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

                {/* Close Button: Bordered Surface */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  style={{
                    height: 36,
                    width: 36,
                    boxSizing: 'border-box',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: 0,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--color-bg-canvas)' }}>
              {modalTab === 'preview' ? (
                renderLiveNotificationPreview(selectedVariant)
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                      TypeScript Component Snippet ({selectedVariant}.tsx)
                    </span>
                    <NeuronButton
                      size="sm"
                      variant="outline"
                      leadingIcon={copiedTSX ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      onClick={handleCopyTSX}
                    >
                      {copiedTSX ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode' : 'Copy TSX')}
                    </NeuronButton>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: 20,
                      borderRadius: 12,
                      background: '#0d1117',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: "'JetBrains Mono', Menlo, Monaco, Consolas, monospace",
                      fontSize: '12.5px',
                      color: '#e6edf3',
                      lineHeight: 1.6,
                      overflowX: 'auto',
                    }}
                  >
                    <code>{NOTIFICATION_TSX_SNIPPETS[selectedVariant]}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Next / Previous Navigation ── */}
      <NextPrevious
        prev={{
          id: 'pat-empty-states',
          label: isId ? 'Status Kosong & Halaman Error' : 'Empty States & Error Pages',
        }}
        next={{
          id: 'pat-ai-copilot',
          label: isId ? 'AI Copilot & Ruang Kerja Percakapan' : 'AI Copilot & Conversational Workspace',
        }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
