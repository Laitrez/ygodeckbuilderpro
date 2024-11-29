import React, { useEffect } from "react";
import store from "../store";
import { useDispatch, useStore, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";



        {/* <button className="btn btn-primary">Primary</button> */}
        {/* <button className="btn btn-primary">Primary</button> */}
export const BNext = () => {
  let page = useSelector((state) => state.search.page);
  const dispatch = useDispatch();
  useEffect(() => console.log('page : ',page));
  let payload = {
    pageTest: page + 1,
    pageMax: 10,
  };
  return (
    <button
      className="btn btn-primary"
      page={page}
      onClick={() => dispatch(setPage(payload))}
    >
      NEXT
    </button>
  );
};

//
export const BPrev = () => {
  let page = useSelector((state) => state.search.page);
  const dispatch = useDispatch();
  let pagination = {
    pageTest: page - 1,
    pageMax: 10,
  };
  return (
    <button
      className="btn btn-primary"
      page={page}
      onClick={() => dispatch(setPage(pagination))}
    >
      PREV
    </button>
  );
};
