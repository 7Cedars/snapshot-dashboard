import { useAppSelector } from "../../reducers/hooks";
import { toDateFormat, toTimestamp } from "../../utils/utils";
import { useAppDispatch } from "../../reducers/hooks";
import { updateUrl } from "../../reducers/urlReducer";
import { Proposal } from "../../types";
import { useLazyQuery } from "@apollo/client";
import { PROPOSALS_FROM_SPACES } from "../../utils/queries";
import { addProposals } from "../../reducers/proposalsReducer";
import { toSelectedProposals } from "../../utils/utils";
import { useEffect, useState } from "react";
import { data } from "./demoData";
import { Heatmap } from "./Heatmap";
import { toHeatmapData } from "../../utils/transposeData";

const TimeRangeComponent = () => { 

  const dispatch = useAppDispatch()
  const { selectedSpaces, startDate, endDate } = useAppSelector(state => state.userInput)
  const { proposals } = useAppSelector(state => state.loadedProposals)

  const selectedProposals = proposals.filter(proposal => {
    return selectedSpaces.includes(proposal.space.id)
  })

  const nCol = 45
  const width = window.innerWidth * (4/7) 
  const realData = toHeatmapData({proposals: selectedProposals, nCol}) 
  console.log("data: ", data)

  return (
    <div> 
      <b> Time Range Component </b>

      <Heatmap data={realData} width={width} height={(width - 120) / nCol * selectedSpaces.length } />

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