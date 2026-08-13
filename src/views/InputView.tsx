import NeuronInput from '../components/NeuronInput';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface InputViewProps {
  setActiveTab: (tabId: string) => void;
}

export default function InputView({ setActiveTab }: InputViewProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.input.pageTitle}</h1>
        <p className="page-subtitle">{t.input.pageSubtitle}</p>
      </div>

      {/* ── VARIANTS (Validation States) ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.variants}</h2>
        <p className="section-description">{t.input.variantsDesc}</p>
        <div className="component-showcase-grid component-showcase-grid--wide">
          {([
            { state: 'default', label: t.input.default, desc: t.input.defaultDesc },
            { state: 'success', label: t.input.success, desc: t.input.successDesc },
            { state: 'error', label: t.input.error, desc: t.input.errorDesc },
          ] as const).map(({ state, label, desc }) => (
            <div key={state} className="showcase-item showcase-item--wide">
              <NeuronInput
                label={label}
                placeholder={t.input.knobPlaceholder}
                state={state}
                helperText={desc}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── STATES ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.states}</h2>
        <p className="section-description">{t.input.statesDesc}</p>
        <div className="component-showcase-grid component-showcase-grid--wide">
          <div className="showcase-item showcase-item--wide">
            <NeuronInput
              label={t.input.enabled}
              placeholder={t.input.knobPlaceholder}
              onChange={() => {}}
            />
          </div>
          <div className="showcase-item showcase-item--wide">
            <NeuronInput
              label={t.input.disabled}
              placeholder={t.input.knobPlaceholder}
              disabled
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE PLAYGROUND ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.playground}</h2>
        <Playground
          name="NeuronInput"
          knobs={[
            { name: 'label', type: 'text', default: t.input.knobLabel },
            { name: 'placeholder', type: 'text', default: t.input.knobPlaceholder },
            { name: 'state', type: 'select', options: ['default', 'success', 'error'], default: 'default' },
            { name: 'helperText', type: 'text', default: t.input.knobHelperText },
            { name: 'disabled', type: 'boolean', default: false, label: t.input.disabled },
          ]}
          codeTemplates={(knobs) => {
            const reactProps: string[] = [];
            const vueProps: string[] = [];

            if (knobs.label) {
              reactProps.push(`label="${knobs.label}"`);
              vueProps.push(`label="${knobs.label}"`);
            }
            if (knobs.placeholder) {
              reactProps.push(`placeholder="${knobs.placeholder}"`);
              vueProps.push(`placeholder="${knobs.placeholder}"`);
            }
            if (knobs.state !== 'default') {
              reactProps.push(`state="${knobs.state}"`);
              vueProps.push(`state="${knobs.state}"`);
            }
            if (knobs.helperText) {
              reactProps.push(`helperText="${knobs.helperText}"`);
              vueProps.push(`helperText="${knobs.helperText}"`);
            }
            if (knobs.disabled) {
              reactProps.push('disabled');
              vueProps.push('disabled');
            }

            const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
            const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';

            let htmlInputClass = 'neuron-input';
            let htmlGroupClass = 'neuron-form-group';
            if (knobs.state === 'success') {
              htmlInputClass += ' neuron-input--success';
              htmlGroupClass += ' neuron-form-group--success';
            } else if (knobs.state === 'error') {
              htmlInputClass += ' neuron-input--error';
              htmlGroupClass += ' neuron-form-group--error';
            }

            return {
              react: `<NeuronInput${reactAttr}/>`,
              vue: `<NeuronInput${vueAttr}/>`,
              html: `<div class="${htmlGroupClass}">\n  ${knobs.label ? `<label class="neuron-label">${knobs.label}</label>\n  ` : ''}<div class="neuron-input-wrapper">\n    <input\n      type="text"\n      class="${htmlInputClass}"\n      placeholder="${knobs.placeholder}"${knobs.disabled ? ' disabled' : ''}\n    />\n  </div>\n  ${knobs.helperText ? `<span class="neuron-helper-text">${knobs.helperText}</span>\n` : ''}</div>`,
            };
          }}
        >
          {(knobs) => (
            <NeuronInput
              label={knobs.label as string}
              placeholder={knobs.placeholder as string}
              state={knobs.state as 'default' | 'success' | 'error'}
              helperText={knobs.helperText as string}
              disabled={knobs.disabled as boolean}
              onChange={() => {}}
            />
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
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>{t.input.apiLabel}</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>{t.input.apiPlaceholder}</td>
              </tr>
              <tr>
                <td><code>state</code></td>
                <td><code>'default' | 'success' | 'error'</code></td>
                <td><code>'default'</code></td>
                <td>{t.input.apiState}</td>
              </tr>
              <tr>
                <td><code>helperText</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>{t.input.apiHelperText}</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{t.input.apiDisabled}</td>
              </tr>
              <tr>
                <td><code>onChange</code></td>
                <td><code>(e) =&gt; void</code></td>
                <td>—</td>
                <td>{t.input.apiOnChange}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'comp-button', label: t.nav.compButton }}
        next={{ id: 'comp-card', label: t.nav.compCard }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
