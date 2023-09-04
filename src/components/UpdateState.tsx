import { useState, useEffect } from "react";
// import SelectSpacesForm from "../searchComponent/SelectSpacesForm (depricated)"
import SpaceItem from "./SpaceItem";
import { useParams } from "react-router-dom";
import { parseInputEntries } from "../utils/parsers";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { updateEndDate, updateSelectedSpaces, updateStartDate } from "../reducers/userInputReducer";
import { addProposals } from "../reducers/proposalsReducer";
import { toSelectedProposals } from "../utils/utils";
import { PROPOSALS_FROM_SPACES, VOTERS_ON_PROPOSALS } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
// import loadProposals from "../services/loadProposals";
import { updateStopFetching } from "../reducers/userInputReducer";


const UpdateState = () => {
  const dispatch = useAppDispatch()

  // updating userInput state on basis of changing url. 
  const { data } = useParams(); 
  const { proposals } = useAppSelector(state => state.loadedProposals)
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)

  useEffect(() => {
    const {selectedSpaces, startDate, endDate}  = parseInputEntries(data)
    dispatch(updateEndDate(endDate))
    dispatch(updateStartDate(startDate))
    dispatch(updateSelectedSpaces(selectedSpaces))
  }, [data])

  const { selectedSpaces, startDate, endDate, stopFetching } = useAppSelector(state => state.userInput)

  const loadedSpaces = Array.from(
    new Set(proposals.map(proposal => proposal.space.id))
  ) 

  const spacesToLoad = selectedSpaces.filter(
    spaceId => loadedSpaces.indexOf(spaceId) === -1
  )

  const loadProposals = async (spacesToLoad: string[]) => {
    
    console.log("loadSpaces is called") 
    let fetchProposals = true;
    let skip = 0; 
    while (stopFetching === false && fetchProposals === true) {
  
      const { data, error, loading } = await proposalsFromSpaces({
        variables: { first: 1000, skip: skip, space_in: spacesToLoad} 
      })
  
      console.log("FETCHED PROPOSALS: ", data)
      console.log("LENGTH Fetch: ", data.proposals.length)
  
      dispatch(addProposals(data.proposals))
  
      if (data.proposals.length !== 1000) {
        fetchProposals = false
      } else {
        skip = skip + 1000
      }
    }
  }

  if (spacesToLoad.length > 1) {loadProposals(spacesToLoad)}

  const handleOnClick = () => {
    dispatch(updateStopFetching(!stopFetching)) 
  }

  return (
    <>
      <button 
        type="submit"
        // disabled={selectedSpaces.length < 2} 
        className='border-blue-500 bg-blue-100 text-blue-900 border w-full rounded-lg font-medium p-2 enabled:hover:bg-blue-200 disabled:opacity-50'
        onClick={handleOnClick}
        >
          {stopFetching ? 'Start fetching' : 'Stop fetching' }
      </button> 
    </>
  );
}


export default UpdateState;