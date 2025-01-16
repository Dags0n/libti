import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const StyledToggleButton = styled(ToggleButton)(() => ({
  height: 24,
  margin: '0 12px 20px 0',
  padding: '12px',
  backgroundColor: 'white',
  color: '#013A93',
  fontSize: 12,
  textTransform: 'none',
  '&.Mui-selected': {
    backgroundColor: '#013A93',
    color: 'white',
    '&:hover': {
      backgroundColor: '#013A93',
    },
  },
  '&:hover': {
    backgroundColor: 'blue',
    color: 'white',
  },
  '&.MuiToggleButton-root': {
    borderRadius: '10px',
    border: '1px solid #013A93',
  },
}));

export default function SelectionToggleButton({ value, onChange }) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      aria-label="Platform"
    >
      <StyledToggleButton value="subject">Disciplina</StyledToggleButton>
      <StyledToggleButton value="books">Livro</StyledToggleButton>
    </ToggleButtonGroup>
  );
}