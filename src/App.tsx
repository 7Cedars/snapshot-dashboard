// import FetchSpaces from "./components/FetchSpaces";
import SelectComponent from "./components/selectSpacesComponent";
import NetworkComponent from "./components/networkComponent";
import TimeRangeComponent from "./components/timeRangeComponent";
import { useMatch } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "./reducers/hooks";
import { useEffect } from "react";

const App = () => {

  const { urlData } = useAppSelector(state => state.userInput)
  const navigate = useNavigate();
  
  
  useEffect(() => {
    navigate(`/${urlData}`); 
  }, [urlData])

  const match = useMatch("/");
  console.log(match)

  return (
    <Router>
      <div className="grid grid-cols-3 gap-3">
        <b> Hello world from App </b> 
        <div className="col-span-2">
          <SelectComponent/>
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
