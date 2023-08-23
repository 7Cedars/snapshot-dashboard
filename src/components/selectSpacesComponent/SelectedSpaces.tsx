import { useAppSelector } from '../../reducers/hooks'
import DeselectButton from "./DeselectButton"
import spaces from '../../data/spacesList'

export const SelectedSpaces = () => {
  const { selectedSpaces } = useAppSelector(state => state.userInput)

  return (
    <div>
      {selectedSpaces.map((spaceId: string) => {

        const space = spaces.find(space => space.id === spaceId)

        
        return (
          <>
            <div className={`block truncate font-medium`} >
              {spaceId}
            </div>
            { space ?  
              <div className={`block truncate font-light`} >
              Total votes: {space.votesCount} 
                {space.categories.length > 0 ? 
                ` | ${
                space.categories.map(category => category).join(", ")
                }`
                : 
                ` | no categories defined. `
                }
              </div>
              
              : 
              <div> 
                ... 
              </div> 
            }
            </>
        )
      })}
    </div>
  )
    }
{/* 
        // <div key = {spaceId} > { spaceId } 
        // <DeselectButton key = {spaceId} spaceId = {spaceId} /> 
        // </div>
      // )) */}

export default SelectedSpaces