import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./home.css";
import vestido from "../../assets/vestido.jpg";
import { Link } from "react-router-dom";
import CartModal from "../../components/CartModal";
import SearchProduct from "../../components/SearchProduct";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const showCartModal = () => setShowCart(true);
  const hideCartModal = () => setShowCart(false);

  const showSearchModal = () => setShowSearch(true);
  const hideSearchModal = () => setShowSearch(false);

  const products = [
    {
      id: 1,
      name: "Vestido Dourado",
      value: 120.0,
      promoValue: 100.0,
      promoSealValue: "-12%",
      imgUrl: vestido,
    },
    {
      id: 2,
      name: "Vestido Prata",
      value: 120.0,
      promoValue: 100.0,
      promoSealValue: "-12%",
      imgUrl: vestido,
    },
    {
      id: 3,
      name: "Vestido Rosa",
      value: 120.0,
      promoValue: 100.0,
      promoSealValue: "-12%",
      imgUrl: vestido,
    },
    {
      id: 4,
      name: "Vestido Azul",
      value: 120.0,
      promoValue: 100.0,
      promoSealValue: "-12%",
      imgUrl: vestido,
    },
    {
      id: 5,
      name: "Vestido Cinza",
      value: 120.0,
      promoValue: 100.0,
      promoSealValue: "-12%",
      imgUrl: vestido,
    },
  ];

  console.log(products);

  return (
    <>
      <div className="conteudo">
        <Header handleBagIcon={showCartModal} handleSearchIcon={showSearchModal} />
        {showCart && (
          <CartModal handleShow={showCartModal} handleClose={hideCartModal} />
        )}
        {showSearch && (
          <SearchProduct handleShow={showSearchModal} handleClose={hideSearchModal} />
        )}
        <div className="container">
          <h1>Catálogo</h1>
          <div className="catalog-container">
            <span>22 items</span>
            <ul className="catalog-list">
              {products.map((item) => (
                <li key={item.id} className="catalog-list-item">
                  <Link to={`product/${item.id}`}>
                    <figure className="product-poster">
                      <img src={item.imgUrl} alt="Vestido" />
                      <div className="product-promo-seal">
                        <span className="product-promo-seal-value">
                          {item.promoSealValue}
                        </span>
                      </div>
                    </figure>
                  </Link>
                  <div className="product-poster-info">
                    <strong>{item.name}</strong>
                    <span className="product-value">{item.value}</span>
                    <span className="product-promo-value">
                      {item.promoValue}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
