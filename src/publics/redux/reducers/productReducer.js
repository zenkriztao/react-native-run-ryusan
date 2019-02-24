import {
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_REJECTED,
  GET_PRODUCTS_FULFILLED,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_REJECTED,
  GET_PRODUCT_FULFILLED
} from '../actions/types';

const initialState = { products: [], product: {}, isLoading: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case GET_PRODUCTS_REJECTED:
      return {
        ...state,
        isLoading: false
      };

    case GET_PRODUCTS_FULFILLED:
      return {
        ...state,
        products: action.payload.data,
        isLoading: false
      };

    case GET_PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case GET_PRODUCT_REJECTED:
      return {
        ...state,
        isLoading: false
      };

    case GET_PRODUCT_FULFILLED:
      return {
        ...state,
        product: action.payload.data,
        isLoading: false
      };

    default:
      return state;
  }
}
