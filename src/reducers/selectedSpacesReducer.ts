import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Space } from '../types'
import { useAppDispatch } from './hooks'

interface selectedSpacesState {
  spaces: Space[]
}

const initialState: selectedSpacesState = {
  spaces: []
}

export const selectedSpacesSlice = createSlice({
  name: 'selectedSpaces',
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
    }
  }
})

export const { addSpace, removeSpace } = selectedSpacesSlice.actions

// export const initialiseSpace= () => {
//   return async (dispatch) => {
//     const anecdotes = await anecdoteService.getAll()
//     dispatch(setAnecdotes(anecdotes))
//   }
// }

export default selectedSpacesSlice.reducer