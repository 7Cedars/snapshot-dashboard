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
       <Navigate to={urlData} /> 

      <div className="max-h-screen grid grid-cols-1 relative">
        <AboutDialog /> <SettingsDialog /> <SavedSearchesDialog /> 
        <Routes>
          {/* <Route path=":data" element={<SearchDialog /> } />  */}
          <Route path=":data" element={<NavBar />} /> 

          <Route path=":data" element={
            <> 
            <div className="flex flex-row w-full max-h-screen text-sm py-5 place-content-center px-2">
              <div> 
                <SpacesList/>
              </div>
              <NetworkComponent />
              <HeatMap />
              <RangeSlider /> 
            </div> 
            </>
          } />

        {/* <Route path=":data" element={<UpdateState />} />   */}

      </Routes>
      </div>
    </Router>
  );
}

export default App;
