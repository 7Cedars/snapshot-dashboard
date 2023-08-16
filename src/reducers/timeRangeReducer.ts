import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Space } from '../types'
import { useAppDispatch } from './hooks'

interface timeRangeState {
  startDate: number;
  endDate: number
}

const initialState: timeRangeState = {
  startDate: Date.now() - 15778800000, // Equals six months
  endDate: Date.now()
}

export const timeRangeSlice = createSlice({
  name: 'timeRange',
  initialState: initialState, 
  reducers: {
    updateStartDate: (state, action: PayloadAction<number>) => {
      state.startDate = action.payload
    }, 
    updateEndDate: (state, action: PayloadAction<number>) => {
      state.endDate = action.payload
    }, 
  }
})

export const { updateStartDate, updateEndDate } = timeRangeSlice.actions

export default timeRangeSlice.reducer