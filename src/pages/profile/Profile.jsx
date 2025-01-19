import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Avatar, TextField, Button, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useCookies } from "react-cookie";

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

export default function Profile() {
  const [cookies] = useCookies(["userId"]);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState({ email: true, senha: true });

  useEffect(() => {
    const userId = cookies.userId;
    if (userId) {
      axios
        .get(`http://localhost:3005/users/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          toast.error("Erro ao carregar os dados do usuário!");
        });
    }
  }, [cookies]);

  const handleReport = (e) => {
    e.preventDefault();
    const updatedUser = {
      name: user.name,
      email: user.email,
    };

    if (password) {
      updatedUser.password = password;
    }

    const userId = cookies.userId;
    if (userId) {
      axios
        .put(`http://localhost:3005/users/${userId}`, updatedUser)
        .then(() => {
          toast.success("Usuário alterado com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao alterar o usuário!");
        });
    }
  };

  const handleEdit = (field) => {
    setDisabled((prev) => ({ ...prev, [field]: !prev[field] }));
  };

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
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={user.email}
            disabled={disabled.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: "pointer" }} onClick={() => handleEdit("email")}>
                  <Edit />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            disabled={disabled.senha}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: "pointer" }} onClick={() => handleEdit("senha")}>
                  <Edit />
                </InputAdornment>
              ),
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
