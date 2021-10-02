import React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

import { useTranslation } from 'react-i18next';

import { FiltersSelect } from './FiltersSelect';
import Channels from './Channels';

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function ChannelsPage({
  channels,
  gotoHomePage,
  gotoChannelPage,
  searchString,
  setSearchString,
  categories,
  selectedCategories,
  setSelectedCategories,
  languages,
  selectedLanguages,
  setSelectedLanguages,
}) {
  const { t } = useTranslation();
  return (
    <div>
     <AppBar position="fixed">
        <Toolbar variant="dense">
          <MenuButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={gotoHomePage}
          >
            <HomeIcon />
          </MenuButton>
          <Title variant="h6" noWrap>
            Hebo TV
          </Title>
          { languages.length > 1 ? (
              <FiltersSelect
                filters={languages}
                onChange={setSelectedLanguages}
                selectedFilters={selectedLanguages}
                placeholder={t('All languages')}
              />
            ) : null
          }
          { categories.length > 1 ? (
              <FiltersSelect
                filters={categories}
                onChange={setSelectedCategories}
                selectedFilters={selectedCategories}
                placeholder={t('All categories')}
              />
            ) : null
          }
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('Search...')}
              value={searchString}
              onChange={(event) => {
                setSearchString(event.target.value);
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Channels channels={channels} gotoChannelPage={gotoChannelPage} />
    </div>
  );
}

ChannelsPage.propTypes = {
  channels: PropTypes.array.isRequired,
  gotoHomePage: PropTypes.func.isRequired,
  gotoChannelPage: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
  setSearchString: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
  selectedLanguages: PropTypes.array.isRequired,
  setSelectedLanguages: PropTypes.func.isRequired,
};

export default ChannelsPage;
