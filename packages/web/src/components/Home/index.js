import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(() => ({
  centerBlock: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  start: {
    margin: '20px',
  },
  input: {
    width: '100%',
    marginBottom: '20px',
  }
}));

function Home({ source, setSource, loadSource }) {
  const classes = useStyles();
  return (
    <Container className={classes.centerBlock} maxWidth="sm">
      <Typography className={classes.start} variant="h5" align="center">
        Input IPTV M3U URI
      </Typography>
      <TextField
        className={classes.input}
        variant="outlined"
        value={source}
        onChange={(event) => {
          setSource(event.target.value);
        }}
      />
      <Button
        size="large"
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={loadSource}
      >
        Start
      </Button>
    </Container>
  );
}

export default Home;
