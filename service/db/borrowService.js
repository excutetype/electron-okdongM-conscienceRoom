const db = require("../../config/sqlite");
const DatabaseError = require("../../error/custom_error/DatabaseError");

const borrowService = {
  createMany: async (borrows) => {
    try {
      borrows.forEach((borrow) => {
        const { borrower, product } = borrow;
        db.run("INSERT INTO borrow (borrower, product) VALUES (?, ?)", [borrower, product]);
      });
      return;
    } catch (e) {
      throw e;
    }
  },
  read: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM borrow WHERE id = ?;", [id], (err, row) => {
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
  readAllJoinProduct: async (borrowerId) => {
    try {
      return new Promise((resolve, reject) => {
        db.all(
          "SELECT b.*, p.name as product_name FROM borrow as b, product as p WHERE b.product = p.id AND b.borrower = ?; ",
          [borrowerId],
          (err, row) => {
            if (err) {
              reject(new DatabaseError.CRUDError(err));
            }
            resolve(row);
          }
        );
      });
    } catch (e) {
      throw e;
    }
  },
  readAllJoinStudentAndProduct: async () => {
    try {
      return new Promise((resolve, reject) => {
        db.all(
          `SELECT b.*, 
           s.grade as borrower_grade, s.class_NM as borrower_class_NM, s.number as borrower_number, s.name as borrower_name, 
           p.name as product_name 
           FROM borrow as b JOIN student as s ON b.borrower = s.id JOIN product as p ON b.product = p.id; `,
          (err, row) => {
            if (err) {
              reject(new DatabaseError.CRUDError(err));
            }
            resolve(row);
          }
        );
      });
    } catch (e) {
      throw e;
    }
  },
  update: async (id, originalData, newData) => {
    try {
      return new Promise((resolve, reject) => {
        const new_returned_date = newData?.returned_date ?? originalData.returned_date;
        const new_due_date = newData?.due_date ?? originalData.due_date;
        db.run(
          "UPDATE borrow SET returned_date = ?, due_date = ? WHERE id = ?",
          [new_returned_date, new_due_date, id],
          (err, row) => {
            if (err) {
              reject(new DatabaseError.CRUDError(err));
            }
            resolve(row);
          }
        );
      });
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM borrow WHERE id = (?)", [id], (err, row) => {
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

module.exports = borrowService;
