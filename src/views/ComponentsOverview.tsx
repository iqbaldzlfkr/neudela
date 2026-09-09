import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import NeuronCard from '../components/NeuronCard';
import NeuronToggle from '../components/NeuronToggle';
import NeuronCheckbox from '../components/NeuronCheckbox';
import NeuronRadio from '../components/NeuronRadio';
import NeuronAvatar from '../components/NeuronAvatar';
import NeuronProgress from '../components/NeuronProgress';
import NeuronAlert from '../components/NeuronAlert';
import NeuronBreadcrumb from '../components/NeuronBreadcrumb';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';

interface ComponentsOverviewProps {
  setActiveTab: (tabId: string) => void;
}

export default function ComponentsOverview({ setActiveTab }: ComponentsOverviewProps) {
  const { t } = useLanguage();

  const components = [
    {
      id: 'comp-alert',
      title: 'Alert',
      desc: 'Contextual banner feedback for critical, warning, success, and info messages.',
      badge: 'Feedback',
      renderPreview: () => (
        <div style={{ width: '90%', maxWidth: 240 }}>
          <NeuronAlert variant="success" size="sm" title="System nominal" />
        </div>
      ),
    },
    {
      id: 'comp-avatar',
      title: 'Avatar',
      desc: 'User identity profile representations with status badges, fallbacks, and avatar stacks.',
      badge: 'Data Display',
      renderPreview: () => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <NeuronAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces" size="md" status="online" />
          <NeuronAvatar name="Iqbal Dzulfikar" size="md" variant="brand" />
        </div>
      ),
    },
    {
      id: 'comp-badge',
      title: 'Badge',
      desc: 'Status chips and pill tags with dot indicators, avatars, close triggers, and semantic intents.',
      badge: 'Data Display',
      renderPreview: () => (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <NeuronBadge size="sm" variant="brand" dot>Brand</NeuronBadge>
          <NeuronBadge size="sm" variant="success">Active</NeuronBadge>
          <NeuronBadge size="sm" variant="error">Alert</NeuronBadge>
        </div>
      ),
    },
    {
      id: 'comp-breadcrumb',
      title: 'Breadcrumb',
      desc: 'Hierarchical navigation trail revealing the current page location within multi-level architecture.',
      badge: 'Navigation',
      renderPreview: () => (
        <div style={{ width: '90%', maxWidth: 260 }}>
          <NeuronBreadcrumb
            items={[
              { label: 'Home', href: '#' },
              { label: 'Products', href: '#' },
              { label: 'Details' },
            ]}
            size="sm"
          />
        </div>
      ),
    },
    {
      id: 'comp-button',
      title: 'Button',
      desc: 'Interactive trigger elements across 6 variants, 4 sizes, icon slots, and loading states.',
      badge: 'Interactive',
      renderPreview: () => (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
          <NeuronButton variant="primary" size="sm">Primary</NeuronButton>
          <NeuronButton variant="outline" size="sm">Outline</NeuronButton>
        </div>
      ),
    },
    {
      id: 'comp-button-group',
      title: 'Button Group',
      desc: 'Segmented and linked action clusters for views, filters, and toolbars.',
      badge: 'Group',
      renderPreview: () => (
        <div style={{ display: 'inline-flex', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <button style={{ padding: '6px 12px', background: 'var(--brand-500)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 600 }}>Left</button>
          <button style={{ padding: '6px 12px', background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)', borderLeft: '1px solid var(--color-border)', borderRight: 'none', borderTop: 'none', borderBottom: 'none', fontSize: '11px' }}>Middle</button>
          <button style={{ padding: '6px 12px', background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)', borderLeft: '1px solid var(--color-border)', borderRight: 'none', borderTop: 'none', borderBottom: 'none', fontSize: '11px' }}>Right</button>
        </div>
      ),
    },
    {
      id: 'comp-card',
      title: 'Card',
      desc: 'Versatile content containers with 8 surface variants including frosted glassmorphism.',
      badge: 'Container',
      renderPreview: () => (
        <div style={{ width: '85%', maxWidth: 220 }}>
          <NeuronCard variant="elevated" padding="sm">
            <div style={{ fontSize: '11px', fontWeight: 600 }}>NeuronCard Surface</div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: 2 }}>Interactive container</div>
          </NeuronCard>
        </div>
      ),
    },
    {
      id: 'comp-checkbox',
      title: 'Checkbox',
      desc: 'Multi-selection controls supporting unchecked, checked, and indeterminate states.',
      badge: 'Forms',
      renderPreview: () => (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <NeuronCheckbox checked={true} label="Active" onChange={() => {}} />
          <NeuronCheckbox checked={false} label="Inactive" onChange={() => {}} />
        </div>
      ),
    },
    {
      id: 'comp-datepicker',
      title: 'Date Picker',
      desc: 'Interactive calendar for single date and multi-month date ranges with preset shortcuts.',
      badge: 'Forms',
      renderPreview: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '11px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          <Calendar size={13} color="var(--brand-600)" />
          <span>Jan 6, 2025 – Jan 13, 2025</span>
        </div>
      ),
    },
    {
      id: 'comp-dropdown',
      title: 'Dropdown',
      desc: 'Contextual selection menus with avatars, searchable filtering, and multi-select tags.',
      badge: 'Forms',
      renderPreview: () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 12px', width: '85%', maxWidth: 220, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '11px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          <span>Select member...</span>
          <ChevronDown size={13} color="var(--color-text-tertiary)" />
        </div>
      ),
    },
    {
      id: 'comp-input',
      title: 'Input',
      desc: 'Text fields with floating labels, leading/trailing icons, validation, and helper texts.',
      badge: 'Forms',
      renderPreview: () => (
        <div style={{ width: '85%', maxWidth: 220 }}>
          <input
            type="text"
            readOnly
            value="iqbal@neudela.design"
            style={{ width: '100%', padding: '6px 10px', fontSize: '11px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-surface)', color: 'var(--color-text-primary)' }}
          />
        </div>
      ),
    },
    {
      id: 'comp-modal',
      title: 'Modal',
      desc: 'Overlay dialog panels requiring user attention for confirmations, forms, or critical messages.',
      badge: 'Overlay',
      renderPreview: () => (
        <div style={{ width: '90%', maxWidth: 220, padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Dialog Title</span>
            <span style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>✕</span>
          </div>
          <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)', marginBottom: 6 }}>Action confirmation</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
            <span style={{ padding: '2px 6px', fontSize: '9px', borderRadius: 4, background: 'var(--slate-100)', color: 'var(--slate-700)' }}>Cancel</span>
            <span style={{ padding: '2px 6px', fontSize: '9px', borderRadius: 4, background: 'var(--brand-500)', color: '#fff' }}>OK</span>
          </div>
        </div>
      ),
    },
    {
      id: 'comp-progress',
      title: 'Progress Indicators',
      desc: 'Linear bars, radial circles, and semi-circle gauge meters for task and loading completion.',
      badge: 'Feedback',
      renderPreview: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '85%', maxWidth: 220 }}>
          <NeuronProgress type="circle" value={65} size="sm" showValue />
          <div style={{ flex: 1 }}>
            <NeuronProgress type="bar" value={65} size="sm" />
          </div>
        </div>
      ),
    },
    {
      id: 'comp-radio',
      title: 'Radio Button',
      desc: 'Single-selection group controls with animated inner dot pop effect.',
      badge: 'Forms',
      renderPreview: () => (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <NeuronRadio checked={true} label="Selected" onChange={() => {}} />
          <NeuronRadio checked={false} label="Default" onChange={() => {}} />
        </div>
      ),
    },
    {
      id: 'comp-table',
      title: 'Table',
      desc: 'Structured multi-column data grids with sorting, search filtering, status badges, and pagination.',
      badge: 'Data Display',
      renderPreview: () => (
        <div style={{ width: '92%', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden', fontSize: '10px' }}>
          <div style={{ display: 'flex', background: 'var(--slate-50)', padding: '4px 8px', fontWeight: 600, borderBottom: '1px solid var(--color-border)', justifyContent: 'space-between' }}>
            <span>Project Name</span>
            <span>Status</span>
          </div>
          <div style={{ display: 'flex', padding: '4px 8px', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-surface)' }}>
            <span>Design System</span>
            <NeuronBadge size="xs" variant="success" pill>Approved</NeuronBadge>
          </div>
          <div style={{ display: 'flex', padding: '4px 8px', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', borderTop: '1px solid var(--color-border)' }}>
            <span>Cloud Audit</span>
            <NeuronBadge size="xs" variant="warning" pill>In Review</NeuronBadge>
          </div>
        </div>
      ),
    },
    {
      id: 'comp-toggle',
      title: 'Toggle Switch',
      desc: 'Binary switch controls with smooth sliding pill transition and accessible states.',
      badge: 'Forms',
      renderPreview: () => (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <NeuronToggle checked={true} size="md" onChange={() => {}} />
          <NeuronToggle checked={false} size="md" onChange={() => {}} />
        </div>
      ),
    },
    {
      id: 'comp-tooltip',
      title: 'Tooltip',
      desc: 'Contextual floating hint popovers with 12 directional placements and arrow indicators.',
      badge: 'Overlay',
      renderPreview: () => (
        <div style={{ position: 'relative' }}>
          <div style={{ background: 'var(--slate-900)', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-md)', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span>Tooltip popover</span>
            <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 6, height: 6, background: 'var(--slate-900)' }} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Page Header */}
      <div className="page-header">
        <span style={{ 
          fontSize: 'var(--fs-text-xs)', 
          fontWeight: 'var(--font-weight-bold)', 
          color: 'var(--color-primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          display: 'block',
          marginBottom: 'var(--space-2)'
        }}>
          {t.nav.componentsSection}
        </span>
        <h1 className="page-title">UI Components</h1>
        <p className="page-subtitle">
          A comprehensive suite of accessible, multi-framework UI components built on Neudela Design System tokens.
        </p>
      </div>

      {/* Component Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-12)',
      }}>
        {components.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setActiveTab(comp.id)}
            className="component-overview-card"
          >
            {/* Visual Header */}
            <div className="component-overview-preview">
              {comp.renderPreview()}
            </div>

            {/* Content Body */}
            <div className="component-overview-body">
              <div className="component-overview-header">
                <h3 className="component-overview-title">
                  {comp.title}
                </h3>
                <span className="component-overview-badge">
                  {comp.badge}
                </span>
              </div>
              <p className="component-overview-desc">
                {comp.desc}
              </p>
              <div className="component-overview-link">
                View documentation <ArrowRight size={12} className="component-overview-arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <NextPrevious
        prev={{ id: 'typography', label: t.nav.typography }}
        next={{ id: 'comp-alert', label: t.nav.compAlert }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
