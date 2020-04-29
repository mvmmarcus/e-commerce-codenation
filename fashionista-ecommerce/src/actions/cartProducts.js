import { actionsTypes } from "../constants/cartProducts";

const getValidId = (cartId, cartProducts) => {
  let validIid = 0;
  let lastPosition = cartProducts[cartProducts.length - 1];
  cartProducts.map((item) => {
    return item.cartId === cartId ? (validIid = lastPosition.cartId + 1) : item;
  });
  return { validIid };
};

export const addItemToCart = (product, size) => {
  return (dispatch, getState) => {
    const { cartProducts } = getState().cartProductsReducers;
    let cartId = 0;
    let isProductInCart = false;
    cartProducts.map((item) => {
      const { validIid } = getValidId(item.cartId, cartProducts);
      cartId = validIid;
      return item.product.id === product.id && item.selectedSize === size
        ? (isProductInCart = true)
        : item;
    });
    dispatch({
      type: actionsTypes.ADD_TO_CART,
      payload: {
        cartId: cartId,
        product: product,
        size: size,
      },
      isProductInCart: isProductInCart,
    });
  };
};

const actions = {
  incrementCount: (cartId) => ({
    type: actionsTypes.INCREMENT_COUNT_CART_ITEM,
    payload: {
      cartId: cartId,
    },
  }),
  decrementCount: (cartId) => ({
    type: actionsTypes.DECREMENT_COUNT_CART_ITEM,
    payload: {
      cartId: cartId,
    },
  }),
  removeItemFromCart: (cartId) => ({
    type: actionsTypes.REMOVE_FROM_CART,
    payload: {
      cartId: cartId,
    },
  }),
};

export { actions };
