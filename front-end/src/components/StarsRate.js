import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function StarsRate({ stars }) {
  let rows = [];
  for (let i = 0; i < Math.floor(stars); i++) {
    rows.push(<BsStarFill key={i} />);
  }
  if (stars % 1 !== 0) {
    rows.push(<BsStarHalf key={"odd"} />);
  }
  for (let i = 0; i < 5 - Math.ceil(stars); i++) {
    rows.push(<BsStar key={5 - i} />);
  }
  return <div className="star">{rows}</div>;
}

export default StarsRate;
