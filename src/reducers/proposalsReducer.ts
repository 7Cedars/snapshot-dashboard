import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Proposal, Space, Vote } from '../types'

interface LoadedProposalsState {
  proposals: Proposal[]
}

const initialState: LoadedProposalsState = {
  proposals: []
}

interface addVotesPayload {
  proposals: Proposal[];
  votes: {votes: Vote[]};
}

export const proposalsSlice = createSlice({
  name: 'loadedProposals',
  initialState: initialState,
  reducers: {
    addProposals: (state, action: PayloadAction<Proposal[]>) => {
      console.log("action.payload: ", action.payload)
      action.payload.map(proposal => {
        const newProposal = {
          ...proposal,
          votesLoaded: false,
          votes: [], 
          start: proposal.start * 1000, // multiply by thousand to align with standard Unix timestamp format
          end: proposal.end * 1000
        }
        state.proposals.push(newProposal)
      })
      // NB: Note that we do NOT check for duplicates. I assume it would become very slow, quickly. 
      // This does mean I cannot assume uniqueness: this has to be enforced later on.  
    },
    addVotes: (state, action: PayloadAction<addVotesPayload>) => {
      const proposals = state.proposals
      const votes = action.payload.votes.votes
     
      const updatedProposals = proposals.map(proposal => {
        
        const votesForProposal = votes.filter(vote => 
          vote.proposal.id === proposal.id) 

        return ( 
          votesForProposal.length === 0 ? 
            proposal 
            :
            { ...proposal,
              votesLoaded: true,
              votes: votesForProposal
            }
        )
      })

      state.proposals = updatedProposals
    },
    removeProposals: (state, action: PayloadAction<Space>) => {
      const changedState = state.proposals.filter(
        (proposal: Proposal) => proposal.space.id !==  action.payload.id
      )
      state.proposals = changedState
    }
  }
})

export const { addProposals, removeProposals, addVotes } = proposalsSlice.actions

export default proposalsSlice.reducer