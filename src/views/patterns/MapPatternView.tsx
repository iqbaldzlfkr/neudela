import React, { useState, useMemo, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge, { NeuronBadgeVariant } from '../../components/NeuronBadge';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronSelect from '../../components/NeuronSelect';
import {
  MapPin,
  Navigation,
  Compass,
  Truck,
  Search,
  Check,
  Copy,
  Eye,
  X,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Phone,
  MessageSquare,
  Clock,
  Crosshair,
  Building,
  Flame,
  Activity,
  LocateFixed,
  Layers,
  Plus,
  Minus,
  FastForward,
  Loader2,
} from 'lucide-react';

interface MapPatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export type MapVariantId =
  | 'order-tracking'
  | 'pinpoint-picker'
  | 'store-locator'
  | 'geofence-builder'
  | 'density-heatmap';

interface VariantMeta {
  id: MapVariantId;
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

export const MAP_VARIANTS: VariantMeta[] = [
  {
    id: 'order-tracking',
    nameEn: 'Live Order & Fleet Delivery Tracking',
    nameId: 'Pelacakan Pesanan & Armada Pengiriman Real-Time',
    taglineEn: 'Real-time delivery route visualization on Leaflet with animated vehicle polyline, pulsing courier beacon, and floating ETA order sheet.',
    taglineId: 'Visualisasi rute pengiriman langsung di atas peta Leaflet dengan animasi kurir bergerak, indikator sinyal, dan kartu status pesanan.',
    descEn: 'Logistics and on-demand delivery interface powered by OpenStreetMap/CARTO tiles. Features an animated courier vehicle moving along real road waypoints, live speed controls, real-time ETA countdown, and a floating glassmorphic driver profile card with instant Call/Chat CTAs.',
    descId: 'Antarmuka logistik pengiriman barang dan kurir instan di atas peta jalan nyata. Dilengkapi kendaraan kurir yang bergerak mulus di atas rute jalan, kontrol kecepatan simulasi, estimasi waktu tiba (ETA) langsung, kartu profil pengemudi, dan alur tahapan pengantaran.',
    tags: ['Leaflet Map', 'Live Polyline', 'Moving Courier Beacon', 'ETA Countdown', 'Driver Sheet'],
    bestForEn: 'Food Delivery, E-Commerce Express, Freight Logistics, Courier Dispatch',
    bestForId: 'Pesan Antar Makanan, Ekspedisi E-Commerce, Armada Logistik, Dispatch Kurir',
    badge: 'Fleet & Logistics',
    accentColor: '#df7e30',
  },
  {
    id: 'pinpoint-picker',
    nameEn: 'Pinpoint Address Picker & Reverse Geocoding',
    nameId: 'Penempatan Titik Alamat & Geocoding Presisi',
    taglineEn: 'Center-locked bouncing pinpoint marker with real-time coordinate resolver, GPS button, and detailed street address confirmation card.',
    taglineId: 'Pin tengah melompat dinamis saat peta digeser, dilengkapi penentu koordinat GPS instan, dan kartu konfirmasi alamat jalan lengkap.',
    descEn: 'High-precision address selection architecture for checkout and dispatching. The center pin remains anchored while the real map is panned. On drag release, the coordinates resolve to human-readable street addresses with landmark presets and courier note fields.',
    descId: 'Arsitektur penentuan alamat presisi tinggi untuk checkout dan penjemputan barang. Pin tetap berada di tengah saat peta digeser, dan secara otomatis mendeteksi nama jalan, kelurahan, kode pos, serta koordinat Lat/Lng saat peta berhenti.',
    tags: ['Center Bounce Pin', 'Reverse Geocoding', 'GPS Locate', 'FlyTo Animation', 'Courier Notes'],
    bestForEn: 'Checkout Delivery Address, Ride Hailing Pickups, Warehouse Site Setting',
    bestForId: 'Alamat Pengiriman Checkout, Titik Jemput Penumpang, Penentuan Lokasi Gudang',
    badge: 'Geolocation & Address',
    accentColor: '#10b981',
  },
  {
    id: 'store-locator',
    nameEn: 'Multi-Branch Store & Asset Locator',
    nameId: 'Pencarian Cabang & Aset Multi-Titik',
    taglineEn: 'Split-view branch finder featuring synchronized listing cards, distance matrix, status badges, and interactive map popup InfoWindows.',
    taglineId: 'Pencari cabang dua panel tersinkronisasi dengan kartu daftar jarak km, badge jam operasional, dan kartu InfoWindow pop-up di peta.',
    descEn: 'Enterprise retail & facility locator. Left pane displays a searchable list of branches filtered by operating amenities and distance. Clicking any branch card automatically centers the map pin with flyTo and pops open an InfoWindow with photos, phone number, and directions.',
    descId: 'Pencari cabang ritel dan fasilitas kebugaran enterprise. Panel kiri menampilkan daftar cabang dengan filter fasilitas dan jarak terdekat. Mengklik kartu cabang akan mengarahkan kamera peta ke titik lokasi dan memunculkan pop-up detail cabang.',
    tags: ['Split Master-Detail', 'Leaflet Popups', 'Distance Matrix', 'Map FlyTo', 'Facility Filters'],
    bestForEn: 'Retail Store Finders, Gym Chains, Banking ATMs, Healthcare Clinics',
    bestForId: 'Pencarian Gerai Ritel, Jaringan Gym/Klub, ATM Bank, Klinik Kesehatan',
    badge: 'Retail & Facilities',
    accentColor: '#3b82f6',
  },
  {
    id: 'geofence-builder',
    nameEn: 'Geofence & Service Coverage Manager',
    nameId: 'Manajemen Zona Layanan & Radius Geofence',
    taglineEn: 'Multi-tier concentric radial zones and polygon boundaries with dynamic tariff calculation and delivery eligibility resolver.',
    taglineId: 'Zonasi wilayah jangkauan bertingkat dan poligon batas area dengan kalkulasi tarif ongkir dinamis dan deteksi kelayakan pengiriman.',
    descEn: 'Administrative boundary editor for restaurant and logistics hubs. Visualizes tiered coverage zones (Zone 1 Free, Zone 2 Standard, Zone 3 Extended). Clicking anywhere on the real map calculates instant geodesic distance and delivery tariffs.',
    descId: 'Editor zona operasional untuk restoran dan hub logistik. Menampilkan visualisasi area bertingkat (Zona 1 Gratis, Zona 2 Standar, Zona 3 Luar Kota). Mengklik area manapun di peta akan menghitung jarak asli dan tarif ongkir secara instan.',
    tags: ['Multi-Tier Circles', 'Geodesic Distance', 'Dynamic Tariffs', 'Interactive Map Click', 'Eligibility Check'],
    bestForEn: 'Food Delivery Radii, Franchise Territories, Service Dispatch Boundaries',
    bestForId: 'Radius Pengantaran Restoran, Teritori Waralaba, Batas Layanan Teknisi',
    badge: 'Coverage & Operations',
    accentColor: '#8b5cf6',
  },
  {
    id: 'density-heatmap',
    nameEn: 'Geospatial Heatmap & Fleet Analytics',
    nameId: 'Peta Kepadatan Heatmap & Analitik Armada',
    taglineEn: 'Tactical dark-canvas density visualization displaying order surge hotspots, fleet capacity, and time-lapse scrubber playback.',
    taglineId: 'Visualisasi kepadatan peta gelap taktis menampilkan titik lonjakan pesanan, utilitas armada, dan pemutar garis waktu lonjakan.',
    descEn: 'Executive dispatch and telemetry intelligence dashboard using CARTO Dark Matter tiles. Renders high-density order clusters using radial color heat gradients across Jakarta. Includes an hourly timeline scrubber to analyze peak commute and lunch rushes.',
    descId: 'Dashboard intelijen operasional armada dan pesanan bervolume tinggi dengan peta gelap taktis CARTO. Menampilkan konsentrasi pesanan dengan gradien warna panas di atas jalanan kota. Dilengkapi pemutar waktu jam operasional harian.',
    tags: ['CARTO Dark Matter', 'Radial Heat Circles', 'Hourly Scrubber', 'Fleet Telemetry', 'Surge Multiplier'],
    bestForEn: 'Urban Mobility, Emergency Dispatch, High-Volume E-Commerce Surge, IoT Telematics',
    bestForId: 'Mobilitas Urban, Dispatch Darurat, Lonjakan E-Commerce Massal, Telemetri IoT',
    badge: 'Telemetry & Big Data',
    accentColor: '#f43f5e',
  },
];

// Helper: Common CARTO Tile URL with API Key support & OpenStreetMap fallback
const CARTO_API_KEY: string =
  ((import.meta as any).env?.VITE_CARTO_API_KEY as string) || 'cb1_51os_1_e85c2753658e8de952958fc0';

const TILE_CARTO_VOYAGER = CARTO_API_KEY
  ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`
  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const TILE_CARTO_DARK = CARTO_API_KEY
  ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`
  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const TILE_ATTRIBUTION = CARTO_API_KEY
  ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
  : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Dark Mode Hook (Syncs with Neudela Global Theme & Prop)
// ─────────────────────────────────────────────────────────────────────────────

export function useIsDarkMode(propDarkMode?: boolean) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof propDarkMode === 'boolean') return propDarkMode;
    return typeof document !== 'undefined' && document.body.classList.contains('dark-theme');
  });

  useEffect(() => {
    if (typeof propDarkMode === 'boolean') {
      setIsDark(propDarkMode);
      return;
    }
    const checkDark = () => {
      setIsDark(document.body.classList.contains('dark-theme'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [propDarkMode]);

  return isDark;
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Neudela Map Zoom Controls Component
// ─────────────────────────────────────────────────────────────────────────────

export function MapZoomControls({
  onZoomIn,
  onZoomOut,
  style,
  isId = false,
  isDark = false,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  style?: React.CSSProperties;
  isId?: boolean;
  isDark?: boolean;
}) {
  const iconColor = isDark ? '#ffffff' : '#0f172a';
  const bgColor = isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.96)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'var(--color-border)';
  const dividerColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'var(--color-border)';

  return (
    <div
      style={{
        position: 'absolute',
        right: 16,
        top: 86,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        background: bgColor,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: 4,
        boxShadow: isDark
          ? '0 8px 24px rgba(0, 0, 0, 0.55)'
          : 'var(--shadow-md, 0 4px 14px rgba(0, 0, 0, 0.12))',
        ...style,
      }}
    >
      <button
        type="button"
        aria-label="Zoom in"
        title={isId ? 'Perbesar peta' : 'Zoom in'}
        onClick={onZoomIn}
        style={{
          width: 34,
          height: 34,
          borderRadius: 7,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Plus size={18} strokeWidth={2.4} color={iconColor} />
      </button>

      <div style={{ height: 1, background: dividerColor, margin: '1px 3px' }} />

      <button
        type="button"
        aria-label="Zoom out"
        title={isId ? 'Perkecil peta' : 'Zoom out'}
        onClick={onZoomOut}
        style={{
          width: 34,
          height: 34,
          borderRadius: 7,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Minus size={18} strokeWidth={2.4} color={iconColor} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Visual Architecture Silhouette Component for Map Cards
// ─────────────────────────────────────────────────────────────────────────────

function MapMiniSilhouette({ id, accentColor, isDarkMode = false }: { id: MapVariantId; accentColor: string; isDarkMode?: boolean }) {
  return (
    <div
      style={{
        height: '116px',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* 1. Live Order & Fleet Delivery Tracking */}
      {id === 'order-tracking' && (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Base land */}
            <rect width="300" height="120" fill={isDarkMode ? '#0b1120' : '#f8fafc'} />

            {/* River / Water body */}
            <path
              d="M -10 102 Q 70 88 140 106 T 310 92"
              fill="none"
              stroke={isDarkMode ? '#0284c728' : '#e0f2fe'}
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M -10 102 Q 70 88 140 106 T 310 92"
              fill="none"
              stroke={isDarkMode ? '#38bdf840' : '#bae6fd'}
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Green park / Urban forest */}
            <rect
              x="16"
              y="12"
              width="56"
              height="40"
              rx="6"
              fill={isDarkMode ? '#064e3b30' : '#dcfce7'}
              stroke={isDarkMode ? '#05966950' : '#bbf7d0'}
              strokeWidth="1"
            />
            <circle cx="34" cy="30" r="5" fill={isDarkMode ? '#10b98150' : '#86efac'} />
            <circle cx="50" cy="24" r="7" fill={isDarkMode ? '#10b98140' : '#86efac'} />

            {/* City blocks / Building parcels */}
            <rect x="86" y="12" width="46" height="24" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="140" y="12" width="42" height="24" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="190" y="12" width="56" height="24" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="254" y="12" width="45" height="40" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />

            <rect x="16" y="62" width="56" height="24" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="86" y="52" width="46" height="34" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="140" y="52" width="42" height="34" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="190" y="52" width="56" height="34" rx="3" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />

            {/* Road network - Outer Casing */}
            <line x1="-10" y1="42" x2="310" y2="42" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="10" strokeLinecap="square" />
            <line x1="-10" y1="92" x2="310" y2="92" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="8" strokeLinecap="square" />
            <line x1="78" y1="-10" x2="78" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="10" strokeLinecap="square" />
            <line x1="135" y1="-10" x2="135" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="8" strokeLinecap="square" />
            <line x1="186" y1="-10" x2="186" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="10" strokeLinecap="square" />
            <line x1="248" y1="-10" x2="248" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="8" strokeLinecap="square" />

            {/* Road network - Inner Fill */}
            <line x1="-10" y1="42" x2="310" y2="42" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="8" strokeLinecap="square" />
            <line x1="-10" y1="92" x2="310" y2="92" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="6" strokeLinecap="square" />
            <line x1="78" y1="-10" x2="78" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="8" strokeLinecap="square" />
            <line x1="135" y1="-10" x2="135" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="6" strokeLinecap="square" />
            <line x1="186" y1="-10" x2="186" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="8" strokeLinecap="square" />
            <line x1="248" y1="-10" x2="248" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="6" strokeLinecap="square" />

            {/* Route Underglow */}
            <path
              d="M 38 92 L 72 92 Q 78 92 78 86 L 78 48 Q 78 42 84 42 L 180 42 Q 186 42 186 48 L 186 78"
              fill="none"
              stroke={accentColor}
              strokeWidth="8"
              opacity={isDarkMode ? 0.35 : 0.22}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active Delivery Route Polyline */}
            <path
              d="M 38 92 L 72 92 Q 78 92 78 86 L 78 48 Q 78 42 84 42 L 180 42 Q 186 42 186 48 L 186 78"
              fill="none"
              stroke={accentColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Traveled route path dash overlay */}
            <path
              d="M 126 42 L 180 42 Q 186 42 186 48 L 186 78"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="4 3"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Origin Node (Kitchen / Hub) */}
            <circle cx="38" cy="92" r="8" fill="#10b98125" />
            <circle cx="38" cy="92" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.8" />

            {/* Destination Node (Drop-off Pin) */}
            <circle cx="186" cy="78" r="8" fill="#ef444425" />
            <circle cx="186" cy="78" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.8" />
          </svg>

          {/* Courier Puck with Moving Glow */}
          <div
            style={{
              position: 'absolute',
              left: '42%',
              top: '35%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: accentColor,
                border: '2px solid #ffffff',
                boxShadow: `0 0 0 5px ${accentColor}30, 0 4px 10px rgba(0,0,0,0.25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Truck size={11} strokeWidth={2.5} />
            </div>
          </div>

          {/* Floating ETA Live Sheet Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 10,
              background: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid var(--color-border)',
              borderRadius: 20,
              padding: '3px 9px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              zIndex: 4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px #10b981' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-primary)' }}>ETA: 8 mins</span>
            <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>· 3.2 km</span>
          </div>

          {/* Mini Real Map Indicator */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontSize: '8.5px',
              fontWeight: 700,
              letterSpacing: '0.3px',
              color: isDarkMode ? '#94a3b8' : '#64748b',
              background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.85)',
              padding: '2px 6px',
              borderRadius: 4,
              border: '1px solid var(--color-border)',
              zIndex: 4,
            }}
          >
            CARTO Voyager
          </div>
        </div>
      )}

      {/* 2. Pinpoint Address Picker & Reverse Geocoding */}
      {id === 'pinpoint-picker' && (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Base land */}
            <rect width="300" height="120" fill={isDarkMode ? '#0b1120' : '#f8fafc'} />

            {/* City blocks in 4 quadrants */}
            <rect x="14" y="10" width="118" height="38" rx="4" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="168" y="10" width="118" height="38" rx="4" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="14" y="72" width="118" height="38" rx="4" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />
            <rect x="168" y="72" width="118" height="38" rx="4" fill={isDarkMode ? '#1e293b' : '#f1f5f9'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />

            {/* Building parcels within blocks */}
            <rect x="22" y="16" width="30" height="26" rx="2" fill={isDarkMode ? '#334155' : '#e2e8f0'} opacity="0.6" />
            <rect x="60" y="16" width="64" height="26" rx="2" fill={isDarkMode ? '#334155' : '#e2e8f0'} opacity="0.5" />
            <rect x="176" y="16" width="48" height="26" rx="2" fill={isDarkMode ? '#334155' : '#e2e8f0'} opacity="0.5" />
            <rect x="232" y="16" width="46" height="26" rx="2" fill={isDarkMode ? '#334155' : '#e2e8f0'} opacity="0.6" />

            {/* Major Intersecting Avenues */}
            <line x1="-10" y1="60" x2="310" y2="60" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="14" />
            <line x1="-10" y1="60" x2="310" y2="60" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="10" />

            <line x1="150" y1="-10" x2="150" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="14" />
            <line x1="150" y1="-10" x2="150" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="10" />

            {/* Center Intersection Roundabout */}
            <circle cx="150" cy="60" r="18" fill={isDarkMode ? '#1e293b' : '#ffffff'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="2.5" />
            <circle cx="150" cy="60" r="12" fill={isDarkMode ? '#0f172a' : '#f8fafc'} stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="1" />

            {/* Center Target Geofence Ring */}
            <circle cx="150" cy="60" r="28" fill={`${accentColor}10`} stroke={accentColor} strokeWidth="1.4" strokeDasharray="4 3" />
            {/* Ground Shadow for Pin */}
            <ellipse cx="150" cy="61" rx="8" ry="3" fill="rgba(0,0,0,0.22)" />
          </svg>

          {/* Elevated Pinpoint Teardrop Marker */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '46%',
              transform: 'translate(-50%, -100%)',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50% 50% 50% 0',
                background: accentColor,
                transform: 'rotate(-45deg)',
                border: '2px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffffff', transform: 'rotate(45deg)' }} />
            </div>
            <div style={{ width: 2, height: 4, background: accentColor, marginTop: -1 }} />
          </div>

          {/* Floating Address Card */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 10,
              right: 10,
              background: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              zIndex: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
              <MapPin size={11} color={accentColor} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                SCBD Lot 8, Senopati
              </span>
            </div>
            <span style={{ fontSize: '8.5px', fontWeight: 700, color: accentColor, background: `${accentColor}18`, padding: '1px 5px', borderRadius: 4, flexShrink: 0 }}>
              Drag to Adjust
            </span>
          </div>
        </div>
      )}

      {/* 3. Multi-Branch Store & Asset Locator */}
      {id === 'store-locator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '95px 1fr', height: '100%', width: '100%', overflow: 'hidden' }}>
          {/* Left panel: List */}
          <div style={{ background: isDarkMode ? '#1e293b' : 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden' }}>
            <div style={{ height: 12, borderRadius: 3, background: isDarkMode ? '#334155' : 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 4px', gap: 3 }}>
              <Search size={7} color="var(--color-text-secondary)" />
              <div style={{ height: 3, width: '60%', borderRadius: 1.5, background: 'var(--color-text-secondary)', opacity: 0.5 }} />
            </div>

            {/* Active Store */}
            <div style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}50`, borderRadius: 4, padding: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <strong style={{ fontSize: '8px', color: 'var(--color-text-primary)' }}>Grand Ind.</strong>
                <span style={{ fontSize: '7px', fontWeight: 800, color: accentColor }}>0.8 km</span>
              </div>
              <div style={{ height: 2.5, width: '70%', borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.6 }} />
            </div>

            {/* Store 2 */}
            <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: '8px', color: 'var(--color-text-primary)', fontWeight: 600 }}>Senayan</span>
                <span style={{ fontSize: '7px', color: 'var(--color-text-secondary)' }}>2.4 km</span>
              </div>
              <div style={{ height: 2.5, width: '55%', borderRadius: 1, background: 'var(--color-text-secondary)', opacity: 0.4 }} />
            </div>
          </div>

          {/* Right panel: Map */}
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: isDarkMode ? '#0b1120' : '#f8fafc' }}>
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <line x1="-10" y1="45" x2="210" y2="45" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="7" />
              <line x1="-10" y1="45" x2="210" y2="45" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="5" />
              <line x1="90" y1="-10" x2="90" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="8" />
              <line x1="90" y1="-10" x2="90" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="6" />

              {/* Park */}
              <rect x="110" y="14" width="70" height="22" rx="3" fill={isDarkMode ? '#064e3b25' : '#dcfce7'} stroke={isDarkMode ? '#05966940' : '#bbf7d0'} strokeWidth="0.8" />
            </svg>

            {/* Active Selected Pin + Pop-up InfoWindow */}
            <div style={{ position: 'absolute', left: 45, top: 32, transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
              <div style={{ background: accentColor, color: '#ffffff', fontSize: '7.5px', fontWeight: 800, padding: '2px 6px', borderRadius: 4, boxShadow: '0 2px 6px rgba(0,0,0,0.25)', whiteSpace: 'nowrap' }}>
                0.8 km · Grand Ind.
              </div>
              <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `4px solid ${accentColor}` }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: accentColor, border: '2px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                <Building size={7} color="#ffffff" />
              </div>
            </div>

            {/* Neutral Store Pins */}
            <div style={{ position: 'absolute', left: 135, top: 72, width: 10, height: 10, borderRadius: '50%', background: isDarkMode ? '#64748b' : '#94a3b8', border: '1.5px solid #fff', zIndex: 2 }} />
            <div style={{ position: 'absolute', left: 165, top: 25, width: 9, height: 9, borderRadius: '50%', background: isDarkMode ? '#64748b' : '#94a3b8', border: '1.5px solid #fff', zIndex: 2 }} />
          </div>
        </div>
      )}

      {/* 4. Geofence & Tariff Zone Coverage Manager */}
      {id === 'geofence-builder' && (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
          <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Base land */}
            <rect width="300" height="120" fill={isDarkMode ? '#0b1120' : '#f8fafc'} />

            {/* Roads */}
            <line x1="-10" y1="60" x2="310" y2="60" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="7" />
            <line x1="-10" y1="60" x2="310" y2="60" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="5" />
            <line x1="150" y1="-10" x2="150" y2="130" stroke={isDarkMode ? '#334155' : '#e2e8f0'} strokeWidth="7" />
            <line x1="150" y1="-10" x2="150" y2="130" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="5" />

            {/* Concentric radial rings */}
            <circle cx="150" cy="60" r="76" fill={`${accentColor}06`} stroke={accentColor} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
            <circle cx="150" cy="60" r="50" fill={`${accentColor}14`} stroke={accentColor} strokeWidth="1.2" opacity="0.8" />
            <circle cx="150" cy="60" r="26" fill={`${accentColor}26`} stroke={accentColor} strokeWidth="1.8" />

            {/* Radius measuring line */}
            <line x1="150" y1="60" x2="208" y2="34" stroke={accentColor} strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="208" cy="34" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
          </svg>

          {/* Central Kitchen / Hub Pin */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: accentColor, border: '2px solid #ffffff', boxShadow: `0 0 10px ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ffffff' }} />
            </div>
          </div>

          {/* Tariff calculation tag */}
          <div style={{ position: 'absolute', top: 12, left: '60%', transform: 'translateX(-20%)', background: isDarkMode ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '2px 7px', fontSize: '9px', fontWeight: 700, color: accentColor, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            4.8 km · Free Delivery
          </div>

          {/* Tier Badges */}
          <div style={{ position: 'absolute', bottom: 8, left: 10, display: 'flex', gap: 4, zIndex: 3 }}>
            <span style={{ fontSize: '8px', fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${accentColor}25`, color: accentColor }}>Tier 1 (0-3 km)</span>
            <span style={{ fontSize: '8px', fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: 'var(--color-text-secondary)' }}>Tier 2</span>
          </div>
        </div>
      )}

      {/* 5. Geospatial Heatmap & Fleet Analytics */}
      {id === 'density-heatmap' && (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#070b13' }}>
          {/* Tactical Dark Grid Roads */}
          <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}>
            <line x1="-10" y1="35" x2="310" y2="35" stroke="#1e293b" strokeWidth="3" />
            <line x1="-10" y1="75" x2="310" y2="75" stroke="#1e293b" strokeWidth="4" />
            <line x1="80" y1="-10" x2="80" y2="130" stroke="#1e293b" strokeWidth="3" />
            <line x1="160" y1="-10" x2="160" y2="130" stroke="#1e293b" strokeWidth="4" />
            <line x1="230" y1="-10" x2="230" y2="130" stroke="#1e293b" strokeWidth="3" />
          </svg>

          {/* Radial Heat Gradient Hotspots */}
          <div
            style={{
              position: 'absolute',
              left: '42%',
              top: '48%',
              transform: 'translate(-50%, -50%)',
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,63,94,0.85) 0%, rgba(245,158,11,0.55) 40%, rgba(59,130,246,0.18) 70%, transparent 100%)',
              filter: 'blur(5px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '68%',
              top: '38%',
              transform: 'translate(-50%, -50%)',
              width: 65,
              height: 65,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,63,94,0.7) 0%, rgba(245,158,11,0.4) 45%, transparent 100%)',
              filter: 'blur(4px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '20%',
              top: '65%',
              transform: 'translate(-50%, -50%)',
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.65) 0%, rgba(244,63,94,0.3) 50%, transparent 100%)',
              filter: 'blur(3px)',
            }}
          />

          {/* Telemetry HUD Overlays */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 10,
              background: 'rgba(15,23,42,0.85)',
              border: `1px solid ${accentColor}50`,
              borderRadius: 6,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            <Flame size={9} color={accentColor} />
            <span style={{ fontSize: '9px', fontWeight: 800, color: '#ffffff' }}>Surge 1.85x</span>
            <span style={{ fontSize: '8px', color: '#94a3b8' }}>· High Peak</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 10,
              background: 'rgba(15,23,42,0.85)',
              border: '1px solid #334155',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: '8px',
              fontWeight: 700,
              color: '#38bdf8',
            }}
          >
            CARTO Dark Matter
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 1: Live Order & Fleet Delivery Tracking (with LEAFLET)
// ─────────────────────────────────────────────────────────────────────────────

function LiveOrderTrackingPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const courierMarkerRef = useRef<L.Marker | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35); // 0 to 100%
  const [speed, setSpeed] = useState<1 | 2>(1);

  // Real GPS coordinates in Jakarta: From Resto in Kuningan to Menara Astra Sudirman
  const routePoints: [number, number][] = useMemo(() => [
    [-6.2235, 106.8245], // Origin: Kuningan Kitchen Hub
    [-6.2215, 106.8220],
    [-6.2198, 106.8205],
    [-6.2185, 106.8185], // Semanggi Interchange area
    [-6.2155, 106.8175],
    [-6.2120, 106.8190], // Sudirman Boulevard
    [-6.2088, 106.8210], // Destination: Menara Astra Sudirman
  ], []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [-6.2160, 106.8200],
      zoom: 14,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    // Tile Layer: Dynamic CARTO tiles (Dark / Voyager)
    const initialTile = isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER;
    const tileLayer = L.tileLayer(initialTile, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;
    tileLayerRef.current = tileLayer;

    // Origin Marker (Restaurant)
    const originIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="background: #10b981; color: #fff; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.25); margin-bottom: 2px;">
          🍔 Resto Kitchen
        </div>
        <div style="width: 14px; height: 14px; border-radius: 50%; background: #10b981; border: 2.5px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.3); margin: 0 auto;"></div>
      `,
      iconSize: [100, 36],
      iconAnchor: [50, 36],
    });
    L.marker(routePoints[0], { icon: originIcon }).addTo(map);

    // Destination Marker (Customer)
    const destIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="background: #ef4444; color: #fff; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.25); margin-bottom: 2px;">
          📍 Menara Astra
        </div>
        <div style="width: 14px; height: 14px; border-radius: 50%; background: #ef4444; border: 2.5px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.3); margin: 0 auto;"></div>
      `,
      iconSize: [100, 36],
      iconAnchor: [50, 36],
    });
    L.marker(routePoints[routePoints.length - 1], { icon: destIcon }).addTo(map);

    // Active Route Polyline
    L.polyline(routePoints, {
      color: '#df7e30',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // Background Polyline Shadow
    L.polyline(routePoints, {
      color: 'rgba(223, 126, 48, 0.25)',
      weight: 12,
      opacity: 0.7,
      lineCap: 'round',
    }).addTo(map);

    // Moving Courier Marker
    const courierIcon = L.divIcon({
      className: 'courier-live-marker',
      html: `
        <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 0; border-radius: 50%; background: rgba(223, 126, 48, 0.35); animation: pulse 1.8s infinite;"></div>
          <div style="width: 26px; height: 26px; border-radius: 50%; background: #df7e30; border: 2.5px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px;">
            🛵
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
    const courierMarker = L.marker(routePoints[0], { icon: courierIcon }).addTo(map);
    courierMarkerRef.current = courierMarker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [routePoints]);

  // Interpolate Position along Route
  const getInterpolatedPoint = (pct: number): [number, number] => {
    const totalLegs = routePoints.length - 1;
    const legWeight = 100 / totalLegs;
    const legIndex = Math.min(Math.floor(pct / legWeight), totalLegs - 1);
    const legFraction = (pct - legIndex * legWeight) / legWeight;

    const p1 = routePoints[legIndex];
    const p2 = routePoints[legIndex + 1];

    const lat = p1[0] + (p2[0] - p1[0]) * legFraction;
    const lng = p1[1] + (p2[1] - p1[1]) * legFraction;
    return [lat, lng];
  };

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1 * speed;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Update Courier Marker on progress change
  useEffect(() => {
    if (!courierMarkerRef.current) return;
    const currentCoords = getInterpolatedPoint(progress);
    courierMarkerRef.current.setLatLng(currentCoords);
  }, [progress]);

  // Synchronize Leaflet Tile Layer when Dark Mode toggles
  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER);
  }, [isDarkMode]);

  const remainingDistance = Math.max(0, ((100 - progress) * 0.038).toFixed(1));
  const remainingMinutes = Math.max(1, Math.round((100 - progress) * 0.14));

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* ── Leaflet Real Map Container ── */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* ── Custom Neudela Map Zoom Controls ── */}
      <MapZoomControls
        onZoomIn={() => mapInstanceRef.current?.zoomIn()}
        onZoomOut={() => mapInstanceRef.current?.zoomOut()}
        style={{ top: 'auto', bottom: 175, right: 16 }}
        isDark={isDarkMode}
        isId={isId}
      />

      {/* ── Top Floating Glassmorphic Bar ── */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          background: 'var(--color-bg-surface)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-lg, 0 10px 25px -5px rgba(0,0,0,0.08))',
          zIndex: 1000,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(223, 126, 48, 0.12)',
              border: '1px solid rgba(223, 126, 48, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#df7e30',
              flexShrink: 0,
            }}
          >
            <Navigation size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Order #NEU-99214
              </span>
              <NeuronBadge
                variant={progress >= 100 ? 'success' : 'brand'}
                size="sm"
                pill
                dot
              >
                {progress >= 100
                  ? isId ? 'Pesanan Tiba' : 'Delivered'
                  : isId ? 'Sedang Diantar' : 'Out for Delivery'}
              </NeuronBadge>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
              {isId
                ? `Estimasi Tiba: ${remainingMinutes} menit (${remainingDistance} km tersisa) · Leaflet Real Map`
                : `Estimated Arrival: ${remainingMinutes} mins (${remainingDistance} km left) · Leaflet Real Map`}
            </div>
          </div>
        </div>

        {/* Simulation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronButton
            size="sm"
            variant={isPlaying ? 'secondary' : 'primary'}
            leadingIcon={isPlaying ? <Pause size={13} /> : <Play size={13} />}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (isId ? 'Jeda' : 'Pause') : (isId ? 'Lanjutkan' : 'Resume')}
          </NeuronButton>

          <NeuronButton
            size="sm"
            variant="secondary"
            leadingIcon={<RotateCcw size={13} />}
            onClick={() => setProgress(0)}
          >
            Reset
          </NeuronButton>

          <NeuronButton
            size="sm"
            variant={speed === 2 ? 'primary' : 'secondary'}
            leadingIcon={<FastForward size={13} />}
            onClick={() => setSpeed(speed === 1 ? 2 : 1)}
          >
            {speed}x {isId ? 'Kecepatan' : 'Speed'}
          </NeuronButton>
        </div>
      </div>

      {/* ── Floating Bottom Driver & Order Status Card ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          background: 'var(--color-bg-surface)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          padding: '16px 20px',
          boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NeuronAvatar name="Budi Pratama" size="md" status="online" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>Budi Pratama</strong>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', background: '#fef3c7', padding: '1px 6px', borderRadius: 8 }}>
                  ★ 4.96 (1,420 trip)
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                Honda Vario 160 · <strong style={{ color: '#0f172a' }}>B 4829 NEU</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NeuronButton
              size="sm"
              variant="outline"
              leadingIcon={<Phone size={14} color="#10b981" />}
              onClick={() => alert(isId ? 'Menghubungkan telepon suara ke Driver...' : 'Connecting voice call to Driver...')}
            >
              {isId ? 'Telepon' : 'Call'}
            </NeuronButton>

            <NeuronButton
              size="sm"
              variant="primary"
              leadingIcon={<MessageSquare size={14} />}
              onClick={() => alert(isId ? 'Membuka panel obrolan driver...' : 'Opening driver chat panel...')}
            >
              {isId ? 'Kirim Pesan' : 'Chat'}
            </NeuronButton>
          </div>
        </div>

        {/* Delivery Milestone Stepper */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          {[
            { labelId: 'Diterima', labelEn: 'Confirmed', done: true },
            { labelId: 'Dimasak', labelEn: 'Preparing', done: true },
            { labelId: 'Diantar', labelEn: 'On the Way', done: progress < 100, active: progress < 100 },
            { labelId: 'Tiba', labelEn: 'Arrived', done: progress >= 100, active: progress >= 100 },
          ].map((step, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 4, borderRadius: 2, background: step.done ? '#df7e30' : '#e2e8f0', transition: 'background 0.3s ease' }} />
              <span style={{ fontSize: '10.5px', fontWeight: step.active ? 800 : 500, color: step.active ? '#df7e30' : 'var(--color-text-secondary)' }}>
                {isId ? step.labelId : step.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 2: Pinpoint Address Picker & Reverse Geocoding (with LEAFLET)
// ─────────────────────────────────────────────────────────────────────────────

interface GeocodedPlace {
  name: string;
  address: string;
  district: string;
  zip: string;
  lat: number;
  lng: number;
}

const REAL_LANDMARK_CATALOG: GeocodedPlace[] = [
  { name: 'SCBD Lot 8', address: 'Jl. Jend. Sudirman Kav. 52-53, Senayan', lat: -6.2255, lng: 106.8091, district: 'Kebayoran Baru, Jakarta Selatan', zip: '12190' },
  { name: 'Senopati Raya No. 42', address: 'Jl. Senopati No. 42, Selong', lat: -6.2341, lng: 106.8082, district: 'Kebayoran Baru, Jakarta Selatan', zip: '12110' },
  { name: 'Mega Kuningan Barat', address: 'Kawasan Mega Kuningan Kav. E.4.3', lat: -6.2289, lng: 106.8272, district: 'Setiabudi, Jakarta Selatan', zip: '12950' },
  { name: 'Monumen Nasional (Monas)', address: 'Gambir, Kecamatan Gambir', lat: -6.1754, lng: 106.8272, district: 'Jakarta Pusat', zip: '10110' },
  // Kiara locations
  { name: 'Kiara Artha Park', address: 'Jl. Banten, Kebonwaru, Kec. Batununggal', lat: -6.9157, lng: 107.6391, district: 'Kota Bandung, Jawa Barat', zip: '40272' },
  { name: 'Stasiun Kiaracondong', address: 'Jl. Jembatan Opat No. 43, Kiaracondong', lat: -6.9248, lng: 107.6468, district: 'Kota Bandung, Jawa Barat', zip: '40284' },
  { name: 'Taman Kiara Payung', address: 'Bumi Perkemahan Kiara Payung, Sukasari', lat: -6.9038, lng: 107.7689, district: 'Jatinangor, Sumedang', zip: '45363' },
  // Additional popular landmarks
  { name: 'Grand Indonesia Mall', address: 'Jl. M.H. Thamrin No. 1, Menteng', lat: -6.1951, lng: 106.8219, district: 'Jakarta Pusat', zip: '10310' },
  { name: 'Gelora Bung Karno (GBK)', address: 'Jl. Pintu Satu Senayan, Gelora', lat: -6.2186, lng: 106.8026, district: 'Tanah Abang, Jakarta Pusat', zip: '10270' },
  { name: 'Tebet Eco Park', address: 'Jl. Tebet Barat Raya, Tebet Barat', lat: -6.2372, lng: 106.8528, district: 'Tebet, Jakarta Selatan', zip: '12820' },
  { name: 'Gedung Sate', address: 'Jl. Diponegoro No. 22, Citarum', lat: -6.9024, lng: 107.6186, district: 'Bandung Wetan, Kota Bandung', zip: '40115' },
  { name: 'Malioboro', address: 'Jl. Malioboro, Sosromenduran, Gedong Tengen', lat: -7.7928, lng: 110.3658, district: 'Kota Yogyakarta, D.I. Yogyakarta', zip: '55271' },
];

function PinpointAddressPickerPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<any>(null);
  const reverseGeocodeTimeoutRef = useRef<any>(null);

  const presets = REAL_LANDMARK_CATALOG.slice(0, 4);

  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: presets[0].lat,
    lng: presets[0].lng,
  });
  const [currentAddress, setCurrentAddress] = useState<GeocodedPlace>(presets[0]);
  const [driverNote, setDriverNote] = useState('');
  const [isBouncing, setIsBouncing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Real Geocoding Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodedPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real reverse geocode helper
  const performReverseGeocode = (lat: number, lng: number) => {
    if (reverseGeocodeTimeoutRef.current) {
      clearTimeout(reverseGeocodeTimeoutRef.current);
    }

    reverseGeocodeTimeoutRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'id, en' } });
        if (res.ok) {
          const data = await res.json();
          if (data && data.address) {
            const a = data.address;
            const road = a.road || a.pedestrian || a.suburb || a.village || a.neighbourhood || 'Jalan Sekitar';
            const district = a.city_district || a.suburb || a.county || '';
            const city = a.city || a.town || a.municipality || a.state || 'Indonesia';
            const name = data.name || (road !== 'Jalan Sekitar' ? road : data.display_name.split(',')[0]);

            setCurrentAddress({
              name,
              address: `${road}${district ? `, ${district}` : ''}`,
              district: city,
              zip: a.postcode || '',
              lat,
              lng,
            });
            return;
          }
        }
      } catch (err) {
        console.warn('Reverse geocode error', err);
      }

      // Fallback: check closest landmark in catalog
      const closest = REAL_LANDMARK_CATALOG.find(
        (lm) => Math.abs(lm.lat - lat) < 0.008 && Math.abs(lm.lng - lng) < 0.008
      );
      if (closest) {
        setCurrentAddress(closest);
      } else {
        setCurrentAddress({
          name: `Titik Pin (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
          address: 'Area Lokasi Riil di Peta',
          district: 'Koordinat Terpilih',
          zip: '',
          lat,
          lng,
        });
      }
    }, 350);
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [presets[0].lat, presets[0].lng],
      zoom: 16,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    const initialTile = isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER;
    const tileLayer = L.tileLayer(initialTile, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Track center when moving
    map.on('movestart', () => {
      setIsBouncing(true);
      setIsConfirmed(false);
    });

    map.on('move', () => {
      const c = map.getCenter();
      setCurrentCoords({ lat: c.lat, lng: c.lng });
    });

    map.on('moveend', () => {
      setIsBouncing(false);
      const c = map.getCenter();
      setCurrentCoords({ lat: c.lat, lng: c.lng });
      performReverseGeocode(c.lat, c.lng);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Preset Landmark Click
  const handleSelectLandmark = (lm: GeocodedPlace) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([lm.lat, lm.lng], 16, { duration: 1.2 });
    setCurrentAddress(lm);
    setCurrentCoords({ lat: lm.lat, lng: lm.lng });
  };

  // Real Location Search Handler
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);
    setIsSearchOpen(true);

    searchTimeoutRef.current = setTimeout(async () => {
      const q = val.trim().toLowerCase();

      // 1. Instant local catalog matches
      const localMatches = REAL_LANDMARK_CATALOG.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q)
      );

      // 2. Fetch from real geocoding service (Nominatim OSM API with Photon fallback)
      let remoteResults: GeocodedPlace[] = [];
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=6&addressdetails=1&countrycodes=id`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'id, en' } });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            remoteResults = data.map((item: any) => {
              const a = item.address || {};
              const road = a.road || a.pedestrian || a.suburb || item.display_name.split(',')[0];
              const city = a.city || a.town || a.county || a.state || '';
              return {
                name: item.name || road,
                address: item.display_name.split(',').slice(0, 3).join(', '),
                district: city,
                zip: a.postcode || '',
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
              };
            });
          }
        }
      } catch (err) {
        // Fallback to Photon API
        try {
          const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&limit=6`);
          if (res.ok) {
            const data = await res.json();
            if (data.features) {
              remoteResults = data.features.map((f: any) => {
                const p = f.properties || {};
                const c = f.geometry?.coordinates || [0, 0];
                return {
                  name: p.name || p.street || val,
                  address: [p.street, p.district, p.city].filter(Boolean).join(', ') || p.name || val,
                  district: p.city || p.state || p.country || '',
                  zip: p.postcode || '',
                  lat: c[1],
                  lng: c[0],
                };
              });
            }
          }
        } catch {
          // offline
        }
      }

      // Merge results without duplicate coordinates
      const combined = [...localMatches];
      remoteResults.forEach((r) => {
        if (!combined.some((c) => Math.abs(c.lat - r.lat) < 0.002 && Math.abs(c.lng - r.lng) < 0.002)) {
          combined.push(r);
        }
      });

      setSearchResults(combined);
      setIsSearching(false);
    }, 320);
  };

  const handleSelectSearchResult = (item: GeocodedPlace) => {
    setSearchQuery(item.name);
    setIsSearchOpen(false);
    setCurrentAddress(item);
    setCurrentCoords({ lat: item.lat, lng: item.lng });
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([item.lat, item.lng], 16, { duration: 1.5 });
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        handleSelectSearchResult(searchResults[0]);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  // Real GPS Geolocation
  const handleLocateMe = () => {
    if (!mapInstanceRef.current) return;
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;
          mapInstanceRef.current?.flyTo([latitude, longitude], 16, { duration: 1.5 });
          setCurrentCoords({ lat: latitude, lng: longitude });
          performReverseGeocode(latitude, longitude);
        },
        (err) => {
          setIsLocating(false);
          console.warn('Geolocation denied or failed, using preset landmark', err);
          const random = presets[Math.floor(Math.random() * presets.length)];
          mapInstanceRef.current?.flyTo([random.lat, random.lng], 16, { duration: 1.2 });
          setCurrentAddress(random);
          setCurrentCoords({ lat: random.lat, lng: random.lng });
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      const random = presets[Math.floor(Math.random() * presets.length)];
      mapInstanceRef.current?.flyTo([random.lat, random.lng], 16, { duration: 1.2 });
      setCurrentAddress(random);
      setCurrentCoords({ lat: random.lat, lng: random.lng });
    }
  };

  // Synchronize Leaflet Tile Layer when Dark Mode toggles
  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER);
  }, [isDarkMode]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* ── Real Leaflet Map Container ── */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* ── Fixed Center Pinpoint Marker ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -100%) translateY(${isBouncing ? '-16px' : '0px'})`,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 1000,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ background: '#0f172a', color: '#fff', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, boxShadow: '0 4px 12px rgba(0,0,0,0.25)', marginBottom: 4, whiteSpace: 'nowrap' }}>
          {isId ? 'Geser peta untuk setel titik' : 'Drag map to place pinpoint'}
        </div>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#10b981', border: '3px solid #fff', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <MapPin size={18} />
        </div>
        <div style={{ width: 4, height: 10, background: '#10b981', borderRadius: 2 }} />
      </div>

      {/* Center Ground Drop Shadow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: isBouncing ? 8 : 18,
          height: isBouncing ? 3 : 6,
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.35)',
          transition: 'all 0.2s ease',
          zIndex: 999,
          pointerEvents: 'none',
        }}
      />

      {/* ── Custom Neudela Map Zoom Controls ── */}
      <MapZoomControls
        onZoomIn={() => mapInstanceRef.current?.zoomIn()}
        onZoomOut={() => mapInstanceRef.current?.zoomOut()}
        style={{ top: 'auto', bottom: 185, right: 16 }}
        isDark={isDarkMode}
        isId={isId}
      />

      {/* ── Top Floating Search & Quick Presets ── */}
      <div
        ref={searchContainerRef}
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 1000,
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <NeuronInput
              placeholder={isId ? 'Cari gedung, jalan, atau landmark di peta... (contoh: Kiara, Monas, SCBD)' : 'Search street, building, or landmark on map... (e.g. Kiara, Monas, SCBD)'}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              leadingIcon={isSearching ? <Loader2 size={16} className="neuron-spinner" /> : <Search size={16} />}
              trailingIcon={searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setIsSearchOpen(false);
                  }}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--color-text-secondary)' }}
                >
                  <X size={14} />
                </button>
              ) : undefined}
              style={{
                height: '40px',
                background: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
              }}
            />

            {/* Real Geocoding Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12,
                  boxShadow: isDarkMode ? '0 16px 36px rgba(0,0,0,0.6)' : '0 16px 36px rgba(0,0,0,0.14)',
                  overflow: 'hidden',
                  zIndex: 2000,
                  maxHeight: 280,
                  overflowY: 'auto',
                }}
              >
                <div style={{ padding: '7px 14px', fontSize: 10.5, fontWeight: 700, color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{isId ? 'Hasil Pencarian Lokasi Riil (Geocoding)' : 'Real Location Search Results'}</span>
                  <span>{searchResults.length} {isId ? 'lokasi' : 'places'}</span>
                </div>
                {searchResults.map((item, idx) => (
                  <div
                    key={`${item.lat}-${item.lng}-${idx}`}
                    onClick={() => handleSelectSearchResult(item)}
                    style={{
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      cursor: 'pointer',
                      borderBottom: idx < searchResults.length - 1 ? '1px solid var(--color-border)' : 'none',
                      background: 'transparent',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16, 185, 129, 0.14)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <MapPin size={15} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', lineHeight: 1.3, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.address} {item.district ? `· ${item.district}` : ''}
                      </div>
                    </div>
                    <span style={{ fontSize: 9.5, fontFamily: 'monospace', color: '#64748b', background: 'var(--color-bg-canvas)', padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>
                      {item.lat.toFixed(3)}, {item.lng.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isSearchOpen && isSearching && searchResults.length === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12,
                  padding: '14px',
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  zIndex: 2000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Loader2 size={16} className="neuron-spinner" />
                <span>{isId ? 'Mencari lokasi di OpenStreetMap...' : 'Searching real location on OpenStreetMap...'}</span>
              </div>
            )}
          </div>

          <NeuronButton
            size="md"
            variant="secondary"
            loading={isLocating}
            leadingIcon={<LocateFixed size={15} color="#10b981" />}
            onClick={handleLocateMe}
            title={isId ? 'Gunakan GPS Lokasi Saat Ini' : 'Use Current GPS Location'}
            style={{
              height: '40px',
              background: 'var(--color-bg-surface)',
              boxShadow: 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
              whiteSpace: 'nowrap',
            }}
          >
            GPS
          </NeuronButton>
        </div>

        {/* Quick Preset Buttons */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {presets.map((lm) => (
            <NeuronButton
              key={lm.name}
              size="xs"
              variant={currentAddress.name === lm.name ? 'primary' : 'secondary'}
              onClick={() => handleSelectLandmark(lm)}
              style={{
                borderRadius: 20,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: currentAddress.name === lm.name ? '#10b981' : 'var(--color-bg-surface)',
                borderColor: currentAddress.name === lm.name ? '#10b981' : 'var(--color-border)',
                color: currentAddress.name === lm.name ? '#fff' : 'var(--color-text-primary)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              {lm.name}
            </NeuronButton>
          ))}
        </div>
      </div>

      {/* ── Bottom Floating Confirmation Card ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          background: 'var(--color-bg-surface)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          padding: '16px 20px',
          boxShadow: 'var(--shadow-xl, 0 20px 35px -10px rgba(0,0,0,0.15))',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              <MapPin size={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {currentAddress.name}
              </h4>
              <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                {currentAddress.address}, {currentAddress.district} {currentAddress.zip}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 11, fontFamily: 'monospace', color: '#64748b' }}>
                <span>Lat: {currentCoords.lat.toFixed(5)}</span>
                <span>·</span>
                <span>Lng: {currentCoords.lng.toFixed(5)}</span>
              </div>
            </div>
          </div>

          <NeuronBadge variant="success" size="sm" pill dot>
            {isId ? 'Geocoding Presisi' : 'Real Leaflet Geocoding'}
          </NeuronBadge>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <NeuronInput
              placeholder={isId ? 'Catatan patokan untuk kurir (misal: Samping lobi barat / pos sekuriti)' : 'Note for courier (e.g. Near west lobby / security post)'}
              value={driverNote}
              onChange={(e) => setDriverNote(e.target.value)}
              style={{ height: '40px' }}
            />
          </div>

          <NeuronButton
            variant="primary"
            size="md"
            onClick={() => setIsConfirmed(true)}
            style={{ height: '40px', minWidth: 160, whiteSpace: 'nowrap' }}
          >
            {isConfirmed ? (isId ? '✓ Lokasi Terpasang' : '✓ Location Set') : (isId ? 'Konfirmasi Titik' : 'Confirm Spot')}
          </NeuronButton>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 3: Multi-Branch Store & Asset Locator (with LEAFLET)
// ─────────────────────────────────────────────────────────────────────────────

function MultiBranchStoreLocatorPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const branches = useMemo(() => [
    { id: 'b-1', name: 'Neuron Wellness SCBD', distance: '0.8 km', hours: '06:00 - 23:00', open: true, phone: '+62 21 515 8820', address: 'Pacific Century Place Lt. 5, SCBD', lat: -6.2255, lng: 106.8091, rating: 4.9, amenities: ['Sauna', 'Pilates', '24h'] },
    { id: 'b-2', name: 'Neuron Fitness Senayan', distance: '2.4 km', hours: '06:00 - 22:00', open: true, phone: '+62 21 579 9230', address: 'Senayan City Mall Lt. 4, Gelora', lat: -6.2272, lng: 106.7972, rating: 4.8, amenities: ['Pool', 'Sauna'] },
    { id: 'b-3', name: 'Neuron Club Kemang', distance: '5.1 km', hours: '07:00 - 21:00', open: true, phone: '+62 21 719 4410', address: 'Jl. Kemang Raya No. 12, Bangka', lat: -6.2625, lng: 106.8155, rating: 4.7, amenities: ['CrossFit', 'Cafe'] },
    { id: 'b-4', name: 'Neuron Hub Kuningan', distance: '3.6 km', hours: '06:00 - 22:00', open: true, phone: '+62 21 529 1190', address: 'Kuningan City Lt. UG, Setiabudi', lat: -6.2248, lng: 106.8305, rating: 4.6, amenities: ['Pilates', 'Sauna'] },
  ], []);

  const [activeBranchId, setActiveBranchId] = useState('b-1');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('All');
  const [search, setSearch] = useState('');

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const filteredBranches = branches.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.address.toLowerCase().includes(search.toLowerCase());
    const matchAmenity = selectedAmenity === 'All' || b.amenities.includes(selectedAmenity);
    return matchSearch && matchAmenity;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [-6.2350, 106.8120],
      zoom: 13,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    const initialTile = isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER;
    const tileLayer = L.tileLayer(initialTile, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;
    tileLayerRef.current = tileLayer;

    // Add branch markers
    const newMarkers: { [key: string]: L.Marker } = {};

    branches.forEach((b) => {
      const pinIcon = L.divIcon({
        className: 'branch-pin-marker',
        html: `
          <div style="background: #3b82f6; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.2); margin-bottom: 2px; text-align: center;">
            ${b.name.split(' ')[2] || b.name} (${b.distance})
          </div>
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #3b82f6; border: 2.5px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #fff; margin: 0 auto; font-size: 10px;">
            🏢
          </div>
        `,
        iconSize: [120, 38],
        iconAnchor: [60, 38],
      });

      const marker = L.marker([b.lat, b.lng], { icon: pinIcon }).addTo(map);
      marker.on('click', () => {
        setActiveBranchId(b.id);
      });
      newMarkers[b.id] = marker;
    });

    markersRef.current = newMarkers;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [branches]);

  // Synchronize Leaflet Tile Layer when Dark Mode toggles
  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER);
  }, [isDarkMode]);

  // Handle active branch change -> pan to location
  const handleSelectBranch = (b: typeof branches[0]) => {
    setActiveBranchId(b.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([b.lat, b.lng], 15, { duration: 1 });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', height: '100%', width: '100%', overflow: 'hidden' }}>
      {/* ── Left Sidebar Master List ── */}
      <div style={{ background: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', zIndex: 10 }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Lokasi Cabang Terdekat' : 'Nearby Club Branches'}
            </h3>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: '#dbeafe', color: '#1d4ed8' }}>
              {filteredBranches.length} {isId ? 'Cabang' : 'Locations'}
            </span>
          </div>

          <NeuronInput
            placeholder={isId ? 'Cari nama cabang atau area...' : 'Search branch or area...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leadingIcon={<Search size={14} />}
            style={{ height: '36px', fontSize: 12.5 }}
          />

          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {['All', 'Sauna', 'Pilates', '24h'].map((am) => (
              <NeuronButton
                key={am}
                size="xs"
                variant={selectedAmenity === am ? 'primary' : 'secondary'}
                onClick={() => setSelectedAmenity(am)}
                style={{
                  borderRadius: 14,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  background: selectedAmenity === am ? '#3b82f6' : undefined,
                  borderColor: selectedAmenity === am ? '#3b82f6' : undefined,
                  color: selectedAmenity === am ? '#fff' : undefined,
                }}
              >
                {am}
              </NeuronButton>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredBranches.map((branch) => {
            const isSelected = branch.id === activeBranchId;
            return (
              <div
                key={branch.id}
                onClick={() => handleSelectBranch(branch)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: `1.5px solid ${isSelected ? '#3b82f6' : 'var(--color-border)'}`,
                  background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'var(--color-bg-surface)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.12)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '13.5px', color: 'var(--color-text-primary)' }}>{branch.name}</strong>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6' }}>{branch.distance}</span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {branch.address}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '1px 6px', borderRadius: 6, background: branch.open ? '#dcfce7' : '#fee2e2', color: branch.open ? '#15803d' : '#b91c1c' }}>
                    {branch.open ? (isId ? 'Buka Sekarang' : 'Open Now') : (isId ? 'Tutup' : 'Closed')}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>· {branch.hours}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Leaflet Real Map Container ── */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

        {/* ── Custom Neudela Map Zoom Controls ── */}
        <MapZoomControls
          onZoomIn={() => mapInstanceRef.current?.zoomIn()}
          onZoomOut={() => mapInstanceRef.current?.zoomOut()}
          style={{ top: 'auto', bottom: 210, right: 20 }}
          isDark={isDarkMode}
          isId={isId}
        />

        {/* ── Selected Branch InfoWindow Card ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 320,
            background: 'var(--color-bg-surface)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--color-border)',
            borderRadius: 14,
            padding: 16,
            boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase' }}>
              {isId ? 'Detail Lokasi Terpilih' : 'Selected Location'}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b' }}>★ {activeBranch.rating}</span>
          </div>

          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {activeBranch.name}
          </h4>

          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
            {activeBranch.address}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{activeBranch.phone}</span>
            <NeuronButton
              size="xs"
              variant="primary"
              leadingIcon={<Navigation size={12} />}
              onClick={() => alert(isId ? `Membuka Google Maps ke ${activeBranch.name}` : `Opening directions to ${activeBranch.name}`)}
            >
              {isId ? 'Petunjuk Arah' : 'Directions'}
            </NeuronButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 4: Geofence & Service Coverage Manager (with LEAFLET)
// ─────────────────────────────────────────────────────────────────────────────

function GeofenceCoverageManagerPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const clickMarkerRef = useRef<L.Marker | null>(null);

  const hubCoords: [number, number] = [-6.2235, 106.8245]; // Central Hub in Kuningan
  const [testDistance, setTestDistance] = useState(3.4);

  const getTier = (dist: number) => {
    if (dist <= 2.5) return { name: isId ? 'Zona 1 (Gratis Ongkir)' : 'Zone 1 (Free Delivery)', fee: 0, color: '#10b981' };
    if (dist <= 5.0) return { name: isId ? 'Zona 2 (Reguler Rp 10.000)' : 'Zone 2 (Standard Rp 10k)', fee: 10000, color: '#f59e0b' };
    if (dist <= 9.0) return { name: isId ? 'Zona 3 (Luar Kota Rp 25.000)' : 'Zone 3 (Extended Rp 25k)', fee: 25000, color: '#8b5cf6' };
    return { name: isId ? 'Di Luar Area Jangkauan' : 'Out of Service Area', fee: null, color: '#ef4444' };
  };

  const currentTier = getTier(testDistance);

  // Initialize Leaflet Circles
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: hubCoords,
      zoom: 12,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    const initialTile = isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER;
    const tileLayer = L.tileLayer(initialTile, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Zone 3: 9000m
    L.circle(hubCoords, {
      radius: 9000,
      color: '#8b5cf6',
      fillColor: '#8b5cf6',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '5, 5',
    }).addTo(map);

    // Zone 2: 5000m
    L.circle(hubCoords, {
      radius: 5000,
      color: '#f59e0b',
      fillColor: '#f59e0b',
      fillOpacity: 0.12,
      weight: 1.5,
      dashArray: '5, 5',
    }).addTo(map);

    // Zone 1: 2500m
    L.circle(hubCoords, {
      radius: 2500,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.18,
      weight: 2,
    }).addTo(map);

    // Warehouse Hub Marker
    const hubIcon = L.divIcon({
      className: 'hub-pin-marker',
      html: `
        <div style="background: #0f172a; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; white-space: nowrap; margin-bottom: 2px; text-align: center;">
          Central Dispatch Hub
        </div>
        <div style="width: 22px; height: 22px; border-radius: 50%; background: #8b5cf6; border: 2.5px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #fff; margin: 0 auto; font-size: 11px;">
          🏬
        </div>
      `,
      iconSize: [120, 38],
      iconAnchor: [60, 38],
    });
    L.marker(hubCoords, { icon: hubIcon }).addTo(map);

    // Interactive Click anywhere to test distance
    map.on('click', (e) => {
      const distMeters = map.distance(hubCoords, e.latlng);
      const distKm = parseFloat((distMeters / 1000).toFixed(1));
      setTestDistance(distKm);

      if (clickMarkerRef.current) {
        clickMarkerRef.current.setLatLng(e.latlng);
      } else {
        const clickIcon = L.divIcon({
          className: 'click-test-marker',
          html: `<div style="width: 14px; height: 14px; border-radius: 50%; background: #ef4444; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        clickMarkerRef.current = L.marker(e.latlng, { icon: clickIcon }).addTo(map);
      }
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [hubCoords]);

  // Synchronize Leaflet Tile Layer when Dark Mode toggles
  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER);
  }, [isDarkMode]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* ── Custom Neudela Map Zoom Controls ── */}
      <MapZoomControls
        onZoomIn={() => mapInstanceRef.current?.zoomIn()}
        onZoomOut={() => mapInstanceRef.current?.zoomOut()}
        style={{ top: 'auto', bottom: 140, right: 16 }}
        isDark={isDarkMode}
        isId={isId}
      />

      {/* Top Legend Bar */}
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--color-bg-surface)', backdropFilter: 'blur(10px)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>0 - 2.5 km (Gratis)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>2.5 - 5.0 km (Rp 10k)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>5.0 - 9.0 km (Rp 25k)</span>
        </div>
      </div>

      {/* Bottom Interactive Radius Calculator */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: 'var(--color-bg-surface)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '16px 20px', boxShadow: '0 15px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, zIndex: 1000 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 260 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {isId ? 'Klik peta atau geser slider untuk cek tarif ongkir' : 'Click on map or adjust slider to test delivery tariff'}
            </span>
            <strong style={{ fontSize: 13, color: currentTier.color }}>{testDistance} km</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="12"
            step="0.5"
            value={testDistance}
            onChange={(e) => setTestDistance(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: currentTier.color }}
          />
        </div>

        <div style={{ background: `${currentTier.color}15`, border: `1.5px solid ${currentTier.color}`, borderRadius: 10, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: currentTier.color, fontWeight: 700 }}>{currentTier.name}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)', marginTop: 2 }}>
              {currentTier.fee === null ? (isId ? 'Tidak Terjangkau' : 'Out of Reach') : currentTier.fee === 0 ? (isId ? 'GRATIS' : 'FREE') : `Rp ${currentTier.fee.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 5: Geospatial Heatmap & Fleet Analytics (with CARTO Dark Matter)
// ─────────────────────────────────────────────────────────────────────────────

function GeospatialDensityHeatmapPreview({ isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const heatCirclesRef = useRef<L.Circle[]>([]);

  const timeSlots = ['07:00 (Pagi)', '12:00 (Makan Siang)', '18:00 (Pulang Kantor)', '22:00 (Malam)'];
  const [activeSlot, setActiveSlot] = useState(2); // 18:00

  // Hotspots definitions per timeslot
  const hotspotsData: { [key: number]: { coords: [number, number]; radius: number; color: string }[] } = useMemo(() => ({
    0: [
      { coords: [-6.2255, 106.8091], radius: 1200, color: '#10b981' },
      { coords: [-6.2155, 106.8220], radius: 900, color: '#f59e0b' },
    ],
    1: [
      { coords: [-6.2255, 106.8091], radius: 1500, color: '#f59e0b' },
      { coords: [-6.2248, 106.8305], radius: 1400, color: '#f43f5e' },
      { coords: [-6.1754, 106.8272], radius: 1100, color: '#f59e0b' },
    ],
    2: [
      { coords: [-6.2255, 106.8091], radius: 1800, color: '#f43f5e' }, // SCBD Peak
      { coords: [-6.2185, 106.8185], radius: 1600, color: '#f43f5e' }, // Semanggi
      { coords: [-6.2248, 106.8305], radius: 1300, color: '#f59e0b' }, // Kuningan
      { coords: [-6.2625, 106.8155], radius: 1100, color: '#f43f5e' }, // Kemang
    ],
    3: [
      { coords: [-6.2625, 106.8155], radius: 1400, color: '#8b5cf6' },
      { coords: [-6.2255, 106.8091], radius: 800, color: '#3b82f6' },
    ],
  }), []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [-6.2255, 106.8150],
      zoom: 13,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    const initialTile = isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER;
    const tileLayer = L.tileLayer(initialTile, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Synchronize Leaflet Tile Layer when Dark Mode toggles
  useEffect(() => {
    if (!tileLayerRef.current) return;
    tileLayerRef.current.setUrl(isDarkMode ? TILE_CARTO_DARK : TILE_CARTO_VOYAGER);
  }, [isDarkMode]);

  // Update Heat Circles on Timeslot Change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old circles
    heatCirclesRef.current.forEach((c) => c.remove());
    heatCirclesRef.current = [];

    const currentHotspots = hotspotsData[activeSlot] || [];
    const newCircles: L.Circle[] = [];

    currentHotspots.forEach((hs) => {
      // Outer glow circle
      const outer = L.circle(hs.coords, {
        radius: hs.radius,
        color: hs.color,
        fillColor: hs.color,
        fillOpacity: isDarkMode ? 0.22 : 0.28,
        weight: 1.5,
      }).addTo(map);

      // Core hotspot circle
      const inner = L.circle(hs.coords, {
        radius: hs.radius * 0.5,
        color: hs.color,
        fillColor: hs.color,
        fillOpacity: isDarkMode ? 0.48 : 0.55,
        weight: 2,
      }).addTo(map);

      newCircles.push(outer, inner);
    });

    heatCirclesRef.current = newCircles;
  }, [activeSlot, hotspotsData, isDarkMode]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: isDarkMode ? '#090d16' : 'var(--color-bg-canvas, #f8fafc)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* ── Custom Neudela Map Zoom Controls ── */}
      <MapZoomControls
        onZoomIn={() => mapInstanceRef.current?.zoomIn()}
        onZoomOut={() => mapInstanceRef.current?.zoomOut()}
        style={{ top: 'auto', bottom: 84, right: 16 }}
        isDark={isDarkMode}
        isId={isId}
      />

      {/* Top Telemetry KPI Bar */}
      <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', gap: 10, flexWrap: 'wrap', zIndex: 1000 }}>
        <div
          style={{
            background: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'var(--color-bg-surface)',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid #334155' : '1px solid var(--color-border)',
            borderRadius: 10,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: isDarkMode ? '0 4px 14px rgba(0,0,0,0.4)' : 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
          }}
        >
          <Flame size={18} color="#f43f5e" />
          <div>
            <div style={{ fontSize: 10.5, color: isDarkMode ? '#94a3b8' : 'var(--color-text-secondary)' }}>Surge Multiplier</div>
            <strong style={{ fontSize: 14, color: '#f43f5e' }}>{activeSlot === 2 ? '1.85x High Peak' : '1.15x Normal'}</strong>
          </div>
        </div>

        <div
          style={{
            background: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'var(--color-bg-surface)',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid #334155' : '1px solid var(--color-border)',
            borderRadius: 10,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: isDarkMode ? '0 4px 14px rgba(0,0,0,0.4)' : 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
          }}
        >
          <Truck size={18} color="#10b981" />
          <div>
            <div style={{ fontSize: 10.5, color: isDarkMode ? '#94a3b8' : 'var(--color-text-secondary)' }}>Active Fleet</div>
            <strong style={{ fontSize: 14, color: isDarkMode ? '#fff' : 'var(--color-text-primary)' }}>1,420 Drivers Online</strong>
          </div>
        </div>

        <div
          style={{
            background: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'var(--color-bg-surface)',
            backdropFilter: 'blur(10px)',
            border: isDarkMode ? '1px solid #334155' : '1px solid var(--color-border)',
            borderRadius: 10,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: isDarkMode ? '0 4px 14px rgba(0,0,0,0.4)' : 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
          }}
        >
          <Activity size={18} color="#3b82f6" />
          <div>
            <div style={{ fontSize: 10.5, color: isDarkMode ? '#94a3b8' : 'var(--color-text-secondary)' }}>Fulfillment SLA</div>
            <strong style={{ fontSize: 14, color: isDarkMode ? '#fff' : 'var(--color-text-primary)' }}>98.6% On Time</strong>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Scrubber */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          background: isDarkMode ? 'rgba(15, 23, 42, 0.92)' : 'var(--color-bg-surface)',
          backdropFilter: 'blur(12px)',
          border: isDarkMode ? '1px solid #334155' : '1px solid var(--color-border)',
          borderRadius: 14,
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000,
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: isDarkMode ? '0 15px 30px rgba(0,0,0,0.35)' : 'var(--shadow-md, 0 8px 24px rgba(0,0,0,0.08))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={16} color={isDarkMode ? '#94a3b8' : 'var(--color-text-secondary)'} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: isDarkMode ? '#f8fafc' : 'var(--color-text-primary)' }}>
            {isId ? 'Garis Waktu Kepadatan (Timeline)' : 'Hourly Density Playback'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {timeSlots.map((slot, idx) => (
            <button
              key={slot}
              type="button"
              onClick={() => setActiveSlot(idx)}
              style={{
                fontSize: 11.5,
                fontWeight: activeSlot === idx ? 700 : 500,
                padding: '6px 12px',
                borderRadius: 8,
                background: activeSlot === idx ? '#f43f5e' : isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'var(--color-bg-canvas)',
                color: activeSlot === idx ? '#fff' : isDarkMode ? '#cbd5e1' : 'var(--color-text-primary)',
                border: '1px solid',
                borderColor: activeSlot === idx ? '#f43f5e' : isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Render Helper for Standalone and Modal
// ─────────────────────────────────────────────────────────────────────────────

export function renderLiveMapPreview(variantId: MapVariantId, isDarkMode?: boolean) {
  switch (variantId) {
    case 'order-tracking':
      return <LiveOrderTrackingPreview isDarkProp={isDarkMode} />;
    case 'pinpoint-picker':
      return <PinpointAddressPickerPreview isDarkProp={isDarkMode} />;
    case 'store-locator':
      return <MultiBranchStoreLocatorPreview isDarkProp={isDarkMode} />;
    case 'geofence-builder':
      return <GeofenceCoverageManagerPreview isDarkProp={isDarkMode} />;
    case 'density-heatmap':
      return <GeospatialDensityHeatmapPreview isDarkProp={isDarkMode} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Documentation View Component
// ─────────────────────────────────────────────────────────────────────────────

export default function MapPatternView({ setActiveTab, isDarkMode: isDarkProp }: MapPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkProp);

  const [selectedVariant, setSelectedVariant] = useState<MapVariantId>('order-tracking');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedCodeTab, setCopiedCodeTab] = useState(false);

  const currentMeta = useMemo(
    () => MAP_VARIANTS.find((v) => v.id === selectedVariant) || MAP_VARIANTS[0],
    [selectedVariant]
  );

  const handleOpenRealAppNewTab = (variantId: MapVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-map-${variantId}`;
    window.open(url, '_blank');
  };

  const handleOpenModal = (variantId: MapVariantId) => {
    setSelectedVariant(variantId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const copyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeTab(true);
    setTimeout(() => setCopiedCodeTab(false), 2000);
  };

  return (
    <div className="pattern-map-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Peta & Intelijen Geospasial (Leaflet)' : 'Maps & Geospatial Intelligence (Leaflet)'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur antarmuka peta interaktif Leaflet dan sistem berbasis lokasi (Location-Based Services) enterprise dengan ubin peta CARTO Voyager dan Dark Matter. Mendukung pelacakan pesanan armada langsung, penempatan titik alamat presisi (center pinpoint drag), pencarian multi-cabang terdekat, manajemen radius geofencing tarif dinamis, hingga heatmap kepadatan pesanan.'
            : 'Enterprise-grade interactive Leaflet geospatial architectures and location-based services (LBS) powered by CARTO Voyager and Dark Matter tiles. Features real-time fleet delivery tracking, pinpoint address picker with reverse geocoding, multi-branch asset locators, geofencing tariff radius managers, and big data heatmaps.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Compass size={14} color="#df7e30" />
            <span>{isId ? 'Tile Engine:' : 'Map Engine:'}</span>
            <strong style={{ color: '#10b981' }}>Leaflet + CARTO Voyager & Dark Matter</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <MapPin size={14} color="#3b82f6" />
            <span>{isId ? 'Varian Pola:' : 'Architectures:'}</span>
            <strong style={{ color: '#3b82f6' }}>Order Tracking · Pinpoint Picker · Store Locator · Geofencing · Heatmap</strong>
          </div>
        </div>
      </div>

      {/* ── Pattern Architecture Cards Grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {MAP_VARIANTS.map((variant) => (
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
                {variant.id === 'order-tracking' && <Truck size={20} />}
                {variant.id === 'pinpoint-picker' && <Crosshair size={20} />}
                {variant.id === 'store-locator' && <Building size={20} />}
                {variant.id === 'geofence-builder' && <Compass size={20} />}
                {variant.id === 'density-heatmap' && <Flame size={20} />}
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
              <MapMiniSilhouette id={variant.id} accentColor={variant.accentColor} isDarkMode={isDarkMode} />
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
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Eye size={14} />
                <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenRealAppNewTab(variant.id, e);
                }}
                title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'var(--color-bg-canvas)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <ExternalLink size={14} />
                <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Interactive Modal Preview ── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Modal Container */}
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
            {/* Modal Header */}
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
              {/* Left: Title & Variant Badge */}
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

              {/* Right Side: Subtabs + Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
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
                      color: modalTab === 'preview' ? '#fff' : 'var(--color-text-secondary)',
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
                      color: modalTab === 'tsx' ? '#fff' : 'var(--color-text-secondary)',
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={(e) => handleOpenRealAppNewTab(selectedVariant, e)}
                    title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'var(--color-primary)',
                      color: '#fff',
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

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      padding: 6,
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {modalTab === 'preview' && (
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  {renderLiveMapPreview(selectedVariant, isDarkMode)}
                </div>
              )}

              {modalTab === 'tsx' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--color-bg-canvas)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                      {currentMeta.nameEn} Leaflet Component TSX
                    </span>
                    <NeuronButton
                      size="xs"
                      variant="secondary"
                      leadingIcon={copiedCodeTab ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      onClick={() =>
                        copyCode(`// Neudela Design System - ${currentMeta.nameEn} (Leaflet)\nimport React, { useEffect, useRef } from 'react';\nimport L from 'leaflet';\nimport 'leaflet/dist/leaflet.css';\n\nconst CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY || '${CARTO_API_KEY}';\n\nexport default function ${currentMeta.id.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())}Map() {\n  const mapRef = useRef<HTMLDivElement>(null);\n\n  useEffect(() => {\n    if (!mapRef.current) return;\n    const map = L.map(mapRef.current).setView([-6.2255, 106.8091], 14);\n    L.tileLayer(\`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=\${CARTO_KEY}\`, {\n      attribution: '&copy; OpenStreetMap &copy; CARTO'\n    }).addTo(map);\n    return () => { map.remove(); };\n  }, []);\n\n  return <div ref={mapRef} style={{ width: '100%', height: '560px' }} />;\n}`)
                      }
                    >
                      {copiedCodeTab ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode' : 'Copy TSX')}
                    </NeuronButton>
                  </div>

                  <pre style={{ margin: 0, padding: 18, borderRadius: 10, background: '#0b101b', color: '#e2e8f0', fontSize: 13, lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
                    {`import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  NeuronButton,
  NeuronBadge,
  NeuronAvatar
} from '@neudela/core';
import { MapPin, Navigation, Truck, Phone, MessageSquare } from 'lucide-react';

/**
 * Neudela Design System - ${currentMeta.nameEn}
 * Category: ${currentMeta.badge}
 * Leaflet Engine with CARTO Voyager & Dark Matter Tiles
 */
export default function ${currentMeta.id.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())}Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 1. Initialize Real Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [-6.2160, 106.8200],
      zoom: 14,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    // 2. High-Performance CARTO Tile Layer (with API Key)
    const cartoKey = import.meta.env.VITE_CARTO_API_KEY || '${CARTO_API_KEY}';
    L.tileLayer(\`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=\${cartoKey}\`, {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    // 3. Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px' }}>
      {/* Real Leaflet Map Viewport */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* Custom Neudela Zoom Controls */}
      <div style={{ position: 'absolute', right: 16, top: 86, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 3 }}>
        <NeuronButton size="xs" variant="text" iconOnly onClick={() => mapInstanceRef.current?.zoomIn()}><Plus size={16} /></NeuronButton>
        <div style={{ height: 1, background: 'var(--color-border)', margin: '0 3px' }} />
        <NeuronButton size="xs" variant="text" iconOnly onClick={() => mapInstanceRef.current?.zoomOut()}><Minus size={16} /></NeuronButton>
      </div>

      {/* Floating Glassmorphic Neudela Controls */}
      <div style={{ position: 'absolute', top: 16, left: 16, right: 16, zIndex: 1000 }}>
        {/* Status bar, Search input, or Geocoding */}
      </div>

      {/* Bottom Floating Driver / Info Card */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 1000 }}>
        {/* Real-time Order ETA or Location Confirmation Card */}
      </div>
    </div>
  );
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{
          id: 'pat-auth',
          label: isId ? 'Autentikasi & Akun' : 'Authentication & Identity',
        }}
        next={{
          id: 'pat-overview',
          label: isId ? 'Ringkasan Pola' : 'Patterns Overview',
        }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
