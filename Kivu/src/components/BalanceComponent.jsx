import * as React from 'react';
import { useSelector } from 'react-redux';

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

export default function BalanceComponent() {
  const balance = useSelector((state) => state.balance);
    const top3=getTop3Spends(balance);
  return (
    <div className="border-2 rounded-4xl h-full w-full ">
      <div className='p-8'>
        <h1 className='font-robotoserif font-extrabold text-4xl text-slate-700 '>
        ₹<span className='text-black p-1 text-6xl'>{balance.remaining}</span>.00
      </h1>
      <p className='font-quicksand pl-2 text-lg '>
        remaining balance
      </p>
      </div>
      <div className='pt-4 h-full w-full'>
        <h2 className='font-quicksand text-2xl font-bold text-red-800 pb-2 pl-4'>Top 3 spends:</h2>
        <ul>
            <li className='flex justify-between text-xl text-blue-900 bg-blue-400 h-full w-full p-2 pl-4'>
                <p>{toProperCase(top3[0][0])}:</p>
                <p>{top3[0][1]}</p>
            </li>
            <li className='flex justify-between text-xl text-green-800 bg-green-400 p-2 pl-4'>
                <p>{toProperCase(top3[1][0])}:</p>
                <p>{top3[1][1]}</p>
            </li>
            <li className='flex justify-between text-xl text-amber-900 bg-amber-400 h-full w-full p-2 pl-4 pb-2.5 rounded-b-4xl'>
                <p>{toProperCase(top3[2][0])}:</p>
                <p>{top3[2][1]}</p>
            </li>
        </ul>

      </div>
    </div>
  );
}
