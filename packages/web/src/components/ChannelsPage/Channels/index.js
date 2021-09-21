import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Channel } from './Channel';
import { useWindowDimensions } from './useWindowDimensions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  listColumn: {
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
}));

function Channels({ channels, gotoChannelPage }) {
  const classes = useStyles();
  const [mappedChannels, setMappedChannels] = useState([]);
  const windowSize = useWindowDimensions();
  useEffect(() => {
    console.log(channels);
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
        <Grid container spacing={3} className={classes.listColumn}>
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
        </Grid>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <FixedSizeList
        itemCount={mappedChannels.length + 1}
        itemSize={91}
        width={'100%'}
        height={windowSize.height}
      >
        {Column}
      </FixedSizeList>
    </div>
  );
}

export default Channels;