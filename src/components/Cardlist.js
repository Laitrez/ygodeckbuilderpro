import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../services/api";
import Pagination from "./Pagination"; // Import du composant de pagination

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1); 
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { value: searchTerm, context } = useSelector((state) => state.search);

  const fetchCards = async () => {
    try {
      const fetchedCards = searchTerm
        ? await api.getBySearch(searchTerm, currentPage, 30)
        : context
        ? await api.getCard(currentPage, context)
        : await api.getCardPaginated(currentPage, 30);

      setCards(fetchedCards.cards);
      setTotalPages(fetchedCards.totalPages);
      setError(false);

      // Enregistrer la page actuelle avant de changer de page
      if (!searchTerm) {
        setPreviousPage(currentPage); 
      }
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => fetchCards(), 1000);
    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, currentPage, context]);

  useEffect(() => {
    if (!searchTerm) {
      setCurrentPage(previousPage); 
    } else {
      setCurrentPage(1); 
    }
  }, [searchTerm, previousPage]);

  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); 
    fetchCards(); 
  };

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
    <>
      <Error />
      <div className="flex flex-col h-full justify-center items-center">
        <div className="flex-grow flex flex-wrap justify-center">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
    </>
  );
};

export default Cardlist;
