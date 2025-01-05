import { useDispatch } from "react-redux";
import { addCard,removeCard  } from "../services/ygo.deckSlice";

export const Card = ({ card,setSelectedCard,onContextMethod }) => {
    const dispatch = useDispatch();
    const extraDeckList=['Link Monster','Fusion Monster','XYZ Monster','Synchro Tuner Monster'];
    
    const handleContextMenu = (event) => {    
      



      event.preventDefault(); // Empêche le menu contextuel par défaut
      onContextMethod();
  
      // // Ajout de la carte au deck
      // remove2 ? 
      // remove2()
      // // dispatch(removeCard({cardId:card.id,isExtraDeck}))
      // :
      // dispatch(addCard({ card, isExtraDeck: extraDeckList.includes(card.type.type) }));
      // // console.log('extraDeck : ',extraDeckList.includes(card.type.type));
      // // console.log('type : ',card);
    };
    
    return (
    <div
      className="card w-32 h-fit bg-base-100 shadow-xl m-3 hover:shadow-2xl transition-shadow"
      onClick={(e)=>{
        e.preventDefault();
        // console.log(card);
        setSelectedCard(card);
      }
    }
    onContextMenu={handleContextMenu}
    
    >
      <figure>
        <img
          src={`https://images.ygoprodeck.com/images/cards_small/${card.ygo_id}.jpg`}
          alt={card.name}
          className="w-full h-full object-cover"
        />
      </figure>
    </div>
  );
};