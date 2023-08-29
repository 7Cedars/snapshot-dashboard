import { useEffect, useState } from "react";
// import SelectSpacesForm from "../searchComponent/SelectSpacesForm (depricated)"
import SpaceItem from "./SpaceItem";
import { useParams } from "react-router-dom";
import { parseInputEntries } from "../../utils/parsers";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import { updateEndDate, updateSelectedSpaces, updateStartDate } from "../../reducers/userInputReducer";
import { addProposals } from "../../reducers/proposalsReducer";
import { Proposal } from "../../types";
import { toSelectedProposals } from "../../utils/utils";
import { PROPOSALS_FROM_SPACES } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { toHeatmapData } from "../../utils/transposeData";
import { updateModal } from "../../reducers/userInputReducer";


const SelectComponent = () => {
  const dispatch = useAppDispatch()

  // Data from url is parsed to redux store. 
  // This has to happen in this component as it is the only one reading the route. 
  // might change in the future with refactoring to next app.. 
  const { data } = useParams(); 

  useEffect(() => {
    const {selectedSpaces, startDate, endDate}  = parseInputEntries(data)
    dispatch(updateEndDate(endDate))
    dispatch(updateStartDate(startDate))
    dispatch(updateSelectedSpaces(selectedSpaces))
  }, [data])
  //

  // Here data is loaded for component. 
  const { selectedSpaces } = useAppSelector(state => state.userInput)
  const loadedProposals = useAppSelector(state => state.loadedProposals.proposals)
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  
  const loadSpaces = async (spacesToLoad: string[]) => {

    console.log("loadSpaces is called") 
    let continueFetching = true;
    let skip = 0; 
    while (continueFetching === true) {

      const { data } = await proposalsFromSpaces({
        variables: { first: 1000, skip: skip, space_in: spacesToLoad} 
      })

      console.log("FETCHED PROPOSALS: ", data)
      console.log("LENGTH Fetch: ", data.proposals.length)

      dispatch(addProposals(data.proposals))

      if (data.proposals.length !== 1000) {
        continueFetching = false
      } else {
        skip = skip + 1000
      }
    }
  }

  const handleOnClick = () => {
    const selectedProposals = toSelectedProposals({ 
      proposals: loadedProposals,
      selectedSpaces, 
      startDate : null, 
      endDate: null
    })

    // naming has to be improved here - very confusing
    const spacesSelected = selectedProposals.map(proposal => proposal.space.id)
    const spacesToLoad = selectedSpaces.filter(spaceId => 
      spacesSelected.indexOf(spaceId) === -1
      )
    
    console.log("spacesToLoad: ", spacesToLoad)

    if (spacesToLoad.length > 0 ) {
      try {
        loadSpaces(spacesToLoad) 
      } catch (e) {
        console.log("ERROR: ", e)
      }
    }    
  }

  console.log("selectedSpaces: ", selectedSpaces)

  return (
    <div className="p-2 grid grid-cols-1 place-content-evenly"> 
      <button 
        type="submit"
        disabled={selectedSpaces.length < 2} 
        className='border-blue-500 bg-blue-100 text-blue-900 border w-full rounded-lg font-medium p-2 enabled:hover:bg-blue-200 disabled:opacity-50'
        onClick={handleOnClick}
        >
        Analyse
      </button> 

      <div className="py-3">
        {selectedSpaces.length === 1 ? 
        <i className="grid justify-items-center p-2 my-4 text-gray-500 "> No DAO spaces selected. </i>
        :
        selectedSpaces.map(spaceId => (
          < SpaceItem key = {spaceId} spaceId = {spaceId}/> 
        ))        
        }
      </div>

      <form>
        <input
          className="w-full border border-blue-300 text-sm hover:border-blue-500 rounded-lg font-medium "
          type="search"
          id="mySearch"
          name="q"
          placeholder="Search and select DAOs…" 
          onClick={() => dispatch(updateModal('search'))}
          onChange={() => dispatch(updateModal('search'))}
          />
      </form>

    </div>
  );
}

export default SelectComponent;