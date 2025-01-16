import * as React from 'react';
import { Grid2 as Grid, styled, Typography } from '@mui/material';
import BibliotecaMovel from '../../assets/auth/biblioteca-movel.png';
import { FormAuth } from '../../components/forms/FormAuth';

const ContainerAuth = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100vh - 64px)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)',
  },
}));

const DivImagem = styled('div')(() => ({
  backgroundColor: '#013A93',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '90%',
}));

const Title = styled('Typography')(() => ({
  color: 'white',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: 36,
}));

const SubTitle = styled('Typography')(() => ({
  color: '#6899E6',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: 20,
  marginBottom: '40px',
}));

export default function Auth(props) {
  return (
    <ContainerAuth>
      <Grid
        container
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid
          size={6.5}
          sx={{
            height: '100%',
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'center',
            backgroundColor: '#013A93'
          }}
        >
          <DivImagem>
            <Title variant="h6">Bem vindo(a) ao LIBTI!</Title>
            <SubTitle variant="h6">Entre ou cadastre-se para ter acesso a funcionalidades extras.</SubTitle>
            <img src={BibliotecaMovel} alt="Logo LIBTI" style={{ width: '200px' }} />
          </DivImagem>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 5.5 }}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FormAuth
            title={props.isLogin ? 'Fazer Login' : 'Criar conta'}
            fields={[
              ...(!props.isLogin ? [{ field: 'name', fieldName: 'Nome', type: 'text' }] : []),
              { field: 'email', fieldName: 'Email', type: 'email' },
              { field: 'password', fieldName: 'Senha', type: 'password' },
              ...(!props.isLogin ? [{ field: 'confirmPassword', fieldName: 'Confirme sua senha', type: 'password' }] : []),
            ]}            
            isLogin={props.isLogin}
          />
          {props.isLogin && (
            <Typography
              variant="h6"
              sx={{
                color: '#6899E6',
                fontFamily: 'Roboto',
                fontSize: 14,
              }}
            >
              Ainda não tem conta? <a href='/cadastro' style={{ color: '#013A93', textDecoration: 'none' }}>Crie uma conta</a>
            </Typography>
          )}
          {!props.isLogin && (
            <Typography
              variant="h6"
              sx={{
                color: '#6899E6',
                fontFamily: 'Roboto',
                fontSize: 14,
              }}
            >
              Já possui uma conta? <a href='/login' style={{ color: '#013A93', textDecoration: 'none' }}>Faça login</a>
            </Typography>
          )}
        </Grid>
      </Grid>
    </ContainerAuth>
  );
}