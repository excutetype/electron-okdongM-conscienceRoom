const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("model/DB.db", (err) => {
  if (err) {
    console.log("something wrong at db open", err);
  } else {
    console.log("db open");
  }
});

module.exports = db;
