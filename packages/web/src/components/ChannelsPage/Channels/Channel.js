import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LiveTvIcon from '@material-ui/icons/LiveTv';

const useStyles = makeStyles((theme) => ({
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
  tags: {
    overflow: 'auto',
    height: '26px',
  },
  tag: {
    backgroundColor: grey[600],
    borderRadius: '10px',
    display: 'inline-block',
    padding: '2px 5px',
    fontSize: '12px',
    marginRight: '5px',
    marginTop: '5px',
  },
  clickable: {
    cursor: 'pointer',
  }
}));

function ChannelLogo({ src, name, onClick, classes }) {
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

export function Channel({ logo, description, language, country, group, gotoChannel }) {
  const classes = useStyles();
  const tags = [group, country, language].filter(i => !!i);
  return (
    <Card className={classes.card}>
      <ChannelLogo src={logo} name={description} classes={classes} onClick={gotoChannel} />
      <div className={classes.content}>
        <Typography
          variant="subtitle2"
          className={classes.description}
          noWrap
          onClick={gotoChannel}
          className={classes.clickable}
        >
          {description}
        </Typography>
        {
          tags.length > 0 ? (
            <div
              className={classes.tags}
              title={tags.join(',')}
            >
              {
                tags.map(tag => (
                  <div className={classes.tag} title={tag} key={tag}>
                    {tag}
                  </div>
                ))
              }
            </div>
          ) : null
        }
      </div>
    </Card>
  );
}
