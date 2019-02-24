import { combineReducers } from 'redux';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducers';

export default combineReducers({
  product: productReducer,
  order: orderReducer,
  auth: authReducer
});
