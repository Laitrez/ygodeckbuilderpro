import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
//   const [error, setError] = useState(false);
  // test context----------------------------------------

  async function fetchCard(searchTerme, page, context) {
    try {
      let fetchedCards;
      if (searchTerme) {
        // console.log('fetchedCards searchterm');
        fetchedCards = await api.get(searchTerme, page, context);
    } else if (context) {
        // console.log('fetchedCards context');
        page === undefined
        ? (fetchedCards = await api.getCard(1, context))
        : (fetchedCards = await api.getCard(page, context));
    } else {
        // console.log('fetchedCards las');
        page === undefined
          ? (fetchedCards = await api.getCard(1))
          : (fetchedCards = await api.getCard(page));
      }
      console.log('fetchedCards : ',fetchedCards);
      setCards(fetchedCards);
    //   setError(false);
    } catch (error) {
    //   setError(true);
    }
  }

   useEffect(() => {

    //   const unsubscribe = store.subscribe(() => {
    //     const { value, page, context } = store.getState().search;
    //     fetchCard(value, page, context);
    //   });
      fetchCard(null,1,null);
    //   return () => unsubscribe();
    }, []);
  

// const cards =[
//     {
//         "id": 53077251,
//         "name": "Adaptateur Universel",
//         "type": "Trap Card",
//         "humanReadableCardType": "Normal Trap",
//         "frameType": "trap",
//         "desc": "Ciblez 1 monstre face recto contr\u00f4l\u00e9 par votre adversaire ; jusqu'\u00e0 la fin de ce tour, l'ATK de tous les autres monstres actuellement sur le Terrain devient \u00e9gale \u00e0 l'ATK actuelle du monstre.",
//         "race": "Normal",
//         "name_en": "Universal Adapter",
//         "ygoprodeck_url": "https://ygoprodeck.com/card/universal-adapter-9374",
//         "card_sets": [
//           {
//             "set_name": "2019 Gold Sarcophagus Tin Mega Pack",
//             "set_code": "MP19-EN134",
//             "set_rarity": "Common",
//             "set_rarity_code": "(C)",
//             "set_price": "0"
//           },
//           {
//             "set_name": "Cybernetic Horizon",
//             "set_code": "CYHO-EN079",
//             "set_rarity": "Common",
//             "set_rarity_code": "(C)",
//             "set_price": "0"
//           },
//           {
//             "set_name": "Flames of Destruction Special Edition",
//             "set_code": "FLOD-ENSE4",
//             "set_rarity": "Super Rare",
//             "set_rarity_code": "(SR)",
//             "set_price": "1.9"
//           }
//         ],
//         "card_images": [
//           {
//             "id": 53077251,
//             "image_url": "https://images.ygoprodeck.com/images/cards/53077251.jpg",
//             "image_url_small": "https://images.ygoprodeck.com/images/cards_small/53077251.jpg",
//             "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/53077251.jpg"
//           }
//         ],
//         "card_prices": [
//           {
//             "cardmarket_price": "0.03",
//             "tcgplayer_price": "0.05",
//             "ebay_price": "1.24",
//             "amazon_price": "0.25",
//             "coolstuffinc_price": "0.25"
//           }
//         ],
//         "misc_info": [
//           {
//             "views": 10640,
//             "viewsweek": 308,
//             "upvotes": 1,
//             "downvotes": 0,
//             "formats": ["Common Charity", "TCG", "OCG", "Master Duel"],
//             "tcg_date": "2018-06-07",
//             "ocg_date": "2018-04-14",
//             "konami_id": 13795,
//             "has_effect": 1,
//             "md_rarity": "Super Rare"
//           }
//         ]
//       }
// ]

// const cards = async()=>{return await api.getCard(1)};
// console.log('cards : ', cards);







  const Card = ({ card }) => {
    return (
      <a
        href={Link || "#"}
        className="card w-80 bg-base-100 shadow-xl m-5 block hover:shadow-2xl transition-shadow"
      >
        <figure>
          <img
            // src={card.card_images?.[0]?.image_url}
            src={`https://images.ygoprodeck.com/images/cards/${card.ygo_id}.jpg`}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{card.name}</h2>

          <p>{card.desc}</p>
        </div>
      </a>
    );
  };


//   const Error = () => {
//     if (error) return <p>Il y a une erreur</p>;
//   };


  return (
    <>
      {/* <Error /> */}
      <div className="d-flex flex-wrap justify-content-center ">
        {
        cards?
        //  cards.map((card) => (
          <Card key={cards.id} card={cards}/>
        // ))
        :
        <p>hello word</p>
    }
      </div>
    </>
  );

};

export default Cardlist;
