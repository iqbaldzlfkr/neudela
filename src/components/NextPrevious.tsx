import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TabItem {
  id: string;
  label: string;
}

interface NextPreviousProps {
  prev?: TabItem;
  next?: TabItem;
  setActiveTab: (tabId: string) => void;
}

export default function NextPrevious({ prev, next, setActiveTab }: NextPreviousProps) {
  const [hoveredPrev, setHoveredPrev] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);
  const { t } = useLanguage();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      marginTop: 'var(--space-16)',
      borderTop: '1px solid var(--color-border)',
      paddingTop: 'var(--space-8)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Previous Link */}
      {prev ? (
        <div
          onClick={() => setActiveTab(prev.id)}
          onMouseEnter={() => setHoveredPrev(true)}
          onMouseLeave={() => setHoveredPrev(false)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-4) var(--space-5)',
            border: hoveredPrev ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            background: hoveredPrev ? 'rgba(223, 126, 48, 0.02)' : 'var(--color-bg-surface)',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: hoveredPrev ? 'var(--shadow-sm)' : 'none',
            maxWidth: '48%',
          }}
        >
          <ChevronLeft 
            size={20} 
            style={{
              color: hoveredPrev ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
              transform: hoveredPrev ? 'translateX(-4px)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-tertiary)' }}>
              {t.nav.previous}
            </span>
            <span style={{ 
              fontSize: 'var(--fs-text-md)', 
              fontWeight: 'var(--font-weight-bold)', 
              color: hoveredPrev ? 'var(--color-primary)' : 'var(--color-text-primary)',
              marginTop: '2px',
              transition: 'color 0.2s ease',
            }}>
              {prev.label}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, maxWidth: '48%', visibility: 'hidden' }} />
      )}

      {/* Next Link */}
      {next ? (
        <div
          onClick={() => setActiveTab(next.id)}
          onMouseEnter={() => setHoveredNext(true)}
          onMouseLeave={() => setHoveredNext(false)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            padding: 'var(--space-4) var(--space-5)',
            border: hoveredNext ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            background: hoveredNext ? 'rgba(223, 126, 48, 0.02)' : 'var(--color-bg-surface)',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: hoveredNext ? 'var(--shadow-sm)' : 'none',
            maxWidth: '48%',
            marginLeft: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', marginLeft: 'auto' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-tertiary)' }}>
              {t.nav.next}
            </span>
            <span style={{ 
              fontSize: 'var(--fs-text-md)', 
              fontWeight: 'var(--font-weight-bold)', 
              color: hoveredNext ? 'var(--color-primary)' : 'var(--color-text-primary)',
              marginTop: '2px',
              transition: 'color 0.2s ease',
            }}>
              {next.label}
            </span>
          </div>
          <ChevronRight 
            size={20} 
            style={{
              color: hoveredNext ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
              transform: hoveredNext ? 'translateX(4px)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      ) : (
        <div style={{ flex: 1, maxWidth: '48%', visibility: 'hidden' }} />
      )}
    </div>
  );
}
