const sqlite3 = require("sqlite3");
const DatabaseError = require("../error/custom_error/DatabaseError");

const db = new sqlite3.Database("model/DB.db", (err) => {
  if (err) {
    throw new DatabaseError.ConnectionError();
  } else {
    console.log("db open");
  }
});

module.exports = db;
