import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  // test context----------------------------------------

  async function fetchCard(searchTerme, page, context) {
    try {
      let fetchedCards;
      if (searchTerme) {
        fetchedCards = await api.get(searchTerme, page, context);
      } else if (context) {
        page === undefined
          ? (fetchedCards = await api.getCard(1, context))
          : (fetchedCards = await api.getCard(page, context));
      } else {
        page === undefined
          ? (fetchedCards = await api.getCardCont())
          : (fetchedCards = await api.getCard(page));
      }
      console.log("fetchedCards : ", fetchedCards);
      setCards(fetchedCards);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    //   const unsubscribe = store.subscribe(() => {
    //     const { value, page, context } = store.getState().search;
    //     fetchCard(value, page, context);
    //   });
    fetchCard();
    //   return () => unsubscribe();
  }, []);

  const Card = ({ card }) => {
    return (
      <a
        href={Link || "#"}
        className="card w-32 h-fit bg-base-100 shadow-xl m-3  hover:shadow-2xl transition-shadow "
      >
        <figure>
          <img
            src={`https://images.ygoprodeck.com/images/cards/${card.ygo_id}.jpg`}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* <div className="card-body">
          <h2 className="card-title">{card.name}</h2>

          <p>{card.desc}</p>
        </div> */}
      </a>
    );
  };

  const Error = () => {
    if (error) return <p>Il y a une erreur</p>;
  };

  return (
    // <div className="flex flex-col h-full">
    // <div className="flex flex-wrap flex-grow justify-center">
    //   <Error />
    //   <div className="flex d-flex  flex-wrap justify-center ">
    //     {cards.map((card) => (
    //       <Card key={card.id} card={card} />
    //     ))}
    //   </div>
    // </div>
    //   <div className="flex w-56 justify-between">
    //     <button className="btn btn-primary">Primary</button>
    //     <button className="btn btn-primary">Primary</button>
    //   </div>
    // </div>

    
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex-grow flex flex-wrap justify-center">
        <Error />
        <div className="flex flex-wrap justify-center ">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>

      <div className="flex justify-between p-4 w-56 ">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-primary">Primary</button>
      </div>
    </div>
  );
};

export default Cardlist;
