const { Model } = require("objection");

class PaymentMethod extends Model {
  static get tableName() {
    return "payment_methods";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = PaymentMethod;
