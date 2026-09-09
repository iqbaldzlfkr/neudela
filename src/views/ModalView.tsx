import React, { useState } from 'react';
import NeuronModal, { ModalSize, ModalVariant } from '../components/NeuronModal';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Info,
  Trash2,
  LogOut,
  FolderOpen,
  Share2,
  Settings,
  Bell,
  Upload,
  Save,
  Edit3,
  X,
  Check,
  FileText,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Layers,
  PanelRight,
} from 'lucide-react';

interface ModalViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────
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
        {isDo ? 'Do' : "Don't"}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Anatomy Label
// ─────────────────────────────────────────────
function AnatomyLabel({ number, label, desc }: { number: number; label: string; desc: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <span
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: 'var(--brand-600)',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '1px',
        }}
      >
        {number}
      </span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', marginBottom: '2px' }}>
          {label}
        </div>
        <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// Inline static modal preview for docs
// ─────────────────────────────────────────────
function StaticModalPreview({
  variant = 'default',
  size = 'md',
  title,
  description,
  icon,
  children,
  footer,
  showCloseButton = true,
}: {
  variant?: ModalVariant;
  size?: ModalSize;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}) {
  const maxW = size === 'sm' ? '320px' : size === 'lg' ? '448px' : '384px';
  return (
    <div
      className={`neuron-modal neuron-modal--${size} neuron-modal--${variant}`}
      style={{ position: 'relative', animation: 'none', width: '100%', maxWidth: maxW, margin: '0 auto' }}
    >
      {(icon || showCloseButton) && (
        <div className="neuron-modal__top-bar">
          {icon ? (
            <div className={`neuron-modal__icon neuron-modal__icon--${variant}`}>
              {icon}
            </div>
          ) : (
            <div />
          )}
          {showCloseButton && (
            <button
              type="button"
              className="neuron-modal__close"
              style={{ pointerEvents: 'none' }}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}

      {(title || description) && (
        <div className="neuron-modal__content">
          {title && <h2 className="neuron-modal__title">{title}</h2>}
          {description && <p className="neuron-modal__description">{description}</p>}
        </div>
      )}

      {children && <div className="neuron-modal__body">{children}</div>}
      {footer && <div className="neuron-modal__footer">{footer}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main View
// ─────────────────────────────────────────────
export default function ModalView({ setActiveTab }: ModalViewProps) {
  const { language, t } = useLanguage();
  const isId = language === 'id';
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');

  // Live modal states
  const [openModal, setOpenModal] = useState<string | null>(null);

  const [selectedVariantFilter, setSelectedVariantFilter] = useState<'all' | ModalVariant>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<'all' | ModalSize>('all');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<'all' | 'variant' | 'flow'>('all');

  const variantIconMap: Record<ModalVariant, React.ReactNode> = {
    default: <Settings size={20} />,
    danger: <Trash2 size={20} />,
    warning: <AlertTriangle size={20} />,
    success: <CheckCircle2 size={20} strokeWidth={2.2} />,
    info: <Info size={20} />,
  };

  const variantLabelMap: Record<ModalVariant, string> = {
    default: isId ? 'Default' : 'Default',
    danger: isId ? 'Bahaya' : 'Danger',
    warning: isId ? 'Peringatan' : 'Warning',
    success: isId ? 'Sukses' : 'Success',
    info: isId ? 'Informasi' : 'Info',
  };


  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">Components</span>
            <h1 className="page-title">{isId ? 'Modal' : 'Modal'}</h1>
            <p className="page-subtitle">
              {isId
                ? 'Modal adalah layer overlay yang memerlukan perhatian pengguna sebelum melanjutkan. Digunakan untuk konfirmasi, form singkat, atau pesan penting.'
                : 'Modals are overlay panels that require user attention before proceeding. Use them for confirmations, short forms, or critical messages.'}
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setTab('guideline')}
          >
            {isId ? 'Panduan' : 'Guideline'}
          </button>
          <button
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">

          {/* ── Overview ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Ikhtisar' : 'Overview'}</h2>
            <p className="section-description">
              {isId
                ? 'Modal (dialog overlay) adalah komponen antarmuka yang tampil di atas halaman untuk meminta konfirmasi, menampilkan status penting, atau memandu alur kerja terfokus dengan memblokir interaksi latar belakang.'
                : 'A modal (overlay dialog) is an interface element appearing above the page to request confirmation, display critical status, or guide a focused workflow while blocking background interaction.'}
            </p>

            {/* Quick Capability Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-3)',
                marginTop: 'var(--space-5)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--emerald-100)',
                    color: 'var(--emerald-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 0 4px var(--emerald-50)',
                  }}
                >
                  <CheckCircle2 size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Ikon Bulat & Halo Shadow' : 'Circular Halo Icons'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                    {isId ? 'Indikator status bulat dengan ringer shadow halo 6px untuk kejelasan visual.' : 'Circular status badge with 6px halo ringer shadow for visual status clarity.'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <X size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Clean Close Button' : 'Clean Close Button'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                    {isId ? 'Tombol tutup ikon silang minimalis di sudut kanan atas tanpa bingkai kotak.' : 'Minimalist icon-only cross close button without box borders.'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--brand-100)',
                    color: 'var(--brand-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Settings size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--fs-text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Tombol Brand Neudela' : 'Neudela Brand Actions'}
                  </div>
                  <div style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                    {isId ? 'Tombol primer solid warna brand dan tombol sekunder berdampingan seimbang.' : 'Balanced brand primary button and secondary button filling the modal width.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Comparison Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: 'var(--space-5)',
              }}
            >
              {/* Card 1: Positive / Published */}
              <div className="guideline-overview-item">
                <div
                  className="guideline-overview-preview"
                  style={{
                    padding: 'var(--space-8) var(--space-6)',
                    background: 'var(--color-bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '320px',
                  }}
                >
                  <StaticModalPreview
                    variant="success"
                    title="Blog post published"
                    description="This blog post has been published. Team members will be able to edit this post and republish changes."
                    icon={<CheckCircle2 size={20} strokeWidth={2.2} />}
                    footer={
                      <>
                        <NeuronButton variant="secondary" size="md">{isId ? 'Batal' : 'Cancel'}</NeuronButton>
                        <NeuronButton variant="primary" size="md">{isId ? 'Konfirmasi' : 'Confirm'}</NeuronButton>
                      </>
                    }
                  />
                </div>
                <div className="guideline-overview-caption">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--fs-text-sm)' }}>
                      {isId ? 'Konfirmasi Positif / Sukses' : 'Positive / Success Confirmation'}
                    </span>
                    <NeuronBadge variant="success" size="xs">Success</NeuronBadge>
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Desain dialog card sesuai Figma: icon bulat ber-halo, close button bersih, dan tombol konfirmasi brand.'
                      : 'Card dialog design per Figma spec: circular halo icon, clean close button, and brand confirm action.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Destructive / Danger */}
              <div className="guideline-overview-item">
                <div
                  className="guideline-overview-preview"
                  style={{
                    padding: 'var(--space-8) var(--space-6)',
                    background: 'var(--color-bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '320px',
                  }}
                >
                  <StaticModalPreview
                    variant="danger"
                    title={isId ? 'Hapus Akun' : 'Delete Account'}
                    description={isId ? 'Tindakan ini tidak dapat dibatalkan dan semua data akun akan dihapus.' : 'This action cannot be undone and all account data will be removed.'}
                    icon={<Trash2 size={20} />}
                    footer={
                      <>
                        <NeuronButton variant="secondary" size="md">{isId ? 'Batal' : 'Cancel'}</NeuronButton>
                        <NeuronButton variant="destructive" size="md">{isId ? 'Hapus' : 'Delete'}</NeuronButton>
                      </>
                    }
                  />
                </div>
                <div className="guideline-overview-caption">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--fs-text-sm)' }}>
                      {isId ? 'Konfirmasi Kritis / Destruktif' : 'Destructive / Critical Confirmation'}
                    </span>
                    <NeuronBadge variant="danger" size="xs">Danger</NeuronBadge>
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Dialog untuk tindakan permanen dengan ringer shadow merah dan tombol aksi warna destructive.'
                      : 'Dialog for permanent actions with red ringer shadow and destructive-colored action button.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Anatomi' : 'Anatomy'}</h2>
            <p className="section-description">
              {isId
                ? 'Modal terdiri dari beberapa area fungsional: backdrop, panel dialog, header, body konten, dan footer aksi.'
                : 'A modal is composed of several functional areas: backdrop overlay, dialog panel, header, content body, and action footer.'}
            </p>
            <div className="modal-anatomy-scene" style={{ marginTop: 'var(--space-6)' }}>
              <div className="modal-anatomy-diagram">
                {/* Annotated Card Dialog Frame */}
                <div
                  style={{
                    position: 'relative',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '20px',
                    width: '100%',
                    maxWidth: '384px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {/* Top bar with Marker 1 and Marker 2 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                    {/* 1. Circular Icon with halo */}
                    <div style={{ position: 'relative', display: 'inline-flex' }}>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '-8px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand-600)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        1
                      </span>
                      <div className="neuron-modal__icon neuron-modal__icon--success">
                        <CheckCircle2 size={20} strokeWidth={2.2} />
                      </div>
                    </div>

                    {/* 2. Close button */}
                    <div style={{ position: 'relative', display: 'inline-flex' }}>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand-600)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        2
                      </span>
                      <button
                        type="button"
                        className="neuron-modal__close"
                        style={{ pointerEvents: 'none' }}
                        aria-label="Close dialog"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Content area with Marker 3 and Marker 4 */}
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    {/* 3. Title */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand-600)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        3
                      </span>
                      <h2 className="neuron-modal__title" style={{ margin: 0 }}>
                        Blog post published
                      </h2>
                    </div>

                    {/* 4. Description */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand-600)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        4
                      </span>
                      <p className="neuron-modal__description" style={{ margin: 0 }}>
                        This blog post has been published. Team members will be able to edit this post and republish changes.
                      </p>
                    </div>
                  </div>

                  {/* Footer with Marker 5 and Marker 6 */}
                  <div className="neuron-modal__footer">
                    {/* 5. Cancel Button */}
                    <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '-6px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand-600)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        5
                      </span>
                      <NeuronButton variant="secondary" size="md" style={{ width: '100%' }}>
                        Cancel
                      </NeuronButton>
                    </div>

                    {/* 6. Confirm Button */}
                    <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-6px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--brand-600)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        6
                      </span>
                      <NeuronButton variant="primary" size="md" style={{ width: '100%' }}>
                        Confirm
                      </NeuronButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-anatomy-labels">
                <AnatomyLabel number={1} label={isId ? 'Ikon Bulat + Ringer Shadow' : 'Circular Icon + Ring Shadow'} desc={isId ? 'Indikator visual bulat dengan ringer shadow halo konsentris 6px.' : 'Circular visual indicator with 6px concentric halo ringer shadow.'} />
                <AnatomyLabel number={2} label={isId ? 'Tombol Tutup (Hanya Ikon Close)' : 'Close Button (Icon Only)'} desc={isId ? 'Ikon silang minimalis di sudut kanan atas tanpa bingkai kotak.' : 'Minimalist cross icon button in top-right without border box.'} />
                <AnatomyLabel number={3} label={isId ? 'Judul Dialog' : 'Dialog Title'} desc={isId ? 'Heading tebal mengomunikasikan aksi atau status secara jelas.' : 'Bold heading clearly communicating the action or status.'} />
                <AnatomyLabel number={4} label={isId ? 'Deskripsi' : 'Description'} desc={isId ? 'Teks penjelasan rinci mengenai konteks atau konsekuensi.' : 'Supporting text explaining the context or consequences.'} />
                <AnatomyLabel number={5} label={isId ? 'Tombol Batal' : 'Cancel Button'} desc={isId ? 'Aksi sekunder untuk menutup atau membatalkan dialog.' : 'Secondary action to dismiss or cancel the dialog.'} />
                <AnatomyLabel number={6} label={isId ? 'Tombol Konfirmasi (Warna Brand)' : 'Confirm Button (Brand Color)'} desc={isId ? 'Aksi utama solid sesuai dengan warna brand Neudela.' : 'Solid primary action styled in Neudela brand color.'} />
              </div>
            </div>
          </div>

          {/* ── Variants ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
              <div>
                <h2 className="section-title">{isId ? 'Varian' : 'Variants'}</h2>
                <p className="section-description" style={{ margin: 0 }}>
                  {isId
                    ? 'Modal hadir dalam 5 varian visual semantik yang mencerminkan tingkat urgensi, tujuan dialog, dan gaya aksi.'
                    : 'Modals come in 5 semantic visual variants reflecting urgency level, purpose, and action styling.'}
                </p>
              </div>

              {/* Interactive Variant Filter Tabs */}
              <div className="modal-variant-tabs">
                <button
                  type="button"
                  className={`modal-variant-tab-btn ${selectedVariantFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedVariantFilter('all')}
                >
                  {isId ? 'Semua (5)' : 'All (5)'}
                </button>
                {(['default', 'danger', 'warning', 'success', 'info'] as ModalVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`modal-variant-tab-btn ${selectedVariantFilter === v ? 'active' : ''}`}
                    onClick={() => setSelectedVariantFilter(v)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {variantLabelMap[v]}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Variants */}
            <div className="modal-variants-grid">
              {[
                {
                  id: 'default' as ModalVariant,
                  nameId: 'Default (Standar)',
                  nameEn: 'Default (Standard)',
                  badgeVariant: 'neutral' as const,
                  badgeLabel: 'Default',
                  dialogTitleId: 'Pengaturan Akun',
                  dialogTitleEn: 'Account Settings',
                  dialogDescId: 'Perbarui informasi profil dan preferensi akun Anda di sini.',
                  dialogDescEn: 'Update your account preferences and profile settings here.',
                  cardDescId: 'Untuk interaksi umum, pengaturan preferensi, atau dialog konfirmasi standar tanpa urgensi bahaya.',
                  cardDescEn: 'For standard actions, preference settings, or neutral confirmation dialogs with no critical risks.',
                  haloToken: 'brand-50',
                  haloColor: 'var(--brand-500)',
                  actionType: isId ? 'Tombol Brand' : 'Primary Brand',
                  icon: <Settings size={20} />,
                  cancelLabelId: 'Batal',
                  cancelLabelEn: 'Cancel',
                  confirmLabelId: 'Simpan',
                  confirmLabelEn: 'Save',
                  confirmButtonVariant: 'primary' as const,
                },
                {
                  id: 'danger' as ModalVariant,
                  nameId: 'Danger (Destruktif)',
                  nameEn: 'Danger (Destructive)',
                  badgeVariant: 'danger' as const,
                  badgeLabel: 'Danger',
                  dialogTitleId: 'Hapus Proyek',
                  dialogTitleEn: 'Delete Project',
                  dialogDescId: 'Tindakan ini akan menghapus proyek secara permanen dan tidak dapat dikembalikan.',
                  dialogDescEn: 'This will permanently delete the project and cannot be undone.',
                  cardDescId: 'Untuk operasi berbahaya, penghapusan permanen, atau aksi irreversibel yang memerlukan tombol merah.',
                  cardDescEn: 'For dangerous operations, permanent deletions, or irreversible actions requiring a red action button.',
                  haloToken: 'red-50',
                  haloColor: 'var(--red-500)',
                  actionType: isId ? 'Destructive (Merah)' : 'Destructive (Red)',
                  icon: <Trash2 size={20} />,
                  cancelLabelId: 'Batal',
                  cancelLabelEn: 'Cancel',
                  confirmLabelId: 'Ya, Hapus',
                  confirmLabelEn: 'Yes, Delete',
                  confirmButtonVariant: 'destructive' as const,
                },
                {
                  id: 'warning' as ModalVariant,
                  nameId: 'Warning (Peringatan)',
                  nameEn: 'Warning (Caution)',
                  badgeVariant: 'warning' as const,
                  badgeLabel: 'Warning',
                  dialogTitleId: 'Perubahan Belum Disimpan',
                  dialogTitleEn: 'Unsaved Changes',
                  dialogDescId: 'Meninggalkan halaman ini akan membatalkan seluruh perubahan yang belum disimpan.',
                  dialogDescEn: 'Leaving this page will discard all unsaved changes on this form.',
                  cardDescId: 'Untuk situasi hati-hati yang berpotensi menghilangkan data atau menghasilkan efek samping.',
                  cardDescEn: 'For cautionary situations with potential unsaved data loss or noticeable side effects.',
                  haloToken: 'amber-50',
                  haloColor: 'var(--amber-500)',
                  actionType: isId ? 'Tombol Brand' : 'Primary Brand',
                  icon: <AlertTriangle size={20} />,
                  cancelLabelId: 'Tetap di Sini',
                  cancelLabelEn: 'Stay Here',
                  confirmLabelId: 'Tinggalkan',
                  confirmLabelEn: 'Leave Anyway',
                  confirmButtonVariant: 'primary' as const,
                },
                {
                  id: 'success' as ModalVariant,
                  nameId: 'Success (Keberhasilan)',
                  nameEn: 'Success (Positive)',
                  badgeVariant: 'success' as const,
                  badgeLabel: 'Success',
                  dialogTitleId: 'Artikel Dipublikasikan',
                  dialogTitleEn: 'Blog Post Published',
                  dialogDescId: 'Artikel blog Anda telah berhasil dirilis dan kini dapat diakses oleh publik.',
                  dialogDescEn: 'This blog post has been published and is now live for all visitors.',
                  cardDescId: 'Untuk mengonfirmasi keberhasilan aksi penting, publikasi konten, atau pencapaian alur kerja.',
                  cardDescEn: 'To confirm successful execution of important actions, published content, or workflow milestones.',
                  haloToken: 'emerald-50',
                  haloColor: 'var(--emerald-500)',
                  actionType: isId ? 'Tombol Brand' : 'Primary Brand',
                  icon: <CheckCircle2 size={20} strokeWidth={2.2} />,
                  cancelLabelId: 'Tutup',
                  cancelLabelEn: 'Close',
                  confirmLabelId: 'Lihat Artikel',
                  confirmLabelEn: 'View Post',
                  confirmButtonVariant: 'primary' as const,
                },
                {
                  id: 'info' as ModalVariant,
                  nameId: 'Info (Informasi Penting)',
                  nameEn: 'Info (Informative)',
                  badgeVariant: 'info' as const,
                  badgeLabel: 'Info',
                  dialogTitleId: 'Pembaruan Kebijakan Privasi',
                  dialogTitleEn: 'Privacy Policy Update',
                  dialogDescId: 'Kebijakan privasi kami telah diperbarui untuk meningkatkan perlindungan data Anda.',
                  dialogDescEn: 'Our privacy policy has been updated to provide enhanced data protection.',
                  cardDescId: 'Untuk menyampaikan pengumuman sistem, ketentuan baru, atau panduan yang perlu diketahui pengguna.',
                  cardDescEn: 'To communicate important system announcements, updated terms, or helpful guidelines.',
                  haloToken: 'sky-50',
                  haloColor: 'var(--sky-500)',
                  actionType: isId ? 'Tombol Brand' : 'Primary Brand',
                  icon: <Info size={20} />,
                  cancelLabelId: 'Nanti Saja',
                  cancelLabelEn: 'Remind Later',
                  confirmLabelId: 'Saya Mengerti',
                  confirmLabelEn: 'I Understand',
                  confirmButtonVariant: 'primary' as const,
                },
              ]
                .filter((item) => selectedVariantFilter === 'all' || selectedVariantFilter === item.id)
                .map((item, index, arr) => (
                  <div
                    key={item.id}
                    className={`modal-variant-card ${
                      arr.length === 1
                        ? 'modal-variant-card--full'
                        : index === 4 && arr.length === 5
                        ? 'modal-variant-card--full'
                        : ''
                    }`}
                  >
                    {/* Header bar */}
                    <div className="modal-variant-card__info" style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <div className="modal-variant-card__header">
                        <span className="modal-variant-card__title">
                          {isId ? item.nameId : item.nameEn}
                        </span>
                        <NeuronBadge variant={item.badgeVariant} size="xs">
                          {item.badgeLabel}
                        </NeuronBadge>
                      </div>
                      <p className="modal-variant-card__desc">
                        {isId ? item.cardDescId : item.cardDescEn}
                      </p>
                    </div>

                    {/* Preview canvas */}
                    <div className="modal-variant-card__preview">
                      <StaticModalPreview
                        variant={item.id}
                        title={isId ? item.dialogTitleId : item.dialogTitleEn}
                        description={isId ? item.dialogDescId : item.dialogDescEn}
                        icon={item.icon}
                        footer={
                          <>
                            <NeuronButton variant="secondary" size="md">
                              {isId ? item.cancelLabelId : item.cancelLabelEn}
                            </NeuronButton>
                            <NeuronButton variant={item.confirmButtonVariant} size="md">
                              {isId ? item.confirmLabelId : item.confirmLabelEn}
                            </NeuronButton>
                          </>
                        }
                      />
                    </div>

                    {/* Footer metadata */}
                    <div className="modal-variant-card__info" style={{ paddingTop: 'var(--space-2)' }}>
                      <div className="modal-variant-card__meta">
                        <span className="modal-variant-card__meta-tag">
                          <span
                            className="modal-variant-card__meta-dot"
                            style={{ backgroundColor: item.haloColor }}
                          />
                          Halo Ring: <code>{item.haloToken}</code>
                        </span>
                        <span className="modal-variant-card__meta-tag">
                          {isId ? 'Aksi:' : 'Action:'} <strong style={{ color: item.confirmButtonVariant === 'destructive' ? 'var(--red-600)' : 'var(--brand-600)' }}>{item.actionType}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ── Size Guide ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
              <div>
                <h2 className="section-title">{isId ? 'Panduan Ukuran' : 'Size Guidelines'}</h2>
                <p className="section-description" style={{ margin: 0 }}>
                  {isId
                    ? 'Tiga skala dimensi dialog proporsional yang selaras dengan alert dialog modern (sm: 320px, md: 384px, lg: 448px).'
                    : 'Three proportional dialog dimension scales aligned with modern alert dialog specifications (sm: 320px, md: 384px, lg: 448px).'}
                </p>
              </div>

              {/* Interactive Size Filter Tabs */}
              <div className="modal-size-tabs">
                <button
                  type="button"
                  className={`modal-size-tab-btn ${selectedSizeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedSizeFilter('all')}
                >
                  {isId ? 'Semua Ukuran (3)' : 'All Sizes (3)'}
                </button>
                <button
                  type="button"
                  className={`modal-size-tab-btn ${selectedSizeFilter === 'sm' ? 'active' : ''}`}
                  onClick={() => setSelectedSizeFilter('sm')}
                >
                  Small · 320px
                </button>
                <button
                  type="button"
                  className={`modal-size-tab-btn ${selectedSizeFilter === 'md' ? 'active' : ''}`}
                  onClick={() => setSelectedSizeFilter('md')}
                >
                  Medium · 384px {isId ? '(Default)' : '(Default)'}
                </button>
                <button
                  type="button"
                  className={`modal-size-tab-btn ${selectedSizeFilter === 'lg' ? 'active' : ''}`}
                  onClick={() => setSelectedSizeFilter('lg')}
                >
                  Large · 448px
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="modal-size-cards-grid">
              {[
                {
                  size: 'sm' as ModalSize,
                  name: 'Small (sm)',
                  badgeWidth: 'max-width: 320px',
                  badgePadding: 'padding: 18px',
                  shadcnToken: 'max-w-xs',
                  descId: 'Untuk konfirmasi cepat satu kali klik, dialog hapus singkat, atau alert biner dengan teks ringkas.',
                  descEn: 'For quick single-click confirmations, concise delete prompts, or binary alerts with minimal text.',
                  variant: 'danger' as const,
                  titleId: 'Konfirmasi Hapus',
                  titleEn: 'Confirm Delete',
                  dialogDescId: 'Yakin ingin menghapus item ini? Tindakan ini permanen.',
                  dialogDescEn: 'Are you sure you want to delete this item? This action is permanent.',
                  icon: <Trash2 size={20} />,
                  cancelId: 'Batal',
                  cancelEn: 'Cancel',
                  confirmId: 'Hapus',
                  confirmEn: 'Delete',
                  confirmVariant: 'destructive' as const,
                  bestForId: 'Konfirmasi cepat & alert ringkas',
                  bestForEn: 'Quick alerts & concise prompts',
                },
                {
                  size: 'md' as ModalSize,
                  name: 'Medium (md · Default)',
                  badgeWidth: 'max-width: 384px',
                  badgePadding: 'padding: 20px',
                  shadcnToken: 'sm:max-w-sm',
                  descId: 'Ukuran default standar untuk mayoritas konfirmasi aplikasi, form sederhana, dan pengumuman status.',
                  descEn: 'Default standard size for majority of application confirmations, simple forms, and status updates.',
                  variant: 'success' as const,
                  titleId: 'Artikel Dipublikasikan',
                  titleEn: 'Blog Post Published',
                  dialogDescId: 'Artikel blog Anda telah berhasil dirilis dan kini dapat diakses oleh publik.',
                  dialogDescEn: 'This blog post has been published and is now live for all visitors.',
                  icon: <CheckCircle2 size={20} strokeWidth={2.2} />,
                  cancelId: 'Tutup',
                  cancelEn: 'Close',
                  confirmId: 'Lihat Post',
                  confirmEn: 'View Post',
                  confirmVariant: 'primary' as const,
                  bestForId: 'Sebagian besar dialog konfirmasi sistem',
                  bestForEn: 'Most system confirmation dialogs',
                },
                {
                  size: 'lg' as ModalSize,
                  name: 'Large (lg)',
                  badgeWidth: 'max-width: 448px',
                  badgePadding: 'padding: 24px',
                  shadcnToken: 'sm:max-w-md',
                  descId: 'Untuk dialog dengan area preview dokumen, deskripsi bertahap, informasi kaya, atau alur multi-langkah.',
                  descEn: 'For dialogs featuring document preview areas, detailed descriptions, rich media, or multi-step flows.',
                  variant: 'info' as const,
                  titleId: 'Pratinjau Dokumen',
                  titleEn: 'Document Preview',
                  dialogDescId: 'Tinjau ringkasan konten dan izin akses sebelum dipublikasikan ke publik.',
                  dialogDescEn: 'Review the content summary and access permissions before public release.',
                  icon: <FolderOpen size={20} />,
                  cancelId: 'Tutup',
                  cancelEn: 'Close',
                  confirmId: 'Publikasikan',
                  confirmEn: 'Publish',
                  confirmVariant: 'primary' as const,
                  bestForId: 'Preview konten & form bertahap',
                  bestForEn: 'Content preview & structured forms',
                  customBody: (
                    <div style={{ background: 'var(--color-bg-subtle)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-text-xs)' }}>
                      📄 {isId ? 'Area Pratinjau Dokumen (448px)' : 'Document Preview Canvas (448px)'}
                    </div>
                  ),
                },
              ]
                .filter((item) => selectedSizeFilter === 'all' || selectedSizeFilter === item.size)
                .map((item, index, arr) => (
                  <div
                    key={item.size}
                    className={`modal-size-card ${
                      arr.length === 1
                        ? 'modal-size-card--full'
                        : index === 2 && arr.length === 3
                        ? 'modal-size-card--full'
                        : ''
                    }`}
                  >
                    {/* Header */}
                    <div className="modal-size-card__header">
                      <div className="modal-size-card__header-top">
                        <span className="modal-size-card__title">{item.name}</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <NeuronBadge variant="brand" size="xs">
                            {item.badgeWidth}
                          </NeuronBadge>
                          <NeuronBadge variant="neutral" size="xs">
                            {item.badgePadding}
                          </NeuronBadge>
                        </div>
                      </div>
                      <p className="modal-size-card__desc">
                        {isId ? item.descId : item.descEn}
                      </p>
                    </div>

                    {/* Preview Canvas */}
                    <div className="modal-size-card__preview">
                      <StaticModalPreview
                        size={item.size}
                        variant={item.variant}
                        title={isId ? item.titleId : item.titleEn}
                        description={isId ? item.dialogDescId : item.dialogDescEn}
                        icon={item.icon}
                        footer={
                          <>
                            <NeuronButton variant="secondary" size="md">
                              {isId ? item.cancelId : item.cancelEn}
                            </NeuronButton>
                            <NeuronButton variant={item.confirmVariant} size="md">
                              {isId ? item.confirmId : item.confirmEn}
                            </NeuronButton>
                          </>
                        }
                      >
                        {item.customBody}
                      </StaticModalPreview>
                    </div>

                    {/* Footer Specs */}
                    <div className="modal-size-card__footer">
                      <span>Token: <code>{item.shadcnToken}</code></span>
                      <span>{isId ? 'Rekomendasi:' : 'Ideal for:'} <strong>{isId ? item.bestForId : item.bestForEn}</strong></span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ── When to Use ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Kapan Digunakan' : 'When to Use'}</h2>
            <p className="section-description">
              {isId
                ? 'Panduan pemilihan varian modal berdasarkan skenario interaksi sistem dan tingkat risiko tindakan.'
                : 'Guidance for selecting modal variants based on interaction scenarios and action risk levels.'}
            </p>

            {/* Semantic Scenarios Grid */}
            <div className="when-to-use-scenarios">
              {[
                {
                  id: 'default',
                  titleId: 'Konfirmasi Aksi Standar',
                  titleEn: 'General Action Confirmation',
                  descId: 'Gunakan saat pengguna melakukan tindakan reguler seperti menyimpan preferensi, memperbarui data akun, atau meninjau pengaturan.',
                  descEn: 'Use when user performs standard actions such as saving preferences, updating account data, or reviewing settings.',
                  badgeVariant: 'neutral' as const,
                  badgeLabel: 'Default',
                  sizeChip: '384px (md)',
                  actionLabelId: 'Tombol Brand Neudela',
                  actionLabelEn: 'Primary Brand button',
                  actionColor: 'var(--brand-600)',
                  icon: <Settings size={18} color="var(--brand-600)" />,
                  haloBg: 'var(--brand-50)',
                },
                {
                  id: 'danger',
                  titleId: 'Operasi Destruktif / Hapus',
                  titleEn: 'Destructive / Delete Action',
                  descId: 'Wajib digunakan untuk aksi permanen yang tidak dapat dibatalkan, seperti menghapus proyek, revoke API key, atau menghapus anggota tim.',
                  descEn: 'Mandatory for irreversible actions that permanently erase data, such as deleting projects, revoking API keys, or removing team members.',
                  badgeVariant: 'danger' as const,
                  badgeLabel: 'Danger',
                  sizeChip: '320px / 384px',
                  actionLabelId: 'Tombol Destructive (Merah)',
                  actionLabelEn: 'Destructive (Red) button',
                  actionColor: 'var(--red-600)',
                  icon: <Trash2 size={18} color="var(--red-600)" />,
                  haloBg: 'var(--red-50)',
                },
                {
                  id: 'warning',
                  titleId: 'Peringatan Data Belum Disimpan',
                  titleEn: 'Unsaved Changes Warning',
                  descId: 'Gunakan saat pengguna hendak berpindah halaman atau menutup dialog saat masih ada formulir aktif yang belum tersimpan.',
                  descEn: 'Use when user attempts to navigate away or dismiss a dialog while an active form has unsaved modifications.',
                  badgeVariant: 'warning' as const,
                  badgeLabel: 'Warning',
                  sizeChip: '384px (md)',
                  actionLabelId: 'Tetap di Sini vs Tinggalkan',
                  actionLabelEn: 'Stay Here vs Leave Anyway',
                  actionColor: 'var(--amber-600)',
                  icon: <AlertTriangle size={18} color="var(--amber-600)" />,
                  haloBg: 'var(--amber-50)',
                },
                {
                  id: 'success',
                  titleId: 'Konfirmasi Keberhasilan',
                  titleEn: 'Success Confirmation',
                  descId: 'Gunakan untuk mengonfirmasi bahwa alur penting telah tuntas (misal: rilis artikel, pembayaran terkonfirmasi, atau domain tersambung).',
                  descEn: 'Use to confirm completion of critical flows (e.g. article published, payment verified, or custom domain connected).',
                  badgeVariant: 'success' as const,
                  badgeLabel: 'Success',
                  sizeChip: '384px (md)',
                  actionLabelId: 'Lihat Hasil / Selesai',
                  actionLabelEn: 'View Results / Done',
                  actionColor: 'var(--emerald-600)',
                  icon: <CheckCircle2 size={18} strokeWidth={2.2} color="var(--emerald-600)" />,
                  haloBg: 'var(--emerald-50)',
                },
                {
                  id: 'info',
                  titleId: 'Informasi Penting / Kebijakan',
                  titleEn: 'Important Policy / System Notice',
                  descId: 'Gunakan untuk pengumuman sistem krusial yang memerlukan persetujuan eksplisit, seperti pembaruan ToS, kebijakan privasi, atau jadwal maintenance.',
                  descEn: 'Use for crucial announcements requiring explicit user acknowledgement, such as ToS updates, privacy policies, or maintenance notices.',
                  badgeVariant: 'info' as const,
                  badgeLabel: 'Info',
                  sizeChip: '384px / 448px',
                  actionLabelId: 'Saya Mengerti / Pelajari',
                  actionLabelEn: 'I Understand / Learn More',
                  actionColor: 'var(--sky-600)',
                  icon: <Info size={18} color="var(--sky-600)" />,
                  haloBg: 'var(--sky-50)',
                },
                {
                  id: 'form',
                  titleId: 'Formulir Singkat / Input Data',
                  titleEn: 'Focused Form / Data Entry',
                  descId: 'Gunakan untuk formulir mandiri 1–3 input ringkas seperti "Buat Folder", "Undang Anggota", atau "Kirim Masukan" tanpa berganti halaman.',
                  descEn: 'Use for compact 1–3 field self-contained forms such as "Create Folder", "Invite Member", or "Send Feedback" without navigating away.',
                  badgeVariant: 'brand' as const,
                  badgeLabel: 'Form',
                  sizeChip: '448px (lg)',
                  actionLabelId: 'Simpan / Buat Baru',
                  actionLabelEn: 'Submit / Create New',
                  actionColor: 'var(--brand-600)',
                  icon: <FileText size={18} color="var(--brand-600)" />,
                  haloBg: 'var(--brand-50)',
                },
              ].map((scenario) => (
                <div key={scenario.id} className="scenario-card">
                  <div className="scenario-card__top">
                    <div
                      className="scenario-card__icon-wrap"
                      style={{ backgroundColor: scenario.haloBg }}
                    >
                      {scenario.icon}
                    </div>
                    <div className="scenario-card__content">
                      <div className="scenario-card__title-row">
                        <span className="scenario-card__title">
                          {isId ? scenario.titleId : scenario.titleEn}
                        </span>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <NeuronBadge variant={scenario.badgeVariant} size="xs">
                            {scenario.badgeLabel}
                          </NeuronBadge>
                        </div>
                      </div>
                      <p className="scenario-card__desc">
                        {isId ? scenario.descId : scenario.descEn}
                      </p>
                    </div>
                  </div>

                  <div className="scenario-card__bottom">
                    <span>{isId ? 'Ukuran Rekomendasi:' : 'Recommended Size:'} <code>{scenario.sizeChip}</code></span>
                    <span>{isId ? 'Aksi:' : 'Action:'} <strong style={{ color: scenario.actionColor }}>{isId ? scenario.actionLabelId : scenario.actionLabelEn}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Alternatives Comparison */}
            <div className="alternatives-container">
              <div className="alternatives-title">
                {isId ? 'Kapan Menggunakan Komponen Lain (Alternatif Modal)' : 'When to Use Alternatives to Modals'}
              </div>
              <p className="alternatives-subtitle">
                {isId
                  ? 'Modal bersifat blocking dan menghentikan alur kerja pengguna. Pertimbangkan alternatif berikut jika interupsi penuh tidak diperlukan:'
                  : 'Modals are blocking and interrupt user workflow. Consider these alternatives when full interruption is not strictly necessary:'}
              </p>

              <div className="alternatives-grid">
                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'var(--brand-50)', color: 'var(--brand-600)' }}>
                        <Layers size={16} />
                      </div>
                      <span className="alternative-card__name">Modal Dialog</span>
                    </div>
                    <NeuronBadge variant="brand" size="xs">{isId ? 'Blocking' : 'Blocking'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan saat pengguna harus mengambil keputusan tegas sebelum melanjutkan alur kerja.'
                      : 'Use when the user must make an explicit, focused decision before proceeding with work.'}
                  </p>
                </div>

                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)' }}>
                        <PanelRight size={16} />
                      </div>
                      <span className="alternative-card__name">Drawer / Sheet</span>
                    </div>
                    <NeuronBadge variant="neutral" size="xs">{isId ? 'Side Panel' : 'Side Panel'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan untuk formulir panjang bertahap, filter tabel kompleks, atau detail inspeksi yang membutuhkan konteks layar.'
                      : 'Use for multi-step long forms, complex table filters, or detail inspections needing background context.'}
                  </p>
                </div>

                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'var(--amber-50)', color: 'var(--amber-600)' }}>
                        <AlertCircle size={16} />
                      </div>
                      <span className="alternative-card__name">Inline Alert</span>
                    </div>
                    <NeuronBadge variant="warning" size="xs">{isId ? 'Kontekstual' : 'Contextual'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan untuk pesan sistem atau peringatan yang menetap di layout halaman tanpa menghalangi interaksi lainnya.'
                      : 'Use for persistent notices or warnings embedded in page layout without blocking interactions.'}
                  </p>
                </div>

                <div className="alternative-card">
                  <div className="alternative-card__header">
                    <div className="alternative-card__title-group">
                      <div className="alternative-card__icon" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}>
                        <Bell size={16} />
                      </div>
                      <span className="alternative-card__name">Toast Notification</span>
                    </div>
                    <NeuronBadge variant="success" size="xs">{isId ? 'Pasif' : 'Transient'}</NeuronBadge>
                  </div>
                  <p className="alternative-card__body">
                    {isId
                      ? 'Gunakan untuk umpan balik pasif sekilas yang otomatis hilang tanpa memerlukan respons (misal: "Tersimpan").'
                      : 'Use for brief passive confirmations that auto-dismiss without requiring user input (e.g. "Saved").'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? "Do's and Don'ts" : "Do's and Don'ts"}</h2>
            <p className="section-description">
              {isId
                ? 'Prinsip desain interaksi modal yang direkomendasikan beserta anti-pola yang wajib dihindari.'
                : 'Recommended modal interaction design principles alongside anti-patterns to avoid.'}
            </p>

            {/* Pair 1: Decision Focus vs Long Complex Forms */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-5)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div className="modal-dodont-box">
                    <div className="modal-dodont-header">
                      <div className="modal-dodont-title">
                        <Trash2 size={15} color="var(--red-600)" />
                        {isId ? 'Hapus Berkas' : 'Delete File'}
                      </div>
                      <div className="modal-dodont-close">
                        <X size={15} />
                      </div>
                    </div>
                    <div className="modal-dodont-body">
                      {isId ? 'Yakin ingin menghapus berkas ini? Tindakan ini permanen.' : 'Are you sure you want to delete this file? This action is permanent.'}
                    </div>
                    <div className="modal-dodont-footer">
                      <NeuronButton variant="secondary" size="sm">{isId ? 'Batal' : 'Cancel'}</NeuronButton>
                      <NeuronButton variant="destructive" size="sm">{isId ? 'Hapus' : 'Delete'}</NeuronButton>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? 'Fokus 1 keputusan biner yang jelas' : 'Clear binary decision & focused action'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId
                      ? 'Gunakan modal untuk tindakan kritis yang membutuhkan keputusan fokus.'
                      : 'Use modals for critical actions requiring a focused decision.'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Konfirmasi penghapusan, persetujuan cepat, atau form 1–2 input sangat tepat karena pengguna dapat menyelesaikan tugas seketika tanpa terpecah fokus.'
                      : 'Delete confirmations, quick approvals, or 1–2 input forms are ideal because users can complete the task immediately without distraction.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div className="modal-dodont-box modal-dodont-box--dont">
                    <div className="modal-dodont-header">
                      <div className="modal-dodont-title">
                        <Settings size={15} color="var(--color-text-secondary)" />
                        {isId ? 'Pengaturan Akun Lengkap' : 'Full Account Settings'}
                      </div>
                      <div className="modal-dodont-close">
                        <X size={15} />
                      </div>
                    </div>
                    <div className="modal-dodont-skeleton-list">
                      <div className="modal-dodont-input-skeleton">Nama: John Doe</div>
                      <div className="modal-dodont-input-skeleton">Email: john@example.com</div>
                      <div className="modal-dodont-input-skeleton">Password: ••••••••</div>
                      <div className="modal-dodont-input-skeleton">Zona Waktu: (GMT+7)</div>
                    </div>
                    <div className="modal-dodont-footer">
                      <NeuronButton variant="secondary" size="sm">Langkah 1/5</NeuronButton>
                      <NeuronButton variant="primary" size="sm">Berikutnya →</NeuronButton>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Terlalu padat & membutuhkan scroll' : 'Too cramped & requires scrolling'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId
                      ? 'Jangan gunakan modal untuk alur multi-halaman atau form panjang.'
                      : "Don't use modals for multi-page flows or long complex forms."}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Formulir dengan banyak field, wizard multi-langkah, atau navigasi mendalam sebaiknya menggunakan halaman tersendiri atau Drawer/Sheet.'
                      : 'Multi-field forms, complex wizards, or deep navigation belong on a dedicated page or side Drawer/Sheet.'}
                  </p>
                </div>
              </RuleCard>
            </div>

            {/* Pair 2: Explicit Exit Routes vs Navigation Trap */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div className="modal-dodont-box">
                    <div className="modal-dodont-header">
                      <div className="modal-dodont-title">
                        <FileText size={15} color="var(--brand-600)" />
                        {isId ? 'Publikasikan Draf' : 'Publish Draft'}
                      </div>
                      <div className="modal-dodont-close">
                        <X size={15} />
                      </div>
                    </div>
                    <div className="modal-dodont-body">
                      {isId ? 'Konten akan langsung dapat dibaca oleh publik setelah dirilis.' : 'Content will immediately be visible to all public visitors.'}
                    </div>
                    <div className="modal-dodont-footer">
                      <NeuronButton variant="secondary" size="sm">{isId ? 'Batal' : 'Cancel'}</NeuronButton>
                      <NeuronButton variant="primary" size="sm">{isId ? 'Publikasikan' : 'Publish'}</NeuronButton>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? '3 Rute keluar: Tombol (✕), Batal, Escape' : '3 Exit routes: (✕), Cancel, Escape'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId
                      ? 'Selalu sediakan rute keluar yang jelas dan mudah diakses.'
                      : 'Always provide clear, easily accessible dismissal routes.'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Pastikan modal memiliki tombol close (✕), tombol Batal sekunder, serta dukungan klik backdrop dan tombol Escape untuk menjamin kontrol pengguna.'
                      : 'Ensure modals include a close button (✕), a secondary Cancel button, and backdrop click/Escape key support for user control.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div className="modal-dodont-box modal-dodont-box--dont">
                    <div className="modal-dodont-header">
                      <div className="modal-dodont-title">
                        <AlertCircle size={15} color="var(--amber-600)" />
                        {isId ? 'Pembaruan Data' : 'Update Notice'}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--red-600)', fontStyle: 'italic' }}>
                        {isId ? 'Tanpa tombol (✕)' : 'No (✕) button'}
                      </div>
                    </div>
                    <div className="modal-dodont-body">
                      {isId ? 'Apakah Anda ingin melanjutkan sinkronisasi data sistem?' : 'Do you want to proceed with database synchronization?'}
                    </div>
                    <div className="modal-dodont-footer" style={{ justifyContent: 'center' }}>
                      <NeuronButton variant="primary" size="sm" style={{ width: '100%' }}>
                        {isId ? 'Lanjutkan (Tanpa opsi Batal)' : 'Proceed (No Cancel Option)'}
                      </NeuronButton>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Jebakan tanpa opsi Batal memicu frustrasi' : 'Trapping users without Cancel causes anxiety'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId
                      ? 'Jangan hilangkan tombol pembatalan atau menjebak pengguna.'
                      : "Don't trap users without cancellation options or escape routes."}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Menghilangkan tombol Batal atau hanya memberikan satu tombol aksi tanpa alternatif keluar menciptakan rasa cemas (*user anxiety*) dan frustrasi.'
                      : 'Omitting a Cancel option or offering only a single forward action induces user anxiety when they wish to safely abort.'}
                  </p>
                </div>
              </RuleCard>
            </div>

            {/* Pair 3: Button Hierarchy & Destructive Styling vs Competing Buttons */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div className="modal-dodont-box">
                    <div className="modal-dodont-header">
                      <div className="modal-dodont-title">
                        <Trash2 size={15} color="var(--red-600)" />
                        {isId ? 'Hapus Workspace' : 'Delete Workspace'}
                      </div>
                      <div className="modal-dodont-close">
                        <X size={15} />
                      </div>
                    </div>
                    <div className="modal-dodont-body">
                      {isId ? 'Aksi permanen. Semua data proyek di dalamnya akan terhapus.' : 'This action is permanent. All project data will be erased.'}
                    </div>
                    <div className="modal-dodont-footer">
                      <NeuronButton variant="secondary" size="sm">{isId ? 'Batal' : 'Cancel'}</NeuronButton>
                      <NeuronButton variant="destructive" size="sm">{isId ? 'Hapus' : 'Delete'}</NeuronButton>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? 'Tombol merah destruktif + Batal netral' : 'Destructive red + neutral Cancel'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId
                      ? 'Gunakan warna destruktif (merah) untuk aksi berisiko tinggi.'
                      : 'Use destructive red styling for high-risk, irreversible actions.'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Beri pembeda visual tegas antara aksi pembatalan sekunder dan konfirmasi utama. Gunakan variant="destructive" untuk aksi destruktif permanen.'
                      : 'Provide clear contrast between secondary dismissal and the primary action. Use variant="destructive" for permanent deletions.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div className="modal-dodont-box modal-dodont-box--dont">
                    <div className="modal-dodont-header">
                      <div className="modal-dodont-title">
                        <HelpCircle size={15} color="var(--color-text-secondary)" />
                        {isId ? 'Konfirmasi Simpan' : 'Save Confirmation'}
                      </div>
                      <div className="modal-dodont-close">
                        <X size={15} />
                      </div>
                    </div>
                    <div className="modal-dodont-body">
                      {isId ? 'Pilih salah satu metode penyimpanan dokumen draf.' : 'Choose one document storage destination.'}
                    </div>
                    <div className="modal-dodont-footer" style={{ justifyContent: 'space-between' }}>
                      <NeuronButton variant="primary" size="sm" style={{ fontSize: '11px', padding: '0 8px' }}>
                        {isId ? 'Simpan Draf' : 'Save Draft'}
                      </NeuronButton>
                      <NeuronButton variant="primary" size="sm" style={{ fontSize: '11px', padding: '0 8px' }}>
                        {isId ? 'Rilis Publik' : 'Publish Live'}
                      </NeuronButton>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Dua tombol primary bersaing membingungkan' : 'Two competing primary buttons confuse priority'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId
                      ? 'Hindari tombol primer yang saling bersaing atau menumpuk modal.'
                      : "Don't compete with multiple primary buttons or stack modals."}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Dua tombol primer berdampingan mengaburkan hierarki aksi yang disarankan. Jangan pula membuka dialog modal baru di atas modal yang sedang terbuka.'
                      : 'Side-by-side primary buttons obscure the recommended action. Never open a secondary modal on top of an already active modal.'}
                  </p>
                </div>
              </RuleCard>
            </div>
          </div>

          {/* ── API Reference ── */}
          <div className="section-card">
            <h2 className="section-title">API Reference</h2>
            <p className="section-description">
              {isId ? 'Prop-prop yang tersedia untuk komponen NeuronModal.' : 'Available props for the NeuronModal component.'}
            </p>
            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
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
                    <td><code>open</code></td>
                    <td><code>boolean</code></td>
                    <td>—</td>
                    <td>{isId ? 'Kontrol visibilitas modal.' : 'Controls modal visibility.'}</td>
                  </tr>
                  <tr>
                    <td><code>onClose</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td>—</td>
                    <td>{isId ? 'Callback dipanggil saat modal harus ditutup.' : 'Callback called when modal should close.'}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{isId ? 'Ukuran lebar maksimal panel.' : 'Maximum width size of the panel.'}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'danger' | 'warning' | 'success' | 'info'</code></td>
                    <td><code>'default'</code></td>
                    <td>{isId ? 'Varian visual yang mempengaruhi warna ikon dan border atas.' : 'Visual variant affecting icon color and top border accent.'}</td>
                  </tr>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{isId ? 'Teks judul modal.' : 'Modal title text.'}</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{isId ? 'Deskripsi opsional di bawah judul.' : 'Optional description below the title.'}</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{isId ? 'Ikon opsional di header.' : 'Optional icon in the header.'}</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{isId ? 'Konten utama body modal.' : 'Main body content of the modal.'}</td>
                  </tr>
                  <tr>
                    <td><code>footer</code></td>
                    <td><code>ReactNode</code></td>
                    <td>—</td>
                    <td>{isId ? 'Slot footer – biasanya tombol aksi.' : 'Footer slot – typically action buttons.'}</td>
                  </tr>
                  <tr>
                    <td><code>closeOnBackdrop</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{isId ? 'Menutup modal saat backdrop diklik.' : 'Closes modal when backdrop is clicked.'}</td>
                  </tr>
                  <tr>
                    <td><code>closeOnEscape</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{isId ? 'Menutup modal saat tombol Escape ditekan.' : 'Closes modal when Escape key is pressed.'}</td>
                  </tr>
                  <tr>
                    <td><code>showCloseButton</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{isId ? 'Menampilkan tombol close (X) di header.' : 'Shows the close (X) button in the header.'}</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code>string</code></td>
                    <td><code>''</code></td>
                    <td>{isId ? 'Class CSS tambahan untuk panel dialog.' : 'Additional CSS class for the dialog panel.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Next / Previous */}
          <NextPrevious
            prev={{ id: 'comp-input', label: t.nav.compInput }}
            next={{ id: 'comp-progress', label: t.nav.compProgress }}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">

          {/* ── 1. Live Variant Gallery ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '1. Galeri Varian Interaktif' : '1. Interactive Variant Gallery'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Klik kartu di bawah untuk membuka modal secara langsung dan menguji animasi, efek backdrop blur, dan interaksi keyboard (Escape & Tab trap).'
                : 'Click any card below to launch live modals and experience entrance animations, backdrop blur, and keyboard interactions (Escape & Tab trap).'}
            </p>

            {/* Filter Tabs */}
            <div className="modal-gallery-tabs">
              <button
                type="button"
                className={`modal-gallery-tab-btn ${galleryCategoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setGalleryCategoryFilter('all')}
              >
                {isId ? 'Semua Modal (8)' : 'All Modals (8)'}
              </button>
              <button
                type="button"
                className={`modal-gallery-tab-btn ${galleryCategoryFilter === 'variant' ? 'active' : ''}`}
                onClick={() => setGalleryCategoryFilter('variant')}
              >
                {isId ? 'Varian Semantik (5)' : 'Semantic Variants (5)'}
              </button>
              <button
                type="button"
                className={`modal-gallery-tab-btn ${galleryCategoryFilter === 'flow' ? 'active' : ''}`}
                onClick={() => setGalleryCategoryFilter('flow')}
              >
                {isId ? 'Alur Aplikasi (3)' : 'Application Flows (3)'}
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="modal-gallery-grid">
              {[
                {
                  id: 'default',
                  category: 'variant',
                  title: isId ? 'Pengaturan Akun' : 'Account Settings',
                  desc: isId
                    ? 'Dialog konfigurasi dengan opsi pembatalan sekunder dan tombol simpan perubahan utama.'
                    : 'Standard configuration dialog with secondary cancel and primary save changes button.',
                  sizeBadge: 'md · 384px',
                  variantBadge: 'Default',
                  badgeVariant: 'neutral' as const,
                  icon: <Settings size={20} color="var(--brand-600)" />,
                  iconBg: 'var(--brand-50)',
                  iconShadow: '0 0 0 6px var(--brand-50)',
                  cardClass: 'modal-gallery-card--default',
                },
                {
                  id: 'danger',
                  category: 'variant',
                  title: isId ? 'Hapus Proyek' : 'Delete Project',
                  desc: isId
                    ? 'Konfirmasi tindakan destruktif permanen dengan tombol aksi berwarna merah.'
                    : 'Permanent destructive action confirmation with solid red button styling.',
                  sizeBadge: 'sm · 320px',
                  variantBadge: isId ? 'Bahaya' : 'Danger',
                  badgeVariant: 'danger' as const,
                  icon: <Trash2 size={20} color="var(--red-600)" />,
                  iconBg: 'var(--red-50)',
                  iconShadow: '0 0 0 6px var(--red-50)',
                  cardClass: 'modal-gallery-card--danger',
                },
                {
                  id: 'warning',
                  category: 'variant',
                  title: isId ? 'Perubahan Belum Disimpan' : 'Unsaved Changes',
                  desc: isId
                    ? 'Peringatan perpindahan halaman untuk mencegah kehilangan progres formulir pengguna.'
                    : 'Page transition alert warning users about potential unsaved form data loss.',
                  sizeBadge: 'md · 384px',
                  variantBadge: isId ? 'Peringatan' : 'Warning',
                  badgeVariant: 'warning' as const,
                  icon: <AlertTriangle size={20} color="var(--amber-600)" />,
                  iconBg: 'var(--amber-50)',
                  iconShadow: '0 0 0 6px var(--amber-50)',
                  cardClass: 'modal-gallery-card--warning',
                },
                {
                  id: 'success',
                  category: 'variant',
                  title: isId ? 'Artikel Dipublikasikan' : 'Post Published',
                  desc: isId
                    ? 'Notifikasi konfirmasi keberhasilan perilisan konten ke ruang publik.'
                    : 'Success confirmation informing that content is now published live.',
                  sizeBadge: 'md · 384px',
                  variantBadge: isId ? 'Sukses' : 'Success',
                  badgeVariant: 'success' as const,
                  icon: <CheckCircle2 size={20} strokeWidth={2.2} color="var(--emerald-600)" />,
                  iconBg: 'var(--emerald-50)',
                  iconShadow: '0 0 0 6px var(--emerald-50)',
                  cardClass: 'modal-gallery-card--success',
                },
                {
                  id: 'info',
                  category: 'variant',
                  title: isId ? 'Pembaruan Kebijakan Privasi' : 'Privacy Policy Update',
                  desc: isId
                    ? 'Pemberitahuan perubahan ketentuan regulasi privasi dengan tautan pelajari lebih lanjut.'
                    : 'Informative notice regarding regulation changes with learn more link.',
                  sizeBadge: 'md · 384px',
                  variantBadge: isId ? 'Informasi' : 'Info',
                  badgeVariant: 'info' as const,
                  icon: <Info size={20} color="var(--sky-600)" />,
                  iconBg: 'var(--sky-50)',
                  iconShadow: '0 0 0 6px var(--sky-50)',
                  cardClass: 'modal-gallery-card--info',
                },
                {
                  id: 'logout',
                  category: 'flow',
                  title: isId ? 'Keluar dari Sesi Akun' : 'Sign Out Session',
                  desc: isId
                    ? 'Dialog konfirmasi untuk mengakhiri sesi aktif pengguna di seluruh perangkat.'
                    : 'Sign out confirmation dialog to terminate active user session across devices.',
                  sizeBadge: 'sm · 320px',
                  variantBadge: 'Auth Flow',
                  badgeVariant: 'neutral' as const,
                  icon: <LogOut size={20} color="var(--gray-700)" />,
                  iconBg: 'var(--gray-100)',
                  iconShadow: '0 0 0 6px var(--gray-100)',
                  cardClass: 'modal-gallery-card--flow',
                },
                {
                  id: 'upload',
                  category: 'flow',
                  title: isId ? 'Unggah Berkas Media' : 'Upload Media File',
                  desc: isId
                    ? 'Area dropzone interaktif seret-dan-lepas untuk mengunggah aset ke penyimpanan cloud.'
                    : 'Interactive drag-and-drop dropzone modal to upload assets to cloud storage.',
                  sizeBadge: 'md · 384px',
                  variantBadge: 'Form Flow',
                  badgeVariant: 'purple' as const,
                  icon: <Upload size={20} color="var(--purple-600)" />,
                  iconBg: 'var(--purple-100)',
                  iconShadow: '0 0 0 6px var(--purple-100)',
                  cardClass: 'modal-gallery-card--flow',
                },
                {
                  id: 'share',
                  category: 'flow',
                  title: isId ? 'Bagikan Dokumen Proyek' : 'Share Project Document',
                  desc: isId
                    ? 'Formulir undangan kolaborator dengan input email dan pengaturan hak akses tim.'
                    : 'Collaborator invite form with email input and permission access settings.',
                  sizeBadge: 'md · 384px',
                  variantBadge: 'Share Flow',
                  badgeVariant: 'info' as const,
                  icon: <Share2 size={20} color="var(--sky-600)" />,
                  iconBg: 'var(--sky-50)',
                  iconShadow: '0 0 0 6px var(--sky-50)',
                  cardClass: 'modal-gallery-card--flow',
                },
              ]
                .filter(item => galleryCategoryFilter === 'all' || item.category === galleryCategoryFilter)
                .map(item => (
                  <div
                    key={item.id}
                    className={`modal-gallery-card ${item.cardClass}`}
                  >
                    <div className="modal-gallery-card__header">
                      <div
                        className="modal-gallery-card__icon-wrap"
                        style={{
                          background: item.iconBg,
                          boxShadow: item.iconShadow,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="modal-gallery-card__badges">
                        <NeuronBadge variant={item.badgeVariant} size="xs">
                          {item.variantBadge}
                        </NeuronBadge>
                        <NeuronBadge variant="neutral" size="xs">
                          {item.sizeBadge}
                        </NeuronBadge>
                      </div>
                    </div>

                    <div className="modal-gallery-card__body">
                      <h3 className="modal-gallery-card__title">{item.title}</h3>
                      <p className="modal-gallery-card__desc">{item.desc}</p>
                    </div>

                    <div className="modal-gallery-card__footer">
                      <span className="modal-gallery-card__chip">
                        <Sparkles size={12} style={{ color: 'var(--brand-500)' }} />
                        {isId ? 'Dialog Interaktif' : 'Live Interactive'}
                      </span>
                      <NeuronButton
                        variant="secondary"
                        size="sm"
                        onClick={() => setOpenModal(item.id)}
                      >
                        <ExternalLink size={13} style={{ marginRight: 6 }} />
                        {isId ? 'Buka Dialog' : 'Launch Modal'}
                      </NeuronButton>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ── 2. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? '2. Playground Interaktif' : '2. Interactive Playground'}</h2>
            <p className="section-description">
              {isId
                ? 'Sesuaikan semua prop dan lihat perubahan secara real-time.'
                : 'Customize all props and see changes in real-time.'}
            </p>
            <Playground
              name="NeuronModal"
              knobs={[
                {
                  name: 'variant',
                  label: 'Variant',
                  type: 'select',
                  options: ['default', 'danger', 'warning', 'success', 'info'],
                  default: 'default',
                },
                {
                  name: 'size',
                  label: 'Size',
                  type: 'select',
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                },
                {
                  name: 'title',
                  label: isId ? 'Judul' : 'Title',
                  type: 'text',
                  default: isId ? 'Pengaturan Akun' : 'Account Settings',
                },
                {
                  name: 'description',
                  label: isId ? 'Deskripsi' : 'Description',
                  type: 'text',
                  default: isId ? 'Perbarui preferensi akun Anda di sini.' : 'Update your account preferences here.',
                },
                {
                  name: 'showIcon',
                  label: isId ? 'Tampilkan Ikon' : 'Show Icon',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'showFooter',
                  label: isId ? 'Tampilkan Footer' : 'Show Footer',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'showCloseButton',
                  label: isId ? 'Tombol Close' : 'Close Button',
                  type: 'boolean',
                  default: true,
                },
              ]}
              codeTemplates={(knobs) => {
                const iconName = knobs.variant === 'danger' ? 'Trash2'
                  : knobs.variant === 'warning' ? 'AlertTriangle'
                  : knobs.variant === 'success' ? 'CheckCircle2'
                  : knobs.variant === 'info' ? 'Info'
                  : 'Settings';

                return {
                  react: `<NeuronModal\n  open={isOpen}\n  onClose={() => setIsOpen(false)}\n  variant="${knobs.variant}"\n  size="${knobs.size}"\n  title="${knobs.title}"\n  description="${knobs.description}"${knobs.showIcon ? `\n  icon={<${iconName} size={24} />}` : ''}\n  showCloseButton={${knobs.showCloseButton}}${knobs.showFooter ? `\n  footer={\n    <>\n      <NeuronButton variant="secondary" size="md" onClick={() => setIsOpen(false)}>Cancel</NeuronButton>\n      <NeuronButton variant="primary" size="md" onClick={() => setIsOpen(false)}>Confirm</NeuronButton>\n    </>\n  }` : ''}\n/>`,
                  vue: `<NeuronModal\n  :open="isOpen"\n  variant="${knobs.variant}"\n  size="${knobs.size}"\n  title="${knobs.title}"\n  description="${knobs.description}"\n  :show-close-button="${knobs.showCloseButton}"\n  @close="isOpen = false"\n/>`,
                  html: `<div class="neuron-modal-backdrop">\n  <div class="neuron-modal neuron-modal--${knobs.size} neuron-modal--${knobs.variant}">\n    <div class="neuron-modal__top-bar">\n      <div class="neuron-modal__icon neuron-modal__icon--${knobs.variant}"><!-- Icon with Ring Shadow --></div>\n      <button class="neuron-modal__close">&#10005;</button>\n    </div>\n    <div class="neuron-modal__content">\n      <h2 class="neuron-modal__title">${knobs.title}</h2>\n      <p class="neuron-modal__description">${knobs.description}</p>\n    </div>\n    <div class="neuron-modal__footer">\n      <button class="neuron-btn neuron-btn--secondary neuron-btn--md">Cancel</button>\n      <button class="neuron-btn neuron-btn--primary neuron-btn--md">Confirm</button>\n    </div>\n  </div>\n</div>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ width: '100%', maxWidth: '384px', margin: '0 auto' }}>
                  <StaticModalPreview
                    variant={knobs.variant as ModalVariant}
                    size={knobs.size as ModalSize}
                    title={knobs.title as string}
                    description={knobs.description as string}
                    icon={knobs.showIcon ? variantIconMap[knobs.variant as ModalVariant] : undefined}
                    footer={knobs.showFooter ? (
                      <>
                        <NeuronButton variant="secondary" size="md">
                          {isId ? 'Batal' : 'Cancel'}
                        </NeuronButton>
                        <NeuronButton
                          variant="primary"
                          size="md"
                        >
                          {isId ? 'Konfirmasi' : 'Confirm'}
                        </NeuronButton>
                      </>
                    ) : undefined}
                  />
                </div>
              )}
            </Playground>
          </div>

          {/* Next / Previous */}
          <NextPrevious
            prev={{ id: 'comp-input', label: t.nav.compInput }}
            next={{ id: 'comp-progress', label: t.nav.compProgress }}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {/* ══════════════════════════════════════
          LIVE MODALS
      ══════════════════════════════════════ */}

      {/* Default Modal */}
      <NeuronModal
        open={openModal === 'default'}
        onClose={() => setOpenModal(null)}
        variant="default"
        size="md"
        title={isId ? 'Pengaturan Akun' : 'Account Settings'}
        description={isId ? 'Perbarui preferensi akun Anda.' : 'Update your account preferences.'}
        icon={<Settings size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Batal' : 'Cancel'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Simpan' : 'Save Changes'}
            </NeuronButton>
          </>
        }
      >
        <p>
          {isId
            ? 'Anda dapat mengubah nama tampilan, preferensi notifikasi, dan pengaturan keamanan dari panel pengaturan ini.'
            : 'You can update your display name, notification preferences, and security settings from this settings panel.'}
        </p>
      </NeuronModal>

      {/* Danger Modal */}
      <NeuronModal
        open={openModal === 'danger'}
        onClose={() => setOpenModal(null)}
        variant="danger"
        size="sm"
        title={isId ? 'Hapus Proyek' : 'Delete Project'}
        description={isId ? 'Tindakan ini tidak dapat dibatalkan.' : 'This action cannot be undone.'}
        icon={<Trash2 size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Batal' : 'Cancel'}
            </NeuronButton>
            <NeuronButton
              variant="destructive"
              size="md"
              onClick={() => setOpenModal(null)}
            >
              {isId ? 'Hapus' : 'Delete'}
            </NeuronButton>
          </>
        }
      >
        <p>
          {isId
            ? 'Semua file, data, dan pengaturan terkait proyek ini akan dihapus secara permanen dan tidak dapat dikembalikan.'
            : 'All files, data, and settings associated with this project will be permanently deleted and cannot be recovered.'}
        </p>
      </NeuronModal>

      {/* Warning Modal */}
      <NeuronModal
        open={openModal === 'warning'}
        onClose={() => setOpenModal(null)}
        variant="warning"
        size="md"
        title={isId ? 'Perubahan Belum Disimpan' : 'Unsaved Changes'}
        description={isId ? 'Meninggalkan halaman ini akan kehilangan perubahan.' : 'Leaving this page will discard your changes.'}
        icon={<AlertTriangle size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Tetap di Sini' : 'Stay Here'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Tinggalkan' : 'Leave Anyway'}
            </NeuronButton>
          </>
        }
      >
        <p>
          {isId
            ? 'Anda memiliki perubahan yang belum disimpan di formulir ini. Jika Anda meninggalkan halaman sekarang, semua perubahan akan hilang.'
            : 'You have unsaved changes in this form. If you leave now, all changes will be lost.'}
        </p>
      </NeuronModal>

      {/* Success Modal */}
      <NeuronModal
        open={openModal === 'success'}
        onClose={() => setOpenModal(null)}
        variant="success"
        size="md"
        title={isId ? 'Artikel Dipublikasikan' : 'Blog post published'}
        description={isId ? 'Artikel blog ini telah berhasil dipublikasikan. Anggota tim dapat meninjau dan mengedit perubahan.' : 'This blog post has been published. Team members will be able to edit this post and republish changes.'}
        icon={<CheckCircle2 size={20} strokeWidth={2.2} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Batal' : 'Cancel'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Konfirmasi' : 'Confirm'}
            </NeuronButton>
          </>
        }
      />

      {/* Info Modal */}
      <NeuronModal
        open={openModal === 'info'}
        onClose={() => setOpenModal(null)}
        variant="info"
        size="md"
        title={isId ? 'Pembaruan Kebijakan Privasi' : 'Privacy Policy Update'}
        description={isId ? 'Berlaku mulai 1 September 2025.' : 'Effective from September 1, 2025.'}
        icon={<Info size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Pelajari Lebih Lanjut' : 'Learn More'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Mengerti' : 'Got It'}
            </NeuronButton>
          </>
        }
      >
        <p>
          {isId
            ? 'Kami telah memperbarui kebijakan privasi kami untuk mematuhi regulasi terbaru. Silakan tinjau perubahan sebelum melanjutkan menggunakan layanan kami.'
            : 'We have updated our privacy policy to comply with the latest regulations. Please review the changes before continuing to use our service.'}
        </p>
      </NeuronModal>

      {/* Logout Modal */}
      <NeuronModal
        open={openModal === 'logout'}
        onClose={() => setOpenModal(null)}
        variant="default"
        size="sm"
        title={isId ? 'Keluar dari Akun' : 'Sign Out'}
        description={isId ? 'Yakin ingin keluar dari sesi ini?' : 'Are you sure you want to sign out?'}
        icon={<LogOut size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Batal' : 'Cancel'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Ya, Keluar' : 'Yes, Sign Out'}
            </NeuronButton>
          </>
        }
      >
        <p>
          {isId
            ? 'Anda akan keluar dari semua perangkat yang aktif saat ini. Masuk kembali kapan saja dengan kredensial Anda.'
            : 'You will be signed out from all currently active devices. Sign back in anytime with your credentials.'}
        </p>
      </NeuronModal>

      {/* Upload Modal */}
      <NeuronModal
        open={openModal === 'upload'}
        onClose={() => setOpenModal(null)}
        variant="default"
        size="md"
        title={isId ? 'Unggah File' : 'Upload File'}
        description={isId ? 'Pilih file untuk diunggah ke cloud storage.' : 'Select files to upload to cloud storage.'}
        icon={<Upload size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Batal' : 'Cancel'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Unggah' : 'Upload'}
            </NeuronButton>
          </>
        }
      >
        <div style={{
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
          textAlign: 'center',
          background: 'var(--gray-50)',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}>
          <Upload size={32} style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-3)' }} />
          <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)', fontSize: 'var(--fs-text-sm)' }}>
            {isId ? 'Seret dan lepas file di sini' : 'Drag and drop files here'}
          </p>
          <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
            {isId ? 'atau klik untuk memilih file' : 'or click to browse files'}
          </p>
          <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-2)' }}>
            PNG, JPG, PDF {isId ? 'hingga' : 'up to'} 10MB
          </p>
        </div>
      </NeuronModal>

      {/* Share Modal */}
      <NeuronModal
        open={openModal === 'share'}
        onClose={() => setOpenModal(null)}
        variant="info"
        size="md"
        title={isId ? 'Bagikan Dokumen' : 'Share Document'}
        description={isId ? 'Undang anggota tim untuk berkolaborasi.' : 'Invite team members to collaborate.'}
        icon={<Share2 size={20} />}
        footer={
          <>
            <NeuronButton variant="secondary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Batal' : 'Cancel'}
            </NeuronButton>
            <NeuronButton variant="primary" size="md" onClick={() => setOpenModal(null)}>
              {isId ? 'Bagikan' : 'Share'}
            </NeuronButton>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              {isId ? 'Email atau username' : 'Email or username'}
            </label>
            <div style={{
              display: 'flex',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}>
              <input
                type="email"
                placeholder={isId ? 'Masukkan email...' : 'Enter email...'}
                style={{
                  flex: 1,
                  border: 'none',
                  padding: 'var(--space-2) var(--space-3)',
                  fontSize: 'var(--fs-text-sm)',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-primary)',
                }}
              />
              <NeuronButton variant="primary" size="sm" style={{ borderRadius: 0 }}>
                {isId ? 'Kirim Undangan' : 'Send Invite'}
              </NeuronButton>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 'var(--fs-text-xs)', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              {isId ? 'Tautan berbagi' : 'Share link'}
            </label>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              alignItems: 'center',
              background: 'var(--gray-50)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-3)',
            }}>
              <span style={{ flex: 1, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                https://app.neudela.io/docs/share/xkd9...
              </span>
              <NeuronButton variant="outline" size="xs">
                {isId ? 'Salin' : 'Copy'}
              </NeuronButton>
            </div>
          </div>
        </div>
      </NeuronModal>

    </div>
  );
}
