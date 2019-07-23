const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 50,
    unique: true,
    required: true,
    trim: true,
    unique: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
