const express = require("express");

const userController = require("../controllers/user");
const router = express.Router();

router.get("/users/:userId", userController.getUser);
router.post("/users/:userId", userController.createUser);
router.put("/users/:userId", userController.updateUserFields);
router.delete("/users/:userId/fields", userController.deleteUserFields);
router.post("/users/:userId/fields", userController.addUserFields);

module.exports = router;
