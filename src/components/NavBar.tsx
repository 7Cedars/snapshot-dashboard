

const NavBar = () => {

  return (
    <header className="grid justify-items-center flex flex-wrap w-full text-sm py-0 ">

      <div className="grid grid-cols-6 gap-6 w-4/5 flex">
        <div className="container col-span-2 border border-gray rounded-full p-2 m-2">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-center sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
            search bar here
          </div>
        </div>
        <div className="container col-span-4 rounded-full flex-auto justify-items-end border border-grey/[.5] p-2 m-2">
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
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