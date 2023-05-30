const electronStoreController = require("./electronStoreController");
const productController = require("./productController");
const studentController = require("./studentController");
const borrowController = require("./borrowController");
const appController = require("./appController");

module.exports = [(electronStoreController, productController, studentController, borrowController, appController)];
