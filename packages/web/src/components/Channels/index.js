import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowY: 'auto',
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
    width: 50,
    display: 'flex',
    alignItems: 'start',
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
  },
  tag: {
    backgroundColor: grey[600],
    borderRadius: '10px',
    display: 'inline-block',
    padding: '2px 5px',
    fontSize: '12px',
    marginRight: '5px',
  },
}));

function ChannelLogo({ src, name, classes }) {
  if (src) {
    return (
      <div className={classes.logoContainer}>
        <Avatar
          classes={{ img: classes.logo }}
          src={src}
          alt={name}
        />
      </div>
    );
  }
  return (
    <div className={classes.logoContainer}>
      <Avatar
        className={classes.pinkLogo}
        alt={name}
      >
        {name.length > 2 ? name.slice(0, 2) : name}
      </Avatar>
    </div>
  );
}

function Channel({ name, logo, description, language, uri, country, group, classes }) {
  return (
    <Card className={classes.card}>
      <ChannelLogo src={logo} name={name} classes={classes} />
      <div className={classes.content}>
        <Typography component="h6" variant="h6">
          {name}
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
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

function Channels({ channels }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {
          channels.map((channel) => (
            <Grid item xs={6} sm={4} lg={3} key={channel['uri']}>
              <Channel
                name={channel['tvg-name']}
                description={channel['des']}
                logo={channel['tvg-logo']}
                country={channel['tvg-country']}
                language={channel['tvg-language']}
                group={channel['group-title']}
                uri={channel['uri']}
                classes={classes}
              />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Channels;