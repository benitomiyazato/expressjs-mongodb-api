const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("Authentication successful");
});

router.post("/register", authController.register);

module.exports = router;
