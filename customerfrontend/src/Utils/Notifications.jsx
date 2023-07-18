import { notification } from "antd";

export const notifications = (type, message, description) => {
  notification.open({
    type,
    message,
    description,
  });
};

export const NOTIFICATION_MESSAGES = {
  GET_STATS_ERROR: "Unable to get statistics",
  GET_LIST_ERROR: "Unable to get customer list!",
  DELETE_SUCCESS: "Customer deleted successfully.",
  DELETE_ERROR: "Unable to delete customer!",
  DELETE_CONFIRMATION: "Are you sure to delete this customer?",
  UPDATE_SUCCESS: "Customer updated successfully.",
  UPDATE_ERROR: "Unable to update customer!",
  ADD_SUCCESS: "Customer added successfully.",
  ADD_ERROR: "Unable to add new customer!",
  GET_CUSTOMER_ERROR: "Unable to get customer details!",
};
