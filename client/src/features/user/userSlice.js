import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
} from './../../utils/localStorage'

const initialState = {
  user: getUserFromLocalStorage(),
  token: null,
  isLoading: true,
}

export const loginUser = createAsyncThunk(
  'login/',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        {
          ...values,
        }
      )
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
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        {
          ...values,
        }
      )
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
        const { user } = payload
        state.isLoading = false
        toast.success('Login Success')
        addUserToLocalStorage(user)
        state.token = payload.token
        state.user = payload.user
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
