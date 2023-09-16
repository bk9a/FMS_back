var fs = require("fs");
var path = require("path");
var http = require("http");
var https = require("https");
var express = require("express");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var cors = require("cors");

const ErrorHandler = require("./middleware/ErrorHandler");
const fileupload = require("express-fileupload");
dotenv.config({ path: "./config/Config.env" });
var routes = require("./api/routes");
var app = express();
const FileDeleteSchedule = require("./schedule/FileDeleteSchedule");
//#region CORS
var whitelist = ["http://192.168.10.134:3000", "http://192.168.10.134:5000"];
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
    // callback(new MyError("Not allowed by CORS", 200));
    // console.log({ origin });
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new MyError("Not allowed by CORS", 200));
    // }
  },
};
//#endregion
const schedule = require("node-schedule");
schedule.scheduleJob("0 0 0 * * *", FileDeleteSchedule);

app.use(cors(corsOptions));
//app.use(express.static(__dirname + "/public"));
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/check", (req, res) => {
  return res.status(200).json({ check: true });
});

app.use("/apiv1", routes);

app.use(ErrorHandler);
app.use(fileupload);
//create Server
var server = null;
if (process.env.SSL === "true") {
  const options = {
    key: fs.readFileSync("./config/SSL/telemedicine-mn.key"),
    cert: fs.readFileSync("./config/SSL/STAR_telemedicine_mn.crt"),
  };
  server = https.createServer(options, app).listen(5000);
  console.log("Listen 5000 port SSL on");
} else {
  server = http.createServer(app).listen(5000);
  console.log("Listen 5000 port SSL off");
}

app.use("/base", require("./routes/base"));
