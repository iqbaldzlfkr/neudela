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
      { name: '--slate-25', hex: '#FCFCFD' },
      { name: '--slate-50', hex: '#F9FAFB' },
      { name: '--slate-100', hex: '#F2F4F7' },
      { name: '--slate-200', hex: '#E4E7EC' },
      { name: '--slate-300', hex: '#D0D5DD' },
      { name: '--slate-400', hex: '#98A2B3' },
      { name: '--slate-500', hex: '#667085' },
      { name: '--slate-600', hex: '#475467' },
      { name: '--slate-700', hex: '#344054' },
      { name: '--slate-800', hex: '#182230' },
      { name: '--slate-900', hex: '#101828' },
      { name: '--slate-950', hex: '#0C111D' },
    ]
  },
  gray: {
    titleKey: 'grayPalette',
    shades: [
      { name: '--gray-25', hex: '#FAFAFA' },
      { name: '--gray-50', hex: '#F5F5F6' },
      { name: '--gray-100', hex: '#F0F1F1' },
      { name: '--gray-200', hex: '#ECECED' },
      { name: '--gray-300', hex: '#CECFD2' },
      { name: '--gray-400', hex: '#94969C' },
      { name: '--gray-500', hex: '#85888E' },
      { name: '--gray-600', hex: '#61646C' },
      { name: '--gray-700', hex: '#333741' },
      { name: '--gray-800', hex: '#1F242F' },
      { name: '--gray-900', hex: '#161B26' },
      { name: '--gray-950', hex: '#0C111D' },
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
        next={{ id: 'spacing', label: t.nav.spacing }}
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
