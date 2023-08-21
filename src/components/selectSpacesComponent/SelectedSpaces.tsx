import {Space} from "../../types" 
import { useAppSelector } from '../../reducers/hooks'
import DeselectButton from "./DeselectButton"

export const SelectedSpaces = () => {
  const { selectedSpaces } = useAppSelector(state => state.userInput)

  return (
    <div>
      {selectedSpaces.map((space: Space) => (
        <div key = {space.id} > { space.id } 
        <DeselectButton key = {space.id} space = {space} /> 
        </div>
      ))
      }
    </div>
  )
}

export default SelectedSpaces