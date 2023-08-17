import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS, PROPOSALS_FROM_SPACES } from '../../utils/queries'
import { SyntheticEvent, useEffect } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';
import { Proposal, Space } from '../../types';
import { useAppDispatch } from '../../reducers/hooks';

const NetworkComponent = () => {
  const dispatch = useAppDispatch()
  const [ proposalsFromSpaces ] = useLazyQuery(PROPOSALS_FROM_SPACES)
  // const timeRange = useAppSelector(state => state.timeRange)
  // const loadedProposals = useAppSelector(state => state.loadedProposals.proposals)
  const spacesSelected = useAppSelector(state => state.selectedSpaces.spaces)

  // useEffect(() => {
  //   const selectedProposals: Proposal[] = [] 
    
  //   loadedProposals.proposals.map((proposal: Proposal) => {

  //     if (timeRange.startDate <= proposal.start && proposal.start <= timeRange.endDate 
  //         &&
  //         timeRange.startDate <= proposal.end && proposal.end <= timeRange.endDate) 
  //         {
  //           selectedProposals.push(proposal)
  //         }
  //   })
  //   dispatch(updateSelectedProposals(selectedProposals))
  //   // console.log("selectedProposals: ", selectedProposals)
  // }, [loadedProposals, timeRange])
  
  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    const selectedSpacesIds: string[] = spacesSelected.map(space => space.id)
    console.log("spacesSelected: ", selectedSpacesIds)

    try {
      const { data, loading } = 
        await proposalsFromSpaces({
          variables: { first: 1000, skip: 0, space_in: selectedSpacesIds} 
        })
          if (loading) {
            console.log("Loading")
          } 
          console.log("VOTER DATA: ", data)
         } catch (e) {
        console.log("ERROR: ", e)
      }
  }

  return (
    <div> 
      NetworkComponent
      <button 
            type="submit"
            className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
            onClick={handleOnClick}
            >
            LOAD
          </button> 
    </div>
  );
}

export default NetworkComponent;