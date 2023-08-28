// import FetchSpaces from "./components/FetchSpaces";
import SelectedSpacesComponent from "./components/selectSpacesComponent";
import NetworkComponent from "./components/networkComponent";
import TimeRangeComponent from "./components/timeRangeComponent";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./reducers/hooks";
import { useState } from "react";
import { updateModal } from "./reducers/userInputReducer";
import AboutDialog from "./components/modals/AboutModal";
import SettingsDialog from "./components/modals/SettingsModal";
import SavedSearchesDialog from "./components/modals/SavedSearches";

const App = () => {
  const { urlData } = useAppSelector(state => state.urlData)
  const dispatch = useAppDispatch()

  return (

    <Router>

    <AboutDialog /> <SettingsDialog /> <SavedSearchesDialog /> 
      
      <Navigate to={urlData} /> 
      <NavBar />

      <div className="grid justify-items-center flex flex-wrap w-full text-sm py-0  border-2 border-blue-600">
      
        <div className="grid grid-cols-4 w-4/5">
          <div className="container col-span-1 border border-gray rounded-lg border-1 border-blue-300">
            <Routes>  
              <Route path=":data" element={<SelectedSpacesComponent/>} />
            </Routes>
          </div>
          <div className="container col-span-3 border border-gray rounded-lg border-1 border-blue-300">
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
