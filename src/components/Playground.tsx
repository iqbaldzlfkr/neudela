import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface KnobBase {
  name: string;
  label?: string;
  condition?: (state: KnobsState) => boolean;
}

interface BooleanKnob extends KnobBase {
  type: 'boolean';
  default: boolean;
}

interface SelectKnob extends KnobBase {
  type: 'select';
  options: string[];
  default: string;
}

interface TextKnob extends KnobBase {
  type: 'text';
  default: string;
}

type Knob = BooleanKnob | SelectKnob | TextKnob;

type KnobsState = Record<string, string | boolean>;

interface CodeTemplates {
  vue?: string;
  html?: string;
  react?: string;
}

interface PlaygroundProps {
  name: string;
  knobs: Knob[];
  codeTemplates: (state: KnobsState) => CodeTemplates;
  children: (state: KnobsState) => React.ReactNode;
  previewStyle?: React.CSSProperties;
}

export default function Playground({ name: _name, knobs, codeTemplates, children, previewStyle }: PlaygroundProps) {
  const { t } = useLanguage();

  // Initialize state from knobs default values
  const [knobsState, setKnobsState] = useState<KnobsState>(() => {
    const initialState: KnobsState = {};
    knobs.forEach(knob => {
      initialState[knob.name] = knob.default;
    });
    return initialState;
  });

  const [activeTab, setActiveTab] = useState<'vue' | 'html' | 'react'>('vue');
  const [showToast, setShowToast] = useState(false);

  const handleKnobChange = (name: string, value: string | boolean) => {
    setKnobsState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const code = codeTemplates(knobsState)[activeTab] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="playground-container">
      {/* Live Preview Panel */}
      <div className="playground-preview" style={previewStyle}>
        {children(knobsState)}
      </div>

      {/* Code and Knobs Container */}
      <div className="playground-body">
        {/* Left Side: Code Viewer */}
        <div className="playground-code-panel">
          <div className="playground-code-header">
            <div className="playground-tabs">
              <button
                className={`playground-tab ${activeTab === 'vue' ? 'active' : ''}`}
                onClick={() => setActiveTab('vue')}
              >
                Vue 3
              </button>
              <button
                className={`playground-tab ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                HTML / CSS
              </button>
              <button
                className={`playground-tab ${activeTab === 'react' ? 'active' : ''}`}
                onClick={() => setActiveTab('react')}
              >
                React
              </button>
            </div>
            
            <button className="playground-copy-btn" onClick={handleCopy}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              {t.playground.copy}
            </button>
          </div>
          <pre className="playground-code-content">
            <code>{code}</code>
          </pre>
        </div>

        {/* Right Side: Knobs Controls */}
        <div className="playground-knobs">
          <div className="knobs-title">{t.playground.properties}</div>
          {knobs.map(knob => {
            if (knob.condition && !knob.condition(knobsState)) {
              return null;
            }
            if (knob.type === 'boolean') {
              return (
                <div className="knob-control knob-control--switch" key={knob.name}>
                  <label className="knob-switch-label">
                    <span className="knob-label" style={{ margin: 0 }}>{knob.label || knob.name}</span>
                    <div className="knob-switch">
                      <input
                        type="checkbox"
                        className="knob-switch-input"
                        checked={!!knobsState[knob.name]}
                        onChange={e => handleKnobChange(knob.name, e.target.checked)}
                      />
                      <span className="knob-switch-slider" />
                    </div>
                  </label>
                </div>
              );
            }

            if (knob.type === 'select') {
              return (
                <div className="knob-control" key={knob.name}>
                  <span className="knob-label">{knob.label || knob.name}</span>
                  <div className="knob-select-wrapper">
                    <select
                      className="knob-select"
                      value={knobsState[knob.name] as string}
                      onChange={e => handleKnobChange(knob.name, e.target.value)}
                    >
                      {knob.options.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <svg className="knob-select-arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              );
            }

            if (knob.type === 'text') {
              return (
                <div className="knob-control" key={knob.name}>
                  <span className="knob-label">{knob.label || knob.name}</span>
                  <input
                    type="text"
                    className="knob-input"
                    value={knobsState[knob.name] as string}
                    onChange={e => handleKnobChange(knob.name, e.target.value)}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Copy Toast */}
      <div className={`copy-toast ${showToast ? 'show' : ''}`}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {t.playground.copied}
      </div>
    </div>
  );
}
