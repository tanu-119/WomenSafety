const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  address: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  age: { type: Number, min: 0 },
  state: { type: String },
  district: { type: String },
  policeStation: { type: String },
  oneSignalPlayerId: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
