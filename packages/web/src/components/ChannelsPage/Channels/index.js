import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LiveTvIcon from '@material-ui/icons/LiveTv';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: '80px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: grey[700],
    color: theme.palette.getContrastText(grey[700]),
    padding: '10px',
  },
  description: {
    color: grey[400],
  },
  logoContainer: {
    width: '40px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  logo: {
    backgroundColor: grey[400],
    objectFit: 'contain',
  },
  pinkLogo: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  content: {
    flex: 1,
    maxWidth: 'calc(100% - 50px)',
  },
  tag: {
    backgroundColor: grey[600],
    borderRadius: '10px',
    display: 'inline-block',
    padding: '2px 5px',
    fontSize: '12px',
    marginRight: '5px',
  },
  clickable: {
    cursor: 'pointer',
  }
}));

function ChannelLogo({ src, name, classes, onClick }) {
  if (src) {
    return (
      <div className={classes.logoContainer}>
        <Avatar
          classes={{ img: classes.logo }}
          src={src}
          alt={name}
          onClick={onClick}
        />
      </div>
    );
  }
  return (
    <div className={classes.logoContainer}>
      <Avatar
        className={classes.pinkLogo}
        alt={name}
        onClick={onClick}
      >
        { name ? (name.length > 2 ? name.slice(0, 2) : name) : <LiveTvIcon />}
      </Avatar>
    </div>
  );
}

function Channel({ name, logo, description, language, country, group, classes, gotoChannel }) {
  return (
    <Card className={classes.card}>
      <ChannelLogo src={logo} name={name} classes={classes} onClick={gotoChannel} />
      <div className={classes.content}>
        <Typography component="h6" variant="h6" onClick={gotoChannel} className={classes.clickable}>
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.description}
          noWrap
          onClick={gotoChannel}
          className={classes.clickable}
        >
          {description}
        </Typography>
        { language ? (
            <div className={classes.tag}>
              {language}
            </div>
          ) : null
        }
        { country ? (
            <div className={classes.tag}>
              {country}
            </div>
          ) : null
        }
        { group ? (
            <div className={classes.tag}>
              {group}
            </div>
          ) : null
        }
      </div>
    </Card>
  );
}

function Channels({ channels, gotoChannelPage }) {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
      <Grid container spacing={3}>
        {
          channels.map((channel) => (
            <Grid item xs={6} sm={4} key={channel['uri']}>
              <Channel
                name={channel['tvg-name']}
                description={channel['des']}
                logo={channel['tvg-logo']}
                country={channel['tvg-country']}
                language={channel['tvg-language']}
                group={channel['group-title']}
                uri={channel['uri']}
                classes={classes}
                gotoChannel={() => gotoChannelPage(channel)}
              />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Channels;