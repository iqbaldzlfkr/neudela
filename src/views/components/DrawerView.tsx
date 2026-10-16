import React, { useState } from 'react';
import {
  Sliders,
  PanelRight,
  PanelLeft,
  PanelTop,
  PanelBottom,
  Play,
  User,
  ShoppingBag,
  Filter,
  CheckCircle2,
  X,
  Check,
  Layers,
  Sparkles,
  Box,
} from 'lucide-react';
import NeuronDrawer, {
  DrawerPlacement,
  DrawerSize,
  DrawerVariant,
  DrawerBackdropVariant,
} from '../components/NeuronDrawer';
import NeuronButton from '../components/NeuronButton';
import NeuronBadge from '../components/NeuronBadge';
import NeuronInput from '../components/NeuronInput';
import NeuronToggle from '../components/NeuronToggle';
import Playground from '../components/Playground';
import NextPrevious from '../components/NextPrevious';
import { useLanguage } from '../context/LanguageContext';

interface DrawerViewProps {
  setActiveTab: (tabId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule Card (Do / Don't)
// ─────────────────────────────────────────────────────────────────────────────
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
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Anatomy Label
// ─────────────────────────────────────────────────────────────────────────────
function AnatomyLabel({ number, label, desc }: { number: number; label: string; desc: string }) {
  return (
    <div className="anatomy-label">
      <span className="anatomy-number">{number}</span>
      <div>
        <div className="anatomy-label-name">{label}</div>
        <div className="anatomy-label-desc">{desc}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Placement Visual Card
// ─────────────────────────────────────────────────────────────────────────────
function DrawerPlacementCard({
  placement,
  title,
  badgeText,
  badgeVariant = 'default',
  desc,
  buttonText,
  isRecommended = false,
  onTest,
}: {
  placement: DrawerPlacement;
  title: string;
  badgeText: string;
  badgeVariant?: 'brand' | 'default' | 'success' | 'warning';
  desc: string;
  buttonText: string;
  isRecommended?: boolean;
  onTest: () => void;
}) {
  return (
    <div
      style={{
        padding: 'var(--space-5)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        boxShadow: 'var(--shadow-xs)',
        transition: 'border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease',
      }}
    >
      {/* Mini Viewport Graphic */}
      <div
        style={{
          height: '104px',
          width: '100%',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--color-border)',
          background: 'var(--color-bg-subtle)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simulated background host lines */}
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            opacity: 0.22,
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: '45%', height: '5px', background: 'var(--color-text-primary)', borderRadius: '2px' }} />
          <div style={{ width: '70%', height: '4px', background: 'var(--color-text-secondary)', borderRadius: '2px' }} />
          <div style={{ width: '55%', height: '4px', background: 'var(--color-text-secondary)', borderRadius: '2px' }} />
        </div>

        {/* Dimmed backdrop scrim simulation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.2)',
            pointerEvents: 'none',
          }}
        />

        {/* Slide-over panel representation based on placement */}
        {placement === 'right' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '45%',
              background: 'var(--color-bg-surface)',
              borderLeft: '2px solid var(--brand-500)',
              boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6px',
              gap: '4px',
            }}
          >
            <div style={{ width: '60%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            <div style={{ width: '85%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ width: '70%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
          </div>
        )}

        {placement === 'left' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '45%',
              background: 'var(--color-bg-surface)',
              borderRight: '2px solid var(--brand-500)',
              boxShadow: '4px 0 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6px',
              gap: '4px',
            }}
          >
            <div style={{ width: '60%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            <div style={{ width: '85%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ width: '70%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
          </div>
        )}

        {placement === 'bottom' && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '54%',
              background: 'var(--color-bg-surface)',
              borderTop: '2px solid var(--brand-500)',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6px 10px',
              gap: '4px',
            }}
          >
            <div style={{ width: '18px', height: '2px', background: 'var(--color-border)', borderRadius: '2px', margin: '0 auto 2px' }} />
            <div style={{ width: '45%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            <div style={{ width: '75%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
          </div>
        )}

        {placement === 'top' && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '54%',
              background: 'var(--color-bg-surface)',
              borderBottom: '2px solid var(--brand-500)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6px 10px',
              gap: '4px',
            }}
          >
            <div style={{ width: '45%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            <div style={{ width: '75%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
          </div>
        )}
      </div>

      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {placement === 'right' && <PanelRight size={17} style={{ color: 'var(--brand-600)' }} />}
          {placement === 'left' && <PanelLeft size={17} style={{ color: 'var(--brand-600)' }} />}
          {placement === 'bottom' && <PanelBottom size={17} style={{ color: 'var(--brand-600)' }} />}
          {placement === 'top' && <PanelTop size={17} style={{ color: 'var(--brand-600)' }} />}
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            {title}
          </span>
        </div>
        <NeuronBadge variant={badgeVariant} size="xs">
          {badgeText}
        </NeuronBadge>
      </div>

      {/* Prop Tag */}
      <div>
        <code
          style={{
            fontSize: '11px',
            padding: '2px 7px',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontFamily: 'monospace',
          }}
        >
          placement="{placement}"
        </code>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '12.5px',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {desc}
      </p>

      {/* Test Action */}
      <NeuronButton
        size="sm"
        variant={isRecommended ? 'primary' : 'outline'}
        onClick={onTest}
        style={{ width: '100%', marginTop: 'auto' }}
      >
        <Play size={12} style={{ marginRight: 6 }} />
        {buttonText}
      </NeuronButton>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant Visual Card
// ─────────────────────────────────────────────────────────────────────────────
function DrawerVariantCard({
  variant,
  title,
  badgeText,
  badgeVariant = 'default',
  desc,
  features = [],
  buttonText,
  isRecommended = false,
  onTest,
}: {
  variant: DrawerVariant;
  title: string;
  badgeText: string;
  badgeVariant?: 'brand' | 'default' | 'success' | 'warning';
  desc: string;
  features?: string[];
  buttonText: string;
  isRecommended?: boolean;
  onTest: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 'var(--space-5)',
        borderRadius: 'var(--radius-xl)',
        border: isHovered ? '1px solid var(--brand-400)' : '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Mini Viewport Graphic */}
      <div
        style={{
          height: '112px',
          width: '100%',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--color-border)',
          background: 'var(--color-bg-subtle)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simulated background host lines */}
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            opacity: 0.22,
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: '45%', height: '5px', background: 'var(--color-text-primary)', borderRadius: '2px' }} />
          <div style={{ width: '70%', height: '4px', background: 'var(--color-text-secondary)', borderRadius: '2px' }} />
          <div style={{ width: '55%', height: '4px', background: 'var(--color-text-secondary)', borderRadius: '2px' }} />
        </div>

        {/* Dimmed backdrop scrim simulation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.2)',
            pointerEvents: 'none',
          }}
        />

        {/* Variant: default (Flush Edge, 0 margins, clean border) */}
        {variant === 'default' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '48%',
              background: 'var(--color-bg-surface)',
              borderLeft: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '8px',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <div style={{ width: '52%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-border)' }} />
            </div>
            <div style={{ width: '85%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ width: '68%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '18px', height: '5px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            </div>
          </div>
        )}

        {/* Variant: elevated (Flush Edge, high-contrast layered shadow) */}
        {variant === 'elevated' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '48%',
              background: 'var(--color-bg-surface)',
              borderLeft: '1px solid var(--color-border)',
              boxShadow: '-10px 0 24px rgba(0, 0, 0, 0.35), -2px 0 6px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '8px',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <div style={{ width: '52%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-border)' }} />
            </div>
            <div style={{ width: '85%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ width: '68%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '18px', height: '5px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            </div>
          </div>
        )}

        {/* Variant: floating (16px inset margins, rounded 8px in mini preview) */}
        {variant === 'floating' && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              bottom: '8px',
              width: '46%',
              background: 'var(--color-bg-surface)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 8px 18px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              padding: '7px',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <div style={{ width: '52%', height: '4px', background: 'var(--brand-500)', borderRadius: '2px' }} />
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-border)' }} />
            </div>
            <div style={{ width: '85%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ width: '68%', height: '3px', background: 'var(--color-border)', borderRadius: '2px' }} />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '18px', height: '5px', background: 'var(--brand-500)', borderRadius: '2px' }} />
            </div>
          </div>
        )}
      </div>

      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {variant === 'default' && <Box size={17} style={{ color: 'var(--brand-600)' }} />}
          {variant === 'elevated' && <Layers size={17} style={{ color: 'var(--brand-600)' }} />}
          {variant === 'floating' && <Sparkles size={17} style={{ color: 'var(--brand-600)' }} />}
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text-primary)' }}>
            {title}
          </span>
        </div>
        <NeuronBadge variant={badgeVariant} size="xs">
          {badgeText}
        </NeuronBadge>
      </div>

      {/* Prop Tag */}
      <div>
        <code
          style={{
            fontSize: '11px',
            padding: '2px 7px',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontFamily: 'monospace',
          }}
        >
          variant="{variant}"
        </code>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '12.5px',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {desc}
      </p>

      {/* Features Pills */}
      {features.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '2px 0' }}>
          {features.map((feat, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              {feat}
            </span>
          ))}
        </div>
      )}

      {/* Test Action */}
      <NeuronButton
        size="sm"
        variant={isRecommended ? 'primary' : 'outline'}
        onClick={onTest}
        style={{ width: '100%', marginTop: 'auto' }}
      >
        <Play size={12} style={{ marginRight: 6 }} />
        {buttonText}
      </NeuronButton>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Size Guide Row
// ─────────────────────────────────────────────────────────────────────────────
function DrawerSizeGuideRow({
  size: _size,
  label,
  dimension,
  usage,
  isDefault = false,
  onTest,
}: {
  size: DrawerSize;
  label: string;
  dimension: string;
  usage: string;
  isDefault?: boolean;
  onTest: () => void;
}) {
  return (
    <div className="size-guide-row" style={{ gridTemplateColumns: '320px 1fr' }}>
      <div className="size-guide-preview" style={{ padding: '8px 12px', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '10px 14px',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PanelRight size={16} style={{ color: 'var(--brand-600)' }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>{label}</span>
          </div>
          <NeuronButton size="xs" variant="outline" onClick={onTest}>
            <Play size={11} style={{ marginRight: 4 }} />
            Preview
          </NeuronButton>
        </div>
      </div>
      <div className="size-guide-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <span className="size-guide-name" style={{ margin: 0 }}>
            {label}
          </span>
          {isDefault && (
            <span
              style={{
                fontSize: '10px',
                padding: '2px 8px',
                background: 'rgba(223, 126, 48, 0.12)',
                color: 'var(--brand-600, #df7e30)',
                borderRadius: 'var(--radius-full, 999px)',
                fontWeight: 600,
                border: '1px solid rgba(223, 126, 48, 0.25)',
              }}
            >
              Default
            </span>
          )}
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm, 6px)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'monospace',
            }}
          >
            {dimension}
          </span>
        </div>
        <div className="size-guide-usage">{usage}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Enterprise Pattern Card
// ─────────────────────────────────────────────────────────────────────────────
function DrawerEnterprisePatternCard({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  badgeText,
  badgeVariant = 'default',
  propsTag,
  desc,
  capabilities = [],
  buttonText,
  isPrimaryButton = false,
  onLaunch,
  previewGraphic,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeVariant?: 'brand' | 'default' | 'success' | 'warning';
  propsTag: string;
  desc: string;
  capabilities?: string[];
  buttonText: string;
  isPrimaryButton?: boolean;
  onLaunch: () => void;
  previewGraphic: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: 'var(--space-5)',
        borderRadius: 'var(--radius-xl)',
        border: isHovered ? '1px solid var(--brand-400)' : '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-lg)',
              background: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
              {title}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '1px' }}>
              {subtitle}
            </div>
          </div>
        </div>
        <NeuronBadge variant={badgeVariant} size="xs">
          {badgeText}
        </NeuronBadge>
      </div>

      {/* Mini Viewport Simulation */}
      <div
        style={{
          height: '118px',
          width: '100%',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--color-border)',
          background: 'var(--color-bg-subtle)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {previewGraphic}
      </div>

      {/* Prop Tag */}
      <div>
        <code
          style={{
            fontSize: '11px',
            padding: '2px 7px',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-primary)',
            fontFamily: 'monospace',
          }}
        >
          {propsTag}
        </code>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '12.5px',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {desc}
      </p>

      {/* Capabilities Pills */}
      {capabilities.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '2px 0' }}>
          {capabilities.map((cap, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              {cap}
            </span>
          ))}
        </div>
      )}

      {/* Launch CTA */}
      <NeuronButton
        size="sm"
        variant={isPrimaryButton ? 'primary' : 'outline'}
        onClick={onLaunch}
        style={{ width: '100%', marginTop: 'auto' }}
      >
        <Play size={12} style={{ marginRight: 6 }} />
        {buttonText}
      </NeuronButton>
    </div>
  );
}

export default function DrawerView({ setActiveTab }: DrawerViewProps) {
  const { t, language } = useLanguage();
  const isId = language === 'id';
  const gl = t.drawer?.guideline;

  // Tab State
  const [activeTab, setTab] = useState<'guideline' | 'playbook'>('guideline');

  // Live Test Drawers for Guideline Tab
  const [livePlacementDrawer, setLivePlacementDrawer] = useState<DrawerPlacement | null>(null);
  const [liveVariantDrawer, setLiveVariantDrawer] = useState<DrawerVariant | null>(null);
  const [liveSizeDrawer, setLiveSizeDrawer] = useState<DrawerSize | null>(null);
  const [liveBackdropDrawer, setLiveBackdropDrawer] = useState<DrawerBackdropVariant | null>(null);

  // Playground Live Drawer
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  // Scenario Drawers
  const [scenarioProfileOpen, setScenarioProfileOpen] = useState(false);
  const [scenarioOrderOpen, setScenarioOrderOpen] = useState(false);
  const [scenarioFilterOpen, setScenarioFilterOpen] = useState(false);

  // Scenario Profile Form State
  const [profileName, setProfileName] = useState('Sarah Jenkins');
  const [profileEmail, setProfileEmail] = useState('s.jenkins@neudela.enterprise');
  const [profileRole, setProfileRole] = useState('Lead Product Designer');
  const [profileMfa, setProfileMfa] = useState(true);
  const [profileApiAccess, setProfileApiAccess] = useState(false);

  // Scenario Filter State
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState(250);
  const [filterInStockOnly, setFilterInStockOnly] = useState(true);

  return (
    <div className="component-view">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <span className="page-category-label">{t.nav.componentsSection}</span>
            <h1 className="page-title">{t.drawer?.pageTitle || 'Drawer'}</h1>
            <p className="page-subtitle">
              {t.drawer?.pageSubtitle ||
                'Slide-over edge panels for secondary workflows, deep property inspection, multi-step editing, and contextual utilities while preserving primary page awareness.'}
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="comp-tab-bar">
          <button
            type="button"
            className={`comp-tab ${activeTab === 'guideline' ? 'active' : ''}`}
            onClick={() => setTab('guideline')}
          >
            {gl?.tabName || (isId ? 'Panduan' : 'Guideline')}
          </button>
          <button
            type="button"
            className={`comp-tab ${activeTab === 'playbook' ? 'active' : ''}`}
            onClick={() => setTab('playbook')}
          >
            {gl?.playbookTabName || 'Playbook'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1 – GUIDELINE
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'guideline' && (
        <div className="tab-content">
          {/* ── 1. Component Anatomy ── */}
          <div className="section-card">
            <h2 className="section-title">{gl?.anatomyTitle || '1. Component Anatomy'}</h2>
            <p className="section-description">
              {gl?.anatomyDesc ||
                'Engineered with sticky header/footer zones, fluid scrollable body, focus trapping, and responsive viewport adaptations.'}
            </p>

            <div className="anatomy-diagram">
              {/* Visual Blueprint / Mock Frame */}
              <div
                className="anatomy-preview"
                style={{
                  minHeight: '440px',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Viewport Simulation Frame (Blueprint Canvas) */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '460px',
                    height: '390px',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px dashed var(--color-border)',
                    background: 'var(--color-bg-surface)',
                    boxShadow: 'var(--shadow-xs)',
                    overflow: 'hidden',
                    display: 'flex',
                  }}
                >
                  {/* Host Page (Simulated Background Content behind backdrop) */}
                  <div
                    style={{
                      flex: 1,
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      opacity: 0.3,
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ height: '14px', width: '50%', background: 'var(--color-border)', borderRadius: '4px' }} />
                    <div style={{ height: '8px', width: '80%', background: 'var(--color-border)', borderRadius: '4px' }} />
                    <div style={{ height: '8px', width: '70%', background: 'var(--color-border)', borderRadius: '4px' }} />
                    <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ height: '48px', background: 'var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                      <div style={{ height: '48px', background: 'var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    </div>
                  </div>

                  {/* 2. Backdrop Overlay Scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(15, 23, 42, 0.45)',
                      backdropFilter: 'blur(2px)',
                      zIndex: 2,
                    }}
                  >
                    {/* Marker 2: Backdrop Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '42%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        zIndex: 10,
                      }}
                    >
                      <span className="anatomy-marker">2</span>
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--slate-800)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        {isId ? 'Lapisan Latar' : 'Backdrop Scrim'}
                      </span>
                    </div>
                  </div>

                  {/* 1. Edge Panel Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '290px',
                      height: '100%',
                      background: 'var(--color-bg-surface)',
                      borderLeft: '1px solid var(--color-border)',
                      boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.16)',
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 4,
                      flexShrink: 0,
                    }}
                  >
                    {/* Marker 1: Edge Panel Container */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '-12px',
                        zIndex: 20,
                      }}
                    >
                      <span className="anatomy-marker" title="Edge Panel Container">
                        1
                      </span>
                    </div>

                    {/* Header */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        background: 'var(--color-bg-surface)',
                        position: 'relative',
                      }}
                    >
                      {/* Leading Icon + Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative' }}>
                          <span
                            className="anatomy-marker"
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              left: '-8px',
                              zIndex: 10,
                            }}
                          >
                            3
                          </span>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: 'var(--radius-md)',
                              background: 'rgba(223, 126, 48, 0.12)',
                              color: 'var(--brand-600)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Sliders size={15} />
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Detail Ruang Kerja' : 'Workspace Details'}
                          </div>
                          <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                            {isId ? 'Konfigurasi tim' : 'Team configuration'}
                          </div>
                        </div>
                      </div>

                      {/* Header Actions & Close Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Marker 4: Header Actions Slot */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <span
                            className="anatomy-marker"
                            style={{
                              position: 'absolute',
                              top: '-10px',
                              left: '-8px',
                              zIndex: 10,
                            }}
                          >
                            4
                          </span>
                          <NeuronBadge size="xs" variant="brand">
                            {isId ? 'Opsi' : 'Action'}
                          </NeuronBadge>
                        </div>

                        {/* Marker 5: Close Button */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <span
                            className="anatomy-marker"
                            style={{
                              position: 'absolute',
                              top: '-10px',
                              right: '-8px',
                              zIndex: 10,
                            }}
                          >
                            5
                          </span>
                          <button
                            type="button"
                            className="neuron-drawer__close-btn"
                            style={{
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-sm)',
                              background: 'transparent',
                              color: 'var(--color-text-secondary)',
                              cursor: 'default',
                              pointerEvents: 'none',
                            }}
                            aria-label="Close"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable Body Content */}
                    <div
                      style={{
                        flex: 1,
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        background: 'var(--color-bg-surface)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--color-bg-subtle)',
                          border: '1px dashed var(--color-border)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span className="anatomy-marker">6</span>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {isId ? 'Area Konten Gulir (Body)' : 'Scrollable Body Area'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ height: '8px', width: '90%', background: 'var(--color-border)', borderRadius: '4px' }} />
                          <div style={{ height: '8px', width: '70%', background: 'var(--color-border)', borderRadius: '4px' }} />
                          <div style={{ height: '8px', width: '80%', background: 'var(--color-border)', borderRadius: '4px' }} />
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-border)',
                          background: 'var(--color-bg-surface)',
                          fontSize: '11px',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{isId ? 'SSO Enterprise' : 'Enterprise SSO'}</span>
                        <NeuronBadge size="xs" variant="success">
                          {isId ? 'Aktif' : 'Active'}
                        </NeuronBadge>
                      </div>
                    </div>

                    {/* Sticky Footer Action Bar */}
                    <div
                      style={{
                        padding: '12px 16px',
                        borderTop: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--color-bg-surface)',
                        position: 'relative',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="anatomy-marker">7</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          {isId ? 'Bilah Aksi' : 'Action Bar'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <NeuronButton size="xs" variant="outline">
                          {isId ? 'Batal' : 'Cancel'}
                        </NeuronButton>
                        <NeuronButton size="xs" variant="primary">
                          {isId ? 'Simpan' : 'Save'}
                        </NeuronButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anatomy Descriptions */}
              <div className="anatomy-labels">
                <AnatomyLabel
                  number={1}
                  label={isId ? 'Edge Panel Container' : 'Edge Panel Container'}
                  desc={
                    isId
                      ? 'Panel bergeser dari tepi layar dengan lebar/tinggi terukur dan elevasi bayangan modern.'
                      : 'Fixed container anchored to any of the 4 viewport edges with transition curves.'
                  }
                />
                <AnatomyLabel
                  number={2}
                  label={isId ? 'Backdrop Overlay' : 'Backdrop Overlay'}
                  desc={
                    isId
                      ? 'Lapisan latar redup atau kaca buram untuk memusatkan fokus pengguna dan menangani klik luar.'
                      : 'Scrim overlay blocking background interactions and supporting dismiss on click.'
                  }
                />
                <AnatomyLabel
                  number={3}
                  label={isId ? 'Header & Leading Icon' : 'Header & Leading Icon'}
                  desc={
                    isId
                      ? 'Judul dan sub-deskripsi kontekstual disertai ikon visual penjelas tugas.'
                      : 'Prominent headline, optional supporting subtitle, and branded leading icon.'
                  }
                />
                <AnatomyLabel
                  number={4}
                  label={isId ? 'Header Actions Slot' : 'Header Actions Slot'}
                  desc={
                    isId
                      ? 'Slot opsional di samping tombol close untuk aksi utilitas, status badge, atau tautan bantuan.'
                      : 'Flexible slot for secondary toolbar controls, status badges, or documentation links.'
                  }
                />
                <AnatomyLabel
                  number={5}
                  label={isId ? 'Close Button [✕]' : 'Close Button [✕]'}
                  desc={
                    isId
                      ? 'Tombol penutup eksplisit dengan dukungan tombol Escape keyboard.'
                      : 'Accessible close trigger with auto-dismiss and keyboard Escape binding.'
                  }
                />
                <AnatomyLabel
                  number={6}
                  label={isId ? 'Scrollable Body Content' : 'Scrollable Body Content'}
                  desc={
                    isId
                      ? 'Area konten independen dengan overflow vertikal aman dari pemotongan layar.'
                      : 'Fluid body container preserving scroll state independently from page background.'
                  }
                />
                <AnatomyLabel
                  number={7}
                  label={isId ? 'Sticky Footer Action Bar' : 'Sticky Footer Action Bar'}
                  desc={
                    isId
                      ? 'Bilah tombol aksi tetap di dasar drawer sehingga Simpan/Batal selalu terjangkau.'
                      : 'Persistent bottom action zone ensuring primary CTAs remain visible at all times.'
                  }
                />
              </div>
            </div>
          </div>

          {/* ── 2. Placements & Anchor Directions ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.placementsTitle || '2. Placements & Anchor Directions'}
            </h2>
            <p className="section-description">
              {gl?.placementsDesc ||
                'Four edge anchor options to match reading directions, mobile habits, and information architecture.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-4)',
              }}
            >
              <DrawerPlacementCard
                placement="right"
                title={t.drawer?.right || 'Right (Standard)'}
                badgeText={isId ? 'Rekomendasi' : 'Recommended'}
                badgeVariant="brand"
                isRecommended
                desc={
                  isId
                    ? 'Posisi default paling ideal untuk desktop: penyuntingan profil, inspeksi data baris tabel, dan panel filter analitik.'
                    : 'The standard slide-over for desktop. Ideal for table row inspections, multi-field edit forms, and contextual filter facets.'
                }
                buttonText={isId ? 'Uji Posisi Kanan' : 'Test Right Drawer'}
                onTest={() => setLivePlacementDrawer('right')}
              />

              <DrawerPlacementCard
                placement="left"
                title={t.drawer?.left || 'Left (Navigation)'}
                badgeText={isId ? 'Navigasi' : 'Nav & Trees'}
                badgeVariant="default"
                desc={
                  isId
                    ? 'Sesuai arah baca kiri-ke-kanan untuk menu navigasi bertingkat, penjelajah pohon berkas, atau bilah samping sekunder.'
                    : 'Natural for left-to-right reading: multi-level navigation trees, directory explorers, and secondary sidebar workflows.'
                }
                buttonText={isId ? 'Uji Posisi Kiri' : 'Test Left Drawer'}
                onTest={() => setLivePlacementDrawer('left')}
              />

              <DrawerPlacementCard
                placement="bottom"
                title={t.drawer?.bottom || 'Bottom (Sheet)'}
                badgeText={isId ? 'Layar Sentuh' : 'Mobile First'}
                badgeVariant="success"
                desc={
                  isId
                    ? 'Paling ergonomis untuk perangkat layar sentuh & mobile: bottom sheet pemilih opsi, aksi bagikan, atau checkout ringkas.'
                    : 'Ergonomic for touch and mobile viewports: action sheets, share menus, media controls, and compact picker interfaces.'
                }
                buttonText={isId ? 'Uji Posisi Bawah' : 'Test Bottom Sheet'}
                onTest={() => setLivePlacementDrawer('bottom')}
              />

              <DrawerPlacementCard
                placement="top"
                title={t.drawer?.top || 'Top (Broadcast)'}
                badgeText={isId ? 'Pengumuman' : 'Broadcast'}
                badgeVariant="default"
                desc={
                  isId
                    ? 'Panel geser dari atas untuk pengumuman sistem krusial, bilah pencarian universal (Ctrl+K), atau konsol notifikasi.'
                    : 'Drops down from viewport top for critical system broadcasts, global command palettes (Ctrl+K), or notification consoles.'
                }
                buttonText={isId ? 'Uji Posisi Atas' : 'Test Top Drawer'}
                onTest={() => setLivePlacementDrawer('top')}
              />
            </div>
          </div>

          {/* ── 3. Visual Style Variants ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.variantsTitle || (isId ? '3. Gaya Visual Varian' : '3. Visual Variants')}
            </h2>
            <p className="section-description">
              {gl?.variantsDesc ||
                (isId
                  ? 'Tiga perlakuan permukaan mulai dari panel tepi penuh hingga kartu mengambang modern dengan sudut membulat.'
                  : 'Three surface treatments ranging from full-height flush borders to modern floating cards with inset padding.')}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-4)',
              }}
            >
              <DrawerVariantCard
                variant="default"
                title={t.drawer?.defaultVariant || (isId ? 'Tepi Standar (Default)' : 'Default Edge')}
                badgeText={isId ? 'Standar' : 'Standard'}
                badgeVariant="default"
                desc={
                  isId
                    ? 'Panel menempel rata dengan batas layar viewport (flush-edge), memprioritaskan ruang kerja maksimum untuk formulir dan alur kerja analitik.'
                    : 'Flush against viewport edges with zero outer margin, maximizing available screen real estate for enterprise dashboards and dense forms.'
                }
                features={
                  isId
                    ? ['0px Margin (Flush)', 'Sudut Tegak (0px)', 'Ruang Kerja Maksimal']
                    : ['0px Margin (Flush)', 'Square Edge (0px)', 'Max Screen Real Estate']
                }
                buttonText={isId ? 'Uji Default Edge' : 'Preview Default'}
                onTest={() => setLiveVariantDrawer('default')}
              />

              <DrawerVariantCard
                variant="elevated"
                title={t.drawer?.elevatedVariant || (isId ? 'Bayangan Tinggi (Elevated)' : 'Elevated Shadow')}
                badgeText={isId ? 'Kontras Tinggi' : 'High Contrast'}
                badgeVariant="brand"
                desc={
                  isId
                    ? 'Gradasi bayangan multi-lapis yang tegas untuk memisahkan fokus kerja secara menonjol di atas kanvas data yang padat.'
                    : 'Deep multi-layered shadows creating a prominent visual hierarchy above crowded data tables, charts, and canvases.'
                }
                features={
                  isId
                    ? ['Bayangan Dalam 50px', '0px Margin (Flush)', 'Fokus Hierarki Kuat']
                    : ['Multi-Tier 50px Shadow', '0px Margin (Flush)', 'High-Contrast Depth']
                }
                buttonText={isId ? 'Uji Elevated' : 'Preview Elevated'}
                onTest={() => setLiveVariantDrawer('elevated')}
              />

              <DrawerVariantCard
                variant="floating"
                title={t.drawer?.floatingVariant || (isId ? 'Pulau Mengambang (Floating)' : 'Floating Island')}
                badgeText={isId ? 'Direkomendasikan' : 'Modern Touch'}
                badgeVariant="success"
                isRecommended
                desc={
                  isId
                    ? 'Panel mengambang elegan dengan margin inset 16px dari tepi layar dan sudut membulat (radius 16px), menghadirkan kesan modern ala macOS & iPadOS.'
                    : 'Detached floating sheet with 16px viewport insets and rounded corners (radius-2xl), offering a refined, tactile macOS/iPadOS experience.'
                }
                features={
                  isId
                    ? ['Margin Inset 16px', 'Radius Membulat 16px', 'Estetika Modern Apple']
                    : ['16px Viewport Inset', '16px Rounded Radius', 'Modern Island Feel']
                }
                buttonText={isId ? 'Uji Floating Island' : 'Preview Floating'}
                onTest={() => setLiveVariantDrawer('floating')}
              />
            </div>

            {/* Variant Comparison & Technical Specs Matrix */}
            <div
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} style={{ color: 'var(--brand-600)' }} />
                  <span style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--color-text-primary)' }}>
                    {isId ? 'Matriks Komparasi Karakteristik Gaya Visual' : 'Visual Variant Comparison Matrix'}
                  </span>
                </div>
                <NeuronBadge size="xs" variant="default">
                  {isId ? '3 Perlakuan Permukaan' : '3 Surface Treatments'}
                </NeuronBadge>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 'var(--space-2)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                      <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Varian' : 'Variant'}
                      </th>
                      <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Jarak Tepi (Margin)' : 'Viewport Margin'}
                      </th>
                      <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Sudut Lengkung (Radius)' : 'Border Radius'}
                      </th>
                      <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Kedalaman Bayangan (Shadow)' : 'Elevation Shadow'}
                      </th>
                      <th style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Konteks Rekomendasi' : 'Recommended Use Cases'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '11px 12px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Box size={14} style={{ color: 'var(--color-text-secondary)' }} />
                          <code>default</code>
                        </div>
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>0px</code> {isId ? '(Tepi layar penuh / Flush)' : '(Flush viewport edge)'}
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>0px</code> {isId ? '(Sudut persegi tegak lurus)' : '(Square flush edge)'}
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Bayangan ambien standar' : 'Standard ambient shadow'}
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-primary)' }}>
                        {isId
                          ? 'Formulir berdensitas tinggi, penyuntingan data baris tabel, alur kerja stepper bertahap.'
                          : 'High-density enterprise forms, data table record inspection, and multi-step wizard flows.'}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '11px 12px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Layers size={14} style={{ color: 'var(--brand-600)' }} />
                          <code>elevated</code>
                        </div>
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>0px</code> {isId ? '(Tepi layar penuh / Flush)' : '(Flush viewport edge)'}
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>0px</code> {isId ? '(Sudut persegi tegak lurus)' : '(Square flush edge)'}
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>0 25px 50px -12px rgba(15, 23, 42, 0.25)</code>
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-primary)' }}>
                        {isId
                          ? 'Kanvas grafis, bagan visual padat, diagram alir, atau antarmuka dengan banyak elemen latar.'
                          : 'Dense interactive charts, canvas editors, mapping tools, and data-dense dashboards.'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '11px 12px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Sparkles size={14} style={{ color: 'var(--color-success-text)' }} />
                          <code>floating</code>
                        </div>
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>16px</code> {isId ? '(Margin inset / calc(100% - 32px))' : '(16px inset / calc(100% - 32px))'}
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>var(--radius-2xl)</code> (16px)
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-secondary)' }}>
                        <code>0 20px 40px -8px rgba(15, 23, 42, 0.2)</code>
                      </td>
                      <td style={{ padding: '11px 12px', color: 'var(--color-text-primary)' }}>
                        {isId
                          ? 'Dialog aksi sekunder, pemilih opsi cepat, tata letak mobile-responsive, estetika modern iPadOS/macOS.'
                          : 'Secondary confirmation sheets, quick action pickers, mobile-first designs, and refined macOS/iPadOS UI.'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── 4. Size Scale Guidelines ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.sizesTitle || '4. Size Scale Guidelines'}
            </h2>
            <p className="section-description">
              {gl?.sizesDesc ||
                'Five standardized width and height scales to fit content density from simple forms to complex multi-column dashboards.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <DrawerSizeGuideRow
                size="sm"
                label="Small (sm)"
                dimension="Width: 360px · Height: 260px"
                usage={
                  isId
                    ? 'Inspeksi ringkas, filter satu kolom, panel riwayat log sederhana, atau pemilih status cepat.'
                    : 'Single-column filters, quick detail inspections, activity feeds, or compact status pickers.'
                }
                onTest={() => setLiveSizeDrawer('sm')}
              />
              <DrawerSizeGuideRow
                size="md"
                label="Medium (md)"
                dimension="Width: 480px · Height: 380px"
                isDefault
                usage={
                  isId
                    ? 'Ukuran default standar untuk 80% kebutuhan aplikasi: formulir pengeditan profil, konfigurasi peran, dan rincian transaksi.'
                    : 'The standardized default size for 80% of workflows: user profile editing, settings, and transaction details.'
                }
                onTest={() => setLiveSizeDrawer('md')}
              />
              <DrawerSizeGuideRow
                size="lg"
                label="Large (lg)"
                dimension="Width: 640px · Height: 520px"
                usage={
                  isId
                    ? 'Alur kerja multi-kolom yang kaya data: formulir konfigurasi produk, rincian pesanan dengan tabel baris, atau perbandingan opsi.'
                    : 'Multi-column workflows, complex order fulfillment sheets with item tables, or side-by-side data compare.'
                }
                onTest={() => setLiveSizeDrawer('lg')}
              />
              <DrawerSizeGuideRow
                size="xl"
                label="Extra Large (xl)"
                dimension="Width: 860px · Height: 700px"
                usage={
                  isId
                    ? 'Dasbor analitik sekunder, tinjauan diff kode pemrograman, atau formulir bertahap (stepper wizard) yang luas.'
                    : 'Secondary analytics dashboards, visual code diff reviewers, or full multi-step wizard processes.'
                }
                onTest={() => setLiveSizeDrawer('xl')}
              />
              <DrawerSizeGuideRow
                size="full"
                label="Full Viewport (full)"
                dimension="Width: 100vw · Height: 100vh"
                usage={
                  isId
                    ? 'Mode fokus penuh imersif tanpa distraksi: editor dokumen kaya, tinjauan berkas PDF, atau manajemen data massal.'
                    : 'Immersive distraction-free full-screen takeovers: rich markdown editors, PDF viewers, or batch operations.'
                }
                onTest={() => setLiveSizeDrawer('full')}
              />
            </div>
          </div>

          {/* ── 5. Backdrop Options ── */}
          <div className="section-card">
            <h2 className="section-title">
              {gl?.backdropTitle || '5. Backdrop Overlay Treatments'}
            </h2>
            <p className="section-description">
              {gl?.backdropDesc ||
                'Choose dimmed contrast, frosted glass blur, or transparent non-modal focus depending on user task continuity.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: 4 }}>
                  {t.drawer?.dimmedBackdrop || 'Dimmed Overlay'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
                  {isId
                    ? 'Latar belakang hitam transparan 50% standar untuk kontras tajam.'
                    : 'Standard 50% dark tint for sharp contrast and visual focus.'}
                </div>
                <NeuronButton size="xs" variant="outline" onClick={() => setLiveBackdropDrawer('dimmed')}>
                  Test Dimmed
                </NeuronButton>
              </div>

              <div
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: 4 }}>
                  {t.drawer?.blurBackdrop || 'Frosted Glass Blur'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
                  {isId
                    ? 'Efek blur modern (backdrop-filter 6px) untuk tampilan premium.'
                    : 'Modern 6px backdrop blur creating a refined Apple-style depth.'}
                </div>
                <NeuronButton size="xs" variant="primary" onClick={() => setLiveBackdropDrawer('blur')}>
                  Test Frosted Blur
                </NeuronButton>
              </div>

              <div
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: 4 }}>
                  {t.drawer?.transparentBackdrop || 'Transparent / Non-modal'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
                  {isId
                    ? 'Latar belakang bening tanpa penggelapan untuk melihat data di belakangnya.'
                    : 'Clear scrim allowing users to inspect background data while drawer is open.'}
                </div>
                <NeuronButton size="xs" variant="outline" onClick={() => setLiveBackdropDrawer('transparent')}>
                  Test Transparent
                </NeuronButton>
              </div>
            </div>
          </div>

          {/* ── 6. Best Practices (Do & Don't) ── */}
          <div className="section-card">
            <h2 className="section-title">{gl?.rulesTitle || (isId ? "6. Panduan Desain (Do & Don't)" : "6. Do's and Don'ts")}</h2>
            <p className="section-description">
              {gl?.rulesDesc ||
                (isId
                  ? 'Rekomendasi praktik terbaik untuk menjaga kenyamanan interaksi dan mencegah disorientasi visual pada panel slide-over.'
                  : 'Design recommendations to maintain contextual focus and avoid visual disorientation with slide-overs.')}
            </p>

            {/* Pair 1: Sticky Footer CTAs vs In-Flow Scrolling CTAs */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-5)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    {/* Background page lines */}
                    <div style={{ position: 'absolute', top: 12, left: 10, width: '32%', display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.25 }}>
                      <div style={{ height: 4, width: '70%', background: 'var(--color-text-primary)', borderRadius: 2 }} />
                      <div style={{ height: 3, width: '100%', background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                      <div style={{ height: 3, width: '85%', background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                    </div>
                    {/* Dimmed backdrop */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.18)' }} />
                    {/* Drawer Panel */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '62%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '-6px 0 16px rgba(0,0,0,0.12)',
                      }}
                    >
                      {/* Header */}
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '48%', height: 4, background: 'var(--brand-500)', borderRadius: 2 }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-border)' }} />
                      </div>
                      {/* Body */}
                      <div style={{ padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflow: 'hidden' }}>
                        <div style={{ width: '80%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '60%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '75%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                      </div>
                      {/* Sticky Footer */}
                      <div style={{ padding: '5px 8px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 4, marginTop: 'auto' }}>
                        <div style={{ width: 22, height: 8, borderRadius: 2, background: 'var(--color-border)' }} />
                        <div style={{ width: 26, height: 8, borderRadius: 2, background: 'var(--brand-500)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? 'Sticky footer: Tombol Simpan selalu terjangkau' : 'Sticky footer: Primary CTAs always visible'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Kunci tombol aksi utama di Sticky Footer' : 'Anchor primary action buttons in a sticky footer'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Pastikan tombol Simpan dan Batal selalu terjangkau di dasar drawer meskipun konten formulirnya sangat panjang. Pengguna tidak perlu menggulir ke bawah hanya untuk menyelesaikan tugas.'
                      : 'Ensure primary confirm and cancel buttons are anchored in the sticky footer zone so users never have to hunt or scroll to commit their work.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--red-200)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    {/* Background page lines */}
                    <div style={{ position: 'absolute', top: 12, left: 10, width: '32%', display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.25 }}>
                      <div style={{ height: 4, width: '70%', background: 'var(--color-text-primary)', borderRadius: 2 }} />
                      <div style={{ height: 3, width: '100%', background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                    </div>
                    {/* Dimmed backdrop */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.18)' }} />
                    {/* Drawer Panel */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '62%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--red-200)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '48%', height: 4, background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-border)' }} />
                      </div>
                      <div style={{ padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
                        <div style={{ width: '85%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '75%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '90%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '70%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '80%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        {/* Cut-off note */}
                        <div
                          style={{
                            marginTop: 'auto',
                            padding: '3px 6px',
                            background: 'var(--red-50)',
                            border: '1px dashed var(--red-300)',
                            borderRadius: '3px',
                            color: 'var(--red-700)',
                            fontSize: '9px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                          }}
                        >
                          <span>↓ {isId ? 'Tombol terpotong di lipatan scroll' : 'Actions buried below fold'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Tombol terpotong & harus digulir' : 'Actions buried below scroll fold'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan letakkan tombol aksi di dalam alur scroll konten' : "Don't let action buttons scroll out of view"}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Menempatkan tombol aksi di akhir konten scroll memaksa pengguna menggulir hingga ke dasar hanya untuk menyimpan, dan memicu risiko form ditinggalkan tanpa tersimpan.'
                      : 'Placing action buttons inside the scrollable flow buries them below the fold, forcing unnecessary scrolling and increasing form abandonments.'}
                  </p>
                </div>
              </RuleCard>
            </div>

            {/* Pair 2: Internal Navigation & Tabs vs Stacked Drawers */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 12, left: 10, width: '32%', display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.25 }}>
                      <div style={{ height: 4, width: '70%', background: 'var(--color-text-primary)', borderRadius: 2 }} />
                      <div style={{ height: 3, width: '100%', background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.18)' }} />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '64%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '-6px 0 16px rgba(0,0,0,0.12)',
                      }}
                    >
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '48%', height: 4, background: 'var(--brand-500)', borderRadius: 2 }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-border)' }} />
                      </div>
                      {/* Internal Tabs */}
                      <div style={{ display: 'flex', gap: 3, padding: '3px 8px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                        <div style={{ padding: '2px 5px', borderRadius: 2, background: 'var(--brand-500)', color: '#fff', fontSize: '8px', fontWeight: 600 }}>Tab 1</div>
                        <div style={{ padding: '2px 5px', borderRadius: 2, background: 'transparent', color: 'var(--color-text-tertiary)', fontSize: '8px' }}>Tab 2</div>
                        <div style={{ padding: '2px 5px', borderRadius: 2, background: 'transparent', color: 'var(--color-text-tertiary)', fontSize: '8px' }}>Tab 3</div>
                      </div>
                      <div style={{ padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                        <div style={{ width: '85%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '65%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                      </div>
                      <div style={{ padding: '4px 8px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                        <div style={{ width: 22, height: 7, borderRadius: 2, background: 'var(--brand-500)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? 'Tab internal menjaga hierarki bersih' : 'Internal tabs preserve spatial hierarchy'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Gunakan tab atau akordion internal untuk alur berlapis' : 'Use internal tabs or accordions for multi-stage flows'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Ketika formulir memiliki beberapa kategori atau langkah konfigurasi, atur dengan tab horizontal atau alur wizard bertahap di dalam satu wadah drawer yang sama.'
                      : 'When workflows require multi-stage or categorized inputs, organize them with internal segmented tabs or steppers inside a single drawer container.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--red-200)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.2)' }} />
                    {/* Drawer 1 (Behind) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '75%',
                        background: 'var(--color-bg-surface)',
                        opacity: 0.6,
                        borderLeft: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '40%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-border)' }} />
                      </div>
                    </div>
                    {/* Scrim 2 */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.28)' }} />
                    {/* Drawer 2 (Stacked Front) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '50%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1.5px solid var(--red-400)',
                        boxShadow: '-8px 0 18px rgba(0,0,0,0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--red-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '45%', height: 4, background: 'var(--red-500)', borderRadius: 2 }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-400)' }} />
                      </div>
                      <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <div style={{ width: '70%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '50%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                      </div>
                      <div style={{ marginTop: 'auto', padding: '3px 6px', background: 'var(--red-50)', color: 'var(--red-700)', fontSize: '8.5px', textAlign: 'center' }}>
                        {isId ? 'Tumpukan z-index bertingkat' : 'Nested z-index collision'}
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Tumpukan drawer memicu disorientasi' : 'Stacking drawers causes disorientation'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan menumpuk drawer di atas drawer lain' : "Never stack multiple slide-over drawers"}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Membuka drawer sekunder di atas drawer aktif mengaburkan hierarki z-index, menciptakan tumpukan lapisan redup ganda, dan membingungkan arah penutupan panel.'
                      : 'Opening a second drawer on top of an active one creates chaotic z-index stacking, double dimming scrims, and severe disorientation about which panel is closing.'}
                  </p>
                </div>
              </RuleCard>
            </div>

            {/* Pair 3: 3 Exit Routes vs Trapping Users */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 12, left: 10, width: '32%', display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.25 }}>
                      <div style={{ height: 4, width: '70%', background: 'var(--color-text-primary)', borderRadius: 2 }} />
                      <div style={{ height: 3, width: '100%', background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.18)' }} />
                    {/* Escape Keyboard Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        padding: '2px 6px',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        boxShadow: 'var(--shadow-xs)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                      }}
                    >
                      <span style={{ fontFamily: 'monospace' }}>Esc</span>
                      <span style={{ fontSize: '8px', color: 'var(--color-text-tertiary)' }}>{isId ? 'Tutup' : 'Dismiss'}</span>
                    </div>
                    {/* Drawer Panel */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '62%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '-6px 0 16px rgba(0,0,0,0.12)',
                      }}
                    >
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '48%', height: 4, background: 'var(--brand-500)', borderRadius: 2 }} />
                        {/* Prominent [X] Button */}
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: '3px',
                            background: 'var(--color-bg-subtle)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          <X size={10} strokeWidth={2.5} />
                        </div>
                      </div>
                      <div style={{ padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                        <div style={{ width: '80%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '60%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                      </div>
                      <div style={{ padding: '5px 8px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                        <div style={{ padding: '1px 5px', borderRadius: 2, background: 'var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '8px', fontWeight: 500 }}>
                          {isId ? 'Batal' : 'Cancel'}
                        </div>
                        <div style={{ padding: '1px 6px', borderRadius: 2, background: 'var(--brand-500)', color: '#fff', fontSize: '8px', fontWeight: 500 }}>
                          {isId ? 'Simpan' : 'Save'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? '3 Rute keluar: (✕), Batal, Escape' : '3 Exit routes: (✕), Cancel, Escape'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Sediakan 3 rute penutup yang jelas dan ramah keyboard' : 'Provide 3 explicit, accessible dismissal routes'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Pastikan drawer selalu memiliki tombol close [✕] di pojok kanan atas, tombol Batal sekunder di footer, serta dukungan tombol Escape keyboard dan klik backdrop.'
                      : 'Always equip drawers with an explicit top [✕] button, a secondary Cancel button in the footer, and full support for keyboard Escape dismissal and backdrop clicks.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--red-200)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 12, left: 10, width: '32%', display: 'flex', flexDirection: 'column', gap: 5, opacity: 0.25 }}>
                      <div style={{ height: 4, width: '70%', background: 'var(--color-text-primary)', borderRadius: 2 }} />
                      <div style={{ height: 3, width: '100%', background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.18)' }} />
                    {/* Drawer without cancel/close */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '62%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--red-200)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '48%', height: 4, background: 'var(--color-text-secondary)', borderRadius: 2 }} />
                        <span style={{ fontSize: '8px', color: 'var(--red-600)', fontStyle: 'italic' }}>Tanpa [✕]</span>
                      </div>
                      <div style={{ padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                        <div style={{ width: '85%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '65%', height: 3, background: 'var(--color-border)', borderRadius: 2 }} />
                      </div>
                      <div style={{ padding: '5px 8px', borderTop: '1px solid var(--red-200)', background: 'var(--red-50)' }}>
                        <div style={{ width: '100%', height: 12, borderRadius: 2, background: 'var(--brand-500)', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isId ? 'Lanjutkan (Tanpa opsi Batal)' : 'Proceed (No Cancel)'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Menjebak pengguna tanpa opsi Batal' : 'Trapping users without safe abort'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan hilangkan opsi pembatalan atau menjebak pengguna' : "Don't omit cancellation options or trap users"}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Menghilangkan tombol Batal atau hanya menyediakan satu tombol aksi maju tanpa alternatif keluar menimbulkan kecemasan pengguna saat ingin membatalkan perubahan secara aman.'
                      : 'Omitting a Cancel option or disabling escape routes traps users without a safe abort path, inducing anxiety and forcing aggressive browser reloads.'}
                  </p>
                </div>
              </RuleCard>
            </div>

            {/* Pair 4: Dense Forms & Row Inspection vs Simple 1-sentence prompt */}
            <div className="rule-pair" style={{ marginTop: 'var(--space-4)' }}>
              <RuleCard type="do">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    {/* Data Table rows on left */}
                    <div style={{ position: 'absolute', top: 8, left: 8, width: '36%', display: 'flex', flexDirection: 'column', gap: 4, opacity: 0.35 }}>
                      <div style={{ height: 4, width: '60%', background: 'var(--brand-500)', borderRadius: 2 }} />
                      <div style={{ height: 10, width: '100%', background: 'var(--color-bg-subtle)', borderRadius: 2, border: '1px solid var(--color-border)' }} />
                      <div style={{ height: 10, width: '100%', background: 'var(--color-bg-subtle)', borderRadius: 2, border: '1px solid var(--color-border)' }} />
                      <div style={{ height: 10, width: '100%', background: 'var(--color-bg-subtle)', borderRadius: 2, border: '1px solid var(--color-border)' }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.15)' }} />
                    {/* Rich Inspector Drawer on right */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '58%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '-6px 0 16px rgba(0,0,0,0.12)',
                      }}
                    >
                      <div style={{ padding: '5px 8px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '50%', height: 4, background: 'var(--brand-500)', borderRadius: 2 }} />
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-border)' }} />
                      </div>
                      <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                        <div style={{ height: 8, width: '100%', background: 'var(--color-bg-subtle)', borderRadius: 2, border: '1px solid var(--color-border)' }} />
                        <div style={{ height: 8, width: '100%', background: 'var(--color-bg-subtle)', borderRadius: 2, border: '1px solid var(--color-border)' }} />
                        <div style={{ display: 'flex', gap: 3 }}>
                          <div style={{ width: 18, height: 6, borderRadius: 2, background: 'var(--brand-100)' }} />
                          <div style={{ width: 18, height: 6, borderRadius: 2, background: 'var(--emerald-100)' }} />
                        </div>
                      </div>
                      <div style={{ padding: '4px 8px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
                        <div style={{ width: 22, height: 7, borderRadius: 2, background: 'var(--brand-500)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--do">
                    <Check size={12} strokeWidth={2.5} />
                    {isId ? 'Tepat untuk inspeksi data & formulir padat' : 'Ideal for dense forms & row inspection'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Gunakan drawer untuk formulir padat & inspeksi data sekunder' : 'Use drawers for dense forms and contextual detail inspection'}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Drawer memberikan ruang vertikal tinggi tanpa kehilangan konteks halaman latar. Paling ideal untuk formulir multi-bidang, inspeksi data baris tabel, atau faset filter analitik.'
                      : 'Drawers provide generous vertical canvas space while preserving page context. Perfect for multi-field editing, row inspection sidebars, and filter facets.'}
                  </p>
                </div>
              </RuleCard>

              <RuleCard type="dont">
                <div className="modal-dodont-preview">
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '146px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--red-200)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.2)' }} />
                    {/* Massive 72% width drawer with almost nothing inside */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '72%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '1px solid var(--red-200)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                        gap: 6,
                      }}
                    >
                      <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--color-text-primary)', textAlign: 'center' }}>
                        {isId ? 'Hapus berkas ini?' : 'Delete this file?'}
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <div style={{ width: 22, height: 8, borderRadius: 2, background: 'var(--color-border)' }} />
                        <div style={{ width: 22, height: 8, borderRadius: 2, background: 'var(--red-500)' }} />
                      </div>
                      <div
                        style={{
                          marginTop: 6,
                          padding: '3px 6px',
                          background: 'var(--red-50)',
                          border: '1px dashed var(--red-300)',
                          borderRadius: '3px',
                          color: 'var(--red-700)',
                          fontSize: '8px',
                          textAlign: 'center',
                        }}
                      >
                        {isId ? 'Gunakan Dialog Modal di tengah!' : 'Use a centered Modal dialog!'}
                      </div>
                    </div>
                  </div>
                  <div className="modal-dodont-tag modal-dodont-tag--dont">
                    <X size={12} strokeWidth={2.5} />
                    {isId ? 'Drawer terlalu berat untuk alert 1 baris' : 'Drawer too heavy for simple binary prompt'}
                  </div>
                </div>
                <div className="rule-card__text">
                  <div className="rule-card__title">
                    {isId ? 'Jangan gunakan drawer besar untuk konfirmasi Ya/Tidak mini' : "Don't use slide-overs for simple yes/no prompts"}
                  </div>
                  <p className="rule-card__desc">
                    {isId
                      ? 'Untuk pertanyaan biner 1 kalimat (misal: "Hapus item ini?"), gunakan Dialog Modal di tengah layar. Drawer tepi terasa terlalu berat dan berlebihan untuk tugas sesingkat itu.'
                      : 'For quick binary questions or deletion alerts, a centered Modal dialog is far more ergonomic. A full-height slide-over is disproportionately heavy for a one-sentence prompt.'}
                  </p>
                </div>
              </RuleCard>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2 – PLAYBOOK
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'playbook' && (
        <div className="tab-content">
          {/* ── 1. Interactive Playground ── */}
          <div className="section-card">
            <h2 className="section-title">Interactive Playground</h2>
            <p className="section-description">
              {isId
                ? 'Kustomisasi arah penempatan, varian gaya, skala ukuran, dan lapisan latar secara langsung. Salin kode siap pakai untuk React, Vue 3, atau HTML/CSS.'
                : 'Customize placement directions, visual styles, sizes, and backdrop overlays in real time. Copy production-ready code for React, Vue 3, or HTML/CSS.'}
            </p>

            <Playground
              name="NeuronDrawer"
              defaultTab="react"
              knobs={[
                {
                  name: 'placement',
                  type: 'select',
                  options: ['right', 'left', 'top', 'bottom'],
                  default: 'right',
                  label: isId ? 'Arah Penempatan' : 'Placement Direction',
                },
                {
                  name: 'size',
                  type: 'select',
                  options: ['sm', 'md', 'lg', 'xl', 'full'],
                  default: 'md',
                  label: isId ? 'Skala Ukuran' : 'Size Scale',
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: ['default', 'elevated', 'floating'],
                  default: 'default',
                  label: isId ? 'Gaya Permukaan' : 'Style Variant',
                },
                {
                  name: 'backdropVariant',
                  type: 'select',
                  options: ['dimmed', 'blur', 'transparent'],
                  default: 'blur',
                  label: isId ? 'Gaya Backdrop' : 'Backdrop Style',
                },
                {
                  name: 'title',
                  type: 'text',
                  default: 'Edit Workspace Configuration',
                  label: isId ? 'Judul' : 'Title',
                },
                {
                  name: 'description',
                  type: 'text',
                  default: 'Manage API tokens, enterprise SSO, and team roles.',
                  label: isId ? 'Deskripsi' : 'Description',
                },
                {
                  name: 'showCloseButton',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Tombol Tutup [✕]' : 'Show Close Button',
                },
                {
                  name: 'closeOnBackdrop',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Tutup Saat Klik Backdrop' : 'Close on Backdrop Click',
                },
                {
                  name: 'closeOnEscape',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Tutup dengan Tombol Esc' : 'Close on Escape Key',
                },
                {
                  name: 'showFooter',
                  type: 'boolean',
                  default: true,
                  label: isId ? 'Tampilkan Footer' : 'Show Footer Actions',
                },
                {
                  name: 'confirmText',
                  type: 'text',
                  default: 'Save Changes',
                  label: isId ? 'Teks Konfirmasi' : 'Confirm Button Text',
                  condition: (s) => !!s.showFooter,
                },
                {
                  name: 'cancelText',
                  type: 'text',
                  default: 'Cancel',
                  label: isId ? 'Teks Batal' : 'Cancel Button Text',
                  condition: (s) => !!s.showFooter,
                },
              ]}
              codeTemplates={(knobs) => {
                const placement = knobs.placement as DrawerPlacement;
                const size = knobs.size as DrawerSize;
                const variant = knobs.variant as DrawerVariant;
                const backdropVariant = knobs.backdropVariant as DrawerBackdropVariant;
                const title = knobs.title as string;
                const description = knobs.description as string;
                const showCloseButton = !!knobs.showCloseButton;
                const closeOnBackdrop = !!knobs.closeOnBackdrop;
                const closeOnEscape = !!knobs.closeOnEscape;
                const showFooter = !!knobs.showFooter;
                const confirmText = (knobs.confirmText as string) || 'Save Changes';
                const cancelText = (knobs.cancelText as string) || 'Cancel';

                const reactProps: string[] = [
                  `open={isOpen}`,
                  `onClose={() => setIsOpen(false)}`,
                ];
                if (placement !== 'right') reactProps.push(`placement="${placement}"`);
                if (size !== 'md') reactProps.push(`size="${size}"`);
                if (variant !== 'default') reactProps.push(`variant="${variant}"`);
                if (backdropVariant !== 'dimmed') reactProps.push(`backdropVariant="${backdropVariant}"`);
                if (title) reactProps.push(`title="${title}"`);
                if (description) reactProps.push(`description="${description}"`);
                if (!showCloseButton) reactProps.push(`showCloseButton={false}`);
                if (!closeOnBackdrop) reactProps.push(`closeOnBackdrop={false}`);
                if (!closeOnEscape) reactProps.push(`closeOnEscape={false}`);
                if (showFooter) {
                  reactProps.push(`confirmText="${confirmText}"`);
                  reactProps.push(`cancelText="${cancelText}"`);
                  reactProps.push(`onConfirm={() => { console.log('Saved'); setIsOpen(false); }}`);
                }

                return {
                  react: `import { useState } from 'react';
import { NeuronDrawer, NeuronButton } from 'neudela';

export default function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NeuronButton variant="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </NeuronButton>

      <NeuronDrawer
        ${reactProps.join('\n        ')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>Configure contextual parameters or multi-step forms here.</p>
        </div>
      </NeuronDrawer>
    </>
  );
}`,
                  vue: `<template>
  <NeuronButton @click="isOpen = true" variant="primary">
    Open Drawer
  </NeuronButton>

  <NeuronDrawer
    :open="isOpen"
    @close="isOpen = false"
    placement="${placement}"
    size="${size}"
    variant="${variant}"
    backdropVariant="${backdropVariant}"
    title="${title}"
    description="${description}"
  >
    <p>Configure contextual parameters or multi-step forms here.</p>
  </NeuronDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NeuronDrawer, NeuronButton } from '@neudela/vue';

const isOpen = ref(false);
</script>`,
                  html: `<!-- Neudela Drawer Slide-Over (${placement}, ${size}, ${variant}) -->
<div class="neuron-drawer-root neuron-drawer-root--${placement} neuron-drawer-root--${variant} neuron-drawer-root--open">
  <div class="neuron-drawer-backdrop neuron-drawer-backdrop--${backdropVariant} neuron-drawer-backdrop--open"></div>
  <div class="neuron-drawer neuron-drawer--${placement} neuron-drawer--${size} neuron-drawer--${variant} neuron-drawer--open">
    <header class="neuron-drawer__header">
      <div class="neuron-drawer__header-main">
        <div class="neuron-drawer__header-text">
          <h2 class="neuron-drawer__title">${title}</h2>
          <p class="neuron-drawer__description">${description}</p>
        </div>
      </div>
      ${showCloseButton ? `<button type="button" class="neuron-drawer__close-btn" aria-label="Close">✕</button>` : ''}
    </header>
    <div class="neuron-drawer__body">
      <p>Configure contextual parameters or multi-step forms here.</p>
    </div>
    ${
      showFooter
        ? `<footer class="neuron-drawer__footer">
      <div class="neuron-drawer__footer-actions">
        <button type="button" class="neuron-btn neuron-btn--outline">${cancelText}</button>
        <button type="button" class="neuron-btn neuron-btn--primary">${confirmText}</button>
      </div>
    </footer>`
        : ''
    }
  </div>
</div>`,
                };
              }}
            >
              {(knobs) => {
                const placement = knobs.placement as DrawerPlacement;
                const size = knobs.size as DrawerSize;
                const variant = knobs.variant as DrawerVariant;
                const backdropVariant = knobs.backdropVariant as DrawerBackdropVariant;
                const title = knobs.title as string;
                const description = knobs.description as string;
                const showCloseButton = !!knobs.showCloseButton;
                const closeOnBackdrop = !!knobs.closeOnBackdrop;
                const closeOnEscape = !!knobs.closeOnEscape;
                const showFooter = !!knobs.showFooter;
                const confirmText = (knobs.confirmText as string) || 'Save Changes';
                const cancelText = (knobs.cancelText as string) || 'Cancel';

                return (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-6)',
                      padding: 'var(--space-4)',
                    }}
                  >
                    {/* Live Screen Trigger Button */}
                    <div
                      style={{
                        padding: '24px',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px dashed var(--color-border)',
                        background: 'var(--color-bg-subtle)',
                        width: '100%',
                        maxWidth: '520px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'rgba(223, 126, 48, 0.12)',
                          color: 'var(--brand-600)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PanelRight size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {isId ? 'Uji Drawer Nyata pada Viewport' : 'Launch Full Screen Slide-Over'}
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                          {isId
                            ? `Posisi: ${placement} · Ukuran: ${size} · Gaya: ${variant} · Backdrop: ${backdropVariant}`
                            : `Placement: ${placement} · Size: ${size} · Style: ${variant} · Scrim: ${backdropVariant}`}
                        </div>
                      </div>

                      <NeuronButton
                        variant="primary"
                        size="md"
                        onClick={() => setPlaygroundOpen(true)}
                        style={{ marginTop: 4 }}
                      >
                        <Play size={14} style={{ marginRight: 6 }} />
                        {isId ? 'Buka Live Drawer Sekarang' : 'Open Live Drawer'}
                      </NeuronButton>
                    </div>

                    {/* Full Interactive Live Drawer Instance */}
                    <NeuronDrawer
                      open={playgroundOpen}
                      onClose={() => setPlaygroundOpen(false)}
                      placement={placement}
                      size={size}
                      variant={variant}
                      backdropVariant={backdropVariant}
                      title={title}
                      description={description}
                      icon={<Sliders size={18} />}
                      showCloseButton={showCloseButton}
                      closeOnBackdrop={closeOnBackdrop}
                      closeOnEscape={closeOnEscape}
                      confirmText={showFooter ? confirmText : undefined}
                      cancelText={showFooter ? cancelText : undefined}
                      onConfirm={() => setPlaygroundOpen(false)}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div
                          style={{
                            padding: '14px 16px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-bg-subtle)',
                            border: '1px solid var(--color-border)',
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.5,
                          }}
                        >
                          🎉 <strong>Interactive Drawer Live Demo:</strong> Slide-over panel ini merespons seluruh pengaturan knob di panel samping. Coba tekan tombol <code>Esc</code> pada keyboard atau klik area luar backdrop untuk menguji perilaku dismissal.
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: 6 }}>
                            Organization Name
                          </label>
                          <NeuronInput defaultValue="Neudela Cloud Global" />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: 6 }}>
                            Environment Tier
                          </label>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <NeuronBadge variant="brand">Production</NeuronBadge>
                            <NeuronBadge variant="default">eu-central-1</NeuronBadge>
                            <NeuronBadge variant="success">Active 99.98%</NeuronBadge>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>Auto-Scale Instances</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                              Automatically scale pods based on CPU consumption
                            </div>
                          </div>
                          <NeuronToggle defaultChecked />
                        </div>
                      </div>
                    </NeuronDrawer>
                  </div>
                );
              }}
            </Playground>
          </div>

          {/* ── 2. Enterprise Real-World Scenarios ── */}
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 'var(--space-2)' }}>
              <div>
                <h2 className="section-title" style={{ margin: 0 }}>
                  {isId ? '2. Skenario Nyata Dunia Usaha (Enterprise)' : '2. Real-World Enterprise Patterns'}
                </h2>
                <p className="section-description" style={{ margin: '6px 0 0 0' }}>
                  {isId
                    ? 'Tiga pola arsitektur slide-over siap pakai yang dirancang untuk alur kerja enterprise berskala besar tanpa kehilangan konteks halaman.'
                    : 'Three battle-tested slide-over architectures designed for high-density enterprise SaaS workflows without context loss.'}
                </p>
              </div>
              <NeuronBadge variant="brand" size="sm">
                {isId ? 'Pola Produksi SaaS' : 'Production SaaS Patterns'}
              </NeuronBadge>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-5)',
                marginTop: 'var(--space-5)',
              }}
            >
              {/* Pattern 1: User Profile & Role Editor */}
              <DrawerEnterprisePatternCard
                icon={<User size={18} />}
                iconBg="rgba(223, 126, 48, 0.12)"
                iconColor="var(--brand-600)"
                title={isId ? 'Penyunting Profil & Akses RBAC' : 'User Profile & Role Editor'}
                subtitle={isId ? 'Formulir multi-bidang dengan sticky footer' : 'Multi-field form with sticky actions'}
                badgeText='size="md"'
                badgeVariant="brand"
                propsTag='placement="right" · size="md" · backdrop="blur"'
                desc={
                  isId
                    ? 'Drawer ukuran medium (md) untuk menyunting informasi anggota tim, menetapkan hak akses RBAC granular, dan mengelola autentikasi dua faktor tanpa meninggalkan tabel data utama.'
                    : 'A clean medium (md) slide-over to edit user credentials, assign granular RBAC roles, and manage hardware security keys alongside an active data table.'
                }
                capabilities={[
                  isId ? 'Formulir Multi-Field' : 'Multi-Field Form',
                  isId ? 'Manajemen Hak Akses RBAC' : 'RBAC Access Matrix',
                  isId ? 'Saklar Hardware MFA' : 'MFA Hardware Toggle',
                  isId ? 'Alur Tanpa Pindah Halaman' : 'In-Situ Workflow',
                ]}
                buttonText={isId ? 'Buka Panel Profil Anggota' : 'Launch Profile Editor'}
                isPrimaryButton={true}
                onLaunch={() => setScenarioProfileOpen(true)}
                previewGraphic={
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      background: 'var(--color-bg-canvas, #fafafa)',
                      position: 'relative',
                    }}
                  >
                    {/* Left mock table */}
                    <div
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <div style={{ width: '60px', height: '6px', background: 'var(--color-border)', borderRadius: 3 }} />
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 6px',
                            background: 'var(--color-bg-surface)',
                            borderRadius: 4,
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(223, 126, 48, 0.2)' }} />
                          <div style={{ width: '45%', height: 5, background: 'var(--color-border)', borderRadius: 2 }} />
                          <div style={{ width: '25%', height: 5, background: 'var(--color-border)', borderRadius: 2, marginLeft: 'auto' }} />
                        </div>
                      ))}
                    </div>
                    {/* Right slide-over panel */}
                    <div
                      style={{
                        width: '48%',
                        height: '100%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '2px solid var(--brand-500)',
                        boxShadow: '-4px 0 12px rgba(0,0,0,0.08)',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            background: 'var(--brand-500)',
                            color: '#fff',
                            fontSize: 9,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                          }}
                        >
                          SJ
                        </div>
                        <div style={{ width: '50px', height: 6, background: 'var(--brand-400)', borderRadius: 3 }} />
                      </div>
                      <div style={{ height: 1, background: 'var(--color-border)' }} />
                      <div style={{ width: '70%', height: 5, background: 'var(--color-border)', borderRadius: 2 }} />
                      <div style={{ width: '90%', height: 11, background: 'var(--color-bg-subtle)', borderRadius: 3, border: '1px solid var(--color-border)' }} />
                      <div style={{ width: '90%', height: 11, background: 'var(--color-bg-subtle)', borderRadius: 3, border: '1px solid var(--color-border)' }} />
                      <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
                        <div style={{ flex: 1, height: 12, background: 'var(--brand-500)', borderRadius: 3 }} />
                        <div style={{ width: 18, height: 12, background: 'var(--color-bg-subtle)', borderRadius: 3, border: '1px solid var(--color-border)' }} />
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Pattern 2: E-Commerce / Order Detail Inspector */}
              <DrawerEnterprisePatternCard
                icon={<ShoppingBag size={18} />}
                iconBg="rgba(16, 185, 129, 0.12)"
                iconColor="var(--color-success, #10b981)"
                title={isId ? 'Inspektur Pesanan & Logistik' : 'Order & Fulfillment Inspector'}
                subtitle={isId ? 'Panel ukuran large (lg) dengan rincian item' : 'High-density breakdown with line items'}
                badgeText='size="lg"'
                badgeVariant="success"
                propsTag='placement="right" · size="lg" · scrollable="body"'
                desc={
                  isId
                    ? 'Drawer ukuran large (lg) untuk memeriksa nomor resi, riwayat linimasa logistik, daftar item pesanan berjenjang, dan aksi unduh faktur pesanan dalam satu kanvas leluasa.'
                    : 'A roomy large (lg) panel displaying order breakdown, line item costs, shipping timeline tracking, and invoice download actions with comprehensive canvas space.'
                }
                capabilities={[
                  isId ? 'Tabel Item Dinamis' : 'Dynamic Line Items',
                  isId ? 'Pelacakan Kurir Real-Time' : 'Live Tracking ID',
                  isId ? 'Rincian Pajak & Faktur' : 'Tax & Invoice Sum',
                  isId ? 'Area Kerja Lebar (lg)' : 'High-Density lg Canvas',
                ]}
                buttonText={isId ? 'Inspeksi Detail Pesanan #84920' : 'Inspect Order #84920'}
                isPrimaryButton={false}
                onLaunch={() => setScenarioOrderOpen(true)}
                previewGraphic={
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      background: 'var(--color-bg-canvas, #fafafa)',
                      position: 'relative',
                    }}
                  >
                    {/* Left mock order list */}
                    <div
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <div style={{ width: '50px', height: '6px', background: 'var(--color-border)', borderRadius: 3 }} />
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 6px',
                            background: 'var(--color-bg-surface)',
                            borderRadius: 4,
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-success)' }} />
                          <div style={{ width: '40%', height: 5, background: 'var(--color-border)', borderRadius: 2 }} />
                          <div style={{ width: '20%', height: 5, background: 'var(--color-border)', borderRadius: 2, marginLeft: 'auto' }} />
                        </div>
                      ))}
                    </div>
                    {/* Right slide-over panel lg */}
                    <div
                      style={{
                        width: '58%',
                        height: '100%',
                        background: 'var(--color-bg-surface)',
                        borderLeft: '2px solid var(--color-success, #10b981)',
                        boxShadow: '-6px 0 16px rgba(0,0,0,0.08)',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ width: '55px', height: 6, background: 'var(--color-text-primary)', borderRadius: 3 }} />
                        <div style={{ width: 32, height: 9, background: 'rgba(16, 185, 129, 0.15)', borderRadius: 6, border: '1px solid rgba(16, 185, 129, 0.3)' }} />
                      </div>
                      <div style={{ height: 1, background: 'var(--color-border)' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ width: '55%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                          <div style={{ width: '20%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ width: '45%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                          <div style={{ width: '25%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 'auto',
                          padding: '4px 6px',
                          background: 'var(--color-bg-subtle)',
                          borderRadius: 4,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ width: '30%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                        <div style={{ width: '35%', height: 7, background: 'var(--color-success, #10b981)', borderRadius: 2 }} />
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Pattern 3: Facets & Filters Slide-Over */}
              <DrawerEnterprisePatternCard
                icon={<Filter size={18} />}
                iconBg="rgba(59, 130, 246, 0.12)"
                iconColor="var(--color-primary, #3b82f6)"
                title={isId ? 'Filter Mendalam & Faset Data' : 'Deep Filter & Facets Panel'}
                subtitle={isId ? 'Drawer floating bergaya pulau modern' : 'Detached floating island with interactive filters'}
                badgeText='variant="floating"'
                badgeVariant="default"
                propsTag='variant="floating" · size="md" · pill-filters'
                desc={
                  isId
                    ? 'Drawer floating bergaya detached island untuk menyaring ribuan data katalog dengan faset kategori multi-pilih, rentang skor kompleksitas, dan saklar filter rilis stabil.'
                    : 'A modern floating island drawer to refine thousands of catalog entries with category pills, score range sliders, and release channel toggles.'
                }
                capabilities={[
                  isId ? 'Varian Floating Island' : 'Floating Island Variant',
                  isId ? 'Filter Chip Multi-Pilih' : 'Multi-Select Chips',
                  isId ? 'Slider Rentang Skor' : 'Score Range Slider',
                  isId ? 'Reset Cepat Faset' : 'Instant Reset Action',
                ]}
                buttonText={isId ? 'Buka Faset Filter Katalog' : 'Open Filter Facets'}
                isPrimaryButton={false}
                onLaunch={() => setScenarioFilterOpen(true)}
                previewGraphic={
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      background: 'var(--color-bg-canvas, #fafafa)',
                      position: 'relative',
                      padding: 8,
                    }}
                  >
                    {/* Left catalog cards */}
                    <div
                      style={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 6,
                        paddingRight: 8,
                      }}
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          style={{
                            background: 'var(--color-bg-surface)',
                            borderRadius: 4,
                            border: '1px solid var(--color-border)',
                            padding: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                          }}
                        >
                          <div style={{ width: '100%', height: 16, background: 'var(--color-bg-subtle)', borderRadius: 2 }} />
                          <div style={{ width: '70%', height: 4, background: 'var(--color-border)', borderRadius: 2 }} />
                        </div>
                      ))}
                    </div>
                    {/* Right floating island panel */}
                    <div
                      style={{
                        width: '46%',
                        height: '100%',
                        background: 'var(--color-bg-surface)',
                        borderRadius: 8,
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ width: '42px', height: 5, background: 'var(--color-primary, #3b82f6)', borderRadius: 2 }} />
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--color-primary, #3b82f6)' }} />
                      </div>
                      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <div style={{ width: 20, height: 7, borderRadius: 3, background: 'var(--brand-500)' }} />
                        <div style={{ width: 18, height: 7, borderRadius: 3, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
                        <div style={{ width: 22, height: 7, borderRadius: 3, background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }} />
                      </div>
                      <div style={{ width: '100%', height: 4, background: 'var(--color-bg-subtle)', borderRadius: 2, position: 'relative' }}>
                        <div style={{ width: '60%', height: '100%', background: 'var(--brand-500)', borderRadius: 2 }} />
                      </div>
                      <div style={{ marginTop: 'auto', width: '100%', height: 10, background: 'var(--color-primary, #3b82f6)', borderRadius: 3 }} />
                    </div>
                  </div>
                }
              />
            </div>

            {/* Enterprise Architectural Matrix & Guidelines */}
            <div
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {isId ? 'Matriks Pemilihan Arsitektur Drawer Enterprise' : 'Enterprise Drawer Architecture Matrix'}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                    {isId
                      ? 'Panduan penentuan ukuran, varian visual, dan pengelolaan fokus konteks pada sistem enterprise bervolume tinggi.'
                      : 'Guideline for sizing, visual styling, and focus preservation across high-throughput enterprise systems.'}
                  </p>
                </div>
                <NeuronBadge variant="brand" size="xs">
                  {isId ? 'Standar UX Enterprise' : 'Enterprise UX Standard'}
                </NeuronBadge>
              </div>

              {/* Responsive comparison table */}
              <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', background: 'var(--color-bg-surface)' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                      <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                        {isId ? 'Pola Penggunaan' : 'Pattern'}
                      </th>
                      <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                        {isId ? 'Konfigurasi Rekomendasi' : 'Recommended Spec'}
                      </th>
                      <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                        {isId ? 'Beban Kognitif' : 'Cognitive Load'}
                      </th>
                      <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                        {isId ? 'Kasus Penggunaan Terbaik' : 'Best Used For'}
                      </th>
                      <th style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '12px' }}>
                        {isId ? 'Hindari Jika' : 'Avoid If'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Penyunting Formulir (Profile/RBAC)' : 'Form Editor (Profile/RBAC)'}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <code style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--color-bg-subtle)', borderRadius: 4 }}>size="md" placement="right"</code>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <NeuronBadge variant="warning" size="xs">{isId ? 'Menengah' : 'Medium'}</NeuronBadge>
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Pengeditan data master tanpa reset filter atau scroll tabel' : 'Master record edits without losing table pagination or scroll position'}
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Wizard kompleks > 5 tahapan berurutan (Gunakan Modal / Halaman Baru)' : 'Complex multi-step wizards > 5 stages (use dedicated page or modal wizard)'}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Inspeksi & Audit (Orders/Logs)' : 'Inspection & Audit (Orders/Logs)'}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <code style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--color-bg-subtle)', borderRadius: 4 }}>size="lg" placement="right"</code>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <NeuronBadge variant="default" size="xs">{isId ? 'Rendah (Read-Heavy)' : 'Low (Read-heavy)'}</NeuronBadge>
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Membaca detail transaksi, linimasa audit trail, dan unduh faktur' : 'Viewing transaction breakdown, timeline logs, and downloading invoices'}
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Konfirmasi aksi sederhana satu kalimat (Gunakan Dialog Alert)' : 'Simple 1-line confirmations (use standard Modal dialog)'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isId ? 'Faset & Filter (Search/Catalog)' : 'Faceted Filters (Search/Catalog)'}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <code style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--color-bg-subtle)', borderRadius: 4 }}>variant="floating" size="md"</code>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <NeuronBadge variant="success" size="xs">{isId ? 'Rendah (Eksplorasi)' : 'Low (Exploratory)'}</NeuronBadge>
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Menyaring ribuan item katalog dengan preview hasil instan di layar' : 'Refining thousands of catalog items with live visual filtering'}
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--color-text-secondary)' }}>
                        {isId ? 'Hanya memiliki 1–2 filter sederhana (Gunakan Bar Filter Atas)' : 'Only 1–2 filter options exist (use inline bar or dropdown instead)'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3 Pillar Enterprise Tips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--brand-600)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Pertahankan Posisi Scroll Tabel' : 'Preserve Background Scroll'}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                      {isId ? 'Jangan reset halaman atau filter saat drawer ditutup agar pengguna tidak kehilangan konteks pekerjaan.' : 'Never reload parent tables or reset pagination when closing drawers.'}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-success, #10b981)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Tombol Sticky Footer Jelas' : 'Explicit Sticky Footers'}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                      {isId ? 'Tempatkan aksi primer dan sekunder di footer yang selalu terlihat bahkan saat konten sangat panjang.' : 'Ensure primary actions remain pinned at the bottom regardless of content length.'}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary, #3b82f6)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {isId ? 'Aksesibilitas & Keyboard Escape' : 'Keyboard Dismiss & Focus Trap'}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.4 }}>
                      {isId ? 'Dukungan penuh penekanan tombol Esc dan fokus otomatis pada input pertama saat drawer terbuka.' : 'Full Escape key listener and auto-focusing initial active elements upon entry.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LIVE DEMO INSTANCES (SLIDE-OVERS)
          ══════════════════════════════════════════════════════════════════════ */}

      {/* 1. Placement Drawer */}
      {livePlacementDrawer && (
        <NeuronDrawer
          open={Boolean(livePlacementDrawer)}
          onClose={() => setLivePlacementDrawer(null)}
          placement={livePlacementDrawer}
          size="md"
          title={
            isId
              ? `Drawer Tepi ${livePlacementDrawer.toUpperCase()}`
              : `${livePlacementDrawer.toUpperCase()} Edge Drawer`
          }
          description={
            isId
              ? `Bergeser masuk secara halus dari sisi ${livePlacementDrawer} layar viewport.`
              : `Slides in smoothly from the ${livePlacementDrawer} edge of your viewport.`
          }
          confirmText={isId ? 'Selesai' : 'Done'}
          cancelText={isId ? 'Tutup' : 'Close'}
          onConfirm={() => setLivePlacementDrawer(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {isId ? (
                <>
                  Panel ini berhasil bergeser masuk dari posisi <strong>{livePlacementDrawer}</strong>. Perhatikan kurva animasi slide-in yang halus dan transisi bayangan tepi.
                </>
              ) : (
                <>
                  This drawer smoothly slides in from the <strong>{livePlacementDrawer}</strong> edge. Notice the fluid entry bezier curve and edge shadow transition.
                </>
              )}
            </p>
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <CheckCircle2 size={20} style={{ color: 'var(--color-success, #10b981)', flexShrink: 0 }} />
              <div style={{ fontSize: '13px' }}>
                Anchor direction: <code>placement="{livePlacementDrawer}"</code>
              </div>
            </div>
          </div>
        </NeuronDrawer>
      )}

      {/* 2. Variant Drawer */}
      {liveVariantDrawer && (
        <NeuronDrawer
          open={Boolean(liveVariantDrawer)}
          onClose={() => setLiveVariantDrawer(null)}
          placement="right"
          variant={liveVariantDrawer}
          size="md"
          title={
            isId
              ? `Varian: ${liveVariantDrawer === 'default' ? 'Default Edge' : liveVariantDrawer === 'elevated' ? 'Elevated Shadow' : 'Floating Island'}`
              : `Variant: ${liveVariantDrawer === 'default' ? 'Default Edge' : liveVariantDrawer === 'elevated' ? 'Elevated Shadow' : 'Floating Island'}`
          }
          description={
            isId
              ? liveVariantDrawer === 'floating'
                ? 'Inspeksi gaya floating: margin inset 16px dan border radius 16px menyerupai kartu modern.'
                : liveVariantDrawer === 'elevated'
                ? 'Inspeksi gaya elevated: bayangan tajam multi-lapis untuk memisahkan hierarki di atas konten padat.'
                : 'Inspeksi gaya default: batas menempel rata ke layar viewport untuk kapasitas formulir optimal.'
              : liveVariantDrawer === 'floating'
              ? 'Inspecting floating style: 16px inset margins and 16px rounded corners delivering a modern sheet feel.'
              : liveVariantDrawer === 'elevated'
              ? 'Inspecting elevated style: high-contrast multi-tier drop shadows separating foreground above dense canvas.'
              : 'Inspecting default edge style: flush viewport boundary maximizing usable space for enterprise layouts.'
          }
          confirmText={isId ? 'Selesai Menguji' : 'Done Testing'}
          cancelText={isId ? 'Tutup' : 'Close'}
          onConfirm={() => setLiveVariantDrawer(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Quick Live Switcher */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {isId ? 'Beralih Varian Secara Langsung' : 'Switch Variant In Real-Time'}
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(['default', 'elevated', 'floating'] as DrawerVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setLiveVariantDrawer(v)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: liveVariantDrawer === v ? '1px solid var(--brand-500)' : '1px solid var(--color-border)',
                      background: liveVariantDrawer === v ? 'var(--brand-50)' : 'var(--color-bg-surface)',
                      color: liveVariantDrawer === v ? 'var(--brand-700)' : 'var(--color-text-primary)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {v === 'default' ? 'Default Edge' : v === 'elevated' ? 'Elevated' : 'Floating'}
                  </button>
                ))}
              </div>
            </div>

            {/* Spec Details Card */}
            <div
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Spesifikasi Gaya Aktif' : 'Active Style Specifications'}
                </span>
                <NeuronBadge size="xs" variant={liveVariantDrawer === 'floating' ? 'success' : liveVariantDrawer === 'elevated' ? 'brand' : 'default'}>
                  {liveVariantDrawer}
                </NeuronBadge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div style={{ padding: '8px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>{isId ? 'Jarak Tepi (Margin)' : 'Viewport Margin'}</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: 2 }}>
                    {liveVariantDrawer === 'floating' ? '16px (All edges)' : '0px (Flush edge)'}
                  </div>
                </div>
                <div style={{ padding: '8px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>{isId ? 'Sudut Lengkung' : 'Border Radius'}</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: 2 }}>
                    {liveVariantDrawer === 'floating' ? '16px (radius-2xl)' : '0px (Square edge)'}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>CSS Class:</span>
                <code style={{ background: 'var(--color-bg-subtle)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                  .neuron-drawer--{liveVariantDrawer}
                </code>
              </div>
            </div>

            {/* Context Note */}
            <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {isId
                ? 'Tip: Perhatikan transisi ketika beralih ke varian Floating. Pada layar desktop, kartu mengambang memberikan kesan hierarki kedalaman visual modern tanpa menutupi seluruh batas layar.'
                : 'Tip: Notice the fluid transition when switching to Floating. On wide screens, the island card brings tactile depth and spatial context without feeling heavy.'}
            </p>
          </div>
        </NeuronDrawer>
      )}

      {/* 3. Size Scale Drawer */}
      {liveSizeDrawer && (
        <NeuronDrawer
          open={Boolean(liveSizeDrawer)}
          onClose={() => setLiveSizeDrawer(null)}
          placement="right"
          size={liveSizeDrawer}
          title={`Scale: ${liveSizeDrawer.toUpperCase()}`}
          description={`Testing drawer dimension constraints with size="${liveSizeDrawer}".`}
          confirmText="Acknowledge"
          cancelText="Close"
          onConfirm={() => setLiveSizeDrawer(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Ukuran aktif: <strong>{liveSizeDrawer}</strong>. Panel ini menyesuaikan lebar secara responsif dengan batasan viewport.
            </p>
            <div
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                fontSize: '12.5px',
              }}
            >
              Setting: <code>size="{liveSizeDrawer}"</code>
            </div>
          </div>
        </NeuronDrawer>
      )}

      {/* 4. Backdrop Treatment Drawer */}
      {liveBackdropDrawer && (
        <NeuronDrawer
          open={Boolean(liveBackdropDrawer)}
          onClose={() => setLiveBackdropDrawer(null)}
          placement="right"
          backdropVariant={liveBackdropDrawer}
          size="md"
          title={`Backdrop: ${liveBackdropDrawer.toUpperCase()}`}
          description="Examine the contrast and optical blur applied to the background page."
          confirmText="Understood"
          cancelText="Close"
          onConfirm={() => setLiveBackdropDrawer(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Lapisan latar saat ini menggunakan: <strong>{liveBackdropDrawer}</strong>.
            </p>
            <div
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                fontSize: '12.5px',
              }}
            >
              Setting: <code>backdropVariant="{liveBackdropDrawer}"</code>
            </div>
          </div>
        </NeuronDrawer>
      )}

      {/* ── Scenario 1: User Profile & Role Editor ── */}
      <NeuronDrawer
        open={scenarioProfileOpen}
        onClose={() => setScenarioProfileOpen(false)}
        placement="right"
        size="md"
        title={isId ? 'Sunting Profil Anggota Tim' : 'Edit Team Member Profile'}
        description={
          isId
            ? 'Perbarui kredensial kontak dan tetapkan hak akses organisasi.'
            : 'Update contact credentials and assign organizational permissions.'
        }
        icon={<User size={18} />}
        confirmText={isId ? 'Simpan Anggota' : 'Save Member'}
        cancelText={isId ? 'Batal' : 'Discard'}
        onConfirm={() => setScenarioProfileOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: 6 }}>
              {isId ? 'Nama Lengkap' : 'Full Name'}
            </label>
            <NeuronInput
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder={isId ? 'cth. Sarah Jenkins' : 'e.g. Sarah Jenkins'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: 6 }}>
              {isId ? 'Email Perusahaan' : 'Corporate Email'}
            </label>
            <NeuronInput
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: 6 }}>
              {isId ? 'Penetapan Peran Utama (RBAC)' : 'Primary Role Assignment'}
            </label>
            <NeuronInput
              value={profileRole}
              onChange={(e) => setProfileRole(e.target.value)}
              placeholder={isId ? 'cth. Principal Product Designer' : 'e.g. Principal Product Designer'}
            />
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>
                  {isId ? 'Wajibkan Hardware MFA' : 'Enforce Hardware MFA'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {isId
                    ? 'Memerlukan kunci fisik FIDO2 untuk masuk konsol'
                    : 'Require FIDO2 security key for console login'}
                </div>
              </div>
              <NeuronToggle
                checked={profileMfa}
                onChange={() => setProfileMfa(!profileMfa)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>
                  {isId ? 'Akses API Production' : 'API Production Access'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {isId
                    ? 'Terbitkan token bearer baca/tulis untuk integrasi SDK'
                    : 'Generate read/write bearer tokens for SDKs'}
                </div>
              </div>
              <NeuronToggle
                checked={profileApiAccess}
                onChange={() => setProfileApiAccess(!profileApiAccess)}
              />
            </div>
          </div>
        </div>
      </NeuronDrawer>

      {/* ── Scenario 2: Order Detail Inspector ── */}
      <NeuronDrawer
        open={scenarioOrderOpen}
        onClose={() => setScenarioOrderOpen(false)}
        placement="right"
        size="lg"
        title={isId ? 'Ringkasan Pesanan · #ORD-84920' : 'Order Summary · #ORD-84920'}
        description={
          isId
            ? 'Dikirim via DHL Express · Nomor Resi: 9400 1118 9956 2201 44'
            : 'Fulfilled via DHL Express · Tracking ID: 9400 1118 9956 2201 44'
        }
        icon={<ShoppingBag size={18} />}
        confirmText={isId ? 'Unduh Faktur (PDF)' : 'Download Invoice'}
        cancelText={isId ? 'Tutup' : 'Close'}
        onConfirm={() => setScenarioOrderOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Status Banner */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-success, #10b981)' }} />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {isId ? 'Terkirim pada 06 Okt 2026' : 'Delivered on Oct 06, 2026'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {isId
                    ? 'Diterima oleh staf resepsionis depan (John D.)'
                    : 'Signed by front desk reception (John D.)'}
                </div>
              </div>
            </div>
            <NeuronBadge variant="success" size="sm">
              {isId ? 'Terkirim' : 'Delivered'}
            </NeuronBadge>
          </div>

          {/* Line Items Table */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 10px 0' }}>
              {isId ? 'Daftar Barang Pesanan' : 'Line Items'}
            </h3>
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 100px',
                  padding: '10px 14px',
                  background: 'var(--color-bg-subtle)',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span>{isId ? 'Nama Item' : 'Item'}</span>
                <span style={{ textAlign: 'center' }}>{isId ? 'Jml' : 'Qty'}</span>
                <span style={{ textAlign: 'right' }}>{isId ? 'Total' : 'Amount'}</span>
              </div>

              {[
                {
                  name: isId
                    ? 'Neuron Enterprise Design Tokens Kit (Lisensi Tim)'
                    : 'Neuron Enterprise Design Tokens Kit',
                  qty: 1,
                  price: '$499.00',
                },
                {
                  name: isId
                    ? 'Paket Ikonografi v2 (4.000+ Glyphs Vektor)'
                    : 'Iconography Pack v2 (4,000+ SVG Glyphs)',
                  qty: 3,
                  price: '$147.00',
                },
                {
                  name: isId
                    ? 'SLA Dukungan Arsitektur Prioritas (12 Bulan)'
                    : 'Priority Architecture Support SLA (12 Mo)',
                  qty: 1,
                  price: '$1,200.00',
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 100px',
                    padding: '12px 14px',
                    borderBottom: idx === 2 ? 'none' : '1px solid var(--color-border)',
                    fontSize: '13px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{row.name}</span>
                  <span style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>{row.qty}</span>
                  <span style={{ textAlign: 'right', fontWeight: 600 }}>{row.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>{isId ? 'Subtotal:' : 'Subtotal:'}</span>
              <span>$1,846.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>{isId ? 'Pajak (PPN 10%):' : 'Tax (GST 10%):'}</span>
              <span>$184.60</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '15px',
                paddingTop: 8,
                borderTop: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              <span>{isId ? 'Total Dibayar:' : 'Total Paid:'}</span>
              <span>$2,030.60</span>
            </div>
          </div>
        </div>
      </NeuronDrawer>

      {/* ── Scenario 3: Deep Filter Facets ── */}
      <NeuronDrawer
        open={scenarioFilterOpen}
        onClose={() => setScenarioFilterOpen(false)}
        placement="right"
        variant="floating"
        size="md"
        title={isId ? 'Filter Katalog Komponen' : 'Filter Component Catalog'}
        description={
          isId
            ? 'Terapkan parameter faset untuk menyaring pustaka komponen.'
            : 'Apply faceted parameters to refine documentation views.'
        }
        icon={<Filter size={18} />}
        confirmText={isId ? 'Terapkan Filter' : 'Apply 3 Filters'}
        cancelText={isId ? 'Atur Ulang Semua' : 'Reset All'}
        onConfirm={() => setScenarioFilterOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: 8 }}>
              {isId ? 'Pilar Kategori' : 'Category Pillar'}
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['all', 'form', 'layout', 'feedback', 'navigation'].map((cat) => (
                <NeuronBadge
                  key={cat}
                  variant={filterCategory === cat ? 'brand' : 'default'}
                  size="md"
                  onClick={() => setFilterCategory(cat)}
                  style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  {cat}
                </NeuronBadge>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>
                {isId ? 'Skor Kompleksitas Maksimal' : 'Maximum Complexity Score'}
              </label>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-600)' }}>
                {filterPrice} pts
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="25"
              value={filterPrice}
              onChange={(e) => setFilterPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--brand-600)' }}
            />
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>
                {isId ? 'Rilis Stabil Saja' : 'Stable Release Only'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {isId
                  ? 'Sembunyikan komponen eksperimental atau alpha'
                  : 'Hide experimental or alpha components'}
              </div>
            </div>
            <NeuronToggle
              checked={filterInStockOnly}
              onChange={() => setFilterInStockOnly(!filterInStockOnly)}
            />
          </div>
        </div>
      </NeuronDrawer>

      {/* ── Footer Navigation ── */}
      <NextPrevious
        prev={{ id: 'comp-divider', label: t.nav.compDivider || 'Divider' }}
        next={{ id: 'comp-dropdown', label: t.nav.compDropdown || 'Dropdown' }}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
