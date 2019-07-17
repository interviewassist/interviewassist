const express = require("express");
const Problem = require("../models/problem");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/problems", auth, async (req, res) => {
  const problem = new Problem({
    ...req.body,
    owner: req.user._id
  });
});
