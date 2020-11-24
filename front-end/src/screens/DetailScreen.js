import React, { useState, useEffect, useRef } from "react";
import { StarsRate, FormRating } from "../components";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  detailIndividual,
  deleteIndividual,
  individualDoneChangeDir,
} from "../actions/individualActions";
import { ratePost, rateEdit, rateDelete } from "../actions/rateActions";

import { useSelector, useDispatch } from "react-redux";

function DetailScreen() {
  const box = useRef(null);
  const rating = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [person, setPerson] = useState("");

  const {
    loading,
    error,
    individual,
    loading: loadingDelete,
    error: errorDelete,
    message,
  } = useSelector((state) => state.individualReducer);

  const { updatedIndividual } = useSelector((state) => state.rateReducer);

  const { userInfo } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (individual) {
      setPerson(individual);
    }
  }, [individual]);

  useEffect(() => {
    if (updatedIndividual) {
      setPerson(updatedIndividual);
    }
  }, [updatedIndividual]);

  useEffect(() => {
    dispatch(detailIndividual(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (message) {
      dispatch(individualDoneChangeDir());
      history.push("/search");
    }
  }, [message, dispatch, history]);

  const handleDelete = (individualId) => {
    dispatch(deleteIndividual(individualId));
    box.current.style.display = "none";
  };

  const handleRate = (e, individualId, rating, text) => {
    e.preventDefault();
    dispatch(ratePost(individualId, rating, text));
  };
  const handleRateEdit = (e, rateId, rating, text, individualId) => {
    e.preventDefault();
    dispatch(rateEdit(rateId, rating, text, individualId));
    box.current.style.display = "none";
  };
  const handleRateDelete = (rateId, individualId) => {
    dispatch(rateDelete(rateId, individualId));
  };
  const showRate = () => {
    rating.current.scrollIntoView({ behavior: "smooth" });
  };
  const showEditForm = () => {
    box.current.style.display = "block";
  };
  const closeEditForm = () => {
    box.current.style.display = "none";
  };

  return (
    <>
      {loading ? (
        <div>loading ...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section className="detail">
          <div className="container py-4">
            <div className="row top">
              <div className="col-6 px-3">
                <div className="mr-3 px-3">
                  <img
                    src={
                      person?.image
                        ? `http://localhost:8000/${person.image}`
                        : ""
                    }
                    alt={person?.name}
                    width="100%"
                    id="hinh"
                  />
                  {userInfo?.isAdmin && (
                    <div className="d-flex add">
                      <Link to={`/individual/${person?._id}/edit`}>Edit</Link>

                      <button onClick={() => handleDelete(person?._id)}>
                        Delete
                      </button>
                      {loadingDelete && <div>loading ...</div>}
                      {errorDelete && <div>{errorDelete}</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* summary info of individual */}
              <div className="col-6 ">
                <div className="rate__information px-2 bg-white border border-secondary">
                  <div>Name: {person?.name}</div>
                  <hr />
                  <div>Description: {person?.description}</div>
                  <hr />
                  {person?.rates?.length === 0 && <div>No rates yet</div>}
                  {person?.rates?.length !== 0 && (
                    <>
                      {person?.rates?.length === 1 && <span>1 rating</span>}
                      {person?.rates?.length > 1 && (
                        <span>{person?.rates?.length} ratings</span>
                      )}
                      <span>
                        {"  "}({" "}
                        {(
                          person?.rates?.reduce(
                            (int, currentValue) =>
                              parseInt(int + currentValue.rating),
                            [0]
                          ) / person?.rates?.length
                        ).toFixed(2)}
                        / 5 stars)
                      </span>

                      <StarsRate
                        stars={
                          person?.rates?.reduce(
                            (int, currentValue) =>
                              parseInt(int + currentValue.rating),
                            [0]
                          ) / person?.rates?.length
                        }
                      />
                    </>
                  )}
                  <hr />
                </div>
              </div>

              <div className="bg-white detail__rate col-9 my-2 p-3">
                {userInfo !== null &&
                  person?.rates?.find(
                    (rate) => rate.author?._id === userInfo?._id
                  ) && (
                    <div
                      onClick={showRate}
                      className="rate btn__rate text-center p-2 mb-2"
                    >
                      View your rate
                    </div>
                  )}
                {userInfo &&
                  !person?.rates?.find(
                    (rate) => rate.author?._id === userInfo._id
                  ) && (
                    <div className="parentTextarea">
                      <FormRating
                        individualId={person?._id}
                        handleRateSubmit={handleRate}
                      />
                    </div>
                  )}

                {person?.rates?.length !== 0 && (
                  <>
                    {person?.rates?.map((rate) => (
                      <div key={rate._id}>
                        <hr />
                        <div className="row">
                          <div className="col-4">
                            <div>Rate by {rate.author?.username} </div>
                            <div>
                              <em>{new Date(rate.updatedAt).toDateString()}</em>
                            </div>
                            <div>{rate.rating} out of 5</div>
                          </div>
                          <div className="col-8">
                            <div>{rate.text}</div>

                            {userInfo?._id === rate.author._id && (
                              <div
                                ref={rating}
                                className="d-flex justify-content-end adjustRate"
                              >
                                <div className="editBtn">
                                  <button
                                    onClick={showEditForm}
                                    className="blue"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div>
                                  <button
                                    onClick={() =>
                                      handleRateDelete(rate?._id, id)
                                    }
                                  >
                                    delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <br />
                        {userInfo !== null && userInfo._id === rate.author._id && (
                          <div
                            ref={box}
                            style={{
                              display: "none",
                            }}
                          >
                            <div className="d-flex justify-content-between">
                              <p>Edit your rating</p>
                              <p onClick={closeEditForm} className="cursor">
                                Close
                              </p>
                            </div>

                            <FormRating
                              individualId={id}
                              rateId={rate?._id}
                              preRate={rate?.rating}
                              preText={rate?.text}
                              handleRateSubmit={handleRate}
                              handleRateEdit={handleRateEdit}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default DetailScreen;
