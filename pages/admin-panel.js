var express = require("express");
var router = express.Router();
const funs = require("../funs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", funs.authenticateJWT, function (req, res) {
  res.render("admin_panel");
});

router.post("/", funs.authenticateJWT, function (req, res) {
  let blog_title = req.body.blog_title;
  let subject_title = req.body.subject_title;
  let des = req.body.des;
  let content = req.body.content;
  let username = req.body.username;
  let platform = req.body.platform;
  funs.mongok_count("cms_blog", "blogs").then((count) => {
    let query = {
      username: username,
      platform: platform,
      blog_title: blog_title,
      subject_title: subject_title,
      des: des,
      content: content,
      page_id: count + 1,
    };
    funs.mongok_insertOne("cms_blog", "blogs", query).then((result) => {
      if (!result) res.send("false");
      if (result) res.json({ status: true });
    });
  });
});

//export this router to use in our index.js
module.exports = router;
