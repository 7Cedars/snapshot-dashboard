import { SyntheticEvent } from 'react'
import { useAppDispatch } from '../../reducers/hooks'
import { removeSpace } from '../../reducers/userInputReducer'
import { removeProposals } from '../../reducers/proposalsReducer'
import {Space} from "../../types" 

interface Props {
  key: string, 
  space: Space
}

const DeselectButton = ({space}: Props) => {
  const dispatch = useAppDispatch()

  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    dispatch(removeSpace(space)) 
    dispatch(removeProposals(space)) 
  }

  return (
    <button 
      type="submit"
      className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
      onClick={handleOnClick}
      >
        Remove
    </button> 
  )
}

export default DeselectButton