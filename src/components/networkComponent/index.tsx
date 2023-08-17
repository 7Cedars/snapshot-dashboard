import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS } from '../../utils/queries'
import { SyntheticEvent, useEffect } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';
import { Proposal, Space } from '../../types';
import { useAppDispatch } from '../../reducers/hooks';
import { amongSelectedSpaces, withinTimeRange } from '../../utils/utils';

const NetworkComponent = () => {
  const dispatch = useAppDispatch()
  const [ votersOnProposals ] = useLazyQuery(VOTERS_ON_PROPOSALS)
  const timeRange = useAppSelector(state => state.timeRange)
  const loadedProposals = useAppSelector(state => state.loadedProposals.proposals)
  const spacesSelected = useAppSelector(state => state.selectedSpaces.spaces)

  useEffect(() => {
    const selectedProposals: Proposal[] = [] 
    
    loadedProposals.map((proposal: Proposal) => {
      if (withinTimeRange(proposal.start) &&
          withinTimeRange(proposal.end) && 
          amongSelectedSpaces(proposal.space.id) ) 
      { selectedProposals.push(proposal) }
    })
    
    console.log("selectedProposals: ", selectedProposals)
    
  }, [spacesSelected, timeRange])
  
  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    const selectedSpacesIds: string[] = spacesSelected.map(space => space.id)
    console.log("spacesSelected: ", selectedSpacesIds)


   }

  return (
    <div> 
      <b> Network Component </b>
      <button 
        type="submit"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        onClick={handleOnClick}
        >
        LOAD DATA
      </button> 
    </div>
  );
}

export default NetworkComponent;