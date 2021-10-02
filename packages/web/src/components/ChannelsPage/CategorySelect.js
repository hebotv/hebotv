import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getSelectMenuStyles(category, selectedFilters, theme) {
  if (selectedFilters.indexOf(category) > -1) {
    return {
      backgroundColor: theme.palette.grey[700]
    };
  }
  return {};
}

export function CategorySelect({ categories, selectedCategories, onChange }) {
  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value.indexOf('all') > -1) {
      onChange([]);
      return;
    }
    onChange(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <Select
      multiple
      displayEmpty
      value={selectedCategories}
      onChange={handleChange}
      input={<InputBase label="Category" />}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip label="All Categories" />
            </Box>
          );
        }
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        );
      }}
      MenuProps={MenuProps}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem value="all">
        All Categories
      </MenuItem>
      {categories.map((category) => (
        <MenuItem
          key={category}
          value={category}
          style={getSelectMenuStyles(category, selectedCategories, theme)}
        >
          {category}
        </MenuItem>
      ))}
    </Select>
  );
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
