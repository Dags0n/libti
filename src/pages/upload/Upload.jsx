import * as React from 'react';
import { Grid2 as Grid, styled, Typography } from '@mui/material';
import { FormUpload } from '../../components/forms/FormUpload';
import SelectionToggleButton from '../../components/home/SelectionSearch';

const ContainerUpload = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: '#ffffff',
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100vh - 64px)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 55px)',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: '#013A93',
  textDecoration: 'none',
  wordWrap: 'nowrap',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
    marginTop: '2rem',
  },
}));

const fieldsLivro = [
  { id: 'imagemCapa', label: 'Anexar Imagem da Capa *', type: 'file' },
  { id: 'nomeLivro', label: 'Nome do Livro *', type: 'text' },
  { id: 'linkDownload', label: 'Link para Download *', type: 'text' },
  { id: 'autor', label: 'Autor', type: 'text' },
  { id: 'editora', label: 'Editora', type: 'text' },
  { id: 'anoPublicacao', label: 'Ano de Publicação', type: 'number' },
  { id: 'edicao', label: 'Edição', type: 'number' },
  { id: 'isbn', label: 'ISBN', type: 'text' },
];

const fieldsMaterial = [
  { id: 'disciplina', label: 'Nome da Disciplina *', type: 'text' },
  { id: 'codigo', label: 'Código da Disciplina *', type: 'text' },
  { id: 'professor', label: 'Professor *', type: 'text' },
  { id: 'semestre', label: 'Semestre *', type: 'text' },
  { id: 'linkArquivos', label: 'Link para Arquivos *', type: 'text' },
  { id: 'conteudoDisciplina', label: 'Anexar Conteúdo da Disciplina *', type: 'file' },
];

export default function Upload() {
  const [toggleValue, setToggleValue] = React.useState('subject');

  return (
    <ContainerUpload>
      <Grid container>
        <Grid item size={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <StyledTypography variant="h1">UPLOAD</StyledTypography>
          <SelectionToggleButton
            value={toggleValue}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                setToggleValue(newValue);
              }
            }}
          />
        </Grid>
        <Grid item size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {toggleValue === 'subject' ? <FormUpload typeForm={toggleValue} fields={fieldsMaterial} /> : <FormUpload typeForm={toggleValue} fields={fieldsLivro} />}
        </Grid>
      </Grid>
    </ContainerUpload>
  );
}