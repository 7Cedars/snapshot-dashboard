import { useLazyQuery } from '@apollo/client'
import { VOTERS_ON_PROPOSALS } from '../../utils/queries'
import { SyntheticEvent, useEffect } from 'react'; 
import { useAppSelector } from '../../reducers/hooks';

const NetworkComponent = () => {

  const [ votersOnProposals ] = useLazyQuery(VOTERS_ON_PROPOSALS)
  const spacesSelected = useAppSelector(state => state.selectedSpaces)
  const timeRangeSelected = useAppSelector(state => state.timeRange)

  // useEffect(() => {


  // }, [spacesSelected, timeRangeSelected])


  // 1648246815
  // 1676415282961


  
  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    try {
      const { data, loading } = 
      await votersOnProposals({
        variables: { first: 1000, proposal_in: [
          "0x02577e684b93e4448f3bf11709895b1a61b39b382180ceeee1a062fa04404af5", 
          "0x265f3b7dad61dd5c1fd1baabaaacf2ce0321259735aac94da0443816eb4cc603"
        ]} 
      })
        if (loading) {
          console.log("Loading")
        } 
        console.log("data: ", data)
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