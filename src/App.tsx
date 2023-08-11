import { useState, SyntheticEvent } from "react";
import { Space, ListSpacesGqlValues} from "./types";
import { useQuery } from '@apollo/client'
import { LIST_SPACES } from './utils/queries'
import SelectSpaces from "./components/SelectSpaces";

function App() {

  // const [spacesList, setSpacesList] = useState<Space[]>([])

  const submitGqlQuery = (values: ListSpacesGqlValues): void => {
    try {
      const list = useQuery(LIST_SPACES, {
        variables: { values }
      });
      console.log(list)
      // setSpacesList(spacesList.concat([list]));
    } catch (e: unknown) {
        console.error("Unknown error", e);
      }
    }

  return (
    <div>
      <SelectSpaces onSubmit={submitGqlQuery}/>
    </div>
  );
}

export default App;
