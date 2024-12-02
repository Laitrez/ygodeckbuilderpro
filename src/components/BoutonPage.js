import React, { useEffect } from "react";
import store from "../store";
import { useDispatch, useStore, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";



        {/* <button className="btn btn-primary">Primary</button> */}
        {/* <button className="btn btn-primary">Primary</button> */}
export const BNext = ({pageMax}) => {
  let page = useSelector((state) => state.search.page);
  const dispatch = useDispatch();
  // useEffect(() => console.log('page : ',pageMax));
  // console.log(pageMax);
  let payload = {
    pageTest: page + 1,
    pageMax: pageMax,
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
export const BPrev = ({pageMax}) => {
  let page = useSelector((state) => state.search.page);
  const dispatch = useDispatch();
  let pagination = {
    pageTest: page - 1,
    pageMax: pageMax,
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
