import { configureStore } from '@reduxjs/toolkit'
import { addLike } from './features/likes/likeSlice'

export const makeStore = () => { //Now we have a function, makeStore, that we can use to create a store instance per-request while retaining the strong type safety (if you choose to use TypeScript) that Redux Toolkit provides.
  return configureStore({
    reducer: {
      like: addLike
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
