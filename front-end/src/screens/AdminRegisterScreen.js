import React, { useState, useEffect } from "react";
import { register, clear } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function AdminRegisterScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");

  const userReducer = useSelector((state) => state.userReducer);
  const { loading, error, userInfo } = userReducer;

  useEffect(() => {
    if (userInfo?.isAdmin) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(clear());
    }
  }, [userInfo, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, password, adminCode));
  };

  return (
    <div className="row">
      <div className="col-9 col-md-7 col-lg-6 mx-auto text-capitalize formdesign">
        <h4 className="text-center">Admin register</h4>
        {loading && <>loading...</>}
        {error && <div>{error}</div>}
        <form>
          <div className="inputdesign">
            <label htmlFor="">user name</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="enter your user name"
              name="username"
              required
            />
          </div>
          <div className="inputdesign">
            <label htmlFor="">password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="enter your password"
              name="password"
              required
            />
          </div>
          <div className="inputdesign">
            <label htmlFor="">admin code</label>
            <input
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              type="password"
              placeholder="enter admin code"
              name="adminCode"
            />
          </div>
          <button onClick={handleSubmit} type="submit" className="buttondesign">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegisterScreen;
