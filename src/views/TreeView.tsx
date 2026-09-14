import React, { useState } from 'react';
import NeuronTree, { TreeNode, TreeVariant, TreeSize, TreeSelectionMode } from '../components/NeuronTree';
import NeuronBadge from '../components/NeuronBadge';
import NeuronButton from '../components/NeuronButton';
import NeuronInput from '../components/NeuronInput';
import NeuronCheckbox from '../components/NeuronCheckbox';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import { 
  Folder,
  FolderOpen, 
  FileCode, 
  FileText, 
  ChevronRight,
  Plus, 
  Trash2, 
  Search, 
  Users, 
  Shield, 
  BarChart3, 
  Building2, 
  Minimize2,
  Lock,
  Layers,
  Sparkles,
  Server
} from 'lucide-react';

interface TreeViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────
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
        {isDo ? 'Do' : "Don't"}
      </div>
      <div className="rule-card__content">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tree View Visual Anatomy Interactive Viewer
// ─────────────────────────────────────────────
interface AnatomyItemDetail {
  id: number;
  label: string;
  category: string;
  pinPosition: 'top' | 'bottom';
  description: string;
  bestPractice: string;
  keyboard: string;
}

const FOLDER_ANATOMY_ITEMS: AnatomyItemDetail[] = [
  {
    id: 1,
    label: 'Chevron Toggle',
    category: 'Hierarchy',
    pinPosition: 'top',
    description: 'Visual indicator of nested child nodes. Rotates smoothly 90° on expansion. Hidden on leaf nodes.',
    bestPractice: 'Always keep chevron width fixed (20–24px) across all rows so tree icons align uniformly.',
    keyboard: 'Right Arrow to expand, Left Arrow to collapse'
  },
  {
    id: 2,
    label: 'Cascading Checkbox',
    category: 'Selection',
    pinPosition: 'bottom',
    description: 'Multi-selection checkbox with tri-state support (checked, unchecked, indeterminate).',
    bestPractice: 'Sync parent checkbox state automatically based on children selection status.',
    keyboard: 'Space key toggles checkbox state'
  },
  {
    id: 3,
    label: 'Node Context Icon',
    category: 'Identity',
    pinPosition: 'top',
    description: 'Type glyph representing entity semantics (folder open/closed, file type, server, etc.).',
    bestPractice: 'Use dynamic icons that switch between closed and open states for folder nodes.',
    keyboard: 'Informative only, no direct focus'
  },
  {
    id: 4,
    label: 'Primary Label',
    category: 'Content',
    pinPosition: 'bottom',
    description: 'The primary readable title of the item. Truncates gracefully and supports search match highlighting.',
    bestPractice: 'Keep labels concise; show full text in a tooltip if truncated by container boundary.',
    keyboard: 'Enter to activate / select row'
  },
  {
    id: 5,
    label: 'Metadata Badge',
    category: 'Meta',
    pinPosition: 'top',
    description: 'Compact badge pill showing child count, status flags, unread messages, or category tags.',
    bestPractice: 'Use neutral subtle badges to prevent competing with high-priority UI notifications.',
    keyboard: 'Tab target if badge is interactive'
  },
  {
    id: 6,
    label: 'Secondary Extra',
    category: 'Auxiliary',
    pinPosition: 'bottom',
    description: 'Right-aligned auxiliary data such as file size, timestamp, or owner name.',
    bestPractice: 'Mute font color to tertiary level to maintain visual hierarchy with primary label.',
    keyboard: 'Visual reference only'
  },
  {
    id: 7,
    label: 'Hover Actions',
    category: 'Actions',
    pinPosition: 'top',
    description: 'Contextual quick actions (Add child, Delete, More options) revealed on hover or keyboard focus.',
    bestPractice: 'Always make action buttons accessible via keyboard focus and screen readers.',
    keyboard: 'Tab key navigates through action buttons'
  },
];

const FILE_ANATOMY_ITEMS: AnatomyItemDetail[] = [
  {
    id: 1,
    label: 'Indent Spacer',
    category: 'Hierarchy',
    pinPosition: 'top',
    description: 'Consistent whitespace reserving chevron width so icons and labels align with parent rows.',
    bestPractice: 'Maintain exact width equal to chevron button (24px) for pixel-perfect vertical alignment.',
    keyboard: 'Passes focus to next element'
  },
  {
    id: 2,
    label: 'Item Checkbox',
    category: 'Selection',
    pinPosition: 'bottom',
    description: 'Row selection checkbox allowing bulk selection or single-node inclusion.',
    bestPractice: 'Directly updates the selected state and propagates to parent cascading state.',
    keyboard: 'Space key toggles checkbox state'
  },
  {
    id: 3,
    label: 'File Type Icon',
    category: 'Identity',
    pinPosition: 'top',
    description: 'Semantically colored icon representing file format (.tsx, .css, .json, etc.).',
    bestPractice: 'Color-code file types consistently (e.g. blue for TSX, yellow for JS, orange for HTML).',
    keyboard: 'Informative only'
  },
  {
    id: 4,
    label: 'Primary Label',
    category: 'Content',
    pinPosition: 'bottom',
    description: 'Full file name including extension. Highlights matching characters during search filtering.',
    bestPractice: 'Support inline rename triggers or double-click editing when appropriate.',
    keyboard: 'Enter to open / preview file'
  },
  {
    id: 5,
    label: 'Extension Badge',
    category: 'Meta',
    pinPosition: 'top',
    description: 'Pill badge indicating file format or operational tag (e.g. TSX, Active, Draft).',
    bestPractice: 'Keep pill text short (2–4 characters) to save horizontal space.',
    keyboard: 'Visual reference'
  },
  {
    id: 6,
    label: 'File Size Extra',
    category: 'Auxiliary',
    pinPosition: 'bottom',
    description: 'Secondary metadata displaying formatted file size or last modified date.',
    bestPractice: 'Align text right for clean vertical scanning across multiple rows.',
    keyboard: 'Visual reference'
  },
  {
    id: 7,
    label: 'Quick Actions',
    category: 'Actions',
    pinPosition: 'top',
    description: 'Quick action icons (e.g. Delete, View Code) displayed on hover or row selection.',
    bestPractice: 'Provide tooltips for every icon button to ensure clarity of action.',
    keyboard: 'Tab navigation support'
  },
];

function TreeAnatomyViewer() {
  const [nodeType, setNodeType] = useState<'folder' | 'file'>('folder');
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const items = nodeType === 'folder' ? FOLDER_ANATOMY_ITEMS : FILE_ANATOMY_ITEMS;
  const activeDetail = items.find((item) => item.id === activeZone);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
      {/* Visual Stage Card */}
      <div className="tree-anatomy-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Interactive Preview
          </span>
          <div style={{ display: 'inline-flex', background: 'var(--color-bg-surface)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <button
              type="button"
              onClick={() => { setNodeType('folder'); setActiveZone(null); }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                background: nodeType === 'folder' ? 'var(--brand-500)' : 'transparent',
                color: nodeType === 'folder' ? '#ffffff' : 'var(--color-text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              Folder Node
            </button>
            <button
              type="button"
              onClick={() => { setNodeType('file'); setActiveZone(null); }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                background: nodeType === 'file' ? 'var(--brand-500)' : 'transparent',
                color: nodeType === 'file' ? '#ffffff' : 'var(--color-text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              File Node
            </button>
          </div>
        </div>

        {/* Stage with Row & Staggered Pins */}
        <div className="tree-anatomy-stage">
          <div className="tree-anatomy-row">
            {/* Zone 1: Chevron / Spacer (Top Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 1 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(1)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 1 ? null : 1)}
              title={nodeType === 'folder' ? '1. Chevron Toggle' : '1. Indent Spacer'}
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--top ${activeZone === 1 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">1</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              {nodeType === 'folder' ? (
                <button type="button" className="neuron-tree__chevron is-expanded" style={{ cursor: 'pointer' }}>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <span style={{ width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--slate-300)' }} />
                </span>
              )}
            </div>

            {/* Zone 2: Checkbox (Bottom Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 2 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(2)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 2 ? null : 2)}
              title={nodeType === 'folder' ? '2. Cascading Checkbox' : '2. Item Checkbox'}
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--bottom ${activeZone === 2 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">2</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              <NeuronCheckbox checked={nodeType === 'folder'} size="sm" variant="brand" shape="rounded-sm" tabIndex={-1} disabled={false} />
            </div>

            {/* Zone 3: Icon (Top Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 3 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(3)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 3 ? null : 3)}
              title={nodeType === 'folder' ? '3. Folder Icon' : '3. File Type Icon'}
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--top ${activeZone === 3 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">3</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              {nodeType === 'folder' ? (
                <FolderOpen size={16} color="var(--brand-500)" />
              ) : (
                <FileCode size={16} color="#3b82f6" />
              )}
            </div>

            {/* Zone 4: Label (Bottom Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 4 ? 'is-active' : ''}`}
              style={{ flex: 1, minWidth: 0 }}
              onMouseEnter={() => setActiveZone(4)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 4 ? null : 4)}
              title="4. Primary Label"
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--bottom ${activeZone === 4 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">4</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              <span style={{ fontWeight: 600, color: nodeType === 'folder' ? 'var(--brand-700)' : 'var(--color-text-primary)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {nodeType === 'folder' ? 'components' : 'NeuronButton.tsx'}
              </span>
            </div>

            {/* Zone 5: Badge (Top Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 5 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(5)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 5 ? null : 5)}
              title={nodeType === 'folder' ? '5. Children Count' : '5. Format Badge'}
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--top ${activeZone === 5 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">5</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              <NeuronBadge size="sm" variant={nodeType === 'folder' ? 'gray' : 'brand'}>
                {nodeType === 'folder' ? '24 files' : 'TSX'}
              </NeuronBadge>
            </div>

            {/* Zone 6: Extra (Bottom Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 6 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(6)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 6 ? null : 6)}
              title="6. Secondary Extra"
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--bottom ${activeZone === 6 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">6</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap' }}>
                {nodeType === 'folder' ? '148 KB' : '12.4 KB'}
              </span>
            </div>

            {/* Zone 7: Actions (Top Pin) */}
            <div
              className={`tree-anatomy-zone ${activeZone === 7 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(7)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(activeZone === 7 ? null : 7)}
              title="7. Hover Actions"
            >
              <div className={`tree-anatomy-pin tree-anatomy-pin--top ${activeZone === 7 ? 'is-active' : ''}`}>
                <span className="tree-anatomy-pin__dot">7</span>
                <span className="tree-anatomy-pin__stem" />
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {nodeType === 'folder' && (
                  <button type="button" className="neuron-tree__action-btn" title="Add"><Plus size={12} /></button>
                )}
                <button type="button" className="neuron-tree__action-btn" title="Delete"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Detail Card Below Stage */}
        {activeDetail ? (
          <div style={{
            padding: '12px 14px',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--brand-500)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 8px rgba(223, 126, 48, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--brand-500)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {activeDetail.id}
                </span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                  {activeDetail.label}
                </span>
                <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', background: 'var(--color-bg-subtle)', color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)' }}>
                  {activeDetail.category}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                ⌨️ {activeDetail.keyboard}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Guideline: </strong>
              {activeDetail.bestPractice}
            </div>
          </div>
        ) : (
          <div style={{
            padding: '10px 14px',
            background: 'var(--color-bg-surface)',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: '12px',
            color: 'var(--color-text-tertiary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>💡</span>
            <span>Hover or click any pin (1–7) or card on the right to inspect technical guidelines and keyboard shortcuts.</span>
          </div>
        )}
      </div>

      {/* Interactive Explanation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => {
          const isSelected = activeZone === item.id;
          return (
            <div
              key={item.id}
              className={`tree-anatomy-item-card ${isSelected ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveZone(item.id)}
              onMouseLeave={() => setActiveZone(null)}
              onClick={() => setActiveZone(isSelected ? null : item.id)}
            >
              <span
                className="anatomy-number"
                style={{
                  background: isSelected ? 'var(--brand-500)' : 'var(--slate-100)',
                  color: isSelected ? '#ffffff' : 'var(--slate-700)',
                  borderColor: isSelected ? 'var(--brand-500)' : 'var(--slate-300)',
                  transition: 'all 0.18s ease',
                  flexShrink: 0
                }}
              >
                {item.id}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: isSelected ? 'var(--brand-700)' : 'var(--color-text-primary)' }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    padding: '1px 6px',
                    borderRadius: '999px',
                    background: isSelected ? 'rgba(223, 126, 48, 0.15)' : 'var(--color-bg-subtle)',
                    color: isSelected ? 'var(--brand-600)' : 'var(--color-text-tertiary)',
                    fontWeight: 500,
                    border: isSelected ? '1px solid rgba(223, 126, 48, 0.3)' : '1px solid var(--color-border)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {item.category}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Demo Data
// ─────────────────────────────────────────────
const BASIC_TREE_DATA: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'NeuronButton.tsx', label: 'NeuronButton.tsx', icon: <FileCode size={14} color="#3b82f6" /> },
          { id: 'NeuronTree.tsx', label: 'NeuronTree.tsx', icon: <FileCode size={14} color="#3b82f6" /> },
          { id: 'NeuronTable.tsx', label: 'NeuronTable.tsx', icon: <FileCode size={14} color="#3b82f6" /> },
        ]
      },
      {
        id: 'styles',
        label: 'styles',
        children: [
          { id: 'neudela.css', label: 'neudela.css', icon: <FileText size={14} color="#ec4899" /> },
          { id: 'tokens.css', label: 'tokens.css', icon: <FileText size={14} color="#ec4899" /> },
        ]
      },
      { id: 'index.ts', label: 'index.ts', icon: <FileCode size={14} color="#3b82f6" /> },
      { id: 'App.tsx', label: 'App.tsx', icon: <FileCode size={14} color="#3b82f6" /> }
    ]
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'favicon.svg', label: 'favicon.svg', icon: <FileText size={14} color="#10b981" /> },
      { id: 'manifest.json', label: 'manifest.json', icon: <FileText size={14} color="#f59e0b" /> },
    ]
  },
  { id: 'package.json', label: 'package.json', icon: <FileText size={14} color="#f59e0b" /> },
  { id: 'README.md', label: 'README.md', icon: <FileText size={14} color="#64748b" /> },
];

const PREVIEW_TREE_DATA: TreeNode[] = BASIC_TREE_DATA.slice(0, 2);

const LOREM_LEVEL_DATA: TreeNode[] = [
  {
    id: 'lvl-1',
    label: 'lorem level 1',
    icon: <FolderOpen size={16} color="#ef4444" />,
    children: [
      {
        id: 'lvl-2',
        label: 'lorem level 2',
        icon: <FolderOpen size={16} color="#eab308" />,
        children: [
          {
            id: 'lvl-3',
            label: 'lorem level 3',
            icon: <FolderOpen size={16} color="#3b82f6" />,
            children: [
              {
                id: 'lvl-4',
                label: 'lorem level 4',
                icon: <FolderOpen size={16} color="#10b981" />,
                children: [
                  {
                    id: 'lvl-5',
                    label: 'lorem level 5',
                    icon: <Folder size={16} color="#064e3b" />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const EXPLORER_DATA: TreeNode[] = [
  {
    id: 'workspace',
    label: 'neudela-design-system',
    children: [
      {
        id: 'src',
        label: 'src',
        children: [
          {
            id: 'components',
            label: 'components',
            badge: <NeuronBadge size="sm" variant="gray">24</NeuronBadge>,
            children: [
              { id: 'NeuronTree.tsx', label: 'NeuronTree.tsx', extra: '12.4 KB', icon: <FileCode size={14} color="#3b82f6" /> },
              { id: 'NeuronModal.tsx', label: 'NeuronModal.tsx', extra: '8.1 KB', icon: <FileCode size={14} color="#3b82f6" /> },
              { id: 'NeuronTable.tsx', label: 'NeuronTable.tsx', extra: '28.3 KB', icon: <FileCode size={14} color="#3b82f6" /> },
            ]
          },
          {
            id: 'tokens',
            label: 'tokens',
            badge: <NeuronBadge size="sm" variant="brand">v2.4</NeuronBadge>,
            children: [
              { id: 'colors.json', label: 'colors.json', extra: '4.2 KB', icon: <FileText size={14} color="#f59e0b" /> },
              { id: 'typography.json', label: 'typography.json', extra: '2.1 KB', icon: <FileText size={14} color="#f59e0b" /> },
            ]
          },
          { id: 'index.ts', label: 'index.ts', extra: '4.8 KB', icon: <FileCode size={14} color="#3b82f6" /> },
        ]
      },
      {
        id: 'docs',
        label: 'docs',
        children: [
          { id: 'getting-started.md', label: 'getting-started.md', extra: '3.4 KB', icon: <FileText size={14} color="#64748b" /> },
          { id: 'accessibility.md', label: 'accessibility.md', extra: '9.2 KB', icon: <FileText size={14} color="#64748b" /> },
        ]
      },
      { id: 'package.json', label: 'package.json', extra: '1.5 KB', icon: <FileText size={14} color="#f59e0b" /> },
      { id: 'tsconfig.json', label: 'tsconfig.json', extra: '0.8 KB', icon: <FileText size={14} color="#3b82f6" /> },
    ]
  }
];

const RBAC_DATA: TreeNode[] = [
  {
    id: 'dashboards',
    label: 'Dashboard & Analytics Module',
    icon: <BarChart3 size={15} color="var(--brand-600)" />,
    children: [
      { id: 'dash-view', label: 'View Analytics Overview' },
      { id: 'dash-export', label: 'Export Revenue CSV / PDF' },
      { id: 'dash-realtime', label: 'Access Live Telemetry Stream' },
    ]
  },
  {
    id: 'users-roles',
    label: 'Identity & Access Governance',
    icon: <Users size={15} color="#3b82f6" />,
    children: [
      { id: 'user-invite', label: 'Invite Workspace Members' },
      { id: 'user-assign', label: 'Modify Member RBAC Roles' },
      { id: 'user-revoke', label: 'Revoke Security Credentials' },
      { id: 'user-audit', label: 'Inspect Security Audit Log' },
    ]
  },
  {
    id: 'infra-api',
    label: 'Cloud Infrastructure & API Keys',
    icon: <Server size={15} color="#10b981" />,
    children: [
      { id: 'api-generate', label: 'Generate Production Secret Keys' },
      { id: 'api-webhook', label: 'Configure Outgoing Webhooks' },
      { id: 'api-rate', label: 'Override Gateway Rate Limits' },
    ]
  },
  {
    id: 'billing',
    label: 'Enterprise Billing & Invoices',
    icon: <Lock size={15} color="#8b5cf6" />,
    children: [
      { id: 'bill-view', label: 'Download Tax Invoices' },
      { id: 'bill-seats', label: 'Upgrade Tier & Add Paid Seats' },
    ]
  }
];

const ORG_DATA: TreeNode[] = [
  {
    id: 'exec',
    label: 'Executive Leadership',
    icon: <Building2 size={16} color="var(--brand-600)" />,
    badge: <NeuronBadge size="sm" variant="brand">HQ</NeuronBadge>,
    children: [
      {
        id: 'eng',
        label: 'Engineering Department (42)',
        icon: <Layers size={15} color="#3b82f6" />,
        children: [
          { id: 'fe', label: 'Frontend Core (14 Members)', badge: <NeuronBadge size="sm" variant="gray">Active</NeuronBadge> },
          { id: 'be', label: 'Platform & Distributed Systems (18 Members)', badge: <NeuronBadge size="sm" variant="gray">Active</NeuronBadge> },
          { id: 'sre', label: 'SRE & Cloud Infrastructure (10 Members)', badge: <NeuronBadge size="sm" variant="success">On-Call</NeuronBadge> },
        ]
      },
      {
        id: 'design',
        label: 'Product Design & Research (12)',
        icon: <Sparkles size={15} color="#ec4899" />,
        children: [
          { id: 'design-sys', label: 'Neudela Design System Team (4 Members)', badge: <NeuronBadge size="sm" variant="brand">Core</NeuronBadge> },
          { id: 'product-ux', label: 'Enterprise UX Squad (6 Members)' },
          { id: 'ux-research', label: 'Qualitative Research (2 Members)' },
        ]
      },
      {
        id: 'product',
        label: 'Product Management (8)',
        icon: <FolderOpen size={15} color="#f59e0b" />,
        children: [
          { id: 'pm-growth', label: 'Growth & Monetization (3)' },
          { id: 'pm-core', label: 'Core Platform & DevEx (5)' },
        ]
      }
    ]
  }
];

const KB_DATA: TreeNode[] = [
  {
    id: 'kb-guide',
    label: 'Developer Guides',
    children: [
      { id: 'kb-install', label: 'Installation & Tailwind Integration' },
      { id: 'kb-tokens', label: 'Configuring Multi-Theme Design Tokens' },
      { id: 'kb-ssr', label: 'Next.js App Router & Server Components' },
    ]
  },
  {
    id: 'kb-components',
    label: 'Component Architecture',
    children: [
      {
        id: 'kb-forms',
        label: 'Form Controls',
        children: [
          { id: 'kb-inp', label: 'NeuronInput Validation Specs' },
          { id: 'kb-sel', label: 'NeuronSelect Async Search' },
          { id: 'kb-dp', label: 'NeuronDatePicker Timezone Rules' },
        ]
      },
      {
        id: 'kb-display',
        label: 'Data Display',
        children: [
          { id: 'kb-tab', label: 'NeuronTable Virtual Scrolling' },
          { id: 'kb-tree', label: 'NeuronTree Cascading Checkboxes' },
        ]
      }
    ]
  },
  {
    id: 'kb-a11y',
    label: 'Accessibility Compliance',
    children: [
      { id: 'kb-contrast', label: 'WCAG 2.1 AA Contrast Checklist' },
      { id: 'kb-keyboard', label: 'WAI-ARIA Focus Roving Matrix' },
    ]
  }
];

// ─────────────────────────────────────────────
// Interactive Playground Preview Component
// ─────────────────────────────────────────────
function TreePlaygroundPreview({ state }: { state: Record<string, string | boolean> }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['NeuronTree.tsx']);
  const [checkedIds, setCheckedIds] = useState<string[]>(['NeuronButton.tsx', 'NeuronTree.tsx']);

  return (
    <div style={{ width: '100%', maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        {/* Header Bar */}
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Folder size={15} color="var(--brand-500)" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Project Workspace
            </span>
          </div>
          <NeuronBadge size="sm" variant="gray">
            {String(state.selectionMode)}
          </NeuronBadge>
        </div>

        {/* Tree Component */}
        <div style={{ padding: '12px' }}>
          <NeuronTree
            data={BASIC_TREE_DATA}
            size={state.size as TreeSize}
            variant={state.variant as TreeVariant}
            selectionMode={state.selectionMode as TreeSelectionMode}
            showIcons={Boolean(state.showIcons)}
            cascadeCheck={Boolean(state.cascadeCheck)}
            selectedIds={selectedIds}
            checkedIds={checkedIds}
            defaultExpandedIds={['src', 'components']}
            onSelectionChange={(ids) => setSelectedIds(ids)}
            onCheckedChange={(ids) => setCheckedIds(ids)}
          />
        </div>

        {/* Live Status Bar */}
        <div style={{
          padding: '8px 14px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--color-text-secondary)'
        }}>
          <span>
            {state.selectionMode === 'checkbox'
              ? `Checked: ${checkedIds.length} item(s)`
              : state.selectionMode !== 'none'
              ? `Selected: ${selectedIds[0] || 'None'}`
              : 'Browse mode'}
          </span>
          <span style={{ color: 'var(--color-text-tertiary)' }}>
            {String(state.size)} • {String(state.variant)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TreeView({ setActiveTab }: TreeViewProps) {
  const { t } = useLanguage();
  const [activeViewTab, setViewTab] = useState<'guideline' | 'playbook'>('guideline');

  // Playbook 1: File Explorer State
  const [explorerSelected, setExplorerSelected] = useState<string[]>(['NeuronTree.tsx']);

  // Playbook 2: RBAC Matrix State
  const [rbacChecked, setRbacChecked] = useState<string[]>(['dash-view', 'dash-export', 'user-invite']);

  // Playbook 4: Knowledge Base Search
  const [kbSearch, setKbSearch] = useState('');

  return (
    <div className="badge-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">Tree View</h1>
            <p className="page-subtitle">
              Hierarchical navigation and selection tree that represents multi-level parent-child data structures, featuring smooth expandable branches, cascading selection, and full keyboard accessibility.
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            className={`comp-tab ${activeViewTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setViewTab('guideline')}
          >
            Guideline
          </button>
          <button
            className={`comp-tab ${activeViewTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setViewTab('playbook')}
          >
            Playbook
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB 1 – GUIDELINE
      ══════════════════════════════════════ */}
      {activeViewTab === 'guideline' && (
        <div className="tab-content">

          {/* ── 1. Overview / Spec Matrix ── */}
          <div className="section-card">
            <h2 className="section-title">Overview</h2>
            <p className="section-description">
              The <code>NeuronTree</code> component displays nested, hierarchical data in an intuitive expandable tree. It is engineered for complex enterprise use cases including file system browsing, organizational charts, category selectors, and granular permission managers.
            </p>

            <div className="badge-spec-card">
              <div className="badge-spec-header">
                <div>
                  <div className="badge-spec-title">Tree View Specification Matrix</div>
                  <div className="badge-spec-subtitle">3 Sizes × 3 Container Variants (Default, Bordered, Subtle)</div>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="badge-spec-table-wrap">
                <table className="badge-matrix-table">
                  <thead>
                    <tr>
                      <th style={{ width: '120px' }}>Variant</th>
                      <th style={{ minWidth: '280px' }}>Default (Clean)</th>
                      <th style={{ minWidth: '280px' }}>Bordered (Card Box)</th>
                      <th style={{ minWidth: '280px' }}>Subtle (Soft Box)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(['sm', 'md', 'lg'] as TreeSize[]).map((sz) => (
                      <tr key={sz}>
                        <td>
                          <div className="badge-theme-cell">
                            <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>Size {sz}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <NeuronTree data={PREVIEW_TREE_DATA} size={sz} variant="default" defaultExpandedIds={['src']} />
                        </td>
                        <td style={{ padding: '12px' }}>
                          <NeuronTree data={PREVIEW_TREE_DATA} size={sz} variant="bordered" defaultExpandedIds={['src']} />
                        </td>
                        <td style={{ padding: '12px' }}>
                          <NeuronTree data={PREVIEW_TREE_DATA} size={sz} variant="subtle" defaultExpandedIds={['src']} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* ── 2. Visual Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">Anatomy</h2>
            <p className="section-description">
              Structural anatomy of an enterprise Tree View item row with its interactive zones and hierarchical indicators.
            </p>

            <TreeAnatomyViewer />
          </div>

          {/* ── 4. Selection Modes & States ── */}
          <div className="section-card">
            <h2 className="section-title">Selection Modes</h2>
            <p className="section-description">
              Choose between Single selection, Independent Multi-selection, and Cascading Checkbox selection.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              {/* Single */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '14px' }}>Single Selection</strong>
                  <NeuronBadge size="sm" variant="brand">Single Active</NeuronBadge>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Clicking an item selects only that item. Ideal for file viewing and navigation drawers.
                </p>
                <NeuronTree data={PREVIEW_TREE_DATA} selectionMode="single" defaultSelectedIds={['NeuronButton.tsx']} defaultExpandedIds={['src', 'components']} />
              </div>

              {/* Checkbox Cascade */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '14px' }}>Cascading Checkboxes</strong>
                  <NeuronBadge size="sm" variant="success">Tri-State</NeuronBadge>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Checking a parent automatically checks all descendants. Partial selections display an indeterminate dash.
                </p>
                <NeuronTree data={PREVIEW_TREE_DATA} selectionMode="checkbox" cascadeCheck defaultCheckedIds={['NeuronButton.tsx']} defaultExpandedIds={['src', 'components']} />
              </div>
            </div>
          </div>

          {/* ── 5. Deep Multi-Level Hierarchy ── */}
          <div className="section-card">
            <h2 className="section-title">Deep Multi-Level Hierarchy</h2>
            <p className="section-description">
              Proportional whitespace indentation offsets (16px per level) and consistent icon alignment ensure clarity and effortless navigation even across 5+ levels of deep nesting without visual clutter.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              {/* Deep Single Branch (5-Level Nesting) */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '14px' }}>Deep 5-Level Nesting</strong>
                  <NeuronBadge size="sm" variant="brand">5 Levels Deep</NeuronBadge>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Proportional indentation cleanly communicates lineage from root to leaf with smooth spacing and distinct open/closed folder glyphs.
                </p>
                <NeuronTree 
                  data={LOREM_LEVEL_DATA} 
                  variant="subtle" 
                  defaultExpandedIds={['lvl-1', 'lvl-2', 'lvl-3', 'lvl-4']} 
                />
              </div>

              {/* Multi-Branch Sibling Tree */}
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '14px' }}>Multi-Branch Hierarchy</strong>
                  <NeuronBadge size="sm" variant="gray">Sibling Folders</NeuronBadge>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                  Multiple expanded sibling folders maintain clear spatial hierarchy, uniform line heights, and distinct file type icons.
                </p>
                <NeuronTree 
                  data={BASIC_TREE_DATA} 
                  variant="bordered" 
                  defaultExpandedIds={['src', 'components', 'styles', 'public']} 
                />
              </div>
            </div>
          </div>

          {/* ── 6. Do's and Don'ts ── */}
          <div className="section-card">
            <h2 className="section-title">Best Practices</h2>
            <p className="section-description">
              Key design and interaction recommendations when utilizing tree views in enterprise user interfaces.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Use Consistent Indentation Spacing</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Rely on proportional indent steps (16px per depth level) and clear folder glyphs to communicate hierarchy cleanly without visual wire clutter.
                </p>
              </RuleCard>

              <RuleCard type="dont">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Avoid Deep Infinite Nesting Without Search</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Never force users to expand through 6+ levels of folders manually without providing a quick filter search bar.
                </p>
              </RuleCard>

              <RuleCard type="do">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Use Distinct File & Folder Icons</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Differentiate container nodes from leaf items using intuitive folder and file glyphs to prevent interaction confusion.
                </p>
              </RuleCard>

              <RuleCard type="dont">
                <h4 style={{ fontWeight: 600, fontSize: '14px', marginBottom: 6 }}>Don't Crowd Row Items With Long Sentences</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Keep tree labels concise. Move extensive descriptions to an adjacent details pane or secondary tooltip.
                </p>
              </RuleCard>
            </div>
          </div>

          {/* ── 6. Accessibility ── */}
          <div className="section-card">
            <h2 className="section-title">Accessibility (WAI-ARIA)</h2>
            <p className="section-description">
              <code>NeuronTree</code> follows the official W3C WAI-ARIA Treeview 1.2 design pattern with full keyboard navigation and roving focus.
            </p>

            <div className="api-table-wrapper" style={{ marginTop: 'var(--space-4)' }}>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Key / Shortcut</th>
                    <th>WAI-ARIA Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><kbd className="key-cap">↓</kbd> / <kbd className="key-cap">↑</kbd></td>
                    <td><code>focus</code></td>
                    <td>Moves keyboard focus to the next or previous visible node.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">→</kbd></td>
                    <td><code>aria-expanded</code></td>
                    <td>Expands a closed folder. If already open, moves focus to the first child.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">←</kbd></td>
                    <td><code>aria-expanded</code></td>
                    <td>Collapses an open folder. If already closed or a leaf node, moves focus to its parent.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">Enter</kbd> / <kbd className="key-cap">Space</kbd></td>
                    <td><code>aria-selected</code> / <code>aria-checked</code></td>
                    <td>Selects the focused node, or toggles its checkbox state in checkbox mode.</td>
                  </tr>
                  <tr>
                    <td><kbd className="key-cap">Home</kbd> / <kbd className="key-cap">End</kbd></td>
                    <td><code>focus</code></td>
                    <td>Jumps directly to the very first or very last visible tree node.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



        </div>
      )}

      {/* ══════════════════════════════════════
          TAB 2 – PLAYBOOK
      ══════════════════════════════════════ */}
      {activeViewTab === 'playbook' && (
        <div className="tab-content">

          {/* ── Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">{t.compShared.playground}</h2>
            <p className="section-description">
              Customize scale sizes, container variants, selection modes, icon visibility, and cascading checkboxes in real time with live code generation.
            </p>

            <Playground
              name="NeuronTree"
              knobs={[
                {
                  name: 'size',
                  label: 'Scale Size',
                  type: 'select',
                  options: ['sm', 'md', 'lg'],
                  default: 'md',
                },
                {
                  name: 'variant',
                  label: 'Container Variant',
                  type: 'select',
                  options: ['default', 'bordered', 'subtle'],
                  default: 'bordered',
                },
                {
                  name: 'selectionMode',
                  label: 'Selection Mode',
                  type: 'select',
                  options: ['checkbox', 'single', 'multi', 'none'],
                  default: 'checkbox',
                },
                {
                  name: 'showIcons',
                  label: 'Show Icons',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'cascadeCheck',
                  label: 'Cascade Checkbox',
                  type: 'boolean',
                  default: true,
                  condition: (state) => state.selectionMode === 'checkbox',
                },
              ]}
              codeTemplates={(state) => {
                const iconsProp = !state.showIcons ? '\n  showIcons={false}' : '';
                const cascadeProp = state.selectionMode === 'checkbox' && !state.cascadeCheck ? '\n  cascadeCheck={false}' : '';
                const vueIcons = !state.showIcons ? '\n  :show-icons="false"' : '';
                const vueCascade = state.selectionMode === 'checkbox' && !state.cascadeCheck ? '\n  :cascade-check="false"' : '';

                return {
                  react: `<NeuronTree
  data={treeData}
  size="${state.size}"
  variant="${state.variant}"
  selectionMode="${state.selectionMode}"${iconsProp}${cascadeProp}
  defaultExpandedIds={['src', 'components']}
  onSelectionChange={(ids, nodes) => console.log('Selected:', ids)}
  onCheckedChange={(ids, nodes) => console.log('Checked:', ids)}
/>`,
                  vue: `<NeuronTree
  :data="treeData"
  size="${state.size}"
  variant="${state.variant}"
  selection-mode="${state.selectionMode}"${vueIcons}${vueCascade}
  :default-expanded-ids="['src', 'components']"
  @selection-change="handleSelection"
  @checked-change="handleChecked"
/>`,
                  html: `<div class="neuron-tree neuron-tree--${state.size} neuron-tree--${state.variant}" role="tree">
  <!-- Hierarchical tree nodes -->
</div>`,
                };
              }}
            >
              {(state) => <TreePlaygroundPreview state={state} />}
            </Playground>
          </div>

          {/* ── Pattern 1: IDE / File System Explorer ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 01
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  IDE & Workspace File Explorer
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">Interactive</NeuronBadge>
            </div>
            <p className="section-description">
              A developer-centric file system navigator featuring file extensions, byte sizes, quick hover action buttons (add file, delete), and breadcrumb sync.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              {/* Explorer Sidebar */}
              <div style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                background: 'var(--color-bg-surface)', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                    EXPLORER
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button type="button" className="neuron-tree__action-btn" title="New File"><Plus size={13} /></button>
                    <button type="button" className="neuron-tree__action-btn" title="Collapse All"><Minimize2 size={13} /></button>
                  </div>
                </div>

                <div style={{ padding: '8px', flex: 1, maxHeight: 380, overflowY: 'auto' }}>
                  <NeuronTree
                    data={EXPLORER_DATA}
                    size="sm"
                    variant="default"
                    selectionMode="single"
                    selectedIds={explorerSelected}
                    defaultExpandedIds={['workspace', 'src', 'components', 'tokens']}
                    onSelectionChange={(ids) => setExplorerSelected(ids)}
                  />
                </div>
              </div>

              {/* File Preview Pane */}
              <div style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-xl)', 
                background: 'var(--color-bg-surface)', 
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                    <FileCode size={18} color="#3b82f6" />
                    <div>
                      <strong style={{ fontSize: '14px', display: 'block' }}>{explorerSelected[0] || 'No file selected'}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>src/components/{explorerSelected[0]} · TypeScript React</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', background: 'var(--color-bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-family-mono, monospace)', fontSize: '12px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                    <code>
                      {`import React from 'react';\n\n// Selected component module\nexport const ${explorerSelected[0]?.replace('.tsx', '') || 'Component'} = () => {\n  return <div>Neudela Design System Component</div>;\n};`}
                    </code>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                  <span>UTF-8 · LF · 2 Spaces</span>
                  <NeuronBadge size="sm" variant="success">Synchronized</NeuronBadge>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pattern 2: RBAC Permissions Matrix ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 02
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  RBAC & Multi-Level Permission Matrix
                </h3>
              </div>
              <NeuronBadge size="sm" variant="success">Cascading Checkbox</NeuronBadge>
            </div>
            <p className="section-description">
              Hierarchical privilege assignment. Toggling module-level privileges automatically applies cascading inheritance down to sub-capabilities with clear indeterminate indicator states.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
              {/* Permission Tree */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)', background: 'var(--color-bg-surface)' }}>
                <NeuronTree
                  data={RBAC_DATA}
                  size="md"
                  variant="default"
                  selectionMode="checkbox"
                  cascadeCheck
                  checkedIds={rbacChecked}
                  defaultExpandedIds={['dashboards', 'users-roles', 'infra-api']}
                  onCheckedChange={(ids) => setRbacChecked(ids)}
                />
              </div>

              {/* RBAC Summary Box */}
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', background: 'var(--color-bg-subtle)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Shield size={18} color="var(--brand-600)" />
                    <strong style={{ fontSize: '14px' }}>Custom Security Policy</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                    Active role credentials currently granted across workspace boundaries:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Granted Privileges:</span>
                      <strong>{rbacChecked.length} permissions</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Inheritance Mode:</span>
                      <strong style={{ color: 'var(--emerald-600)' }}>Cascading</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Enforcement:</span>
                      <strong>Strict (Zero Trust)</strong>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                  <NeuronButton variant="primary" size="sm" style={{ width: '100%', justifyContent: 'center' }}>
                    Save Policy Changes
                  </NeuronButton>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pattern 3: Organization & Department Hierarchy ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 03
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  Enterprise Organization & Team Hierarchy
                </h3>
              </div>
              <NeuronBadge size="sm" variant="gray">Org Chart</NeuronBadge>
            </div>
            <p className="section-description">
              Corporate reporting structure illustrating divisions, squads, headcount tags, and operational states.
            </p>

            <div style={{ maxWidth: 640, marginTop: 'var(--space-4)' }}>
              <NeuronTree
                data={ORG_DATA}
                size="md"
                variant="bordered"
                defaultExpandedIds={['exec', 'eng', 'design']}
              />
            </div>
          </div>

          {/* ── Pattern 4: Searchable Knowledge Base Filter ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-600)', letterSpacing: '0.05em' }}>
                  Pattern 04
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0 0 0' }}>
                  Searchable Knowledge Base Category Navigator
                </h3>
              </div>
              <NeuronBadge size="sm" variant="brand">Real-Time Search</NeuronBadge>
            </div>
            <p className="section-description">
              Instant keyword query matching with ancestor auto-expansion and visual substring highlighting.
            </p>

            <div style={{ maxWidth: 560, marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Search Toolbar */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <NeuronInput
                    placeholder="Search documentation, tokens, accessibility..."
                    value={kbSearch}
                    onChange={(e) => setKbSearch(e.target.value)}
                    leadingIcon={<Search size={14} />}
                  />
                </div>
                <NeuronButton 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setKbSearch('')}
                >
                  Clear
                </NeuronButton>
              </div>

              {/* Tree Container */}
              <NeuronTree
                data={KB_DATA}
                size="sm"
                variant="bordered"
                searchQuery={kbSearch}
                defaultExpandedIds={['kb-guide', 'kb-components', 'kb-forms', 'kb-display', 'kb-a11y']}
              />
            </div>
          </div>

          {/* ── Props & API Reference ── */}
          <div className="section-card">
            <h2 className="section-title">Props & API Reference</h2>
            <p className="section-description">
              Comprehensive prop definitions and data interfaces for the NeuronTree component.
            </p>

            <h3 style={{ fontSize: '15px', fontWeight: 600, marginTop: 'var(--space-4)', marginBottom: '8px' }}>
              NeuronTree Props
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>data</code></td>
                    <td><code>TreeNode[]</code></td>
                    <td><code>[]</code></td>
                    <td>Hierarchical array of node objects to render.</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'sm' | 'md' | 'lg'</code></td>
                    <td><code>'md'</code></td>
                    <td>Typography scale and row density: sm (12px), md (14px), lg (15px).</td>
                  </tr>
                  <tr>
                    <td><code>variant</code></td>
                    <td><code>'default' | 'bordered' | 'subtle'</code></td>
                    <td><code>'default'</code></td>
                    <td>Container styling: clean transparent, bordered card box, or subtle background.</td>
                  </tr>
                  <tr>
                    <td><code>selectionMode</code></td>
                    <td><code>'none' | 'single' | 'multi' | 'checkbox'</code></td>
                    <td><code>'single'</code></td>
                    <td>Mode determining how items can be selected or checked.</td>
                  </tr>
                  <tr>
                    <td><code>cascadeCheck</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Whether checkbox selections cascade up and down parent-child relationships.</td>
                  </tr>
                  <tr>
                    <td><code>showIcons</code></td>
                    <td><code>boolean</code></td>
                    <td><code>true</code></td>
                    <td>Renders folder and file glyphs next to node labels.</td>
                  </tr>
                  <tr>
                    <td><code>searchQuery</code></td>
                    <td><code>string</code></td>
                    <td><code>''</code></td>
                    <td>Filters matching node labels, highlights matched substrings, and auto-expands ancestors.</td>
                  </tr>
                  <tr>
                    <td><code>selectedIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Controlled array of currently selected node IDs.</td>
                  </tr>
                  <tr>
                    <td><code>defaultSelectedIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Initial selected node IDs for uncontrolled usage.</td>
                  </tr>
                  <tr>
                    <td><code>checkedIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Controlled array of checked checkbox node IDs.</td>
                  </tr>
                  <tr>
                    <td><code>defaultCheckedIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Initial checked checkbox node IDs for uncontrolled usage.</td>
                  </tr>
                  <tr>
                    <td><code>expandedIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Controlled array of expanded folder node IDs.</td>
                  </tr>
                  <tr>
                    <td><code>defaultExpandedIds</code></td>
                    <td><code>string[]</code></td>
                    <td><code>[]</code></td>
                    <td>Initial expanded folder node IDs on mount.</td>
                  </tr>
                  <tr>
                    <td><code>expandAll</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>When true, automatically expands all folder nodes on initial mount.</td>
                  </tr>
                  <tr>
                    <td><code>showLines</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Optional legacy prop for connecting guide lines. Neudela standard recommends clean whitespace indentation.</td>
                  </tr>
                  <tr>
                    <td><code>onSelectionChange</code></td>
                    <td><code>(ids: string[], nodes: TreeNode[]) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback fired when selected node IDs change.</td>
                  </tr>
                  <tr>
                    <td><code>onCheckedChange</code></td>
                    <td><code>(ids: string[], nodes: TreeNode[]) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback fired when checked checkbox IDs change.</td>
                  </tr>
                  <tr>
                    <td><code>onExpandedChange</code></td>
                    <td><code>(ids: string[]) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback fired when expanded folder IDs change.</td>
                  </tr>
                  <tr>
                    <td><code>onNodeClick</code></td>
                    <td><code>(node: TreeNode, e: React.MouseEvent) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback fired when clicking a tree node row.</td>
                  </tr>
                  <tr>
                    <td><code>onNodeDoubleClick</code></td>
                    <td><code>(node: TreeNode, e: React.MouseEvent) =&gt; void</code></td>
                    <td><code>undefined</code></td>
                    <td>Callback fired when double-clicking a tree node row.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 600, marginTop: 'var(--space-6)', marginBottom: '8px' }}>
              TreeNode Data Interface
            </h3>
            <div className="api-table-wrapper">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>id</code></td>
                    <td><code>string</code></td>
                    <td>Yes</td>
                    <td>Unique identifier for the tree node.</td>
                  </tr>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>ReactNode</code></td>
                    <td>Yes</td>
                    <td>Primary readable label or custom ReactNode markup.</td>
                  </tr>
                  <tr>
                    <td><code>children</code></td>
                    <td><code>TreeNode[]</code></td>
                    <td>No</td>
                    <td>Nested child nodes array. Presence denotes a folder / branch node.</td>
                  </tr>
                  <tr>
                    <td><code>icon</code></td>
                    <td><code>ReactNode | ((node, state) =&gt; ReactNode)</code></td>
                    <td>No</td>
                    <td>Contextual icon glyph or dynamic render function.</td>
                  </tr>
                  <tr>
                    <td><code>badge</code></td>
                    <td><code>ReactNode</code></td>
                    <td>No</td>
                    <td>Pill badge displayed alongside the label (e.g. child count or status flag).</td>
                  </tr>
                  <tr>
                    <td><code>extra</code></td>
                    <td><code>ReactNode</code></td>
                    <td>No</td>
                    <td>Secondary auxiliary text or metadata right-aligned on the row.</td>
                  </tr>
                  <tr>
                    <td><code>actions</code></td>
                    <td><code>ReactNode</code></td>
                    <td>No</td>
                    <td>Contextual action buttons revealed on hover or keyboard focus.</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td>No</td>
                    <td>Prevents selection and interaction when true.</td>
                  </tr>
                  <tr>
                    <td><code>isLeaf</code></td>
                    <td><code>boolean</code></td>
                    <td>No</td>
                    <td>Explicitly marks a node as a leaf without chevron, even if children array is empty.</td>
                  </tr>
                  <tr>
                    <td><code>data</code></td>
                    <td><code>any</code></td>
                    <td>No</td>
                    <td>Custom payload object attached to the node for application logic.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ── Next / Previous Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-tooltip', label: t.nav.compTooltip }}
        next={{ id: 'comp-textarea', label: t.nav.compTextArea || 'Text Area' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
