import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Proposal } from '../types'

interface LoadedProposalsState {
  proposals: Proposal[]
}

const initialState: LoadedProposalsState = {
  proposals: []
}

export const proposalsSlice = createSlice({
  name: 'loadedProposals',
  initialState: initialState, 
  reducers: {
    addProposals: (state, action: PayloadAction<LoadedProposalsState>) => {
      console.log("action.payload: ", action.payload)
      action.payload.proposals.map((proposal: Proposal) => {
        state.proposals.push(proposal)
      })
      // NB: Note that we do NOT check for duplicates. I assume it would become very slow, quickly. 
      // This does mean I cannot assume uniqueness: this has to be enforced later on.  
      }
    }, 
    // removeProposals: (state, action: PayloadAction<Space>) => {
    //   const changedState = state.spaces.filter((space: Space) => 
    //     space.id !==  action.payload.id)
    //   state.spaces = changedState
    //   console.log("changedState: ", changedState)
    // }
  // }
})

export const { addProposals } = proposalsSlice.actions

// export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default proposalsSlice.reducer