import React from 'react'
import { useSelector } from 'react-redux'

function toProperCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}


const Transaction = ({transactionData}) => {
  const category=transactionData.category;
  const categoryPallete=useSelector((state)=>state.colors?.[category]);
  const bgcolor=categoryPallete?.bg;
  const textcolor =categoryPallete?.text;
  const icon=categoryPallete?.icon;
  const type=transactionData.type;

  return (
    <div className={`hover:scale-110 m-3 transform ease-linear delay-20 duration-100 border-1 p-3 m-2 rounded-4xl bg-gradient-to-r ${type==='sent'?'from-red-500 to-red-200':'from-green-500 to-green-300'}`}>
      <div className='flex pb-2 items-center justify-between border-b-2 border-slate-600 '>
        <div className='text-black  font-bold pl-2 m-1 text-lg italic font-quicksand'>
          {transactionData.hasOwnProperty('note')?transactionData.note:'No heading'}
        </div>
        <div className={`px-4 border-2 rounded-xl m-2 text-lg font-bold ${textcolor} ${bgcolor}`}>
          {icon}
          {toProperCase(transactionData.category)}
        </div>
      </div>

      <div className='flex justify-between'>
        <div className={`font-bold text-xl pl-5 m-1 font-quicksand ${transactionData.type==='sent'?'text-red-900':'text-green-800'}`}>
          {transactionData.type==='sent'?'-':'+'}
          {transactionData.amount}
        </div>
        <div className='flex w-36 pt-3 pr-5 justify-between text-slate-700 text-xs'>
          <div>
            {new Date(transactionData.timestamp).toLocaleTimeString()}
          </div> 
          <div>
            {new Date(transactionData.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
