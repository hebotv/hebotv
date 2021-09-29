import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { FixedSizeList } from 'react-window';
import Grid from '@mui/material/Grid';

import { Channel } from './Channel';
import { useWindowDimensions } from './useWindowDimensions';

const Root = styled('div')({
  display: 'flex',
});

const ListColumn = styled(Grid)(({ theme }) => ({
  maxWidth: '960px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

function Channels({ channels, gotoChannelPage }) {
  const [mappedChannels, setMappedChannels] = useState([]);
  const windowSize = useWindowDimensions();
  useEffect(() => {
    let columnCount;
    if (windowSize.width >= 600) {
      columnCount = 3;
    } else {
      columnCount = 2;
    }
    const grouped = Array.from({ length: Math.ceil(channels.length / columnCount) }, (v, i) =>
      channels.slice(i * columnCount, i * columnCount + columnCount)
    );
    setMappedChannels(grouped);
  }, [windowSize, channels]);
  const Column = ({ index, style }) => {
    if (index === 0) {
      return (<div style={style}></div>);
    }
    const columnChannels = mappedChannels[index - 1];
    if (!columnChannels) {
      return null;
    }
    return (
      <div style={style}>
        <ListColumn container spacing={3}>
          {
            columnChannels.map((channel) => (
              <Grid item xs={6} sm={4} key={channel['uri']}>
                <Channel
                  description={channel['des']}
                  logo={channel['tvg-logo']}
                  country={channel['tvg-country']}
                  language={channel['tvg-language']}
                  group={channel['group-title']}
                  uri={channel['uri']}
                  gotoChannel={() => gotoChannelPage(channel)}
                />
              </Grid>
            ))
          }
        </ListColumn>
      </div>
    );
  };
  Column.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  return (
    <Root>
      <FixedSizeList
        itemCount={mappedChannels.length + 1}
        itemSize={85}
        width={'100%'}
        height={windowSize.height}
      >
        {Column}
      </FixedSizeList>
    </Root>
  );
}

Channels.propTypes = {
  channels: PropTypes.array.isRequired,
  gotoChannelPage: PropTypes.func.isRequired,
};

export default Channels;