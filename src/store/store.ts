import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import meetupReducer from './meetupsSlice'

// ...

const combinedReducer = combineReducers({
  user: userReducer,
  meetups: meetupReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'reset') {
    state = {} as RootState
  }

  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
