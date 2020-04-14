import React from "react";

import "./cartModal.css";
import { FiX, FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import vestido from "../../assets/vestido.jpg";

export default function CartModal({ handleShow, handleClose }) {
  return (
    <>
      {handleShow && (
        <div className="container-modal">
          <div className="cart-modal-container">
            <div className="cart-modal-title">
              <FiX onClick={handleClose} size={24} />
              <span>Carrinho (0)</span>
            </div>
            <div className="product">
              <figure>
                <img
                  className="cart-product-img"
                  src={vestido}
                  alt="imgModal"
                />
                <button className="cart-btn-remove-item">Remover item</button>
              </figure>
              <section className="cart-product-info">
                <span className="cart-product-name">Vestido Dourado</span>
                <span className="cart-product-selected-size">Tam: 40</span>
                <div className="cart-product-qty-container">
                  <FiMinusCircle size={20} />
                  <span className="cart-product-qty">1</span>
                  <FiPlusCircle size={20} />
                </div>
                <div className="cart-product-value-container">
                  <span className="cart-promo-value">100.00</span>
                  <span className="cart-normal-value">120.00</span>
                </div>
              </section>
            </div>
            <div className="product">
              <figure>
                <img
                  className="cart-product-img"
                  src={vestido}
                  alt="imgModal"
                />
                <button className="cart-btn-remove-item">Remover item</button>
              </figure>
              <section className="cart-product-info">
                <span className="cart-product-name">Vestido Dourado</span>
                <span className="cart-product-selected-size">Tam: 40</span>
                <div className="cart-product-qty-container">
                  <FiMinusCircle size={20} />
                  <span className="cart-product-qty">1</span>
                  <FiPlusCircle size={20} />
                </div>
                <div className="cart-product-value-container">
                  <span className="cart-promo-value">100.00</span>
                  <span className="cart-normal-value">120.00</span>
                </div>
              </section>
            </div>
            <div className="product">
              <figure>
                <img
                  className="cart-product-img"
                  src={vestido}
                  alt="imgModal"
                />
                <button className="cart-btn-remove-item">Remover item</button>
              </figure>
              <section className="cart-product-info">
                <span className="cart-product-name">Vestido Dourado</span>
                <span className="cart-product-selected-size">Tam: 40</span>
                <div className="cart-product-qty-container">
                  <FiMinusCircle size={20} />
                  <span className="cart-product-qty">1</span>
                  <FiPlusCircle size={20} />
                </div>
                <div className="cart-product-value-container">
                  <span className="cart-promo-value">100.00</span>
                  <span className="cart-normal-value">120.00</span>
                </div>
              </section>
            </div>
            <div className="product">
              <figure>
                <img
                  className="cart-product-img"
                  src={vestido}
                  alt="imgModal"
                />
                <button className="cart-btn-remove-item">Remover item</button>
              </figure>
              <section className="cart-product-info">
                <span className="cart-product-name">Vestido Dourado</span>
                <span className="cart-product-selected-size">Tam: 40</span>
                <div className="cart-product-qty-container">
                  <FiMinusCircle size={20} />
                  <span className="cart-product-qty">1</span>
                  <FiPlusCircle size={20} />
                </div>
                <div className="cart-product-value-container">
                  <span className="cart-promo-value">100.00</span>
                  <span className="cart-normal-value">120.00</span>
                </div>
              </section>
            </div>
            <div className="product">
              <figure>
                <img
                  className="cart-product-img"
                  src={vestido}
                  alt="imgModal"
                />
                <button className="cart-btn-remove-item">Remover item</button>
              </figure>
              <section className="cart-product-info">
                <span className="cart-product-name">Vestido Dourado</span>
                <span className="cart-product-selected-size">Tam: 40</span>
                <div className="cart-product-qty-container">
                  <FiMinusCircle size={20} />
                  <span className="cart-product-qty">1</span>
                  <FiPlusCircle size={20} />
                </div>
                <div className="cart-product-value-container">
                  <span className="cart-promo-value">100.00</span>
                  <span className="cart-normal-value">120.00</span>
                </div>
              </section>
            </div>
            <div className="cart-total-container">
              <span className="cart-product-total-value">Subtotal: 300.00</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
