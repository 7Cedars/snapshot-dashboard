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
  
  console.log("Hello world")

}

export const fetchVotes = ({proposalIds, timeRange}: Props) => {

  console.log("Hello world")

}

export default {fetchProposals} 