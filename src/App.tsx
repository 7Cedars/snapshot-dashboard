// import FetchSpaces from "./components/FetchSpaces";
import SelectedSpacesComponent from "./components/selectSpacesComponent";
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
      <div className="grid justify-items-center flex flex-wrap w-full text-sm py-0  border-2 border-blue-600">
        <div className="grid grid-cols-3 gap-2 w-4/5 flex">
          <div className="container col-span-1 border border-gray rounded-lg border-1 border-blue-300 p-2 m-2">
            <Routes>  
              <Route path=":data" element={<SelectedSpacesComponent/>} />
            </Routes>
          </div>
          <div className="container col-span-2 border border-gray rounded-lg border-1 border-blue-300 p-2 m-2">
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
