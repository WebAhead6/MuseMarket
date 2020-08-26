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
    const token = await jwt.sign(
      { user: user.user_name, id: user.id },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token);
    res.redirect("/user/" + req.body.name);
  } catch (error) {
    res.render("login", {
      page: "login",

      error: error.message,
    });
  }
};

const user = async (req, res) => {
  try {
    const username = req.params.username;
    const userdata = await model.getUser(username);
    const userId = userdata.id;
    const allPosts = await model.getAllPostsWithLike(userId);
    res.render("user", {
      user_name: username,
      user_id: userId,
      posts: allPosts,
    });
  } catch (err) {
    res.render("user", { error: err.message });
  }
};

module.exports = { login, user, home };
