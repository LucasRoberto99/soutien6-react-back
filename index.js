require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI + "projet-signup");

app.get("/", (req, res) => {
  res.send("bienvenue sur mon serveur");
});

app.use("/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port =>", process.env.PORT);
});
