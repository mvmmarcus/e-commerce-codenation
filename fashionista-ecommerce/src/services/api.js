import axios from 'axios';

const baseUrl = "https://mvmmarcus.github.io/api-products-codenation/products.json";

export default function api () {
  return axios.get(baseUrl)
}



/*import axios from "axios";

import { actionsTypes } from "../constants/products";

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: actionsTypes.PRODUCTS_FETCH_LOADING });

    axios
      .get("https://mvmmarcus.github.io/api-products-codenation/products.json")
      .then(
        (response) =>
          dispatch({
            type: actionsTypes.PRODUCTS_FETCH_SUCESS,
            payload: response.data,
          }),
        (error) =>
          dispatch({
            type: actionsTypes.PRODUCTS_FETCH_ERROR,
            error: error.message || "Unexpected Error!!!",
          })
      );
  };
};
*/
/*import axios from "axios";

export const fetchProducts = () => {
  return axios.get("https://mvmmarcus.github.io/api-products-codenation/products.json").then(response => response.data)
}*/
