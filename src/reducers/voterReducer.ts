import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Proposal, Space, Voter } from '../types'

interface VoterState {
  selectedProposals: Proposal[], 
  voters: Voter[]
}

const initialState: VoterState = {
  selectedProposals: [], 
  voters: []
}

export const votersSlice = createSlice({
  name: 'voters',
  initialState: initialState,
  reducers: {
    updateSelectedProposals: (state, action: PayloadAction<Proposal[]>) => {
      console.log("action.payload: ", action.payload)
      state.selectedProposals = action.payload
    },
    updateVoters: (state, action: PayloadAction<Voter[]>) => {
      console.log("action.payload: ", action.payload)
      state.voters = action.payload
    }
  }
})

export const { updateSelectedProposals, updateVoters } = votersSlice.actions

export default votersSlice.reducer