import { useState, SyntheticEvent } from "react";
import { ListSpacesGqlValues} from "../types";
// import spacesService from "../../services/spaces";

interface Props {
  onSubmit: (values: ListSpacesGqlValues) => void;
}

const SelectSpaces = ({ onSubmit }: Props) => {

  const [first, setFirst] = useState<number>(1000)
  const [skip, setSkip] = useState<number>(0)

  const doGqLQuery = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      first,
      skip
    });
  };
  
  return (
    
    <form onSubmit={doGqLQuery} >
      GraphQL List Spaces Query: 
      <div>
        First: 
        <input
          type="number"
          placeholder="first"
          value={first}
          id="first"
          onChange={({ target }) => setFirst(parseInt(target.value))}
        />
      </div>
      <div>
        Skip: 
        <input
          value={skip}
          placeholder="Skip"
          id="skip"
          onChange={({ target }) => setSkip(parseInt(target.value))}
        />
      </div>
      <button
        type="submit"
        id="login-button"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
      >
        Query
      </button>
    </form>
  );
}

export default SelectSpaces;