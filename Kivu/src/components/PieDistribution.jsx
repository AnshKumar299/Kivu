import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';

export default function PieDistribution() {
  const balance = useSelector((state) => state.balance);

  const distribution = Object.entries(balance)
    .filter(([key]) => key !== 'net' && typeof balance[key] === 'number')
    .map(([key, value], index) => ({
      id: index,
      value,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));

  return (
    <div className="bg-slate-200 rounded-[2rem] border-2 border-slate-400 p-6 w-full max-w-5xl mx-auto shadow-sm">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
        Category-wise Analysis
      </h2>
      <div className="flex justify-center">
        <PieChart
          height={250}
          width={250} // try 600 or more if needed
          series={[
            {
              data: distribution,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: 'gray',
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
