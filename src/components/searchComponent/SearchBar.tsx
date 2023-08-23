import { Fragment, ReactNode, useEffect, useState } from 'react'
import { Listbox, Transition, Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Space } from "../../types";
import spaces from "../../data/spacesList"
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

const compareVotes = (a: Space, b: Space) => {
    return b.votesCount - a.votesCount
  }

const listCategories: string[] = [] 
spaces.map((space: Space) => {  
  listCategories.push(...space.categories) 
})
const categories = Array.from(new Set(listCategories))

export default function MySearchBar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredSpaces, setFilteredSpaces ] = useState<Space[]>(spaces.sort(compareVotes))
  const [selectedSpaces, setSelectedSpaces] = useState<Space[]>([])
  const [query, setQuery] = useState('')

  useEffect (() => {
    
    const firstFilter = spaces.filter((space: Space) => 
      space.categories.some(item => selectedCategories.includes(item))
    )

    if (query.length > 0) {
      const secondFilter = firstFilter.filter((space:Space) => 
        space.id.includes(query))
      setFilteredSpaces(secondFilter)
    } else {
      setFilteredSpaces(firstFilter)
    }

  }, [selectedCategories, query])

  console.log("selectedSpaces: ", selectedSpaces)

  return (
    <div className="col-span-2 grid grid-cols-8 gap-0 border border-amber-300 rounded-lg p-2 m-2">
    
    {/* First the filter by category button:   */}

      <div className="col-span-2 items-center justify-items-end w-full grid border" > 
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
    <div className="col-span-5 w-full grid border" > 
      <Combobox value={selectedSpaces} onChange={(event) => setSelectedSpaces(event)} multiple>
        <div className="relative mt-1">
        
          <div className="relative px-2 text-gray-400 cursor-default overflow-hidden border bg-white text-left sm:text-sm">
          <Combobox.Button>
            Search DAOs: 
            <Combobox.Input className = "relative focus:border-white px-2 text-gray-400 cursor-default overflow-hidden border-0 bg-white text-left sm:text-sm" 
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
      {/* <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
          type="submit"
          // onClick={handleOnClick}
          >
            add
        </button> */}
    </div>

  {/* And here the add button.. */}
  <div className="col-span-1 justify-items-start w-full grid border" > 
    <div className="relative mt-1">
      {/* {space.id}. Total votes: {space.votesCount} */}
      {/* <div className='relative px-2 text-gray-400 cursor-default overflow-hidden border bg-white text-left sm:text-sm'>  */}
        <button 
          className="bg-blue-500 hover:bg-blue-700 border border-blue-500 text-white font-bold py-2 px-4 rounded-r-lg"
          type="submit"
          // onClick={handleOnClick}
          >
            Add
        </button>
        </div>
    </div>

  </div>
  )
}