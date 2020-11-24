import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Individual from "../models/individualModel.js";
import Rate from "../models/rateModel.js";
import expressAsyncHandler from "express-async-handler";
import { isLoggedIn, isAdmin, upload } from "../utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const individualRouter = express.Router();

individualRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const individual = await Individual.find()
      .populate({ path: "rates", populate: { path: "author individual" } })
      .populate("author");
    res.send(individual);
  })
);

individualRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const individual = new Individual({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      author: req.user,
    });
    const createdIndividual = await individual.save();
    res.status(201).send({
      message: "New individual created",
      individual: createdIndividual,
    });
  })
);

individualRouter.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

individualRouter.get(
  "/:id",
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

individualRouter.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const individual = await Individual.findById(req.params.id)
      .populate({ path: "rates", populate: { path: "author individual" } })
      .populate("author");
    if (individual) {
      if (req.body.image) {
        individual.image = req.body.image;
      }
      individual.name = req.body.name;
      individual.description = req.body.description;

      const updatedIndividual = await individual.save();

      res.send({ message: "Individual update", individual: updatedIndividual });
    } else {
      res.status(404).send({ message: "Individual not found" });
    }
  })
);

individualRouter.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const individual = await Individual.findById(req.params.id)
      .populate({ path: "rates", populate: { path: "author individual" } })
      .populate("author");
    if (individual) {
      await individual.deleteOne();
      await Rate.deleteMany({ _id: { $in: individual.rates } });
      res.send({ message: "Individual is deleted" });
    } else {
      res.status(404).send({ message: "Individual not found" });
    }
  })
);

export default individualRouter;
