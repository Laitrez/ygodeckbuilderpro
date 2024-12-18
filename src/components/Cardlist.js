import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../services/api";
import Pagination from "./Pagination"; // Import du composant de pagination

const Cardlist = ({setSelectedCard}) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchTerm, setSearchTerme] = useState("");
  const { value: searchImput, context } = useSelector((state) => state.search);

  const fetchCards = async () => {
    try {
      const fetchedCards = searchTerm
        ? await api.getBySearch(searchTerm, currentPage, 50)
        : context
        ? await api.getCard(currentPage, context)
        : await api.getCardPaginated(currentPage, 50);

      setCards(fetchedCards.cards);
      // console.log(fetchedCards.cards);
      setTotalPages(fetchedCards.totalPages);
      setError(false);

      // Enregistrer la page actuelle avant de changer de page
      if (!searchTerm) {
        console.log('set previous page : ',currentPage)
        setPreviousPage(currentPage);

        // console.log('absence de searTerm : ',previousPage);
      }
    } catch {
      setError(true);
    }
  };

  useEffect(() => {

    // if (debounceTimeout) clearTimeout(debounceTimeout);
    // const timeout = setTimeout(() => fetchCards(), 1000);
    // setDebounceTimeout(timeout);
    fetchCards();
  }, [searchTerm, currentPage, context]);
  
  useEffect(() => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
   
        setDebounceTimeout(setTimeout(() => {
          setSearchTerme(searchImput);
          if (searchImput) {
            console.log("Search : 1");
            setCurrentPage(1); 
          } else {
            console.log("No search input: ", previousPage);
            setCurrentPage(previousPage);
          }
        }, 1000));

        return () => clearTimeout(debounceTimeout);
        // return () => clearTimeout(timeout);
      }, [searchImput]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Composant pour afficher une carte
  const Card = ({ card }) => (
    <a
      href="#"
      className="card w-32 h-fit bg-base-100 shadow-xl m-3 hover:shadow-2xl transition-shadow"
      onClick={(e)=>{
        e.preventDefault();
        // console.log(card);
        setSelectedCard(card);
      }}
    
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
      <div className="flex flex-col h-full justify-between items-center">
        <div className="flex-gro flex flex-wrap justify-center">
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
