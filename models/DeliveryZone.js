const { Model } = require("objection");

class DeliveryZone extends Model {
  static get tableName() {
    return "delivery_zones";
  }

  static get relationMappings() {
    const Vendor = require("./Vendor");

    return {
      vendors: {
        relation: Model.ManyToManyRelation,
        modelClass: Vendor,
        join: {
          from: "delivery_zones.id",
          through: {
            from: "delivery_zone_vendor.delivery_zone_id",
            to: "delivery_zone_vendor.vendor_id",
          },
          to: "vendors.id",
        },
      },
    };
  }
}

module.exports = DeliveryZone;
