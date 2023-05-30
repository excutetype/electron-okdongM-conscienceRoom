const { ipcRenderer } = window.require("electron");

function ipcOn(channel, callback) {
  ipcRenderer.on(channel, (event, payload) => {
    callback(JSON.parse(payload));
  });
}

export default ipcOn;
