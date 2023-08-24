import { NetworkGraph, Proposal, Node, Vote, Space } from "../types";
import * as d3 from "d3";

interface toHeatmapProps {
  proposals: Proposal[]; 
  nCol: number; 
} 

interface rangeProps {
  start: number; 
  stop: number;
  nCol: number;
} 

interface withinRangeProps {
  proposalStart: number; 
  proposalStop: number;
  spacesRange: number[];
} 

export const toHeatmap = ({proposals, nCol}: toHeatmapProps) => {

  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const range = ({start, stop, nCol}: rangeProps ) =>
    Array.from({ length: nCol + 1 }, (_, i) => start + i * (stop - start / nCol) );

  const withinRange = ({proposalStart, proposalStop, spacesRange}: withinRangeProps ) => {
      return spacesRange.filter(number => {
        proposalStart <= number && number <= proposalStop
      })
    }

  const start = Math.min(...proposals.map(
    proposal => proposal.start)
    )
  const stop = Math.max(...proposals.map(
    proposal => proposal.end)
    )
  const spacesRange = range(
    {start, stop, nCol }
    )
  const spaces = Array.from( 
    new Set(proposals.map(proposal => proposal.space.id))
    )
  
  const data = spaces.map(space => (
    spacesRange.map(number => (
      { x: space,
        y: number,
        value: 0
      }
    )).flat()
  ))

  console.log("data for heatmap: ", data)

  // proposals.forEach(proposal => {

  //   const votesPerStep = proposal.totalVotes / (proposal.end - proposal.start)
  //   const proposalRange = withinRange({
  //     proposalStart: proposal.start,
  //     proposalStop: proposal.end,
  //     spacesRange: range({start, stop, nCol })
  //   })

  //   proposalRange.forEach(number => 
  //     data.filter(data.y === number && data.x === proposal.space) {
  //       data.value
  //     }
  //     )
  // })

}


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

export default { toHeatmap, toNetworkGraph }; 