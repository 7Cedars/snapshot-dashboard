import {Space} from "../../types" 
import { useAppSelector, useAppDispatch } from '../../reducers/hooks'

export const SelectedSpaces = () => {
    const spacesSelected = useAppSelector(state => state.selectedSpaces)
    //  const dispatch = useAppDispatch()


  return (
    <div>
      {spacesSelected.spaces.map((space: Space) => (
        <div key = {space.id} > { space.id } </div>
      ))
      }
    </div>
  )
}

export default SelectedSpaces