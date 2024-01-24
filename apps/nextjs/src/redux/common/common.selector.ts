import { createSelector } from 'reselect'

import type { CommonState } from '@/redux/common/common.reducer'
import type { RootState } from '@/redux/store'

const selectCommonReducer = (state: RootState) => state.common.value

export const selectGlobalLoaderActive = createSelector(selectCommonReducer, (common: CommonState) => common.loading)
