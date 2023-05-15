const { ipcMain } = require("electron");
const electronStoreService = require("../service/electron_store/electronStoreService");

ipcMain.on("electronStore-set", (event, payload) => {
  try {
    const { key, value } = JSON.parse(payload);
    electronStoreService.set(key, value);
    event.reply("reply-electronStore-set", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("electronStore-get", (event, payload) => {
  try {
    const { key, nonexistentKeyValue } = JSON.parse(payload);
    const value = electronStoreService.get(key, nonexistentKeyValue);
    event.reply("reply-electronStore-get", JSON.stringify(value));
  } catch (e) {
    throw e;
  }
});

module.exports = ipcMain;
