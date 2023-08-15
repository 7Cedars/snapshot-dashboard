import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Proposal, Space } from '../types'

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
    }, 
    removeProposals: (state, action: PayloadAction<Space>) => {
      const changedState = state.proposals.filter(
        (proposal: Proposal) => proposal.space.id !==  action.payload.id
      )
      state.proposals = changedState
    }
  }
})

export const { addProposals, removeProposals } = proposalsSlice.actions

export default proposalsSlice.reducer