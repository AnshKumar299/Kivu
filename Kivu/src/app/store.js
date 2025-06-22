import { configureStore } from '@reduxjs/toolkit'
import nameReducer from '../features/userdata/usernameSlice'
import genderReducer from '../features/userdata/genderSlice'

export default configureStore({
  reducer: {
    username : nameReducer,
    gender: genderReducer,
  },
})