import {Space} from "../../types" 
import { useAppSelector } from '../../reducers/hooks'
import DeselectButton from "./DeselectButton"

export const SelectedSpaces = () => {
  const { spaces } = useAppSelector(state => state.selection)

  return (
    <div>
      {spaces.map((space: Space) => (
        <div key = {space.id} > { space.id } 
        <DeselectButton key = {space.id} space = {space} /> 
        </div>
      ))
      }
    </div>
  )
}

export default SelectedSpaces