import { actionsTypes } from "../constants/cartProducts";

const INITIAL_STATE = {
  cartProducts: [],
};

const cartItem = (state, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      return {
        cartId: action.payload.cartId,
        product: action.payload.product,
        selectedSize: action.payload.size,
        qty: 1,
      };
    case actionsTypes.REMOVE_FROM_CART:
      return state.cartId !== action.payload.cartId;
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      if (state.cartId !== action.payload.cartId) {
        return state;
      }
      return {
        ...state,
        qty: state.qty + 1,
      };
    case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      if (state.cartId !== action.payload.cartId) {
        return state;
      }
      return {
        ...state,
        qty: state.qty - 1,
      };
    default:
      return state;
  }
};

const cartProductsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      if (action.isProductInCart) {
        return {
          cartProducts: state.cartProducts.map((item) => {
            if (
              item.product.name === action.payload.product.name &&
              item.selectedSize === action.payload.size
            ) {
              return {
                ...item,
                qty: item.qty + 1,
              };
            }
            return item;
          }),
        };
      }
      return {
        cartProducts: [...state.cartProducts, cartItem(state, action)],
      };
    case actionsTypes.REMOVE_FROM_CART:
      return {
        cartProducts: state.cartProducts.filter((item) =>
          cartItem(item, action)
        ),
      };
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      return {
        cartProducts: state.cartProducts.map((item) => cartItem(item, action)),
      };

    case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      return {
        cartProducts: state.cartProducts.map((item) => {
          return item.qty > 1 ? cartItem(item, action) : item;
        }),
      };

    default:
      return state;
  }
};

export { cartProductsReducers };

/*
Modificar a forma como o estado é exibido:
return {
        ...action.payload,
        id: action.id,
        qty: 1,
      };
*/
