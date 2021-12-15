import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import meetupReducer from './meetupsSlice'

// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    meetups: meetupReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
