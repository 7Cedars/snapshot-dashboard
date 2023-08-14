import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Space } from '../types'

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
      state.spaces.push(action.payload)
    }, 
    // removeSpace(state, action) {
    //   state.push(action.payload)
    // }
  }
})

export const { addSpace } = selectedSpacesSlice.actions

// export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default selectedSpacesSlice.reducer