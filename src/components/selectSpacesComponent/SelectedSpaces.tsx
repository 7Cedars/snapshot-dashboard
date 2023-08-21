import { useAppSelector } from '../../reducers/hooks'
import DeselectButton from "./DeselectButton"

export const SelectedSpaces = () => {
  const { selectedSpaces } = useAppSelector(state => state.userInput)

  return (
    <div>
      {selectedSpaces.map((spaceId: string) => (
        <div key = {spaceId} > { spaceId } 
        <DeselectButton key = {spaceId} spaceId = {spaceId} /> 
        </div>
      ))
      }
    </div>
  )
}

export default SelectedSpaces