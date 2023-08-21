import { SyntheticEvent } from 'react'
import { useAppDispatch } from '../../reducers/hooks'
import { updateUrl } from '../../reducers/urlReducer'

interface Props {
  key: string, 
  spaceId: string
}

const DeselectButton = ({spaceId}: Props) => {
  const dispatch = useAppDispatch()

  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    dispatch(updateUrl({data: spaceId, type: 'space'})) 
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