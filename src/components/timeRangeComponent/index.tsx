import { useState, SyntheticEvent } from "react";

const TimeRangeComponent = () => {

  const [startDate, setStartDate] = useState<string>("2020-01-01")
  const [endDate, setEndDate] = useState<string>("2020-02-01")

  return (
    <div> 
      <b> Time Range Component </b>
      <div> 
        Start date: 
      <input
          type="date"
          placeholder="startDate"
          value={startDate}
          id="startDate"
          onChange={(date) => setStartDate(date.target.value)}
        />
      </div>
      <div> 
        End date: 
      <input
          type="date"
          placeholder="endDate"
          value={endDate}
          id="endDate"
          onChange={(date) => setEndDate(date.target.value)}
        />
      </div>
    </div>
  );
}

export default TimeRangeComponent;