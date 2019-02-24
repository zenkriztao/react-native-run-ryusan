import {
  GET_USER_PENDING,
  GET_USER_REJECTED,
  GET_USER_FULFILLED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  GET_USER
} from '../actions/types';

const initialState = {
  user: {},
  error_message: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isLoading: true,
        user: action.payload
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        error_message: action.payload
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case USER_REGISTER_ERROR:
      return {
        ...state,
        error_message: action.payload
      };

    default:
      return state;
  }
};
