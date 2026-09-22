import React, { useState, useMemo } from 'react';
import NeuronAccordion, { AccordionItem } from '../components/NeuronAccordion';
import NeuronBadge from '../components/NeuronBadge';
import {
  ShieldCheck,
  Headphones,
  CreditCard,
  Zap,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface AccordionStyleGalleryProps {
  isId: boolean;
}

export default function AccordionStyleGallery({ isId }: AccordionStyleGalleryProps) {
  const [style3Category, setStyle3Category] = useState<'all' | 'billing' | 'account' | 'security'>('all');

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 1 Items
  // ─────────────────────────────────────────────────────────────────────────────
  const style1Items: AccordionItem[] = [
    {
      id: 's1-1',
      title: isId ? 'Bagaimana kebijakan dan prosedur pengembalian barang?' : 'What is your return policy and process?',
      defaultOpen: true,
      badge: <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />,
      content: isId
        ? 'Anda dapat mengembalikan produk dalam kurun waktu 30 hari sejak barang diterima. Produk wajib dalam kondisi awal dengan label dan kemasan lengkap.'
        : 'You can return any purchased item within 30 days of delivery. Items must be in original unworn condition with all packaging tags intact.',
    },
    {
      id: 's1-2',
      title: isId ? 'Berapa lama proses pengembalian dana (refund) berlangsung?' : 'How long does the refund take to process?',
      content: isId
        ? 'Pengembalian dana diproses dalam 3-5 hari kerja langsung ke metode pembayaran asal Anda setelah barang kami verifikasi.'
        : 'Refunds are inspected and credited to your original payment method within 3-5 business days of receipt at our returns center.',
    },
    {
      id: 's1-3',
      title: isId ? 'Apakah tersedia opsi penukaran ukuran atau variasi warna?' : 'Do you offer direct exchanges for different sizes or colors?',
      content: isId
        ? 'Ya, Anda dapat memilih penukaran ukuran langsung melalui portal retur mandiri tanpa biaya kirim tambahan.'
        : 'Yes, direct exchange requests can be initiated via our automated returns portal without additional return shipping fees.',
    },
    {
      id: 's1-4',
      title: isId ? 'Bagaimana cara menghubungi tim bantuan pelanggan langsung?' : 'Can I speak directly with a customer service specialist?',
      icon: <Headphones size={18} />,
      content: isId
        ? 'Layanan bantuan langsung tersedia 24 jam setiap hari melalui live chat interaktif atau panggilan hotline bebas pulsa.'
        : 'Live specialist assistance is available 24/7 with immediate routing via phone hotline or live chat widget.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 2 Items (Two Columns)
  // ─────────────────────────────────────────────────────────────────────────────
  const style2ColLeft: AccordionItem[] = [
    {
      id: 's2-1',
      title: isId ? 'Metode pembayaran apa saja yang didukung secara global?' : 'What payment methods are supported globally?',
      defaultOpen: true,
      badge: <ShieldCheck size={16} style={{ color: 'var(--color-primary)' }} />,
      content: isId
        ? 'Kami menerima kartu Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, dan transfer bank SEPA regional.'
        : 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and regional SEPA bank transfers.',
    },
    {
      id: 's2-2',
      title: isId ? 'Apakah transaksi mata uang asing dikonversi otomatis?' : 'Are international transactions converted automatically?',
      content: isId
        ? 'Ya, mata uang asing dikonversi secara real-time berdasarkan nilai kurs pasar interbank tanpa biaya tersembunyi.'
        : 'Yes, international transactions are settled in real-time based on interbank exchange rates without hidden markups.',
    },
    {
      id: 's2-3',
      title: isId ? 'Bagaimana cara mengajukan faktur bebas pajak perusahaan?' : 'How can I request a tax-exempt business invoice?',
      content: isId
        ? 'Kirimkan NPWP atau nomor VAT valid pada pengaturan pembayaran sebelum tanggal siklus penagihan.'
        : 'Submit your valid corporate VAT or tax identification number in billing settings prior to your invoice cycle.',
    },
  ];

  const style2ColRight: AccordionItem[] = [
    {
      id: 's2-4',
      title: isId ? 'Di mana saya dapat menemukan rekaman faktur PPN masa lalu?' : 'Where can I find our historical VAT receipts?',
      content: isId
        ? 'Semua faktur digital tersedia dalam format PDF berstandar hukum di menu Pengaturan Akun > Riwayat Faktur.'
        : 'All legally compliant VAT invoices are archived in PDF format under Account Settings > Billing History.',
    },
    {
      id: 's2-5',
      title: isId ? 'Dapatkah akun perusahaan mendaftarkan lebih dari satu kontak penagihan?' : 'Can our account support multiple invoice recipients?',
      content: isId
        ? 'Anda dapat menambahkan hingga 5 alamat email penerima notifikasi invoice otomatis untuk tim keuangan Anda.'
        : 'You can designate up to 5 additional finance email recipients for automatic monthly billing dispatch.',
    },
    {
      id: 's2-6',
      title: isId ? 'Kapan tanggal penutupan siklus penagihan bulanan kami?' : 'When is our recurring monthly billing renewal anchor date?',
      content: isId
        ? 'Siklus penagihan diperbarui setiap tanggal yang sama saat Anda pertama kali mengaktifkan paket langganan.'
        : 'Your renewal date recurs on the exact day of the month corresponding to your original subscription activation.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 3 Items (Categorized Tabs + Numbered)
  // ─────────────────────────────────────────────────────────────────────────────
  const allStyle3Items = [
    {
      id: 's3-1',
      category: 'billing',
      number: '01',
      title: isId ? 'Bagaimana cara upgrade atau mengubah paket langganan?' : 'How do I upgrade or change our workspace plan tier?',
      defaultOpen: true,
      content: isId
        ? 'Upgrade dapat dilakukan kapan saja melalui Pengaturan > Paket. Kredit hari yang belum terpakai akan otomatis dipotongkan secara prorata.'
        : 'You can upgrade at any time via Workspace Settings > Plans. Unused days are automatically credited towards your new tier.',
    },
    {
      id: 's3-2',
      category: 'billing',
      number: '02',
      title: isId ? 'Bagaimana perhitungan diskon langganan tahunan?' : 'How do annual subscription billing discounts work?',
      content: isId
        ? 'Paket tahunan memberikan potongan harga langsung sebesar 20% dibanding skema pembayaran bulanan reguler.'
        : 'Annual billing tiers provide an upfront 20% discount compared to recurring monthly invoicing.',
    },
    {
      id: 's3-3',
      category: 'account',
      number: '03',
      title: isId ? 'Apa yang terjadi jika kapasitas penyimpanan mencapai batas?' : 'What happens when storage capacity limits are reached?',
      content: isId
        ? 'Akun akan mendapatkan masa tenggang 7 hari dan notifikasi email sebelum pembatasan unggahan baru diberlakukan.'
        : 'Workspaces enter a 7-day grace period with email alerts before additional file uploads are throttled.',
    },
    {
      id: 's3-4',
      category: 'account',
      number: '04',
      title: isId ? 'Bagaimana cara mentransfer kepemilikan workspace ke akun lain?' : 'How do I transfer organization ownership to a new administrator?',
      content: isId
        ? 'Pemilik saat ini dapat menunjuk administrator lain sebagai Owner utama dari menu Manajemen Anggota Tim.'
        : 'The primary workspace owner can transfer root ownership from the Team & Members management console.',
    },
    {
      id: 's3-5',
      category: 'security',
      number: '05',
      title: isId ? 'Di mana saya dapat memantau kuota panggilan API secara real-time?' : 'Where can I inspect real-time API call quotas and metrics?',
      content: isId
        ? 'Metrik throughput dan kuota panggilan API dapat dipantau langsung pada dashboard Developer Analytics.'
        : 'Live throughput graphs and remaining request allowances are displayed in the Developer Analytics dashboard.',
    },
  ];

  const filteredStyle3Items = useMemo(() => {
    if (style3Category === 'all') return allStyle3Items;
    return allStyle3Items.filter((item) => item.category === style3Category);
  }, [style3Category]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 4 Items (Minimalist Hairline with Soft Active Card)
  // ─────────────────────────────────────────────────────────────────────────────
  const style4Items: AccordionItem[] = [
    {
      id: 's4-1',
      title: isId ? 'Bagaimana cara mengundang anggota tamu eksternal ke kanal bersama?' : 'How do I invite external guest members to shared channels?',
      content: isId
        ? 'Klik "Undang Anggota" pada header kanal, pilih jenis izin Tamu Terbatas, lalu kirim tautan undangan yang berlaku 48 jam.'
        : 'Click "Invite Members" on the channel header, designate Single-Channel Guest access, and send an invitation link valid for 48 hours.',
    },
    {
      id: 's4-2',
      title: isId ? 'Dapatkah saya mengekspor data telemetri analitik mentah dalam CSV atau JSON?' : 'Can I export raw analytical telemetry data in CSV or JSON?',
      defaultOpen: true,
      content: isId
        ? 'Ya, seluruh data log aktivitas dan metrik performa dapat diekspor kapan saja dalam format CSV atau JSON streaming terstruktur.'
        : 'Yes, all administrative workspaces can export complete raw event logs, visitor telemetry, and aggregate metrics in standard CSV or JSON streaming formats.',
    },
    {
      id: 's4-3',
      title: isId ? 'Berapa batas ukuran file maksimum untuk unggahan cloud langsung?' : 'What is the maximum file size for direct cloud upload?',
      content: isId
        ? 'Batas ukuran file per berkas adalah 5GB untuk paket Pro dan hingga 50GB untuk akun Enterprise dengan multi-part upload.'
        : 'Individual file uploads support up to 5GB on Pro plans and up to 50GB on Enterprise plans utilizing accelerated multipart streaming.',
    },
    {
      id: 's4-4',
      title: isId ? 'Bagaimana kebijakan retensi berlaku untuk file yang telah dihapus?' : 'How do retention lifecycle policies apply to deleted files?',
      content: isId
        ? 'File yang dihapus disimpan di Trash selama 30 hari sebelum dimusnahkan secara permanen sesuai standar audit SOC 2.'
        : 'Deleted files reside in the workspace trash bin for 30 days before permanent zeroization compliant with SOC 2 policies.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 5 Items (Split Hero Sidebar)
  // ─────────────────────────────────────────────────────────────────────────────
  const style5Items: AccordionItem[] = [
    {
      id: 's5-1',
      title: isId ? 'Berapa garansi SLA uptime untuk Cloud Enterprise?' : 'What is the SLA uptime guarantee for Cloud Enterprise?',
      badge: <NeuronBadge size="xs" variant="brand">99.99%</NeuronBadge>,
      defaultOpen: true,
      content: isId
        ? 'Kami menjamin ketersediaan layanan 99.99% dengan kompensasi kredit layanan otomatis jika terjadi downtime di luar jadwal perawatan.'
        : 'We provide a 99.99% uptime SLA guarantee backed by contractual financial service credits for any unscheduled outages.',
    },
    {
      id: 's5-2',
      title: isId ? 'Bagaimana cara mengonfigurasi penyedia identitas SAML 2.0 / Okta?' : 'How do I configure custom SAML 2.0 / Okta Identity Providers?',
      badge: <NeuronBadge size="xs" variant="default">SSO</NeuronBadge>,
      content: isId
        ? 'Integrasi SAML 2.0 mendukung Okta, Azure AD, PingFederate, dan Google Workspace dengan automated user provisioning SCIM.'
        : 'Native SAML 2.0 integration supports Okta, Microsoft Entra ID, PingFederate, and Google Workspace with automated SCIM provisioning.',
    },
    {
      id: 's5-3',
      title: isId ? 'Apakah tersedia opsi deployment private VPC terisolasi?' : 'Are dedicated private VPC instances available for compliance?',
      badge: <NeuronBadge size="xs" variant="success">Enterprise</NeuronBadge>,
      content: isId
        ? 'Tersedia opsi tenancy terisolasi penuh pada region AWS, GCP, atau Azure pilihan Anda dengan dedicated IP routing.'
        : 'Dedicated single-tenant infrastructure deployments are available across AWS, GCP, and Azure regions with dedicated IP routing.',
    },
    {
      id: 's5-4',
      title: isId ? 'Bagaimana mekanisme backup data otomatis per jam?' : 'How do automated continuous backups and point-in-time recovery operate?',
      content: isId
        ? 'Database dicadangkan otomatis setiap jam dengan enkripsi kunci KMS dan replikasi geografis multi-region.'
        : 'Databases are snapshotted continuously with point-in-time recovery up to 35 days across geographically diverse regions.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 6 Items (Floating Cards with Circle Avatars & Badges)
  // ─────────────────────────────────────────────────────────────────────────────
  const style6Items: AccordionItem[] = [
    {
      id: 's6-1',
      avatarIcon: true,
      icon: <MessageSquare size={18} />,
      title: isId ? 'Kirim pesan omnikanal & webhook dispatch waktu nyata' : 'Omnichannel customer messaging & real-time webhook dispatch',
      badge: <NeuronBadge size="xs" variant="default">Messaging</NeuronBadge>,
      content: isId
        ? 'Hubungkan alur kerja ke kanal komunikasi populer seperti Slack, WhatsApp Business, dan email transaksional dengan tanda tangan HMAC.'
        : 'Connect workflows to customer touchpoints like Slack, WhatsApp Business API, and transactional email with HMAC SHA-256 signatures.',
    },
    {
      id: 's6-2',
      avatarIcon: true,
      icon: <ShieldCheck size={18} />,
      title: isId ? 'Enkripsi data end-to-end dan sertifikasi kepatuhan global' : 'End-to-end data encryption and global compliance certifications',
      badge: <NeuronBadge size="xs" variant="brand">SOC-2</NeuronBadge>,
      defaultOpen: true,
      content: isId
        ? 'Seluruh lalu lintas diamankan dengan TLS 1.3 saat transit dan enkripsi AES-256 at-rest. Kami diaudit secara berkala untuk kepatuhan SOC 2 Type II dan ISO 27001.'
        : 'All customer traffic is secured using TLS 1.3 encryption in transit and AES-256 with KMS key management at rest. We undergo biannual independent third-party SOC 2 Type II and ISO 27001 audits.',
    },
    {
      id: 's6-3',
      avatarIcon: true,
      icon: <CreditCard size={18} />,
      title: isId ? 'Faktur otomatis, withholding pajak & multi-currency billing' : 'Automated invoicing, tax withholding & multi-currency billing',
      badge: <NeuronBadge size="xs" variant="success">Active</NeuronBadge>,
      content: isId
        ? 'Otomatisasi kalkulasi PPN/GST lintas yurisdiksi dan rekonsiliasi pembayaran dengan perbankan lokal.'
        : 'Automate cross-border VAT/GST calculations and payment reconciliation directly with local banking partners.',
    },
    {
      id: 's6-4',
      avatarIcon: true,
      icon: <Zap size={18} />,
      title: isId ? 'Edge compute functions dan pipa streaming data tanpa latensi' : 'Edge compute functions and sub-millisecond streaming pipeline',
      badge: <NeuronBadge size="xs" variant="warning">Pro</NeuronBadge>,
      content: isId
        ? 'Jalankan komputasi serverless pada lebih dari 300 titik edge CDN terdistribusi dengan waktu cold-start di bawah 5 milidetik.'
        : 'Execute serverless compute routines across 300+ distributed global edge locations with sub-5ms cold-start latency.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 7 Items (Vivid Gradient Active Card)
  // ─────────────────────────────────────────────────────────────────────────────
  const style7Items: AccordionItem[] = [
    {
      id: 's7-1',
      title: isId ? 'Bagaimana cara membuat dan mengelola kredensial API berizin ketat?' : 'How do I generate and manage fine-grained API credentials?',
      subtitle: isId ? 'Scope perizinan, batas throughput token, dan rotasi secret' : 'Permission scopes, rate-limiting tokens, and secret rotation',
      defaultOpen: true,
      content: isId
        ? 'Buka menu Pengembang > API Keys, klik "Buat Kunci Rahasia Baru", pilih batasan scope minimal yang diperlukan, dan simpan kunci rahasia Anda pada secret manager.'
        : 'Navigate to Developer Settings > API Keys, click "Generate New Secret Key", choose the minimal permission scopes required, and store the private key securely in your secret manager.',
    },
    {
      id: 's7-2',
      title: isId ? 'Dapatkah saya mengaktifkan whitelist IP untuk permintaan API produksi?' : 'Can I configure IP allowlisting for production API requests?',
      content: isId
        ? 'Ya, Anda dapat menentukan rentang CIDR IPv4/IPv6 yang diizinkan untuk membatasi pemanggilan endpoint produksi.'
        : 'Yes, define specific IPv4 and IPv6 CIDR blocks permitted to invoke production API keys to prevent unauthorized traffic.',
    },
    {
      id: 's7-3',
      title: isId ? 'Berapa batas rate limit untuk paket standar dibanding enterprise?' : 'What are the default rate limits for standard versus enterprise tiers?',
      content: isId
        ? 'Paket standar memiliki batasan 1.000 req/menit, sedangkan paket enterprise mendukung hingga 25.000+ req/menit dengan bursting dinamis.'
        : 'Standard tiers allow 1,000 requests/minute, whereas Enterprise accounts support 25,000+ requests/minute with elastic bursting.',
    },
    {
      id: 's7-4',
      title: isId ? 'Bagaimana cara memeriksa rekaman log payload webhook waktu nyata?' : 'How do I inspect real-time webhook payload delivery logs?',
      content: isId
        ? 'Log webhook mencatat status kode HTTP respon, payload JSON yang dikirimkan, serta tombol coba-ulang (retry) instan.'
        : 'Webhook logs capture HTTP status codes, dispatched JSON payloads, and provide instant replay/retry mechanisms.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 8 Items (Soft Contained Rounded Pill Cards)
  // ─────────────────────────────────────────────────────────────────────────────
  const style8Items: AccordionItem[] = [
    {
      id: 's8-1',
      title: isId ? 'Bagaimana verifikasi domain kustom dan sertifikat SSL otomatis bekerja?' : 'How do automated domain verification and SSL certificates work?',
      defaultOpen: true,
      content: isId
        ? 'Setiap kali Anda menghubungkan domain kustom, edge CDN kami otomatis menerbitkan dan memperpanjang sertifikat wildcard Let\'s Encrypt SSL/TLS secara transparan.'
        : 'Whenever you connect a custom domain, our edge CDN automatically provisions and renews wildcard Let\'s Encrypt SSL/TLS certificates via DNS-01 or HTTP-01 verification.',
    },
    {
      id: 's8-2',
      title: isId ? 'Dapatkah saya mengunggah sertifikat SSL EV atau Wildcard milik sendiri?' : 'Can I upload custom enterprise EV or Wildcard SSL certificates?',
      content: isId
        ? 'Akun Enterprise dapat mengunggah sertifikat kustom yang ditandatangani oleh Certificate Authority terpercaya pilihan Anda.'
        : 'Enterprise accounts can upload custom PEM certificates signed by any approved corporate Certificate Authority.',
    },
    {
      id: 's8-3',
      title: isId ? 'Data DNS apa saja yang perlu dikonfigurasi untuk routing apex domain?' : 'What DNS records need to be configured for apex domain routing?',
      content: isId
        ? 'Cukup arahkan CNAME flatten atau ALIAS record ke proxy edge CDN kami untuk performa global optimal.'
        : 'Simply configure an ALIAS or CNAME flattening record pointing directly to our global anycast edge proxy.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 9 Items (Bordered with Left Accent Indicator Bar)
  // ─────────────────────────────────────────────────────────────────────────────
  const style9Items: AccordionItem[] = [
    {
      id: 's9-1',
      title: isId ? 'Bagaimana mekanisme rolling deployment zero-downtime beroperasi?' : 'How does zero-downtime rolling deployment operate?',
      content: isId
        ? 'Sistem memeriksa kesiapan container baru sebelum mengalihkan lalu lintas masuk dari versi aplikasi sebelumnya secara mulus.'
        : 'Traffic is seamlessly shifted to healthy new containers only after readiness probes succeed, preventing dropped requests.',
    },
    {
      id: 's9-2',
      title: isId ? 'Kanal monitoring dan alerting apa saja yang didukung langsung?' : 'What monitoring and alerting channels are supported natively?',
      defaultOpen: true,
      content: isId
        ? 'Neudela menyediakan integrasi alert real-time ke Slack, Discord, Microsoft Teams, PagerDuty, OpsGenie, serta webhook HTTP kustom dengan payload JSON terstruktur.'
        : 'Neudela provides native real-time alerting to Slack, Discord, Microsoft Teams, PagerDuty, OpsGenie, and custom HTTP webhook endpoints with customizable JSON schema payloads.',
    },
    {
      id: 's9-3',
      title: isId ? 'Dapatkah saya mengatur rollback otomatis jika health check canary gagal?' : 'Can I configure automated rollbacks upon failed canary health checks?',
      content: isId
        ? 'Ya, jika tingkat error rate melebihi threshold selama fase canary, rilis akan otomatis di-rollback ke versi stabil sebelumnya.'
        : 'Yes, if error rates exceed your designated threshold during a canary phase, the release automatically rolls back instantly.',
    },
    {
      id: 's9-4',
      title: isId ? 'Bagaimana trace terdistribusi dikumpulkan dan dianalisis?' : 'How are distributed telemetry spans collected and sampled?',
      content: isId
        ? 'Komponen kami mendukung standar OpenTelemetry untuk mengirimkan traces, spans, dan metrics ke Datadog, Grafana, atau Jaeger.'
        : 'We natively support OpenTelemetry standards, streaming traces, spans, and metrics to Datadog, Grafana, or Jaeger.',
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Style 10 Items (Step / Numbered Timeline Modern FAQ)
  // ─────────────────────────────────────────────────────────────────────────────
  const style10Items: AccordionItem[] = [
    {
      id: 's10-1',
      number: '01',
      title: isId ? 'Langkah 1: Instal Neudela CLI dan autentikasi lingkungan lokal Anda' : 'Step 1: Install Neudela CLI and authenticate your local environment',
      defaultOpen: true,
      content: isId
        ? 'Jalankan npm install -g @neudela/cli, dilanjutkan dengan neudela login untuk menghubungkan identitas perusahaan Anda.'
        : 'Run npm install -g @neudela/cli, followed by neudela login to link your corporate identity and select your active working directory.',
    },
    {
      id: 's10-2',
      number: '02',
      title: isId ? 'Langkah 2: Inisialisasi konfigurasi scaffolding proyek baru' : 'Step 2: Initialize project scaffolding and configuration file',
      content: isId
        ? 'Ketik neudela init untuk memilih template React/TypeScript dengan token tema dan komponen UI siap pakai.'
        : 'Execute neudela init to select a React/TypeScript preset pre-bundled with design tokens and compound components.',
    },
    {
      id: 's10-3',
      number: '03',
      title: isId ? 'Langkah 3: Hubungkan repositori Git dan aktifkan preview branch' : 'Step 3: Connect your Git repository and set up preview branches',
      content: isId
        ? 'Integrasikan repo GitHub atau GitLab Anda untuk menghasilkan preview URL otomatis pada setiap pull request tim.'
        : 'Connect GitHub or GitLab repositories to generate automated ephemeral preview deployments on every pull request.',
    },
    {
      id: 's10-4',
      number: '04',
      title: isId ? 'Langkah 4: Konfigurasi variabel lingkungan dan secret produksi' : 'Step 4: Configure environment variables and production secrets',
      content: isId
        ? 'Tentukan environment variables terenkripsi pada dashboard proyek atau sinkronkan via CLI command neudela env push.'
        : 'Specify encrypted environment variables in your project settings or synchronize them via the neudela env push CLI command.',
    },
  ];

  return (
    <div className="accordion-gallery-container">
      {/* ── STYLE 1 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 1
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Kontainer Terpadu dengan Ikon Status' : 'Standard Contained Container with Status Indicator'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="default"
          defaultValue="s1-1"
          items={style1Items}
        />
      </div>

      {/* ── STYLE 2 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 2
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Layout Grid 2 Kolom Responsif' : 'Two-Column Responsive Grid Layout'}
            </span>
          </div>
        </div>
        <div className="neuron-accordion--columns-2">
          <NeuronAccordion
            variant="separated"
            defaultValue="s2-1"
            items={style2ColLeft}
          />
          <NeuronAccordion
            variant="separated"
            items={style2ColRight}
          />
        </div>
      </div>

      {/* ── STYLE 3 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 3
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Tab Filter Kategori + Penomoran Indeks' : 'Category Filter Tabs + Numbered Index (01, 02...)'}
            </span>
          </div>
        </div>

        {/* Pill Category Tabs */}
        <div className="accordion-tab-pills">
          {(['all', 'billing', 'account', 'security'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`accordion-tab-pill-btn ${style3Category === cat ? 'is-active' : ''}`}
              onClick={() => setStyle3Category(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <NeuronAccordion
          key={style3Category}
          variant="numbered"
          defaultValue={filteredStyle3Items[0]?.id}
          items={filteredStyle3Items}
        />
      </div>

      {/* ── STYLE 4 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 4
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Pemisah Hairline Minimalis dengan Sorot Aktif' : 'Minimalist Hairline with Soft Active Highlight'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="minimal"
          defaultValue="s4-2"
          items={style4Items}
        />
      </div>

      {/* ── STYLE 5 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 5
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Layout Split Sidebar Hero Banner' : 'Split Hero Sidebar Callout Layout'}
            </span>
          </div>
        </div>

        <div className="accordion-split-layout">
          {/* Left Hero Sidebar */}
          <div className="accordion-split-hero">
            <div>
              <span className="accordion-split-hero-badge">Help Center</span>
              <h3 className="accordion-split-hero-title">
                {isId ? 'Butuh bantuan khusus atau solusi enterprise?' : 'Need dedicated assistance or custom enterprise solutions?'}
              </h3>
              <p className="accordion-split-hero-desc">
                {isId
                  ? 'Tim rekayasa solusi kami siap membantu Anda 24/7 dengan jaminan respons kurang dari 15 menit.'
                  : 'Our specialized solutions engineering team is available 24/7 with guaranteed 15-minute response times.'}
              </p>
            </div>

            <div>
              <button type="button" className="accordion-split-hero-btn">
                <span>{isId ? 'Hubungi Tim Support' : 'Contact Support Team'}</span>
                <ArrowRight size={14} />
              </button>

              <div className="accordion-split-topics">
                <div className="accordion-split-topic-item">
                  <span>{isId ? 'Status Layanan Sistem' : 'System Status Page'}</span>
                  <NeuronBadge size="xs" variant="success">99.99%</NeuronBadge>
                </div>
                <div className="accordion-split-topic-item">
                  <span>{isId ? 'Dokumentasi REST API' : 'REST API Reference'}</span>
                  <ExternalLink size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Accordion List */}
          <div>
            <NeuronAccordion
              variant="separated"
              defaultValue="s5-1"
              items={style5Items}
            />
          </div>
        </div>
      </div>

      {/* ── STYLE 6 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 6
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Kartu Melayang dengan Avatar Ikon Lingkaran' : 'Floating Cards with Circular Icon Avatars & Badges'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="floating"
          defaultValue="s6-2"
          items={style6Items}
        />
      </div>

      {/* ── STYLE 7 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 7
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Aksen Gradasi Solid dengan Tipografi Putih' : 'Vivid Gradient Active Card with High-Contrast Typography'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="gradient"
          defaultValue="s7-1"
          items={style7Items}
        />
      </div>

      {/* ── STYLE 8 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 8
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Kartu Pill Terpisah dengan Sudut Membulat' : 'Soft Contained Rounded Pill Cards'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="pill"
          defaultValue="s8-1"
          items={style8Items}
        />
      </div>

      {/* ── STYLE 9 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 9
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Garis Tepi Vertikal Aksentuasi Kiri (Accent Left)' : 'Bordered Container with Left Accent Bar'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="accent-left"
          defaultValue="s9-2"
          items={style9Items}
        />
      </div>

      {/* ── STYLE 10 ── */}
      <div className="accordion-style-card">
        <div className="accordion-style-card-header">
          <div className="accordion-style-card-title-group">
            <NeuronBadge variant="brand" size="sm" pill>
              Style 10
            </NeuronBadge>
            <span className="accordion-style-badge-sub">
              {isId ? 'Pola Tahapan Bernomor Modern (Step Timeline)' : 'Numbered Step / Timeline Modern FAQ Pattern'}
            </span>
          </div>
        </div>
        <NeuronAccordion
          variant="numbered"
          defaultValue="s10-1"
          items={style10Items}
        />
      </div>
    </div>
  );
}
