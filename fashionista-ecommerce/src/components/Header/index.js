import React from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./header.css";
//import { useSelector } from "react-redux";
//import { productsSelectors } from "../../selectors/products";

export default function Header({
  handleBagIcon,
  handleSearchIcon,
  cartProductsCounter,
}) {
  //const products = useSelector(productsSelectors.getProducts);

  return (
    <div className="header">
      <>
        <Link className="link link--home" to="/">
          Fashionista
        </Link>
        <div className="header__icons">
          <FiSearch className="icon icon--search" onClick={handleSearchIcon} />
          <FiShoppingCart className="icon icon--cart" onClick={handleBagIcon} />
          <span onClick={handleBagIcon} className="header__cart-counter">{cartProductsCounter}</span>
        </div>
      </>
    </div>
  );
}
