import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronAvatar from '../../components/NeuronAvatar';
import NeuronCheckbox from '../../components/NeuronCheckbox';
import {
  Folder,
  FolderPlus,
  FileText,
  Image as ImageIcon,
  Film,
  Archive,
  HardDrive,
  UploadCloud,
  Download,
  Share2,
  Trash2,
  Eye,
  Copy,
  Check,
  ExternalLink,
  X,
  Search,
  Grid,
  List as ListIcon,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  Palette,
  Link2,
  Users,
  FileCode,
} from 'lucide-react';

export type FileManagerVariantId =
  | 'cloud-drive'
  | 'media-asset-dam'
  | 'batch-uploader'
  | 'document-vault'
  | 'secure-sharing';

export interface FileManagerVariantMeta {
  id: FileManagerVariantId;
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

export const FILE_MANAGER_VARIANTS: FileManagerVariantMeta[] = [
  {
    id: 'cloud-drive',
    nameEn: 'Enterprise Cloud Drive & Folder Hierarchy',
    nameId: 'Drive Cloud Perusahaan & Hierarki Folder',
    taglineEn: 'Dual-pane cloud file explorer with breadcrumbs navigation, multi-level folder tree, grid/list view toggle, and storage quota telemetry.',
    taglineId: 'Penjelajah berkas cloud dua-panel dengan navigasi remah roti, pohon folder berjenjang, pengalih tampilan grid/list, dan meter kuota penyimpanan.',
    descEn: 'High-end file management workstation: Folder breadcrumbs path, quick filter by file category (Documents, Media, Archives), storage capacity meter with automated cleanup recommendations, and multi-file selection with sticky floating batch action toolbar.',
    descId: 'Meja kerja pengelolaan berkas mutakhir: Jalur remah roti folder, filter cepat menurut kategori berkas (Dokumen, Media, Arsip), meter kapasitas kuota dengan rekomendasi pembersihan, serta seleksi multi-berkas dengan bilah aksi massal melayang.',
    tags: ['Drive Explorer', 'Folder Tree', 'Storage Quota', 'Batch Actions', 'Breadcrumbs'],
    bestForEn: 'Enterprise document workspaces, team shared drives, cloud storage consoles, and multi-tenant SaaS drives.',
    bestForId: 'Ruang kerja dokumen enterprise, drive bersama tim, konsol cloud storage, dan SaaS multi-penyewa.',
    badge: 'Cloud Drive',
    accentColor: '#df7e30',
  },
  {
    id: 'media-asset-dam',
    nameEn: 'Digital Asset Management (DAM) & Brand Media Hub',
    nameId: 'Manajemen Aset Digital (DAM) & Pusat Media Brand',
    taglineEn: 'Visual asset matrix with aspect ratio cards, auto-extracted color palettes, tag taxonomy filters, and inspector drawer.',
    taglineId: 'Matriks aset visual dengan rasio aspek, ekstraksi palet warna otomatis, taksonomi tag, dan laci inspektor aset.',
    descEn: 'Figma and Cloudinary-inspired visual media engine: Displays asset cards with resolution badges (4K UHD, 1080p), aspect ratio markers, color swatches, tag filters, and an interactive slide-out inspector detailing dimensions, license rights, and multi-format download exports.',
    descId: 'Mesin aset media visual berstandar industri: Menampilkan kartu aset dengan badge resolusi (4K UHD, 1080p), penanda rasio aspek, sampel palet warna, filter tag, serta laci inspektor geser yang merinci dimensi, hak cipta, dan ekspor multi-format.',
    tags: ['DAM', 'Brand Assets', 'Color Palette', 'Visual Inspector', 'Taxonomy'],
    bestForEn: 'Creative agencies, marketing brand libraries, e-commerce product imagery hubs, and video production catalogs.',
    bestForId: 'Agensi kreatif, perpustakaan aset brand marketing, galeri produk e-commerce, dan katalog video produksi.',
    badge: 'Visual DAM',
    accentColor: '#8b5cf6',
  },
  {
    id: 'batch-uploader',
    nameEn: 'Resumable Batch Uploader & Transfer Manager',
    nameId: 'Uploader Batch Terjeda & Manajer Transfer Berkas',
    taglineEn: 'Chunked multipart upload console with animated dropzone, real-time bandwidth metrics, SHA-256 hash validation, and pause/resume controls.',
    taglineId: 'Konsol unggah multipart terbagi dengan zona seret-lepas animasi, telemetri kecepatan transfer, validasi hash SHA-256, dan kontrol jeda/lanjutkan.',
    descEn: 'Industrial-grade file ingestion pipeline: Drag-and-drop zone with animated upload queue, live bandwidth telemetry (MB/s and ETA), individual item progress bars, chunk retry logic, pause/resume toggles, and total transfer batch metrics.',
    descId: 'Pipa transmisi berkas skala industri: Zona seret-lepas dengan antrean unggah animasi, telemetri kecepatan jaringan langsung (MB/s dan estimasi waktu), progress bar per berkas, logika pengulangan otomatis, kontrol jeda/lanjutkan, dan ringkasan batch.',
    tags: ['Multipart Upload', 'Resumable Transfer', 'Dropzone', 'Bandwidth Telemetry', 'Queue Manager'],
    bestForEn: 'Large media ingestion pipelines, data lake uploads, bulk document migration, and cloud backup consoles.',
    bestForId: 'Pengunggahan media video besar, data lake ingest, migrasi dokumen massal, dan konsol pencadangan cloud.',
    badge: 'Batch Transfer',
    accentColor: '#3b82f6',
  },
  {
    id: 'document-vault',
    nameEn: 'Confidential Document Vault & Version Redline',
    nameId: 'Kubah Dokumen Rahasia & Penelaahan Versi Redline',
    taglineEn: 'SOC2-hardened legal repository with granular version timeline slider, visual redline change log, and digital signature audit trails.',
    taglineId: 'Repositori hukum terenkripsi SOC2 dengan slider linimasa versi, penelaah perubahan baris visual, dan jejak audit tanda tangan digital.',
    descEn: 'Compliance-grade file vault: Encryption status badges, classification level chips (Confidential, Restricted, Public), version timeline navigator (v3.2 -> v3.1 -> v3.0), side-by-side legal clause diff redlining, and digital signature verification logs with cryptographic timestamps.',
    descId: 'Kubah berkas standar kepatuhan hukum: Badge status enkripsi, tingkat klasifikasi keamanan data, navigator linimasa versi berkas, penelaah perbedaan klausul redline, dan log verifikasi tanda tangan digital bertanda kriptografi.',
    tags: ['Document Vault', 'SOC2 Compliance', 'Version History', 'Redline Diff', 'Digital Signature'],
    bestForEn: 'Fintech contracts, board meeting minutes, legal agreements, human resources dossiers, and regulatory audits.',
    bestForId: 'Kontrak fintech, notulen dewan direksi, perjanjian hukum, dokumen SDM rahasia, dan audit regulasi.',
    badge: 'Compliance Vault',
    accentColor: '#10b981',
  },
  {
    id: 'secure-sharing',
    nameEn: 'Secure File Sharing & Access Permissions Portal',
    nameId: 'Portal Berbagi Berkas Aman & Matriks Izin Akses',
    taglineEn: 'Enterprise link distribution workspace with password protection, expiration timers, download limit throttles, and recipient access matrix.',
    taglineId: 'Ruang kerja pembagian tautan aman dengan perlindungan sandi, pengatur kedaluwarsa, kuota batas unduhan, dan matriks izin penerima.',
    descEn: 'Controlled external collaboration hub: Generates short share links with toggles for passkey protection, expiration deadlines, download limits (e.g. 18/50 downloads), dynamic recipient access role table (Viewer, Commenter, Editor), and live geolocation telemetry.',
    descId: 'Pusat kolaborasi eksternal terkendali: Membuat tautan berbagi aman dengan perlindungan kata sandi, batas waktu kedaluwarsa, kuota batas unduhan (misal 18/50), tabel peran akses penerima (Viewer, Commenter, Editor), dan telemetri lokasi pengunduh.',
    tags: ['Secure Sharing', 'Expiring Links', 'Passkey Protected', 'Access Control', 'Download Limits'],
    bestForEn: 'External client deliverables, investor data rooms, proprietary pitch decks, and regulated document delivery.',
    bestForId: 'Pengiriman berkas klien eksternal, data room investor, pitch deck rahasia, dan pengiriman dokumen berlisensi.',
    badge: 'Secure Share',
    accentColor: '#ec4899',
  },
];

// ─────────────────────────────────────────────
// Interactive Variant 1: Cloud Drive & Folder Hierarchy
// ─────────────────────────────────────────────
interface CloudFileItem {
  id: string;
  name: string;
  type: 'folder' | 'doc' | 'image' | 'video' | 'archive' | 'code';
  size: string;
  updatedAt: string;
  author: string;
  starred?: boolean;
}

function CloudDrivePreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'folders' | 'docs' | 'media' | 'archives'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const currentFolder = 'Q4 Campaign Assets';

  const files: CloudFileItem[] = [
    { id: 'f1', name: 'Brand Guidelines 2026.pdf', type: 'doc', size: '14.2 MB', updatedAt: '12m lalu', author: 'Sarah J.', starred: true },
    { id: 'f2', name: 'Omnichannel Strategy Deck.pptx', type: 'doc', size: '28.6 MB', updatedAt: '1 jam lalu', author: 'Bale D.' },
    { id: 'f3', name: 'Hero Landing 3D Render.png', type: 'image', size: '8.4 MB', updatedAt: '2 jam lalu', author: 'Alex W.', starred: true },
    { id: 'f4', name: 'Q4 Product Launch Reel.mp4', type: 'video', size: '142.0 MB', updatedAt: '3 jam lalu', author: 'Motion Team' },
    { id: 'f5', name: 'Design Tokens Export.zip', type: 'archive', size: '5.1 MB', updatedAt: 'Kemarin', author: 'DevOps Bot' },
    { id: 'f6', name: 'payment-gateway-spec.json', type: 'code', size: '420 KB', updatedAt: '2 hari lalu', author: 'API Squad' },
  ];

  const filteredFiles = useMemo(() => {
    return files.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (selectedCategory === 'all') return matchSearch;
      if (selectedCategory === 'docs') return matchSearch && f.type === 'doc';
      if (selectedCategory === 'media') return matchSearch && (f.type === 'image' || f.type === 'video');
      if (selectedCategory === 'archives') return matchSearch && f.type === 'archive';
      return matchSearch;
    });
  }, [files, searchQuery, selectedCategory]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getFileIcon = (type: CloudFileItem['type']) => {
    switch (type) {
      case 'doc':
        return <FileText size={18} color="#3b82f6" />;
      case 'image':
        return <ImageIcon size={18} color="#8b5cf6" />;
      case 'video':
        return <Film size={18} color="#ec4899" />;
      case 'archive':
        return <Archive size={18} color="#df7e30" />;
      case 'code':
        return <FileCode size={18} color="#10b981" />;
      default:
        return <FileText size={18} color="var(--color-text-secondary)" />;
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 1040, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top Breadcrumb & Search Bar */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: isMobile ? '12px' : '14px 18px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: 12,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Breadcrumb Path */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <HardDrive size={14} color="var(--color-primary)" />
            <span>Neudela Cloud</span>
          </span>
          <ChevronRight size={14} color="var(--color-text-tertiary)" />
          <span style={{ color: 'var(--color-text-secondary)' }}>Marketing & Product</span>
          <ChevronRight size={14} color="var(--color-text-tertiary)" />
          <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>{currentFolder}</strong>
        </div>

        {/* Search & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: isMobile ? 'auto' : 220 }}>
            <NeuronInput
              size="sm"
              placeholder={isId ? 'Cari dokumen atau aset...' : 'Search files or assets...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leadingIcon={<Search size={14} />}
              style={{ height: 36, boxSizing: 'border-box' }}
            />
          </div>

          {/* Grid / List View Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--color-bg-canvas)',
              padding: 3,
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              height: 36,
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              style={{
                height: 28,
                width: 28,
                border: 'none',
                background: viewMode === 'grid' ? 'var(--color-bg-surface)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                padding: 0,
                borderRadius: 6,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.15s ease',
              }}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              style={{
                height: 28,
                width: 28,
                border: 'none',
                background: viewMode === 'list' ? 'var(--color-bg-surface)' : 'transparent',
                color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                padding: 0,
                borderRadius: 6,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: viewMode === 'list' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.15s ease',
              }}
              title="List View"
            >
              <ListIcon size={15} />
            </button>
          </div>

          <NeuronButton
            size="sm"
            variant="primary"
            leadingIcon={<FolderPlus size={14} />}
            style={{ height: 36, boxSizing: 'border-box', flexShrink: 0 }}
          >
            {isId ? 'Baru' : 'New'}
          </NeuronButton>
        </div>
      </div>

      {/* Main Drive Workspace Split: Left Storage Sidebar + Right File Grid */}
      <div
        style={{
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : '240px 1fr',
          gap: 16,
        }}
      >
        {/* Left Storage & Hierarchy Rail */}
        <div
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 14,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: 'var(--shadow-sm)',
            height: 'fit-content',
          }}
        >
          {/* Category Filter Pills */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isId ? 'Navigasi Cepat' : 'Quick Navigation'}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
              {[
                { id: 'all', label: isId ? 'Semua Berkas' : 'All Files', icon: HardDrive, count: files.length },
                { id: 'docs', label: isId ? 'Dokumen & PDF' : 'Documents & PDF', icon: FileText, count: 2 },
                { id: 'media', label: isId ? 'Foto & Video' : 'Images & Video', icon: ImageIcon, count: 2 },
                { id: 'archives', label: isId ? 'Arsip & Kode' : 'Archives & Code', icon: Archive, count: 2 },
              ].map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: 'none',
                      background: active ? 'rgba(223, 126, 48, 0.12)' : 'transparent',
                      color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      fontWeight: active ? 700 : 500,
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon size={14} />
                      <span>{cat.label}</span>
                    </div>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>{cat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cloud Storage Quota Telemetry Meter */}
          <div style={{ padding: '12px', borderRadius: 10, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{isId ? 'Kapasitas Cloud' : 'Cloud Storage'}</span>
              <strong style={{ color: 'var(--color-text-primary)' }}>64.8 / 100 GB</strong>
            </div>
            <NeuronProgress value={65} variant="brand" size="xs" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
              <span style={{ fontSize: '10.5px', color: '#10b981', fontWeight: 600 }}>● Tier Enterprise</span>
              <button
                type="button"
                style={{ border: 'none', background: 'transparent', color: 'var(--color-primary)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                {isId ? 'Tingkatkan →' : 'Upgrade →'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Content: Files Matrix / Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Active Folder Subheader & Selection Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? 'Daftar Berkas Aktif' : 'Active Files'} ({filteredFiles.length})
              </span>
              {selectedIds.length > 0 && (
                <NeuronBadge size="xs" variant="brand">
                  {selectedIds.length} {isId ? 'dipilih' : 'selected'}
                </NeuronBadge>
              )}
            </div>

            {selectedIds.length > 0 && (
              <div style={{ display: 'flex', gap: 6, animation: 'fadeIn 0.2s ease' }}>
                <NeuronButton size="xs" variant="outline" leadingIcon={<Download size={12} />}>
                  {isId ? 'Unduh Zip' : 'Download Zip'}
                </NeuronButton>
                <NeuronButton size="xs" variant="outline" leadingIcon={<Share2 size={12} />}>
                  {isId ? 'Bagikan' : 'Share'}
                </NeuronButton>
                <NeuronButton size="xs" variant="destructive" leadingIcon={<Trash2 size={12} />}>
                  {isId ? 'Hapus' : 'Delete'}
                </NeuronButton>
              </div>
            )}
          </div>

          {/* Grid View Mode */}
          {viewMode === 'grid' ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              {filteredFiles.map((file) => {
                const isSelected = selectedIds.includes(file.id);
                return (
                  <div
                    key={file.id}
                    onClick={() => toggleSelect(file.id)}
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                      borderRadius: 12,
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 0 2px rgba(223, 126, 48, 0.15)' : 'var(--shadow-sm)',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)';
                    }}
                  >
                    {/* Top Row: Icon + Checkbox / Star */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--color-bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {getFileIcon(file.type)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {file.starred && <span style={{ color: '#f59e0b', fontSize: '13px' }}>★</span>}
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}>
                          <NeuronCheckbox
                            size="sm"
                            variant="brand"
                            checked={isSelected}
                            onChange={() => toggleSelect(file.id)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* File Meta */}
                    <div>
                      <strong style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.name}>
                        {file.name}
                      </strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.updatedAt}</span>
                      </div>
                    </div>

                    {/* Bottom Author Info */}
                    <div style={{ paddingTop: 8, borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                      <span>Oleh: {file.author}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        style={{ border: 'none', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', padding: 2 }}
                      >
                        <MoreVertical size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View Mode */
            <div
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '32px 1fr 60px' : '36px 1fr 100px 120px 120px 40px',
                  padding: '10px 14px',
                  background: 'var(--color-bg-canvas)',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--color-text-secondary)',
                  alignItems: 'center',
                }}
              >
                <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}>
                  <NeuronCheckbox
                    size="sm"
                    variant="brand"
                    checked={selectedIds.length === filteredFiles.length && filteredFiles.length > 0}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < filteredFiles.length}
                    onChange={(checked) => {
                      if (checked) setSelectedIds(filteredFiles.map((f) => f.id));
                      else setSelectedIds([]);
                    }}
                  />
                </div>
                <span>{isId ? 'Nama Berkas' : 'File Name'}</span>
                <span>{isId ? 'Ukuran' : 'Size'}</span>
                {!isMobile && <span>{isId ? 'Terakhir Disunting' : 'Last Modified'}</span>}
                {!isMobile && <span>{isId ? 'Pemilik' : 'Owner'}</span>}
                <span></span>
              </div>

              {filteredFiles.map((file) => {
                const isSelected = selectedIds.includes(file.id);
                return (
                  <div
                    key={file.id}
                    onClick={() => toggleSelect(file.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '32px 1fr 60px' : '36px 1fr 100px 120px 120px 40px',
                      padding: '10px 14px',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--color-border)',
                      fontSize: '12px',
                      background: isSelected ? 'rgba(223, 126, 48, 0.05)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s ease',
                    }}
                  >
                    <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}>
                      <NeuronCheckbox
                        size="sm"
                        variant="brand"
                        checked={isSelected}
                        onChange={() => toggleSelect(file.id)}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                      {getFileIcon(file.type)}
                      <strong style={{ color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {file.name}
                      </strong>
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{file.size}</span>
                    {!isMobile && <span style={{ color: 'var(--color-text-tertiary)' }}>{file.updatedAt}</span>}
                    {!isMobile && <span style={{ color: 'var(--color-text-secondary)' }}>{file.author}</span>}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{ border: 'none', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', padding: 2 }}
                    >
                      <MoreVertical size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 2: Digital Asset Management (DAM)
// ─────────────────────────────────────────────
interface MediaAssetItem {
  id: string;
  title: string;
  category: 'logo' | 'render' | 'banner' | 'mockup';
  ratio: string;
  res: string;
  colors: string[];
  dimensions: string;
  format: 'SVG' | 'WebP' | 'PNG' | 'JPG';
  size: string;
}

function MediaAssetDamPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAssetItem | null>(null);

  const assets: MediaAssetItem[] = [
    { id: 'dam-1', title: 'Neudela Primary Logo Suite', category: 'logo', ratio: '16:9', res: 'Vector Master', colors: ['#df7e30', '#1e293b', '#ffffff'], dimensions: '3840 x 2160', format: 'SVG', size: '1.2 MB' },
    { id: 'dam-2', title: 'Fintech Mobile Dashboard Mockup', category: 'mockup', ratio: '4:3', res: '4K UHD', colors: ['#0f172a', '#10b981', '#38bdf8'], dimensions: '2560 x 1920', format: 'WebP', size: '3.4 MB' },
    { id: 'dam-3', title: '3D Neural Network Abstract Core', category: 'render', ratio: '1:1', res: 'High Res Render', colors: ['#df7e30', '#ec4899', '#8b5cf6'], dimensions: '2048 x 2048', format: 'PNG', size: '6.8 MB' },
    { id: 'dam-4', title: 'Annual Tech Summit Stage Banner', category: 'banner', ratio: '16:9', res: 'Print CMYK', colors: ['#1e1b4b', '#6366f1', '#e0e7ff'], dimensions: '7680 x 4320', format: 'PNG', size: '18.4 MB' },
  ];

  const filtered = activeCategory === 'all' ? assets : assets.filter((a) => a.category === activeCategory);

  return (
    <div style={{ width: '100%', maxWidth: 1040, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top Taxonomy & Filter Header */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: isMobile ? '12px' : '14px 18px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: 12,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: isMobile ? 4 : 0 }}>
          {[
            { id: 'all', label: isId ? 'Semua Aset' : 'All Media' },
            { id: 'logo', label: isId ? 'Logo & Brand' : 'Logos' },
            { id: 'mockup', label: isId ? 'Mockup UI' : 'UI Mockups' },
            { id: 'render', label: isId ? '3D Render' : '3D Art' },
            { id: 'banner', label: isId ? 'Banner Kampanye' : 'Banners' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              style={{
                border: '1px solid',
                borderColor: activeCategory === tab.id ? '#8b5cf6' : 'var(--color-border)',
                background: activeCategory === tab.id ? 'rgba(139, 92, 246, 0.12)' : 'var(--color-bg-canvas)',
                color: activeCategory === tab.id ? '#8b5cf6' : 'var(--color-text-secondary)',
                borderRadius: 20,
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)', alignSelf: isMobile ? 'flex-end' : 'center' }}>
          {filtered.length} {isId ? 'Aset Terkatalogisasi' : 'Indexed Assets'}
        </span>
      </div>

      {/* Main Grid + Slide-Out Inspector Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: !isMobile && selectedAsset ? '1fr 320px' : '1fr',
          gap: 16,
          transition: 'all 0.25s ease',
        }}
      >
        {/* Media Assets Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 14,
          }}
        >
          {filtered.map((item) => {
            const isSelected = selectedAsset?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedAsset(isSelected ? null : item)}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: isSelected ? '2px solid #8b5cf6' : '1px solid var(--color-border)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 16px rgba(139, 92, 246, 0.2)' : 'var(--shadow-sm)',
                  transition: 'all 0.18s ease',
                }}
              >
                {/* Visual Canvas Representation */}
                <div
                  style={{
                    height: 140,
                    background: `linear-gradient(135deg, ${item.colors[0]}30 0%, ${item.colors[1]}15 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.colors[0],
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    <ImageIcon size={24} />
                  </div>

                  <span
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {item.ratio}
                  </span>

                  <span
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: '#8b5cf6',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {item.format}
                  </span>
                </div>

                {/* Card Content & Extracted Colors */}
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                    <span>{item.dimensions}</span>
                    <span>{item.size}</span>
                  </div>

                  {/* Auto-extracted Color Swatches */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Palette:</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {item.colors.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: c,
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide-out Inspector Drawer Panel */}
        {selectedAsset && (
          <div
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: 'var(--shadow-md)',
              animation: 'fadeIn 0.2s ease',
              height: 'fit-content',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Palette size={14} color="#8b5cf6" />
                <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                  {isId ? 'Inspektor Aset DAM' : 'DAM Asset Inspector'}
                </strong>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                style={{ border: 'none', background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer', padding: 2 }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Large Preview Thumbnail */}
            <div
              style={{
                height: 120,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${selectedAsset.colors[0]}40 0%, ${selectedAsset.colors[1]}20 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <ImageIcon size={32} color={selectedAsset.colors[0]} />
                <span style={{ fontSize: '11px', display: 'block', marginTop: 4, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {selectedAsset.res}
                </span>
              </div>
            </div>

            {/* Key Specs Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Dimensions</span>
                <strong>{selectedAsset.dimensions}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>File Size</span>
                <strong>{selectedAsset.size}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>License</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Commercial Ready</span>
              </div>
            </div>

            {/* Download Export Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              <NeuronButton size="sm" variant="primary" leadingIcon={<Download size={13} />}>
                {isId ? `Unduh ${selectedAsset.format} Master` : `Download ${selectedAsset.format} Master`}
              </NeuronButton>
              <NeuronButton size="sm" variant="outline" leadingIcon={<Share2 size={13} />}>
                {isId ? 'Salin CDN Embed URL' : 'Copy CDN Embed URL'}
              </NeuronButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 3: Resumable Batch Uploader
// ─────────────────────────────────────────────
interface UploadTask {
  id: string;
  name: string;
  size: string;
  progress: number;
  speed: string;
  eta: string;
  status: 'uploading' | 'completed' | 'paused' | 'verifying';
}

function BatchUploaderPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [tasks, setTasks] = useState<UploadTask[]>([
    { id: 'u1', name: 'Raw_Production_Footage_Reel_4K.mov', size: '1.42 GB', progress: 74, speed: '16.4 MB/s', eta: '18s', status: 'uploading' },
    { id: 'u2', name: 'Postgres_Replica_Dump_2026.sql.gz', size: '640 MB', progress: 100, speed: 'Done', eta: '0s', status: 'completed' },
    { id: 'u3', name: 'Global_Design_System_Figma_Backup.fig', size: '280 MB', progress: 42, speed: 'Paused', eta: '--', status: 'paused' },
    { id: 'u4', name: 'Audit_Security_Report_Signed.pdf', size: '14.8 MB', progress: 99, speed: '2.1 MB/s', eta: '1s', status: 'verifying' },
  ]);

  const togglePause = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'paused' ? 'uploading' : 'paused';
          return { ...t, status: nextStatus, speed: nextStatus === 'paused' ? 'Paused' : '14.2 MB/s' };
        }
        return t;
      })
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ width: '100%', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Drag-and-Drop Dropzone Zone */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '2px dashed var(--color-primary)',
          borderRadius: 16,
          padding: isMobile ? '24px 16px' : '36px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 12,
          cursor: 'pointer',
          backgroundClip: 'padding-box',
          backgroundColor: 'rgba(223, 126, 48, 0.03)',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: 'rgba(223, 126, 48, 0.15)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UploadCloud size={28} />
        </div>

        <div>
          <strong style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>
            {isId ? 'Tarik & Letakkan berkas ke sini' : 'Drag & drop your files here'}
          </strong>
          <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', display: 'block', marginTop: 4 }}>
            {isId ? 'Mendukung multipart chunked upload hingga 50 GB per berkas' : 'Supports chunked multipart transfers up to 50 GB per object'}
          </span>
        </div>

        <NeuronButton size="sm" variant="primary">
          {isId ? 'Pilih Berkas dari Komputer' : 'Browse Local Files'}
        </NeuronButton>
      </div>

      {/* Active Transfer Queue Card */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: '18px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <strong style={{ fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
              {isId ? 'Antrean Transfer Berkas' : 'Active Transfer Ingestion Queue'}
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block' }}>
              4 {isId ? 'Berkas' : 'Objects'} • 2.35 GB • Telemetri SHA-256 Otomatis
            </span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <NeuronButton size="xs" variant="outline" leadingIcon={<Pause size={12} />}>
              {isId ? 'Jeda Semua' : 'Pause All'}
            </NeuronButton>
            <NeuronButton size="xs" variant="secondary" leadingIcon={<CheckCircle2 size={12} color="#10b981" />}>
              {isId ? 'Bersihkan Selesai' : 'Clear Done'}
            </NeuronButton>
          </div>
        </div>

        {/* Task Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
                  <FileText size={16} color="var(--color-primary)" />
                  <strong style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.name}
                  </strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>({task.size})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                    {task.speed} {task.eta !== '--' && `• ${task.eta}`}
                  </span>
                  {task.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => togglePause(task.id)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 2 }}
                    >
                      {task.status === 'paused' ? <Play size={13} color="#10b981" /> : <Pause size={13} />}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: 2 }}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Progress Bar with Color Variant */}
              <NeuronProgress
                value={task.progress}
                variant={task.status === 'completed' ? 'success' : task.status === 'paused' ? 'neutral' : 'brand'}
                size="xs"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 4: Confidential Document Vault
// ─────────────────────────────────────────────
function DocumentVaultPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [activeVersion, setActiveVersion] = useState<'v3.2' | 'v3.1' | 'v3.0'>('v3.2');

  return (
    <div style={{ width: '100%', maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Security Compliance Header */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: isMobile ? '12px' : '16px 20px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 12,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <strong style={{ fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                Master-Service-Agreement-2026.pdf
              </strong>
              <NeuronBadge size="xs" variant="success">SOC2 Verified</NeuronBadge>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block' }}>
              Enkripsi AES-256 • Retensi Legal 7 Tahun • Audit Trail SHA-512
            </span>
          </div>
        </div>

        <NeuronButton size="sm" variant="outline" leadingIcon={<Download size={13} />}>
          {isId ? 'Unduh Salinan Sah' : 'Export Verified PDF'}
        </NeuronButton>
      </div>

      {/* Version Navigator Timeline Bar */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {isId ? 'Linimasa Riwayat Versi' : 'Document Version Timeline'}
        </span>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {[
            { ver: 'v3.2', tag: isId ? 'Versi Aktif (Ditandatangani)' : 'Active (Signed)', date: 'Hari ini 11:42 WIB', author: 'Legal Director' },
            { ver: 'v3.1', tag: isId ? 'Revisi Klausul Arbitrase' : 'Arbitration Clause Update', date: 'Kemarin 16:20 WIB', author: 'Counsel Lead' },
            { ver: 'v3.0', tag: isId ? 'Draf Awal Negosiasi' : 'Initial Draft Proposal', date: '3 hari lalu', author: 'Procurement' },
          ].map((v) => {
            const active = activeVersion === v.ver;
            return (
              <button
                key={v.ver}
                type="button"
                onClick={() => setActiveVersion(v.ver as any)}
                style={{
                  flex: 1,
                  minWidth: isMobile ? 180 : 200,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: active ? '1.5px solid #10b981' : '1px solid var(--color-border)',
                  background: active ? 'rgba(16, 185, 129, 0.08)' : 'var(--color-bg-canvas)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '12.5px', color: active ? '#10b981' : 'var(--color-text-primary)' }}>
                    {v.ver}
                  </strong>
                  {active && <CheckCircle2 size={13} color="#10b981" />}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{v.tag}</span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{v.date} • {v.author}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Redline Diff Preview Container */}
        <div
          style={{
            marginTop: 6,
            padding: '14px',
            borderRadius: 10,
            background: 'var(--color-bg-canvas)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              {isId ? 'Penelaahan Perubahan Redline (v3.2 vs v3.1)' : 'Redline Clause Diff Inspector (v3.2 vs v3.1)'}
            </span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>+ 2 Additions • - 1 Deletion</span>
          </div>

          <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6, padding: '10px', borderRadius: 8, background: '#0a0f1d', color: '#e6edf3' }}>
            <div style={{ color: '#94a3b8' }}>14  Section 8.2: Data Protection & Disaster Recovery</div>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '1px 4px', borderRadius: 3 }}>
              - 15  Data backups shall be performed once every 7 calendar days to secondary storage.
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#4ade80', padding: '1px 4px', borderRadius: 3 }}>
              + 15  Continuous streaming CDC replication with RPO &lt; 5 minutes across multi-region VPCs.
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#4ade80', padding: '1px 4px', borderRadius: 3 }}>
              + 16  Automated failover fail-safe rehearsal verified every 90 calendar days.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 5: Secure File Sharing Portal
// ─────────────────────────────────────────────
function SecureSharingPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [copiedLink, setCopiedLink] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(true);
  const [expiryOption, setExpiryOption] = useState('7d');

  const shareUrl = 'https://vault.neudela.app/s/q4-financial-report-2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ width: '100%', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Link Generator Box */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: isMobile ? '16px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link2 size={16} color="#ec4899" />
            <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
              {isId ? 'Tautan Berbagi Publik Terkendali' : 'Controlled Public Share Link'}
            </strong>
          </div>
          <NeuronBadge size="xs" variant="brand">AES-256 GCM</NeuronBadge>
        </div>

        {/* Copyable Link Input Bar */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <NeuronInput
              size="sm"
              value={shareUrl}
              readOnly
              leadingIcon={<Link2 size={14} color="#ec4899" />}
              style={{ height: 36, boxSizing: 'border-box' }}
            />
          </div>
          <NeuronButton
            size="sm"
            variant="primary"
            onClick={handleCopy}
            leadingIcon={copiedLink ? <Check size={13} /> : <Copy size={13} />}
            style={{ height: 36, boxSizing: 'border-box', flexShrink: 0 }}
          >
            {copiedLink ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Tautan' : 'Copy Link')}
          </NeuronButton>
        </div>

        {/* Security Controls Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 12,
            paddingTop: 8,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {/* Password Protection */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                {isId ? 'Perlindungan Sandi' : 'Passkey Protected'}
              </span>
              <NeuronCheckbox
                size="sm"
                variant="brand"
                checked={passwordEnabled}
                onChange={(checked) => setPasswordEnabled(checked)}
              />
            </div>
            <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)' }}>
              {passwordEnabled ? 'PIN: ••••••' : (isId ? 'Tidak dilindungi sandi' : 'Open access')}
            </span>
          </div>

          {/* Expiration Timer */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
              {isId ? 'Kedaluwarsa Tautan' : 'Link Expiration'}
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              {['24h', '7d', '30d'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setExpiryOption(opt)}
                  style={{
                    border: '1px solid var(--color-border)',
                    background: expiryOption === opt ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                    color: expiryOption === opt ? '#fff' : 'var(--color-text-secondary)',
                    borderRadius: 4,
                    padding: '2px 8px',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Download Limits */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
              {isId ? 'Kuota Unduhan' : 'Download Limit'}
            </span>
            <strong style={{ fontSize: '11.5px', color: '#10b981' }}>18 / 50 {isId ? 'Unduhan Terpakai' : 'Downloads Used'}</strong>
          </div>
        </div>
      </div>

      {/* Recipient Access Permissions Matrix */}
      <div
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: '18px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={15} color="#ec4899" />
            <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
              {isId ? 'Penerima & Hak Akses Berbagi' : 'Invited Collaborators & Role Permissions'}
            </strong>
          </div>
          <NeuronButton size="xs" variant="primary">
            {isId ? '+ Tambah Email' : '+ Invite Member'}
          </NeuronButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { email: 'alex.wong@acmecorp.com', role: 'Editor', status: 'Active', initials: 'AW' },
            { email: 'elena.rostova@legalcounsel.io', role: 'Viewer Only', status: 'Active', initials: 'ER' },
            { email: 'investor-relations@venture.cap', role: 'Viewer (Watermarked)', status: 'Pending', initials: 'IR' },
          ].map((user, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 8,
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NeuronAvatar name={user.initials} size="xs" />
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <NeuronBadge size="xs" variant="neutral">{user.role}</NeuronBadge>
                <button
                  type="button"
                  style={{ border: 'none', background: 'transparent', color: '#ef4444', fontSize: '11px', cursor: 'pointer', padding: 0 }}
                >
                  {isId ? 'Cabut Akses' : 'Revoke'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Render Live Helper for Modals & Standalone Views
// ─────────────────────────────────────────────
export function renderLiveFileManagerPreview(
  variantId: FileManagerVariantId,
  _isId: boolean = false,
  _isDarkMode: boolean = false,
  viewportMode: 'desktop' | 'tablet' | 'mobile' = 'desktop'
) {
  switch (variantId) {
    case 'cloud-drive':
      return <CloudDrivePreview viewportMode={viewportMode} />;
    case 'media-asset-dam':
      return <MediaAssetDamPreview viewportMode={viewportMode} />;
    case 'batch-uploader':
      return <BatchUploaderPreview viewportMode={viewportMode} />;
    case 'document-vault':
      return <DocumentVaultPreview viewportMode={viewportMode} />;
    case 'secure-sharing':
      return <SecureSharingPreview viewportMode={viewportMode} />;
    default:
      return <CloudDrivePreview viewportMode={viewportMode} />;
  }
}

// ─────────────────────────────────────────────
// Code Snippets for TSX Tab
// ─────────────────────────────────────────────
const FILE_MANAGER_TSX_SNIPPETS: Record<FileManagerVariantId, string> = {
  'cloud-drive': `import React, { useState } from 'react';
import { NeuronInput, NeuronButton, NeuronBadge, NeuronProgress } from 'neudela';
import { HardDrive, Folder, FileText, Grid, List } from 'lucide-react';

export function EnterpriseCloudDrive() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="cloud-drive-workspace">
      <header className="drive-header">
        <NeuronInput size="sm" placeholder="Search documents..." />
        <NeuronButton variant="primary">New Upload</NeuronButton>
      </header>
      <div className="drive-body">
        {/* Hierarchical folder tree and grid/list explorer */}
      </div>
    </div>
  );
}`,
  'media-asset-dam': `import React, { useState } from 'react';
import { NeuronButton, NeuronBadge } from 'neudela';
import { Palette, Image, Download, Share2 } from 'lucide-react';

export function BrandAssetDamHub() {
  const [selectedAsset, setSelectedAsset] = useState(null);

  return (
    <div className="dam-matrix-container">
      {/* High-res asset cards with aspect ratio, resolution tags, and color palette */}
    </div>
  );
}`,
  'batch-uploader': `import React, { useState } from 'react';
import { NeuronProgress, NeuronButton } from 'neudela';
import { UploadCloud, Pause, Play, X } from 'lucide-react';

export function ResumableBatchUploader() {
  return (
    <div className="batch-uploader-console">
      {/* Multipart chunked upload queue with real-time transfer telemetry */}
    </div>
  );
}`,
  'document-vault': `import React, { useState } from 'react';
import { NeuronBadge, NeuronButton } from 'neudela';
import { ShieldCheck, Lock, Download, CheckCircle2 } from 'lucide-react';

export function ConfidentialDocumentVault() {
  return (
    <div className="document-vault-repository">
      {/* SOC2-hardened vault with version timeline and visual redline diff */}
    </div>
  );
}`,
  'secure-sharing': `import React, { useState } from 'react';
import { NeuronInput, NeuronButton, NeuronBadge } from 'neudela';
import { Link2, Lock, Clock, Users } from 'lucide-react';

export function SecureSharePortal() {
  return (
    <div className="secure-sharing-portal">
      {/* Expiring shortlink generator, passkey controls, and collaborator role matrix */}
    </div>
  );
}`,
};

// ─────────────────────────────────────────────
// Main FileManagerPatternView Component
// ─────────────────────────────────────────────
interface FileManagerPatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export default function FileManagerPatternView({ setActiveTab, isDarkMode: _isDarkMode = false }: FileManagerPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [selectedVariant, setSelectedVariant] = useState<FileManagerVariantId>('cloud-drive');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedTSX, setCopiedTSX] = useState(false);

  const currentMeta = FILE_MANAGER_VARIANTS.find((v) => v.id === selectedVariant) || FILE_MANAGER_VARIANTS[0];

  const handleOpenModal = (variantId: FileManagerVariantId) => {
    setSelectedVariant(variantId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  const handleOpenNewTab = (variantId: FileManagerVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.location.hash = `#file-manager-standalone-${variantId}`;
    setActiveTab(`file-manager-standalone-${variantId}`);
  };

  const handleCopyTSX = () => {
    const code = FILE_MANAGER_TSX_SNIPPETS[selectedVariant] || '';
    navigator.clipboard.writeText(code);
    setCopiedTSX(true);
    setTimeout(() => setCopiedTSX(false), 2000);
  };

  return (
    <div className="pattern-file-manager-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header (Rule 4 Invariant) ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Manajemen Berkas & Aset' : 'File & Asset Manager'}
        </h1>

        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur pengelolaan berkas dan pustaka aset media enterprise: Penjelajah cloud drive hierarkis, sistem manajemen aset digital (DAM) dengan ekstraksi palet warna, pengunggah batch terjeda dengan telemetri transfer, kubah berkas rahasia berbasis versi SOC2, serta portal distribusi tautan aman dengan perlindungan sandi dan batas unduhan.'
            : 'Enterprise-grade file management and digital asset workspace architectures: Hierarchical cloud drive explorers, visual DAM media hubs with auto-extracted color palettes, chunked multipart batch transfer managers with bandwidth telemetry, SOC2-hardened confidential document vaults with version redlining, and expiring secure link sharing portals.'}
        </p>

        {/* Stats Pills Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Folder size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>5 {isId ? 'Varian Enterprise' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <HardDrive size={14} color="#df7e30" />
            <span>{isId ? 'Kapasitas Storage:' : 'Cloud Storage:'}</span>
            <strong>Multi-Cloud S3 / Blob Ready</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <ShieldCheck size={14} color="#df7e30" />
            <span>{isId ? 'Keamanan:' : 'Security:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>AES-256 GCM & SOC2</strong>
          </div>
        </div>
      </div>

      {/* ── Section 1: Overview Variant Catalog ── */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              {isId ? 'Katalog Arsitektur Berkas & Aset' : 'File & Asset Architecture Catalog'}
            </h2>
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Pilih salah satu varian di bawah untuk menguji prototipe interaktif di modal atau tab baru.' : 'Select any variant below to test interactive workflows in a modal or standalone real app tab.'}
            </span>
          </div>
        </div>

        {/* 5 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {FILE_MANAGER_VARIANTS.map((variant) => (
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
              {/* Gradient Accent Line (3.5px) */}
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

              {/* Card Top: Icon & Badge */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `${variant.accentColor}18`,
                      color: variant.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Folder size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: 10,
                      background: `${variant.accentColor}20`,
                      color: variant.accentColor,
                      fontWeight: 700,
                    }}
                  >
                    {variant.badge}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {isId ? variant.nameId : variant.nameEn}
                </h3>

                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {isId ? variant.descId : variant.descEn}
                </p>

                {/* Best For Tag */}
                <div style={{ marginTop: 12, fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  <strong>{isId ? 'Terbaik untuk: ' : 'Best for: '}</strong>
                  <span>{isId ? variant.bestForId : variant.bestForEn}</span>
                </div>
              </div>

              {/* Card Bottom: Actions (Strict GEMINI.md Invariant) */}
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
                  className="pattern-btn-modal-preview"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(variant.id);
                  }}
                >
                  <Eye size={14} />
                  <span>{isId ? 'Preview di Modal' : 'Preview in Modal'}</span>
                </button>

                <button
                  type="button"
                  className="pattern-btn-new-tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenNewTab(variant.id, e);
                  }}
                  title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                >
                  <ExternalLink size={14} />
                  <span>{isId ? 'Tab Baru' : 'New Tab'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Standard Blueprint Modal (Rule 4 Invariant) ── */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
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
              width: '98vw',
              maxWidth: '1280px',
              height: '92vh',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
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
              {/* Left Side: Dot + Title + Badge + Tagline */}
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

              {/* Right Side: Subtabs + Open In New Tab + Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Subtabs Tab */}
                <div
                  style={{
                    display: 'flex',
                    background: 'var(--color-bg-surface)',
                    padding: 3,
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    height: 36,
                    boxSizing: 'border-box',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    style={{
                      border: 'none',
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#ffffff' : 'var(--color-text-secondary)',
                      padding: '0 12px',
                      borderRadius: 6,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('tsx')}
                    style={{
                      border: 'none',
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#ffffff' : 'var(--color-text-secondary)',
                      padding: '0 12px',
                      borderRadius: 6,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    React (TSX)
                  </button>
                </div>

                {/* Open in New Tab Button (Solid Terracotta 36px) */}
                <button
                  type="button"
                  onClick={(e) => handleOpenNewTab(selectedVariant, e)}
                  style={{
                    height: 36,
                    padding: '0 14px',
                    borderRadius: 8,
                    border: 'none',
                    background: 'var(--color-primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 1px 3px rgba(223, 126, 48, 0.3)',
                    transition: 'opacity 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  <ExternalLink size={14} />
                  <span>{isId ? 'Buka di Tab Baru (Real App)' : 'Open in New Tab (Real App)'}</span>
                </button>

                {/* Close Button (36x36px) */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  title={isId ? 'Tutup (Esc)' : 'Close (Esc)'}
                  style={{
                    height: 36,
                    width: 36,
                    boxSizing: 'border-box',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: 0,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-primary)',
                    flexShrink: 0,
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--color-bg-canvas)' }}>
              {modalTab === 'preview' ? (
                renderLiveFileManagerPreview(selectedVariant)
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                      TypeScript Component Snippet ({selectedVariant}.tsx)
                    </span>
                    <NeuronButton
                      size="sm"
                      variant="outline"
                      leadingIcon={copiedTSX ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      onClick={handleCopyTSX}
                    >
                      {copiedTSX ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin Kode' : 'Copy TSX')}
                    </NeuronButton>
                  </div>

                  <pre
                    style={{
                      margin: 0,
                      padding: 20,
                      background: '#0d1117',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 12,
                      fontFamily: "'JetBrains Mono', Menlo, Monaco, Consolas, monospace",
                      fontSize: '12.5px',
                      lineHeight: 1.6,
                      color: '#e6edf3',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{FILE_MANAGER_TSX_SNIPPETS[selectedVariant] || ''}</code>
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
          id: 'pat-ai-copilot',
          label: isId ? 'AI Copilot & Ruang Kerja Percakapan' : 'AI Copilot & Conversational Workspace',
        }}
        next={{
          id: 'pat-overview',
          label: isId ? 'Ringkasan Seluruh Pola Desain' : 'All Design Patterns Overview',
        }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
