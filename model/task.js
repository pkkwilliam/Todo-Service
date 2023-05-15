const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  createTime: {
    type: Date,
    required: true,
  },
  completeTime: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
