import React, { useState } from 'react';
import { 
  Check, 
  X, 
  User, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Clock, 
  MessageSquare, 
  CornerDownRight, 
  ExternalLink,
  ChevronDown,
  Mail,
  MoreHorizontal,
  Search,
  CheckCircle2,
  XCircle,
  UserCheck,
  Bot,
  Activity,
  FileText,
  LayoutGrid,
  Tag,
  Layers,
  Info
} from 'lucide-react';
import { 
  NeuronAvatar, 
  NeuronAvatarGroup, 
  NeuronAvatarVerifiedBadge, 
  NeuronAvatarSize, 
  NeuronAvatarShape, 
  NeuronAvatarStatus, 
  NeuronAvatarVariant 
} from '../components/NeuronAvatar';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NeuronInput from '../components/NeuronInput';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

export interface AvatarViewProps {
  setActiveTab: (tab: string) => void;
}

interface AnatomyLabelProps {
  number: number;
  label: string;
  desc: string;
}

const AnatomyLabel: React.FC<AnatomyLabelProps> = ({ number, label, desc }) => (
  <div className="anatomy-label-item">
    <div className="anatomy-marker">{number}</div>
    <div className="anatomy-label-text">
      <div className="anatomy-label-title">{label}</div>
      <div className="anatomy-label-desc">{desc}</div>
    </div>
  </div>
);

function RuleCard({ type, children }: { type: 'do' | 'dont'; children: React.ReactNode }) {
  const isDo = type === 'do';
  return (
    <div className={`rule-card rule-card--${type}`}>
      <div className="rule-card__badge">
        {isDo ? (
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{isDo ? 'DO' : "DON'T"}</span>
      </div>
      <div className="rule-card__body">{children}</div>
    </div>
  );
}

export const AvatarView: React.FC<AvatarViewProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const av = t.avatar;

  const [activeTab, setActiveTabLocal] = useState<'guideline' | 'playbook'>('guideline');

  // Playbook Pattern States
  const [profileStatus, setProfileStatus] = useState<NeuronAvatarStatus>('online');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>(['sarah.j@company.com']);
  const [searchMember, setSearchMember] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [replyText, setReplyText] = useState('');
  const [timelineReplies, setTimelineReplies] = useState([
    {
      id: '1',
      name: 'Marcus Vance',
      avatar: '/avatars/marcus.jpg',
      status: 'busy' as NeuronAvatarStatus,
      time: '2m ago',
      text: 'Confirmed! All 10 color palette variants passed A11y 4.5:1 tests.'
    }
  ]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setTimelineReplies((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: 'Sophia Sterling',
        avatar: '/avatars/sophia.jpg',
        status: 'online' as NeuronAvatarStatus,
        time: 'Just now',
        text: replyText.trim()
      }
    ]);
    setReplyText('');
  };

  const handleAddInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail && !invitedMembers.includes(inviteEmail)) {
      setInvitedMembers([...invitedMembers, inviteEmail]);
      setInviteEmail('');
    }
  };

  const handleQuickInvite = (email: string) => {
    if (!invitedMembers.includes(email)) {
      setInvitedMembers([...invitedMembers, email]);
    }
  };

  const handleRemoveInvite = (emailToRemove: string) => {
    setInvitedMembers(invitedMembers.filter((em) => em !== emailToRemove));
  };

  // Sample User Directory Data
  const directoryMembers = [
    {
      id: '1',
      name: 'Iqbal Dzulfikar',
      email: 'iqbal.dzulfikar@neudela.design',
      role: 'Head of Design',
      department: 'Product',
      status: 'online' as NeuronAvatarStatus,
      avatar: '/avatars/iqbal.jpg',
      verified: true,
    },
    {
      id: '2',
      name: 'Marcus Vance',
      email: 'marcus.v@neudela.design',
      role: 'Lead Architect',
      department: 'Engineering',
      status: 'busy' as NeuronAvatarStatus,
      avatar: '/avatars/marcus.jpg',
      verified: true,
    },
    {
      id: '3',
      name: 'Sophia Sterling',
      email: 'sophia.s@neudela.design',
      role: 'Principal UX Writer',
      department: 'Content',
      status: 'away' as NeuronAvatarStatus,
      avatar: '/avatars/sophia.jpg',
      verified: false,
    },
    {
      id: '4',
      name: 'Alexander Hayes',
      email: 'alex.hayes@neudela.design',
      role: 'Full Stack Engineer',
      department: 'Engineering',
      status: 'offline' as NeuronAvatarStatus,
      initials: 'AH',
      variant: 'indigo' as NeuronAvatarVariant,
      verified: false,
    },
    {
      id: '5',
      name: 'Tara Reynolds',
      email: 'tara.r@neudela.design',
      role: 'Brand Designer',
      department: 'Design System',
      status: 'online' as NeuronAvatarStatus,
      initials: 'TR',
      variant: 'purple' as NeuronAvatarVariant,
      verified: true,
    },
  ];

  const filteredDirectory = directoryMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.email.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.role.toLowerCase().includes(searchMember.toLowerCase());
    const matchesDept = selectedDepartment === 'All' || m.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="component-view">
      {/* ── Standardized Header Structure ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{av.pageTitle}</h1>
            <p className="page-subtitle">{av.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Standardized Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setActiveTabLocal('guideline')}
          >
            {av.tabGuideline}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setActiveTabLocal('playbook')}
          >
            {av.tabPlaybook}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TAB 1: GUIDELINE
          ══════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">
          
          {/* ── 1. OVERVIEW ── */}
          <div className="section-card">
            <h2 className="section-title">{av.overviewTitle}</h2>
            <p className="section-description">{av.overviewDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <NeuronAvatar src="/avatars/sophia.jpg" size="md" />
                  <strong style={{ fontSize: '14px' }}>Photo Mode</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                  High-resolution raster portraits with crisp object-fit clipping.
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <NeuronAvatar initials="OR" variant="brand" size="md" />
                  <strong style={{ fontSize: '14px' }}>Initials Mode</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Auto-computed 2-letter uppercase initials on color-tinted containers.
                </p>
              </div>

              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <NeuronAvatar variant="brand" size="md" />
                  <strong style={{ fontSize: '14px' }}>Icon Fallback</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Standardized geometric silhouette when no photo or name is provided.
                </p>
              </div>
            </div>
          </div>

          {/* ── 2. ANATOMY ── */}
          <div className="section-card">
            <h2 className="section-title">{av.anatomyTitle}</h2>
            <p className="section-description">{av.anatomyDesc}</p>

            <div className="anatomy-diagram">
              <div className="anatomy-preview" style={{ minHeight: '320px', padding: 'var(--space-8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Precision Blueprint Diagram Frame */}
                <div style={{ 
                  position: 'relative', 
                  width: '520px',
                  height: '240px',
                  background: 'var(--color-bg-surface)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xs)',
                  overflow: 'visible'
                }}>
                  
                  {/* SVG Precision Connector Lines (Standardized Solid Black stroke) */}
                  <svg 
                    width="520" 
                    height="240" 
                    viewBox="0 0 520 240" 
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}
                  >
                    {/* Line 1: Avatar Container (Top-Left Angle) */}
                    <polyline points="56,48 56,88 138,88" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Line 2: User Photograph (Top Center Straight) */}
                    <line x1="172" y1="38" x2="172" y2="75" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Line 3: User Identity & Metadata (Top Right Straight) */}
                    <line x1="321" y1="38" x2="321" y2="80" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Line 4: Online Status Indicator Dot (Points to Top-Right Status Dot) */}
                    <polyline points="440,56 204,56 204,75" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Line 5: Verified Badge Icon (Points to Bottom-Right Verified Badge) */}
                    <polyline points="440,171 204,171 204,147" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />

                    {/* Line 6: Contrast Border Ring (Bottom-Left Angle) */}
                    <polyline points="56,180 56,126 136,126" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" />
                  </svg>

                  {/* Target Avatar Component with Metadata situated at (140px, 75px) */}
                  <div style={{
                    position: 'absolute',
                    left: '140px',
                    top: '75px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    zIndex: 5
                  }}>
                    {/* Avatar Container with 4px contrast ring, online dot at top-right, verified badge at bottom-right */}
                    <div style={{ position: 'relative' }}>
                      <NeuronAvatar
                        src="/avatars/sophia.jpg"
                        size="2xl"
                        status="online"
                        statusPosition="top-right"
                        contrastBorder
                        badge={<NeuronAvatarVerifiedBadge size="md" />}
                        badgePosition="bottom-right"
                      />
                    </div>

                    {/* User Identity Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                        Sophia Sterling
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--brand-600)', lineHeight: 1.3 }}>
                        Lead Product Designer
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>
                        sophia.s@neudela.design
                      </div>
                    </div>
                  </div>

                  {/* Marker 1: Avatar Container (Top-Left) */}
                  <div style={{ position: 'absolute', left: '45px', top: '25px', zIndex: 20 }}>
                    <span className="anatomy-marker">1</span>
                  </div>

                  {/* Marker 2: User Photograph (Top Center) */}
                  <div style={{ position: 'absolute', left: '161px', top: '15px', zIndex: 20 }}>
                    <span className="anatomy-marker">2</span>
                  </div>

                  {/* Marker 3: User Identity & Metadata (Top Right) */}
                  <div style={{ position: 'absolute', left: '310px', top: '15px', zIndex: 20 }}>
                    <span className="anatomy-marker">3</span>
                  </div>

                  {/* Marker 4: Online Status Indicator Dot (Far Right Top) */}
                  <div style={{ position: 'absolute', left: '440px', top: '45px', zIndex: 20 }}>
                    <span className="anatomy-marker">4</span>
                  </div>

                  {/* Marker 5: Verified Badge Icon (Far Right Bottom) */}
                  <div style={{ position: 'absolute', left: '440px', top: '160px', zIndex: 20 }}>
                    <span className="anatomy-marker">5</span>
                  </div>

                  {/* Marker 6: Contrast Border Ring (Bottom-Left) */}
                  <div style={{ position: 'absolute', left: '45px', top: '180px', zIndex: 20 }}>
                    <span className="anatomy-marker">6</span>
                  </div>

                </div>
              </div>

              {/* Anatomy Labels */}
              <div className="anatomy-labels">
                <AnatomyLabel number={1} label={av.anatomyItem1} desc={av.anatomyDesc1} />
                <AnatomyLabel number={2} label={av.anatomyItem2} desc={av.anatomyDesc2} />
                <AnatomyLabel number={3} label={av.anatomyItem3} desc={av.anatomyDesc3} />
                <AnatomyLabel number={4} label={av.anatomyItem4} desc={av.anatomyDesc4} />
                <AnatomyLabel number={5} label={av.anatomyItem5} desc={av.anatomyDesc5} />
                <AnatomyLabel number={6} label={av.anatomyItem6} desc={av.anatomyDesc6} />
              </div>
            </div>
          </div>

          {/* ── 3. USAGE & WHEN TO USE / WHEN NOT TO USE ── */}
          <div className="section-card">
            <h2 className="section-title">{av.usageTitle}</h2>
            <p className="section-description">{av.usageDesc}</p>

            {/* Usage Key Rules Banner */}
            <div style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-6)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--brand-500)' }} />
                <strong>{av.usageNote1}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--slate-400)' }} />
                <span>{av.usageNote2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                <Info size={14} />
                <em>{av.usageCommonPlaces}</em>
              </div>
            </div>

            {/* Side-by-Side Comparison Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              
              {/* When to Use Column (Emerald Theme) */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--emerald-200, rgba(16, 185, 129, 0.3))',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-600)' }}>
                  <CheckCircle2 size={20} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0 }}>
                    {av.whenToUseColTitle}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)', flexShrink: 0 }}>
                      <UserCheck size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.when1}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)', flexShrink: 0 }}>
                      <Users size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.when2}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)', flexShrink: 0 }}>
                      <Bot size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.when3}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald-600)', flexShrink: 0 }}>
                      <Activity size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.when4}</span>
                  </div>
                </div>
              </div>

              {/* When Not to Use Column (Red Theme) */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--red-200, rgba(239, 68, 68, 0.3))',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--red-600)' }}>
                  <XCircle size={20} />
                  <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, margin: 0 }}>
                    {av.whenNotToUseColTitle}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)', flexShrink: 0 }}>
                      <FileText size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.whenNot1}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)', flexShrink: 0 }}>
                      <LayoutGrid size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.whenNot2}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)', flexShrink: 0 }}>
                      <Tag size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.whenNot3}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red-600)', flexShrink: 0 }}>
                      <Layers size={14} />
                    </div>
                    <span style={{ fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-primary)', lineHeight: 1.45 }}>{av.whenNot4}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Practical Scenario Previews */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
              
              {/* Scenario 1 */}
              <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Account Header</span>
                  <NeuronBadge size="sm" variant="brand">Single Identity</NeuronBadge>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <NeuronAvatar src="/avatars/iqbal.jpg" size="md" status="online" badge={<NeuronAvatarVerifiedBadge size="sm" />} />
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>iqbal.dzulfikar@neudela.design</span>
                  </div>
                </div>
              </div>

              {/* Scenario 2 */}
              <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Collaborator Stack</span>
                  <NeuronBadge size="sm" variant="success">Group Stack</NeuronBadge>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Project Team:</span>
                  <NeuronAvatarGroup size="sm" max={3}>
                    <NeuronAvatar src="/avatars/iqbal.jpg" />
                    <NeuronAvatar src="/avatars/marcus.jpg" />
                    <NeuronAvatar src="/avatars/sophia.jpg" />
                    <NeuronAvatar initials="AH" variant="indigo" />
                    <NeuronAvatar initials="TR" variant="purple" />
                  </NeuronAvatarGroup>
                </div>
              </div>

              {/* Scenario 3 */}
              <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>AI Assistant Entity</span>
                  <NeuronBadge size="sm" variant="purple">Bot Entity</NeuronBadge>
                </div>
                <div style={{ background: 'var(--color-bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <NeuronAvatar variant="purple" size="md" icon={<Bot size={20} />} status="online" />
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>Neuron Copilot</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Automated System Bot</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── 4. ACCESSIBILITY ── */}
          <div className="section-card">
            <h2 className="section-title">{av.a11yTitle}</h2>
            <p className="section-description">{av.a11yDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)' }}>
                <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>Descriptive Alt Text</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{av.a11yPoint1}</p>
              </div>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)' }}>
                <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>Status Screen Readers</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{av.a11yPoint2}</p>
              </div>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)' }}>
                <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>Contrast Ratios (4.5:1)</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{av.a11yPoint3}</p>
              </div>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-subtle)' }}>
                <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>Keyboard Focus Visible</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>{av.a11yPoint4}</p>
              </div>
            </div>
          </div>

          {/* ── 5. DO'S AND DON'TS ── */}
          <div className="section-card">
            <h2 className="section-title">{av.dosDontsTitle}</h2>
            <p className="section-description">{av.dosDontsDesc}</p>

            <div className="dodont-grid" style={{ marginTop: 'var(--space-6)' }}>
              
              {/* Pair 1: Fallback Initials vs Broken Image Placeholder */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="lg" />
                    <NeuronAvatar name="Marcus Vance" variant="blue" size="lg" />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{av.do1Title}</div>
                  <div className="rule-card__desc">{av.do1Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px dashed var(--red-300)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--red-50)' }}>
                      <X size={16} color="var(--red-500)" />
                      <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--red-600)' }}>404</span>
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--slate-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-100)' }}>
                      <span style={{ fontSize: '10px', color: 'var(--slate-400)' }}>Broken</span>
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{av.dont1Title}</div>
                  <div className="rule-card__desc">{av.dont1Desc}</div>
                </div>
              </RuleCard>

              {/* Pair 2: Contrast Rings in Groups vs Raw Overlapping */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <NeuronAvatarGroup size="md" max={3}>
                      <NeuronAvatar src="/avatars/iqbal.jpg" />
                      <NeuronAvatar src="/avatars/marcus.jpg" />
                      <NeuronAvatar src="/avatars/sophia.jpg" />
                      <NeuronAvatar initials="AH" variant="indigo" />
                      <NeuronAvatar initials="TR" variant="purple" />
                    </NeuronAvatarGroup>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{av.do2Title}</div>
                  <div className="rule-card__desc">{av.do2Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                      <NeuronAvatar src="/avatars/iqbal.jpg" size="md" contrastBorder={false} style={{ marginRight: -12 }} />
                      <NeuronAvatar src="/avatars/marcus.jpg" size="md" contrastBorder={false} style={{ marginRight: -12 }} />
                      <NeuronAvatar src="/avatars/sophia.jpg" size="md" contrastBorder={false} />
                    </div>
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{av.dont2Title}</div>
                  <div className="rule-card__desc">{av.dont2Desc}</div>
                </div>
              </RuleCard>

              {/* Pair 3: Semantic Real-Time Presence vs Misusing Status for Decorative Tags */}
              <RuleCard type="do">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <NeuronAvatar src="/avatars/sophia.jpg" size="lg" status="online" />
                    <NeuronAvatar src="/avatars/marcus.jpg" size="lg" status="busy" />
                    <NeuronAvatar src="/avatars/iqbal.jpg" size="lg" status="away" />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{av.do3Title}</div>
                  <div className="rule-card__desc">{av.do3Desc}</div>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="rule-card__preview">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <NeuronAvatar initials="DOC" size="lg" status="busy" />
                    <NeuronAvatar initials="PDF" size="lg" status="online" />
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">{av.dont3Title}</div>
                  <div className="rule-card__desc">{av.dont3Desc}</div>
                </div>
              </RuleCard>

            </div>
          </div>

          {/* ── 6. CONTENT GUIDELINES ── */}
          <div className="section-card">
            <h2 className="section-title">{av.contentTitle}</h2>
            <p className="section-description">{av.contentDesc}</p>
            <ul style={{ paddingLeft: 'var(--space-5)', margin: 'var(--space-4) 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--fs-text-sm)', color: 'var(--color-text-secondary)' }}>
              <li>{av.contentPoint1}</li>
              <li>{av.contentPoint2}</li>
              <li>{av.contentPoint3}</li>
            </ul>
          </div>

          {/* ── 7. VISUAL SPECIFICATIONS MATRIX ── */}
          <div className="section-card">
            <h2 className="section-title">{av.specsTitle}</h2>
            <p className="section-description">{av.specsDesc}</p>

            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Size Token</th>
                    <th>Container Size</th>
                    <th>Initials Font Size</th>
                    <th>Status Dot Size</th>
                    <th>Recommended Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>2xs</code></td>
                    <td><code>20 × 20px</code></td>
                    <td><code>10px</code></td>
                    <td><code>5 × 5px</code></td>
                    <td>Inline text badges, compact dropdown items, nested comments.</td>
                  </tr>
                  <tr>
                    <td><code>xs</code></td>
                    <td><code>24 × 24px</code></td>
                    <td><code>11px</code></td>
                    <td><code>6 × 6px</code></td>
                    <td>Dense data tables, multi-assignee tags, compact headers.</td>
                  </tr>
                  <tr>
                    <td><code>sm</code></td>
                    <td><code>32 × 32px</code></td>
                    <td><code>12px</code></td>
                    <td><code>8 × 8px</code></td>
                    <td>Standard navigation bar, collaborative comment lists.</td>
                  </tr>
                  <tr>
                    <td><code>md</code> (Default)</td>
                    <td><code>40 × 40px</code></td>
                    <td><code>14px</code></td>
                    <td><code>10 × 10px</code></td>
                    <td>User profile cards, activity feed streams, standard dialogs.</td>
                  </tr>
                  <tr>
                    <td><code>lg</code></td>
                    <td><code>48 × 48px</code></td>
                    <td><code>16px</code></td>
                    <td><code>12 × 12px</code></td>
                    <td>Team member cards, hero bylines, onboarding screens.</td>
                  </tr>
                  <tr>
                    <td><code>xl</code></td>
                    <td><code>56 × 56px</code></td>
                    <td><code>18px</code></td>
                    <td><code>14 × 14px</code></td>
                    <td>Account management pages, profile modals, prominent headers.</td>
                  </tr>
                  <tr>
                    <td><code>2xl</code></td>
                    <td><code>64 × 64px</code></td>
                    <td><code>22px</code></td>
                    <td><code>16 × 16px</code></td>
                    <td>User profile headers, account avatar uploaders, hero showcase.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 8. FIGMA SPECIFICATION ARTBOARD ── */}
          <div className="section-card">
            <h2 className="section-title">{av.figmaTitle}</h2>
            <p className="section-description">{av.figmaDesc}</p>

            {/* Figma Workspace Canvas Container */}
            <div style={{
              marginTop: 'var(--space-6)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--color-bg-subtle)',
              backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              
              {/* Figma Artboard Frame */}
              <div style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden'
              }}>
                {/* Figma Frame Header */}
                <div style={{
                  padding: '12px 20px',
                  background: 'var(--color-bg-subtle)',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'var(--brand-50, rgba(223, 126, 48, 0.1))',
                      color: 'var(--brand-600)',
                      fontSize: '13px',
                      fontWeight: 700
                    }}>
                      ❖
                    </span>
                    <div>
                      <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)', display: 'block' }}>
                        Neuron / Component / Avatar Matrix
                      </strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        Master Component Spec · 7 Sizes × 2 Shapes × 4 Status States
                      </span>
                    </div>
                  </div>

                  {/* Figma Meta Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <NeuronBadge size="sm" variant="gray">Auto Layout [Vertical]</NeuronBadge>
                    <NeuronBadge size="sm" variant="gray">Gap: 32px</NeuronBadge>
                    <NeuronBadge size="sm" variant="brand">W: 1280px · Scale: 100%</NeuronBadge>
                  </div>
                </div>

                {/* Artboard Content Grid */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  
                  {/* Size Headers Bar */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '140px repeat(7, 1fr)',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 16px',
                    background: 'var(--color-bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)'
                  }}>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Variant / Size</span>
                    <span style={{ textAlign: 'center' }}>2XS (20px)</span>
                    <span style={{ textAlign: 'center' }}>XS (24px)</span>
                    <span style={{ textAlign: 'center' }}>SM (32px)</span>
                    <span style={{ textAlign: 'center' }}>MD (40px)</span>
                    <span style={{ textAlign: 'center' }}>LG (48px)</span>
                    <span style={{ textAlign: 'center' }}>XL (56px)</span>
                    <span style={{ textAlign: 'center' }}>2XL (64px)</span>
                  </div>

                  {/* Row 1: Image Avatar (Circle) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '140px repeat(7, 1fr)',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block' }}>Photo Image</strong>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Shape: Circle</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="2xs" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="xs" status="online" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="sm" status="away" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="md" status="busy" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="lg" status="online" badge={<NeuronAvatarVerifiedBadge size="sm" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="xl" status="online" badge={<NeuronAvatarVerifiedBadge size="md" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/sophia.jpg" size="2xl" status="online" badge={<NeuronAvatarVerifiedBadge size="lg" />} /></div>
                  </div>

                  {/* Row 2: Image Avatar (Squircle) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '140px repeat(7, 1fr)',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block' }}>Photo Image</strong>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Shape: Squircle</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="2xs" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="xs" status="online" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="sm" status="away" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="md" status="busy" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="lg" status="online" badge={<NeuronAvatarVerifiedBadge size="sm" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="xl" status="online" badge={<NeuronAvatarVerifiedBadge size="md" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar src="/avatars/marcus.jpg" shape="square" size="2xl" status="online" badge={<NeuronAvatarVerifiedBadge size="lg" />} /></div>
                  </div>

                  {/* Row 3: Initials Fallback */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '140px repeat(7, 1fr)',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block' }}>Initials (ID)</strong>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Iqbal Dzulfikar</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="2xs" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="xs" status="online" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="sm" status="away" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="md" status="busy" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="lg" status="online" badge={<NeuronAvatarVerifiedBadge size="sm" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="xl" status="online" badge={<NeuronAvatarVerifiedBadge size="md" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar name="Iqbal Dzulfikar" variant="brand" size="2xl" status="online" badge={<NeuronAvatarVerifiedBadge size="lg" />} /></div>
                  </div>

                  {/* Row 4: Icon Fallback */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '140px repeat(7, 1fr)',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-surface)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block' }}>Icon Fallback</strong>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>Terracotta Brand</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="2xs" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="xs" status="online" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="sm" status="away" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="md" status="busy" /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="lg" status="online" badge={<NeuronAvatarVerifiedBadge size="sm" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="xl" status="online" badge={<NeuronAvatarVerifiedBadge size="md" />} /></div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><NeuronAvatar variant="brand" size="2xl" status="online" badge={<NeuronAvatarVerifiedBadge size="lg" />} /></div>
                  </div>

                  {/* Row 5: Group Stacks & Overlapping Specs */}
                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    background: 'var(--color-bg-surface)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)' }}>
                          ❖ Component: NeuronAvatarGroup Stacks
                        </strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block' }}>
                          Overlapping offset (-8px sm, -10px md, -12px lg) · 2px surface halo ring
                        </span>
                      </div>
                      <NeuronBadge size="sm" variant="brand">Overlap Spec</NeuronBadge>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '6px' }}>Size SM Stack:</span>
                        <NeuronAvatarGroup size="sm" max={4}>
                          <NeuronAvatar src="/avatars/iqbal.jpg" />
                          <NeuronAvatar src="/avatars/marcus.jpg" />
                          <NeuronAvatar src="/avatars/sophia.jpg" />
                          <NeuronAvatar initials="AH" variant="indigo" />
                          <NeuronAvatar initials="TR" variant="purple" />
                          <NeuronAvatar initials="JD" variant="blue" />
                        </NeuronAvatarGroup>
                      </div>

                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '6px' }}>Size MD Stack:</span>
                        <NeuronAvatarGroup size="md" max={4}>
                          <NeuronAvatar src="/avatars/iqbal.jpg" />
                          <NeuronAvatar src="/avatars/marcus.jpg" />
                          <NeuronAvatar src="/avatars/sophia.jpg" />
                          <NeuronAvatar initials="AH" variant="indigo" />
                          <NeuronAvatar initials="TR" variant="purple" />
                        </NeuronAvatarGroup>
                      </div>

                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: '6px' }}>Size LG Stack:</span>
                        <NeuronAvatarGroup size="lg" max={3}>
                          <NeuronAvatar src="/avatars/iqbal.jpg" />
                          <NeuronAvatar src="/avatars/marcus.jpg" />
                          <NeuronAvatar src="/avatars/sophia.jpg" />
                          <NeuronAvatar initials="AH" variant="indigo" />
                          <NeuronAvatar initials="TR" variant="purple" />
                          <NeuronAvatar initials="JD" variant="blue" />
                          <NeuronAvatar initials="EM" variant="success" />
                        </NeuronAvatarGroup>
                      </div>
                    </div>
                  </div>

                  {/* Row 6: Identity Pairings */}
                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    background: 'var(--color-bg-surface)'
                  }}>
                    <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                      ❖ Pattern: Avatar + Typography Metadata Units
                    </strong>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', margin: '0 0 12px 0' }}>
                      Standardized hierarchy for user identity representation across enterprise tables, modals, and headers.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <NeuronAvatar src="/avatars/sophia.jpg" size="md" status="online" />
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)', display: 'block' }}>Sophia Sterling</strong>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>sophia.s@neudela.design</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <NeuronAvatar src="/avatars/marcus.jpg" size="md" status="busy" />
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)', display: 'block' }}>Marcus Vance</strong>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>marcus.v@neudela.design</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <NeuronAvatar src="/avatars/iqbal.jpg" size="md" status="away" badge={<NeuronAvatarVerifiedBadge size="sm" />} />
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)', display: 'block' }}>Iqbal Dzulfikar</strong>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>iqbal.dzulfikar@neudela.design</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Artboard Footer Specs */}
                <div style={{
                  padding: '12px 20px',
                  background: 'var(--color-bg-subtle)',
                  borderTop: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: 'var(--color-text-tertiary)'
                }}>
                  <span>Neuron Token System · Standardized WCAG 2.1 AA Contrast</span>
                  <span>Figma Sync: v2.4.0 · Last Updated: 2026-08-21</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB 2: PLAYBOOK
          ══════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">
          
          {/* ── 1. PRODUCTION PATTERNS ── */}
          <div className="section-card">
            <h2 className="section-title">{av.patternsTitle}</h2>
            <p className="section-description">{av.patternsDesc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
              
              {/* ── Pattern 1: Workspace Live Tray & Collaborators ── */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Pattern 01
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>•</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {av.pattern1Title}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {av.pattern1Desc}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="brand">Live Tray</NeuronBadge>
                </div>

                {/* Active Session Bar */}
                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  background: 'var(--color-bg-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                        Canvas #CANVAS-9082
                      </strong>
                      <NeuronBadge size="sm" variant="success">Active</NeuronBadge>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--emerald-600)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--emerald-500)', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)' }} />
                      4 collaborators editing live
                    </span>
                  </div>

                  <NeuronAvatarGroup size="md" max={4}>
                    <NeuronAvatar src="/avatars/iqbal.jpg" status="online" title="Iqbal Dzulfikar (Lead)" />
                    <NeuronAvatar src="/avatars/marcus.jpg" status="busy" title="Marcus Vance" />
                    <NeuronAvatar src="/avatars/sophia.jpg" status="online" title="Sophia Sterling" />
                    <NeuronAvatar initials="AH" variant="indigo" status="online" title="Alexander Hayes" />
                    <NeuronAvatar initials="TR" variant="purple" status="away" title="Tara Reynolds" />
                    <NeuronAvatar initials="EM" variant="blue" status="offline" title="Emma Miller" />
                  </NeuronAvatarGroup>
                </div>

                {/* Invite Form Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Invite New Teammates
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                      Instant workspace access
                    </span>
                  </div>

                  <form onSubmit={handleAddInvite} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <NeuronInput
                        type="email"
                        placeholder="teammate@company.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        leadingIcon={<Mail size={16} />}
                      />
                    </div>
                    <NeuronButton type="submit" variant="primary" size="sm" leadingIcon={<Plus size={14} />}>
                      Invite
                    </NeuronButton>
                  </form>

                  {/* Quick-Invite Suggested Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Quick add:</span>
                    {['sarah.j@company.com', 'david.k@company.com', 'alex.r@company.com'].map((email) => (
                      <button
                        key={email}
                        type="button"
                        onClick={() => handleQuickInvite(email)}
                        style={{
                          background: 'none',
                          border: '1px dashed var(--color-border)',
                          borderRadius: 'var(--radius-full)',
                          padding: '2px 8px',
                          fontSize: '11px',
                          color: 'var(--brand-600)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Plus size={10} />
                        {email.split('@')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Pending Invites Tray */}
                  {invitedMembers.length > 0 && (
                    <div style={{ 
                      marginTop: '4px',
                      padding: '8px 12px',
                      background: 'var(--color-bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '8px',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Pending:</span>
                      {invitedMembers.map((email) => (
                        <div
                          key={email}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'var(--brand-50, rgba(223, 126, 48, 0.08))',
                            border: '1px solid var(--brand-200, rgba(223, 126, 48, 0.3))',
                            borderRadius: 'var(--radius-full)',
                            padding: '2px 8px 2px 10px',
                            fontSize: '11px',
                            color: 'var(--brand-700)'
                          }}
                        >
                          <span>{email}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveInvite(email)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--brand-500)',
                              cursor: 'pointer',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Pattern 2: User Profile Header & Presence Switcher ── */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Pattern 02
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>•</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {av.pattern2Title}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {av.pattern2Desc}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="purple">Identity Card</NeuronBadge>
                </div>

                {/* Profile Card Container */}
                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--color-bg-subtle)'
                }}>
                  {/* Decorative Banner */}
                  <div style={{
                    height: '68px',
                    background: 'linear-gradient(135deg, rgba(223, 126, 48, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%)',
                    position: 'relative'
                  }} />

                  {/* Profile Body */}
                  <div style={{ padding: '0 16px 16px 16px', position: 'relative' }}>
                    {/* Top Row with Overlapping Avatar & Presence Dropdown */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-32px', marginBottom: '12px' }}>
                      <NeuronAvatar
                        src="/avatars/sophia.jpg"
                        size="2xl"
                        status={profileStatus}
                        statusPosition="top-right"
                        contrastBorder
                        badge={<NeuronAvatarVerifiedBadge size="md" />}
                        badgePosition="bottom-right"
                      />

                      {/* Presence Selector Dropdown */}
                      <div style={{ position: 'relative' }}>
                        <button
                          type="button"
                          onClick={() => setShowStatusMenu(!showStatusMenu)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--color-border)',
                            background: 'var(--color-bg-surface)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            boxShadow: 'var(--shadow-xs)'
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor:
                                profileStatus === 'online'
                                  ? 'var(--emerald-500)'
                                  : profileStatus === 'away'
                                  ? 'var(--amber-500)'
                                  : profileStatus === 'busy'
                                  ? 'var(--red-500)'
                                  : 'var(--slate-400)',
                            }}
                          />
                          <span>{profileStatus.charAt(0).toUpperCase() + profileStatus.slice(1)}</span>
                          <ChevronDown size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                        </button>

                        {showStatusMenu && (
                          <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '100%',
                            marginTop: '6px',
                            background: 'var(--color-bg-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            zIndex: 30,
                            minWidth: '170px',
                            overflow: 'hidden'
                          }}>
                            {[
                              { key: 'online', label: 'Online', desc: 'Active & available', color: 'var(--emerald-500)' },
                              { key: 'away', label: 'Away', desc: 'Inactive for 15m', color: 'var(--amber-500)' },
                              { key: 'busy', label: 'Busy', desc: 'Do not disturb', color: 'var(--red-500)' },
                              { key: 'offline', label: 'Offline', desc: 'Appear invisible', color: 'var(--slate-400)' }
                            ].map((st) => (
                              <div
                                key={st.key}
                                onClick={() => {
                                  setProfileStatus(st.key as NeuronAvatarStatus);
                                  setShowStatusMenu(false);
                                }}
                                style={{
                                  padding: '8px 12px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  background: profileStatus === st.key ? 'var(--color-bg-subtle)' : 'transparent',
                                  borderBottom: '1px solid var(--color-border)'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: st.color }} />
                                  <div>
                                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{st.label}</div>
                                    <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{st.desc}</div>
                                  </div>
                                </div>
                                {profileStatus === st.key && <Check size={14} color="var(--brand-600)" />}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--color-text-primary)' }}>Sophia Sterling</strong>
                        <NeuronBadge variant="brand" size="sm">Admin</NeuronBadge>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--brand-600)', marginBottom: '4px' }}>
                        Lead Product Designer · Design Systems
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                        sophia.s@neudela.design · San Francisco, CA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                    Last active: Just now
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <NeuronButton variant="secondary" size="sm">
                      Edit Profile
                    </NeuronButton>
                    <NeuronButton variant="primary" size="sm">
                      View Directory
                    </NeuronButton>
                  </div>
                </div>
              </div>

              {/* ── Pattern 3: Threaded Activity Stream & Comments ── */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Pattern 03
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>•</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {av.pattern3Title}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {av.pattern3Desc}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="blue">Discussion</NeuronBadge>
                </div>

                {/* Thread Container */}
                <div style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  background: 'var(--color-bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {/* Root Comment by Iqbal Dzulfikar */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <NeuronAvatar src="/avatars/iqbal.jpg" size="md" status="online" badge={<NeuronAvatarVerifiedBadge size="sm" />} />
                    <div style={{
                      flex: 1,
                      background: 'var(--color-bg-surface)',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      boxShadow: 'var(--shadow-xs)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>Iqbal Dzulfikar</strong>
                          <NeuronBadge size="sm" variant="brand">Lead</NeuronBadge>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> 10m ago
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                        The new avatar token matrix has been deployed. Please verify all contrast rings and status dots in dark mode.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>❤️ 5</span>
                        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>💬 {timelineReplies.length} replies</span>
                      </div>
                    </div>
                  </div>

                  {/* Thread Connector Line & Nested Replies */}
                  <div style={{
                    marginLeft: '18px',
                    paddingLeft: '22px',
                    borderLeft: '2px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {timelineReplies.map((reply) => (
                      <div key={reply.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <NeuronAvatar src={reply.avatar} size="sm" status={reply.status} />
                        <div style={{
                          flex: 1,
                          background: 'var(--color-bg-surface)',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-border)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--color-text-primary)' }}>{reply.name}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>{reply.time}</span>
                          </div>
                          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input Form */}
                  <form onSubmit={handlePostComment} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                    <NeuronAvatar src="/avatars/sophia.jpg" size="sm" status="online" />
                    <div style={{ flex: 1 }}>
                      <NeuronInput
                        placeholder="Write a reply to thread..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                    </div>
                    <NeuronButton type="submit" variant="primary" size="sm">
                      Reply
                    </NeuronButton>
                  </form>
                </div>
              </div>

              {/* ── Pattern 4: Organization Member Directory & Role Filter ── */}
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                background: 'var(--color-bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--emerald-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Pattern 04
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>•</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {av.pattern4Title}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {av.pattern4Desc}
                    </p>
                  </div>
                  <NeuronBadge size="sm" variant="success">Directory</NeuronBadge>
                </div>

                {/* Directory Controls: Search & Department Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {/* Department Tabs */}
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {['All', 'Product', 'Engineering', 'Content', 'Design System'].map((dept) => (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => setSelectedDepartment(dept)}
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: selectedDepartment === dept ? 700 : 500,
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid',
                            borderColor: selectedDepartment === dept ? 'var(--brand-500)' : 'var(--color-border)',
                            background: selectedDepartment === dept ? 'var(--brand-50, rgba(223, 126, 48, 0.1))' : 'transparent',
                            color: selectedDepartment === dept ? 'var(--brand-700)' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div style={{ minWidth: '180px', flex: 1, maxWidth: '240px' }}>
                      <NeuronInput
                        placeholder="Search members..."
                        value={searchMember}
                        onChange={(e) => setSearchMember(e.target.value)}
                        leadingIcon={<Search size={16} />}
                      />
                    </div>
                  </div>

                  {/* Directory Table */}
                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                          <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px' }}>MEMBER</th>
                          <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px' }}>DEPARTMENT</th>
                          <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px' }}>STATUS</th>
                          <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '11px' }}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDirectory.length === 0 ? (
                          <tr>
                            <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                              No members match "{searchMember}" in {selectedDepartment}
                            </td>
                          </tr>
                        ) : (
                          filteredDirectory.slice(0, 4).map((m) => (
                            <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.15s ease' }}>
                              <td style={{ padding: '8px 12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <NeuronAvatar
                                    src={m.avatar}
                                    initials={m.initials}
                                    variant={m.variant || 'brand'}
                                    size="sm"
                                    status={m.status}
                                    badge={m.verified ? <NeuronAvatarVerifiedBadge size="sm" /> : undefined}
                                  />
                                  <div>
                                    <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '12px' }}>{m.name}</strong>
                                    <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{m.role}</span>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '8px 12px' }}>
                                <NeuronBadge variant="gray" size="sm">
                                  {m.department}
                                </NeuronBadge>
                              </td>
                              <td style={{ padding: '8px 12px' }}>
                                <NeuronBadge variant={m.status === 'online' ? 'success' : m.status === 'busy' ? 'error' : m.status === 'away' ? 'warning' : 'gray'} size="sm">
                                  {m.status}
                                </NeuronBadge>
                              </td>
                              <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                                <button
                                  type="button"
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-tertiary)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    borderRadius: '4px'
                                  }}
                                >
                                  <MoreHorizontal size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary & Action */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      Showing {filteredDirectory.length} of {directoryMembers.length} members
                    </span>
                    <NeuronButton variant="primary" size="sm" leadingIcon={<Users size={14} />}>
                      Manage Roles
                    </NeuronButton>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── 2. INTERACTIVE PLAYGROUND ── */}
          <div className="section-card">
            <h2 className="section-title">NeuronAvatar {t.compShared.playground}</h2>
            <Playground
              name="NeuronAvatar"
              knobs={[
                {
                  name: 'type',
                  type: 'select',
                  options: ['image', 'initials', 'icon'],
                  default: 'image',
                  label: av.knobType,
                },
                {
                  name: 'size',
                  type: 'select',
                  options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
                  default: 'lg',
                  label: av.knobSize,
                },
                {
                  name: 'shape',
                  type: 'select',
                  options: ['circle', 'square'],
                  default: 'circle',
                  label: av.knobShape,
                },
                {
                  name: 'status',
                  type: 'select',
                  options: ['none', 'online', 'away', 'busy', 'offline'],
                  default: 'online',
                  label: av.knobStatus,
                },
                {
                  name: 'hasBadge',
                  type: 'boolean',
                  default: true,
                  label: av.knobBadge,
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: ['brand', 'gray', 'blue', 'indigo', 'purple', 'pink', 'orange', 'success', 'warning', 'error'],
                  default: 'brand',
                  label: av.knobVariant,
                },
                {
                  name: 'name',
                  type: 'text',
                  default: 'Sophia Sterling',
                  label: av.knobName,
                },
                {
                  name: 'contrastBorder',
                  type: 'boolean',
                  default: false,
                  label: av.knobContrast,
                },
              ]}
              codeTemplates={(knobs) => {
                const reactProps: string[] = [];
                const vueProps: string[] = [];

                if (knobs.type === 'image') {
                  reactProps.push('src="/avatars/sophia.jpg"');
                  vueProps.push('src="/avatars/sophia.jpg"');
                } else if (knobs.type === 'initials') {
                  reactProps.push(`name="${knobs.name}"`);
                  vueProps.push(`name="${knobs.name}"`);
                }

                if (knobs.size !== 'md') {
                  reactProps.push(`size="${knobs.size}"`);
                  vueProps.push(`size="${knobs.size}"`);
                }

                if (knobs.shape !== 'circle') {
                  reactProps.push(`shape="${knobs.shape}"`);
                  vueProps.push(`shape="${knobs.shape}"`);
                }

                if (knobs.status !== 'none') {
                  reactProps.push(`status="${knobs.status}"`);
                  vueProps.push(`status="${knobs.status}"`);
                }

                if (knobs.variant !== 'brand') {
                  reactProps.push(`variant="${knobs.variant}"`);
                  vueProps.push(`variant="${knobs.variant}"`);
                }

                if (knobs.contrastBorder) {
                  reactProps.push('contrastBorder');
                  vueProps.push('contrast-border');
                }

                const reactAttr = reactProps.length ? ` ${reactProps.join(' ')}` : '';
                const vueAttr = vueProps.length ? ` ${vueProps.join(' ')}` : '';

                return {
                  react: `<NeuronAvatar${reactAttr}${knobs.hasBadge ? ' badge={<NeuronAvatarVerifiedBadge />}' : ''} />`,
                  vue: `<NeuronAvatar${vueAttr} />`,
                  html: `<div class="neuron-avatar neuron-avatar--${knobs.size} neuron-avatar--${knobs.shape} neuron-avatar--${knobs.variant}">\n  <!-- Avatar Media -->\n</div>`,
                };
              }}
            >
              {(knobs) => (
                <div style={{ padding: 'var(--space-6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <NeuronAvatar
                    src={knobs.type === 'image' ? '/avatars/sophia.jpg' : undefined}
                    name={knobs.type === 'initials' ? (knobs.name as string) : undefined}
                    size={knobs.size as NeuronAvatarSize}
                    shape={knobs.shape as NeuronAvatarShape}
                    status={knobs.status !== 'none' ? (knobs.status as NeuronAvatarStatus) : undefined}
                    variant={knobs.variant as NeuronAvatarVariant}
                    contrastBorder={knobs.contrastBorder as boolean}
                    badge={knobs.hasBadge ? <NeuronAvatarVerifiedBadge size={knobs.size === '2xs' || knobs.size === 'xs' || knobs.size === 'sm' ? 'sm' : knobs.size === 'xl' || knobs.size === '2xl' ? 'lg' : 'md'} /> : undefined}
                  />
                </div>
              )}
            </Playground>
          </div>

          {/* ── 3. API REFERENCE ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.apiReference}</h2>

            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
              NeuronAvatar Props
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{t.compShared.prop}</th>
                    <th>{t.compShared.type}</th>
                    <th>{t.compShared.default}</th>
                    <th>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>src</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{av.apiSrc}</td>
                  </tr>
                  <tr>
                    <td><code>name</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{av.apiName}</td>
                  </tr>
                  <tr>
                    <td><code>initials</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>{av.apiInitials}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
                    <td><code>'md'</code></td>
                    <td>{av.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>shape</code></td>
                    <td><code>'circle' | 'square'</code></td>
                    <td><code>'circle'</code></td>
                    <td>{av.apiShape}</td>
                  </tr>
                  <tr>
                    <td><code>status</code></td>
                    <td><code>'online' | 'offline' | 'busy' | 'away'</code></td>
                    <td><code>undefined</code></td>
                    <td>{av.apiStatus}</td>
                  </tr>
                  <tr>
                    <td><code>badge</code></td>
                    <td><code>ReactNode</code></td>
                    <td><code>undefined</code></td>
                    <td>{av.apiBadge}</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'brand' | 'gray' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange' | 'success' | 'warning' | 'error'</code></td>
                    <td><code>'brand'</code></td>
                    <td>{av.apiVariant}</td>
                  </tr>
                  <tr>
                    <td><code>contrastBorder</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>{av.apiContrastBorder}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: 'var(--fs-text-md)', fontWeight: 600, marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
              NeuronAvatarGroup Props
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>{t.compShared.prop}</th>
                    <th>{t.compShared.type}</th>
                    <th>{t.compShared.default}</th>
                    <th>{t.compShared.description}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>max</code></td>
                    <td><code>number</code></td>
                    <td><code>4</code></td>
                    <td>{av.apiMax}</td>
                  </tr>
                  <tr>
                    <td><code>spacing</code></td>
                    <td><code>'tight' | 'normal' | 'relaxed'</code></td>
                    <td><code>'normal'</code></td>
                    <td>{av.apiSpacing}</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>NeuronAvatarSize</code></td>
                    <td><code>'md'</code></td>
                    <td>{av.apiSize}</td>
                  </tr>
                  <tr>
                    <td><code>total</code></td>
                    <td><code>number</code></td>
                    <td><code>undefined</code></td>
                    <td>{av.apiTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Page Navigation Footer ── */}
      <NextPrevious
        prev={{ id: 'comp-alert', label: t.nav.compAlert }}
        next={{ id: 'pat-forms', label: t.nav.patForms }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default AvatarView;
