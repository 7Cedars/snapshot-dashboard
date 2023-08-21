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

export const toNetworkGraph = (proposals: Proposal[]) => {

  const hasSharedVoters = (spaceSource: Array<string>, spaceTarget: Array<string>) => {
    return spaceSource.some((item: string) => spaceTarget.includes(item))
  }

  const spaces = Array.from(
    new Set(proposals.map(proposal => proposal.space.id))
  )
  
  const votersPerSpace = spaces.map(space => {
    const proposalsOfSpace = proposals
      .filter(proposal => proposal.space.id === space)
    
    const votesOfSpace: Vote[] = []
    proposalsOfSpace.map(proposal => 
        votesOfSpace.push(...proposal.votes)
        )
    
    const votersOfSpace = Array.from(new Set( 
      votesOfSpace.map(space => space.voter )
    )) 

    return votersOfSpace
  })

  const links = votersPerSpace.map(spaceSource => 
    votersPerSpace.map(spaceTarget => 
      hasSharedVoters(spaceSource, spaceTarget)
    )
  )

  const nodes: Node[] = spaces.map((space, i) => 
    ({id: i, name: space})
  )

  console.log(
    "Nodes: ", nodes, 
    "votersOfSpace: ", votersPerSpace, 
    "links: ", links
  )
}

export default { toDateFormat, toTimestamp, toNetworkGraph }; 