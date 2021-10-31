const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sinhvienRoter = require("./routes/sinhveinRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", sinhvienRoter);

//connect db
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, () => {
  console.log("connected");
});

//start server port
app.listen(3000, () => {
  console.log("run server");
});
