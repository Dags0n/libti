import React, { useState } from 'react';
import { styled, Grid2 as Grid, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: '#013A93',
  textDecoration: 'none',
  wordWrap: 'nowrap',
  display: 'flex',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  margin: '10px 0',
  '& label': {
    color: '#6899E6',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6899E6',
      borderRadius: '10px',
    },
    '&:hover fieldset': {
      borderColor: '#013A93',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6899E6',
    },
  },
  '& .MuiInputBase-input': {
    color: '#013A93',
  },
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '70%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '60%',
  },
}));

const StyledButton = styled('button')(({ theme }) => ({
  backgroundColor: 'white',
  color: '#013A93',
  border: '1px solid #013A93',
  borderRadius: '12px',
  padding: '10px 20px',
  cursor: 'pointer',
  margin: '20px 0',
  '&:hover': {
    backgroundColor: '#013A93',
    color: 'white',
  },
}));

export default function FormContact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value
    const email = event.target.email.value;
    const subject = event.target.subject.value;
    const message = event.target.message.value;

    if (!name || !email || !subject || !message) {
      toast.warn('Preencha todos os campos!');
      return;
    }
    
    const data = {
      name: name,
      email: email,
      subject: subject,
      text: message,
    };

    try {
      setLoading(true);
      axios.post('http://localhost:3005/email/send', data);
      toast.success('Mensagem enviada com sucesso!');
      event.target.reset();
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      toast.error('Erro ao enviar a mensagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ width: '100%' }}>
      <Grid item size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StyledTypography variant="h3">CONTATO</StyledTypography>
      </Grid>
      <Grid item size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <StyledTextField
                id='name'
                label='Nome'
                variant='outlined'
                sx={{
                  width: { xs: '100%', sm: '97%' },
                }}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledTextField
                id='email'
                label='Email'
                variant='outlined'
                type='email'
                sx={{
                  width: { xs: '100%', sm: '97%' },
                }}
              />
            </Grid>
            <Grid item size={12}>
              <StyledTextField
                id='subject'
                label='Assunto'
                variant='outlined'
              />
            </Grid>
            <Grid item size={12}>
              <StyledTextField
                id="message"
                label="Mensagem"
                multiline
                rows={5}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <StyledButton type='submit' disabled={loading}>{loading ? 'Enviando...' : 'Enviar mensagem'}</StyledButton>
        </StyledForm>
      </Grid>
    </Grid>
  )
}