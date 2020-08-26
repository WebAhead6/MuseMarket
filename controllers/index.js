const express = require("express");
const app = require("../app");
const router = express.Router();

const registerController = require("./register.controller");
const loginController = require("./login.controller");
const PostController = require("./Post.controller");
const logoutController = require("./logout.controller");
const middlewares = require("../middlewares/");

router.use(middlewares.autoCheck);
router.post(["/register", "/signup"], registerController.register);
router.get("/", middlewares.requireLogout, loginController.home);
router.post("/", middlewares.requireLogout, loginController.login);
router.get("/user/:username", middlewares.requireLogin, loginController.user);
router.post("/addPost", middlewares.requireLogin, PostController.addPost);
router.post("/addLike", middlewares.requireLogin, PostController.addLike);
router.get(
  "/likedPosts/:userId",
  middlewares.requireLogin,
  PostController.getLikes
);
router.get("/logout", logoutController.logout);

module.exports = router;
