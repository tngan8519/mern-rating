import express from "express";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (req.body.adminCode === "ADMINCODE") {
      user.isAdmin = true;
    }

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      username: createdUser.username,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid username or password" });
  })
);

export default userRouter;
