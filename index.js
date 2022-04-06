const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Roter = require("./routes/Router");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", Roter);

app.use(function (req, res, next) {

 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'application/json', 'text/plain', '*/*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


//connect db
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, () => {
  console.log("connected");
});

//start server port
app.listen(process.env.PORT||3000, () => {
  console.log("run server");
});
