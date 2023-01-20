import {createSlice} from "@reduxjs/toolkit";

export const formStateSlice = createSlice({
  name: "formState",
  initialState: {
    point: {
      x: null,
      y: null,
      r: 2
    }
  },
  reducers: {
    setX: (state, action) => {
      state.point.x = action.payload
    },
    setY: (state, action) => {
      state.point.y = action.payload
    },
    setR: (state, action) => {
      state.point.r = action.payload
    }
  }
})

export const {setX, setY, setR} = formStateSlice.actions

export const getX = state => state.formState.point.x
export const getY = state => state.formState.point.y
export const getR = state => state.formState.point.r

export default formStateSlice.reducer
