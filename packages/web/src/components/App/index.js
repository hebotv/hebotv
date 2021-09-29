import React, { useState } from 'react';
import axios from 'axios';
import useGlobalStorage from 'use-global-storage';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { parser } from '../../utils/m3uParser';

import Home from '../Home';
import ChannelsPage from '../ChannelsPage';
import ChannelPage from '../ChannelPage';

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.text.primary,
}));

const useStorage = useGlobalStorage({
  storageOptions: { name: 'hebo-tv' },
});

function App() {
  const history = useHistory();
  const [source, setSource] = useStorage('source', 'https://iptv-org.github.io/iptv/index.m3u');
  const [channels, setChannels] = useStorage('channels', []);
  const [channel, setChannel] = useStorage('channel', { uri: '' });
  const [loading, setLoading] = useState(false);
  const loadSource = async () => {
    setLoading(true);
    try {
      const response = await axios.get(source);
      const parsed = parser(response.data);
      setChannels(parsed);
      history.push('/channels')
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  return (
    <StyledRoot>
      <Switch>
        <Route path="/channels">
          <ChannelsPage
            channels={channels}
            gotoHomePage={() => history.push('/')}
            gotoChannelPage={(selected) => {
              setChannel(selected);
              history.push('/channel');
            }}
          />
        </Route>
        <Route path="/channel">
          <ChannelPage
            channel={channel}
            gotoHomePage={() => history.push('/')}
            gotoChannelsPage={() => history.push('/channels')}
          />
        </Route>
        <Route path="/">
          <Home
            source={source}
            setSource={setSource}
            loadSource={loadSource}
          />
        </Route>
      </Switch>
      <StyledBackdrop open={loading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
    </StyledRoot>
  );
}

function RouterApp() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default RouterApp;
