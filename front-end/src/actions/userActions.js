import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  CLEAR,
} from "../constants/userConstants";
import Axios from "../axios";

export const register = (username, password, adminCode) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { username: username, password: password, adminCode: adminCode },
  });
  try {
    const { data } = await Axios.post("/api/users/register", {
      username: username,
      password: password,
      adminCode: adminCode,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signIn = (username, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { username: username, password: password },
  });
  try {
    const { data } = await Axios.post("/api/users/signin", {
      username: username,
      password: password,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = () => async (dispatch) => {
  dispatch({
    type: USER_SIGNOUT,
  });
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
};

export const clear = () => async (dispatch) => {
  dispatch({ type: CLEAR });
};
