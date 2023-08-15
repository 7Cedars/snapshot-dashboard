import { SyntheticEvent } from 'react'
import { useAppDispatch } from '../../reducers/hooks'
import { addSpace } from '../../reducers/selectedSpacesReducer'
import {Space} from "../../types" 
import { PROPOSALS_FROM_SPACE } from '../../utils/queries'
import { useLazyQuery } from '@apollo/client'
import { addProposals } from '../../reducers/proposalsReducer'

interface Props {
  key: string, 
  space: Space
}

const SelectButton = ({space}: Props) => {
  const dispatch = useAppDispatch()
  const [proposalsFromSpace ] = useLazyQuery(PROPOSALS_FROM_SPACE)

  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    try {
      const { data, loading } = 
        await proposalsFromSpace({
          variables: { first: 500, skip: 0, space: space.id} 
        })
        if (loading) {
          console.log("Loading")
        } 
        console.log("data: ", data)
        dispatch(addProposals(data))
        dispatch(addSpace(space)) 
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  return (
    <div>
      {space.id}. Total votes: {space.votesCount}
        <button 
          type="submit"
          className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
          onClick={handleOnClick}
          >
          Add
        </button> 
    </div>
  )
}

export default SelectButton