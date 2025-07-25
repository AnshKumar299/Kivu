import React, { useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { selectBalanceByCategory } from '../features/selectors/balanceSelectors';

// Color palette
const colorMap = {
  rent:          '#60a5fa', // blue-400
  food:          '#fdba74', // orange-300
  clothing:      '#f87171', // red-400
  taxes:         '#38bdf8', // sky-400
  bills:         '#4ade80', // green-400
  miscellaneous: '#f472b6', // pink-400
};

// Helper function
const toTitle = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const PieDistribution = () => {
  const balance = useSelector(selectBalanceByCategory);
  const { isLoading, error } = useSelector((state) => state.transacs);

  // Build data set only once per state change
  const { data } = useMemo(() => {
    const entries = Object.entries(balance)
      .filter(([k, v]) => k !== 'net' && typeof v === 'number' && v > 0);

    const totalVal = entries.reduce((sum, [, v]) => sum + v, 0);

    const pieData = entries.map(([k, v], idx) => ({
      id     : idx,
      value  : v,
      label  : toTitle(k),
      color  : colorMap[k] || '#a1a1aa',          // slate-400 fallback
      percent: totalVal ? (v / totalVal) * 100 : 0,
    }));

    return { data: pieData, total: totalVal };
  }, [balance]);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <span className="animate-spin h-8 w-8 border-4 border-amber-200 border-t-amber-600 rounded-full" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full text-center text-red-600 py-8">
        Failed to load chart – {String(error)}
      </div>
    );
  }

  // Empty state
  if (!data.length) {
    return (
      <div className="w-full text-center text-gray-500 py-8">
        No spending data yet.
      </div>
    );
  }

  // Main render
  return (
    <div className="relative bg-slate-50 rounded-3xl border border-slate-300 p-6 shadow-md">
      <h2 className="text-center font-robotoserif text-2xl font-bold text-slate-700 mb-4">
        Category-wise Analysis
      </h2>

      {/* Pie chart without center display */}
      <div className="flex justify-center">
        <PieChart
          series={[
            {
              innerRadius : 40,
              outerRadius : 100,
              paddingAngle: 3,
              data        : data.map(({ id, value, label, color }) => ({
                id, value, label, color,
              })),
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 40, additionalRadius: -40, color: '#cbd5e1' },
            },
          ]}
          width={260}
          height={260}
        />
      </div>

      {/* Legend */}
      <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.map(({ id, label, percent, color }) => (
          <li key={id} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-quicksand text-sm text-slate-700">
              {label} 
              <span className="text-slate-500 ml-1">
                {percent.toFixed(1)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PieDistribution;
