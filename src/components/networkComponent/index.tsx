import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS } from '../../utils/queries'
import { SyntheticEvent, useEffect } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';
import { Proposal, Space } from '../../types';
import { useAppDispatch } from '../../reducers/hooks';
import { updateSelectedProposals } from '../../reducers/voterReducer';

const NetworkComponent = () => {
  const dispatch = useAppDispatch()
  const [ votersOnProposals ] = useLazyQuery(VOTERS_ON_PROPOSALS)
  const timeRange = useAppSelector(state => state.timeRange)
  const loadedProposals = useAppSelector(state => state.loadedProposals)
  const selectedProposals = useAppSelector(state => state.loadedVoters.selectedProposals)

  useEffect(() => {
    const selectedProposals: Proposal[] = [] 
    
    loadedProposals.proposals.map((proposal: Proposal) => {

      if (timeRange.startDate <= proposal.start && proposal.start <= timeRange.endDate 
          &&
          timeRange.startDate <= proposal.end && proposal.end <= timeRange.endDate) 
          {
            selectedProposals.push(proposal)
          }
    })
    dispatch(updateSelectedProposals(selectedProposals))
    // console.log("selectedProposals: ", selectedProposals)
  }, [loadedProposals, timeRange])
  
  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    const selectedProposalIds: string[] = selectedProposals.map((proposal: Proposal) => 
      proposal.id
    )

    try {
      const { data, loading } = 
        await votersOnProposals({
          variables: { first: 1000, proposal_in: selectedProposalIds} 
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