import React from 'react';

import { VideoPlayer } from './VideoPlayer';

function ChannelPage({ channel }) {
  return (
    <VideoPlayer
      options={{
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: channel.uri,
          type: 'application/x-mpegurl'
        }]
      }}
    />
  )
}

export default ChannelPage;
