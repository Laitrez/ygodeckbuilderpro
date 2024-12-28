import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCard, clearDeck } from '../services/ygo.deckSlice';

const Deck = () => {
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
      <ul>
        {mainDeck.map((card) => (
          <li key={card.id}>
            {card.name} (x{mainDeck.filter((c) => c.id === card.id).length})
            <button onClick={() => handleRemoveCard(card.id, false)}>Retirer</button>
          </li>
        ))}
      </ul>

      <h2>Extra Deck ({extraDeck.length}/15)</h2>
      <ul>
        {extraDeck.map((card) => (
          <li key={card.id}>
            {card.name} (x{extraDeck.filter((c) => c.id === card.id).length})
            <button onClick={() => handleRemoveCard(card.id, true)}>Retirer</button>
          </li>
        ))}
      </ul>

      <button onClick={handleClearDeck}>Vider les decks</button>
    </div>
  );
};

export default Deck;
