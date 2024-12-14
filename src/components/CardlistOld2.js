import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";
import * as api from "../services/api";
import { BNext, BPrev } from "./BoutonPage";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const updatePrevTotal = (newTotal) => {
    setPrevTotal((prev) => (newTotal > prev ? newTotal : prev));
  };
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const dispatch = useDispatch();
  const { value: searchTerm, page, context } = useSelector(
    (state) => state.search
  );

  const [manualChange, setManualChange] = useState(false);
  const [lastNonSearchPage, setLastNonSearchPage] = useState(1);
  const [lastSearch, setLastSearch] = useState("");

  // Fonction pour récupérer les cartes
  const fetchCards = async () => {
    try {
      const fetchedCards = searchTerm
        ? await api.getBySearch(searchTerm, page, 30)
        : context
        ? await api.getCard(page || 1, context)
        : await api.getCardPaginated(page || 1, 30);
      console.log('je met a jour Prevtotal: ',prevTotal);
      updatePrevTotal(fetchedCards.totalPages);

      setCards(fetchedCards.cards);
      setTotal(fetchedCards.totalPages);
      setError(false);
    } catch {
      setError(true);
    }
  };

  // Gestion des changements de recherche ou de page
  useEffect(() => {
    const resetPageIfNeeded = () => {
      if (searchTerm && page !== 1 && searchTerm !== lastSearch) {
        console.log('je passe ici');
        dispatch(setPage({ pageTest: 1, pageMax: total }));
      } else if (!searchTerm && lastSearch && page !== lastNonSearchPage) {
        console.log('jenvoie : ',lastNonSearchPage,' et : ',prevTotal);
        dispatch(setPage({ pageTest: lastNonSearchPage, pageMax: prevTotal }));
      } else if (!searchTerm) {
        setLastNonSearchPage(page);
      }
      setLastSearch(searchTerm);
    };

    resetPageIfNeeded();

    // Gestion du debounce pour l'appel à l'API
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => fetchCards(), 1000);
    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, page, context, dispatch, total]);

  // Réinitialisation du flag manuel après une recherche
  useEffect(() => {
    if (!searchTerm && manualChange) {
      setManualChange(false);
    }
  }, [searchTerm, manualChange]);

  // Gestion des clics manuels
  const handleManualChange = () => setManualChange(true);

  // Composant pour afficher une carte
  const Card = ({ card }) => (
    <a
      href="#"
      className="card w-32 h-fit bg-base-100 shadow-xl m-3 hover:shadow-2xl transition-shadow"
    >
      <figure>
        <img
          src={`https://images.ygoprodeck.com/images/cards_small/${card.ygo_id}.jpg`}
          alt={card.name}
          className="w-full h-full object-cover"
        />
      </figure>
    </a>
  );

  // Composant pour gérer les erreurs
  const Error = () => error && <p>Il y a une erreur</p>;

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex-grow flex flex-wrap justify-center">
        <Error />
        <div className="flex flex-wrap justify-center">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>

      <div className="flex justify-between p-4 w-56">
        <BPrev pageMax={total} onClick={handleManualChange} />
        <BNext pageMax={total} onClick={handleManualChange} />
      </div>
    </div>
  );
};

export default Cardlist;


// return (
//   <>
//     <Error />
//     <div className="flex flex-col h-full justify-center items-center">
//       <div className="flex-grow flex flex-wrap justify-center">
//         <div className="flex flex-wrap justify-center">
//           {cards.map((card) => (
//             <Card key={card.id} card={card} />
//           ))}
//         </div>
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   </>
// );
// };