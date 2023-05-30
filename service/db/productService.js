const db = require("../../config/sqlite");
const DatabaseError = require("../../error/custom_error/DatabaseError");

const productService = {
  create: async (name) => {
    try {
      new Promise((resolve, reject) => {
        db.run("INSERT INTO product (name) VALUES (?)", [name], (err, row) => {
          if (err) {
            reject(new DatabaseError.CRUDError(err));
          }
          resolve(row);
        });
      });
    } catch (e) {
      throw e;
    }
  },
  readAll: async () => {
    try {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM product", (err, row) => {
          if (err) {
            reject(new DatabaseError.CRUDError(err));
          }
          resolve(row);
        });
      });
    } catch (e) {
      throw e;
    }
  },
  read: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM product WHERE id = ?", [id], (err, row) => {
          if (err) {
            reject(new DatabaseError.CRUDError(err));
          }
          resolve(row);
        });
      });
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM product WHERE id = (?)", [id], (err, row) => {
          if (err) {
            reject(new DatabaseError.CRUDError(err));
          }
          resolve(row);
        });
      });
    } catch (e) {
      throw e;
    }
  },
};

module.exports = productService;
