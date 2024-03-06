const { app, BrowserWindow } = require('electron');

function createWindow() {
  const port = app.commandLine.getSwitchValue('port') || 3000;

  const win = new BrowserWindow({
    // resizable: false,
    fullscreen: true,

    width: 1920 * 0.7,
    height: 1080 * 0.7,
    webPreferences: {
      nodeIntegration: true
    }
  });

  process.stdout.write(`port: ${port}\n`);
  win.loadURL(`http://localhost:${port}`);
}

app.whenReady().then(createWindow);
