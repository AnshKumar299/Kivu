import React from 'react'
import { useSelector } from 'react-redux';
import Transaction from './ui/Transaction';
import { NavLink } from 'react-router-dom';

const LastTransactions = () => {
  const txnlist =useSelector((state)=>state.transacs.data);

  const sortedList = [...txnlist].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className=' border-3 rounded-4xl p-5 pt-8 bg-sky-300'>
      <h1 className='pl-6 pb-4 text-3xl font-bold font-quicksand text-blue-800'>
        Recent Transactions:</h1>
      {sortedList.slice(0, 3).map((txn) => (
        <Transaction transactionData={txn} />
      ))}
      <div className='flex justify-end p-3 pt-5'>
        <div className='bg-sky-800 p-4 rounded-2xl hover:bg-sky-600 transform ease-in delay-75 duration-75'>
          <NavLink
          to="/Transactions"
          className='text-sky-300 font-quicksand font-bold text-2xl flex items-centerh-full'
        >
          Go to Transactions >>
        </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LastTransactions
