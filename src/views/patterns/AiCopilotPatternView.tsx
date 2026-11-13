import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import NextPrevious from '../../components/NextPrevious';
import NeuronButton from '../../components/NeuronButton';
import NeuronInput from '../../components/NeuronInput';
import NeuronTextArea from '../../components/NeuronTextArea';
import NeuronSelect from '../../components/NeuronSelect';
import NeuronSlider from '../../components/NeuronSlider';
import NeuronBadge from '../../components/NeuronBadge';
import {
  Bot,
  Sparkles,
  Send,
  Copy,
  Check,
  Code2,
  Play,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Shield,
  BookOpen,
  FileText,
  Search,
  User,
  ThumbsUp,
  ThumbsDown,
  CornerDownLeft,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Sliders,
  RotateCcw,
  Zap,
} from 'lucide-react';

export type AiCopilotVariantId =
  | 'floating-copilot'
  | 'full-canvas-chat'
  | 'human-in-the-loop'
  | 'prompt-playground'
  | 'rag-knowledge-search';

export interface AiCopilotVariantMeta {
  id: AiCopilotVariantId;
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

export const AI_COPILOT_VARIANTS: AiCopilotVariantMeta[] = [
  {
    id: 'floating-copilot',
    nameEn: 'Contextual Copilot Assistant (Sidecar)',
    nameId: 'Asisten Copilot Kontekstual (Sidecar Drawer)',
    taglineEn: 'Slide-out intelligent sidecar with contextual action chips, document summarization, and direct canvas insertion.',
    taglineId: 'Panel samping cerdas geser dengan saran aksi kontekstual, perangkum dokumen, dan penyisipan langsung ke kanvas.',
    descEn: 'Embedded assistant experience: Sits alongside enterprise document editors, analytics boards, or CRM records. Listens to editor context, proposes inline text improvements, code fixes, and executes multi-step prompt workflows without disrupting main focus.',
    descId: 'Pengalaman asisten tersemat: Berdampingan dengan editor dokumen, dasbor analitik, atau rekaman CRM. Memahami konteks halaman, mengusulkan perbaikan teks, kode, dan menjalankan instruksi bertahap tanpa mengganggu fokus kerja utama.',
    tags: ['Copilot', 'Sidecar', 'Context-Aware', 'Inline Insertion', 'Chips'],
    bestForEn: 'Document editors, code workspaces, analytics dashboards, and CRM operational sidebars.',
    bestForId: 'Editor dokumen, workspace pemrograman, dasbor analitik, dan sidebar CRM.',
    badge: 'Context Sidecar',
    accentColor: '#df7e30',
  },
  {
    id: 'full-canvas-chat',
    nameEn: 'Conversational Agent & Artifact Studio',
    nameId: 'Agen Percakapan & Studio Artefak Kode',
    taglineEn: 'Full-workspace conversational canvas with streaming text simulation, reasoning accordion, and sandbox code artifacts.',
    taglineId: 'Kanvas percakapan penuh dengan simulasi streaming teks, akordion proses berpikir (CoT), dan blok kode artefak siap eksekusi.',
    descEn: 'ChatGPT/Claude-style enterprise interface: Multi-turn prompt memory, expandable Chain-of-Thought (CoT) reasoning disclosure, model selector, feedback thumbs, and syntax-highlighted code artifacts with 1-click copy and sandbox execution.',
    descId: 'Antarmuka percakapan enterprise ala ChatGPT/Claude: Memori dialog multiturn, akordion proses berpikir (Chain-of-Thought), pemilih model AI, umpan balik pengguna, dan kartu artefak kode dengan tombol salin serta eksekusi sandbox.',
    tags: ['Chat Canvas', 'Code Artifacts', 'CoT Reasoning', 'Streaming', 'Multi-turn'],
    bestForEn: 'Developer assistants, generative content studios, customer support copilots, and data analyst interfaces.',
    bestForId: 'Asisten developer, studio konten generatif, agen dukungan pelanggan, dan antarmuka analis data.',
    badge: 'Artifact Studio',
    accentColor: '#3b82f6',
  },
  {
    id: 'human-in-the-loop',
    nameEn: 'AI Proposal Review & Visual Diff Inspector',
    nameId: 'Review Usulan AI & Inspektor Diff Visual',
    taglineEn: 'Human-in-the-loop governance card with confidence metrics, side-by-side diff comparison, and approval controls.',
    taglineId: 'Tata kelola human-in-the-loop dengan skor keyakinan, perbandingan visual diff berdampingan, dan kontrol persetujuan bertahap.',
    descEn: 'Enterprise safety gate for high-stakes AI automation: SQL database migrations, Terraform policies, mass email campaigns, and billing discounts. Displays confidence score, rationale explanation, side-by-side diff (additions/deletions), and instant approve/reject/refine controls.',
    descId: 'Gerbang kepatuhan dan keselamatan untuk automasi AI berisiko tinggi: Migrasi database SQL, konfigurasi Terraform, pengiriman email massal, dan diskon tagihan. Menampilkan skor keyakinan model, penjelasan rasional, diff visual berdampingan, dan aksi persetujuan cepat.',
    tags: ['Human-in-the-Loop', 'Visual Diff', 'Governance', 'Approval Gate', 'Confidence Score'],
    bestForEn: 'DevOps policy changes, financial reconciliation, legal contract redlining, and database schema updates.',
    bestForId: 'Perubahan kebijakan DevOps, rekonsiliasi keuangan, penelaahan kontrak hukum, dan migrasi skema database.',
    badge: 'Governance & Diff',
    accentColor: '#10b981',
  },
  {
    id: 'prompt-playground',
    nameEn: 'Model Playground & Parameter Studio',
    nameId: 'Playground Model & Studio Parameter LLM',
    taglineEn: 'Developer engineering workbench with temperature sliders, token budgets, system instructions, and telemetry metrics.',
    taglineId: 'Meja kerja pengembang AI dengan slider temperatur, batas token, instruksi sistem, dan telemetri latensi.',
    descEn: 'AI experimentation console: Split workspace for system instructions, context prompts, and live message responses. Equipped with Neudela sliders for Temperature (0.0 - 2.0), Top-P, Frequency Penalty, and real-time token count estimation with latency benchmarks.',
    descId: 'Konsol eksperimen AI: Ruang kerja terpisah untuk instruksi sistem, prompt uji coba, dan respon langsung. Dilengkapi slider Neudela untuk Temperatur (0.0 - 2.0), Top-P, Batas Token, serta estimasi biaya token dan tolok ukur latensi respon.',
    tags: ['Playground', 'Prompt Engineering', 'Temperature Slider', 'Token Telemetry', 'System Prompt'],
    bestForEn: 'AI platform developers, prompt engineers, system administrators, and LLM benchmarking teams.',
    bestForId: 'Developer platform AI, prompt engineer, administrator sistem, dan tim benchmarking LLM.',
    badge: 'Parameter Studio',
    accentColor: '#8b5cf6',
  },
  {
    id: 'rag-knowledge-search',
    nameEn: 'Enterprise RAG & Grounded Citation Search',
    nameId: 'Pencarian Semantik RAG & Sitasi Sumber Terverifikasi',
    taglineEn: 'Vector semantic query interface with grounded citation pills, source document cards, and similarity confidence scores.',
    taglineId: 'Antarmuka kueri vektor semantik dengan pil sitasi rujukan, kartu dokumen sumber, dan skor kemiripan relevansi.',
    descEn: 'Hallucination-free knowledge retrieval: Users query internal enterprise corpora (PDFs, Notion, Confluence, API specs). Generates synthesized answers with clickable citation pills ([1], [2]) linking directly to verified source document snippets with match percentages.',
    descId: 'Pencarian pengetahuan internal bebas halusinasi: Pengguna menanyakan dokumen internal (PDF, Notion, Confluence, spesifikasi API). Menghasilkan sintesis jawaban terverifikasi dengan pil sitasi rujukan ([1], [2]) yang terhubung langsung ke kutipan dokumen asli.',
    tags: ['RAG', 'Vector Search', 'Citations', 'Knowledge Base', 'Hallucination-Free'],
    bestForEn: 'Company internal wikis, compliance auditors, customer knowledge bases, and technical documentation hubs.',
    bestForId: 'Wiki internal perusahaan, auditor kepatuhan, pusat bantuan pelanggan, dan dokumentasi teknis.',
    badge: 'RAG Citations',
    accentColor: '#0ea5e9',
  },
];

// ─────────────────────────────────────────────
// Mini Architecture Silhouettes for Gallery Cards
// ─────────────────────────────────────────────
function AiCopilotMiniSilhouette({ id, accentColor }: { id: AiCopilotVariantId; accentColor: string }) {
  switch (id) {
    case 'floating-copilot':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', padding: '10px 14px', gap: '8px', boxSizing: 'border-box' }}>
          {/* Main Doc Skeleton Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
            <div style={{ width: '65%', height: 6, borderRadius: 3, background: 'var(--color-border)' }} />
            <div style={{ width: '90%', height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ width: '75%', height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
            <div style={{ width: '85%', height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
          </div>
          {/* Floating Sidecar Drawer */}
          <div
            style={{
              width: 90,
              height: '100%',
              borderRadius: 6,
              background: 'var(--color-bg-surface)',
              border: `1px solid ${accentColor}40`,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              padding: 6,
              gap: 4,
            }}
          >
            <div style={{ height: 4, width: '50%', borderRadius: 2, background: accentColor }} />
            <div style={{ height: 10, borderRadius: 3, background: `${accentColor}15`, marginTop: 2 }} />
            <div style={{ height: 16, borderRadius: 3, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 4px', gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor }} />
              <div style={{ width: 40, height: 2.5, borderRadius: 1, background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ marginTop: 'auto', height: 8, borderRadius: 3, background: accentColor, opacity: 0.8 }} />
          </div>
        </div>
      );

    case 'full-canvas-chat':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '5px', boxSizing: 'border-box' }}>
          {/* Top Header Model Pill */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor }} />
              <div style={{ width: 45, height: 3.5, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            </div>
            <div style={{ width: 28, height: 6, borderRadius: 3, background: `${accentColor}25` }} />
          </div>
          {/* User Bubble */}
          <div style={{ alignSelf: 'flex-end', width: '55%', height: 11, borderRadius: '6px 6px 0 6px', background: `${accentColor}20`, border: `1px solid ${accentColor}35` }} />
          {/* AI Response with Artifact */}
          <div style={{ alignSelf: 'flex-start', width: '85%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 8, width: '45%', borderRadius: 2, background: 'var(--color-border)' }} />
            {/* Dark Code Artifact Box */}
            <div style={{ height: 26, borderRadius: 4, background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', padding: '4px 6px', gap: 3 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: 20, height: 2, borderRadius: 1, background: '#64748b' }} />
                <div style={{ width: 8, height: 3, borderRadius: 1, background: accentColor }} />
              </div>
              <div style={{ width: '70%', height: 2.5, borderRadius: 1, background: '#38bdf8' }} />
              <div style={{ width: '45%', height: 2.5, borderRadius: 1, background: '#a855f7' }} />
            </div>
          </div>
        </div>
      );

    case 'human-in-the-loop':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '6px', boxSizing: 'border-box' }}>
          {/* Confidence Meter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 40, height: 3.5, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            <div style={{ width: 32, height: 6, borderRadius: 3, background: `${accentColor}25`, border: `1px solid ${accentColor}40` }} />
          </div>
          {/* Split Visual Diff */}
          <div style={{ display: 'flex', gap: 6, flex: 1, alignItems: 'center' }}>
            <div style={{ flex: 1, height: 36, borderRadius: 4, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}>
              <div style={{ width: '30%', height: 2.5, borderRadius: 1, background: '#ef4444' }} />
              <div style={{ width: '80%', height: 3, borderRadius: 1.5, background: 'rgba(239, 68, 68, 0.6)' }} />
            </div>
            <div style={{ flex: 1, height: 36, borderRadius: 4, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}>
              <div style={{ width: '30%', height: 2.5, borderRadius: 1, background: '#10b981' }} />
              <div style={{ width: '85%', height: 3, borderRadius: 1.5, background: 'rgba(16, 185, 129, 0.7)' }} />
            </div>
          </div>
          {/* Approve / Reject Actions */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <div style={{ width: 28, height: 9, borderRadius: 3, background: 'var(--color-border)' }} />
            <div style={{ width: 34, height: 9, borderRadius: 3, background: accentColor }} />
          </div>
        </div>
      );

    case 'prompt-playground':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', padding: '10px 14px', gap: '8px', boxSizing: 'border-box' }}>
          {/* Left Sliders */}
          <div style={{ width: '42%', display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '50%', height: 2.5, borderRadius: 1, background: 'var(--color-text-secondary)' }} />
              <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)', position: 'relative' }}>
                <div style={{ width: '60%', height: '100%', borderRadius: 2, background: accentColor }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '40%', height: 2.5, borderRadius: 1, background: 'var(--color-text-secondary)' }} />
              <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)', position: 'relative' }}>
                <div style={{ width: '80%', height: '100%', borderRadius: 2, background: accentColor }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '60%', height: 2.5, borderRadius: 1, background: 'var(--color-text-secondary)' }} />
              <div style={{ height: 4, borderRadius: 2, background: 'var(--color-border)', position: 'relative' }}>
                <div style={{ width: '40%', height: '100%', borderRadius: 2, background: accentColor }} />
              </div>
            </div>
          </div>
          {/* Right Console Output */}
          <div style={{ flex: 1, borderRadius: 5, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', padding: 6, gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: 28, height: 3, borderRadius: 1, background: 'var(--color-text-secondary)' }} />
              <div style={{ width: 22, height: 5, borderRadius: 2, background: `${accentColor}25` }} />
            </div>
            <div style={{ width: '90%', height: 3, borderRadius: 1.5, background: 'var(--color-border)' }} />
            <div style={{ width: '75%', height: 3, borderRadius: 1.5, background: 'var(--color-border)' }} />
            <div style={{ width: '60%', height: 3, borderRadius: 1.5, background: accentColor, opacity: 0.7 }} />
          </div>
        </div>
      );

    case 'rag-knowledge-search':
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px', gap: '6px', boxSizing: 'border-box' }}>
          {/* Top Search Query Bar */}
          <div style={{ height: 16, borderRadius: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1.5px solid ${accentColor}` }} />
            <div style={{ width: 70, height: 3, borderRadius: 1.5, background: 'var(--color-text-secondary)' }} />
          </div>
          {/* Grounded Result with Citation Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '75%', height: 3.5, borderRadius: 2, background: 'var(--color-text-secondary)' }} />
            <div style={{ width: 14, height: 7, borderRadius: 2, background: `${accentColor}25`, border: `1px solid ${accentColor}40` }} />
          </div>
          {/* Retrieved Source Snippets */}
          <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
            <div style={{ flex: 1, height: 26, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '60%', height: 2.5, borderRadius: 1, background: accentColor }} />
              <div style={{ width: '80%', height: 2, borderRadius: 1, background: 'var(--color-border)' }} />
            </div>
            <div style={{ flex: 1, height: 26, borderRadius: 4, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ width: '50%', height: 2.5, borderRadius: 1, background: accentColor }} />
              <div style={{ width: '80%', height: 2, borderRadius: 1, background: 'var(--color-border)' }} />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ─────────────────────────────────────────────
// Interactive Variant 1: Contextual Copilot (Sidecar)
// ─────────────────────────────────────────────
function FloatingCopilotPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [copilotOpen, setCopilotOpen] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'copilot'>('copilot');
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; action?: string }>>([
    {
      id: 'm1',
      sender: 'assistant',
      text: isId
        ? 'Halo Bale! Saya siap membantu menganalisis draf Spesifikasi SLA Microservice Billing. Ada yang ingin saya perbaiki atau tinjau?'
        : 'Hello Bale! I am active and aware of your Billing Microservice SLA Specification draft. How can I assist you right now?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editorContent, setEditorContent] = useState(
    isId
      ? `## Perjanjian Tingkat Layanan (SLA) Microservice Billing\n\n1. Ketersediaan Uptime Gateway: 99.95% per bulan kalender.\n2. Batas Latensi Transaksi P99: Maksimum 240ms untuk transaksi kartu kredit dan QRIS dinamis.\n3. Rencana Pemulihan Bencana (RTO): Waktu pemulihan failover kluster sekunder tidak melebihi 15 menit.`
      : `## Billing Microservice Service Level Agreement (SLA)\n\n1. Ingress Gateway Uptime: 99.95% per calendar billing cycle.\n2. P99 Transaction Latency: Under 240ms for omnichannel credit cards and dynamic QRIS.\n3. Disaster Recovery (RTO): Multi-region failover recovery time must not exceed 15 minutes.`
  );
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const quickChips = [
    {
      icon: <Shield size={12} color="#10b981" />,
      label: isId ? '🔍 Audit Kepatuhan & ISO 27001' : '🔍 Audit ISO 27001 Compliance',
      prompt: isId ? 'Audit kepatuhan klausul SLA ini terhadap standar ISO 27001' : 'Audit compliance of this SLA clause against ISO 27001',
    },
    {
      icon: <Zap size={12} color="var(--color-primary)" />,
      label: isId ? '⚡ Perketat Latensi ke 120ms' : '⚡ Tighten Latency to 120ms',
      prompt: isId ? 'Perketat batas latensi transaksi P99 menjadi 120ms standar enterprise' : 'Tighten P99 latency threshold to enterprise 120ms',
    },
    {
      icon: <FileText size={12} color="#3b82f6" />,
      label: isId ? '📋 Ringkas Eksekutif 3 Poin' : '📋 Executive 3-Point Summary',
      prompt: isId ? 'Buatkan ringkasan 3 poin untuk dewan direksi' : 'Create 3 executive bullet points for leadership',
    },
    {
      icon: <RotateCcw size={12} color="#8b5cf6" />,
      label: isId ? '🛡️ Review RTO Bencana' : '🛡️ Review Disaster RTO',
      prompt: isId ? 'Tinjau klausul RTO pemulihan bencana failover kluster' : 'Review cluster failover disaster recovery RTO ceiling',
    },
  ];

  const handleSendPrompt = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMsg = { id: userMsgId, sender: 'user' as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let actionToPropose = '';

      if (text.toLowerCase().includes('latensi') || text.toLowerCase().includes('latency')) {
        reply = isId
          ? 'Saya telah memperbarui klausul latensi: "Batas Latensi Transaksi P99 diperketat menjadi 120ms dengan fallback circuit-breaker 500ms." Ingin saya sisipkan langsung ke editor?'
          : 'I have refined the latency clause: "P99 Transaction Latency tightened to 120ms with automated 500ms circuit-breaker fallback." Would you like me to insert this into the editor?';
        actionToPropose = 'latency-refine';
      } else if (text.toLowerCase().includes('ringkas') || text.toLowerCase().includes('summary') || text.toLowerCase().includes('eksekutif')) {
        reply = isId
          ? 'Berikut ringkasan eksekutif:\n• Target Uptime: 99.95% ketersediaan kluster\n• Kecepatan: Latensi gateway <120ms\n• Ketahanan: RTO failover cadangan <15 menit'
          : 'Executive Summary:\n• Target Uptime: 99.95% high availability\n• Performance: Ingress latency ceiling <120ms\n• Resilience: Standby RTO failover <15 minutes';
      } else if (text.toLowerCase().includes('rto') || text.toLowerCase().includes('bencana') || text.toLowerCase().includes('disaster')) {
        reply = isId
          ? 'Evaluasi RTO: Batas 15 menit sudah sangat baik untuk sistem active-passive. Disarankan menambahkan pengujian failover otomatis berkala setiap kuartal.'
          : 'RTO evaluation: 15-minute ceiling is robust for active-passive topology. Recommend adding scheduled automated quarterly failover rehearsals.';
      } else {
        reply = isId
          ? 'Analisis SLA selesai: Kebijakan ini sudah mematuhi standar ISO 27001 dan SOC 2 Type II untuk platform transaksi keuangan. Tidak ditemukan ambiguitas hukum.'
          : 'SLA assessment complete: Policies strictly align with ISO 27001 and SOC 2 Type II compliance thresholds for fintech payment gateways. No regulatory gaps found.';
      }

      setMessages((prev) => [
        ...prev,
        { id: `ast-${Date.now()}`, sender: 'assistant' as const, text: reply, action: actionToPropose },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleApplyAction = () => {
    setEditorContent((prev) =>
      prev.replace('240ms', '120ms (Circuit-breaker threshold: 500ms)')
    );
    if (isMobile) {
      setActiveMobileTab('editor');
    }
    setToastNotice(
      isId
        ? (isMobile ? 'Perubahan disisipkan! Periksa tab Dokumen.' : 'Perubahan berhasil disisipkan ke dalam dokumen!')
        : (isMobile ? 'Changes inserted! Check Document tab.' : 'Changes inserted into the active document!')
    );
    setTimeout(() => setToastNotice(null), 3000);
  };

  return (
    <div style={{ width: '100%', maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 16, boxSizing: 'border-box' }}>
      {toastNotice && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: 'var(--color-bg-surface)',
            border: '1px solid #10b981',
            color: 'var(--color-text-primary)',
            padding: '10px 16px',
            borderRadius: 8,
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={16} color="#10b981" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Top Application Context Bar */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          padding: isMobile ? '10px 14px' : '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(223, 126, 48, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#df7e30', flexShrink: 0 }}>
            <FileText size={16} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <strong style={{ fontSize: isMobile ? '12px' : '13.5px', color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                billing-service-sla-v2.md
              </strong>
              <NeuronBadge size="xs" variant="brand">Markdown</NeuronBadge>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block' }}>
              {isId ? 'Disunting 2m lalu oleh @bale' : 'Edited 2m ago by @bale'}
            </span>
          </div>
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <NeuronButton
              size="sm"
              variant={copilotOpen ? 'primary' : 'outline'}
              leadingIcon={<Sparkles size={14} />}
              onClick={() => setCopilotOpen(!copilotOpen)}
            >
              {copilotOpen ? (isId ? 'Tutup Copilot' : 'Hide Copilot') : (isId ? 'Buka Copilot' : 'Ask Copilot')}
            </NeuronButton>
          </div>
        )}
      </div>

      {/* Segmented Switcher for Mobile Mode */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            background: 'var(--color-bg-surface)',
            padding: 3,
            borderRadius: 10,
            border: '1px solid var(--color-border)',
            width: '100%',
            boxSizing: 'border-box',
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveMobileTab('editor')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '7px 10px',
              borderRadius: 8,
              border: 'none',
              background: activeMobileTab === 'editor' ? 'var(--color-primary)' : 'transparent',
              color: activeMobileTab === 'editor' ? '#fff' : 'var(--color-text-secondary)',
              fontWeight: 600,
              fontSize: '11.5px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <FileText size={13} />
            <span>{isId ? 'Dokumen (Editor)' : 'Document (Editor)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMobileTab('copilot')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '7px 10px',
              borderRadius: 8,
              border: 'none',
              background: activeMobileTab === 'copilot' ? 'var(--color-primary)' : 'transparent',
              color: activeMobileTab === 'copilot' ? '#fff' : 'var(--color-text-secondary)',
              fontWeight: 600,
              fontSize: '11.5px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Sparkles size={13} />
            <span>Neudela Copilot</span>
            <span
              style={{
                fontSize: '9px',
                padding: '1px 5px',
                borderRadius: 6,
                background: activeMobileTab === 'copilot' ? 'rgba(255,255,255,0.25)' : 'rgba(223, 126, 48, 0.15)',
                color: activeMobileTab === 'copilot' ? '#fff' : 'var(--color-primary)',
                fontWeight: 700,
              }}
            >
              GPT-4o
            </span>
          </button>
        </div>
      )}

      {/* Main Workspace Layout (Editor + Slide-out Sidecar) */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: !isMobile ? (copilotOpen ? '1fr 380px' : '1fr') : undefined,
          gap: 16,
          height: isMobile ? 560 : 620,
          minHeight: isMobile ? 560 : 620,
          maxHeight: isMobile ? 560 : 620,
          transition: 'all 0.25s ease',
        }}
      >
        {/* Left Document Editor Area */}
        {(!isMobile || activeMobileTab === 'editor') && (
          <div
            style={{
              flex: 1,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Document Editor Header */}
            <div
              style={{
                padding: '10px 16px',
                background: 'var(--color-bg-canvas)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 8px', borderRadius: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                  <FileText size={13} color="var(--color-primary)" />
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
                    billing-service-sla-v2.md
                  </span>
                  <span style={{ fontSize: '9.5px', padding: '1px 5px', borderRadius: 4, background: 'rgba(223, 126, 48, 0.12)', color: 'var(--color-primary)', fontWeight: 700 }}>
                    Active
                  </span>
                </div>
                {!isMobile && (
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    UTF-8 • Markdown Spec
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#10b981', fontWeight: 600, fontSize: '11px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                  {isId ? 'Tersimpan Otomatis' : 'Auto-saved'}
                </span>
              </div>
            </div>

            {/* Live Diff Insertion Banner if applied */}
            {editorContent.includes('120ms (Circuit-breaker') && (
              <div
                style={{
                  padding: '8px 14px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  color: '#10b981',
                  fontWeight: 600,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} />
                  {isId ? 'Copilot memperbarui klausul SLA: Latensi P99 diperketat ke 120ms.' : 'Copilot updated SLA clause: P99 Latency tightened to 120ms.'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditorContent((prev) => prev.replace('120ms (Circuit-breaker threshold: 500ms)', '240ms'));
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--color-text-tertiary)',
                    fontSize: '11px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {isId ? 'Urungkan' : 'Undo'}
                </button>
              </div>
            )}

            {/* Rich Document Editor using NeuronTextArea */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: 12, overflowY: 'auto' }}>
              <NeuronTextArea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                withToolbar={true}
                toolbarTools={['bold', 'italic', 'heading', 'code', 'quote', 'bullet', 'number', 'link', 'undo', 'redo']}
                toolbarPosition="top"
                showCount={true}
                countType="words"
                size="sm"
                placeholder={isId ? 'Tulis isi dokumen spesifikasi di sini...' : 'Write document specification here...'}
                style={{
                  minHeight: isMobile ? 260 : 340,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '12.5px',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Bottom prompt on mobile */}
            {isMobile && (
              <div
                style={{
                  padding: '8px 12px',
                  borderTop: '1px solid var(--color-border)',
                  background: 'var(--color-bg-canvas)',
                  display: 'flex',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveMobileTab('copilot')}
                  style={{
                    border: 'none',
                    background: 'rgba(223, 126, 48, 0.15)',
                    color: 'var(--color-primary)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Sparkles size={13} />
                  <span>{isId ? 'Konsultasikan Dokumen ke Neudela Copilot →' : 'Ask Neudela Copilot about this draft →'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Right Copilot Sidecar Drawer */}
        {((!isMobile && copilotOpen) || (isMobile && activeMobileTab === 'copilot')) && (
          <div
            style={{
              flex: 1,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Copilot Header */}
            <div
              style={{
                padding: '12px 16px',
                background: 'var(--color-bg-canvas)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #df7e30 0%, #b85b14 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(223, 126, 48, 0.35)',
                  }}
                >
                  <Sparkles size={14} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      Neudela Copilot
                    </strong>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '1px 6px',
                        borderRadius: 6,
                        background: 'rgba(223, 126, 48, 0.15)',
                        color: '#df7e30',
                        fontWeight: 700,
                      }}
                    >
                      GPT-4o
                    </span>
                  </div>
                  <span style={{ fontSize: '10.5px', color: 'var(--color-text-tertiary)', display: 'block' }}>
                    {isId ? 'Siaga membaca konteks kanvas dokumen' : 'Actively reading document canvas context'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isMobile) {
                    setActiveMobileTab('editor');
                  } else {
                    setCopilotOpen(false);
                  }
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-tertiary)',
                  cursor: 'pointer',
                  padding: 6,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s ease',
                }}
                title={isId ? (isMobile ? 'Kembali ke Editor Dokumen' : 'Tutup Sidecar') : (isMobile ? 'Back to Document Editor' : 'Close Sidecar')}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-canvas)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X size={15} />
              </button>
            </div>

            {/* Context Status Bar */}
            <div
              style={{
                padding: '6px 14px',
                background: 'var(--color-bg-surface)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--color-text-secondary)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <FileText size={12} color="var(--color-primary)" />
                <span style={{ fontWeight: 600 }}>billing-service-sla-v2.md</span>
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10b981', fontWeight: 600, fontSize: '10px' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
                IN-CONTEXT
              </span>
            </div>

            {/* Chat Conversation Stream */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: 4,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    {m.sender === 'assistant' ? (
                      <>
                        <Bot size={12} color="#df7e30" />
                        <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Copilot</span>
                      </>
                    ) : (
                      <>
                        <User size={12} />
                        <span>{isId ? 'Anda' : 'You'}</span>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      maxWidth: '92%',
                      padding: '10px 14px',
                      borderRadius: 12,
                      background: m.sender === 'user'
                        ? 'linear-gradient(135deg, #df7e30 0%, #c4681f 100%)'
                        : 'var(--color-bg-canvas)',
                      color: m.sender === 'user' ? '#ffffff' : 'var(--color-text-primary)',
                      border: m.sender === 'user' ? 'none' : '1px solid var(--color-border)',
                      fontSize: '12.5px',
                      lineHeight: 1.55,
                      whiteSpace: 'pre-wrap',
                      boxShadow: m.sender === 'user' ? '0 2px 8px rgba(223, 126, 48, 0.25)' : 'var(--shadow-sm)',
                    }}
                  >
                    {m.text}

                    {m.action && (
                      <div
                        style={{
                          marginTop: 10,
                          paddingTop: 10,
                          borderTop: '1px solid var(--color-border)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            padding: '6px 8px',
                            borderRadius: 6,
                            background: 'var(--color-bg-surface)',
                            border: '1px solid var(--color-border)',
                            fontSize: '11px',
                            fontFamily: 'monospace',
                          }}
                        >
                          <div style={{ color: '#ef4444' }}>- Batas Latensi: Maksimum 240ms</div>
                          <div style={{ color: '#10b981', fontWeight: 600 }}>+ Batas Latensi: Maksimum 120ms (Circuit-breaker: 500ms)</div>
                        </div>

                        <NeuronButton
                          size="xs"
                          variant="primary"
                          leadingIcon={<CornerDownLeft size={12} />}
                          onClick={handleApplyAction}
                          style={{ alignSelf: 'flex-start' }}
                        >
                          {isId ? 'Sisipkan ke Dokumen' : 'Apply to Document'}
                        </NeuronButton>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 14px',
                    background: 'var(--color-bg-canvas)',
                    borderRadius: 10,
                    width: 'fit-content',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#df7e30', animation: 'pulse 1s infinite' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#df7e30', animation: 'pulse 1s infinite 0.2s' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#df7e30', animation: 'pulse 1s infinite 0.4s' }} />
                  </div>
                  <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {isId ? 'Copilot sedang menganalisis dokumen...' : 'Copilot is analyzing document...'}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Action Suggestion Chips */}
            <div
              style={{
                padding: '8px 12px',
                background: 'var(--color-bg-surface)',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isId ? 'Saran Aksi Cepat' : 'Suggested Actions'}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Klik untuk eksekusi' : 'Click to execute'}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  paddingBottom: 2,
                }}
              >
                {quickChips.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendPrompt(c.prompt)}
                    disabled={isTyping}
                    style={{
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-canvas)',
                      color: 'var(--color-text-secondary)',
                      borderRadius: 8,
                      padding: '5px 10px',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      cursor: isTyping ? 'not-allowed' : 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                    onMouseEnter={(e) => {
                      if (!isTyping) {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.color = 'var(--color-primary)';
                        e.currentTarget.style.background = 'rgba(223, 126, 48, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isTyping) {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.background = 'var(--color-bg-canvas)';
                      }
                    }}
                  >
                    {c.icon}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Composer using NeuronInput and NeuronButton */}
            <div
              style={{
                padding: '12px 14px',
                background: 'var(--color-bg-canvas)',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                flexShrink: 0,
                boxShadow: '0 -2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <NeuronInput
                    size="sm"
                    placeholder={isId ? 'Tanya Copilot atau ketik instruksi...' : 'Ask instructions or edit...'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendPrompt();
                      }
                    }}
                    leadingIcon={<Sparkles size={14} color="var(--color-primary)" />}
                    disabled={isTyping}
                  />
                </div>

                <NeuronButton
                  size="sm"
                  variant="primary"
                  disabled={!inputValue.trim() || isTyping}
                  onClick={() => handleSendPrompt()}
                  leadingIcon={<Send size={13} />}
                  style={{ flexShrink: 0 }}
                >
                  {isId ? 'Kirim' : 'Send'}
                </NeuronButton>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '10.5px',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <span>
                  {isId ? 'Tekan' : 'Press'}{' '}
                  <kbd
                    style={{
                      padding: '1px 5px',
                      borderRadius: 4,
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border)',
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    Enter ↵
                  </kbd>{' '}
                  {isId ? 'untuk kirim prompt' : 'to submit prompt'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Shield size={10} color="#10b981" />
                  <span>Neudela AI Studio Engine</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 2: Full-Canvas Chat & Artifact Studio
// ─────────────────────────────────────────────
function FullCanvasChatPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [selectedModel, setSelectedModel] = useState('claude-3-5');
  const [reasoningOpen, setReasoningOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [executionRun, setExecutionRun] = useState(false);
  const [chatFeedback, setChatFeedback] = useState<'up' | 'down' | null>(null);
  const [studioPrompt, setStudioPrompt] = useState('');

  const sampleSnippet = `// Neudela Token-aware Rate Limiter Middleware
import { Request, Response, NextFunction } from 'express';
import { RedisClient } from '@neudela/cache-cluster';

export const rateLimitGuard = (maxRpm: number = 120) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.headers['x-forwarded-for'] || req.ip;
    const windowKey = \`ratelimit:\${clientIp}:\${Math.floor(Date.now() / 60000)}\`;

    const requestHits = await RedisClient.incr(windowKey);
    if (requestHits === 1) {
      await RedisClient.expire(windowKey, 60);
    }

    if (requestHits > maxRpm) {
      return res.status(429).json({
        error: 'TOO_MANY_REQUESTS',
        message: 'Rate limit ceiling exceeded. Try again in 60s.',
        currentLimit: maxRpm,
        retryAfterSecs: 60,
      });
    }

    res.setHeader('X-RateLimit-Limit', maxRpm);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRpm - requestHits));
    next();
  };
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunCode = () => {
    setExecutionRun(true);
    setTimeout(() => setExecutionRun(false), 3000);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 880,
        margin: '0 auto',
        height: isMobile ? 540 : 560,
        minHeight: isMobile ? 540 : 560,
        maxHeight: isMobile ? 540 : 560,
        boxSizing: 'border-box',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Top Studio Model Header Bar */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: isMobile ? '10px 14px' : '12px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={16} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: isMobile ? '13px' : '14px', color: 'var(--color-text-primary)' }}>
                Neudela Artifact Studio
              </span>
              <NeuronBadge size="xs" variant="brand">Multi-Turn v3.2</NeuronBadge>
            </div>
          </div>
        </div>

        <div style={{ width: isMobile ? '100%' : '200px' }}>
          <NeuronSelect
            size="sm"
            value={selectedModel}
            onChange={(val) => setSelectedModel(val as string)}
            options={[
              { value: 'claude-3-5', label: 'Claude 3.5 Sonnet (200k)' },
              { value: 'gemini-1-5', label: 'Gemini 1.5 Pro (2M)' },
              { value: 'gpt-4o', label: 'GPT-4o Omnimodal (128k)' },
            ]}
          />
        </div>
      </div>

      {/* Main Chat & Artifact Feed Area */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: isMobile ? '12px 14px' : '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 14 : 20,
        }}
      >
        {/* User Prompt Message */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #df7e30 0%, #b45309 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', flexShrink: 0 }}>
            BD
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Bale</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>14:52 WIB</span>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 12, fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-primary)' }}>
              {isId
                ? 'Buatkan middleware Express.js TypeScript untuk rate limiting berbasis Redis cluster dengan batas 120 RPM per IP address, lengkap dengan standard headers X-RateLimit.'
                : 'Write an Express.js TypeScript middleware for Redis cluster sliding-window rate limiting with 120 RPM per IP ceiling, complete with standard X-RateLimit headers.'}
            </div>
          </div>
        </div>

        {/* AI Assistant Response with Reasoning Accordion & Code Artifact */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Neudela Copilot</strong>
              <span style={{ fontSize: '10.5px', color: '#3b82f6', fontWeight: 700, padding: '1px 6px', borderRadius: 6, background: 'rgba(59, 130, 246, 0.12)' }}>
                {selectedModel === 'claude-3-5' ? 'Claude 3.5 Sonnet' : selectedModel === 'gemini-1-5' ? 'Gemini 1.5 Pro' : 'GPT-4o'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>14:53 WIB · 1.2s</span>
            </div>

            {/* Chain of Thought (Reasoning) Accordion */}
            <div
              style={{
                marginBottom: 14,
                border: '1px solid var(--color-border)',
                borderRadius: 10,
                background: 'var(--color-bg-canvas)',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => setReasoningOpen(!reasoningOpen)}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Brain size={14} color="#8b5cf6" />
                  <span>{isId ? 'Proses Penalaran AI (4 Langkah Analisis)' : 'Thought Process (4 Steps Analyzed)'}</span>
                </div>
                {reasoningOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {reasoningOpen && (
                <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.6, background: 'var(--color-bg-surface)' }}>
                  {isId ? (
                    <>
                      1. Mengevaluasi strategi sliding window counter vs fixed bucket pada Redis cluster.<br />
                      2. Memetakan kunci atomik <code>ratelimit:ip:timestamp_minute</code> dengan TTL 60 detik.<br />
                      3. Menghitung sisa kuota dan menyuntikkan header kepatuhan RFC 6585 (<code>X-RateLimit-Limit</code> & <code>X-RateLimit-Remaining</code>).<br />
                      4. Mengembalikan HTTP 429 Too Many Requests dengan payload JSON terstruktur.
                    </>
                  ) : (
                    <>
                      1. Evaluating sliding window vs token bucket implementation tradeoffs on Redis clusters.<br />
                      2. Structuring atomic increment keys with 60-second TTL to guarantee zero-leak cleanup.<br />
                      3. Formatting RFC 6585 compliance headers (<code>X-RateLimit-Limit</code> & <code>X-RateLimit-Remaining</code>).<br />
                      4. Emitting structured HTTP 429 payload with retry duration telemetry.
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Answer prose */}
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', lineHeight: 1.6, color: 'var(--color-text-primary)' }}>
              {isId
                ? 'Berikut implementasi middleware rate limiter TypeScript siap produksi yang aman untuk kluster terdistribusi:'
                : 'Here is the production-ready TypeScript rate limiting middleware engineered for high-throughput distributed clusters:'}
            </p>

            {/* Code Artifact Container */}
            <div
              style={{
                borderRadius: 12,
                border: '1px solid var(--color-border)',
                background: '#090d16',
                color: '#e2e8f0',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                marginBottom: 14,
              }}
            >
              {/* Artifact Card Header */}
              <div
                style={{
                  padding: '8px 14px',
                  background: '#131b2e',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Code2 size={14} color="#3b82f6" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#f1f5f9' }}>
                    rateLimitGuard.ts
                  </span>
                  <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: 4, background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontWeight: 600 }}>
                    TypeScript
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    type="button"
                    onClick={handleRunCode}
                    style={{
                      border: 'none',
                      background: executionRun ? '#10b981' : 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Play size={11} />
                    <span>{executionRun ? (isId ? 'Sandbox Berjalan' : 'Running Sandbox') : (isId ? 'Uji Sandbox' : 'Run Sandbox')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    style={{
                      border: 'none',
                      background: copiedCode ? '#10b981' : 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {copiedCode ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copiedCode ? (isId ? 'Tersalin' : 'Copied') : (isId ? 'Salin' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Code lines */}
              <pre
                style={{
                  margin: 0,
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  lineHeight: 1.55,
                  overflowX: 'auto',
                  color: '#93c5fd',
                }}
              >
                {sampleSnippet}
              </pre>

              {executionRun && (
                <div style={{ padding: '8px 14px', background: 'rgba(16, 185, 129, 0.15)', borderTop: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} />
                  <span>Sandbox result: Tests passed (200 OK under 120 RPM, 429 triggered on 121st request).</span>
                </div>
              )}
            </div>

            {/* Feedback Thumbs & Model Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  onClick={() => setChatFeedback('up')}
                  style={{
                    border: '1px solid var(--color-border)',
                    background: chatFeedback === 'up' ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-bg-canvas)',
                    color: chatFeedback === 'up' ? '#10b981' : 'var(--color-text-secondary)',
                    borderRadius: 6,
                    padding: '4px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Helpful"
                >
                  <ThumbsUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => setChatFeedback('down')}
                  style={{
                    border: '1px solid var(--color-border)',
                    background: chatFeedback === 'down' ? 'rgba(239, 68, 68, 0.15)' : 'var(--color-bg-canvas)',
                    color: chatFeedback === 'down' ? '#ef4444' : 'var(--color-text-secondary)',
                    borderRadius: 6,
                    padding: '4px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Unhelpful"
                >
                  <ThumbsDown size={12} />
                </button>
              </div>

              <span style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)' }}>
                {isId ? 'Respon divalidasi oleh Neudela Agentic Guardrails' : 'Grounded by Neudela Agentic Guardrails'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Prompt Bar */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px 20px',
          background: 'var(--color-bg-canvas)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <NeuronInput
            size="md"
            placeholder={isId ? 'Tanyakan follow-up atau minta penyesuaian kode...' : 'Ask follow-up prompt or request refactoring...'}
            value={studioPrompt}
            onChange={(e) => setStudioPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setStudioPrompt('');
              }
            }}
            leadingIcon={<Sparkles size={15} color="var(--color-primary)" />}
          />
        </div>
        <NeuronButton
          size="md"
          variant="primary"
          leadingIcon={<Send size={14} />}
          onClick={() => setStudioPrompt('')}
          disabled={!studioPrompt.trim()}
        >
          {isId ? 'Kirim' : 'Send'}
        </NeuronButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 3: Human-in-the-Loop Review & Visual Diff
// ─────────────────────────────────────────────
function HumanInTheLoopPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [refineMode, setRefineMode] = useState(false);
  const [refineText, setRefineText] = useState('');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const handleApprove = () => {
    setStatus('approved');
    setToastNotice(isId ? 'Usulan AI disetujui & dimigrasikan ke kluster produksi!' : 'AI proposal approved and applied to production clusters!');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const handleReject = () => {
    setStatus('rejected');
    setToastNotice(isId ? 'Usulan AI ditolak. Tidak ada perubahan yang dieksekusi.' : 'AI proposal rejected. Zero changes applied.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const handleSendRefine = () => {
    if (!refineText.trim()) return;
    setRefineMode(false);
    setToastNotice(isId ? 'Instruksi perbaikan dikirim ke model untuk regenerasi.' : 'Refine feedback submitted for regeneration.');
    setRefineText('');
    setTimeout(() => setToastNotice(null), 3000);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 880,
        margin: '0 auto',
        height: isMobile ? 540 : 560,
        minHeight: isMobile ? 540 : 560,
        maxHeight: isMobile ? 540 : 560,
        boxSizing: 'border-box',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {toastNotice && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            background: 'var(--color-bg-surface)',
            border: `1px solid ${status === 'approved' ? '#10b981' : '#ef4444'}`,
            color: 'var(--color-text-primary)',
            padding: '10px 16px',
            borderRadius: 8,
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {status === 'approved' ? <CheckCircle2 size={16} color="#10b981" /> : <AlertTriangle size={16} color="#ef4444" />}
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Proposal Header Banner */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: isMobile ? '10px 14px' : '14px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={16} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: isMobile ? '12.5px' : '14px', color: 'var(--color-text-primary)' }}>
                {isId ? 'Tinjauan AI #PR-409' : 'AI Review Gate #PR-409'}
              </span>
              <NeuronBadge size="xs" variant={status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'brand'}>
                {status.toUpperCase()}
              </NeuronBadge>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'block' }}>
              Target: <code>terraform/security-group-ingress.tf</code>
            </span>
          </div>
        </div>

        {/* Confidence Metric Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 20, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>
            98.6% Confidence
          </span>
        </div>
      </div>

      {/* Main Review Body */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: isMobile ? '14px 12px' : '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Rationale Callout Card */}
        <div style={{ padding: '12px 14px', background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', borderRadius: 12 }}>
          <strong style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', display: 'block', marginBottom: 4 }}>
            {isId ? 'Rasionalisasi Usulan Model AI:' : 'AI Agent Rationale & Justification:'}
          </strong>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {isId
              ? 'Aturan ingress saat ini mengizinkan port database 5432 terbuka ke seluruh CIDR blok 0.0.0.0/0 (Risiko Tinggi). Model mengusulkan penyempitan alamat ingress hanya ke subnet privat VPC `10.240.0.0/16` dan menambahkan enkripsi wajib TLS 1.3.'
              : 'Current ingress rules allow PostgreSQL port 5432 to wide open CIDR 0.0.0.0/0 (High Vulnerability). AI recommends restricting ingress exclusively to private VPC subnet `10.240.0.0/16` with mandatory TLS 1.3 cipher enforcement.'}
          </p>
        </div>

        {/* Visual Unified Diff Card */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden', background: '#0b0f19' }}>
          <div style={{ padding: '8px 14px', background: '#131b2e', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#f1f5f9' }}>
              security-group-ingress.tf (Diff)
            </span>
            <div style={{ display: 'flex', gap: 10, fontSize: '10.5px' }}>
              <span style={{ color: '#ef4444' }}>- 2 Lines</span>
              <span style={{ color: '#10b981' }}>+ 4 Lines</span>
            </div>
          </div>

          <div style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '11.5px', lineHeight: 1.6, overflowX: 'auto' }}>
            <div style={{ color: '#64748b' }}>1  resource "aws_security_group_rule" "db_ingress" {'{'}</div>
            <div style={{ color: '#64748b' }}>2    type              = "ingress"</div>
            <div style={{ color: '#64748b' }}>3    from_port         = 5432</div>
            <div style={{ color: '#64748b' }}>4    to_port           = 5432</div>
            <div style={{ color: '#64748b' }}>5    protocol          = "tcp"</div>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '1px 6px', borderRadius: 4, margin: '2px 0' }}>
              - 6    cidr_blocks       = ["0.0.0.0/0"] # VULNERABLE PUBLIC EXPOSURE
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#4ade80', padding: '1px 6px', borderRadius: 4, margin: '2px 0' }}>
              + 6    cidr_blocks       = ["10.240.0.0/16"] # Restricted to Internal VPC
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#4ade80', padding: '1px 6px', borderRadius: 4, margin: '2px 0' }}>
              + 7    security_group_id = aws_security_group.db_cluster.id
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#4ade80', padding: '1px 6px', borderRadius: 4, margin: '2px 0' }}>
              + 8    description       = "Automated SOC2 compliance hardening via Neudela Guardrail"
            </div>
            <div style={{ color: '#64748b' }}>9  {'}'}</div>
          </div>
        </div>

        {/* Refine prompt input if toggled */}
        {refineMode && (
          <div style={{ padding: '12px 14px', borderRadius: 10, background: 'var(--color-bg-canvas)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {isId ? 'Instruksi Revisi Prompt ke AI:' : 'Prompt Refinement Feedback to Model:'}
            </span>
            <NeuronInput
              size="sm"
              placeholder={isId ? 'Contoh: Masukkan juga port 6432 untuk PgBouncer pooler...' : 'Example: Also include port 6432 for PgBouncer pooler...'}
              value={refineText}
              onChange={(e) => setRefineText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendRefine();
                }
              }}
              leadingIcon={<Sliders size={13} color="var(--color-primary)" />}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
              <NeuronButton size="xs" variant="outline" onClick={() => setRefineMode(false)}>
                {isId ? 'Batal' : 'Cancel'}
              </NeuronButton>
              <NeuronButton size="xs" variant="primary" onClick={handleSendRefine}>
                {isId ? 'Kirim Ulang' : 'Regenerate'}
              </NeuronButton>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: isMobile ? '10px 14px' : '12px 20px',
          background: 'var(--color-bg-canvas)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <NeuronButton
          size="sm"
          variant="outline"
          leadingIcon={<RotateCcw size={13} />}
          onClick={() => setRefineMode(!refineMode)}
        >
          {isId ? 'Minta Revisi (Refine)' : 'Refine Proposal'}
        </NeuronButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: isMobile ? '100%' : 'auto' }}>
          <div style={{ flex: isMobile ? 1 : 'none' }}>
            <NeuronButton
              size="sm"
              variant="outline"
              leadingIcon={<X size={13} />}
              onClick={handleReject}
              disabled={status !== 'pending'}
            >
              {isId ? 'Tolak' : 'Reject'}
            </NeuronButton>
          </div>
          <div style={{ flex: isMobile ? 1 : 'none' }}>
            <NeuronButton
              size="sm"
              variant="primary"
              leadingIcon={<Check size={13} />}
              onClick={handleApprove}
              disabled={status !== 'pending'}
            >
              {isId ? 'Setujui' : 'Approve'}
            </NeuronButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 4: Model Playground & Parameter Studio
// ─────────────────────────────────────────────
function PromptPlaygroundPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [mobileTab, setMobileTab] = useState<'params' | 'console'>('console');
  const [model, setModel] = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(0.95);
  const [systemPrompt, setSystemPrompt] = useState(
    isId
      ? 'Anda adalah arsitek cloud security berstandar SOC2. Berikan rekomendasi yang ringkas, tepat, dan berbasis best practice.'
      : 'You are an enterprise cloud security architect. Provide concise, production-ready, and SOC2-compliant recommendations.'
  );
  const [userPrompt, setUserPrompt] = useState(
    isId ? 'Bagaimana cara terbaik memitigasi serangan DDoS layer 7 pada ingress gateway?' : 'What is the optimal mitigation architecture for layer 7 DDoS on Kubernetes edge ingress?'
  );
  const [outputResponse, setOutputResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRunPlayground = () => {
    setIsGenerating(true);
    setOutputResponse(null);
    if (isMobile) {
      setMobileTab('console');
    }
    setTimeout(() => {
      setOutputResponse(
        isId
          ? `1. Cloudflare / AWS Shield Advanced di lapisan tepi (edge) dengan TLS termination.\n2. Ingress Envoy Rate Limiting dengan filter sliding window redis.\n3. WAF Managed Ruleset untuk inspeksi pola bot jahat dan credential stuffing.\n4. Autoscaling HPA pada ingress controller pod dengan ceiling CPU 70%.`
          : `1. Edge-tier Cloudflare / AWS Shield Advanced with automated challenge-response.\n2. Envoy ingress rate-limiting using distributed Redis sliding windows.\n3. OWASP Top 10 WAF managed rulesets blocking known scanner signatures.\n4. Horizontal Pod Autoscaler (HPA) targeting ingress pods at 70% CPU threshold.`
      );
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 940,
        margin: '0 auto',
        height: isMobile ? 540 : 560,
        minHeight: isMobile ? 540 : 560,
        maxHeight: isMobile ? 540 : 560,
        boxSizing: 'border-box',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Studio Header Bar */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: isMobile ? '10px 14px' : '12px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sliders size={15} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 800, fontSize: isMobile ? '12.5px' : '14px', color: 'var(--color-text-primary)' }}>
                {isId ? 'Studio Parameter AI' : 'Prompt & Parameter Studio'}
              </span>
              <NeuronBadge size="xs" variant="brand">Evaluation</NeuronBadge>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NeuronButton
            size="sm"
            variant="primary"
            leadingIcon={<Play size={13} />}
            onClick={handleRunPlayground}
            disabled={isGenerating}
          >
            {isGenerating ? (isId ? 'Memproses...' : 'Running...') : (isId ? 'Jalankan Prompt' : 'Run Prompt')}
          </NeuronButton>
        </div>
      </div>

      {/* Segmented control for Mobile */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            background: 'var(--color-bg-surface)',
            padding: 3,
            borderRadius: 10,
            border: '1px solid var(--color-border)',
            margin: '8px 12px',
            gap: 4,
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={() => setMobileTab('params')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 8,
              border: 'none',
              background: mobileTab === 'params' ? 'var(--color-primary)' : 'transparent',
              color: mobileTab === 'params' ? '#fff' : 'var(--color-text-secondary)',
              fontWeight: 600,
              fontSize: '11.5px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Sliders size={13} />
            <span>{isId ? 'Parameter Model' : 'Model Parameters'}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('console')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 8,
              border: 'none',
              background: mobileTab === 'console' ? 'var(--color-primary)' : 'transparent',
              color: mobileTab === 'console' ? '#fff' : 'var(--color-text-secondary)',
              fontWeight: 600,
              fontSize: '11.5px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Play size={13} />
            <span>{isId ? 'Prompt & Output' : 'Prompt & Output'}</span>
          </button>
        </div>
      )}

      {/* Split Workstation: Left Parameters & System vs Right Live Console */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          flex: 1,
          minHeight: 0,
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: !isMobile ? '300px 1fr' : undefined,
        }}
      >
        {/* Left Parameter Panel */}
        {(!isMobile || mobileTab === 'params') && (
          <div
            style={{
              flex: isMobile ? 1 : undefined,
              borderRight: !isMobile ? '1px solid var(--color-border)' : 'none',
              background: 'var(--color-bg-canvas)',
              padding: isMobile ? '12px 14px' : '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                Target Foundation Model
              </label>
              <NeuronSelect
                size="sm"
                value={model}
                onChange={(val) => setModel(val as string)}
                options={[
                  { value: 'gpt-4o', label: 'GPT-4o (OpenAI)' },
                  { value: 'claude-3-5', label: 'Claude 3.5 Sonnet (Anthropic)' },
                  { value: 'gemini-1-5', label: 'Gemini 1.5 Pro (Google)' },
                  { value: 'mistral-large', label: 'Mistral Large 2 (Mistral)' },
                ]}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>Temperature</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)' }}>{temperature.toFixed(2)}</span>
              </div>
              <NeuronSlider
                size="sm"
                variant="brand"
                min={0}
                max={2}
                step={0.05}
                value={temperature}
                onChange={(val: number) => setTemperature(val)}
              />
              <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: 4, display: 'block' }}>0 = Deterministik, 1 = Kreatif</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>Max Output Tokens</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)' }}>{maxTokens}</span>
              </div>
              <NeuronSlider
                size="sm"
                variant="brand"
                min={256}
                max={8192}
                step={256}
                value={maxTokens}
                onChange={(val: number) => setMaxTokens(val)}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>Top-P Nucleus</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)' }}>{topP.toFixed(2)}</span>
              </div>
              <NeuronSlider
                size="sm"
                variant="brand"
                min={0.1}
                max={1}
                step={0.05}
                value={topP}
                onChange={(val: number) => setTopP(val)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                System Prompt Instructions
              </label>
              <NeuronTextArea
                size="sm"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={3}
                placeholder="Define system persona and instructions..."
              />
            </div>

            {isMobile && (
              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
                <NeuronButton size="sm" variant="primary" onClick={() => setMobileTab('console')}>
                  {isId ? 'Lanjut ke Prompt Test & Output →' : 'Continue to Prompt Test →'}
                </NeuronButton>
              </div>
            )}
          </div>
        )}

        {/* Right Output & Prompt Console */}
        {(!isMobile || mobileTab === 'console') && (
          <div
            style={{
              flex: 1,
              padding: isMobile ? '12px 14px' : '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              overflowY: 'auto',
              background: 'var(--color-bg-surface)',
            }}
          >
            {/* User Prompt Box */}
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>
                User Test Prompt
              </label>
              <NeuronTextArea
                size="sm"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={isMobile ? 2 : 3}
                placeholder="Type your test prompt to execute..."
              />
            </div>

            {/* Model Output Screen */}
            <div style={{ flex: 1, minHeight: 160, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                  Generated Output
                </label>
                {outputResponse && (
                  <span style={{ fontSize: '10.5px', color: '#10b981', fontWeight: 600 }}>
                    ✓ 184 Tokens · 240ms · $0.0009
                  </span>
                )}
              </div>

              <div
                style={{
                  flex: 1,
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  background: 'var(--color-bg-canvas)',
                  padding: '12px 14px',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'pre-wrap',
                  overflowY: 'auto',
                }}
              >
              {isGenerating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)' }}>
                  <RefreshCw size={14} className="spin-animation" />
                  <span>Streaming token generation from {model}...</span>
                </div>
              ) : outputResponse ? (
                outputResponse
              ) : (
                <span style={{ color: 'var(--color-text-tertiary)' }}>
                  {isId ? 'Klik "Jalankan Prompt" di pojok kanan atas untuk menguji respon model.' : 'Click "Run Prompt" in top right toolbar to test parameter output.'}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Interactive Variant 5: Enterprise RAG & Grounded Citations
// ─────────────────────────────────────────────
interface RagSource {
  id: number;
  title: string;
  category: string;
  similarity: number;
  snippet: string;
  sourceDoc: string;
}

function RagKnowledgeSearchPreview({ viewportMode }: { viewportMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const { language } = useLanguage();
  const isId = language === 'id';
  const isMobile = viewportMode === 'mobile';

  const [query, setQuery] = useState(
    isId ? 'Berapa hari batas waktu pengembalian dana transaksi pembatalan pesanan?' : 'What is the refund turnaround SLA for canceled merchant orders?'
  );
  const [activeCitation, setActiveCitation] = useState<number | null>(null);

  const sources: RagSource[] = [
    {
      id: 1,
      title: 'Finance & Merchant Refund Policy v4.2',
      category: 'Financial Operations',
      similarity: 96.8,
      snippet: isId
        ? 'Pasal 4.1: Pengembalian dana transaksi non-tunai (kartu debit/kredit/QRIS) diproses maksimal dalam 2 hari kerja bank sejak konfirmasi pembatalan disetujui merchant.'
        : 'Section 4.1: Omnichannel refunds (credit card/debit/QRIS) must be processed within a strict ceiling of 2 business banking days following merchant approval.',
      sourceDoc: 'docs/finance/refund-policy-2026.pdf',
    },
    {
      id: 2,
      title: 'Dispute & Chargeback Resolution Guidelines',
      category: 'Risk & Legal Compliance',
      similarity: 92.4,
      snippet: isId
        ? 'Pasal 9.3: Dalam hal terjadi indikasi sengketa (chargeback), tim investigasi memiliki waktu 14 hari kalender untuk menyerahkan bukti resi pengiriman logistik.'
        : 'Section 9.3: In cases of formal chargeback escalations, merchant operations are allotted 14 calendar days to supply proof of fulfillment delivery.',
      sourceDoc: 'docs/legal/dispute-management.pdf',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 880,
        margin: '0 auto',
        height: isMobile ? 540 : 560,
        minHeight: isMobile ? 540 : 560,
        maxHeight: isMobile ? 540 : 560,
        boxSizing: 'border-box',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* Top Search Input Row */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: isMobile ? '12px 14px' : '16px 20px',
          background: 'var(--color-bg-canvas)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: '#0ea5e9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={14} />
            </div>
            <strong style={{ fontSize: isMobile ? '12.5px' : '13.5px', color: 'var(--color-text-primary)' }}>
              Neudela Enterprise RAG Vector Engine
            </strong>
          </div>
          <NeuronBadge size="xs" variant="brand">Grounded Hybrid Search</NeuronBadge>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <NeuronInput
              size="sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isId ? 'Ajukan pertanyaan ke seluruh basis pengetahuan perusahaan...' : 'Query entire enterprise knowledge corpus...'}
              leadingIcon={<Search size={14} />}
            />
          </div>
          <NeuronButton size="sm" variant="primary">
            {isId ? 'Cari Jawaban' : 'Search RAG'}
          </NeuronButton>
        </div>
      </div>

      {/* Main Grounded Answer & Citations Area */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: isMobile ? '14px 12px' : '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 14 : 20,
        }}
      >
        {/* Synthesized Answer Box */}
        <div
          style={{
            padding: '18px 20px',
            borderRadius: 14,
            background: 'var(--color-bg-canvas)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Sparkles size={16} color="#0ea5e9" />
            <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
              {isId ? 'Jawaban Terverifikasi dengan Sitasi Sumber:' : 'Synthesized Grounded Answer:'}
            </strong>
          </div>

          <p style={{ margin: '0 0 10px 0', fontSize: '13px', lineHeight: 1.7, color: 'var(--color-text-primary)' }}>
            {isId ? (
              <>
                Berdasarkan kebijakan resmi perusahaan, pengembalian dana untuk pesanan merchant yang dibatalkan wajib diselesaikan paling lambat dalam waktu <strong>2 hari kerja bank</strong> sejak persetujuan{' '}
                <button
                  type="button"
                  onClick={() => setActiveCitation(1)}
                  style={{
                    background: activeCitation === 1 ? '#0ea5e9' : 'rgba(14, 165, 233, 0.15)',
                    color: activeCitation === 1 ? '#ffffff' : '#0284c7',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    borderRadius: 6,
                    padding: '1px 6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    margin: '0 2px',
                  }}
                >
                  [1]
                </button>
                . Namun apabila transaksi tersebut telah berstatus sengketa resmi (chargeback), tim operasional diberikan kelonggaran waktu hingga <strong>14 hari kalender</strong> untuk verifikasi berkas pendukung{' '}
                <button
                  type="button"
                  onClick={() => setActiveCitation(2)}
                  style={{
                    background: activeCitation === 2 ? '#0ea5e9' : 'rgba(14, 165, 233, 0.15)',
                    color: activeCitation === 2 ? '#ffffff' : '#0284c7',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    borderRadius: 6,
                    padding: '1px 6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    margin: '0 2px',
                  }}
                >
                  [2]
                </button>
                .
              </>
            ) : (
              <>
                According to the corporate refund policy, reimbursements for approved merchant cancellations must be completed within a strict SLA of <strong>2 business banking days</strong>{' '}
                <button
                  type="button"
                  onClick={() => setActiveCitation(1)}
                  style={{
                    background: activeCitation === 1 ? '#0ea5e9' : 'rgba(14, 165, 233, 0.15)',
                    color: activeCitation === 1 ? '#ffffff' : '#0284c7',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    borderRadius: 6,
                    padding: '1px 6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    margin: '0 2px',
                  }}
                >
                  [1]
                </button>
                . In cases escalated to formal payment chargeback disputes, investigation teams are granted a <strong>14 calendar day</strong> window to file courier fulfillment verification{' '}
                <button
                  type="button"
                  onClick={() => setActiveCitation(2)}
                  style={{
                    background: activeCitation === 2 ? '#0ea5e9' : 'rgba(14, 165, 233, 0.15)',
                    color: activeCitation === 2 ? '#ffffff' : '#0284c7',
                    border: '1px solid rgba(14, 165, 233, 0.4)',
                    borderRadius: 6,
                    padding: '1px 6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    margin: '0 2px',
                  }}
                >
                  [2]
                </button>
                .
              </>
            )}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11.5px', color: '#10b981', fontWeight: 600 }}>
            <CheckCircle2 size={13} />
            <span>{isId ? '100% didasarkan pada dokumen rujukan terindeks (Zero Hallucination)' : '100% grounded in verified source documents (Zero Hallucination)'}</span>
          </div>
        </div>

        {/* Source Citation Cards Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <strong style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {isId ? 'Dokumen Sumber Rujukan Terindeks (Vector Citations)' : 'Referenced Knowledge Citations (Vector Chunks)'}
            </strong>
            <span style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)' }}>
              2 Chunks Retrieved (Cosine Top-K)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            {sources.map((src) => {
              const isSelected = activeCitation === src.id;
              return (
                <div
                  key={src.id}
                  onClick={() => setActiveCitation(isSelected ? null : src.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: isSelected ? 'rgba(14, 165, 233, 0.08)' : 'var(--color-bg-surface)',
                    border: `1.5px solid ${isSelected ? '#0ea5e9' : 'var(--color-border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 0 0 3px rgba(14, 165, 233, 0.15)' : 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 18, height: 18, borderRadius: 4, background: '#0ea5e9', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        [{src.id}]
                      </span>
                      <strong style={{ fontSize: '12.5px', color: 'var(--color-text-primary)' }}>
                        {src.title}
                      </strong>
                    </div>
                    <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0ea5e9', padding: '1px 6px', borderRadius: 6, background: 'rgba(14, 165, 233, 0.12)' }}>
                      {src.similarity}% Match
                    </span>
                  </div>

                  <p style={{ margin: '6px 0 8px 0', fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    "{src.snippet}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    <FileText size={11} />
                    <span>{src.sourceDoc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Live Preview Switcher
// ─────────────────────────────────────────────
export function renderLiveAiCopilotPreview(
  variantId: AiCopilotVariantId,
  _isDarkMode?: boolean,
  _onNavigate?: () => void,
  viewportMode?: 'desktop' | 'tablet' | 'mobile'
) {
  switch (variantId) {
    case 'floating-copilot':
      return <FloatingCopilotPreview viewportMode={viewportMode} />;
    case 'full-canvas-chat':
      return <FullCanvasChatPreview viewportMode={viewportMode} />;
    case 'human-in-the-loop':
      return <HumanInTheLoopPreview viewportMode={viewportMode} />;
    case 'prompt-playground':
      return <PromptPlaygroundPreview viewportMode={viewportMode} />;
    case 'rag-knowledge-search':
      return <RagKnowledgeSearchPreview viewportMode={viewportMode} />;
    default:
      return <FloatingCopilotPreview viewportMode={viewportMode} />;
  }
}

// ─────────────────────────────────────────────
// TSX Code Snippets for Modal View
// ─────────────────────────────────────────────
const AI_COPILOT_TSX_SNIPPETS: Record<AiCopilotVariantId, string> = {
  'floating-copilot': `import React, { useState } from 'react';
import { NeuronButton, NeuronBadge, NeuronInput } from 'neudela';
import { Sparkles, Bot, Send, CornerDownLeft } from 'lucide-react';

export function ContextualCopilotSidecar() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    { id: '1', sender: 'assistant', text: 'I am ready to help refine your active document!' },
  ]);

  return (
    <div className="copilot-workspace-grid">
      <div className="main-editor">
        {/* Active Document / Dashboard Canvas */}
      </div>
      {open && (
        <aside className="copilot-sidecar">
          <header className="copilot-header">
            <Sparkles size={14} color="#df7e30" />
            <h4>Neudela Copilot</h4>
          </header>
          <div className="copilot-stream">
            {/* Multi-turn conversation messages */}
          </div>
          <div className="copilot-input-bar">
            {/* Prompt input and quick chips */}
          </div>
        </aside>
      )}
    </div>
  );
}`,

  'full-canvas-chat': `import React, { useState } from 'react';
import { NeuronButton, NeuronSelect, NeuronBadge } from 'neudela';
import { Bot, Brain, Code2, Play, Copy, Send } from 'lucide-react';

export function ConversationalArtifactStudio() {
  const [model, setModel] = useState('claude-3-5');
  const [codeCopied, setCodeCopied] = useState(false);

  return (
    <div className="artifact-chat-canvas">
      <header className="chat-toolbar">
        <NeuronSelect value={model} onChange={setModel} options={[...]} />
      </header>
      <div className="chat-stream">
        {/* Reasoning CoT Accordion */}
        <div className="reasoning-card">
          <Brain size={14} /> Step-by-Step Chain of Thought
        </div>
        {/* Code Artifact with Run Sandbox & Copy */}
        <div className="code-artifact-card">
          <button onClick={() => setCodeCopied(true)}>Copy Code</button>
        </div>
      </div>
    </div>
  );
}`,

  'human-in-the-loop': `import React, { useState } from 'react';
import { NeuronButton, NeuronBadge } from 'neudela';
import { Shield, Check, X, RotateCcw } from 'lucide-react';

export function HumanInTheLoopReviewGate({ proposalId = 'PR-409' }) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <div className="approval-gate-card">
      <div className="confidence-meter">98.6% Model Confidence Score</div>
      <div className="visual-diff-viewer">
        {/* Side-by-side or Unified Additions & Removals */}
      </div>
      <div className="approval-actions">
        <NeuronButton variant="outline" onClick={() => setStatus('rejected')}>Reject</NeuronButton>
        <NeuronButton variant="primary" onClick={() => setStatus('approved')}>Approve & Apply</NeuronButton>
      </div>
    </div>
  );
}`,

  'prompt-playground': `import React, { useState } from 'react';
import { NeuronButton, NeuronSelect, NeuronSlider, NeuronTextArea } from 'neudela';
import { Sliders, Play } from 'lucide-react';

export function ModelPromptPlayground() {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [userPrompt, setUserPrompt] = useState('');

  return (
    <div className="playground-grid">
      <div className="parameter-controls">
        <label>Temperature: {temperature}</label>
        <NeuronSlider min={0} max={2} step={0.05} value={temperature} onChange={setTemperature} />
      </div>
      <div className="live-output-console">
        <NeuronTextArea value={userPrompt} onChange={e => setUserPrompt(e.target.value)} />
      </div>
    </div>
  );
}`,

  'rag-knowledge-search': `import React, { useState } from 'react';
import { NeuronInput, NeuronButton, NeuronBadge } from 'neudela';
import { Search, BookOpen, FileText } from 'lucide-react';

export function EnterpriseRagSearch() {
  const [query, setQuery] = useState('');

  return (
    <div className="rag-search-container">
      <NeuronInput leadingIcon={<Search size={14} />} value={query} onChange={e => setQuery(e.target.value)} />
      <div className="grounded-answer">
        Synthesized answer with citation pills [1], [2] linked to verified source documents.
      </div>
      <div className="citation-cards-grid">
        {/* Source cards with similarity percentage */}
      </div>
    </div>
  );
}`,
};

// ─────────────────────────────────────────────
// Master Pattern View Component
// ─────────────────────────────────────────────
interface AiCopilotPatternViewProps {
  setActiveTab: (tabId: string) => void;
  isDarkMode?: boolean;
}

export default function AiCopilotPatternView({
  setActiveTab,
}: AiCopilotPatternViewProps) {
  const { language } = useLanguage();
  const isId = language === 'id';

  const [selectedVariant, setSelectedVariant] = useState<AiCopilotVariantId>('floating-copilot');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'preview' | 'tsx'>('preview');
  const [copiedTSX, setCopiedTSX] = useState(false);

  const activeMeta =
    AI_COPILOT_VARIANTS.find((v) => v.id === selectedVariant) || AI_COPILOT_VARIANTS[0];

  const handleOpenModal = (vId: AiCopilotVariantId) => {
    setSelectedVariant(vId);
    setModalTab('preview');
    setIsModalOpen(true);
  };

  const handleOpenNewTab = (vId: AiCopilotVariantId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#preview-ai-copilot-${vId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyTSX = () => {
    const code = AI_COPILOT_TSX_SNIPPETS[selectedVariant] || '';
    navigator.clipboard.writeText(code);
    setCopiedTSX(true);
    setTimeout(() => setCopiedTSX(false), 2000);
  };

  return (
    <div className="pattern-ai-copilot-view" style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 'var(--space-16)', animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── 1. Page Header (Strict GEMINI.md Invariant) ── */}
      <div className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <span className="page-category-label">Pattern</span>
        <h1
          className="page-title"
          style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '4px 0 10px 0',
            color: 'var(--color-text-primary)',
          }}
        >
          {isId ? 'AI Copilot & Ruang Kerja Percakapan' : 'AI Copilot & Conversational Workspace'}
        </h1>
        <p
          className="page-subtitle"
          style={{
            width: '100%',
            maxWidth: '100%',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
          }}
        >
          {isId
            ? 'Arsitektur antarmuka asisten AI enterprise terpadu: Sidecar kontekstual berdampingan dengan editor dokumen, studio percakapan multiturn dengan artefak kode sandbox, gerbang tata kelola human-in-the-loop dengan visual diff, studio parameter model playground, serta pencarian semantik RAG berlandaskan sitasi terverifikasi. Klik "Preview di Modal" untuk menguji interaktivitas AI Copilot secara langsung, atau klik "Tab Baru" untuk menjalankan ruang kerja layar penuh sebagai aplikasi nyata.'
            : 'Enterprise-grade composite AI assistant architectures: Contextual sidecar drawers alongside document editors, multi-turn conversational canvases with runnable code artifacts, human-in-the-loop visual diff review gates, LLM parameter playgrounds, and hallucination-free RAG knowledge retrieval with verified citations. Click "Preview in Modal" to inspect live interactions or "New Tab" for a dedicated fullscreen browser window.'}
        </p>

        {/* Stats Header Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Bot size={14} color="#df7e30" />
            <span>{isId ? 'Total Arsitektur:' : 'Total Architectures:'}</span>
            <strong style={{ color: 'var(--color-primary, #df7e30)' }}>{AI_COPILOT_VARIANTS.length} Patterns</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Shield size={14} color="#10b981" />
            <span>{isId ? 'Tata Kelola:' : 'Governance:'}</span>
            <strong style={{ color: '#10b981' }}>Human-in-the-Loop & SOC2</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>
            <Code2 size={14} color="#3b82f6" />
            <span>{isId ? 'Fitur Utama:' : 'Key Capabilities:'}</span>
            <strong style={{ color: '#3b82f6' }}>CoT Reasoning · Sandbox Artifacts · Grounded RAG</strong>
          </div>
        </div>
      </div>

      {/* ── 2. Gallery Overview Cards Grid (Strict GEMINI.md Invariant) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-12)',
        }}
      >
        {AI_COPILOT_VARIANTS.map((variant) => (
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
            {/* Top Accent Gradient Line (3.5px) */}
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

            {/* Header: Avatar Icon & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
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
                {variant.id === 'floating-copilot' && <Sparkles size={20} />}
                {variant.id === 'full-canvas-chat' && <Brain size={20} />}
                {variant.id === 'human-in-the-loop' && <Shield size={20} />}
                {variant.id === 'prompt-playground' && <Sliders size={20} />}
                {variant.id === 'rag-knowledge-search' && <BookOpen size={20} />}
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
              <h3 style={{ margin: '4px 0 6px 0', fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isId ? variant.nameId : variant.nameEn}
              </h3>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {isId ? variant.taglineId : variant.taglineEn}
              </p>
            </div>

            {/* Mini Silhouette Frame */}
            <div
              style={{
                height: 100,
                borderRadius: 8,
                background: 'var(--color-bg-canvas)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 'auto',
              }}
            >
              <AiCopilotMiniSilhouette id={variant.id} accentColor={variant.accentColor} />
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

            {/* Bottom Action Buttons (Strict GEMINI.md Invariant) */}
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

      {/* ── 3. Interactive Modal Overlay (Strict GEMINI.md Invariant) ── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 1180,
              maxHeight: '90vh',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div
              style={{
                height: 64,
                padding: '0 22px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-bg-canvas)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexShrink: 0,
              }}
            >
              {/* Left Side: Dot + Title + Badge + Subtitle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: activeMeta.accentColor,
                    boxShadow: `0 0 10px ${activeMeta.accentColor}`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                      {isId ? activeMeta.nameId : activeMeta.nameEn}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: 10,
                        background: `${activeMeta.accentColor}20`,
                        color: activeMeta.accentColor,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {activeMeta.badge}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--color-text-secondary)',
                      marginTop: 2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={isId ? activeMeta.taglineId : activeMeta.taglineEn}
                  >
                    {isId ? activeMeta.taglineId : activeMeta.taglineEn}
                  </div>
                </div>
              </div>

              {/* Right Side: Subtabs + Terracotta New Tab + Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: 'auto' }}>
                {/* Subtabs Switcher (36px height, no icons) */}
                <div
                  style={{
                    display: 'flex',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: 3,
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
                renderLiveAiCopilotPreview(selectedVariant)
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
                    <code>{AI_COPILOT_TSX_SNIPPETS[selectedVariant] || ''}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Next / Previous Navigation ── */}
      <NextPrevious
        prev={{
          id: 'pat-notifications',
          label: isId ? 'Notifikasi & Pusat Aktivitas' : 'Notifications & Activity Center',
        }}
        next={{
          id: 'pat-file-manager',
          label: isId ? 'Manajemen Berkas & Aset' : 'File & Asset Manager',
        }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
