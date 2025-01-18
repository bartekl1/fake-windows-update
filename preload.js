const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
    onConfigs: (callback) => ipcRenderer.on("configs", (_event, value) => callback(value)),
    exit: (value) => ipcRenderer.send("exit"),
});
