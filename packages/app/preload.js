const { ipcRenderer } = require('electron');

console.log('preload');

ipcRenderer.on('main-message', function (e, message) {
  // get message from main process
});

window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'videoSize') {
    ipcRenderer.send('video-loaded', {
      width: e.data.width,
      height: e.data.height
    });
  }
});

