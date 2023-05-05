const { Model } = require("objection");

class Status extends Model {
  static get tableName() {
    return "statuses";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = Status;
