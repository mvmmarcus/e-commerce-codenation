import React from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./header.css";
//import { useSelector } from "react-redux";
//import { productsSelectors } from "../../selectors/products";

export default function Header({ handleBagIcon, handleSearchIcon, cartProductsCounter }) {
  //const products = useSelector(productsSelectors.getProducts);

  return (
    <div className="header__container">
      <>
        <Link to="/">
          Fashionista
        </Link>
        <div className="icons__container">
          <FiSearch onClick={handleSearchIcon} size={28} color="#000" />
          <FiShoppingCart onClick={handleBagIcon} size={28} color="#000" />
          <span>({cartProductsCounter})</span>
        </div>
      </>
    </div>
  );
}
