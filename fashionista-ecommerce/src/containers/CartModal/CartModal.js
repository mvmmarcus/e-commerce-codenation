import React from "react";

import "./cartModal.css";
import { FiX, FiArrowUp } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { modalsActions } from "../../actions/modals";
import { Link } from "react-router-dom";
import { cartProductsSelectors } from "../../selectors/cartProducts";
import CartProduct from "../../components/CartProduct";
import { modalsSelectors } from "../../selectors/modals";

export default function CartModal({ id = "modal" }) {
  const dispatch = useDispatch();
  const total = useSelector(cartProductsSelectors.total);
  const isEmpty = useSelector(cartProductsSelectors.cartProductsIsEmpty);
  const cartCounter = useSelector(cartProductsSelectors.getCartCounter);
  const showCart = useSelector(modalsSelectors.getCartModalState);
  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) dispatch(modalsActions.handleCloseCart());
  };

  const linkToTop = document.getElementById("link-top-cart");
  const modalContent = document.getElementById("cart-content");

  if (showCart) {
    modalContent.onscroll = () => {
      if (modalContent.scrollTop > 20) {
        linkToTop.classList.add("move-to-top--visible-modal");

        linkToTop.addEventListener("click", (event) => {
          event.preventDefault();
          modalContent.scroll({
            top: 0,
            behavior: "smooth",
          });
        });
      } else {
        linkToTop.classList.remove("move-to-top--visible-modal");
      }
    };
  }

  return (
    <>
      <div
        id={id}
        className={showCart ? "modal" : "modal modal--hide"}
        onClick={handleOutsideClick}
      >
        <div className="modal__title">
          <FiX
            className="icon icon--close-modal"
            onClick={() => dispatch(modalsActions.handleCloseCart())}
          />
          Carrinho ({cartCounter})
        </div>
        <div className="modal__container">
          <div id="cart-content" className="modal__content">
            <div
              id="cart"
              className={
                showCart ? "cart-modal cart-modal--visible" : "cart-modal"
              }
            >
              {isEmpty && (
                <span className="is-empty-msg">O carrinho está vazio !</span>
              )}
              {cartProducts?.map((item) => {
                return <CartProduct key={item.cartId} item={item} />;
              })}
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <span className="cart-modal__subtotal-price">
            Subtotal: R$ {total.toFixed(2)}
          </span>
        </div>
        <Link
          title="Ir para o topo"
          id="link-top-cart"
          className="move-to-top"
          to="#"
        >
          <FiArrowUp className="icon icon--move-to-top" />
        </Link>
      </div>
    </>
  );
}
