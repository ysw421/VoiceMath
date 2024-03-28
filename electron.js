// const { app, BrowserWindow } = require('electron');

// function createWindow() {
//   const port = app.commandLine.getSwitchValue('port') || 3000;

//   const win = new BrowserWindow({
//     // resizable: false,
//     fullscreen: true,

//     width: 1920 * 0.7,
//     height: 1080 * 0.7,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   });

//   process.stdout.write(`port: ${port}\n`);
//   win.loadURL(`http://localhost:${port}`);
// }

// app.whenReady().then(createWindow);

// const { app, BrowserWindow } = require("electron");
// const serve = require("electron-serve");
// const path = require("path");

// const appServe = app.isPackaged ? serve({
//   directory: path.join(__dirname, "../out")
// }) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    fullscreen: true,

    width: 1920 * 0.7,
    height: 1080 * 0.7,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL('app://-');
    });
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    win.webContents.on('did-fail-load', (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
