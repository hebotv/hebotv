import React from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const CenterContainer = styled(Container)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

const StartTypography = styled(Typography)({
  margin: '20px',
});

const Input = styled(TextField)({
  width: '100%',
  marginBottom: '20px',
});

function Home({ source, setSource, loadSource }) {
  return (
    <CenterContainer maxWidth="sm">
      <StartTypography variant="h5" align="center">
        Input IPTV M3U URI
      </StartTypography>
      <Input
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
    </CenterContainer>
  );
}

export default Home;
