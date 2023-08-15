import {Space} from "../../types" 
import { useAppSelector, useAppDispatch } from '../../reducers/hooks'
import { removeSpace } from '../../reducers/selectedSpacesReducer'

export const SelectedSpaces = () => {
  const spacesSelected = useAppSelector(state => state.selectedSpaces)
  const dispatch = useAppDispatch()

  return (
    <div>
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