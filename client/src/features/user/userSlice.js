import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from './../../utils/localStorage'
import customFetch from '../../utils/axios'

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: true,
}

export const loginUser = createAsyncThunk(
  'login/',
  async (values, thunkAPI) => {
    try {
      const response = await customFetch.post('auth/login', {
        ...values,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const registerUser = createAsyncThunk(
  'register/',
  async (values, thunkAPI) => {
    try {
      const response = await customFetch.post('auth/register', {
        ...values,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const clearStore = createAsyncThunk(
  'user/clearStore',
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = ''
      state.token = null
      removeUserFromLocalStorage()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        addUserToLocalStorage(payload)
        toast.success('Login Success')
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        toast.error(payload)
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Register Success')
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        toast.error(payload)
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error..')
      })
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
