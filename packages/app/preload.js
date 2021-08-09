const { ipcRenderer } = require('electron');

console.log('preload');

function init() {
  console.log('init');
  const video = document.querySelector('video');

  video.addEventListener('loadedmetadata', () => {
    ipcRenderer.send('video-loaded', {
      width: video.videoWidth,
      height: video.videoHeight
    });
  });
}

ipcRenderer.on('main-message', function (e, message) {
  // get message from main process
});

window.addEventListener('load', () => {
  init();
});