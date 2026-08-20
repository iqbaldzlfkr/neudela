import NeuronAlert from '../components/NeuronAlert';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface AlertViewProps {
  setActiveTab: (tabId: string) => void;
}

export default function AlertView({ setActiveTab }: AlertViewProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.alert.pageTitle}</h1>
        <p className="page-subtitle">{t.alert.pageSubtitle}</p>
      </div>

      {/* ── VARIANTS ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.variants}</h2>
        <p className="section-description">{t.alert.variantsDesc}</p>
        <div className="component-showcase-stack">
          {([
            { variant: 'info', label: t.alert.info, desc: t.alert.infoDesc },
            { variant: 'success', label: t.alert.success, desc: t.alert.successDesc },
            { variant: 'warning', label: t.alert.warning, desc: t.alert.warningDesc },
            { variant: 'danger', label: t.alert.danger, desc: t.alert.dangerDesc },
          ] as const).map(({ variant, label, desc }) => (
            <div key={variant} className="showcase-stack-item">
              <NeuronAlert
                variant={variant}
                title={label}
                description={desc}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── STATES ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.states}</h2>
        <p className="section-description">{t.alert.statesDesc}</p>
        <div className="component-showcase-stack">
          <div className="showcase-stack-item">
            <NeuronAlert
              variant="info"
              title={t.alert.closeable}
              description={t.alert.knobDescription}
              onClose={() => {}}
            />
          </div>
          <div className="showcase-stack-item">
            <NeuronAlert
              variant="info"
              title={t.alert.notCloseable}
              description={t.alert.knobDescription}
            />
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE PLAYGROUND ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.playground}</h2>
        <Playground
          name="NeuronAlert"
          knobs={[
            { name: 'variant', type: 'select', options: ['info', 'success', 'warning', 'danger'], default: 'info' },
            { name: 'title', type: 'text', default: t.alert.knobTitle },
            { name: 'description', type: 'text', default: t.alert.knobDescription },
            { name: 'closeable', type: 'boolean', default: true, label: t.alert.knobCloseable },
          ]}
          codeTemplates={(knobs) => {
            const reactProps: string[] = [];
            const vueProps: string[] = [];

            if (knobs.variant !== 'info') {
              reactProps.push(`variant="${knobs.variant}"`);
              vueProps.push(`variant="${knobs.variant}"`);
            }
            if (knobs.title) {
              reactProps.push(`title="${knobs.title}"`);
              vueProps.push(`title="${knobs.title}"`);
            }
            if (knobs.description) {
              reactProps.push(`description="${knobs.description}"`);
              vueProps.push(`description="${knobs.description}"`);
            }
            if (knobs.closeable) {
              reactProps.push('onClose={() => {}}');
              vueProps.push('@close="handleClose"');
            }

            const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
            const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

            return {
              react: `<NeuronAlert${reactAttr}/>`,
              vue: `<NeuronAlert${vueAttr}/>`,
              html: `<div class="neuron-alert neuron-alert--${knobs.variant}">\n  <svg class="neuron-alert-icon" fill="currentColor" viewBox="0 0 20 20">\n    <!-- SVG path based on variant -->\n  </svg>\n  <div class="neuron-alert-content">\n    ${knobs.title ? `<div class="neuron-alert-title">${knobs.title}</div>\n    ` : ''}${knobs.description ? `<div class="neuron-alert-desc">${knobs.description}</div>\n  ` : ''}</div>\n  ${knobs.closeable ? '<button class="neuron-alert-close">&times;</button>\n' : ''}</div>`,
            };
          }}
        >
          {(knobs) => (
            <div style={{ width: '100%' }}>
              <NeuronAlert
                variant={knobs.variant as 'info' | 'success' | 'warning' | 'danger'}
                title={knobs.title as string}
                description={knobs.description as string}
                onClose={knobs.closeable ? () => {} : undefined}
              />
            </div>
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
                <td><code>'info' | 'success' | 'warning' | 'danger'</code></td>
                <td><code>'info'</code></td>
                <td>{t.alert.apiVariant}</td>
              </tr>
              <tr>
                <td><code>title</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>{t.alert.apiTitle}</td>
              </tr>
              <tr>
                <td><code>description</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>{t.alert.apiDescription}</td>
              </tr>
              <tr>
                <td><code>onClose</code></td>
                <td><code>() =&gt; void</code></td>
                <td>—</td>
                <td>{t.alert.apiOnClose}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'comp-radio', label: t.nav.compRadio }}
        next={{ id: 'overview', label: t.nav.overview }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
