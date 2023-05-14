const DatabaseError = require("../custom_error/DatabaseError");
const ElectronStoreError = require("../custom_error/ElectronStoreError");

const databaseErrorHandler = require("./databaseErrorHandler");
const ElectronStoreErrorHandler = require("./electronStoreErrorHandler");

function errorHandler(e) {
  if (e instanceof DatabaseError.ConnectionError) {
    databaseErrorHandler.connection(e);
  } else if (e instanceof ElectronStoreError.setStoreError) {
    ElectronStoreErrorHandler.set(e);
  } else if (e instanceof ElectronStoreError.getStoreError) {
    ElectronStoreErrorHandler.get(e);
  }
}

module.exports = errorHandler;
