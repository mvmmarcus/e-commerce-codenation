import { actionsTypes } from "../constants/cartProducts";

const INITIAL_STATE = {
  cartProducts: [],
};

const cartItem = (state, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      return {
        id: state.cartProducts.length + 1,
        product: action.payload.product,
        selectedSize: action.payload.size,
        qty: 1,
      };
    case actionsTypes.REMOVE_FROM_CART:
      return state.id !== action.payload.id;
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      if (state.id !== action.payload.id) {
        return state;
      }
      return {
        ...state,
        qty: state.qty + 1,
      };
    case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      if (state.id !== action.payload.id) {
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
      let index = state.cartProducts.findIndex(
        (val) =>
          val.product.name === action.payload.product.name &&
          val.selectedSize === action.payload.size
      );
      if (index >= 0) {
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
        cartProducts: state.cartProducts.map((item) => cartItem(item, action)),
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

/**
 * import { actionsTypes } from "../constants/cartProducts";
import { defineState } from "redux-localstore";

const INITIAL_STATE = {
  cartProducts: [],
};

const storageState = defineState(INITIAL_STATE)("cartProductsReducers");
const cartItem = (state, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      return { id: action.id, product: action.payload, qty: 1 };
    case actionsTypes.REMOVE_FROM_CART:
      return state.name !== action.name;
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        qty: state.qty + 1,
      };
      case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      if (state.id !== action.id) {
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

const cartProductsReducers = (state = storageState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_TO_CART:
      if (state.cartProducts.length !== 0) {
        let index = state.cartProducts.findIndex((val) => val.id === action.id);
        if (index >= 0) {
          return{
            cartProducts: state.cartProducts.map(item=>{
              if(item.id === action.id){
                return{
                  ...item,
                  qty: item.qty + 1
                }
              }
              return item
            })
          }
          
        }
      }

      return {
        ...state,
        cartProducts: [...state.cartProducts, cartItem(state, action)],
      };
    case actionsTypes.REMOVE_FROM_CART:
      return state.filter((item) => cartItem(item, action));
    case actionsTypes.INCREMENT_COUNT_CART_ITEM:
      return {
        cartProducts: state.cartProducts.map((item, index) => {
          //console.log(state.cartProducts[index].product);
          if (item.id === action.id) {
            return {
              ...item,
              qty: action.qty + 1,
            };
          }
          return item;
        }),
      };
      case actionsTypes.DECREMENT_COUNT_CART_ITEM:
      return {
        cartProducts: state.cartProducts.map((item, index) => {
          //console.log(state.cartProducts[index].product);
          if (item.id === action.id) {
            return {
              ...item,
              qty: action.qty - 1,
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export { cartProductsReducers };
 */

/**
 * const storageState = defineState(INITIAL_STATE)("cartProductsReducers");
const cartItem = (state, action) => {
  switch (action.type) {
    case actionsTypes.CART_PRODUCTS_ADD:
      return { id: action.id, product: action.payload, qty: action.qty };
    case "REMOVE_FROM_CART":
      return state.name !== action.name;
    case "UPDATE_CART_ITEM":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        qty: state.qty + 1,
      };
    default:
      return state;
  }
};

const cartProductsReducers = (state = storageState, action) => {
  switch (action.type) {
    case actionsTypes.CART_PRODUCTS_ADD:
      return {
        ...state,
        cartProducts: [...state.cartProducts, cartItem(state, action)],
      };
    case "REMOVE_FROM_CART":
      return state.filter((item) => cartItem(item, action));
    case "UPDATE_CART_ITEM":
      return {
        cartProducts: state.cartProducts.map((item) => cartItem(item, action)),
      };

    default:
      return state;
  }
};
 */
