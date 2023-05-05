const { Model } = require("objection");

class Vendor extends Model {
  static get tableName() {
    return "vendors";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const DeliveryZone = require("./DeliveryZone");

    return {
      delivery_zones: {
        relation: Model.ManyToManyRelation,
        modelClass: DeliveryZone,
        join: {
          from: "vendors.id",
          through: {
            from: "delivery_zone_vendor.vendor_id",
            to: "delivery_zone_vendor.delivery_zone_id",
          },
          to: "delivery_zones.id",
        },
      },
    };
  }
}

module.exports = Vendor;
