import React, { useState } from 'react';
import NeuronFileUpload, {
  FileUploadVariant,
  FileUploadSize,
} from '../components/NeuronFileUpload';
import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Lock,
  RefreshCw,
  X,
  User,
} from 'lucide-react';

interface FileUploadViewProps {
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
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// File Upload Interactive Anatomy Viewer
// ─────────────────────────────────────────────────────────────────────────────
interface FileAnatomyItem {
  id: number;
  name: string;
  category: string;
  w3c: string;
  desc: string;
  tip: string;
}

function FileAnatomyViewer({ isId }: { isId: boolean }) {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [hoveredZone, setHoveredZone] = useState<number | null>(null);
  const activeZone = hoveredZone ?? selectedZone;

  const handleZoneClick = (id: number) => {
    setSelectedZone((prev) => (prev === id ? null : id));
  };

  const handleZoneHover = (id: number | null) => {
    setHoveredZone(id);
  };

  const anatomyItems: FileAnatomyItem[] = [
    {
      id: 1,
      name: isId ? 'Kontainer Dropzone' : 'Dropzone Container',
      category: isId ? 'Area Target Drag & Drop' : 'Drag & Drop Target Area',
      w3c: 'role="button" / aria-label',
      desc: isId
        ? 'Batas visual interaktif dengan garis putus-putus yang mendeteksi drag berkas dari OS dan merespons dengan glow warna primer.'
        : 'Interactive boundary with dashed borders that detects OS drag-and-drop operations, glowing with primary accent color upon hover.',
      tip: isId
        ? 'Diberikan tabIndex={0} untuk navigasi keyboard dan role="button" agar ramah pembaca layar.'
        : 'Assigned tabIndex={0} and role="button" for seamless keyboard accessibility and screen reader support.',
    },
    {
      id: 2,
      name: isId ? 'Ikon Panduan Unggah' : 'Upload Icon Graphic',
      category: isId ? 'Affordance Visual' : 'Visual Affordance',
      w3c: 'aria-hidden="true"',
      desc: isId
        ? 'Ikon awan atau panah unggah yang menegaskan secara visual bahwa area ini siap menerima berkas dokumen atau media.'
        : 'Cloud or upload arrow iconography reinforcing visual intent that the component accepts external documents or media files.',
      tip: isId
        ? 'Menggunakan warna tema primer dengan animasi elevasi halus saat pengguna mengarahkan kursor.'
        : 'Uses theme primary tone with subtle elevation translation on mouse hover.',
    },
    {
      id: 3,
      name: isId ? 'Pemicu Telusuri Berkas' : 'Browse Files Trigger',
      category: isId ? 'Aksi Utama' : 'Primary Call to Action',
      w3c: '<button> / native <input type="file">',
      desc: isId
        ? 'Teks tautan atau tombol yang membuka dialog pemilihan berkas bawaan sistem operasi (native file picker).'
        : 'Clickable link or button that opens the native OS file picker dialog window for manual selection.',
      tip: isId
        ? 'Input file asli disembunyikan secara visual namun tetap terhubung untuk aksesibilitas keyboard.'
        : 'Native file input is visually hidden but programmatically bound for keyboard accessibility.',
    },
    {
      id: 4,
      name: isId ? 'Petunjuk Format & Batasan' : 'Format & Size Constraint Hint',
      category: isId ? 'Petunjuk Kontekstual' : 'Contextual Hint',
      w3c: 'aria-describedby',
      desc: isId
        ? 'Teks pembantu yang menginformasikan format file yang diterima (ekstensi/MIME) dan ukuran maksimum yang diizinkan.'
        : 'Helper copy specifying accepted MIME types or extensions and the maximum allowable file size threshold.',
      tip: isId
        ? 'Selalu tampilkan batasan sebelum pengguna mengunggah untuk mencegah error gagal validasi di awal.'
        : 'Always communicate constraints upfront to prevent early validation failure.',
    },
    {
      id: 5,
      name: isId ? 'Kartu Antrean Berkas' : 'Queued File Item Card',
      category: isId ? 'Daftar Berkas & Progres' : 'Queue & Progress Display',
      w3c: 'role="listitem" / role="progressbar"',
      desc: isId
        ? 'Elemen kartu daftar berkas berisi thumbnail pratinjau, nama berkas, ukuran, indikator progres %, serta tombol aksi hapus/retry.'
        : 'Item card displaying media thumbnail preview, file name, formatted byte size, progress %, and action triggers.',
      tip: isId
        ? 'Dilengkapi tombol X untuk membatalkan antrean dan tombol putar ulang (retry) jika terjadi kegagalan jaringan.'
        : 'Equipped with a cancel/remove trigger and an automatic retry action upon upload failure.',
    },
  ];

  const activeItem = activeZone ? anatomyItems.find((item) => item.id === activeZone) : null;

  return (
    <div className="file-anatomy-container">
      {/* Master Visual Stage */}
      <div className="file-anatomy-stage-card">
        <div className="file-anatomy-stage-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Sparkles size={16} color="var(--color-primary)" />
            <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
              {isId ? 'Panggung Anatomi Interaktif' : 'Interactive Anatomy Stage'}
            </span>
          </div>
          <span style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)' }}>
            {isId ? 'Arahkan kursor atau klik pin bernomor' : 'Hover or click numbered pins'}
          </span>
        </div>

        <div className="file-anatomy-stage-canvas">
          <div className="file-anatomy-demo-wrap">
            {/* Dropzone Container */}
            <div
              className={`neuron-file-dropzone ${activeZone === 1 ? 'is-dragover' : ''}`}
              style={{
                pointerEvents: 'none',
                borderColor: activeZone === 1 ? 'var(--color-primary)' : undefined,
                background: activeZone === 1 ? 'rgba(178, 94, 64, 0.08)' : undefined,
              }}
            >
              <div
                className="neuron-file-dropzone__icon-badge"
                style={{
                  transform: activeZone === 2 ? 'translateY(-3px) scale(1.08)' : undefined,
                  borderColor: activeZone === 2 ? 'var(--color-primary)' : undefined,
                  background: activeZone === 2 ? 'rgba(178, 94, 64, 0.15)' : undefined,
                }}
              >
                <UploadCloud size={28} strokeWidth={1.75} />
              </div>

              <div className="neuron-file-dropzone__body">
                <p className="neuron-file-dropzone__prompt">
                  <span>{isId ? 'Seret dan lepas berkas di sini, atau' : 'Drag and drop files here, or'}</span>{' '}
                  <span
                    className="neuron-file-dropzone__browse-link"
                    style={{
                      background: activeZone === 3 ? 'rgba(178, 94, 64, 0.15)' : undefined,
                      padding: activeZone === 3 ? '1px 6px' : undefined,
                      borderRadius: '4px',
                    }}
                  >
                    {isId ? 'Telusuri Berkas' : 'Browse Files'}
                  </span>
                </p>
                <p
                  className="neuron-file-dropzone__hint"
                  style={{
                    color: activeZone === 4 ? 'var(--color-primary)' : undefined,
                    fontWeight: activeZone === 4 ? 600 : undefined,
                  }}
                >
                  {isId ? 'Mendukung PNG, JPG, PDF hingga 10MB' : 'Supports PNG, JPG, PDF up to 10MB'}
                </p>
              </div>
            </div>

            {/* Mock Queued File Card */}
            <div
              className="neuron-file-list"
              style={{
                marginTop: '12px',
                pointerEvents: 'none',
              }}
            >
              <div
                className="neuron-file-item neuron-file-item--uploading"
                style={{
                  borderColor: activeZone === 5 ? 'var(--color-primary)' : undefined,
                  boxShadow: activeZone === 5 ? '0 0 0 2px rgba(178, 94, 64, 0.2)' : undefined,
                }}
              >
                <div className="neuron-file-item__visual">
                  <FileText size={18} className="neuron-file-icon--pdf" />
                </div>
                <div className="neuron-file-item__details">
                  <div className="neuron-file-item__top-row">
                    <span className="neuron-file-item__name">Financial_Report_Q4_2026.pdf</span>
                    <span className="neuron-file-item__size">3.4 MB</span>
                  </div>
                  <div className="neuron-file-item__progress-bar-wrap">
                    <div className="neuron-file-item__progress-track">
                      <div className="neuron-file-item__progress-fill" style={{ width: '68%' }} />
                    </div>
                    <span className="neuron-file-item__progress-pct">68%</span>
                  </div>
                </div>
                <div className="neuron-file-item__actions">
                  <button type="button" className="neuron-file-item__action-btn">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Pin 1: Dropzone Boundary */}
            <div
              className={`file-anatomy-pin ${activeZone === 1 ? 'is-active' : ''}`}
              style={{ top: '18px', left: '18px' }}
              onClick={() => handleZoneClick(1)}
              onMouseEnter={() => handleZoneHover(1)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div className="file-anatomy-pin__dot">1</div>
            </div>

            {/* Pin 2: Upload Cloud Icon */}
            <div
              className={`file-anatomy-pin ${activeZone === 2 ? 'is-active' : ''}`}
              style={{ top: '48px', left: '50%' }}
              onClick={() => handleZoneClick(2)}
              onMouseEnter={() => handleZoneHover(2)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div className="file-anatomy-pin__dot">2</div>
            </div>

            {/* Pin 3: Browse Files Trigger */}
            <div
              className={`file-anatomy-pin ${activeZone === 3 ? 'is-active' : ''}`}
              style={{ top: '106px', left: '68%' }}
              onClick={() => handleZoneClick(3)}
              onMouseEnter={() => handleZoneHover(3)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div className="file-anatomy-pin__dot">3</div>
            </div>

            {/* Pin 4: Helper Text */}
            <div
              className={`file-anatomy-pin ${activeZone === 4 ? 'is-active' : ''}`}
              style={{ top: '136px', left: '50%' }}
              onClick={() => handleZoneClick(4)}
              onMouseEnter={() => handleZoneHover(4)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div className="file-anatomy-pin__dot">4</div>
            </div>

            {/* Pin 5: Queued File Item */}
            <div
              className={`file-anatomy-pin ${activeZone === 5 ? 'is-active' : ''}`}
              style={{ top: '210px', left: '24px' }}
              onClick={() => handleZoneClick(5)}
              onMouseEnter={() => handleZoneHover(5)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div className="file-anatomy-pin__dot">5</div>
            </div>
          </div>
        </div>

        {/* Stage Footer with Fixed Height (Zero Layout Shift) */}
        <div className="file-anatomy-stage-footer">
          {activeItem ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Part {activeItem.id}:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{activeItem.name}</span>
              <span style={{ opacity: 0.5 }}>—</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>{activeItem.category}</span>
            </div>
          ) : (
            <span style={{ color: 'var(--color-text-tertiary)' }}>
              {isId
                ? 'Arahkan kursor atau pilih kartu di bawah untuk menelaah elemen struktur file upload'
                : 'Hover or click any anatomy card below to highlight structural parts on stage'}
            </span>
          )}
        </div>
      </div>

      {/* Anatomy Cards Underneath (2-Column Grid) */}
      <div className="file-anatomy-grid">
        {anatomyItems.map((item) => {
          const isCardActive = activeZone === item.id;
          return (
            <div
              key={item.id}
              className={`file-anatomy-item-card ${isCardActive ? 'is-active' : ''}`}
              onClick={() => handleZoneClick(item.id)}
              onMouseEnter={() => handleZoneHover(item.id)}
              onMouseLeave={() => handleZoneHover(null)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: 'var(--radius-full)',
                        background: isCardActive ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
                        color: isCardActive ? '#fff' : 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {item.id}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 500 }}>
                    {item.category}
                  </span>
                </div>

                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 var(--space-3) 0' }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--color-border)', fontSize: '11px' }}>
                <span style={{ color: 'var(--color-text-tertiary)', fontFamily: 'monospace' }}>{item.w3c}</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{item.tip}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main FileUploadView
// ─────────────────────────────────────────────────────────────────────────────
export default function FileUploadView({ setActiveTab }: FileUploadViewProps) {
  const [activeViewTab, setViewTab] = useState<'guideline' | 'playbook'>('guideline');
  const { language, t } = useLanguage();
  const isId = language === 'id';


  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.nav.compFileUpload || 'File Upload'}</h1>
            <p className="page-subtitle">
              {isId
                ? 'Komponen input pengunggahan berkas berkemampuan seret-dan-lepas (drag & drop), validasi batasan ukuran/tipe, pratinjau thumbnail, serta indikator progres pengunggahan interaktif.'
                : 'Interactive file upload input with drag-and-drop affordance, format/size constraint validation, thumbnail preview, and real-time upload progress indicators.'}
            </p>
          </div>
        </div>

        {/* ── Tab Bar Navigation for Guideline vs Playbook ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setViewTab('guideline')}
          >
            Guideline
          </button>
          <button
            type="button"
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setViewTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 1 – GUIDELINE
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content">
          {/* ── 1. Overview & Specification Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Ikhtisar & Pilar Komponen' : 'Overview & Key Pillars'}</h2>
            <p className="section-description">
              {isId
                ? 'NeuronFileUpload menyediakan antarmuka terpadu untuk transfer berkas dari media penyimpanan lokal pengguna ke sistem. Komponen ini dirancang agar transparan memberikan umpan balik status unggah, memvalidasi keamanan berkas di sisi klien, dan dapat dioperasikan secara penuh dengan keyboard.'
                : 'NeuronFileUpload delivers a unified interface for transferring files from client storage to application services. Designed to communicate progress states clearly, enforce client-side constraints reliably, and remain fully navigable via keyboard.'}
            </p>

            {/* Key Pillars Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                  <UploadCloud size={18} /> {isId ? 'Drag & Drop Alami' : 'Native Drag & Drop'}
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Mendukung seret-dan-lepas dari file manager OS dengan sorotan visual glow aktif tanpa pergeseran tata letak.'
                    : 'Effortless drag-and-drop from any desktop file manager with active boundary glow and zero layout shift.'}
                </p>
              </div>

              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                  <ShieldCheck size={18} /> {isId ? 'Validasi Klien Instan' : 'Instant Client Validation'}
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Memeriksa tipe ekstensi/MIME dan batasan ukuran byte secara lokal sebelum proses transmisi dimulai.'
                    : 'Validates file extensions, MIME formats, and byte thresholds locally before network transfer.'}
                </p>
              </div>

              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                  <RefreshCw size={18} /> {isId ? 'Progres & State Machine' : 'State Machine & Progress'}
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Status terdefinisi jelas: idle, uploading (% bar), success (ready), dan error (disertai tombol coba lagi).'
                    : 'Explicit lifecycle tracking: idle, uploading (% bar), ready, and error states with integrated retry triggers.'}
                </p>
              </div>

              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>
                  <ImageIcon size={18} /> {isId ? 'Pratinjau Media Gambar' : 'Thumbnail Previews'}
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {isId
                    ? 'Pembuatan thumbnail instan untuk berkas foto/gambar serta ikon kategori pintar untuk PDF, video, dan kode.'
                    : 'Instant in-memory object URL thumbnails for images and categorized vector badges for docs, PDFs, and archives.'}
                </p>
              </div>
            </div>

            {/* Spec Matrix Table */}
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>{isId ? 'Dimensi Spesifikasi' : 'Specification Dimension'}</th>
                    <th style={{ width: '38%' }}>{isId ? 'Standar Implementasi' : 'Implementation Standard'}</th>
                    <th style={{ width: '40%' }}>{isId ? 'Panduan Penggunaan' : 'Usage Guidance'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code className="api-prop-code">Role & ARIA</code></td>
                    <td><code className="api-type-code">role="button"</code> / <code className="api-type-code">aria-describedby</code></td>
                    <td>Elemen terhubung dengan input asli tersembunyi untuk kompatibilitas penuh assistive technology.</td>
                  </tr>
                  <tr>
                    <td><code className="api-prop-code">Visual Variants</code></td>
                    <td><code className="api-type-code">dropzone | button | avatar | compact</code></td>
                    <td>Pilih dropzone untuk formulir utama, button untuk toolbar, avatar untuk profil, compact untuk kolom pesan.</td>
                  </tr>
                  <tr>
                    <td><code className="api-prop-code">Sizing Scale</code></td>
                    <td><code className="api-type-code">sm (compact) | md (default) | lg (hero)</code></td>
                    <td>Gunakan skala proporsional dengan kepadatan formulir dan hierarki informasi halaman.</td>
                  </tr>
                  <tr>
                    <td><code className="api-prop-code">Constraint Limits</code></td>
                    <td><code className="api-type-code">maxSize | accept | maxFiles</code></td>
                    <td>Pastikan batasan format dan ukuran selalu diinformasikan pada teks bantuan komponen.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 2. Visual Variants Gallery ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Varian Tampilan' : 'Visual Variants'}</h2>
            <p className="section-description">
              {isId
                ? 'Tersedia 4 varian visual yang disesuaikan dengan konteks tata letak, mulai dari area dropzone luas hingga baris kompak satu baris.'
                : 'Choose from 4 distinct visual variants designed to fit varied layout contexts, from prominent dropzones to compact single-row bars.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              {/* Variant 1: Dropzone */}
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>1. Dropzone Variant (Default)</span>
                    <NeuronBadge size="xs" variant="brand">Standard</NeuronBadge>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>variant="dropzone"</span>
                </div>
                <NeuronFileUpload
                  variant="dropzone"
                  label={isId ? 'Unggah Dokumen Verifikasi' : 'Upload Verification Documents'}
                  required
                  hintText={isId ? 'PDF, DOCX, PNG hingga 10MB' : 'PDF, DOCX, PNG up to 10MB'}
                  helperText={isId ? 'Format yang diterima: PDF, DOCX, PNG dengan resolusi minimal 300 DPI.' : 'Accepted formats: PDF, DOCX, PNG with minimum 300 DPI resolution.'}
                  multiple
                />
              </div>

              {/* Variant 2: Button Trigger */}
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>2. Button Trigger Variant</span>
                    <NeuronBadge size="xs" variant="info">Action</NeuronBadge>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>variant="button"</span>
                </div>
                <NeuronFileUpload
                  variant="button"
                  label={isId ? 'Lampiran Tambahan' : 'Additional Attachments'}
                  browseText={isId ? 'Pilih Lampiran Berkas' : 'Select Attachment'}
                  hintText={isId ? 'Maksimal 5 berkas per unggahan' : 'Maximum 5 files per upload'}
                  helperText={isId ? 'Dapat berupa arsip berkas zip atau dokumen pdf pelengkap.' : 'Can be zip archives or complementary pdf documents.'}
                  multiple
                />
              </div>

              {/* Variant 3: Avatar Uploader */}
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>3. Avatar Uploader Variant</span>
                    <NeuronBadge size="xs" variant="success">Profile</NeuronBadge>
                  </div>
                  <code style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'var(--color-bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>variant="avatar"</code>
                </div>
                <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-5) 0', lineHeight: 1.5 }}>
                  {isId
                    ? 'Dikhususkan untuk foto profil personal atau logo organisasi dengan badge kamera interaktif, crop pratinjau instan, dan opsi bentuk lingkaran maupun squircle.'
                    : 'Tailored for personal profile photos or organizational logos with an intuitive camera indicator badge, instant preview, and circle or squircle shapes.'}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                  {/* Avatar Showcase 1: Circle */}
                  <div style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 'var(--space-3)',
                    boxShadow: 'var(--shadow-xs)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 'var(--space-1)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Bentuk Lingkaran' : 'Circular Frame'}
                      </span>
                      <code style={{ fontSize: '10px', color: 'var(--color-primary)' }}>avatarShape="circle"</code>
                    </div>
                    <NeuronFileUpload
                      variant="avatar"
                      avatarShape="circle"
                      size="md"
                      label={isId ? 'Foto Profil Pengguna' : 'User Profile Photo'}
                      hintText="JPG, PNG, WEBP (Max. 5MB)"
                      avatarFallbackUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces"
                    />
                  </div>

                  {/* Avatar Showcase 2: Rounded Squircle */}
                  <div style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 'var(--space-3)',
                    boxShadow: 'var(--shadow-xs)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 'var(--space-1)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)' }}>
                        {isId ? 'Bentuk Squircle' : 'Squircle Frame'}
                      </span>
                      <code style={{ fontSize: '10px', color: 'var(--color-primary)' }}>avatarShape="rounded"</code>
                    </div>
                    <NeuronFileUpload
                      variant="avatar"
                      avatarShape="rounded"
                      size="md"
                      label={isId ? 'Logo Organisasi' : 'Workspace / Brand Logo'}
                      hintText="SVG, PNG Transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Variant 4: Compact Bar */}
              <div style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>4. Compact Bar Variant</span>
                    <NeuronBadge size="xs" variant="neutral">Inline</NeuronBadge>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>variant="compact"</span>
                </div>
                <NeuronFileUpload
                  variant="compact"
                  label={isId ? 'Lampiran Bukti Transaksi' : 'Transaction Receipt Attachment'}
                  required
                  dropzoneText={isId ? 'Pilih atau seret berkas struk di sini' : 'Select or drag receipt file here'}
                  browseText={isId ? 'Pilih' : 'Browse'}
                  helperText={isId ? 'Unggah struk atau bukti transfer m-banking berformat gambar atau PDF resmi.' : 'Upload proof of transfer in image or official PDF receipt format.'}
                />
              </div>
            </div>
          </div>

          {/* ── 3. Form Integration: Labels, Required State & Helper Text ── */}
          <div className="section-card">
            <h2 className="section-title">
              {isId ? 'Integrasi Formulir: Label & Helper Text' : 'Form Integration: Labels & Helper Text'}
            </h2>
            <p className="section-description">
              {isId
                ? 'Panduan penataan bidang formulir unggah berkas menggunakan label kontekstual, indikator tanda bintang (*) untuk bidang wajib, helper text untuk mengarahkan ketentuan berkas, dan umpan balik kesalahan validasi inline.'
                : 'Form field guidance using contextual labels, mandatory asterisk (*) indicators, supporting helper texts for file constraints, and inline validation error feedback.'}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-6)',
            }}>
              {/* Row 1, Card 1: Standard Required Dropzone with Helper Text */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? '1. Dropzone Wajib & Helper Text' : '1. Required Dropzone Field'}
                    </span>
                    <NeuronBadge size="xs" variant="brand">Required</NeuronBadge>
                  </div>
                  <code style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'var(--color-bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    required &amp; helperText
                  </code>
                </div>

                <NeuronFileUpload
                  variant="dropzone"
                  size="md"
                  label={isId ? 'Dokumen KTP / Identitas Resmi' : 'Government Identity Card / Passport'}
                  required
                  hintText={isId ? 'PDF, JPG, PNG hingga 10MB' : 'PDF, JPG, PNG up to 10MB'}
                  helperText={isId ? 'Unggah scan dokumen asli berwarna. Pastikan seluruh teks dan foto wajah terbaca jelas tanpa pantulan cahaya.' : 'Upload official colored original scans. Ensure all text and portrait photos are legible without glare.'}
                  multiple
                />
              </div>

              {/* Row 1, Card 2: Dropzone with Validation Error State */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? '2. Status Validasi Gagal' : '2. Validation Error Feedback'}
                    </span>
                    <NeuronBadge size="xs" variant="danger">Error State</NeuronBadge>
                  </div>
                  <code style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'var(--color-bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    error="message"
                  </code>
                </div>

                <NeuronFileUpload
                  variant="dropzone"
                  size="md"
                  label={isId ? 'Laporan Keuangan Perusahaan (Audit)' : 'Audited Company Financial Statement'}
                  required
                  hintText={isId ? 'PDF resmi hingga 10MB' : 'Official PDF up to 10MB'}
                  error={isId ? 'Ukuran berkas laporan_keuangan_2025.pdf (14.2 MB) melebihi batas 10 MB.' : 'File laporan_keuangan_2025.pdf (14.2 MB) exceeds the 10 MB limit.'}
                  helperText={isId ? 'Format PDF bertanda tangan akuntan publik terdaftar.' : 'Official signed PDF by certified registered accountants.'}
                />
              </div>

              {/* Row 2, Card 3: Compact Bar with Label & Helper Text */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? '3. Baris Kompak Satu Baris' : '3. Inline Compact Attachment'}
                    </span>
                    <NeuronBadge size="xs" variant="neutral">Inline</NeuronBadge>
                  </div>
                  <code style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'var(--color-bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    variant="compact"
                  </code>
                </div>

                <NeuronFileUpload
                  variant="compact"
                  size="md"
                  label={isId ? 'Bukti Pembayaran / Struk Transfer' : 'Proof of Payment / Bank Receipt'}
                  required
                  dropzoneText={isId ? 'Pilih atau seret berkas struk di sini' : 'Select or drag receipt file here'}
                  browseText={isId ? 'Pilih Berkas' : 'Browse File'}
                  helperText={isId ? 'Mendukung bukti transfer m-banking atau struk ATM resmi berformat gambar atau PDF.' : 'Supports mobile banking receipts or official ATM slips in image or PDF format.'}
                />
              </div>

              {/* Row 2, Card 4: Button Trigger with Label & Optional Helper Text */}
              <div style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '1px solid var(--color-border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                      {isId ? '4. Tombol Pemicu Mandiri' : '4. Standalone Action Button'}
                    </span>
                    <NeuronBadge size="xs" variant="info">Optional</NeuronBadge>
                  </div>
                  <code style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'var(--color-bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    variant="button"
                  </code>
                </div>

                <NeuronFileUpload
                  variant="button"
                  size="md"
                  label={isId ? 'Dokumen Portofolio Tambahan (Opsional)' : 'Additional Portfolio Documents (Optional)'}
                  browseText={isId ? 'Pilih Lampiran Berkas' : 'Select Attachment'}
                  hintText={isId ? 'Maksimal 5 berkas per unggahan' : 'Maximum 5 files per upload'}
                  helperText={isId ? 'Dapat berupa berkas arsip zip atau dokumen pdf pelengkap pendukung.' : 'Can be zip archives or supporting pdf documents.'}
                  multiple
                />
              </div>
            </div>
          </div>

          {/* ── 4. Sizing Scale ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Skala Ukuran (Sizing Scale)' : 'Sizing Scale'}</h2>
            <p className="section-description">
              {isId
                ? 'Komponen menyediakan 3 pilihan ukuran (`sm`, `md`, `lg`) yang secara proporsional menyesuaikan padding, ikon grafis, ukuran font, dan tinggi elemen pemicu.'
                : 'NeuronFileUpload offers 3 standardized size tiers (`sm`, `md`, `lg`) proportionally calibrating padding, icon badges, font sizes, and target height.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                  Small (<code className="api-type-code">size="sm"</code>) — Modal / Dense Form Context
                </span>
                <NeuronFileUpload size="sm" hintText="PNG, JPG max 2MB" />
              </div>

              <div>
                <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                  Medium (<code className="api-type-code">size="md"</code>) — Standard Form Default
                </span>
                <NeuronFileUpload size="md" hintText="PNG, JPG, PDF max 10MB" />
              </div>

              <div>
                <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                  Large (<code className="api-type-code">size="lg"</code>) — Dedicated Import & Cloud Drag-and-Drop
                </span>
                <NeuronFileUpload size="lg" hintText="All formats up to 50MB" />
              </div>
            </div>
          </div>

          {/* ── 4. Interactive Anatomy Viewer ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Anatomi Komponen' : 'Component Anatomy'}</h2>
            <p className="section-description">
              {isId
                ? 'Struktur modular NeuronFileUpload terdiri dari kontainer dropzone, grafis affordance, tombol dialog native, petunjuk batasan berkas, dan kartu antrean progres.'
                : 'The modular anatomy of NeuronFileUpload comprises dropzone boundaries, affordance graphics, native browse triggers, constraint helper copy, and queued progress cards.'}
            </p>

            <FileAnatomyViewer isId={isId} />
          </div>

          {/* ── 5. Lifecycle & File States ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Siklus Hidup & Status Berkas' : 'Lifecycle & File States'}</h2>
            <p className="section-description">
              {isId
                ? 'Setiap berkas dalam antrean melalui state machine yang jelas: Idle, Drag Over, Uploading (dengan progress bar), Success (siap), dan Error (dengan pesan penjelas & tombol retry).'
                : 'Each queued file transitions through a deterministic state machine: Idle, Drag Over, Uploading (with dynamic progress bar), Ready/Success, and Error with actionable retry.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
              {/* State: Idle */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Idle State</span>
                  <NeuronBadge size="xs" variant="neutral">Default</NeuronBadge>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  {isId ? 'Menunggu interaksi seret berkas atau klik dari pengguna.' : 'Awaiting user drag gesture or click to open file picker.'}
                </p>
                <div className="neuron-file-dropzone" style={{ padding: '16px', pointerEvents: 'none' }}>
                  <UploadCloud size={20} color="var(--color-primary)" />
                  <span style={{ fontSize: '12px', fontWeight: 500 }}>Ready to upload</span>
                </div>
              </div>

              {/* State: Uploading */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Uploading State</span>
                  <NeuronBadge size="xs" variant="brand">In Progress</NeuronBadge>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  {isId ? 'Transmisi data aktif dengan bar persentase dinamis.' : 'Network transmission active with live percentage bar.'}
                </p>
                <div className="neuron-file-item neuron-file-item--uploading">
                  <div className="neuron-file-item__visual"><FileText size={16} className="neuron-file-icon--pdf" /></div>
                  <div className="neuron-file-item__details">
                    <div className="neuron-file-item__top-row"><span className="neuron-file-item__name">Dataset_2026.csv</span><span className="neuron-file-item__size">1.2 MB</span></div>
                    <div className="neuron-file-item__progress-bar-wrap">
                      <div className="neuron-file-item__progress-track"><div className="neuron-file-item__progress-fill" style={{ width: '62%' }} /></div>
                      <span className="neuron-file-item__progress-pct">62%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* State: Success */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Success State</span>
                  <NeuronBadge size="xs" variant="success">Uploaded</NeuronBadge>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  {isId ? 'Berkas berhasil diverifikasi dan terunggah ke sistem.' : 'File verified and completed upload successfully.'}
                </p>
                <div className="neuron-file-item neuron-file-item--success">
                  <div className="neuron-file-item__visual"><ImageIcon size={16} className="neuron-file-icon--image" /></div>
                  <div className="neuron-file-item__details">
                    <div className="neuron-file-item__top-row"><span className="neuron-file-item__name">Company_Banner.png</span><span className="neuron-file-item__size">840 KB</span></div>
                    <div className="neuron-file-item__success-msg"><CheckCircle2 size={12} /><span>Ready</span></div>
                  </div>
                  <div className="neuron-file-item__actions"><button type="button" className="neuron-file-item__action-btn"><X size={14} /></button></div>
                </div>
              </div>

              {/* State: Error & Retry */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)' }}>Error & Retry State</span>
                  <NeuronBadge size="xs" variant="error">Rejected</NeuronBadge>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  {isId ? 'Validasi gagal atau koneksi terputus dengan tombol retry.' : 'Constraint failed or network error with retry button.'}
                </p>
                <div className="neuron-file-item neuron-file-item--error">
                  <div className="neuron-file-item__visual"><FileText size={16} className="neuron-file-icon--pdf" /></div>
                  <div className="neuron-file-item__details">
                    <div className="neuron-file-item__top-row"><span className="neuron-file-item__name">Oversized_Archive.zip</span><span className="neuron-file-item__size">65 MB</span></div>
                    <div className="neuron-file-item__error-msg"><AlertCircle size={12} /><span>Exceeds 10MB limit</span></div>
                  </div>
                  <div className="neuron-file-item__actions">
                    <button type="button" className="neuron-file-item__action-btn neuron-file-item__action-btn--retry" title="Retry"><RefreshCw size={14} /></button>
                    <button type="button" className="neuron-file-item__action-btn neuron-file-item__action-btn--remove" title="Remove"><X size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Accessibility & Keyboard Navigation ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Aksesibilitas & Navigasi Keyboard' : 'Accessibility & Keyboard Navigation'}</h2>
            <p className="section-description">
              {isId
                ? 'NeuronFileUpload mematuhi standar W3C WAI-ARIA APG. Komponen dapat dioperasikan penuh tanpa mouse menggunakan tombol Tab, Spasi, dan Enter.'
                : 'NeuronFileUpload strictly adheres to W3C WAI-ARIA APG patterns. The component is fully operable without a pointer device using Tab, Space, and Enter keys.'}
            </p>

            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>{isId ? 'Tombol Keyboard' : 'Key / Trigger'}</th>
                    <th style={{ width: '78%' }}>{isId ? 'Fungsi & Perilaku Sistem' : 'Behavior & System Response'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><kbd>Tab</kbd></td>
                    <td>Memindahkan fokus visual ke area dropzone atau tombol browse dengan outline ring yang jelas.</td>
                  </tr>
                  <tr>
                    <td><kbd>Space</kbd> / <kbd>Enter</kbd></td>
                    <td>Memicu pembukaan dialog pemilihan berkas bawaan sistem operasi (*native file dialog*).</td>
                  </tr>
                  <tr>
                    <td><kbd>Escape</kbd></td>
                    <td>Menutup dialog file browser atau membatalkan operasi drag jika didukung oleh peramban.</td>
                  </tr>
                  <tr>
                    <td><kbd>Delete</kbd> / <kbd>Backspace</kbd></td>
                    <td>Menghapus item berkas yang sedang terfokus dari antrean daftar berkas.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 7. Do's & Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? "Do's & Don'ts" : "Do's & Don'ts"}</h2>
            <p className="section-description">
              {isId
                ? 'Prinsip desain interaksi pengunggahan berkas yang direkomendasikan beserta anti-pola yang wajib dihindari untuk pengalaman pengguna yang transparan dan andal.'
                : 'Recommended file upload interaction principles and anti-patterns to avoid for transparent, reliable user experiences.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              {/* Pair 1: Format & Size Constraints Upfront vs Missing Information */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 300, padding: '14px', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--color-primary)', background: 'var(--color-bg-surface)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                        <UploadCloud size={18} />
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Pilih berkas untuk diunggah' : 'Choose files to upload'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', background: 'var(--color-bg-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                        PDF, DOCX, PNG (Max. 10MB)
                      </div>
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId ? 'Tampilkan Batasan Format & Ukuran di Awal' : 'Show Format & Size Constraints Upfront'}
                    </div>
                    <div className="rule-card__desc">
                      {isId
                        ? 'Selalu sertakan batas ekstensi berkas dan kuota ukuran maksimum langsung pada prompt agar pengguna mengetahui ketentuan sebelum memilih berkas.'
                        : 'Always specify accepted file extensions and max size thresholds directly in the prompt so users know requirements before selecting files.'}
                    </div>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 300, padding: '14px', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--color-border)', background: 'var(--color-bg-surface)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                        <UploadCloud size={18} />
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Unggah Berkas' : 'Upload Files'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-danger)', fontStyle: 'italic' }}>
                        {isId ? 'Tanpa petunjuk batasan ukuran/tipe' : 'No size or format hints provided'}
                      </div>
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId ? 'Jangan Biarkan Pengguna Menebak Batasan' : 'Don’t Leave Constraints Hidden or Ambiguous'}
                    </div>
                    <div className="rule-card__desc">
                      {isId
                        ? 'Hindari dropzone tanpa teks petunjuk batasan yang memaksa pengguna mencoba-coba hingga berkas ditolak oleh server.'
                        : 'Never omit accepted formats or size limits, forcing users into a frustrating trial-and-error cycle upon rejected uploads.'}
                    </div>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 2: Clear Error Explanation & Action vs Generic "Upload Failed" */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 320, padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid color-mix(in srgb, var(--color-danger) 40%, var(--color-border))', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: 'var(--shadow-xs)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '6px', background: 'color-mix(in srgb, var(--color-danger) 12%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)', flexShrink: 0 }}>
                        <AlertCircle size={18} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          laporan_keuangan_q3.pdf
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-danger)' }}>
                          {isId ? 'Ukuran 14.2 MB melebihi batas 10 MB' : '14.2 MB exceeds 10 MB limit'}
                        </div>
                      </div>
                      <span style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                        {isId ? 'Ganti' : 'Replace'}
                      </span>
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId ? 'Berikan Alasan Error Spesifik & Opsi Perbaikan' : 'Provide Specific Error Details & Recovery Actions'}
                    </div>
                    <div className="rule-card__desc">
                      {isId
                        ? 'Jelaskan penyebab kegagalan (misal: ukuran melampaui batas atau tipe berkas tidak didukung) dan sediakan aksi langsung seperti ganti berkas atau coba lagi.'
                        : 'Explicitly explain rejection causes (e.g. oversize or disallowed format) and provide actionable next steps like replace or retry.'}
                    </div>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 320, padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: 'var(--shadow-xs)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '6px', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)', flexShrink: 0 }}>
                        <X size={18} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          laporan_keuangan_q3.pdf
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-danger)' }}>
                          {isId ? 'Upload Gagal' : 'Upload Failed'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId ? 'Jangan Tampilkan Pesan Error Ambigu' : 'Don’t Use Generic Failure Messages'}
                    </div>
                    <div className="rule-card__desc">
                      {isId
                        ? 'Hindari pesan samar seperti "Upload Gagal" tanpa rincian alasan yang membuat pengguna kebingungan langkah apa yang harus diambil selanjutnya.'
                        : 'Avoid vague error labels like "Upload Failed" with no guidance on whether to compress, reformat, or check connectivity.'}
                    </div>
                  </div>
                </RuleCard>
              </div>

              {/* Pair 3: Live Progress & Cancelability vs Frozen Blocking UI */}
              <div className="rule-pair">
                <RuleCard type="do">
                  <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 320, padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: 'var(--shadow-xs)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                          <FileText size={16} color="var(--color-primary)" />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            company_profile.mp4
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)' }}>68%</span>
                      </div>
                      <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--color-bg-subtle)', overflow: 'hidden' }}>
                        <div style={{ width: '68%', height: '100%', background: 'var(--color-primary)', borderRadius: '2px' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                        <span>24.8 MB / 36.5 MB</span>
                        <span style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>
                          {isId ? 'Batal' : 'Cancel'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId ? 'Tampilkan Progres Real-Time & Opsi Batal' : 'Provide Real-Time Progress & Cancellation'}
                    </div>
                    <div className="rule-card__desc">
                      {isId
                        ? 'Tampilkan indikator persentase transfer data secara langsung dan berikan kontrol kepada pengguna untuk membatalkan proses kapan saja.'
                        : 'Render live upload percentage metrics alongside an accessible cancel action so users remain in control of long-running transfers.'}
                    </div>
                  </div>
                </RuleCard>

                <RuleCard type="dont">
                  <div className="rule-card__preview" style={{ minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)', width: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 320, padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.7 }}>
                      <RefreshCw size={14} className="spin" color="var(--color-text-muted)" />
                      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Mengunggah... harap tunggu' : 'Uploading... please wait'}
                      </span>
                    </div>
                  </div>
                  <div className="rule-card__text">
                    <div className="rule-card__title">
                      {isId ? 'Jangan Bekukan Layar Tanpa Indikator Jelas' : 'Don’t Block UI Without Transfer Progress'}
                    </div>
                    <div className="rule-card__desc">
                      {isId
                        ? 'Hindari menampilkan loader statis tanpa indikator persentase berkas atau tombol batal yang membuat pengguna ragu apakah transfer masih berjalan.'
                        : 'Never freeze user interaction with an indefinite spinner and no abort button, causing confusion over whether the process is hung.'}
                    </div>
                  </div>
                </RuleCard>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 2 – PLAYBOOK
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content">
          {/* ── 1. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">Interactive Playground</h2>
            <p className="section-description">
              {isId
                ? 'Uji coba seluruh varian, opsi ukuran, batas berkas jamak, dan status disabled secara live melalui panel kontrol di bawah.'
                : 'Experiment with component variants, sizing scales, multi-file queuing, and disabled states in real-time.'}
            </p>

            <Playground
              name="NeuronFileUpload"
              knobs={[
                {
                  name: 'variant',
                  type: 'select',
                  options: ['dropzone', 'button', 'avatar', 'compact'],
                  default: 'dropzone',
                  label: 'Variant',
                },
                {
                  name: 'size',
                  type: 'select',
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                  label: 'Size',
                },
                {
                  name: 'label',
                  type: 'text',
                  default: isId ? 'Dokumen Kelengkapan Proyek' : 'Project Verification Documents',
                  label: 'Label',
                },
                {
                  name: 'required',
                  type: 'boolean',
                  default: true,
                  label: 'Required (*)',
                },
                {
                  name: 'helperText',
                  type: 'text',
                  default: isId ? 'Format PDF atau gambar berwarna maksimal 10MB.' : 'Colored PDF or image format up to 10MB.',
                  label: 'Helper Text',
                },
                {
                  name: 'avatarShape',
                  type: 'select',
                  options: ['circle', 'rounded'],
                  default: 'circle',
                  label: 'Avatar Shape',
                },
                {
                  name: 'multiple',
                  type: 'boolean',
                  default: true,
                  label: 'Multiple Files',
                },
                {
                  name: 'disabled',
                  type: 'boolean',
                  default: false,
                  label: 'Disabled',
                },
                {
                  name: 'showFileList',
                  type: 'boolean',
                  default: true,
                  label: 'Show File List',
                },
                {
                  name: 'hintText',
                  type: 'text',
                  default: 'PNG, JPG, PDF up to 10MB',
                  label: 'Constraint Hint',
                },
              ]}
              codeTemplates={(state) => {
                const variant = state.variant as string;
                const size = state.size as string;
                const avatarShape = (state.avatarShape as string) || 'circle';
                const labelText = (state.label as string) || '';
                const labelProp = labelText ? `\n      label="${labelText}"` : '';
                const requiredProp = state.required ? `\n      required` : '';
                const helperTextVal = (state.helperText as string) || '';
                const helperTextProp = helperTextVal ? `\n      helperText="${helperTextVal}"` : '';
                const multiple = state.multiple ? ' multiple' : '';
                const disabled = state.disabled ? ' disabled' : '';
                const showFileList = !state.showFileList ? ' showFileList={false}' : '';
                const hint = state.hintText ? ` hintText="${state.hintText}"` : '';

                if (variant === 'avatar') {
                  const avatarHint = typeof state.hintText === 'string' && !state.hintText.toLowerCase().includes('pdf')
                    ? state.hintText
                    : 'JPG, PNG, WEBP up to 5MB';
                  return {
                    react: `import NeuronFileUpload from '@neudela/neuron-file-upload';

export default function ProfilePhotoUploader() {
  const [avatar, setAvatar] = useState([]);

  return (
    <NeuronFileUpload
      variant="avatar"
      avatarShape="${avatarShape}"
      size="${size}"${labelProp}${requiredProp}${helperTextProp}${disabled}
      hintText="${avatarHint}"
      accept="image/*"
      maxSize={5 * 1024 * 1024}
      avatarFallbackUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
      onChange={(files) => setAvatar(files)}
    />
  );
}`,
                    vue: `<template>
  <NeuronFileUpload
    variant="avatar"
    avatarShape="${avatarShape}"
    size="${size}"${labelProp}${requiredProp}${helperTextProp}${disabled}
    hintText="${avatarHint}"
    accept="image/*"
    :maxSize="5242880"
    avatarFallbackUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
    v-model="avatar"
  />
</template>`,
                    html: `<!-- Neuron File Upload: Avatar Variant -->
<div class="neuron-file-upload neuron-file-upload--avatar neuron-file-upload--${size}">
  ${labelText ? `<label class="neuron-file-upload__label">${labelText}${state.required ? ' <span class="neuron-file-upload__required">*</span>' : ''}</label>` : ''}
  <div class="neuron-file-avatar-wrapper">
    <div class="neuron-file-avatar neuron-file-avatar--${avatarShape}" role="button" tabindex="0">
      <img src="avatar.jpg" alt="Avatar preview" class="neuron-file-avatar__img" />
      <div class="neuron-file-avatar__action-badge">
        <!-- Camera Icon -->
      </div>
    </div>
  </div>
  <div class="neuron-file-upload__hint">${avatarHint}</div>
  ${helperTextVal ? `<div class="neuron-file-upload__helper">${helperTextVal}</div>` : ''}
</div>`,
                  };
                }

                return {
                  react: `import NeuronFileUpload from '@neudela/neuron-file-upload';

export default function MyUploadForm() {
  const [files, setFiles] = useState([]);

  return (
    <NeuronFileUpload
      variant="${variant}"
      size="${size}"${labelProp}${requiredProp}${helperTextProp}${multiple}${disabled}${showFileList}${hint}
      accept="image/*,.pdf"
      maxSize={10 * 1024 * 1024}
      onChange={(updatedFiles) => setFiles(updatedFiles)}
    />
  );
}`,
                  vue: `<template>
  <NeuronFileUpload
    variant="${variant}"
    size="${size}"${labelProp}${requiredProp}${helperTextProp}${multiple}${disabled}${showFileList}${hint}
    accept="image/*,.pdf"
    :maxSize="10485760"
    v-model="files"
  />
</template>`,
                  html: `<!-- Neuron File Upload Component -->
<div class="neuron-file-upload neuron-file-upload--${variant} neuron-file-upload--${size}">
  ${labelText ? `<label class="neuron-file-upload__label">${labelText}${state.required ? ' <span class="neuron-file-upload__required">*</span>' : ''}</label>` : ''}
  <div class="neuron-file-${variant}">
    <!-- Component trigger and dropzone -->
  </div>
  ${helperTextVal ? `<div class="neuron-file-upload__helper">${helperTextVal}</div>` : ''}
</div>`,
                };
              }}
            >
              {(state) => {
                const variant = (state.variant as FileUploadVariant) || 'dropzone';
                const size = (state.size as FileUploadSize) || 'md';
                const avatarShape = (state.avatarShape as 'circle' | 'rounded') || 'circle';
                const multiple = Boolean(state.multiple);
                const disabled = Boolean(state.disabled);
                const showFileList = Boolean(state.showFileList);
                const hintText = (state.hintText as string) || undefined;
                const label = (state.label as string) || undefined;
                const required = Boolean(state.required);
                const helperText = (state.helperText as string) || undefined;

                if (variant === 'avatar') {
                  const resolvedAvatarHint = hintText && !hintText.toLowerCase().includes('pdf')
                    ? hintText
                    : (isId ? 'PNG, JPG, WEBP maks. 5MB' : 'PNG, JPG, WEBP up to 5MB');

                  return (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 'var(--space-6) var(--space-8)',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-xs)',
                      width: '100%',
                      maxWidth: '340px',
                      margin: '0 auto',
                      textAlign: 'center'
                    }}>
                      <NeuronFileUpload
                        variant="avatar"
                        avatarShape={avatarShape}
                        size={size}
                        disabled={disabled}
                        label={label || (isId ? 'Foto Profil Pengguna' : 'User Profile Photo')}
                        required={required}
                        helperText={helperText}
                        hintText={resolvedAvatarHint}
                        avatarFallbackUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
                        accept="image/*"
                        maxSize={5 * 1024 * 1024}
                      />
                    </div>
                  );
                }

                return (
                  <div style={{ width: '100%', maxWidth: '540px', margin: '0 auto' }}>
                    <NeuronFileUpload
                      variant={variant}
                      size={size}
                      multiple={multiple}
                      disabled={disabled}
                      showFileList={showFileList}
                      hintText={hintText}
                      label={label}
                      required={required}
                      helperText={helperText}
                    />
                  </div>
                );
              }}
            </Playground>
          </div>

          {/* ── 2. Real-World Implementation Scenarios ── */}
          <div className="section-card">
            <h2 className="section-title">{isId ? 'Skenario Implementasi Nyata' : 'Real-World Scenarios'}</h2>
            <p className="section-description">
              {isId
                ? 'Contoh penerapan langsung NeuronFileUpload dalam alur verifikasi KYC dokumen, pengaturan avatar profil, dan lampiran berkas pesan.'
                : 'Realistic implementations demonstrating KYC document verification, user profile photo updates, and compact messaging attachments.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Scenario 1: KYC Identity Verification */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>
                      {isId ? 'Verifikasi Identitas & Dokumen KYC' : 'Identity & KYC Document Verification'}
                    </h3>
                    <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Unggah kartu identitas resmi (KTP/Paspor) dengan enkripsi sisi klien' : 'Official government identity proof with client-side format checks'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
                  <NeuronFileUpload
                    variant="dropzone"
                    size="sm"
                    label={isId ? 'Sisi Depan KTP / Paspor' : 'Identity Front Side'}
                    hintText="PNG, JPG max 5MB"
                    accept="image/*"
                  />
                  <NeuronFileUpload
                    variant="dropzone"
                    size="sm"
                    label={isId ? 'Sisi Belakang KTP' : 'Identity Back Side'}
                    hintText="PNG, JPG max 5MB"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Scenario 2: User Profile Settings */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'rgba(178, 94, 64, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 'var(--fs-text-md)', fontWeight: 600 }}>
                      {isId ? 'Pengaturan Profil Pengguna' : 'User Account Profile Settings'}
                    </h3>
                    <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Pembaruan foto profil dengan pratinjau thumbnail instan' : 'Profile picture updates with instantaneous thumbnail render'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                  <NeuronFileUpload
                    variant="avatar"
                    size="lg"
                    avatarShape="circle"
                    hintText="JPG, PNG up to 2MB"
                    avatarFallbackUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
                  />
                  <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</span>
                      <span style={{ display: 'block', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)' }}>Lead Design Systems Engineer</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {isId
                        ? 'Klik gambar avatar untuk memilih foto baru dari perangkat Anda. Resolusi yang disarankan minimal 400x400 piksel.'
                        : 'Click the avatar image to select a new profile picture. Minimum recommended resolution is 400x400 pixels.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Component API Reference ── */}
          <div className="section-card">
            <h2 className="section-title">Component API Reference</h2>
            <p className="section-description">
              {isId
                ? 'Spesifikasi teknis properti, interface data, dan tipe kembalian untuk integrasi komponen NeuronFileUpload.'
                : 'Comprehensive technical specification of props, data interfaces, and return types for NeuronFileUpload.'}
            </p>

            {/* Table 1: NeuronFileUpload Props */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-md)', color: 'var(--color-text-primary)' }}>
                  NeuronFileUpload Props
                </span>
                <span className="api-count-badge">20 properties</span>
              </div>

              <div className="api-table-wrapper">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>Property</th>
                      <th style={{ width: '28%' }}>Type</th>
                      <th style={{ width: '14%' }}>Default</th>
                      <th style={{ width: '40%' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code className="api-prop-code">variant</code></td>
                      <td><code className="api-type-code">'dropzone' | 'button' | 'avatar' | 'compact'</code></td>
                      <td><code className="api-default-code">'dropzone'</code></td>
                      <td>Varian visual layout komponen.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">size</code></td>
                      <td><code className="api-type-code">'sm' | 'md' | 'lg'</code></td>
                      <td><code className="api-default-code">'md'</code></td>
                      <td>Skala ukuran proporsional elemen dan padding.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">accept</code></td>
                      <td><code className="api-type-code">string | string[]</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Format MIME atau ekstensi berkas yang diterima (misal <code className="api-type-code">"image/*,.pdf"</code>).</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">multiple</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>Mengizinkan pemilihan lebih dari satu berkas sekaligus.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">maxSize</code></td>
                      <td><code className="api-type-code">number</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Batas ukuran maksimum tiap berkas dalam satuan byte.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">maxFiles</code></td>
                      <td><code className="api-type-code">number</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Batas kuota jumlah berkas maksimal dalam antrean.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">disabled</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">false</code></td>
                      <td>Menonaktifkan seluruh interaksi seret dan klik unggah.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">label</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Label teks pembimbing di atas komponen.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">helperText</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Teks informasi tambahan di bawah kontainer.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">error</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Pesan kesalahan validasi tingkat formulir.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">value</code></td>
                      <td><code className="api-type-code">UploadFileItem[]</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Daftar berkas terkontrol (*controlled state*).</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">defaultValue</code></td>
                      <td><code className="api-type-code">UploadFileItem[]</code></td>
                      <td><code className="api-default-code">[]</code></td>
                      <td>Daftar berkas awal tak terkontrol (*uncontrolled state*).</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">onChange</code></td>
                      <td><code className="api-type-code">(files: UploadFileItem[]) =&gt; void</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Callback saat terjadi perubahan daftar berkas.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">onDrop</code></td>
                      <td><code className="api-type-code">(files: File[]) =&gt; void</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Callback saat pengguna melepaskan berkas ke dropzone.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">onRemove</code></td>
                      <td><code className="api-type-code">(file: UploadFileItem) =&gt; void</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Callback saat tombol hapus berkas diklik.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">onRetry</code></td>
                      <td><code className="api-type-code">(file: UploadFileItem) =&gt; void</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>Callback saat tombol coba lagi (retry) diklik pada berkas gagal.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">simulateUpload</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">true</code></td>
                      <td>Simulasi progres pengunggahan interaktif bawaan.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">showFileList</code></td>
                      <td><code className="api-type-code">boolean</code></td>
                      <td><code className="api-default-code">true</code></td>
                      <td>Menentukan apakah daftar kartu berkas ditampilkan di bawah trigger.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">avatarShape</code></td>
                      <td><code className="api-type-code">'circle' | 'rounded'</code></td>
                      <td><code className="api-default-code">'circle'</code></td>
                      <td>Bentuk bingkai untuk varian avatar (lingkaran atau squircle).</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">avatarFallbackUrl</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><code className="api-default-code">undefined</code></td>
                      <td>URL foto bawaan untuk varian avatar sebelum ada gambar baru.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: UploadFileItem Interface */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-text-md)', color: 'var(--color-text-primary)' }}>
                  UploadFileItem Interface
                </span>
                <span className="api-count-badge">9 fields</span>
              </div>

              <div className="api-table-wrapper">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>Field</th>
                      <th style={{ width: '28%' }}>Type</th>
                      <th style={{ width: '12%' }}>Requirement</th>
                      <th style={{ width: '40%' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code className="api-prop-code">id</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><span className="api-req-badge">REQUIRED</span></td>
                      <td>Pengenal unik berkas dalam antrean.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">name</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><span className="api-req-badge">REQUIRED</span></td>
                      <td>Nama asli berkas beserta ekstensinya.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">size</code></td>
                      <td><code className="api-type-code">number</code></td>
                      <td><span className="api-req-badge">REQUIRED</span></td>
                      <td>Ukuran berkas dalam satuan byte.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">type</code></td>
                      <td><code className="api-type-code">string</code></td>
                      <td><span className="api-req-badge">REQUIRED</span></td>
                      <td>MIME type berkas (misal <code className="api-type-code">"application/pdf"</code>).</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">progress</code></td>
                      <td><code className="api-type-code">number</code></td>
                      <td><span className="api-req-badge">REQUIRED</span></td>
                      <td>Persentase pengunggahan aktif (0–100).</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">status</code></td>
                      <td><code className="api-type-code">'idle' | 'uploading' | 'success' | 'error'</code></td>
                      <td><span className="api-req-badge">REQUIRED</span></td>
                      <td>Status siklus hidup pengunggahan saat ini.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">error</code></td>
                      <td><code className="api-type-code">string | undefined</code></td>
                      <td><span className="api-opt-badge">OPTIONAL</span></td>
                      <td>Deskripsi penyebab kegagalan jika status bernilai <code className="api-type-code">'error'</code>.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">previewUrl</code></td>
                      <td><code className="api-type-code">string | undefined</code></td>
                      <td><span className="api-opt-badge">OPTIONAL</span></td>
                      <td>URL objek blob pratinjau thumbnail untuk berkas gambar.</td>
                    </tr>
                    <tr>
                      <td><code className="api-prop-code">uploadedAt</code></td>
                      <td><code className="api-type-code">Date | undefined</code></td>
                      <td><span className="api-opt-badge">OPTIONAL</span></td>
                      <td>Stempel waktu saat pengunggahan berhasil diselesaikan.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'comp-dropdown', label: t.nav.compDropdown || 'Dropdown' }}
        next={{ id: 'comp-input', label: t.nav.compInput || 'Input' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
