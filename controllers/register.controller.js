const model = require("../model");
const register = (req, res) => {
  model
    .createNewUser(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => {
      res.render("/", { error_register: e.message, page: "signup" });
    });
};

module.exports = { register };
