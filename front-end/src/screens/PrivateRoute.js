import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const { userInfo } = useSelector((state) => state.userReducer);

  return (
    <Route
      {...rest}
      render={() => {
        return userInfo?.isAdmin ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
}

export default PrivateRoute;
