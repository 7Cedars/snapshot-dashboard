import { SyntheticEvent, useState } from "react";
import { useLazyQuery } from '@apollo/client'
import { LIST_SPACES } from '../utils/queries'
import { ListSpacesGqlValues, Space} from "../types";
import { toSpaceEntry } from "../utils/parsers";

const FetchSpaces = () => {

  const [first, setFirst] = useState<number>(1000)
  const [skip, setSkip] = useState<number>(0)
  const [spacesList, setSpacesList] = useState<Space[]>()

  const [listSpacesQuery, {loading, error, data, called} ] = useLazyQuery(LIST_SPACES)


  const submitQuery = async (event: SyntheticEvent) => {
      event.preventDefault()
      const { data } = await listSpacesQuery({variables: { first, skip } })
      console.log(data)

      if (loading) {
        return <div>loading</div>
      }
    
      if (error) {
        console.error(error);
      }
    
      if (data.spaces) {
        console.log(data.spaces)

        const parsedData = data.spaces.map((space: Space): Space =>
          toSpaceEntry(space)
        )

        console.log("parsedData, :", parsedData)
        setSpacesList(parsedData)
      }

      console.log("spacesList, :", spacesList)
  };

//   const saveData =  (event: SyntheticEvent) => {
//     event.preventDefault()
    
//     const dataToSave =  JSON.stringify(spacesList)
//     fs.writeFile('TESTSpacesSAVE.json', dataToSave, (error) => {
//       if (error) {
//         console.error(error);
    
//         throw error;
//       }
//     });
//     console.log("spacesList, :", spacesList)
// };

  return (   
    <form  >
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
          type="number"
          placeholder="skip"
          value={skip}
          id="skip"
          onChange={({ target }) => setSkip(parseInt(target.value))}
        />
      </div>
      <button
        type="submit"
        id="submit-button"
        className="font-medium text-white/[.8] px-5 hover:text-white sm:py-6"
        onClick={submitQuery}
      >
        Query
      </button>
      <div>

        RESULTS

        <div>
          {spacesList?.map(space => (
            <div key = {space.id}>
              <div> {space.id} </div>
              <div> {space.votesCount} </div>
            </div>
            ))
          }
        </div>
      </div>
    </form>
  );
}

export default FetchSpaces;