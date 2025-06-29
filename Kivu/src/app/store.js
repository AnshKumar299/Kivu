import { configureStore } from '@reduxjs/toolkit'
import nameReducer from '../features/userdata/usernameSlice'
import balanceReducer from '../features/moneydata/balanceSlice'
import savingsGoalReducer from '../features/moneydata/savingsGoalSlice'
import transactionReducer from '../features/moneydata/transactionSlice'
import colorReducer from '../features/colordata/colorSlice.jsx'

export default configureStore({
  reducer: {
    username : nameReducer,
    balance:balanceReducer,
    savingsGoal:savingsGoalReducer,
    transacs:transactionReducer,
    colors:colorReducer
  },
})