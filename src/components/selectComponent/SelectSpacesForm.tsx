import spaces from "../../data/spacesList"
import {Space} from "../../types" 

import { SyntheticEvent, useEffect, useState } from "react"
import Select, {MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated';

import SelectButton from "./SelectButton";

interface Option {
  value: string;  
  label: string;  
}

export const SelectSpacesForm = () => {
  // const loadedProposals = useAppSelector(state => state.loadedProposals)
  const compareVotes = (a: Space, b: Space) => {
    return b.votesCount - a.votesCount
  }

  const animatedComponents = makeAnimated();
  const [ filteredSpaces, setFilteredSpaces ] = useState<Space[]>(spaces.sort(compareVotes))
  const [ spacesToShow, setSpacesToShow ] = useState<Space[]>([])
  const [ selectedCategories ] = useState<MultiValue<Option>>();

  useEffect(() => {
    setSpacesToShow(filteredSpaces.slice(0,10))
  }, [])

  useEffect(() => {
    setSpacesToShow(filteredSpaces.slice(0,10))
  }, [filteredSpaces])

  const categoriesList: string[] = [] 
  spaces.map((space: Space) => {  
    categoriesList.push(...space.categories) 
  })
  const categories = Array.from(new Set(categoriesList))
  const selectOptions: Option[] = categories.map((category: string) => (
    { value: category, label: category }
  ))
  
  const handleFilterChange = (option: MultiValue<Option>) => {

      const selectedValues: string[] = option.map(item => item.value) 
      const filteredSpaces = spaces.filter((space: Space) => 
      space.categories.some(item => selectedValues.includes(item))
      )

      setFilteredSpaces(filteredSpaces)
  }

  const handleSearchChange = (event: SyntheticEvent) => {
    event.preventDefault

    const _searchedSpaces = filteredSpaces.filter((space: Space) => 
    space.id.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase())
  )
  setSpacesToShow(_searchedSpaces.slice(0,10))    
  }

  return (
    <div> 
      Select Spaces Form
      <Select closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti
              value={selectedCategories}
              options={selectOptions}
              onChange={option => handleFilterChange(option)}
              />
      <div>
        <input
          type="search"
          placeholder="search by name"
          //  value={stringFilter}
          id="first"
          onChange={handleSearchChange}
        />
      </div>

      {
      spacesToShow.map((space: Space) => (
        <SelectButton key = {space.id} space={space} />
      ))
      }
    
    </div>
  )
}

export default SelectSpacesForm
 