import { useState, useEffect } from 'react';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface ColorsProps {
  setActiveTab: (tabId: string) => void;
}

const PALETTES = {
  brand: {
    titleKey: 'brandPalette',
    shades: [
      { name: '--brand-25', hex: '#fffcf7' },
      { name: '--brand-50', hex: '#fdf7ed' },
      { name: '--brand-100', hex: '#f8ebcd' },
      { name: '--brand-200', hex: '#f1ce96' },
      { name: '--brand-300', hex: '#eab05f' },
      { name: '--brand-400', hex: '#e5963a' },
      { name: '--brand-500', hex: '#df7e30' },
      { name: '--brand-600', hex: '#c3571c' },
      { name: '--brand-700', hex: '#a23c1b' },
      { name: '--brand-800', hex: '#84301c' },
      { name: '--brand-900', hex: '#6d291a' },
      { name: '--brand-950', hex: '#3e130a' },
    ]
  },
  slate: {
    titleKey: 'slatePalette',
    shades: [
      { name: '--slate-50', hex: '#f8fafc' },
      { name: '--slate-100', hex: '#f1f5f9' },
      { name: '--slate-200', hex: '#e2e8f0' },
      { name: '--slate-300', hex: '#cbd5e1' },
      { name: '--slate-400', hex: '#94a3b8' },
      { name: '--slate-500', hex: '#64748b' },
      { name: '--slate-600', hex: '#475569' },
      { name: '--slate-700', hex: '#334155' },
      { name: '--slate-800', hex: '#1e293b' },
      { name: '--slate-900', hex: '#0f172a' },
      { name: '--slate-950', hex: '#020617' },
    ]
  },
  gray: {
    titleKey: 'grayPalette',
    shades: [
      { name: '--gray-50', hex: '#f9fafb' },
      { name: '--gray-100', hex: '#f3f4f6' },
      { name: '--gray-200', hex: '#e5e7eb' },
      { name: '--gray-300', hex: '#d1d5db' },
      { name: '--gray-400', hex: '#9ca3af' },
      { name: '--gray-500', hex: '#6b7280' },
      { name: '--gray-600', hex: '#4b5563' },
      { name: '--gray-700', hex: '#374151' },
      { name: '--gray-800', hex: '#1f2937' },
      { name: '--gray-900', hex: '#111827' },
      { name: '--gray-950', hex: '#030712' },
    ]
  },
  emerald: {
    titleKey: 'emeraldPalette',
    shades: [
      { name: '--emerald-50', hex: '#ecfdf5' },
      { name: '--emerald-100', hex: '#d1fae5' },
      { name: '--emerald-200', hex: '#a7f3d0' },
      { name: '--emerald-300', hex: '#6ee7b7' },
      { name: '--emerald-400', hex: '#34d399' },
      { name: '--emerald-500', hex: '#10b981' },
      { name: '--emerald-600', hex: '#059669' },
      { name: '--emerald-700', hex: '#047857' },
      { name: '--emerald-800', hex: '#065f46' },
      { name: '--emerald-900', hex: '#064e3b' },
      { name: '--emerald-950', hex: '#022c22' },
    ]
  },
  amber: {
    titleKey: 'amberPalette',
    shades: [
      { name: '--amber-50', hex: '#fffbeb' },
      { name: '--amber-100', hex: '#fef3c7' },
      { name: '--amber-200', hex: '#fde68a' },
      { name: '--amber-300', hex: '#fcd34d' },
      { name: '--amber-400', hex: '#fbbf24' },
      { name: '--amber-500', hex: '#f59e0b' },
      { name: '--amber-600', hex: '#d97706' },
      { name: '--amber-700', hex: '#b45309' },
      { name: '--amber-800', hex: '#92400e' },
      { name: '--amber-900', hex: '#78350f' },
      { name: '--amber-950', hex: '#451a03' },
    ]
  },
  red: {
    titleKey: 'redPalette',
    shades: [
      { name: '--red-50', hex: '#fef2f2' },
      { name: '--red-100', hex: '#fee2e2' },
      { name: '--red-200', hex: '#fecaca' },
      { name: '--red-300', hex: '#fca5a5' },
      { name: '--red-400', hex: '#f87171' },
      { name: '--red-500', hex: '#ef4444' },
      { name: '--red-600', hex: '#dc2626' },
      { name: '--red-700', hex: '#b91c1c' },
      { name: '--red-800', hex: '#991b1b' },
      { name: '--red-900', hex: '#7f1d1d' },
      { name: '--red-950', hex: '#450a0a' },
    ]
  },
};

export default function Colors({ setActiveTab }: ColorsProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const { language, t } = useLanguage();

  const getSemantics = () => [
    {
      label: language === 'en' ? 'Primary Brand' : 'Brand Utama',
      variable: 'var(--color-primary)',
      desc: language === 'en'
        ? 'Primary brand color used for main actions, buttons, and visual identity.'
        : 'Warna brand utama yang digunakan untuk aksi utama, tombol, dan identitas.',
      color: '#df7e30'
    },
    {
      label: language === 'en' ? 'Success' : 'Sukses',
      variable: 'var(--color-success)',
      desc: language === 'en'
        ? 'Used for positive states, success feedback, and completions.'
        : 'Digunakan untuk keadaan positif, umpan balik keberhasilan, dan penyelesaian.',
      color: '#059669'
    },
    {
      label: language === 'en' ? 'Warning' : 'Peringatan',
      variable: 'var(--color-warning)',
      desc: language === 'en'
        ? 'Used for warning messages, pending states, and alert indicators.'
        : 'Digunakan untuk pesan peringatan, keadaan tertunda, dan tanda siaga.',
      color: '#d97706'
    },
    {
      label: language === 'en' ? 'Danger' : 'Bahaya',
      variable: 'var(--color-danger)',
      desc: language === 'en'
        ? 'Used for errors, destructive actions, and hazard states.'
        : 'Digunakan untuk kesalahan, aksi destruktif, dan keadaan bahaya.',
      color: '#dc2626'
    },
    {
      label: language === 'en' ? 'Info' : 'Informasi',
      variable: 'var(--color-info)',
      desc: language === 'en'
        ? 'Used for neutral messages, guides, and informational banners.'
        : 'Digunakan untuk pesan netral, panduan, dan spanduk informasi.',
      color: '#0284c7'
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(`${t.colors.copied}: ${text}`);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.colors.pageTitle}</h1>
        <p className="page-subtitle">
          {t.colors.pageSubtitle}
        </p>
      </div>

      {/* Semantic Colors */}
      <div className="section-card">
        <h2 className="section-title">Semantic Colors</h2>
        <p className="section-description">
          {language === 'en' ? 'Functional UI colors that adapt dynamically between light and dark modes.' : 'Warna UI fungsional yang beradaptasi secara dinamis antara mode terang dan gelap.'}
        </p>
        <div className="semantic-swatches">
          {getSemantics().map(item => (
            <div 
              className="semantic-swatch" 
              key={item.label}
              onClick={() => copyToClipboard(item.variable)}
            >
              <div className="semantic-header" style={{ backgroundColor: item.color }}>
                {item.label}
              </div>
              <div className="semantic-body">
                <p style={{ fontSize: 'var(--fs-text-sm)', marginBottom: 'var(--space-2)' }}>{item.desc}</p>
                <code className="semantic-var">{item.variable}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palettes */}
      <div className="section-card">
        <h2 className="section-title">Color Palettes</h2>
        <p className="section-description">
          {language === 'en' ? 'Complete color scales from 50 to 950 for backgrounds, borders, text, and accents.' : 'Skala warna lengkap dari 50 hingga 950 untuk latar belakang, batas, teks, dan aksen dekoratif.'}
        </p>
        <div className="colors-grid">
          {(Object.keys(PALETTES) as Array<keyof typeof PALETTES>).map(key => {
            const palette = PALETTES[key];
            const title = t.colors[palette.titleKey as keyof typeof t.colors];
            return (
              <div className="color-group" key={key}>
                <h3 className="color-group-title">{title}</h3>
                <div className="swatch-row">
                  {palette.shades.map(shade => {
                    const weight = shade.name.split('-')[3];
                    return (
                      <div 
                        className="swatch-card" 
                        key={shade.name}
                        onClick={() => copyToClipboard(`var(${shade.name})`)}
                      >
                        <div className="swatch-color" style={{ backgroundColor: shade.hex }} />
                        <div className="swatch-info">
                          <span className="swatch-weight">{weight}</span>
                          <span className="swatch-hex">{shade.hex}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'foundation-overview', label: t.nav.foundationOverview }}
        next={{ id: 'typography', label: t.nav.typography }}
        setActiveTab={setActiveTab}
      />

      {/* Toast Notification */}
      <div className={`copy-toast ${showToast ? 'show' : ''}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {toastMsg}
      </div>
    </div>
  );
}
