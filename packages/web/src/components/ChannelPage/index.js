import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

import { VideoPlayer } from './VideoPlayer';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    minHeight: '100%',
  },
  hidden: {
    display: 'none',
  },
  breadcrumbs: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(43, 51, 63, 0.7)',
    color: '#fff',
    padding: '0 10px',
    zIndex: 999,
    lineHeight: '30px',
    height: '30px',
    fontSize: '13px',
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

let menuVisibleTimeout = null;

function ChannelPage({ channel }) {
  const classes = useStyles();
  const [menuVisible, setMenuVisible] = useState(true);
  useEffect(() => {
    return () => {
      if (menuVisibleTimeout) {
        clearTimeout(menuVisibleTimeout);
        menuVisibleTimeout = null;
      }
    }
  }, [])
  const breadcrumbClass = menuVisible ? classes.breadcrumbs : classes.hidden;
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb" className={breadcrumbClass}>
        <Link color="inherit" href="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        <Link
          color="inherit"
          href="/"
        >
          Channels
        </Link>
        <span className={classes.link}>
          {channel.name || channel.des}
        </span>
      </Breadcrumbs>
      <VideoPlayer
        onMouseEnter={() => {
          if (menuVisibleTimeout) {
            clearTimeout(menuVisibleTimeout);
            menuVisibleTimeout = null;
          }
          setMenuVisible(true);
        }}
        onMouseLeave={
          () => {
            if (menuVisibleTimeout) {
              clearTimeout(menuVisibleTimeout);
              menuVisibleTimeout = null;
            }
            menuVisibleTimeout = setTimeout(() => {
              setMenuVisible(false);
            }, 3000);
          }
        }
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
    </div>
  )
}

export default ChannelPage;
