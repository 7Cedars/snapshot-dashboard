import { Fragment, ReactNode, useEffect, useState, SyntheticEvent } from 'react'
import { Listbox, Transition, Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Space } from "../../types";
import spaces from "../../data/spacesList"
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { updateUrl } from '../../reducers/urlReducer';

const compareVotes = (a: Space, b: Space) => {
    return b.votesCount - a.votesCount
  }

const listCategories: string[] = [] 
spaces.map((space: Space) => {  
  listCategories.push(...space.categories) 
})
const categories = Array.from(new Set(listCategories))

export default function MySearchBar() {
  const dispatch = useAppDispatch()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredSpaces, setFilteredSpaces ] = useState<Space[]>(spaces.sort(compareVotes))
  const [preselectedSpaces, setPreselectedSpaces] = useState<Space[]>([])
  const { selectedSpaces } = useAppSelector(state => state.userInput)
  const [query, setQuery] = useState('')

  useEffect (() => {
    
    const firstFilter = spaces.filter((space: Space) => 
      space.categories.some(item => selectedCategories.includes(item))
    )

    const secondFilter = firstFilter.filter((space: Space) => 
      selectedSpaces.indexOf(space.id) === -1 
    )

    if (query.length > 0) {
      const thirdFilter = secondFilter.filter((space:Space) => 
        space.id.includes(query))
      setFilteredSpaces(thirdFilter)
    } else {
      setFilteredSpaces(secondFilter)
    }

  }, [selectedCategories, query, selectedSpaces])

  const handleOnClick = async (event: SyntheticEvent) => {
    event.preventDefault
    preselectedSpaces.forEach(space => 
      dispatch(updateUrl({data: space.id, type: 'space'}))
    )
    setPreselectedSpaces([])
  }

  return (
    <div className="col-span-6 grid grid-cols-8 gap-0 rounded-lg p-2 m-2">
    
    {/* First the filter by category button:   */}

      <div className="col-span-2 justify-items-end w-full grid" > 
        <Listbox value={selectedCategories} onChange={setSelectedCategories} multiple>
          <div className="relative w-full mt-1">
            <Listbox.Button className="relative w-full text-gray-400 cursor-default rounded-l-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
              Category
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((category, categoryIdx) => (
                  <Listbox.Option
                    key={categoryIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {category}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        </div>

    {/* Second: the ComboBox searchbar  */}    
    <div className="col-span-5 w-full grid" > 
      <Combobox value={preselectedSpaces} onChange={(event) => setPreselectedSpaces(event)} multiple>
        <div className="relative mt-1">
        
          <div className="relative px-2 text-gray-400 cursor-default overflow-hidden border bg-white text-left sm:text-sm">
          <Combobox.Button className = 'truncate max-w-md'>
          { preselectedSpaces.length === 0 ?
              "Search DAOs:"
              :
              preselectedSpaces.map(space => space.id).join(", ")
            }
            <Combobox.Input className = "  relative focus:border-white px-2 text-gray-400 cursor-default overflow-hidden border-0 bg-white text-left sm:text-sm" 
            
            onChange={(event) => setQuery(event.target.value)}
            />
            
          
          </Combobox.Button> 
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              Selected categories: {selectedCategories.join(", ") }

              {filteredSpaces.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredSpaces.map((space) => (
                  <Combobox.Option
                    key={space.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={space}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {space.id} #votes: {space.votesCount}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>

  {/* And here the add button.. */}
  <div className="col-span-1 justify-items-start w-full grid" > 
    <div className="relative mt-1">
        <button 
          className="bg-blue-500 hover:bg-blue-700 border border-blue-500 text-white font-bold py-2 px-4 rounded-r-lg"
          type="submit"
          onClick={handleOnClick}
          >
          Add
        </button>
      </div>
    </div>

  </div>
  )
}