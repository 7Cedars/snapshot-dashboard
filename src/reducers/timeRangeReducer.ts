import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TimeRange } from '../types'
import { standardDateRange } from '../constants'

const initialState: TimeRange = {
  startDate: Date.now() - standardDateRange,
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