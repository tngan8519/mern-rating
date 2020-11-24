import React, { useState } from "react";

function FormRating({
  individualId,
  rateId,
  handleRateSubmit,
  preRate,
  preText,
  handleRateEdit,
}) {
  const initialRate = preRate ? preRate.toString() : "0";
  const initialText = preText ? preText : "";

  const [rating, setRating] = useState(initialRate);
  const [text, setText] = useState(initialText);

  return (
    <form>
      <fieldset className="starability-basic">
        <input
          onChange={(e) => setRating(e.target.value)}
          checked={rating === "0"}
          type="radio"
          id="no-rate"
          className="input-no-rate"
          name="rating"
          value="0"
          aria-label="No rating."
        />
        <input
          onChange={(e) => setRating(e.target.value)}
          checked={rating === "1"}
          type="radio"
          id="first-rate1"
          name="rating"
          value="1"
        />
        <label htmlFor="first-rate1" title="Terrible">
          1 star
        </label>
        <input
          onChange={(e) => setRating(e.target.value)}
          checked={rating === "2"}
          type="radio"
          id="first-rate2"
          name="rating"
          value="2"
        />
        <label htmlFor="first-rate2" title="Not good">
          2 stars
        </label>
        <input
          onChange={(e) => setRating(e.target.value)}
          checked={rating === "3"}
          type="radio"
          id="first-rate3"
          name="rating"
          value="3"
        />
        <label htmlFor="first-rate3" title="Average">
          3 stars
        </label>
        <input
          onChange={(e) => setRating(e.target.value)}
          checked={rating === "4"}
          type="radio"
          id="first-rate4"
          name="rating"
          value="4"
        />
        <label htmlFor="first-rate4" title="Very good">
          4 stars
        </label>
        <input
          onChange={(e) => setRating(e.target.value)}
          checked={rating === "5"}
          type="radio"
          id="first-rate5"
          name="rating"
          value="5"
        />
        <label htmlFor="first-rate5" title="Amazing">
          5 stars
        </label>
      </fieldset>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        id=""
        rows="7"
        style={{ resize: "none", width: "100%" }}
        placeholder={preText ? "" : "write your rating ..."}
      ></textarea>
      {!preRate && !preText && (
        <button
          onClick={(e) => handleRateSubmit(e, individualId, rating, text)}
          className="buttondesign"
        >
          submit
        </button>
      )}
      {preRate && preText && (
        <button
          onClick={(e) => handleRateEdit(e, rateId, rating, text, individualId)}
          className="buttondesign"
        >
          submit
        </button>
      )}
    </form>
  );
}

export default FormRating;
