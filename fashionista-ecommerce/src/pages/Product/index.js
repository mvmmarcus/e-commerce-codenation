import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./product.css";
import { FiArrowLeft } from "react-icons/fi";

import { Link } from "react-router-dom";
import ImgModal from "../../components/ImgModal";
import SearchProduct from "../../components/SearchProduct";
import CartModal from "../../components/CartModal";
import { useSelector, useDispatch } from "react-redux";
import { cartProductsSelectors } from "../../selectors/cartProducts";
import { actions } from "../../actions/cartProducts";
import { productsSelectors } from "../../selectors/products";
import { fetchProducts, onSelectSize } from "../../actions/products";
import imageNull from "../../assets/indisponivel.jpg";

export default function Product(props) {
  const [showImg, setShowImg] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  let [id, setId] = useState(Number);

  const showIMGModal = () => setShowImg(true);
  const hideimgModal = () => setShowImg(false);

  const showCartModal = () => setShowCart(true);
  const hideCartModal = () => setShowCart(false);

  const showSearchModal = () => setShowSearch(true);
  const hideSearchModal = () => setShowSearch(false);

  const cartProducts = useSelector(cartProductsSelectors.getCartProducts);
  const products = useSelector(productsSelectors.getProducts);
  let selectedSize = useSelector(productsSelectors.getSelectedSize);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onSelectSize(""));
    dispatch(fetchProducts());
    setId(parseInt(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleAddProductToCart = (product, size) => {
    if (size === "") {
      return alert("Selecione um tamanho válido !");
    }
    dispatch(actions.addItemToCart(product, size));
  };
  return (
    <>
      <div className="product__container">
        <Header
          cartProductsCounter={cartProducts.length}
          handleBagIcon={showCartModal}
          handleSearchIcon={showSearchModal}
        />
        {showCart && (
          <CartModal
            cartProducts={cartProducts}
            handleShow={showCartModal}
            handleClose={hideCartModal}
          />
        )}
        {showSearch && (
          <SearchProduct
            handleShow={showSearchModal}
            handleClose={hideSearchModal}
          />
        )}

        {showImg && (
          <>
            {products.map((item) => {
              if (item.id === id) {
                return (
                  <ImgModal
                    key={item.id}
                    img={item.image}
                    handleShow={showImg}
                    handleClose={hideimgModal}
                  />
                );
              }
              return null;
            })}
          </>
        )}
        {products.map((item) => {
          if (item.id === id) {
            return (
              <div key={item.id} className="product__content">
                <figure className="product__poster">
                  {!item.image ? (
                    <img className="poster__img" src={imageNull} alt="Null" />
                  ) : (
                    <img
                      className="poster__img"
                      onClick={showIMGModal}
                      id="myImage"
                      src={item.image}
                      alt="Product"
                    />
                  )}
                  <div id="myResult" className="img-zoom-result"></div>
                </figure>
                <section className="product__info__container">
                  <strong className="product__name">{item.name}</strong>
                  <span className="product__value">
                    {item.actual_price}
                  </span>
                  <span className="product__value product__value--parcel">
                    {item.installments}
                  </span>
                  <div className="product__size__container">
                    <select
                      value={selectedSize}
                      onChange={(e) => dispatch(onSelectSize(e.target.value))}
                      name="size"
                      id="size"
                    >
                      <option value="">Escolha o tamanho</option>
                      {item.sizes.map((size) => {
                        if (size.available) {
                          return (
                            <React.Fragment key={size.sku}>
                              <option value={size.size}>{size.size}</option>
                            </React.Fragment>
                          );
                        }
                        return null;
                      })}
                    </select>
                  </div>
                  <button
                    className="add__bag__btn"
                    onClick={() => handleAddProductToCart(item, selectedSize)}
                  >
                    Adicionar ao carrinho
                  </button>
                  <Link className="back__link" to="/">
                    <FiArrowLeft size={14} color="#000" />
                    Voltar para home
                  </Link>
                </section>
              </div>
            );
          }
          return null;
        })}
      </div>
      <Footer />
    </>
  );
}
