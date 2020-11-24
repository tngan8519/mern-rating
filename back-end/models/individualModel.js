import mongoose from "mongoose";

const individualSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rate",
      },
    ],
  },
  { timestamps: true }
);

const Individual = mongoose.model("Individual", individualSchema);

export default Individual;
