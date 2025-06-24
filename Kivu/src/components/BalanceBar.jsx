import React, { useState } from "react";
import SegmentedProgressBar from "./ui/SegmentedProgressBar";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./ui/modal";
import { selectBalanceByCategory } from "../features/selectors/balanceSelectors";
import { addSavings,updateGoal,resetEverything } from "../features/moneydata/savingsGoalSlice";


function BalanceBar() {
  const dispatch = useDispatch();
  let goal = useSelector((state) => state.savingsGoal.goal);
  const savings = useSelector(selectBalanceByCategory).savings;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tempgoal,setTempGoal]=useState(goal);

  const progressSegments = [{ value: savings, color: "green" }];

  return (
    <div className="h-full w-full p-12 border-2 rounded-4xl bg-amber-100">
      <div className="font-quicksand font-extrabold pb-5 text-2xl text-emerald-700 ">
        Savings Progress Bar:
      </div>
      <div>
        <SegmentedProgressBar segments={progressSegments} totalValue={goal} />
        <div className="w-full flex justify-between p-1 font-quicksand font-bold text-slate-600 mt-2">
          <div>
            <span className="text-green-800 font-bold ">
              {goal === 0 ? 0 : Math.round((savings / goal) * 100)}%{" "}
            </span>{" "}
            Reached
          </div>
          <div>
            ₹ {savings}/{goal}
          </div>
        </div>
        <div>
          {!isModalOpen && (
            <button onClick={() => setIsModalOpen(true)} className="bg-green-700 text-white p-2 rounded-full mt-4 hover:bg-green-500 transition ease-linear delay-25 duration-70">
              Change Goal
            </button>
          )}

          <Modal
            isOpen={isModalOpen}
            title="Change Goal"
            onClose={() => setIsModalOpen(false)}
          >
            <div className="my-3 text-lg">
              <label htmlFor="Goal" className="font-bold font-robotoserif text-slate-700">New Goal:</label>
              <input type="text" id='Goal' className="px-2 border-2 rounded-3xl ml-1 font-edu p-1 font-bold w-9/12" value={tempgoal} onChange={(e)=>setTempGoal(e.target.value)}/>
            </div>

            <div className="flex py-2 justify-between">
              <div onClick={()=>{
                setTempGoal(goal);
                setIsModalOpen(false);
              }} className="bg-red-700 px-3 text-white rounded-lg py-1 hover:bg-red-600">
                Cancel
              </div>
              <div onClick={()=>{
                dispatch(updateGoal(Number(tempgoal)));
                setIsModalOpen(false);
              }} className="bg-green-700 px-3 text-white rounded-lg py-1 hover:bg-green-600">
                Save
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BalanceBar;
