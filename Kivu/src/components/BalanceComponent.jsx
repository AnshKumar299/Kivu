import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectBalanceByCategory } from '../features/selectors/balanceSelectors';

function getTop3Spends(balance) {
  return Object.entries(balance)
    .filter(([key]) => !['net', 'savings', 'remaining'].includes(key))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
}

function toProperCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

const colormap = {
  rent: { text: 'text-blue-900', bg: 'bg-blue-400' },
  food: { text: 'text-amber-900', bg: 'bg-amber-400' },
  clothing: { text: 'text-red-900', bg: 'bg-red-400' },
  taxes: { text: 'text-sky-900', bg: 'bg-sky-400' },
  bills: { text: 'text-green-900', bg: 'bg-green-400' },
  miscellaneous: { text: 'text-pink-900', bg: 'bg-pink-400' },
  default: { text: 'text-gray-900', bg: 'bg-gray-400' },
};

export default function BalanceComponent() {
  const balance = useSelector(selectBalanceByCategory);
  const top3 = getTop3Spends(balance);

  return (
    <div className="border-2 rounded-4xl h-full w-full">
      <div className="p-8">
        <h1 className="font-robotoserif font-extrabold text-4xl text-slate-700">
          ₹<span className="text-black p-1 text-6xl">{balance.remaining}</span>.00
        </h1>
        <p className="font-quicksand pl-2 text-lg">
          remaining balance
        </p>
      </div>

      <div className="pt-4 h-full w-full">
        <h2 className="font-quicksand text-2xl font-bold text-red-800 pb-2 pl-4">
          Top 3 spends:
        </h2>
        <ul>
          {top3.map(([category, amount], index) => {
            const { text, bg } = colormap[category] || colormap.default;
            const isLast = index === top3.length - 1;
            return (
              <li
                key={category}
                className={`flex justify-between text-xl ${text} ${bg} p-2 pl-4 ${isLast ? 'pb-2.5 rounded-b-4xl' : ''}`}
              >
                <p>{toProperCase(category)}:</p>
                <p>{amount}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
