import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js'
import './index.css';

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, onMouseEnter, onMouseLeave } = props;

  useEffect( () => {
    let player;
    const notifyVideoSize = () => {
      window.parent.postMessage({
        type: 'videoSize',
        width: videoElement.videoWidth,
        height: videoElement.videoHeight
      }, '*');
    };
    const videoElement = videoRef.current;
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      if (videoElement) {
        playerRef.current = videojs(videoElement, options, () => {
          console.log("player is ready");
          onReady && onReady(player);
        });
      }
    }
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', notifyVideoSize);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', notifyVideoSize);
      }
    }
  }, [options]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

VideoPlayer.propTypes = {
  options: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

VideoPlayer.defaultProps = {
  onReady: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
};

export default VideoPlayer;
