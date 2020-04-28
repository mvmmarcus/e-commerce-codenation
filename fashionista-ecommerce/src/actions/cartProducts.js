import { actionsTypes } from "../constants/cartProducts";

const verificaId = (id, cartProducts) => {
  let validIid = 0;
  let lastPosition = cartProducts[cartProducts.length - 1];
  cartProducts.map((item) => {
    if (item.id === id) {
      validIid = lastPosition.id + 1;
    }
    return item;
  });
  return validIid;
};

export const addItemToCart = (product, size) => {
  return (dispatch, getState) => {
    const { cartProducts } = getState().cartProductsReducers;
    let validId = 0;
    cartProducts.map((item) => {
      return (validId = verificaId(item.id, cartProducts));
    });
    dispatch({
      type: actionsTypes.ADD_TO_CART,
      payload: {
        id: validId,
        product: product,
        size: size,
      },
    });
  };
};

const actions = {
  incrementCount: (id) => ({
    type: actionsTypes.INCREMENT_COUNT_CART_ITEM,
    payload: {
      id: id,
    },
  }),
  decrementCount: (id) => ({
    type: actionsTypes.DECREMENT_COUNT_CART_ITEM,
    payload: {
      id: id,
    },
  }),
  removeItemFromCart: (id) => ({
    type: actionsTypes.REMOVE_FROM_CART,
    payload: {
      id: id,
    },
  }),
};

export { actions };
