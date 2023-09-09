const mongoose = require("mongoose");

const timingsSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    times: { type: [String], required: true },
  },
  { _id: false }
);

const doctorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timings: [timingsSchema],
});

module.exports = mongoose.model("Doctors", doctorsSchema);
