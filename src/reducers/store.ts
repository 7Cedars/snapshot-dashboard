// I will uncomment these as I implement them.. 

import { configureStore } from '@reduxjs/toolkit'

import userInputReducer from './userInputReducer'
import proposalsReducer from './proposalsReducer'
// import notificationReducer './notificationReducer'

const store = configureStore({
  reducer: {
    userInput: userInputReducer, 
    loadedProposals: proposalsReducer, 
    // notification: notificationReducer
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store