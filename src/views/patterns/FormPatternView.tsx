import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronButton from '../../components/NeuronButton';
import NeuronTooltip from '../../components/NeuronTooltip';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronStepper, { type StepperStep } from '../../components/NeuronStepper';
import NeuronInput from '../../components/NeuronInput';
import NeuronSelect from '../../components/NeuronSelect';
import NeuronCheckbox from '../../components/NeuronCheckbox';
import NeuronAlert from '../../components/NeuronAlert';
import NeuronRating from '../../components/NeuronRating';
import NeuronToggle from '../../components/NeuronToggle';
import NeuronTextArea from '../../components/NeuronTextArea';
import {
  Check,
  Copy,
  Eye,
  X,
  Search,
  ChevronDown,
  Layers,
  ShieldCheck,
  Star,
  ExternalLink,
  Sliders,
  FileText,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  EyeOff,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  User,
  Building,
  Building2,
  Server,
  Users,
  Rocket,
  Cloud,
  Mail,
  Key,
  Send,
  HelpCircle,
  Save,
  CheckCircle2,
  Calendar,
  Tag,
} from 'lucide-react';

interface FormPatternViewProps {
  setActiveTab: (tabId: string) => void;
}

export type FormVariantId =
  | 'stepper-wizard'
  | 'split-checkout'
  | 'inline-validation'
  | 'dynamic-repeater'
  | 'slideover-drawer'
  | 'multi-column-settings'
  | 'survey-builder'
  | 'modal-dialog-form';

interface VariantMeta {
  id: FormVariantId;
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

export const FORM_VARIANTS: VariantMeta[] = [
  {
    id: 'stepper-wizard',
    nameEn: 'Multi-Step Onboarding Wizard',
    nameId: 'Wizard Pendaftaran Multi-Langkah',
    taglineEn: 'Sequential numbered workflow with step validation, back/next navigation, and completion state.',
    taglineId: 'Alur kerja bernomor berurutan dengan validasi langkah, navigasi maju/mundur, dan status selesai.',
    descEn: 'A 4-step progressive wizard breaking complex setup into manageable chunks: Account Details, Infrastructure Preferences, Team Invitations, and Review & Launch.',
    descId: 'Wizard 4 langkah progresif yang membagi konfigurasi kompleks: Rincian Akun, Preferensi Infrastruktur, Undangan Tim, dan Tinjauan & Peluncuran.',
    tags: ['Numbered Stepper', 'Step Validation', 'Progress Bar', 'Back/Next Flow', 'Setup Wizard'],
    bestForEn: 'SaaS Onboarding, Organization Setup, Complex Provisioning, Multi-stage Verification',
    bestForId: 'Onboarding SaaS, Pengaturan Organisasi, Provisi Kompleks, Verifikasi Multi-tahap',
    badge: 'Flagship Pattern',
    accentColor: '#df7e30',
  },
  {
    id: 'split-checkout',
    nameEn: 'Split-Pane Checkout & Sticky Summary',
    nameId: 'Checkout Dua Kolom & Ringkasan Melekat',
    taglineEn: 'Two-column transaction layout with customer shipping/billing inputs and live sticky calculation summary.',
    taglineId: 'Tata letak transaksi dua kolom dengan input pengiriman/pembayaran dan ringkasan kalkulasi melekat.',
    descEn: 'Split-screen layout pairing customer shipping and payment form on the left with a sticky order breakdown, coupon code validator, and primary CTA on the right.',
    descId: 'Tata letak split-screen memasangkan formulir pengiriman & pembayaran di sisi kiri dengan ringkasan pesanan melekat, validator kupon, dan CTA utama di kanan.',
    tags: ['Split Screen', 'Sticky Summary', 'Coupon Validator', 'Payment Methods', 'Order Review'],
    bestForEn: 'E-Commerce Checkouts, Subscription Upgrades, Invoice Payments, Plan Purchasing',
    bestForId: 'Checkout E-Commerce, Upgrade Berlangganan, Pembayaran Invoice, Pembelian Paket',
    badge: 'High Conversion',
    accentColor: '#df7e30',
  },
  {
    id: 'inline-validation',
    nameEn: 'Real-Time Validated Auth Form',
    nameId: 'Formulir Autentikasi Tervalidasi Real-Time',
    taglineEn: 'Input fields with live password strength indicator, async username availability, and dynamic checklist.',
    taglineId: 'Bidang input dengan indikator kekuatan password, cek ketersediaan username, dan checklist dinamis.',
    descEn: 'Form featuring real-time feedback: password strength progress bar, live rule compliance checklist (length, uppercase, number), username availability check, and show/hide password toggle.',
    descId: 'Formulir dengan umpan balik instan: progress bar kekuatan password, checklist pemenuhan aturan (panjang, huruf besar, angka), cek username, dan toggle sembunyikan password.',
    tags: ['Password Strength', 'Rule Checklist', 'Async Verification', 'Show/Hide Toggle', 'Micro-feedback'],
    bestForEn: 'User Registration, Password Reset, Security Credentials, Profile Upgrades',
    bestForId: 'Pendaftaran Akun, Reset Password, Kredensial Keamanan, Pembaruan Profil',
    badge: 'Security Ready',
    accentColor: '#df7e30',
  },
  {
    id: 'dynamic-repeater',
    nameEn: 'Dynamic Row Repeater & Line Items',
    nameId: 'Formulir Baris Dinamis & Kalkulator Item',
    taglineEn: 'Add/remove dynamic field rows with per-row rate calculations and automatic aggregated subtotal.',
    taglineId: 'Tambah/hapus baris bidang dinamis dengan kalkulasi per-baris dan subtotal otomatis.',
    descEn: 'Invoice or line-item configuration form that lets users add, modify, and delete rows on the fly, with automated rate * quantity calculation, tax rate selector, and live grand total update.',
    descId: 'Formulir konfigurasi invoice/item yang memungkinkan pengguna menambah, mengubah, dan menghapus baris secara fleksibel, dilengkapi kalkulasi subtotal dan pajak otomatis.',
    tags: ['Add/Remove Rows', 'Live Computation', 'Invoice Builder', 'Line Items', 'Aggregated Total'],
    bestForEn: 'Invoice Generators, Order Creation, Batch Permissions, Quote Estimators',
    bestForId: 'Pembuat Invoice, Pembuatan Pesanan, Izin Batch, Estimator Penawaran Harga',
    badge: 'Data Dense',
    accentColor: '#df7e30',
  },
  {
    id: 'slideover-drawer',
    nameEn: 'Slide-Over Drawer Quick Edit Form',
    nameId: 'Drawer Form Samping untuk Edit Cepat',
    taglineEn: 'Contextual right-hand slideout panel for editing records without navigating away from tables.',
    taglineId: 'Panel samping kanan kontekstual untuk mengedit data tanpa meninggalkan halaman tabel.',
    descEn: 'Slide-over side sheet form keeping background table context intact while providing avatar upload, role select, status switches, tag inputs, and sticky bottom action buttons.',
    descId: 'Formulir drawer samping yang menjaga konteks tabel di latar belakang sambil menyediakan ganti avatar, role, switch status, tag, dan tombol aksi melekat di bawah.',
    tags: ['Side Sheet', 'Sticky Action Bar', 'Context Preserving', 'Quick Edit', 'Drawer Overlay'],
    bestForEn: 'Master-Detail Tables, Member Management, Quick Record Edits, Audit Inspector',
    bestForId: 'Tabel Master-Detail, Manajemen Anggota, Edit Data Cepat, Inspektur Audit',
    badge: 'Productivity',
    accentColor: '#df7e30',
  },
  {
    id: 'multi-column-settings',
    nameEn: 'Two-Column Categorized Settings Form',
    nameId: 'Form Pengaturan Dua Kolom Terkategori',
    taglineEn: 'Enterprise settings architecture with left-column descriptions and right-column card inputs.',
    taglineId: 'Arsitektur pengaturan enterprise dengan deskripsi di kolom kiri dan kartu input di kolom kanan.',
    descEn: 'Structured settings page layout separating explanatory context on the left and form inputs on the right, concluding with an isolated high-contrast Danger Zone section.',
    descId: 'Tata letak halaman pengaturan terstruktur yang memisahkan teks penjelasan di kiri dan kartu input di kanan, diakhiri dengan zona bahaya terisolasi dengan verifikasi teks.',
    tags: ['2-Column Layout', 'Categorized Cards', 'Danger Zone', 'Workspace Settings', 'Visual Hierarchy'],
    bestForEn: 'Admin Preferences, Workspace Configuration, Profile Settings, Account Security',
    bestForId: 'Preferensi Admin, Konfigurasi Workspace, Pengaturan Profil, Keamanan Akun',
    badge: 'Enterprise Hub',
    accentColor: '#df7e30',
  },
  {
    id: 'survey-builder',
    nameEn: 'Interactive Rating & Feedback Survey',
    nameId: 'Survei Penilaian & Umpan Balik Interaktif',
    taglineEn: 'Engaging satisfaction survey with interactive stars, 0-10 NPS pill scale, and feature tag pills.',
    taglineId: 'Survei kepuasan dengan bintang interaktif, skala NPS 0-10 tombol pill, dan pilihan tag fitur.',
    descEn: 'User sentiment form featuring 5-star rating, 0-10 Net Promoter Score (NPS) pill scale with dynamic label cues, multiple-choice feature chips, and an expandable feedback textarea.',
    descId: 'Formulir sentimen pengguna dengan rating 5-bintang, skala NPS 0-10, chip pilihan ganda, dan area teks umpan balik yang responsif terhadap input pengguna.',
    tags: ['5-Star Rating', 'NPS 0-10 Scale', 'Tag Pills', 'Feedback Form', 'Delightful UX'],
    bestForEn: 'Customer Feedback, CSAT/NPS Surveys, Post-Purchase Ratings, Feature Polls',
    bestForId: 'Umpan Balik Pelanggan, Survei CSAT/NPS, Penilaian Transaksi, Polling Fitur',
    badge: 'Engagement',
    accentColor: '#df7e30',
  },
  {
    id: 'modal-dialog-form',
    nameEn: 'Action Dialog Modal Form',
    nameId: 'Formulir Dialog Modal Tindakan Cepat',
    taglineEn: 'Focused modal window for discrete creation tasks like generating API keys or inviting members.',
    taglineId: 'Jendela modal terfokus untuk tugas pembuatan terpisah seperti membuat API key atau mengundang anggota.',
    descEn: 'High-focus modal dialog providing isolated inputs for generating an API token: key name, expiration dropdown, granular permission scope checkboxes, and instant copyable token preview.',
    descId: 'Dialog modal fokus tinggi untuk membuat token API: nama kunci, dropdown masa berlaku, checkbox hak akses terperinci, dan pratinjau token yang dapat disalin.',
    tags: ['Dialog Window', 'Scoped Tasks', 'Token Generator', 'Permission Matrix', 'Esc Dismissal'],
    bestForEn: 'API Key Generation, Team Invites, Create Project Modal, Export Customizer',
    bestForId: 'Pembuatan API Key, Undangan Tim, Modal Buat Proyek, Kustomisasi Ekspor',
    badge: 'Focused Flow',
    accentColor: '#df7e30',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Card Mini Architecture Silhouette
// ─────────────────────────────────────────────────────────────────────────────

function CardMiniSilhouette({ id, accentColor }: { id: FormVariantId; accentColor: string }) {
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
      {id === 'stepper-wizard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
            {[1, 2, 3, 4].map((step, idx) => (
              <React.Fragment key={step}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: idx <= 1 ? accentColor : 'var(--color-border)',
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {idx === 0 ? '✓' : step}
                </div>
                {idx < 3 && (
                  <div
                    style={{
                      flex: 1,
                      height: 2,
                      background: idx === 0 ? accentColor : 'var(--color-border)',
                      margin: '0 4px',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 4, width: '40%', background: accentColor, borderRadius: 2 }} />
            <div style={{ height: 10, width: '100%', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
          </div>
        </div>
      )}

      {id === 'split-checkout' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 6, height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--color-bg-surface)', padding: 6, borderRadius: 6, border: '1px solid var(--color-border)' }}>
            <div style={{ height: 4, width: '60%', background: 'var(--color-text-primary)', opacity: 0.7, borderRadius: 2 }} />
            <div style={{ height: 10, width: '100%', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
            <div style={{ height: 10, width: '100%', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, background: `${accentColor}10`, border: `1px solid ${accentColor}30`, padding: 6, borderRadius: 6 }}>
            <div style={{ height: 4, width: '50%', background: accentColor, borderRadius: 2 }} />
            <div style={{ height: 4, width: '80%', background: 'var(--color-border)', borderRadius: 2 }} />
            <div style={{ marginTop: 'auto', height: 12, background: accentColor, borderRadius: 3 }} />
          </div>
        </div>
      )}

      {id === 'inline-validation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ height: 4, width: '35%', background: 'var(--color-text-primary)', opacity: 0.7, borderRadius: 2 }} />
            <div style={{ height: 4, width: 20, background: accentColor, borderRadius: 2 }} />
          </div>
          <div style={{ height: 14, background: 'var(--color-bg-surface)', border: `1.5px solid ${accentColor}`, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 6px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0, 1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor }} />)}
            </div>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            {[accentColor, accentColor, accentColor, 'var(--color-border)'].map((col, idx) => (
              <div key={idx} style={{ height: 3, borderRadius: 1.5, background: col }} />
            ))}
          </div>
        </div>
      )}

      {id === 'dynamic-repeater' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[0, 1].map(row => (
            <div key={row} style={{ display: 'flex', gap: 4, alignItems: 'center', background: 'var(--color-bg-surface)', padding: 4, borderRadius: 4, border: '1px solid var(--color-border)' }}>
              <div style={{ height: 8, flex: 2, background: 'var(--color-bg-canvas)', borderRadius: 2 }} />
              <div style={{ height: 8, flex: 1, background: 'var(--color-bg-canvas)', borderRadius: 2 }} />
              <div style={{ height: 8, width: 14, background: `${accentColor}25`, borderRadius: 2 }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <div style={{ height: 8, width: 34, background: `${accentColor}20`, borderRadius: 2 }} />
            <div style={{ height: 6, width: 28, background: accentColor, borderRadius: 2 }} />
          </div>
        </div>
      )}

      {id === 'slideover-drawer' && (
        <div style={{ display: 'flex', height: '100%', background: 'var(--color-bg-canvas)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
          <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, opacity: 0.4 }}>
            <div style={{ height: 5, width: '60%', background: 'var(--color-border)', borderRadius: 2 }} />
            <div style={{ height: 8, width: '100%', background: 'var(--color-bg-surface)', borderRadius: 2 }} />
            <div style={{ height: 8, width: '100%', background: 'var(--color-bg-surface)', borderRadius: 2 }} />
          </div>
          <div style={{ width: '55%', height: '100%', background: 'var(--color-bg-surface)', borderLeft: `2px solid ${accentColor}`, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '-4px 0 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 5, width: 28, background: accentColor, borderRadius: 2 }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-border)' }} />
            </div>
            <div style={{ height: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 2 }} />
            <div style={{ height: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 2 }} />
            <div style={{ marginTop: 'auto', height: 10, background: accentColor, borderRadius: 2 }} />
          </div>
        </div>
      )}

      {id === 'multi-column-settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 6, height: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 5, width: '70%', background: 'var(--color-text-primary)', opacity: 0.8, borderRadius: 2 }} />
            <div style={{ height: 3, width: '90%', background: 'var(--color-border)', borderRadius: 1.5 }} />
            <div style={{ height: 3, width: '60%', background: 'var(--color-border)', borderRadius: 1.5 }} />
          </div>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 2 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 4, width: 24, background: 'var(--color-border)', borderRadius: 1 }} />
              <div style={{ width: 14, height: 8, borderRadius: 4, background: accentColor }} />
            </div>
          </div>
        </div>
      )}

      {id === 'survey-builder' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={11} fill={s <= 4 ? accentColor : 'none'} color={s <= 4 ? accentColor : 'var(--color-border)'} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {['Speed', 'UI', 'Tokens'].map((tag, idx) => (
              <div key={tag} style={{ height: 10, padding: '0 4px', borderRadius: 3, background: idx === 0 ? `${accentColor}25` : 'var(--color-bg-surface)', border: `1px solid ${idx === 0 ? accentColor : 'var(--color-border)'}`, fontSize: 7, fontWeight: 700, color: idx === 0 ? accentColor : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
                {tag}
              </div>
            ))}
          </div>
          <div style={{ height: 8, width: 50, background: accentColor, borderRadius: 3 }} />
        </div>
      )}

      {id === 'modal-dialog-form' && (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--color-bg-canvas)', borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Simulated background table rows */}
          <div style={{ position: 'absolute', inset: 0, padding: 8, display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.35 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ height: 5, width: '38%', background: 'var(--color-text-primary)', borderRadius: 2 }} />
              <div style={{ height: 6, width: 20, background: accentColor, borderRadius: 2 }} />
            </div>
            <div style={{ height: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
            <div style={{ height: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
            <div style={{ height: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 3 }} />
          </div>

          {/* Dimmed backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />

          {/* Centered Floating Modal Dialog */}
          <div style={{ position: 'relative', width: '68%', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 6px 18px rgba(0,0,0,0.18)', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: accentColor }} />
                <div style={{ height: 4, width: 28, background: 'var(--color-text-primary)', borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-border)' }} />
            </div>
            <div style={{ height: 7, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 5, height: 5, borderRadius: 1.5, background: accentColor }} />
              <div style={{ height: 3, width: '60%', background: 'var(--color-text-secondary)', opacity: 0.6, borderRadius: 1 }} />
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 2, justifyContent: 'flex-end' }}>
              <div style={{ height: 7, width: 16, border: '1px solid var(--color-border)', borderRadius: 2 }} />
              <div style={{ height: 7, width: 22, background: accentColor, borderRadius: 2 }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Interactive Form Implementations
// ─────────────────────────────────────────────────────────────────────────────

// ── Varian 1: Stepper Wizard ──
function StepperWizardForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: 'Acme Technologies',
    slug: 'acme-technologies',
    industry: 'saas',
    cloud: 'aws',
    region: 'ap-southeast-3',
    adminEmail: 'iqbal@acme.corp',
    agreed: false,
  });
  const [completed, setCompleted] = useState(false);

  const wizardSteps: StepperStep[] = [
    {
      id: 1,
      label: 'Organization',
      description: 'Workspace identity',
      icon: <Building2 size={16} />,
    },
    {
      id: 2,
      label: 'Infrastructure',
      description: 'Cloud & topology',
      icon: <Server size={16} />,
    },
    {
      id: 3,
      label: 'Team Access',
      description: 'Roles & security',
      icon: <Users size={16} />,
    },
    {
      id: 4,
      label: 'Review',
      description: 'Launch check',
      icon: <Rocket size={16} />,
    },
  ];

  if (completed) {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(223, 126, 48, 0.25)' }}>
          <CheckCircle2 size={36} />
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 10px', color: 'var(--color-text-primary)' }}>
          Workspace Successfully Launched!
        </h3>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 24px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          Your tenant environment <strong>{formData.orgName}</strong> is provisioned and live on <strong>https://{formData.slug}.neudela.app</strong> backed by <strong>{formData.cloud.toUpperCase()} ({formData.region})</strong>.
        </p>

        <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '16px 20px', marginBottom: 28, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Tenant Slug:</span>
            <code style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '2px 8px', borderRadius: 4, color: 'var(--color-primary)', fontWeight: 600 }}>{formData.slug}.neudela.app</code>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Cloud Region:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formData.cloud.toUpperCase()} · {formData.region}</span>
              <NeuronBadge size="xs" variant="brand">Dedicated VPC</NeuronBadge>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Root Administrator:</span>
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formData.adminEmail}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Security Baseline:</span>
            <NeuronBadge size="xs" variant="success">SAML 2.0 SSO Active</NeuronBadge>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <NeuronButton size="md" variant="primary" leadingIcon={<Sparkles size={16} />}>
            Open Workspace Console
          </NeuronButton>
          <NeuronButton size="md" variant="secondary" onClick={() => { setCompleted(false); setCurrentStep(1); }}>
            Restart Wizard
          </NeuronButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '28px 32px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
      {/* ── Official Neudela Stepper Component ── */}
      <div style={{ marginBottom: 32 }}>
        <NeuronStepper
          steps={wizardSteps}
          activeStep={currentStep - 1}
          variant="default"
          size="md"
          labelPlacement="bottom"
          clickable={true}
          onStepClick={(index) => {
            if (index < currentStep - 1) {
              setCurrentStep(index + 1);
            }
          }}
        />
      </div>

      {/* ── Step Content ── */}
      <div style={{ minHeight: 280, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Organization & Workspace Identity
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Enter your company or team credentials to establish your root tenant.
              </p>
            </div>

            <NeuronInput
              label="Organization / Workspace Name"
              placeholder="e.g. Acme Technologies"
              value={formData.orgName}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({
                  ...formData,
                  orgName: name,
                  slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
                });
              }}
              leadingIcon={<Building2 size={16} />}
              required
              helperText="Display name visible across workspace members and customer invoices."
            />

            <NeuronInput
              label="Workspace Domain Slug"
              placeholder="acme-technologies"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
              leadingText="https://"
              trailingText=".neudela.app"
              helperText="Permanent subdomain slug for SAML identity federation and API endpoints."
            />

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                Industry Domain
              </label>
              <NeuronSelect
                options={[
                  { value: 'fintech', label: 'Fintech & Digital Banking', description: 'Payment processing, ledger compliance, PCI-DSS' },
                  { value: 'saas', label: 'B2B Enterprise SaaS', description: 'Multi-tenant cloud applications & data platforms' },
                  { value: 'ecommerce', label: 'E-Commerce & Digital Retail', description: 'Omnichannel inventory, storefronts, and logistics' },
                  { value: 'healthcare', label: 'Healthcare & Life Sciences', description: 'HIPAA compliant infrastructure & medical records' },
                ]}
                value={formData.industry}
                onChange={(val) => setFormData({ ...formData, industry: val as string })}
                placeholder="Select your industry domain"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Cloud Infrastructure & Deployment
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Select your preferred cloud provider and primary hosting region for data residency.
              </p>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 8 }}>
                Primary Cloud Provider
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { id: 'aws', name: 'Amazon Web Services', badge: 'Fastest Deploy', icon: '☁️', desc: 'Global VPC & S3' },
                  { id: 'gcp', name: 'Google Cloud Platform', badge: 'AI & BigQuery', icon: '⚡', desc: 'Kubernetes GKE' },
                  { id: 'azure', name: 'Microsoft Azure', badge: 'Active Directory', icon: '🏢', desc: 'Enterprise Hybrid' },
                ].map(p => {
                  const isSelected = formData.cloud === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setFormData({ ...formData, cloud: p.id })}
                      style={{
                        padding: '14px',
                        borderRadius: 10,
                        border: isSelected ? '2px solid var(--color-brand, #df7e30)' : '1px solid var(--color-border)',
                        background: isSelected ? 'rgba(223, 126, 48, 0.08)' : 'var(--color-bg-canvas)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        boxShadow: isSelected ? '0 0 0 3px rgba(223, 126, 48, 0.15)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 18 }}>{p.icon}</span>
                        <NeuronBadge size="xs" variant={isSelected ? 'brand' : 'neutral'}>{p.badge}</NeuronBadge>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: isSelected ? 'var(--color-brand, #df7e30)' : 'var(--color-text-primary)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                        {p.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                Target Deployment Region
              </label>
              <NeuronSelect
                options={[
                  { value: 'ap-southeast-3', label: 'Asia Pacific (Jakarta · ap-southeast-3)', description: 'Latency: ~4ms · 3 Availability Zones' },
                  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore · ap-southeast-1)', description: 'Latency: ~12ms · Regional Hub' },
                  { value: 'us-east-1', label: 'US East (N. Virginia · us-east-1)', description: 'Latency: ~180ms · Full Cloud Services' },
                  { value: 'eu-central-1', label: 'Europe (Frankfurt · eu-central-1)', description: 'Latency: ~160ms · GDPR Sovereign Node' },
                ]}
                value={formData.region}
                onChange={(val) => setFormData({ ...formData, region: val as string })}
                placeholder="Select deployment region"
              />
            </div>

            <NeuronAlert
              variant="info"
              fill="subtle"
              size="sm"
              title="Automated VPC Peering"
              description="Your workspace will be provisioned in an isolated tenant VPC with encrypted private database subnets and automated hourly snapshot failover."
            />
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Team Access & Security Baseline
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Assign the root administrator identity and review default compliance posture.
              </p>
            </div>

            <NeuronInput
              label="Root Administrator Email"
              type="email"
              placeholder="iqbal@acme.corp"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
              leadingIcon={<Mail size={16} />}
              required
              helperText="Root administrator will receive initial credential setup and holds master billing authority."
            />

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 8 }}>
                Pre-configured Workspace Teammates
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <NeuronAvatar name="Iqbal Dzulfikar" size="xs" />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{formData.adminEmail || 'iqbal@acme.corp'}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Primary Owner</div>
                    </div>
                  </div>
                  <NeuronBadge size="xs" variant="brand">Workspace Owner</NeuronBadge>
                </div>
                <div style={{ height: 1, background: 'var(--color-border)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <NeuronAvatar name="Sarah Jenkins" size="xs" />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>sarah.dev@acme.corp</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>DevOps Engineer</div>
                    </div>
                  </div>
                  <NeuronBadge size="xs" variant="neutral">Infra Admin</NeuronBadge>
                </div>
              </div>
            </div>

            <NeuronAlert
              variant="success"
              fill="subtle"
              size="sm"
              title="Enterprise Security Active"
              description="SAML 2.0 Single Sign-On, SCIM directory synchronization, and MFA enforcement are enabled by default for all provisioned accounts."
            />
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Review Configuration & Provision
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                Verify your workspace topology before triggering automated provisioning.
              </p>
            </div>

            <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: 'var(--color-text-tertiary)' }}>Workspace Identity:</span>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{formData.orgName}</strong>
                  <div style={{ fontSize: 11.5, color: 'var(--color-brand, #df7e30)' }}>{formData.slug}.neudela.app</div>
                </div>
              </div>
              <div style={{ height: 1, background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: 'var(--color-text-tertiary)' }}>Cloud Stack:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>{formData.cloud}</span>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>({formData.region})</span>
                  <NeuronBadge size="xs" variant="brand">VPC Cluster</NeuronBadge>
                </div>
              </div>
              <div style={{ height: 1, background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: 'var(--color-text-tertiary)' }}>Root Administrator:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formData.adminEmail}</span>
              </div>
              <div style={{ height: 1, background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: 'var(--color-text-tertiary)' }}>Compliance Baseline:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={14} color="var(--color-primary)" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary)' }}>SOC2 Type II + SAML SSO</span>
                </div>
              </div>
            </div>

            <NeuronCheckbox
              checked={formData.agreed}
              onChange={(checked) => setFormData({ ...formData, agreed: checked })}
              variant="brand"
              label="I acknowledge and agree to the Neudela Cloud Service Level Agreement"
              description="Guarantees 99.99% multi-region uptime, automatic data encryption at rest (AES-256), and 24/7 dedicated enterprise incident response."
            />
          </div>
        )}
      </div>

      {/* ── Footer Navigation Buttons ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 20, marginTop: 24 }}>
        <NeuronButton
          size="md"
          variant="secondary"
          leadingIcon={<ArrowLeft size={16} />}
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(c => c - 1)}
        >
          Back
        </NeuronButton>

        {currentStep < 4 ? (
          <NeuronButton
            size="md"
            variant="primary"
            trailingIcon={<ArrowRight size={16} />}
            onClick={() => setCurrentStep(c => c + 1)}
          >
            Continue
          </NeuronButton>
        ) : (
          <NeuronButton
            size="md"
            variant="primary"
            disabled={!formData.agreed}
            onClick={() => setCompleted(true)}
            trailingIcon={<Sparkles size={16} />}
          >
            Launch Workspace
          </NeuronButton>
        )}
      </div>
    </div>
  );
}

// ── Varian 2: Split Checkout ──
function SplitCheckoutForm() {
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'va' | 'qris'>('card');
  const [courier, setCourier] = useState('express');
  const [orderDone, setOrderDone] = useState(false);

  const subtotal = 1499000;
  const shipping = courier === 'instant' ? 45000 : courier === 'express' ? 25000 : 12000;
  const discount = discountApplied ? 200000 : 0;
  const total = subtotal + shipping - discount;

  if (orderDone) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '1px solid rgba(223, 126, 48, 0.25)' }}>
          <CheckCircle2 size={36} />
        </div>
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: 'var(--color-text-primary)' }}>Order Authorized!</h3>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Transaction <strong>#NDL-94819</strong> has been verified. A tax invoice & tracking receipt have been dispatched to your email.
          </p>
        </div>
        <NeuronAlert variant="success" fill="subtle" title="Dispatched from Warehouse">
          Delivery courier scheduled for pickup today with estimated arrival in 1-2 business days.
        </NeuronAlert>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8 }}>
          <NeuronButton size="sm" variant="secondary" onClick={() => setOrderDone(false)}>
            Back to Checkout
          </NeuronButton>
          <NeuronButton size="sm" variant="primary" onClick={() => setOrderDone(false)}>
            Track Shipment
          </NeuronButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.85fr', gap: 24, maxWidth: 900, margin: '0 auto' }}>
      {/* Left Column: Form Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, background: 'var(--color-bg-surface)', padding: 24, borderRadius: 14, border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>1</span>
            Shipping & Destination
          </h4>
          <NeuronBadge size="xs" variant="brand">Address Verified</NeuronBadge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <NeuronInput
            label="First Name"
            defaultValue="Alex"
            leadingIcon={<User size={14} />}
            required
          />
          <NeuronInput
            label="Last Name"
            defaultValue="Chen"
            required
          />
        </div>

        <NeuronInput
          label="Street Address"
          defaultValue="Jl. Jenderal Sudirman No. 28, Menara Neudela Lt. 14"
          leadingIcon={<Building size={14} />}
          required
        />

        <NeuronSelect
          label="Delivery Service Tier"
          value={courier}
          onChange={(val) => setCourier(val as string)}
          options={[
            { value: 'instant', label: 'Instant Priority (1-2 Hours)', description: 'Rp 45.000 · Direct Courier' },
            { value: 'express', label: 'Next Day Express Courier', description: 'Rp 25.000 · Air Freight' },
            { value: 'standard', label: 'Standard Ground Delivery', description: 'Rp 12.000 · Regular Land' },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>2</span>
            Payment Method
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-text-tertiary)', fontSize: 11 }}>
            <Lock size={12} />
            <span>256-bit TLS</span>
          </div>
        </div>

        {/* Payment Method Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { id: 'card', label: 'Credit Card', desc: 'Visa / MC', icon: <CreditCard size={18} /> },
            { id: 'va', label: 'Virtual Acc', desc: 'Auto Check', icon: <Building2 size={18} /> },
            { id: 'qris', label: 'QRIS Scan', desc: 'Instant Pay', icon: <Sparkles size={18} /> },
          ].map(m => {
            const active = paymentMethod === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                style={{
                  padding: '12px 10px',
                  borderRadius: 10,
                  border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: active ? 'rgba(223, 126, 48, 0.08)' : 'var(--color-bg-canvas)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {m.icon}
                  {active && <Check size={14} color="var(--color-primary)" />}
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{m.desc}</div>
              </button>
            );
          })}
        </div>

        {paymentMethod === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeIn 0.2s ease-out' }}>
            <NeuronInput
              label="Card Number"
              defaultValue="•••• •••• •••• 4242"
              leadingIcon={<CreditCard size={15} />}
              trailingIcon={<span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--color-primary)' }}>VISA</span>}
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <NeuronInput
                label="Expiration Date"
                placeholder="MM/YY"
                defaultValue="12/28"
                required
              />
              <NeuronInput
                label="Security Code (CVC)"
                placeholder="•••"
                defaultValue="888"
                leadingIcon={<Lock size={13} />}
                required
              />
            </div>
          </div>
        )}

        {paymentMethod === 'va' && (
          <NeuronAlert variant="info" fill="subtle" title="Virtual Account Notice">
            A dynamic virtual account number will be generated immediately after order authorization.
          </NeuronAlert>
        )}

        {paymentMethod === 'qris' && (
          <NeuronAlert variant="info" fill="subtle" title="Dynamic QRIS Display">
            Dynamic QR code compatible with GoPay, OVO, Dana, ShopeePay, and all Mobile Banking apps.
          </NeuronAlert>
        )}
      </div>

      {/* Right Column: Sticky Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: 'var(--color-bg-surface)', padding: 22, borderRadius: 14, border: '1px solid var(--color-border)', position: 'sticky', top: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Order Summary</h4>
            <NeuronBadge size="xs" variant="brand">1 Item</NeuronBadge>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              ⌨️
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>Neudela Pro Mechanical</div>
              <div style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)' }}>Gateron Brown · Slate Gray</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Rp 1.499.000</div>
          </div>

          {/* Coupon Input using Neudela components */}
          <div style={{ marginTop: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <NeuronInput
                  placeholder="Promo code (try NEUDELA)"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  leadingIcon={<Tag size={13} />}
                />
              </div>
              <NeuronButton
                size="md"
                variant="secondary"
                onClick={() => {
                  if (coupon.toUpperCase() === 'NEUDELA') setDiscountApplied(true);
                }}
              >
                Apply
              </NeuronButton>
            </div>
          </div>

          {discountApplied && (
            <div style={{ marginBottom: 14 }}>
              <NeuronAlert variant="success" fill="subtle">
                ✓ Voucher <strong>NEUDELA</strong> applied (-Rp 200.000)
              </NeuronAlert>
            </div>
          )}

          {/* Totals Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5, borderTop: '1px solid var(--color-border)', paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>Shipping Fee</span>
              <span>Rp {shipping.toLocaleString('id-ID')}</span>
            </div>
            {discountApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontWeight: 700 }}>
                <span>Voucher Discount</span>
                <span>-Rp {discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, marginTop: 4, paddingTop: 10, borderTop: '1px dashed var(--color-border)' }}>
              <span>Total Due</span>
              <span style={{ color: 'var(--color-primary)' }}>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <NeuronButton
              size="lg"
              variant="primary"
              style={{ width: '100%' }}
              onClick={() => setOrderDone(true)}
              trailingIcon={<ArrowRight size={15} />}
            >
              Authorize Payment
            </NeuronButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Varian 3: Inline Validation ──
function InlineValidationForm() {
  const [username, setUsername] = useState('alexchen');
  const [password, setPassword] = useState('Neudela#2026');
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Password rules
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const strengthCount = [hasMinLength, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;
  const strengthLabel = strengthCount <= 1 ? 'Weak' : strengthCount <= 2 ? 'Fair' : strengthCount === 3 ? 'Good' : 'Strong';
  const strengthVariant: 'error' | 'warning' | 'info' | 'success' =
    strengthCount <= 1 ? 'error' : strengthCount <= 2 ? 'warning' : strengthCount === 3 ? 'info' : 'success';

  return (
    <div style={{ maxWidth: 460, margin: '0 auto', background: 'var(--color-bg-surface)', padding: 26, borderRadius: 14, border: '1px solid var(--color-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h4 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Security Credentials</h4>
        <NeuronBadge size="xs" variant="brand">Zod Schema Validated</NeuronBadge>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', margin: '0 0 20px', lineHeight: 1.5 }}>
        Real-time feedback with async handle availability verification and adaptive entropy score.
      </p>

      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3500); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Username with Async Check Indicator */}
        <NeuronInput
          label="Unique Handle"
          value={username}
          onChange={e => setUsername(e.target.value)}
          leadingIcon={<User size={15} />}
          trailingIcon={username.length >= 4 ? <Check size={16} color="var(--color-primary)" /> : undefined}
          state={username.length >= 4 ? 'success' : 'default'}
          helperText={username.length >= 4 ? `✓ @${username} is available for reservation` : 'Enter at least 4 alphanumeric characters'}
          required
        />

        {/* Password Field with Show/Hide Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>Master Password *</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: strengthCount >= 3 ? 'var(--color-primary)' : strengthCount === 2 ? '#f59e0b' : '#ef4444' }}>
              Entropy: {strengthLabel} ({strengthCount}/4)
            </span>
          </div>

          <NeuronInput
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            leadingIcon={<Lock size={15} />}
            trailingIcon={
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 0, display: 'flex' }}
                title={showPass ? 'Hide Password' : 'Show Password'}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
            state={strengthCount >= 3 ? 'success' : strengthCount <= 1 ? 'error' : 'default'}
          />

          {/* Neudela Progress Bar */}
          <div style={{ marginTop: 4 }}>
            <NeuronProgress
              value={strengthCount * 25}
              variant={strengthCount >= 3 ? 'brand' : strengthVariant}
              size="sm"
            />
          </div>

          {/* Requirements Checklist */}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
            {[
              { label: 'Minimum 8 characters length', met: hasMinLength },
              { label: 'At least one uppercase letter (A-Z)', met: hasUppercase },
              { label: 'At least one numerical digit (0-9)', met: hasNumber },
              { label: 'At least one special symbol (!@#$)', met: hasSymbol },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 7, color: r.met ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: r.met ? 'rgba(223, 126, 48, 0.15)' : 'var(--color-bg-canvas)', border: `1px solid ${r.met ? 'var(--color-primary)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {r.met && <Check size={10} color="var(--color-primary)" />}
                </div>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {submitted && (
          <NeuronAlert variant="success" fill="subtle" title="Credentials Updated">
            Password passed all zero-trust compliance standards and is saved in your vault.
          </NeuronAlert>
        )}

        <NeuronButton size="md" variant="primary" disabled={strengthCount < 3} style={{ width: '100%' }}>
          Save New Credentials
        </NeuronButton>
      </form>
    </div>
  );
}

// ── Varian 4: Dynamic Repeater ──
function DynamicRepeaterForm() {
  const [items, setItems] = useState([
    { id: 1, desc: 'Frontend Architecture Consulting', qty: 10, rate: 150 },
    { id: 2, desc: 'Neudela Component Token Mapping', qty: 25, rate: 80 },
  ]);
  const [taxRate, setTaxRate] = useState('11');

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), desc: 'Custom Development Service', qty: 1, rate: 100 }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(it => it.id !== id));
  };

  const subtotal = items.reduce((acc, it) => acc + (it.qty * it.rate), 0);
  const taxMultiplier = parseFloat(taxRate) / 100;
  const tax = subtotal * taxMultiplier;
  const grandTotal = subtotal + tax;

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', background: 'var(--color-bg-surface)', padding: 24, borderRadius: 14, border: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Invoice Line Items</h4>
            <NeuronBadge size="xs" variant="brand">{items.length} Items</NeuronBadge>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Add dynamic services with live price & VAT aggregations</span>
        </div>
        <NeuronButton
          size="sm"
          variant="primary"
          leadingIcon={<Plus size={14} />}
          onClick={handleAddItem}
        >
          Add Line Item
        </NeuronButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1.8fr 90px 110px 100px auto',
              gap: 10,
              alignItems: 'center',
              background: 'var(--color-bg-canvas)',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-tertiary)', width: 18 }}>
              #{index + 1}
            </span>
            <NeuronInput
              value={item.desc}
              placeholder="Item description..."
              onChange={e => {
                const val = e.target.value;
                setItems(items.map(it => it.id === item.id ? { ...it, desc: val } : it));
              }}
            />
            <NeuronInput
              type="number"
              leadingText="Qty"
              value={item.qty.toString()}
              onChange={e => {
                const val = Math.max(1, parseInt(e.target.value) || 0);
                setItems(items.map(it => it.id === item.id ? { ...it, qty: val } : it));
              }}
            />
            <NeuronInput
              type="number"
              leadingText="$"
              value={item.rate.toString()}
              onChange={e => {
                const val = Math.max(0, parseInt(e.target.value) || 0);
                setItems(items.map(it => it.id === item.id ? { ...it, rate: val } : it));
              }}
            />
            <div style={{ textAlign: 'right', fontWeight: 800, fontSize: 13, color: 'var(--color-text-primary)' }}>
              ${(item.qty * item.rate).toLocaleString()}
            </div>
            <NeuronButton
              size="xs"
              variant="text"
              onClick={() => handleRemoveItem(item.id)}
              disabled={items.length <= 1}
              style={{ color: '#ef4444' }}
              title={items.length <= 1 ? 'Minimum 1 line item required' : 'Remove row'}
            >
              <Trash2 size={15} />
            </NeuronButton>
          </div>
        ))}
      </div>

      {/* Aggregate Calculations & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 22, borderTop: '1px solid var(--color-border)', paddingTop: 18 }}>
        <div style={{ width: 220 }}>
          <NeuronSelect
            label="Tax Rate Tier"
            value={taxRate}
            onChange={v => setTaxRate(v as string)}
            options={[
              { value: '11', label: '11% Standard VAT' },
              { value: '5', label: '5% Reduced Hospitality' },
              { value: '0', label: '0% Tax Exempt / Export' },
            ]}
          />
        </div>

        <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>Subtotal:</span>
            <strong>${subtotal.toLocaleString()}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>Tax ({taxRate}%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: 'var(--color-primary)', borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <NeuronButton size="sm" variant="secondary" style={{ flex: 1 }}>
              Save Draft
            </NeuronButton>
            <NeuronButton size="sm" variant="primary" style={{ flex: 1 }} leadingIcon={<Send size={13} />}>
              Issue
            </NeuronButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Varian 5: Slideover Drawer ──
function SlideoverDrawerForm() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [role, setRole] = useState('maintainer');
  const [activeAccount, setActiveAccount] = useState(true);

  return (
    <div style={{ position: 'relative', height: 480, background: 'var(--color-bg-canvas)', borderRadius: 14, border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex' }}>
      {/* Background Simulated Records List */}
      <div style={{ flex: 1, padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Team Directory</h4>
              <NeuronBadge size="xs" variant="brand">3 Members</NeuronBadge>
            </div>
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Context-preserving slideout inspection</span>
          </div>
          {!drawerOpen && (
            <NeuronButton size="sm" variant="primary" onClick={() => setDrawerOpen(true)}>
              Edit Active Member
            </NeuronButton>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: 'Iqbal Dzulfikar', email: 'iqbal@neudela.org', role: 'Maintainer', badgeVariant: 'brand' as const },
            { name: 'David Miller', email: 'david@neudela.org', role: 'Developer', badgeVariant: 'blue' as const },
            { name: 'Elena Rostova', email: 'elena@neudela.org', role: 'Viewer', badgeVariant: 'gray' as const },
          ].map(u => (
            <div key={u.email} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <NeuronAvatar name={u.name} size="sm" status="online" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{u.email}</div>
                </div>
              </div>
              <NeuronBadge size="xs" variant={u.badgeVariant}>{u.role}</NeuronBadge>
            </div>
          ))}
        </div>
      </div>

      {/* Dimmed Overlay */}
      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)', zIndex: 10 }} />
      )}

      {/* Slideout Side Sheet */}
      {drawerOpen && (
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 370, background: 'var(--color-bg-surface)', borderLeft: '1px solid var(--color-border)', zIndex: 20, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 24px rgba(0,0,0,0.15)', animation: 'slideInRight 0.25s ease' }}>
          {/* Drawer Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Edit Member Profile</h4>
              <NeuronBadge size="xs" variant="brand">Admin Mode</NeuronBadge>
            </div>
            <NeuronButton size="xs" variant="text" onClick={() => setDrawerOpen(false)}>
              <X size={15} />
            </NeuronButton>
          </div>

          {/* Drawer Body */}
          <div style={{ flex: 1, padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <NeuronAvatar name="Iqbal Dzulfikar" size="lg" status="online" />
              <div>
                <NeuronButton size="xs" variant="outline">Change Avatar</NeuronButton>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 4 }}>JPG, PNG up to 2MB</div>
              </div>
            </div>

            <NeuronInput
              label="Full Name"
              defaultValue="Iqbal Dzulfikar"
              leadingIcon={<User size={14} />}
              required
            />

            <NeuronInput
              label="Work Email"
              defaultValue="iqbal@neudela.org"
              leadingIcon={<Mail size={14} />}
              required
            />

            <NeuronSelect
              label="Workspace Role"
              value={role}
              onChange={val => setRole(val as string)}
              options={[
                { value: 'admin', label: 'Administrator', description: 'Complete tenant administration privileges' },
                { value: 'maintainer', label: 'Maintainer', description: 'Deploy releases & configure CI/CD pipelines' },
                { value: 'developer', label: 'Developer', description: 'Write code, create pull requests & branches' },
                { value: 'viewer', label: 'Viewer', description: 'Read-only access across repositories' },
              ]}
            />

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <NeuronToggle
                label="Active Workspace Session"
                description="Grant active dashboard authentication & API credentials"
                checked={activeAccount}
                onChange={setActiveAccount}
              />
              <NeuronCheckbox
                label="Enforce Hardware 2FA Token"
                description="Require FIDO2 / YubiKey physical key validation"
                defaultChecked
              />
            </div>
          </div>

          {/* Sticky Drawer Footer */}
          <div style={{ padding: '14px 18px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)', display: 'flex', gap: 10 }}>
            <NeuronButton size="sm" variant="secondary" onClick={() => setDrawerOpen(false)}>
              Cancel
            </NeuronButton>
            <NeuronButton size="sm" variant="primary" style={{ flex: 1 }} onClick={() => setDrawerOpen(false)}>
              Save Changes
            </NeuronButton>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Varian 6: Multi-Column Settings ──
function MultiColumnSettingsForm() {
  const [dangerConfirm, setDangerConfirm] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [autoRollback, setAutoRollback] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 26 }}>
      {/* Section 1: General Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>General Information</h4>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            Update your enterprise tenant identity and public workspace vanity URL.
          </p>
        </div>
        <div style={{ background: 'var(--color-bg-surface)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <NeuronInput
            label="Workspace Organization Name"
            defaultValue="Acme Global Corporation"
            leadingIcon={<Building2 size={14} />}
            required
          />

          <NeuronInput
            label="Workspace Vanity Slug"
            defaultValue="acme-corp"
            leadingText="neudela.app/"
            trailingText=""
            helperText="Public domain path for your workspace SSO & developer portal."
            required
          />

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <NeuronToggle
              label="Weekly Security Digest"
              description="Receive weekly summaries of security alerts and dependency updates"
              checked={notifications}
              onChange={setNotifications}
            />
            <NeuronToggle
              label="Automated Canary Rollback"
              description="Instantly rollback production releases if error rate exceeds 1%"
              checked={autoRollback}
              onChange={setAutoRollback}
            />
          </div>

          {savedSuccess && (
            <NeuronAlert variant="success" fill="subtle">
              ✓ Preferences updated and cached across all edge nodes.
            </NeuronAlert>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 6 }}>
            <NeuronButton size="sm" variant="primary" onClick={handleSave}>
              Save Preferences
            </NeuronButton>
          </div>
        </div>
      </div>

      {/* Section 2: Danger Zone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 24 }}>
        <div>
          <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#ef4444' }}>Danger Zone</h4>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            Destructive operations that permanently purge audit logs and data stores.
          </p>
        </div>
        <div style={{ background: 'var(--color-bg-surface)', padding: 20, borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.3)', borderLeft: '4px solid #ef4444', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <NeuronAlert variant="error" fill="subtle" title="Permanent Workspace Deletion">
            Once deleted, all database snapshots, telemetry records, and API tokens will be irrecoverable.
          </NeuronAlert>

          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: 0 }}>
            To confirm deletion, please type <strong>acme-corp</strong> below:
          </p>

          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <NeuronInput
                placeholder="acme-corp"
                value={dangerConfirm}
                onChange={e => setDangerConfirm(e.target.value)}
                destructive={dangerConfirm.length > 0 && dangerConfirm !== 'acme-corp'}
                state={dangerConfirm === 'acme-corp' ? 'success' : 'default'}
                helperText={dangerConfirm === 'acme-corp' ? '✓ Confirmation matched' : ''}
              />
            </div>
            <NeuronButton
              size="md"
              variant="danger"
              disabled={dangerConfirm !== 'acme-corp'}
            >
              Delete Permanently
            </NeuronButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Varian 7: Survey Builder ──
function SurveyBuilderForm() {
  const [stars, setStars] = useState(5);
  const [npsScore, setNpsScore] = useState(9);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Design Tokens', 'Speed']);
  const [submitted, setSubmitted] = useState(false);

  const tagsList = ['Design Tokens', 'Dark Theme', 'Accessibility', 'Speed', 'Clean Architecture', 'Type Safety'];

  const toggleTag = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag]);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '36px 20px', maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '1px solid rgba(223, 126, 48, 0.25)' }}>
          <Sparkles size={28} />
        </div>
        <h4 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>Thank you for your rating!</h4>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Your feedback directly steers our design system token roadmap and component ergonomics.
        </p>
        <NeuronAlert variant="success" fill="subtle">
          Response recorded with Net Promoter Score of <strong>{npsScore}/10</strong>.
        </NeuronAlert>
        <div style={{ marginTop: 8 }}>
          <NeuronButton size="sm" variant="outline" onClick={() => setSubmitted(false)}>
            Submit Another Review
          </NeuronButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', background: 'var(--color-bg-surface)', padding: 26, borderRadius: 14, border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>How would you rate Neudela 2.0?</h4>
        <NeuronBadge size="xs" variant="brand">CSAT / NPS</NeuronBadge>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', margin: '0 0 22px' }}>
        Your review directly powers our design token quality benchmarks.
      </p>

      {/* 5-Star Rating using NeuronRating */}
      <div style={{ marginBottom: 22 }}>
        <label style={{ fontSize: 12.5, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--color-text-primary)' }}>
          Overall Quality Rating
        </label>
        <NeuronRating
          value={stars}
          onChange={setStars}
          max={5}
          size="lg"
          variant="brand"
          showLabel
          labels={{
            1: 'Poor Experience',
            2: 'Needs Improvement',
            3: 'Satisfactory',
            4: 'Very Good',
            5: 'Exceptional Delight',
          }}
        />
      </div>

      {/* NPS 0-10 Scale */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text-primary)' }}>Likelihood to recommend (NPS)</label>
          <NeuronBadge size="xs" variant={npsScore >= 9 ? 'brand' : npsScore >= 7 ? 'warning' : 'error'}>
            {npsScore}/10 · {npsScore >= 9 ? 'Promoter' : npsScore >= 7 ? 'Passive' : 'Detractor'}
          </NeuronBadge>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => setNpsScore(num)}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 6,
                border: npsScore === num ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: npsScore === num ? 'var(--color-primary)' : 'var(--color-bg-canvas)',
                color: npsScore === num ? '#fff' : 'var(--color-text-primary)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Tags */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12.5, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--color-text-primary)' }}>
          What stood out to you most?
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tagsList.map(tag => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: active ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: active ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-canvas)',
                  color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {active ? '✓ ' : ''}{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Written Feedback using NeuronTextArea */}
      <div style={{ marginBottom: 22 }}>
        <NeuronTextArea
          label="Detailed Qualitative Feedback"
          placeholder="What features or component improvements would you like to see next?"
          rows={3}
        />
      </div>

      <NeuronButton size="md" variant="primary" style={{ width: '100%' }} onClick={() => setSubmitted(true)}>
        Submit Satisfaction Survey
      </NeuronButton>
    </div>
  );
}

// ── Varian 8: Modal Dialog Form ──
function ModalDialogForm() {
  const [modalOpen, setModalOpen] = useState(true);
  const [keyLabel, setKeyLabel] = useState('Production Webhook Sync');
  const [expiration, setExpiration] = useState('90d');
  const [scopes, setScopes] = useState({
    read: true,
    write: true,
    admin: false,
  });
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [keysList, setKeysList] = useState([
    { id: '1', name: 'Production Webhook Sync', prefix: 'ndl_live_9481••••3b2a', scopes: ['Read', 'Write'], created: '2 days ago', status: 'Active' },
    { id: '2', name: 'GitHub CI/CD Runner', prefix: 'ndl_live_2104••••88f1', scopes: ['Deploy'], created: '3 weeks ago', status: 'Active' },
    { id: '3', name: 'Grafana Telemetry Agent', prefix: 'ndl_live_7732••••109c', scopes: ['Read Only'], created: '2 months ago', status: 'Active' },
  ]);

  const handleGenerate = () => {
    const randomHex = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const newKey = `ndl_live_${randomHex}`;
    setGeneratedKey(newKey);
    setCopied(false);

    setKeysList(prev => [
      {
        id: Date.now().toString(),
        name: keyLabel || 'Untitled Access Key',
        prefix: `ndl_live_${randomHex.substring(0, 4)}••••${randomHex.substring(randomHex.length - 4)}`,
        scopes: [scopes.read && 'Read', scopes.write && 'Write', scopes.admin && 'Admin'].filter(Boolean) as string[],
        created: 'Just now',
        status: 'Active',
      },
      ...prev,
    ]);
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: 560, background: 'var(--color-bg-canvas)', borderRadius: 14, border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* ── Background Simulated App Context: API Credentials View ── */}
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h4 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)' }}>API & Service Credentials</h4>
              <NeuronBadge size="xs" variant="brand">Enterprise Vault</NeuronBadge>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
              Manage machine tokens and programmatic secret keys for CI/CD runners and external webhooks.
            </p>
          </div>
          <NeuronButton
            size="sm"
            variant="primary"
            leadingIcon={<Plus size={14} />}
            onClick={() => {
              setModalOpen(true);
              setGeneratedKey(null);
              setCopied(false);
            }}
          >
            Generate Secret Key
          </NeuronButton>
        </div>

        {/* Security Metric Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(223, 126, 48, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Key size={16} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Active Credentials</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-primary)' }}>{keysList.length} Keys Live</div>
            </div>
          </div>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(223, 126, 48, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Rotation Policy</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-primary)' }}>90-Day Cadence</div>
            </div>
          </div>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(223, 126, 48, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={16} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Key Encryption</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-primary)' }}>AES-256 HSM</div>
            </div>
          </div>
        </div>

        {/* Existing Keys Table */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-canvas)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Assigned Credentials & Tokens
            </span>
            <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Click &quot;+ Generate Secret Key&quot; to trigger modal</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {keysList.map((k, idx) => (
              <div
                key={k.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderBottom: idx < keysList.length - 1 ? '1px solid var(--color-border)' : 'none',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(223, 126, 48, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Key size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{k.name}</div>
                    <code style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>{k.prefix}</code>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {k.scopes.map(s => (
                      <NeuronBadge key={s} size="xs" variant="brand">{s}</NeuronBadge>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{k.created}</span>
                  <NeuronBadge size="xs" variant="brand">Active</NeuronBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dimmed Modal Overlay ── */}
      {modalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.52)',
            backdropFilter: 'blur(3px)',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Centered Modal Window */}
          <div
            style={{
              width: 500,
              maxWidth: '100%',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16,
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-bg-canvas)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Key size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>Generate Secret API Key</h4>
                    <NeuronBadge size="xs" variant="brand">IAM Scope</NeuronBadge>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 2 }}>Scoped programmatic access credential</div>
                </div>
              </div>
              <NeuronButton size="xs" variant="text" onClick={() => setModalOpen(false)} title="Close">
                <X size={15} />
              </NeuronButton>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '65vh', overflowY: 'auto' }}>
              {generatedKey ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <NeuronAlert variant="success" fill="subtle" title="API Key Successfully Generated!">
                    Make sure to copy your secret key now. For enterprise security compliance, this secret token cannot be viewed again.
                  </NeuronAlert>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 6 }}>
                      Secret Access Token
                    </label>
                    <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <code style={{ fontSize: 12.5, fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: 700, wordBreak: 'break-all' }}>
                        {generatedKey}
                      </code>
                      <NeuronButton
                        size="xs"
                        variant={copied ? 'primary' : 'secondary'}
                        leadingIcon={copied ? <Check size={12} /> : <Copy size={12} />}
                        onClick={handleCopy}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </NeuronButton>
                    </div>
                  </div>

                  <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Label:</span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{keyLabel}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Expiration:</span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{expiration === '30d' ? '30 Days' : expiration === '90d' ? '90 Days' : expiration === '1y' ? '1 Year' : 'No Expiry'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>Active Scopes:</span>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                        {[scopes.read && 'Read', scopes.write && 'Write', scopes.admin && 'Admin'].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <NeuronInput
                    label="Key Label"
                    placeholder="e.g. Production Webhook Sync"
                    value={keyLabel}
                    onChange={e => setKeyLabel(e.target.value)}
                    leadingIcon={<Key size={14} />}
                    helperText="A descriptive name to distinguish this credential in audit logs"
                    required
                  />

                  <NeuronSelect
                    label="Key Expiration Period"
                    value={expiration}
                    onChange={v => setExpiration(v as string)}
                    options={[
                      { value: '30d', label: '30 Days', description: 'Best for transient dev scripts & QA testing' },
                      { value: '90d', label: '90 Days (Recommended)', description: 'Standard enterprise security rotation window' },
                      { value: '1y', label: '1 Year', description: 'Long-running CI/CD server workers' },
                      { value: 'never', label: 'No Expiration', description: 'Permanent machine daemon (Requires SecOps Approval)' },
                    ]}
                  />

                  <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Granular Permission Scopes
                    </label>
                    <NeuronCheckbox
                      label="Read Access (Telemetry & Metrics)"
                      description="Query cluster metrics, trace logs, and audit records"
                      checked={scopes.read}
                      onChange={c => setScopes({ ...scopes, read: c })}
                      variant="brand"
                    />
                    <NeuronCheckbox
                      label="Write Access (Deployment Pipelines)"
                      description="Deploy releases and update runtime environment variables"
                      checked={scopes.write}
                      onChange={c => setScopes({ ...scopes, write: c })}
                      variant="brand"
                    />
                    <NeuronCheckbox
                      label="Admin Provisioning (IAM & Billing)"
                      description="Create or revoke service accounts and modify quotas"
                      checked={scopes.admin}
                      onChange={c => setScopes({ ...scopes, admin: c })}
                      variant="brand"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>ESC to dismiss</span>
              <div style={{ display: 'flex', gap: 10 }}>
                <NeuronButton size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
                  {generatedKey ? 'Close' : 'Cancel'}
                </NeuronButton>
                {generatedKey ? (
                  <NeuronButton size="sm" variant="primary" onClick={() => { setModalOpen(false); setGeneratedKey(null); }}>
                    Done
                  </NeuronButton>
                ) : (
                  <NeuronButton size="sm" variant="primary" onClick={handleGenerate} leadingIcon={<Sparkles size={14} />}>
                    Generate Key
                  </NeuronButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Render Live Preview
// ─────────────────────────────────────────────────────────────────────────────

export function renderLivePreview(variantId: FormVariantId) {
  switch (variantId) {
    case 'stepper-wizard': return <StepperWizardForm />;
    case 'split-checkout': return <SplitCheckoutForm />;
    case 'inline-validation': return <InlineValidationForm />;
    case 'dynamic-repeater': return <DynamicRepeaterForm />;
    case 'slideover-drawer': return <SlideoverDrawerForm />;
    case 'multi-column-settings': return <MultiColumnSettingsForm />;
    case 'survey-builder': return <SurveyBuilderForm />;
    case 'modal-dialog-form': return <ModalDialogForm />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function FormPatternView({ setActiveTab }: FormPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [selectedVariant, setSelectedVariant] = useState<FormVariantId>('stepper-wizard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx' | 'css'>('preview');
  const [viewportWidth, setViewportWidth] = useState<'desktop' | 'laptop'>('desktop');
  const [previewTheme, setPreviewTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [copiedCodeTab, setCopiedCodeTab] = useState(false);

  const currentMeta = useMemo(
    () => FORM_VARIANTS.find(v => v.id === selectedVariant) || FORM_VARIANTS[0],
    [selectedVariant],
  );

  const handleOpenRealAppNewTab = (variantId: FormVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-form-${variantId}`;
    window.open(url, '_blank');
  };

  const handleOpenModal = (variantId: FormVariantId) => {
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
    return `/* ── Neudela Form Pattern Architecture Tokens ── */
:root {
  --form-field-gap: var(--space-4, 16px);
  --form-label-font-size: var(--fs-text-xs, 12.5px);
  --form-label-weight: 600;
  --form-input-height: 40px;
  --form-input-radius: var(--radius-md, 8px);
  --form-input-border: var(--color-border);
  --form-input-bg: var(--color-bg-canvas);
  --form-input-focus-ring: 0 0 0 3px rgba(223, 126, 48, 0.2);
  --form-validation-success: #10b981;
  --form-validation-error: #ef4444;
  --form-validation-warning: #f59e0b;
  --form-stepper-size: 28px;
  --form-sticky-footer-height: 64px;
  --form-transition-timing: cubic-bezier(0.16, 1, 0.3, 1);
}`;
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeTab(true);
    setTimeout(() => setCopiedCodeTab(false), 2000);
  };

  const CODE_SNIPPETS: Record<FormVariantId, string> = {
    'stepper-wizard': `// Multi-Step Onboarding Wizard
// Composed directly from Neudela component primitives
import { useState } from 'react';
import {
  NeuronStepper,
  NeuronInput,
  NeuronSelect,
  NeuronCheckbox,
  NeuronAlert,
  NeuronBadge,
  NeuronButton,
} from 'neudela';
import { Building2, Server, Users, Rocket, Mail, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import 'neudela/style.css';

export function StepperWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: 'Acme Technologies',
    slug: 'acme-technologies',
    industry: 'saas',
    cloud: 'aws',
    region: 'ap-southeast-3',
    adminEmail: 'iqbal@acme.corp',
    agreed: false,
  });

  const steps = [
    { id: 1, label: 'Organization', description: 'Workspace identity', icon: <Building2 size={16} /> },
    { id: 2, label: 'Infrastructure', description: 'Cloud & topology', icon: <Server size={16} /> },
    { id: 3, label: 'Team Access', description: 'Roles & security', icon: <Users size={16} /> },
    { id: 4, label: 'Review', description: 'Launch check', icon: <Rocket size={16} /> },
  ];

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', background: 'var(--color-bg-surface)', padding: 32, borderRadius: 16, border: '1px solid var(--color-border)' }}>
      {/* 1. Neudela Stepper Component */}
      <NeuronStepper
        steps={steps}
        activeStep={currentStep - 1}
        variant="default"
        size="md"
        labelPlacement="bottom"
        clickable={true}
        onStepClick={(idx) => { if (idx < currentStep - 1) setCurrentStep(idx + 1); }}
      />

      {/* 2. Step Form Fields using Neudela Primitives */}
      {currentStep === 1 && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <NeuronInput
            label="Organization Name"
            value={formData.orgName}
            onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
            leadingIcon={<Building2 size={16} />}
            required
          />
          <NeuronInput
            label="Workspace Domain Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            leadingText="https://"
            trailingText=".neudela.app"
          />
          <NeuronSelect
            label="Industry Domain"
            options={[
              { value: 'fintech', label: 'Fintech & Digital Banking' },
              { value: 'saas', label: 'B2B Enterprise SaaS' },
            ]}
            value={formData.industry}
            onChange={(val) => setFormData({ ...formData, industry: val as string })}
          />
        </div>
      )}

      {/* 3. Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, borderTop: '1px solid var(--color-border)', paddingTop: 16 }}>
        <NeuronButton variant="secondary" disabled={currentStep === 1} onClick={() => setCurrentStep(c => c - 1)}>
          Back
        </NeuronButton>
        <NeuronButton variant="primary" onClick={() => setCurrentStep(c => c + 1)}>
          {currentStep === 4 ? 'Launch Workspace' : 'Continue'}
        </NeuronButton>
      </div>
    </div>
  );
}`,
    'split-checkout': `import { useState } from 'react';
import {
  NeuronInput,
  NeuronSelect,
  NeuronButton,
  NeuronBadge,
  NeuronAlert,
} from '@neudela/core';
import { User, Building, CreditCard, Lock, Tag, ArrowRight } from 'lucide-react';

export function SplitCheckout() {
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [courier, setCourier] = useState('express');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.85fr', gap: 24 }}>
      {/* Shipping & Payment Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <NeuronInput label="First Name" defaultValue="Alex" leadingIcon={<User size={14} />} required />
        <NeuronInput label="Street Address" defaultValue="Jl. Sudirman 28" leadingIcon={<Building size={14} />} required />
        <NeuronSelect
          label="Courier Service"
          value={courier}
          onChange={val => setCourier(val as string)}
          options={[
            { value: 'instant', label: 'Instant Priority (1-2 Hours)', description: 'Rp 45.000' },
            { value: 'express', label: 'Next Day Express Courier', description: 'Rp 25.000' },
          ]}
        />
        <NeuronInput label="Card Number" defaultValue="•••• 4242" leadingIcon={<CreditCard size={14} />} required />
      </div>

      {/* Sticky Order Breakdown */}
      <aside style={{ position: 'sticky', top: 20 }}>
        <h4>Order Summary</h4>
        <NeuronInput
          placeholder="Promo code (NEUDELA)"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          leadingIcon={<Tag size={13} />}
        />
        {discountApplied && <NeuronAlert variant="success">Voucher NEUDELA Applied!</NeuronAlert>}
        <NeuronButton variant="primary" size="lg" trailingIcon={<ArrowRight size={15} />}>
          Authorize Payment
        </NeuronButton>
      </aside>
    </div>
  );
}`,
    'inline-validation': `import { useState } from 'react';
import {
  NeuronInput,
  NeuronProgress,
  NeuronButton,
  NeuronBadge,
  NeuronAlert,
} from '@neudela/core';
import { User, Lock, Check, Eye, EyeOff } from 'lucide-react';

export function ValidatedForm() {
  const [username, setUsername] = useState('alexchen');
  const [password, setPassword] = useState('Neudela#2026');
  const [showPass, setShowPass] = useState(false);

  const strengthCount = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password)].filter(Boolean).length;

  return (
    <div style={{ maxWidth: 460 }}>
      <NeuronInput
        label="Handle"
        value={username}
        onChange={e => setUsername(e.target.value)}
        leadingIcon={<User size={14} />}
        trailingIcon={<Check size={14} color="#df7e30" />}
        state="success"
        helperText="✓ Handle is available"
      />

      <NeuronInput
        type={showPass ? 'text' : 'password'}
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        leadingIcon={<Lock size={14} />}
        trailingIcon={
          <button type="button" onClick={() => setShowPass(!showPass)}>
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        }
      />
      <NeuronProgress value={strengthCount * 33.3} variant="brand" size="sm" />

      <NeuronButton variant="primary" disabled={strengthCount < 2}>
        Save Credentials
      </NeuronButton>
    </div>
  );
}`,
    'dynamic-repeater': `import { useState } from 'react';
import {
  NeuronInput,
  NeuronSelect,
  NeuronButton,
  NeuronBadge,
} from '@neudela/core';
import { Plus, Trash2, Send } from 'lucide-react';

export function DynamicRepeater() {
  const [items, setItems] = useState([{ id: 1, desc: 'Consulting', qty: 10, rate: 150 }]);

  return (
    <div>
      <NeuronButton size="sm" variant="primary" leadingIcon={<Plus size={14} />}>
        Add Line Item
      </NeuronButton>

      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: 10 }}>
          <NeuronInput value={item.desc} placeholder="Item..." />
          <NeuronInput type="number" leadingText="Qty" value={item.qty.toString()} />
          <NeuronInput type="number" leadingText="$" value={item.rate.toString()} />
          <NeuronButton size="xs" variant="text" style={{ color: '#ef4444' }}><Trash2 size={14} /></NeuronButton>
        </div>
      ))}
      <NeuronButton size="sm" variant="primary" leadingIcon={<Send size={14} />}>
        Issue Invoice
      </NeuronButton>
    </div>
  );
}`,
    'slideover-drawer': `import { useState } from 'react';
import {
  NeuronAvatar,
  NeuronBadge,
  NeuronButton,
  NeuronInput,
  NeuronSelect,
  NeuronToggle,
  NeuronCheckbox,
} from '@neudela/core';
import { User, Mail } from 'lucide-react';

export function DrawerForm() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('maintainer');

  return (
    <div>
      <NeuronButton variant="primary" onClick={() => setOpen(true)}>Edit Member</NeuronButton>
      {open && (
        <aside style={{ width: 370 }}>
          <NeuronAvatar name="Iqbal Dzulfikar" size="lg" status="online" />
          <NeuronInput label="Full Name" defaultValue="Iqbal Dzulfikar" leadingIcon={<User size={14} />} />
          <NeuronInput label="Email" defaultValue="iqbal@neudela.org" leadingIcon={<Mail size={14} />} />
          <NeuronSelect label="Role" value={role} onChange={v => setRole(v as string)} options={[...]} />
          <NeuronToggle label="Active Session" defaultChecked />
          <NeuronCheckbox label="Enforce 2FA" defaultChecked />
          <NeuronButton variant="primary" onClick={() => setOpen(false)}>Save Changes</NeuronButton>
        </aside>
      )}
    </div>
  );
}`,
    'multi-column-settings': `import { useState } from 'react';
import {
  NeuronInput,
  NeuronToggle,
  NeuronButton,
  NeuronAlert,
} from '@neudela/core';
import { Building2 } from 'lucide-react';

export function CategorizedSettings() {
  const [dangerConfirm, setDangerConfirm] = useState('');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 24 }}>
      <div>
        <h4>Workspace Identity</h4>
        <p>Tenant organization credentials</p>
      </div>
      <div>
        <NeuronInput label="Org Name" defaultValue="Acme Corp" leadingIcon={<Building2 size={14} />} />
        <NeuronInput label="Vanity URL" defaultValue="acme-corp" leadingText="neudela.app/" />
        <NeuronToggle label="Security Alerts" defaultChecked />
        <NeuronAlert variant="error" title="Danger Zone">Permanent workspace purge</NeuronAlert>
        <NeuronInput placeholder="acme-corp" value={dangerConfirm} onChange={e => setDangerConfirm(e.target.value)} />
        <NeuronButton variant="danger" disabled={dangerConfirm !== 'acme-corp'}>Delete Permanently</NeuronButton>
      </div>
    </div>
  );
}`,
    'survey-builder': `import { useState } from 'react';
import {
  NeuronRating,
  NeuronTextArea,
  NeuronButton,
  NeuronBadge,
  NeuronAlert,
} from '@neudela/core';

export function SurveyFeedback() {
  const [stars, setStars] = useState(5);

  return (
    <div style={{ maxWidth: 540 }}>
      <h4>How would you rate Neudela 2.0?</h4>
      <NeuronRating
        value={stars}
        onChange={setStars}
        max={5}
        size="lg"
        variant="brand"
        showLabel
      />
      <NeuronTextArea label="Suggestions" placeholder="What could we improve?" rows={3} />
      <NeuronButton variant="primary">Submit Satisfaction Survey</NeuronButton>
    </div>
  );
}`,
    'modal-dialog-form': `import { useState } from 'react';
import {
  NeuronInput,
  NeuronSelect,
  NeuronCheckbox,
  NeuronButton,
  NeuronAlert,
} from '@neudela/core';
import { Key } from 'lucide-react';

export function ApiKeyDialog() {
  const [expiry, setExpiry] = useState('90d');

  return (
    <div style={{ width: 480, padding: 24 }}>
      <h4>Generate Secret API Key</h4>
      <NeuronInput label="Key Label" defaultValue="Webhook Sync" leadingIcon={<Key size={14} />} required />
      <NeuronSelect label="Expiration" value={expiry} onChange={v => setExpiry(v as string)} options={[...]} />
      <NeuronCheckbox label="Read Access" defaultChecked />
      <NeuronCheckbox label="Write Access" defaultChecked />
      <NeuronButton variant="primary">Generate Key</NeuronButton>
    </div>
  );
}`,
  };

  return (
    <div className="pattern-form-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Pola Formulir & Alur Kerja (Forms & Multi-Step Workflows)' : 'Forms & Multi-Step Workflows Pattern'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur formulir komposit tingkat enterprise Neudela siap pakai. Klik "Preview di Modal" untuk menguji interaktivitas validasi dan perhitungan dinamis secara langsung, atau klik "Tab Baru" untuk menjalankan formulir di tab baru sebagai aplikasi penuh.'
            : 'Turnkey enterprise form architectures for Neudela Design System. Click "Preview in Modal" to test drive live validations and calculations inside a responsive dialog, or click "New Tab" to run the form in a dedicated browser window.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <FileText size={14} color="#df7e30" />
            <span>{isId ? 'Total Varian:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>8 {isId ? 'Varian Teruji' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <ShieldCheck size={14} color="#df7e30" />
            <span>{isId ? 'Dukungan Modal & Tab Baru:' : 'Modal & New Tab:'}</span>
            <strong>Full Real App Mode</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Sliders size={14} color="#df7e30" />
            <span>{isId ? 'Komponen Terpadu:' : 'Composite Atoms:'}</span>
            <strong>Neuron Forms & Inputs</strong>
          </div>
        </div>
      </div>

      {/* ── Section 1: Overview Variant Catalog ── */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Katalog Varian Arsitektur Formulir' : 'Form Architecture Catalog'}
            </h2>
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Pilih salah satu dari 8 varian untuk menguji formulir dan menyalin kodenya.' : 'Select any of the 8 architectures to test live fields and copy production TSX.'}
            </span>
          </div>
          <NeuronBadge size="sm" variant="brand">8 Available</NeuronBadge>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {FORM_VARIANTS.map(variant => {
            return (
              <div
                key={variant.id}
                onClick={() => handleOpenModal(variant.id)}
                className="header-pattern-card sidebar-pattern-card"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  padding: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent Top Border with Gradient */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px',
                  background: `linear-gradient(90deg, ${variant.accentColor} 0%, ${variant.accentColor}30 100%)`,
                }} />

                {/* Visual Architecture Silhouette */}
                <div style={{ marginBottom: 'var(--space-3)' }}>
                  <CardMiniSilhouette id={variant.id} accentColor={variant.accentColor} />
                </div>

                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
                    {isId ? variant.nameId : variant.nameEn}
                  </h3>
                  <span
                    style={{
                      fontSize: '10.5px',
                      padding: '2px 7px',
                      borderRadius: '8px',
                      background: `${variant.accentColor}18`,
                      color: variant.accentColor,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {variant.badge}
                  </span>
                </div>

                {/* Tagline */}
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 var(--space-3) 0', flex: 1 }}>
                  {isId ? variant.taglineId : variant.taglineEn}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-4)' }}>
                  {variant.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '10.5px',
                        background: 'var(--color-bg-canvas)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dual Action Buttons */}
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
                      transition: 'all 0.15s ease',
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

      {/* ── Section 2: Composite Component Anatomy & Form Ergonomics ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-10)',
        }}
      >
        {/* Anatomy Card */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Layers size={18} color="var(--color-primary)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Anatomi Komponen Formulir Neudela' : 'Form Composite Component Anatomy'}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 var(--space-4) 0' }}>
            {isId
              ? 'Pola formulir Neudela mengintegrasikan atom-atom input, tombol aksi, dan indikator status menjadi alur transaksi terpadu.'
              : 'Neudela form patterns combine input primitives, action triggers, and progress trackers into cohesive transactional workflows.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'NeuronInput & Select', role: isId ? 'Kontrol input data teks & opsi terstandarisasi' : 'Standardized text & dropdown data inputs' },
              { name: 'NeuronButton', role: isId ? 'Aksi submit primer, kembali sekunder, dan hapus' : 'Primary submit, secondary back, and delete actions' },
              { name: 'NeuronBadge', role: isId ? 'Penanda status validasi dan tag kategori' : 'Validation status indicators & category chips' },
              { name: 'NeuronProgress', role: isId ? 'Visualisasi persentase kekuatan password & progres wizard' : 'Password strength & wizard progress visualization' },
              { name: 'NeuronTooltip', role: isId ? 'Bantuan mikro (microcopy) dan penjelasan aturan' : 'Contextual microcopy & rule helper explanation' },
            ].map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', fontSize: 12 }}>
                <code style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{c.name}</code>
                <span style={{ color: 'var(--color-text-secondary)' }}>{c.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Table */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sliders size={18} color="#df7e30" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Spesifikasi Ergonomi & Aksesibilitas Formulir' : 'Form Ergonomics & Spatial Specifications'}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 var(--space-4) 0' }}>
            {isId
              ? 'Standar tata letak dan ritme vertikal untuk meminimalkan beban kognitif pengguna saat mengisi data.'
              : 'Layout benchmarks and vertical spatial rhythm ensuring minimum cognitive load during data entry.'}
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Parameter</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Nilai Token</th>
                <th style={{ padding: '6px 8px', fontWeight: 600 }}>Tujuan Desain</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'Touch Target Height', val: '40px - 48px', intent: isId ? 'Standar WCAG 2.1 AA area ketuk' : 'WCAG 2.1 AA tap target compliance' },
                { prop: 'Vertical Field Gap', val: '16px (--space-4)', intent: isId ? 'Jarak pemisah antar-bidang yang konsisten' : 'Consistent breathing room between fields' },
                { prop: 'Focus Ring Glow', val: '0 0 0 3px (#df7e3033)', intent: isId ? 'Fokus visual keyboard yang jelas' : 'High-contrast keyboard focus outline' },
                { prop: 'Error Text Microcopy', val: '11.5px (#ef4444)', intent: isId ? 'Umpan balik korektif tepat di bawah input' : 'Corrective feedback anchored to field' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none' }}>
                  <td style={{ padding: '8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '8px', color: 'var(--color-primary)', fontFamily: 'monospace' }}>{row.val}</td>
                  <td style={{ padding: '8px', color: 'var(--color-text-secondary)' }}>{row.intent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 3: Do's and Don'ts ── */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--color-text-primary)' }}>
          {isId ? 'Panduan Implementasi Formulir: Do & Don\'t' : 'Form Implementation Guidelines: Do\'s and Don\'ts'}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-4) 0' }}>
          {isId
            ? 'Prinsip desain untuk memastikan formulir transaksi Anda efisien, mudah divalidasi, dan ramah pengguna.'
            : 'Core design rules to ensure your transaction forms remain efficient, error-tolerant, and user-friendly.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 12, padding: 14, borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <Check size={16} />
              <span>DO: {isId ? 'Gunakan Alur Satu Kolom Vertikal' : 'Prioritize Single-Column Vertical Layouts'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Pertahankan alur mata satu arah ke bawah. Formulir satu kolom diselesaikan 30% lebih cepat daripada susunan zig-zag multi-kolom.'
                : 'Maintain a single downward eye tracking path. Single-column forms are completed 30% faster than multi-column zigzag layouts.'}
            </p>
          </div>

          <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 12, padding: 14, borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <span>✕</span>
              <span>DON&apos;T: {isId ? 'Jangan Nonaktifkan Tombol Submit Tanpa Penjelasan' : 'Never Disable Submit Buttons Without Explanation'}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Hindari tombol submit abu-abu mati yang membingungkan pengguna. Biarkan tombol dapat diklik dan tunjukkan validasi field yang belum lengkap.'
                : 'Avoid dead disabled submit buttons that confuse users. Keep the button active and highlight unfilled required fields with helpful feedback.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'pat-header', label: isId ? 'Navigasi Header' : 'Header Navigation' }}
        next={{ id: 'pat-layouts', label: isId ? 'Tata Letak Dashboard' : 'Dashboard Layouts' }}
        setActiveTab={setActiveTab}
      />

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE MODAL POP-UP FOR FORM PREVIEW
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
                      whiteSpace: 'nowrap',
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
                      whiteSpace: 'nowrap',
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
                      whiteSpace: 'nowrap',
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
                        {isId ? 'Ketik dan berinteraksilah langsung dengan formulir!' : 'Type and interact directly with the form!'}
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
                      padding: '24px',
                      overflowY: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      data-theme={previewTheme === 'dark' ? 'dark' : previewTheme === 'light' ? 'light' : undefined}
                      className={previewTheme === 'dark' ? 'dark-theme' : previewTheme === 'light' ? 'light-theme' : ''}
                      style={{
                        width: viewportWidth === 'laptop' ? '920px' : '100%',
                        maxWidth: '1080px',
                        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {renderLivePreview(selectedVariant)}
                    </div>
                  </div>
                </div>
              )}

              {/* Code TSX Tab */}
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

              {/* CSS Tokens Tab */}
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
