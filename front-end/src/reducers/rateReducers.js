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

export const rateReducer = (state = {}, action) => {
  switch (action.type) {
    case RATE_POST_REQUEST:
      return { loading: true };
    case RATE_POST_SUCCESS:
      return {
        loading: false,
        rate: action.payload.rate,
        updatedIndividual: action.payload.updatedIndividual,
      };
    case RATE_POST_FAIL:
      return { loading: false, error: action.payload };
    case RATE_EDIT_REQUEST:
      return { loading: true };
    case RATE_EDIT_SUCCESS:
      return {
        loading: false,
        rate: action.payload.rate,
        updatedIndividual: action.payload.updatedIndividual,
        message: action.payload.message,
      };
    case RATE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case RATE_DELETE_REQUEST:
      return { loading: true };
    case RATE_DELETE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
        updatedIndividual: action.payload.updatedIndividual,
      };
    case RATE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
