const webContents = require("../../public/main");

const databaseErrorHandler = {
  connection: (e) => {
    webContents.send("error", "database-connection");
  },
};

module.exports = databaseErrorHandler;
