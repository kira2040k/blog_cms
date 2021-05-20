var express = require("express");
var router = express.Router();
const funs = require("../funs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

function install() {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/cms_blog";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
}

router.get("/", function (req, res) {
  fs.readFile("./config/install_status.conf", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (data == "done") res.send("cms was installed");
    else {
      res.render("install");
    }
  });
});
router.post("/", function (req, res) {
  install();
});

//export this router to use in our index.js
module.exports = router;
