import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInputState } from '../types'
import { standardDateRange } from '../constants'

const initialState: UserInputState = {
  selectedSpaces: [], 
  startDate: Date.now() - standardDateRange,
  endDate: Date.now()
}

export const selectedSpacesSlice = createSlice({
  name: 'userInput',
  initialState: initialState, 
  reducers: {
    updateSelectedSpaces: (state, action: PayloadAction<string[]>) => {
     state.selectedSpaces = action.payload
    },
    updateStartDate: (state, action: PayloadAction<number>) => {
      state.startDate = action.payload
    }, 
    updateEndDate: (state, action: PayloadAction<number>) => {
      state.endDate = action.payload
    },
  }
})

export const { updateSelectedSpaces, updateStartDate, updateEndDate } = selectedSpacesSlice.actions

export default selectedSpacesSlice.reducer