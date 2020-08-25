const model = require("../model");
const home = (req, res) => {
  res.render("login");
};
const login = (req, res) => {
  req.body.name, req.body.password;
  model
    .login(req.body)
    .then(() => {
      res.redirect("/user/" + req.body.name);
    })
    .catch((e) => {
      res.render("login", { error: e.message });
    });
};
const user = (req, res) => {
  const username = req.params.username;
  console.log(username);
  model.getAllPosts().then((data) => {
    const postsdata = data;
    model.getUser(username).then((result) => {
      res.render("user", {
        user_name: username,
        user_id: result.id,
        title: "MuseMarket",
        posts: postsdata,
      });
    });
  });
};

module.exports = { login, user, home };
