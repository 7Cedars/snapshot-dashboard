// import FetchSpaces from "./components/FetchSpaces";
import SelectComponent from "./components/selectSpacesComponent";
import NetworkComponent from "./components/networkComponent";
import TimeRangeComponent from "./components/timeRangeComponent";

const App = () => {

  return (
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
  );
}

export default App;
