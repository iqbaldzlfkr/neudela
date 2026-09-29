import React, { useState, useRef, useMemo, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────
export type NeuronChartType = 'bar' | 'line' | 'pie' | 'donut' | 'radar' | 'sparkline' | 'sankey';
export type NeuronChartSize = 'sm' | 'md' | 'lg' | 'xl';
export type NeuronChartColorScheme = 'brand' | 'spectrum' | 'mono' | 'pastel' | 'vivid';
export type NeuronChartOrientation = 'vertical' | 'horizontal';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface SankeyNode {
  id: string;
  label: string;
  stage: number; // 0-based column stage index
  color?: string;
  value?: number;
}

export interface SankeyLink {
  source: string; // source node id
  target: string; // target node id
  value: number;
  color?: string;
}

export interface SankeyData {
  stages?: string[]; // Column stage headers (e.g. ['INTAKE', 'GOVERNANCE', 'OUTCOME'])
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface NeuronChartProps {
  /** Chart visualization type */
  type: NeuronChartType;
  /** Data points for single-series charts (bar, pie, donut, sparkline) */
  data?: ChartDataPoint[];
  /** Multi-series data for grouped/stacked bar and multi-line charts */
  series?: ChartSeries[];
  /** Category labels for x-axis (used with series) */
  categories?: string[];
  /** Sankey / Flow diagram data */
  sankeyData?: SankeyData;
  /** Bar chart direction */
  orientation?: NeuronChartOrientation;
  /** Stack bars on top of each other */
  stacked?: boolean;
  /** Line chart: use smooth bezier curves */
  smooth?: boolean;
  /** Line chart: show area fill under line */
  showArea?: boolean;
  /** Line chart: show data point dots */
  showDots?: boolean;
  /** Donut: inner radius ratio (0-0.9) */
  innerRadius?: number;
  /** Component size */
  size?: NeuronChartSize;
  /** Color palette */
  colorScheme?: NeuronChartColorScheme;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Enable interactive tooltip */
  showTooltip?: boolean;
  /** Show value labels on data points */
  showLabels?: boolean;
  /** Animate chart entry */
  animated?: boolean;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Accessibility label */
  ariaLabel?: string;
  /** Additional className */
  className?: string;
  /** Additional inline style */
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────────────────────
// Color Palettes
// ─────────────────────────────────────────────────────────────────────────────
const COLOR_PALETTES: Record<NeuronChartColorScheme, string[]> = {
  brand: [
    'var(--brand-500)', 'var(--brand-300)', 'var(--brand-700)',
    'var(--brand-200)', 'var(--brand-600)', 'var(--brand-400)',
    'var(--brand-100)', 'var(--brand-800)',
  ],
  spectrum: [
    'var(--brand-500)', 'var(--sky-500)', 'var(--emerald-500)',
    'var(--purple-500)', 'var(--amber-500)', 'var(--pink-500)',
    'var(--blue-500)', 'var(--red-500)',
  ],
  mono: [
    'var(--slate-700)', 'var(--slate-500)', 'var(--slate-400)',
    'var(--slate-300)', 'var(--slate-600)', 'var(--slate-200)',
    'var(--slate-800)', 'var(--slate-100)',
  ],
  pastel: [
    'var(--brand-200)', 'var(--sky-200)', 'var(--emerald-200)',
    'var(--purple-200)', 'var(--amber-200)', 'var(--pink-200)',
    'var(--blue-200)', 'var(--red-200)',
  ],
  vivid: [
    'var(--brand-600)', 'var(--sky-600)', 'var(--emerald-600)',
    'var(--purple-600)', 'var(--amber-600)', 'var(--pink-600)',
    'var(--blue-600)', 'var(--red-600)',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Size Dimensions
// ─────────────────────────────────────────────────────────────────────────────
const SIZE_CONFIG: Record<NeuronChartSize, { width: number; height: number; padding: number }> = {
  sm: { width: 320, height: 200, padding: 32 },
  md: { width: 480, height: 300, padding: 40 },
  lg: { width: 640, height: 400, padding: 48 },
  xl: { width: 800, height: 500, padding: 56 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────
function getColors(scheme: NeuronChartColorScheme, count: number): string[] {
  const palette = COLOR_PALETTES[scheme];
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(palette[i % palette.length]);
  }
  return result;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toFixed(n % 1 === 0 ? 0 : 1);
}

/** Generate smooth bezier path for line chart */
function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * 0.4;
    const cpy1 = prev[1];
    const cpx2 = curr[0] - (curr[0] - prev[0]) * 0.4;
    const cpy2 = curr[1];
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr[0]} ${curr[1]}`;
  }
  return d;
}

/** Generate straight line path */
function straightPath(points: [number, number][]): string {
  if (points.length === 0) return '';
  return points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Component
// ─────────────────────────────────────────────────────────────────────────────
interface TooltipData {
  x: number;
  y: number;
  label: string;
  value: string;
  color: string;
  seriesName?: string;
}

function ChartTooltip({ data, containerRef }: { data: TooltipData | null; containerRef: React.RefObject<SVGSVGElement | null> }) {
  if (!data || !containerRef.current) return null;
  const rect = containerRef.current.getBoundingClientRect();
  const svgWidth = containerRef.current.viewBox.baseVal.width || rect.width;
  const svgHeight = containerRef.current.viewBox.baseVal.height || rect.height;
  const scaleX = rect.width / svgWidth;
  const scaleY = rect.height / svgHeight;

  const left = data.x * scaleX;
  const top = data.y * scaleY;

  return (
    <div
      className="neuron-chart__tooltip"
      style={{
        left: `${left}px`,
        top: `${top - 10}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="neuron-chart__tooltip-dot" style={{ background: data.color }} />
      <div className="neuron-chart__tooltip-content">
        {data.seriesName && <span className="neuron-chart__tooltip-series">{data.seriesName}</span>}
        <span className="neuron-chart__tooltip-label">{data.label}</span>
        <span className="neuron-chart__tooltip-value">{data.value}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Legend Component
// ─────────────────────────────────────────────────────────────────────────────
function ChartLegend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="neuron-chart__legend">
      {items.map((item, i) => (
        <div key={i} className="neuron-chart__legend-item">
          <span className="neuron-chart__legend-dot" style={{ background: item.color }} />
          <span className="neuron-chart__legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bar Chart Renderer
// ─────────────────────────────────────────────────────────────────────────────
function BarChartSVG({
  data, series, categories, orientation, stacked, colors,
  width, height, padding, showGrid, showLabels, animated,
  onHover, onLeave,
}: {
  data?: ChartDataPoint[];
  series?: ChartSeries[];
  categories?: string[];
  orientation: NeuronChartOrientation;
  stacked: boolean;
  colors: string[];
  width: number;
  height: number;
  padding: number;
  showGrid: boolean;
  showLabels: boolean;
  animated: boolean;
  onHover: (d: TooltipData) => void;
  onLeave: () => void;
}) {
  const isVertical = orientation === 'vertical';
  const leftPad = isVertical ? padding : Math.max(padding + 58, 92);
  const chartW = width - leftPad - (isVertical ? padding : padding * 0.5);
  const chartH = height - padding * 2;
  const isMultiSeries = series && series.length > 0 && categories && categories.length > 0;

  // Single series from data[]
  if (!isMultiSeries && data && data.length > 0) {
    const maxVal = Math.max(...data.map(d => d.value), 1);
    const barCount = data.length;
    const gap = isVertical ? chartW * 0.15 / barCount : chartH * 0.15 / barCount;
    const barSize = isVertical
      ? (chartW - gap * (barCount + 1)) / barCount
      : (chartH - gap * (barCount + 1)) / barCount;

    // Grid lines
    const gridLines: React.ReactNode[] = [];
    if (showGrid) {
      const steps = 5;
      for (let i = 0; i <= steps; i++) {
        const frac = i / steps;
        if (isVertical) {
          const y = padding + chartH - frac * chartH;
          gridLines.push(
            <line key={`g${i}`} x1={padding} y1={y} x2={width - padding} y2={y}
              className="neuron-chart__grid-line" />
          );
          gridLines.push(
            <text key={`gl${i}`} x={padding - 8} y={y + 4} className="neuron-chart__axis-label" textAnchor="end">
              {formatNumber(maxVal * frac)}
            </text>
          );
        } else {
          const x = leftPad + frac * chartW;
          gridLines.push(
            <line key={`g${i}`} x1={x} y1={padding} x2={x} y2={height - padding}
              className="neuron-chart__grid-line" />
          );
          gridLines.push(
            <text key={`gl${i}`} x={x} y={height - padding + 16} className="neuron-chart__axis-label" textAnchor="middle">
              {formatNumber(maxVal * frac)}
            </text>
          );
        }
      }
    }

    return (
      <>
        {gridLines}
        {data.map((d, i) => {
          const c = d.color || colors[i % colors.length];
          const ratio = d.value / maxVal;

          if (isVertical) {
            const x = padding + gap + i * (barSize + gap);
            const barH = ratio * chartH;
            const y = padding + chartH - barH;

            return (
              <g key={i}>
                <rect
                  x={x} y={y} width={barSize} height={barH}
                  rx={3}
                  fill={c}
                  className={animated ? 'neuron-chart__bar neuron-chart__bar--animated' : 'neuron-chart__bar'}
                  style={animated ? { '--bar-height': `${barH}px`, animationDelay: `${i * 60}ms` } as React.CSSProperties : undefined}
                  onMouseEnter={() => onHover({ x: x + barSize / 2, y, label: d.label, value: formatNumber(d.value), color: c })}
                  onMouseLeave={onLeave}
                />
                {showLabels && (
                  <text x={x + barSize / 2} y={y - 6} className="neuron-chart__bar-label" textAnchor="middle">
                    {formatNumber(d.value)}
                  </text>
                )}
                <text x={x + barSize / 2} y={height - padding + 16} className="neuron-chart__axis-label" textAnchor="middle">
                  {d.label}
                </text>
              </g>
            );
          } else {
            // Horizontal bars
            const y = padding + gap + i * (barSize + gap);
            const barW = ratio * chartW;

            return (
              <g key={i}>
                <rect
                  x={leftPad} y={y} width={barW} height={barSize}
                  rx={3}
                  fill={c}
                  className={animated ? 'neuron-chart__bar neuron-chart__bar--h-animated' : 'neuron-chart__bar'}
                  style={animated ? { '--bar-width': `${barW}px`, animationDelay: `${i * 60}ms` } as React.CSSProperties : undefined}
                  onMouseEnter={() => onHover({ x: leftPad + barW, y: y + barSize / 2, label: d.label, value: formatNumber(d.value), color: c })}
                  onMouseLeave={onLeave}
                />
                {showLabels && (
                  <text x={leftPad + barW + 8} y={y + barSize / 2 + 4} className="neuron-chart__bar-label" textAnchor="start">
                    {formatNumber(d.value)}
                  </text>
                )}
                <text x={leftPad - 8} y={y + barSize / 2 + 4} className="neuron-chart__axis-label" textAnchor="end">
                  {d.label}
                </text>
              </g>
            );
          }
        })}
      </>
    );
  }

  // Multi-series (grouped or stacked)
  if (isMultiSeries && series && categories) {
    const catCount = categories.length;
    const seriesCount = series.length;
    const gap = isVertical ? chartW * 0.12 / catCount : chartH * 0.12 / catCount;
    const groupSize = isVertical
      ? (chartW - gap * (catCount + 1)) / catCount
      : (chartH - gap * (catCount + 1)) / catCount;

    let maxVal: number;
    if (stacked) {
      maxVal = Math.max(
        ...categories.map((_, ci) => series.reduce((sum, s) => sum + (s.data[ci] || 0), 0)),
        1
      );
    } else {
      maxVal = Math.max(...series.flatMap(s => s.data), 1);
    }

    // Grid lines
    const gridLines: React.ReactNode[] = [];
    if (showGrid) {
      const steps = 5;
      for (let i = 0; i <= steps; i++) {
        const frac = i / steps;
        if (isVertical) {
          const y = padding + chartH - frac * chartH;
          gridLines.push(
            <line key={`g${i}`} x1={padding} y1={y} x2={width - padding} y2={y}
              className="neuron-chart__grid-line" />
          );
          gridLines.push(
            <text key={`gl${i}`} x={padding - 8} y={y + 4} className="neuron-chart__axis-label" textAnchor="end">
              {formatNumber(maxVal * frac)}
            </text>
          );
        }
      }
    }

    const bars: React.ReactNode[] = [];

    categories.forEach((cat, ci) => {
      if (stacked && isVertical) {
        let accY = padding + chartH;
        series.forEach((s, si) => {
          const val = s.data[ci] || 0;
          const barH = (val / maxVal) * chartH;
          const x = padding + gap + ci * (groupSize + gap);
          accY -= barH;
          const c = s.color || colors[si % colors.length];
          bars.push(
            <rect
              key={`${ci}-${si}`}
              x={x} y={accY} width={groupSize} height={barH}
              rx={si === seriesCount - 1 ? 3 : 0}
              fill={c}
              className={animated ? 'neuron-chart__bar neuron-chart__bar--animated' : 'neuron-chart__bar'}
              style={animated ? { '--bar-height': `${barH}px`, animationDelay: `${(ci * seriesCount + si) * 40}ms` } as React.CSSProperties : undefined}
              onMouseEnter={() => onHover({ x: x + groupSize / 2, y: accY, label: cat, value: formatNumber(val), color: c, seriesName: s.name })}
              onMouseLeave={onLeave}
            />
          );
        });
        bars.push(
          <text key={`cl${ci}`} x={padding + gap + ci * (groupSize + gap) + groupSize / 2} y={height - padding + 16}
            className="neuron-chart__axis-label" textAnchor="middle">{cat}</text>
        );
      } else if (!stacked && isVertical) {
        // Grouped
        const subBarWidth = groupSize / seriesCount;
        series.forEach((s, si) => {
          const val = s.data[ci] || 0;
          const barH = (val / maxVal) * chartH;
          const x = padding + gap + ci * (groupSize + gap) + si * subBarWidth;
          const y = padding + chartH - barH;
          const c = s.color || colors[si % colors.length];
          bars.push(
            <rect
              key={`${ci}-${si}`}
              x={x + 1} y={y} width={subBarWidth - 2} height={barH}
              rx={3}
              fill={c}
              className={animated ? 'neuron-chart__bar neuron-chart__bar--animated' : 'neuron-chart__bar'}
              style={animated ? { '--bar-height': `${barH}px`, animationDelay: `${(ci * seriesCount + si) * 40}ms` } as React.CSSProperties : undefined}
              onMouseEnter={() => onHover({ x: x + subBarWidth / 2, y, label: cat, value: formatNumber(val), color: c, seriesName: s.name })}
              onMouseLeave={onLeave}
            />
          );
        });
        bars.push(
          <text key={`cl${ci}`} x={padding + gap + ci * (groupSize + gap) + groupSize / 2} y={height - padding + 16}
            className="neuron-chart__axis-label" textAnchor="middle">{cat}</text>
        );
      }
    });

    return <>{gridLines}{bars}</>;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Line Chart Renderer
// ─────────────────────────────────────────────────────────────────────────────
function LineChartSVG({
  data, series, categories, smooth, showArea, showDots, colors,
  width, height, padding, showGrid, showLabels, animated,
  onHover, onLeave,
}: {
  data?: ChartDataPoint[];
  series?: ChartSeries[];
  categories?: string[];
  smooth: boolean;
  showArea: boolean;
  showDots: boolean;
  colors: string[];
  width: number;
  height: number;
  padding: number;
  showGrid: boolean;
  showLabels: boolean;
  animated: boolean;
  onHover: (d: TooltipData) => void;
  onLeave: () => void;
}) {
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  // Normalize to multi-series format
  const allSeries: { name: string; data: number[]; labels: string[] }[] = [];

  if (series && series.length > 0 && categories && categories.length > 0) {
    series.forEach(s => {
      allSeries.push({ name: s.name, data: s.data, labels: categories });
    });
  } else if (data && data.length > 0) {
    allSeries.push({ name: '', data: data.map(d => d.value), labels: data.map(d => d.label) });
  }

  if (allSeries.length === 0) return null;

  const allValues = allSeries.flatMap(s => s.data);
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 0);
  const range = maxVal - minVal || 1;

  // Grid lines
  const gridLines: React.ReactNode[] = [];
  if (showGrid) {
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const y = padding + chartH - frac * chartH;
      gridLines.push(
        <line key={`g${i}`} x1={padding} y1={y} x2={width - padding} y2={y}
          className="neuron-chart__grid-line" />
      );
      gridLines.push(
        <text key={`gl${i}`} x={padding - 8} y={y + 4} className="neuron-chart__axis-label" textAnchor="end">
          {formatNumber(minVal + range * frac)}
        </text>
      );
    }
  }

  // X-axis labels
  const xLabels = allSeries[0].labels;
  const xAxisLabels = xLabels.map((label, i) => {
    const x = padding + (i / Math.max(xLabels.length - 1, 1)) * chartW;
    return (
      <text key={`xl${i}`} x={x} y={height - padding + 16}
        className="neuron-chart__axis-label" textAnchor="middle">{label}</text>
    );
  });

  // Render each series
  const lineElements: React.ReactNode[] = [];
  const uniqueId = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  allSeries.forEach((s, si) => {
    const c = (series && series[si]?.color) || colors[si % colors.length];
    const points: [number, number][] = s.data.map((val, i) => {
      const x = padding + (i / Math.max(s.data.length - 1, 1)) * chartW;
      const y = padding + chartH - ((val - minVal) / range) * chartH;
      return [x, y] as [number, number];
    });

    const pathD = smooth ? smoothPath(points) : straightPath(points);

    // Area fill
    if (showArea && points.length > 0) {
      const areaPath = pathD +
        ` L ${points[points.length - 1][0]} ${padding + chartH}` +
        ` L ${points[0][0]} ${padding + chartH} Z`;
      lineElements.push(
        <path
          key={`area-${si}`}
          d={areaPath}
          fill={c}
          className="neuron-chart__area"
          style={animated ? { animationDelay: `${si * 100}ms` } : undefined}
        />
      );
    }

    // Line
    const lineId = `line-${uniqueId}-${si}`;
    lineElements.push(
      <path
        key={`line-${si}`}
        id={lineId}
        d={pathD}
        fill="none"
        stroke={c}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'neuron-chart__line neuron-chart__line--animated' : 'neuron-chart__line'}
      />
    );

    // Dots
    if (showDots) {
      points.forEach(([x, y], di) => {
        lineElements.push(
          <circle
            key={`dot-${si}-${di}`}
            cx={x} cy={y} r={4}
            fill="var(--color-bg-surface)"
            stroke={c}
            strokeWidth={2.5}
            className="neuron-chart__dot"
            onMouseEnter={() => onHover({ x, y, label: s.labels[di], value: formatNumber(s.data[di]), color: c, seriesName: s.name || undefined })}
            onMouseLeave={onLeave}
          />
        );
        if (showLabels) {
          lineElements.push(
            <text key={`dl-${si}-${di}`} x={x} y={y - 10} className="neuron-chart__bar-label" textAnchor="middle">
              {formatNumber(s.data[di])}
            </text>
          );
        }
      });
    }
  });

  return <>{gridLines}{xAxisLabels}{lineElements}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pie / Donut Chart Renderer
// ─────────────────────────────────────────────────────────────────────────────
function PieChartSVG({
  data, innerRadius, colors, width, height, showLabels, animated,
  onHover, onLeave,
}: {
  data: ChartDataPoint[];
  innerRadius: number;
  colors: string[];
  width: number;
  height: number;
  showLabels: boolean;
  animated: boolean;
  onHover: (d: TooltipData) => void;
  onLeave: () => void;
}) {
  const cx = width / 2;
  const cy = height / 2;
  const outerR = Math.min(width, height) / 2 - 30;
  const innerR = outerR * innerRadius;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;

  let currentAngle = -Math.PI / 2; // Start from top

  const slices = data.map((d, i) => {
    const angle = (d.value / total) * Math.PI * 2;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);

    const ix1 = cx + innerR * Math.cos(startAngle);
    const iy1 = cy + innerR * Math.sin(startAngle);
    const ix2 = cx + innerR * Math.cos(endAngle);
    const iy2 = cy + innerR * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    let pathD: string;
    if (innerRadius > 0) {
      // Donut
      pathD = [
        `M ${x1} ${y1}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${ix2} ${iy2}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}`,
        `Z`
      ].join(' ');
    } else {
      // Pie
      pathD = [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');
    }

    const midAngle = startAngle + angle / 2;
    const labelR = outerR + 16;
    const labelX = cx + labelR * Math.cos(midAngle);
    const labelY = cy + labelR * Math.sin(midAngle);
    const tooltipX = cx + (outerR * 0.7) * Math.cos(midAngle);
    const tooltipY = cy + (outerR * 0.7) * Math.sin(midAngle);

    const c = d.color || colors[i % colors.length];
    const pct = ((d.value / total) * 100).toFixed(1) + '%';

    return (
      <g key={i}>
        <path
          d={pathD}
          fill={c}
          className={animated ? 'neuron-chart__pie-slice neuron-chart__pie-slice--animated' : 'neuron-chart__pie-slice'}
          style={animated ? { animationDelay: `${i * 80}ms` } as React.CSSProperties : undefined}
          onMouseEnter={() => onHover({ x: tooltipX, y: tooltipY, label: d.label, value: `${formatNumber(d.value)} (${pct})`, color: c })}
          onMouseLeave={onLeave}
        />
        {showLabels && angle > 0.25 && (
          <text x={labelX} y={labelY} className="neuron-chart__pie-label" textAnchor={labelX > cx ? 'start' : 'end'}>
            {pct}
          </text>
        )}
      </g>
    );
  });

  // Donut center text
  const centerText = innerRadius > 0 ? (
    <text x={cx} y={cy} className="neuron-chart__donut-center" textAnchor="middle" dominantBaseline="central">
      {formatNumber(total)}
    </text>
  ) : null;

  return <>{slices}{centerText}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Radar Chart Renderer
// ─────────────────────────────────────────────────────────────────────────────
function RadarChartSVG({
  data, series, categories, colors, width, height, showLabels, animated,
  onHover, onLeave,
}: {
  data?: ChartDataPoint[];
  series?: ChartSeries[];
  categories?: string[];
  colors: string[];
  width: number;
  height: number;
  showLabels: boolean;
  animated: boolean;
  onHover: (d: TooltipData) => void;
  onLeave: () => void;
}) {
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(width, height) / 2 - 40;

  // Normalize
  let axes: string[] = [];
  let dataSets: { name: string; values: number[] }[] = [];

  if (series && series.length > 0 && categories && categories.length > 0) {
    axes = categories;
    dataSets = series.map(s => ({ name: s.name, values: s.data }));
  } else if (data && data.length > 0) {
    axes = data.map(d => d.label);
    dataSets = [{ name: '', values: data.map(d => d.value) }];
  }

  if (axes.length < 3) return null;

  const maxVal = Math.max(...dataSets.flatMap(d => d.values), 1);
  const n = axes.length;
  const angleStep = (Math.PI * 2) / n;

  // Grid rings
  const rings: React.ReactNode[] = [];
  const ringCount = 4;
  for (let r = 1; r <= ringCount; r++) {
    const radius = (r / ringCount) * maxR;
    const pts = axes.map((_, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
    }).join(' ');
    rings.push(
      <polygon key={`ring-${r}`} points={pts} fill="none"
        className="neuron-chart__radar-ring" />
    );
  }

  // Axis lines & labels
  const axisLines = axes.map((label, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    const labelX = cx + (maxR + 18) * Math.cos(angle);
    const labelY = cy + (maxR + 18) * Math.sin(angle);

    return (
      <g key={`axis-${i}`}>
        <line x1={cx} y1={cy} x2={x} y2={y} className="neuron-chart__radar-axis" />
        {showLabels && (
          <text x={labelX} y={labelY} className="neuron-chart__radar-label" textAnchor="middle" dominantBaseline="central">
            {label}
          </text>
        )}
      </g>
    );
  });

  // Data polygons
  const dataPolygons = dataSets.map((ds, si) => {
    const c = colors[si % colors.length];
    const pts = ds.values.map((val, i) => {
      const r = (val / maxVal) * maxR;
      const angle = -Math.PI / 2 + i * angleStep;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');

    const dotElements = ds.values.map((val, i) => {
      const r = (val / maxVal) * maxR;
      const angle = -Math.PI / 2 + i * angleStep;
      const dotX = cx + r * Math.cos(angle);
      const dotY = cy + r * Math.sin(angle);
      return (
        <circle
          key={`rd-${si}-${i}`}
          cx={dotX} cy={dotY} r={4}
          fill={c}
          stroke="var(--color-bg-surface)"
          strokeWidth={2}
          className="neuron-chart__dot"
          onMouseEnter={() => onHover({ x: dotX, y: dotY, label: axes[i], value: formatNumber(val), color: c, seriesName: ds.name || undefined })}
          onMouseLeave={onLeave}
        />
      );
    });

    return (
      <g key={`rp-${si}`}>
        <polygon
          points={pts}
          fill={c}
          stroke={c}
          strokeWidth={2}
          className={animated ? 'neuron-chart__radar-polygon neuron-chart__radar-polygon--animated' : 'neuron-chart__radar-polygon'}
          style={animated ? { animationDelay: `${si * 120}ms` } as React.CSSProperties : undefined}
        />
        {dotElements}
      </g>
    );
  });

  return <>{rings}{axisLines}{dataPolygons}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sparkline Renderer
// ─────────────────────────────────────────────────────────────────────────────
function SparklineSVG({
  data, colors, width, height, smooth, showArea, animated,
}: {
  data: ChartDataPoint[];
  colors: string[];
  width: number;
  height: number;
  smooth: boolean;
  showArea: boolean;
  animated: boolean;
}) {
  if (data.length === 0) return null;

  const values = data.map(d => d.value);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;
  const pad = 4;

  const points: [number, number][] = values.map((val, i) => {
    const x = pad + (i / Math.max(values.length - 1, 1)) * (width - pad * 2);
    const y = pad + (1 - (val - minVal) / range) * (height - pad * 2);
    return [x, y];
  });

  const pathD = smooth ? smoothPath(points) : straightPath(points);
  const c = colors[0];

  return (
    <>
      {showArea && (
        <path
          d={pathD + ` L ${points[points.length - 1][0]} ${height - pad} L ${points[0][0]} ${height - pad} Z`}
          fill={c}
          className="neuron-chart__sparkline-area"
        />
      )}
      <path
        d={pathD}
        fill="none"
        stroke={c}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'neuron-chart__line neuron-chart__line--animated' : 'neuron-chart__line'}
      />
      {/* Last point indicator */}
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r={3}
        fill={c}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sankey / Flow Chart Renderer
// ─────────────────────────────────────────────────────────────────────────────
interface SankeyChartSVGProps {
  data?: SankeyData;
  colors: string[];
  width: number;
  height: number;
  animated?: boolean;
  onHover?: (data: TooltipData) => void;
  onLeave?: () => void;
}

function SankeyChartSVG({
  data,
  colors,
  width,
  height,
  onHover,
  onLeave,
}: SankeyChartSVGProps) {
  const [hoveredLinkId, setHoveredLinkId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  if (!data || !data.nodes || data.nodes.length === 0) {
    return (
      <text x={width / 2} y={height / 2} textAnchor="middle" fill="var(--color-text-tertiary)" fontSize="13">
        No Sankey data provided
      </text>
    );
  }

  const { stages, nodes, links } = data;

  // Determine stage columns
  const stageIndices = useMemo(() => {
    if (stages && stages.length > 0) {
      return stages.map((_, i) => i);
    }
    return Array.from(new Set(nodes.map(n => n.stage))).sort((a, b) => a - b);
  }, [stages, nodes]);

  const numStages = Math.max(2, stageIndices.length);

  // Compute node values from links
  const computedNodes = useMemo(() => {
    return nodes.map((node, i) => {
      const outgoing = links
        .filter(l => l.source === node.id)
        .reduce((sum, l) => sum + l.value, 0);
      const incoming = links
        .filter(l => l.target === node.id)
        .reduce((sum, l) => sum + l.value, 0);
      const val = node.value ?? Math.max(outgoing, incoming, 1);
      return {
        ...node,
        computedValue: val,
        color: node.color || colors[i % colors.length],
      };
    });
  }, [nodes, links, colors]);

  // Layout bounds
  const hasStageHeaders = stages && stages.length > 0;
  const topPad = hasStageHeaders ? 36 : 20;
  const bottomPad = 24;
  const leftPad = 24;
  const rightPad = 24;
  const nodeWidth = 14;

  const chartW = width - leftPad - rightPad - nodeWidth;
  const chartH = height - topPad - bottomPad;

  // Compute node and link geometries
  const { layoutNodes, layoutLinks } = useMemo(() => {
    const nodesByStage: Record<number, typeof computedNodes> = {};
    stageIndices.forEach(s => {
      nodesByStage[s] = computedNodes.filter(n => n.stage === s);
    });

    // Stage value totals
    const stageTotals = stageIndices.map(s => {
      const stageList = nodesByStage[s] || [];
      return stageList.reduce((sum, n) => sum + n.computedValue, 0);
    });
    const maxStageTotal = Math.max(...stageTotals, 1);

    // Dynamic vertical gap between nodes in a column
    const maxNodesInStage = Math.max(...stageIndices.map(s => (nodesByStage[s] || []).length), 1);
    const gap = Math.max(8, Math.min(20, (chartH * 0.28) / Math.max(1, maxNodesInStage - 1)));
    const usableHeight = Math.max(40, chartH - (maxNodesInStage - 1) * gap);
    const valueScale = usableHeight / maxStageTotal;

    const nodeMap = new Map<string, {
      id: string;
      label: string;
      stage: number;
      color: string;
      computedValue: number;
      x: number;
      y: number;
      w: number;
      h: number;
      sourceOffsetY: number;
      targetOffsetY: number;
    }>();

    stageIndices.forEach((sIdx, colIdx) => {
      const stageList = nodesByStage[sIdx] || [];
      const colX = leftPad + (colIdx / (numStages - 1)) * chartW;

      const heights = stageList.map(n => Math.max(12, n.computedValue * valueScale));
      const totalColHeight = heights.reduce((sum, h) => sum + h, 0) + Math.max(0, stageList.length - 1) * gap;
      let startY = topPad + Math.max(0, (chartH - totalColHeight) / 2);

      stageList.forEach((n, idx) => {
        const h = heights[idx];
        nodeMap.set(n.id, {
          ...n,
          x: colX,
          y: startY,
          w: nodeWidth,
          h,
          sourceOffsetY: 0,
          targetOffsetY: 0,
        });
        startY += h + gap;
      });
    });

    // Build link curves
    const computedLinksList = links.map(link => {
      const src = nodeMap.get(link.source);
      const tgt = nodeMap.get(link.target);
      if (!src || !tgt) return null;

      const hSource = Math.max(2, (link.value / src.computedValue) * src.h);
      const hTarget = Math.max(2, (link.value / tgt.computedValue) * tgt.h);

      const x0 = src.x + src.w;
      const y0_top = src.y + src.sourceOffsetY;
      const y0_bot = y0_top + hSource;
      src.sourceOffsetY += hSource;

      const x1 = tgt.x;
      const y1_top = tgt.y + tgt.targetOffsetY;
      const y1_bot = y1_top + hTarget;
      tgt.targetOffsetY += hTarget;

      const curvature = 0.5;
      const cx0 = x0 + (x1 - x0) * curvature;
      const cx1 = x1 - (x1 - x0) * curvature;

      const path = `M ${x0} ${y0_top} C ${cx0} ${y0_top}, ${cx1} ${y1_top}, ${x1} ${y1_top} L ${x1} ${y1_bot} C ${cx1} ${y1_bot}, ${cx0} ${y0_bot}, ${x0} ${y0_bot} Z`;
      const id = `${link.source}->${link.target}`;

      return {
        id,
        link,
        src,
        tgt,
        x0,
        x1,
        y0_top,
        y1_top,
        path,
        color: link.color || src.color,
      };
    }).filter(Boolean);

    return {
      layoutNodes: Array.from(nodeMap.values()),
      layoutLinks: computedLinksList as NonNullable<typeof computedLinksList[0]>[],
    };
  }, [stageIndices, computedNodes, links, leftPad, rightPad, topPad, chartW, chartH, numStages]);

  return (
    <g className="neuron-chart__sankey">
      {/* Gradient Definitions for Flow Ribbons */}
      <defs>
        {layoutLinks.map(l => (
          <linearGradient
            key={`sankey-grad-${l.id}`}
            id={`sankey-grad-${l.id.replace(/[^a-zA-Z0-9]/g, '_')}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={l.src.color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={l.tgt.color} stopOpacity="0.45" />
          </linearGradient>
        ))}
      </defs>

      {/* Stage Column Headers */}
      {stages && stages.length > 0 && stages.map((stageName, s) => {
        const colX = leftPad + (s / (numStages - 1)) * chartW;
        const anchor = s === 0 ? 'start' : s === numStages - 1 ? 'end' : 'middle';
        const textX = s === 0 ? colX : s === numStages - 1 ? colX + nodeWidth : colX + nodeWidth / 2;
        return (
          <text
            key={stageName}
            x={textX}
            y={18}
            textAnchor={anchor}
            className="neuron-chart__sankey-stage-header"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.08em"
            fill="var(--color-text-secondary)"
          >
            {stageName.toUpperCase()}
          </text>
        );
      })}

      {/* Links (Bezier Flow Ribbons) */}
      <g className="neuron-chart__sankey-links">
        {layoutLinks.map(l => {
          const gradId = `sankey-grad-${l.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
          const isDirectlyHovered = hoveredLinkId === l.id;
          const isConnectedNodeHovered = hoveredNodeId === l.src.id || hoveredNodeId === l.tgt.id;
          const isDimmed = (hoveredLinkId && !isDirectlyHovered) || (hoveredNodeId && !isConnectedNodeHovered);

          return (
            <path
              key={l.id}
              d={l.path}
              fill={`url(#${gradId})`}
              stroke={isDirectlyHovered || isConnectedNodeHovered ? l.src.color : 'transparent'}
              strokeWidth={isDirectlyHovered || isConnectedNodeHovered ? 1.5 : 0}
              opacity={isDimmed ? 0.15 : isDirectlyHovered || isConnectedNodeHovered ? 0.85 : 0.4}
              style={{
                cursor: 'pointer',
                transition: 'opacity 0.22s ease, stroke-width 0.2s ease',
              }}
              onMouseEnter={() => {
                setHoveredLinkId(l.id);
                onHover?.({
                  label: `${l.src.label} → ${l.tgt.label}`,
                  value: String(l.link.value),
                  color: l.src.color,
                  x: (l.x0 + l.x1) / 2,
                  y: (l.y0_top + l.y1_top) / 2,
                });
              }}
              onMouseLeave={() => {
                setHoveredLinkId(null);
                onLeave?.();
              }}
            />
          );
        })}
      </g>

      {/* Nodes (Vertical Bars) & Inline Labels */}
      <g className="neuron-chart__sankey-nodes">
        {layoutNodes.map(node => {
          const isNodeHovered = hoveredNodeId === node.id;
          const isColLast = node.stage === numStages - 1;

          // Label placement
          const labelX = isColLast ? node.x - 8 : node.x + node.w + 8;
          const labelAnchor = isColLast ? 'end' : 'start';
          const labelY = node.y + Math.min(14, node.h / 2 + 4);

          return (
            <g
              key={node.id}
              className="neuron-chart__sankey-node"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => {
                setHoveredNodeId(node.id);
                onHover?.({
                  label: node.label,
                  value: String(node.computedValue),
                  color: node.color,
                  x: node.x + node.w / 2,
                  y: node.y + node.h / 2,
                });
              }}
              onMouseLeave={() => {
                setHoveredNodeId(null);
                onLeave?.();
              }}
            >
              {/* Vertical node bar */}
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={3}
                fill={node.color}
                filter={isNodeHovered ? 'drop-shadow(0 0 4px rgba(0,0,0,0.25))' : undefined}
                style={{
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  transformOrigin: `${node.x + node.w / 2}px ${node.y + node.h / 2}px`,
                  transform: isNodeHovered ? 'scaleX(1.15)' : 'scaleX(1)',
                }}
              />

              {/* Node Label Text */}
              <text
                x={labelX}
                y={labelY}
                textAnchor={labelAnchor}
                fontSize="11.5"
                fill="var(--color-text-primary)"
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                <tspan fontWeight="500">{node.label} </tspan>
                <tspan fontWeight="700" fill={node.color}>{node.computedValue}</tspan>
              </text>
            </g>
          );
        })}
      </g>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main NeuronChart Component
// ─────────────────────────────────────────────────────────────────────────────
export default function NeuronChart({
  type,
  data,
  series,
  categories,
  sankeyData,
  orientation = 'vertical',
  stacked = false,
  smooth = true,
  showArea = false,
  showDots = true,
  innerRadius = 0.55,
  size = 'md',
  colorScheme = 'spectrum',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  animated = true,
  title,
  subtitle,
  ariaLabel,
  className = '',
  style,
}: NeuronChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const { width, height, padding } = SIZE_CONFIG[size];
  const colors = useMemo(() => {
    const count = Math.max(
      data?.length || 0,
      series?.length || 0,
      categories?.length || 0,
      sankeyData?.nodes?.length || 0,
      8
    );
    return getColors(colorScheme, count);
  }, [colorScheme, data, series, categories, sankeyData]);

  const handleHover = useCallback((d: TooltipData) => {
    if (showTooltip) setTooltip(d);
  }, [showTooltip]);

  const handleLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Legend items
  const legendItems = useMemo(() => {
    if (series && series.length > 0) {
      return series.map((s, i) => ({
        label: s.name,
        color: s.color || colors[i % colors.length],
      }));
    }
    if (data && (type === 'pie' || type === 'donut')) {
      return data.map((d, i) => ({
        label: d.label,
        color: d.color || colors[i % colors.length],
      }));
    }
    return [];
  }, [series, data, colors, type]);

  // Determine if sparkline (special compact mode)
  const isSparkline = type === 'sparkline';

  if (isSparkline) {
    return (
      <div className={`neuron-chart neuron-chart--sparkline ${className}`} style={style}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${120} ${32}`}
          width="100%"
          height="32"
          preserveAspectRatio="none"
          role="img"
          aria-label={ariaLabel || 'Sparkline chart'}
        >
          <SparklineSVG
            data={data || []}
            colors={colors}
            width={120}
            height={32}
            smooth={smooth}
            showArea={showArea}
            animated={animated}
          />
        </svg>
      </div>
    );
  }

  // Render main chart SVG content
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChartSVG
            data={data}
            series={series}
            categories={categories}
            orientation={orientation}
            stacked={stacked}
            colors={colors}
            width={width}
            height={height}
            padding={padding}
            showGrid={showGrid}
            showLabels={showLabels}
            animated={animated}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        );
      case 'line':
        return (
          <LineChartSVG
            data={data}
            series={series}
            categories={categories}
            smooth={smooth}
            showArea={showArea}
            showDots={showDots}
            colors={colors}
            width={width}
            height={height}
            padding={padding}
            showGrid={showGrid}
            showLabels={showLabels}
            animated={animated}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        );
      case 'pie':
        return (
          <PieChartSVG
            data={data || []}
            innerRadius={0}
            colors={colors}
            width={width}
            height={height}
            showLabels={showLabels}
            animated={animated}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        );
      case 'donut':
        return (
          <PieChartSVG
            data={data || []}
            innerRadius={innerRadius}
            colors={colors}
            width={width}
            height={height}
            showLabels={showLabels}
            animated={animated}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        );
      case 'radar':
        return (
          <RadarChartSVG
            data={data}
            series={series}
            categories={categories}
            colors={colors}
            width={width}
            height={height}
            showLabels={showLabels !== false}
            animated={animated}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        );
      case 'sankey':
        return (
          <SankeyChartSVG
            data={sankeyData}
            colors={colors}
            width={width}
            height={height}
            animated={animated}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`neuron-chart neuron-chart--${size} neuron-chart--${type} ${className}`}
      style={style}
      role="figure"
      aria-label={ariaLabel || title || `${type} chart`}
    >
      {(title || subtitle) && (
        <div className="neuron-chart__header">
          {title && <h3 className="neuron-chart__title">{title}</h3>}
          {subtitle && <p className="neuron-chart__subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="neuron-chart__canvas" style={{ position: 'relative' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className="neuron-chart__svg"
        >
          {renderChart()}
        </svg>
        <ChartTooltip data={tooltip} containerRef={svgRef} />
      </div>

      {showLegend && legendItems.length > 0 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  );
}
