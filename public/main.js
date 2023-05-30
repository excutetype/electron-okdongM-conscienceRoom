const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

const remote = require("@electron/remote/main");
remote.initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  remote.enable(win.webContents);

  module.exports = win.webContents;

  win.webContents.once("did-finish-load", () => {
    const unhandled = require("electron-unhandled");
    const errorHandler = require("../error/handler");
    unhandled({ logger: errorHandler });

    // serial port setting

    const { SerialPort } = require("serialport");
    const AppError = require("../error/custom_error/AppError");

    try {
      const serialport = new SerialPort({ path: "COM4", baudRate: 9600 }, (err) => {
        if (err) {
          throw new AppError.OpenSerialportError(err);
        }
      });
      serialport.on("open", (err) => {
        if (err) {
          throw new AppError.OpenSerialportError(err);
        }

        serialport.on("data", async (data) => {
          const cardId = data.toString("utf8").replace("\r", "");
          win.webContents.send("app-scanning-card", JSON.stringify({ userId: cardId }));
        });
      });
    } catch (e) {
      return e;
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    db.close((err) => {
      if (err) {
        console.log("some thing wrong at close db", err);
      } else {
        console.log("db close");
      }
    });
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

require("../controller");
const db = require("../config/sqlite");
