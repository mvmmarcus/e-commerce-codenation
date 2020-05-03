<div
      className="modal-wrapper"
      style={{
        transform: handleShow ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: handleShow ? "1" : "0",
      }}
    >

    </div>



{showCart && (
    <div className="back-drop">
      <CartModal
        cartProducts={cartProducts}
        handleShow={showCart}
        handleClose={() => setShowCart(false)}
      />
    </div>
  )}

  .cart-modal {
    width: 100%;
    max-width: 300px;
    min-height: 100%;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background: #fff;
    color: #41414d;
    padding: 40px 0 40px;
    top: 0;
    right: 0;
  
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    transition: all 0.8s;
  }

  
.modal {
  width: 100%;
  height: 100%;
  background-color: rgba(48, 49, 48, 0.42);
  position: fixed;
  display: flex;
  justify-content: flex-end;
  transition: all 1.3s;
}


/**
 * Header.js
 * 
 * import React, { useEffect } from "react";
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
  return (
    <div className="header">
      <>
        <Link className="link link--home" to="/">
          Fashionista
        </Link>
        <div className="header__icons">
          <FiSearch className="icon icon--search" onClick={handleSearchIcon} />
          <FiShoppingCart
            className="icon icon--cart"
            onClick={handleBagIcon}
          />
          <span onClick={handleBagIcon} className="header__cart-counter">
            {cartProductsCounter}
          </span>
        </div>
      </>
    </div>
  );
}

 * 
 * 
 * 
 * CartModal.js
 * 
 * 
 * import React from "react";

import "./cartModal.css";
import imageNull from "../../assets/indisponivel.jpg";
import { FiX, FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../actions/cartProducts";
import { Link } from "react-router-dom";
import { cartProductsSelectors } from "../../selectors/cartProducts";

export default function CartModal({
  id = "modal",
  cartProducts,
  showCart,
  handleClose,
}) {
  const dispatch = useDispatch();
  const total = useSelector(cartProductsSelectors.total);
  const isEmpty = useSelector(cartProductsSelectors.cartProductsIsEmpty);
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) handleClose();
  };

  const handleIncrementCount = (cartId) => {
    dispatch(actions.incrementCount(cartId));
  };

  const handleDecrementCount = (cartId) => {
    dispatch(actions.decrementCount(cartId));
  };

  return (
    <div className="testee">
      <div
        className="cart-modal"
        style={{
          transform: showCart ? "translateX(0px)" : "translateX(300px)",
          opacity: showCart ? "1" : "0",
        }}
        id="cart"
      >
        <div className="cart-modal__title">
          <FiX
            className="cart-modal__close-icon"
            onClick={handleClose}
          />
          Carrinho ({cartCounter})
        </div>

        {isEmpty && (
          <span className="cart-modal__is-empty">O carrinho está vazio!</span>
        )}
        {cartProducts.map((item) => {
          return (
            <div key={item.cartId} className="cart-product">
              <figure className="cart-product__poster">
                {!item.product.image ? (
                  <Link
                    onClick={handleClose}
                    to={`/products/${item.product.id}`}
                  >
                    <img
                      className="cart-product__img cart-product__img--null"
                      src={imageNull}
                      alt="Null"
                    />
                  </Link>
                ) : (
                  <Link
                    onClick={handleClose}
                    to={`/products/${item.product.id}`}
                  >
                    <img
                      className="cart-product__img"
                      src={item.product.image}
                      alt="imgModal"
                    />
                  </Link>
                )}
                <button
                  onClick={() =>
                    dispatch(actions.removeItemFromCart(item.cartId))
                  }
                  className="btn btn--remove"
                >
                  Remover
                </button>
              </figure>

              <section className="cart-product__description">
                <span className="cart-product__name">{item.product.name}</span>
                <span className="cart-product__selected-size">
                  Tam: {item.selectedSize}
                </span>
                <div className="cart-product__qty">
                  <FiMinusCircle
                    className="icon icon--more"
                    onClick={() => handleDecrementCount(item.cartId)}
                  />
                  <span className="cart-product__counter">{item.qty}</span>
                  <FiPlusCircle
                    className="icon icon--less"
                    onClick={() => handleIncrementCount(item.cartId)}
                  />
                </div>
                {item.product.regular_price !== item.product.actual_price ? (
                  <>
                    <span className="cart-product__price">
                      {item.product.regular_price}
                    </span>
                    <span className="cart-product__price cart-product__price--promo">
                      {item.product.actual_price}
                    </span>
                  </>
                ) : (
                  <span className="cart-product__price cart-product__price--promo">
                    {item.product.actual_price}
                  </span>
                )}
              </section>
            </div>
          );
        })}
        <div className="cart-modal__subtotal">
          <span className="cart-modal__subtotal-price">
            Subtotal: R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}




Product.js


import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import "./product.css";
import { FiArrowLeft, FiX } from "react-icons/fi";

import { Link } from "react-router-dom";
import ImgModal from "../../components/ImgModal";
import SearchProduct from "../../components/SearchProduct";
import CartModal from "../../components/CartModal";
import { useSelector, useDispatch } from "react-redux";
import { cartProductsSelectors } from "../../selectors/cartProducts";
import { addItemToCart } from "../../actions/cartProducts";
import { productsSelectors } from "../../selectors/products";
import { fetchProducts, onSelectSize } from "../../actions/products";
import imageNull from "../../assets/indisponivel.jpg";

export default function Product(props) {
  const [showImg, setShowImg] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAddCartAlert, setShowAddCartAlert] = useState(false);
  const [showNoSizeSelectedAlert, setShowNoSizeSelectedAlert] = useState(false);

  let [id, setId] = useState(Number);

  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);
  const products = useSelector(productsSelectors.getProducts);
  let selectedSize = useSelector(productsSelectors.getSelectedSize);
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(onSelectSize(""));
    setId(parseInt(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleAddProductToCart = (product, size) => {
    if (size === "") {
      return setShowNoSizeSelectedAlert(true);
    }
    dispatch(addItemToCart(product, size));
    setShowAddCartAlert(true);
  };

  const handleSelectSize = (size) => {
    setShowAddCartAlert(false);
    setShowNoSizeSelectedAlert(false);
    dispatch(onSelectSize(size));
    let sizes = document.querySelectorAll(".btn-sizes");
    for (let value of sizes) {
      if (value.classList.contains("btn-sizes--selected"))
        value.classList.remove("btn-sizes--selected");
      if (value.innerHTML === size) value.classList.add("btn-sizes--selected");
    }
  };

  const handleClose = () => setShowCart(false);
  const handleOpen = () => setShowCart(true);

  return (
    <>
      <div className="container">
        <Header
          cartProductsCounter={cartCounter}
          handleBagIcon={handleOpen}
          handleSearchIcon={() => setShowSearch(true)}
        />
          {showCart && <div onClick={handleClose} className="modal"></div>}
          <CartModal
            cartProducts={cartProducts}
            showCart={showCart}
            handleClose={handleClose}
          />
        {showSearch && (
          <SearchProduct
            handleShow={() => setShowSearch(true)}
            handleClose={() => setShowSearch(false)}
          />
        )}

        {showImg && (
          <>
            {products.map((item) => {
              if (item.id === id) {
                return (
                  <ImgModal
                    key={item.id}
                    img={item.image}
                    handleShow={() => setShowImg(true)}
                    handleClose={() => setShowImg(false)}
                  />
                );
              }
              return null;
            })}
          </>
        )}
        {products.map((item) => {
          if (item.id === id) {
            return (
              <div key={item.id} className="product">
                <figure className="product__poster">
                  {!item.image ? (
                    <img className="product__img" src={imageNull} alt="Null" />
                  ) : (
                    <img
                      className="product__img product__img--null"
                      onClick={() => setShowImg(true)}
                      id="myImage"
                      src={item.image}
                      alt="Product"
                    />
                  )}
                </figure>
                <section className="product__description">
                  <strong className="product__name">{item.name}</strong>
                  <span className="product__price">{item.actual_price}</span>
                  <span className="product__price product__price--parcel">
                    Em até {item.installments}
                  </span>
                  <div className="product__size">
                    {item.sizes.map((size) => {
                      return (
                        size.available && (
                          <button
                            key={size.sku}
                            onClick={() => handleSelectSize(size.size)}
                            className="btn-sizes btn-sizes--normal"
                          >
                            {size.size}
                          </button>
                        )
                      );
                    })}
                  </div>
                  {showAddCartAlert && (
                    <div className="alert alert--sucess">
                      <FiX
                        className="icon icon--close-alert"
                        onClick={() => setShowAddCartAlert(false)}
                      />
                      Produto adicionado !
                    </div>
                  )}
                  {showNoSizeSelectedAlert && (
                    <div className="alert alert--danger">
                      <FiX
                        className="icon icon--close-alert"
                        onClick={() => setShowNoSizeSelectedAlert(false)}
                      />
                      Selecione um tamanho !
                    </div>
                  )}
                  <button
                    className="btn btn--bag"
                    onClick={() => handleAddProductToCart(item, selectedSize)}
                  >
                    Adicionar ao carrinho
                  </button>
                  <Link className="link link--back" to="/">
                    <FiArrowLeft className="icon icon--back" />
                    Voltar para home
                  </Link>
                </section>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}

/**
 * 
 * import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import "./product.css";
import { FiArrowLeft } from "react-icons/fi";

import { Link } from "react-router-dom";
import ImgModal from "../../components/ImgModal";
import SearchProduct from "../../components/SearchProduct";
import CartModal from "../../components/CartModal";
import { useSelector, useDispatch } from "react-redux";
import { cartProductsSelectors } from "../../selectors/cartProducts";
import { actions } from "../../actions/cartProducts";
import { productsSelectors } from "../../selectors/products";
import { fetchProducts, onSelectSize } from "../../actions/products";
import imageNull from "../../assets/indisponivel.jpg";

export default function Product(props) {
  const [showImg, setShowImg] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  let [id, setId] = useState(Number);

  const showIMGModal = () => setShowImg(true);
  const hideimgModal = () => setShowImg(false);

  const showCartModal = () => setShowCart(true);
  const hideCartModal = () => setShowCart(false);

  const showSearchModal = () => setShowSearch(true);
  const hideSearchModal = () => setShowSearch(false);

  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);
  const products = useSelector(productsSelectors.getProducts);
  let selectedSize = useSelector(productsSelectors.getSelectedSize);
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    setId(parseInt(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleAddProductToCart = (product, size) => {
    if (size === "") {
      return alert("Selecione um tamanho válido !");
    }
    dispatch(actions.addItemToCart(product, size));
  };

  const handleSelectSize = (size) => {
    dispatch(onSelectSize(size));
    let sizes = document.querySelectorAll(".btn-sizes");
    for (let value of sizes) {
      if (value.classList.contains("btn-sizes--selected"))
        value.classList.remove("btn-sizes--selected");
      if (value.innerHTML === size) value.classList.add("btn-sizes--selected");
    }
  };
  return (
    <>
      <div className="container">
        <Header
          cartProductsCounter={cartCounter}
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

        {showImg && (
          <>
            {products.map((item) => {
              if (item.id === id) {
                return (
                  <ImgModal
                    key={item.id}
                    img={item.image}
                    handleShow={showImg}
                    handleClose={hideimgModal}
                  />
                );
              }
              return null;
            })}
          </>
        )}
        {products.map((item) => {
          if (item.id === id) {
            return (
              <div key={item.id} className="product">
                <figure className="product__poster">
                  {!item.image ? (
                    <img className="product__img" src={imageNull} alt="Null" />
                  ) : (
                    <img
                      className="product__img product__img--null"
                      onClick={showIMGModal}
                      id="myImage"
                      src={item.image}
                      alt="Product"
                    />
                  )}
                </figure>
                <section className="product__description">
                  <strong className="product__name">{item.name}</strong>
                  <span className="product__price">{item.actual_price}</span>
                  <span className="product__price product__price--parcel">
                    Em até {item.installments}
                  </span>
                  <div className="product__size">
                    {item.sizes.map((size) => {
                      return (
                        size.available && (
                          <button
                            key={size.sku}
                            onClick={() => handleSelectSize(size.size)}
                            className="btn-sizes btn-sizes--normal"
                          >
                            {size.size}
                          </button>
                        )
                      );
                    })}
                  </div>
                  <button
                    className="btn btn--bag"
                    onClick={() => handleAddProductToCart(item, selectedSize)}
                  >
                    Adicionar ao carrinho
                  </button>
                  <Link className="link link--back" to="/">
                    <FiArrowLeft className="icon icon--back" />
                    Voltar para home
                  </Link>
                </section>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}

 */

 */