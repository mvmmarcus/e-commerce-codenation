import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./product.css";
import { FiArrowLeft } from 'react-icons/fi'

import vestido from "../../assets/vestido.jpg";
import { Link } from "react-router-dom";
import ImgModal from "../../components/ImgModal";

export default function Home() {
  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  return (
    <>
      <div className="conteudo">
        {show && (
          <ImgModal img={vestido} handleShow={show} handleClose={hideModal} />
        )}
        <Header />
        <div className="product-container">
          <figure>
            <img onClick={showModal} id="myImage" src={vestido} alt="Vestido" />
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
