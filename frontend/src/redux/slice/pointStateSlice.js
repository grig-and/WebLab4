import {createSlice} from "@reduxjs/toolkit"

export const pointStateSlice = createSlice({
  name: "pointsState",
  initialState: {
    points: []
  },
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload
    },
    addPoint: (state, action) => {
      state.points.push(action.payload)
    }
  }
})

export const {setPoints, addPoint} = pointStateSlice.actions
export const getPoints = state => state.pointsState.points

export default pointStateSlice.reducer
