const route = require("express").Router();

// CONTROLLER IMPORTS
const { CustomerController } = require("../Controllers/CustomerController");

route.get("/get_all_customers", CustomerController.getAllCustomers);

route.post("/add_customer", CustomerController.addNewCustomer);

route.patch("/update_customer/:id", CustomerController.updateCustomer);

route.delete("/delete_customer/:id", CustomerController.removeCustomer);

route.get("/get_stats", CustomerController.getStats)

route.get("/get_customer_details/:id", CustomerController.getCustomerDetails)

module.exports = {
  customerRoutes: route,
};
