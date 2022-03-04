const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  if (!req.body.username) res.status(404).json("User name required");
  if (!req.body.email) res.status(404).json("Email required");
  if (!req.body.password) res.status(404).json("Password required");

  try {
    //password encryption
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email) res.status(404).json("Email required");
  if (!req.body.password) res.status(404).json("Password required");

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(404).json("User not found");
    res.status(200).json("Login Successful");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
