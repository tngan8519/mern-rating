import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducers";
import { individualReducer } from "./reducers/individualReducers";
import { rateReducer } from "./reducers/rateReducers";

const initialState = {
  userReducer: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userReducer: userReducer,
  individualReducer: individualReducer,
  rateReducer: rateReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
