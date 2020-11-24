import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Individual from "../models/individualModel.js";
import Rate from "../models/rateModel.js";
import expressAsyncHandler from "express-async-handler";
import { isLoggedIn, upload } from "../utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rateRouter = express.Router();

rateRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const individual = await Individual.findById(req.params.id)
      .populate({ path: "rates", populate: { path: "author individual" } })
      .populate("author");

    if (individual) {
      res.send(individual);
    } else {
      res.status(404).send({ message: "Individual not found" });
    }
  })
);

rateRouter.post(
  "/",
  isLoggedIn,
  expressAsyncHandler(async (req, res) => {
    const rate = new Rate({
      rating: req.body.rating,
      text: req.body.text,
      author: req.user,
      individual: req.body.individualId,
    });

    const createdRate = await rate.save();

    const individual = await Individual.findByIdAndUpdate(
      req.body.individualId,
      {
        $push: { rates: createdRate._id },
      },
      { new: true }
    )
      .populate({ path: "rates", populate: { path: "author individual" } })
      .populate("author");
    res.status(201).send({
      message: "New rate created",
      rate: createdRate,
      updatedIndividual: individual,
    });
  })
);

rateRouter.put(
  "/:id",
  isLoggedIn,
  expressAsyncHandler(async (req, res) => {
    const rate = await Rate.findById(req.params.id);
    if (rate) {
      rate.rating = req.body.rating;
      rate.text = req.body.text;

      const updatedRate = await rate.save();

      const individual = await Individual.findById(req.body.individualId)
        .populate({ path: "rates", populate: { path: "author individual" } })
        .populate("author");
      if (individual) {
        res.send({
          message: "Rate is updated succesfully",
          rate: updatedRate,
          updatedIndividual: individual,
        });
      } else {
        res.status(404).send({ message: "Individual not found" });
      }
    } else {
      res.status(404).send({ message: "Rate not found" });
    }
  })
);

rateRouter.delete(
  "/:id",
  isLoggedIn,
  expressAsyncHandler(async (req, res) => {
    const rate = await Rate.findById(req.params.id);
    if (rate) {
      await rate.deleteOne();

      const individual = await Individual.findByIdAndUpdate(
        req.body.individualId,
        {
          $pull: { rates: req.params.id },
          new: true,
        }
      )
        .populate({ path: "rates", populate: { path: "author individual" } })
        .populate("author");

      if (individual) {
        res.send({ message: "Rate is deleted", updatedIndividual: individual });
      } else {
        res
          .status(404)
          .send({ message: "Individual not found, rate is deleted" });
      }
    } else {
      res.status(404).send({ message: "Rate not found" });
    }
  })
);

export default rateRouter;
