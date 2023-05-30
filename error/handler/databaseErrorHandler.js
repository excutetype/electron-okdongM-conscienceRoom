const webContents = require("../../public/main");

const databaseErrorHandler = {
  connection: (e) => {
    webContents.send("error", JSON.stringify("database-connection"));
  },
  crud: (e) => {
    webContents.send("error", JSON.stringify("database-crud"));
  },
};

module.exports = databaseErrorHandler;
