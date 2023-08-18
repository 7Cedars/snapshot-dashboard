import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Space } from '../types'
import { standardDateRange } from '../constants'

interface selectionState {
  spaces: Space[];
  startDate: number; 
  endDate: number; 
}

const initialState: selectionState = {
  spaces: [], 
  startDate: Date.now() - standardDateRange,
  endDate: Date.now()
}

export const selectedSpacesSlice = createSlice({
  name: 'selection',
  initialState: initialState, 
  reducers: {
    addSpace: (state, action: PayloadAction<Space>) => {
      const spaceIsSelected = state.spaces.find((space: Space) => {
        return space.id === action.payload.id
      })
      console.log("spaceIsSelected: ", spaceIsSelected)
      if (spaceIsSelected === undefined) {  
        state.spaces.push(action.payload)
      }
    }, 
    removeSpace: (state, action: PayloadAction<Space>) => {
      const changedState = state.spaces.filter((space: Space) => 
        space.id !==  action.payload.id)
      state.spaces = changedState
      console.log("changedState: ", changedState)
    }, 
    updateStartDate: (state, action: PayloadAction<number>) => {
      state.startDate = action.payload
    }, 
    updateEndDate: (state, action: PayloadAction<number>) => {
      state.endDate = action.payload
    }, 
  }
})

export const { addSpace, removeSpace, updateStartDate, updateEndDate } = selectedSpacesSlice.actions

export default selectedSpacesSlice.reducer