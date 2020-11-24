import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import StarsRate from "../components/StarsRate";
import { BiFileFind } from "react-icons/bi";
import { useHistory } from "react-router-dom";

function HomeScreen() {
  const history = useHistory();
  const [input, setInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?s=${input}`);

    setInput("");
  };

  return (
    <>
      <section
        id="quicklySearch"
        className="d-flex justify-content-center align-items-center text-center"
      >
        <div>
          <div className="text-uppercase text-white word">quickly search</div>
          <form>
            <div className="searching d-flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
              />

              <div className="d-flex justify-content-center align-items-center">
                <button onClick={(e) => handleSearch(e)} type="submit">
                  <BsSearch />
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section id="aboutus">
        <div className="container">
          <div className="introduce">
            <div className="text-capitalize about">about us</div>

            <div className="row align-items-center">
              <div className="col-md-6 text-center order-md-2 py-3">
                <div className="px-3">
                  We build a functioning human reputation score webpage
                </div>
              </div>
              <div className="col-md-6 py-3 order-md-1 text-center star">
                <StarsRate stars={3.5} />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-6 text-center order-md-3 py-3">
                <div className="px-3">
                  We help to find the person you are dealing with
                </div>
              </div>
              <div className="col-md-6 py-3 order-md-4 text-center">
                <BiFileFind style={{ fontSize: "70px", color: "blue" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeScreen;
