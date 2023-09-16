"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const ModelReadyHelper = require("../helper/ModelReadyHelper");
// const config = require("../config/.json")[env];

const db = {};

let sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    logging: function (str) {
      console.log(str.replace("Executing (default): ", ""));
    },
    host: process.env.SQL_HOST,
    dialect: "mysql",
    port: process.env.SQL_PORT,
    dialectOptions: {
      options: {
        validateBulkLoadParameters: true,
      },
      requestTimeout: 300000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (!name.includes("index")) {
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
  }
  return files_;
}

getFiles(__dirname).forEach((file) => {
  const model = require(file)(sequelize, ModelReadyHelper);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Op = Sequelize.Op;
db.Sequelize = Sequelize;

module.exports = db;
