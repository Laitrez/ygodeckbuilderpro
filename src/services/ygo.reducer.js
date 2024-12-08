import { createSlice } from "@reduxjs/toolkit";

export const ygoReducer = createSlice({
  name: "search",
  initialState: {
    value: null,
    page: 1,
    context: null,
  },
  reducers: {
    set: (state, { payload }) => {
      state.value = payload;
    },
    setPage: (state, { payload }) => {
      // console.log("PageTest: ", payload.pageTest);
      if (payload.pageTest > 0 && payload.pageTest <= payload.pageMax) {
        state.page = payload.pageTest;
      } else {
        // console.log("Page number out of bounds");
      }
      // console.log("Updated Page in Reducer:", state.page); // Debug log
    },
    setC: (state, { payload }) => {
      state.context = payload;
    },
  },
});

export const { set, setPage, setC } = ygoReducer.actions;

export default ygoReducer.reducer;
