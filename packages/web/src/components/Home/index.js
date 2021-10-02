import React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { useTranslation } from 'react-i18next';

const StyledContainer = styled(Container)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

const StyledTypography = styled(Typography)({
  margin: '20px',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[500],
    },
    '&.Mui-focused fieldset': {
      border: 'solid 1px',
      borderColor: theme.palette.grey[100],
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[300],
  borderColor: theme.palette.grey[400],
  '&:hover': {
    color: theme.palette.grey[100],
    borderColor: theme.palette.grey[100],
    boxShadow: `${alpha(theme.palette.grey[100], 0.1)} 0 0 0 2px`,
  },
}));

function Home({ source, setSource, loadSource }) {
  const { t } = useTranslation();
  return (
    <StyledContainer maxWidth="sm">
      <StyledTypography variant="h5" align="center">
        {t('Input IPTV M3U URI')}
      </StyledTypography>
      <StyledTextField
        variant="outlined"
        value={source}
        onChange={(event) => {
          setSource(event.target.value);
        }}
      />
      <StyledButton
        size="large"
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={loadSource}
      >
        {t('Start')}
      </StyledButton>
    </StyledContainer>
  );
}

Home.propTypes = {
  setSource: PropTypes.func.isRequired,
  loadSource: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
};

export default Home;
