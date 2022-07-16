import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slice/userSlice'
import postReducer from "../Slice/postSlice"
import messageReducer from "../Slice/messageSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post:postReducer,
    message:messageReducer
  },
})