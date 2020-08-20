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
      res.redirect("/user/" + req.body.name);
    })
    .catch((e) => {
      res.render("login", { error: e.message });
    });
});
router.get("/user/:username", (req, res) => {
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
});

router.post("/signup", (req, res) => {
  model
    .createNewUser(req.body)
    .then(() => {
      res.redirect("/login");
    })
    .catch((e) => {
      res.render("login", { error_register: e.message, page: "signup" });
    });
});
router.post("/postId", (req, res) => {
  console.log("ana", req.body);
  model
    .createNewLike(req.body)
    .then(() => {
      res.send("succes");
    })
    .catch((error) => {
      console.log("error");
    });
});

router.post("/addPost", (req, res) => {
  model
    .addNewPost(req.body)

    .then(() => {
      res.redirect("back");
    });
});

router.get("/likedPosts/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  model.getLikes(userId).then((postdata) => {
    res.render("like", {
      //user_name:
      likedposts: postdata,
    });
  });
});

module.exports = router;
