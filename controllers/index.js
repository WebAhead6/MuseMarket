const express = require("express");
const app = require("../app");

const router = express.Router();

const registerController = require("./register.controller");
const loginController = require("./login.controller");
const PostController = require("./Post.controller");

router.post(["/register", "/signup"], registerController.register);
router.get("/", loginController.home);
router.post("/", loginController.login);
router.get("/user/:username", loginController.user);
router.post("/addPost", PostController.addPost);
router.post("/addLike", PostController.addLike);
router.get("/likedPosts/:userId", PostController.getLikes);

module.exports = router;
