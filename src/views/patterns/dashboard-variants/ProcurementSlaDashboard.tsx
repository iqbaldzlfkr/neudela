import React, { useState } from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import NeuronInput from '../../../components/NeuronInput';
import NeuronProgress from '../../../components/NeuronProgress';
import NeuronSelect from '../../../components/NeuronSelect';
import {
  Clock,
  PauseCircle,
  PlayCircle,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Users,
  User,
  Building2,
  Layers,
  Sparkles,
  Info,
  AlertCircle,
  FileSpreadsheet,
  RotateCcw,
  Search,
  Code2,
  GitBranch,
  Terminal,
  Server,
  FileCode,
  ExternalLink,
  ShieldAlert,
  Calendar,
} from 'lucide-react';

interface ProcurementSlaDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export type HierarchyScope = 'squad' | 'client' | 'module';
export type SlaStatusFilter = 'all' | 'running' | 'frozen' | 'warning' | 'breached';

export interface ProjectDeliverable {
  id: string;
  code: string;
  title: string;
  leadEngineer: string;
  squad: string;
  clientAccount: string;
  module: string;
  currentPhase: string;
  phaseProgress: number;
  totalDays: number;
  activeDays: number;
  freezeDays: number;
  targetSlaDays: number;
  status: 'running' | 'frozen' | 'warning' | 'breached';
  blockerCode?: 'BLK-01' | 'BLK-02' | 'BLK-03' | 'BLK-04' | 'BLK-05' | 'BLK-06';
  blockerTitle?: string;
  blockerMaxThreshold?: number;
  clientPic?: string;
  auditEvidence?: string;
  startDate: string;
  originalTargetDate: string;
  targetLiveDate: string;
}

export default function ProcurementSlaDashboard({
  isId,
  previewTheme,
  onTriggerModal,
}: ProcurementSlaDashboardProps) {
  const isDark = previewTheme === 'dark';

  // State Management
  const [activeScope, setActiveScope] = useState<HierarchyScope>('squad');
  const [slaFilter, setSlaFilter] = useState<SlaStatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientFilter, setSelectedClientFilter] = useState('All');

  // Standard Blocker Taxonomy Dictionary
  const blockerTaxonomy = {
    'BLK-01': {
      name: isId ? 'Kredensial & Akses Klien' : 'Client Credential & Access',
      desc: isId ? 'Menunggu IP whitelist, VPN, akun staging, atau token API klien' : 'Waiting for IP whitelist, VPN, staging credentials, or client API tokens',
      maxDays: 3,
    },
    'BLK-02': {
      name: isId ? 'Ambiguitas Spek / PRD' : 'Requirement / Scope Ambiguity',
      desc: isId ? 'Logika bisnis belum final, perubahan alur tanpa CR resmi, komentar Figma belum dijawab' : 'Unfinalized business logic, wireframe comments pending, scope ambiguity',
      maxDays: 5,
    },
    'BLK-03': {
      name: isId ? 'Dependensi Pihak Ketiga' : 'Third-Party Dependency',
      desc: isId ? 'Sandbox payment gateway down, limit kuota OTP habis, issue vendor pihak ketiga' : 'Third-party sandbox outage, SMS/OTP quota depleted, vendor API downtime',
      maxDays: 4,
    },
    'BLK-04': {
      name: isId ? 'Feedback & Sign-Off UAT' : 'UAT Feedback & Sign-Off',
      desc: isId ? 'Build staging telah diserahkan tetapi pengujian / BAST klien tertahan idle' : 'Staging build delivered but client business verification & sign-off idle',
      maxDays: 7,
    },
    'BLK-05': {
      name: isId ? 'Evaluasi Change Request' : 'Change Request Evaluation',
      desc: isId ? 'Diskusi revisi fitur di luar SoW awal yang menahan baseline branch' : 'Out-of-scope feature request negotiation blocking release branch baseline',
      maxDays: 5,
    },
    'BLK-06': {
      name: isId ? 'Audit Kepatuhan & Keamanan' : 'Security / Compliance Audit',
      desc: isId ? 'Audit eksternal InfoSec / PenTest / ISO yang menahan jadwal go-live' : 'External Infosec audit, penetration testing, or regulatory certification hold',
      maxDays: 10,
    },
  };

  // Enterprise IT Project Deliverables Data
  const deliverablesData: ProjectDeliverable[] = [
    {
      id: 'DEL-2026-089',
      code: 'MOD-PAY-0491',
      title: isId ? 'Payment Gateway Multi-Tenancy & QRIS QR Settlement' : 'Payment Gateway Multi-Tenancy & QRIS QR Settlement',
      leadEngineer: 'Iqbal Dzulfikar',
      squad: 'Backend Core Squad',
      clientAccount: 'FinTech Enterprise Core',
      module: 'Payment Gateway',
      currentPhase: isId ? 'Core Engineering & Sprint Coding' : 'Core Engineering & Sprint Coding',
      phaseProgress: 75,
      totalDays: 14,
      activeDays: 9,
      freezeDays: 5,
      targetSlaDays: 18,
      status: 'running',
      blockerCode: 'BLK-03',
      blockerTitle: isId ? 'BLK-03: Sandbox payment gateway API webhook timeout (Terselesaikan)' : 'BLK-03: Sandbox payment gateway API webhook timeout (Resolved)',
      blockerMaxThreshold: 4,
      clientPic: 'Budi Santoso (VP Product FinTech)',
      auditEvidence: 'Jira TICKET-4029 / Slack #client-integration thread',
      startDate: '2026-10-15',
      originalTargetDate: '2026-11-05',
      targetLiveDate: '2026-11-12',
    },
    {
      id: 'DEL-2026-092',
      code: 'MOD-AUTH-0822',
      title: isId ? 'SSO OAuth2 & Role-Based Access Control (RBAC)' : 'SSO OAuth2 & Role-Based Access Control (RBAC)',
      leadEngineer: 'Sarah Jenkins',
      squad: 'Frontend & Mobile Squad',
      clientAccount: 'Omnichannel Retail Group',
      module: 'Authentication & SSO',
      currentPhase: isId ? 'UAT & Client Business Verification' : 'UAT & Client Business Verification',
      phaseProgress: 50,
      totalDays: 22,
      activeDays: 11,
      freezeDays: 11,
      targetSlaDays: 25,
      status: 'frozen',
      blockerCode: 'BLK-04',
      blockerTitle: isId ? 'BLK-04: Build v2.4 terkirim di staging; UAT klien idle melewati ambang batas 7 hari' : 'BLK-04: Build v2.4 delivered to staging; client UAT idle past 7-day threshold',
      blockerMaxThreshold: 7,
      clientPic: 'Hendra Wijaya (Lead QA Client)',
      auditEvidence: 'Staging Release Tag v2.4-rc1 / Formal Email BAST Handover #2026-90',
      startDate: '2026-10-01',
      originalTargetDate: '2026-11-05',
      targetLiveDate: '2026-11-20',
    },
    {
      id: 'DEL-2026-104',
      code: 'MOD-CORE-0112',
      title: isId ? 'Event-Driven Core Ledger & Double-Entry Accounting' : 'Event-Driven Core Ledger & Double-Entry Accounting',
      leadEngineer: 'Iqbal Dzulfikar',
      squad: 'Backend Core Squad',
      clientAccount: 'Digital Banking Ecosystem',
      module: 'Core Ledger Engine',
      currentPhase: isId ? 'Deployment, Data Migration & Go-Live' : 'Deployment, Data Migration & Go-Live',
      phaseProgress: 90,
      totalDays: 11,
      activeDays: 10,
      freezeDays: 1,
      targetSlaDays: 15,
      status: 'running',
      clientPic: 'Rina Agustin (Engineering Manager)',
      auditEvidence: 'GitLab Merge Request !1402 / Prod Canary Verification Sign-off',
      startDate: '2026-10-18',
      originalTargetDate: '2026-11-03',
      targetLiveDate: '2026-11-04',
    },
    {
      id: 'DEL-2026-108',
      code: 'MOD-RPT-0391',
      title: isId ? 'Real-time Fiscal Tax Reporting & Data Lake Pipeline' : 'Real-time Fiscal Tax Reporting & Data Lake Pipeline',
      leadEngineer: 'David Miller',
      squad: 'DevOps & Infra Squad',
      clientAccount: 'Omnichannel Retail Group',
      module: 'Reporting & BI',
      currentPhase: isId ? 'Internal QA & Automated Test Execution' : 'Internal QA & Automated Test Execution',
      phaseProgress: 40,
      totalDays: 17,
      activeDays: 16,
      freezeDays: 1,
      targetSlaDays: 18,
      status: 'warning',
      blockerCode: 'BLK-01',
      blockerTitle: isId ? 'BLK-01: Menunggu kredensial akses read-replica database client' : 'BLK-01: Awaiting read-replica database access credentials from client',
      blockerMaxThreshold: 3,
      clientPic: 'Andi Pratama (Infra Lead Client)',
      auditEvidence: 'ServiceNow Request INC-88912',
      startDate: '2026-10-12',
      originalTargetDate: '2026-10-30',
      targetLiveDate: '2026-10-31',
    },
    {
      id: 'DEL-2026-115',
      code: 'MOD-OPS-0094',
      title: isId ? 'Back-Office Approval Routing & Audit Log Telemetry' : 'Back-Office Approval Routing & Audit Log Telemetry',
      leadEngineer: 'Elena Rostova',
      squad: 'QA Automation Squad',
      clientAccount: 'Telco Logistics Platform',
      module: 'Back-Office Operations',
      currentPhase: isId ? 'Architecture & Spec Sign-off' : 'Architecture & Spec Sign-off',
      phaseProgress: 30,
      totalDays: 24,
      activeDays: 21,
      freezeDays: 3,
      targetSlaDays: 20,
      status: 'breached',
      blockerCode: 'BLK-02',
      blockerTitle: isId ? 'BLK-02: Ambiguitas matriks multi-currency dalam PRD (Hari aktif internal dev melewati target 20 hari)' : 'BLK-02: Multi-currency matrix specification ambiguity in PRD (Internal active dev exceeded 20d target)',
      blockerMaxThreshold: 5,
      clientPic: 'Siti Rahma (Business Analyst Partner)',
      auditEvidence: 'Confluence Spec RFC-044 / Jira Sprint Retrospective Log',
      startDate: '2026-10-02',
      originalTargetDate: '2026-10-23',
      targetLiveDate: '2026-10-26',
    },
    {
      id: 'DEL-2026-121',
      code: 'MOD-SEC-0158',
      title: isId ? 'Zero-Trust API Gateway & Rate-Limiting WAF Overhaul' : 'Zero-Trust API Gateway & Rate-Limiting WAF Overhaul',
      leadEngineer: 'Marcus Vance',
      squad: 'DevOps & Infra Squad',
      clientAccount: 'Public Cloud Services',
      module: 'API Security & Gateway',
      currentPhase: isId ? 'UAT & Client Business Verification' : 'UAT & Client Business Verification',
      phaseProgress: 60,
      totalDays: 18,
      activeDays: 10,
      freezeDays: 8,
      targetSlaDays: 18,
      status: 'frozen',
      blockerCode: 'BLK-06',
      blockerTitle: isId ? 'BLK-06: PenTest eksternal pihak ketiga & audit sertifikasi ISO 27001' : 'BLK-06: Third-party penetration testing hold & ISO 27001 certification audit',
      blockerMaxThreshold: 10,
      clientPic: 'Kurniawan (CISO Security Auditor)',
      auditEvidence: 'PenTest Scope Doc v1.2 / Audit Tracking Ticket SEC-991',
      startDate: '2026-10-10',
      originalTargetDate: '2026-11-03',
      targetLiveDate: '2026-11-15',
    },
  ];

  // Filtering
  const filteredDeliverables = deliverablesData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leadEngineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientAccount.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      slaFilter === 'all'
        ? true
        : slaFilter === 'running'
        ? item.status === 'running'
        : slaFilter === 'frozen'
        ? item.status === 'frozen'
        : slaFilter === 'warning'
        ? item.status === 'warning'
        : item.status === 'breached';

    const matchesClient = selectedClientFilter === 'All' || item.clientAccount === selectedClientFilter;

    return matchesSearch && matchesStatus && matchesClient;
  });

  // Rollups Data
  const squadRoster = [
    { name: 'Backend Core Squad', lead: 'Iqbal Dzulfikar', activeDeliverables: 30, slaCompliance: 97.4, avgCycle: 12.1, frozenCount: 8 },
    { name: 'Frontend & Mobile Squad', lead: 'Sarah Jenkins', activeDeliverables: 24, slaCompliance: 94.8, avgCycle: 13.9, frozenCount: 5 },
    { name: 'DevOps & Infra Squad', lead: 'David Miller', activeDeliverables: 22, slaCompliance: 92.5, avgCycle: 15.6, frozenCount: 9 },
    { name: 'QA Automation Squad', lead: 'Elena Rostova', activeDeliverables: 19, slaCompliance: 89.2, avgCycle: 16.4, frozenCount: 4 },
  ];

  const clientRoster = [
    { name: 'FinTech Enterprise Core', share: '38%', deliverables: 36, compliance: 97.2, cycleActive: 11.8, calendarGross: 18.5, savedBlockers: 64 },
    { name: 'Omnichannel Retail Group', share: '32%', deliverables: 44, compliance: 95.0, cycleActive: 13.4, calendarGross: 21.2, savedBlockers: 86 },
    { name: 'Digital Banking Ecosystem', share: '18%', deliverables: 28, compliance: 92.5, cycleActive: 14.9, calendarGross: 23.4, savedBlockers: 72 },
    { name: 'Telco Logistics Platform', share: '12%', deliverables: 21, compliance: 89.4, cycleActive: 16.2, calendarGross: 24.8, savedBlockers: 64 },
  ];

  const moduleRoster = [
    { name: 'Payment Gateway', share: '28%', deliverables: 26, compliance: 96.8, avgActiveCycle: 12.2, activeBlockers: 6 },
    { name: 'Authentication & SSO', share: '22%', deliverables: 20, compliance: 95.2, avgActiveCycle: 13.8, activeBlockers: 4 },
    { name: 'Core Ledger Engine', share: '20%', deliverables: 18, compliance: 93.4, avgActiveCycle: 14.5, activeBlockers: 5 },
    { name: 'Reporting & BI Pipeline', share: '16%', deliverables: 14, compliance: 91.0, avgActiveCycle: 15.6, activeBlockers: 3 },
    { name: 'API Security & Gateway', share: '14%', deliverables: 12, compliance: 88.7, avgActiveCycle: 16.9, activeBlockers: 4 },
  ];

  const handleInspectDeliverable = (item: ProjectDeliverable) => {
    if (onTriggerModal) {
      const isOverdueBlocker = Boolean(
        item.blockerMaxThreshold && item.freezeDays > item.blockerMaxThreshold
      );

      onTriggerModal(
        `${item.code} — ${item.title}`,
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Card */}
          <div style={{ padding: '14px', background: 'var(--color-bg-subtle)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isId ? 'Lead Engineer & Skuad' : 'Lead Engineer & Squad'}
                </span>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.leadEngineer} · {item.squad}</div>
              </div>
              <NeuronBadge
                size="sm"
                variant={item.status === 'running' ? 'success' : item.status === 'frozen' ? 'info' : item.status === 'warning' ? 'warning' : 'error'}
              >
                {item.status === 'running' ? (isId ? 'Dev Aktif Berjalan' : 'Active Dev Clock Running')
                  : item.status === 'frozen' ? (isId ? 'Freeze: Blocker Klien' : 'Project Freeze (Blocked)')
                  : item.status === 'warning' ? (isId ? 'Mendekati Batas (< 48 Jam)' : 'Warning (< 48h SLA)')
                  : (isId ? 'Dev SLA Terlewati (Breached)' : 'Dev SLA Breached')}
              </NeuronBadge>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              <div><strong>{isId ? 'Akun Klien / Partner:' : 'Client Account:'}</strong> {item.clientAccount}</div>
              <div><strong>{isId ? 'Modul Sistem:' : 'Module:'}</strong> {item.module}</div>
              <div><strong>{isId ? 'Fase SDLC Saat Ini:' : 'Current SDLC Phase:'}</strong> {item.currentPhase} ({item.phaseProgress}%)</div>
              <div><strong>{isId ? 'Durasi Kalender Berjalan:' : 'Calendar Elapsed:'}</strong> {item.totalDays} {isId ? 'Hari (Gross 24 Jam)' : 'Days (Gross 24h)'}</div>
            </div>
          </div>

          {/* Timeline Schedule & Adjustment Card */}
          <div style={{ padding: '12px 14px', background: 'var(--color-bg-subtle)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                {isId ? 'Jadwal & Komparasi Timeline Rilis' : 'Release Schedule & Timeline Adjustment'}
              </span>
              {item.freezeDays > 0 ? (
                <NeuronBadge size="xs" variant="info">
                  {isId ? `Pergeseran +${item.freezeDays} Hari (Freeze Klien)` : `Shifted +${item.freezeDays}d by Client Freeze`}
                </NeuronBadge>
              ) : (
                <NeuronBadge size="xs" variant="success">
                  {isId ? 'Sesuai Baseline Awal' : 'On Baseline Target'}
                </NeuronBadge>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignItems: 'stretch' }}>
              <div style={{ padding: '8px 10px', background: 'var(--color-bg-surface)', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 2 }}>
                  {isId ? 'Mulai Sprint (Start Date)' : 'Sprint Start Date'}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={13} color="var(--color-primary)" />
                  {item.startDate}
                </div>
              </div>
              <div style={{ padding: '8px 10px', background: 'var(--color-bg-surface)', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 2 }}>
                  {isId ? 'Target Baseline Awal' : 'Original Baseline Target'}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: item.freezeDays > 0 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)', textDecoration: item.freezeDays > 0 ? 'line-through' : 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={13} color="var(--color-text-tertiary)" />
                  {item.originalTargetDate}
                </div>
              </div>
              <div style={{ padding: '8px 10px', background: item.freezeDays > 0 ? 'rgba(59, 130, 246, 0.08)' : 'var(--color-bg-surface)', borderRadius: '6px', border: item.freezeDays > 0 ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '11px', color: item.freezeDays > 0 ? '#1d4ed8' : 'var(--color-text-secondary)', fontWeight: item.freezeDays > 0 ? 600 : 400, marginBottom: 2 }}>
                  {isId ? 'Target Disesuaikan (Adjusted)' : 'Adjusted Target Live'}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: item.freezeDays > 0 ? '#1d4ed8' : 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={13} color={item.freezeDays > 0 ? '#2563eb' : 'var(--color-primary)'} />
                  {item.targetLiveDate}
                </div>
              </div>
            </div>
          </div>

          {/* Dual Clock Calculation Breakdown */}
          <div style={{ padding: '14px', background: 'var(--color-bg-canvas)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Kalkulasi Dual-Clock: Waktu Rekayasa Aktif vs Blocker Klien' : 'Dual-Clock Breakdown: Active Dev vs Client Blocker Time'}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <div style={{ fontSize: '11px', color: 'var(--emerald-600)', fontWeight: 600 }}>{isId ? 'Hari Dev Aktif (Dinilai)' : 'Active Dev Days'}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--emerald-600)' }}>{item.activeDays} {isId ? 'Hari' : 'Days'}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Target SLA: ' + item.targetSlaDays + ' Hari' : 'Target SLA: ' + item.targetSlaDays + ' Days'}</div>
              </div>

              <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{isId ? 'Hari Freeze / Blocker' : 'Freeze / Blocker Days'}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb' }}>{item.freezeDays} {isId ? 'Hari' : 'Days'}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Bebas penalti wanprestasi' : 'Exempt from penalty'}</div>
              </div>

              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{isId ? 'Total Kalender (Gross)' : 'Total Calendar Days'}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>{item.totalDays} {isId ? 'Hari' : 'Days'}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Gross Cycle Time' : 'Elapsed Calendar Time'}</div>
              </div>
            </div>

            {/* Standard Blocker Taxonomy Details */}
            {item.blockerCode && (
              <div style={{ marginTop: '14px', padding: '12px', background: isOverdueBlocker ? 'rgba(239, 68, 68, 0.08)' : 'rgba(59, 130, 246, 0.08)', borderRadius: '8px', border: isOverdueBlocker ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isOverdueBlocker ? 'var(--color-danger)' : '#1d4ed8' }}>
                    {item.blockerCode} · {blockerTaxonomy[item.blockerCode].name}
                  </span>
                  <NeuronBadge size="xs" variant={isOverdueBlocker ? 'error' : 'info'}>
                    {isOverdueBlocker ? (isId ? 'Critical Blocker (Overdue)' : 'Critical Blocker (Overdue)') : (isId ? 'Active Freeze' : 'Active Freeze')}
                  </NeuronBadge>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                  {item.blockerTitle}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div><strong>{isId ? 'Ambang Batas Maksimal:' : 'Max Allowed Threshold:'}</strong> {item.blockerMaxThreshold} {isId ? 'Hari Kerja' : 'Working Days'} (Realisasi Freeze: {item.freezeDays} Hari)</div>
                  <div><strong>{isId ? 'PIC Klien Terkait:' : 'Client PIC Escalation:'}</strong> {item.clientPic}</div>
                  <div><strong>{isId ? 'Bukti Jejak Audit:' : 'Audit Evidence Trail:'}</strong> {item.auditEvidence}</div>
                </div>
                {isOverdueBlocker && (
                  <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '4px', fontSize: '11px', color: '#b91c1c', fontWeight: 600 }}>
                    ⚠️ {isId ? 'Klausul Timeline Addendum Notice telah terpicu secara otomatis ke pihak klien.' : 'Timeline Addendum Notice clause automatically triggered to client account.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Level 1: Executive Delivery Health Cards ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '16px',
        }}
      >
        {/* KPI 1: Milestone Delivery Adherence Rate */}
        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Kepatuhan Delivery Milestone' : 'Milestone Delivery Adherence Rate'}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(223, 126, 48, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              94.6%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--emerald-600)' }}>
              +2.4% {isId ? 'vs Baseline' : 'vs Baseline'}
            </span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <NeuronProgress value={94.6} variant="brand" size="sm" />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '6px' }}>
            {isId ? '128 dari 135 deliverable rilis sesuai komitmen sprint' : '128 of 135 deliverables delivered on-time'}
          </div>
        </NeuronCard>

        {/* KPI 2: Avg Development Turnaround / Cycle Time */}
        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Siklus Waktu Dev (Cycle Time)' : 'Avg Development Turnaround (TAT)'}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald-600)' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              14.2 {isId ? 'Hari' : 'Days'}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--emerald-600)' }}>
              -3.8d {isId ? 'lebih cepat' : 'cycle speedup'}
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
            {isId ? 'Target SLA Sprint: 18 Hari Kerja' : 'Target Baseline Sprint SLA: 18 Working Days'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            {isId ? 'Gross kalender riil: 21.8 hari' : 'Gross calendar time: 21.8 days'}
          </div>
        </NeuronCard>

        {/* KPI 3: Client Blocker Days Saved */}
        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Hari Blocker Klien Dikecualikan' : 'Total Client Blocker Days Saved'}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <PauseCircle size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb', letterSpacing: '-0.02em' }}>
              286 {isId ? 'Hari' : 'Days'}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>
              {isId ? '42 Kasus Freeze' : '42 Freeze Events'}
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
            {isId ? 'UAT idle, kredensial tertahan & audit pihak ke-3' : 'UAT idle, API credentials hold & vendor outage'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--emerald-600)', marginTop: '4px' }}>
            {isId ? 'Melindungi 16 milestone dari penalti wanprestasi' : 'Protected 16 milestones from penalty'}
          </div>
        </NeuronCard>

        {/* KPI 4: Milestones at Risk & Breached */}
        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Milestone Kritis & Terlewati (< 48 Jam)' : 'Milestones at Risk & Breached (< 48h)'}
            </span>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239, 68, 68, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger, #ef4444)' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-danger, #ef4444)', letterSpacing: '-0.02em' }}>
              3
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber-600)' }}>
              + 5 {isId ? 'Mendekati Batas' : 'Warning'}
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
            {isId ? 'Memerlukan eskalasi teknis TPM & klausul addendum' : 'Requires immediate TPM escalation & addendum notice'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            {isId ? '2 modul dalam evaluasi change request' : '2 pending change request evaluation'}
          </div>
        </NeuronCard>
      </div>

      {/* ── Level 2: Dual-Clock SLA Architecture Banner ── */}
      <div
        style={{
          background: isDark ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Terminal size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Dual-Clock Engine: Waktu Rekayasa Aktif vs Project Freeze' : 'Dual-Clock Engine: Active Dev Work vs Project Freeze'}
              </h3>
              <NeuronBadge size="xs" variant="brand">{isId ? 'Eliminasi Sengketa Kontrak' : 'Audit-Proof Delivery'}</NeuronBadge>
            </div>
            <p style={{ margin: '3px 0 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
              {isId
                ? 'SLA rekayasa software dihitung eksklusif hanya saat tim engineering aktif memproses deliverable. Jam otomatis DI-FREEZE ketika terhalang dependensi eksternal (kredensial API, review UAT klien idle, atau audit ISO) demi keadilan KPI dev.'
                : 'Development SLA clock measures active engineering turnaround time only. Time automatically FREEZES during client credential delays, idle UAT feedback, or security pentest hold, keeping performance dispute-free.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 600, color: 'var(--emerald-600)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--emerald-500)' }} />
            <span>{isId ? 'Jam Rekayasa Aktif' : 'Active Dev Clock'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#3b82f6', border: '1px dashed #1d4ed8' }} />
            <span>{isId ? 'Jam Freeze / Blocker' : 'Freeze Clock (Exempt)'}</span>
          </div>
        </div>
      </div>

      {/* ── Level 2 (Part B): SDLC Delivery Funnel Cards (5 Fase) ── */}
      <NeuronCard variant="default" padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Kecepatan Delivery Funnel SDLC & Analisis Hambatan' : 'SDLC Delivery Funnel Velocity & Stage Bottlenecks'}
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Perbandingan jam aktif rekayasa vs jam freeze pada setiap fase delivery software' : 'Average active engineering turnaround vs client freeze durations across the SDLC pipeline'}
            </p>
          </div>
          <NeuronBadge size="xs" variant="neutral">{isId ? '5 Fase Inti SDLC' : '5 Core SDLC Phases'}</NeuronBadge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { step: '1', title: isId ? 'Arsitektur & Sign-off Spek' : 'Architecture & Spec Sign-off', target: '3.0d', active: '2.1d', freeze: '0.8d', status: 'Optimal' },
            { step: '2', title: isId ? 'Core Engineering & Sprint' : 'Core Engineering & Sprint Coding', target: '8.0d', active: '7.2d', freeze: '1.4d', status: 'Optimal' },
            { step: '3', title: isId ? 'QA Internal & Automated Test' : 'Internal QA & Automated Testing', target: '4.0d', active: '3.6d', freeze: '0.9d', status: 'Optimal' },
            { step: '4', title: isId ? 'UAT & Verifikasi Klien' : 'UAT & Client Verification', target: '7.0d', active: '5.8d', freeze: '5.6d', status: 'High Blocker Risk' },
            { step: '5', title: isId ? 'Deployment & Go-Live' : 'Deployment, Migration & Go-Live', target: '2.0d', active: '1.5d', freeze: '0.4d', status: 'Fast Track' },
          ].map((stage, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    minWidth: 22,
                    minHeight: 22,
                    maxWidth: 22,
                    maxHeight: 22,
                    flexShrink: 0,
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {stage.step}
                </span>
                <NeuronBadge size="xs" variant={stage.status === 'High Blocker Risk' ? 'error' : 'success'}>
                  {stage.status}
                </NeuronBadge>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stage.title}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span>{isId ? 'Target SLA:' : 'Target:'} <strong>{stage.target}</strong></span>
                <span>{isId ? 'Aktif:' : 'Active:'} <strong style={{ color: 'var(--emerald-600)' }}>{stage.active}</strong></span>
              </div>
              <div style={{ fontSize: '11px', color: '#2563eb' }}>
                {isId ? 'Rata-rata Freeze: ' : 'Avg Freeze: '} <strong>{stage.freeze}</strong>
              </div>
            </div>
          ))}
        </div>
      </NeuronCard>

      {/* ── Level 3: Multi-Perspective Rollup Tabs ── */}
      <NeuronCard variant="default" padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Matriks Kinerja SLA Delivery Lintas Perspektif' : 'Multi-Perspective Delivery SLA Performance Matrix'}
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Pilih tingkat agregasi: Skuad Rekayasa, Akun Klien, atau Modul Fitur' : 'Switch scope level to analyze delivery accountability by Squad, Client Account, or Module'}
            </p>
          </div>

          {/* Scope Hierarchy Selector Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'var(--color-bg-subtle)',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              gap: '4px',
            }}
          >
            {[
              { key: 'squad' as HierarchyScope, labelEn: 'By Squad', labelId: 'Per Skuad', icon: <Users size={13} /> },
              { key: 'client' as HierarchyScope, labelEn: 'By Client / Account', labelId: 'Per Akun Klien', icon: <Building2 size={13} /> },
              { key: 'module' as HierarchyScope, labelEn: 'By Module / Feature', labelId: 'Per Modul Fitur', icon: <Layers size={13} /> },
            ].map((scope) => (
              <button
                key={scope.key}
                type="button"
                onClick={() => setActiveScope(scope.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: activeScope === scope.key ? 700 : 500,
                  background: activeScope === scope.key ? 'var(--color-bg-surface)' : 'transparent',
                  color: activeScope === scope.key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  boxShadow: activeScope === scope.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {scope.icon}
                <span>{isId ? scope.labelId : scope.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 1. Squad Scope View */}
        {activeScope === 'squad' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {squadRoster.map((sq, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        minWidth: 28,
                        minHeight: 28,
                        maxWidth: 28,
                        maxHeight: 28,
                        flexShrink: 0,
                        aspectRatio: '1 / 1',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {sq.lead.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{sq.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Lead: {sq.lead}</div>
                    </div>
                  </div>
                  <NeuronBadge size="xs" variant={sq.slaCompliance >= 95 ? 'success' : sq.slaCompliance >= 90 ? 'brand' : 'warning'}>
                    {sq.slaCompliance}% SLA
                  </NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--color-text-secondary)', paddingTop: '4px', borderTop: '1px solid var(--color-border)' }}>
                  <span>{isId ? 'Tiket Aktif:' : 'Active Tickets:'} <strong>{sq.activeDeliverables}</strong></span>
                  <span>{isId ? 'Avg Cycle:' : 'Avg Cycle:'} <strong>{sq.avgCycle}d</strong></span>
                  <span>{isId ? 'Kasus Freeze:' : 'Frozen Holds:'} <strong style={{ color: '#2563eb' }}>{sq.frozenCount}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Client / Account Scope View */}
        {activeScope === 'client' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {clientRoster.map((cl, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={15} color="var(--color-primary)" />
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{cl.name}</span>
                  </div>
                  <NeuronBadge size="xs" variant={cl.compliance >= 95 ? 'success' : 'brand'}>{cl.compliance}% SLA</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  <span>{isId ? 'Porsi Portofolio:' : 'Share:'} <strong>{cl.share}</strong></span>
                  <span>{isId ? 'Deliverables:' : 'Deliverables:'} <strong>{cl.deliverables}</strong></span>
                  <span>{isId ? 'Dev Aktif:' : 'Dev Cycle:'} <strong>{cl.cycleActive}d</strong></span>
                  <span>{isId ? 'Blocker Klien:' : 'Saved Freeze:'} <strong style={{ color: '#2563eb' }}>{cl.savedBlockers}d</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Module Scope View */}
        {activeScope === 'module' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {moduleRoster.map((mod, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={15} color="var(--color-primary)" />
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{mod.name}</span>
                  </div>
                  <NeuronBadge size="xs" variant={mod.compliance >= 95 ? 'success' : 'brand'}>{mod.compliance}% SLA</NeuronBadge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  <span>{isId ? 'Porsi Modul:' : 'Share:'} <strong>{mod.share}</strong></span>
                  <span>{isId ? 'Total Tiket:' : 'Tickets:'} <strong>{mod.deliverables}</strong></span>
                  <span>{isId ? 'Avg Dev:' : 'Avg Dev:'} <strong>{mod.avgActiveCycle}d</strong></span>
                  <span>{isId ? 'Active Blocker:' : 'Blockers:'} <strong style={{ color: '#2563eb' }}>{mod.activeBlockers}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </NeuronCard>

      {/* ── Level 4: Deliverables Dual-Clock Table ── */}
      <NeuronCard variant="default" padding="lg" style={{ overflow: 'visible' }}>
        {/* Table Filters & Search Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          {/* 1. Search Input - Standard 36px Height */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '260px' }}>
            <NeuronInput
              placeholder={isId ? 'Cari ID modul, nama fitur, lead engineer, atau klien...' : 'Search ticket ID, deliverable title, squad lead, or client...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leadingIcon={<Search size={14} />}
              style={{
                height: '36px',
                boxSizing: 'border-box',
                fontSize: '13px',
                borderRadius: 'var(--radius-md, 8px)',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* 2. Status SLA Filter Segmented Tabs - Exact 36px Height */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '36px',
                boxSizing: 'border-box',
                background: 'var(--color-bg-subtle)',
                padding: '3px',
                borderRadius: 'var(--radius-md, 8px)',
                border: '1px solid var(--color-border)',
                gap: '2px',
              }}
            >
              {[
                { key: 'all' as SlaStatusFilter, labelEn: 'All Deliverables', labelId: 'Semua' },
                { key: 'running' as SlaStatusFilter, labelEn: 'Active Dev', labelId: 'Dev Aktif' },
                { key: 'frozen' as SlaStatusFilter, labelEn: 'Freeze (Blocker)', labelId: 'Freeze (Blocker)' },
                { key: 'warning' as SlaStatusFilter, labelEn: 'Warning (< 48h)', labelId: '< 48 Jam' },
                { key: 'breached' as SlaStatusFilter, labelEn: 'Dev Breached', labelId: 'SLA Terlewati' },
              ].map((st) => (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setSlaFilter(st.key)}
                  style={{
                    height: '28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: slaFilter === st.key ? 700 : 500,
                    background: slaFilter === st.key ? 'var(--color-bg-surface)' : 'transparent',
                    color: slaFilter === st.key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    boxShadow: slaFilter === st.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isId ? st.labelId : st.labelEn}
                </button>
              ))}
            </div>

            {/* 3. Client Account Dropdown - Exactly 36px Height */}
            <div style={{ width: '220px' }}>
              <NeuronSelect
                value={selectedClientFilter}
                onChange={(val) => setSelectedClientFilter(val as string)}
                options={[
                  { label: isId ? 'Semua Akun Klien' : 'All Client Accounts', value: 'All' },
                  { label: 'FinTech Enterprise Core', value: 'FinTech Enterprise Core' },
                  { label: 'Omnichannel Retail Group', value: 'Omnichannel Retail Group' },
                  { label: 'Digital Banking Ecosystem', value: 'Digital Banking Ecosystem' },
                  { label: 'Telco Logistics Platform', value: 'Telco Logistics Platform' },
                  { label: 'Public Cloud Services', value: 'Public Cloud Services' },
                ]}
                size="sm"
                leadingIcon={<Building2 size={14} />}
              />
            </div>
          </div>
        </div>

        {/* Live Table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
          <table
            className="neuron-table"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12.5px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 14px' }}>{isId ? 'ID Tiket & Fitur Deliverable' : 'Ticket ID & Deliverable Feature'}</th>
                <th style={{ padding: '12px 14px' }}>{isId ? 'Lead Engineer & Skuad' : 'Lead Engineer & Squad'}</th>
                <th style={{ padding: '12px 14px' }}>{isId ? 'Akun Klien & Modul' : 'Client Account & Module'}</th>
                <th style={{ padding: '12px 14px' }}>{isId ? 'Fase SDLC & Timeline' : 'SDLC Phase & Timeline'}</th>
                <th style={{ padding: '12px 14px' }}>{isId ? 'Dual-Clock (Dev Aktif / Freeze)' : 'Dual-Clock Breakdown (Active vs Freeze)'}</th>
                <th style={{ padding: '12px 14px' }}>{isId ? 'Status SLA Delivery' : 'Delivery SLA Status'}</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>{isId ? 'Aksi' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliverables.length === 0 ? (
                <tr className="neuron-table__tr neuron-table__tr--empty">
                  <td
                    colSpan={7}
                    className="neuron-table__td neuron-table__td--empty"
                    style={{ padding: '0', border: 'none' }}
                  >
                    <div
                      className="neuron-table-empty"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '64px 24px',
                        textAlign: 'center',
                        background: 'var(--color-bg-surface)',
                      }}
                    >
                      <div
                        className="neuron-table-empty__icon"
                        style={{
                          width: '64px',
                          height: '64px',
                          minWidth: '64px',
                          minHeight: '64px',
                          flexShrink: 0,
                          aspectRatio: '1 / 1',
                          borderRadius: '50%',
                          background: 'rgba(223, 126, 48, 0.08)',
                          border: '1px solid rgba(223, 126, 48, 0.25)',
                          color: 'var(--color-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                        }}
                      >
                        <FileSpreadsheet size={30} />
                      </div>

                      <div
                        className="neuron-table-empty__title"
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          marginBottom: searchQuery ? '6px' : '16px',
                        }}
                      >
                        {isId ? 'Tidak Ada Deliverable yang Sesuai' : 'No Deliverables Found'}
                      </div>

                      {searchQuery && (
                        <div
                          className="neuron-table-empty__subtitle"
                          style={{
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                            maxWidth: '480px',
                            lineHeight: 1.5,
                            marginBottom: '16px',
                          }}
                        >
                          {isId ? (
                            <>
                              Tidak ada deliverable yang cocok dengan kata kunci <strong>"{searchQuery}"</strong>.
                            </>
                          ) : (
                            <>
                              No deliverables match your search query <strong>"{searchQuery}"</strong>.
                            </>
                          )}
                        </div>
                      )}

                      <NeuronButton
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSlaFilter('all');
                          setSelectedClientFilter('All');
                          setSearchQuery('');
                        }}
                        leadingIcon={<RotateCcw size={13} />}
                      >
                        {isId ? 'Reset Semua Filter' : 'Reset All Filters'}
                      </NeuronButton>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDeliverables.map((item, idx) => {
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: idx === filteredDeliverables.length - 1 ? 'none' : '1px solid var(--color-border)',
                        background: item.status === 'breached' ? 'rgba(239, 68, 68, 0.03)' : item.status === 'frozen' ? 'rgba(59, 130, 246, 0.02)' : 'transparent',
                      }}
                    >
                      {/* Ticket Code & Title */}
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)' }}>{item.code}</span>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>· {item.module}</span>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '13px' }}>{item.title}</div>
                      </td>

                      {/* Lead Engineer & Squad */}
                      <td style={{ padding: '14px', minWidth: '180px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              minWidth: 28,
                              minHeight: 28,
                              maxWidth: 28,
                              maxHeight: 28,
                              flexShrink: 0,
                              aspectRatio: '1 / 1',
                              borderRadius: '50%',
                              background: 'var(--color-primary)',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: 1,
                              letterSpacing: '-0.2px',
                              boxShadow: '0 1px 2px rgba(223, 126, 48, 0.25)',
                            }}
                          >
                            {item.leadEngineer
                              .split(' ')
                              .filter(Boolean)
                              .slice(0, 2)
                              .map(n => n[0])
                              .join('')
                              .toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>{item.leadEngineer}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap' }}>{item.squad}</div>
                          </div>
                        </div>
                      </td>

                      {/* Client Account & Module */}
                      <td style={{ padding: '14px' }}>
                        <div style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.clientAccount}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Layers size={11} /> {item.module}
                        </div>
                      </td>

                      {/* SDLC Phase, Progress & Timeline Dates */}
                      <td style={{ padding: '14px', minWidth: '190px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>{item.currentPhase}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 85 }}>
                            <NeuronProgress value={item.phaseProgress} variant="brand" size="xs" />
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{item.phaseProgress}%</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Calendar size={11} color="var(--color-primary)" />
                          <span>{item.startDate}</span>
                          <span style={{ color: 'var(--color-text-tertiary)' }}>→</span>
                          <span style={{ fontWeight: 600, color: item.freezeDays > 0 ? '#2563eb' : 'var(--color-text-primary)' }}>
                            {item.targetLiveDate}
                          </span>
                        </div>
                      </td>

                      {/* Dual-Clock Breakdown (Active Dev vs Freeze Blocker) */}
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--emerald-600)' }}>
                            {item.activeDays}d {isId ? 'Dev Aktif' : 'Active Dev'}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>/</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>
                            {item.freezeDays}d {isId ? 'Blocker' : 'Freeze'}
                          </span>
                          <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>({isId ? 'SLA Target: ' + item.targetSlaDays + 'd' : 'Target SLA: ' + item.targetSlaDays + 'd'})</span>
                        </div>
                        {/* Segmented Dual Bar */}
                        <div style={{ width: 140, height: 6, borderRadius: 3, background: 'var(--color-border)', display: 'flex', overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(100, (item.activeDays / item.targetSlaDays) * 100)}%`, background: item.status === 'breached' ? 'var(--color-danger, #ef4444)' : 'var(--emerald-500)' }} />
                          {item.freezeDays > 0 && (
                            <div style={{ width: `${Math.min(50, (item.freezeDays / item.targetSlaDays) * 100)}%`, background: '#3b82f6' }} title={`Freeze Blocker: ${item.freezeDays} days`} />
                          )}
                        </div>
                      </td>

                      {/* Delivery SLA Status Badge */}
                      <td style={{ padding: '14px' }}>
                        {item.status === 'running' && (
                          <NeuronBadge size="sm" variant="success">
                            {isId ? 'Dev Berjalan' : 'Active Dev Clock'}
                          </NeuronBadge>
                        )}
                        {item.status === 'frozen' && (
                          <NeuronBadge size="sm" variant="info">
                            <PauseCircle size={12} style={{ marginRight: 4 }} />
                            {item.blockerCode ? `${item.blockerCode} Freeze` : (isId ? 'Project Freeze' : 'Project Freeze')}
                          </NeuronBadge>
                        )}
                        {item.status === 'warning' && (
                          <NeuronBadge size="sm" variant="warning">
                            <AlertTriangle size={12} style={{ marginRight: 4 }} />
                            {isId ? '< 48 Jam' : 'Warning (< 48h)'}
                          </NeuronBadge>
                        )}
                        {item.status === 'breached' && (
                          <NeuronBadge size="sm" variant="error">
                            <AlertCircle size={12} style={{ marginRight: 4 }} />
                            {isId ? 'Dev Breached' : 'Dev Breached'}
                          </NeuronBadge>
                        )}
                      </td>

                      {/* Action */}
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <NeuronButton size="xs" variant="outline" onClick={() => handleInspectDeliverable(item)}>
                          {isId ? 'Detail SLA' : 'Inspect'}
                        </NeuronButton>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </NeuronCard>
    </div>
  );
}
