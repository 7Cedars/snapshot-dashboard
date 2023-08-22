// import FetchSpaces from "./components/FetchSpaces";
import SelectComponent from "./components/selectSpacesComponent";
import NetworkComponent from "./components/networkComponent";
import TimeRangeComponent from "./components/timeRangeComponent";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./reducers/hooks";

const App = () => {
  const { urlData } = useAppSelector(state => state.urlData)
  return (
    <Router>
      <Navigate to={urlData} /> 
      <NavBar />
      <div className="items-center justify-center">
        <div className="grid grid-cols-3 gap-3 border">
        <h1 className="text-3xl font-bold underline text-red-600">
          Hello world from App
          </h1>
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
      </div>
    </Router>
  );
}

export default App;
