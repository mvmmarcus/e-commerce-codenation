import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../actions/modals";

export default function SearchProduct({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="search-product">
      <figure
        onClick={() => dispatch(modalsActions.handleCloseSearch())}
        className="search-product__poster"
      >
        {!item.image ? (
          <Link to={`/products/${item.id}`}>
            <img
              className="search-product__img search-product__img--null"
              src={
                "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
              }
              alt="img null"
            />
          </Link>
        ) : (
          <Link
            onClick={() => dispatch(modalsActions.handleCloseSearch())}
            to={`/products/${item.id}`}
          >
            <img className="search-product__img" src={item.image} alt="img" />
          </Link>
        )}
      </figure>
      <section className="search-product__description">
        <Link
          onClick={() => dispatch(modalsActions.handleCloseSearch())}
          to={`/products/${item.id}`}
          className="search-product__name"
        >
          <span>{item.name}</span>
        </Link>

        <div className="search-product__pricing">
          <span className="search-product__parcel-price">
            Em até {item.installments}
          </span>
          <span className="search-product__price">{item.actual_price}</span>
        </div>
      </section>
    </div>
  );
}
