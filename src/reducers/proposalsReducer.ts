import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Proposal, Space, Vote } from '../types'

interface LoadedProposalsState {
  proposals: Proposal[]
}

const initialState: LoadedProposalsState = {
  proposals: []
}

interface addVotesPayload {
  proposal: Proposal, 
  votes: Vote[]
}

export const proposalsSlice = createSlice({
  name: 'loadedProposals',
  initialState: initialState,
  reducers: {
    addProposals: (state, action: PayloadAction<Proposal[]>) => {
      console.log("action.payload: ", action.payload)
      action.payload.map((proposal: Proposal) => {
        const updatedProposal = {
          ...proposal,
          votesLoaded: false,
          votes: [], 
          start: proposal.start * 1000, // multiply by thousand to align with standard Unix timestamp format
          end: proposal.end * 1000
        }
        state.proposals.push(updatedProposal)
      })
      // NB: Note that we do NOT check for duplicates. I assume it would become very slow, quickly. 
      // This does mean I cannot assume uniqueness: this has to be enforced later on.  
    },
    addVotes: (state, action: PayloadAction<addVotesPayload>) => {
      console.log("action.payload at addVotes: ", action.payload)
      const id = action.payload.proposal.id
      const proposalToChange = state.proposals.find(proposal => {
        proposal.id === id
      }) 
      if (proposalToChange) {
        const changedProposal: Proposal = {
          ...proposalToChange,
          votesLoaded: true,
          votes: action.payload.votes
        }
        const changedState = state.proposals.map(proposal => 
          proposal.id === id ? changedProposal : proposal)
        state.proposals = changedState
      } else {
        console.log("Error: did not find proposal to add votes.")
      } 
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