import { actionsTypes } from "../constants/cartProducts";

const actions = {
  addItemToCart: (product, size) => ({
    type: actionsTypes.ADD_TO_CART,
    payload: {
      product: product,
      size: size,
    },
  }),
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
