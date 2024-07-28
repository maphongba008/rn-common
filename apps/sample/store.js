import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { localeSlide } from './locale/index'

export const store = configureStore({
  reducer: combineReducers({
    [localeSlide.name]: localeSlide.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([]),
})
