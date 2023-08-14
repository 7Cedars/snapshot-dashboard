// I will uncomment these as I implement them.. 

import { configureStore } from '@reduxjs/toolkit'
// import filterReducer from './filterReducer'
import selectedSpacesReducer from './selectedSpacesReducer'
// import timeRangeReducer from './timeRangeReducer'
import proposalsReducer from './proposalsReducer'
// import votesReducer from './votesReducer'
// import notificationReducer './notificationReducer'

const store = configureStore({
  reducer: {
    // filter: filterReducer, 
    selectedSpaces: selectedSpacesReducer, 
    // timeRange: timeRangeReducer, 
    loadedProposals: proposalsReducer, 
    // loadedVotes: votesReducer, 
    // notification: notificationReducer
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store