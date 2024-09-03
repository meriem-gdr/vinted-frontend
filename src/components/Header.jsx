import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"; 

const Header = ({
  handleToken,
  userToken,
  priceAsc,
  setPriceAsc,
  title,
  setTitle,
  priceMax,
  setPriceMax,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="header">
      {/* Logo */}
      <Link className="logo-container" to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png"
          alt="Vinted logo"
          className="logo"
        />
      </Link>

      {/* Search Bar */}
      {isHomePage && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Recherche des articles"
            className="search-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}

      {/* Filters */}
      {isHomePage && (
        <div className="filters-container">
          <div className="sort-price">
            <label className="label">
              Trier par prix : <br />
              {priceAsc ? "Asc" : "Desc"}
            </label>
            <button
              className="sort-button"
              onClick={(prevPriceAsc) => setPriceAsc(!prevPriceAsc)}
            >
              ⇅
            </button>
          </div>
          <div className="price-range">
            <label className="label">
              Prix maximum : <br /> {priceMax}€
            </label>
            <input
              type="range"
              min={0}
              max={500}
              className="range-input"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="buttons-container">
        {!userToken ? (
          <>
            <Link to="/login">
              <button className="outline-button">Connexion</button>
            </Link>
            <Link to="/signup">
              <button className="outline-button">S'inscrire</button>
            </Link>
          </>
        ) : (
          <button
            className="filled-button"
            onClick={() => {
              handleToken();
            }}
          >
            Déconnexion
          </button>
        )}
        <Link to="/publish">
          <button className="filled-button">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
