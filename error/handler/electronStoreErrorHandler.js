const webContents = require("../../public/main");

const electronStoreErrorHandler = {
  set: (e) => {
    webContents.send("error", JSON.stringify("electronStore-set"));
  },
  get: (e) => {
    webContents.send("error", JSON.stringify("electronStore-get"));
  },
};

module.exports = electronStoreErrorHandler;
