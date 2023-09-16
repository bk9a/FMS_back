SetAssocations = (Model) => {
  Model.Assocations.forEach((association) => {
    if (association.type === "belongsTo") {
      Model.belongsTo(association.model, {
        as: association.as,
        foreignKey: association.foreignKey,
      });
    }
    if (association.type === "hasMany") {
      Model.hasMany(association.model, {
        as: association.as,
        foreignKey: association.foreignKey,
      });
    }
  });
};

SetLogHooks = ({ LogModel, Model, Hooks = [] }) => {
  if (Hooks.filter((s) => s === "afterUpdate").length > 0) {
    Model.addHook("afterUpdate", "afterUpdate", async (data, options) => {
      await LogModel.create({
        object_name: Model.name,
        log_data: JSON.stringify(data),
        log_date: new Date().toISOString(),
        log_user_id: 1,
        object_id: data.id,
        log_action: "update",
      });
    });
  }

  if (Hooks.filter((s) => s === "afterCreate").length > 0) {
    Model.addHook("afterCreate", "afterCreate", async (data, options) => {
      await LogModel.create({
        object_name: Model.name,
        log_data: JSON.stringify(data),
        log_date: new Date().toISOString(),
        log_user_id: 1,
        object_id: data.id,
        log_action: "create",
      });
    });
  }

  if (Hooks.filter((s) => s === "afterBulkUpdate").length > 0) {
    Model.addHook("afterBulkUpdate", "afterBulkUpdate", async (options) => {
      var datas = await Model.findAll({ where: { ...options.where } });
      datas.forEach(async (d) => {
        //d.update({ groupid: "1" });
        await LogModel.create({
          object_name: Model.name,
          log_data: JSON.stringify(d),
          log_date: new Date().toISOString(),
          object_id: d.id,
          log_user_id: 1,
          log_action: "update",
        });
      });
    });
  }
};

module.exports = { SetAssocations, SetLogHooks };
