import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';

import { useTranslation } from 'react-i18next';

import { VideoPlayer } from './VideoPlayer';

const Root = styled('div')({
  position: 'relative',
  width: '100%',
  minHeight: '100%',
});

const StyledBreadcrumbs = styled(Breadcrumbs)({
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
});

const StyledLink = styled(Link)({
  display: 'flex',
});

const StyledHomeIcon = styled(HomeIcon)(({ theme}) => ({
  marginRight: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  width: 20,
  height: 20,
}));

let menuVisibleTimeout = null;

function ChannelPage({ channel, gotoHomePage, gotoChannelsPage }) {
  const [menuVisible, setMenuVisible] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    return () => {
      if (menuVisibleTimeout) {
        clearTimeout(menuVisibleTimeout);
        menuVisibleTimeout = null;
      }
    }
  }, [])
  return (
    <Root>
      <StyledBreadcrumbs aria-label="breadcrumb" hidden={!menuVisible}>
        <StyledLink color="inherit" href="#/" onClick={gotoHomePage}>
          <StyledHomeIcon />
          {t('Home')}
        </StyledLink>
        <Link
          color="inherit"
          href="#/channels"
          onClick={gotoChannelsPage}
        >
          {t('Channels')}
        </Link>
        <span>
          {channel.name || channel.des}
        </span>
      </StyledBreadcrumbs>
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
          liveui: true,
          sources: [{
            src: channel.uri,
            type: 'application/x-mpegurl'
          }]
        }}
      />
    </Root>
  );
}

ChannelPage.propTypes = {
  channel: PropTypes.object.isRequired,
  gotoHomePage: PropTypes.func.isRequired,
  gotoChannelsPage: PropTypes.func.isRequired,
};

export default ChannelPage;
