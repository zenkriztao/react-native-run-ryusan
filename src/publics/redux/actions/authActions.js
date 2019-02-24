import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { REST_API } from '../../../utils/constants';
// Actions
import {
  GET_USER,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR
} from './types';

export const getUser = () => async dispatch => {
  let token = await AsyncStorage.getItem('userData');

  if (token) {
    const res = await axios.get(`${REST_API}/user/profile`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    });

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  }
};

export const loginUser = userData => async dispatch => {
  const res = await axios.post(`${REST_API}/auth/login`, userData);

  if (!res.data.error) {
    _storeData(res.data.token);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data
    });
  } else {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: res.data
    });
  }
};

export const registerUser = userdata => async dispatch => {
  const res = await axios.post(`${REST_API}/auth/register`, userdata);
  alert(JSON.stringify(res.data.token));

  if (!res.data.error) {
    _storeData(res.data.token);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data.token
    });
  } else {
    dispatch({
      type: USER_REGISTER_ERROR,
      payload: res.data
    });
  }
};

const _storeData = async userData => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    // Error saving data
  }
};

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    return value;
  } catch (error) {
    // Error retrieving data
  }
};
