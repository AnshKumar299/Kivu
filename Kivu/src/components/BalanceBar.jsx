import React, { useState, useEffect } from "react";
import SegmentedProgressBar from "./ui/SegmentedProgressBar";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./ui/modal";
import { selectBalanceByCategory } from "../features/selectors/balanceSelectors";
import {
  fetchSavingsGoal,
  saveSavingsGoal,
} from "../features/moneydata/savingsGoalSlice";

function BalanceBar() {
  const dispatch = useDispatch();

  const {
    _id: goalId,
    targetAmount: goal,
    checked,
    isLoading,
  } = useSelector((state) => state.savingsGoal);

  // Fallback to computed savings if backend doesn't send savedAmount
  const localSavings = useSelector(selectBalanceByCategory).savings;
  const savings = localSavings;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch goal when component mounts
  useEffect(() => {
    dispatch(fetchSavingsGoal());
  }, [dispatch]);

  // Sync tempGoal when backend goal changes
  useEffect(() => {
    setTempGoal(goal);
  }, [goal]);

  // Animate savings value
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const increment = savings / 50;
      let current = 0;
      const animateTimer = setInterval(() => {
        current += increment;
        if (current >= savings) {
          setAnimatedSavings(savings);
          clearInterval(animateTimer);
        } else {
          setAnimatedSavings(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(animateTimer);
    }, 300);
    return () => clearTimeout(timer);
  }, [savings]);

  const progressPercentage =
    goal === 0 ? 0 : Math.min((savings / goal) * 100, 100);
  const isGoalReached = savings >= goal && goal > 0;
  const progressSegments = [{ value: savings, color: "green" }];

  const getMotivationalMessage = () => {
    if (goal === 0) return "Set a goal to start your savings journey! 🎯";
    if (progressPercentage === 0)
      return "Every rupee counts! Start saving today 💪";
    if (progressPercentage < 25) return "Great start! Keep building momentum 🚀";
    if (progressPercentage < 50)
      return "You're making progress! Stay consistent 💎";
    if (progressPercentage < 75)
      return "More than halfway there! Keep going 🔥";
    if (progressPercentage < 100)
      return "So close to your goal! Final push 🏃‍♂️";
    return "Congratulations! Goal achieved! 🎉";
  };

  const handleSaveGoal = () => {
    const newGoal = Number(tempGoal);
    if (newGoal < 0) {
      alert("Goal cannot be negative!");
      return;
    }
    dispatch(saveSavingsGoal({ goalId, targetAmount: newGoal }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setTempGoal(goal);
    setIsModalOpen(false);
  };

  if (!checked || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-emerald-600 font-bold">Loading your goal...</p>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-amber-200/20 rounded-full blur-lg"></div>

      <div className="relative bg-gradient-to-br from-amber-50 via-emerald-50/30 to-amber-100 p-8 border border-amber-200/50 rounded-3xl shadow-xl backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full"></div>
            <h2 className="font-quicksand font-extrabold text-3xl bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 bg-clip-text text-transparent">
              Savings Progress
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/50 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="font-quicksand text-emerald-700 font-medium">
                {getMotivationalMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar + stats */}
        <div className="space-y-6">
          <div className="relative">
            <SegmentedProgressBar segments={progressSegments} totalValue={goal} />
            {isGoalReached && (
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                🎉
              </div>
            )}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className={`text-4xl font-extrabold font-robotoserif mb-2 ${
                    isGoalReached ? "text-emerald-600" : "text-green-700"
                  }`}
                >
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-gray-600 font-quicksand font-medium">
                  Progress Made
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold font-robotoserif text-amber-700 mb-2">
                  ₹{(animatedSavings ?? 0).toLocaleString()}
                </div>
                <p className="text-gray-600 font-quicksand font-medium">
                  Current Savings
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold font-robotoserif text-slate-700 mb-2">
                  ₹{(goal ?? 0).toLocaleString()}
                </div>
                <p className="text-gray-600 font-quicksand font-medium">
                  Target Goal
                </p>
              </div>
            </div>

            {goal > 0 && savings < goal && (
              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700 font-medium font-quicksand">
                    Amount needed to reach goal:
                  </span>
                  <span className="font-bold text-orange-800 font-robotoserif text-lg">
                    ₹{(goal - savings).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            {!isModalOpen && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-2xl font-bold font-quicksand text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-emerald-500/30"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  {goal === 0 ? "Set Your Goal" : "Update Goal"}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            )}
          </div>
        </div>

        {/* Modal for setting/updating goal */}
        <Modal
          isOpen={isModalOpen}
          title={goal === 0 ? "Set Your Savings Goal" : "Update Your Goal"}
          onClose={handleCancel}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="Goal"
                className="block font-bold font-robotoserif text-slate-700 text-lg mb-3"
              >
                {goal === 0 ? "Enter your savings goal:" : "Update your goal:"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  id="Goal"
                  className="w-full pl-8 pr-4 py-4 border-2 border-gray-300 rounded-2xl font-robotoserif font-bold text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(e.target.value)}
                  placeholder="Enter amount..."
                  min="0"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2 font-quicksand">
                  Quick suggestions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[10000, 25000, 50000, 100000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTempGoal(amount)}
                      className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full text-sm font-medium transition-colors duration-200"
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {tempGoal > 0 && (
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-700 font-medium">
                    Progress with new goal:
                  </span>
                  <span className="font-bold text-emerald-800">
                    {Math.round((savings / Number(tempGoal)) * 100) || 0}%
                  </span>
                </div>
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleCancel}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoal}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {goal === 0 ? "Set Goal" : "Update Goal"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default BalanceBar;
