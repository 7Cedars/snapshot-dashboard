import { useAppSelector } from "../../reducers/hooks";
import { toDateFormat, toTimestamp } from "../../utils/utils";
import { useAppDispatch } from "../../reducers/hooks";
import { updateStartDate, updateEndDate } from "../../reducers/timeRangeReducer";
import { Space, Proposal } from "../../types";
import { useLazyQuery } from "@apollo/client";
import { PROPOSALS_FROM_SPACES } from "../../utils/queries";
import { addProposals } from "../../reducers/proposalsReducer";
import { SyntheticEvent } from "react";

const TimeRangeComponent = () => {

  const dispatch = useAppDispatch()
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  const timeRange = useAppSelector(state => state.timeRange)
  const selectedSpaces  = useAppSelector(state => state.selectedSpaces)
  const loadedProposals = useAppSelector(state => state.loadedProposals)
  const proposalSpaces = loadedProposals.proposals.map(proposal => proposal.space.id)

  const spacesToLoad: string[] = []
  selectedSpaces.spaces.map(space => 
    { if (proposalSpaces.indexOf(space.id) === -1) 
      { spacesToLoad.push(space.id) }
    } 
  )
  console.log("spacesToLoad: ", spacesToLoad)

  const handleOnClick = async () => {

    if (spacesToLoad.length !== 0) {
      try {
        const { data, loading } = 
          await proposalsFromSpaces({
            variables: { first: 1000, skip: 0, space_in: spacesToLoad} 
          })
            if (loading) {
              console.log("Loading")
            } 
            console.log("VOTER DATA: ", data)
            dispatch(addProposals(data.proposals))
          } catch (e) {
          console.log("ERROR: ", e)
        }
    }
  }

  // const handleStartDateChange = async () => {

  //   if (spacesToLoad.length !== 0) {
  //     try {
  //       const { data, loading } = 
  //         await proposalsFromSpaces({
  //           variables: { first: 1000, skip: 0, space_in: spacesToLoad} 
  //         })
  //           if (loading) {
  //             console.log("Loading")
  //           } 
  //           console.log("VOTER DATA: ", data)
  //           dispatch(addProposals(data.proposals))
  //         } catch (e) {
  //         console.log("ERROR: ", e)
  //       }
  //   }
  // }

  // return (<div> EMPTY </div>) 

  return (
    <div> 
      <b> Time Range Component </b>
      <button 
        type="submit"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        onClick={handleOnClick}
        >
        LOAD DATA
      </button> 
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