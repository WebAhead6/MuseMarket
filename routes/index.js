const express = require("express");
const data = require("./../model");
const { getAllPosts, getUser } = require("./../model");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  getAllPosts().then((data) => {
    const postsdata = data;
    res.render("user", {
      user_name: username,
      title: "MuseMarket",
      posts: postsdata,
    });
  });
});
// routes.post("/login", (req, res) => {});

module.exports = router;
