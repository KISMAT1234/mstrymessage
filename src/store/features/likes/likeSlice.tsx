import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LikeState {
  items: string[]
}

const initialState: LikeState = {
  items:[]
}

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike:(state,action)=>{
     state.items.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addLike } = likeSlice.actions

export default likeSlice.reducer