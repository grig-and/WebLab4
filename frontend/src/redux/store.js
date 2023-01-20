import {configureStore} from "@reduxjs/toolkit"

import formStateReducer from "./slice/formStateSlice"
import pointStateReducer from "./slice/pointStateSlice"

export default configureStore({
  reducer: {
    formState: formStateReducer,
    pointsState: pointStateReducer,
  }
});