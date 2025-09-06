const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  saveImage: (imageUrl) => ipcRenderer.send('save-image', imageUrl)
});
