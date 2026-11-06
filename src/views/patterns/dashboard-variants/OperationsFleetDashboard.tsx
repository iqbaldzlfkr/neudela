import React, { useState } from 'react';
import NeuronCard from '../../../components/NeuronCard';
import NeuronBadge from '../../../components/NeuronBadge';
import NeuronButton from '../../../components/NeuronButton';
import NeuronProgress from '../../../components/NeuronProgress';
import {
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  BatteryCharging,
  Fuel,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  PackageCheck,
  Radio,
  Share2,
  ShieldAlert,
  ArrowUpRight,
  Box,
} from 'lucide-react';

interface OperationsFleetDashboardProps {
  isId: boolean;
  previewTheme: 'light' | 'dark';
  onTriggerModal?: (title: string, content: React.ReactNode) => void;
}

export default function OperationsFleetDashboard({
  isId,
  previewTheme,
  onTriggerModal,
}: OperationsFleetDashboardProps) {
  const isDark = previewTheme === 'dark';
  const [selectedHub, setSelectedHub] = useState<string>('central');

  const hubs = [
    { id: 'west', name: 'Hub West (SoCal)', load: 84, activeCouriers: 38, deliveries: 2140, status: 'Optimal', x: 70, y: 110 },
    { id: 'central', name: 'Hub Central (Midwest)', load: 96, activeCouriers: 62, deliveries: 3850, status: 'Peak Congestion', x: 220, y: 80 },
    { id: 'east', name: 'Hub East (Metro NY)', load: 78, activeCouriers: 44, deliveries: 2430, status: 'Optimal', x: 370, y: 95 },
    { id: 'south', name: 'Hub South (Texas DFW)', load: 65, activeCouriers: 26, deliveries: 1680, status: 'Normal', x: 200, y: 180 },
  ];

  const hourlyThroughput = [
    { hour: '06:00', pkgs: 4200, capacity: 18000 },
    { hour: '08:00', pkgs: 11800, capacity: 18000 },
    { hour: '10:00', pkgs: 17400, capacity: 18000, peak: true },
    { hour: '12:00', pkgs: 14600, capacity: 18000 },
    { hour: '14:00', pkgs: 16900, capacity: 18000, peak: true },
    { hour: '16:00', pkgs: 13200, capacity: 18000 },
    { hour: '18:00', pkgs: 9800, capacity: 18000 },
    { hour: '20:00', pkgs: 6400, capacity: 18000 },
  ];

  const fleetVehicles = [
    {
      id: 'EV-104',
      type: 'Sprinter EV Cargo',
      driver: 'Iqbal Dzulfikar',
      battery: 78,
      speed: '44 mph',
      status: 'On Route',
      dropsCompleted: 34,
      dropsTotal: 42,
      latLong: '34.0522° N, 118.2437° W',
      eta: '14:32 (On Time)',
    },
    {
      id: 'HG-088',
      type: 'Heavy Haul Rig 18W',
      driver: 'Marcus Vance',
      fuel: 62,
      speed: '58 mph',
      status: 'Interstate Transit',
      dropsCompleted: 2,
      dropsTotal: 4,
      latLong: '41.8781° N, 87.6298° W',
      eta: '16:45 (Transit)',
    },
    {
      id: 'DR-019',
      type: 'Autonomous Drone Pod',
      driver: 'AI Tele-pilot #4',
      battery: 42,
      speed: '32 mph',
      status: 'Priority Drop',
      dropsCompleted: 8,
      dropsTotal: 10,
      latLong: '40.7128° N, 74.0060° W',
      eta: '13:58 (Urgent)',
    },
    {
      id: 'EV-215',
      type: 'Urban Cargo E-Bike',
      driver: 'Rian Pratama',
      battery: 91,
      speed: '18 mph',
      status: 'On Route',
      dropsCompleted: 19,
      dropsTotal: 25,
      latLong: '37.7749° N, 122.4194° W',
      eta: '14:10 (On Time)',
    },
  ];

  const exceptionItems = [
    {
      trackingId: 'TRK-98214-X',
      recipient: 'Apex BioLabs Corp',
      dest: 'Suite 400, Cambridge MA',
      issue: 'Cold-chain temp alert (+2.4°C drift)',
      severity: 'critical',
      slaRemaining: '00:18:40',
      action: 'Emergency Re-route',
    },
    {
      trackingId: 'TRK-88102-M',
      recipient: 'Quantum Robotics Inc',
      dest: 'Dock 2B, Austin TX',
      issue: 'Gate security access token expired',
      severity: 'warning',
      slaRemaining: '01:04:12',
      action: 'Request Gate Pass',
    },
    {
      trackingId: 'TRK-77491-K',
      recipient: 'Sarah Jenkins',
      dest: '344 Riverside Dr, NYC',
      issue: 'Incorrect postal code routing pin',
      severity: 'info',
      slaRemaining: '02:30:00',
      action: 'Auto-correct Geocode',
    },
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
            <div>STATUS: ACTION_EXECUTED</div>
            <div>TIMESTAMP: {new Date().toISOString()}</div>
            <div>DISPATCH_OPERATOR: OpsCommand_Auto</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
            <NeuronButton variant="primary" size="sm">
              Confirm Resolution
            </NeuronButton>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* ── Operational Status Pulse Bar ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          {
            label: isId ? 'Ketepatan Waktu Armada' : 'On-Time Dispatch Rate',
            value: '98.4%',
            delta: '+1.2% vs target',
            positive: true,
            icon: Clock,
            color: '#10b981',
          },
          {
            label: isId ? 'Kurir Aktif Bertugas' : 'Active Field Couriers',
            value: '170 / 185',
            delta: '92% utilization',
            positive: true,
            icon: Truck,
            color: '#df7e30',
          },
          {
            label: isId ? 'Pengiriman Selesai Hari Ini' : 'Deliveries Fulfilled Today',
            value: '8,420 pkgs',
            delta: 'Pacing +680 ahead',
            positive: true,
            icon: PackageCheck,
            color: '#3b82f6',
          },
          {
            label: isId ? 'Pengecualian / Perlu Tindakan' : 'Active Exceptions Flagged',
            value: '3 Pending',
            delta: '2 cold-chain alerts',
            positive: false,
            icon: AlertTriangle,
            color: '#ef4444',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
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
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: stat.positive ? '#10b981' : '#ef4444',
                  }}
                >
                  {stat.delta}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Visual Centerpiece: Hub Network Route Visualizer & Hourly Sorting Capacity ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '20px',
        }}
      >
        {/* Hub Network SVG Topology Grid */}
        <NeuronCard
          title={isId ? 'Topologi Jaringan Hub Regional' : 'Regional Hub Route Dispatch Network'}
          subtitle={isId ? 'Status kapasitas sortasi dan rute transfer inter-hub aktif' : 'Live sortation load and inter-hub freight transit corridor'}
        >
          <div style={{ position: 'relative', marginTop: '10px' }}>
            {/* SVG Visualizer */}
            <svg
              viewBox="0 0 460 240"
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                borderRadius: '10px',
                border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              }}
            >
              <defs>
                {/* Glowing linear gradient for transit corridors */}
                <linearGradient id="fleetRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#df7e30" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>

                <filter id="hubGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Background Coordinates */}
              <g stroke={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} strokeWidth="1">
                <line x1="0" y1="60" x2="460" y2="60" />
                <line x1="0" y1="120" x2="460" y2="120" />
                <line x1="0" y1="180" x2="460" y2="180" />
                <line x1="115" y1="0" x2="115" y2="240" />
                <line x1="230" y1="0" x2="230" y2="240" />
                <line x1="345" y1="0" x2="345" y2="240" />
              </g>

              {/* Inter-Hub Transit Corridors */}
              <line
                x1="70"
                y1="110"
                x2="220"
                y2="80"
                stroke="url(#fleetRouteGradient)"
                strokeWidth="3"
                strokeDasharray="6,4"
              />
              <line
                x1="220"
                y1="80"
                x2="370"
                y2="95"
                stroke="url(#fleetRouteGradient)"
                strokeWidth="3"
                strokeDasharray="6,4"
              />
              <line
                x1="70"
                y1="110"
                x2="200"
                y2="180"
                stroke="#df7e30"
                strokeWidth="2.5"
                strokeOpacity="0.6"
              />
              <line
                x1="220"
                y1="80"
                x2="200"
                y2="180"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeOpacity="0.7"
              />
              <line
                x1="200"
                y1="180"
                x2="370"
                y2="95"
                stroke="#10b981"
                strokeWidth="2"
                strokeOpacity="0.5"
                strokeDasharray="4,4"
              />

              {/* Animated Transit Pulse dots */}
              <circle cx="145" cy="95" r="4.5" fill="#df7e30">
                <animate
                  attributeName="cx"
                  from="70"
                  to="220"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  from="110"
                  to="80"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle cx="295" cy="87" r="4.5" fill="#10b981">
                <animate
                  attributeName="cx"
                  from="220"
                  to="370"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  from="80"
                  to="95"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Hub Nodes */}
              {hubs.map((hub) => {
                const isSelected = selectedHub === hub.id;
                const nodeColor =
                  hub.load > 90 ? '#ef4444' : hub.load > 75 ? '#df7e30' : '#10b981';

                return (
                  <g
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Outer ring */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? 20 : 16}
                      fill={nodeColor}
                      fillOpacity={isSelected ? 0.25 : 0.15}
                      stroke={nodeColor}
                      strokeWidth={isSelected ? 3 : 2}
                      filter="url(#hubGlow)"
                    />
                    {/* Inner core */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? 8 : 6}
                      fill={nodeColor}
                    />

                    {/* Label */}
                    <text
                      x={hub.x}
                      y={hub.y - 24}
                      textAnchor="middle"
                      fill={isDark ? '#f8fafc' : '#0f172a'}
                      fontSize="10"
                      fontWeight="700"
                    >
                      {hub.name}
                    </text>
                    <text
                      x={hub.x}
                      y={hub.y + 30}
                      textAnchor="middle"
                      fill={isDark ? '#94a3b8' : '#64748b'}
                      fontSize="9"
                      fontWeight="600"
                    >
                      {hub.load}% Load ({hub.deliveries} drops)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Hub Quick Status Overlay */}
            {(() => {
              const activeHubObj = hubs.find((h) => h.id === selectedHub) || hubs[1];
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '12px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} color="#df7e30" />
                    <span style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {activeHubObj.name}
                    </span>
                    <NeuronBadge
                      variant={
                        activeHubObj.load > 90 ? 'danger' : activeHubObj.load > 75 ? 'warning' : 'success'
                      }
                      size="sm"
                    >
                      {activeHubObj.status}
                    </NeuronBadge>
                  </div>
                  <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.8rem' }}>
                    <strong>{activeHubObj.activeCouriers}</strong> active vans • Capacity: <strong>{activeHubObj.load}%</strong>
                  </div>
                </div>
              );
            })()}
          </div>
        </NeuronCard>

        {/* Hourly Sorting Histogram */}
        <NeuronCard
          title={isId ? 'Volume Sortasi Per Jam' : 'Hourly Sortation Throughput'}
          subtitle={isId ? 'Kapasitas maksimal 18.000 paket/jam' : 'Peak belt sorting limit: 18,000 pkgs/hr'}
        >
          <div style={{ marginTop: '12px' }}>
            {/* Histogram bars */}
            <div
              style={{
                height: '180px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingBottom: '24px',
                borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                position: 'relative',
              }}
            >
              {/* Ceiling threshold guideline */}
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: 0,
                  right: 0,
                  borderTop: '1px dashed #ef4444',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontSize: '0.68rem',
                    color: '#ef4444',
                    fontWeight: 600,
                    padding: '2px 6px',
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    marginTop: '-10px',
                    borderRadius: '4px',
                  }}
                >
                  Limit 18k / hr
                </span>
              </div>

              {hourlyThroughput.map((slot, idx) => {
                const heightPercent = (slot.pkgs / slot.capacity) * 100;
                const isPeak = slot.peak;

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                      gap: '6px',
                      height: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: isPeak ? '#df7e30' : isDark ? '#94a3b8' : '#64748b',
                      }}
                    >
                      {(slot.pkgs / 1000).toFixed(1)}k
                    </span>
                    <div
                      style={{
                        width: '26px',
                        height: `${heightPercent}%`,
                        borderRadius: '4px 4px 0 0',
                        backgroundColor: isPeak
                          ? '#df7e30'
                          : isDark
                          ? '#3b82f6'
                          : '#60a5fa',
                        transition: 'height 0.4s ease',
                        boxShadow: isPeak ? '0 0 10px rgba(223, 126, 48, 0.4)' : 'none',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: isDark ? '#64748b' : '#94a3b8',
                        position: 'absolute',
                        bottom: '4px',
                      }}
                    >
                      {slot.hour}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
                fontSize: '0.78rem',
                color: isDark ? '#94a3b8' : '#64748b',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    backgroundColor: '#df7e30',
                  }}
                />
                Peak Wave (10:00 & 14:00)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    backgroundColor: '#3b82f6',
                  }}
                />
                Standard Belt Sorting
              </div>
            </div>
          </div>
        </NeuronCard>
      </div>

      {/* ── Active Fleet Units Telemetry Grid ── */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>
              {isId ? 'Telemetri Unit Armada Lapangan' : 'Live Field Fleet Telemetry'}
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>
              {isId ? 'Status baterai, kecepatan jelajah, dan progres rute pengiriman' : 'Battery charge, cruising velocity, and active drop progression'}
            </p>
          </div>
          <NeuronButton
            variant="ghost"
            size="sm"
            onClick={() => handleActionClick('Filter Armada', 'Filter rute disesuaikan dengan zona metropolitan barat.')}
          >
            <SlidersHorizontal size={14} style={{ marginRight: '6px' }} />
            Filter Fleet
          </NeuronButton>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {fleetVehicles.map((vehicle) => {
            const progress = (vehicle.dropsCompleted / vehicle.dropsTotal) * 100;
            const hasBattery = vehicle.battery !== undefined;

            return (
              <div
                key={vehicle.id}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(223, 126, 48, 0.1)',
                        color: '#df7e30',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      {vehicle.id}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
                        {vehicle.type}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                        Driver: {vehicle.driver}
                      </div>
                    </div>
                  </div>
                  <NeuronBadge
                    variant={vehicle.status === 'Priority Drop' ? 'danger' : 'info'}
                    size="sm"
                  >
                    {vehicle.status}
                  </NeuronBadge>
                </div>

                {/* Energy & Speed Indicators */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: isDark ? '#0f172a' : '#f8fafc',
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {hasBattery ? (
                      <BatteryCharging size={15} color={vehicle.battery && vehicle.battery > 50 ? '#10b981' : '#df7e30'} />
                    ) : (
                      <Fuel size={15} color="#3b82f6" />
                    )}
                    <span style={{ fontWeight: 600 }}>
                      {hasBattery ? `${vehicle.battery}% Charge` : `${vehicle.fuel}% Fuel`}
                    </span>
                  </div>
                  <div style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                    Speed: <strong style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>{vehicle.speed}</strong>
                  </div>
                </div>

                {/* Drop progress bar */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.74rem',
                      marginBottom: '4px',
                      color: isDark ? '#94a3b8' : '#64748b',
                    }}
                  >
                    <span>Delivery Drops</span>
                    <span>
                      <strong>{vehicle.dropsCompleted}</strong> / {vehicle.dropsTotal} completed ({Math.round(progress)}%)
                    </span>
                  </div>
                  <NeuronProgress value={progress} color="primary" height={6} />
                </div>

                {/* Footer ETA and Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                    paddingTop: '10px',
                    fontSize: '0.76rem',
                  }}
                >
                  <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                    ETA: <strong style={{ color: '#10b981' }}>{vehicle.eta}</strong>
                  </span>
                  <button
                    onClick={() =>
                      handleActionClick(
                        `Detail Armada ${vehicle.id}`,
                        `Koordinat GPS: ${vehicle.latLong} | Pengemudi: ${vehicle.driver} | Sisa Drop: ${
                          vehicle.dropsTotal - vehicle.dropsCompleted
                        }`
                      )
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#df7e30',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0,
                    }}
                  >
                    Track <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Delivery Exceptions Triage Station ── */}
      <NeuronCard
        title={isId ? 'Stasiun Pengecualian & Insiden Operasional' : 'Active Delivery Exception Triage Station'}
        subtitle={isId ? 'Tindakan manual diperlukan untuk paket dengan anomali rute atau suhu' : 'Immediate operational resolution required for cold-chain drift or access restriction'}
      >
        <div style={{ overflowX: 'auto', marginTop: '12px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.85rem',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: `2px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  color: isDark ? '#94a3b8' : '#64748b',
                  fontSize: '0.76rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                <th style={{ padding: '10px 14px' }}>Tracking ID</th>
                <th style={{ padding: '10px 14px' }}>Recipient & Destination</th>
                <th style={{ padding: '10px 14px' }}>Flagged Issue</th>
                <th style={{ padding: '10px 14px' }}>SLA Timer</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Resolution Action</th>
              </tr>
            </thead>
            <tbody>
              {exceptionItems.map((item, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}`,
                  }}
                >
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#df7e30' }}>
                    {item.trackingId}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>
                      {item.recipient}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      {item.dest}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <NeuronBadge
                      variant={item.severity === 'critical' ? 'danger' : item.severity === 'warning' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {item.issue}
                    </NeuronBadge>
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: item.severity === 'critical' ? '#ef4444' : isDark ? '#f8fafc' : '#0f172a' }}>
                    {item.slaRemaining}
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <NeuronButton
                      variant={item.severity === 'critical' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() =>
                        handleActionClick(
                          `Resolusi ${item.trackingId}`,
                          `Tindakan: ${item.action} untuk penerima ${item.recipient}. Hub pengendali lapangan telah diinstruksikan.`
                        )
                      }
                    >
                      {item.action}
                    </NeuronButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeuronCard>
    </div>
  );
}
