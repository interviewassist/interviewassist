const express = require("express");
const { verify } = require("../utils/auth");
const router = new express.Router();

router.post("/auth/google", async (req, res) => {
  const { id_token } = req.body;

  const user = await verify(id_token).catch(console.err);

  res.cookie("Authorization", `Bearer ${user.loginToken}`);
  res.send(user);
});

module.exports = router;
