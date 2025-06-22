import React from "react";
import SegmentedProgressBar from "./ui/SegmentedProgressBar";
import { useSelector, useDispatch } from "react-redux";

function BalanceBar() {
  let goal= useSelector((state)=> state.savingsGoal.goal)
  let savings = useSelector((state) => state.savingsGoal.current);
  const progressSegments = [
    { value: savings, color: 'green'},
  ];

  return (
    <div className='px-10 w-8/9 border-2 p-10 rounded-4xl bg-amber-100'>
        <div className="font-quicksand font-extrabold pb-5 text-2xl text-emerald-700 ">
            Savings Progress Bar:
        </div>
      <div>
        <SegmentedProgressBar segments={progressSegments} totalValue={goal} />
        <div className="w-full flex justify-between p-1 font-quicksand font-bold text-slate-600 mt-2">
            <div>
                <span className="text-green-800 font-bold ">{Math.round(savings/goal*100)}% </span> Reached
            </div>
            <div >
                ₹ {savings}/{goal}
            </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceBar;
