import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronBadge from '../../components/NeuronBadge';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronProgress from '../../components/NeuronProgress';
import NeuronDivider from '../../components/NeuronDivider';
import NeuronAlert from '../../components/NeuronAlert';
import { NeuronToggle } from '../../components/NeuronToggle';
import NeuronStepper, { StepperStep } from '../../components/NeuronStepper';
import {
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Receipt,
  QrCode,
  Building2,
  Copy,
  Check,
  ExternalLink,
  FileText,
  ArrowRight,
  ArrowLeft,
  Clock,
  Tag,
  Download,
  Printer,
  RefreshCw,
  Plus,
  Lock,
  RotateCcw,
  X,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  Navigation,
  Wallet,
  Landmark,
  CheckCircle,
  Eye,
} from 'lucide-react';

interface CheckoutPatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export type CheckoutVariantId =
  | 'multi-step-checkout'
  | 'one-page-accordion-checkout'
  | 'payment-gateway-hub'
  | 'b2b-procurement-po'
  | 'order-success-receipt';

export interface CheckoutVariantMeta {
  id: CheckoutVariantId;
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

export const CHECKOUT_VARIANTS: CheckoutVariantMeta[] = [
  {
    id: 'multi-step-checkout',
    nameEn: 'Multi-Step Stepper Checkout',
    nameId: 'Alur Checkout Bertahap (Stepper Flow)',
    taglineEn: 'Structured 4-stage purchasing workflow powered by NeuronStepper, address picker, delivery selector, and sticky order summary.',
    taglineId: 'Alur pembelian terstruktur 4 tahap ditenagai NeuronStepper, pemilihan alamat, ekspedisi, dan ringkasan pesanan lekat.',
    descEn: 'A high-converting enterprise e-commerce checkout flow with linear step progression: Cart & Delivery Address ➔ Shipping Courier & SLA ➔ Payment Instrument ➔ Order Review. Features coupon code validation, real-time tax calculation, and persistent order summary dock.',
    descId: 'Alur checkout e-commerce enterprise berkonversi tinggi dengan progres linier: Keranjang & Alamat ➔ Pilihan Ekspedisi & SLA ➔ Metode Pembayaran ➔ Tinjau Pesanan. Dilengkapi validasi kupon promo, kalkulasi PPN otomatis, dan ringkasan lekat.',
    tags: ['NeuronStepper', 'Multi-Step Flow', 'Address Selector', 'Courier SLA', 'Voucher Promo', 'Flagship'],
    bestForEn: 'Enterprise E-Commerce, Retail Marketplaces, DTC Consumer Brands, Multi-Item Carts',
    bestForId: 'E-Commerce Enterprise, Marketplace Ritel, Brand DTC, Keranjang Belanja Multi-Item',
    badge: 'Flagship Pattern',
    accentColor: '#df7e30',
  },
  {
    id: 'one-page-accordion-checkout',
    nameEn: 'Express Single-Page Accordion Checkout',
    nameId: 'Checkout Cepat Satu Halaman (Accordion)',
    taglineEn: 'Frictionless single-screen checkout with collapsible sections designed for high conversion and mobile parity.',
    taglineId: 'Pengalaman checkout satu layar tanpa reload dengan seksi akordion terlipat untuk rasio konversi maksimal.',
    descEn: 'An ultra-fast checkout experience inspired by modern DTC platforms. Keeps shipping, courier, and payment options on a single responsive screen with animated collapsible accordion panels, live item line editor, and express 1-click checkout options.',
    descId: 'Pengalaman checkout secepat kilat terinspirasi platform modern global. Menggabungkan alamat pengiriman, ekspedisi, dan pembayaran dalam satu layar dengan panel akordion animasi, pengubah jumlah item langsung, dan tombol pembayaran kilat.',
    tags: ['Single Page', 'Accordion Panels', 'Express Checkout', 'Low Friction', 'High Conversion'],
    bestForEn: 'Quick-Commerce, Flash Sales, Mobile-First Web Apps, Minimalist Fashion & Tech Brands',
    bestForId: 'Quick-Commerce, Flash Sale, Aplikasi Web Mobile-First, Brand Fashion & Gadget Minimalis',
    badge: 'High Conversion',
    accentColor: '#10b981',
  },
  {
    id: 'payment-gateway-hub',
    nameEn: 'Omnichannel Payment Gateway & Live QRIS / VA',
    nameId: 'Pusat Gateway Pembayaran & QRIS Dinamis',
    taglineEn: 'Comprehensive payment instrument hub with live QRIS SVG timer countdown, copyable VA numbers, and interactive card flip preview.',
    taglineId: 'Hub instrumen pembayaran multi-kanal dengan QRIS dinamis ber-timer, nomor Virtual Account interaktif, dan simulasi kartu kredit 3D-Secure.',
    descEn: 'A complete Indonesian & Southeast Asian payment gateway interface: Dynamic QRIS with real-time 15-minute expiration countdown and polling simulation, multi-bank Virtual Accounts with one-click copy and ATM instructions, interactive Credit Card preview, E-Wallets, and 0% PayLater installments.',
    descId: 'Antarmuka gateway pembayaran lengkap standar Indonesia & Asia Tenggara: QRIS dinamis dengan hitung mundur 15 menit dan simulasi verifikasi status, Virtual Account multi-bank dengan salin instan & petunjuk m-Banking, kartu kredit interaktif, E-Wallet, dan cicilan 0% PayLater.',
    tags: ['QRIS Live Timer', 'Virtual Account VA', 'Credit Card UI', 'E-Wallets', 'PayLater 0%', 'Instant Copy'],
    bestForEn: 'Fintech Payment Gateways, Subscription Platforms, SaaS Checkouts, Regional Payment Aggregators',
    bestForId: 'Gateway Fintech, Platform Langganan SaaS, Agregator Pembayaran Regional, Toko Online',
    badge: 'Fintech Standard',
    accentColor: '#2563eb',
  },
  {
    id: 'b2b-procurement-po',
    nameEn: 'B2B Corporate Procurement & Purchase Order (PO)',
    nameId: 'Pengadaan Korporat & PO B2B (Faktur Pajak)',
    taglineEn: 'Enterprise purchasing pipeline featuring Purchase Order upload, NPWP tax invoicing, Net 30/60 corporate credit lines, and approval routing.',
    taglineId: 'Alur pengadaan korporat dilengkapi upload dokumen PO, faktur pajak 16-digit NPWP, limit kredit Net 30/60, dan routing persetujuan manajer.',
    descEn: 'Tailored for corporate procurement and wholesale B2B transactions: Purchase order document attachment, 16-digit NPWP validation for electronic tax invoice (Faktur Pajak), corporate credit term limits (Net 30/60 days), and department manager authorization routing.',
    descId: 'Dirancang khusus untuk pengadaan B2B dan transaksi grosir korporat: lampiran berkas PO, validasi NPWP 16 digit untuk e-Faktur Pajak, plafon kredit termin Net 30/60 hari, serta alur otorisasi manajer departemen sebelum pengiriman.',
    tags: ['B2B Procurement', 'Purchase Order PO', 'Faktur Pajak NPWP', 'Net 30 Terms', 'Approval Routing'],
    bestForEn: 'B2B Wholesale Platforms, Supply Chain Hubs, Corporate Equipment Procurement, Enterprise SaaS',
    bestForId: 'Marketplace Grosir B2B, Rantai Pasok Logistik, Pengadaan Peralatan Kantor Korporat, SaaS B2B',
    badge: 'B2B Enterprise',
    accentColor: '#8b5cf6',
  },
  {
    id: 'order-success-receipt',
    nameEn: 'Post-Purchase Confirmation & Digital Invoice',
    nameId: 'Konfirmasi Sukses & Resi Transaksi Digital',
    taglineEn: 'Delightful order success screen with order reference, fulfillment status stepper, PDF receipt download, and map tracking link.',
    taglineId: 'Layar konfirmasi pesanan berhasil dilengkapi referensi unik, stepper status pengiriman, unduh invoice PDF, dan tautan pelacakan kurir.',
    descEn: 'The critical post-checkout experience: Animated checkmark celebration banner, unique order reference #NEU-ORD-98214, live fulfillment timeline using NeuronStepper, itemized purchase breakdown, one-click PDF receipt export, and seamless jump to real-time delivery map tracking.',
    descId: 'Pengalaman pasca-checkout yang menyenangkan: lencana selebrasi sukses animasi, nomor referensi unik #NEU-ORD-98214, linimasa status pemenuhan pesanan dengan NeuronStepper, rincian biaya lengkap, ekspor kwitansi PDF, dan tombol lacak armada di peta Leaflet.',
    tags: ['Order Confirmation', 'Invoice Receipt', 'Order Stepper', 'PDF Export', 'Map Tracking Link'],
    bestForEn: 'E-Commerce Post-Purchase, Food Delivery, Logistics Order Tracking, Digital Invoicing',
    bestForId: 'Purna Transaksi E-Commerce, Layanan Pesan Antar, Pelacakan Pesanan Logistik, E-Receipt',
    badge: 'Post-Purchase',
    accentColor: '#ec4899',
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
// Mini Cart Graphic Silhouette for Pattern Card Gallery
// ─────────────────────────────────────────────────────────────────────────────

function CheckoutMiniSilhouette({ id, isDarkMode }: { id: CheckoutVariantId; isDarkMode: boolean }) {
  const bg = isDarkMode ? '#0f172a' : '#f8fafc';
  const cardBg = isDarkMode ? '#1e293b' : '#ffffff';
  const border = isDarkMode ? '#334155' : '#e2e8f0';
  const accent = '#df7e30';

  if (id === 'multi-step-checkout') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {/* Top mini Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%', justifyContent: 'space-between', padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 800 }}>✓</div>
            <div style={{ height: 2, flex: 1, background: '#10b981' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 800, boxShadow: `0 0 0 3px ${accent}30` }}>2</div>
            <div style={{ height: 2, flex: 1, background: border }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: border, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 8, fontWeight: 800 }}>3</div>
            <div style={{ height: 2, flex: 1, background: border }} />
          </div>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: border, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 8, fontWeight: 800 }}>4</div>
        </div>

        {/* Content split columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 8, flex: 1 }}>
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 6, width: '60%', borderRadius: 3, background: accent, opacity: 0.8 }} />
            <div style={{ height: 18, borderRadius: 4, border: `1.5px solid ${accent}`, background: `${accent}10`, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
              <div style={{ height: 4, width: '45%', borderRadius: 2, background: accent }} />
            </div>
            <div style={{ height: 18, borderRadius: 4, border: `1px solid ${border}`, background: cardBg, display: 'flex', alignItems: 'center', padding: '0 5px', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', border: `1px solid ${border}` }} />
              <div style={{ height: 4, width: '55%', borderRadius: 2, background: border }} />
            </div>
          </div>

          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 5, width: '70%', borderRadius: 2.5, background: '#64748b' }} />
            <div style={{ height: 3, width: '90%', borderRadius: 1.5, background: border }} />
            <div style={{ height: 3, width: '80%', borderRadius: 1.5, background: border }} />
            <div style={{ marginTop: 'auto', height: 14, borderRadius: 4, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ height: 4, width: '50%', borderRadius: 2, background: '#fff' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'one-page-accordion-checkout') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* Collapsed Section 1 (Complete) */}
          <div style={{ background: cardBg, border: `1px solid #10b98150`, borderRadius: 6, padding: '5px 7px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>✓</div>
              <div style={{ width: 45, height: 4, borderRadius: 2, background: isDarkMode ? '#94a3b8' : '#475569' }} />
            </div>
            <div style={{ width: 18, height: 3, borderRadius: 1.5, background: '#10b981' }} />
          </div>

          {/* Active Section 2 (Expanded) */}
          <div style={{ background: cardBg, border: `1.5px solid #10b981`, borderRadius: 6, padding: '6px 7px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
              <div style={{ width: 50, height: 4, borderRadius: 2, background: '#10b981' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 2 }}>
              <div style={{ height: 14, borderRadius: 3, border: '1px solid #10b981', background: '#10b98115' }} />
              <div style={{ height: 14, borderRadius: 3, border: `1px solid ${border}` }} />
            </div>
          </div>

          {/* Collapsed Section 3 */}
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: '5px 7px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: border, color: '#64748b', fontSize: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: border }} />
          </div>
        </div>

        {/* Right summary */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: isDarkMode ? '#334155' : '#e2e8f0' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '80%', height: 3.5, borderRadius: 1.5, background: '#64748b' }} />
              <div style={{ width: '40%', height: 3, borderRadius: 1.5, background: border }} />
            </div>
          </div>
          <div style={{ marginTop: 'auto', height: 16, borderRadius: 4, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ height: 4, width: '60%', borderRadius: 2, background: '#fff' }} />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'payment-gateway-hub') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {/* Left: QRIS SVG Mini Code */}
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <QrCode size={12} color="#2563eb" />
            <span style={{ fontSize: 7, fontWeight: 800, color: '#2563eb' }}>QRIS RESMI</span>
          </div>
          {/* Mini QR box */}
          <div style={{ width: 34, height: 34, borderRadius: 4, border: '2px solid #2563eb', padding: 2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
            <div style={{ background: 'transparent' }} />
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
            <div style={{ background: 'transparent' }} />
            <div style={{ background: '#2563eb', borderRadius: 1 }} />
          </div>
          <div style={{ height: 4, width: 28, borderRadius: 2, background: '#ef4444', opacity: 0.85 }} />
        </div>

        {/* Right: Credit Card Silhouette */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff', boxShadow: '0 4px 10px rgba(37,99,235,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 10, height: 8, borderRadius: 2, background: '#fbbf24' }} />
            <div style={{ width: 14, height: 8, borderRadius: 2, background: '#ffffff', opacity: 0.6 }} />
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            <div style={{ width: 10, height: 2.5, borderRadius: 1, background: '#fff', opacity: 0.9 }} />
            <div style={{ width: 10, height: 2.5, borderRadius: 1, background: '#fff', opacity: 0.9 }} />
            <div style={{ width: 10, height: 2.5, borderRadius: 1, background: '#fff', opacity: 0.9 }} />
            <div style={{ width: 10, height: 2.5, borderRadius: 1, background: '#fff', opacity: 0.9 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 22, height: 2.5, borderRadius: 1, background: '#fff', opacity: 0.7 }} />
            <div style={{ width: 12, height: 2.5, borderRadius: 1, background: '#fff', opacity: 0.7 }} />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'b2b-procurement-po') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* Top corporate badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Building2 size={11} color="#8b5cf6" />
            <span style={{ fontSize: 8, fontWeight: 800, color: '#8b5cf6' }}>PT NEUDELA ENTERPRISE</span>
          </div>
          <span style={{ fontSize: 7, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: '#8b5cf620', color: '#8b5cf6' }}>NET 30</span>
        </div>

        {/* PO & Tax Invoice preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 6, flex: 1 }}>
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 5, padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 4, width: '50%', borderRadius: 2, background: '#8b5cf6' }} />
            <div style={{ height: 12, borderRadius: 3, border: `1px dashed ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ height: 3, width: '70%', borderRadius: 1.5, background: border }} />
            </div>
            <div style={{ height: 4, width: '40%', borderRadius: 2, background: border, marginTop: 'auto' }} />
          </div>

          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 5, padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 4, width: '70%', borderRadius: 2, background: '#10b981' }} />
            <div style={{ height: 4, width: '90%', borderRadius: 2, background: border }} />
            <div style={{ height: 4, width: '60%', borderRadius: 2, background: border }} />
            <div style={{ height: 12, borderRadius: 3, background: '#8b5cf6', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ height: 3, width: '60%', borderRadius: 1.5, background: '#fff' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // order-success-receipt
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      {/* Celebration checkmark */}
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 0 5px #10b98125' }}>
        <Check size={16} strokeWidth={3} />
      </div>
      <div style={{ height: 5, width: 80, borderRadius: 2.5, background: '#10b981' }} />
      <div style={{ height: 3.5, width: 110, borderRadius: 2, background: '#64748b' }} />

      {/* Mini Receipt card */}
      <div style={{ width: '85%', background: cardBg, border: `1px solid ${border}`, borderRadius: 5, padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ height: 3.5, width: 35, borderRadius: 1.5, background: border }} />
        <div style={{ height: 3.5, width: 25, borderRadius: 1.5, background: '#df7e30' }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 1: Multi-Step Stepper Checkout Component
// ─────────────────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
}

const INITIAL_CART: CartItem[] = [
  {
    id: 'c1',
    name: 'Neudela Pro Mechanical Keyboard',
    variant: 'Terracotta Switch · Wireless RGB',
    price: 1250000,
    qty: 1,
    image: '⌨️',
  },
  {
    id: 'c2',
    name: 'Ergonomic Desk Mat 90x40cm',
    variant: 'Slate Grey · Waterproof Wool Felt',
    price: 245000,
    qty: 1,
    image: '📐',
  },
];

interface ShippingOption {
  id: string;
  courier: string;
  service: string;
  etd: string;
  cost: number;
  badge?: string;
  recommended?: boolean;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'jne-reg',
    courier: 'JNE Express',
    service: 'REG (Reguler Darat/Udara)',
    etd: '1 - 2 Hari Kerja',
    cost: 18000,
    recommended: true,
  },
  {
    id: 'sicepat-best',
    courier: 'SiCepat',
    service: 'BEST (Besok Sampai Tujuan)',
    etd: 'Besok Sebelum 17:00',
    cost: 24000,
    badge: 'Paling Cepat',
  },
  {
    id: 'gosend-instant',
    courier: 'GoSend',
    service: 'Instant Courier (Motor)',
    etd: '2 - 3 Jam Tiba',
    cost: 38000,
    badge: 'Same Day',
  },
  {
    id: 'cargo-jne',
    courier: 'JTR Cargo',
    service: 'Trucking Hemat Barang Berat',
    etd: '3 - 5 Hari Kerja',
    cost: 12000,
  },
];

function MultiStepCheckoutPreview({ isDarkProp: _isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [selectedShippingId, setSelectedShippingId] = useState('jne-reg');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bca-va');
  const [voucherCode, setVoucherCode] = useState('NEUDELA15');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(15); // 15%
  const [isVoucherApplied, setIsVoucherApplied] = useState(true);
  const [voucherMsg, setVoucherMsg] = useState('Kupon NEUDELA15 aktif (Hemat 15%)');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const stepsConfig: StepperStep[] = [
    {
      id: 0,
      label: isId ? 'Alamat & Item' : 'Address & Items',
      description: isId ? 'Periksa keranjang' : 'Review cart',
      icon: <ShoppingCart size={14} />,
    },
    {
      id: 1,
      label: isId ? 'Opsi Ekspedisi' : 'Shipping Courier',
      description: isId ? 'Pilih kurir & SLA' : 'Choose speed & SLA',
      icon: <Truck size={14} />,
    },
    {
      id: 2,
      label: isId ? 'Metode Pembayaran' : 'Payment Instrument',
      description: isId ? 'VA, QRIS, Kartu' : 'VA, QRIS, Cards',
      icon: <CreditCard size={14} />,
    },
    {
      id: 3,
      label: isId ? 'Konfirmasi Akhir' : 'Review & Confirm',
      description: isId ? 'Tinjau pesanan' : 'Final check',
      icon: <Receipt size={14} />,
    },
  ];

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = isVoucherApplied ? Math.round((subtotal * appliedDiscount) / 100) : 0;
  const currentShipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShippingId) || SHIPPING_OPTIONS[0];
  const shippingCost = currentShipping.cost;
  const insuranceCost = includeInsurance ? 2500 : 0;
  const ppnTax = Math.round((subtotal - discountAmount) * 0.11);
  const grandTotal = subtotal - discountAmount + shippingCost + insuranceCost + ppnTax;

  const handleApplyVoucher = () => {
    const q = voucherCode.trim().toUpperCase();
    if (q === 'NEUDELA15' || q === 'HEMAT15') {
      setAppliedDiscount(15);
      setIsVoucherApplied(true);
      setVoucherMsg(isId ? 'Kupon aktif: Diskon 15% diterapkan!' : 'Coupon applied: 15% Discount!');
    } else if (q === 'GRATISONGKIR') {
      setAppliedDiscount(10);
      setIsVoucherApplied(true);
      setVoucherMsg(isId ? 'Kupon aktif: Potongan spesial Rp 10.000' : 'Coupon applied: Special discount!');
    } else {
      setIsVoucherApplied(false);
      setVoucherMsg(isId ? 'Kode kupon tidak valid atau kadaluarsa' : 'Invalid or expired coupon code');
    }
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      setOrderPlaced(true);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  if (orderPlaced) {
    return (
      <div style={{ padding: '36px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 450 }}>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 16, boxShadow: '0 10px 25px rgba(16,185,129,0.35)' }}>
          <PackageCheck size={36} />
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          {isId ? 'Pesanan Berhasil Dibuat!' : 'Order Placed Successfully!'}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: 460, margin: '0 0 20px' }}>
          {isId
            ? `Invoice #NEU-ORD-88214 telah diterbitkan sebesar ${formatRupiah(grandTotal)}. Silakan selesaikan pembayaran sebelum batas waktu.`
            : `Invoice #NEU-ORD-88214 has been issued for ${formatRupiah(grandTotal)}. Please complete payment before the countdown expires.`}
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <NeuronButton
            size="md"
            variant="secondary"
            leadingIcon={<RotateCcw size={15} />}
            onClick={() => {
              setOrderPlaced(false);
              setActiveStep(0);
            }}
          >
            {isId ? 'Ulangi Simulasi' : 'Reset Simulation'}
          </NeuronButton>

          <NeuronButton
            size="md"
            variant="primary"
            leadingIcon={<Check size={15} />}
            onClick={() => alert(isId ? 'Mengunduh Invoice PDF resmi...' : 'Downloading PDF Invoice...')}
          >
            {isId ? 'Unduh Resi PDF' : 'Download Invoice'}
          </NeuronButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 18 }}>
      {/* ── Stepper Navigation Header ── */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '16px 22px', boxShadow: 'var(--shadow-sm)' }}>
        <NeuronStepper
          steps={stepsConfig}
          activeStep={activeStep}
          variant="default"
          clickable={true}
          onStepClick={(idx) => setActiveStep(idx)}
        />
      </div>

      {/* ── Main Split Container (Left Workflow + Right Order Summary) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(300px, 1fr)', gap: 18, flex: 1, alignItems: 'start' }}>
        {/* Left Column: Dynamic Step Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* STEP 0: Cart Review & Delivery Address */}
          {activeStep === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Delivery Address Selector */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={18} color="#df7e30" />
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Alamat Pengiriman' : 'Shipping Destination'}
                    </h4>
                  </div>
                  <NeuronButton size="xs" variant="outline" leadingIcon={<Plus size={13} />}>
                    {isId ? 'Tambah Alamat' : 'Add New'}
                  </NeuronButton>
                </div>

                {/* Saved Address Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    {
                      id: 'addr-1',
                      tag: isId ? 'Kantor Utama' : 'Headquarters',
                      isMain: true,
                      recipient: 'Bale Pratama (0812-9842-1102)',
                      address: 'SCBD Lot 8, Jl. Jend. Sudirman Kav. 52-53, Lantai 18',
                      city: 'Kebayoran Baru, Jakarta Selatan 12190',
                    },
                    {
                      id: 'addr-2',
                      tag: isId ? 'Rumah Pribadi' : 'Home',
                      isMain: false,
                      recipient: 'Bale Pratama (0812-9842-1102)',
                      address: 'Jl. Senopati Raya No. 42, Selong',
                      city: 'Kebayoran Baru, Jakarta Selatan 12110',
                    },
                  ].map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        style={{
                          border: isSelected ? '2px solid #df7e30' : '1px solid var(--color-border)',
                          background: isSelected ? 'rgba(223, 126, 48, 0.05)' : 'var(--color-bg-surface)',
                          borderRadius: 12,
                          padding: 14,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, background: isSelected ? '#df7e30' : 'var(--color-bg-subtle)', color: isSelected ? '#fff' : 'var(--color-text-secondary)', padding: '2px 8px', borderRadius: 6 }}>
                            {addr.tag}
                          </span>
                          {isSelected && <CheckCircle2 size={16} color="#df7e30" />}
                        </div>
                        <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>{addr.recipient}</strong>
                        <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                          {addr.address}, {addr.city}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cart Items List */}
              <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {isId ? `Item Pembelian (${cart.length} produk)` : `Cart Items (${cart.length} items)`}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg-canvas)',
                        gap: 12,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                          {item.image}
                        </div>
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.name}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 2 }}>{item.variant}</div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#df7e30', marginTop: 4 }}>
                            {formatRupiah(item.price)}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden', background: 'var(--color-bg-surface)' }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (item.qty > 1) {
                                setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty - 1 } : p)));
                              }
                            }}
                            style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-primary)', fontSize: 14 }}
                          >
                            -
                          </button>
                          <span style={{ width: 28, textAlign: 'center', fontSize: 12.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p)));
                            }}
                            style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-primary)', fontSize: 14 }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Shipping Couriers & SLA */}
          {activeStep === 1 && (
            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Pilih Layanan Kurir & Kecepatan Pengiriman' : 'Select Delivery Courier & SLA'}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                  {isId
                    ? 'Pengiriman dari Warehouse Jakarta Barat ke Kebayoran Baru, Jakarta Selatan'
                    : 'Dispatching from West Jakarta Fulfillment Center to South Jakarta'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SHIPPING_OPTIONS.map((opt) => {
                  const isSelected = selectedShippingId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShippingId(opt.id)}
                      style={{
                        border: isSelected ? '2px solid #df7e30' : '1px solid var(--color-border)',
                        background: isSelected ? 'rgba(223, 126, 48, 0.05)' : 'var(--color-bg-canvas)',
                        borderRadius: 12,
                        padding: '14px 18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', border: isSelected ? '6px solid #df7e30' : '2px solid var(--color-border)', background: '#fff' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{opt.courier}</strong>
                            {opt.badge && (
                              <NeuronBadge size="xs" variant="brand">
                                {opt.badge}
                              </NeuronBadge>
                            )}
                            {opt.recommended && (
                              <NeuronBadge size="xs" variant="success">
                                {isId ? 'Pilihan Populer' : 'Popular'}
                              </NeuronBadge>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                            {opt.service} · <span style={{ fontWeight: 600, color: '#10b981' }}>{opt.etd}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                        {formatRupiah(opt.cost)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shipping Protection / Insurance Toggle */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ShieldCheck size={20} color="#10b981" />
                  <div>
                    <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Asuransi Pengiriman Perlindungan Total' : 'Total Transit Insurance Protection'}
                    </strong>
                    <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                      {isId ? 'Kompensasi penggantian 100% jika paket rusak atau hilang' : '100% replacement reimbursement in case of loss or damage'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#10b981' }}>+Rp 2.500</span>
                  <NeuronToggle
                    checked={includeInsurance}
                    onChange={(checked) => setIncludeInsurance(checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Instruments */}
          {activeStep === 2 && (
            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Pilih Metode Pembayaran Resmi' : 'Select Official Payment Method'}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Tersedia verifikasi instan 24/7 bebas biaya admin tambahan' : 'Instant automated 24/7 confirmation with zero hidden fees'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {[
                  { id: 'bca-va', name: 'BCA Virtual Account', icon: <Landmark size={18} color="#2563eb" />, desc: isId ? 'Otomatis terverifikasi' : 'Automated 24/7 verify' },
                  { id: 'mandiri-va', name: 'Mandiri Livin VA', icon: <Landmark size={18} color="#f59e0b" />, desc: isId ? 'Bayar via Livin/ATM' : 'Pay via Livin app' },
                  { id: 'qris', name: 'QRIS Dinamis Instan', icon: <QrCode size={18} color="#df7e30" />, desc: isId ? 'GoPay, OVO, BCA, Dana' : 'All Mobile Banking QR' },
                  { id: 'cc', name: 'Kartu Kredit / Debit', icon: <CreditCard size={18} color="#8b5cf6" />, desc: isId ? 'Visa, Mastercard, JCB' : '3D Secure 256-bit' },
                  { id: 'gopay', name: 'GoPay / GoPay Coins', icon: <Wallet size={18} color="#06b6d4" />, desc: isId ? 'Langsung potong saldo' : 'Direct balance deduction' },
                ].map((pm) => {
                  const isSelected = selectedPaymentMethod === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPaymentMethod(pm.id)}
                      style={{
                        border: isSelected ? '2px solid #df7e30' : '1px solid var(--color-border)',
                        background: isSelected ? 'rgba(223, 126, 48, 0.05)' : 'var(--color-bg-canvas)',
                        borderRadius: 12,
                        padding: '14px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {pm.icon}
                        </div>
                        {isSelected && <CheckCircle2 size={18} color="#df7e30" />}
                      </div>
                      <div>
                        <strong style={{ fontSize: 13.5, color: 'var(--color-text-primary)' }}>{pm.name}</strong>
                        <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 2 }}>{pm.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Final Order Review */}
          {activeStep === 3 && (
            <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Tinjau Rincian Akhir Sebelum Pembayaran' : 'Final Review Before Payment'}
                </h4>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Pastikan data alamat, nomor kontak, dan metode pembayaran sudah sesuai' : 'Ensure delivery destination and payment instruments are accurate'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
                    {isId ? 'Tujuan Pengiriman' : 'Destination'}
                  </div>
                  <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Bale Pratama</strong>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                    SCBD Lot 8, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan
                  </p>
                </div>

                <div style={{ padding: 14, borderRadius: 10, border: '1px solid var(--color-border)', background: 'var(--color-bg-canvas)' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>
                    {isId ? 'Kurir & Metode Bayar' : 'Courier & Payment'}
                  </div>
                  <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>{currentShipping.courier} ({currentShipping.service})</strong>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#df7e30', fontWeight: 700 }}>
                    {selectedPaymentMethod.toUpperCase()} · Instant Verify
                  </p>
                </div>
              </div>

              <NeuronAlert
                variant="info"
                title={isId ? 'Kebijakan Pengembalian & Garansi' : 'Return Policy & Guarantee'}
                description={
                  isId
                    ? 'Pesanan ini dilindungi garansi resmi toko 14 hari tukar baru dan jaminan asuransi pengiriman 100% utuh.'
                    : 'This order is backed by a 14-day replacement guarantee and 100% full transit insurance protection.'
                }
              />
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
            <NeuronButton
              size="md"
              variant="secondary"
              leadingIcon={<ArrowLeft size={15} />}
              disabled={activeStep === 0}
              onClick={handlePrevStep}
            >
              {isId ? 'Kembali' : 'Previous Step'}
            </NeuronButton>

            <NeuronButton
              size="md"
              variant="primary"
              trailingIcon={activeStep === 3 ? <Check size={16} /> : <ArrowRight size={15} />}
              onClick={handleNextStep}
              style={{ minWidth: 160 }}
            >
              {activeStep === 3
                ? isId ? 'Bayar Sekarang' : 'Place Order Now'
                : isId ? 'Lanjutkan' : 'Continue'}
            </NeuronButton>
          </div>
        </div>

        {/* Right Column: Sticky Order Summary & Voucher */}
        <div
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 14,
            padding: '20px',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isId ? 'Ringkasan Pesanan' : 'Order Summary'}
          </h4>

          {/* Voucher promo input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <NeuronInput
                placeholder="Kode Promo (cth: NEUDELA15)"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                leadingIcon={<Tag size={15} color="#df7e30" />}
                style={{ height: '38px', flex: 1 }}
              />
              <NeuronButton
                size="sm"
                variant="secondary"
                onClick={handleApplyVoucher}
                style={{ height: '38px', whiteSpace: 'nowrap' }}
              >
                {isId ? 'Terapkan' : 'Apply'}
              </NeuronButton>
            </div>
            {voucherMsg && (
              <span style={{ fontSize: 11, fontWeight: 700, color: isVoucherApplied ? '#10b981' : '#ef4444' }}>
                {voucherMsg}
              </span>
            )}
          </div>

          <NeuronDivider />

          {/* Price breakdown table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>{isId ? 'Total Harga Item' : 'Items Subtotal'}</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatRupiah(subtotal)}</span>
            </div>

            {isVoucherApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                <span>{isId ? `Diskon Kupon (${appliedDiscount}%)` : `Voucher Discount (${appliedDiscount}%)`}</span>
                <span>-{formatRupiah(discountAmount)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>{isId ? 'Ongkos Kirim' : 'Delivery Shipping'}</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatRupiah(shippingCost)}</span>
            </div>

            {includeInsurance && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                <span>{isId ? 'Asuransi Pengiriman' : 'Transit Insurance'}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatRupiah(insuranceCost)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>{isId ? 'PPN 11%' : 'VAT 11%'}</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatRupiah(ppnTax)}</span>
            </div>

            <NeuronDivider />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Total Tagihan' : 'Grand Total'}
                </strong>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                  {isId ? 'Termasuk PPN & Biaya Layanan' : 'Tax & service fee included'}
                </div>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#df7e30' }}>
                {formatRupiah(grandTotal)}
              </span>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
            <Lock size={14} color="#10b981" />
            <span>{isId ? 'Enkripsi SSL 256-Bit Resmi & Terlindungi' : '256-Bit SSL Encrypted Official Checkout'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 2: Express Single-Page Accordion Checkout Component
// ─────────────────────────────────────────────────────────────────────────────

function OnePageAccordionCheckoutPreview({ isDarkProp: _isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [expandedSection, setExpandedSection] = useState<'address' | 'shipping' | 'payment'>('shipping');
  const [selectedCourier, setSelectedCourier] = useState('sicepat');
  const [selectedPayment, setSelectedPayment] = useState('qris');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(280px, 1fr)', gap: 18, height: '100%', alignItems: 'start' }}>
      {/* Left Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Accordion 1: Contact & Address */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <div
            onClick={() => setExpandedSection(expandedSection === 'address' ? 'shipping' : 'address')}
            style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'var(--color-bg-canvas)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>✓</div>
              <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>
                1. {isId ? 'Informasi Kontak & Alamat Pengiriman' : 'Contact & Shipping Address'}
              </strong>
            </div>
            {expandedSection === 'address' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {expandedSection === 'address' ? (
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <NeuronInput placeholder="Nama Lengkap" defaultValue="Bale Pratama" label="Nama Penerima" />
                <NeuronInput placeholder="Nomor Handphone" defaultValue="081298421102" label="Nomor Telepon" />
              </div>
              <NeuronInput placeholder="Alamat Lengkap" defaultValue="SCBD Lot 8, Senopati Raya, Kebayoran Baru" label="Alamat Jalan" />
              <NeuronButton size="sm" variant="primary" onClick={() => setExpandedSection('shipping')} style={{ alignSelf: 'flex-start' }}>
                {isId ? 'Simpan & Lanjut ke Pengiriman' : 'Save & Continue'}
              </NeuronButton>
            </div>
          ) : (
            <div style={{ padding: '8px 18px 12px 52px', fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Bale Pratama (0812-9842-1102) · SCBD Lot 8, Jakarta Selatan
            </div>
          )}
        </div>

        {/* Accordion 2: Shipping Method */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <div
            onClick={() => setExpandedSection(expandedSection === 'shipping' ? 'payment' : 'shipping')}
            style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'var(--color-bg-canvas)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>2</div>
              <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>
                2. {isId ? 'Opsi Layanan Pengiriman' : 'Delivery Service Option'}
              </strong>
            </div>
            {expandedSection === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {expandedSection === 'shipping' && (
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { id: 'sicepat', name: 'SiCepat Next Day', time: 'Besok Tiba', cost: 22000 },
                { id: 'jne', name: 'JNE Reguler', time: '1-2 Hari', cost: 16000 },
                { id: 'instant', name: 'Instant Delivery 3 Jam', time: 'Hari ini', cost: 35000 },
              ].map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourier(c.id)}
                  style={{
                    border: selectedCourier === c.id ? '2px solid #10b981' : '1px solid var(--color-border)',
                    background: selectedCourier === c.id ? 'rgba(16, 185, 129, 0.06)' : 'var(--color-bg-surface)',
                    borderRadius: 10,
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', border: selectedCourier === c.id ? '5px solid #10b981' : '1.5px solid var(--color-border)' }} />
                    <div>
                      <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>{c.name}</strong>
                      <div style={{ fontSize: 11.5, color: '#10b981', fontWeight: 600 }}>{c.time}</div>
                    </div>
                  </div>
                  <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Rp {c.cost.toLocaleString('id-ID')}</strong>
                </div>
              ))}
              <NeuronButton size="sm" variant="primary" onClick={() => setExpandedSection('payment')} style={{ alignSelf: 'flex-start', marginTop: 6 }}>
                {isId ? 'Lanjut ke Pembayaran' : 'Proceed to Payment'}
              </NeuronButton>
            </div>
          )}
        </div>

        {/* Accordion 3: Payment Method */}
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
          <div
            onClick={() => setExpandedSection('payment')}
            style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'var(--color-bg-canvas)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>3</div>
              <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>
                3. {isId ? 'Metode Pembayaran' : 'Payment Instrument'}
              </strong>
            </div>
            {expandedSection === 'payment' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {expandedSection === 'payment' && (
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { id: 'qris', name: 'QRIS Instan', icon: <QrCode size={16} /> },
                  { id: 'bca', name: 'BCA Virtual Account', icon: <Landmark size={16} /> },
                  { id: 'cc', name: 'Kartu Kredit', icon: <CreditCard size={16} /> },
                  { id: 'gopay', name: 'GoPay 1-Click', icon: <Wallet size={16} /> },
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPayment(p.id)}
                    style={{
                      border: selectedPayment === p.id ? '2px solid #2563eb' : '1px solid var(--color-border)',
                      background: selectedPayment === p.id ? 'rgba(37, 99, 235, 0.06)' : 'var(--color-bg-surface)',
                      borderRadius: 10,
                      padding: 12,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {p.icon}
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--color-text-primary)' }}>{p.name}</span>
                  </div>
                ))}
              </div>

              <NeuronButton size="md" variant="primary" onClick={() => alert(isId ? 'Memproses pesanan express...' : 'Processing express order...')} style={{ marginTop: 8 }}>
                {isId ? 'Bayar Sekarang (Rp 1.495.000)' : 'Pay Now (Rp 1,495,000)'}
              </NeuronButton>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Mini Cart Summary */}
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '18px', boxShadow: 'var(--shadow-md)' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '14.5px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Ringkasan Belanja' : 'Order Items'}
        </h4>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--color-bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            ⌨️
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>Neudela Pro Keyboard</strong>
            <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>1x · Switch Terracotta</div>
          </div>
          <strong style={{ fontSize: 13, color: '#df7e30' }}>Rp 1.250.000</strong>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14, fontSize: 12.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>Subtotal</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Rp 1.250.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>{isId ? 'Ongkos Kirim' : 'Shipping'}</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Rp 22.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>{isId ? 'PPN 11%' : 'VAT 11%'}</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Rp 137.500</span>
          </div>
          <NeuronDivider />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>Total</strong>
            <span style={{ fontSize: 17, fontWeight: 800, color: '#df7e30' }}>Rp 1.409.500</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 3: Omnichannel Payment Gateway & Live QRIS / VA Hub
// ─────────────────────────────────────────────────────────────────────────────

function PaymentGatewayHubPreview({ isDarkProp: _isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [activeTab, setActiveTab] = useState<'qris' | 'va' | 'card' | 'ewallet'>('qris');
  const [selectedBank, setSelectedBank] = useState('bca');
  const [copiedVA, setCopiedVA] = useState(false);
  const [qrisTimer, setQrisTimer] = useState(895); // 14:55
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Credit Card Form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9812');
  const [cardHolder, setCardHolder] = useState('BALE PRATAMA');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('821');

  // QRIS Countdown timer
  useEffect(() => {
    if (isPaid) return;
    const interval = setInterval(() => {
      setQrisTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaid]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const vaNumberMap: Record<string, string> = {
    bca: '8277 0812 9842 1102',
    mandiri: '8890 8081 2984 2110',
    bni: '9881 2002 9842 1102',
    bri: '1029 8081 2984 2110',
  };

  const handleCopyVA = () => {
    navigator.clipboard?.writeText(vaNumberMap[selectedBank].replace(/\s/g, ''));
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const handleCheckStatus = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsPaid(true);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 18 }}>
      {/* Tab Selector */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
        {[
          { id: 'qris', label: 'QRIS Dinamis', icon: <QrCode size={15} /> },
          { id: 'va', label: 'Virtual Account (VA)', icon: <Landmark size={15} /> },
          { id: 'card', label: 'Kartu Kredit / Debit', icon: <CreditCard size={15} /> },
          { id: 'ewallet', label: 'E-Wallet / PayLater', icon: <Wallet size={15} /> },
        ].map((tab) => (
          <NeuronButton
            key={tab.id}
            size="sm"
            variant={activeTab === tab.id ? 'primary' : 'secondary'}
            leadingIcon={tab.icon}
            onClick={() => setActiveTab(tab.id as any)}
            style={{ borderRadius: 20 }}
          >
            {tab.label}
          </NeuronButton>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        {/* QRIS Tab */}
        {activeTab === 'qris' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '3px 8px', borderRadius: 6, background: '#ef444415', color: '#ef4444', fontWeight: 800, fontSize: 11 }}>
                QRIS NASIONAL
              </div>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                BCA, GoPay, OVO, ShopeePay, DANA, Livin
              </span>
            </div>

            {/* Simulated Live QR Code SVG */}
            <div style={{ position: 'relative', padding: 18, background: '#ffffff', borderRadius: 16, border: '2px solid #2563eb', boxShadow: '0 10px 25px rgba(37,99,235,0.15)' }}>
              <svg width="180" height="180" viewBox="0 0 180 180">
                <rect width="180" height="180" fill="#ffffff" />
                {/* 3 Large Corner Position Markers */}
                <rect x="15" y="15" width="40" height="40" fill="#0f172a" rx="4" />
                <rect x="23" y="23" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="29" y="29" width="12" height="12" fill="#0f172a" rx="1" />

                <rect x="125" y="15" width="40" height="40" fill="#0f172a" rx="4" />
                <rect x="133" y="23" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="139" y="29" width="12" height="12" fill="#0f172a" rx="1" />

                <rect x="15" y="125" width="40" height="40" fill="#0f172a" rx="4" />
                <rect x="23" y="133" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="29" y="139" width="12" height="12" fill="#0f172a" rx="1" />

                {/* Data Grid Dots */}
                {[
                  [70, 20], [85, 20], [100, 20],
                  [70, 35], [95, 35],
                  [75, 50], [90, 50], [105, 50],
                  [20, 70], [35, 70], [50, 70], [70, 70], [90, 70], [110, 70], [130, 70], [150, 70],
                  [30, 85], [60, 85], [85, 85], [115, 85], [140, 85],
                  [20, 100], [45, 100], [70, 100], [95, 100], [120, 100], [155, 100],
                  [70, 125], [85, 125], [105, 125], [135, 125], [150, 125],
                  [75, 140], [100, 140], [120, 140], [145, 140],
                  [80, 155], [95, 155], [115, 155], [135, 155], [155, 155],
                ].map(([x, y], i) => (
                  <rect key={i} x={x} y={y} width="9" height="9" fill="#0f172a" rx="1.5" />
                ))}

                {/* Center Neudela Logo Stamp */}
                <circle cx="90" cy="90" r="16" fill="#ffffff" stroke="#df7e30" strokeWidth="2.5" />
                <circle cx="90" cy="90" r="10" fill="#df7e30" />
              </svg>
            </div>

            {/* Countdown timer pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: isPaid ? '#10b98120' : '#ef444415', color: isPaid ? '#10b981' : '#ef4444', fontWeight: 700, fontSize: 13 }}>
              <Clock size={15} />
              <span>{isPaid ? (isId ? 'Pembayaran Berhasil Diverifikasi!' : 'Payment Verified!') : `Kedaluwarsa dalam: ${formatTimer(qrisTimer)}`}</span>
            </div>

            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 380 }}>
              {isId
                ? 'Buka aplikasi e-wallet atau mobile banking favorit Anda, pilih menu Scan QR, lalu arahkan kamera ke kode di atas.'
                : 'Open your mobile banking or e-wallet app, tap Scan QR, and point your camera at the QR code above.'}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <NeuronButton
                size="md"
                variant={isPaid ? 'primary' : 'secondary'}
                loading={isVerifying}
                leadingIcon={isPaid ? <CheckCircle size={15} /> : <RefreshCw size={15} />}
                onClick={handleCheckStatus}
              >
                {isPaid ? (isId ? 'Terbayar Lunas ✓' : 'Paid in Full ✓') : (isId ? 'Cek Status Pembayaran' : 'Check Status')}
              </NeuronButton>

              <NeuronButton
                size="md"
                variant="outline"
                leadingIcon={<Download size={15} />}
                onClick={() => alert(isId ? 'Menyimpan QR Code ke galeri...' : 'Saving QR Code image...')}
              >
                {isId ? 'Simpan QR' : 'Save QR'}
              </NeuronButton>
            </div>
          </div>
        )}

        {/* VA Tab */}
        {activeTab === 'va' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['bca', 'mandiri', 'bni', 'bri'].map((b) => (
                <NeuronButton
                  key={b}
                  size="sm"
                  variant={selectedBank === b ? 'primary' : 'secondary'}
                  onClick={() => setSelectedBank(b)}
                  style={{ textTransform: 'uppercase' }}
                >
                  Bank {b}
                </NeuronButton>
              ))}
            </div>

            <div style={{ padding: '20px', borderRadius: 14, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {isId ? `Nomor Virtual Account ${selectedBank.toUpperCase()}` : `${selectedBank.toUpperCase()} Virtual Account Number`}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'monospace', color: '#df7e30', letterSpacing: 1.5, marginTop: 4 }}>
                  {vaNumberMap[selectedBank]}
                </div>
                <div style={{ fontSize: 11.5, color: '#10b981', fontWeight: 600, marginTop: 4 }}>
                  ✓ {isId ? 'Otomatis terverifikasi dalam hitungan detik' : 'Automated 24/7 instant reconciliation'}
                </div>
              </div>

              <NeuronButton
                size="md"
                variant="primary"
                leadingIcon={copiedVA ? <Check size={16} /> : <Copy size={16} />}
                onClick={handleCopyVA}
              >
                {copiedVA ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Salin No. VA' : 'Copy Number')}
              </NeuronButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <strong style={{ fontSize: 13.5, color: 'var(--color-text-primary)' }}>
                {isId ? 'Petunjuk Pembayaran Mobile Banking' : 'Mobile Banking Instructions'}
              </strong>
              <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                <li>Buka aplikasi Mobile Banking {selectedBank.toUpperCase()} Anda.</li>
                <li>Pilih menu <strong>Transfer</strong> ➔ <strong>Virtual Account</strong>.</li>
                <li>Tempelkan nomor VA di atas dan masukkan jumlah tagihan sesuai nominal invoice.</li>
                <li>Konfirmasi nama penerima <strong>NEUDELA PAY</strong> lalu masukkan PIN Anda.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Credit Card Tab */}
        {activeTab === 'card' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(280px, 1.5fr)', gap: 24, alignItems: 'center' }}>
            {/* Interactive Card Canvas Visual */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                borderRadius: 18,
                padding: '22px 24px',
                color: '#ffffff',
                boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
                aspectRatio: '1.58 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: 40, height: 30, borderRadius: 6, background: '#fbbf24', border: '1px solid #f59e0b' }} />
                <span style={{ fontSize: 16, fontWeight: 800, fontStyle: 'italic', letterSpacing: 1 }}>VISA</span>
              </div>

              <div style={{ fontSize: 19, letterSpacing: 3, fontFamily: 'monospace', fontWeight: 700, color: '#f8fafc' }}>
                {cardNumber}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 9.5, color: '#94a3b8', textTransform: 'uppercase' }}>Cardholder</div>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{cardHolder}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9.5, color: '#94a3b8', textTransform: 'uppercase' }}>Expires</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{cardExpiry}</div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <NeuronInput
                label="Nomor Kartu (16 Digit)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                leadingIcon={<CreditCard size={15} />}
              />
              <NeuronInput
                label="Nama Pemilik Kartu"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <NeuronInput
                  label="Masa Berlaku (MM/YY)"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                />
                <NeuronInput
                  label="CVV / CVC (3 Digit)"
                  value={cardCvv}
                  type="password"
                  onChange={(e) => setCardCvv(e.target.value)}
                />
              </div>

              <NeuronButton size="md" variant="primary" onClick={() => alert(isId ? 'Otorisasi 3D-Secure berhasil!' : '3D-Secure authorized!')}>
                {isId ? 'Otorisasi & Bayar (3D-Secure)' : 'Authorize & Pay'}
              </NeuronButton>
            </div>
          </div>
        )}

        {/* E-Wallet / PayLater Tab */}
        {activeTab === 'ewallet' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h4 style={{ margin: 0, fontSize: 14.5, color: 'var(--color-text-primary)' }}>
              {isId ? 'Pilih Saldo E-Wallet atau Cicilan PayLater 0%' : 'Select E-Wallet or 0% PayLater'}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { name: 'GoPay / GoPay Later', limit: 'Saldo: Rp 450.000', promo: 'Cashback 5%' },
                { name: 'ShopeePay / SPayLater', limit: 'Cicilan 0% hingga 12 bln', promo: 'Gratis Ongkir' },
                { name: 'OVO Cash', limit: 'Saldo: Rp 210.000', promo: 'OVO Points 10k' },
                { name: 'Kredivo PayLater', limit: 'Bunga 0% 30 Hari', promo: 'Bunga Ringan' },
              ].map((ew) => (
                <div key={ew.name} style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 14, background: 'var(--color-bg-canvas)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>{ew.name}</strong>
                    <NeuronBadge size="xs" variant="success">{ew.promo}</NeuronBadge>
                  </div>
                  <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>{ew.limit}</span>
                  <NeuronButton size="xs" variant="outline" style={{ marginTop: 6 }}>
                    {isId ? 'Hubungkan Akun' : 'Connect Account'}
                  </NeuronButton>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 4: B2B Procurement & Purchase Order (PO) Component
// ─────────────────────────────────────────────────────────────────────────────

function B2BProcurementPreview({ isDarkProp: _isDarkProp }: { isDarkProp?: boolean }) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [poNumber, setPoNumber] = useState('PO/2026/NEU-OCT/8821');
  const [requireTaxInvoice, setRequireTaxInvoice] = useState(true);
  const [npwpNumber, setNpwpNumber] = useState('01.234.567.8-012.000');
  const [companyName, setCompanyName] = useState('PT Neudela Solusi Digital');
  const [creditTerms, setCreditTerms] = useState('net-30');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, height: '100%', alignItems: 'start' }}>
      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '22px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Building2 size={20} color="#8b5cf6" />
            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isId ? 'Formulir Pengadaan B2B & Purchase Order' : 'B2B Procurement & Purchase Order Form'}
            </h4>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--color-text-secondary)' }}>
            {isId ? 'Otorisasi pengadaan korporat dengan termin Net 30/60 dan penerbitan Faktur Pajak resmi.' : 'Corporate procurement pipeline with Net 30/60 terms and tax invoicing.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <NeuronInput
            label="Nomor Purchase Order (PO)"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
          />
          <NeuronInput
            label="Nama Entitas PT / CV Perusahaan"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* Upload PO document */}
        <div style={{ border: '2px dashed var(--color-border)', borderRadius: 12, padding: 16, textAlign: 'center', background: 'var(--color-bg-canvas)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <FileText size={24} color="#8b5cf6" />
          <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
            {isId ? 'Lampirkan Dokumen Surat Pesanan (PO Resmi Bertandatangan)' : 'Attach Signed PO Document (PDF/DOCX)'}
          </strong>
          <span style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>Maksimal 15 MB · format PDF resmi bertandatangan direksi</span>
          <NeuronButton size="xs" variant="secondary" style={{ marginTop: 4 }}>
            {isId ? 'Pilih Berkas PO' : 'Browse File'}
          </NeuronButton>
        </div>

        {/* Faktur Pajak Section */}
        <div style={{ padding: 14, borderRadius: 12, background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                {isId ? 'Penerbitan e-Faktur Pajak (PPN 11%)' : 'Electronic Tax Invoice Issuance (VAT 11%)'}
              </strong>
              <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>
                {isId ? 'Kirimkan Faktur Pajak ke portal DJP Online perusahaan' : 'Submit e-Faktur directly to Tax Authority'}
              </div>
            </div>
            <NeuronToggle checked={requireTaxInvoice} onChange={(c) => setRequireTaxInvoice(c)} />
          </div>

          {requireTaxInvoice && (
            <NeuronInput
              label="Nomor Pokok Wajib Pajak (NPWP 16 Digit)"
              value={npwpNumber}
              onChange={(e) => setNpwpNumber(e.target.value)}
            />
          )}
        </div>

        {/* Credit Terms Selector */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
            {isId ? 'Termin Pembayaran Korporat' : 'Corporate Payment Terms'}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { id: 'net-30', label: 'Net 30 Days', desc: 'Jatuh tempo 30 hari' },
              { id: 'net-60', label: 'Net 60 Days', desc: 'Jatuh tempo 60 hari' },
              { id: 'cbd', label: 'Cash Before Delivery', desc: 'Bayar di muka' },
            ].map((t) => (
              <div
                key={t.id}
                onClick={() => setCreditTerms(t.id)}
                style={{
                  border: creditTerms === t.id ? '2px solid #8b5cf6' : '1px solid var(--color-border)',
                  background: creditTerms === t.id ? 'rgba(139, 92, 246, 0.08)' : 'var(--color-bg-canvas)',
                  borderRadius: 10,
                  padding: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <strong style={{ fontSize: 12.5, color: 'var(--color-text-primary)' }}>{t.label}</strong>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credit Limit & Approver Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: 18, boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isId ? 'Plafon Kredit Korporat' : 'Corporate Credit Line'}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
            <span>{isId ? 'Terpakai: Rp 82.000.000' : 'Used: Rp 82,000,000'}</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{isId ? 'Tersedia: Rp 168.000.000' : 'Available: Rp 168M'}</span>
          </div>
          <NeuronProgress value={33} variant="brand" />
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 6 }}>
            Total Limit Disetujui: <strong>Rp 250.000.000</strong>
          </div>
        </div>

        <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: 18, boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {isId ? 'Routing Persetujuan' : 'Approval Routing'}
          </h4>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--color-text-secondary)' }}>
            Pesanan ini memerlukan persetujuan dari Head of Procurement sebelum pemrosesan gudang.
          </p>
          <NeuronButton
            size="md"
            variant="purple"
            style={{ width: '100%' }}
            onClick={() => alert(isId ? 'Pengajuan PO berhasil dikirim ke Head of Procurement!' : 'PO submitted to Head of Procurement!')}
          >
            {isId ? 'Kirim Pengajuan PO' : 'Submit PO for Approval'}
          </NeuronButton>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Variant 5: Post-Purchase Confirmation & Digital Receipt Component
// ─────────────────────────────────────────────────────────────────────────────

function OrderSuccessReceiptPreview({ setActiveTab }: { isDarkProp?: boolean; setActiveTab?: (tabId: string) => void }) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const fulfillmentSteps: StepperStep[] = [
    { id: 0, label: isId ? 'Pesanan Dibuat' : 'Order Placed', status: 'completed' },
    { id: 1, label: isId ? 'Pembayaran Lunas' : 'Payment Verified', status: 'completed' },
    { id: 2, label: isId ? 'Diproses Gudang' : 'In Fulfillment', status: 'active' },
    { id: 3, label: isId ? 'Diserahkan Kurir' : 'Courier Pickup', status: 'upcoming' },
    { id: 4, label: isId ? 'Tiba di Tujuan' : 'Delivered', status: 'upcoming' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20, alignItems: 'center', maxWidth: 860, margin: '0 auto', width: '100%' }}>
      {/* Celebration Header */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 24px rgba(16,185,129,0.3)', marginBottom: 12 }}>
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {isId ? 'Terima Kasih, Pesanan Anda Sedang Diproses!' : 'Thank You, Your Order Is Confirmed!'}
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--color-text-secondary)' }}>
          {isId ? 'Konfirmasi pesanan dan nomor resi telah dikirimkan ke email bale@neudela.dev' : 'Receipt and delivery updates have been sent to your email.'}
        </p>
      </div>

      {/* Fulfillment Progress Stepper */}
      <div style={{ width: '100%', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '16px 20px', boxShadow: 'var(--shadow-sm)' }}>
        <NeuronStepper steps={fulfillmentSteps} activeStep={2} variant="default" />
      </div>

      {/* Digital Receipt Card */}
      <div style={{ width: '100%', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: '22px', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#df7e30', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              OFFICIAL RECEIPT
            </span>
            <h4 style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 800, color: 'var(--color-text-primary)' }}>
              #NEU-ORD-88214
            </h4>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
              04 November 2026 · 14:52 WIB · Metode: BCA Virtual Account
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <NeuronButton size="sm" variant="outline" leadingIcon={<Download size={14} />}>
              Download PDF
            </NeuronButton>
            <NeuronButton size="sm" variant="outline" leadingIcon={<Printer size={14} />}>
              Print
            </NeuronButton>
          </div>
        </div>

        <NeuronDivider />

        {/* Item Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Neudela Pro Mechanical Keyboard</strong>
              <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>1x · Terracotta Switch · Wireless RGB</div>
            </div>
            <strong style={{ color: 'var(--color-text-primary)' }}>Rp 1.250.000</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>Ergonomic Desk Mat 90x40cm</strong>
              <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>1x · Slate Grey Felt</div>
            </div>
            <strong style={{ color: 'var(--color-text-primary)' }}>Rp 245.000</strong>
          </div>
        </div>

        <NeuronDivider />

        {/* Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>Subtotal</span>
            <span>Rp 1.495.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
            <span>Diskon Voucher (NEUDELA15)</span>
            <span>-Rp 224.250</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>Ongkos Kirim (SiCepat BEST)</span>
            <span>Rp 24.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
            <span>PPN 11%</span>
            <span>Rp 139.782</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 8, borderTop: '1px solid var(--color-border)' }}>
            <strong style={{ fontSize: 15, color: 'var(--color-text-primary)' }}>Total Pembayaran</strong>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#df7e30' }}>Rp 1.434.532</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12 }}>
        <NeuronButton
          size="md"
          variant="secondary"
          onClick={() => setActiveTab && setActiveTab('pat-overview')}
        >
          {isId ? 'Kembali ke Beranda' : 'Back to Store'}
        </NeuronButton>

        <NeuronButton
          size="md"
          variant="primary"
          leadingIcon={<Navigation size={15} />}
          onClick={() => {
            if (setActiveTab) {
              window.location.hash = '#pat-maps';
              setActiveTab('pat-maps');
            }
          }}
        >
          {isId ? 'Lacak Kurir di Peta (Live Map)' : 'Track Courier on Map'}
        </NeuronButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Preview Dispatcher for Checkout Variants
// ─────────────────────────────────────────────────────────────────────────────

export function renderLiveCheckoutPreview(
  variantId: CheckoutVariantId,
  isDark: boolean,
  setActiveTab?: (tabId: string) => void
) {
  switch (variantId) {
    case 'multi-step-checkout':
      return <MultiStepCheckoutPreview isDarkProp={isDark} />;
    case 'one-page-accordion-checkout':
      return <OnePageAccordionCheckoutPreview isDarkProp={isDark} />;
    case 'payment-gateway-hub':
      return <PaymentGatewayHubPreview isDarkProp={isDark} />;
    case 'b2b-procurement-po':
      return <B2BProcurementPreview isDarkProp={isDark} />;
    case 'order-success-receipt':
      return <OrderSuccessReceiptPreview isDarkProp={isDark} setActiveTab={setActiveTab} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TSX Code Generator Snippets
// ─────────────────────────────────────────────────────────────────────────────

function getCheckoutTsxSnippet(variantId: CheckoutVariantId): string {
  switch (variantId) {
    case 'multi-step-checkout':
      return `import React, { useState } from 'react';
import { NeuronStepper, NeuronButton, NeuronInput, NeuronBadge } from '@neudela/core';
import { ShoppingCart, Truck, CreditCard, Receipt } from 'lucide-react';

export default function MultiStepCheckout() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 0, label: 'Address & Items', icon: <ShoppingCart size={14} /> },
    { id: 1, label: 'Shipping Courier', icon: <Truck size={14} /> },
    { id: 2, label: 'Payment Instrument', icon: <CreditCard size={14} /> },
    { id: 3, label: 'Review & Confirm', icon: <Receipt size={14} /> },
  ];

  return (
    <div className="checkout-shell">
      <NeuronStepper
        steps={steps}
        activeStep={activeStep}
        clickable
        onStepClick={(idx) => setActiveStep(idx)}
      />
      <div className="checkout-content">
        {/* Render dynamic step forms & sticky summary */}
      </div>
    </div>
  );
}`;
    case 'one-page-accordion-checkout':
      return `import React, { useState } from 'react';
import { NeuronInput, NeuronButton, NeuronRadio } from '@neudela/core';

export default function OnePageAccordionCheckout() {
  const [activeSection, setActiveSection] = useState<'address' | 'shipping' | 'payment'>('shipping');

  return (
    <div className="accordion-checkout-grid">
      <div className="accordion-sections">
        {/* Collapsible shipping & payment accordions */}
      </div>
      <div className="sticky-cart-summary">
        {/* Line items & Instant Pay Button */}
      </div>
    </div>
  );
}`;
    case 'payment-gateway-hub':
      return `import React, { useState } from 'react';
import { NeuronButton, NeuronInput, NeuronBadge } from '@neudela/core';
import { QrCode, Landmark, CreditCard, Wallet } from 'lucide-react';

export default function PaymentGatewayHub() {
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va' | 'card'>('qris');

  return (
    <div className="payment-gateway-hub">
      {/* Dynamic QRIS countdown timer & Bank Virtual Account copy buttons */}
    </div>
  );
}`;
    case 'b2b-procurement-po':
      return `import React, { useState } from 'react';
import { NeuronInput, NeuronToggle, NeuronProgress, NeuronButton } from '@neudela/core';

export default function B2BProcurementCheckout() {
  const [poNumber, setPoNumber] = useState('');
  const [taxInvoice, setTaxInvoice] = useState(true);

  return (
    <div className="b2b-procurement-form">
      {/* PO document attachment, NPWP validation, & Net 30/60 limits */}
    </div>
  );
}`;
    case 'order-success-receipt':
      return `import React from 'react';
import { NeuronStepper, NeuronButton, NeuronDivider } from '@neudela/core';
import { Check, Download, Navigation } from 'lucide-react';

export default function OrderSuccessReceipt() {
  return (
    <div className="order-success-screen">
      <div className="check-badge"><Check size={32} /></div>
      <h3>Pesanan Berhasil Dibuat!</h3>
      <NeuronStepper steps={fulfillmentSteps} activeStep={2} />
      {/* Download receipt & Live map tracking button */}
    </div>
  );
}`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component: CheckoutPatternView
// ─────────────────────────────────────────────────────────────────────────────

export default function CheckoutPatternView({ setActiveTab, isDarkMode: isDarkParent }: CheckoutPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isDarkMode = useIsDarkMode(isDarkParent);

  const [selectedVariant, setSelectedVariant] = useState<CheckoutVariantId>('multi-step-checkout');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentMeta = useMemo(() => {
    return CHECKOUT_VARIANTS.find((v) => v.id === selectedVariant) || CHECKOUT_VARIANTS[0];
  }, [selectedVariant]);

  const handleOpenModal = (vId: CheckoutVariantId) => {
    setSelectedVariant(vId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  const handleOpenRealAppNewTab = (vId: CheckoutVariantId, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#standalone-checkout-${vId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(getCheckoutTsxSnippet(selectedVariant));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="pattern-checkout-view" style={{ paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── Page Header ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>

        <h1 className="page-title" style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '4px 0 10px 0' }}>
          {isId ? 'Alur Checkout & Transaksi Pembayaran' : 'Checkout & Payment Flows'}
        </h1>
        <p className="page-subtitle" style={{ width: '100%', maxWidth: '100%', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
          {isId
            ? 'Arsitektur checkout enterprise berkonversi tinggi: Alur bertahap dengan NeuronStepper, akordion satu halaman ekspres, gateway pembayaran QRIS dinamis & Virtual Account, pengadaan PO B2B dengan e-Faktur Pajak, dan konfirmasi resi sukses.'
            : 'Enterprise-grade transaction & purchasing architectures: Multi-step linear checkout with NeuronStepper, express single-page accordions, omnichannel QRIS & VA payment hubs, B2B procurement with tax invoicing, and post-purchase confirmation receipts.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <CreditCard size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary)' }}>5 {isId ? 'Varian Transaksi' : 'Variants'}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Receipt size={14} color="#3b82f6" />
            <span>{isId ? 'Alur Transaksi:' : 'Transaction Flows:'}</span>
            <strong style={{ color: '#3b82f6' }}>Stepper · Accordion · QRIS & VA · B2B PO · Receipt</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>{isId ? 'Kepatuhan:' : 'Compliance Standard:'}</span>
            <strong style={{ color: '#10b981' }}>WCAG 2.1 AA · PCI-DSS Ready</strong>
          </div>
        </div>
      </div>

      {/* ── Pattern Cards Grid (Exact parity with Map & other pattern views) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginTop: 'var(--space-8)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {CHECKOUT_VARIANTS.map((variant) => (
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
                {variant.id === 'multi-step-checkout' && <ShoppingCart size={20} />}
                {variant.id === 'one-page-accordion-checkout' && <PackageCheck size={20} />}
                {variant.id === 'payment-gateway-hub' && <CreditCard size={20} />}
                {variant.id === 'b2b-procurement-po' && <Building2 size={20} />}
                {variant.id === 'order-success-receipt' && <Receipt size={20} />}
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
                <CheckoutMiniSilhouette id={variant.id} isDarkMode={isDarkMode} />
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
                  handleOpenRealAppNewTab(variant.id, e);
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
                  >
                    {isId ? currentMeta.taglineId : currentMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Right Side: Subtabs + Action Buttons (ALWAYS pinned in top right corner) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
                {/* Modal Subtabs (Interactive Canvas vs TSX) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 36,
                    boxSizing: 'border-box',
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
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'preview' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'preview' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    {isId ? 'Kanvas Interaktif' : 'Interactive Canvas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('tsx')}
                    style={{
                      height: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: modalTab === 'tsx' ? 'var(--color-primary)' : 'transparent',
                      color: modalTab === 'tsx' ? '#fff' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                    }}
                  >
                    React (TSX)
                  </button>
                </div>

                {/* Real App in New Tab + Close */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={(e) => handleOpenRealAppNewTab(selectedVariant, e)}
                    title={isId ? 'Buka di Tab Baru sebagai aplikasi penuh' : 'Open in New Tab as a full real app'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 36,
                      boxSizing: 'border-box',
                      gap: 6,
                      background: 'var(--color-primary)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0 14px',
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
                      height: 36,
                      width: 36,
                      boxSizing: 'border-box',
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      padding: 0,
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)',
                      display: 'inline-flex',
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
                <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '24px' }}>
                  {renderLiveCheckoutPreview(selectedVariant, isDarkMode, setActiveTab)}
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
                      onClick={handleCopyCode}
                    >
                      {copiedCode ? (isId ? 'Tersalin ke Clipboard' : 'Copied to Clipboard') : (isId ? 'Salin Kode TSX' : 'Copy TSX Code')}
                    </NeuronButton>
                  </div>
                  <pre
                    style={{
                      background: isDarkMode ? '#0d1322' : '#1e293b',
                      color: '#f8fafc',
                      padding: '20px',
                      borderRadius: '12px',
                      fontSize: '12.5px',
                      fontFamily: 'monospace',
                      lineHeight: '1.6',
                      overflowX: 'auto',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                  >
                    <code>{getCheckoutTsxSnippet(selectedVariant)}</code>
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
          label: isId ? 'Peta & Geospasial' : 'Maps & Geospatial',
          onClick: () => setActiveTab('pat-maps'),
        }}
        next={{
          label: isId ? 'Pengaturan & Akses RBAC' : 'Workspace Settings & RBAC',
          onClick: () => setActiveTab('pat-settings'),
        }}
      />
    </div>
  );
}

