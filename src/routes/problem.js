const express = require("express");
const Problem = require("../models/problem");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/problems", auth, async (req, res) => {
  const problem = new Problem({
    ...req.body,
    owner: req.user._id
  });

  try {
    await problem.save();
    res.status(201).send(problem);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/problems", async (req, res) => {
  try {
    const problems = await Problem.find({})
      .populate("owner", "name owner")
      .exec();

    // problems.forEach(problem => {
    //   problem.populate("owner", "name owner").exec();
    // });

    res.send(problems);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
