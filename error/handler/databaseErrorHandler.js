const webContents = require("../../public/main");

const databaseErrorHandler = {
  connection: (e) => {
    webContents.send("error", "database-connection");
  },
  crud: (e) => {
    webContents.send("error", "database-crud");
  },
};

module.exports = databaseErrorHandler;
