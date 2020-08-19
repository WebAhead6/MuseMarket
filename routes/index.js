const express = require("express");
const model = require("../model");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

// routes.post("/login", (req, res) => {});
router.post("/login", (req, res) => {
  req.body.name, req.body.password;
  model
    .login(req.body)
    .then(() => {
      res.redirect("/user/:username");
    })
    .catch((e) => {
      res.render("login", { error: e.message });
    });
});
router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  model.getAllPosts().then((data) => {
    const postsdata = data;
    res.render("user", {
      user_name: username,
      title: "MuseMarket",
      posts: postsdata,
    });
  });
});

router.post("/signup", (req, res) => {
  model
    .createNewUser(req.body)
    .then(() => {
      res.redirect("/login");
    })
    .catch((e) => {
      res.render("login", { error: e.message, page: "signup" });
    });
});

module.exports = router;
