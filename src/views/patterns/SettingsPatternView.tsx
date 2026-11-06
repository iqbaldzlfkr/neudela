import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronCard from '../../components/NeuronCard';
import NeuronDivider from '../../components/NeuronDivider';
import NeuronAlert from '../../components/NeuronAlert';
import { NeuronToggle } from '../../components/NeuronToggle';
import NeuronCheckbox from '../../components/NeuronCheckbox';
import NeuronSelect from '../../components/NeuronSelect';
import {
  Settings,
  Building2,
  Users,
  Shield,
  Key,
  AlertTriangle,
  ExternalLink,
  X,
  Copy,
  Check,
  Eye,
  EyeOff,
  UserPlus,
  Trash2,
  Globe,
  Lock,
  Clock,
  Laptop,
  Smartphone,
  Activity,
  Send,
  RefreshCw,
  LogOut,
  Sliders,
  CheckCircle2,
  ChevronRight,
  Search,
  Filter,
  Code2,
  Server,
  Database,
  Radio,
  FileText,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export type SettingsVariantId =
  | 'general-workspace'
  | 'rbac-members'
  | 'api-security'
  | 'audit-security'
  | 'danger-zone';

export interface SettingsVariantMeta {
  id: SettingsVariantId;
  nameEn: string;
  nameId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  tags: string[];
  bestForEn: string;
  bestForId: string;
  badge: string;
  accentColor: string;
}

export const SETTINGS_VARIANTS: SettingsVariantMeta[] = [
  {
    id: 'general-workspace',
    nameEn: 'General Workspace & Branding',
    nameId: 'Profil Workspace & Branding Perusahaan',
    taglineEn: 'Corporate branding, custom domain mapping, timezone defaults, and automated backup retention policies.',
    taglineId: 'Pengaturan identitas perusahaan, domain kustom, zona waktu default, dan kebijakan retensi data.',
    descEn: 'The central organizational identity hub: Upload workspace logo, configure company slug URL, map verified custom SSL domains, set global currency and timezone defaults, and toggle strict TLS compliance and backup schedules.',
    descId: 'Pusat identitas organisasi enterprise: Unggah logo workspace, konfigurasi slug URL, pemetaan domain kustom dengan SSL terverifikasi, pengaturan zona waktu dan mata uang default, serta kebijakan retensi pencadangan otomatis.',
    tags: ['Workspace Identity', 'Custom Domain', 'Branding Logo', 'Timezone & Locale', 'Data Retention'],
    bestForEn: 'Enterprise Organization Admins, Multi-Tenant SaaS, White-Label Portals, Corporate Workspaces',
    bestForId: 'Admin Organisasi Enterprise, SaaS Multi-Tenant, Portal White-Label, Ruang Kerja Korporat',
    badge: 'Core Identity',
    accentColor: '#df7e30',
  },
  {
    id: 'rbac-members',
    nameEn: 'Team Directory & Granular RBAC Permissions',
    nameId: 'Direktori Tim & Matriks Izin RBAC',
    taglineEn: 'Comprehensive role-based access control with member invitation modal, search filters, and capability matrix.',
    taglineId: 'Manajemen hak akses berbasis peran dengan modal undang anggota, filter pencarian, dan matriks izin.',
    descEn: 'Enterprise-grade identity governance: Live team roster with granular roles (Owner, Admin, Security Engineer, Finance, Viewer), active 2FA badges, interactive invite member modal with role preview, and an expandable capability permissions matrix.',
    descId: 'Tata kelola akses identitas enterprise: Daftar anggota tim dengan peran terperinci (Owner, Admin, Security Engineer, Finance, Viewer), badge status 2FA, modal undang anggota interaktif, dan matriks hak akses per kapabilitas modul.',
    tags: ['RBAC Permissions', 'Team Directory', 'Invite Member Modal', 'Role Badges', 'Capability Matrix'],
    bestForEn: 'B2B SaaS Teams, Enterprise Security Audits, Department Access Governance, Multi-Seat Licenses',
    bestForId: 'Tim SaaS B2B, Audit Keamanan Enterprise, Tata Kelola Departemen, Manajemen Lisensi Pengguna',
    badge: 'Access Control',
    accentColor: '#3b82f6',
  },
  {
    id: 'api-security',
    nameEn: 'Developer API Keys & Webhook Subscriptions',
    nameId: 'Kunci API Developer & Langganan Webhook',
    taglineEn: 'Developer platform credentials manager with secret token masking, copy actions, and live webhook ping tester.',
    taglineId: 'Manajemen kredensial platform developer dengan penyembunyian token, salin cepat, dan simulasi ping webhook.',
    descEn: 'Robust developer credentials portal: Scoped API key generation with expiry timelines, secret key reveal/copy controls, and registered webhook subscription endpoints featuring live test ping triggers and latency diagnostics.',
    descId: 'Portal kredensial pengembang enterprise: Pembuatan kunci API ber-scope dengan batas masa berlaku, kontrol intip/salin secret token, serta langganan endpoint webhook dengan pemicu uji coba ping dan diagnosa latensi real-time.',
    tags: ['API Tokens', 'Secret Masking', 'Webhook Tester', 'Latency Diagnostics', 'Scoped Keys'],
    bestForEn: 'Developer Portals, Cloud Platforms, Fintech Integrations, Headless API Services',
    bestForId: 'Portal Pengembang, Platform Cloud, Integrasi Fintech & Perbankan, Layanan Headless API',
    badge: 'Developer Hub',
    accentColor: '#10b981',
  },
  {
    id: 'audit-security',
    nameEn: 'Enterprise Security, Active Sessions & Audit Trail',
    nameId: 'Keamanan Akun, Sesi Perangkat & Jejak Audit',
    taglineEn: 'Strict 2FA enforcement, multi-device session manager with remote revocation, and real-time security audit trails.',
    taglineId: 'Kewajiban 2FA organisasi, pemantauan sesi login multi-perangkat, dan linimasa log audit keamanan.',
    descEn: 'SOC2 and compliance-ready security center: Enforce organization-wide mandatory 2FA, manage active desktop/mobile device sessions with remote revoke, and inspect immutable audit trail logs tracking sensitive administrative actions.',
    descId: 'Pusat kepatuhan standar SOC2: Wajibkan 2FA ke seluruh anggota tim, pantau sesi perangkat aktif (macOS, iOS, Windows) dengan tombol putus sesi jarak jauh, dan telusuri jejak log audit keamanan administratif secara kronologis.',
    tags: ['Enforce 2FA', 'Active Device Sessions', 'Remote Revocation', 'Immutable Audit Log', 'SOC2 Ready'],
    bestForEn: 'Regulated Industries, Fintech & HealthTech, Enterprise Compliance Audits, High-Security SaaS',
    bestForId: 'Industri Teregulasi, Fintech & HealthTech, Audit Kepatuhan Enterprise, Sistem SaaS Keamanan Tinggi',
    badge: 'Compliance & SOC2',
    accentColor: '#8b5cf6',
  },
  {
    id: 'danger-zone',
    nameEn: 'Workspace Transfer & Critical Danger Zone',
    nameId: 'Transfer Kepemilikan & Tindakan Kritis (Danger Zone)',
    taglineEn: 'Safeguarded destructive actions featuring ownership handoff, read-only freeze, and typed confirmation delete modal.',
    taglineId: 'Tindakan kritis terlindungi: serah terima kepemilikan, pembekuan arsip, dan dialog hapus dengan konfirmasi ketik.',
    descEn: 'Architected with extreme safety: Transfer primary ownership to another verified administrator, archive workspace into immutable read-only mode, and execute permanent deletion protected by double confirmation and string match validation.',
    descId: 'Dirancang dengan perlindungan keamanan ganda: Transfer kepemilikan utama ke admin terverifikasi lain, arsipkan ruang kerja ke mode baca-saja, dan eksekusi penghapusan permanen dengan verifikasi ketik teks konfirmasi.',
    tags: ['Danger Zone', 'Ownership Transfer', 'Archive Mode', 'Destructive Modal', 'Typed Confirmation'],
    bestForEn: 'Account Offboarding, Corporate M&A Transitions, Workspace Decommissioning, High-Risk Admin Operations',
    bestForId: 'Offboarding Akun, Transisi Akuisisi Perusahaan, Penutupan Workspace, Operasi Admin Berisiko Tinggi',
    badge: 'Critical Actions',
    accentColor: '#ef4444',
  },
];

// Helper hook for dark mode detection
function useIsDarkMode(prop?: boolean): boolean {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (prop !== undefined) return prop;
    if (typeof document !== 'undefined') {
      return (
        document.documentElement.classList.contains('dark-theme') ||
        document.body.classList.contains('dark-theme')
      );
    }
    return false;
  });

  useEffect(() => {
    if (prop !== undefined) {
      setIsDark(prop);
      return;
    }
    const checkDark = () => {
      const dark =
        document.documentElement.classList.contains('dark-theme') ||
        document.body.classList.contains('dark-theme');
      setIsDark(dark);
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [prop]);

  return isDark;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mini Graphic Silhouette for Pattern Card Gallery (Settings & RBAC)
// ─────────────────────────────────────────────────────────────────────────────

function SettingsMiniSilhouette({ id, isDarkMode }: { id: SettingsVariantId; isDarkMode: boolean }) {
  const bg = isDarkMode ? '#0f172a' : '#f8fafc';
  const cardBg = isDarkMode ? '#1e293b' : '#ffffff';
  const border = isDarkMode ? '#334155' : '#e2e8f0';

  if (id === 'general-workspace') {
    const accent = '#df7e30';
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {/* Top: Workspace Brand Banner */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: `${accent}20`, border: `1px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, fontSize: 9, fontWeight: 800 }}>
              AC
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: 68, height: 5, borderRadius: 2.5, background: isDarkMode ? '#94a3b8' : '#334155' }} />
              <div style={{ width: 44, height: 3.5, borderRadius: 2, background: isDarkMode ? '#64748b' : '#94a3b8' }} />
            </div>
          </div>
          <div style={{ height: 14, borderRadius: 10, background: '#10b98115', border: '1px solid #10b98130', padding: '0 6px', display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: 7.5, fontWeight: 700, color: '#10b981' }}>SSL Verified</span>
          </div>
        </div>

        {/* Bottom split: Domain Pill & Feature Toggles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 6, flex: 1 }}>
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Globe size={10} color={accent} />
              <span style={{ fontSize: 7.5, fontWeight: 700, color: isDarkMode ? '#cbd5e1' : '#475569' }}>Custom Domain</span>
            </div>
            <div style={{ height: 18, borderRadius: 4, background: isDarkMode ? '#0f172a' : '#f1f5f9', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
              <span style={{ fontSize: 7.5, color: accent, fontFamily: 'monospace', fontWeight: 600 }}>portal.acme.com</span>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
              <div style={{ height: 3.5, width: 28, borderRadius: 2, background: border }} />
              <div style={{ height: 3.5, width: 36, borderRadius: 2, background: border }} />
            </div>
          </div>

          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 46, height: 4, borderRadius: 2, background: isDarkMode ? '#94a3b8' : '#64748b' }} />
              <div style={{ width: 18, height: 10, borderRadius: 6, background: accent, padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: isDarkMode ? '#94a3b8' : '#64748b' }} />
              <div style={{ width: 18, height: 10, borderRadius: 6, background: accent, padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 34, height: 4, borderRadius: 2, background: border }} />
              <div style={{ width: 18, height: 10, borderRadius: 6, background: border, padding: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDarkMode ? '#64748b' : '#fff' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'rbac-members') {
    const accent = '#3b82f6';
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Top search & mini invite button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          <div style={{ flex: 1, height: 18, borderRadius: 4, background: cardBg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
            <Search size={9} color={isDarkMode ? '#64748b' : '#94a3b8'} />
            <div style={{ width: 48, height: 3.5, borderRadius: 2, background: isDarkMode ? '#334155' : '#e2e8f0' }} />
          </div>
          <div style={{ height: 18, borderRadius: 4, background: accent, padding: '0 7px', display: 'flex', alignItems: 'center', gap: 3, color: '#fff', fontSize: 8, fontWeight: 700 }}>
            <span>+</span>
            <span>Invite</span>
          </div>
        </div>

        {/* Member Table Roster Rows */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '4px 6px', display: 'flex', flexDirection: 'column', gap: 5, flex: 1, justifyContent: 'center' }}>
          {/* Row 1: Owner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#df7e30', color: '#fff', fontSize: 7, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <div style={{ width: 50, height: 4, borderRadius: 2, background: isDarkMode ? '#cbd5e1' : '#334155' }} />
                <div style={{ width: 36, height: 3, borderRadius: 1.5, background: border }} />
              </div>
            </div>
            <span style={{ fontSize: 7.5, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: '#df7e3018', color: '#df7e30' }}>Owner</span>
          </div>

          {/* Row 2: Admin */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#3b82f6', color: '#fff', fontSize: 7, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <div style={{ width: 44, height: 4, borderRadius: 2, background: isDarkMode ? '#cbd5e1' : '#334155' }} />
                <div style={{ width: 32, height: 3, borderRadius: 1.5, background: border }} />
              </div>
            </div>
            <span style={{ fontSize: 7.5, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: '#3b82f618', color: '#3b82f6' }}>Admin</span>
          </div>

          {/* Row 3: Member */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#8b5cf6', color: '#fff', fontSize: 7, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <div style={{ width: 40, height: 4, borderRadius: 2, background: isDarkMode ? '#cbd5e1' : '#334155' }} />
                <div style={{ width: 28, height: 3, borderRadius: 1.5, background: border }} />
              </div>
            </div>
            <span style={{ fontSize: 7.5, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: '#8b5cf618', color: '#8b5cf6' }}>Security</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'api-security') {
    const accent = '#10b981';
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Top: API Key Card Mockup */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Key size={10} color={accent} />
              <span style={{ fontSize: 8, fontWeight: 700, color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>Production Live Key</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent }} />
              <span style={{ fontSize: 7, fontWeight: 700, color: accent }}>Active</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isDarkMode ? '#0f172a' : '#f1f5f9', borderRadius: 4, padding: '3px 6px', border: `1px solid ${border}` }}>
            <span style={{ fontSize: 7.5, fontFamily: 'monospace', color: isDarkMode ? '#94a3b8' : '#475569' }}>neu_live_••••••••9038</span>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: `${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Copy size={8} color={accent} />
            </div>
          </div>
        </div>

        {/* Bottom: Webhook Ping Card Mockup */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: isDarkMode ? '#cbd5e1' : '#334155' }}>Webhook Trigger</span>
            <span style={{ fontSize: 7, fontFamily: 'monospace', color: isDarkMode ? '#64748b' : '#94a3b8' }}>https://api.acme.com/v1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ padding: '2px 5px', borderRadius: 3, background: '#10b98115', border: '1px solid #10b98130', color: '#10b981', fontSize: 7.5, fontWeight: 800 }}>
              200 OK (38ms)
            </div>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Send size={8} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'audit-security') {
    const accent = '#8b5cf6';
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Active Device Session */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
              <Laptop size={10} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>MacBook Pro 16" · Jakarta</span>
              <span style={{ fontSize: 6.5, color: isDarkMode ? '#64748b' : '#94a3b8' }}>Chrome 128 · 103.24.12.9</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 5px', borderRadius: 3, background: '#10b98115', color: '#10b981', fontSize: 7, fontWeight: 800 }}>
            <div style={{ width: 3.5, height: 3.5, borderRadius: '50%', background: '#10b981' }} />
            Active
          </div>
        </div>

        {/* Audit Log Trail */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '5px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent }} />
              <span style={{ fontSize: 7.5, fontFamily: 'monospace', fontWeight: 600, color: accent }}>api.key_created</span>
            </div>
            <span style={{ fontSize: 7, color: isDarkMode ? '#64748b' : '#94a3b8' }}>2m ago</span>
          </div>
          <div style={{ height: 1, background: border }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3b82f6' }} />
              <span style={{ fontSize: 7.5, fontFamily: 'monospace', fontWeight: 600, color: '#3b82f6' }}>member.role_updated</span>
            </div>
            <span style={{ fontSize: 7, color: isDarkMode ? '#64748b' : '#94a3b8' }}>14m ago</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'danger-zone') {
    const accent = '#ef4444';
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Danger Warning Box */}
        <div style={{ background: `${accent}10`, border: `1px solid ${accent}30`, borderRadius: 6, padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
            <AlertTriangle size={10} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: accent }}>Irreversible Destruction Area</span>
            <span style={{ fontSize: 6.5, color: isDarkMode ? '#f87171' : '#dc2626' }}>Requires dual-factor & typed confirmation</span>
          </div>
        </div>

        {/* Delete Confirmation Box */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>Confirm Deletion</span>
            <span style={{ fontSize: 6.5, fontFamily: 'monospace', color: accent }}>DELETE ACME-GLOBAL</span>
          </div>
          <div style={{ height: 18, borderRadius: 4, background: isDarkMode ? '#0f172a' : '#f8fafc', border: `1.5px dashed ${accent}60`, display: 'flex', alignItems: 'center', padding: '0 6px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 7.5, fontFamily: 'monospace', color: isDarkMode ? '#94a3b8' : '#64748b' }}>DELETE ACME...</span>
            <div style={{ height: 12, borderRadius: 3, background: accent, padding: '0 6px', color: '#fff', fontSize: 7, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              Confirm
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 1: General Workspace & Company Branding
// ─────────────────────────────────────────────────────────────────────────────

function GeneralWorkspacePreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [workspaceName, setWorkspaceName] = useState('Acme Global Technologies');
  const [workspaceSlug, setWorkspaceSlug] = useState('acme-global');
  const [customDomain, setCustomDomain] = useState('portal.acme-corp.com');
  const [timezone, setTimezone] = useState('Asia/Jakarta');
  const [currency, setCurrency] = useState('IDR');
  const [retentionDays, setRetentionDays] = useState('90d');
  const [tlsStrict, setTlsStrict] = useState(true);
  const [dailyBackup, setDailyBackup] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);
  const [copiedOrgId, setCopiedOrgId] = useState(false);
  const [copiedDns, setCopiedDns] = useState<string | null>(null);

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const copyOrgId = () => {
    navigator.clipboard.writeText('org_acme_889102');
    setCopiedOrgId(true);
    setTimeout(() => setCopiedOrgId(false), 2000);
  };

  const copyDnsRecord = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedDns(key);
    setTimeout(() => setCopiedDns(null), 2000);
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── Enterprise Organization Hero Ribbon ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid rgba(223, 126, 48, 0.25)',
          borderRadius: 16,
          padding: '20px 24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #df7e30, #c2410c)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 18,
                boxShadow: '0 4px 14px rgba(223, 126, 48, 0.35)',
                flexShrink: 0,
              }}
            >
              AC
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  PT Acme Global Technologies
                </h3>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Shield size={12} />
                  {isId ? 'Organisasi Terverifikasi' : 'Verified Enterprise'}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    background: 'rgba(223, 126, 48, 0.15)',
                    color: '#df7e30',
                  }}
                >
                  Enterprise Plus Tier
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 5, fontSize: 12, color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  Org ID:
                  <code style={{ background: 'var(--color-bg-canvas)', padding: '2px 6px', borderRadius: 4, fontSize: 11.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    org_acme_889102
                  </code>
                  <button
                    type="button"
                    onClick={copyOrgId}
                    title="Copy Org ID"
                    style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer', color: copiedOrgId ? '#10b981' : 'var(--color-text-tertiary)', display: 'inline-flex', alignItems: 'center' }}
                  >
                    {copiedOrgId ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 8px #10b981',
                      animation: 'radarPing 1.8s infinite',
                    }}
                  />
                  <span>Region: <strong>ap-southeast-3 (Jakarta)</strong> · 18ms</span>
                </span>
                <span>•</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  UU PDP No. 27/2022 Compliant
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NeuronButton
              size="sm"
              variant="outline"
              leadingIcon={<Download size={14} />}
              onClick={() => alert(isId ? 'Sertifikat kepatuhan SOC2 & PDP berhasil diunduh!' : 'Compliance Certificate downloaded!')}
            >
              {isId ? 'Unduh Sertifikat' : 'Export Compliance'}
            </NeuronButton>
          </div>
        </div>
      </div>

      {/* ── Workspace Identity Card ── */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Identitas Ruang Kerja' : 'Workspace Identity'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Atur logo resmi, nama entitas bisnis, dan slug URL publik organisasi Anda.' : 'Manage company logo, legal name, and public workspace URL.'}
            </p>
          </div>
          <NeuronBadge variant="default" size="sm">
            {isId ? 'Pusat Identitas' : 'Identity Hub'}
          </NeuronBadge>
        </div>

        {/* Logo Uploader row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22, padding: 16, background: 'var(--color-bg-canvas)', borderRadius: 12, border: '1px dashed var(--color-border)' }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: 'linear-gradient(135deg, #df7e30, #b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, fontWeight: 900, boxShadow: '0 4px 14px rgba(223, 126, 48, 0.35)', flexShrink: 0 }}>
            AC
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
              {isId ? 'Logo Workspace Resmi' : 'Official Workspace Avatar'}
              <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                Brand Hex: #df7e30
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              PNG, SVG, atau WebP (Maksimal 2MB, rasio 1:1, minimal 256x256px untuk tampilan tajam).
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <NeuronButton size="sm" variant="outline" onClick={() => alert(isId ? 'Pilih berkas logo perusahaan dari perangkat Anda.' : 'Choose logo file from your machine.')}>
              {isId ? 'Ganti Logo' : 'Upload Logo'}
            </NeuronButton>
            <NeuronButton size="sm" variant="text" onClick={() => alert(isId ? 'Logo direset ke inisial default.' : 'Logo reset to initials.')}>
              {isId ? 'Reset' : 'Reset'}
            </NeuronButton>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
              {isId ? 'Nama Legal Perusahaan' : 'Legal Workspace Name'}
            </label>
            <NeuronInput
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Acme Global Technologies"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
              {isId ? 'Slug URL Workspace' : 'Workspace Slug URL'}
            </label>
            <NeuronInput
              value={workspaceSlug}
              onChange={(e) => setWorkspaceSlug(e.target.value)}
              leadingText="app.neudela.com/"
              placeholder="acme-global"
            />
          </div>
        </div>
      </div>

      {/* ── Custom Domain & DNS Mapping ── */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Domain Kustom Organisasi & Konfigurasi DNS' : 'Custom Organization Domain & DNS Records'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Petakan domain kustom Anda dengan sertifikat SSL terenkripsi otomatis.' : 'Route enterprise traffic through your custom white-labeled SSL hostname.'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: 12, fontWeight: 700 }}>
            <CheckCircle2 size={14} />
            <span>DNS Active · SSL Wildcard</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <NeuronInput
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="portal.acme-corp.com"
              leadingIcon={<Globe size={16} />}
            />
          </div>
          <NeuronButton size="md" variant="secondary" onClick={() => alert(isId ? 'Memvalidasi propagate DNS ke Cloudflare & Route53...' : 'Re-checking DNS records across global edge...')}>
            {isId ? 'Verifikasi DNS' : 'Check DNS'}
          </NeuronButton>
        </div>

        {/* Live DNS Records Table */}
        <div style={{ background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                <th style={{ padding: '10px 14px' }}>Type</th>
                <th style={{ padding: '10px 14px' }}>Host / Name</th>
                <th style={{ padding: '10px 14px' }}>Target Value</th>
                <th style={{ padding: '10px 14px' }}>TTL</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 800, color: '#3b82f6' }}>CNAME</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-text-primary)' }}>portal</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                  cname.neudela.net
                  <button
                    type="button"
                    onClick={() => copyDnsRecord('cname', 'cname.neudela.net')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 6, color: copiedDns === 'cname' ? '#10b981' : 'var(--color-text-tertiary)' }}
                  >
                    {copiedDns === 'cname' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </td>
                <td style={{ padding: '10px 14px', color: 'var(--color-text-tertiary)' }}>300s</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                    Resolved ✓
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: 800, color: '#8b5cf6' }}>TXT</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-text-primary)' }}>_neudela-challenge</td>
                <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                  neudela-verification=8f39a1c97e02
                  <button
                    type="button"
                    onClick={() => copyDnsRecord('txt', 'neudela-verification=8f39a1c97e02')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 6, color: copiedDns === 'txt' ? '#10b981' : 'var(--color-text-tertiary)' }}
                  >
                    {copiedDns === 'txt' ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </td>
                <td style={{ padding: '10px 14px', color: 'var(--color-text-tertiary)' }}>300s</td>
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                    Verified ✓
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Regional & Localization ── */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Preferensi Regional & Lokalisasi' : 'Regional & Localization Defaults'}
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
          {isId ? 'Standar zona waktu transaksi dan mata uang pembukuan untuk seluruh modul dan ekspor laporan.' : 'Standard operational timezone and base accounting currency across invoices and exports.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              {isId ? 'Zona Waktu Utama' : 'Primary Timezone'}
            </label>
            <NeuronSelect
              value={timezone}
              onChange={(val) => setTimezone(val as string)}
              options={[
                { value: 'Asia/Jakarta', label: 'Asia/Jakarta (WIB) GMT+7' },
                { value: 'Asia/Makassar', label: 'Asia/Makassar (WITA) GMT+8' },
                { value: 'Asia/Jayapura', label: 'Asia/Jayapura (WIT) GMT+9' },
                { value: 'Asia/Singapore', label: 'Asia/Singapore (SGT) GMT+8' },
                { value: 'UTC', label: 'UTC (Universal Coordinated Time)' },
                { value: 'America/New_York', label: 'America/New_York (EST) GMT-5' },
              ]}
              leadingType="icon"
              leadingIcon={<Clock size={16} />}
            />
            <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', fontSize: 11.5, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{isId ? 'Format Tanggal & Waktu Aktif:' : 'Active DateTime Format:'}</span>
              <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'monospace' }}>
                {timezone === 'Asia/Jakarta' ? '15:45:00 WIB (DD/MM/YYYY)' : '15:45:00 (ISO-8601)'}
              </strong>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              {isId ? 'Mata Uang Pembukuan' : 'Base Accounting Currency'}
            </label>
            <NeuronSelect
              value={currency}
              onChange={(val) => setCurrency(val as string)}
              options={[
                { value: 'IDR', label: 'IDR (Rupiah Indonesia - Rp)' },
                { value: 'USD', label: 'USD (US Dollar - $)' },
                { value: 'EUR', label: 'EUR (Euro - €)' },
                { value: 'SGD', label: 'SGD (Singapore Dollar - S$)' },
              ]}
              leadingType="icon"
              leadingIcon={<Globe size={16} />}
            />
            <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', fontSize: 11.5, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{isId ? 'Format Angka Moneter:' : 'Sample Currency Rendering:'}</span>
              <strong style={{ color: '#10b981', fontFamily: 'monospace' }}>
                {currency === 'IDR' ? 'Rp 1.500.000,00' : '$ 1,500.00'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── Compliance & Data Retention Toggles ── */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Kebijakan Kepatuhan & Retensi Data' : 'Compliance & Data Retention'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                {isId ? 'Wajibkan Enkripsi TLS 1.3 Strict Mode' : 'Enforce TLS 1.3 Strict Encryption'}
                <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                  Active
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Tolak seluruh koneksi jaringan dengan protokol legacy di bawah TLS 1.3 dan cipher insecure.' : 'Reject legacy ciphers and insecure client network handshakes globally.'}
              </div>
            </div>
            <NeuronToggle checked={tlsStrict} onChange={(val) => setTlsStrict(val)} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div style={{ flex: 1, paddingRight: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                {isId ? 'Pencadangan Basis Data Otomatis Harian' : 'Automated Daily Database Snapshots'}
                <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', fontWeight: 700 }}>
                  AWS S3 Multi-Region
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Simpan replika data terenkripsi AES-256 ke AWS S3 Jakarta & Singapura setiap pukul 02:00 WIB.' : 'Multi-region S3 encrypted cold backups generated daily at 02:00 UTC.'}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 150 }}>
                <NeuronSelect
                  size="sm"
                  value={retentionDays}
                  onChange={(val) => setRetentionDays(val as string)}
                  options={[
                    { value: '30d', label: '30 Hari' },
                    { value: '90d', label: '90 Hari (Standar)' },
                    { value: '365d', label: '1 Tahun' },
                    { value: '7y', label: '7 Tahun (SOC2)' },
                  ]}
                />
              </div>
              <NeuronToggle checked={dailyBackup} onChange={(val) => setDailyBackup(val)} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Anonimisasi Data Telemetri & Log Diagnostik (PDP Compliant)' : 'Anonymize Telemetry & Audit Telemetry'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Samarkan alamat IP dan identitas pribadi (PII) sebelum dikirim ke agregasi analitik internal.' : 'Hash user IP addresses and PII data before telemetry reporting.'}
              </div>
            </div>
            <NeuronToggle checked={anonymizeData} onChange={(val) => setAnonymizeData(val)} />
          </div>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--color-border)' }}>
          {savedStatus && (
            <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={15} />
              {isId ? 'Konfigurasi workspace berhasil disimpan!' : 'Workspace preferences saved!'}
            </span>
          )}
          <NeuronButton size="md" variant="secondary" onClick={() => alert(isId ? 'Perubahan dibatalkan' : 'Changes discarded')}>
            {isId ? 'Batalkan' : 'Discard'}
          </NeuronButton>
          <NeuronButton size="md" variant="primary" onClick={handleSave}>
            {isId ? 'Simpan Konfigurasi' : 'Save Changes'}
          </NeuronButton>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 2: Team Directory & Granular RBAC Permissions
// ─────────────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Security Engineer' | 'Product Designer' | 'Finance Lead' | 'Viewer';
  twoFactor: boolean;
  lastActive: string;
  avatarColor: string;
  isOnline: boolean;
}

const INITIAL_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@acme.com', role: 'Owner', twoFactor: true, lastActive: 'Online Now', avatarColor: '#df7e30', isOnline: true },
  { id: '2', name: 'Rian Pratama', email: 'rian.p@acme.com', role: 'Admin', twoFactor: true, lastActive: '14 mins ago', avatarColor: '#3b82f6', isOnline: true },
  { id: '3', name: 'Elena Rostova', email: 'elena.r@acme.com', role: 'Security Engineer', twoFactor: true, lastActive: '2 hours ago', avatarColor: '#8b5cf6', isOnline: false },
  { id: '4', name: 'Budi Santoso', email: 'budi.s@acme.com', role: 'Product Designer', twoFactor: false, lastActive: 'Yesterday', avatarColor: '#f59e0b', isOnline: false },
  { id: '5', name: 'Devon Miles', email: 'devon.m@acme.com', role: 'Finance Lead', twoFactor: true, lastActive: '3 days ago', avatarColor: '#0ea5e9', isOnline: false },
  { id: '6', name: 'Alya Putri', email: 'alya.p@acme.com', role: 'Viewer', twoFactor: true, lastActive: '5 days ago', avatarColor: '#10b981', isOnline: false },
];

function TeamRbacMembersPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Security Engineer' | 'Product Designer' | 'Finance Lead' | 'Viewer'>('Product Designer');
  const [showMatrix, setShowMatrix] = useState(false);
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || m.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  const handleSend2FaReminder = (email: string, name: string) => {
    setReminderToast(isId ? `Pengingat aktivasi 2FA berhasil dikirim ke ${email}!` : `2FA Setup reminder sent to ${email}!`);
    setTimeout(() => setReminderToast(null), 3500);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: inviteEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: inviteEmail,
      role: inviteRole,
      twoFactor: false,
      lastActive: isId ? 'Undangan Terkirim' : 'Invite Sent',
      avatarColor: '#10b981',
      isOnline: false,
    };
    setMembers([newMember, ...members]);
    setInviteEmail('');
    setIsInviteModalOpen(false);
    setReminderToast(isId ? `Undangan berhasil dikirim ke ${inviteEmail}!` : `Invitation sent to ${inviteEmail}!`);
    setTimeout(() => setReminderToast(null), 3000);
  };

  const handleRoleChange = (memberId: string, newRole: any) => {
    setMembers(members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)));
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    if (confirm(isId ? `Hapus akses organisasi untuk ${memberName}?` : `Revoke workspace access for ${memberName}?`)) {
      setMembers(members.filter((m) => m.id !== memberId));
    }
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── Team Metrics Overview Ribbon ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '16px 18px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{isId ? 'Total Anggota' : 'Total Members'}</span>
            <Users size={14} color="#3b82f6" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)', marginTop: 4 }}>
            {members.length} <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>/ 10 Seats</span>
          </div>
          <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600, marginTop: 4 }}>
            {10 - members.length} {isId ? 'lisensi tersisa' : 'seats available'}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '16px 18px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{isId ? 'Kepatuhan 2FA' : '2FA Compliance'}</span>
            <Shield size={14} color="#10b981" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981', marginTop: 4 }}>
            83% <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>(5/6 Enrolled)</span>
          </div>
          <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, marginTop: 4 }}>
            1 {isId ? 'anggota butuh tindakan' : 'member missing MFA'}
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '16px 18px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{isId ? 'Audit Hak Akses' : 'RBAC Governance'}</span>
            <CheckCircle2 size={14} color="#8b5cf6" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-text-primary)', marginTop: 6 }}>
            SOC2 Enforced
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 4 }}>
            {isId ? 'Disinkronkan hari ini 09:15' : 'Audited today 09:15 WIB'}
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {reminderToast && (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, animation: 'fadeIn 0.2s ease-out' }}>
          <CheckCircle2 size={16} />
          <span>{reminderToast}</span>
        </div>
      )}

      {/* Top Banner and Quick Actions */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 22, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 18 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Manajemen Pengguna & Izin RBAC' : 'Team Members & RBAC Roles'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Kelola anggota organisasi, penugasan peran hak akses, dan kepatuhan autentikasi multi-faktor.' : 'Manage organization seats, assign fine-grained roles, and audit 2FA enrollment.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <NeuronButton
              size="sm"
              variant="outline"
              leadingIcon={<Shield size={14} />}
              onClick={() => setShowMatrix(!showMatrix)}
            >
              {showMatrix ? (isId ? 'Tutup Matriks Izin' : 'Hide Matrix') : (isId ? 'Matriks Izin RBAC' : 'Permissions Matrix')}
            </NeuronButton>
            <NeuronButton
              size="sm"
              variant="primary"
              leadingIcon={<UserPlus size={14} />}
              onClick={() => setIsInviteModalOpen(true)}
            >
              {isId ? 'Undang Anggota' : 'Invite Member'}
            </NeuronButton>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <NeuronInput
              placeholder={isId ? 'Cari nama atau email anggota tim...' : 'Search members by name or email...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leadingIcon={<Search size={15} />}
            />
          </div>

          {/* Role Filter Pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: isId ? 'Semua' : 'All', count: members.length },
              { id: 'Admin', label: 'Admin', count: members.filter((m) => m.role === 'Admin' || m.role === 'Owner').length },
              { id: 'Security Engineer', label: 'Security', count: members.filter((m) => m.role === 'Security Engineer').length },
              { id: 'Product Designer', label: 'Designer', count: members.filter((m) => m.role === 'Product Designer').length },
              { id: 'Finance Lead', label: 'Finance', count: members.filter((m) => m.role === 'Finance Lead').length },
              { id: 'Viewer', label: 'Viewer', count: members.filter((m) => m.role === 'Viewer').length },
            ].map((rf) => (
              <button
                key={rf.id}
                type="button"
                onClick={() => setRoleFilter(rf.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: roleFilter === rf.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: roleFilter === rf.id ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-canvas)',
                  color: roleFilter === rf.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontSize: 12,
                  fontWeight: roleFilter === rf.id ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{rf.label}</span>
                <span style={{ fontSize: 11, opacity: 0.8, fontWeight: 700 }}>({rf.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Permissions Capability Matrix (Collapsible) */}
      {showMatrix && (
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} color="#3b82f6" />
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {isId ? 'Matriks Hak Akses Granular per Role' : 'Granular Role Capability Matrix'}
              </h4>
            </div>
            <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Level Izin Otomatis Disinkronkan' : 'Role-based access definitions'}
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                  <th style={{ padding: '8px 12px' }}>Capability Scope</th>
                  <th style={{ padding: '8px 12px' }}>Owner</th>
                  <th style={{ padding: '8px 12px' }}>Admin</th>
                  <th style={{ padding: '8px 12px' }}>Security Lead</th>
                  <th style={{ padding: '8px 12px' }}>Finance</th>
                  <th style={{ padding: '8px 12px' }}>Viewer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scope: 'Billing & Invoice Downloads', owner: true, admin: true, sec: false, fin: true, view: false },
                  { scope: 'Invite & Revoke Team Members', owner: true, admin: true, sec: true, fin: false, view: false },
                  { scope: 'Generate Production API Keys', owner: true, admin: true, sec: true, fin: false, view: false },
                  { scope: 'Audit Logs & Device Revocation', owner: true, admin: true, sec: true, fin: false, view: false },
                  { scope: 'Export Data Grid to CSV/Excel', owner: true, admin: true, sec: true, fin: true, view: true },
                  { scope: 'Danger Zone & Workspace Deletion', owner: true, admin: false, sec: false, fin: false, view: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border)', background: i % 2 === 0 ? 'var(--color-bg-canvas)' : 'transparent' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.scope}</td>
                    <td style={{ padding: '10px 12px' }}>{row.owner ? <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> : <span style={{ color: 'var(--color-text-tertiary)' }}>—</span>}</td>
                    <td style={{ padding: '10px 12px' }}>{row.admin ? <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> : <span style={{ color: 'var(--color-text-tertiary)' }}>—</span>}</td>
                    <td style={{ padding: '10px 12px' }}>{row.sec ? <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> : <span style={{ color: 'var(--color-text-tertiary)' }}>—</span>}</td>
                    <td style={{ padding: '10px 12px' }}>{row.fin ? <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> : <span style={{ color: 'var(--color-text-tertiary)' }}>—</span>}</td>
                    <td style={{ padding: '10px 12px' }}>{row.view ? <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> : <span style={{ color: 'var(--color-text-tertiary)' }}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Team Roster Table */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-canvas)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 700 }}>
                <th style={{ padding: '12px 18px' }}>{isId ? 'Nama & Akun' : 'Member Name & Email'}</th>
                <th style={{ padding: '12px 18px' }}>{isId ? 'Peran (RBAC Role)' : 'Assigned Role'}</th>
                <th style={{ padding: '12px 18px' }}>{isId ? 'Status 2FA' : '2FA Status'}</th>
                <th style={{ padding: '12px 18px' }}>{isId ? 'Aktivitas Terakhir' : 'Last Active'}</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>{isId ? 'Aksi' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {/* Member Name */}
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ position: 'relative' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: m.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                          {m.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        {m.isOnline && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: -2,
                              right: -2,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              background: '#10b981',
                              border: '2px solid var(--color-bg-surface)',
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          {m.name}
                          {m.role === 'Owner' && (
                            <span style={{ fontSize: 10.5, fontWeight: 800, padding: '1px 6px', borderRadius: 4, background: 'rgba(223, 126, 48, 0.15)', color: '#df7e30' }}>
                              Owner
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>{m.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role Selector using Neudela NeuronSelect */}
                  <td style={{ padding: '14px 18px', minWidth: 180 }}>
                    {m.role === 'Owner' ? (
                      <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: 'rgba(223, 126, 48, 0.12)', color: '#df7e30' }}>
                        ★ Primary Owner
                      </span>
                    ) : (
                      <div style={{ width: 175 }}>
                        <NeuronSelect
                          size="sm"
                          value={m.role}
                          onChange={(val) => handleRoleChange(m.id, val as string)}
                          options={[
                            { value: 'Admin', label: 'Admin' },
                            { value: 'Security Engineer', label: 'Security Engineer' },
                            { value: 'Product Designer', label: 'Product Designer' },
                            { value: 'Finance Lead', label: 'Finance Lead' },
                            { value: 'Viewer', label: 'Viewer' },
                          ]}
                        />
                      </div>
                    )}
                  </td>

                  {/* 2FA Badge & Actionable Reminder */}
                  <td style={{ padding: '14px 18px' }}>
                    {m.twoFactor ? (
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={13} /> Enrolled
                      </span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <AlertTriangle size={13} /> Missing 2FA
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSend2FaReminder(m.email, m.name)}
                          style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            borderRadius: 6,
                            padding: '3px 8px',
                            color: '#d97706',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {isId ? 'Kirim Pengingat' : 'Send Reminder'}
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Last Active */}
                  <td style={{ padding: '14px 18px', fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    {m.lastActive}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    {m.role !== 'Owner' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(m.id, m.name)}
                        title={isId ? 'Cabut Akses' : 'Revoke Access'}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-tertiary)', cursor: 'pointer', padding: 6, borderRadius: 6, transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Dialog Modal */}
      {isInviteModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, width: '100%', maxWidth: 480, padding: 24, boxShadow: 'var(--shadow-xl)', animation: 'scaleUp 0.2s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserPlus size={18} color="#3b82f6" />
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Undang Anggota Tim Baru' : 'Invite Team Member'}
                </h4>
              </div>
              <button type="button" onClick={() => setIsInviteModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: 16, fontSize: 12, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{isId ? 'Lisensi Enterprise Tersedia:' : 'Enterprise License Availability:'}</span>
              <strong style={{ color: '#3b82f6' }}>4 / 10 {isId ? 'Kursi Tersedia' : 'Seats Available'}</strong>
            </div>

            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                  {isId ? 'Alamat Email Perusahaan' : 'Corporate Email Address'}
                </label>
                <NeuronInput
                  type="email"
                  required
                  placeholder="alex.turner@acme.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                  {isId ? 'Pilih Peran Hak Akses' : 'Assign RBAC Role'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {(['Admin', 'Security Engineer', 'Product Designer', 'Finance Lead', 'Viewer'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setInviteRole(r)}
                      style={{
                        padding: '10px 10px',
                        borderRadius: 8,
                        border: inviteRole === r ? '2px solid #3b82f6' : '1px solid var(--color-border)',
                        background: inviteRole === r ? 'rgba(59, 130, 246, 0.08)' : 'var(--color-bg-canvas)',
                        color: inviteRole === r ? '#3b82f6' : 'var(--color-text-primary)',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{r}</span>
                      {inviteRole === r && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <NeuronButton size="sm" variant="secondary" onClick={() => setIsInviteModalOpen(false)}>
                  {isId ? 'Batal' : 'Cancel'}
                </NeuronButton>
                <NeuronButton size="sm" variant="primary" type="submit">
                  {isId ? 'Kirim Undangan' : 'Send Invite'}
                </NeuronButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 3: Developer API Keys & Webhook Subscriptions
// ─────────────────────────────────────────────────────────────────────────────

interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  fullToken: string;
  created: string;
  lastUsed: string;
  scope: string;
  environment: 'PRODUCTION' | 'STAGING' | 'AUTOMATION';
  isRevealed: boolean;
  reqCount: string;
}

function DeveloperApiKeysPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: 'k1',
      name: 'Production Invoicing Server',
      keyPrefix: 'neu_live_',
      fullToken: 'neu_live_9f8e4b2c1a0e7d6a5c3b1e9f0d8a7c2b',
      created: '12 Jan 2026',
      lastUsed: '2 mins ago',
      scope: 'Full Access (Orders, Billing)',
      environment: 'PRODUCTION',
      isRevealed: false,
      reqCount: '18,420 req/24h · 99.98%',
    },
    {
      id: 'k2',
      name: 'Staging Integration Sandbox',
      keyPrefix: 'neu_test_',
      fullToken: 'neu_test_5c3b1e9f0d8a7c2b9f8e4b2c1a0e7d6a',
      created: '01 Feb 2026',
      lastUsed: 'Yesterday',
      scope: 'Sandbox Only (Read/Write)',
      environment: 'STAGING',
      isRevealed: false,
      reqCount: '2,140 req/24h · 100%',
    },
    {
      id: 'k3',
      name: 'CI/CD Automated Deploy Bot',
      keyPrefix: 'neu_live_',
      fullToken: 'neu_live_1a0e7d6a5c3b1e9f9f8e4b2c0d8a7c2b',
      created: '18 Feb 2026',
      lastUsed: '4 hours ago',
      scope: 'Deployments:Write',
      environment: 'AUTOMATION',
      isRevealed: false,
      reqCount: '480 req/24h · 99.9%',
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('https://api.acme-corp.com/v1/webhooks/neudela');
  const [isPinging, setIsPinging] = useState(false);
  const [pingSteps, setPingSteps] = useState<string[]>([]);
  const [showPayload, setShowPayload] = useState(false);
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyEnv, setNewKeyEnv] = useState<'PRODUCTION' | 'STAGING'>('PRODUCTION');

  const [subscribedEvents, setSubscribedEvents] = useState<string[]>([
    'order.created',
    'payment.settled',
    'member.invited',
  ]);

  const toggleEventChip = (ev: string) => {
    if (subscribedEvents.includes(ev)) {
      setSubscribedEvents(subscribedEvents.filter((e) => e !== ev));
    } else {
      setSubscribedEvents([...subscribedEvents, ev]);
    }
  };

  const toggleReveal = (id: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, isRevealed: !k.isRevealed } : k)));
  };

  const copyKey = (id: string, token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTestWebhook = () => {
    setIsPinging(true);
    setPingSteps([isId ? '⚡ Resolving DNS endpoint api.acme-corp.com...' : '⚡ Resolving DNS endpoint api.acme-corp.com...']);
    setTimeout(() => {
      setPingSteps((prev) => [...prev, isId ? '🔒 TLS 1.3 Handshake terenkripsi (AES-256-GCM cipher)' : '🔒 TLS 1.3 Handshake negotiated (AES-256-GCM)']);
      setTimeout(() => {
        setPingSteps((prev) => [
          ...prev,
          isId ? '📦 Mengirim payload event payment.settled bertanda tangan HMAC-SHA256...' : '📦 Dispatching HMAC-SHA256 signed event payment.settled...',
          isId ? '✅ HTTP 200 OK (Latensi: 24ms) · Handshake berhasil diterima webhook receiver!' : '✅ HTTP 200 OK (Latency: 24ms) · Webhook receiver acknowledged handshake!',
        ]);
        setIsPinging(false);
      }, 500);
    }, 400);
  };

  const handleCreateKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const prefix = newKeyEnv === 'PRODUCTION' ? 'neu_live_' : 'neu_test_';
    const newK: ApiKeyItem = {
      id: String(Date.now()),
      name: newKeyName,
      keyPrefix: prefix,
      fullToken: prefix + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      created: isId ? 'Hari Ini' : 'Today',
      lastUsed: isId ? 'Belum Pernah' : 'Never',
      scope: 'Standard Access (Read/Write)',
      environment: newKeyEnv,
      isRevealed: true,
      reqCount: '0 req/24h',
    };
    setApiKeys([newK, ...apiKeys]);
    setNewKeyName('');
    setIsCreateKeyModalOpen(false);
  };

  const handleRevokeKey = (id: string, name: string) => {
    if (confirm(isId ? `Apakah Anda yakin ingin mencabut (revoke) kunci API "${name}"? Kredensial ini akan langsung nonaktif.` : `Revoke API key "${name}"? Token will be immediately invalidated.`)) {
      setApiKeys(apiKeys.filter((k) => k.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Warning Banner */}
      <NeuronAlert
        variant="warning"
        title={isId ? 'Jaga Kerahasiaan Kunci API Anda' : 'Treat API Keys Like Passwords'}
        description={
          isId
            ? 'Kunci API memberi hak akses terprogram penuh ke sumber daya workspace. Jangan pernah menyematkan token rahasia ini ke repository publik atau kode sisi-klien frontend.'
            : 'Secret API keys grant programmatic administrative access. Never commit keys to public repositories or expose them in client-side applications.'
        }
      />

      {/* API Keys Table Card */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Daftar Kunci API (REST & GraphQL)' : 'Active Secret API Keys'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Kredensial server-to-server untuk integrasi backend otomatis dan sistem pipeline.' : 'Server-to-server authorization tokens for backend automations and microservices.'}
            </p>
          </div>
          <NeuronButton size="sm" variant="primary" leadingIcon={<Key size={14} />} onClick={() => setIsCreateKeyModalOpen(true)}>
            {isId ? 'Buat Kunci API Baru' : 'Generate Secret Key'}
          </NeuronButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {apiKeys.map((k) => (
            <div
              key={k.id}
              style={{
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Key size={15} color={k.environment === 'PRODUCTION' ? '#10b981' : '#f59e0b'} />
                  <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{k.name}</strong>
                  <span
                    style={{
                      fontSize: 10.5,
                      padding: '2px 8px',
                      borderRadius: 10,
                      fontWeight: 800,
                      background:
                        k.environment === 'PRODUCTION'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : k.environment === 'STAGING'
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(59, 130, 246, 0.15)',
                      color:
                        k.environment === 'PRODUCTION'
                          ? '#10b981'
                          : k.environment === 'STAGING'
                          ? '#d97706'
                          : '#3b82f6',
                    }}
                  >
                    {k.environment}
                  </span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    {k.scope}
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{k.reqCount}</span>
                  <span>•</span>
                  <span>{isId ? 'Terakhir: ' : 'Last used: '}<strong>{k.lastUsed}</strong></span>
                </div>
              </div>

              {/* Token Value Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-surface)', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border)' }}>
                <code style={{ flex: 1, fontFamily: 'monospace', fontSize: 12.5, color: k.isRevealed ? '#10b981' : 'var(--color-text-secondary)', letterSpacing: k.isRevealed ? '0.5px' : '2px' }}>
                  {k.isRevealed ? k.fullToken : `${k.keyPrefix}••••••••••••••••••••••••••••••••`}
                </code>
                <button
                  type="button"
                  onClick={() => toggleReveal(k.id)}
                  title={k.isRevealed ? 'Sembunyikan' : 'Lihat'}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', padding: 4 }}
                >
                  {k.isRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => copyKey(k.id, k.fullToken)}
                  title="Salin Kunci"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedId === k.id ? '#10b981' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 11.5, fontWeight: 700 }}
                >
                  {copiedId === k.id ? (
                    <>
                      <Check size={14} /> {isId ? 'Tersalin' : 'Copied'}
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> {isId ? 'Salin' : 'Copy'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleRevokeKey(k.id, k.name)}
                  title="Revoke Key"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', padding: 4 }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks Subscription Card */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Langganan Webhook (Event Stream Real-Time)' : 'Webhook Subscriptions (Real-Time Events)'}
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
          {isId ? 'Kirimkan notifikasi HTTP POST bertanda tangan HMAC-SHA256 ke server eksternal saat terjadi event sistem.' : 'Receive authenticated HTTP POST dispatches with cryptographic HMAC signatures when lifecycle events fire.'}
        </p>

        {/* Subscribed Event Chips */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
            {isId ? 'Pilih Event yang Dilanggan:' : 'Subscribed Event Topics:'}
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              'order.created',
              'payment.settled',
              'member.invited',
              'security.2fa_alert',
              'invoice.failed',
            ].map((ev) => (
              <button
                key={ev}
                type="button"
                onClick={() => toggleEventChip(ev)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: subscribedEvents.includes(ev) ? '1px solid #10b981' : '1px solid var(--color-border)',
                  background: subscribedEvents.includes(ev) ? 'rgba(16, 185, 129, 0.12)' : 'var(--color-bg-canvas)',
                  color: subscribedEvents.includes(ev) ? '#10b981' : 'var(--color-text-secondary)',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {subscribedEvents.includes(ev) && <Check size={12} />}
                <span>{ev}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Webhook Endpoint Input & Test Ping */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <NeuronInput
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://api.domain.com/webhooks"
            />
          </div>
          <NeuronButton
            size="md"
            variant="secondary"
            leadingIcon={<Activity size={14} color="#10b981" />}
            loading={isPinging}
            onClick={handleTestWebhook}
          >
            {isId ? 'Uji Kirim (Test Ping)' : 'Trigger Test Ping'}
          </NeuronButton>
        </div>

        {/* Ping Simulator Terminal Trace */}
        {pingSteps.length > 0 && (
          <div style={{ background: isDarkMode ? '#0d1322' : '#1e293b', borderRadius: 10, padding: '12px 16px', color: '#f8fafc', fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, animation: 'fadeIn 0.2s ease-out' }}>
            {pingSteps.map((step, idx) => (
              <div key={idx} style={{ color: step.startsWith('✅') ? '#34d399' : '#e2e8f0' }}>
                {step}
              </div>
            ))}
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setShowPayload(!showPayload)}
                style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: 0, fontSize: 11, textDecoration: 'underline' }}
              >
                {showPayload ? (isId ? 'Sembunyikan Payload JSON' : 'Hide JSON Payload') : (isId ? 'Lihat Contoh Payload JSON' : 'Inspect Sample JSON Payload')}
              </button>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>HMAC: sha256=4f901a...</span>
            </div>
            {showPayload && (
              <pre style={{ margin: '8px 0 0', padding: 10, borderRadius: 6, background: 'rgba(0,0,0,0.4)', fontSize: 11, color: '#a7f3d0', overflowX: 'auto' }}>
{`{
  "event": "payment.settled",
  "webhook_id": "whk_test_9921",
  "data": {
    "invoice_id": "inv_8829104",
    "amount": 2500000,
    "currency": "IDR",
    "customer": "PT Acme Global",
    "status": "SETTLED"
  },
  "timestamp": "2026-11-06T15:45:00Z"
}`}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Modal Buat Kunci API Baru */}
      {isCreateKeyModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, width: '100%', maxWidth: 460, padding: 24, boxShadow: 'var(--shadow-xl)', animation: 'scaleUp 0.2s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Key size={18} color="#10b981" />
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Buat Kunci API Baru' : 'Generate Secret API Key'}
                </h4>
              </div>
              <button type="button" onClick={() => setIsCreateKeyModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateKeySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                  {isId ? 'Nama Label Kunci API' : 'Key Description Label'}
                </label>
                <NeuronInput
                  required
                  placeholder="e.g. Mobile iOS Client SDK"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                  {isId ? 'Target Lingkungan (Environment)' : 'Target Environment'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setNewKeyEnv('PRODUCTION')}
                    style={{
                      padding: '10px',
                      borderRadius: 8,
                      border: newKeyEnv === 'PRODUCTION' ? '2px solid #10b981' : '1px solid var(--color-border)',
                      background: newKeyEnv === 'PRODUCTION' ? 'rgba(16, 185, 129, 0.08)' : 'var(--color-bg-canvas)',
                      color: newKeyEnv === 'PRODUCTION' ? '#10b981' : 'var(--color-text-primary)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    PRODUCTION (neu_live_)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewKeyEnv('STAGING')}
                    style={{
                      padding: '10px',
                      borderRadius: 8,
                      border: newKeyEnv === 'STAGING' ? '2px solid #f59e0b' : '1px solid var(--color-border)',
                      background: newKeyEnv === 'STAGING' ? 'rgba(245, 158, 11, 0.08)' : 'var(--color-bg-canvas)',
                      color: newKeyEnv === 'STAGING' ? '#d97706' : 'var(--color-text-primary)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    SANDBOX (neu_test_)
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <NeuronButton size="sm" variant="secondary" onClick={() => setIsCreateKeyModalOpen(false)}>
                  {isId ? 'Batal' : 'Cancel'}
                </NeuronButton>
                <NeuronButton size="sm" variant="primary" type="submit">
                  {isId ? 'Generate Kunci' : 'Generate Key'}
                </NeuronButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 4: Enterprise Security, Active Sessions & Audit Trail
// ─────────────────────────────────────────────────────────────────────────────

interface AuditLog {
  id: string;
  time: string;
  actor: string;
  action: string;
  ip: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
}

const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: 'l1', time: '10:42 WIB', actor: 'sarah.j@acme.com', action: 'api_key.create: Production Invoicing Key', ip: '103.144.12.8', status: 'SUCCESS' },
  { id: 'l2', time: '09:15 WIB', actor: 'rian.p@acme.com', action: 'rbac.role_change: budi.s to Product Designer', ip: '180.252.164.2', status: 'SUCCESS' },
  { id: 'l3', time: 'Kemarin 21:04', actor: 'system.daemon', action: 'tls.cert_auto_renew: *.acme-corp.com', ip: 'internal-aws-ap-se1', status: 'SUCCESS' },
  { id: 'l4', time: 'Kemarin 18:22', actor: 'devon.m@acme.com', action: 'session.failed_login_attempt (MFA retry)', ip: '114.122.42.19', status: 'WARNING' },
  { id: 'l5', time: '04 Nov 14:10', actor: 'elena.r@acme.com', action: 'security.enforce_org_2fa: Enabled', ip: '103.144.12.8', status: 'SUCCESS' },
];

function SecurityAuditSessionsPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [enforce2FA, setEnforce2FA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('8h');
  const [logs, setLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [logFilter, setLogFilter] = useState<'ALL' | 'SUCCESS' | 'WARNING'>('ALL');
  const [selectedLogJson, setSelectedLogJson] = useState<AuditLog | null>(null);

  const filteredLogs = logs.filter((l) => (logFilter === 'ALL' ? true : l.status === logFilter));

  const handleRevokeSessions = () => {
    if (confirm(isId ? 'Putuskan seluruh sesi aktif di perangkat lain kecuali browser ini?' : 'Terminate all other active browser sessions?')) {
      alert(isId ? '2 sesi perangkat lain berhasil diputuskan!' : '2 remote device sessions revoked successfully!');
    }
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* SOC2 & ISO 27001 Compliance Badge Ribbon */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: 16,
          padding: '18px 22px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={20} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              SOC2 Type II & ISO 27001 Certified
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                Verified Active
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
              {isId ? 'Tata kelola keamanan ruang kerja telah diaudit oleh auditor independen Big 4.' : 'Enterprise tenant governance independently verified under SOC2 standards.'}
            </div>
          </div>
        </div>

        <NeuronButton
          size="sm"
          variant="outline"
          leadingIcon={<Download size={13} />}
          onClick={() => alert(isId ? 'Mengunduh laporan audit SOC2 Type II (PDF)...' : 'Downloading SOC2 Type II Audit Report...')}
        >
          {isId ? 'Unduh Laporan Audit' : 'Download Audit Report'}
        </NeuronButton>
      </div>

      {/* Security Policies */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Shield size={18} color="#8b5cf6" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isId ? 'Kebijakan Keamanan Organisasi (SOC2 Enforced)' : 'Organization Security Policies'}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                {isId ? 'Wajibkan 2FA untuk Seluruh Anggota Workspace' : 'Enforce Mandatory 2FA for All Members'}
                <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontWeight: 700 }}>
                  Mandatory
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Anggota tanpa authenticator MFA akan diberikan masa tenggang 48 jam sebelum akun dibatasi otomatis.' : 'Users without authenticator MFA receive 48h grace period before access is suspended.'}
              </div>
            </div>
            <NeuronToggle checked={enforce2FA} onChange={(val) => setEnforce2FA(val)} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Batas Waktu Ketidakaktifan Sesi (Session Idle Timeout)' : 'Idle Session Expiration Timeout'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Kunci sesi secara otomatis jika tidak ada interaksi keyboard/mouse untuk mencegah akses liar.' : 'Automatically log out users after period of inactivity.'}
              </div>
            </div>
            <div style={{ width: 190 }}>
              <NeuronSelect
                size="sm"
                value={sessionTimeout}
                onChange={(val) => setSessionTimeout(val as string)}
                options={[
                  { value: '15m', label: '15 Menit' },
                  { value: '1h', label: '1 Jam' },
                  { value: '8h', label: '8 Jam (Standar Kerja)' },
                  { value: '24h', label: '24 Jam' },
                ]}
                leadingType="icon"
                leadingIcon={<Clock size={13} />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Device Sessions */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Sesi Perangkat Aktif' : 'Active Device Sessions'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Daftar perangkat keras yang saat ini sedang login dengan kredensial Anda.' : 'Hardware devices with active authentication tokens.'}
            </p>
          </div>
          <NeuronButton size="sm" variant="secondary" onClick={handleRevokeSessions}>
            {isId ? 'Putuskan Sesi Lain' : 'Revoke Other Sessions'}
          </NeuronButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139, 92, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Laptop size={20} color="#8b5cf6" />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  MacBook Pro 16" · macOS Sonoma
                  <span style={{ fontSize: 10.5, fontWeight: 800, padding: '1px 6px', borderRadius: 10, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    {isId ? 'Perangkat Ini' : 'Current Device'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Safari 17.4 · Jakarta, ID (IP: 103.144.12.8) · Aktif Sekarang
                </div>
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              Active
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={20} color="var(--color-text-secondary)" />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  iPhone 15 Pro · iOS 17.3
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Neudela Mobile Client · Jakarta, ID · Aktif 12m lalu
                </div>
              </div>
            </div>
            <NeuronButton size="xs" variant="text" onClick={() => alert(isId ? 'Sesi iPhone diputuskan.' : 'iPhone session revoked.')}>
              {isId ? 'Cabut Akses' : 'Revoke'}
            </NeuronButton>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Laptop size={20} color="var(--color-text-secondary)" />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  ThinkPad X1 Carbon · Windows 11 Enterprise
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Chrome 122 · Surabaya, ID (IP: 180.252.164.2) · Aktif 2 hari lalu
                </div>
              </div>
            </div>
            <NeuronButton size="xs" variant="text" onClick={() => alert(isId ? 'Sesi ThinkPad diputuskan.' : 'ThinkPad session revoked.')}>
              {isId ? 'Cabut Akses' : 'Revoke'}
            </NeuronButton>
          </div>
        </div>
      </div>

      {/* Audit Trail Log */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Linimasa Log Audit Keamanan (Immutable Trail)' : 'Security Audit Trail Log'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Rekam jejak seluruh aksi administratif yang tidak dapat diubah (immutable).' : 'Tamper-proof record of all sensitive organizational actions.'}
            </p>
          </div>

          {/* Severity Filter */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['ALL', 'SUCCESS', 'WARNING'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLogFilter(lvl)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: logFilter === lvl ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: logFilter === lvl ? 'rgba(223, 126, 48, 0.12)' : 'var(--color-bg-canvas)',
                  color: logFilter === lvl ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontSize: 11.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                <th style={{ padding: '8px 10px' }}>{isId ? 'Waktu' : 'Timestamp'}</th>
                <th style={{ padding: '8px 10px' }}>{isId ? 'Pelaksana' : 'Actor'}</th>
                <th style={{ padding: '8px 10px' }}>{isId ? 'Peristiwa / Aksi' : 'Action Event'}</th>
                <th style={{ padding: '8px 10px' }}>{isId ? 'IP Asal' : 'Origin IP'}</th>
                <th style={{ padding: '8px 10px', textAlign: 'right' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((l) => (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '10px 10px', color: 'var(--color-text-tertiary)', fontSize: 12 }}>{l.time}</td>
                  <td style={{ padding: '10px 10px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{l.actor}</td>
                  <td style={{ padding: '10px 10px' }}>
                    <code style={{ background: 'var(--color-bg-canvas)', padding: '2px 6px', borderRadius: 4, fontSize: 11.5, color: l.status === 'WARNING' ? '#f59e0b' : '#8b5cf6' }}>
                      {l.action}
                    </code>
                  </td>
                  <td style={{ padding: '10px 10px', color: 'var(--color-text-secondary)', fontSize: 12 }}>{l.ip}</td>
                  <td style={{ padding: '10px 10px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedLogJson(selectedLogJson?.id === l.id ? null : l)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', fontSize: 11.5, fontWeight: 700 }}
                    >
                      {selectedLogJson?.id === l.id ? (isId ? 'Tutup' : 'Close') : 'JSON'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedLogJson && (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: isDarkMode ? '#0d1322' : '#1e293b', color: '#a7f3d0', fontSize: 11.5, fontFamily: 'monospace', animation: 'fadeIn 0.2s ease-out' }}>
            <pre style={{ margin: 0 }}>{JSON.stringify(selectedLogJson, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 5: Workspace Transfer & Critical Danger Zone
// ─────────────────────────────────────────────────────────────────────────────

function DangerZoneTransferPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [selectedRecipient, setSelectedRecipient] = useState('rian.p@acme.com');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [confirmCheckbox1, setConfirmCheckbox1] = useState(false);
  const [confirmCheckbox2, setConfirmCheckbox2] = useState(false);

  const CONFIRM_TARGET = 'DELETE ACME-GLOBAL';

  const handleTransfer = () => {
    if (confirm(isId ? `Apakah Anda yakin ingin mentransfer kepemilikan workspace ke ${selectedRecipient}? Status akun Anda akan diturunkan menjadi Admin.` : `Transfer ownership to ${selectedRecipient}? Your account role will become Admin.`)) {
      alert(isId ? `Permintaan transfer telah dikirimkan ke email ${selectedRecipient} dengan batas waktu 72 jam.` : `Ownership transfer confirmation sent to ${selectedRecipient} (72h grace period).`);
    }
  };

  const handleExecuteDelete = () => {
    if (deleteConfirmation.trim() === CONFIRM_TARGET && confirmCheckbox1 && confirmCheckbox2) {
      alert(isId ? 'Workspace ACME-GLOBAL berhasil dihapus permanen.' : 'Workspace ACME-GLOBAL has been permanently destroyed.');
      setIsDeleteModalOpen(false);
      setDeleteConfirmation('');
      setConfirmCheckbox1(false);
      setConfirmCheckbox2(false);
    }
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Transfer Ownership Card */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Transfer Kepemilikan Utama (Primary Owner)' : 'Transfer Primary Workspace Ownership'}
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {isId
            ? 'Pindahkan hak kontrol tertinggi (Primary Owner) ke administrator lain yang telah terverifikasi. Setelah ditransfer, Anda tidak dapat membatalkan tindakan ini secara sepihak dan status Anda menjadi Administrator.'
            : 'Transfer primary organization ownership to another verified administrator. You will retain Administrator privileges after handoff.'}
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <NeuronSelect
              value={selectedRecipient}
              onChange={(val) => setSelectedRecipient(val as string)}
              options={[
                { value: 'rian.p@acme.com', label: 'Rian Pratama (rian.p@acme.com) — Admin' },
                { value: 'elena.r@acme.com', label: 'Elena Rostova (elena.r@acme.com) — Security Engineer' },
                { value: 'devon.m@acme.com', label: 'Devon Miles (devon.m@acme.com) — Finance Lead' },
              ]}
              leadingType="icon"
              leadingIcon={<Users size={16} />}
            />
          </div>
          <NeuronButton size="md" variant="secondary" onClick={handleTransfer}>
            {isId ? 'Transfer Kepemilikan' : 'Transfer Ownership'}
          </NeuronButton>
        </div>
      </div>

      {/* Danger Zone Bordered in Red */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1.5px solid rgba(239, 68, 68, 0.4)', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(239, 68, 68, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <AlertTriangle size={20} color="#ef4444" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#ef4444' }}>
            {isId ? 'Zona Berbahaya (Critical Actions)' : 'Critical Danger Zone'}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
          {/* Action 1: Archive Workspace */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                {isId ? 'Bekukan & Arsipkan Workspace' : 'Freeze & Archive Workspace'}
                {isArchived && (
                  <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', fontWeight: 800 }}>
                    READ-ONLY MODE
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Kunci ruang kerja ke mode hanya-baca (read-only) tanpa menghapus basis data.' : 'Set all projects into immutable read-only mode without deleting data.'}
              </div>
            </div>
            <NeuronButton
              size="sm"
              variant={isArchived ? 'primary' : 'outline'}
              onClick={() => {
                setIsArchived(!isArchived);
                alert(isArchived ? (isId ? 'Workspace kembali aktif normal!' : 'Workspace unarchived!') : (isId ? 'Workspace berhasil dibekukan ke mode Read-Only!' : 'Workspace archived to read-only!'));
              }}
            >
              {isArchived ? (isId ? 'Buka Pembekuan' : 'Unarchive') : (isId ? 'Arsipkan' : 'Archive')}
            </NeuronButton>
          </div>

          {/* Action 2: Delete Workspace */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 12, background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#ef4444' }}>
                {isId ? 'Hapus Workspace Secara Permanen' : 'Permanently Delete Workspace'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                {isId ? 'Tindakan ini menghancurkan seluruh basis data, kunci API, dan lisensi anggota selamanya.' : 'Destroys all associated databases, keys, and subscription seats irreversibly.'}
              </div>
            </div>
            <NeuronButton size="sm" variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              {isId ? 'Hapus Workspace' : 'Delete Workspace'}
            </NeuronButton>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, width: '100%', maxWidth: 520, padding: 26, boxShadow: 'var(--shadow-2xl)', animation: 'scaleUp 0.2s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <AlertTriangle size={20} />
              </div>
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: 'var(--color-text-primary)' }}>
                {isId ? 'Konfirmasi Penghapusan Permanen' : 'Confirm Permanent Destruction'}
              </h4>
            </div>

            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 16px' }}>
              {isId
                ? 'Tindakan ini tidak dapat dibatalkan. Seluruh data transaksi, repositori, dan kunci API akan dihapus seketika dari seluruh replika multi-region.'
                : 'This action cannot be undone. All database records, member access, and active keys will be permanently purged across all clusters.'}
            </p>

            {/* Checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, padding: 12, borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={confirmCheckbox1}
                  onChange={(e) => setConfirmCheckbox1(e.target.checked)}
                />
                <span>{isId ? 'Saya paham bahwa semua database & cadangan akan dihapus permanen.' : 'I understand all database backups will be permanently purged.'}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={confirmCheckbox2}
                  onChange={(e) => setConfirmCheckbox2(e.target.checked)}
                />
                <span>{isId ? 'Saya paham bahwa pelanggan tidak dapat lagi mengakses faktur.' : 'I understand billing portals will be immediately inaccessible.'}</span>
              </label>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                {isId ? 'Ketik kalimat berikut untuk mengonfirmasi:' : 'Type the following phrase to confirm:'}
              </label>
              <div style={{ padding: '8px 12px', background: 'var(--color-bg-canvas)', borderRadius: 6, border: '1px solid var(--color-border)', fontFamily: 'monospace', fontWeight: 800, color: '#ef4444', marginBottom: 8, userSelect: 'all' }}>
                {CONFIRM_TARGET}
              </div>
              <NeuronInput
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={CONFIRM_TARGET}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <NeuronButton size="sm" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                {isId ? 'Batal' : 'Cancel'}
              </NeuronButton>
              <NeuronButton
                size="sm"
                variant="danger"
                disabled={deleteConfirmation.trim() !== CONFIRM_TARGET || !confirmCheckbox1 || !confirmCheckbox2}
                onClick={handleExecuteDelete}
              >
                {isId ? 'Hapus Workspace Selamanya' : 'Permanently Delete'}
              </NeuronButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Preview Dispatcher for Settings Variants
// ─────────────────────────────────────────────────────────────────────────────

export function renderLiveSettingsPreview(
  variantId: SettingsVariantId,
  isDark: boolean,
  setActiveTab?: (tabId: string) => void
) {
  switch (variantId) {
    case 'general-workspace':
      return <GeneralWorkspacePreview isDarkProp={isDark} />;
    case 'rbac-members':
      return <TeamRbacMembersPreview isDarkProp={isDark} />;
    case 'api-security':
      return <DeveloperApiKeysPreview isDarkProp={isDark} />;
    case 'audit-security':
      return <SecurityAuditSessionsPreview isDarkProp={isDark} />;
    case 'danger-zone':
      return <DangerZoneTransferPreview isDarkProp={isDark} />;
    default:
      return <GeneralWorkspacePreview isDarkProp={isDark} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TSX Code Snippets
// ─────────────────────────────────────────────────────────────────────────────

const SETTINGS_SNIPPETS: Record<SettingsVariantId, string> = {
  'general-workspace': `import React, { useState } from 'react';
import { NeuronInput, NeuronButton, NeuronToggle, NeuronBadge } from '@neudela/core';

export function GeneralWorkspaceSettings() {
  const [workspaceName, setWorkspaceName] = useState('Acme Global Technologies');
  const [tlsStrict, setTlsStrict] = useState(true);

  return (
    <div className="workspace-settings-card">
      <h3>Workspace Identity</h3>
      <NeuronInput
        label="Workspace Legal Name"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
      />
      <div className="toggle-row">
        <span>Enforce TLS 1.3 Strict Mode</span>
        <NeuronToggle checked={tlsStrict} onChange={setTlsStrict} />
      </div>
      <NeuronButton variant="primary">Save Changes</NeuronButton>
    </div>
  );
}`,
  'rbac-members': `import React, { useState } from 'react';
import { NeuronButton, NeuronBadge, NeuronInput } from '@neudela/core';

export function TeamRbacDirectory() {
  const [members, setMembers] = useState([
    { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@acme.com', role: 'Owner' },
    { id: '2', name: 'Rian Pratama', email: 'rian.p@acme.com', role: 'Admin' },
  ]);

  return (
    <div className="rbac-table-container">
      <NeuronButton variant="primary">Invite Member</NeuronButton>
      <table>
        {members.map((m) => (
          <tr key={m.id}>
            <td>{m.name}</td>
            <td><NeuronBadge variant="default">{m.role}</NeuronBadge></td>
          </tr>
        ))}
      </table>
    </div>
  );
}`,
  'api-security': `import React, { useState } from 'react';
import { NeuronButton, NeuronInput, NeuronAlert } from '@neudela/core';

export function ApiKeyManagement() {
  const [token] = useState('neu_live_9f8e4b2c1a0e7d6a5c3b1e9f0d8a7c2b');
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="api-keys-hub">
      <NeuronAlert variant="warning" title="Keep API Keys Confidential" />
      <code>{revealed ? token : 'neu_live_••••••••••••••••'}</code>
      <NeuronButton variant="secondary" onClick={() => setRevealed(!revealed)}>
        {revealed ? 'Hide' : 'Reveal'}
      </NeuronButton>
    </div>
  );
}`,
  'audit-security': `import React, { useState } from 'react';
import { NeuronToggle, NeuronButton } from '@neudela/core';

export function SecurityAuditCenter() {
  const [enforce2FA, setEnforce2FA] = useState(true);

  return (
    <div className="security-audit-panel">
      <div className="policy-toggle">
        <span>Mandatory Organization 2FA</span>
        <NeuronToggle checked={enforce2FA} onChange={setEnforce2FA} />
      </div>
      <NeuronButton variant="secondary">Revoke Other Sessions</NeuronButton>
    </div>
  );
}`,
  'danger-zone': `import React, { useState } from 'react';
import { NeuronButton, NeuronInput } from '@neudela/core';

export function DangerZone() {
  const [confirmText, setConfirmText] = useState('');
  const TARGET = 'DELETE ACME-GLOBAL';

  return (
    <div className="danger-zone-card">
      <h3 style={{ color: '#ef4444' }}>Critical Danger Zone</h3>
      <p>Type "{TARGET}" to confirm workspace deletion.</p>
      <NeuronInput value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
      <NeuronButton variant="danger" disabled={confirmText !== TARGET}>
        Permanently Delete Workspace
      </NeuronButton>
    </div>
  );
}`,
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component: SettingsPatternView
// ─────────────────────────────────────────────────────────────────────────────

interface SettingsPatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export default function SettingsPatternView({ setActiveTab, isDarkMode: isDarkProp }: SettingsPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [selectedVariant, setSelectedVariant] = useState<SettingsVariantId>('general-workspace');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentMeta = SETTINGS_VARIANTS.find((v) => v.id === selectedVariant) || SETTINGS_VARIANTS[0];

  const handleOpenModal = (vId: SettingsVariantId) => {
    setSelectedVariant(vId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  const handleOpenNewTab = (vId: SettingsVariantId) => {
    window.location.hash = `#preview-settings-${vId}`;
    setActiveTab(`preview-settings-${vId}`);
  };

  const handleCopyTSX = () => {
    const code = SETTINGS_SNIPPETS[selectedVariant] || '';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="pattern-settings-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header (100% Neudela Blueprint Parity) ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Pengaturan Ruang Kerja & Akses RBAC' : 'Workspace Settings & RBAC'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur tata kelola organisasi enterprise tingkat lanjut: Profil workspace & domain kustom, direktori anggota dengan matriks izin peran (RBAC), portal kredensial API & webhook developer, penegakan keamanan 2FA & log audit SOC2, serta zona berbahaya transfer kepemilikan terproteksi.'
            : 'Enterprise-grade organizational governance architectures: Workspace identity & custom domain mapping, team member directories with granular RBAC permission matrix, developer API credentials & webhook tester, SOC2 security audits with active session revocation, and safeguarded ownership transfer danger zones.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Settings size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>5 {isId ? 'Varian Tata Kelola' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Users size={14} color="#3b82f6" />
            <span>{isId ? 'Cakupan Tata Kelola:' : 'Governance Scope:'}</span>
            <strong style={{ color: '#3b82f6' }}>Identity · RBAC · API Keys · SOC2 Audit · Danger Zone</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Shield size={14} color="#10b981" />
            <span>{isId ? 'Standar Kepatuhan:' : 'Compliance Standard:'}</span>
            <strong style={{ color: '#10b981' }}>SOC2 Type II · RBAC Ready</strong>
          </div>
        </div>
      </div>

      {/* ── Pattern Cards Gallery Grid (Exact Parity) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginTop: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {SETTINGS_VARIANTS.map((variant) => (
          <div
            key={variant.id}
            onClick={() => handleOpenModal(variant.id)}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: 'var(--space-5)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="header-pattern-card sidebar-pattern-card"
          >
            {/* Accent Top Border with Gradient */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3.5px',
                background: `linear-gradient(90deg, ${variant.accentColor} 0%, ${variant.accentColor}30 100%)`,
              }}
            />

            {/* Card Header & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: `${variant.accentColor}18`,
                  border: `1px solid ${variant.accentColor}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: variant.accentColor,
                  flexShrink: 0,
                }}
              >
                {variant.id === 'general-workspace' && <Building2 size={20} />}
                {variant.id === 'rbac-members' && <Users size={20} />}
                {variant.id === 'api-security' && <Key size={20} />}
                {variant.id === 'audit-security' && <Shield size={20} />}
                {variant.id === 'danger-zone' && <AlertTriangle size={20} />}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  background: 'var(--color-bg-canvas)',
                  color: variant.accentColor,
                  border: `1px solid ${variant.accentColor}40`,
                }}
              >
                {variant.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  margin: '0 0 6px 0',
                  color: 'var(--color-text-primary)',
                }}
              >
                {isId ? variant.nameId : variant.nameEn}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {isId ? variant.taglineId : variant.taglineEn}
              </p>
            </div>

            {/* Visual Architecture Silhouette */}
            <div style={{ margin: '4px 0' }}>
              <div
                style={{
                  height: '145px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <SettingsMiniSilhouette id={variant.id} isDarkMode={isDarkMode} />
              </div>
            </div>

            {/* Feature Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {variant.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '10.5px',
                    background: 'var(--color-bg-canvas)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Card Dual Action Buttons */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 'var(--space-3)',
                display: 'flex',
                gap: '8px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(variant.id);
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(223, 126, 48, 0.1)',
                  color: 'var(--color-primary)',
                  border: '1px solid rgba(223, 126, 48, 0.25)',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(223, 126, 48, 0.1)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.borderColor = 'rgba(223, 126, 48, 0.25)';
                }}
              >
                <Eye size={13} />
                <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenNewTab(variant.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'var(--color-bg-canvas)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.borderColor = 'var(--color-text-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
                title={isId ? 'Buka di Tab Baru (Aplikasi Mandiri)' : 'Open in New Tab (Standalone App)'}
              >
                <ExternalLink size={13} />
                <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Standard Blueprint Modal ── */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '95vw',
              maxWidth: '1360px',
              height: '90vh',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Modal Header (100% Invariant Blueprint Parity) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 22px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-bg-canvas)',
                gap: '16px',
                flexShrink: 0,
              }}
            >
              {/* Sisi Kiri: Dot, Judul, Badge, Tagline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: currentMeta.accentColor,
                    boxShadow: `0 0 10px ${currentMeta.accentColor}`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {isId ? currentMeta.nameId : currentMeta.nameEn}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: `${currentMeta.accentColor}20`,
                        color: currentMeta.accentColor,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {currentMeta.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  >
                    {isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Sisi Kanan: Subtabs Tab, Tombol Buka di Tab Baru, Tombol Tutup (X) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Subtabs Tab */}
                <div
                  style={{
                    display: 'flex',
                    background: 'var(--color-bg-surface)',
                    padding: 3,
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    style={{
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#ffffff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '5px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('tsx')}
                    style={{
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#ffffff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '5px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    React (TSX)
                  </button>
                </div>

                {/* Tombol Tab Baru: solid terracotta */}
                <button
                  type="button"
                  onClick={() => handleOpenNewTab(selectedVariant)}
                  title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(223, 126, 48, 0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <ExternalLink size={14} />
                  <span>{isId ? 'Buka di Tab Baru (Real App)' : 'Open in New Tab (Real App)'}</span>
                </button>

                {/* Tombol Tutup (X): bordered berlatar surface */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {modalTab === 'preview' && (
                <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '24px' }}>
                  {renderLiveSettingsPreview(selectedVariant, isDarkMode, setActiveTab)}
                </div>
              )}

              {modalTab === 'tsx' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--color-bg-canvas)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                      {currentMeta.nameEn} Component TSX
                    </span>
                    <NeuronButton
                      size="sm"
                      variant="primary"
                      leadingIcon={copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      onClick={handleCopyTSX}
                    >
                      {copiedCode ? (isId ? 'Tersalin ke Clipboard' : 'Copied to Clipboard') : (isId ? 'Salin Kode TSX' : 'Copy TSX Code')}
                    </NeuronButton>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: 16,
                      borderRadius: 12,
                      background: isDarkMode ? '#0d1322' : '#1e293b',
                      color: '#f8fafc',
                      fontSize: 12.5,
                      fontFamily: 'monospace',
                      lineHeight: 1.6,
                      overflowX: 'auto',
                    }}
                  >
                    {SETTINGS_SNIPPETS[selectedVariant] || ''}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer Navigation ── */}
      <NextPrevious
        previous={{
          label: isId ? 'Alur Checkout & Pembayaran' : 'Checkout & Payment Flows',
          onClick: () => setActiveTab('pat-checkout'),
        }}
        next={{
          label: isId ? 'Kembali ke Ringkasan Pola' : 'Patterns Overview',
          onClick: () => setActiveTab('pat-overview'),
        }}
      />
    </div>
  );
}

