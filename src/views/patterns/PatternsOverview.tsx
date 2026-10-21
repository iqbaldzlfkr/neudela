import NextPrevious from '../../components/NextPrevious';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface PatternsOverviewProps {
  setActiveTab: (tabId: string) => void;
}

export default function PatternsOverview({ setActiveTab }: PatternsOverviewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';

  const patterns = [
    {
      id: 'pat-sidebar',
      title: t.patternsOverview.sidebarTitle,
      desc: t.patternsOverview.sidebarDesc,
      badge: t.patternsOverview.sidebarBadge,
      renderPreview: () => (
        <div
          style={{
            width: '90%',
            maxWidth: 220,
            height: 80,
            borderRadius: 6,
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* Mini Left Sidebar */}
          <div
            style={{
              width: 58,
              backgroundColor: 'var(--color-bg-surface)',
              borderRight: '1px solid var(--color-border)',
              padding: '6px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary, #df7e30)' }} />
              <div style={{ width: 22, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-text-primary)' }} />
            </div>
            <div
              style={{
                height: 11,
                borderRadius: 2,
                backgroundColor: 'rgba(223, 126, 48, 0.15)',
                borderLeft: '2px solid var(--color-primary, #df7e30)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 3px',
                gap: 3,
              }}
            >
              <div style={{ width: 4, height: 4, borderRadius: 1, backgroundColor: 'var(--color-primary, #df7e30)' }} />
              <div style={{ width: 22, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-primary, #df7e30)' }} />
            </div>
            <div style={{ height: 11, borderRadius: 2, display: 'flex', alignItems: 'center', padding: '0 3px', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: 1, backgroundColor: 'var(--color-text-tertiary)' }} />
              <div style={{ width: 20, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-border)' }} />
            </div>
            <div style={{ height: 11, borderRadius: 2, display: 'flex', alignItems: 'center', padding: '0 3px', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: 1, backgroundColor: 'var(--color-text-tertiary)' }} />
              <div style={{ width: 16, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-border)' }} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--brand-400)' }} />
              <div style={{ width: 18, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>

          {/* Mini Right Content */}
          <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: 'var(--color-bg-canvas)' }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 28, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-border)' }} />
              <div style={{ width: 14, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-primary)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              <div style={{ height: 22, borderRadius: 3, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 3 }}>
                <div style={{ width: 12, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)', marginBottom: 2 }} />
                <div style={{ width: 20, height: 4, borderRadius: 1.5, backgroundColor: 'var(--color-text-primary)' }} />
              </div>
              <div style={{ height: 22, borderRadius: 3, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 3 }}>
                <div style={{ width: 12, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)', marginBottom: 2 }} />
                <div style={{ width: 18, height: 4, borderRadius: 1.5, backgroundColor: 'var(--emerald-500)' }} />
              </div>
            </div>
            <div style={{ height: 16, borderRadius: 3, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', marginTop: 'auto' }} />
          </div>
        </div>
      ),
    },
    {
      id: 'pat-forms',
      title: t.patternsOverview.formsTitle,
      desc: t.patternsOverview.formsDesc,
      badge: t.patternsOverview.formsBadge,
      renderPreview: () => (
        <div
          style={{
            width: '90%',
            maxWidth: 220,
            height: 80,
            borderRadius: 6,
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {/* Stepper Wizard Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--emerald-500)' }} />
            <div style={{ flex: 1, height: 1.5, backgroundColor: 'var(--emerald-500)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary, #df7e30)', boxShadow: '0 0 0 2px rgba(223, 126, 48, 0.2)' }} />
            <div style={{ flex: 1, height: 1.5, backgroundColor: 'var(--color-border)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* Form Input with Checkmark */}
          <div
            style={{
              height: 14,
              borderRadius: 3,
              border: '1px solid var(--color-primary, #df7e30)',
              backgroundColor: 'var(--color-bg-surface)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 5px',
              gap: 4,
              boxShadow: '0 0 0 1.5px rgba(223, 126, 48, 0.15)',
            }}
          >
            <div style={{ width: 24, height: 3, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)' }} />
            <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--emerald-500)' }} />
          </div>

          {/* Second Input */}
          <div
            style={{
              height: 14,
              borderRadius: 3,
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-surface)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 5px',
            }}
          >
            <div style={{ width: 34, height: 3, borderRadius: 1, backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 3, marginTop: 'auto' }}>
            <div style={{ width: 18, height: 10, borderRadius: 2, border: '1px solid var(--color-border)' }} />
            <div style={{ width: 24, height: 10, borderRadius: 2, backgroundColor: 'var(--color-primary, #df7e30)' }} />
          </div>
        </div>
      ),
    },
    {
      id: 'pat-layouts',
      title: t.patternsOverview.layoutsTitle,
      desc: t.patternsOverview.layoutsDesc,
      badge: t.patternsOverview.layoutsBadge,
      renderPreview: () => (
        <div
          style={{
            width: '90%',
            maxWidth: 220,
            height: 80,
            borderRadius: 6,
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Header */}
          <div
            style={{
              height: 14,
              backgroundColor: 'var(--color-bg-canvas)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 6px',
            }}
          >
            <div style={{ width: 28, height: 4, borderRadius: 1.5, backgroundColor: 'var(--color-primary)' }} />
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 22, height: 4, borderRadius: 2, backgroundColor: 'var(--color-bg-subtle)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, display: 'flex', padding: 5, gap: 5, backgroundColor: 'var(--color-bg-canvas)' }}>
            {/* Left Rail */}
            <div style={{ width: 10, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: 1.5, backgroundColor: 'var(--color-primary)' }} />
              <div style={{ width: 6, height: 6, borderRadius: 1.5, backgroundColor: 'var(--color-border)' }} />
              <div style={{ width: 6, height: 6, borderRadius: 1.5, backgroundColor: 'var(--color-border)' }} />
            </div>

            {/* Dashboard Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                <div style={{ padding: '3px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                  <div style={{ width: 12, height: 2, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)', marginBottom: 2 }} />
                  <div style={{ width: 16, height: 3.5, borderRadius: 1, backgroundColor: 'var(--color-text-primary)' }} />
                </div>
                <div style={{ padding: '3px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                  <div style={{ width: 10, height: 2, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)', marginBottom: 2 }} />
                  <div style={{ width: 14, height: 3.5, borderRadius: 1, backgroundColor: 'var(--emerald-500)' }} />
                </div>
                <div style={{ padding: '3px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                  <div style={{ width: 11, height: 2, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)', marginBottom: 2 }} />
                  <div style={{ width: 15, height: 3.5, borderRadius: 1, backgroundColor: 'var(--sky-500)' }} />
                </div>
              </div>
              <div style={{ flex: 1, borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'comp-drawer',
      title: t.patternsOverview.overlaysTitle,
      desc: t.patternsOverview.overlaysDesc,
      badge: t.patternsOverview.overlaysBadge,
      renderPreview: () => (
        <div
          style={{
            width: '90%',
            maxWidth: 220,
            height: 80,
            borderRadius: 6,
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Canvas Behind Overlay */}
          <div style={{ padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ width: 50, height: 4, borderRadius: 1.5, backgroundColor: 'var(--color-border)' }} />
            <div style={{ width: 90, height: 3, borderRadius: 1, backgroundColor: 'var(--color-border)' }} />
            <div style={{ width: 70, height: 3, borderRadius: 1, backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* Dimmed Backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(1px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* Side-Sheet Drawer */}
            <div
              style={{
                width: 85,
                height: '100%',
                backgroundColor: 'var(--color-bg-surface)',
                borderLeft: '1px solid var(--color-border)',
                boxShadow: '-3px 0 10px rgba(0,0,0,0.1)',
                padding: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 32, height: 3.5, borderRadius: 1, backgroundColor: 'var(--color-text-primary)' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              </div>
              <div style={{ width: '100%', height: 8, borderRadius: 2, border: '1px solid var(--color-border)' }} />
              <div style={{ width: '100%', height: 8, borderRadius: 2, border: '1px solid var(--color-border)' }} />
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <div style={{ width: 14, height: 8, borderRadius: 2, backgroundColor: 'var(--color-primary, #df7e30)' }} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header (Identical to Components Overview) ── */}
      <div className="page-header">
        <span
          style={{
            fontSize: 'var(--fs-text-xs)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'block',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t.nav.pattern}
        </span>
        <h1 className="page-title">{isId ? 'Pola Tata Letak & Interaksi' : 'Layout Patterns'}</h1>
        <p className="page-subtitle">
          {isId
            ? 'Koleksi komprehensif pola antarmuka, tata letak aplikasi, dan alur interaksi terstruktur yang dibangun di atas token dan komponen Neudela.'
            : 'A comprehensive suite of composite layout patterns, application shells, and structured interaction flows built on Neudela Design System tokens.'}
        </p>
      </div>

      {/* ── Pattern Cards Grid (Exact Component Overview Style) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {patterns.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="component-overview-card"
          >
            {/* Visual Preview */}
            <div className="component-overview-preview">
              {item.renderPreview()}
            </div>

            {/* Content Body */}
            <div className="component-overview-body">
              <div className="component-overview-header">
                <h3 className="component-overview-title">{item.title}</h3>
                <span className="component-overview-badge">{item.badge}</span>
              </div>
              <p className="component-overview-desc">{item.desc}</p>
              <div className="component-overview-link">
                {isId ? 'Lihat dokumentasi' : 'View documentation'}{' '}
                <ArrowRight size={12} className="component-overview-arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Next / Previous Page Navigation ── */}
      <NextPrevious
        prev={{ id: 'components-overview', label: t.nav.componentsOverview }}
        next={{ id: 'pat-sidebar', label: (t.nav as any).patSidebar || 'Sidebar Navigation' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
