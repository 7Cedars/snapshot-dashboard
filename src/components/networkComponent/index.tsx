import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS } from '../../utils/queries'
import { SyntheticEvent, useEffect, useState } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';
import { Proposal, Space, Vote } from '../../types';
import { useAppDispatch } from '../../reducers/hooks';
import { addVotes } from '../../reducers/proposalsReducer'

interface votersOnProposalsProps {
  loading: boolean;
  data: {votes: Vote[]};
}

const NetworkComponent = () => {
//  return <div> TEST </div> 
  const dispatch = useAppDispatch()
  const [ votersOnProposals ] = useLazyQuery(VOTERS_ON_PROPOSALS)
  const selection = useAppSelector(state => state.selection)
  const loadedProposals = useAppSelector(state => state.loadedProposals.proposals)
  const spacesSelected = useAppSelector(state => state.selection.spaces)
  const selectedSpacesIds = spacesSelected.map(space => space.id)
  const [selectedProposals, setSelectedProposals] = useState<Proposal[]>([])

  const withinTimeRange = (timeStamp: number ): boolean => {
    return selection.startDate <= timeStamp && timeStamp <= selection.endDate
  }
  
  const amongSelectedSpaces = (spaceId: string): boolean => {
    return selectedSpacesIds.includes(spaceId)
  }

  useEffect(() => {
    const selectedProposals: Proposal[] = [] 
    
    loadedProposals.map((proposal: Proposal) => {
      if (withinTimeRange(proposal.start) &&
          withinTimeRange(proposal.end) && 
          amongSelectedSpaces(proposal.space.id) ) 
      { selectedProposals.push(proposal) }
    })
    
    setSelectedProposals(selectedProposals)
    console.log("selectedProposals: ", selectedProposals)
    
  }, [selection])
  
  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault

    const proposalString = selectedProposals.map(proposal => proposal.id)
    console.log("proposalString: ", proposalString)

    try {
      const { data }: votersOnProposalsProps = 
        await votersOnProposals({
          variables: { first: 1000, skip: 0, proposal_in: proposalString} 
        })

        const votes = data 
        const proposals = selectedProposals as Proposal[] 
        dispatch(addVotes({votes, proposals}))

        } catch (e) {
        console.log("ERROR: ", e)
      }
  }

  console.log("spacesSelected: ", selectedSpacesIds) 


  

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