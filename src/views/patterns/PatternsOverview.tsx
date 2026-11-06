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
      id: 'pat-header',
      title: (t.patternsOverview as any).headerTitle || 'Header Navigation',
      desc: (t.patternsOverview as any).headerDesc || 'Enterprise-grade top navigation system offering 8 distinct variants with interactive previews and TSX code generator.',
      badge: (t.patternsOverview as any).headerBadge || 'Navigation & Shell',
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
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Mini Top Header Bar */}
          <div
            style={{
              height: 20,
              backgroundColor: 'var(--color-bg-surface)',
              borderBottom: '1px solid var(--color-border)',
              padding: '0 6px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: 'var(--color-primary, #df7e30)' }} />
            <div style={{ width: 22, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-text-primary)' }} />
            {/* Nav links */}
            <div style={{ display: 'flex', gap: 3, marginLeft: 6 }}>
              <div style={{ width: 14, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-primary, #df7e30)' }} />
              <div style={{ width: 14, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-text-tertiary)' }} />
              <div style={{ width: 14, height: 2.5, borderRadius: 1, backgroundColor: 'var(--color-text-tertiary)' }} />
            </div>
            {/* Right items */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 24, height: 8, borderRadius: 2, backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary, #df7e30)' }} />
            </div>
          </div>

          {/* Mini Content Canvas */}
          <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: 'var(--color-bg-canvas)' }}>
            <div style={{ width: 40, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-border)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
              <div style={{ height: 26, borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 26, borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
              <div style={{ height: 26, borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }} />
            </div>
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
      title: 'Dashboards',
      desc: isId
        ? 'Arsitektur dashboard enterprise siap pakai: Metrik KPI, grafik kurva pendapatan, telemetri logistik, dan tabel data interaktif berpalet terracotta Neudela.'
        : 'Enterprise dashboard architectures: Real-time KPI cards, revenue curves, logistics telemetry, and interactive data tables powered by Neudela tokens.',
      badge: 'Dashboards',
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
            <div style={{ width: 28, height: 4, borderRadius: 1.5, backgroundColor: 'var(--color-primary, #df7e30)' }} />
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 22, height: 4, borderRadius: 2, backgroundColor: 'var(--color-bg-subtle)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-border)' }} />
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, display: 'flex', padding: 5, gap: 5, backgroundColor: 'var(--color-bg-canvas)' }}>
            {/* Left Rail */}
            <div style={{ width: 10, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: 1.5, backgroundColor: 'var(--color-primary, #df7e30)' }} />
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
                  <div style={{ width: 14, height: 3.5, borderRadius: 1, backgroundColor: 'var(--color-primary, #df7e30)' }} />
                </div>
                <div style={{ padding: '3px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                  <div style={{ width: 11, height: 2, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)', marginBottom: 2 }} />
                  <div style={{ width: 15, height: 3.5, borderRadius: 1, backgroundColor: 'var(--color-primary, #df7e30)' }} />
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
    {
      id: 'pat-data-grid',
      title: isId ? 'Tabel & Kisi Data' : 'Data Grid & Table',
      desc: isId
        ? 'Arsitektur kisi data enterprise: Master-Detail Split Inspector, Bilah Aksi Massal (Floating Action Dock), Filter Faset Kompleks, dan Spreadsheet Dapat Diedit Langsung.'
        : 'Enterprise data grid architectures: Master-Detail Split Inspector, Floating Batch Action Dock, Faceted Query Filters, Multi-Modal Views, and Inline Editable Spreadsheets.',
      badge: 'Data Management',
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
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <div style={{ height: 16, backgroundColor: 'var(--color-bg-subtle, rgba(0,0,0,0.04))', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, border: '1px solid var(--color-primary, #df7e30)' }} />
            <div style={{ width: 28, height: 3, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)' }} />
            <div style={{ width: 24, height: 3, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)' }} />
            <div style={{ marginLeft: 'auto', width: 14, height: 3, borderRadius: 1, backgroundColor: 'var(--color-primary, #df7e30)' }} />
          </div>
          {/* Table Rows */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 16, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 6, backgroundColor: i === 2 ? 'rgba(223, 126, 48, 0.08)' : 'transparent' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, border: '1px solid var(--color-border)' }} />
              <div style={{ width: 34, height: 3, borderRadius: 1, backgroundColor: 'var(--color-text-primary)' }} />
              <div style={{ width: 20, height: 6, borderRadius: 3, backgroundColor: i === 1 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }} />
              <div style={{ marginLeft: 'auto', width: 18, height: 3, borderRadius: 1, backgroundColor: 'var(--color-text-secondary)' }} />
            </div>
          ))}
          {/* Mini Floating Pill Preview */}
          <div style={{ marginTop: 'auto', alignSelf: 'center', height: 8, borderRadius: 4, backgroundColor: '#0f172a', padding: '0 8px', display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#df7e30' }} />
            <div style={{ width: 16, height: 2, borderRadius: 1, backgroundColor: '#fff' }} />
          </div>
        </div>
      ),
    },
    {
      id: 'pat-auth',
      title: isId ? 'Autentikasi & Akun' : 'Authentication & Identity',
      desc: isId
        ? 'Arsitektur login & identitas enterprise: Split-Screen Branding, Okta/SAML SSO, Verifikasi MFA/2FA, Magic Link, dan Tata Kelola Sesi Multi-Perangkat.'
        : 'Enterprise authentication architectures: Split-Screen Branding, Okta/SAML SSO, MFA/2FA Verification, Magic Links, and Multi-Device Session Governance.',
      badge: 'Identity & Access',
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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            overflow: 'hidden',
          }}
        >
          {/* Mini Left Brand Column */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--color-primary, #df7e30) 0%, #b85d18 100%)',
              padding: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', opacity: 0.9 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '85%', height: 2.5, background: '#fff', opacity: 0.8, borderRadius: 1 }} />
              <div style={{ width: '55%', height: 2.5, background: '#fff', opacity: 0.6, borderRadius: 1 }} />
            </div>
          </div>
          {/* Mini Right Form Column */}
          <div style={{ padding: '6px 5px', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', backgroundColor: 'var(--color-bg-surface)' }}>
            <div style={{ width: 22, height: 3, borderRadius: 1, backgroundColor: 'var(--color-text-primary)' }} />
            <div style={{ height: 8, borderRadius: 2, backgroundColor: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }} />
            <div style={{ height: 8, borderRadius: 2, backgroundColor: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }} />
            <div style={{ height: 8, borderRadius: 2, backgroundColor: 'var(--color-primary, #df7e30)' }} />
          </div>
        </div>
      ),
    },
    {
      id: 'pat-maps',
      title: isId ? 'Peta & Intelijen Geospasial' : 'Maps & Geospatial Intelligence',
      desc: isId
        ? 'Arsitektur antarmuka peta interaktif & sistem berbasis lokasi: Pelacakan Armada Real-Time, Penempatan Titik Alamat Presisi (Pinpoint), Pencarian Multi-Cabang, Geofencing Tarif, dan Heatmap Kepadatan.'
        : 'Enterprise interactive geospatial architectures: Real-Time Fleet & Order Tracking, Pinpoint Address Picker with Reverse Geocoding, Multi-Branch Store Locator, Geofence Coverage Builder, and Density Heatmaps.',
      badge: 'Location Services',
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
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg viewBox="0 0 220 80" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Water body */}
            <path d="M -10 65 Q 60 55 110 70 T 230 60" fill="none" stroke="#bae6fd" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
            {/* Green park */}
            <rect x="12" y="8" width="45" height="24" rx="4" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="0.8" />
            {/* Building blocks */}
            <rect x="68" y="8" width="38" height="16" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="116" y="8" width="45" height="16" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="68" y="38" width="38" height="22" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="116" y="38" width="45" height="22" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8" />

            {/* Roads */}
            <line x1="-10" y1="30" x2="230" y2="30" stroke="#e2e8f0" strokeWidth="7" />
            <line x1="-10" y1="30" x2="230" y2="30" stroke="#ffffff" strokeWidth="5" />
            <line x1="60" y1="-10" x2="60" y2="90" stroke="#e2e8f0" strokeWidth="7" />
            <line x1="60" y1="-10" x2="60" y2="90" stroke="#ffffff" strokeWidth="5" />
            <line x1="168" y1="-10" x2="168" y2="90" stroke="#e2e8f0" strokeWidth="7" />
            <line x1="168" y1="-10" x2="168" y2="90" stroke="#ffffff" strokeWidth="5" />

            {/* Glowing route */}
            <path d="M 28 65 L 56 65 Q 60 65 60 60 L 60 33 Q 60 30 64 30 L 164 30 Q 168 30 168 34 L 168 52" fill="none" stroke="#df7e30" strokeWidth="6" opacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 28 65 L 56 65 Q 60 65 60 60 L 60 33 Q 60 30 64 30 L 164 30 Q 168 30 168 34 L 168 52" fill="none" stroke="#df7e30" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

            {/* Origin & Destination nodes */}
            <circle cx="28" cy="65" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="168" cy="52" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            {/* Courier dot */}
            <circle cx="114" cy="30" r="6" fill="#df7e30" stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(223,126,48,0.5))" />
          </svg>
          <div style={{ position: 'absolute', bottom: 4, left: 6, background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '1px 6px', display: 'flex', alignItems: 'center', gap: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#df7e30' }}>8 mins · Leaflet</span>
          </div>
        </div>
      ),
    },
    {
      id: 'pat-checkout',
      title: isId ? 'Alur Checkout & Transaksi' : 'Checkout & Payment Flows',
      desc: isId
        ? 'Arsitektur transaksi e-commerce berkonversi tinggi: Alur bertahap dengan NeuronStepper, akordion ekspres satu halaman, QRIS dinamis & Virtual Account, pengadaan PO B2B dengan faktur pajak, dan kwitansi resi digital.'
        : 'Enterprise transaction & purchasing architectures: Multi-step linear checkout with NeuronStepper, express single-page accordions, omnichannel QRIS & VA payment hubs, B2B procurement with tax invoicing, and post-purchase confirmation receipts.',
      badge: 'Commerce & Payments',
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
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '6px 8px',
            gap: 5,
          }}
        >
          {/* Top mini Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%', justifyContent: 'space-between', padding: '0 2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 6, fontWeight: 800 }}>✓</div>
              <div style={{ height: 1.5, flex: 1, background: '#10b981' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#df7e30', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 6, fontWeight: 800, boxShadow: '0 0 0 2px rgba(223,126,48,0.25)' }}>2</div>
              <div style={{ height: 1.5, flex: 1, background: 'var(--color-border)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 6, fontWeight: 800 }}>3</div>
              <div style={{ height: 1.5, flex: 1, background: 'var(--color-border)' }} />
            </div>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 6, fontWeight: 800 }}>4</div>
          </div>

          {/* Mini body columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 6, flex: 1 }}>
            <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 4, padding: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 4, width: '60%', borderRadius: 2, background: '#df7e30', opacity: 0.8 }} />
              <div style={{ height: 12, borderRadius: 3, border: '1px solid #df7e30', background: 'rgba(223,126,48,0.1)', display: 'flex', alignItems: 'center', padding: '0 4px', gap: 3 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#df7e30' }} />
                <div style={{ height: 3, width: '50%', borderRadius: 1.5, background: '#df7e30' }} />
              </div>
              <div style={{ height: 12, borderRadius: 3, border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'center', padding: '0 4px', gap: 3 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', border: '1px solid var(--color-border)' }} />
                <div style={{ height: 3, width: '40%', borderRadius: 1.5, background: 'var(--color-border)' }} />
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 4, padding: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 4, width: '70%', borderRadius: 2, background: 'var(--color-text-secondary)' }} />
              <div style={{ height: 2.5, width: '90%', borderRadius: 1, background: 'var(--color-border)' }} />
              <div style={{ height: 2.5, width: '80%', borderRadius: 1, background: 'var(--color-border)' }} />
              <div style={{ marginTop: 'auto', height: 10, borderRadius: 2, background: '#df7e30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ height: 2.5, width: '50%', borderRadius: 1, background: '#fff' }} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pat-settings',
      title: isId ? 'Pengaturan & Akses RBAC' : 'Workspace Settings & RBAC',
      desc: isId
        ? 'Arsitektur tata kelola organisasi enterprise: Profil workspace, direktori tim & matriks izin RBAC, kredensial kunci API & webhook, audit keamanan 2FA, dan zona berbahaya transfer kepemilikan.'
        : 'Enterprise organizational governance: Workspace identity, team directory & granular RBAC permission matrix, developer API credentials & webhooks, 2FA security audit, and danger zones.',
      badge: 'Governance & RBAC',
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
          {/* Mini Left Settings Nav */}
          <div
            style={{
              width: 58,
              backgroundColor: 'var(--color-bg-canvas)',
              borderRight: '1px solid var(--color-border)',
              padding: '6px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <div style={{ height: 6, width: '80%', borderRadius: 2, backgroundColor: 'rgba(223, 126, 48, 0.2)', border: '1px solid #df7e30' }} />
            <div style={{ height: 6, width: '90%', borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
            <div style={{ height: 6, width: '70%', borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
            <div style={{ height: 6, width: '85%', borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* Mini Right Content: RBAC Table */}
          <div
            style={{
              flex: 1,
              padding: '6px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: 'var(--color-text-secondary)' }} />
              <div style={{ width: 18, height: 6, borderRadius: 2, backgroundColor: '#df7e30' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#df7e30' }} />
                <div style={{ width: 26, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-text-secondary)' }} />
              </div>
              <div style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: 'rgba(59, 130, 246, 0.3)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                <div style={{ width: 30, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-text-secondary)' }} />
              </div>
              <div style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: 'rgba(16, 185, 129, 0.3)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px', borderRadius: 2, backgroundColor: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
                <div style={{ width: 22, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-text-secondary)' }} />
              </div>
              <div style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: 'rgba(245, 158, 11, 0.3)' }} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pat-empty-states',
      title: isId ? 'Status Kosong, Onboarding & Halaman Error' : 'Empty States, Onboarding & Error Pages',
      desc: isId
        ? 'Cetak biru penanganan kondisi batas (edge cases): Tabel kosong & pencarian nihil, checklist aktivasi onboarding, pemulihan ramah halaman 404, gerbang otorisasi RBAC 403, dan pemulihan gangguan server 500.'
        : 'Enterprise edge-case handling blueprints: Zero-data tables & search failures, activation onboarding milestones, high-empathy 404 recovery, security-conscious 403 RBAC permission gates, and 500 outage retries.',
      badge: 'Edge Cases & Recovery',
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            gap: 4,
          }}
        >
          <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(223, 126, 48, 0.15)', border: '1px dashed #df7e30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: 1.5, backgroundColor: '#df7e30' }} />
          </div>
          <div style={{ width: 60, height: 4, borderRadius: 2, backgroundColor: '#df7e30', opacity: 0.8 }} />
          <div style={{ width: 90, height: 3, borderRadius: 1.5, backgroundColor: 'var(--color-text-secondary)', opacity: 0.4 }} />
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            <div style={{ width: 32, height: 8, borderRadius: 2, backgroundColor: '#df7e30' }} />
            <div style={{ width: 26, height: 8, borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
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
