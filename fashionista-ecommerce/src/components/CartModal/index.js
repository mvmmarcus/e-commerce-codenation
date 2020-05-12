import React from "react";

import "./cartModal.css";
import { FiX, FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../actions/cartProducts";
import { modalsActions } from "../../actions/modals";
import { Link } from "react-router-dom";
import { cartProductsSelectors } from "../../selectors/cartProducts";

export default function CartModal({
  id = "modal",
  cartProducts,
  showCart,
}) {
  const dispatch = useDispatch();
  const total = useSelector(cartProductsSelectors.total);
  const isEmpty = useSelector(cartProductsSelectors.cartProductsIsEmpty);
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) dispatch(modalsActions.handleCloseCart());
  };

  const handleIncrementCount = (cartId) => {
    dispatch(actions.incrementCount(cartId));
  };

  const handleDecrementCount = (cartId) => {
    dispatch(actions.decrementCount(cartId));
  };

  return (
    <>
      <div
        id={id}
        className={showCart ? "modal" : "modal modal--hide"}
        onClick={handleOutsideClick}
      >

        <div className="modal__title">
          <FiX
            className="icon icon--close"
            onClick={() => dispatch(modalsActions.handleCloseCart())}
          />
          Carrinho ({cartCounter})
        </div>
        <div className="modal__container">
          <div className="modal__content">
            <div
              id="cart"
              className={
                showCart ? "cart-modal cart-modal--visible" : "cart-modal"
              }
            >
              {isEmpty && (
                <span className="is-empty-msg">
                  O carrinho está vazio !
                </span>
              )}
              {cartProducts.map((item) => {
                return (
                  <div key={item.cartId} className="cart-product">
                    <figure className="cart-product__poster">
                      {!item.product.image ? (
                        <Link
                          onClick={() =>
                            dispatch(modalsActions.handleCloseCart())
                          }
                          to={`/products/${item.product.id}`}
                        >
                          <img
                            className="cart-product__img cart-product__img--null"
                            src={"https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"}
                            alt="Null"
                          />
                        </Link>
                      ) : (
                        <Link
                          onClick={() =>
                            dispatch(modalsActions.handleCloseCart())
                          }
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
                      <span className="cart-product__name">
                        {item.product.name}
                      </span>
                      <span className="cart-product__selected-size">
                        Tam: {item.selectedSize}
                      </span>
                      <div className="cart-product__qty">
                        <FiMinusCircle
                          className="icon icon--more"
                          onClick={() => handleDecrementCount(item.cartId)}
                        />
                        <span className="cart-product__counter">
                          {item.qty}
                        </span>
                        <FiPlusCircle
                          className="icon icon--less"
                          onClick={() => handleIncrementCount(item.cartId)}
                        />
                      </div>
                      {item.product.regular_price !==
                      item.product.actual_price ? (
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
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <span className="cart-modal__subtotal-price">
            Subtotal: R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
}
