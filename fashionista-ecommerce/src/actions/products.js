import { actionsTypes } from "../constants/products";
import api from "../services/api";

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: actionsTypes.PRODUCTS_FETCH_LOADING });
    api().then(
      (response) =>
        dispatch({
          type: actionsTypes.PRODUCTS_FETCH_SUCESS,
          payload: response.data,
        }),
      (error) =>
        dispatch({
          type: actionsTypes.PRODUCTS_FETCH_ERROR,
          error: error.messages || "Unexpected Error!",
        })
    );
  };
};

export const onInputChange = (searchName) => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.PRODUCTS_CHANGE_SEARCH_NAME,
      payload: {
        searchName: searchName,
      },
    });
  };
};

export const filterProducts = (products, name) => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.PRODUCTS_FILTER_BY_NAME,
      payload: {
        items: products?.filter(
          (item) =>
            item.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(name.toLowerCase()) >= 0
        ),
      },
    });
  };
};

export const onSelectSize = (size) => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.PRODUCTS_SELECTED_SIZE,
      payload: {
        size: size,
      },
    });
  };
};

export const showAddCartAlert = () => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.SHOW_ADD_CART_ALERT,
    });
  };
};

export const hideAddCartAlert = () => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.HIDE_ADD_CART_ALERT,
    });
  };
};
