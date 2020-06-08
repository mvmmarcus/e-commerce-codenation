import React from "react";
import { Link } from "react-router-dom";

export default function Product({ item }) {
  return (
    <li data-testid="product" key={item.id} className="catalog__item">
      <Link to={`products/${item.id}`}>
        <figure className="catalog__poster">
          {!item.image ? (
            <img
              className="catalog__img catalog__img--null"
              src={
                "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
              }
              alt="Null"
            />
          ) : (
            <img className="catalog__img" src={item.image} alt="product" />
          )}
          <div className="catalog__seal">
            {item.discount_percentage && (
              <span>-{item.discount_percentage}</span>
            )}
          </div>
        </figure>
      </Link>
      <div className="catalog__description">
        <strong className="catalog__name">{item.name}</strong>
        <div className="catalog__pricing">
          {item.regular_price !== item.actual_price ? (
            <>
              <span className="catalog__price">{item.regular_price}</span>
              <span className="catalog__price catalog__price--promo">
                {item.actual_price}
              </span>
            </>
          ) : (
            <span className="catalog__price catalog__price--promo">
              {item.regular_price}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
