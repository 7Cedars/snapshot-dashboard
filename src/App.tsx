// import FetchSpaces from "./components/FetchSpaces";
import SelectedSpacesComponent from "./components/selectSpacesComponent";
import NetworkComponent from "./components/networkComponent";
import TimeRangeComponent from "./components/timeRangeComponent";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./reducers/hooks";
import AboutDialog from "./components/modals/AboutModal";
import SettingsDialog from "./components/modals/SettingsModal";
import SavedSearchesDialog from "./components/modals/SavedSearches";
import SearchDialog from "./components/modals/SearchModal";

const App = () => {
  const { urlData } = useAppSelector(state => state.urlData)

  return (
    <Router>
      <div className="max-h-screen grid grid-cols-1 relative">
        <AboutDialog /> <SettingsDialog /> <SavedSearchesDialog /> <SearchDialog /> 
        
        <Navigate to={urlData} /> 
        <div>
          <NavBar />
        </div>
        <div className="flex flex-row w-full max-h-screen text-sm py-5 place-content-center px-2">

          <Routes>  
            <Route path=":data" element={<SelectedSpacesComponent/>} />
          </Routes>
            
          <div className="grid grid-cols-1 w-3/5 border border-gray-500 rounded-lg shadow-md ml-4  mt-20">
            <div> <NetworkComponent />  </div>
            <div> <TimeRangeComponent />  </div>
            {/* <FetchSpaces /> */}
          </div>  
        </div>
      </div>
    </Router>

  );
}

export default App;
