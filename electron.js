const { app, BrowserWindow } = require('electron');

function createWindow() {
  const port = app.commandLine.getSwitchValue('port') || 3000;

  const win = new BrowserWindow({
    // resizable: false,
    fullscreen: true,

    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  process.stdout.write(`port: ${port}\n`);
  win.loadURL(`http://localhost:${port}`);
}

app.whenReady().then(createWindow);
