var fs = require("fs");
var path = require("path");
const imageThumbnail = require("image-thumbnail");

class ImageHelper {
  getType(filePath) {
    return path.extname(filePath).replace(".", "");
  }

  encodeBase64(filePath, Type) {
    try {
      var bitmap = fs.readFileSync(filePath);
      //this.getType(filePath)
      return (
        "data:image/" +
        Type +
        ";base64, " +
        new Buffer(bitmap).toString("base64")
      );
    } catch (ex) {
      console.log(ex);
      return "";
    }
  }

  encodeBase64NotType(filePath) {
    var bitmap = fs.readFileSync(filePath);
    return new Buffer(bitmap).toString("base64");
  }

  thumbnailBase64(filePath, callback) {
    imageThumbnail(filePath)
      .then((thumbnail) => {
        callback(
          "data:image/" +
            this.getType(filePath) +
            ";base64, " +
            new Buffer(thumbnail).toString("base64")
        );
      })
      .catch((err) => {
        callback("");
      });
  }

  async thumbnailBase64Sync(filePath, Type, Percentage) {
    try {
      let options = {
        percentage: Percentage ? Percentage : 25,
        responseType: "base64",
      };
      var thumbnail = await imageThumbnail(filePath, options);
      //console.log({ thumbnail });
      //var str = new Buffer(thumbnail).toString("base64");
      //this.getType(filePath)
      var result = "data:image/" + Type + ";base64, " + thumbnail;
      return result;
    } catch (err) {
      console.log(err);
      return "";
    }
  }
}

module.exports = new ImageHelper();
