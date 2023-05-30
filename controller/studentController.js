const { ipcMain } = require("electron");
const studentService = require("../service/db/studentService");

ipcMain.on("db-student-create", async (event, payload) => {
  try {
    const stduent = JSON.parse(payload);
    await studentService.create(stduent);
    event.reply("reply-db-student-create", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-student-read-id", async (event, payload) => {
  try {
    const { id } = JSON.parse(payload);
    const student = await studentService.readToId(id);
    event.reply("reply-db-student-read-id", JSON.stringify(student ?? {}));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-student-read-attributes", async (event, payload) => {
  try {
    const attributes = JSON.parse(payload);
    const student = await studentService.readToAttributes(attributes);
    event.reply("reply-db-student-read-attributes", JSON.stringify(student ?? {}));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-student-delete", async (event, payload) => {
  try {
    const { id } = JSON.parse(payload);
    await studentService.delete(id);
    event.reply("reply-db-student-delete", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

module.exports = ipcMain;
