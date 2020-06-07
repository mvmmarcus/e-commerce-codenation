import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../actions/cartProducts";
import { modalsActions } from "../../actions/modals";

export default function CartProduct({ item }) {
  const dispatch = useDispatch();

  const handleIncrementCount = (cartId) => {
    dispatch(actions.incrementCount(cartId));
  };

  const handleDecrementCount = (cartId) => {
    dispatch(actions.decrementCount(cartId));
  };

  return (
    <div className="cart-product">
      <figure className="cart-product__poster">
        {!item.product.image ? (
          <Link
            onClick={() => dispatch(modalsActions.handleCloseCart())}
            to={`/products/${item.product.id}`}
          >
            <img
              className="cart-product__img cart-product__img--null"
              src={
                "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
              }
              alt="Null"
            />
          </Link>
        ) : (
          <Link
            onClick={() => dispatch(modalsActions.handleCloseCart())}
            to={`/products/${item.product.id}`}
          >
            <img
              className="cart-product__img"
              src={item.product.image}
              alt="imgModal"
            />
          </Link>
        )}
      </figure>

      <section className="cart-product__description">
        <Link
          className="cart-product__name"
          onClick={() => dispatch(modalsActions.handleCloseCart())}
          to={`/products/${item.product.id}`}
        >
          <span>{item.product.name}</span>
        </Link>
        <span className="cart-product__selected-size">
          Tam: {item.selectedSize}
        </span>
        <div className="cart-product__qty">
          <button
            onClick={() => handleDecrementCount(item.cartId)}
            className="cart-product__button"
          >
            <FiMinus />
          </button>
          <span className="cart-product__counter">{item.qty}</span>

          <button
            onClick={() => handleIncrementCount(item.cartId)}
            className="cart-product__button"
          >
            <FiPlus />
          </button>
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
        <FiTrash2
          className="icon icon--remove"
          onClick={() => dispatch(actions.removeItemFromCart(item.cartId))}
        />
      </section>
    </div>
  );
}
