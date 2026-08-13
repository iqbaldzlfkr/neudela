import { useState, useEffect } from 'react';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface SpacingProps {
  setActiveTab: (tabId: string) => void;
}

const SPACING_ITEMS = [
  { name: '--space-1', rem: '0.25rem', px: '4px', width: '4px' },
  { name: '--space-2', rem: '0.5rem', px: '8px', width: '8px' },
  { name: '--space-3', rem: '0.75rem', px: '12px', width: '12px' },
  { name: '--space-4', rem: '1rem', px: '16px', width: '16px' },
  { name: '--space-5', rem: '1.25rem', px: '20px', width: '20px' },
  { name: '--space-6', rem: '1.5rem', px: '24px', width: '24px' },
  { name: '--space-8', rem: '2rem', px: '32px', width: '32px' },
  { name: '--space-10', rem: '2.5rem', px: '40px', width: '40px' },
  { name: '--space-12', rem: '3rem', px: '48px', width: '48px' },
  { name: '--space-16', rem: '4rem', px: '64px', width: '64px' },
  { name: '--space-20', rem: '5rem', px: '80px', width: '80px' },
  { name: '--space-24', rem: '6rem', px: '96px', width: '96px' },
];

export default function Spacing({ setActiveTab }: SpacingProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const { t } = useLanguage();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg(`${t.spacing.copied}: ${text}`);
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
        <h1 className="page-title">{t.spacing.pageTitle}</h1>
        <p className="page-subtitle">
          {t.spacing.pageSubtitle}
        </p>
      </div>

      <div className="section-card">
        <h2 className="section-title">{t.spacing.scaleTitle}</h2>
        <p className="section-description">
          {t.spacing.scaleDesc}
        </p>

        <div className="spacing-container">
          {SPACING_ITEMS.map(item => (
            <div 
              className="spacing-row" 
              key={item.name}
              onClick={() => copyToClipboard(`var(${item.name})`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="spacing-name">var({item.name})</div>
              <div className="spacing-val">{item.px} / {item.rem}</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                  className="spacing-bar" 
                  style={{ width: item.width }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'typography', label: t.nav.typography }}
        next={{ id: 'components', label: t.nav.componentsPlayground }}
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
