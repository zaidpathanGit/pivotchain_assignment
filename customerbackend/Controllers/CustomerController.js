// MODELS IMPORTS
const { CustomerModel } = require("../Models/CustomerModel");

class CustomerController {
  static getAllCustomers(req, res) {
    const { page, pageSize } = req.query;

    Promise.all([
      CustomerModel.find().count(),
      CustomerModel.all(page, pageSize),
    ]).then((response) => {
      res.status(200).send({ total: response[0], data: response[1] });
    });
  }

  static async addNewCustomer(req, res) {
    const data = req.body;
    await CustomerModel.validate(data)
      .then((ress) => {
        CustomerModel.create(data)
          .then((result) => {
            res.status(201).send(result);
          })
          .catch((error) => {
            res.status(500).send({ error: "Error occured!" });
          });
      })
      .catch((error) => {
        res.status(400).send({ error: error });
      });
  }

  static updateCustomer(req, res) {
    const { id } = req.params;
    const data = req.body;
    CustomerModel.update(data, id)
      .then((result) => {
        res.status(200).send({ info: "Customer updated successfully!" });
      })
      .catch((error) => {
        res.status(500).send({ error: "Error occured!" });
      });
  }

  static removeCustomer(req, res) {
    const { id } = req.params;
    CustomerModel.delete(id)
      .then((result) => {
        res.status(200).send({ info: "Customer deleted successfully!" });
      })
      .catch((error) => {
        res.status(500).send({ error: "Error occured!" });
      });
  }

  static getStats(req, res) {
    Promise.all([
      CustomerModel.find({}).count(),
      CustomerModel.find({ status: "Active" }).count(),
      CustomerModel.find({ status: "Inactive" }).count(),
    ])
      .then((statsData) => {
        res.status(200).send({
          "Total Customers": statsData[0],
          "Active Customers": statsData[1],
          "Inactive Customers": statsData[2],
        });
      })
      .catch((error) => {
        res.status(500).send({ error: "Error occured!" });
      });
  }

  static getCustomerDetails(req, res) {
    const { id } = req.params;
    CustomerModel.find({ _id: id })
      .toArray()
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        res.status(500).send({ error: "Error occured!" });
      });
  }
}

module.exports = {
  CustomerController,
};
