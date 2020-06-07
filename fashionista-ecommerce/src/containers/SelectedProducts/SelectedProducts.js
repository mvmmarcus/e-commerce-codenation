import React from "react";
import { useSelector } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import SelectedProduct from "../../components/SelectedProduct";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function SelectedProducts() {
  const products = useSelector(productsSelectors.getProducts);
  let [idParam, setIdParam] = useState(Number);

  const { id } = useParams();

  useEffect(() => {
    setIdParam(parseInt(id));
  }, [id, idParam]);
  return products?.map((item) => {
    if (item.id === idParam) {
      return <SelectedProduct key={item.id} item={item} />;
    }
  });
}
