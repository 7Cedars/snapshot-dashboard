import { useEffect, useState } from "react";
import SelectSpacesForm from "./SelectSpacesForm"
import SelectedSpaces from "./SelectedSpaces";
import { useParams } from "react-router-dom";
import { parseInputEntries } from "../../utils/parsers";
import { useAppDispatch } from "../../reducers/hooks";
import { updateEndDate, updateSelectedSpaces, updateStartDate } from "../../reducers/userInputReducer";

const SelectComponent = () => {

  const dispatch = useAppDispatch()
  const [selectWindowOpen, setSelectWindowOpen] = useState<boolean>(false)
  const { data } = useParams();
  const {selectedSpaces, startDate, endDate}  = parseInputEntries(data)

  useEffect(() => {
    dispatch(updateEndDate(endDate))
    dispatch(updateStartDate(startDate))
    dispatch(updateSelectedSpaces(selectedSpaces))
  }, [data])
  
  return (
    <div> 
      < SelectedSpaces /> 

    {selectWindowOpen === false ? 
      <button 
        type="submit"
        id="open-select-spaces"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        onClick={(() => setSelectWindowOpen(true))}
        >
          Select Spaces
      </button> 
     : 
     <div> 
        <button 
          type="submit"
          id="close-select-spaces"
          className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
          onClick={(() => setSelectWindowOpen(false))}
          >
            Close
        </button> 
        <SelectSpacesForm /> 
      </div> 
   }

    </div>
  );
}

export default SelectComponent;