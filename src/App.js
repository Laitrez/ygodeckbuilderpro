import Layout from "./components/Layout";
import "./App.css";
import Cardlist from "./components/Cardlist";
import VisuCard from "./components/VisuCard";
import CardLayout from "./components/CardLayout";



function App() {

const test={
  "id": 2,
  "name": "Abomination Désenchaînée",
  "ygo_id": "29479265",
  "desc": "2+ monstres (un Monstre Lien inclus)\nSi une ou plusieurs cartes sur le Terrain sont détruites par un effet de carte (\"Abomination Désenchaînée\" exclu) (sauf durant la Damage Step) : vous pouvez cibler 1 carte sur le Terrain ; détruisez-la. Lorsqu'un autre monstre est détruit au combat : vous pouvez cibler 1 carte sur le Terrain ; détruisez-la. Durant la End Phase : vous pouvez cibler 1 carte sur le Terrain ; détruisez-la. Vous ne pouvez utiliser chaque effet de \"Abomination Désenchaînée\" qu'une fois par tour.",
  "name_en": "Unchained Abomination",
  "ygoprodeck_url": "https://ygoprodeck.com/card/unchained-abomination-10406",
  "beta_id": 101010045,
  "konami_id": 14672,
  "md_rarity": "Ultra Rare",
  "type": {
      "id": 17,
      "type": "Link Monster",
      "humanReadableType": "Link Effect Monster",
      "frameType": "link"
  },
  "race": {
      "id": 23,
      "name": "Fiend"
  },
  "archetype": {
      "id": 49,
      "name": "Unchained"
  },
  "cardSets": [
      {
          "id": 38,
          "setName": "2020 Tin of Lost Memories Mega Pack",
          "setCode": "MP20-EN175",
          "setRarity": "Prismatic Secret Rare",
          "setRarity_code": "(PScR)",
          "setPrice": "4.94"
      },
      {
          "id": 66,
          "setName": "OTS Tournament Pack 22",
          "setCode": "OP22-EN006",
          "setRarity": "Super Rare",
          "setRarity_code": "(SR)",
          "setPrice": "0"
      },
      {
          "id": 73,
          "setName": "Chaos Impact",
          "setCode": "CHIM-EN045",
          "setRarity": "Ultra Rare",
          "setRarity_code": "(UR)",
          "setPrice": "0"
      }
  ],
  "formats": [
      {
          "name": "OCG"
      },
      {
          "name": "Master Duel"
      },
      {
          "name": "TCG"
      }
  ],
  "cardPrices": [
      {
          "cardmarketPrice": "0.71",
          "tcgplayerPrice": "0.51",
          "ebayPrice": "5.45",
          "amazonPrice": "3.99",
          "coolstuffincPrice": "3.99"
      }
  ]
}

  return (
    <>
      <Layout>
        {/* Ici mes routes */}
        {/* <div className=" flex h-full flex-1 relative">
          <div className=" flex-1">
            <Cardlist />
            </div>
          <div
            className="bg-green-500  w-10"
            style={{ width: "clamp(20px, 33%, 800px)" }}
          >
            <VisuCard card={test}/>

          </div>
        </div> */}
        <CardLayout/>
      </Layout>
    </>
  );
}

export default App;
