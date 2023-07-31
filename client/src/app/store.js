import { configureStore } from '@reduxjs/toolkit'
import userSlice from './../features/user/userSlice'
import postSlice from './../features/post/postSlice'
import modalSlice from './../features/modal/modalSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    modal: modalSlice,
  },
})
