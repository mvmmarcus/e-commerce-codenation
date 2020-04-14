import React from "react";

import "./searchProduct.css";
import { FiX } from "react-icons/fi";

import vestido from "../../assets/vestido.jpg";

export default function SearchProduct({ handleShow, handleClose }) {
  return (
    <>
      {handleShow && (
        <div className="container-modal">
          <div className="search-modal-container">
            <div className="search-modal-title">
              <FiX className="search-icon" onClick={handleClose} size={24} />
              <input
              className="search-input" 
              type="text"
              placeholder="Pesquise pelo produto..."
              />
              <FiX className="clear-search" size={14} />
            </div>
            <div className="product">
              <figure>
                <img
                  className="search-product-img"
                  src={vestido}
                  alt="imgModal"
                />
                <button className="search-btn-add-item">Adicionar ao carrinho</button>
              </figure>
              <section className="search-product-info">
                <span className="search-product-name">Vestido Dourado</span>
                <div className="search-product-value-container">
                  <span className="search-normal-value">120.00</span>
                  <span className="search-parcel-value">3x 40.00</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
