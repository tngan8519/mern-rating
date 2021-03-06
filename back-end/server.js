import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import individualRouter from "./routers/individualRouter.js";
import rateRouter from "./routers/rateRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

app.use(cors());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/rating", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/individual", individualRouter);
app.use("/api/rate", rateRouter);

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

// app.get("/", (req, res) => res.send("hello"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
