const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["start", "process", "finished"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
