import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch, { checkForUnauthorizedResponse } from './../../utils/axios'
import { toast } from 'react-toastify'

const initialState = {
  post: [],
  isLoading: true,
}

export const createPost = createAsyncThunk(
  'post/createPost',
  async (post, thunkAPI) => {
    try {
      const response = await customFetch.post('post/createPost', post)
      return response.data
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI)
    }
  }
)

export const getPost = createAsyncThunk('post/', async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('post/')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        toast.success('Upload Success')
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        toast.error(payload)
      })
      .addCase(getPost.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.post = payload
      })
      .addCase(getPost.rejected, (state, { payload }) => {
        toast.error(payload)
      })
  },
})

export default postSlice.reducer
