import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Grid2 } from "@mui/material";
import { MenuBook } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ButtonDisciplinas = styled(Button)(({ theme }) => ({
  backgroundColor: "#013A93",
  color: "white",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    height: '150px',
    width: '220px',
    fontSize: 20,
    borderRadius: 12,
  },
  [theme.breakpoints.down("sm")]: {
    height: '100px',
    width: '120px',
    fontSize: 10,
    borderRadius: 6,
  },
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease',
    backgroundColor: 'blue',
  },
}));

const TitleButton = styled(Typography)(({ theme }) => ({
  color: "white",
  marginBottom: 20,
  fontFamily: "Roboto",
  [theme.breakpoints.up("sm")]: {
    fontSize: 15,
    marginBottom: 20,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
    marginBottom: 3,
  },
}));

const SubTitleButton = styled(Typography)(({ theme }) => ({
  color: "white",
  opacity: 0.7,
  fontFamily: "Roboto",
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    fontSize: 12,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 7,
  },
}));

export default function CardSubject() {
  const [subjects, setSubjects] = useState([]);
  const filter = useLocation().search.replace("?", "");
  const query = filter ? `/search/${filter}` : "";
  
  useEffect(() => {
    axios.get(`http://localhost:3000/subject${query}`).then((response) => {
      setSubjects(response.data);
    });
  }, [filter, query]);

  return (
    <div style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <Grid2 container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
        {subjects.map((subject, index) => (
          <Grid2 item size={{ xs: 6, sm: 4, md: 3 }} key={index}>
            <ButtonDisciplinas
              variant="contained"
              color="primary"
            >
              <TitleButton variant="h6">
                {subject.name}
              </TitleButton>
              <SubTitleButton >
                {subject.semester} <MenuBook sx={{ height: { xs: '10px', sm: '15px' } }} />
              </SubTitleButton>
            </ButtonDisciplinas>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}
