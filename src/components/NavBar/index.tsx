import MySearchBar from "./SearchBar";
import { 
  HomeIcon, 
  Cog6ToothIcon, 
  AdjustmentsVerticalIcon, 
  BookmarkSquareIcon, 
  QuestionMarkCircleIcon
 } from '@heroicons/react/24/outline'

const NavBar = () => {

  return (
    <header className="grid justify-items-center h-full flex flex-wrap w-full text-sm py-0">

    <div className="grid grid-cols-10 gap-2 w-4/5 flex">

      <div className="container col-span-2 rounded-lg p-2 m-2">
        <button 
          className="text-black font-bold py-2 px-4"
          type="submit"
          // onClick={handleOnClick}
          >
          <HomeIcon
            className="h-7 w-7"
            aria-hidden="true"
          />
        </button>
      </div>
           
    <MySearchBar />   {/* col-span-6 */}

    <div className="grid col-span-2 grid-cols-3 gap-0 rounded-lg p-0 m-0">
          {/* <div className="flex grow h-10 items-center  sm:justify-end sm:gap-x-7  "> */}

          <div className="container col-span-1 rounded-lg p-2 m-2">
            <button 
              className="text-black font-bold py-2 px-4"
              type="submit"
              // onClick={handleOnClick}
              >
              <Cog6ToothIcon
                className="h-7 w-7"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="container col-span-1 rounded-lg p-2 m-2">
            <button 
              className="text-black font-bold py-2 px-4"
              type="submit"
              // onClick={handleOnClick}
              >
              <BookmarkSquareIcon
                className="h-7 w-7"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="container col-span-1 rounded-lg p-2 m-2">
            <button 
              className="text-black font-bold py-2 px-4"
              type="submit"
              // onClick={handleOnClick}
              >
              <QuestionMarkCircleIcon
                className="h-7 w-7"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

      </div>
    {/* </div> */}
    </header>
  );
}

export default NavBar;