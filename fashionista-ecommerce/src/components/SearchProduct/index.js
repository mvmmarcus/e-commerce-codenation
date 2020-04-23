import React, { useEffect } from "react";

import "./searchProduct.css";
import imageNull from "../../assets/indisponivel.jpg";
import { FiX } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { filterProducts, onInputChange } from "../../actions/products";
import { Link } from "react-router-dom";

export default function SearchProduct({ handleShow, handleClose }) {
  const products = useSelector(productsSelectors.getProducts);
  const filteredItems = useSelector(productsSelectors.getFilteredItems);
  let searchName = useSelector(productsSelectors.getSearchNameValue);

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
        <div className="container-modal">
          <div className="content-modal">
            <div className="search-modal-title">
              <FiX className="search-icon" onClick={handleClose} size={24} />
              <input
                className="search-input"
                value={searchName}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                placeholder="Pesquise pelo produto..."
              />
              <FiX
                onClick={() => dispatch(onInputChange(""))}
                className="clear-search"
                size={18}
              />
            </div>
            {filteredItems.length === 0 && (
              <span>Nenhum resultado encontrado !</span>
            )}
            {filteredItems.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <div key={item.id} className="product">
                    <figure>
                      {!item.image ? (
                        <Link onClick={handleClose} to={`/products/${item.id}`}>
                          <img
                            className="modal-product-img"
                            src={imageNull}
                            alt="Null"
                          />
                        </Link>
                      ) : (
                        <Link onClick={handleClose} to={`/products/${item.id}`}>
                          <img
                            className="modal-product-img"
                            src={item.image}
                            alt="imgModal"
                          />
                        </Link>
                      )}
                    </figure>
                    <section className="search-modal-product-info">
                      <span className="modal-product-name">{item.name}</span>
                      <div className="modal-product-value-container">
                        <span className="modal-promo-value">
                          {item.actual_price}
                        </span>
                        <span className="search-parcel-value">
                          {item.installments}
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
