import Layout from "./components/Layout";
import "./App.css";
import Cardlist from "./components/Cardlist";

function App() {
  return (
    <>
      <Layout>
        {/* Ici mes routes */}
        <Cardlist/>
      </Layout>
    </>
  );
}

export default App;
