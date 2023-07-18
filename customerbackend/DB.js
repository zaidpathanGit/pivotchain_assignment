// CONFIGS
const { DB_URL, DB_NAME } = require("./configs");

const MongoClient = require("mongodb").MongoClient;

let db = null;

const connectDB = (callback) =>
  MongoClient.connect(DB_URL)
    .then((con) => {
      db = con.db(DB_NAME);
      callback();
    })
    .catch((error) => {
      console.log("Unable to connect to DB!");
      console.log(error);
    });

function getDB() {
  if (!db) {
    new Error("Unable to connect to DB!");
  }
  return db;
}

module.exports = {
  getDB,
  connectDB,
};
