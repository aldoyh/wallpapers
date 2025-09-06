const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const bgsDir = path.join(__dirname, 'bgs');
const imageUrlsFile = path.join(__dirname, 'image_urls.json');

function createWindow() {
  // Generate image_urls.json
  fs.readdir(bgsDir, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    const imageUrls = files.map(file => `bgs/${file}`);
    fs.writeFile(imageUrlsFile, JSON.stringify(imageUrls), err => {
      if (err) {
        console.error('Error writing image_urls.json', err);
        process.exit(1);
      }
    });
  });

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('save-image', (event, imageUrl) => {
  const imagePath = path.join(__dirname, imageUrl);
  dialog.showSaveDialog({
    title: 'Save Image',
    defaultPath: path.join(app.getPath('downloads'), path.basename(imageUrl)),
    buttonLabel: 'Save',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }).then(file => {
    if (!file.canceled) {
      fs.copyFile(imagePath, file.filePath.toString(), (err) => {
        if (err) throw err;
        console.log('Image saved successfully');
      });
    }
  }).catch(err => {
    console.log(err);
  });
});
