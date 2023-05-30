const { ipcMain } = require("electron");
const appService = require("../service/app/appService");
const borrowService = require("../service/db/borrowService");

ipcMain.on("app-excel-print", async (event, payload) => {
  try {
    const data = await borrowService.readAllJoinStudentAndProduct();
    await appService.printExcel(data);
    event.reply("reply-app-excel-print", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

module.exports = ipcMain;
