import React, { useState } from 'react';
import CardList from './Cardlist';  
import VisuCard from './VisuCard';  

const CardLayout = () => {
  const [selectedCard, setSelectedCard] = useState(null); // Hook useState pour gérer la carte sélectionnée

  return (
    <div className="flex h-full flex-1 relative">
      <div className="flex-1">
        <CardList setSelectedCard={setSelectedCard} />  
      </div>
      <div className="bg-grey-500 w-10" style={{ width: "clamp(20px, 33%, 800px)" }}>
        <VisuCard card={selectedCard} />  
      </div>
    </div>
  );
};

export default CardLayout;
