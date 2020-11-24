import React from "react";
import { Link } from "react-router-dom";
import StarsRate from "./StarsRate";

function Each({ individual, top }) {
  return (
    <div key={individual._id} className="col-10 mx-auto my-3 col-md-6 col-lg-4">
      <div className={top ? "top__rated" : `singleRating bg-white mt-4`}>
        <div className="imgContainer">
          <Link to={`/individual/${individual._id}`}>
            <img
              src={
                individual.image
                  ? `http://localhost:8000/${individual.image}`
                  : ""
              }
              alt={individual.name}
              style={{ width: "100%" }}
            />
          </Link>
        </div>
        <div>
          {individual.rates.length === 0 && (
            <div className="text-center">No ratings yet</div>
          )}

          <div className="text-center">
            {individual.rates.length > 0 && (
              <StarsRate
                stars={
                  individual?.rates.reduce(
                    (int, currentValue) => parseInt(int + currentValue.rating),
                    [0]
                  ) / individual?.rates.length
                }
              />
            )}
            <div>
              <small>
                Updated at: {new Date(individual.updatedAt).toUTCString()}
              </small>
            </div>
          </div>

          <div className="p-2">
            <div>{individual.name}</div>
            <div>{individual.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Each;
