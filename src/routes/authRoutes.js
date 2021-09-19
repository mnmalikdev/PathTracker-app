const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.status(200).json({
      token,
    });
    next();
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send({ error: "MUST ENTER USERNAME AND PASSWORD" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send({ error: "Email not found !! " });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    res.send("INVALID USERNAME OR PASSWORD");
  }
});

module.exports = router;
