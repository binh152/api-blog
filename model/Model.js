const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    titleBlg: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogSchema", blogSchema);
