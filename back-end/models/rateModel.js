import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Individual",
    },
  },
  {
    timestamps: true,
  }
);

const Rate = mongoose.model("Rate", rateSchema);

export default Rate;
