const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const model = require("../model");
const register = (req, res) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.render("login", {
      error_register: "passwords don't match",
      page: "signup",
    });
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;

  bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
    if (err)
      return res.render("login", {
        page: "signup",
        error_register: err.message,
      });

    try {
      await model.createNewUser(req.body.name, hash);

      res.redirect("/");
    } catch (e) {
      res.render("login", {
        error_register: e.message,
        page: "signup",
      });
    }
  });
};

module.exports = { register };
