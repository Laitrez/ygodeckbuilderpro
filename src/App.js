import Layout from "./components/Layout";
import "./App.css";
import Cardlist from "./components/Cardlist";
import VisuCard from "./components/VisuCard";
import CardLayout from "./components/CardLayout";
import { useState } from "react";



function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <>
      <Layout selectedCard={selectedCard} setSelectedCard={setSelectedCard}>
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
        <CardLayout selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
      </Layout>
    </>
  );
}

export default App;
