import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { parser } from '../../utils/m3uParser';

import Home from '../Home';
import ChannelsPage from '../ChannelsPage';
import ChannelPage from '../ChannelPage';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    minHeight: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();
  const [path, setPath] = useState('/home');
  const [source, setSource] = useState('https://iptv-org.github.io/iptv/countries/cn.m3u');
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState({ uri: '' });
  const [loading, setLoading] = React.useState(false);
  const loadSource = async () => {
    setLoading(true);
    try {
      const response = await axios.get(source);
      const parsed = parser(response.data);
      setChannels(parsed);
      setPath('/channels')
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <div className={classes.root}>
      {
        path === '/home' ?
        (
          <Home
            source={source}
            setSource={setSource}
            loadSource={loadSource}
          />
        ) : null
      }
      {
        path === '/channels' ?
        (
          <ChannelsPage
            channels={channels}
            gotoHomePage={() => setPath('/home')}
            gotoChannelPage={(selected) => {
              console.log(selected);
              setChannel(selected);
              setPath('/channel');
            }}
          />
        ) : null
      }
      {
        path === '/channel' ?
        (
          <ChannelPage
            channel={channel}
          />
        ) : null
      }
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
