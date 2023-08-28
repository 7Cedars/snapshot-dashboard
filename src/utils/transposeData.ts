import { Proposal, Node, Vote, Space } from "../types";
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

interface HeatmapProps {
  x: string;
  y: string,
  value: number
}

export const toHeatmapData = ({proposals, nCol}: toHeatmapProps): HeatmapProps[] => {

  // adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const range = ({start, stop, nCol}: rangeProps ) =>
    Array.from({ length: nCol + 1 }, (_, i) => start + (i * ((stop - start) / nCol) ));

  const start = Math.min(...proposals.map(
    proposal => proposal.start)
    )
  const stop = Math.max(...proposals.map(
    proposal => proposal.end)
    )
  const spacesRange = range(
    {start, stop, nCol }
    )
    console.log("spacesRange ", spacesRange)
  const spaces = Array.from( 
    new Set(proposals.map(proposal => proposal.space.id))
    )

  // building basic data structure 
  const data: Array<HeatmapProps> = []  
  spaces.forEach(space => (
      spacesRange.map(number => {
        const newItem = 
        { x: String(number),
          y: space,
          value: 0
        }
        data.push(newItem)
      }) 
    ))

  // filling in data points.
  proposals.forEach(proposal => {    
    const votesPerStep = proposal.votes / (proposal.end - proposal.start)

    data.forEach(point => {
      if (point.y === proposal.space.id && 
          parseInt(point.x) > proposal.start && 
          parseInt(point.x) < proposal.end) {
            point.value = point.value + votesPerStep
          } 
    })
  })
  
  return data
}

// toNetworkGraph
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
        votesOfSpace.push(...proposal.votesDetails)
        )
    
    const votersPerSpace = Array.from(new Set( 
      votesOfSpace.map(space => space.voter )
    )) 

    return votersPerSpace
  })

  console.log("votersOfSpace: ", votersPerSpace)

  const links = votersPerSpace.map(spaceSource => 
    votersPerSpace.map(spaceTarget => 
      hasSharedVoters(spaceSource, spaceTarget)
    )
  )

  // const nodes: Node[] = spaces.map((space, i) => 
  //   ({id: space, group: "test"})
  // )

  // console.log(
  //   "Nodes: ", nodes, 
  //   "votersOfSpace: ", votersPerSpace, 
  //   "links: ", links
  // )
}

export default { toHeatmapData, toNetworkGraph }; 