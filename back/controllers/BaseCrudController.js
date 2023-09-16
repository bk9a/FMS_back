const MyError = require("../utils/MyError");
const asyncHandler = require("express-async-handler");
var BaseController = require("./BaseController");

class BaseCrudController extends BaseController {
  constructor() {
    super();
  }

  GetList = asyncHandler(async (req, res) => {
    var ObjectName = this.GetObjectName(req);
    var Model = this.GetModel(ObjectName);
    var RequestData = this.GetRequestData(req);
    const { count, rows } = await this.ModelHelper.GetListExec({
      Model,
      OptionData: RequestData,
    });
    res.status(200).send({
      Success: true,
      Data: rows,
      Total: count,
    });
  });

  GetDetail = asyncHandler(async (req, res) => {
    var ObjectName = this.GetObjectName(req);
    var Model = this.GetModel(ObjectName);
    var Id = this.GetParam(req, "Id");
    var RequestData = this.GetRequestData(req);
    const row = await this.ModelHelper.GetDetailExec({
      Model,
      Id,
      OptionData: RequestData,
    });
    if (!row) {
      throw new this.MyError("Мэдээлэл олдсонгүй", 200);
    }
    res.status(200).send({
      Success: true,
      Data: row,
    });
  });

  GetAdvanceDetail = asyncHandler(async (req, res) => {
    var ObjectName = this.GetObjectName(req);
    var Model = this.GetModel(ObjectName);
    var RequestData = this.GetRequestData(req);
    const row = await this.ModelHelper.GetAdvanceDetailExec({
      Model,
      OptionData: RequestData,
    });
    if (!row) {
      throw new this.MyError("Мэдээлэл олдсонгүй", 200);
    }
    res.status(200).send({
      Success: true,
      Data: row,
    });
  });

  Update = asyncHandler(async (req, res) => {
    var Data = req.body.Data;
    if (typeof Data === "string") {
      Data = JSON.parse(Data);
    }
    var Id = this.GetParam(req, "Id");
    var ObjectName = this.GetObjectName(req);
    var Model = this.GetModel(ObjectName);
    var result = await this.ModelHelper.UpdateExec({
      Data,
      Id,
      Model,
      SaveLog: true,
      LogedUser: req.LogedUser,
    });
    res.status(200).send({
      Success: true,
      Data: result,
      Message: "Амжилттай хадгаллаа",
    });
  });

  Create = asyncHandler(async (req, res) => {
    var Data = req.body.Data;
    if (typeof Data === "string") {
      Data = JSON.parse(Data);
    }
    var ObjectName = this.GetObjectName(req);
    var Model = this.GetModel(ObjectName);
    var result = await this.ModelHelper.CreateExec({
      Data,
      Model,
      SaveLog: true,
      LogedUser: req.LogedUser,
    });
    res.status(200).send({
      Success: true,
      Data: result,
      Message: "Амжилттай хадгаллаа",
    });
  });

  Delete = asyncHandler(async (req, res) => {
    var Id = this.GetParam(req, "Id");
    var ObjectName = this.GetObjectName(req);
    var Model = this.GetModel(ObjectName);
    var result = await this.ModelHelper.DeleteExec({
      Model,
      Id,
      SaveLog: true,
      LogedUser: req.LogedUser,
    });
    res.status(200).send({
      Success: true,
      Data: result,
      Message: "Амжилттай устгалаа",
    });
  });
}

module.exports = new BaseCrudController();
