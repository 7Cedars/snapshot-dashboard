import { useState, useEffect } from "react";
// import SelectSpacesForm from "../searchComponent/SelectSpacesForm (depricated)"
import SpaceItem from "./SpaceItem";
import { useParams } from "react-router-dom";
import { parseInputEntries } from "../utils/parsers";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { updateEndDate, updateSelectedSpaces, updateStartDate } from "../reducers/userInputReducer";
import { addProposals } from "../reducers/proposalsReducer";
import { toSelectedProposals } from "../utils/utils";
import { PROPOSALS_FROM_SPACES } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

const UpdateState = () => {
  const dispatch = useAppDispatch()
  const [stopQueries, setStopQueries] = useState(false)

  // updating userInput state on basis of changing url. 
  const { data } = useParams(); 

  useEffect(() => {
    const {selectedSpaces, startDate, endDate}  = parseInputEntries(data)
    dispatch(updateEndDate(endDate))
    dispatch(updateStartDate(startDate))
    dispatch(updateSelectedSpaces(selectedSpaces))
  }, [data])


  // loading necessary proposals and votes
  const { selectedSpaces, startDate, endDate } = useAppSelector(state => state.userInput)
  const loadedProposals = useAppSelector(state => state.loadedProposals.proposals)
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  


  const handleOnClick = () => {
    setStopQueries(!stopQueries)
  }
  
  return (
    <>
      <button 
        type="submit"
        // disabled={selectedSpaces.length < 2} 
        className='border-blue-500 bg-blue-100 text-blue-900 border w-full rounded-lg font-medium p-2 enabled:hover:bg-blue-200 disabled:opacity-50'
        onClick={handleOnClick}
        >
        Stop Queries 
        {/* Should be updated to be togagble.  */}
      </button> 
    </>
  );
}

export default UpdateState;