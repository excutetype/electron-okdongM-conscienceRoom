const { ipcRenderer } = window.require("electron");

function ipcSend(channel, payload) {
  return new Promise((resolve) => {
    ipcRenderer.send(channel, JSON.stringify(payload));
    ipcRenderer.on(`reply-${channel}`, (event, payload) => {
      resolve(JSON.parse(payload));
    });
  });
}

export default ipcSend;
