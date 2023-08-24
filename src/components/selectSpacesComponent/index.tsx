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

const SelectComponent = () => {

  const dispatch = useAppDispatch()
  const { data } = useParams();

  useEffect(() => {
    const {selectedSpaces, startDate, endDate}  = parseInputEntries(data)
    dispatch(updateEndDate(endDate))
    dispatch(updateStartDate(startDate))
    dispatch(updateSelectedSpaces(selectedSpaces))
  }, [data])

  const {selectedSpaces, startDate, endDate} = useAppSelector(state => state.userInput)
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


  useEffect(() => {
    const selectedProposals = toSelectedProposals({ 
      proposals: loadedProposals,
      selectedSpaces, 
      startDate : null, 
      endDate: null
    })

    const loadedSpaces = loadedProposals.map(proposal => proposal.space.id)
    const spacesToLoad = selectedSpaces.filter(spaceId => 
      loadedSpaces.indexOf(spaceId) === -1
      )
    
    console.log("spacesToLoad: ", spacesToLoad)

    if (spacesToLoad.length > 0 ) {
      try {
        loadSpaces(spacesToLoad) 
      } catch (e) {
        console.log("ERROR: ", e)
      }
    }    
  }, [ loadedProposals, selectedSpaces ])

  console.log(selectedSpaces)

  return (
    <div className=""> 
      {selectedSpaces.length > 0 ? 
      selectedSpaces.map(spaceId => (
        < SpaceItem key = {spaceId} spaceId = {spaceId}/> 
      ))
      :
      <i> No DAO spaces selected. </i>
      }

    </div>
  );
}

export default SelectComponent;