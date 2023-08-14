import spaces from "../../data/spacesList"
import {Space} from "../../types" 
import { useAppSelector, useAppDispatch } from '../../reducers/hooks'
import { addSpace} from '../../reducers/selectedSpacesReducer'

interface Props {
  key: string, 
  space: Space
}

const SelectionButton = ({key, space}: Props) => {
  // const addingSpace = useAppSelector(state => state.selectedSpaces) (do not need initial state)
  const dispatch = useAppDispatch()

  return (
    <div>
      {space.id}. Total votes: {space.votesCount}
        <button 
          type="submit"
          id={key}
          // value={space.id}
          className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
          onClick={(() => dispatch(addSpace(space)))}
          >
            Add
        </button> 
    </div>
  )
}



export const SelectSpacesForm = () => {
  const compareVotes = (a: Space, b: Space) => {
    return b.votesCount - a.votesCount
  }

  let selectionList = spaces.sort(compareVotes)
  selectionList = selectionList.slice(0, 10)

  return (
    <div> 
      Select Spaces Form

      {
      selectionList.map((space: Space) => (
        <SelectionButton key = {space.id} space={space} />
        // <div key = {space.id}  > {space.id} </div>
      ))
      }
    
    </div>
  )
}

export default SelectSpacesForm
 