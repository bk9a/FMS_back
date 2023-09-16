const Models = require("../model");
const BaseHelper = require("./BaseHelper");
class ModelHelper {
  //#region Filter
  constructor() {
    this.Op = Models.Op;
    this.Models = Models;
    this.BaseHelper = BaseHelper;
    this.Operators = {
      "=": this.Op.eq,
      contains: this.Op.like,
      notcontains: this.Op.notLike,
      startswith: this.Op.like,
      endswith: this.Op.like,
      "<>": this.Op.ne,
      "<": this.Op.lt,
      ">": this.Op.gt,
      ">=": this.Op.gte,
      "<=": this.Op.lte,
    };
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

  GetOperator = (OpString) => {
    if (this.Operators[OpString]) {
      return this.Operators[OpString];
    } else {
      return null;
    }
  };

  GetFilterValue = (OpString, FilterValue) => {
    if (OpString == "contains") {
      return "%" + FilterValue + "%";
    }
    if (OpString == "notcontains") {
      return "%" + FilterValue + "%";
    }
    if (OpString == "startswith") {
      return "" + FilterValue + "%";
    }
    if (OpString == "endswith") {
      return "%" + FilterValue + "";
    }
    return FilterValue;
  };

  GetFieldName = (FieldName) => {
    if (FieldName.includes(".") == true) {
      FieldName = "$" + FieldName + "$";
    }
    return FieldName;
  };

  GetFilter = (Query, filter) => {
    if (filter == null) {
      return;
    }
    if (Array.isArray(filter[0]) == false && filter.length == 3) {
      var FieldName = this.GetFieldName(filter[0]);
      var Operator = this.GetOperator(filter[1]);
      var FilterValue = this.GetFilterValue(filter[1], filter[2]);
      if (Operator != null) {
        Query[FieldName] = { [Operator]: FilterValue };
      }
    } else if (Array.isArray(filter[0])) {
      var q = {};
      if (filter[1] === "and") {
        Query[this.Op.and] = [];
        q = Query[this.Op.and];
      } else {
        Query[this.Op.or] = [];
        q = Query[this.Op.or];
      }
      var index = 0;
      for (var i = 0; i < filter.length; i += 2) {
        q[index] = {};
        this.GetFilter(q[index], filter[i]);
        index++;
      }
    }
    return;
  };

  //#endregion

  GetSort = (result, sorts) => {
    if (Array.isArray(sorts)) {
      result["order"] = [];
      sorts.forEach((sort) => {
        if (
          sort &&
          sort["selector"] != undefined &&
          sort["selector"] != null &&
          sort["desc"] != undefined &&
          sort["desc"] != null
        ) {
          result["order"].push([
            this.Models.Sequelize.col(sort["selector"]),
            sort["desc"] == true || sort["desc"] == "true" ? "desc" : "asc",
          ]);
        }
      });
    }
    return;
  };

  GetTakeSkip = ({ Take, Skip }) => {
    var Result = {};
    try {
      if (Take) {
        Result.limit = parseInt(Take);
      } else {
        Result.limit = 20;
      }
      if (Skip) {
        Result.offset = parseInt(Skip);
      } else {
        Result.offset = 0;
      }
    } catch (ex) {
      return { limit: 20, offset: 0 };
    }
    return Result;
  };

  //#region Select
  GetAssocation = (Model, Assocation) => {
    var Assocations = Model.Assocations.filter((s) => s.as === Assocation);
    if (Assocations.length === 1) {
      return {
        model: Assocations[0].model,
        as: Assocations[0].as,
      };
    } else {
      return null;
    }
  };

  GetSelect = (Select, Model, result) => {
    var Result = result || {};
    if (Array.isArray(Select)) {
      var Attributes = Select.filter((s) => typeof s === "string");
      if (Attributes.filter((s) => s === "*").length === 0) {
        Result.attributes = Attributes;
      }
      var Childs = Select.filter((s) => typeof s === "object");
      if (Childs.length > 0) {
        Result.include = [];
        Childs.forEach((child) => {
          this.GetSelect(child, Model, Result.include);
        });
      }
    } else if (!Array.isArray(Select) && typeof Select === "object") {
      if (Object.keys(Select).length === 1) {
        var Assocation = Object.keys(Select)[0];
        var Ass = this.GetAssocation(Model, Assocation);
        this.GetSelect(Select[Assocation], Ass.model, Ass);
        Result.push(Ass);
      }
    }
    return;
  };
  //#endregion

  GetListExec = async ({ Model, OptionData }) => {
    var sort = {};
    this.GetSort(sort, OptionData.sort);
    var where = {};
    if (OptionData.filter) {
      this.GetFilter(where, OptionData.filter);
    }
    var Select = {};
    if (OptionData.select) {
      this.GetSelect(OptionData.select, Model, Select);
    }
    var TakeSkip = {};
    if (OptionData.Take && OptionData.Skip) {
      TakeSkip = this.GetTakeSkip({
        Take: OptionData.Take,
        Skip: OptionData.Skip,
      });
    }
    const { count, rows } = await Model.findAndCountAll({
      ...sort,
      where: where,
      ...TakeSkip,
      ...Select,
    });
    return { count, rows };
  };

  GetDetailExec = async ({ Model, Id, OptionData }) => {
    var Select = {};
    if (OptionData.select) {
      this.GetSelect(OptionData.select, Model, Select);
    }
    const row = await Model.findByPk(Id, {
      ...Select,
    });
    return row;
  };

  GetAdvanceDetailExec = async ({ Model, OptionData }) => {
    var where = {};
    if (OptionData.filter) {
      this.GetFilter(where, OptionData.filter);
    } else {
      return null;
    }
    var Select = {};
    if (OptionData.select) {
      this.GetSelect(OptionData.select, Model, Select);
    }
    const row = await Model.findOne({
      where: where,
      ...Select,
    });
    return row;
  };

  UpdateExec = async ({ Model, Id, Data, LogedUser, SaveLog }) => {
    const result = await Model.update(Data, { where: { Id: Id } });
    if (result && SaveLog) {
      const UpdatedData = await Model.findOne({ where: { Id: Id } });
      await this.SaveActionLog({
        Model,
        Data: UpdatedData,
        LogedUser,
        LogAction: "update",
      });
    }
    return result;
  };

  CreateExec = async ({ Model, Data, LogedUser, SaveLog }) => {
    var result = await Model.create(Data);
    if (result && SaveLog) {
      await this.SaveActionLog({
        Model,
        Data: result,
        LogedUser,
        LogAction: "create",
      });
    }
    return result;
  };

  DeleteExec = async ({ Model, Id, LogedUser, SaveLog }) => {
    if (SaveLog) {
      const DeleteData = await Model.findOne({ where: { Id: Id } });
      await this.SaveActionLog({
        Model,
        Data: DeleteData,
        LogedUser,
        LogAction: "delete",
      });
    }
    const result = await Model.destroy({ where: { Id: Id } });
    return result;
  };

  SaveActionLog = async ({
    LogAction,
    LogActionMn,
    LogModel,
    Model,
    Data,
    LogedUser,
  }) => {
    var LogModels = LogModel || this.Models.Logs;
    var result = await LogModels.create({
      log_date: this.BaseHelper.getDateYMDHMS(),
      object_id: Data.Id,
      object_name: Model.name,
      log_action: LogAction,
      log_data: JSON.stringify(Data),
      log_user_id: LogedUser ? LogedUser.Id : 1,
    });
    return result;
  };
}

module.exports = ModelHelper;
