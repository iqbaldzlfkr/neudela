import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface FoundationOverviewProps {
  setActiveTab: (tabId: string) => void;
}

export default function FoundationOverview({ setActiveTab }: FoundationOverviewProps) {
  const { t } = useLanguage();

  const cards = [
    {
      id: 'accessibility',
      title: t.foundationOverview.accessibilityTitle,
      desc: t.foundationOverview.accessibilityDesc,
      badge: 'A11y Standards',
      action: null,
      renderVisual: () => (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* A11y Visual */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            border: '2.5px dashed var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-success)',
            animation: 'spinSlow 20s linear infinite',
          }}>
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" style={{ transform: 'rotate(calc(-1 * var(--rotation, 0deg)))' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A9.342 9.342 0 0012 21a9.342 9.342 0 00-3-1.763v-.109m0-19.128c-.813 0-1.619.13-2.375.372a4.125 4.125 0 00-4.121 5.922 4.125 4.125 0 007.533 2.493M9 19.128v-.003c0-1.113.285-2.16.786-3.07M9 19.128v.109A9.342 9.342 0 0112 21" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6zm0 0v6" />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 'colors',
      title: t.foundationOverview.colorSystemTitle,
      desc: t.foundationOverview.colorSystemDesc,
      badge: 'Colors System',
      action: 'colors',
      renderVisual: () => (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.05) 0%, rgba(223, 126, 48, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-1.5)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Swatches Visual */}
          {['#fdf7ed', '#f1ce96', '#df7e30', '#a23c1b', '#3e130a'].map((color, i) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '56px',
                backgroundColor: color,
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transform: `rotate(${(i - 2) * 8}deg) translateY(${Math.abs(i - 2) * 4}px)`,
                border: '1px solid var(--color-border)',
              }}
            />
          ))}
        </div>
      )
    },
    {
      id: 'typography',
      title: t.foundationOverview.typographyTitle,
      desc: t.foundationOverview.typographyDesc,
      badge: 'Inter Typeface',
      action: 'typography',
      renderVisual: () => (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.05) 0%, rgba(100, 116, 139, 0.15) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Typography Visual */}
          <span style={{ fontSize: '48px', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', lineHeight: 1 }}>Aa</span>
          <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Inter Font Family</span>
        </div>
      )
    },
    {
      id: 'spacing',
      title: t.foundationOverview.spacerTitle,
      desc: t.foundationOverview.spacerDesc,
      badge: '4px Grid Scale',
      action: 'spacing',
      renderVisual: () => (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(2, 132, 199, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Spacer Visual */}
          {[16, 24, 32, 40].map((width, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: `${width}px`,
                height: '12px',
                backgroundColor: 'var(--color-primary)',
                opacity: 0.3 + (i * 0.2),
                borderRadius: '2px',
              }} />
              <span style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                {width}px
              </span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'radius',
      title: t.foundationOverview.radiusTitle,
      desc: t.foundationOverview.radiusDesc,
      badge: 'Corner Shapes',
      action: null,
      renderVisual: () => (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Radius Visual */}
          {['4px', '8px', '16px', '9999px'].map((radius, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '36px',
                height: '36px',
                border: '2px solid var(--color-primary)',
                borderRadius: radius,
                backgroundColor: 'rgba(223, 126, 48, 0.05)',
              }} />
              <span style={{ fontSize: '9px', fontFamily: 'JetBrains Mono', color: 'var(--color-text-tertiary)', marginTop: '6px' }}>
                {radius === '9999px' ? 'Full' : radius}
              </span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'elevation',
      title: t.foundationOverview.elevationTitle,
      desc: t.foundationOverview.elevationDesc,
      badge: 'Elevation Levels',
      action: null,
      renderVisual: () => (
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Elevation Visual */}
          {['var(--shadow-sm)', 'var(--shadow-md)', 'var(--shadow-lg)'].map((shadow, i) => (
            <div
              key={i}
              style={{
                width: '40px',
                height: '56px',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: shadow,
                transform: `translateY(${-i * 4}px)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                color: 'var(--color-text-tertiary)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              Lvl {i + 1}
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Page Header */}
      <div className="page-header">
        <span style={{ 
          fontSize: 'var(--fs-text-xs)', 
          fontWeight: 'var(--font-weight-bold)', 
          color: 'var(--color-primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          display: 'block',
          marginBottom: 'var(--space-2)'
        }}>
          {t.foundationOverview.categoryLabel}
        </span>
        <h1 className="page-title">{t.foundationOverview.pageTitle}</h1>
        <p className="page-subtitle">
          {t.foundationOverview.pageSubtitle}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="foundation-overview-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-12)',
      }}>
        {cards.map(card => {
          const isClickable = !!card.action;
          return (
            <div
              key={card.id}
              onClick={isClickable ? () => setActiveTab(card.action!) : undefined}
              className="section-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: isClickable ? 'pointer' : 'default',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                margin: 0
              }}
            >
              {card.renderVisual()}
              <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <h3 style={{ fontSize: 'var(--fs-text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>
                    {card.title}
                  </h3>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'JetBrains Mono',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-bg-canvas)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-tertiary)',
                  }}>
                    {card.badge}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0, flex: 1 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <NextPrevious
        prev={{ id: 'overview', label: t.nav.overview }}
        next={{ id: 'colors', label: t.nav.colors }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
