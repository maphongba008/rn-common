import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { localeSlice } from './locale/index'
import { themeSlice } from './theme'
export const store = configureStore({
  reducer: combineReducers({
    [localeSlice.name]: localeSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([]),
})
