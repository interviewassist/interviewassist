const express = require("express");
const { verifyIdToken, handleSocialLoginedUser } = require("../utils/auth");
const router = new express.Router();

router.post("/auth", async (req, res) => {
  const { id_token } = req.body;

  const user = await verifyIdToken(id_token).catch(console.err);
  const result = await handleSocialLoginedUser(user);

  res.cookie("Authorization", `Bearer ${result.loginToken}`, {
    encode: String
  });
  res.status(200).send(result);
});

module.exports = router;
