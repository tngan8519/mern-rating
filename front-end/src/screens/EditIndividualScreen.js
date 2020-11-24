import React, { useState, useEffect } from "react";
import {
  detailIndividual,
  editIndividual,
  individualUploadImage,
  individualDoneChangeDir,
} from "../actions/individualActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "../axios";

function EditIndividualScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const history = useHistory();

  const { individual, loading, error, success, src } = useSelector(
    (state) => state.individualReducer
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [fileUpload, setFileUpload] = useState("");

  useEffect(() => {
    if (individual) {
      setName(individual.name);
      setDescription(individual.description);
    }
  }, [individual]);

  useEffect(() => {
    dispatch(detailIndividual(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      dispatch(individualDoneChangeDir());
      history.push(`/individual/${id}`);
    }
  }, [success, dispatch, history, id]);

  useEffect(() => {
    setFileUpload(src);
  }, [src]);
  const handleFile = (e) => {
    if (fileUpload) {
      axios
        .post("/api/individual/deleteImage", { fileName: fileUpload })
        .then((response) => console.log(response));
    }

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(individualUploadImage(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editIndividual(id, name, fileUpload, description));
  };

  return (
    <div className="row">
      <div className="col-9 col-sm-6 col-md-7 col-lg-6 mx-auto text-capitalize formdesign">
        <h4 className="text-center">edit individual {individual?.name}</h4>
        {loading && <>loading...</>}
        {error && <div>{error}</div>}
        <form>
          <div className="inputdesign">
            <label htmlFor="">name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <img
            src={
              individual?.image
                ? `http://localhost:8000/${individual.image}`
                : ""
            }
            alt=""
            className="post__img"
          />
          <div className="inputdesign">
            <label htmlFor="pic">file</label>
            <input type="file" onChange={handleFile} id="pic" />
          </div>
          {fileUpload && (
            <img
              src={fileUpload ? `http://localhost:8000/${fileUpload}` : ""}
              className="post__img"
              alt=""
            />
          )}
          <div className="inputdesign">
            <label htmlFor="">description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
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

export default EditIndividualScreen;
