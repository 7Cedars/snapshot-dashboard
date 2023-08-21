import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Space, UrlDataPayload, UserInputState } from '../types'
import { standardDateRange } from '../constants'

const initialState: UserInputState = {
  urlData: `sps:&&sd:${Date.now() - standardDateRange}&&${Date.now()}`, // I can shorten dates later.  
  selectedSpaces: [], 
  startDate: Date.now() - standardDateRange,
  endDate: Date.now()
}

export const selectedSpacesSlice = createSlice({
  name: 'userInput',
  initialState: initialState, 
  reducers: {
    updateSelectedSpaces: (state, action: PayloadAction<string[]>) => {
     state.selectedSpaces = action.payload
    },
    updateStartDate: (state, action: PayloadAction<number>) => {
      state.startDate = action.payload
    }, 
    updateEndDate: (state, action: PayloadAction<number>) => {
      state.endDate = action.payload
    },
    updateUrl: (state, action: PayloadAction<UrlDataPayload>) => {    
      const splitUrl = state.urlData.split('&&')

      switch (action.payload.type) {
        case 'space': {
          const isSelected = splitUrl[0].indexOf(action.payload.data)
          if (isSelected === -1) {
              splitUrl[0] = splitUrl[0] + `${action.payload.data};`
              state.urlData = splitUrl.join('&&')
            } else {
              splitUrl[0] = splitUrl[0].replace(`${action.payload.data};`, '')
              state.urlData = splitUrl.join('&&')
            }
          }
          break;
        case 'startDate':
          splitUrl[1] = `sd:${action.payload.data}`
          state.urlData = splitUrl.join('&&')
          break;
        case 'endDate':
          splitUrl[2] = `ed:${action.payload.data}`
          state.urlData = splitUrl.join('&&')
          break;
        default:
          console.log(`Non-existing type provided at updateUrl at userInputReducer.`);        
      }
    },
  }
})

export const { updateSelectedSpaces, updateStartDate, updateEndDate, updateUrl } = selectedSpacesSlice.actions

export default selectedSpacesSlice.reducer