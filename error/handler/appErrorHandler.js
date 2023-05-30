const webContents = require("../../public/main");

const appErrorHandler = {
  printExcel: (e) => {
    webContents.send("error", JSON.stringify("app-print-Excel"));
  },
  openSerialport: (e) => {
    webContents.send("error", JSON.stringify("app-open-serialport"));
  },
};

module.exports = appErrorHandler;
