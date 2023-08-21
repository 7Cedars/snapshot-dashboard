import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Space } from '../types'
import { standardDateRange } from '../constants'

interface userInputstate {
  selectedSpaces: Space[];
  startDate: number; 
  endDate: number; 
}

const initialState: userInputstate = {
  selectedSpaces: [], 
  startDate: Date.now() - standardDateRange,
  endDate: Date.now()
}

export const selectedSpacesSlice = createSlice({
  name: 'userInput',
  initialState: initialState, 
  reducers: {
    addSpace: (state, action: PayloadAction<Space>) => {
      const spaceIsSelected = state.selectedSpaces.find((space: Space) => {
        return space.id === action.payload.id
      })
      console.log("spaceIsSelected: ", spaceIsSelected)
      if (spaceIsSelected === undefined) {  
        state.selectedSpaces.push(action.payload)
      }
    }, 
    removeSpace: (state, action: PayloadAction<Space>) => {
      const changedState = state.selectedSpaces.filter((space: Space) => 
        space.id !==  action.payload.id)
      state.selectedSpaces = changedState
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