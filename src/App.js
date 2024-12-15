import Layout from "./components/Layout";
import "./App.css";
import Cardlist from "./components/Cardlist";

function App() {
  return (
    <>
      <Layout>
        {/* Ici mes routes */}
        <div className=" flex h-full flex-1 relative">
          <div className=" flex-1">
            <Cardlist />
            </div>
          <div
            className="bg-green-500  w-10"
            style={{ width: "clamp(20px, 33%, 800px)" }}
          >
            

          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
