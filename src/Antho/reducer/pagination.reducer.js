import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

export const pagination = createSlice({
  name: "pagination",
  initialState: {
    offset: 0,
    limit: 5,
    offsetSearch: 0,
    limitSearch: 5,
    searchMode: false,
  },
  reducers: {
    next: (state) => {
      state[state.searchMode ? "offsetSearch" : "offset"] +=
        state[state.searchMode ? "limitSearch" : "limit"];
    },
    prev: (state) => {
      if(state[state.searchMode ? "offsetSearch" : "offset"] === 0) return; 
      state[state.searchMode ? "offsetSearch" : "offset"] -=
        state[state.searchMode ? "limitSearch" : "limit"];
    },
    setSearchMode(state, { payload }) {
      state.searchMode = payload;
    },
  },
});

export const { prev, next, setSearchMode } = pagination.actions;

export const selectPagination = createSelector(
    (state) => state.pagination,
    ({ offset, limit, offsetSearch, limitSearch, searchMode }) => {
        let currentLimit = searchMode ? limitSearch : limit;
        let currentOffset = searchMode ? offsetSearch : offset;

        const current = Math.floor(currentOffset / currentLimit) + 1;

        return { offset: currentOffset, limit: currentLimit, current, searchMode };
    }
);
export default pagination.reducer;
