import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./home.css";
import { Link } from "react-router-dom";
import CartModal from "../../components/CartModal";
import SearchProduct from "../../components/SearchProduct";
import { fetchProducts } from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { cartProductsSelectors } from "../../selectors/cartProducts";

import imageNull from "../../assets/indisponivel.jpg";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const showCartModal = () => setShowCart(true);
  const hideCartModal = () => setShowCart(false);

  const showSearchModal = () => setShowSearch(true);
  const hideSearchModal = () => setShowSearch(false);

  const dispatch = useDispatch();
  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);
  const products = useSelector(productsSelectors.getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <Header
          cartProductsCounter={cartProducts.length}
          handleBagIcon={showCartModal}
          handleSearchIcon={showSearchModal}
        />
        {showCart && (
          <CartModal
            cartProducts={cartProducts}
            handleShow={showCartModal}
            handleClose={hideCartModal}
          />
        )}
        {showSearch && (
          <SearchProduct
            handleShow={showSearchModal}
            handleClose={hideSearchModal}
          />
        )}
        <div className="catalog">
          <h1 className="catalog__title">Catálogo</h1>
          <span className="catalog__counter">{products.length} items</span>
          <ul className="catalog__list">
            {products.map((item) => (
              <li key={item.id} className="catalog__item">
                <Link to={`products/${item.id}`}>
                  <figure className="catalog__poster">
                    {!item.image ? (
                      <img
                        className="catalog__img--null"
                        src={imageNull}
                        alt="Null"
                      />
                    ) : (
                      <img
                        className="catalog__img"
                        src={item.image}
                        alt="product"
                      />
                    )}
                    <div className="catalog__seal">
                      {item.discount_percentage && (
                        <span>-{item.discount_percentage}</span>
                      )}
                    </div>
                  </figure>
                </Link>
                <div className="catalog__description">
                  <strong className="catalog__name">{item.name}</strong>
                  <div className="catalog__pricing">
                    {item.regular_price !== item.actual_price ? (
                      <>
                        <span className="catalog__price">
                          {item.regular_price}
                        </span>
                        <span className="catalog__price catalog__price--promo">
                          {item.actual_price}
                        </span>
                      </>
                    ) : (
                      <span className="catalog__price catalog__price--promo">
                        {item.regular_price}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
}
