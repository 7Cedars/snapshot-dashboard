import { SyntheticEvent, useState } from 'react'
import { useAppDispatch } from '../../reducers/hooks'
import { Space} from "../../types" 
import { updateUrl } from '../../reducers/userInputReducer'

interface Props {
  space: Space
  key: string
}

const SelectButton = ({space}: Props) => {
  const dispatch = useAppDispatch()
  
  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    dispatch(updateUrl({data: space.id, type: "space"}))
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