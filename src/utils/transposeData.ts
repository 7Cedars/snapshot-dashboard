import { Proposal, Node, Vote, Space } from "../types";
import * as d3 from "d3";

interface toHeatmapProps {
  proposals: Proposal[]; 
  start: number;
  end: number;
  nCol: number; 
} 

interface rangeProps {
  start: number; 
  end: number;
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

interface IntersectionProps {
  startProposal: number;
  endProposal: number; 
  startRange: number; 
  endRange: number; 
}

export const toHeatmapData = ({proposals, start, end, nCol}: toHeatmapProps): HeatmapProps[] => {

  console.log("toHeatmapData called")
  // adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const range = ({start, end, nCol}: rangeProps ) =>
    Array.from({ length: nCol + 1 }, (_, i) => start + (i * ((end - start) / nCol) ));

  const spacesRange = range(
    {start, end, nCol }
    )
  const stepPerCol = (end - start) / nCol

  const spaces = Array.from( 
    new Set(proposals.map(proposal => proposal.space.id))
    )

  const intersectionRangeProposal = ({startRange, endRange, startProposal, endProposal}: IntersectionProps): number => {

    if (startProposal > endRange || startRange > endProposal ) {return 0} 
    else {
      const intervalLength = Math.min(endRange, endProposal) - Math.max(startRange, startProposal) 
      const proposalLength = endProposal - startProposal

      return intervalLength / proposalLength

    }
  }

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
    data.forEach(point => {
      if (point.y === proposal.space.id) {
        point.value = point.value + proposal.votes * intersectionRangeProposal(
          { startRange: parseInt(point.x),
            endRange: parseInt(point.x) + stepPerCol,
            startProposal: proposal.start,
            endProposal: proposal.end
          } 
        )
      }
    })
  })

  console.log("DATA at Heatmap data: ", data)
  
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

  // console.log("votersOfSpace: ", votersPerSpace)

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