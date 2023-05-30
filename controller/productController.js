const { ipcMain } = require("electron");
const productService = require("../service/db/productService");

ipcMain.on("db-product-create", async (event, payload) => {
  try {
    const { name } = JSON.parse(payload);
    await productService.create(name);
    event.reply("reply-db-product-create", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-product-read-all", async (event, payload) => {
  try {
    const allProducts = await productService.readAll();
    event.reply("reply-db-product-read-all", JSON.stringify(allProducts ?? []));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-product-read", async (event, payload) => {
  try {
    const { id } = JSON.parse(payload);
    const product = await productService.read(id);
    event.reply("reply-db-product-read", JSON.stringify(product ?? ""));
  } catch (e) {
    throw e;
  }
});

ipcMain.on("db-product-delete", async (event, payload) => {
  try {
    const { id } = JSON.parse(payload);
    await productService.delete(id);
    event.reply("reply-db-product-delete", JSON.stringify({ success: true }));
  } catch (e) {
    throw e;
  }
});

module.exports = ipcMain;
