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
      <div className="content">
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
        <div className="container">
          <h1>Catálogo</h1>
          <div className="catalog__container">
            <span className="catalog__counter" >{products.length} items</span>
            <ul className="catalog__list">
              {products.map((item) => (
                <li key={item.id} className="catalog__list__item">
                  <Link to={`products/${item.id}`}>
                    <figure className="item__poster">
                      {!item.image ? (
                        <img className="home__item__img" src={imageNull} alt="Null" />
                      ) : (
                        <img className="home__item__img" src={item.image} alt="product" />
                      )}
                      <div className="item__seal__container">
                        {item.discount_percentage && (
                          <span className="seal__value">
                            -{item.discount_percentage}
                          </span>
                        )}
                      </div>
                    </figure>
                  </Link>
                  <div className="item__info__container">
                    <strong className="item__name" >{item.name}</strong>
                    {item.regular_price !== item.actual_price ? (
                      <>
                        <span className="item__value">
                          {item.regular_price}
                        </span>
                        <span className="item__value item__value--promo">
                          {item.actual_price}
                        </span>
                      </>
                    ) : (
                      <span className="item__value item__value--promo">
                        {item.regular_price}
                      </span>
                    )}
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
