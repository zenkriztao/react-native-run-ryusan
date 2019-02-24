import axios from 'axios';
import { REST_API } from '../../../utils/constants';
import { GET_PRODUCTS, GET_PRODUCT } from '../actions/types';

// Actions
export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: axios.get(`${REST_API}/products`)
  };
};

export const getProduct = id => {
  return {
    type: GET_PRODUCT,
    payload: axios.get(`${REST_API}/product/${id}`)
  };
};
