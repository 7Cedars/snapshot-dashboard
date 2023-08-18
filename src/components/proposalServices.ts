/* 
I need to build two data functions. 
1: input = spacesIds. Output = list of loaded proposals. 
2: input = proposalIds + timeRange. 
   output = Votes per proposal with all votes within time range.
   This means that some proposals do not have all their votes. (as they fell outside of time range) 
3: in BOTH instance, check if Redux has data + API calls are dealt with. 
*/ 

import { TimeRange } from "../types"
import { useAppSelector, useAppDispatch } from "../reducers/hooks"
import { useLazyQuery } from "@apollo/client";
import { PROPOSALS_FROM_SPACES } from "../utils/queries";
import { addProposals } from "../reducers/proposalsReducer";

interface Props {
  proposalIds: string[], 
  timeRange: TimeRange
}

export const fetchProposals = async () => {  

  const dispatch = useAppDispatch()
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  const loadedProposals = useAppSelector(state => state.loadedProposals).proposals
  const proposalOfSpace = loadedProposals.map(proposal => proposal.space.id)
  const { spaces }  = useAppSelector(state => state.selection)
  
  const spacesToLoad: string[] = []
  spaces.map(space => 
    { if (proposalOfSpace.indexOf(space.id) === -1) 
      { spacesToLoad.push(space.id) }
    } 
  )
  console.log("spacesToLoad: ", spacesToLoad)

  if (spacesToLoad.length !== 0) {
    try {
      const { data, loading } = 
        await proposalsFromSpaces({
          variables: { first: 1000, skip: 0, space_in: spacesToLoad} 
        })
          if (loading) {
            console.log("Loading")
          } 
          console.log("PROPOSAL DATA: ", data)
          dispatch(addProposals(data.proposals))
          loadedProposals.push(data.proposals)

        } catch (e) {
        console.log("ERROR: ", e)
      }
  }
  
  const output = spaces.map(space =>  
    loadedProposals.some(proposal => proposal.id.includes(space.id))
  )

  return output
}

export const fetchVotes = ({proposalIds, timeRange}: Props) => {

  console.log("Hello world")

}

export default {fetchProposals} 