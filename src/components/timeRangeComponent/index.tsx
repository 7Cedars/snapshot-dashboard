import { useAppSelector } from "../../reducers/hooks";
import { toDateFormat, toTimestamp } from "../../utils/utils";
import { useAppDispatch } from "../../reducers/hooks";
import { updateUrl } from "../../reducers/urlReducer";
import { Heatmap } from "../charts/Heatmap";
import { ChartCanvas } from "../ui/ChartCanvas";

const TimeRangeComponent = () => { 

  const dispatch = useAppDispatch()
  const { startDate, endDate } = useAppSelector(state => state.userInput)

  return (
    <div> 
      <b> Time Range Component </b>    
          <ChartCanvas
            VizComponent={Heatmap}
            vizName={"heatmap"}
            maxWidth={2000}
            height={300}
            />

      <div> 
        Start date: 
      <input
          type="date"
          placeholder="startDate"
          value={toDateFormat(startDate)}
          id="startDate"
          onChange={(date) => dispatch(
            updateUrl({
              data: toTimestamp(date.target.value), 
              type: 'startDate'
              })
            )}
        />
     
        End date: 
      <input
          type="date"
          placeholder="endDate"
          value={toDateFormat(endDate)}
          id="endDate"
          onChange={(date) => dispatch(
            updateUrl({
              data: toTimestamp(date.target.value), 
              type: 'endDate'
              })
            )}
        />
      </div>
    </div>
  );
}

export default TimeRangeComponent;