const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL('http://localhost:3000');
  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, './src/pages/mode.tsx'),
  //     protocol: 'file:',
  //     slashes: true
  //   })
  // );
}

app.whenReady().then(createWindow);
