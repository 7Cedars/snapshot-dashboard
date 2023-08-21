import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS } from '../../utils/queries'
import { SyntheticEvent, useEffect, useState } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';
import { Proposal, Space, Vote } from '../../types';
import { useAppDispatch } from '../../reducers/hooks';
import { addVotes } from '../../reducers/proposalsReducer'
import { toNetworkGraph } from '../../utils/transposeData';
import { toSelectedProposals } from '../../utils/utils';

interface votersOnProposalsProps {
  loading: boolean;
  data: {votes: Vote[]};
}

// NB Refactor later: 
// loadedProposals => savedProposals
// selectedProposals => loadedProposals

const NetworkComponent = () => {
  const dispatch = useAppDispatch()
  const [ votersOnProposals ] = useLazyQuery(VOTERS_ON_PROPOSALS)
  const {selectedSpaces, startDate, endDate} = useAppSelector(state => state.userInput)
  const proposals = useAppSelector(state => state.loadedProposals.proposals)
  const [selectedProposals, setSelectedProposals] = useState<Proposal[]>([])

  useEffect(() => {
    const selectedProposals = toSelectedProposals({ 
      proposals,
      selectedSpaces, 
      startDate, 
      endDate
    })

    setSelectedProposals(selectedProposals)
    
  }, [proposals, selectedSpaces, startDate, endDate ])
  
  const handleDataOnClick = async (event: SyntheticEvent) => {
    event.preventDefault

    const proposalString = selectedProposals.map(proposal => proposal.id)
    console.log("proposalString: ", proposalString)

    try {
      const { data }: votersOnProposalsProps = 
        await votersOnProposals({
          variables: { first: 1000, skip: 0, proposal_in: proposalString} 
        })

        const votes = data 
        console.log("LOADED VOTES: ", votes)
        const proposals = selectedProposals as Proposal[] 
        dispatch(addVotes({votes, proposals}))

        } catch (e) {
        console.log("ERROR: ", e)
      }

      toNetworkGraph(selectedProposals)
  }
  

  return (
    <div> 
      <b> Network Component </b>
      <button 
        type="submit"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        onClick={handleDataOnClick}
        >
        LOAD DATA
      </button> 
      <button 
        type="submit"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        // onClick={handleGraphOnClick}
        >
        CREATE GRAPH DATA
      </button> 
    </div>
  );
}

export default NetworkComponent;