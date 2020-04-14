import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./product.css";
import { FiArrowLeft } from "react-icons/fi";

import vestido from "../../assets/vestido.jpg";
import { Link } from "react-router-dom";
import ImgModal from "../../components/ImgModal";
import SearchProduct from "../../components/SearchProduct";
import CartModal from "../../components/CartModal";

export default function Home() {
  const [showImg, setShowImg] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const showIMGModal = () => setShowImg(true);
  const hideimgModal = () => setShowImg(false);

  const showCartModal = () => setShowCart(true);
  const hideCartModal = () => setShowCart(false);

  const showSearchModal = () => setShowSearch(true);
  const hideSearchModal = () => setShowSearch(false);

  return (
    <>
      <div className="conteudo">
        <Header
          handleBagIcon={showCartModal}
          handleSearchIcon={showSearchModal}
        />
        {showCart && (
          <CartModal handleShow={showCartModal} handleClose={hideCartModal} />
        )}
        {showSearch && (
          <SearchProduct
            handleShow={showSearchModal}
            handleClose={hideSearchModal}
          />
        )}
        {showImg && (
          <ImgModal img={vestido} handleShow={showImg} handleClose={hideimgModal} />
        )}
        <div className="product-container">
          <figure>
            <img onClick={showIMGModal} id="myImage" src={vestido} alt="Vestido" />
            <div id="myResult" className="img-zoom-result"></div>
          </figure>
          <section className="product-info">
            <strong className="product-name">Vestido Dourado</strong>
            <span className="product-normal-value">120.00</span>
            <span className="product-parcel-value">Em até 3x 40.00</span>
            <span className="size-text">Escolha o tamanho:</span>
            <div className="product-size-container">
              <button>P</button>
              <button>M</button>
              <button>G</button>
            </div>
            <button className="bag-buttom">
              <Link to="/items/bag"> Adicionar ao carrinho </Link>
            </button>
            <Link className="back-link" to="/">
              <FiArrowLeft size={14} color="#000" />
              Voltar para home
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
