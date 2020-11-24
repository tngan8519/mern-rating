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

export const individualReducer = (state = {}, action) => {
  switch (action.type) {
    case INDIVIDUAL_BROWSE_REQUEST:
      return { loading: true };
    case INDIVIDUAL_BROWSE_SUCCESS:
      return { loading: false, individuals: action.payload };
    case INDIVIDUAL_BROWSE_FAIL:
      return { loading: false, error: action.payload };
    case INDIVIDUAL_DETAIL_REQUEST:
      return { loading: true };
    case INDIVIDUAL_DETAIL_SUCCESS:
      return { loading: false, individual: action.payload };
    case INDIVIDUAL_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case INDIVIDUAL_POST_REQUEST:
      return { loading: true };
    case INDIVIDUAL_POST_SUCCESS:
      return { loading: false, individual: action.payload, success: true };
    case INDIVIDUAL_POST_FAIL:
      return { loading: false, error: action.payload };
    case INDIVIDUAL_EDIT_REQUEST:
      return { loading: true };
    case INDIVIDUAL_EDIT_SUCCESS:
      return { loading: false, individual: action.payload, success: true };
    case INDIVIDUAL_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case INDIVIDUAL_DELETE_REQUEST:
      return { loading: true };
    case INDIVIDUAL_DELETE_SUCCESS:
      return { loading: false, message: action.payload, success: true };
    case INDIVIDUAL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case INDIVIDUAL_IMAGE_UPLOAD:
      return { ...state, src: action.payload };
    case INDIVIDUAL_IMAGE_UPLOAD_FAIL:
      return { message: action.payload };
    case INDIVIDUAL_DONE_CHANGE_DIR:
      return {};
    default:
      return state;
  }
};
