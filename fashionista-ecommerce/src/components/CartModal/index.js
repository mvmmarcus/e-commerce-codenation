import React from "react";

import "./cartModal.css";
import imageNull from "../../assets/indisponivel.jpg";
import { FiX, FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../actions/cartProducts";
import { Link } from "react-router-dom";
import { cartProductsSelectors } from "../../selectors/cartProducts";

export default function CartModal({ cartProducts, handleShow, handleClose }) {
  const dispatch = useDispatch();
  const total = useSelector(cartProductsSelectors.total);
  const isEmpty = useSelector(cartProductsSelectors.cartProductsIsEmpty);

  const handleIncrementCount = (id) => {
    dispatch(actions.incrementCount(id));
  };

  const handleDecrementCount = (id) => {
    dispatch(actions.decrementCount(id));
  };

  return (
    <>
      {handleShow && (
        <div className="container-modal">
          <div className="content-modal">
            <div className="modal-title">
              <FiX onClick={handleClose} size={24} />
              <span>Carrinho ({cartProducts.length})</span>
         
            </div>
            
            {isEmpty && (
              <span className="is-empty-msg">O carrinho está vazio!</span>
            )}
            {cartProducts.map((item) => {
              return (
                <div key={item.id} className="product">
                  <figure>
                    {!item.product.image ? (
                      <Link onClick={handleClose} to={`/products/${item.product.id}`}>
                        <img
                          className="modal-product-img"
                          src={imageNull}
                          alt="Null"
                        />
                      </Link>
                    ) : (
                      <Link onClick={handleClose} to={`/products/${item.product.id}`}>
                        <img
                          className="modal-product-img"
                          src={item.product.image}
                          alt="imgModal"
                        />
                      </Link>
                    )}
                    <button
                      onClick={() =>
                        dispatch(actions.removeItemFromCart(item.id))
                      }
                      className="modal-btn"
                    >
                      Remover item
                    </button>
                  </figure>

                  <section className="modal-product-info">
                    <span className="modal-product-name">
                      {item.product.name}
                    </span>
                    <span className="modal-product-selected-size">
                      Tam: {item.selectedSize}
                    </span>
                    <div className="modal-product-qty-container">
                      <FiMinusCircle
                        onClick={() => handleDecrementCount(item.id)}
                        size={20}
                      />
                      <span className="modal-product-qty">{item.qty}</span>
                      <FiPlusCircle
                        onClick={() => handleIncrementCount(item.id)}
                        size={20}
                      />
                    </div>
                    <div className="modal-product-value-container">
                      {item.product.regular_price !==
                      item.product.actual_price ? (
                        <>
                          <span className="modal-promo-value">
                            {item.product.actual_price}
                          </span>
                          <span className="modal-normal-value">
                            {item.product.regular_price}
                          </span>
                        </>
                      ) : (
                        <span className="modal-promo-value">
                          {item.product.actual_price}
                        </span>
                      )}
                    </div>
                  </section>
                </div>
              );
            })}
            <div className="modal-total-container">
              <span className="modal-product-total-value">
                Subtotal: R$ {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
