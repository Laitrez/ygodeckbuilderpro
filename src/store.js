import { configureStore } from "@reduxjs/toolkit";
import ygoReducer from "./services/ygo.reducer";
import deckSlice from "./services/ygo.deckSlice";

export default configureStore({
  reducer: {
    search: ygoReducer,
    deck: deckSlice 
  },
});
