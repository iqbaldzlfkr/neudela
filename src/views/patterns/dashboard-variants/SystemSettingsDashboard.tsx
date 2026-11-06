import React, { useState } from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import NeuronInput from '../../../components/NeuronInput';
import NeuronDivider from '../../../components/NeuronDivider';
import {
  Settings,
  ShieldCheck,
  Server,
  Lock,
  Key,
  Globe,
  Bell,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  Save,
  Check,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';

interface SystemSettingsDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
}

export default function SystemSettingsDashboard({
  isId,
  previewTheme,
}: SystemSettingsDashboardProps) {
  const isDark = previewTheme === 'dark';

  // Interactive Settings States
  const [mtlsEnabled, setMtlsEnabled] = useState(true);
  const [autoScalingEnabled, setAutoScalingEnabled] = useState(true);
  const [auditLoggingEnabled, setAuditLoggingEnabled] = useState(true);
  const [traceSamplingRate, setTraceSamplingRate] = useState('15%');
  const [rateLimit, setRateLimit] = useState('15,000 req/min');
  const [webhookUrl, setWebhookUrl] = useState('https://events.pagerduty.com/v2/enqueue');
  const [ipAllowlist, setIpAllowlist] = useState('10.240.0.0/16, 172.16.0.0/12');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ── Settings Header Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: isDark ? '#0d1322' : 'var(--color-bg-surface)',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(223, 126, 48, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
            }}
          >
            <Settings size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {isId ? 'Pengaturan Sistem & Tata Kelola Kluster' : 'System Settings & Cluster Governance'}
              </h2>
              <NeuronBadge size="xs" variant="brand">
                {isId ? 'Produksi v1.31' : 'Production v1.31'}
              </NeuronBadge>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId
                ? 'Konfigurasi kebijakan infrastruktur global, penskalaan node otomatis, gateway keamanan API, dan retensi log audit.'
                : 'Configure global infrastructure policies, automated node scaling, API security gateways, and audit log retentions.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {saveSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: 'var(--emerald-600)', fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>{isId ? 'Pengaturan Tersimpan!' : 'Configuration Saved!'}</span>
            </div>
          )}
          <NeuronButton
            size="sm"
            variant="primary"
            onClick={handleSave}
            loading={isSaving}
            leadingIcon={saveSuccess ? <Check size={14} /> : <Save size={14} />}
          >
            {isId ? 'Simpan Perubahan' : 'Save Changes'}
          </NeuronButton>
        </div>
      </div>

      {/* ── Key Governance KPI Tiles ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
        }}
      >
        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isId ? 'Tingkat Keamanan' : 'Security Posture'}
            </span>
            <ShieldCheck size={16} color="var(--color-primary)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            SOC2 Type II
          </div>
          <div style={{ fontSize: '11px', color: 'var(--emerald-600)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)' }} />
            {isId ? 'mTLS & Enkripsi Aktif' : 'mTLS & KMS Encrypted'}
          </div>
        </NeuronCard>

        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isId ? 'Batas Laju Gateway' : 'Gateway Rate Limit'}
            </span>
            <Activity size={16} color="var(--color-primary)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            15,000 req/m
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            {isId ? 'Batas Lonjakan: 25,000 req/m' : 'Peak Burst Ceiling: 25k/m'}
          </div>
        </NeuronCard>

        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isId ? 'Retensi Telemetri' : 'Telemetry Retention'}
            </span>
            <Clock size={16} color="var(--color-primary)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            90 {isId ? 'Hari' : 'Days'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            {isId ? 'Cold Storage S3 Glacier' : 'Cold Storage Glacier Archive'}
          </div>
        </NeuronCard>

        <NeuronCard variant="default" padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isId ? 'Jendela Pemeliharaan' : 'Maintenance Window'}
            </span>
            <RefreshCw size={16} color="var(--color-primary)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Sun 02:00
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            {isId ? '0-Downtime Rolling Update' : 'Zero-Downtime Pod Surge'}
          </div>
        </NeuronCard>
      </div>

      {/* ── Settings Sections Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Section 1: Cluster & Auto-scaling Governance */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Server size={18} color="var(--color-primary)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Penskalaan Kluster & Orkestrasi Node' : 'Cluster Autoscaling & Node Policies'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--color-bg-subtle)', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>
                  {isId ? 'Horizontal Pod Autoscaler (HPA)' : 'Horizontal Pod Autoscaler (HPA)'}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Penskalaan otomatis replika pod saat CPU melebihi 75%' : 'Automatically scale pod replicas when CPU threshold exceeds 75%'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAutoScalingEnabled(!autoScalingEnabled)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  background: autoScalingEnabled ? 'var(--color-primary)' : 'var(--color-border)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: 3,
                    left: autoScalingEnabled ? 21 : 3,
                    transition: 'left 0.2s ease',
                  }}
                />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                {isId ? 'Batas Node Minimum & Maksimum' : 'Cluster Node Minimum & Maximum Thresholds'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <NeuronInput defaultValue="12 Min Nodes" leadingIcon={<Server size={13} />} />
                <NeuronInput defaultValue="64 Max Nodes" leadingIcon={<Server size={13} />} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                {isId ? 'Wilayah Cloud & Penempatan Primer' : 'Primary Cloud Availability Zone'}
              </label>
              <NeuronInput defaultValue="AWS ap-southeast-1 (Singapore Multi-AZ)" leadingIcon={<Globe size={13} />} />
            </div>
          </div>
        </NeuronCard>

        {/* Section 2: Security & API Gateways */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Lock size={18} color="var(--color-primary)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Keamanan Gerbang API & Akses Jaringan' : 'API Security Gateways & Mesh Access'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--color-bg-subtle)', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>
                  {isId ? 'Mutual TLS (mTLS) Wajib' : 'Enforce Strict Mutual TLS (mTLS)'}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Enkripsi dua arah antar pod di dalam Envoy service mesh' : 'Zero-trust cryptographic handshakes between internal service meshes'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMtlsEnabled(!mtlsEnabled)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  background: mtlsEnabled ? 'var(--color-primary)' : 'var(--color-border)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: 3,
                    left: mtlsEnabled ? 21 : 3,
                    transition: 'left 0.2s ease',
                  }}
                />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                {isId ? 'Daftar Putih CIDR VPC Internal' : 'Internal VPC CIDR Allowlist'}
              </label>
              <NeuronInput
                value={ipAllowlist}
                onChange={(e) => setIpAllowlist(e.target.value)}
                leadingIcon={<Key size={13} />}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                {isId ? 'Batas Panggilan Masuk (Rate Limit Tier)' : 'Ingress Rate Limiting Ceiling'}
              </label>
              <NeuronInput
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
                leadingIcon={<Sliders size={13} />}
              />
            </div>
          </div>
        </NeuronCard>

        {/* Section 3: Telemetry, Observability & Webhooks */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Bell size={18} color="var(--color-primary)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Integrasi Alerting & Notifikasi Insiden' : 'Incident Alerting & Webhooks'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                {isId ? 'Webhook Eskalasi PagerDuty / On-Call' : 'PagerDuty Incident Escalation Webhook'}
              </label>
              <NeuronInput
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                leadingIcon={<Zap size={13} />}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--color-bg-subtle)', borderRadius: '8px' }}>
              <div>
                <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>
                  {isId ? 'Pencatatan Audit Trail Immutable' : 'Immutable Audit Trail Logging'}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Simpan log akses k8s ke S3 Glacier anti-tamper' : 'Stream all cluster admin events to tamper-proof S3 storage'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAuditLoggingEnabled(!auditLoggingEnabled)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                  background: auditLoggingEnabled ? 'var(--color-primary)' : 'var(--color-border)',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: 3,
                    left: auditLoggingEnabled ? 21 : 3,
                    transition: 'left 0.2s ease',
                  }}
                />
              </button>
            </div>
          </div>
        </NeuronCard>

        {/* Section 4: Maintenance & Operational Resilience */}
        <NeuronCard variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <AlertTriangle size={18} color="var(--amber-500)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Operasi Darurat & Zona Kritis' : 'Resilience & Emergency Operations'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isId
                ? 'Operasi di bawah ini mempengaruhi pod yang sedang berjalan di seluruh kluster produksi. Harap verifikasi ketersediaan cadangan sebelum melakukan drain.'
                : 'Actions below immediately alter running workloads across the production fleet. Ensure redundancy before triggering node drains.'}
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
              <NeuronButton size="sm" variant="outline">
                <RefreshCw size={13} style={{ marginRight: 6 }} />
                {isId ? 'Muat Ulang Secret TLS' : 'Rotate TLS Secrets'}
              </NeuronButton>
              <NeuronButton size="sm" variant="danger">
                <AlertTriangle size={13} style={{ marginRight: 6 }} />
                {isId ? 'Karantina Node Bermasalah' : 'Cordon Unhealthy Nodes'}
              </NeuronButton>
            </div>
          </div>
        </NeuronCard>
      </div>
    </div>
  );
}
