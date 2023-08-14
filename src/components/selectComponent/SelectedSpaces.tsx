import {Space} from "../../types" 
import { useAppSelector, useAppDispatch } from '../../reducers/hooks'
import { removeSpace } from '../../reducers/selectedSpacesReducer'
import { addProposals } from '../../reducers/proposalsReducer'
import { PROPOSALS_FROM_SPACE } from '../../utils/queries'
import { useLazyQuery } from '@apollo/client'

// useEffect(() => {
//   const result = useLazyQuery(PROPOSALS_FROM_SPACE, {
//     variables: { first: 1000, skip: 0, space: "streamr.eth"} 
//   })

//   console.log("data: ", result)
// }, [])

export const SelectedSpaces = () => {
  const spacesSelected = useAppSelector(state => state.selectedSpaces)
  const dispatch = useAppDispatch()
  const [proposalsFromSpace ] = useLazyQuery(PROPOSALS_FROM_SPACE)

  const loadProposals = async () => {
    const { data, loading } =  await proposalsFromSpace({variables: { first: 500, skip: 0, space: "streamr.eth"} })

    if (loading) {
      console.log("Loading")
    } 
    console.log("data: ", data)
    dispatch(addProposals(data)) 
   

    // return (<div> Proposals loaded</div>)
  }

  return (
    <div>
      <button 
        type="submit"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        onClick={(() => loadProposals() )} >
      LOAD 
      </button>

      {spacesSelected.spaces.map((space: Space) => (
        <div key = {space.id} > { space.id } 
        <button 
          type="submit"
          className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
          onClick={(() => dispatch(removeSpace(space)))}
          >
            Remove
        </button> 
        </div>
      ))
      }
    </div>
  )
}

export default SelectedSpaces