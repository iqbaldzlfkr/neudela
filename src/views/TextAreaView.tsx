import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import NeuronTextArea, { 
  TextAreaSize, 
  TextAreaVariant, 
  TextAreaResize, 
  TextAreaState 
} from '../components/NeuronTextArea';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import NeuronInput from '../components/NeuronInput';
import NeuronAvatar from '../components/NeuronAvatar';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { 
  Send, 
  Paperclip, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Bold,
  Italic,
  Strikethrough,
  Heading3,
  Quote,
  Code,
  List,
  ListOrdered,
  Link2,
  Bug,
  Clock,
  Plus,
  X,
  CheckCircle2,
  RotateCcw,
  Smile,
  Trash2,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface TextAreaViewProps {
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
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Visual Anatomy Viewer
// ─────────────────────────────────────────────
interface AnatomyItem {
  id: number;
  name: string;
  category: string;
  desc: string;
  tip: string;
}

function TextAreaAnatomyViewer({ isId }: { isId: boolean }) {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const anatomyItems: AnatomyItem[] = [
    {
      id: 1,
      name: isId ? 'Label Bidang & Tanda Wajib' : 'Field Label & Required Mark',
      category: 'Hierarchy',
      desc: isId
        ? 'Teks label ringkas yang memberi tahu pengguna konten multi-baris apa yang diharapkan, dengan tanda bintang untuk kolom wajib.'
        : 'Concise label informing users what multi-line text is expected, with asterisk indicating mandatory fields.',
      tip: isId
        ? 'Selalu tampilkan label; jangan hanya mengandalkan placeholder sebagai pengganti label.'
        : 'Always keep labels visible; never rely solely on placeholder text as a substitute for labels.'
    },
    {
      id: 2,
      name: isId ? 'Ikon Bantuan & Tooltip' : 'Help Icon & Tooltip',
      category: 'Context',
      desc: isId
        ? 'Pemicu kontekstual yang menyediakan instruksi tambahan, petunjuk format, atau aturan karakter tanpa memenuhi tata letak.'
        : 'Contextual info button providing supplementary instructions, format hints, or privacy details without cluttering.',
      tip: isId
        ? 'Gunakan tooltip untuk petunjuk format khusus atau aturan panjang teks.'
        : 'Use help tooltips for domain-specific formatting tips or length rules.'
    },
    {
      id: 3,
      name: isId ? 'Kontainer Text Area' : 'Text Area Container',
      category: 'Input Area',
      desc: isId
        ? 'Kotak input multi-baris dengan sudut membulat, latar belakang permukaan halus, dan status fokus berstandar aksesibilitas.'
        : 'Multi-line text canvas with accessible focus border, rounded radius, and comfortable padding for long compositions.',
      tip: isId
        ? 'Sediakan baris awal yang memadai (minimal 3 baris) agar pengguna leluasa mengetik.'
        : 'Provide generous initial rows (min 3) so users have sufficient space to begin typing.'
    },
    {
      id: 4,
      name: isId ? 'Area Konten & Teks' : 'Content Field & Text Area',
      category: 'Typography',
      desc: isId
        ? 'Area penulisan teks dengan tinggi baris nyaman 1.5, kontras tipografi jelas, dan pembungkusan teks otomatis.'
        : 'Content composition canvas with 1.5 line-height, clear typographical contrast, and text wrapping.',
      tip: isId
        ? 'Gunakan ukuran font standar 12px (sm), 14px (md), atau 16px (lg).'
        : 'Standardized typography scale: 12px (sm), 14px (md), or 16px (lg).'
    },
    {
      id: 5,
      name: isId ? 'Pesan Bantuan / Validasi' : 'Helper & Validation Message',
      category: 'Feedback',
      desc: isId
        ? 'Slot pesan di kiri bawah untuk panduan persisten, petunjuk format, atau umpan balik status error/sukses dinamis.'
        : 'Bottom-left message slot rendering persistent guidance, character requirements, or dynamic error/success messages.',
      tip: isId
        ? 'Jelaskan cara mengatasi kesalahan dengan jelas alih-alih hanya menyatakan bahwa terjadi kesalahan.'
        : 'Describe how to resolve errors clearly rather than just stating that an error occurred.'
    },
    {
      id: 6,
      name: isId ? 'Penghitung Karakter Langsung' : 'Live Character Counter',
      category: 'Counter',
      desc: isId
        ? 'Penghitung di kanan bawah yang menampilkan jumlah karakter secara real-time dan peringatan saat mendekati batas maksimal.'
        : 'Bottom-right counter showing live character (or word) count with warning thresholds when approaching the maximum limit.',
      tip: isId
        ? 'Tampilkan counter jika ada batasan karakter ketat untuk mencegah pemotongan tak terduga.'
        : 'Show the counter whenever a strict character limit is enforced to prevent surprise truncations.'
    },
    {
      id: 7,
      name: isId ? 'Handle Pengubah Ukuran' : 'Resize Corner Handle',
      category: 'Control',
      desc: isId
        ? 'Grip di sudut kanan bawah yang memungkinkan pengguna memperluas tinggi bidang secara vertikal sesuai kebutuhan.'
        : 'Draggable corner allowing users to expand the box vertically to fit large blocks of content.',
      tip: isId
        ? 'Gunakan resize="vertical" untuk formulir panjang atau autoResize="auto" untuk chat.'
        : 'Prefer vertical resize for long feedback forms or autoResize for chat composers.'
    }
  ];

  const activeDetail = anatomyItems.find((item) => item.id === activeZone);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-4)',
      alignItems: 'start'
    }}>
      {/* Left Stage: Clean Non-Overlapping Canvas */}
      <div style={{
        background: 'var(--color-bg-subtle)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            {isId ? 'Kanvas Anatomi Interaktif' : 'Interactive Anatomy Canvas'}
          </span>
          <NeuronBadge size="sm" variant="brand">
            {isId ? '7 Zona Komponen' : '7 Component Zones'}
          </NeuronBadge>
        </div>

        {/* Anatomical Card Display */}
        <div style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          boxShadow: 'var(--shadow-xs)'
        }}>
          {/* Top Row: Label (1) & Help Icon (2) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            {/* Zone 1: Label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                background: activeZone === 1 ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                outline: activeZone === 1 ? '1.5px solid var(--color-primary)' : 'none',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={() => setActiveZone(1)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 1 ? null : 1)}
            >
              <span className="anatomy-number" style={{
                width: '20px',
                height: '20px',
                fontSize: '11px',
                background: activeZone === 1 ? 'var(--color-primary)' : 'var(--slate-100)',
                color: activeZone === 1 ? '#ffffff' : 'var(--slate-700)',
                border: activeZone === 1 ? 'none' : '1px solid var(--slate-300)',
                marginTop: 0
              }}>
                1
              </span>
              <label className="neuron-label" style={{ margin: 0, fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                {isId ? 'Deskripsi Rinci' : 'Detailed Description'} <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
            </div>

            {/* Zone 2: Help Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                background: activeZone === 2 ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                outline: activeZone === 2 ? '1.5px solid var(--color-primary)' : 'none',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={() => setActiveZone(2)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 2 ? null : 2)}
            >
              <span style={{ color: 'var(--color-text-tertiary)', display: 'inline-flex' }}>
                <HelpCircle size={15} />
              </span>
              <span className="anatomy-number" style={{
                width: '20px',
                height: '20px',
                fontSize: '11px',
                background: activeZone === 2 ? 'var(--color-primary)' : 'var(--slate-100)',
                color: activeZone === 2 ? '#ffffff' : 'var(--slate-700)',
                border: activeZone === 2 ? 'none' : '1px solid var(--slate-300)',
                marginTop: 0
              }}>
                2
              </span>
            </div>
          </div>

          {/* Main Text Area Box (Zone 3, 4, 7) */}
          <div style={{
            position: 'relative',
            background: 'var(--color-bg-surface)',
            border: activeZone === 3 ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            minHeight: '114px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: activeZone === 3 ? '0 0 0 3px rgba(223, 126, 48, 0.18)' : 'none',
            transition: 'all 0.2s ease',
            marginTop: '8px',
            marginBottom: '8px'
          }}>
            {/* Callout Marker 3 (Container) sitting neatly on top-left edge */}
            <div
              style={{
                position: 'absolute',
                top: '-11px',
                left: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: activeZone === 3 ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                color: activeZone === 3 ? '#ffffff' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '1px 8px 1px 2px',
                fontSize: '11px',
                fontWeight: 600,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'all 0.18s ease',
                zIndex: 2
              }}
              onMouseEnter={() => setActiveZone(3)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 3 ? null : 3)}
            >
              <span className="anatomy-number" style={{
                width: '16px',
                height: '16px',
                fontSize: '10px',
                background: activeZone === 3 ? '#ffffff' : 'var(--slate-200)',
                color: activeZone === 3 ? 'var(--color-primary)' : 'var(--slate-700)',
                border: 'none',
                marginTop: 0
              }}>
                3
              </span>
              <span>{isId ? 'Kontainer' : 'Container'}</span>
            </div>

            {/* Zone 4: Content Area */}
            <div
              style={{
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: 'var(--radius-sm)',
                background: activeZone === 4 ? 'rgba(223, 126, 48, 0.08)' : 'transparent',
                outline: activeZone === 4 ? '1.5px dashed var(--color-primary)' : 'none',
                transition: 'all 0.18s ease',
                marginTop: '4px'
              }}
              onMouseEnter={() => setActiveZone(4)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 4 ? null : 4)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span className="anatomy-number" style={{
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  background: activeZone === 4 ? 'var(--color-primary)' : 'var(--slate-100)',
                  color: activeZone === 4 ? '#ffffff' : 'var(--slate-700)',
                  border: activeZone === 4 ? 'none' : '1px solid var(--slate-300)',
                  marginTop: 0
                }}>
                  4
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)' }}>
                  {isId ? 'Teks Konten (1.5 line-height)' : 'Content Field (1.5 line-height)'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                {isId
                  ? 'Aplikasi berjalan lancar dan performa meningkat secara signifikan setelah menerapkan caching respons sisi klien di seluruh tampilan data...'
                  : 'The application performance improved significantly after enabling client-side response caching across data views...'}
              </p>
            </div>

            {/* Bottom Row Inside Box: Zone 7 (Resize Handle) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeZone === 7 ? 'rgba(223, 126, 48, 0.15)' : 'transparent',
                  outline: activeZone === 7 ? '1.5px solid var(--color-primary)' : 'none',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={() => setActiveZone(7)}
                onMouseLeave={() => setActiveZone(null)}
                onClick={() => setActiveZone(activeZone === 7 ? null : 7)}
              >
                <span className="anatomy-number" style={{
                  width: '20px',
                  height: '20px',
                  fontSize: '11px',
                  background: activeZone === 7 ? 'var(--color-primary)' : 'var(--slate-100)',
                  color: activeZone === 7 ? '#ffffff' : 'var(--slate-700)',
                  border: activeZone === 7 ? 'none' : '1px solid var(--slate-300)',
                  marginTop: 0,
                  flexShrink: 0
                }}>
                  7
                </span>
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  stroke={activeZone === 7 ? 'var(--color-primary)' : 'var(--color-text-tertiary)'} 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  style={{ opacity: 0.85, transition: 'stroke 0.18s ease' }}
                >
                  <line x1="10" y1="4" x2="4" y2="10" />
                  <line x1="10" y1="7.5" x2="7.5" y2="10" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Row Below Box: Zone 5 (Helper Text) and Zone 6 (Live Character Count) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Zone 5: Helper Text */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                background: activeZone === 5 ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                outline: activeZone === 5 ? '1.5px solid var(--color-primary)' : 'none',
                transition: 'all 0.18s ease',
                flex: 1,
                minWidth: 0
              }}
              onMouseEnter={() => setActiveZone(5)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 5 ? null : 5)}
            >
              <span className="anatomy-number" style={{
                width: '20px',
                height: '20px',
                fontSize: '11px',
                background: activeZone === 5 ? 'var(--color-primary)' : 'var(--slate-100)',
                color: activeZone === 5 ? '#ffffff' : 'var(--slate-700)',
                border: activeZone === 5 ? 'none' : '1px solid var(--slate-300)',
                marginTop: 0,
                flexShrink: 0
              }}>
                5
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', lineHeight: 1.35 }}>
                {isId ? 'Mendukung sintaks markdown untuk cuplikan kode.' : 'Markdown syntax is supported for code blocks.'}
              </span>
            </div>

            {/* Zone 6: Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                background: activeZone === 6 ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                outline: activeZone === 6 ? '1.5px solid var(--color-primary)' : 'none',
                transition: 'all 0.18s ease',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setActiveZone(6)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 6 ? null : 6)}
            >
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                108 / 500
              </span>
              <span className="anatomy-number" style={{
                width: '20px',
                height: '20px',
                fontSize: '11px',
                background: activeZone === 6 ? 'var(--color-primary)' : 'var(--slate-100)',
                color: activeZone === 6 ? '#ffffff' : 'var(--slate-700)',
                border: activeZone === 6 ? 'none' : '1px solid var(--slate-300)',
                marginTop: 0,
                flexShrink: 0
              }}>
                6
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Contextual Tip Card */}
        <div style={{
          padding: '10px 14px',
          background: activeDetail ? 'rgba(223, 126, 48, 0.08)' : 'var(--color-bg-surface)',
          border: activeDetail ? '1px solid rgba(223, 126, 48, 0.3)' : '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: '12px',
          color: activeDetail ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease'
        }}>
          <span style={{ fontSize: '14px' }}>{activeDetail ? '💡' : '👆'}</span>
          <span>
            {activeDetail ? (
              <>
                <strong style={{ color: 'var(--color-primary)' }}>{activeDetail.name}: </strong>
                {activeDetail.tip}
              </>
            ) : (
              isId
                ? 'Arahkan kursor atau klik zona bernomor (1–7) untuk melihat panduan teknis.'
                : 'Hover or click any numbered zone (1–7) to inspect technical guidelines.'
            )}
          </span>
        </div>
      </div>

      {/* Right Column: Clean Interactive Anatomy Labels */}
      <div className="anatomy-labels" style={{ gap: '8px' }}>
        {anatomyItems.map((item) => {
          const isSelected = activeZone === item.id;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: isSelected ? 'rgba(223, 126, 48, 0.06)' : 'var(--color-bg-surface)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                boxShadow: isSelected ? '0 2px 6px rgba(223, 126, 48, 0.12)' : 'none'
              }}
              onMouseEnter={() => setActiveZone(item.id)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(isSelected ? null : item.id)}
            >
              <span
                className="anatomy-number"
                style={{
                  background: isSelected ? 'var(--color-primary)' : 'var(--slate-100)',
                  color: isSelected ? '#ffffff' : 'var(--slate-700)',
                  border: isSelected ? 'none' : '1px solid var(--slate-300)',
                  transition: 'all 0.18s ease',
                  marginTop: '1px',
                  flexShrink: 0
                }}
              >
                {item.id}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '13px',
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)'
                  }}>
                    {item.name}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'JetBrains Mono',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: isSelected ? 'rgba(223, 126, 48, 0.15)' : 'var(--color-bg-subtle)',
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                    fontWeight: 500,
                    border: isSelected ? '1px solid rgba(223, 126, 48, 0.3)' : '1px solid var(--color-border)',
                  }}>
                    {item.category}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main View Component
// ─────────────────────────────────────────────
export default function TextAreaView({ setActiveTab }: TextAreaViewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';
  const [activeViewTab, setActiveViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Pattern 01: Bug Report states
  const [bugSummary, setBugSummary] = useState(
    isId ? 'Menu dropdown terpotong pada tampilan mobile di Mode Gelap' : 'Dropdown menu clipped on mobile viewport in Dark Mode'
  );
  const [bugCategory, setBugCategory] = useState('ui');
  const [bugSeverity, setBugSeverity] = useState('p2');
  const [bugSteps, setBugSteps] = useState(
    isId
      ? '1. Buka drawer pengaturan pada viewport mobile (< 768px)\n2. Ubah toggle tema ke Mode Gelap\n3. Klik dropdown "Pengaturan Akun"\n\nHasil Diharapkan: Menu terbuka penuh dan terlihat jelas\nHasil Teramati: Menu terpotong oleh batas overflow kontainer'
      : '1. Open settings drawer on mobile viewport (< 768px)\n2. Switch theme toggle to Dark Mode\n3. Click on the "Account Settings" dropdown\n\nExpected Result: Dropdown menu opens fully visible\nActual Result: Menu is clipped by container overflow boundary'
  );
  const [bugAttachments, setBugAttachments] = useState<string[]>([
    'screenshot-error-boundary.png (142 KB)'
  ]);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Interactive demo states
  const [autoGrowText, setAutoGrowText] = useState(
    'Type multiple sentences here to observe the auto-expanding behavior in action.\nNotice how the textarea expands smoothly without jarring scrollbars.'
  );
  const [counterText, setCounterText] = useState('Neudela design system ensures seamless enterprise typography and spacing.');
  
  // Pattern 03: Markdown Summary Editor states
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
  const [markdownText, setMarkdownText] = useState(
    '## Executive Summary\n\nNeudela is a multi-brand design system built for enterprise scale. It provides consistent spacing, typography, and component behavior across all products.\n\n**Key features:**\n- Token-based design\n- Accessible components\n- Full dark mode support'
  );
  
  // Pattern 04: Form Validation states
  const [validationInput, setValidationInput] = useState('');
  const [validationSubmitted, setValidationSubmitted] = useState(false);
  
  // Pattern 02: Chat Composer states
  interface ChatMessageItem {
    id: string;
    sender: 'other' | 'me';
    name: string;
    avatar?: string;
    initials: string;
    text: string;
    time: string;
  }

  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessageItem[]>([
    {
      id: '1',
      sender: 'other',
      name: 'Sophia Sterling',
      avatar: '/avatars/sophia.jpg',
      initials: 'SS',
      text: isId 
        ? 'Halo Iqbal! Selamat datang di simulasi chat Neudela. Coba ketik pesan beberapa baris di komposer bawah untuk melihat auto-resize bekerja.'
        : 'Hi Iqbal! Welcome to the Neudela chat composer demo. Try typing multiple lines below to observe the auto-expanding textarea in action.',
      time: '10:41 AM'
    },
    {
      id: '2',
      sender: 'me',
      name: isId ? 'Anda' : 'You',
      avatar: '/avatars/iqbal.jpg',
      initials: 'ID',
      text: isId
        ? 'Bagus sekali! Apakah textarea ini bertambah tinggi otomatis dari 1 baris hingga batas maksimal 5 baris?'
        : 'Nice! Does it smoothly expand from 1 row up to the 5-row maximum limit?',
      time: '10:42 AM'
    },
    {
      id: '3',
      sender: 'other',
      name: 'Sophia Sterling',
      avatar: '/avatars/sophia.jpg',
      initials: 'SS',
      text: isId
        ? 'Tepat sekali! Begitu melebihi 5 baris, scrollbar halus akan aktif otomatis tanpa pergeseran layout. Tekan Enter untuk mengirim atau Shift+Enter untuk baris baru.'
        : 'Exactly! Once it exceeds 5 rows, clean scrollbars activate without layout jumps. Press Enter to send or Shift+Enter for a newline.',
      time: '10:43 AM'
    }
  ]);

  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'me',
        name: isId ? 'Anda' : 'You',
        avatar: '/avatars/iqbal.jpg',
        initials: 'ID',
        text: chatMessage,
        time: timeStr
      }
    ]);
    setChatMessage('');
  };

  const handleChatKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  return (
    <div className="view-container">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">
              {language === 'id' ? 'Komponen' : 'Components'}
            </span>
            <h1 className="page-title">Text Area</h1>
            <p className="page-subtitle">
              {language === 'id'
                ? 'Bidang input teks multi-baris untuk menyusun konten panjang, catatan umpan balik, ringkasan markdown, dan pesan berukuran dinamis.'
                : 'Multi-line text input field enabling users to compose long-form content, feedback notes, markdown summaries, and dynamic auto-growing messages.'}
            </p>
          </div>
        </div>

        {/* ── Tab Bar (with divider matching other modules) ── */}
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

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content">
          {/* ── 1. Overview ── */}
          <div className="section-card">
            <h2 className="section-title">Overview</h2>
            <p className="section-description">
              {language === 'id'
                ? 'Text Area memungkinkan pengguna memasukkan dan mengedit teks multi-baris dengan kontrol tinggi baris yang nyaman, penghitung karakter langsung, dan opsi pengubahan ukuran dinamis.'
                : 'Text Area allows users to input and edit multi-line text with comfortable line-height control, live character limits, and dynamic auto-growing capabilities.'}
            </p>

            <div className="guideline-overview-grid">
              <div className="guideline-overview-item">
                <div className="guideline-overview-preview">
                  <div style={{ width: '100%', maxWidth: '380px' }}>
                    <NeuronTextArea
                      label={language === 'id' ? 'Umpan Balik Pengguna' : 'User Feedback'}
                      placeholder={language === 'id' ? 'Tuliskan masukan atau catatan detail di sini...' : 'Provide detailed feedback or observations here...'}
                      rows={3}
                      showCount
                      maxLength={300}
                      helperText={language === 'id' ? 'Membantu tim produk memahami konteks Anda.' : 'Helps our product team understand your context.'}
                    />
                  </div>
                </div>
                <p className="guideline-overview-caption">
                  {language === 'id'
                    ? 'Penggunaan standar untuk formulir ulasan, catatan transaksi, atau formulir pengajuan dengan batasan jumlah karakter.'
                    : 'Standard multi-line input for reviews, notes, and user feedback with live character count monitoring.'}
                </p>
              </div>

              <div className="guideline-overview-item">
                <div className="guideline-overview-preview">
                  <div style={{ width: '100%', maxWidth: '380px' }}>
                    <NeuronTextArea
                      autoResize
                      minRows={3}
                      maxRows={6}
                      label={language === 'id' ? 'Catatan Cepat / Pesan' : 'Quick Note / Message'}
                      placeholder={language === 'id' ? 'Ketik pesan di sini (tinggi otomatis menyesuaikan)...' : 'Type a note here (auto-expands as you type)...'}
                      helperText={language === 'id' ? 'Tinggi bidang bertambah otomatis tanpa scrollbar kaku.' : 'Auto-expands smoothly as more lines are typed.'}
                    />
                  </div>
                </div>
                <p className="guideline-overview-caption">
                  {language === 'id'
                    ? 'Mode auto-resize ideal untuk komposer percakapan, kolom diskusi tim, atau draf ringkasan cepat.'
                    : 'Auto-resize mode optimized for chat composers, team discussion threads, and dynamic note-taking.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── 2. Sizing Scale ── */}
          <div className="section-card">
            <h2 className="section-title">Sizing Scale</h2>
            <p className="section-description">
              {language === 'id'
                ? 'Tiga skala ukuran yang dikalibrasi secara proporsional dengan ukuran font standar 12px, 14px, dan 16px untuk menyesuaikan berbagai kebutuhan kepadatan informasi.'
                : 'Three calibrated proportional size scales featuring standardized 12px, 14px, and 16px font sizes to adapt across dense data tables, standard forms, and long-form editors.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              {/* Small (sm) - 12px */}
              <div style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-primary)' }}>Small (sm)</span>
                    <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)' }}>size="sm"</div>
                  </div>
                  <NeuronBadge size="sm" variant="gray">12px Font</NeuronBadge>
                </div>
                <NeuronTextArea
                  size="sm"
                  label={language === 'id' ? 'Catatan Cepat (sm)' : 'Quick Remark (sm)'}
                  placeholder={language === 'id' ? 'Teks 12px untuk sel tabel atau laci samping...' : '12px text for table cells or side drawers...'}
                  rows={2}
                />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'JetBrains Mono',
                }}>
                  <span>font-size: 12px</span>
                  <span>padding: 6px 10px</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
                  {language === 'id'
                    ? 'Terbaik untuk modal sidebars, panel inspektur, dan catatan baris kisi data.'
                    : 'Best for modal sidebars, inspector panels, and data grid row remarks.'}
                </span>
              </div>

              {/* Medium (md) - 14px (Default) */}
              <div style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-primary)' }}>Medium (md)</span>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-primary)', background: 'rgba(223, 126, 48, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                        Default
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)' }}>size="md"</div>
                  </div>
                  <NeuronBadge size="sm" variant="brand">14px Font</NeuronBadge>
                </div>
                <NeuronTextArea
                  size="md"
                  label={language === 'id' ? 'Cakupan Proyek (md)' : 'Project Scope (md)'}
                  placeholder={language === 'id' ? 'Teks 14px standar untuk formulir...' : 'Standard 14px multi-line text input...'}
                  rows={3}
                />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'JetBrains Mono',
                }}>
                  <span>font-size: 14px</span>
                  <span>padding: 8px 12px</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
                  {language === 'id'
                    ? 'Pilihan default untuk 90% aplikasi bisnis, formulir, dan dialog.'
                    : 'The default choice for 90% of business applications, forms, and dialogs.'}
                </span>
              </div>

              {/* Large (lg) - 16px */}
              <div style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-text-primary)' }}>Large (lg)</span>
                    <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)' }}>size="lg"</div>
                  </div>
                  <NeuronBadge size="sm" variant="success">16px Font</NeuronBadge>
                </div>
                <NeuronTextArea
                  size="lg"
                  label={language === 'id' ? 'Abstrak Artikel (lg)' : 'Article Abstract (lg)'}
                  placeholder={language === 'id' ? 'Teks 16px diperluas untuk artikel dan dokumentasi...' : 'Extended 16px writing space for articles and documentation...'}
                  rows={3}
                />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'JetBrains Mono',
                }}>
                  <span>font-size: 16px</span>
                  <span>padding: 10px 14px</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
                  {language === 'id'
                    ? 'Direkomendasikan untuk posting blog, penulis dokumentasi, dan halaman umpan balik khusus.'
                    : 'Recommended for blog posts, documentation writers, and dedicated feedback pages.'}
                </span>
              </div>
            </div>
          </div>

          {/* ── 3. Visual Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">Anatomy</h2>
            <p className="section-description">
              {language === 'id'
                ? 'Anatomi struktural komponen NeuronTextArea yang menampilkan zona interaktif, label, dan indikator umpan balik.'
                : 'Structural anatomy of the NeuronTextArea component showcasing its interactive zones, labels, and feedback indicators.'}
            </p>

            <TextAreaAnatomyViewer isId={language === 'id'} />
          </div>

          {/* ── 4. Resize Modes & Auto-Grow ── */}
          <div className="section-card">
            <h2 className="section-title">Resize Modes & Auto-Grow Behavior</h2>
            <p className="section-description">
              Support for dynamic auto-growing textareas that expand as users type, as well as vertical and fixed modes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              {/* Auto-Resize */}
              <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Auto-Grow (autoResize)</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Dynamically expands to eliminate scrollbars</div>
                  </div>
                  <NeuronBadge size="sm" variant="brand">Modern UX</NeuronBadge>
                </div>
                <NeuronTextArea
                  autoResize
                  minRows={3}
                  maxRows={8}
                  label="Dynamic Thought Journal"
                  value={autoGrowText}
                  onChange={(e) => setAutoGrowText(e.target.value)}
                  helperText="Clamps cleanly to max 8 rows before activating smooth vertical scrolling."
                />
              </div>

              {/* Vertical Manual Resize */}
              <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Manual Vertical Resize</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Classic draggable corner grip</div>
                  </div>
                  <NeuronBadge size="sm" variant="gray">resize="vertical"</NeuronBadge>
                </div>
                <NeuronTextArea
                  resize="vertical"
                  rows={3}
                  label="Custom Dimensions"
                  placeholder="Drag the bottom-right corner to adjust height manually..."
                  helperText="User-controlled height with horizontal dimension locked."
                />
              </div>

              {/* Fixed / None */}
              <div style={{ padding: 'var(--space-5)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px' }}>Fixed Height</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>No resize handle, internal scrollbar</div>
                  </div>
                  <NeuronBadge size="sm" variant="gray">resize="none"</NeuronBadge>
                </div>
                <NeuronTextArea
                  resize="none"
                  rows={3}
                  label="Fixed Form Field"
                  placeholder="Rigid multi-line container for strict grid layouts..."
                  helperText="Prevents accidental layout shifts in tight card matrices."
                />
              </div>
            </div>
          </div>

          {/* ── 4. Character & Word Counting ── */}
          <div className="section-card">
            <h2 className="section-title">Character & Word Limiting</h2>
            <p className="section-description">
              Built-in live character counters with threshold indicators that turn warning yellow at 90% and error red when exceeded.
            </p>

            <div style={{ maxWidth: 640, marginTop: 'var(--space-4)' }}>
              <NeuronTextArea
                label="Executive Summary (Max 120 Characters)"
                showCount
                maxLength={120}
                allowClear
                value={counterText}
                onChange={(e) => setCounterText(e.target.value)}
                helperText="Type past 120 characters to see the automatic counter alert styling."
              />
            </div>
          </div>

          {/* ── 5. Validation States ── */}
          <div className="section-card">
            <h2 className="section-title">Validation States & Messaging</h2>
            <p className="section-description">
              Contextual color tokens communicating success, warnings, errors, and standard helper instructions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              {/* Default */}
              <NeuronTextArea
                label="Default State"
                placeholder="Standard idle input field..."
                helperText="Informative hint explaining expected format."
                rows={2}
              />

              {/* Error */}
              <NeuronTextArea
                label="Error State"
                state="error"
                defaultValue="Incomplete submission"
                helperText="Description must contain at least 20 characters."
                rows={2}
              />

              {/* Warning */}
              <NeuronTextArea
                label="Warning State"
                state="warning"
                defaultValue="Contains non-ASCII characters that may not render correctly."
                helperText="Consider removing special symbols before saving."
                rows={2}
              />

              {/* Success */}
              <NeuronTextArea
                label="Success State"
                state="success"
                defaultValue="All verification criteria successfully passed."
                helperText="Ready for publishing."
                rows={2}
              />
            </div>
          </div>

          {/* ── 6. Formatting Toolbar (Rich Text / Markdown Editor Variant) ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  {language === 'id' ? 'Varian Fitur' : 'Variant Feature'}
                </span>
                <h2 className="section-title" style={{ margin: '2px 0 0 0' }}>
                  {language === 'id' ? 'Rich Text & Bilah Alat Pemformatan' : 'Rich Text & Formatting Toolbar'}
                </h2>
              </div>
              <NeuronBadge size="sm" variant="brand">withToolbar</NeuronBadge>
            </div>
            <p className="section-description">
              {language === 'id'
                ? 'Mengubah input multi-baris menjadi editor dokumen kaya siap-markdown dengan alat pemformatan terintegrasi (Tebal, Miring, Coretan, Judul H3, Kutipan, Kode Sebaris, Daftar Poin/Angka, dan Tautan). Mendukung pintasan keyboard (⌘B, ⌘I, ⌘K) serta penempatan bilah alat di atas maupun di bawah.'
                : 'Elevate multi-line inputs into markdown-ready document editors with integrated formatting tools (Bold, Italic, Strikethrough, Headings, Blockquotes, Inline Code, Lists, and Links). Includes keyboard shortcuts (⌘B, ⌘I, ⌘K) and customizable placement.'}
            </p>

            {/* Two Side-by-Side Polished Demo Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              {/* Top Toolbar (Default) */}
              <div style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
                      {language === 'id' ? 'Bilah Alat Atas (Editor Dokumen)' : 'Top Toolbar (Standard Document Editor)'}
                    </strong>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {language === 'id'
                        ? 'Tata letak standar untuk artikel panjang, catatan teknis, dan draf dokumentasi.'
                        : 'Standard placement optimized for long-form articles, technical notes, and documentation.'}
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="brand">toolbarPosition="top"</NeuronBadge>
                </div>

                <NeuronTextArea
                  label={language === 'id' ? 'Abstrak & Catatan Artikel' : 'Article Abstract & Notes'}
                  withToolbar
                  toolbarPosition="top"
                  rows={5}
                  defaultValue={language === 'id'
                    ? "### Ringkasan Eksekutif\nTim kami telah berhasil menyelesaikan migrasi **Neudela 2.0**.\n- Token desain berkinerja tinggi\n- Dukungan aksesibilitas menyeluruh"
                    : "### Executive Summary\nOur team has successfully completed the **Neudela 2.0** migration.\n- High performance design tokens\n- Robust accessibility support"}
                  showCount
                  maxLength={500}
                  helperText={language === 'id'
                    ? 'Sorot teks dan klik alat format atau gunakan pintasan seperti ⌘B atau ⌘I.'
                    : 'Highlight text and click any toolbar tool to wrap syntax, or press shortcuts like ⌘B.'}
                />

                <div style={{
                  fontSize: '11px',
                  color: 'var(--color-text-tertiary)',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>💡</span>
                  <span>
                    {language === 'id'
                      ? 'Posisi atas memberikan pengalaman intuitif serupa pengolah kata tradisional yang mudah dijangkau sebelum mulai mengetik.'
                      : 'Top positioning delivers a familiar word-processor layout where actions are visible before drafting content.'}
                  </span>
                </div>
              </div>

              {/* Bottom Toolbar (Messenger / Chat Composer) */}
              <div style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
                      {language === 'id' ? 'Bilah Alat Bawah (Gaya Komposer & Chat)' : 'Bottom Toolbar (Chat & Composer Style)'}
                    </strong>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {language === 'id'
                        ? 'Menempatkan tombol aksi berdekatan dengan tombol kirim di area obrolan atau komentar.'
                        : 'Places action tools adjacent to submit buttons in comment threads and message composers.'}
                    </div>
                  </div>
                  <NeuronBadge size="sm" variant="neutral">toolbarPosition="bottom"</NeuronBadge>
                </div>

                <NeuronTextArea
                  label={language === 'id' ? 'Balasan Diskusi Komunitas' : 'Community Discussion Reply'}
                  withToolbar
                  toolbarPosition="bottom"
                  rows={4}
                  defaultValue={language === 'id'
                    ? "Terima kasih atas masukannya! Anda dapat mengujinya dengan menjalankan skrip `npm run dev`."
                    : "Thanks for the feedback! You can test this using the `npm run dev` script."}
                  showCount
                  countType="words"
                  helperText={language === 'id'
                    ? 'Posisi bawah menjaga tombol format tetap dekat dengan tombol aksi kirim.'
                    : 'Bottom placement keeps formatting actions closer to submit buttons.'}
                />

                <div style={{
                  fontSize: '11px',
                  color: 'var(--color-text-tertiary)',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>⚡</span>
                  <span>
                    {language === 'id'
                      ? 'Posisi bawah meminimalkan pergerakan kursor saat pengguna selesai menulis dan bersiap mengirim pesan.'
                      : 'Bottom placement minimizes cursor travel distance when users transition from composing to submitting.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Formatting Shortcut Reference Table */}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, margin: 0, color: 'var(--color-text-primary)' }}>
                  {language === 'id'
                    ? 'Referensi Sintaks Markdown & Pintasan Papan Ketik'
                    : 'Integrated Formatting Syntax & Keyboard Shortcuts'}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '3px 0 0 0' }}>
                  {language === 'id'
                    ? 'Daftar alat bawaan bilah alat, sintaks markdown yang dihasilkan, dan kombinasi tombol pintasan.'
                    : 'Complete breakdown of built-in toolbar tools, markdown syntax output, and supported keybindings.'}
                </p>
              </div>

              <div className="api-table-wrapper">
                <table className="api-table">
                  <thead>
                    <tr>
                      <th style={{ width: '150px' }}>{language === 'id' ? 'Alat Format' : 'Tool / Action'}</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>{language === 'id' ? 'Ikon' : 'Icon'}</th>
                      <th style={{ width: '160px' }}>{language === 'id' ? 'Sintaks Markdown' : 'Markdown Output'}</th>
                      <th style={{ width: '180px' }}>{language === 'id' ? 'Pintasan Keyboard' : 'Keyboard Shortcut'}</th>
                      <th>{language === 'id' ? 'Deskripsi Perilaku' : 'Behavior'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Tebal (Bold)' : 'Bold'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Bold size={13} />
                        </span>
                      </td>
                      <td><code>**text**</code></td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <kbd className="key-cap">Ctrl/⌘</kbd> + <kbd className="key-cap">B</kbd>
                        </span>
                      </td>
                      <td>
                        {language === 'id'
                          ? 'Membungkus teks yang disorot dengan tanda bintang ganda atau menyisipkan placeholder teks tebal.'
                          : 'Wraps selected text in double asterisks or inserts a bold placeholder.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Miring (Italic)' : 'Italic'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Italic size={13} />
                        </span>
                      </td>
                      <td><code>*text*</code></td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <kbd className="key-cap">Ctrl/⌘</kbd> + <kbd className="key-cap">I</kbd>
                        </span>
                      </td>
                      <td>
                        {language === 'id'
                          ? 'Membungkus teks yang disorot dengan tanda bintang tunggal atau menyisipkan placeholder teks miring.'
                          : 'Wraps selected text in single asterisks or inserts an italic placeholder.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Coretan (Strikethrough)' : 'Strikethrough'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Strikethrough size={13} />
                        </span>
                      </td>
                      <td><code>~~text~~</code></td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <kbd className="key-cap">Ctrl/⌘</kbd> + <kbd className="key-cap">Shift</kbd> + <kbd className="key-cap">X</kbd>
                        </span>
                      </td>
                      <td>
                        {language === 'id'
                          ? 'Membungkus pilihan teks dengan tanda tilde ganda untuk efek coretan.'
                          : 'Wraps selection in double tildes for strike-through styling.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Judul H3 (Heading)' : 'Heading 3'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Heading3 size={13} />
                        </span>
                      </td>
                      <td><code>### heading</code></td>
                      <td><span style={{ color: 'var(--color-text-tertiary)' }}>—</span></td>
                      <td>
                        {language === 'id'
                          ? 'Menambahkan atau menghapus awalan ### judul level 3 pada baris aktif.'
                          : 'Toggles ### prefix on the current line or selection.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Kutipan Blok (Quote)' : 'Blockquote'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Quote size={13} />
                        </span>
                      </td>
                      <td><code>&gt; quote</code></td>
                      <td><span style={{ color: 'var(--color-text-tertiary)' }}>—</span></td>
                      <td>
                        {language === 'id'
                          ? 'Menyisipkan simbol kutipan blok > di awal baris yang dipilih.'
                          : 'Prepends blockquote symbol > to current or selected lines.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Kode Sebaris (Inline Code)' : 'Inline Code'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Code size={13} />
                        </span>
                      </td>
                      <td><code>`code`</code></td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <kbd className="key-cap">Ctrl/⌘</kbd> + <kbd className="key-cap">E</kbd>
                        </span>
                      </td>
                      <td>
                        {language === 'id'
                          ? 'Membungkus teks yang disorot dengan tanda backtick sebaris untuk cuplikan kode atau variabel.'
                          : 'Wraps selected text in inline backticks for code snippets and variable names.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Daftar Poin (Bullet List)' : 'Bulleted List'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <List size={13} />
                        </span>
                      </td>
                      <td><code>- item</code></td>
                      <td><span style={{ color: 'var(--color-text-tertiary)' }}>—</span></td>
                      <td>
                        {language === 'id'
                          ? 'Menambahkan penanda poin - di awal setiap baris teks yang dipilih.'
                          : 'Prepends hyphen bullet markers to each selected line.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Daftar Angka (Numbered List)' : 'Numbered List'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <ListOrdered size={13} />
                        </span>
                      </td>
                      <td><code>1. item</code></td>
                      <td><span style={{ color: 'var(--color-text-tertiary)' }}>—</span></td>
                      <td>
                        {language === 'id'
                          ? 'Menyisipkan penomoran urut otomatis (1., 2., ...) pada baris yang dipilih.'
                          : 'Prepends ordered numbers (1., 2., ...) to each selected line.'}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ color: 'var(--color-text-primary)' }}>
                          {language === 'id' ? 'Tautan (Link)' : 'Hyperlink'}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                          <Link2 size={13} />
                        </span>
                      </td>
                      <td><code>[text](url)</code></td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <kbd className="key-cap">Ctrl/⌘</kbd> + <kbd className="key-cap">K</kbd>
                        </span>
                      </td>
                      <td>
                        {language === 'id'
                          ? 'Menghasilkan sintaks tautan markdown dengan teks terpilih dan placeholder URL.'
                          : 'Generates markdown hyperlink syntax around selection with URL placeholder.'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 7. Accessibility & Keyboard Ergonomics ── */}
          <div className="section-card">
            <h2 className="section-title">Accessibility & Keyboard Navigation</h2>
            <p className="section-description">
              Compliant with WCAG 2.1 AA standards featuring programmatic label associations and standard keyboard behaviors.
            </p>

            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Key / Attribute</th>
                    <th>Target</th>
                    <th>Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><kbd className="key-cap">Tab</kbd></td>
                    <td>Focus</td>
                    <td>Moves focus to the textarea element; native tab order preserved.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">Shift</kbd> + <kbd className="key-cap">Tab</kbd></td>
                    <td>Focus</td>
                    <td>Moves focus to the previous interactive element on the page.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">Enter</kbd></td>
                    <td>Input</td>
                    <td>Standard newline break in document mode; triggers message send in single-action chat mode.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">Shift</kbd> + <kbd className="key-cap">Enter</kbd></td>
                    <td>Chat Mode</td>
                    <td>Inserts a multiline break without submitting the message.</td>
                  </tr>
                  <tr>
                    <td><code>aria-invalid</code></td>
                    <td>State</td>
                    <td>Set to <code>true</code> automatically when state is error or characters exceed limit.</td>
                  </tr>
                  <tr>
                    <td><code>aria-describedby</code></td>
                    <td>Helper</td>
                    <td>Points to the helper / error text ID so screen readers announce validation messages.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 7. Best Practices ── */}
          <div className="section-card">
            <h2 className="section-title">Best Practices</h2>
            <p className="section-description">
              Essential design and implementation recommendations when utilizing multi-line textareas in enterprise interfaces.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Use Auto-Grow for Chat & Comments</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Apply <code>autoResize</code> for messaging composers so users can review their full sentence structure without battling nested scrollbars.
                </p>
              </RuleCard>

              <RuleCard type="dont">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Don't Hide Limits Until Submit Fails</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Never surprise users with "text too long" errors upon submit. Always enable <code>showCount</code> with <code>maxLength</code> to provide live feedback.
                </p>
              </RuleCard>

              <RuleCard type="do">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Provide Clear Helper Descriptions</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Always clarify expected formatting (e.g., Markdown support, allowed character sets, or required sections) in the helper text.
                </p>
              </RuleCard>

              <RuleCard type="dont">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Avoid Textareas for Single-Line Values</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Never use a textarea for email addresses, URLs, or phone numbers. Use <code>NeuronInput</code> for single-line data entries.
                </p>
              </RuleCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content">
          {/* ── Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <p className="section-description">
              {language === 'id' 
                ? 'Uji ukuran, varian kontainer, perilaku auto-resize, status validasi, dan batas penghitung karakter secara langsung dengan pembuatan kode dinamis.'
                : 'Test sizes, container variants, auto-resize behavior, validation states, and character counter limits in real time with dynamic code generation.'}
            </p>

            <Playground
              name="NeuronTextArea"
              knobs={[
                {
                  name: 'size',
                  label: 'Scale Size',
                  type: 'select',
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                },
                {
                  name: 'variant',
                  label: 'Container Variant',
                  type: 'select',
                  options: ['default', 'filled', 'ghost'],
                  default: 'default',
                },
                {
                  name: 'resize',
                  label: 'Resize Mode',
                  type: 'select',
                  options: ['vertical', 'auto', 'none', 'both'],
                  default: 'vertical',
                },
                {
                  name: 'state',
                  label: 'Validation State',
                  type: 'select',
                  options: ['default', 'error', 'warning', 'success'],
                  default: 'default',
                },
                {
                  name: 'showCount',
                  label: 'Show Character Count',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'allowClear',
                  label: 'Allow Clear Button',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'disabled',
                  label: 'Disabled',
                  type: 'boolean',
                  default: false,
                },
                {
                  name: 'readOnly',
                  label: 'Read Only',
                  type: 'boolean',
                  default: false,
                },
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  default: 'Project Description',
                },
                {
                  name: 'placeholder',
                  label: 'Placeholder',
                  type: 'text',
                  default: 'Provide a comprehensive overview of your project requirements...',
                },
                {
                  name: 'withToolbar',
                  label: 'Formatting Toolbar',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'toolbarPosition',
                  label: 'Toolbar Position',
                  type: 'select',
                  options: ['top', 'bottom'],
                  default: 'top',
                },
                {
                  name: 'helperText',
                  label: 'Helper Text',
                  type: 'text',
                  default: 'Markdown formatting is supported.',
                },
              ]}
              codeTemplates={(state) => {
                const resizeProp = state.resize !== 'vertical' ? `\n  resize="${state.resize}"` : '';
                const stateProp = state.state !== 'default' ? `\n  state="${state.state}"` : '';
                const toolbarProp = state.withToolbar 
                  ? `\n  withToolbar\n  toolbarPosition="${state.toolbarPosition}"` 
                  : '';
                const countProp = state.showCount ? '\n  showCount\n  maxLength={300}' : '';
                const clearProp = state.allowClear ? '\n  allowClear' : '';
                const disabledProp = state.disabled ? '\n  disabled' : '';
                const readonlyProp = state.readOnly ? '\n  readOnly' : '';

                return {
                  react: `<NeuronTextArea
  label="${state.label}"
  size="${state.size}"
  variant="${state.variant}"${toolbarProp}${resizeProp}${stateProp}${countProp}${clearProp}${disabledProp}${readonlyProp}
  placeholder="${state.placeholder}"
  helperText="${state.helperText}"
  rows={3}
/>`,
                  vue: `<NeuronTextArea
  label="${state.label}"
  size="${state.size}"
  variant="${state.variant}"${toolbarProp.replace('withToolbar', ':with-toolbar="true"').replace('toolbarPosition="', ':toolbar-position="')}${resizeProp.replace('resize="', ':resize="')}${stateProp.replace('state="', ':state="')}${countProp}${clearProp}${disabledProp}${readonlyProp}
  placeholder="${state.placeholder}"
  helper-text="${state.helperText}"
  :rows="3"
/>`,
                  html: `<div class="neuron-textarea-group neuron-textarea-group--${state.size}">
  <div class="neuron-textarea-header">
    <label class="neuron-label">${state.label}</label>
  </div>
  <div class="neuron-textarea-wrapper neuron-textarea-wrapper--${state.size} neuron-textarea-wrapper--${state.variant}${state.withToolbar ? ' neuron-textarea-wrapper--with-toolbar' : ''}">
    <textarea class="neuron-textarea neuron-textarea--resize-${state.resize}" rows="3" placeholder="${state.placeholder}"></textarea>
  </div>
  <div class="neuron-textarea-footer">
    <span class="neuron-helper-text">${state.helperText}</span>
  </div>
</div>`,
                };
              }}
            >
              {(state) => (
                <div style={{ width: '100%', maxWidth: '760px', margin: '0 auto' }}>
                  <NeuronTextArea
                    label={String(state.label)}
                    size={state.size as TextAreaSize}
                    variant={state.variant as TextAreaVariant}
                    resize={state.resize as TextAreaResize}
                    state={state.state as TextAreaState}
                    withToolbar={Boolean(state.withToolbar)}
                    toolbarPosition={state.toolbarPosition as 'top' | 'bottom'}
                    showCount={Boolean(state.showCount)}
                    maxLength={300}
                    allowClear={Boolean(state.allowClear)}
                    disabled={Boolean(state.disabled)}
                    readOnly={Boolean(state.readOnly)}
                    placeholder={String(state.placeholder)}
                    helperText={String(state.helperText)}
                    rows={3}
                  />
                </div>
              )}
            </Playground>
          </div>

          {/* ── Pattern 01: Customer Bug / Issue Ticket ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 01
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Formulir Laporan Bug & Tiket Insiden' : 'Bug Report & Incident Ticket Form'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">{isId ? 'Pola Formulir' : 'Form Pattern'}</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Alur pelaporan insiden multi-bidang dengan indikator wajib, pilihan kategori & keparahan, deskripsi berformat dengan toolbar Markdown, dan lampiran berkas.'
                : 'Multi-field issue reporting workflow featuring required indicators, category & severity selection, formatted description with Markdown toolbar, and attachments.'}
            </p>

            <div style={{ 
              maxWidth: '760px', 
              margin: 'var(--space-5) auto 0',
              background: 'var(--color-bg-surface)', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              {/* Card Header */}
              <div style={{ 
                padding: '16px 20px', 
                background: 'var(--color-bg-subtle)', 
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: 'var(--radius-lg)', 
                    background: 'rgba(239, 68, 68, 0.12)', 
                    color: '#ef4444', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Bug size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Tiket Laporan Insiden Baru' : 'New Incident Report Ticket'}
                      </h4>
                      <span style={{ 
                        fontFamily: 'JetBrains Mono, monospace', 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        color: 'var(--color-text-tertiary)',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        padding: '1px 6px',
                        borderRadius: '4px'
                      }}>
                        #INC-3042
                      </span>
                    </div>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Sampaikan laporan masalah teknis ke tim on-call engineering' : 'Submit technical incident details to on-call engineering'}
                    </p>
                  </div>
                </div>

                <NeuronBadge size="sm" variant={ticketSubmitted ? 'success' : 'warning'}>
                  {ticketSubmitted ? (isId ? 'Terkirim' : 'Submitted') : (isId ? 'Draf' : 'Draft')}
                </NeuronBadge>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {ticketSubmitted ? (
                  <div style={{ 
                    padding: '32px 20px', 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '12px' 
                  }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%', 
                      background: 'rgba(5, 150, 105, 0.12)', 
                      color: 'var(--emerald-600)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <CheckCircle2 size={28} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                        {isId ? 'Tiket #INC-3042 Berhasil Dikirim!' : 'Ticket #INC-3042 Submitted Successfully!'}
                      </h4>
                      <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '460px' }}>
                        {isId 
                          ? 'Laporan bug Anda telah masuk ke antrean triage tim engineering. Notifikasi respons awal akan dikirim melalui email.'
                          : 'Your bug report has been routed to the engineering triage queue. First response notification will be delivered via email.'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                      <NeuronButton 
                        size="sm" 
                        variant="outline"
                        onClick={() => setTicketSubmitted(false)}
                      >
                        <RotateCcw size={13} style={{ marginRight: 6 }} />
                        {isId ? 'Sunting Laporan' : 'Edit Report'}
                      </NeuronButton>
                      <NeuronButton 
                        size="sm" 
                        variant="primary"
                        onClick={() => {
                          setBugSummary('');
                          setBugSteps('');
                          setBugAttachments([]);
                          setTicketSubmitted(false);
                        }}
                      >
                        {isId ? 'Buat Tiket Baru' : 'Create Another Ticket'}
                      </NeuronButton>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Field 1: Issue Summary */}
                    <NeuronInput
                      label={isId ? 'Ringkasan Masalah' : 'Issue Summary'}
                      required
                      placeholder={isId ? 'Deskripsi singkat satu baris mengenai bug...' : 'Brief one-line overview of the bug...'}
                      value={bugSummary}
                      onChange={(e) => setBugSummary(e.target.value)}
                      helperText={isId ? 'Gunakan judul yang ringkas, jelas, dan spesifik.' : 'Provide a concise, descriptive title for quick triage.'}
                    />

                    {/* Field 2: Category & Severity Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                      {/* Category */}
                      <div className="neuron-form-group">
                        <label className="neuron-label">
                          {isId ? 'Kategori Masalah' : 'Issue Category'} <span className="neuron-label__required" aria-hidden="true">*</span>
                        </label>
                        <select 
                          className="neuron-input"
                          value={bugCategory}
                          onChange={(e) => setBugCategory(e.target.value)}
                          style={{ background: 'var(--color-bg-surface)', cursor: 'pointer' }}
                        >
                          <option value="ui">{isId ? 'UI & Tampilan Komponen' : 'UI & Component Rendering'}</option>
                          <option value="perf">{isId ? 'Performa & Kebocoran Memori' : 'Performance & Memory'}</option>
                          <option value="api">{isId ? 'API & Komunikasi Jaringan' : 'API & Network Request'}</option>
                          <option value="auth">{isId ? 'Autentikasi & Akses Akun' : 'Authentication & SSO'}</option>
                          <option value="a11y">{isId ? 'Aksesibilitas & Navigasi Keyboard' : 'Accessibility & Keyboard'}</option>
                        </select>
                      </div>

                      {/* Severity */}
                      <div className="neuron-form-group">
                        <label className="neuron-label">
                          {isId ? 'Tingkat Keparahan (Severity)' : 'Severity Level'} <span className="neuron-label__required" aria-hidden="true">*</span>
                        </label>
                        <select 
                          className="neuron-input"
                          value={bugSeverity}
                          onChange={(e) => setBugSeverity(e.target.value)}
                          style={{ background: 'var(--color-bg-surface)', cursor: 'pointer' }}
                        >
                          <option value="p1">{isId ? '🔴 P1 - Kritis (Layanan Terhenti)' : '🔴 P1 - Critical (System Blocker)'}</option>
                          <option value="p2">{isId ? '🟠 P2 - Tinggi (Fitur Utama Terganggu)' : '🟠 P2 - High (Major Feature Broken)'}</option>
                          <option value="p3">{isId ? '🟡 P3 - Sedang (Prioritas Normal)' : '🟡 P3 - Medium (Normal Priority)'}</option>
                          <option value="p4">{isId ? '🟢 P4 - Rendah (Kosmetik / Ringan)' : '🟢 P4 - Low (Cosmetic / Minor)'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Field 3: Reproduction Steps & Observed Behavior */}
                    <NeuronTextArea
                      label={isId ? 'Langkah Reproduksi & Perilaku Teramati' : 'Reproduction Steps & Observed Behavior'}
                      required
                      withToolbar
                      toolbarPosition="top"
                      autoResize
                      minRows={4}
                      maxRows={10}
                      showCount
                      maxLength={600}
                      value={bugSteps}
                      onChange={(e) => setBugSteps(e.target.value)}
                      placeholder={
                        isId
                          ? '1. Buka halaman pengaturan\n2. Klik tombol opsi...\n\nHasil Diharapkan:\nHasil Teramati:'
                          : '1. Navigate to Settings page\n2. Click on option...\n\nExpected Result:\nActual Result:'
                      }
                      helperText={
                        isId 
                          ? 'Gunakan toolbar di atas untuk memformat kode atau poin bernomor. Sertakan detail peramban & galat konsol.'
                          : 'Use formatting tools above for code snippets or numbered steps. Include browser & console outputs.'
                      }
                    />

                    {/* Field 4: Dedicated Attachments Section */}
                    <div>
                      <label className="neuron-label" style={{ marginBottom: '8px', display: 'block' }}>
                        {isId ? 'Lampiran Bukti Galat / Cuplikan Layar' : 'Attachments & Evidence'}
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        {bugAttachments.map((att, index) => (
                          <div 
                            key={index}
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              padding: '6px 12px', 
                              background: 'var(--color-bg-subtle)', 
                              border: '1px solid var(--color-border)', 
                              borderRadius: 'var(--radius-lg)', 
                              fontSize: '12px',
                              color: 'var(--color-text-primary)'
                            }}
                          >
                            <Paperclip size={13} color="var(--brand-600)" />
                            <span>{att}</span>
                            <button
                              type="button"
                              onClick={() => setBugAttachments(prev => prev.filter((_, i) => i !== index))}
                              style={{ 
                                border: 'none', 
                                background: 'transparent', 
                                cursor: 'pointer', 
                                color: 'var(--color-text-tertiary)', 
                                display: 'flex', 
                                alignItems: 'center',
                                padding: 2
                              }}
                              title={isId ? 'Hapus lampiran' : 'Remove attachment'}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}

                        <NeuronButton 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            const newFile = `console-trace-${Date.now().toString().slice(-4)}.log (32 KB)`;
                            setBugAttachments(prev => [...prev, newFile]);
                          }}
                        >
                          <Plus size={13} style={{ marginRight: 4 }} />
                          {isId ? 'Tambah Berkas' : 'Attach File'}
                        </NeuronButton>
                      </div>
                    </div>

                    {/* Field 5: Action Buttons & Autosave Status */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      flexWrap: 'wrap', 
                      gap: '12px', 
                      paddingTop: '16px', 
                      borderTop: '1px solid var(--color-border)' 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                        <Clock size={13} />
                        <span>{isId ? 'Draf otomatis tersimpan 2 menit lalu' : 'Draft autosaved 2m ago'}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <NeuronButton 
                          size="sm" 
                          variant="text"
                          onClick={() => {
                            setBugSummary('');
                            setBugSteps('');
                            setBugAttachments([]);
                          }}
                        >
                          {isId ? 'Atur Ulang' : 'Reset'}
                        </NeuronButton>
                        <NeuronButton 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            alert(isId ? 'Draf tiket berhasil disimpan secara lokal!' : 'Ticket draft saved locally!');
                          }}
                        >
                          {isId ? 'Simpan Draf' : 'Save Draft'}
                        </NeuronButton>
                        <NeuronButton 
                          size="sm" 
                          variant="primary"
                          disabled={!bugSummary.trim() || !bugSteps.trim()}
                          onClick={() => {
                            setTicketSubmitted(true);
                          }}
                        >
                          <Send size={13} style={{ marginRight: 6 }} />
                          {isId ? 'Kirim Tiket' : 'Submit Ticket'}
                        </NeuronButton>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Pattern 02: Auto-Growing Chat Composer ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 02
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Komposer Obrolan & Komentar Fleksibel (Auto-Growing)' : 'Auto-Growing Chat & Comment Composer'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="success">{isId ? 'Pesan Real-Time' : 'Real-Time Messaging'}</NeuronBadge>
            </div>
            <p className="section-description">
              {isId 
                ? 'Bidang input pesan yang otomatis membesar mengikuti volume ketikan (1–5 baris). Kirim dengan Enter atau buat baris baru dengan Shift + Enter.'
                : 'Expands smoothly with input volume (1–5 rows). Send with Enter or insert newlines with Shift + Enter.'}
            </p>

            <div style={{ 
              maxWidth: '760px', 
              margin: 'var(--space-5) auto 0',
              background: 'var(--color-bg-surface)', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              {/* Chat Header */}
              <div style={{ 
                padding: '14px 20px', 
                background: 'var(--color-bg-subtle)', 
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <NeuronAvatar 
                    src="/avatars/sophia.jpg" 
                    initials="SS" 
                    size="sm" 
                    status="online" 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Sophia Sterling
                      </h4>
                      <NeuronBadge size="sm" variant="brand">Support Lead</NeuronBadge>
                    </div>
                    <p style={{ margin: '1px 0 0 0', fontSize: '11px', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)', display: 'inline-block' }} />
                      {isId ? 'Aktif sekarang · #general-support' : 'Active now · #general-support'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <NeuronButton 
                    size="sm" 
                    variant="text"
                    onClick={() => {
                      setChatMessages([
                        {
                          id: '1',
                          sender: 'other',
                          name: 'Sophia Sterling',
                          avatar: '/avatars/sophia.jpg',
                          initials: 'SS',
                          text: isId 
                            ? 'Percakapan telah diatur ulang. Silakan ketik pesan baru di bawah.'
                            : 'Conversation has been reset. Feel free to start typing below.',
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    title={isId ? 'Bersihkan riwayat pesan' : 'Clear message history'}
                  >
                    <Trash2 size={13} style={{ marginRight: 4 }} />
                    {isId ? 'Hapus Riwayat' : 'Clear Chat'}
                  </NeuronButton>
                </div>
              </div>

              {/* Message Feed */}
              <div 
                ref={chatListRef}
                style={{ 
                  padding: '20px', 
                  minHeight: 220, 
                  maxHeight: 340, 
                  overflowY: 'auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px', 
                  background: 'var(--color-bg-canvas)' 
                }}
              >
                {/* Date separator pill */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 600, 
                    color: 'var(--color-text-tertiary)', 
                    background: 'var(--color-bg-surface)', 
                    border: '1px solid var(--color-border)', 
                    padding: '2px 10px', 
                    borderRadius: 'var(--radius-full)' 
                  }}>
                    {isId ? 'Hari ini' : 'Today'}
                  </span>
                </div>

                {chatMessages.map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div 
                      key={msg.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '8px',
                        flexDirection: isMe ? 'row-reverse' : 'row',
                        maxWidth: '85%',
                        alignSelf: isMe ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <NeuronAvatar 
                        src={msg.avatar}
                        initials={msg.initials}
                        size="xs"
                        variant={isMe ? 'brand' : 'gray'}
                      />

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', gap: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{msg.name}</span>
                          <span>{msg.time}</span>
                        </div>

                        <div 
                          style={{
                            padding: '10px 14px',
                            borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            fontSize: '13px',
                            lineHeight: 1.5,
                            background: isMe ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                            color: isMe ? '#ffffff' : 'var(--color-text-primary)',
                            border: isMe ? 'none' : '1px solid var(--color-border)',
                            boxShadow: 'var(--shadow-xs)',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Composer Box */}
              <div style={{ 
                padding: '14px 18px', 
                background: 'var(--color-bg-surface)', 
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <NeuronTextArea
                  autoResize
                  minRows={1}
                  maxRows={5}
                  variant="default"
                  placeholder={isId ? 'Tulis balasan... (Enter untuk kirim, Shift+Enter untuk baris baru)' : 'Write a reply... (Enter to send, Shift+Enter for newline)'}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={handleChatKeyDown}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <kbd className="key-cap" style={{ fontSize: '10px', padding: '1px 5px' }}>Enter</kbd> {isId ? 'kirim' : 'send'}
                    </span>
                    <span>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <kbd className="key-cap" style={{ fontSize: '10px', padding: '1px 5px' }}>Shift + Enter</kbd> {isId ? 'baris baru' : 'newline'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <NeuronButton 
                      size="sm" 
                      variant="text"
                      title={isId ? 'Lampirkan berkas' : 'Attach file'}
                      onClick={() => {
                        setChatMessage(prev => prev + (prev ? ' ' : '') + '📎 [file-attachment.pdf]');
                      }}
                    >
                      <Paperclip size={14} />
                    </NeuronButton>

                    <NeuronButton 
                      size="sm" 
                      variant="text"
                      title={isId ? 'Sisipkan emoji' : 'Insert emoji'}
                      onClick={() => {
                        setChatMessage(prev => prev + ' 👍');
                      }}
                    >
                      <Smile size={14} />
                    </NeuronButton>

                    <NeuronButton 
                      size="sm" 
                      variant="primary" 
                      disabled={!chatMessage.trim()}
                      onClick={handleSendChat}
                    >
                      <Send size={13} style={{ marginRight: 6 }} />
                      {isId ? 'Kirim' : 'Send'}
                    </NeuronButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pattern 03: Markdown Document Summary Editor ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 03
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Editor Ringkasan Dokumen Markdown' : 'Markdown Document Summary Editor'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">{isId ? 'Penghitung Kata' : 'Word Counter'}</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Antarmuka penulisan panjang dengan hitung kata real-time, tombol hapus, dan pratinjau Markdown.'
                : 'Long-form writing interface with live word count, clear trigger, and Markdown preview toggle.'}
            </p>

            {/* Centered article-editor card */}
            <div style={{
              maxWidth: '760px',
              margin: 'var(--space-5) auto 0',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              {/* Card Header */}
              <div style={{
                padding: '14px 20px',
                background: 'var(--color-bg-subtle)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--brand-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Ringkasan Artikel' : 'Article Summary'}
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Tulis dengan Markdown, pratinjau sebelum publikasi' : 'Write in Markdown, preview before publishing'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {showMarkdownPreview ? (
                    <NeuronButton
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowMarkdownPreview(false)}
                    >
                      <EyeOff size={13} style={{ marginRight: 4 }} />
                      {isId ? 'Kembali ke Editor' : 'Back to Editor'}
                    </NeuronButton>
                  ) : (
                    <NeuronButton
                      size="sm"
                      variant="outline"
                      onClick={() => setShowMarkdownPreview(true)}
                    >
                      <Eye size={13} style={{ marginRight: 4 }} />
                      {isId ? 'Pratinjau' : 'Preview'}
                    </NeuronButton>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {showMarkdownPreview ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Eye size={13} style={{ color: 'var(--brand-600)' }} />
                        {isId ? 'Pratinjau Hasil Markdown' : 'Live Rendered Markdown'}
                      </span>
                      <NeuronBadge size="xs" variant="brand">
                        {isId ? 'Format Aktif' : 'Formatted'}
                      </NeuronBadge>
                    </div>
                    <div
                      className="neuron-markdown-preview"
                      style={{
                        padding: '20px',
                        background: 'var(--color-bg-subtle)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        minHeight: 180,
                        maxHeight: 420,
                        overflowY: 'auto'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: markdownText.trim()
                          ? (marked.parse(markdownText, { gfm: true, breaks: true }) as string)
                          : `<span style="color: var(--color-text-tertiary); font-style: italic;">${isId ? 'Belum ada konten untuk dipratinjau. Tulis sesuatu di editor.' : 'Nothing to preview yet. Write something in the editor.'}</span>`
                      }}
                    />
                  </div>
                ) : (
                  <NeuronTextArea
                    rows={6}
                    withToolbar
                    toolbarPosition="top"
                    allowClear
                    showCount
                    countType="words"
                    value={markdownText}
                    onChange={(e) => setMarkdownText(e.target.value)}
                    placeholder={isId ? 'Tulis ringkasan artikel dalam Markdown...' : 'Write article summary in Markdown…'}
                    helperText={isId ? 'Gunakan toolbar untuk bold, italic, heading, list, kode, dan tautan.' : 'Use the toolbar for bold, italic, headings, lists, code blocks, and links.'}
                    toolbarExtra={
                      <button
                        type="button"
                        onClick={() => setShowMarkdownPreview(true)}
                        className="neuron-textarea-tool-btn"
                        title={isId ? 'Pratinjau Hasil Markdown' : 'Preview Markdown'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          width: 'auto',
                          height: '24px',
                          padding: '0 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--brand-600)',
                          background: 'rgba(99, 102, 241, 0.08)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          cursor: 'pointer'
                        }}
                      >
                        <Eye size={12} />
                        <span>{isId ? 'Pratinjau' : 'Preview'}</span>
                      </button>
                    }
                  />
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '14px'
                }}>
                  {showMarkdownPreview ? (
                    <NeuronButton size="sm" variant="secondary" onClick={() => setShowMarkdownPreview(false)}>
                      <EyeOff size={13} style={{ marginRight: 4 }} />
                      {isId ? 'Edit Kembali' : 'Back to Editor'}
                    </NeuronButton>
                  ) : (
                    <NeuronButton size="sm" variant="text" onClick={() => setMarkdownText('')}>
                      {isId ? 'Hapus' : 'Clear'}
                    </NeuronButton>
                  )}
                  <NeuronButton size="sm" variant="primary">
                    {isId ? 'Simpan Draf' : 'Save Draft'}
                  </NeuronButton>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pattern 04: Form Validation & Field Errors ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 04
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {isId ? 'Validasi Formulir & Peringatan Threshold' : 'Live Field Validation & Threshold Warning'}
                </h3>
              </div>
              <NeuronBadge size="sm" variant="error">{isId ? 'Validasi Formulir' : 'Form Validation'}</NeuronBadge>
            </div>
            <p className="section-description">
              {isId
                ? 'Validasi submit formulir yang mencegah pengiriman saat syarat minimum belum terpenuhi, dengan umpan balik error instan.'
                : 'Submit-time validation preventing submission when minimum requirements are unmet, with instant inline error feedback.'}
            </p>

            {/* Centered cancellation form card */}
            <div style={{
              maxWidth: '760px',
              margin: 'var(--space-5) auto 0',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xs)',
              overflow: 'hidden'
            }}>
              {/* Card Header */}
              <div style={{
                padding: '14px 20px',
                background: 'var(--color-bg-subtle)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Konfirmasi Pembatalan Langganan' : 'Subscription Cancellation Confirmation'}
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Tindakan ini tidak dapat dibatalkan setelah dikonfirmasi' : 'This action cannot be undone once confirmed'}
                    </p>
                  </div>
                </div>

                <NeuronBadge
                  size="sm"
                  variant={validationSubmitted && validationInput.length >= 15 ? 'success' : 'error'}
                >
                  {validationSubmitted && validationInput.length >= 15
                    ? (isId ? 'Dikonfirmasi' : 'Confirmed')
                    : (isId ? 'Menunggu' : 'Pending')}
                </NeuronBadge>
              </div>

              {/* Card Body */}
              {validationSubmitted && validationInput.length >= 15 ? (
                <div style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(5, 150, 105, 0.12)',
                    color: 'var(--emerald-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                      {isId ? 'Pembatalan Dikonfirmasi' : 'Cancellation Confirmed'}
                    </h4>
                    <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '380px' }}>
                      {isId
                        ? 'Permintaan pembatalan langganan Anda telah dicatat. Tim kami akan menghubungi dalam 1–2 hari kerja.'
                        : 'Your cancellation request has been logged. Our team will reach out within 1–2 business days.'}
                    </p>
                  </div>
                  <NeuronButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setValidationInput('');
                      setValidationSubmitted(false);
                    }}
                  >
                    <RotateCcw size={13} style={{ marginRight: 6 }} />
                    {isId ? 'Mulai Ulang' : 'Start Over'}
                  </NeuronButton>
                </div>
              ) : (
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Info banner */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 14px',
                    background: 'rgba(239, 68, 68, 0.06)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5
                  }}>
                    <AlertTriangle size={15} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                    <span>
                      {isId
                        ? 'Dengan membatalkan, Anda akan kehilangan akses ke semua fitur premium pada akhir periode penagihan saat ini.'
                        : 'By cancelling, you will lose access to all premium features at the end of your current billing period.'}
                    </span>
                  </div>

                  <NeuronTextArea
                    label={isId ? 'Alasan Pembatalan' : 'Reason for Cancellation'}
                    required
                    rows={3}
                    value={validationInput}
                    onChange={(e) => {
                      setValidationInput(e.target.value);
                      if (validationSubmitted) setValidationSubmitted(false);
                    }}
                    state={validationSubmitted && validationInput.length < 15 ? 'error' : 'default'}
                    helperText={
                      validationSubmitted && validationInput.length < 15
                        ? (isId
                            ? `Mohon berikan setidaknya 15 karakter. Saat ini: ${validationInput.length}/15.`
                            : `Please provide at least 15 characters. Current: ${validationInput.length}/15.`)
                        : (isId
                            ? 'Umpan balik Anda akan ditinjau oleh tim jaminan kualitas.'
                            : 'Your feedback will be reviewed by the quality assurance team.')
                    }
                  />

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '14px'
                  }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{
                        display: 'inline-block',
                        width: 6, height: 6,
                        borderRadius: '50%',
                        background: validationInput.length >= 15 ? 'var(--emerald-500)' : 'var(--color-border)',
                        transition: 'background 0.2s'
                      }} />
                      {isId
                        ? `Minimal 15 karakter diperlukan (${validationInput.length} diketik)`
                        : `Minimum 15 characters required (${validationInput.length} typed)`}
                    </span>
                    <NeuronButton
                      size="sm"
                      variant="primary"
                      onClick={() => setValidationSubmitted(true)}
                    >
                      {isId ? 'Konfirmasi Pembatalan' : 'Confirm Cancellation'}
                    </NeuronButton>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Props & API Reference (In Playbook Tab) ── */}
          <div className="section-card">
            <h2 className="section-title">Props & API Reference</h2>
            <p className="section-description">
              Comprehensive prop definitions and callback signatures for the NeuronTextArea component.
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
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Descriptive text rendered above the textarea.</td>
                  </tr>
                  <tr>
                    <td><code>labelAction</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>Auxiliary badge or link rendered right-aligned in the label row.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>Typography scale and padding density: sm (12px), md (14px), lg (16px).</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'filled' | 'ghost'</code></td>
                    <td><code>'default'</code></td>
                    <td>Visual container treatment: standard bordered box, subtle filled, or transparent ghost.</td>
                  </tr>
                  <tr>
                    <td><code>resize</code></td>
                    <td><code>'none' | 'vertical' | 'horizontal' | 'both' | 'auto'</code></td>
                    <td><code>'vertical'</code></td>
                    <td>Specifies the resize behavior. Use 'auto' for dynamic auto-growing heights.</td>
                  </tr>
                  <tr>
                    <td><code>autoResize</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Convenience flag to automatically expand textarea height based on content.</td>
                  </tr>
                  <tr>
                    <td><code>minRows</code></td>
                    <td><code>number</code></td>
                    <td><code>3</code></td>
                    <td>Minimum visible rows reserved when empty or in autoResize mode.</td>
                  </tr>
                  <tr>
                    <td><code>maxRows</code></td>
                    <td><code>number</code></td>
                    <td><code>10</code></td>
                    <td>Maximum visible rows before enabling internal scrollbars in autoResize mode.</td>
                  </tr>
                  <tr>
                    <td><code>rows</code></td>
                    <td><code>number</code></td>
                    <td><code>3</code></td>
                    <td>Initial row height when not in autoResize mode.</td>
                  </tr>
                  <tr>
                    <td><code>state</code></td>
                    <td><code>'default' | 'error' | 'warning' | 'success'</code></td>
                    <td><code>'default'</code></td>
                    <td>Contextual validation status determining border colors and focus rings.</td>
                  </tr>
                  <tr>
                    <td><code>destructive</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Convenience alias that forces state to 'error'.</td>
                  </tr>
                  <tr>
                    <td><code>showCount</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Renders character or word count in the bottom footer row.</td>
                  </tr>
                  <tr>
                    <td><code>maxLength</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>Maximum character limit; highlights warnings when nearing threshold.</td>
                  </tr>
                  <tr>
                    <td><code>countType</code></td>
                    <td><code>'characters' | 'words'</code></td>
                    <td><code>'characters'</code></td>
                    <td>Specifies whether to compute character length or whitespace-separated word count.</td>
                  </tr>
                  <tr>
                    <td><code>allowClear</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Shows a quick 'X' clear button inside the top-right when text is entered.</td>
                  </tr>
                  <tr>
                    <td><code>onClear</code></td>
                    <td><code>() =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback fired when the clear button is clicked.</td>
                  </tr>
                  <tr>
                    <td><code>leadingIcon</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>Icon displayed in the upper-left of the textarea wrapper.</td>
                  </tr>
                  <tr>
                    <td><code>actions</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>Slot in the bottom footer row for buttons, emoji pickers, or file uploaders.</td>
                  </tr>
                  <tr>
                    <td><code>withToolbar</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Enables formatting toolbar variant with bold, italic, lists, and markdown helpers.</td>
                  </tr>
                  <tr>
                    <td><code>toolbarPosition</code></td>
                    <td><code>'top' | 'bottom'</code></td>
                    <td><code>'top'</code></td>
                    <td>Positions the toolbar at the top (document editor) or bottom (chat composer).</td>
                  </tr>
                  <tr>
                    <td><code>toolbarTools</code></td>
                    <td><code>TextAreaToolType[]</code></td>
                    <td><code>DEFAULT_TOOLBAR_TOOLS</code></td>
                    <td>Customizable list of tools to display (bold, italic, strike, heading, quote, code, etc.).</td>
                  </tr>
                  <tr>
                    <td><code>toolbarExtra</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>Slot at the right side of the toolbar for custom actions (e.g. preview button).</td>
                  </tr>
                  <tr>
                    <td><code>helperText</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Auxiliary explanation or error feedback text rendered in the footer row.</td>
                  </tr>
                  <tr>
                    <td><code>helpIcon</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Displays an info icon next to the label with tooltip support.</td>
                  </tr>
                  <tr>
                    <td><code>helpTooltip</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Text content for the label help tooltip.</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Disables user interaction and applies muted background styling.</td>
                  </tr>
                  <tr>
                    <td><code>readOnly</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Prevents text modification while keeping focus and text selection active.</td>
                  </tr>
                  <tr>
                    <td><code>required</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Appends red required asterisk to label and sets aria-required.</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>(e: ChangeEvent) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Standard input change event callback.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-tree', label: t.nav.compTree || 'Tree View' }}
        next={{ id: 'comp-dropdown', label: t.nav.compDropdown }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
