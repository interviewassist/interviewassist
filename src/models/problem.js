const mongoose = require("mongoose");
const validator = require("validator");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    given_answer: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    tags: [
      {
        tag: {
          type: String,
          trim: true
        }
      }
    ],
    references: [
      {
        reference: {
          type: String,
          trim: true,
          validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Reference URL is invalid");
            }
          }
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "last_updated"
    }
  }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
