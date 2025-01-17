import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Box, Grid2 as Grid } from '@mui/material';
import InputFile from './InputFile';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function FormTextField(id, label, type) {
  if (type === 'file') {
    return <InputFile label={label} id={id} key={id} />;
  }
  return (
    <Box sx={{ width: '100%', marginBottom: 3 }} key={id}>
      <StyledTextField fullWidth type={type} label={label} id={id} />
    </Box>
  );
}

const DivForm = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '90%',
  margin: '30px 0',
}));

const ContainerUploadForm = styled('div')(() => ({
  backgroundColor: '#ffffff',
  padding: '20px',
  border: '1px solid #6899E6',
  borderRadius: '10px',
  width: '80vw',
}));

const StyledForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputLabel-root': {
    color: '#6899E6',
    fontFamily: 'Roboto',
    transform: 'translate(14px, 14px)',
    transition: 'all 0.2s ease-out',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
      color: '#013A93',
    },
  },
  '& .MuiOutlinedInput-root': {
    height: '50px',
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
  '& .MuiOutlinedInput-input': {
    padding: '14px',
  },
}));

const StyledSubmit = styled('input')(() => ({
  height: '40px',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#013A93',
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeight: 900,
  padding: '12px',
  marginTop: '15px',
  cursor: 'pointer',
  width: '100%',
  ':hover': {
    backgroundColor: 'blue',
    transform: 'scale(1.02)',
    transition: 'all 0.3s',
  }
}));

const handleSubmit = async (e, typeForm, cookies) => {
  e.preventDefault();

  if (typeForm === 'subject') {
    const disciplina = e.target.disciplina.value;
    const codigo = e.target.codigo.value;
    const professor = e.target.professor.value;
    const semestre = e.target.semestre.value;
    const linkArquivos = e.target.linkArquivos.value;

    if (!disciplina || !codigo || !professor || !semestre || !linkArquivos) {
      toast.warn('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await axios.post('http://localhost:3005/upload-subjects', {
        name: disciplina,
        code: codigo,
        teacher: professor,
        semester: semestre,
        fileLink: linkArquivos,
        user: cookies.userId,
      });

      e.target.reset();
      toast.success('Requisição enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      toast.error('Erro ao enviar requisição.');
    }
  } else if (typeForm === 'books') {
    const nomeLivro = e.target.nomeLivro.value;
    const linkDownload = e.target.linkDownload.value;
    const autor = e.target.autor.value;
    const editora = e.target.editora.value;
    const anoPublicacao = e.target.anoPublicacao.value;
    const edicao = e.target.edicao.value;
    const isbn = e.target.isbn.value;

    if (!nomeLivro || !linkDownload) {
      toast.warn('Preencha todos os campos obrigatórios!');
      return;
    }

    const bookData = {
      title: nomeLivro,
      author: autor,
      edition: edicao,
      publisher: editora,
      yearPublication: anoPublicacao,
      isbn: isbn,
      link: linkDownload,
      user: cookies.userId,
    };

    try {
      await axios.post('http://localhost:3005/upload-books', bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      e.target.reset();
      toast.success('Requisição enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      toast.error('Erro ao enviar requisição.');
    }
  }
};

export function FormUpload({ fields, typeForm }) {
  const [cookies] = useCookies(['userId']);
  return (
    <DivForm>
      <ContainerUploadForm>
        <Grid container>
          <StyledForm onSubmit={(e) => handleSubmit(e, typeForm, cookies)}>
            {fields.map((field) => FormTextField(field.id, field.label, field.type))}
            <StyledSubmit type='submit' value='Enviar Requisição' />
          </StyledForm>
        </Grid>
      </ContainerUploadForm>
    </DivForm>
  );
}