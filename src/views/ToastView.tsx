import React, { useState } from 'react';
import {
  Play,
  Check,
  Loader2,
  Save,
  Trash2,
} from 'lucide-react';
import NeuronToast, {
  ToastVariant,
  ToastSize,
  ToastStyleVariant,
  ToastPlacement,
  toast,
} from '../components/NeuronToast';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface ToastViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule Card (Do / Don't)
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
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Anatomy Label
// ─────────────────────────────────────────────────────────────────────────────
function AnatomyLabel({ number, label, desc }: { number: number; label: string; desc: string }) {
  return (
    <div className="anatomy-label">
      <span className="anatomy-number">{number}</span>
      <div>
        <div className="anatomy-label-name">{label}</div>
        <div className="anatomy-label-desc">{desc}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Size Guide Row
// ─────────────────────────────────────────────────────────────────────────────
function SizeGuideRow({
  size,
  label,
  usage,
  variant,
}: {
  size: ToastSize;
  label: string;
  usage: string;
  variant: ToastVariant;
}) {
  return (
    <div className="size-guide-row">
      <div className="size-guide-preview" style={{ minWidth: '320px', maxWidth: '380px' }}>
        <NeuronToast
          variant={variant}
          size={size}
          title={label}
          description={usage}
          dismissible={false}
          duration={0}
        />
      </div>
      <div className="size-guide-info">
        <div className="size-guide-name">{label}</div>
        <div className="size-guide-usage">{usage}</div>
      </div>
    </div>
  );
}

const ALL_VARIANTS: ToastVariant[] = ['success', 'error', 'warning', 'info', 'brand', 'loading', 'default'];
const ALL_STYLES: ToastStyleVariant[] = ['subtle', 'filled', 'outline', 'glass'];
const ALL_SIZES: ToastSize[] = ['sm', 'md', 'lg'];
const ALL_PLACEMENTS: ToastPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export default function ToastView({ setActiveTab }: ToastViewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';
  const gl = t.toast?.guideline;

  // Tab state: guideline vs playbook
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');

  // Matrix controls
  const [matrixStyle, setMatrixStyle] = useState<ToastStyleVariant>('subtle');
  const [matrixSize, setMatrixSize] = useState<ToastSize>('md');
  const [lastTriggeredVariant, setLastTriggeredVariant] = useState<string | null>(null);
  const [lastTriggeredStyle, setLastTriggeredStyle] = useState<ToastStyleVariant | null>(null);

  // Scenario 1: Async Promise State
  const [isPromiseLoading, setIsPromiseLoading] = useState(false);

  // Scenario 2: Destructive Undo State
  const [records, setRecords] = useState([
    { id: 'usr-1', name: 'Althafina Putri', role: 'Staff UI Designer' },
    { id: 'usr-2', name: 'Bimo Wicaksono', role: 'Principal Architect' },
    { id: 'usr-3', name: 'Clara Evelyn', role: 'Lead DevOps Specialist' },
  ]);

  // Variant labels & descriptions
  const variantLabel: Record<ToastVariant, string> = {
    default: t.toast?.default || 'Default',
    info: t.toast?.info || 'Info',
    success: t.toast?.success || 'Success',
    warning: t.toast?.warning || 'Warning',
    error: t.toast?.error || 'Error',
    brand: t.toast?.brand || 'Brand',
    loading: t.toast?.loading || 'Loading',
  };

  const variantDesc: Record<ToastVariant, string> = {
    default: t.toast?.defaultDesc || 'Neutral notification message.',
    info: t.toast?.infoDesc || 'Helpful update or background event.',
    success: t.toast?.successDesc || 'Action completed successfully.',
    warning: t.toast?.warningDesc || 'Cautionary alert requiring review.',
    error: t.toast?.errorDesc || 'Action failed or request rejected.',
    brand: t.toast?.brandDesc || 'Feature highlight or AI assistance.',
    loading: t.toast?.loadingDesc || 'Asynchronous task in progress.',
  };

  // Variant metadata for Overview matrix
  const variantMeta: Record<ToastVariant, { role: string; roleId: string; dotColor: string; bgBadge: string; textBadge: string }> = {
    success: {
      role: 'Confirmation & Completion',
      roleId: 'Konfirmasi Sukses',
      dotColor: 'var(--emerald-500, #10b981)',
      bgBadge: 'rgba(16, 185, 129, 0.12)',
      textBadge: '#10b981',
    },
    error: {
      role: 'Critical Failure / Alert',
      roleId: 'Kegagalan & Penolakan',
      dotColor: 'var(--red-500, #ef4444)',
      bgBadge: 'rgba(239, 68, 68, 0.12)',
      textBadge: '#ef4444',
    },
    warning: {
      role: 'Cautionary Notice',
      roleId: 'Peringatan / Perhatian',
      dotColor: 'var(--amber-500, #f59e0b)',
      bgBadge: 'rgba(245, 158, 11, 0.12)',
      textBadge: '#f59e0b',
    },
    info: {
      role: 'Informational Update',
      roleId: 'Informasi Sistem',
      dotColor: 'var(--sky-500, #3b82f6)',
      bgBadge: 'rgba(59, 130, 246, 0.12)',
      textBadge: '#3b82f6',
    },
    brand: {
      role: 'AI & Premium Feature',
      roleId: 'Fitur Utama / AI',
      dotColor: 'var(--color-primary, #df7e30)',
      bgBadge: 'rgba(223, 126, 48, 0.12)',
      textBadge: 'var(--color-primary, #df7e30)',
    },
    loading: {
      role: 'Async Lifecycle In Flight',
      roleId: 'Operasi Asinkron',
      dotColor: 'var(--indigo-500, #6366f1)',
      bgBadge: 'rgba(99, 102, 241, 0.12)',
      textBadge: '#6366f1',
    },
    default: {
      role: 'Neutral Status Update',
      roleId: 'Status Netral Umum',
      dotColor: 'var(--color-text-secondary)',
      bgBadge: 'rgba(107, 114, 128, 0.12)',
      textBadge: 'var(--color-text-secondary)',
    },
  };

  // Surface metadata for 4-surface gallery
  const surfaceMeta: Record<
    ToastStyleVariant,
    {
      name: string;
      featureId: string;
      featureEn: string;
      descId: string;
      descEn: string;
    }
  > = {
    subtle: {
      name: 'Subtle',
      featureId: 'Transparan · Lembut',
      featureEn: 'Translucent · Soft Tint',
      descId: 'Permukaan transparan dengan saturasi lembut.',
      descEn: 'Translucent surface with soft color saturation.',
    },
    filled: {
      name: 'Solid',
      featureId: 'Pekat · Kontras Tinggi',
      featureEn: 'High Contrast · Bold Fill',
      descId: 'Latar belakang solid berkontras tinggi.',
      descEn: 'High-contrast bold semantic fill background.',
    },
    outline: {
      name: 'Outline',
      featureId: 'Kontur Garis · Minimalis',
      featureEn: 'Border Stroke · Minimalist',
      descId: 'Kontur batas garis tegas minimalis.',
      descEn: 'Crisp clean minimalist border contour.',
    },
    glass: {
      name: 'Glassmorphism',
      featureId: 'Kaca Buram · Backdrop Blur',
      featureEn: 'Frosted Glass · Aero Blur',
      descId: 'Efek kaca blur modern transparan.',
      descEn: 'Modern frosted glass with smooth backdrop blur.',
    },
  };

  // Robust live screen test trigger
  const handleTestLive = (v: ToastVariant) => {
    setLastTriggeredVariant(v);
    setTimeout(() => {
      setLastTriggeredVariant((prev) => (prev === v ? null : prev));
    }, 1800);

    if (v === 'loading') {
      const id = toast.loading(
        isId
          ? 'Sedang menyinkronkan data perubahan ke cloud server...'
          : 'Synchronizing record changes with cloud server...',
        {
          title: isId ? 'Memproses Permintaan' : 'Processing Request',
          styleVariant: matrixStyle,
          size: matrixSize,
          placement: 'bottom-right',
        }
      );
      setTimeout(() => {
        toast.success(
          isId
            ? 'Sinkronisasi berhasil! Semua perubahan tersimpan.'
            : 'Synchronization succeeded! All changes saved.',
          {
            id,
            title: isId ? 'Selesai' : 'Completed',
            styleVariant: matrixStyle,
            size: matrixSize,
            duration: 4000,
          }
        );
      }, 2500);
    } else {
      toast({
        variant: v,
        title: variantLabel[v],
        description: variantDesc[v],
        styleVariant: matrixStyle,
        size: matrixSize,
        placement: 'bottom-right',
        duration: 4500,
        dismissible: true,
        showProgress: true,
        action: {
          label: isId ? 'Tinjau' : 'Review',
          onClick: () => {
            toast.info(
              isId
                ? `Aksi interaktif notifikasi ${variantLabel[v]} telah dijalankan.`
                : `Interactive action for ${variantLabel[v]} toast executed.`,
              { placement: 'bottom-right', duration: 3000 }
            );
          },
        },
      });
    }
  };

  // Robust live test trigger for 4-surface gallery
  const handleTestStyleLive = (st: ToastStyleVariant) => {
    setLastTriggeredStyle(st);
    setTimeout(() => {
      setLastTriggeredStyle((prev) => (prev === st ? null : prev));
    }, 1800);

    const styleLabels: Record<ToastStyleVariant, { nameId: string; nameEn: string; descId: string; descEn: string }> = {
      subtle: {
        nameId: 'Subtle',
        nameEn: 'Subtle',
        descId: 'Notifikasi gaya Subtle dengan saturasi warna lembut aktif di layar.',
        descEn: 'Subtle surface notification with soft saturation activated on screen.',
      },
      filled: {
        nameId: 'Solid',
        nameEn: 'Solid',
        descId: 'Notifikasi gaya Solid dengan latar berkontras tinggi aktif di layar.',
        descEn: 'Solid surface notification with high-contrast fill activated on screen.',
      },
      outline: {
        nameId: 'Outline',
        nameEn: 'Outline',
        descId: 'Notifikasi gaya Outline dengan kontur batas tegas aktif di layar.',
        descEn: 'Outline surface notification with crisp border contour activated on screen.',
      },
      glass: {
        nameId: 'Glassmorphism',
        nameEn: 'Glassmorphism',
        descId: 'Notifikasi gaya Glassmorphism dengan efek kaca blur modern aktif di layar.',
        descEn: 'Glassmorphism surface notification with frosted backdrop blur activated on screen.',
      },
    };

    const info = styleLabels[st];

    toast({
      variant: 'brand',
      styleVariant: st,
      size: 'md',
      title: isId ? `Gaya ${info.nameId} Aktif` : `${info.nameEn} Style Triggered`,
      description: isId ? info.descId : info.descEn,
      duration: 4500,
      placement: 'bottom-right',
      showProgress: true,
      action: {
        label: isId ? 'Tutup' : 'Dismiss',
        onClick: () => {},
      },
    });
  };

  // Scenario 1: Trigger Promise Toast
  const handleSimulatePromise = async () => {
    if (isPromiseLoading) return;
    setIsPromiseLoading(true);

    const fakeAsyncProcess = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.15) {
          resolve(
            isId
              ? 'Deployment v2.4.0 aktif di produksi (AWS ap-southeast-1).'
              : 'Deployment v2.4.0 live in production (AWS us-east-1).'
          );
        } else {
          reject(new Error(isId ? 'Ping healthcheck gagal setelah 3000ms.' : 'Healthcheck ping timed out after 3000ms.'));
        }
      }, 2500);
    });

    try {
      await toast.promise(fakeAsyncProcess, {
        loading: {
          title: isId ? 'Mempublikasikan Rilis' : 'Deploying Release',
          description: isId ? 'Membangun bundle dan menyinkronkan pod...' : 'Building assets and syncing microservice pods…',
          placement: 'top-right',
        },
        success: (msg) => ({
          title: isId ? 'Deployment Berhasil' : 'Deployment Succeeded',
          description: msg,
          placement: 'top-right',
          action: {
            label: isId ? 'Lihat Log' : 'View Logs',
            onClick: () => window.open('https://github.com', '_blank'),
          },
        }),
        error: (err) => ({
          title: isId ? 'Deployment Gagal' : 'Deployment Failed',
          description: err.message,
          placement: 'top-right',
        }),
      });
    } finally {
      setIsPromiseLoading(false);
    }
  };

  // Scenario 2: Simulate Record Delete & Undo
  const handleDeleteRecord = (id: string) => {
    const target = records.find((r) => r.id === id);
    if (!target) return;

    setRecords((prev) => prev.filter((r) => r.id !== id));

    toast.warning({
      title: isId ? 'Data Pengguna Dihapus' : 'User Record Removed',
      description: isId
        ? `"${target.name}" telah dihapus dari daftar tim.`
        : `"${target.name}" has been removed from the roster.`,
      placement: 'bottom-left',
      duration: 6000,
      showProgress: true,
      action: {
        label: isId ? 'Batalkan (Undo)' : 'Undo Action',
        onClick: () => {
          setRecords((prev) => [...prev, target]);
          toast.success(
            isId
              ? `"${target.name}" berhasil dipulihkan!`
              : `Restored "${target.name}" successfully!`,
            { placement: 'bottom-left' }
          );
        },
      },
    });
  };

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.toast?.pageTitle || 'Toast'}</h1>
            <p className="page-subtitle">{t.toast?.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setTab('guideline')}
          >
            {gl?.tabName || (isId ? 'Panduan' : 'Guideline')}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setTab('playbook')}
          >
            {gl?.playbookTabName || 'Playbook'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1 – GUIDELINE
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">
          {/* ── 1. Overview & Specification Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">{gl?.overviewTitle || 'Overview'}</h2>
            <p className="section-description">{gl?.overviewDesc}</p>

            <div className="badge-spec-card">
              <div
                className="badge-spec-header"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  alignItems: 'stretch',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div className="badge-spec-title">
                      {gl?.overviewToastHeading || 'Toast Specification Matrix'}
                    </div>
                    <div className="badge-spec-subtitle">
                      {gl?.overviewSubtitle ||
                        '7 Semantic Variants × 4 Surface Styles × 3 Size Scales — Auto-dismiss & Action Triggers'}
                    </div>
                  </div>

                  {/* Dismiss all active toasts button */}
                  <NeuronButton
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      toast.dismiss();
                    }}
                  >
                    {isId ? 'Bersihkan Semua Toast' : 'Clear All Toasts'}
                  </NeuronButton>
                </div>

                {/* Dual Responsive Control Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md, 8px)',
                    background: 'var(--color-bg-subtle, rgba(0,0,0,0.02))',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Style Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Gaya Permukaan:' : 'Surface Style:'}
                    </span>
                    {(['subtle', 'filled', 'outline', 'glass'] as const).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setMatrixStyle(style)}
                        className={`accordion-anatomy-nav-chip ${matrixStyle === style ? 'is-active' : ''}`}
                        style={{ fontSize: '11.5px', textTransform: 'capitalize', padding: '4px 10px' }}
                      >
                        {style === 'filled' ? (isId ? 'Solid / Filled' : 'Solid / Filled') : style}
                      </button>
                    ))}
                  </div>

                  {/* Size Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Ukuran:' : 'Size:'}
                    </span>
                    {(['sm', 'md', 'lg'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setMatrixSize(sz)}
                        className={`accordion-anatomy-nav-chip ${matrixSize === sz ? 'is-active' : ''}`}
                        style={{ fontSize: '11.5px', padding: '4px 10px' }}
                      >
                        {sz === 'sm' ? 'sm (Compact)' : sz === 'md' ? 'md (Default)' : 'lg (Expanded)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Master Matrix Table with zero horizontal overflow */}
              <div className="badge-spec-table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table className="badge-matrix-table" style={{ width: '100%', minWidth: '680px', tableLayout: 'auto' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '22%', minWidth: '160px', padding: '12px 14px' }}>
                        {isId ? 'Varian & Peran Semantik' : 'Variant & Semantic Role'}
                      </th>
                      <th style={{ width: '60%', minWidth: '340px', padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>{isId ? 'Pratinjau Komponen Langsung' : 'Live Component Preview'}</span>
                          <span style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'none' }}>
                            ({matrixStyle} · {matrixSize})
                          </span>
                        </div>
                      </th>
                      <th style={{ width: '18%', minWidth: '130px', textAlign: 'center', padding: '12px 14px' }}>
                        {isId ? 'Uji Layar Nyata' : 'Real Screen Test'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_VARIANTS.map((v) => {
                      const meta = variantMeta[v];
                      const isTriggered = lastTriggeredVariant === v;

                      return (
                        <tr key={v}>
                          {/* 1. Variant Info */}
                          <td style={{ verticalAlign: 'middle', padding: '14px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                  className="badge-theme-dot"
                                  style={{
                                    backgroundColor: meta.dotColor,
                                    boxShadow: `0 0 8px ${meta.dotColor}40`,
                                  }}
                                />
                                <span style={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '13.5px' }}>
                                  {variantLabel[v]}
                                </span>
                              </div>
                              <span
                                style={{
                                  display: 'inline-block',
                                  fontSize: '10px',
                                  fontWeight: 600,
                                  padding: '2px 7px',
                                  borderRadius: 'var(--radius-sm, 4px)',
                                  backgroundColor: meta.bgBadge,
                                  color: meta.textBadge,
                                  width: 'fit-content',
                                }}
                              >
                                {isId ? meta.roleId : meta.role}
                              </span>
                            </div>
                          </td>

                          {/* 2. Interactive Preview */}
                          <td style={{ verticalAlign: 'middle', padding: '14px', whiteSpace: 'normal' }}>
                            <div style={{ width: '100%', maxWidth: '440px', whiteSpace: 'normal' }}>
                              <NeuronToast
                                variant={v}
                                styleVariant={matrixStyle}
                                size={matrixSize}
                                title={variantLabel[v]}
                                description={variantDesc[v]}
                                dismissible={true}
                                preventDismiss={true}
                                duration={0}
                                showProgress={true}
                                action={{
                                  label: isId ? 'Lihat' : 'View',
                                  onClick: () => {
                                    toast.info(
                                      isId
                                        ? `Aksi inline pada kartu ${variantLabel[v]} diklik.`
                                        : `Inline action on ${variantLabel[v]} card clicked.`,
                                      { placement: 'bottom-right', duration: 3000 }
                                    );
                                  },
                                }}
                              />
                            </div>
                          </td>

                          {/* 3. Live Screen Test Button */}
                          <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '14px' }}>
                            <NeuronButton
                              size="sm"
                              variant={isTriggered ? 'primary' : 'outline'}
                              onClick={() => handleTestLive(v)}
                              style={{ minWidth: '108px', transition: 'all 0.2s ease' }}
                            >
                              {isTriggered ? (
                                <>
                                  <Check size={13} style={{ marginRight: 5 }} />
                                  {isId ? 'Terkirim!' : 'Triggered!'}
                                </>
                              ) : (
                                <>
                                  <Play size={12} style={{ marginRight: 5 }} />
                                  {isId ? 'Uji Live' : 'Test Live'}
                                </>
                              )}
                            </NeuronButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 4-Surface Themes Comparison Gallery */}
              <div
                style={{
                  marginTop: 'var(--space-5, 24px)',
                  paddingTop: 'var(--space-4, 18px)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                {/* Gallery Header */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginBottom: 'var(--space-3, 14px)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Komparasi 4 Gaya Permukaan (Surface Styles)' : '4-Surface Themes Gallery Comparison'}
                      </h4>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 600,
                          padding: '2px 7px',
                          borderRadius: 'var(--radius-sm, 4px)',
                          backgroundColor: 'rgba(223, 126, 48, 0.12)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        4 Styles
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {isId
                        ? 'Bandingkan perlakuan opasitas, batas border, dan saturasi warna di seluruh gaya permukaan yang didukung.'
                        : 'Compare opacity, border treatment, and backdrop filtration across all supported Neudela surface styles.'}
                    </p>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                    {isId ? '💡 Klik kartu untuk mengubah gaya tabel di atas' : '💡 Click a card to set the table style above'}
                  </span>
                </div>

                {/* 4-Column Balanced Gallery Grid */}
                <div className="neuron-toast-surface-gallery">
                  {ALL_STYLES.map((st) => {
                    const meta = surfaceMeta[st];
                    const isActive = matrixStyle === st;
                    const isTriggered = lastTriggeredStyle === st;

                    return (
                      <div
                        key={st}
                        className={`neuron-toast-surface-card ${isActive ? 'neuron-toast-surface-card--active' : ''}`}
                        onClick={() => setMatrixStyle(st)}
                      >
                        {/* Card Top Row: Label & Active / Select Pill */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                              {meta.name}
                            </div>
                            <div style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--color-text-tertiary)', marginTop: 1 }}>
                              {isId ? meta.featureId : meta.featureEn}
                            </div>
                          </div>

                          {isActive ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: '10.5px',
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: '999px',
                                backgroundColor: 'var(--color-primary)',
                                color: '#ffffff',
                                boxShadow: '0 2px 6px rgba(223, 126, 48, 0.25)',
                                flexShrink: 0,
                              }}
                            >
                              <Check size={10} strokeWidth={3} />
                              {isId ? 'Aktif' : 'Active'}
                            </span>
                          ) : (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontSize: '10.5px',
                                fontWeight: 500,
                                padding: '2px 8px',
                                borderRadius: '999px',
                                backgroundColor: 'var(--color-bg-subtle, #f3f4f6)',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid var(--color-border)',
                                flexShrink: 0,
                              }}
                            >
                              {isId ? 'Pilih' : 'Select'}
                            </span>
                          )}
                        </div>

                        {/* Interactive Preview Stage */}
                        <div className="neuron-toast-surface-preview-stage">
                          <div style={{ width: '100%' }}>
                            <NeuronToast
                              variant="brand"
                              styleVariant={st}
                              size="sm"
                              title={`${meta.name} Surface`}
                              description={isId ? meta.descId : meta.descEn}
                              dismissible={false}
                              preventDismiss={true}
                              duration={0}
                            />
                          </div>
                        </div>

                        {/* Live Screen Trigger Button */}
                        <NeuronButton
                          size="xs"
                          variant={isTriggered ? 'primary' : 'outline'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestStyleLive(st);
                          }}
                          style={{
                            width: '100%',
                            marginTop: 'auto',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {isTriggered ? (
                            <>
                              <Check size={11} style={{ marginRight: 4 }} />
                              {isId ? '✓ Terkirim!' : '✓ Triggered!'}
                            </>
                          ) : (
                            <>
                              <Play size={11} style={{ marginRight: 4 }} />
                              {isId ? `Uji Live ${meta.name}` : `Test Live ${meta.name}`}
                            </>
                          )}
                        </NeuronButton>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. Toast vs. Alert vs. Modal Comparison ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.comparisonTitle || '1. Toast vs. Alert vs. Modal'}
            </h2>
            <p className="section-description">
              {gl?.comparisonDesc ||
                'Selecting the optimal feedback mechanism based on workflow disruption and user attention urgency.'}
            </p>

            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{isId ? 'Komponen Feedback' : 'Feedback Component'}</th>
                    <th>{isId ? 'Posisi & Layer Visual' : 'Placement & Visual Layer'}</th>
                    <th>{isId ? 'Siklus Hidup (Lifecycle)' : 'Lifecycle & Dismissal'}</th>
                    <th>{isId ? 'Tingkat Gangguan (Intrusiveness)' : 'User Disruption Level'}</th>
                    <th>{isId ? 'Penggunaan Rekomendasi' : 'Recommended Use Cases'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(223, 126, 48, 0.04)' }}>
                    <td>
                      <strong style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span>🍞</span> NeuronToast
                      </strong>
                    </td>
                    <td>
                      {isId
                        ? 'Floating Overlay di sudut layar (portal non-blocking)'
                        : 'Floating Overlay in viewport corners (non-blocking portals)'}
                    </td>
                    <td>
                      {isId
                        ? 'Sementara: Auto-dismiss 3–6 detik atau swipe gesture'
                        : 'Transient: Auto-dismiss 3–6 seconds or swipe gesture'}
                    </td>
                    <td>
                      <NeuronBadge size="xs" variant="brand">
                        {isId ? 'Rendah (Non-blocking)' : 'Low (Non-blocking)'}
                      </NeuronBadge>
                    </td>
                    <td>
                      {isId
                        ? 'Konfirmasi simpan data, salin URL ke clipboard, pembaruan proses latar belakang.'
                        : 'Save confirmations, copied link to clipboard, background sync updates.'}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span>📢</span> NeuronAlert
                      </strong>
                    </td>
                    <td>
                      {isId
                        ? 'Inline Dokumen (terpasang statis di dalam kartu atau form)'
                        : 'Inline Document (static in-flow inside form or section container)'}
                    </td>
                    <td>
                      {isId
                        ? 'Persisten: Menetap hingga kondisi/error diperbaiki atau di-dismiss'
                        : 'Persistent: Remains until issue is resolved or explicitly dismissed'}
                    </td>
                    <td>
                      <NeuronBadge size="xs" variant="warning">
                        {isId ? 'Sedang (In-flow Context)' : 'Medium (In-flow Context)'}
                      </NeuronBadge>
                    </td>
                    <td>
                      {isId
                        ? 'Peringatan akun kedaluwarsa, error validasi section form, panduan konteks halaman.'
                        : 'Expiring license warnings, section-level form validation, page context banners.'}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span>🪟</span> NeuronModal
                      </strong>
                    </td>
                    <td>
                      {isId
                        ? 'Modal Backdrop Dialog di tengah layar (memblokir seluruh halaman)'
                        : 'Modal Dialog with backdrop overlay (blocks entire application view)'}
                    </td>
                    <td>
                      {isId
                        ? 'Wajib Interaksi: User harus mengklik tombol Konfirmasi atau Batal'
                        : 'Mandatory: Requires explicit user action (Confirm / Cancel button)'}
                    </td>
                    <td>
                      <NeuronBadge size="xs" variant="error">
                        {isId ? 'Tinggi (Full Blocking)' : 'High (Full Blocking)'}
                      </NeuronBadge>
                    </td>
                    <td>
                      {isId
                        ? 'Konfirmasi hapus permanen akun/database, checkout pembayaran, form krusial berjenjang.'
                        : 'Permanent deletion confirmations, financial checkouts, multi-step critical wizards.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 3. Component Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.anatomyTitle || '3. Component Anatomy'}
            </h2>
            <p className="section-description">
              {gl?.anatomyDesc ||
                'Engineered with optimized visual hierarchy, concise copy density, action buttons, and ARIA live regions.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(320px, 460px) 1fr',
                gap: 'var(--space-8)',
                alignItems: 'center',
                marginTop: 'var(--space-6)',
              }}
            >
              {/* Visual Annotated Card */}
              <div
                style={{
                  padding: 'var(--space-6)',
                  background: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px dashed var(--color-border)',
                }}
              >
                <NeuronToast
                  variant="success"
                  styleVariant="subtle"
                  title="Link Copied to Clipboard"
                  description="Shareable URL ready with permission: Anyone with link."
                  action={{ label: 'Shorten URL', onClick: () => {} }}
                  cancel={{ label: 'Dismiss' }}
                  showProgress
                  duration={0}
                  preventDismiss={true}
                />
              </div>

              {/* Anatomy Labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <AnatomyLabel
                  number={1}
                  label={isId ? 'Ikon Semantik Depan (Leading Icon)' : 'Semantic Leading Icon'}
                  desc={
                    isId
                      ? 'Ikon SVG yang merefleksikan status aksi seketika (CheckCircle2, AlertTriangle, AlertCircle, Info, Loader2).'
                      : 'Semantic glyph providing immediate visual status reinforcement (Check, Alert, Info, Loader).'
                  }
                />
                <AnatomyLabel
                  number={2}
                  label={isId ? 'Judul & Deskripsi Kontekstual' : 'Title & Contextual Copy'}
                  desc={
                    isId
                      ? 'Judul tebal ringkas yang mengonfirmasi tindakan, diikuti deskripsi 1-2 baris kalimat padat tanpa kata berlebih.'
                      : 'Bold scannable title followed by concise 1-2 line body copy without technical noise.'
                  }
                />
                <AnatomyLabel
                  number={3}
                  label={isId ? 'Tombol Aksi Inline (Primary Action CTA)' : 'Inline Action CTA Button'}
                  desc={
                    isId
                      ? 'Tombol kontekstual seperti "Undo", "Lihat Rincian", atau "Retry" untuk tindakan instan.'
                      : 'Optional primary CTA button such as "Undo", "View Receipt", or "Retry".'
                  }
                />
                <AnatomyLabel
                  number={4}
                  label={isId ? 'Tombol Tutup Aksesibel ([✕] Dismiss)' : 'Accessible Dismiss Button ([✕])'}
                  desc={
                    isId
                      ? 'Tombol tutup standar yang mendukung interaksi keyboard (Enter/Space) dan pembaca layar.'
                      : 'Keyboard-focusable [✕] button triggering smooth exit collapse animation.'
                  }
                />
                <AnatomyLabel
                  number={5}
                  label={isId ? 'Bilah Progres Hitung Mundur (Countdown Progress)' : 'Countdown Progress Track'}
                  desc={
                    isId
                      ? 'Animasi garis tipis yang menyusut sesuai sisa durasi sebelum toast menghilang secara otomatis.'
                      : 'Animated shrinking bar reflecting remaining duration countdown before automatic dismissal.'
                  }
                />
              </div>
            </div>
          </div>

          {/* ── 4. Viewport Placements ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.placementsTitle || '4. Viewport Placements'}
            </h2>
            <p className="section-description">
              {gl?.placementsDesc ||
                'Six anchor portals positioned across viewport corners and edges to match user gaze and application layout.'}
            </p>

            <div
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-subtle)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-4)',
                  minHeight: '220px',
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  background: 'var(--color-bg-surface)',
                }}
              >
                {ALL_PLACEMENTS.map((placement) => (
                  <div
                    key={placement}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems:
                        placement.includes('left')
                          ? 'flex-start'
                          : placement.includes('right')
                          ? 'flex-end'
                          : 'center',
                      justifyContent: placement.startsWith('top') ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <NeuronButton
                      size="xs"
                      variant="outline"
                      onClick={() => {
                        toast.info(
                          isId
                            ? `Toast berhasil muncul di jangkar portal ${placement}.`
                            : `Toast rendered successfully at ${placement} portal.`,
                          {
                            title: `Portal: ${placement}`,
                            placement,
                            duration: 3500,
                          }
                        );
                      }}
                    >
                      <Play size={11} style={{ marginRight: 4 }} />
                      <code>{placement}</code>
                    </NeuronButton>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-tertiary)',
                  marginTop: 'var(--space-3)',
                  textAlign: 'center',
                }}
              >
                {isId
                  ? 'Klik salah satu tombol posisi di atas untuk langsung menguji toast pada kuadran layar bersangkutan.'
                  : 'Click any quadrant button above to test real floating toasts anchored at that screen coordinate.'}
              </p>
            </div>
          </div>

          {/* ── 5. Size Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? '5. Panduan Ukuran & Skala' : '5. Size Scale Guidelines'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Tiga skala ukuran untuk menyesuaikan densitas antarmuka dan tingkat kekayaan konten pesan.'
                : 'Three standardized size scales to balance interface information density with copy length.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <SizeGuideRow
                size="sm"
                label={t.toast?.small || 'Small (sm)'}
                usage={
                  isId
                    ? 'Konfirmasi cepat satu kalimat: "Tersimpan", "Tautan disalin", atau update status kompak.'
                    : 'Quick single-sentence confirmations: "Saved", "Link copied", or compact status hints.'
                }
                variant="success"
              />
              <SizeGuideRow
                size="md"
                label={t.toast?.medium || 'Medium (md)'}
                usage={
                  isId
                    ? 'Ukuran default standar untuk 90% notifikasi aplikasi dengan judul dan kalimat penjelasan.'
                    : 'Standard default size for 90% of notifications with title and explanatory body copy.'
                }
                variant="info"
              />
              <SizeGuideRow
                size="lg"
                label={t.toast?.large || 'Large (lg)'}
                usage={
                  isId
                    ? 'Notifikasi berbobot tinggi yang memuat tombol aksi inline, teks rincian teknis, atau aksi Undo.'
                    : 'High-prominence notifications featuring inline action CTAs, multi-line context, or Undo.'
                }
                variant="brand"
              />
            </div>
          </div>

          {/* ── 6. Best Practice Rules (Do & Don't) ── */}
          <div className="section-card">
            <h2 className="section-title">{gl?.rulesTitle || "6. Do's and Don'ts"}</h2>
            <p className="section-description">{gl?.rulesDesc}</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-4)',
              }}
            >
              <RuleCard type="do">
                <p>
                  <strong>{isId ? 'Gunakan pesan singkat & informatif:' : 'Keep messages concise & scannable:'}</strong>{' '}
                  {isId
                    ? 'Tuliskan konfirmasi aksi dalam 1 kalimat ringkas (maksimal 15-20 kata). User harus dapat memahaminya dalam 2 detik.'
                    : 'Limit body copy to 15-20 words maximum. Users must grasp the notification outcome in under 2 seconds.'}
                </p>
              </RuleCard>
              <RuleCard type="dont">
                <p>
                  <strong>{isId ? 'Jangan tampilkan stacktrace teknis:' : "Don't display raw error logs:"}</strong>{' '}
                  {isId
                    ? 'Hindari mencantumkan stacktrace kode atau query database ke dalam toast. Sajikan bahasa manusia yang ramah bagi pengguna.'
                    : 'Never dump code stacktraces or raw HTTP JSON errors in toasts. Translate issues into human-friendly language.'}
                </p>
              </RuleCard>
              <RuleCard type="do">
                <p>
                  <strong>{isId ? 'Sediakan tombol "Undo" pada aksi destruktif:' : 'Provide instant "Undo" for deletions:'}</strong>{' '}
                  {isId
                    ? 'Beri kesempatan user membatalkan penghapusan data secara instan dengan durasi toast minimal 6 detik.'
                    : 'Give users a 6-second grace period with an inline "Undo" button instead of blocking them with confirmation dialogs.'}
                </p>
              </RuleCard>
              <RuleCard type="dont">
                <p>
                  <strong>{isId ? 'Jangan auto-dismiss error kritis:' : "Don't auto-dismiss critical errors:"}</strong>{' '}
                  {isId
                    ? 'Error fatal yang membutuhkan tindakan perbaikan user wajib menggunakan duration: 0 (persisten) atau dialihkan ke Alert/Modal.'
                    : 'Critical errors requiring user remediation must use duration: 0 (persistent) or escalate to an in-page Alert / Modal.'}
                </p>
              </RuleCard>
              <RuleCard type="do">
                <p>
                  <strong>{isId ? 'Hentikan timer saat kursor diarahkan:' : 'Pause countdown timer on hover:'}</strong>{' '}
                  {isId
                    ? 'Pastikan pauseOnHover aktif agar pengguna yang sedang membaca atau mengarahkan pointer ke toast tidak kehilangan pesan.'
                    : 'Always keep pauseOnHover=true so users reading detailed notifications or aiming at action buttons are not interrupted.'}
                </p>
              </RuleCard>
              <RuleCard type="dont">
                <p>
                  <strong>{isId ? 'Jangan menumpuk terlalu banyak toast:' : "Don't flood the viewport:"}</strong>{' '}
                  {isId
                    ? 'Batasi jumlah toast aktif maksimal 3-4 buah sekaligus untuk mencegah kejenuhan visual dan menutupi konten penting.'
                    : 'Limit active toast portals to 3-4 simultaneous notifications to prevent visual fatigue and obscured layout content.'}
                </p>
              </RuleCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2 – PLAYBOOK
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">
          {/* ── 1. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">Interactive Playground</h2>
            <p className="section-description">
              {isId
                ? 'Uji coba seluruh kombinasi varian semantik, gaya visual, ukuran, durasi, dan tombol aksi secara real-time. Salin kode siap pakai untuk React, Vue 3, atau HTML/CSS.'
                : 'Customize toast props in real-time, test reactive behaviors, and copy production-ready code for React, Vue 3, or HTML/CSS.'}
            </p>

            <Playground
              name="NeuronToast"
              defaultTab="react"
              knobs={[
                {
                  name: 'variant',
                  type: 'select',
                  options: ALL_VARIANTS,
                  default: 'success',
                  label: isId ? 'Varian Semantik' : 'Semantic Variant',
                },
                {
                  name: 'styleVariant',
                  type: 'select',
                  options: ALL_STYLES,
                  default: 'subtle',
                  label: isId ? 'Gaya Permukaan' : 'Style Theme',
                },
                {
                  name: 'size',
                  type: 'select',
                  options: ALL_SIZES,
                  default: 'md',
                  label: isId ? 'Ukuran' : 'Size Scale',
                },
                {
                  name: 'placement',
                  type: 'select',
                  options: ALL_PLACEMENTS,
                  default: 'bottom-right',
                  label: isId ? 'Posisi Layar' : 'Screen Placement',
                },
                {
                  name: 'title',
                  type: 'text',
                  default: t.toast?.knobTitle || 'Payment Processed',
                  label: isId ? 'Judul' : 'Title',
                },
                {
                  name: 'description',
                  type: 'text',
                  default: t.toast?.knobDescription || 'Transaction #84920 completed successfully.',
                  label: isId ? 'Deskripsi' : 'Description',
                },
                {
                  name: 'showProgress',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Bilah Progres Timer' : 'Show Progress Bar',
                },
                {
                  name: 'showAction',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Tombol Aksi Inline' : 'Show Action Button',
                },
                {
                  name: 'actionText',
                  type: 'text',
                  default: t.toast?.knobActionText || 'View Receipt',
                  label: isId ? 'Teks Aksi' : 'Action Text',
                  condition: (s) => !!s.showAction,
                },
                {
                  name: 'dismissible',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Tombol Tutup [✕]' : 'Dismissible ([✕])',
                },
                {
                  name: 'pauseOnHover',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Jeda Saat Hover' : 'Pause on Hover',
                },
              ]}
              codeTemplates={(knobs) => {
                const variant = knobs.variant as ToastVariant;
                const styleVariant = knobs.styleVariant as ToastStyleVariant;
                const size = knobs.size as ToastSize;
                const placement = knobs.placement as ToastPlacement;
                const title = knobs.title as string;
                const description = knobs.description as string;
                const showProgress = !!knobs.showProgress;
                const showAction = !!knobs.showAction;
                const actionText = (knobs.actionText as string) || 'View Receipt';
                const dismissible = !!knobs.dismissible;
                const pauseOnHover = !!knobs.pauseOnHover;

                const reactOpts: string[] = [];
                if (title) reactOpts.push(`title: '${title}'`);
                if (description) reactOpts.push(`description: '${description}'`);
                if (variant !== 'default') reactOpts.push(`variant: '${variant}'`);
                if (styleVariant !== 'subtle') reactOpts.push(`styleVariant: '${styleVariant}'`);
                if (size !== 'md') reactOpts.push(`size: '${size}'`);
                if (placement !== 'bottom-right') reactOpts.push(`placement: '${placement}'`);
                if (showProgress) reactOpts.push('showProgress: true');
                if (!dismissible) reactOpts.push('dismissible: false');
                if (!pauseOnHover) reactOpts.push('pauseOnHover: false');
                if (showAction) {
                  reactOpts.push(
                    `action: { label: '${actionText}', onClick: () => console.log('Action clicked') }`
                  );
                }

                const vueOpts: string[] = [...reactOpts];

                return {
                  react: `import { toast, NeuronButton } from 'neudela';

export default function ToastDemo() {
  const triggerNotification = () => {
    toast({
      ${reactOpts.join(',\n      ')}
    });
  };

  return (
    <NeuronButton variant="primary" onClick={triggerNotification}>
      Trigger Toast
    </NeuronButton>
  );
}`,
                  vue: `<template>
  <NeuronButton @click="showToast" variant="primary">
    Trigger Toast
  </NeuronButton>
</template>

<script setup lang="ts">
import { useToast, NeuronButton } from '@neudela/vue';

const { toast } = useToast();

const showToast = () => {
  toast({
    ${vueOpts.join(',\n    ')}
  });
};
</script>`,
                  html: `<!-- Neudela Toast Notification (${variant}, ${styleVariant}, ${size}) -->
<div
  role="${variant === 'error' ? 'alert' : 'status'}"
  aria-live="${variant === 'error' ? 'assertive' : 'polite'}"
  class="neuron-toast neuron-toast--${variant} neuron-toast--${styleVariant} neuron-toast--${size} neuron-toast--entering"
>
  <div class="neuron-toast__icon-wrap">
    <span class="neuron-toast__icon">●</span>
  </div>
  <div class="neuron-toast__content">
    ${title ? `<div class="neuron-toast__title">${title}</div>` : ''}
    <div class="neuron-toast__description">${description}</div>
    ${
      showAction
        ? `<div class="neuron-toast__actions">
      <button type="button" class="neuron-toast__action-btn">${actionText}</button>
    </div>`
        : ''
    }
  </div>
  ${
    dismissible
      ? `<button type="button" class="neuron-toast__close-btn" aria-label="Close">✕</button>`
      : ''
  }
  ${
    showProgress
      ? `<div class="neuron-toast__progress-track">
    <div class="neuron-toast__progress-bar" style="width: 100%;"></div>
  </div>`
      : ''
  }
</div>`,
                };
              }}
            >
              {(knobs) => {
                const variant = knobs.variant as ToastVariant;
                const styleVariant = knobs.styleVariant as ToastStyleVariant;
                const size = knobs.size as ToastSize;
                const placement = knobs.placement as ToastPlacement;
                const title = knobs.title as string;
                const description = knobs.description as string;
                const showProgress = !!knobs.showProgress;
                const showAction = !!knobs.showAction;
                const actionText = (knobs.actionText as string) || 'View Receipt';
                const dismissible = !!knobs.dismissible;
                const pauseOnHover = !!knobs.pauseOnHover;

                return (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-6)',
                      padding: 'var(--space-4)',
                    }}
                  >
                    <NeuronToast
                      title={title || undefined}
                      description={description}
                      variant={variant}
                      styleVariant={styleVariant}
                      size={size}
                      duration={0}
                      dismissible={dismissible}
                      showProgress={showProgress}
                      pauseOnHover={pauseOnHover}
                      action={
                        showAction
                          ? {
                              label: actionText,
                              onClick: () => {
                                toast.info(
                                  isId ? `Aksi "${actionText}" diklik!` : `Action "${actionText}" clicked!`
                                );
                              },
                            }
                          : undefined
                      }
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <NeuronButton
                        variant="primary"
                        size="md"
                        onClick={() => {
                          toast({
                            title: title || undefined,
                            description,
                            variant,
                            styleVariant,
                            size,
                            placement,
                            duration: 4500,
                            dismissible,
                            showProgress,
                            pauseOnHover,
                            action: showAction
                              ? {
                                  label: actionText,
                                  onClick: () => {
                                    toast.info(
                                      isId
                                        ? `Aksi "${actionText}" diklik!`
                                        : `Action "${actionText}" clicked!`
                                    );
                                  },
                                }
                              : undefined,
                          });
                        }}
                      >
                        <Play size={14} style={{ marginRight: 6 }} />
                        {isId ? 'Tembakkan Toast ke Layar' : 'Trigger Live Floating Toast'}
                      </NeuronButton>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Target posisi layar: ' : 'Target screen quadrant: '}
                        <strong>{placement}</strong>
                      </span>
                    </div>
                  </div>
                );
              }}
            </Playground>
          </div>

          {/* ── 2. Real-World Scenario 1: Async Promise Lifecycle ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId
                ? '2. Pola Enterprise 1: Alur Kerja Asinkronus (Promise)'
                : '2. Enterprise Pattern 1: Asynchronous Promise Workflow'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Gunakan `toast.promise()` untuk memantau operasi latar belakang berdurasi panjang. Toast otomatis menampilkan spinner loading, lalu bertransisi mulus menjadi sukses atau error.'
                : 'Use `toast.promise()` to monitor background tasks. Automatically displays an animated loading spinner, then seamlessly transforms into success or error state.'}
            </p>

            <div
              style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-4)',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                  {isId ? 'Deployment Pipeline Produksi' : 'Production Pipeline Deployment'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  {isId
                    ? 'Simulasi panggilan API selama 2.5 detik dengan transisi status otomatis.'
                    : 'Simulates a 2.5-second async handshake with automated state transitions.'}
                </div>
              </div>

              <NeuronButton
                variant="primary"
                onClick={handleSimulatePromise}
                disabled={isPromiseLoading}
              >
                {isPromiseLoading ? (
                  <>
                    <Loader2 size={14} className="neuron-toast__icon--spin" style={{ marginRight: 6 }} />
                    {isId ? 'Sedang Deploy...' : 'Deploying...'}
                  </>
                ) : (
                  <>
                    <Save size={14} style={{ marginRight: 6 }} />
                    {isId ? 'Deploy Microservice v2.4.0' : 'Deploy Microservice v2.4.0'}
                  </>
                )}
              </NeuronButton>
            </div>
          </div>

          {/* ── 3. Real-World Scenario 2: Destructive Action with Instant Undo ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId
                ? '3. Pola Enterprise 2: Operasi Destruktif dengan Tombol Batal (Undo)'
                : '3. Enterprise Pattern 2: Destructive Action with Instant Undo'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Pola UX gesit tanpa konfirmasi modal yang menghambat: hapus item langsung dari daftar dan berikan jendela waktu 6 detik dengan aksi Undo pada toast.'
                : 'Frictionless deletion pattern: removes item immediately while offering a 6-second grace period with an instant "Undo" button on toast.'}
            </p>

            <div
              className="api-table-wrapper"
              style={{ marginTop: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}
            >
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{isId ? 'Nama Anggota Tim' : 'Team Member Name'}</th>
                    <th>{isId ? 'Peran / Jabatan' : 'Role'}</th>
                    <th style={{ textAlign: 'right' }}>{isId ? 'Tindakan' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.name}</td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{r.role}</td>
                      <td style={{ textAlign: 'right' }}>
                        <NeuronButton
                          size="xs"
                          variant="danger"
                          onClick={() => handleDeleteRecord(r.id)}
                        >
                          <Trash2 size={12} style={{ marginRight: 4 }} />
                          {isId ? 'Hapus' : 'Delete'}
                        </NeuronButton>
                      </td>
                    </tr>
                  ))}
                  {records.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
                        {isId
                          ? 'Semua data telah dihapus. Klik tombol "Batalkan (Undo)" pada notifikasi toast di pojok kiri bawah!'
                          : 'All records deleted. Click the "Undo Action" button in the bottom-left toast to restore!'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 4. API Reference Table ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{t.compShared.prop}</th>
                    <th>{t.compShared.type}</th>
                    <th>{t.compShared.default}</th>
                    <th>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>title</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toast?.apiTitle}</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toast?.apiDescription}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'info' | 'success' | 'warning' | 'error' | 'brand' | 'loading'</code></td>
                    <td><code>'default'</code></td>
                    <td>{t.toast?.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>styleVariant</code></td>
                    <td><code>'subtle' | 'filled' | 'outline' | 'glass'</code></td>
                    <td><code>'subtle'</code></td>
                    <td>{t.toast?.apiStyleVariant}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>{t.toast?.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>placement</code></td>
                    <td><code>'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'</code></td>
                    <td><code>'bottom-right'</code></td>
                    <td>{t.toast?.apiPlacement}</td>
                  </tr>
                  <tr>
                    <td><code>duration</code></td>
                    <td><code>number</code></td>
                    <td><code>4000</code></td>
                    <td>{t.toast?.apiDuration}</td>
                  </tr>
                  <tr>
                    <td><code>action</code></td>
                    <td><code>{`{ label: string; onClick: () => void }`}</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toast?.apiAction}</td>
                  </tr>
                  <tr>
                    <td><code>cancel</code></td>
                    <td><code>{`{ label: string; onClick?: () => void }`}</code></td>
                    <td><code>undefined</code></td>
                    <td>{t.toast?.apiCancel}</td>
                  </tr>
                  <tr>
                    <td><code>showProgress</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{t.toast?.apiShowProgress}</td>
                  </tr>
                  <tr>
                    <td><code>pauseOnHover</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{t.toast?.apiPauseOnHover}</td>
                  </tr>
                  <tr>
                    <td><code>dismissible</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>{t.toast?.apiDismissible}</td>
                  </tr>
                  <tr>
                    <td><code>onDismiss</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td>—</td>
                    <td>{t.toast?.apiOnDismiss}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'comp-time-picker', label: t.nav.compTimePicker || 'Time Picker' }}
        next={{ id: 'comp-toggle', label: t.nav.compToggle || 'Toggle' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
