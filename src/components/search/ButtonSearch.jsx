import React, { useState } from 'react';
import { styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    margin: '40px 0',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0',
  },
}));

const StyledSearchField = styled('input')(({ theme }) => ({
  padding: '14px',
  borderRadius: '12px 0 0 12px',
  border: '1px solid #013A93',
  color: '#013A93',
  outline: 'none',
  '&.placeholder': {
    color: '#013A93',
  },
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60%',
  },
}));

const StyledButton = styled('button')(() => ({
  padding: '15px',
  borderRadius: '0 12px 12px 0',
  border: 'none',
  backgroundColor: '#013A93',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#507AC2',
  },
}));

export default function ButtonSearch() {
  const navigate = useNavigate();
  const { filter } = useParams();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (!filter) return;
    navigate(`/search/${filter}?${search}`);
  };

  return (
    <StyledContainer>
      <StyledSearchField
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <StyledButton type="button" onClick={handleSearch}>
        Buscar
      </StyledButton>
    </StyledContainer>
  );
}
