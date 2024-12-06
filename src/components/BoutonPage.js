import React, { useEffect } from "react";
import store from "../store";
import { useDispatch, useStore, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";



        {/* <button className="btn btn-primary">Primary</button> */}
        {/* <button className="btn btn-primary">Primary</button> */}
// export const BNext = ({pageMax}) => {
//   let page = useSelector((state) => state.search.page);
//   const dispatch = useDispatch();
//   // useEffect(() => console.log('page : ',pageMax));
//   // console.log(pageMax);
//   let payload = {
//     pageTest: page + 1,
//     pageMax: pageMax,
//   };
//   return (
//     <button
//       className="btn btn-primary"
//       page={page}
//       onClick={() => dispatch(setPage(payload))}
//     >
//       NEXT
//     </button>
//   );
// };

// //
// export const BPrev = ({pageMax}) => {
//   let page = useSelector((state) => state.search.page);
//   const dispatch = useDispatch();
//   let pagination = {
//     pageTest: page - 1,
//     pageMax: pageMax,
//   };
//   return (
//     <button
//       className="btn btn-primary"
//       page={page}
//       onClick={() => dispatch(setPage(pagination))}
//     >
//       PREV
//     </button>
//   );
// };

export const BNext = ({ pageMax }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.search);

  const handleNext = () => {
    if (page < pageMax) {
      console.log("Next page: ", page + 1); // Debug log
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

export const BPrev = ({ pageMax }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.search);

  const handlePrev = () => {
    if (page > 1) {
      console.log("Prev page: ", page - 1); // Debug log
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
