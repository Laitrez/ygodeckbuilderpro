// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPage } from "../services/ygo.reducer";
// import * as api from "../services/api";
// import { BNext, BPrev } from "./BoutonPage";

// const Cardlist = () => {
//   const [cards, setCards] = useState([]);
//   const [error, setError] = useState(false);
//   const [total, setTotal] = useState(0);
//   const [debounceTimeout, setDebounceTimeout] = useState(null);

//   const dispatch = useDispatch();
//   const { value: searchTerm, page, context } = useSelector(
//     (state) => state.search
//   );

//   // Flag pour détecter la pagination manuelle
//   const [manualChange, setManualChange] = useState(false);
//   // Dernière page avant la recherche
//   const [lastNonSearchPage, setLastNonSearchPage] = useState(1);
//   const [lastSearch, setLastSearch] = useState("");


//   // Fonction pour récupérer les cartes depuis l'API
//   async function fetchCard(searchTerm, page, context) {
//     try {
//       let fetchedCards;
//       if (searchTerm) {
//         fetchedCards = await api.getBySearch(searchTerm, page, 30);
//       } else if (context) {
//         fetchedCards = await api.getCard(page || 1, context);
//       } else {
//         fetchedCards = await api.getCardPaginated(page || 1, 30);
//       }
//       setCards(fetchedCards.cards);
//       setTotal(fetchedCards.totalPages);
//       setError(false);
//     } catch (error) {
//       setError(true);
//     }
//   }

//   // Premier useEffect pour gérer la recherche et la page courante
//   useEffect(() => {
//     if (searchTerm) {
//       // Si un terme de recherche est défini, on revient à la page 1
//       if (page !== 1 && (searchTerm!==lastSearch)) {
//         dispatch(setPage({ pageTest: 1, pageMax: total }));
//         console.log(searchTerm);
//       }
//     } else {
//       if (lastSearch) {
//         // Passer à la dernière page non-recherche si on revient d'une recherche
//         if (page !== lastNonSearchPage) {
//           dispatch(setPage({ pageTest: lastNonSearchPage, pageMax: total }));
//           console.log("Restoring to last non-search page:", lastNonSearchPage);
//         }
//       } else {
//         // Pas de recherche, navigation normale (ne rien forcer)
//         setLastNonSearchPage(page);
//       }
//     }
//     setLastSearch(searchTerm);
//      // Gestion du debounce sur le searchTerm
//      if (debounceTimeout) clearTimeout(debounceTimeout);

//      const newTimeout = setTimeout(() => {
//        fetchCard(searchTerm, page, context);
//      }, 1000);
 
//      setDebounceTimeout(newTimeout);
     
//      return () => clearTimeout(newTimeout); // Nettoyage
//   }, [searchTerm, page, context, dispatch, total]);

//   // Deuxième useEffect pour restaurer la page précédente lorsque la recherche est annulée
//   useEffect(() => {
//     if (!searchTerm && !manualChange && page !== lastNonSearchPage) {
//       console.log("Restoring page to last non-search page:", lastNonSearchPage);
//       dispatch(setPage({ pageTest: lastNonSearchPage, pageMax: total }));
//     }
//   }, [searchTerm, lastNonSearchPage, page, dispatch, total, manualChange]);

//   useEffect(() => {
//   if (!searchTerm && manualChange) {
//     setManualChange(false); // On repasse à un contexte non manuel
//     console.log("manualChange reset to false");
//   }
// }, [searchTerm, manualChange]);

//   // Fonction pour signaler un clic manuel
//   const handleManualChange = () => setManualChange(true);

//   // Composant pour afficher les cartes
//   const Card = ({ card }) => {
//     return (
//       <a
//         href="#"
//         className="card w-32 h-fit bg-base-100 shadow-xl m-3 hover:shadow-2xl transition-shadow"
//       >
//         <figure>
//           <img
//             src={`https://images.ygoprodeck.com/images/cards_small/${card.ygo_id}.jpg`}
//             alt={card.name}
//             className="w-full h-full object-cover"
//           />
//         </figure>
//       </a>
//     );
//   };

//   // Gestion des erreurs
//   const Error = () => {
//     if (error) return <p>Il y a une erreur</p>;
//   };

//   return (
//     <div className="flex flex-col h-full justify-center items-center">
//       <div className="flex-grow flex flex-wrap justify-center">
//         <Error />
//         <div className="flex flex-wrap justify-center">
//           {cards.map((card) => (
//             <Card key={card.id} card={card} />
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between p-4 w-56">
//         <BPrev pageMax={total} onClick={handleManualChange} />
//         <BNext pageMax={total} onClick={handleManualChange} />
//       </div>
//     </div>
//   );
// };

// export default Cardlist;
///////////////////////////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";
import * as api from "../services/api";
import { BNext, BPrev } from "./BoutonPage";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
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
        dispatch(setPage({ pageTest: 1, pageMax: total }));
      } else if (!searchTerm && lastSearch && page !== lastNonSearchPage) {
        dispatch(setPage({ pageTest: lastNonSearchPage, pageMax: total }));
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


