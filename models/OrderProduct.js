const { Model } = require("objection");

class OrderProduct extends Model {
  static get tableName() {
    return "order_products";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Product = require("./Product");
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "order_products.product_id",
          to: "products.id",
        },
      },
    };
  }
}

module.exports = OrderProduct;
