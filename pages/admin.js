var express = require("express");
var router = express.Router();
const funs = require("../funs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function create_user(res, username) {
  const accessToken = jwt.sign({ username: username }, process.env.jwt, {
    expiresIn: "2h",
  });

  res.json({
    accessToken,
  });
}

router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  funs
    .mongok_findOne("cms_blog", "users", {
      username: username,
      password: password,
    })
    .then((result) => {
      if (!result) res.send("username or password incorrect");
      if (result) create_user(res, result.username);
    });
});

//export this router to use in our index.js
module.exports = router;
