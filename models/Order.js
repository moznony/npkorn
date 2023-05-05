const { Model } = require("objection");

class Order extends Model {
  static get tableName() {
    return "orders";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      vendor: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./Vendor"),
        join: {
          from: "orders.vendor_id",
          to: "vendors.id",
        },
      },
      statuses: {
        relation: Model.HasManyRelation,
        modelClass: require("./Status"),
        join: {
          from: "orders.id",
          to: "statuses.model_id",
        },
      },
      //   status: {
      //     relation: Model.HasOneRelation,
      //     modelClass: require("./Status"),
      //     join: {
      //       from: "orders.id",
      //       to: "statuses.model_id",
      //     },
      //     // modify: (qb) => {
      //     //   qb.orderBy("statuses.created_at", "desc").select("name");
      //     // },
      //   },
      payment_method: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./PaymentMethod"),
        join: {
          from: "orders.payment_method_id",
          to: "payment_methods.id",
        },
      },
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./User"),
        join: {
          from: "orders.driver_id",
          to: "users.id",
        },
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: require("./OrderProduct"),
        join: {
          from: "orders.id",
          to: "order_products.order_id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./User"),
        join: {
          from: "orders.user_id",
          to: "users.id",
        },
      },
    };
  }

  static async logOrders() {
    const orders = await Order.query().select();
    console.log("Orders:", orders);
  }

  static async getLatestOrder() {
    const order = await Order.query()
      .select()
      .orderBy("id", "desc")
      .withGraphFetched({
        products: true,
        vendor: true,
      })
      .first();
    return order;
  }
  static async getLatestOrderId() {
    const order = await Order.query().select().orderBy("id", "desc").first();
    return order.id;
  }
  static async getOrderByIdForTelegram(id) {
    const order = await Order.query()
      .where("id", id)
      .select()
      .orderBy("id", "desc")
      .withGraphFetched({
        products: true,
        vendor: true,
        user: true,
      })
      .first();
    return order;
  }
}

module.exports = Order;
