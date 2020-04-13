import React from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./header.css";

export default function Header({ onClick }) {
  return (
    <div className="header-container">
      <>
        <Link to="/">
          <h1>Fashionista</h1>
        </Link>
        <div className="icons-container" >
          <FiSearch size={28} color="#000" />
          <FiShoppingCart
            className="bag-icon"
            onClick={onClick}
            size={28}
            color="#000"
          />
        </div>
      </>
    </div>
  );
}
