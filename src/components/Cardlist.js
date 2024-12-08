import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../services/ygo.reducer";
import * as api from "../services/api";
import { BNext, BPrev } from "./BoutonPage";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const {
    value: searchTerm,
    page,
    context,
  } = useSelector((state) => state.search);

  // Flag pour détecter la pagination manuelle
  const [manualChange, setManualChange] = useState(false);
  // Dernière page avant la recherche
  const [lastNonSearchPage, setLastNonSearchPage] = useState(1);

  // Fonction pour récupérer les cartes depuis l'API
  async function fetchCard(searchTerm, page, context) {
    try {
      let fetchedCards;
      if (searchTerm) {
        fetchedCards = await api.getBySearch(searchTerm, page, 30);
      } else if (context) {
        fetchedCards = await api.getCard(page || 1, context);
      } else {
        fetchedCards = await api.getCardPaginated(page || 1, 30);
      }
      setCards(fetchedCards.cards);
      setTotal(fetchedCards.totalPages);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }

  // Premier useEffect pour gérer la recherche et la page courante
  useEffect(() => {
    if (searchTerm) {
      // Si un terme de recherche est défini, on revient à la page 1
      if (page !== 1) {
        dispatch(setPage({ pageTest: 1, pageMax: total }));
      }
    } else {
      // Sauvegarder la page courante avant une recherche
      setLastNonSearchPage(page);
    }
    fetchCard(searchTerm, page, context);
  }, [searchTerm, page, context, dispatch, total]);

  // Deuxième useEffect pour restaurer la page précédente lorsque la recherche est annulée
  useEffect(() => {
    if (!searchTerm && !manualChange && page !== lastNonSearchPage) {
      console.log("Restoring page to last non-search page:", lastNonSearchPage);
      dispatch(setPage({ pageTest: lastNonSearchPage, pageMax: total }));
    }
  }, [searchTerm, lastNonSearchPage, page, dispatch, total, manualChange]);

  useEffect(() => {
    if (!searchTerm && manualChange) {
      setManualChange(false); // On repasse à un contexte non manuel
      console.log("manualChange reset to false");
    }
  }, [searchTerm, manualChange]);

  //NOTE: Ne sert à rien du tout
  // Fonction pour signaler un clic manuel
  const handleManualChange = () => setManualChange(true);

  // Composant pour afficher les cartes
  const Card = ({ card }) => {
    return (
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
  };

  // Gestion des erreurs
  const Error = () => {
    if (error) return <p>Il y a une erreur</p>;
  };

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
