import React from "react";
import Header from "../../components/Header";

import "./product.css";

import CartModal from "../../containers/CartModal";
import { useSelector, useDispatch } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { modalsSelectors } from "../../selectors/modals";
import Loading from "../../components/Loading";
import SelectedProducts from "../../containers/SelectedProducts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SearchModal from "../../containers/SearchModal";

export default function Product() {
  const loading = useSelector(productsSelectors.loading);
  const showCart = useSelector(modalsSelectors.getCartModalState);
  const showSearch = useSelector(modalsSelectors.getSearchModalState);
  const showImg = useSelector(modalsSelectors.getImgModalState);
  let [idParam, setIdParam] = useState(Number);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIdParam(parseInt(id));
  }, [dispatch, id, idParam]);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          {showImg && <div className="back-drop"></div>}
          {showCart && <div className="back-drop"></div>}
          <CartModal />
          {showSearch && <div className="back-drop"></div>}
          <SearchModal />
          <div className="content">
            <SelectedProducts />
          </div>
        </>
      )}
    </div>
  );
}
