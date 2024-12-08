import { configureStore } from "@reduxjs/toolkit";
import ygoReducer from "./services/ygo.reducer";
import pagination  from "./Antho/reducer/pagination.reducer";

export default configureStore({
  reducer: {
    search: ygoReducer,
    pagination: pagination,
  },
});
