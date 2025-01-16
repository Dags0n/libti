import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Avatar, TextField, Button, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { Edit } from "@mui/icons-material";

const StyledForm = styled("form")(() => ({
  width: "100%",
  margin: "10px 0",
  display: "flex",
  flexDirection: "column",
  "& label": {
    color: "#6899E6",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6899E6",
      borderRadius: "10px",
    },
    "&:hover fieldset": {
      borderColor: "#013A93",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6899E6",
    },
  },
  "& .MuiInputBase-input": {
    color: "#013A93",
  },
}));

const style = {
  display: { xs: "block", sm: "flex" },
  flexDirection: { xs: "column", sm: "row" },
  alignItems: "center",
  justifyContent: "center",
  width: { xs: "90%", sm: "70%" },
  margin: "auto",
  padding: 2,
  mt: { xs: 2, sm: 5 },
};

const handleReport = (e) => {
  e.preventDefault();
  if (e.target.name.value === "" || e.target.email.value === "" || e.target.password.value === "") {
    toast.warn("Preencha todos os campos!");
  } else {
    toast.success("Perfil alterado com Sucesso!");
  }
};


export default function Profile() {
  const [disabled, setDisabled] = React.useState({
    email: true,
    senha: true
  });

  const [values, setValues] = React.useState({
    name: "Admin",
    email: "admin@admin",
  });

  const handleEdit = (field) => {
    setDisabled({ ...disabled, [field]: !disabled[field] });
  }

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          borderRadius: 4,
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src="https://super.abril.com.br/wp-content/uploads/2018/07/5281183b865be245b1000225gorila.jpeg?quality=70&w=720&crop=1"
            sx={{ width: 100, height: 100 }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{
              textTransform: "none",
              color: "#013A93",
              borderColor: "#6899E6",
              ":hover": { borderColor: "#013A93" },
              width: "100%",
              margin: "auto 10px",
            }}
          >
            Alterar Foto de Perfil
            <input type="file" accept="image/*" hidden />
          </Button>
        </Box>
        <StyledForm onSubmit={handleReport}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            margin="normal"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={values.email}
            disabled={disabled.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => handleEdit('email')}><Edit /></InputAdornment>,
              },
            }}
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            disabled={disabled.senha}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => handleEdit('senha')}><Edit /></InputAdornment>,
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#6899E6",
              color: "white",
              mt: 2,
            }}
            type="submit"
          >
            Salvar Alterações
          </Button>
        </StyledForm>
      </Box>
    </Box>
  );
}
