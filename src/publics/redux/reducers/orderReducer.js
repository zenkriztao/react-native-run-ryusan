import {
  GET_ORDERS_PENDING,
  GET_ORDERS_REJECTED,
  GET_ORDERS_FULFILLED,
  CREATE_ORDER,
  UPDATE_ORDER_PENDING,
  UPDATE_ORDER_REJECTED,
  UPDATE_ORDER_FULFILLED,
  DELETE_ORDER_PENDING,
  DELETE_ORDER_REJECTED,
  DELETE_ORDER_FULFILLED,
  DELETE_ORDER,
  INC_ORDER_QTY,
  DEC_ORDER_QTY,
  UPDATE_TOTAL_PRICE,
  UPDATE_COURIER,
  UPDATE_TOTAL_PRICE_ORDER,
  CREATE_CUSTOMER
} from '../actions/types';

const initialState = {
  orders: [],
  isLoading: false,
  message: '',
  totalPrice: 0,
  totalPriceOrders: 0,
  customer: {
    name: '',
    email: '',
    tlp: '',
    city: '',
    prov: '',
    street: ''
  },
  couriers: [
    { name: 'J&T REG', price: 1000 },
    { name: 'JNE REG', price: 1300 },
    { name: 'JNE YES', price: 3000 },
    { name: 'SiCepat REG', price: 2000 },
    { name: 'SiCepat YES', price: 4000 }
  ],
  courier: { name: 'J&T REG', price: 1000 }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case GET_ORDERS_REJECTED:
      return {
        ...state,
        isLoading: false
      };

    case GET_ORDERS_FULFILLED:
      return {
        ...state,
        orders: action.payload.data,
        isLoading: false
      };

    case CREATE_ORDER:
      let productInStateOrders = state.orders.find(
        m => m.id === action.payload.data.id
      );

      if (productInStateOrders)
        return {
          ...state,
          message: action.payload.status
        };

      return {
        ...state,
        orders: [action.payload.data, ...state.orders],
        message: action.payload.status
      };

    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          order => order.id !== action.payload.order.id
        )
      };

    case INC_ORDER_QTY:
      let orders = [...state.orders];
      let index = orders.indexOf(action.payload.product);
      let currentQuantity = state.orders[index].qty;
      orders[index].qty = currentQuantity + 1;
      orders[index].price =
        action.payload.product.products.price * (currentQuantity + 1);

      return {
        ...state,
        orders
      };

    case DEC_ORDER_QTY:
      orders = [...state.orders];
      index = orders.indexOf(action.payload.product);
      currentQuantity = state.orders[index].qty;
      qty = currentQuantity <= 1 ? 1 : currentQuantity - 1;

      orders[index].qty = qty;
      orders[index].price = action.payload.product.products.price * qty;

      return {
        ...state,
        orders
      };

    case CREATE_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };

    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload
      };

    case UPDATE_TOTAL_PRICE_ORDER:
      return {
        ...state,
        totalPriceOrders: action.payload
      };

    case UPDATE_COURIER:
      return {
        ...state,
        courier: action.payload
      };

    default:
      return state;
  }
}
