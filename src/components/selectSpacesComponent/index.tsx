import { useState } from "react";
import SelectSpacesForm from "./SelectSpacesForm"
import SelectedSpaces from "./SelectedSpaces";

const SelectComponent = () => {

  const [selectWindowOpen, setSelectWindowOpen] = useState<boolean>(false)

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