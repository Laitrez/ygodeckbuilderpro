import React from "react";
import SearchBox from "./SearchBarre";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center mx-3">
          <p>LOGO</p>
        </div>
          <SearchBox/>          
        <ul className="flex space-x-4 mx-3">
          <li>
          </li>
          <li>
            {/* <Link to="/">Accueil</Link> */}
            <p>Rubrique</p>
          </li>
          <li>
            {/* <Link to="/about">À propos</Link> */}
            <p>About</p>
          </li>
          <li>
            {/* <Link to="/contact">Contact</Link> */}
            <p>Contact</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
