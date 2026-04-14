const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    // ✅ Native title bar
    frame: true,
    titleBarStyle: "default", // important
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
}

const { Menu } = require("electron");
Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);
