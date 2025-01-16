import * as React from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';
import { TextField, Typography, Box, Divider, Grid2 as Grid } from '@mui/material';
import { faBookSkull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function FormTextField(label, type, field) {
  return (
    <Box sx={{ width: 500, maxWidth: { xs: '80%', md: '65%' }, marginBottom: 2 }}>
      <StyledTextField fullWidth type={type} size='small' label={label} id={field} />
    </Box>
  );
}

function OuDivider() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" m="15px 0 0 0">
      <Divider sx={{ width: '100%', backgroundColor: 'lightblue' }} />
      <Typography sx={{ mx: 2, color: "#6899E6" }}>ou</Typography>
      <Divider sx={{ width: '100%', backgroundColor: 'lightblue' }} />
    </Box>
  );
}

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputLabel-root': {
    color: '#6899E6',
    fontFamily: 'Roboto',
    '&.Mui-focused': {
      color: '#013A93',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6899E6',
      borderRadius: '10px',
    },
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#013A93',
    },
  },
}));


const DivForm = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '90%',
}));

const StyledForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledSubmit = styled('input')(({ theme }) => ({
  height: '40px',
  border: 'none',
  borderRadius: '14px',
  backgroundColor: '#013A93',
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeight: 900,
  padding: '12px',
  marginTop: '15px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '65%',
  },
  ':hover': {
    backgroundColor: 'blue',
    transform: 'scale(1.05)',
    transition: 'all 0.3s',
  }
}));

const handleSubmit = async (e, login, isLogin, navigate, location) => {
  e.preventDefault();
  const redirectTo = location.state?.from?.pathname || "/";
  const username = e.target.email.value;
  const password = e.target.password.value;

  if (isLogin) {
    if (!username || !password) {
      toast.warn('Preencha todos os campos!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: username,
        password: password,
      });
      const { access_token } = response.data;
      
      login(access_token);
      navigate(redirectTo, { replace: true });
      toast.success('Login efetuado com sucesso!');
    } catch (error) {
      toast.error('Email ou senha inválidos!');
    }
  } else {
    const confirmPassword = e.target.confirmPassword.value;
    const name = e.target.name.value;

    if (!username || !password || !confirmPassword) {
      toast.warn('Preencha todos os campos!');
      return;
    }
    if (password !== confirmPassword) {
      toast.warn('As senhas não coincidem!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/users', {
        name: name,
        email: username,
        password: password,
      });
      handleSubmit(e, login, true, navigate, location);
    } catch (error) {
      toast.error('Erro ao criar a conta.');
    }
  }
};

export function FormAuth(props) {
  const { login, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, logout]);

  return (
    <DivForm>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Roboto',
          fontSize: 18,
          fontWeight: 1000,
          marginBottom: '55px',
          color: '#013A93'
        }}
      >
        {props.title.toUpperCase()}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 1000,
          marginBottom: '20px',
          color: '#013A93',
          width: { xs: '80%', md: '65%' },
        }}
      >
        <FontAwesomeIcon icon={faBookSkull} style={{ marginRight: '10px' }} />LIBTI
      </Typography>
      <StyledForm onSubmit={(e) => handleSubmit(e, login, props.isLogin, navigate, location)}>
        {props.fields.map((field) => FormTextField(field.fieldName, field.type, field.field))}
        <StyledSubmit type='submit' value={props.title} />
        {props.isLogin && (
          <Grid container sx={{ width: { xs: '80%', sm: '90%', md: '65%' }, mt: '20px' }}>
            <input type='checkbox' id='remember' />
            <Typography
              variant="h6"
              component="label"
              htmlFor='remember'
              sx={{
                color: '#012A93',
                fontSize: '12px',
                mr: 'auto'
              }}
            >
              Lembrar de mim
            </Typography>
            <Typography
              variant="h6"
              component="a"
              href='/esqueceu-senha'
              sx={{
                color: '#012A93',
                fontSize: '12px',
                textDecoration: 'none'
              }}
            >
              Esqueceu a senha?
            </Typography>
          </Grid>
        )}
        <Box sx={{ width: { xs: '30%', md: '25%' }, marginBottom: 2 }}>
          <OuDivider />
        </Box>
      </StyledForm>
    </DivForm>
  );
}