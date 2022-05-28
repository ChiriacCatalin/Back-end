const express = require("express");

const userController = require("../controllers/user");
const router = express.Router();

router.post("/users/:userId", userController.createUser);

module.exports = router;