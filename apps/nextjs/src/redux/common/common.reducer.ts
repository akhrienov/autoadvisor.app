import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  value: CommonState
}

export type CommonState = {
  loading: boolean
}

const COMMON_INITIAL_STATE = {
  value: {
    loading: true,
  } as CommonState,
} as InitialState

export const commonSlice = createSlice({
  name: 'common',
  initialState: COMMON_INITIAL_STATE,
  reducers: {
    setGlobalLoaderState: (state, action: PayloadAction<{ state: boolean }>): void => {
      state.value.loading = action.payload.state
    },
  },
})

export const { setGlobalLoaderState } = commonSlice.actions
export default commonSlice.reducer
