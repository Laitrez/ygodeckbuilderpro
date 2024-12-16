import React from "react";

const CardDetail = ({ card }) => {
  if (!card || card.name===undefined) return null; 

  return (
    <div className="relative block bg-base-100 shadow-xl rounded-lg h-full max-h-full">
    <div className="card-detail max-h-full flex flex-col">
      <div className="flex-grow p-4 flex items-center justify-center">
        <img
          src={`https://images.ygoprodeck.com/images/cards/${card.ygo_id}.jpg`}
          alt={card.name}
          className="w-2/3  object-cover rounded-lg"
        />
      </div>

      <div className="p-4 max-h-1/3 ">
        <h2 className="text-xl font-bold">{card.name}</h2>
        <p><strong>Description :</strong> {card.desc}</p>
        <p><strong>Type :</strong> {card.type.humanReadableType}</p>
        <p><strong>Race :</strong> {card.race.name}</p>
        <p><strong>Archétype :</strong> {card.archetype?.name || 'Aucun'}</p>
        <p><strong>Rareté :</strong> {card.md_rarity}</p>
        <p><strong>Prix :</strong> Cardmarket: {card.cardPrices[0].cardmarketPrice}€, TCGPlayer: {card.cardPrices[0].tcgplayerPrice}€</p>
        <a href={card.ygoprodeck_url} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-primary mt-2">Voir sur YGOPRODeck</button>
        </a>
      </div>
    </div>
    </div>
  );
};

export default CardDetail;

