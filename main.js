const express = require("express");
const app = express();
const port = 3000;
let ejs = require("ejs");
const helmet = require("helmet");
const compression = require("compression");
app.use(compression());

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.referrerPolicy());
app.use(helmet.ieNoOpen());

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

app.set("view engine", "ejs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//require pages
app.use("/admin", require("./pages/admin.js")); // mount the sub app
app.use("/admin_panel", require("./pages/admin-panel"));
app.use("/install", require("./pages/install"));
app.use("/", require("./pages/index"));

//static_files
app.use("/assets", express.static("./assets"));

//app.listen(port, () => {
//console.log(`Example app listening at http://localhost:${port}`)
//})

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(port);

  console.log(`Worker ${process.pid} started`);
}
