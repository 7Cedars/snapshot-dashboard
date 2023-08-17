import { useAppSelector } from "../../reducers/hooks";
import { toDateFormat, toTimestamp } from "../../utils/utils";
import { useAppDispatch } from "../../reducers/hooks";
import { updateStartDate, updateEndDate } from "../../reducers/timeRangeReducer";
import { Space } from "../../types";
import { useLazyQuery } from "@apollo/client";
import { PROPOSALS_FROM_SPACES } from "../../utils/queries";
// import { proposalsPerSpace } from "../../utils/proposalServices";
import { addProposals } from "../../reducers/proposalsReducer";


// const querySpace = async (spaceId: string) => {
//   const dispatch = useAppDispatch()
//   const [ proposalsFromSpace ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  

//   try {
//     const { data, loading } = 
//       await proposalsFromSpace({
//         variables: { first: 500, skip: 0, space: spaceId} 
//       })
//       if (loading) {
//         console.log("Loading")
//       } 
//       console.log("proposals loaded on spaceId: ", spaceId, " Data: ", data)
//       dispatch(addProposals(data))
//   } catch (e) {
//     console.log("ERROR: ", e)
//   }
// }

// const proposalsPerSpace = async (spaces: Space[]) => {
//   console.log("proposalsPerSpace is CALLED")
//   const proposals = useAppSelector(state => state.loadedProposals).proposals
//   const proposalSpaces = new Set(proposals.map(proposal => proposal.space.id))
//   const selectedSpaces = useAppSelector(state => state.selectedSpaces).spaces
//   const selectedSpacesIds = selectedSpaces.map(space => space.id)

//   // proposals.filter(proposal => { selectedSpacesIds.some("test") } )

//   console.log("proposalSpaces: ", proposalSpaces)
  
//   // Step 1: make sure all proposals have been loaded into redux. 
//   // Queries all spaces. Spaces that have already been queried will be skipped by Apollo. 
//   // Note that I still need to build a catch for spaces that have more than 1000 proposals. 
//   // (first want to check if they actually exist...) 
  
//   // await Promise.all( spaces.map(space => querySpace(space.id)) )

//   // const result = spaces.map(space => ({ 
//   //   spaceId: space.id, 
//   //   proposals: proposals.filter((proposal) => proposal.space.id === space.id)
//   //   })
//   // )

//   // return result

// }

const TimeRangeComponent = () => {
  const dispatch = useAppDispatch()
  const timeRange = useAppSelector(state => state.timeRange)
  const proposals = useAppSelector(state => state.loadedProposals).proposals
  const proposalSpaces = Array.from(new Set(proposals.map(proposal => proposal.space.id)))
  const selectedSpaces = useAppSelector(state => state.selectedSpaces).spaces
  const selectedSpacesIds: string[] = selectedSpaces.map(space => space.id)

  // const idLoaded = (id: string) => selectedSpacesIds.some(id)

  // console.log("proposalSpaces: ", proposalSpaces)
  // const test = proposalSpaces.filter(id => selectedSpacesIds.some(id))
  // //  const spacesProposals = proposalsPerSpace(spacesSelected) 
  // // console.log("spacesProposals: ", spacesProposals)

  

  return (
    <div> 
      <b> Time Range Component </b>
      <div> 
        Start date: 
      <input
          type="date"
          placeholder="startDate"
          value={toDateFormat(timeRange.startDate)}
          id="startDate"
          onChange={(date) => dispatch(
            updateStartDate(
              toTimestamp(date.target.value)
              )
            )}
        />
      </div>
      <div> 
        End date: 
      <input
          type="date"
          placeholder="endDate"
          value={toDateFormat(timeRange.endDate)}
          id="endDate"
          onChange={(date) => dispatch(
            updateEndDate(
              toTimestamp(date.target.value)
              )
            )}
        />
      </div>
    </div>
  );
}

export default TimeRangeComponent;