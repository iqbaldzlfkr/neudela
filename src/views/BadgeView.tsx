import NeuronBadge from '../components/NeuronBadge';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface BadgeViewProps {
  setActiveTab: (tabId: string) => void;
}

export default function BadgeView({ setActiveTab }: BadgeViewProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.badge.pageTitle}</h1>
        <p className="page-subtitle">{t.badge.pageSubtitle}</p>
      </div>

      {/* ── VARIANTS ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.variants}</h2>
        <p className="section-description">{t.badge.variantsDesc}</p>
        <div className="component-showcase-grid">
          {([
            { variant: 'default', label: t.badge.default, desc: t.badge.defaultDesc },
            { variant: 'primary', label: t.badge.primary, desc: t.badge.primaryDesc },
            { variant: 'success', label: t.badge.success, desc: t.badge.successDesc },
            { variant: 'warning', label: t.badge.warning, desc: t.badge.warningDesc },
            { variant: 'danger', label: t.badge.danger, desc: t.badge.dangerDesc },
          ] as const).map(({ variant, label, desc }) => (
            <div key={variant} className="showcase-item">
              <NeuronBadge variant={variant}>{label}</NeuronBadge>
              <span className="showcase-label">{label}</span>
              <span className="showcase-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHAPES ── */}
      <div className="section-card">
        <h2 className="section-title">{t.badge.shapesTitle}</h2>
        <p className="section-description">{t.badge.shapesDesc}</p>
        <div className="component-showcase-grid">
          <div className="showcase-item">
            <NeuronBadge variant="primary">{t.badge.rectangular}</NeuronBadge>
            <span className="showcase-label">{t.badge.rectangular}</span>
          </div>
          <div className="showcase-item">
            <NeuronBadge variant="primary" pill>{t.badge.pill}</NeuronBadge>
            <span className="showcase-label">{t.badge.pill}</span>
          </div>
        </div>
      </div>

      {/* ── STATES ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.states}</h2>
        <p className="section-description">{t.badge.statesDesc}</p>
        <div className="component-showcase-grid">
          <div className="showcase-item">
            <NeuronBadge variant="primary">{t.badge.withoutClose}</NeuronBadge>
            <span className="showcase-label">{t.badge.withoutClose}</span>
          </div>
          <div className="showcase-item">
            <NeuronBadge variant="primary" onClose={() => {}}>{t.badge.withClose}</NeuronBadge>
            <span className="showcase-label">{t.badge.withClose}</span>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE PLAYGROUND ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.playground}</h2>
        <Playground
          name="NeuronBadge"
          knobs={[
            { name: 'variant', type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger'], default: 'primary' },
            { name: 'pill', type: 'boolean', default: false, label: t.badge.knobPill },
            { name: 'text', type: 'text', default: t.badge.knobText },
            { name: 'closeable', type: 'boolean', default: false, label: t.badge.knobCloseable },
          ]}
          codeTemplates={(knobs) => {
            const reactProps: string[] = [];
            const vueProps: string[] = [];

            if (knobs.variant !== 'default') {
              reactProps.push(`variant="${knobs.variant}"`);
              vueProps.push(`variant="${knobs.variant}"`);
            }
            if (knobs.pill) {
              reactProps.push('pill');
              vueProps.push('pill');
            }
            if (knobs.closeable) {
              reactProps.push('onClose={() => {}}');
              vueProps.push('@close="handleClose"');
            }

            const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
            const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

            let htmlBadgeClass = `neuron-badge neuron-badge--${knobs.variant}`;
            if (knobs.pill) htmlBadgeClass += ' neuron-badge--pill';

            return {
              react: `<NeuronBadge${reactAttr}>\n  ${knobs.text}\n</NeuronBadge>`,
              vue: `<NeuronBadge${vueAttr}>\n  ${knobs.text}\n</NeuronBadge>`,
              html: `<span class="${htmlBadgeClass}">\n  ${knobs.text}\n  ${knobs.closeable ? '<span class="neuron-badge-close">&times;</span>\n' : ''}</span>`,
            };
          }}
        >
          {(knobs) => (
            <NeuronBadge
              variant={knobs.variant as 'default' | 'primary' | 'success' | 'warning' | 'danger'}
              pill={knobs.pill as boolean}
              onClose={knobs.closeable ? () => {} : undefined}
            >
              {knobs.text as string}
            </NeuronBadge>
          )}
        </Playground>
      </div>

      {/* ── API REFERENCE ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.apiReference}</h2>
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
                <td><code>variant</code></td>
                <td><code>'default' | 'primary' | 'success' | 'warning' | 'danger'</code></td>
                <td><code>'default'</code></td>
                <td>{t.badge.apiVariant}</td>
              </tr>
              <tr>
                <td><code>pill</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{t.badge.apiPill}</td>
              </tr>
              <tr>
                <td><code>onClose</code></td>
                <td><code>() =&gt; void</code></td>
                <td>—</td>
                <td>{t.badge.apiOnClose}</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>{t.badge.apiChildren}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'comp-card', label: t.nav.compCard }}
        next={{ id: 'comp-alert', label: t.nav.compAlert }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
