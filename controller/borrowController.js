const { ipcMain } = require("electron");
const borrowService = require("../service/db/borrowService");

ipcMain.on("db-borrow-create-many", async (event, payload) => {
  try {
    const { borrows } = JSON.parse(payload);
    await borrowService.createMany(borrows);
    event.reply("reply-db-borrow-create-many", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-borrow-read-all-id-join-product", async (event, payload) => {
  try {
    const { borrowerId } = JSON.parse(payload);
    const borrows = await borrowService.readAllJoinProduct(borrowerId);
    event.reply("reply-db-borrow-read-all-id-join-product", JSON.stringify(borrows));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-borrow-update", async (event, payload) => {
  try {
    const { id, updateData } = JSON.parse(payload);
    const originalData = await borrowService.read(id);
    await borrowService.update(id, originalData, updateData);
    event.reply("reply-db-borrow-update", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-borrow-delete", async (event, payload) => {
  try {
    const { id } = JSON.parse(payload);
    await borrowService.delete(id);
    event.reply("reply-db-borrow-delete", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

module.exports = ipcMain;
