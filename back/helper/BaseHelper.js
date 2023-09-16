class BaseHelper {
  ParseInt(Value) {
    try {
      if (!Value) {
        return 0;
      }
      var result = parseInt(parseFloat("" + Value));
      if (!isNaN(result)) {
        return result;
      } else {
        return 0;
      }
    } catch (ex) {
      process.env.NODE_ENV === "development" && console.log(ex);
    }
  }

  GetBvhel(Value) {
    try {
      var result = parseInt(parseFloat("" + Value));
      if (!isNaN(result)) {
        var res = this.GetFloat(Value);
        if (res > result) {
          if (this.GetFloat(result) + this.GetFloat("0.5") <= res) {
            return result + 1;
          } else {
            return result;
          }
        }
        return result;
      } else {
        return 0;
      }
    } catch (ex) {
      process.env.NODE_ENV === "development" && console.log(ex);
    }
  }

  GetFloat(Value) {
    try {
      var result = parseFloat(Value);
      if (!isNaN(result)) {
        return result;
      } else {
        return 0;
      }
    } catch (ex) {
      process.env.NODE_ENV === "development" && console.log(ex);
    }
  }

  getValue = function (Obj, FieldName) {
    try {
      var Names = FieldName.split(".");
      var ValObj = Obj;
      for (var i = 0; i < Names.length; i++) {
        ValObj = ValObj[Names[i]];
      }

      return ValObj;
    } catch (ex) {
      return null;
    }
  };

  getDateYMD = function (Option) {
    var date = null;
    if (Option === undefined) {
      date = new Date();
    } else {
      if (Option.Date === undefined && Option.DateStr !== "") {
        date = new Date(Option.DateStr);
      }
      if (
        Option.Date !== undefined &&
        Option.Date !== null &&
        Option.DateStr === undefined
      ) {
        date = Option.Date;
      }
      if (
        (Option.Date === undefined || Option.Date === null) &&
        (Option.DateStr === undefined ||
          Option.DateStr === null ||
          Option.DateStr === "")
      ) {
        date = new Date();
      }
    }

    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return (
      date.getFullYear() +
      "-" +
      pad2(date.getMonth() + 1) +
      "-" +
      pad2(date.getDate())
    );
  };

  getDateYMDHMS = function (Option) {
    var date = null;
    if (Option === undefined) {
      date = new Date();
    } else {
      if (Option.Date === undefined && Option.DateStr !== "") {
        date = new Date(Option.DateStr.replace(".000Z", ""));
      }
      if (
        Option.Date !== undefined &&
        Option.Date !== null &&
        Option.DateStr === undefined
      ) {
        date = Option.Date;
      }
      if (
        (Option.Date === undefined || Option.Date === null) &&
        (Option.DateStr === undefined ||
          Option.DateStr === null ||
          Option.DateStr === "")
      ) {
        date = new Date();
      }
    }

    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return (
      date.getFullYear() +
      "-" +
      pad2(date.getMonth() + 1) +
      "-" +
      pad2(date.getDate()) +
      " " +
      pad2(date.getHours()) +
      ":" +
      pad2(date.getMinutes()) +
      ":" +
      pad2(date.getSeconds())
    );
  };

  getDateToStrFromStr = function (dateStr) {
    if (dateStr === undefined) {
      return new Date()
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, "");
    } else {
      return dateStr
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, "");
    }
  };

  getDateNumbers = function (date) {
    if (date === undefined) {
      return new Date()
        .toISOString()
        .replace(/T/, "")
        .replace(/\..+/, "")
        .replace(/-/g, "")
        .replace(/:/g, "");
    } else {
      return date
        .toISOString()
        .replace(/T/, "")
        .replace(/\..+/, "")
        .replace(/-/g, "")
        .replace(/:/g, "");
    }
  };

  ArraySort = function (property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  ArraySortDesc = function (property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  GetAgeDateStr = function (dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  GetChangeArray = function (Rows, Dictionarys) {
    for (let i = 0; i < Rows.length; i++) {}
  };
}

module.exports = new BaseHelper();
