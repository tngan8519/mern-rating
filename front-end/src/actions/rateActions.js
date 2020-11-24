import {
  RATE_POST_REQUEST,
  RATE_POST_SUCCESS,
  RATE_POST_FAIL,
  RATE_EDIT_REQUEST,
  RATE_EDIT_SUCCESS,
  RATE_EDIT_FAIL,
  RATE_DELETE_REQUEST,
  RATE_DELETE_SUCCESS,
  RATE_DELETE_FAIL,
} from "../constants/rateConstants";

import Axios from "../axios";

export const ratePost = (individualId, rating, text) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: RATE_POST_REQUEST,
    action: { individualId: individualId, rating: rating, text: text },
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/rate",
      { individualId: individualId, rating: rating, text: text },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: RATE_POST_SUCCESS,
      payload: { rate: data.rate, updatedIndividual: data.updatedIndividual },
    });
  } catch (error) {
    dispatch({
      type: RATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const rateEdit = (rateId, rating, text, individualId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: RATE_EDIT_REQUEST,
    action: {
      ratelId: rateId,
      rating: rating,
      text: text,
      individualId: individualId,
    },
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/rate/${rateId}`,
      {
        rateId: rateId,
        rating: rating,
        text: text,
        individualId: individualId,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: RATE_EDIT_SUCCESS,
      payload: {
        rate: data.rate,
        updatedIndividual: data.updatedIndividual,
        message: data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: RATE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const rateDelete = (rateId, individualId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: RATE_DELETE_REQUEST,
    payload: { rateId: rateId, individualId: individualId },
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/rate/${rateId}`, {
      data: {
        isAdmin: userInfo.isAdmin,
        rateId: rateId,
        individualId: individualId,
      },
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: RATE_DELETE_SUCCESS,
      payload: {
        message: data.message,
        updatedIndividual: data.updatedIndividual,
      },
    });
  } catch (error) {
    dispatch({
      type: RATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
