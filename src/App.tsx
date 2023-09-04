// import FetchSpaces from "./components/FetchSpaces";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./reducers/hooks";

import AboutDialog from "./components/modals/AboutModal";
import SettingsDialog from "./components/modals/SettingsModal";
import SavedSearchesDialog from "./components/modals/SavedSearches";
import SearchDialog from "./components/modals/SearchModal";

import SpacesList from "./components/SpacesList";
import NetworkComponent from "./components/NetworkChart";
import HeatMap from "./components/Heatmap";
import NavBar from "./components/NavBar";
import UpdateState from "./components/UpdateState";
import { RangeSlider } from "./components/ui/RangeSlider";

const App = () => {
  const { urlData } = useAppSelector(state => state.urlData)

  return (
    <Router>
      <div className="max-h-screen grid grid-cols-1 relative">
        <AboutDialog /> <SettingsDialog /> <SavedSearchesDialog /> <SearchDialog /> 
        <Navigate to={urlData} /> 
        <NavBar />

        <div className="flex flex-row w-full max-h-screen text-sm py-5 place-content-center px-2">
          <SpacesList/>
          <div className="grid grid-cols-1 w-3/5 border place-content-end border-gray-500 rounded-lg shadow-md ml-4  mt-20">
            {/* <NetworkComponent />  */}
            <HeatMap />  
            <RangeSlider />  
          </div>  
        </div>

        <Routes>  
          <Route path=":data" element={<UpdateState />} />  
        </Routes>

      </div>
    </Router>
  );
}

export default App;
