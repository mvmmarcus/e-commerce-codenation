import React from "react";

import { FiX, FiArrowLeft } from "react-icons/fi";
import { productsSelectors } from "../../selectors/products";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { addItemToCart } from "../../actions/cartProducts";
import {
  onSelectSize,
  showAddCartAlert,
  hideAddCartAlert,
} from "../../actions/products";
import { modalsActions } from "../../actions/modals";
import { useState } from "react";
import ImgModal from "../ImgModal";

export default function SelectedProduct({ item }) {
  const [showNoSizeSelectedAlert, setShowNoSizeSelectedAlert] = useState(false);
  const selectedSize = useSelector(productsSelectors.getSelectedSize);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onSelectSize(""));
  }, [dispatch]);

  const handleAddProductToCart = (product, size) => {
    if (size === "") {
      return setShowNoSizeSelectedAlert(true);
    }
    dispatch(addItemToCart(product, size));

    dispatch(showAddCartAlert(true));

    const btn = document.getElementById("btn");
    btn.classList.add("touch");

    setTimeout(() => {
      btn.classList.remove("touch");
    }, 500);

    setTimeout(() => {
      dispatch(hideAddCartAlert());
    }, 800);
  };

  const handleSelectSize = (size) => {
    dispatch(hideAddCartAlert());
    setShowNoSizeSelectedAlert(false);
    dispatch(onSelectSize(size));
    let sizes = document.querySelectorAll(".btn-sizes");
    for (let value of sizes) {
      if (value.classList.contains("btn-sizes--selected"))
        value.classList.remove("btn-sizes--selected");
      if (value.innerHTML === size) value.classList.add("btn-sizes--selected");
    }
  };

  return (
    <div className="selected-product">
      <ImgModal key={item.id} item={item} />
      <>
        <figure
          onClick={() => dispatch(modalsActions.handleShowImg())}
          className="selected-product__poster"
        >
          {item.image ? (
            <img
              className="selected-product__img"
              src={item.image}
              alt="selected-product"
            />
          ) : (
            <img
              className="selected-product__img selected-product__img--null"
              src={
                "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
              }
              alt="Null"
            />
          )}
        </figure>
        <section className="selected-product__description">
          <strong className="selected-product__name">{item.name}</strong>
          <span className="selected-product__price">{item.actual_price}</span>
          <span className="selected-product__price selected-product__price--parcel">
            Em até {item.installments}
          </span>
          <div className="selected-product__sizes">
            {item.sizes.map((size) => {
              return (
                size.available && (
                  <div key={size.sku} className="selected-product__size">
                    <button
                      onClick={() => handleSelectSize(size.size)}
                      className="btn-sizes btn-sizes--normal"
                    >
                      {size.size}
                    </button>
                  </div>
                )
              );
            })}
          </div>

          <div
            className={
              showNoSizeSelectedAlert ? "alert-danger" : "alert-danger--hide"
            }
          >
            <FiX
              className="icon icon--close-alert"
              onClick={() => setShowNoSizeSelectedAlert(false)}
            />
            Selecione um tamanho !
          </div>

          <button
            id="btn"
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
      </>
    </div>
  );
}
