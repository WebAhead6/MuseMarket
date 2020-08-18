const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

// routes.post("/login", (req, res) => {});

module.exports = router;
