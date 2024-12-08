import { configureStore } from "@reduxjs/toolkit";
import { pagination } from "./reducer/pagination.reducer";

export default configureStore({
  reducer: {
    pagination: pagination
  },
});
