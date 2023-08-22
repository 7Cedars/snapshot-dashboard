import SearchComponent from "./searchComponent/ComboBox";
import ComboBox from "./searchComponent/ComboBox";
import MyListbox from "./searchComponent/ListBox";

const NavBar = () => {

  return (
    <header className="grid justify-items-center h-full flex flex-wrap w-full text-sm py-0  border-2 border-red-600">

    <div className="grid grid-cols-3 gap-2 w-4/5 flex border border-red-300">
      <div className="col-span-2 grid grid-cols-6 gap-0 border border-amber-300 rounded-lg p-2 m-2">
            
            <MyListbox /> 
            <ComboBox /> 
          </div>
          <div className="container col-span-1 border border-gray rounded-lg border-1 border-blue-300 p-2 m-2">
              <div className="flex grow h-10 items-center  sm:justify-end sm:gap-x-7  ">
                <a className="font-medium text-black/[.8] hover:text-black sm:py-6" href="#">About</a>
                <a className="font-medium text-black/[.8] hover:text-black sm:py-6" href="#">FAQ</a>
                <a className="font-medium text-black/[.8] hover:text-black sm:py-6" href="#">Saved searches</a>
            </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;