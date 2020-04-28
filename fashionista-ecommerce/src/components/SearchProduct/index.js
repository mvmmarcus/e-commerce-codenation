import React, { useEffect } from "react";

import "./searchProduct.css";
import imageNull from "../../assets/indisponivel.jpg";
import { FiX } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { filterProducts, onInputChange } from "../../actions/products";
import { Link } from "react-router-dom";

export default function SearchProduct({ id="modal", handleShow, handleClose }) {
  const products = useSelector(productsSelectors.getProducts);
  const filteredItems = useSelector(productsSelectors.getFilteredItems);
  let searchName = useSelector(productsSelectors.getSearchNameValue);

  useEffect(() => {
    const searchModal = document.getElementById("search");
    searchModal.classList.add("open-modal");
  }, [handleShow]);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) handleClose();
  };

  const handleCloseSearch = () => {
    const searchModal = document.getElementById("search");
    searchModal.classList.add("close-modal");
    document.getElementById("modal").style.background = "none";
    setTimeout(() => {
      handleClose();
    }, 200);
  };

  const dispatch = useDispatch();

  const onChange = (searchName) => {
    dispatch(onInputChange(searchName));
  };

  useEffect(() => {
    dispatch(filterProducts(products, searchName));
  }, [dispatch, searchName, products]);

  return (
    <>
      {handleShow && (
        <div id={id} className="modal" onClick={handleOutsideClick} >
          <div id="search" className="search-modal">
            <div className="search-modal__title">
              <FiX className="search-modal__close-icon" onClick={handleCloseSearch} />
              <input
                className="search-modal__input"
                value={searchName}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                placeholder="Pesquise pelo produto..."
              />
              <FiX
                onClick={() => dispatch(onInputChange(""))}
                className="search-modal__clear-icon"
                size={18}
              />
            </div>
            {filteredItems.length === 0 && (
              <span className="search-modal__not-found">
                Nenhum resultado encontrado !
              </span>
            )}
            {filteredItems.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <div key={item.id} className="search-product">
                    <figure className="search-product__poster">
                      {!item.image ? (
                        <Link onClick={handleClose} to={`/products/${item.id}`}>
                          <img
                            className="search-product__img search-product__img--null"
                            src={imageNull}
                            alt="img null"
                          />
                        </Link>
                      ) : (
                        <Link onClick={handleClose} to={`/products/${item.id}`}>
                          <img
                            className="search-product__img"
                            src={item.image}
                            alt="img"
                          />
                        </Link>
                      )}
                    </figure>
                    <section className="search-product__description">
                      <span className="search-product__name">{item.name}</span>
                      <div className="search-product__pricing">
                        <span className="search-product__parcel-price">
                          Em até {item.installments}
                        </span>
                        <span className="search-product__price">
                          {item.actual_price}
                        </span>
                      </div>
                    </section>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
