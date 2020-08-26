const model = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const home = (req, res) => {
  res.render("login", { activePage: { login: true } });
};
const login = async (req, res) => {
  try {
    const { password, name } = req.body;

    const user = await model.login(name);
    const passwordsEqual = await bcrypt.compare(password, user.password);
    if (!passwordsEqual) throw new Error("Password is incorrect");
    console.log(process.env.JWT_SECRET);
    console.log("aaa", user);
    const token = await jwt.sign(user.user_name, process.env.JWT_SECRET);

    res.cookie("access_token", token);
    res.redirect("/user/" + req.body.name);
  } catch (error) {
    res.render("login", {
      page: "login",

      error: error.message,
    });
  }
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
