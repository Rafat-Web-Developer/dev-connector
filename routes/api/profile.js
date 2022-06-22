const express = require("express");
const auth = require("../../middleware/auth");

// import models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// @route   GET API /api/profile/me
// @desc    get current user's profile
// @access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "No profile found in database for this user" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
