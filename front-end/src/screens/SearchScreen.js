import React, { useState, useEffect } from "react";
import { Each } from "../components";
import { individualBrowse } from "../actions/individualActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchScreen(props) {
  const history = useHistory();
  const search = props.location.search.split("=")[1];
  const [searchName, setSearchName] = useState("");
  const [selection, setSelection] = useState("");
  const [foundByName, setFoundByName] = useState("");
  const [foundBySelect, setFoundBySelect] = useState("");

  const { loading, error, individuals } = useSelector(
    (state) => state.individualReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(individualBrowse());
  }, [dispatch]);

  useEffect(() => {
    if (search && individuals) {
      setFoundByName(
        individuals.filter((each) => each.name.indexOf(search) !== -1)
      );
    }
  }, [individuals, search]);

  useEffect(() => {
    let newIndividuals = individuals ? [...individuals] : null;
    if (newIndividuals) {
      for (let i = 0; i < newIndividuals.length; i++) {
        if (newIndividuals[i].rates.length >= 2) {
          newIndividuals[i].stars =
            newIndividuals[i].rates.reduce(
              (int, currentValue) => parseInt(int + currentValue.rating),
              [0]
            ) / newIndividuals[i].rates.length;
        } else if (newIndividuals[i].rates.length === 1) {
          newIndividuals[i].stars = newIndividuals[i].rates[0].rating;
        } else {
          newIndividuals[i].stars = 0;
        }
      }
    }

    switch (selection) {
      case "highestRate":
        setFoundBySelect(
          newIndividuals?.sort((indA, indB) => indB.stars - indA.stars)
        );

        break;
      case "lowestRate":
        setFoundBySelect(
          newIndividuals?.sort((indA, indB) => indA.stars - indB.stars)
        );
        break;
      case "newest":
        setFoundBySelect(
          newIndividuals?.sort(
            (indA, indB) => new Date(indA.updatedAt) - new Date(indB.updatedAt)
          )
        );
        break;
      case "oldest":
        setFoundBySelect(
          newIndividuals?.sort(
            (indA, indB) => new Date(indB.updatedAt) - new Date(indA.updatedAt)
          )
        );
        break;
      case "abc":
        setFoundBySelect(
          newIndividuals?.sort((indA, indB) =>
            indA.name.localeCompare(indB.name)
          )
        );
        break;
      case "z":
        setFoundBySelect(
          newIndividuals?.sort((indA, indB) =>
            indB.name.localeCompare(indA.name)
          )
        );
        break;
      case "":
        setFoundBySelect("");
        break;
      default:
        setFoundBySelect("");
    }
  }, [selection, individuals]);

  const handleSelect = (e) => {
    setSelection(e.target.value);
    setFoundByName("");

    history.push("/search");
  };

  const handleReset = (e) => {
    e.preventDefault();
    history.push("/search");

    setFoundByName("");
  };

  const handleSearchName = (e) => {
    e.preventDefault();
    history.push(`/search?s=${searchName}`);

    setSearchName("");
    setSelection("");
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section id="showSearching">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="p-4 bg-white">
                  <h4>Find by name</h4>
                  <form onSubmit={(e) => handleSearchName(e)}>
                    <input
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      type="text"
                      placeholder="type name ..."
                    />
                  </form>
                </div>
              </div>
              <div className="col-md-5">
                <div className="p-4 bg-white">
                  <h4>Sort</h4>
                  <form>
                    <select value={selection} onChange={(e) => handleSelect(e)}>
                      <option value="">-- select --</option>
                      <option value="highestRate">
                        Rating (highest first)
                      </option>
                      <option value="lowestRate">Rating (lowest first)</option>
                      <option value="newest">Date (newest first)</option>
                      <option value="oldest">Date (oldest first)</option>
                      <option value="abc">Name (ascending)</option>
                      <option value="z">Name (descending)</option>
                    </select>
                  </form>
                </div>
              </div>
              <div className="col-md-2">
                <form>
                  <button onClick={(e) => handleReset(e)} type="submit">
                    All Individual
                  </button>
                </form>
              </div>

              {!foundByName &&
                !foundBySelect &&
                individuals?.map((individual) => (
                  <Each key={individual._id} individual={individual} />
                ))}
              {foundByName &&
                foundByName.map((individual) => (
                  <Each key={individual._id} individual={individual} />
                ))}

              {foundBySelect &&
                foundBySelect.map((individual) => (
                  <Each key={individual._id} individual={individual} />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SearchScreen;
