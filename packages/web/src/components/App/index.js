import React, { useState, useMemo, useEffect } from 'react';
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

const Root = styled('div')(({ theme }) => ({
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

function getGroupNames(channels) {
  const groups = {};
  channels.forEach((channel) => {
    if (channel['group-title'] && !groups[channel['group-title']]) {
      groups[channel['group-title']] = 1;
    }
  });
  return Object.keys(groups);
}

function filterChannels(channels, categories, searchString) {
  if (categories.length === 0 && searchString.length === 0) {
    return channels;
  }
  const filterStr = searchString.toLowerCase();
  return channels.filter((channel) => {
    if (categories.length > 0 && categories.indexOf(channel['group-title']) === -1) {
      return false;
    }
    if (filterStr.length === 0) {
      return true;
    }
    let found = false;
    Object.keys(channel).forEach((key) => {
      if (found) {
        return;
      }
      if (!channel[key] || typeof channel[key] !== 'string') {
        return;
      }
      found = channel[key].toLowerCase().indexOf(filterStr) > -1;
    });
    return found;
  });
}

let filterTimeout = null;
function App() {
  const history = useHistory();
  const [source, setSource] = useStorage('source', 'https://iptv-org.github.io/iptv/index.m3u');
  const [channels, setChannels] = useStorage('channels', []);
  const [channel, setChannel] = useStorage('channel', { uri: '' });
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useStorage('searchString', '');
  const [filteredChannels, setFilteredChannels] = useState(channels);
  const categories = useMemo(() => getGroupNames(channels), [channels]);
  const [selectedCategories, setSelectedCategories] = useStorage('selectedCategories', []);
  const loadSource = async () => {
    setLoading(true);
    try {
      const response = await axios.get(source);
      const parsed = parser(response.data);
      setSearchString('');
      setSelectedCategories([]);
      setChannels(parsed);
      history.push('/channels')
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    if (filterTimeout) {
      clearTimeout(filterTimeout);
      filterTimeout = null;
    }
    filterTimeout = setTimeout(() => {
      setFilteredChannels(
        filterChannels(channels, selectedCategories, searchString),
      );
    }, 500);
    return () => {
      if (filterTimeout) {
        clearTimeout(filterTimeout);
        filterTimeout = null;
      }
    }
  }, [channels, searchString, selectedCategories]);

  return (
    <Root>
      <Switch>
        <Route path="/channels">
          <ChannelsPage
            channels={filteredChannels}
            gotoHomePage={() => history.push('/')}
            gotoChannelPage={(selected) => {
              setChannel(selected);
              history.push('/channel');
            }}
            searchString={searchString}
            setSearchString={setSearchString}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
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
    </Root>
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
