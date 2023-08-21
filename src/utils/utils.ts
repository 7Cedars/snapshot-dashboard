import { NetworkGraph, Proposal, Node, Vote, Space } from "../types";

interface Props {
  proposals: Proposal[], 
  selectedSpaces: Space[], 
  startDate: number | null, 
  endDate: number | null 
}

export const toDateFormat = (timestamp: number): string => { 
  return new Date(timestamp).toISOString().split('T')[0]
}; 

export const toTimestamp = (dateFormat: string): number => { 
  return Date.parse(dateFormat)
};

export const toSelectedProposals = ( {proposals, selectedSpaces, startDate, endDate}: Props  ) => {

  const withinTimeRange = (timeStamp: number ): boolean => {
    if (startDate === null || endDate === null) { return true }  
    
    return startDate <= timeStamp && timeStamp <= endDate 
  }
  
  const spaceIds = selectedSpaces.map(space => space.id)
  const amongSelectedSpaces = (spaceId: string): boolean => {
    return spaceIds.includes(spaceId)
  }

  const selectedProposals: Proposal[] = [] 
  proposals.map((proposal: Proposal) => {
      if (withinTimeRange(proposal.start) &&
          withinTimeRange(proposal.end) && 
          amongSelectedSpaces(proposal.space.id) ) 
      { selectedProposals.push(proposal) }
    })

  return selectedProposals
}; 

export default { toDateFormat, toTimestamp, toSelectedProposals }; 