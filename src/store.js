import { configureStore } from "@reduxjs/toolkit";
import ygoReducer from "./services/ygo.reducer";

export default configureStore({
  reducer: {
    search: ygoReducer
  },
});
