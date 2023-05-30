const DatabaseError = require("../custom_error/DatabaseError");
const ElectronStoreError = require("../custom_error/ElectronStoreError");
const AppError = require("../custom_error/AppError");

const databaseErrorHandler = require("./databaseErrorHandler");
const electronStoreErrorHandler = require("./electronStoreErrorHandler");
const appErrorHandler = require("./appErrorHandler");

function errorHandler(e) {
  console.log("error! : ", e);
  if (e instanceof DatabaseError.ConnectionError) {
    databaseErrorHandler.connection(e);
  } else if (e instanceof DatabaseError.CRUDError) {
    databaseErrorHandler.crud(e);
  } else if (e instanceof ElectronStoreError.setStoreError) {
    electronStoreErrorHandler.set(e);
  } else if (e instanceof ElectronStoreError.getStoreError) {
    electronStoreErrorHandler.get(e);
  } else if (e instanceof AppError.PrintExcelError) {
    appErrorHandler.printExcel(e);
  } else if (e instanceof AppError.OpenSerialportError) {
    appErrorHandler.openSerialport(e);
  }
}

module.exports = errorHandler;
