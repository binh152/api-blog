const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Roter = require("./routes/Router");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
         
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

require("dotenv/config");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/blog", Roter);


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
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, () => {
  console.log("connected");
});

// upload file
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
