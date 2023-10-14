import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './tokenSlice'
import notificationSlice from './notificationSlice'

export const store = configureStore({
    reducer: {
        token : tokenSlice,
        noti : notificationSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch