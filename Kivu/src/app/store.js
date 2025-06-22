import { configureStore } from '@reduxjs/toolkit'
import nameReducer from '../features/userdata/usernameSlice'
import balanceReducer from '../features/moneydata/balanceSlice'
import savingsGoalReducer from '../features/moneydata/savingsGoalSlice'

export default configureStore({
  reducer: {
    username : nameReducer,
    balance:balanceReducer,
    savingsGoal:savingsGoalReducer
  },
})