import spaces from "../../data/spacesList"
import {Space} from "../../types" 
import { useAppSelector, useAppDispatch } from '../../reducers/hooks'
import { addSpace } from '../../reducers/selectedSpacesReducer'
import { SyntheticEvent, useEffect, useState } from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

interface Props {
  key: string, 
  space: Space
}

const SelectionButton = ({space}: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      {space.id}. Total votes: {space.votesCount}
        <button 
          type="submit"
          className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
          onClick={(() => dispatch(addSpace(space)))}
          >
          Add
        </button> 
    </div>
  )
}

export const SelectSpacesForm = () => {
  // const loadedProposals = useAppSelector(state => state.loadedProposals)
  const [ spacesToShow, setSpacesToShow ] = useState<Space[]>([])
  const animatedComponents = makeAnimated();

  const compareVotes = (a: Space, b: Space) => {
    return b.votesCount - a.votesCount
  }

  const spacesList = spaces.sort(compareVotes)
  useEffect(() => {
    setSpacesToShow(spacesList.slice(0,10))
  }, [])

  const categoriesList: string[] = [] 
  spacesList.map((space: Space) => { 
    categoriesList.push(...space.categories) 
  })
  const categories = Array.from(new Set(categoriesList))
  const selectOptions = categories.map((category: string) => (
    { value: category, label: category }
    ) )
  
  console.log("selectOptions: ", selectOptions)

  const handleFilterChange = (event: SyntheticEvent) => {
    const _filteredSpaces = spacesList.filter((space: Space) => 
      space.id.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase())
    )
    setSpacesToShow(_filteredSpaces.slice(0,10))
  }

//   const onChange = (option: readonly Option[], actionMeta: ActionMeta<Option>) => {
//     ...
//  }

  return (
    <div> 
      Select Spaces Form
      <Select closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={selectOptions}
              onChange={handleFilterChange} 
              />
      <div>
        <input
          type="string"
          placeholder="search by name"
          //  value={stringFilter}
          id="first"
          onChange={handleFilterChange}
        />
      </div>

      {
      spacesToShow.map((space: Space) => (
        <SelectionButton key = {space.id} space={space} />
      ))
      }
    
    </div>
  )
}

export default SelectSpacesForm
 