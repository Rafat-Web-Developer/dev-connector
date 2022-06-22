const express = require("express");
// const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();

// @route   GET API/auth
// @desc    test api
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.json({ msg: "Server Error" });
  }
});

// @route   POST API/Auth
// @desc    Authentication user and get token
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecrete"),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error;
        res.json(token);
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
