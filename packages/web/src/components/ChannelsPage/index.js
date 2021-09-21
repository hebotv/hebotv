import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

import Channels from './Channels';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

let filterTimeout = null;
function ChannelsPage({ channels, gotoHomePage, gotoChannelPage }) {
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
  const [filteredChannels, setFilteredChannels] = useState(channels);

  useEffect(() => {
    if (searchString.length === 0) {
      setFilteredChannels(channels);
    }
    if (filterTimeout) {
      clearTimeout(filterTimeout);
      filterTimeout = null;
    }
    let filterStr = searchString.toLowerCase();
    filterTimeout = setTimeout(() => {
      setFilteredChannels(channels.filter((channel) => {
        let found = false;
        Object.keys(channel).forEach((key) => {
          if (found) {
            return;
          }
          if (!channel[key] || typeof channel[key] !== 'string') {
            return;
          }
          found = channel[key].toLowerCase().indexOf(filterStr) > -1
        });
        return found;
      }))
    }, 500);
  }, [searchString, channels]);

  useEffect(() => {
    if (filterTimeout) {
      clearTimeout(filterTimeout);
      filterTimeout = null;
    }
  }, []);
  // TODO: filter and search
  return (
    <div className={classes.root}>
     <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={gotoHomePage}
          >
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Hebo TV
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(event) => {
                setSearchString(event.target.value);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Channels channels={filteredChannels} gotoChannelPage={gotoChannelPage} />
    </div>
  );
}

export default ChannelsPage;