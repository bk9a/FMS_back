var fs = require("fs");
var path = require("path");

module.exports.SyncRoute = function SyncRoute(app) {
  var Routes = [];
  function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = dir + "/" + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  }

  try {
    getFiles(__dirname).forEach(function (filename) {
      if (path.basename(filename).replace(/.js/g, "") !== "index") {
        var Route = require(filename);
        Routes.push({
          Path: path.basename(filename).replace(/.js/g, ""),
          Route: Route,
        });
      }
    });

    Routes.forEach((Route) => {
      app.use("/" + Route.Path, Route.Route);
    });
    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};
