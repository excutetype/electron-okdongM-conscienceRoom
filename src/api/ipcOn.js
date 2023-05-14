const { ipcRenderer } = window.require("electron");

function ipcOn(channel, callback) {
  ipcRenderer.on(channel, (event, payload) => {
    callback(payload);
  });
}

export default ipcOn;
