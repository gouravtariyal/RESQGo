import { useEffect, useState, useId } from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  RefreshCw,
  BarChart3,
  LineChart as LineChartIcon,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import api from '../lib/api';

type DataPoint = {
  date: string;
  label: string;
  dayName?: string;
  count: number;
  verified: number;
  blocked: number;
  cumulative: number;
};

type AnalyticsSummary = {
  totalInPeriod: number;
  verifiedInPeriod: number;
  blockedInPeriod: number;
  totalUsersAllTime: number;
  blockedUsersTotal: number;
  verifiedUsersTotal: number;
  dailyAverage: number;
  peakCount: number;
  peakDate: string;
};

type ApiResponse = {
  success: boolean;
  range: string;
  data: DataPoint[];
  summary: AnalyticsSummary;
};

type RangeOption = '7d' | '14d' | '30d' | '90d' | '1y';

interface UserOnboardingChartProps {
  title?: string;
  description?: string;
  onUserSelect?: () => void;
}

export default function UserOnboardingChart({
  title = 'User Onboarding Velocity',
  description = 'Track daily and cumulative user sign-ups and onboarding growth.',
}: UserOnboardingChartProps) {
  const [range, setRange] = useState<RangeOption>('30d');
  const [viewType, setViewType] = useState<'area' | 'bar'>('area');
  const [metricType, setMetricType] = useState<'new' | 'cumulative'>('new');
  const [data, setData] = useState<DataPoint[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gradientId = useId();

  const fetchData = async (selectedRange: RangeOption) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await api.get<ApiResponse>(`/analytics/onboarding?range=${selectedRange}`);
      if (res.data.success) {
        setData(res.data.data);
        setSummary(res.data.summary);
      } else {
        setError('Failed to fetch onboarding analytics.');
      }
    } catch {
      setError('Unable to load onboarding analytics data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
  }, [range]);

  // Chart coordinate calculations
  const chartWidth = 840;
  const chartHeight = 260;
  const padding = { top: 25, right: 30, bottom: 40, left: 45 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const values = data.map(d => (metricType === 'new' ? d.count : d.cumulative));
  const rawMax = Math.max(...values, 1);
  // Round up max for nice axis ticks
  const maxVal = rawMax <= 5 ? 5 : Math.ceil(rawMax / 5) * 5;
  const yTicks = [0, Math.round(maxVal / 2), maxVal];

  const getCoordinates = (index: number, val: number) => {
    if (data.length <= 1) {
      return {
        x: padding.left + innerWidth / 2,
        y: padding.top + innerHeight - (val / maxVal) * innerHeight,
      };
    }
    const x = padding.left + (index / (data.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - (val / maxVal) * innerHeight;
    return { x, y };
  };

  const points = data.map((d, i) => getCoordinates(i, metricType === 'new' ? d.count : d.cumulative));

  // Build SVG path
  const pathD = (() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      d += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  })();

  const areaD = (() => {
    if (points.length === 0) return '';
    const bottomY = padding.top + innerHeight;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  })();

  // Visible x-axis tick step
  const tickStep = data.length > 25 ? Math.ceil(data.length / 7) : data.length > 12 ? 3 : 1;

  const hoveredPoint = hoveredIndex !== null && data[hoveredIndex] ? data[hoveredIndex] : null;
  const hoveredCoord = hoveredIndex !== null && points[hoveredIndex] ? points[hoveredIndex] : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{title}</h2>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric selector: New vs Cumulative */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => setMetricType('new')}
              className={`px-2.5 py-1.5 rounded-md transition ${
                metricType === 'new'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daily New
            </button>
            <button
              onClick={() => setMetricType('cumulative')}
              className={`px-2.5 py-1.5 rounded-md transition ${
                metricType === 'cumulative'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cumulative
            </button>
          </div>

          {/* Chart style: Area vs Bar */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs">
            <button
              onClick={() => setViewType('area')}
              title="Area Chart"
              className={`p-1.5 rounded-md transition ${
                viewType === 'area' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LineChartIcon size={16} />
            </button>
            <button
              onClick={() => setViewType('bar')}
              title="Bar Chart"
              className={`p-1.5 rounded-md transition ${
                viewType === 'bar' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart3 size={16} />
            </button>
          </div>

          {/* Time range picker */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            {(
              [
                { id: '7d', label: '7D' },
                { id: '14d', label: '14D' },
                { id: '30d', label: '30D' },
                { id: '90d', label: '90D' },
                { id: '1y', label: '1Y' },
              ] as const
            ).map(opt => (
              <button
                key={opt.id}
                onClick={() => setRange(opt.id)}
                className={`px-2.5 py-1.5 rounded-md transition ${
                  range === opt.id
                    ? 'bg-red-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={() => fetchData(range)}
            disabled={isLoading}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
            title="Refresh analytics data"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Analytics KPI Ribbon */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="text-xs text-slate-500 font-medium block">Onboarded in Period</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-slate-800">{summary.totalInPeriod}</span>
              <span className="text-xs text-slate-500">users</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="text-xs text-slate-500 font-medium block">Average / Interval</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-slate-800">{summary.dailyAverage}</span>
              <span className="text-xs text-slate-500">{range === '1y' ? 'users/mo' : 'users/day'}</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="text-xs text-slate-500 font-medium block">Verified in Period</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-emerald-600">{summary.verifiedInPeriod}</span>
              <span className="text-xs text-emerald-600/80 font-medium inline-flex items-center gap-0.5">
                <ShieldCheck size={12} />
                {summary.totalInPeriod > 0
                  ? `${Math.round((summary.verifiedInPeriod / summary.totalInPeriod) * 100)}%`
                  : '0%'}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="text-xs text-slate-500 font-medium block">Peak Onboarding</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-red-600">{summary.peakCount}</span>
              <span className="text-xs text-slate-500 truncate" title={summary.peakDate}>
                {summary.peakCount > 0 ? `on ${summary.peakDate}` : 'none'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Chart Visualization */}
      <div className="relative">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => fetchData(range)}
              className="text-xs font-semibold underline text-red-800 hover:text-red-950"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="h-64 w-full flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-100 text-slate-400">
            <RefreshCw size={24} className="animate-spin mb-2 text-red-500" />
            <span className="text-xs font-medium">Aggregating onboarding trends...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="h-64 w-full flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-100 text-slate-400">
            <Users size={32} className="mb-2 text-slate-300" />
            <span className="text-sm font-medium">No user onboarding records in this timeframe.</span>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            {/* SVG Interactive Canvas */}
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-64 select-none touch-none overflow-visible"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.32" />
                  <stop offset="75%" stopColor="#ef4444" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines and Y-axis labels */}
              {yTicks.map(tick => {
                const y = padding.top + innerHeight - (tick / maxVal) * innerHeight;
                return (
                  <g key={tick}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1.5"
                      strokeDasharray={tick === 0 ? 'none' : '4 4'}
                    />
                    <text
                      x={padding.left - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="text-[11px] fill-slate-400 font-sans"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Area & Line View */}
              {viewType === 'area' && (
                <>
                  <path d={areaD} fill={`url(#${gradientId})`} />
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Render subtle dots at data points */}
                  {points.map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredIndex === i ? 5 : data.length < 15 ? 3 : 1.5}
                      className={`transition-all ${
                        hoveredIndex === i
                          ? 'fill-red-600 stroke-white stroke-2'
                          : 'fill-red-500 opacity-70'
                      }`}
                    />
                  ))}
                </>
              )}

              {/* Bar View */}
              {viewType === 'bar' && (
                <g>
                  {data.map((d, i) => {
                    const val = metricType === 'new' ? d.count : d.cumulative;
                    const barWidth = Math.max(
                      3,
                      Math.min(28, (innerWidth / data.length) * 0.65)
                    );
                    const pt = getCoordinates(i, val);
                    const barHeight = padding.top + innerHeight - pt.y;
                    const isHovered = hoveredIndex === i;

                    return (
                      <rect
                        key={i}
                        x={pt.x - barWidth / 2}
                        y={pt.y}
                        width={barWidth}
                        height={Math.max(1.5, barHeight)}
                        rx={Math.min(3, barWidth / 2)}
                        className={`transition-all cursor-pointer ${
                          isHovered
                            ? 'fill-red-600 opacity-100'
                            : val > 0
                            ? 'fill-red-500 hover:fill-red-600 opacity-85'
                            : 'fill-slate-200'
                        }`}
                      />
                    );
                  })}
                </g>
              )}

              {/* Hover highlight guide & crosshair */}
              {hoveredIndex !== null && hoveredCoord && (
                <g pointerEvents="none">
                  <line
                    x1={hoveredCoord.x}
                    y1={padding.top}
                    x2={hoveredCoord.x}
                    y2={padding.top + innerHeight}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={hoveredCoord.x}
                    cy={hoveredCoord.y}
                    r={6}
                    fill="#b91c1c"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* X-axis tick labels */}
              {data.map((d, i) => {
                const shouldShow = i % tickStep === 0 || i === data.length - 1;
                if (!shouldShow) return null;
                const pt = getCoordinates(i, 0);

                return (
                  <text
                    key={i}
                    x={pt.x}
                    y={padding.top + innerHeight + 20}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-sans"
                  >
                    {d.label}
                  </text>
                );
              })}

              {/* Transparent hit boxes for seamless mouse tracking */}
              {data.map((_, i) => {
                const stepWidth = innerWidth / data.length;
                const hitX = padding.left + i * stepWidth;
                return (
                  <rect
                    key={i}
                    x={hitX - stepWidth / 2}
                    y={padding.top}
                    width={stepWidth}
                    height={innerHeight + 10}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>

            {/* Interactive Tooltip Card */}
            {hoveredPoint && hoveredCoord && (
              <div
                className="absolute z-20 pointer-events-none transition-all duration-75 bg-slate-900/95 text-white backdrop-blur-xs px-3.5 py-2.5 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700 -translate-x-1/2 -translate-y-full mb-3"
                style={{
                  left: `${(hoveredCoord.x / chartWidth) * 100}%`,
                  top: `${Math.max(15, (hoveredCoord.y / chartHeight) * 100 - 8)}%`,
                }}
              >
                <div className="flex items-center gap-1.5 font-semibold text-slate-200 border-b border-slate-800 pb-1">
                  <Calendar size={12} className="text-red-400" />
                  <span>
                    {hoveredPoint.label}
                    {hoveredPoint.dayName ? ` (${hoveredPoint.dayName})` : ''}
                  </span>
                </div>
                <div className="pt-0.5 space-y-0.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Onboarded:</span>
                    <span className="font-bold text-red-400">{hoveredPoint.count} users</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Verified:</span>
                    <span className="font-medium text-emerald-400">{hoveredPoint.verified}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Cumulative:</span>
                    <span className="font-medium text-slate-300">{hoveredPoint.cumulative}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Footer with Context Details */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span>New User Registrations (Onboarding timeline)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-600">
            <CheckCircle2 size={13} className="text-emerald-500" /> Total Users in DB:{' '}
            <strong className="text-slate-800 font-semibold">{summary?.totalUsersAllTime ?? '—'}</strong>
          </span>
          <span className="flex items-center gap-1 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Blocked Users:{' '}
            <strong className="text-red-600 font-semibold">{summary?.blockedUsersTotal ?? 0}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

