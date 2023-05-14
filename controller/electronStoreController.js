const { ipcMain } = require("electron");
const electronStoreService = require("../service/electron_store/electronStoreService");

ipcMain.on("electronStore-set-database-setting", (event, payload) => {
  try {
    electronStoreService.set.databaseSetting(JSON.parse(payload));
    event.reply("reply-electronStore-set-database-setting", JSON.stringify({}));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("electronStore-get-database-setting", (event) => {
  try {
    const setting = electronStoreService.get.databaseSetting();
    event.reply(
      "reply-electronStore-get-database-setting",
      JSON.stringify(setting)
    );
  } catch (e) {
    throw e;
  }
});

ipcMain.on("electronStore-get-password", (event) => {
  try {
    const password = electronStoreService.get.password();
    event.reply("reply-electronStore-get-password", JSON.stringify(password));
  } catch (e) {
    throw e;
  }
});

module.exports = ipcMain;
