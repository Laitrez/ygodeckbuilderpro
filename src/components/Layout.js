import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <div className="flex-1 flex ">
        <div
          className="menu  bg-black flex flex-col"
          style={{ width: "clamp(20px, 33%, 800px)" }}
        >
          <div className="flex-1 flex flex-col space-y-2 p-4">
            <p className="text-white">hello</p>
            <p className="text-white">WORLD</p>
            <p className="text-white">AIE AIE</p>
          </div>
        </div>

        <main className="block flex-1 ">{children}</main>
        {/* <div
          className="bg-black flex flex-col"
          style={{ width: "clamp(20px, 33%, 800px)" }}
        ></div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
