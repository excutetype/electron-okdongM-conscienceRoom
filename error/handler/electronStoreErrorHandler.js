const webContents = require("../../public/main");

const ElectronStoreErrorHandler = {
  set: (e) => {
    webContents.send("error", "electronStore-set");
  },
  get: (e) => {
    webContents.send("error", "electronStore-get");
  },
};

module.exports = ElectronStoreErrorHandler;
