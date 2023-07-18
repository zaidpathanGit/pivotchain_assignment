// DB CONNECTION
const { getDB } = require("../DB");

// MISC
const { MAIL_REGEX } = require("../constants")

// IMPORTS
const { ObjectId } = require("mongodb");

const TABLE_NAME = "customers";

class CustomerModel {
  static all(page, pageSize) {
    const skip = parseInt(page == 1 ? 0 : pageSize * (page - 1));
    const limit = parseInt(pageSize);

    return getDB()
      .collection(TABLE_NAME)
      .find({})
      .sort({ last_updated_date: -1 })
      .skip(skip)
      .limit(limit)

      .toArray();
  }

  static create(customer) {
    return getDB()
      .collection(TABLE_NAME)
      .insertOne({ ...customer, created_date: new Date(Date.now()) });
  }

  static update(customer, id) {
    return getDB()
      .collection(TABLE_NAME)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...customer, last_updated_date: new Date(Date.now()) } }
      );
  }

  static delete(id) {
    return getDB()
      .collection(TABLE_NAME)
      .deleteOne({ _id: new ObjectId(id) });
  }

  static find(filter) {
    if (filter && "_id" in filter) {
      filter["_id"] = new ObjectId(filter["_id"]);
    }

    return getDB().collection(TABLE_NAME).find(filter);
  }

  static validate(data) {
    const REQUIRED_FIELDS = [
      "customer_name",
      "email",
      "status",
      "contact_details",
    ];

    return new Promise(function (resolve, reject) {
      REQUIRED_FIELDS.forEach((field) => {
        if (!(field in data)) {
          reject(`${field} is required!`);
        }
      });

      if (!MAIL_REGEX.test(data["email"])) {
        reject(`'${data["email"]}' is an invalid email!`);
      }

      resolve();
    });
  }
}

module.exports = {
  CustomerModel,
};
