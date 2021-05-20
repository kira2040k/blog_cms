var express = require("express");
var router = express.Router();
const funs = require("../funs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", function (req, res) {
  funs.index_blog("cms_blog", "blogs").then((result) => {
    if(!result) res.sendStatus(404);
    else{
    let blog_title = result.blog_title;
    let subject_title = result.subject_title;
    let des = result.des;
    let content = result.content;
    let username = result.username;
    let platform = result.platform;
    if (platform == "twitter") platform = "https://twitter.com/";
    if (platform == "insta") platform = "https://www.instagram.com/";
    if (platform == "snapchat") platform = "https://www.snapchat.com/add/";

    res.render("index", {
      blog_title: blog_title,
      subject_title: subject_title,
      des: des,
      content: content,
      username: username,
      platform: platform,
    });
}
  });
});

router.get("/:id", function (req, res) {
  let page_id = Number(req.params.id);

  funs
    .mongok_findOne("cms_blog", "blogs", { page_id: page_id })
    .then((result) => {
        if(!result) res.sendStatus(404);
    else{
      let blog_title = result.blog_title;
      let subject_title = result.subject_title;
      let des = result.des;
      let content = result.content;
      let username = result.username;
      let platform = result.platform;
      if (platform == "twitter") platform = "https://twitter.com/";
      if (platform == "insta") platform = "https://www.instagram.com/";
      if (platform == "snapchat") platform = "https://www.snapchat.com/add/";
      res.render("index", {
        blog_title: blog_title,
        subject_title: subject_title,
        des: des,
        content: content,
        username: username,
        platform: platform,
      });
    }
    });
});

//export this router to use in our index.js
module.exports = router;
