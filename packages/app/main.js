const { app, BrowserWindow, session, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 576,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  if (app.isPackaged) {
    mainWindow.loadURL('https://hebotv.github.io/web/');
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }
  // and load the index.html of the app.
  // win.loadFile('index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()
}

const CORSfilter = {
  urls: ['*://*/*.m3u*', '*://*/*.ts', '*://*/*.ts*', '*://*/*.jpg', '*://*/*.jpg*', '*://*/*.png'],
};

app.whenReady().then(() => {
  session.defaultSession.webRequest.onBeforeSendHeaders(CORSfilter, (details, callback) => {
    const url = new URL(details.url);
    details.requestHeaders['User-Agent'] = details.requestHeaders['User-Agent'].replace('Electron', 'App');
    details.requestHeaders['Origin'] = url.origin;
    details.requestHeaders['Referer'] = details.url;
    callback({ requestHeaders: details.requestHeaders })
  });
  session.defaultSession.webRequest.onHeadersReceived(CORSfilter, (details, callback) => {
    if (details.responseHeaders['access-control-allow-origin']) {
      details.responseHeaders['access-control-allow-origin'] = ['*'];
    } else {
      details.responseHeaders['Access-Control-Allow-Origin'] = ['*'];
    }
    callback({ responseHeaders: details.responseHeaders })
  });
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

ipcMain.on('video-loaded', (event, message) => {
  // console.log(message);
  if (message.height === 0) {
    return;
  }
  const ratio = message.width / message.height;
  const originSize = mainWindow.getContentSize();
  mainWindow.setContentSize(originSize[0], Math.round(originSize[0] / ratio));
  mainWindow.setAspectRatio(ratio);
});
