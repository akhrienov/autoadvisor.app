import { combineReducers } from '@reduxjs/toolkit'

import commonReducer from './common/common.reducer'

export const rootReducer = combineReducers({
  common: commonReducer,
})
