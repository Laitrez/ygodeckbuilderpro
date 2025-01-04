import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCard, clearDeck } from '../services/ygo.deckSlice';
import { Card } from './Card';

const Deck = ({setSelectedCard}) => {
  const { mainDeck, extraDeck } = useSelector((state) => state.deck);
  const dispatch = useDispatch();

  const handleRemoveCard = (cardId, isExtraDeck) => {
    dispatch(removeCard({ cardId, isExtraDeck }));
  };

  const handleClearDeck = () => {
    dispatch(clearDeck());
  };

  return (
    <div className="deck-container text-white p-4">
      <h2>Deck Principal ({mainDeck.length}/60)</h2>
      <div className='flex flex-grow flex-wrap width-full'>
        {mainDeck.map((card) => (
          // <li key={card.id}>
          //   {card.name} (x{mainDeck.filter((c) => c.id === card.id).length})
          //   <button onClick={() => handleRemoveCard(card.id, false)}>Retirer</button>
          // </li>
          <Card key={card.id} card={card} setSelectedCard={setSelectedCard}/>
        ))}
      </div>  
      <h2>Extra Deck ({extraDeck.length}/15)</h2>
      <div className='flex'>
      <ul>
        {extraDeck.map((card) => (
          <li key={card.id}>
            {card.name} (x{extraDeck.filter((c) => c.id === card.id).length})
            <button onClick={() => handleRemoveCard(card.id, true)}>Retirer</button>
          </li>
        ))}
      </ul>
      </div>
      <button onClick={handleClearDeck}>Vider les decks</button>
    </div>
  );
};

export default Deck;
