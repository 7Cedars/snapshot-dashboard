// I will uncomment these as I implement them.. 

import { configureStore } from '@reduxjs/toolkit'

import selectedSpacesReducer from './selectedSpacesReducer'
import timeRangeReducer from './timeRangeReducer'
import proposalsReducer from './proposalsReducer'
// import notificationReducer './notificationReducer'

const store = configureStore({
  reducer: {
    selectedSpaces: selectedSpacesReducer, 
    timeRange: timeRangeReducer, 
    loadedProposals: proposalsReducer, 
    // notification: notificationReducer
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store