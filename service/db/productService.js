const db = require("../../config/sqlite");
const DatabaseError = require("../../error/custom_error/DatabaseError");

const productService = {
  create: async (name) => {
    try {
      db.run("INSERT INTO product (name) VALUES (?)", [name]);
    } catch {
      throw new DatabaseError.CRUDError();
    }
  },
  readAll: async () => {
    try {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM product", (err, rows) => {
          resolve(rows);
        });
      });
    } catch {
      throw new DatabaseError.CRUDError();
    }
  },
  delete: async (id) => {
    try {
      db.run("DELETE FROM product WHERE id = (?)", [id]);
    } catch {
      throw new DatabaseError.CRUDError();
    }
  },
};

module.exports = productService;
