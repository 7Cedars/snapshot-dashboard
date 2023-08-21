// import FetchSpaces from "./components/FetchSpaces";
import SelectComponent from "./components/selectSpacesComponent";
import NetworkComponent from "./components/networkComponent";
import TimeRangeComponent from "./components/timeRangeComponent";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./reducers/hooks";

const App = () => {
  const { urlData } = useAppSelector(state => state.urlData)
  return (
    <Router>
      <Navigate to={urlData} /> 
      <div className="grid grid-cols-3 gap-3">
        <b> Hello world from App </b> 
        <div className="col-span-2">
        <Routes>  
          <Route path=":data" element={<SelectComponent/>} />
        </Routes>
          </div>
          <div className="basis-2/3">
            <div> <TimeRangeComponent />  </div>
            <div> <NetworkComponent />  </div>
          </div> 
        
        {/* <FetchSpaces /> */}
      </div>
    </Router>
  );
}

export default App;
