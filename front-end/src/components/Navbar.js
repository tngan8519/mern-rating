import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const [slidedown, setSlidedown] = useState(false);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleNav = () => {
    if (slidedown) {
      setSlidedown(false);
    } else {
      setSlidedown(true);
    }
  };
  return (
    <nav className="nav">
      <div className="nav__title">
        <Link to="/">
          <div>hype.you.up</div>
        </Link>
        <div onClick={handleNav} className="nav__icon">
          <AiOutlineMenu />
        </div>
      </div>

      <div className={`nav__route ${slidedown && "open"}`}>
        <Link to="/search">search</Link>
        {!userInfo && <Link to="/register">register</Link>}

        {userInfo?.isAdmin && <Link to="/create-individual">post</Link>}

        {userInfo && (
          <>
            <Link to="#"> Hello {userInfo.username}</Link>
            <Link to="#" onClick={handleLogout}>
              logout
            </Link>
          </>
        )}

        {!userInfo && <Link to="/login">login</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
