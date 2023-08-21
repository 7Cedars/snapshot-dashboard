import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS } from '../../utils/queries'
import { SyntheticEvent, useEffect, useState } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';
import { Proposal } from '../../types';
import { useAppDispatch } from '../../reducers/hooks';
import { addVotes } from '../../reducers/proposalsReducer'
import { toNetworkGraph } from '../../utils/transposeData';
import { toSelectedProposals } from '../../utils/utils';

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

    const proposalsToLoad = selectedProposals.filter(proposal => 
      proposal.votesLoaded === false
    )    
    const proposalsToLoadStr = proposalsToLoad.map(proposal => proposal.id)

    if (proposalsToLoadStr.length > 0) {
      try {
        let continueFetching = true;
        let skip = 0;
        while (continueFetching === true) {
      
          const { data } = await votersOnProposals({
            variables: { first: 1000, skip: skip, proposal_in: proposalsToLoadStr} 
          })

          console.log("FETCHED VOTES: ", data)
          console.log("LENGTH Fetched votes: ", data.votes.length)
          
          dispatch(addVotes(data.votes))

          if (data.votes.length !== 1000) { 
            continueFetching = false 
          } else {
            skip = skip + 1000
          } 
        }

      } catch (e) {
        console.log("ERROR: ", e)
      }
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