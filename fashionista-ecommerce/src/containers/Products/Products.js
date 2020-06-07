import React from "react";
import Product from "../../components/Product";
import { productsSelectors } from "../../selectors/products";
import { useSelector } from "react-redux";

export default function Products() {
  const products = useSelector(productsSelectors.getProducts);

  return (
    <ul className="catalog__list">
      {products?.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </ul>
  );
}
