import NeuronButton from '../components/NeuronButton';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface ButtonViewProps {
  setActiveTab: (tabId: string) => void;
}

export default function ButtonView({ setActiveTab }: ButtonViewProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.button.pageTitle}</h1>
        <p className="page-subtitle">{t.button.pageSubtitle}</p>
      </div>

      {/* ── VARIANTS ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.variants}</h2>
        <p className="section-description">{t.button.variantsDesc}</p>
        <div className="component-showcase-grid">
          {([
            { variant: 'primary', label: t.button.primary, desc: t.button.primaryDesc },
            { variant: 'secondary', label: t.button.secondary, desc: t.button.secondaryDesc },
            { variant: 'outline', label: t.button.outline, desc: t.button.outlineDesc },
            { variant: 'text', label: t.button.text, desc: t.button.textDesc },
          ] as const).map(({ variant, label, desc }) => (
            <div key={variant} className="showcase-item">
              <NeuronButton variant={variant}>{label}</NeuronButton>
              <span className="showcase-label">{label}</span>
              <span className="showcase-desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SIZES ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.sizes}</h2>
        <p className="section-description">{t.button.sizesDesc}</p>
        <div className="component-showcase-grid component-showcase-grid--align-end">
          {([
            { size: 'sm', label: t.button.small },
            { size: 'md', label: t.button.medium },
            { size: 'lg', label: t.button.large },
          ] as const).map(({ size, label }) => (
            <div key={size} className="showcase-item">
              <NeuronButton size={size}>{label}</NeuronButton>
              <span className="showcase-label">{label} ({size})</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATES ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.states}</h2>
        <p className="section-description">{t.button.statesDesc}</p>
        <div className="component-showcase-grid">
          <div className="showcase-item">
            <NeuronButton>{t.button.defaultState}</NeuronButton>
            <span className="showcase-label">{t.button.defaultState}</span>
          </div>
          <div className="showcase-item">
            <NeuronButton loading>{t.button.loading}</NeuronButton>
            <span className="showcase-label">{t.button.loading}</span>
          </div>
          <div className="showcase-item">
            <NeuronButton disabled>{t.button.disabled}</NeuronButton>
            <span className="showcase-label">{t.button.disabled}</span>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE PLAYGROUND ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.playground}</h2>
        <Playground
          name="NeuronButton"
          knobs={[
            { name: 'variant', type: 'select', options: ['primary', 'secondary', 'outline', 'text'], default: 'primary' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
            { name: 'loading', type: 'boolean', default: false, label: t.button.loading },
            { name: 'disabled', type: 'boolean', default: false, label: t.button.disabled },
            { name: 'text', type: 'text', default: t.button.knobText },
          ]}
          codeTemplates={(knobs) => {
            const reactProps: string[] = [];
            const vueProps: string[] = [];

            if (knobs.variant !== 'primary') {
              reactProps.push(`variant="${knobs.variant}"`);
              vueProps.push(`variant="${knobs.variant}"`);
            }
            if (knobs.size !== 'md') {
              reactProps.push(`size="${knobs.size}"`);
              vueProps.push(`size="${knobs.size}"`);
            }
            if (knobs.loading) {
              reactProps.push('loading');
              vueProps.push('loading');
            }
            if (knobs.disabled) {
              reactProps.push('disabled');
              vueProps.push('disabled');
            }

            const reactAttr = reactProps.length ? `\n  ${reactProps.join('\n  ')}\n` : ' ';
            const vueAttr = vueProps.length ? `\n  ${vueProps.join('\n  ')}\n` : ' ';
            const htmlDisabled = knobs.disabled || knobs.loading ? ' disabled' : '';

            return {
              react: `<NeuronButton${reactAttr}>\n  ${knobs.text}\n</NeuronButton>`,
              vue: `<NeuronButton${vueAttr}>\n  ${knobs.text}\n</NeuronButton>`,
              html: `<button\n  class="neuron-btn neuron-btn--${knobs.variant} neuron-btn--${knobs.size}"${htmlDisabled}\n>\n  ${knobs.loading ? '<span class="neuron-spinner"></span>\n  ' : ''}${knobs.text}\n</button>`,
            };
          }}
        >
          {(knobs) => (
            <NeuronButton
              variant={knobs.variant as 'primary' | 'secondary' | 'outline' | 'text'}
              size={knobs.size as 'sm' | 'md' | 'lg'}
              loading={knobs.loading as boolean}
              disabled={knobs.disabled as boolean}
            >
              {knobs.text}
            </NeuronButton>
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
                <td><code>'primary' | 'secondary' | 'outline' | 'text'</code></td>
                <td><code>'primary'</code></td>
                <td>{t.button.apiVariant}</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'sm' | 'md' | 'lg'</code></td>
                <td><code>'md'</code></td>
                <td>{t.button.apiSize}</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{t.button.apiLoading}</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{t.button.apiDisabled}</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>{t.button.apiChildren}</td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>() =&gt; void</code></td>
                <td>—</td>
                <td>{t.button.apiOnClick}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'spacing', label: t.nav.spacing }}
        next={{ id: 'comp-input', label: t.nav.compInput }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
