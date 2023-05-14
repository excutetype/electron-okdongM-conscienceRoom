const mysql = require("mysql2");
const ElectronStore = require("electron-store");
const store = new ElectronStore();

const stringifiedSetting = store.get("database-setting");
const databaseSetting = stringifiedSetting
  ? JSON.parse(stringifiedSetting)
  : null;

const database = mysql.createConnection({
  host: databaseSetting["DB_HOST"],
  user: databaseSetting["DB_USER"],
  database: databaseSetting["DB_DATABASE"],
  password: databaseSetting["DB_PASSWORD"],
});

const DatabaseError = require("../error/custom_error/DatabaseError");
database.on("error", () => {
  console.log("");
  throw new DatabaseError.ConnectionError();
});

module.exports = database;
