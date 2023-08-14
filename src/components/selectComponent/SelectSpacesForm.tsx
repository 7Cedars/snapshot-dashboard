import spaces from "../../data/spacesList"
import {Space} from "../../types" 

// const selectionList = () => {

//   const list = spaces.map() 
// }

interface Props {
  key: string, 
  space: Space
}

const SelectionButton = ({key, space}: Props) => {

  return (
    <div>
      {space.id}. Total votes: {space.votesCount}
        <button 
          type="submit"
          id={key}
          value={space.id}
          className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
          // onClick={(() => setSelectWindowOpen(true))}
          >
            Add
        </button> 
    </div>
  )
}

const compareVotes = (a: Space, b: Space) => {
  return b.votesCount - a.votesCount
}


const SelectSpacesForm = () => {

  let selectionList = spaces.sort(compareVotes)
  selectionList = selectionList.slice(0, 10)

  console.log(selectionList)

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
 