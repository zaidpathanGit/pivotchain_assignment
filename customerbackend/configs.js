// APPLICATION CONFIGURATIONS

SERVER_PORT = 8000;
DB_NAME = "APP_DEV_CUSTOMERS";
DB_URL =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

module.exports = {
  SERVER_PORT,
  DB_URL,
  DB_NAME,
};
