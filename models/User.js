const { Model } = require("objection");

class Customer extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = Customer;
