const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mongok_findOne = async (your_db, coll, query) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db(your_db);
      dbo.collection(coll).findOne(query, function (err, result) {
        if (err) throw err;
        if (result) {
          resolve(result);
        }
        resolve(false);
        db.close();
      });
    });
  });
};

const mongok_insertOne = async (your_db, coll, query) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db(your_db);
      dbo.collection(coll).insertOne(query, function (err, result) {
        if (err) throw err;
        if (result) {
          resolve(result);
        }
        resolve(false);
        db.close();
      });
    });
  });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.cookies.token;

  if (authHeader) {
    jwt.verify(authHeader, process.env.jwt, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.username = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const mongok_count = async (your_db, coll) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      async function (err, db) {
        if (err) throw err;
        var dbo = db.db(your_db);
        const movies = dbo.collection(coll);
        const count = await movies.estimatedDocumentCount();
        resolve(count);
      }
    );
  });
};

const index_blog = async (your_db, coll) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      async function (err, db) {
        if (err) throw err;
        var dbo = db.db(your_db);

        let database = dbo.collection(coll);
        count = await database.estimatedDocumentCount();
        const result = await database.findOne({ page_id: count });

        resolve(result);
      }
    );
  });
};

module.exports = {
  mongok_findOne,
  mongok_insertOne,
  authenticateJWT,
  mongok_count,
  index_blog,
};
