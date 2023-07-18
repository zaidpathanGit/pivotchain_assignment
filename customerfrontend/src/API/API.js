export const BASE_URL = `${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_HOST_NAME}:${process.env.REACT_APP_SERVER_PORT}`;

export const getStatsAPI = async () =>
  await fetch(BASE_URL + "/customer/get_stats");

export const addNewCustomerAPI = async (values) =>
  await fetch(BASE_URL + "/customer/add_customer", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateCustomerAPI = async (id, values) =>
  await fetch(BASE_URL + "/customer/update_customer/" + id, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getAllCustomersAPI = async (page = 0, pageSize = 20) =>
  await fetch(
    BASE_URL +
      "/customer/get_all_customers" +
      "?page=" +
      page +
      "&pageSize=" +
      pageSize
  );

export const deleteCustomerAPI = async (id) =>
  await fetch(BASE_URL + "/customer/delete_customer/" + id, {
    method: "DELETE",
  });

export const getCustomerDetailsAPI = async (id) =>
  await fetch(BASE_URL + "/customer/get_customer_details/" + id);
