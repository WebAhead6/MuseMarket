const express = require("express");
const model = require("../model");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  req.body.name, req.body.password;

  res.redirect("/user");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  model
    .createNewUser(req.body)
    .then(() => {
      res.redirect("/login");
    })
    .catch((e) => {
      res.render("signup", { error: e.message });
    });
});

module.exports = router;
