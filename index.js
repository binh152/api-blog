const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Roter = require("./routes/Router");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("dotenv/config");
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/blog", Roter);
app.use("/images", express.static("images"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "application/json",
    "text/plain",
    "*/*"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//connect db
mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => {
    console.log("connected");
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/blog/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//start server port
app.listen(process.env.PORT || 5000, () => {
  console.log("run server");
});
