import React, { useState } from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import {
  Server,
  Cpu,
  Terminal,
  AlertCircle,
  Zap,
} from 'lucide-react';

interface DevopsTelemetryDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export default function DevopsTelemetryDashboard({
  isId,
  previewTheme,
  onTriggerModal,
}: DevopsTelemetryDashboardProps) {
  const isDark = previewTheme === 'dark';
  const [selectedNode, setSelectedNode] = useState<number>(5);
  const [replicaCount] = useState<number>(48);

  // 24 Kubernetes Cluster Blade Nodes
  const clusterNodes = Array.from({ length: 24 }, (_, i) => {
    const id = i + 1;
    let status: 'healthy' | 'warning' | 'scaling' = 'healthy';
    let cpu = Math.floor(40 + (id * 17) % 45);
    let ram = Math.floor(50 + (id * 23) % 40);

    if (id === 7 || id === 18) {
      status = 'warning';
      ram = 92;
      cpu = 88;
    } else if (id === 12 || id === 21) {
      status = 'scaling';
      cpu = 74;
    }

    return {
      id,
      name: `k8s-node-${id < 10 ? '0' + id : id}`,
      cpu,
      ram,
      pods: Math.floor(12 + (id * 7) % 18),
      status,
    };
  });

  const servicesMesh = [
    { name: 'api-gateway', p99: '18.4ms', rps: '14,280/s', errorRate: '0.002%', status: 'Healthy' },
    { name: 'auth-jwt-service', p99: '8.2ms', rps: '6,450/s', errorRate: '0.000%', status: 'Healthy' },
    { name: 'billing-ledger-engine', p99: '42.1ms', rps: '1,890/s', errorRate: '0.012%', status: 'Degraded' },
    { name: 'vector-search-indexer', p99: '31.5ms', rps: '4,100/s', errorRate: '0.001%', status: 'Healthy' },
    { name: 'kafka-event-stream', p99: '4.8ms', rps: '28,900/s', errorRate: '0.000%', status: 'Healthy' },
  ];

  const terminalLogs = [
    { time: '14:22:01.402', level: 'INFO', msg: 'HPA autoscaler: evaluated 48 replicas across 4 AZ zones. Target CPU utilization 64% within threshold.' },
    { time: '14:22:04.119', level: 'INFO', msg: 'Ingress envoy-edge: TLS handshake certificate auto-renewed via Let’s Encrypt ACME challenge.' },
    { time: '14:22:08.874', level: 'WARN', msg: 'k8s-node-07: cgroup memory pressure warning: 92.4% resident set size exceeded 90% soft-limit.' },
    { time: '14:22:12.301', level: 'INFO', msg: 'Vector-search-indexer: Re-indexed 450,000 document embeddings into Pinecone shard #3 in 1.42s.' },
    { time: '14:22:15.980', level: 'HEARTBEAT', msg: 'Prometheus cluster scrape finished in 84ms. 24/24 nodes responding, 0 deadman triggers.' },
  ];

  const handleActionClick = (title: string, details: string) => {
    if (onTriggerModal) {
      onTriggerModal(
        title,
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: isDark ? '#94a3b8' : '#64748b' }}>
            {details}
          </p>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: isDark ? '#1e293b' : '#f8fafc',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              fontFamily: 'monospace',
              fontSize: '0.82rem',
            }}
          >
            <div>KUBERNETES_API: v1.30.2-gke.110</div>
            <div>CLUSTER_REGION: us-east-1a, 1b, 1c</div>
            <div>STATUS: RECONCILED_SUCCESS</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <NeuronButton variant="primary" size="sm">
              Confirm Cluster Patch
            </NeuronButton>
          </div>
        </div>
      );
    }
  };

  const activeNodeData = clusterNodes.find((n) => n.id === selectedNode) || clusterNodes[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ── Real-Time Metrics Strip ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          {
            label: isId ? 'Rata-rata Latensi Global' : 'Avg Global Latency',
            value: '18.4 ms',
            sub: 'P99: 38.2 ms (SLA < 50ms)',
            positive: true,
            icon: Zap,
            color: '#10b981',
          },
          {
            label: isId ? 'Pod Replika Aktif' : 'Active Pod Replicas',
            value: `${replicaCount} / 60`,
            sub: 'HPA auto-scale healthy',
            positive: true,
            icon: Cpu,
            color: '#df7e30',
          },
          {
            label: isId ? 'Trafik Ingress Global' : 'Ingress Request Rate',
            value: '14,280 req/s',
            sub: 'Peak bandwidth 1.8 Gbps',
            positive: true,
            icon: Server,
            color: '#3b82f6',
          },
          {
            label: isId ? 'Node Peringatan Memori' : 'Node Warnings Flagged',
            value: '2 of 24',
            sub: 'High RAM Soft-Limit',
            positive: false,
            icon: AlertCircle,
            color: '#eab308',
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                padding: '16px 20px',
                borderRadius: '10px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '0.74rem', color: item.positive ? '#10b981' : '#eab308', fontWeight: 600 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 24-Node Kubernetes Blade Heatmap Grid ── */}
      <NeuronCard
        title={isId ? 'Peta Panas Rack Blade 24-Node Kubernetes' : '24-Node Kubernetes Cluster Blade Heatmap'}
        subtitle={isId ? 'Klik salah satu node untuk melihat alokasi CPU, RAM, dan pod kontainer aktif' : 'Visual cluster blade status: emerald (optimal), amber (memory pressure), terracotta (scaling)'}
      >
        <div style={{ marginTop: '14px' }}>
          {/* Blade Grid: 6 columns x 4 rows */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '10px',
            }}
          >
            {clusterNodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const statusColor =
                node.status === 'warning'
                  ? '#eab308'
                  : node.status === 'scaling'
                  ? '#df7e30'
                  : '#10b981';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: isSelected
                      ? isDark
                        ? '#1e293b'
                        : '#f1f5f9'
                      : isDark
                      ? '#0f172a'
                      : '#f8fafc',
                    border: `1.5px solid ${isSelected ? '#df7e30' : isDark ? '#334155' : '#e2e8f0'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {node.name}
                    </span>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: statusColor,
                        boxShadow: `0 0 6px ${statusColor}`,
                      }}
                    />
                  </div>

                  {/* CPU bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    <span>CPU</span>
                    <span style={{ fontWeight: 600 }}>{node.cpu}%</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '2px', backgroundColor: isDark ? '#334155' : '#e2e8f0', margin: '3px 0 6px' }}>
                    <div style={{ width: `${node.cpu}%`, height: '100%', borderRadius: '2px', backgroundColor: statusColor }} />
                  </div>

                  {/* RAM bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    <span>RAM</span>
                    <span style={{ fontWeight: 600 }}>{node.ram}%</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '2px', backgroundColor: isDark ? '#334155' : '#e2e8f0', margin: '3px 0 0' }}>
                    <div style={{ width: `${node.ram}%`, height: '100%', borderRadius: '2px', backgroundColor: node.ram > 90 ? '#eab308' : '#3b82f6' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Node Detailed Blade Inspector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '14px',
              padding: '12px 18px',
              borderRadius: '8px',
              backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
              fontSize: '0.84rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={18} color="#df7e30" />
              <span style={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                Selected: {activeNodeData.name}
              </span>
              <NeuronBadge
                variant={activeNodeData.status === 'warning' ? 'warning' : activeNodeData.status === 'scaling' ? 'primary' : 'success'}
                size="sm"
              >
                {activeNodeData.status.toUpperCase()}
              </NeuronBadge>
            </div>
            <div style={{ display: 'flex', gap: '16px', color: isDark ? '#94a3b8' : '#64748b' }}>
              <span>Cores Allocated: <strong>16 vCPU</strong> ({activeNodeData.cpu}%)</span>
              <span>Memory RSS: <strong>64 GB</strong> ({activeNodeData.ram}%)</span>
              <span>Active Pods: <strong>{activeNodeData.pods}</strong></span>
            </div>
            <NeuronButton
              variant="outline"
              size="sm"
              onClick={() => handleActionClick(`Drain & Evict Node ${activeNodeData.name}`, `Perintah kubectl drain dipersiapkan untuk memindahkan ${activeNodeData.pods} pods ke node lain.`)}
            >
              Cordon / Drain Node
            </NeuronButton>
          </div>
        </div>
      </NeuronCard>

      {/* ── Latency Percentile Distribution Density Curve & Services Mesh ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '20px',
        }}
      >
        {/* Latency Percentile Density Curve */}
        <NeuronCard
          title={isId ? 'Distribusi Latensi P50 / P90 / P99' : 'Latency Percentile Distribution Density Curve'}
          subtitle={isId ? 'Batas ambang SLA breach ditetapkan pada 50 milidetik' : 'P50 (14.2ms) • P90 (26.8ms) • P99 (38.2ms) vs 50ms SLA ceiling'}
        >
          <div style={{ marginTop: '12px' }}>
            <svg
              viewBox="0 0 480 180"
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                borderRadius: '8px',
                border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              }}
            >
              <defs>
                <linearGradient id="latencyAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#df7e30" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#df7e30" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="40" y1="140" x2="450" y2="140" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />
              <line x1="40" y1="90" x2="450" y2="90" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="3,3" />
              <line x1="40" y1="40" x2="450" y2="40" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="3,3" />

              {/* Density Curve Area & Line */}
              <path
                d="M 50 140 C 90 138, 110 30, 140 30 C 180 30, 220 115, 300 130 C 360 136, 420 139, 440 140 Z"
                fill="url(#latencyAreaGrad)"
              />
              <path
                d="M 50 140 C 90 138, 110 30, 140 30 C 180 30, 220 115, 300 130 C 360 136, 420 139, 440 140"
                fill="none"
                stroke="#df7e30"
                strokeWidth="2.5"
              />

              {/* Percentile Markers */}
              {/* P50 Marker at ~140, 30 */}
              <line x1="140" y1="30" x2="140" y2="140" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="140" cy="30" r="4" fill="#10b981" />
              <text x="140" y="22" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="700">P50 14.2ms</text>

              {/* P90 Marker at ~260, 122 */}
              <line x1="260" y1="122" x2="260" y2="140" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="260" cy="122" r="4" fill="#3b82f6" />
              <text x="260" y="114" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="700">P90 26.8ms</text>

              {/* P99 Marker at ~350, 134 */}
              <line x1="350" y1="134" x2="350" y2="140" stroke="#df7e30" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="350" cy="134" r="4" fill="#df7e30" />
              <text x="350" y="126" textAnchor="middle" fill="#df7e30" fontSize="9" fontWeight="700">P99 38.2ms</text>

              {/* SLA Limit line at 400 (50ms) */}
              <line x1="400" y1="20" x2="400" y2="140" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="400" y="15" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">50ms SLA Ceiling</text>

              {/* X Axis Labels */}
              <text x="50" y="154" fill={isDark ? '#64748b' : '#94a3b8'} fontSize="9">0ms</text>
              <text x="140" y="154" textAnchor="middle" fill={isDark ? '#64748b' : '#94a3b8'} fontSize="9">15ms</text>
              <text x="260" y="154" textAnchor="middle" fill={isDark ? '#64748b' : '#94a3b8'} fontSize="9">30ms</text>
              <text x="400" y="154" textAnchor="middle" fill={isDark ? '#64748b' : '#94a3b8'} fontSize="9">50ms</text>
            </svg>
          </div>
        </NeuronCard>

        {/* Microservices Mesh Topology */}
        <NeuronCard
          title={isId ? 'Topologi Jala Mikroservis' : 'Microservices Mesh Health & RPS'}
          subtitle={isId ? 'RPS, latensi P99, dan persentase error rate per servis' : 'Service mesh communication health and error rate limits'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {servicesMesh.map((srv, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                  border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a', fontFamily: 'monospace' }}>
                    {srv.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    RPS: <strong>{srv.rps}</strong> • Error: <strong style={{ color: srv.errorRate === '0.000%' ? '#10b981' : '#df7e30' }}>{srv.errorRate}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#df7e30' }}>{srv.p99}</div>
                  <NeuronBadge variant={srv.status === 'Healthy' ? 'success' : 'warning'} size="sm">
                    {srv.status}
                  </NeuronBadge>
                </div>
              </div>
            ))}
          </div>
        </NeuronCard>
      </div>

      {/* ── Monospace Terminal Live Log Stream ── */}
      <NeuronCard
        title={isId ? 'Aliran Log Terminal Waktu Nyata (Live Monospace Stream)' : 'Real-Time Monospace Terminal Stream & Cluster Events'}
        subtitle={isId ? 'Log teragregasi dari Fluentbit & Prometheus daemonsets' : 'High-frequency structured operational events from production daemonsets'}
      >
        <div
          style={{
            marginTop: '12px',
            backgroundColor: '#090d16',
            padding: '14px 18px',
            borderRadius: '8px',
            border: '1px solid #1e293b',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#cbd5e1',
            lineHeight: 1.6,
          }}
        >
          {terminalLogs.map((log, idx) => {
            let badgeColor = '#3b82f6';
            if (log.level === 'WARN') badgeColor = '#eab308';
            if (log.level === 'HEARTBEAT') badgeColor = '#10b981';

            return (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '6px' }}>
                <span style={{ color: '#64748b', fontSize: '0.74rem' }}>[{log.time}]</span>
                <span style={{ color: badgeColor, fontWeight: 700, fontSize: '0.74rem' }}>{log.level}</span>
                <span style={{ flex: 1 }}>{log.msg}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <NeuronButton
            variant="ghost"
            size="sm"
            onClick={() => handleActionClick('Unduh Dump Log', '10.000 baris log terakhir telah di-archive ke format .json.gz.')}
          >
            Export Log Dump
          </NeuronButton>
          <NeuronButton
            variant="outline"
            size="sm"
            onClick={() => handleActionClick('Buka Konsol Kubectl', 'Sesi terminal interaktif kubectl exec dimulai.')}
          >
            <Terminal size={14} style={{ marginRight: '6px' }} />
            Open Kubectl CLI
          </NeuronButton>
        </div>
      </NeuronCard>
    </div>
  );
}
