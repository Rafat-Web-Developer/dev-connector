const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.json({ msg: "Server Error" });
  }
});

module.exports = router;
