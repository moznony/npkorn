const { Model } = require("objection");

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = Product;
