import spaces from "../../data/spacesList"
import { MinusCircleIcon, UserIcon } from '@heroicons/react/24/outline'

interface Props {
  key: string; 
  spaceId: string;
}

const SpaceItem = ( {spaceId}: Props) => {
  
  const space = spaces.find(space => space.id === spaceId)

  return (
    <div className='grid grid-cols-8 gap-0 divide-x border rounded-lg border-gray-400 shadow-md mx-2 my-3 py-3'>
        <div className="col-span-2 flex items-center justify-center">
          
          <label className="text-blue border-blue hover:bg-blue flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-yellow-400 bg-white shadow-lg hover:text-white">
            {/* img: https://cdn.stamp.fyi/space/magicappstore.eth !! */ }
            <UserIcon
              className="h-8 w-8 text-gray-800"
              aria-hidden="true"
            />
          </label>
         
        </div>
        <div className='col-span-5'> 
          <div className={`truncate font-medium text-base pl-3`} >
            {spaceId}
          </div>
          { space ?
            <>
              <div className={`block truncate font-light text-gray-600 pl-3`} >
                Total votes: {space.votesCount} 
              </div>
              <div className={`block truncate font-light text-gray-600 pl-3`}>
                {space.categories.length > 0 ? 
                  `Categories: ${space.categories.map(category => category).join(", ")}`
                  : 
                  `No categories defined.`
                }
              </div>
            </>
            : <div/> 
          }
        </div>
        
        <div className="col-span-1 flex items-center justify-center">
          <button 
            className="font-bold"
            type="submit"
            // onClick={handleOnClick}
            >
              <MinusCircleIcon
                className="h-8 w-8 text-red-400 hover:text-red-600 items-center justify-center"
                aria-hidden="true"
              />
          </button>
        </div>
        
          

         
        

          
        
        <div/>
      <div/>
    </div>
  )
}

export default SpaceItem