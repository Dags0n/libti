import * as React from 'react';
import { styled, Typography } from '@mui/material';
import CardRequests from '../../components/requests/CardRequests';
import CardRequestsLivros from '../../components/requests/CardRequestsLivros';
import SelectionToggleButton from '../../components/home/SelectionSearch';

const ContainerRequests = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '20px 0',
  backgroundColor: '#ffffff',
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100vh - 64px)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 55px)',
  },
}));

const ContainerItemsRequests = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  width: '80%',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: '#013A93',
  textDecoration: 'none',
  wordWrap: 'nowrap',
  display: 'flex',
  margin: '2rem 0',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
    marginTop: '2rem',
  },
}));

export default function Requests() {
  const [toggleValue, setToggleValue] = React.useState('subject');

  return (
    <ContainerRequests>
      <StyledTypography variant="h1">REQUESTS</StyledTypography>
      <SelectionToggleButton
        value={toggleValue}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setToggleValue(newValue);
          }
        }}
      />
      <ContainerItemsRequests>
        {toggleValue === 'subject' ? <CardRequests /> : <CardRequestsLivros />}
      </ContainerItemsRequests>
    </ContainerRequests>
  );
}