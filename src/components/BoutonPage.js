import React, { useEffect } from "react";
import store from "../store";
import { useDispatch, useStore, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";


export const BNext = ({ pageMax, onClick }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.search);

  const handleNext = () => {
    if (page < pageMax) {
      onClick(); // Signalement du clic manuel
      dispatch(setPage({ pageTest: page + 1, pageMax }));
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleNext}
      disabled={page >= pageMax}
    >
      Next
    </button>
  );
};

export const BPrev = ({ pageMax, onClick }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.search);

  const handlePrev = () => {
    if (page > 1) {
      onClick(); // Signalement du clic manuel
      dispatch(setPage({ pageTest: page - 1, pageMax }));
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handlePrev}
      disabled={page <= 1}
    >
      Prev
    </button>
  );
};
