import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
import CartModal from "../../containers/CartModal";
import { useSelector } from "react-redux";
import { productsSelectors } from "../../selectors/products";
import { modalsSelectors } from "../../selectors/modals";
import Loading from "../../components/Loading";
import Products from "../../containers/Products";

import "./home.css";
import SearchModal from "../../containers/SearchModal";

export default function Home() {
  const products = useSelector(productsSelectors.getProducts);
  const loading = useSelector(productsSelectors.loading);
  const showCart = useSelector(modalsSelectors.getCartModalState);
  const showSearch = useSelector(modalsSelectors.getSearchModalState);

  useEffect(() => {
    const linkToTop = document.getElementById("link-top-home");
    window.onscroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        linkToTop.classList.add("move-to-top--visible");

        linkToTop.addEventListener("click", (event) => {
          event.preventDefault();
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        });
      } else if (linkToTop.classList.contains("move-to-top--visible")) {
        linkToTop.classList.remove("move-to-top--visible");
      }
    };
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header/>

          {showCart && <div className="back-drop"></div>}
          <CartModal />

          {showSearch && <div className="back-drop"></div>}
          <SearchModal />
          <div className="content">
            <div className="catalog">
              <>
                <span className="catalog__counter">
                  {products.length} itens
                </span>
                <Products />
              </>
            </div>
          </div>
          <Footer />
        </>
      )}

      <Link
        to="#"
        title="Ir para o topo"
        id="link-top-home"
        className="move-to-top"
      >
        <FiArrowUp className="icon icon--move-to-top" />
      </Link>
    </div>
  );
}
