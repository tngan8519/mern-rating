import {
  INDIVIDUAL_BROWSE_REQUEST,
  INDIVIDUAL_BROWSE_SUCCESS,
  INDIVIDUAL_BROWSE_FAIL,
  INDIVIDUAL_DETAIL_REQUEST,
  INDIVIDUAL_DETAIL_SUCCESS,
  INDIVIDUAL_DETAIL_FAIL,
  INDIVIDUAL_POST_REQUEST,
  INDIVIDUAL_POST_SUCCESS,
  INDIVIDUAL_POST_FAIL,
  INDIVIDUAL_EDIT_REQUEST,
  INDIVIDUAL_EDIT_SUCCESS,
  INDIVIDUAL_EDIT_FAIL,
  INDIVIDUAL_DELETE_REQUEST,
  INDIVIDUAL_DELETE_SUCCESS,
  INDIVIDUAL_DELETE_FAIL,
  INDIVIDUAL_IMAGE_UPLOAD,
  INDIVIDUAL_IMAGE_UPLOAD_FAIL,
  INDIVIDUAL_DONE_CHANGE_DIR,
} from "../constants/individualConstants";

import Axios from "../axios";

export const individualBrowse = () => async (dispatch) => {
  dispatch({
    type: INDIVIDUAL_BROWSE_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/individual");
    dispatch({
      type: INDIVIDUAL_BROWSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_BROWSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailIndividual = (id) => async (dispatch) => {
  dispatch({
    type: INDIVIDUAL_DETAIL_REQUEST,
    payload: id,
  });
  try {
    const { data } = await Axios.get(`/api/individual/${id}`);
    dispatch({
      type: INDIVIDUAL_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const individualPost = (name, fileUpload, description) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: INDIVIDUAL_POST_REQUEST,
    action: { name, fileUpload, description },
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/individual",
      { name, image: fileUpload, description, isAdmin: userInfo.isAdmin },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: INDIVIDUAL_POST_SUCCESS,
      payload: data.INDIVIDUAL,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editIndividual = (id, name, fileUpload, description) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: INDIVIDUAL_EDIT_REQUEST,
    payload: id,
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/individual/${id}`,
      { name, image: fileUpload, description, isAdmin: userInfo.isAdmin },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: INDIVIDUAL_EDIT_SUCCESS,
      payload: data.individual,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteIndividual = (id) => async (dispatch, getState) => {
  dispatch({
    type: INDIVIDUAL_DELETE_REQUEST,
    payload: id,
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/individual/${id}`, {
      data: {
        isAdmin: userInfo.isAdmin,
      },
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: INDIVIDUAL_DELETE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const individualUploadImage = (formData) => async (dispatch) => {
  try {
    const response = await Axios.post("/api/individual/uploadImage", formData, {
      header: { "content-type": "multipart/form-data" },
    });
    if (response.data.success) {
      dispatch({
        type: INDIVIDUAL_IMAGE_UPLOAD,
        payload: response.data.image,
      });
    }
  } catch (error) {
    dispatch({
      type: INDIVIDUAL_IMAGE_UPLOAD_FAIL,
      payload: "Failed to save the Image in Server",
    });
  }
};

export const individualDoneChangeDir = () => async (dispatch) => {
  dispatch({ type: INDIVIDUAL_DONE_CHANGE_DIR });
};
