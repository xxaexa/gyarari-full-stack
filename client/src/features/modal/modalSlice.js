import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
}

const modalSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOpenModal: (state) => {
      state.modal = true
    },
    setCloseModal: (state) => {
      state.modal = false
    },
  },
})

export const { setOpenModal, setCloseModal } = modalSlice.actions
export default modalSlice.reducer
