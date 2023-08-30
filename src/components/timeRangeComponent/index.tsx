import { useAppSelector } from "../../reducers/hooks";
import { toDateFormat, toTimestamp } from "../../utils/utils";
import { useAppDispatch } from "../../reducers/hooks";
import { updateUrl } from "../../reducers/urlReducer";
import { Proposal } from "../../types";
import { useLazyQuery } from "@apollo/client";
import { PROPOSALS_FROM_SPACES } from "../../utils/queries";
import { addProposals } from "../../reducers/proposalsReducer";
import { toSelectedProposals } from "../../utils/utils";
import { useEffect, useState, useRef } from "react";
import { useDimensions } from "../../hooks/use-dimensions";
import { data } from "./demoData";
import { Heatmap } from "../charts/HeatmapBasic/Heatmap";
import { toHeatmapData } from "../../utils/transposeData";
import { ChartCanvas } from "../ui/ChartCanvas";

const TimeRangeComponent = () => { 

  const dispatch = useAppDispatch()
  const { selectedSpaces, startDate, endDate } = useAppSelector(state => state.userInput)
  const { proposals } = useAppSelector(state => state.loadedProposals)

  const selectedProposals = proposals.filter(proposal => {
    return selectedSpaces.includes(proposal.space.id)
  })

  const nCol = 45
  const width = window.innerWidth * (6/7) 
  const realData = toHeatmapData({proposals: selectedProposals, nCol}) 
  console.log("data: ", data)
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);
  console.log("chartSize: ", chartSize)

  return (
    <div> 
      <b> Time Range Component </b>    
          <ChartCanvas
            VizComponent={Heatmap}
            vizName={"heatmap"}
            maxWidth={2000}
            height={500}
            />
      {/* // <Heatmap data={realData} width={width} height={(width) / nCol * selectedSpaces.length } /> */}

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