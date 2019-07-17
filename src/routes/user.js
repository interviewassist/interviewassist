const express = require("express");
const { upload } = require("../utils/image-util");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: Sign up
 *     summary: Signs up a user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - name
 *           - email
 *           - password
 *     responses:
 *       '201':
 *         description: User created successfully
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *             token:
 *               type: string
 *               description: generated login token.
 *       '400':
 *         description: Bad request
 */
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Log in
 *     summary: logs in a user
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request
 */
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     name: Log out
 *     summary: Logs out a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully. JWT token for current device successfully deleted
 *       '500':
 *         description: Internal Server Error
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/users/logoutAll:
 *   post:
 *     tags:
 *       - Users
 *     name: Log out all
 *     summary: Logs out a user from all devices
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User logged out successfully from all devices
 *       '500':
 *         description: Internal Server Error
 */
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     name: Get User Info
 *     summary: Get my user info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User info retrieved successfully
 */
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     tags:
 *       - Users
 *     name: Update user Info
 *     summary: Updata information of an user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid update request
 */
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     tags:
 *       - Users
 *     name: Withdraw an user
 *     summary: withdraw from service. Farewell. :(
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '500':
 *         description: Internal Server Error
 */
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/users/me/avatar:
 *   post:
 *     tags:
 *       - Users
 *     name: Upload profile image
 *     summary: upload profile image
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: image uploaded successfully
 */
router.post("/users/me/avatar", auth, upload.single("avatar"), (req, res) => {
  res.send("Successfully uploaded profile image");
});

/**
 * @swagger
 * tags :
 *  name: User
 *  description: User model CRUD
 * definitions:
 *  User:
 *    type: object
 *    required:
 *      - name
 *      - email
 *      - password
 *    properties:
 *      _id:
 *        type: ObjectID
 *      name:
 *        type: string
 *        description: user name
 *      email:
 *        type: string
 *        description: user email
 *      password:
 *        type: string
 *        description: user password
 *      createdAt:
 *        type: timestamp
 *      updatedAt:
 *        type: timestamp
 *      tokens:
 *        type: Array
 *        description: array of login tokens
 */
module.exports = router;
