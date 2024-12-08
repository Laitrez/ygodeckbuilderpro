import { useEffect, useRef, useState } from "react";
import * as api from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  prev,
  next,
  setSearchMode,
  selectPagination,
} from "../reducer/pagination.reducer";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let searchTimeOut = useRef(null);
  const { offset, limit, searchMode } = useSelector(selectPagination);

  function fetchCard(offset, limit) {
    api
      .getAllCards(offset, limit)
      .then((cards) => setCards(cards))
      .catch(() => setError(true));
  }

  // Gestion de la recherche
  useEffect(() => {
    if (search === searchTerm) return;

    if (searchTimeOut.current) clearTimeout(searchTimeOut.current);
    searchTimeOut.current = setTimeout(() => {
      dispatch(setSearchMode(!!searchTerm));
      setSearch(searchTerm);
    }, 300);
  }, [searchTerm]);

  useEffect(() => {
    console.log(`offset`, offset);
    console.log(`limit`, limit);
    console.log(`searchMode`, searchMode);
    console.log(`search`, search);

    fetchCard(offset, limit);
  }, [search, offset]);

  // DEV ?
  // useEffect(() => {
  //   api
  //     .getAllCards(offset, limit)
  //     .then((cards) => setCards(cards))
  //     .catch(() => setError(true));
  // }, [loading]);

  // Composant pour afficher les cartes
  const Card = ({ card }) => {
    return (
      <a
        href="#"
        className="card w-32 h-fit bg-base-100 shadow-xl m-3 hover:shadow-2xl transition-shadow"
      >
        <figure>
          <img
            src={`https://images.ygoprodeck.com/images/cards_small/${card.id}.jpg`}
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
    <div className="flex flex-col  justify-center items-center">
      <h1 className="text-3xl font-bold">Liste des cartes</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex-grow flex flex-wrap justify-center">
        <Error />
        <div className="flex flex-wrap justify-center">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
      {/* /* Pagination */}
      <div className="flex items-center">
        <button
          className={`btn ${offset === 0 ? "btn-disabled" : ""}`}
          onClick={() => dispatch(prev())}
          disabled={offset === 0}
        >
          Précédent
        </button>

        <div>Page en cours</div>
        <button className="btn" onClick={() => dispatch(next())}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Cardlist;
