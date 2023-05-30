const db = require("../../config/sqlite");
const DatabaseError = require("../../error/custom_error/DatabaseError");

const studentService = {
  create: async (student) => {
    try {
      return new Promise((resolve, reject) => {
        const { id, grade, class_NM, number, name } = student;

        db.run(
          "INSERT INTO student (id, grade, class_NM, number, name) VALUES (?, ?, ?, ?, ?)",
          [id, grade, class_NM, number, name],
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
  readToId: async (id) => {
    try {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM student WHERE id = ?", [id], (err, row) => {
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
  readToAttributes: async (attributes) => {
    try {
      return new Promise((resolve, reject) => {
        const { grade, class_NM, number } = attributes;
        db.get(
          "SELECT * FROM student WHERE grade = ? AND class_NM = ? AND number = ?",
          [grade, class_NM, number],
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
        db.run("DELETE FROM student WHERE id = ?", [id], [id], (err, row) => {
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

module.exports = studentService;
