import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <p>LOGO</p>
        </div>
        <ul className="flex space-x-4">
          <li>
            {/* <Link to="/">Accueil</Link> */}
            <p>rubrique</p>
          </li>
          <li>
            {/* <Link to="/about">À propos</Link> */}
            <p>a propos</p>
          </li>
          <li>
            {/* <Link to="/contact">Contact</Link> */}
            <p>contact</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
