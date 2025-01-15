import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCard, clearDeck } from "../services/ygo.deckSlice";
import { Card } from "./Card";

const Deck = ({ setSelectedCard }) => {
  const { mainDeck, extraDeck } = useSelector((state) => state.deck);
  const dispatch = useDispatch();

  const handleRemoveCard = (cardId, isExtraDeck) => {
    console.log("Removing card:", cardId, "IsExtraDeck:", isExtraDeck);
    dispatch(removeCard({ cardId, isExtraDeck }));
  };

  const handleClearDeck = () => {
    dispatch(clearDeck());
  };

  useEffect(() => {
    // console.log("Updated mainDeck:", mainDeck);
    // console.log("Updated extraDeck:", extraDeck);
  }, [mainDeck, extraDeck]);

  const groupDeck = (decklist) => {
    return Object.groupBy(decklist, (card) => card.id);
  };

  const groupedMainDeck = groupDeck(mainDeck);
  const groupedExtraDeck = groupDeck(extraDeck);

  console.log(groupedMainDeck);
  console.log(groupedExtraDeck);

  return (
    <div className="deck-container text-white p-4">
      <h2>Deck Principal ({mainDeck.length}/60)</h2>
      <div className="flex flex-grow flex-wrap width-full">
        {Object.entries(groupedMainDeck).map(([id, card], i) => {
          // console.log("la", card[0].id);
          return (
            <div className="w-24">
              <Card
                key={id + "deck"}
                card={card[0]}
                setSelectedCard={setSelectedCard}
                onContextMethod={() => handleRemoveCard(card[0].id, false)}
                remove={true}
                isExtraDeck={false}
              />
            </div>
          );
        })}
      </div>
      {/* <div className="flex flex-grow flex-wrap width-full">
        {mainDeck.map((card) => (
          <div className="w-24">
          <Card
            key={card.id + "deck"}
            card={card}
            setSelectedCard={setSelectedCard}
            onContextMethod={() => handleRemoveCard(card.id, false)}
            remove={true}
            isExtraDeck={false}
          />
          </div>
        ))}
      </div> */}
      <h2>Extra Deck ({extraDeck.length}/15)</h2>
      <div className="flex">
        {extraDeck.map((card) => (
          <div className="w-24">
            <Card
              key={card.id + "deck"}
              card={card}
              setSelectedCard={setSelectedCard}
              onContextMethod={() => handleRemoveCard(card.id, false)}
              remove={true}
              isExtraDeck={false}
            />
          </div>
        ))}
      </div>
      <button onClick={handleClearDeck}>Vider les decks</button>
    </div>
  );
};

export default Deck;
