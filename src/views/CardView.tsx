import NeuronCard from '../components/NeuronCard';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface CardViewProps {
  setActiveTab: (tabId: string) => void;
}

export default function CardView({ setActiveTab }: CardViewProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.card.pageTitle}</h1>
        <p className="page-subtitle">{t.card.pageSubtitle}</p>
      </div>

      {/* ── VARIANTS ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.variants}</h2>
        <p className="section-description">{t.card.variantsDesc}</p>
        <div className="component-showcase-grid component-showcase-grid--wide">
          <div className="showcase-item showcase-item--wide">
            <NeuronCard
              header={<h3>{t.card.static}</h3>}
              footer={<span>{t.card.staticDesc}</span>}
            >
              <p>{t.card.knobBody}</p>
            </NeuronCard>
          </div>
          <div className="showcase-item showcase-item--wide">
            <NeuronCard
              hoverable
              header={<h3>{t.card.hoverable}</h3>}
              footer={<span>{t.card.hoverableDesc}</span>}
            >
              <p>{t.card.knobBody}</p>
            </NeuronCard>
          </div>
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <div className="section-card">
        <h2 className="section-title">{t.card.sectionsTitle}</h2>
        <p className="section-description">{t.card.sectionsDesc}</p>
        <div className="component-showcase-grid component-showcase-grid--wide">
          <div className="showcase-item showcase-item--wide">
            <NeuronCard header={<h3>{t.card.headerOnly}</h3>}>
              <p>{t.card.knobBody}</p>
            </NeuronCard>
          </div>
          <div className="showcase-item showcase-item--wide">
            <NeuronCard footer={<span>{t.card.knobFooter}</span>}>
              <p>{t.card.knobBody}</p>
            </NeuronCard>
          </div>
          <div className="showcase-item showcase-item--wide">
            <NeuronCard
              header={<h3>{t.card.full}</h3>}
              footer={<span>{t.card.knobFooter}</span>}
            >
              <p>{t.card.knobBody}</p>
            </NeuronCard>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE PLAYGROUND ── */}
      <div className="section-card">
        <h2 className="section-title">{t.compShared.playground}</h2>
        <Playground
          name="NeuronCard"
          knobs={[
            { name: 'hoverable', type: 'boolean', default: true, label: t.card.knobHoverable },
            { name: 'header', type: 'text', default: t.card.knobHeader },
            { name: 'bodyText', type: 'text', default: t.card.knobBody },
            { name: 'footer', type: 'text', default: t.card.knobFooter },
          ]}
          codeTemplates={(knobs) => {
            const reactProps: string[] = [];
            const vueProps: string[] = [];

            if (knobs.hoverable) {
              reactProps.push('hoverable');
              vueProps.push('hoverable');
            }
            if (knobs.header) {
              reactProps.push(`header={<h3>${knobs.header}</h3>}`);
              vueProps.push('header');
            }
            if (knobs.footer) {
              reactProps.push(`footer={<span>${knobs.footer}</span>}`);
              vueProps.push('footer');
            }

            const reactAttr = reactProps.length ? `\n  ${reactProps.filter(p => !p.includes('header') && !p.includes('footer')).join('\n  ')}\n` : ' ';
            const hoverAttrVue = knobs.hoverable ? ' hoverable' : '';

            const vueHeaderBlock = knobs.header ? `\n  <template #header>\n    <h3>${knobs.header}</h3>\n  </template>` : '';
            const vueFooterBlock = knobs.footer ? `\n  <template #footer>\n    <span>${knobs.footer}</span>\n  </template>` : '';

            return {
              react: `<NeuronCard${reactAttr}${knobs.header ? `\n  header={<h3>${knobs.header}</h3>}` : ''}${knobs.footer ? `\n  footer={<span>${knobs.footer}</span>}` : ''}\n>\n  <p>${knobs.bodyText}</p>\n</NeuronCard>`,
              vue: `<NeuronCard${hoverAttrVue}>${vueHeaderBlock}\n  <p>${knobs.bodyText}</p>${vueFooterBlock}\n</NeuronCard>`,
              html: `<div class="neuron-card ${knobs.hoverable ? 'neuron-card--hoverable' : ''}">\n  ${knobs.header ? `<div class="neuron-card-header">\n    <h3>${knobs.header}</h3>\n  </div>\n  ` : ''}<div class="neuron-card-body">\n    <p>${knobs.bodyText}</p>\n  </div>\n  ${knobs.footer ? `<div class="neuron-card-footer">\n    <span>${knobs.footer}</span>\n  </div>\n` : ''}</div>`,
            };
          }}
        >
          {(knobs) => (
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <NeuronCard
                hoverable={knobs.hoverable as boolean}
                header={knobs.header ? <h3>{knobs.header as string}</h3> : undefined}
                footer={knobs.footer ? <span>{knobs.footer as string}</span> : undefined}
              >
                <p>{knobs.bodyText}</p>
              </NeuronCard>
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
                <td><code>hoverable</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>{t.card.apiHoverable}</td>
              </tr>
              <tr>
                <td><code>header</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>{t.card.apiHeader}</td>
              </tr>
              <tr>
                <td><code>footer</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>{t.card.apiFooter}</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>{t.card.apiChildren}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NextPrevious
        prev={{ id: 'comp-input', label: t.nav.compInput }}
        next={{ id: 'comp-badge', label: t.nav.compBadge }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
