import React from 'react';
import videojs from 'video.js'
import './index.css';

export const VideoPlayer = ( props ) => {

  const videoRef = React.useRef(null);
  const { options } = props;

  // This seperate functional component fixes the removal of the videoelement 
  // from the DOM when calling the dispose() method on a player
  const VideoHtml = ( props ) => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );

  React.useEffect( () => {
    const videoElement = videoRef.current;
    let player;
    const notifyVideoSize = () => {
      window.parent.postMessage({
        type: 'videoSize',
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      }, '*');
    };
    if (videoElement) {
      player = videojs(videoElement, options, () => {
        console.log("player is ready");
      });
      videoElement.addEventListener('loadedmetadata', notifyVideoSize);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', notifyVideoSize);
      }
      if (player) {
        player.dispose();
      }
    }
  }, [options]);

  return (<VideoHtml />);
}

export default VideoPlayer;
