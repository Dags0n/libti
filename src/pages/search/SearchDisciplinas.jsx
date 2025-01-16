import * as React from 'react';
import { styled } from '@mui/material';
import CardSubject from '../../components/search/CardSubject';

const ContainerSearch = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  padding: '20px',
  width: '90%',
  justifySelf: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchDisciplinas() {
  return (
    <ContainerSearch>
      <CardSubject />
    </ContainerSearch>
  );
}