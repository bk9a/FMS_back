const MyError = require("../utils/MyError");
const Models = require("../model");
const ModelHelper = require("../helper/ModelHelper");
const BaseHelper = require("../helper/BaseHelper");

class BaseController {
  constructor() {
    this.Op = Models.Op;
    this.Models = Models;
    this.MyError = MyError;
    this.BaseHelper = BaseHelper;
    this.ModelHelper = new ModelHelper();
    this.result = { Success: true, Message: "", Data: null };
  }

  JsonParse = (string) => {
    try {
      if (string) {
        return JSON.parse(string);
      }
      return null;
    } catch (ex) {
      return null;
    }
  };

  GetRequestData = (req) => {
    var ObjectName = this.GetObjectName(req);
    var select = this.GetQueryParm(req, "select");
    var Take = this.GetQueryParm(req, "take");
    var Skip = this.GetQueryParm(req, "skip");
    var filter = this.GetQueryParm(req, "filter");
    var sort = this.GetQueryParm(req, "sort");
    sort = this.JsonParse(sort);
    filter = this.JsonParse(filter);
    select = this.JsonParse(select);
    return {
      select,
      Take,
      Skip,
      filter,
      sort,
      ObjectName,
    };
  };

  GetModel = (ObjectName) => {
    if (this.Models[ObjectName]) {
      return this.Models[ObjectName];
    }
    return null;
  };

  GetQueryParm = (req, QueryParm) => {
    if (req.query && req.query[QueryParm]) {
      return req.query[QueryParm];
    }
    return null;
  };

  GetParam = (req, param) => {
    if (req.params && req.params[param]) {
      return req.params[param];
    }
    return null;
  };

  GetObjectName = (req) => {
    if (req.params && req.params.ObjectName) {
      return req.params.ObjectName;
    }
    return null;
  };

  NewListResult = () => {
    return { Success: true, Message: "", Data: [], Option: {} };
  };
  NewObjectResult = () => {
    return { Success: true, Message: "", Data: {} };
  };
  NewNullResult = () => {
    return { Success: true, Message: "", Data: null };
  };
}

module.exports = BaseController;
