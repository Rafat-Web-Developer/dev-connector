const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.send("Auth Router");
});

module.exports = router;
