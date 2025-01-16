import React, { useEffect, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useLocation } from "react-router-dom";

import cleanArch from "../../assets/books/clean-arch.png";
import cleanCode from "../../assets/books/clean-code.png";
import felicidade from "../../assets/books/felicidade.png";
import calculo from "../../assets/books/calculo.png";
import so from "../../assets/books/so.png";
import redes from "../../assets/books/redes.png";
import algoritmos from "../../assets/books/algoritmos.png";
import archComp from "../../assets/books/arq-comp.png";


export default function BookCards() {
  const [books, setBooks] = useState([]);
  const filter = useLocation().search.replace("?", "");
  const query = filter ? `/search/${filter}` : "";
  
  useEffect(() => {
    axios.get(`http://localhost:3000/books${query}`).then((response) => {
      setBooks(response.data);
    });
  }, [filter]);
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {books.map((book, index) => (
        <Grid item size={{ xs: 6, sm: 4, md: 3 }} key={index}>
          <Card
            sx={{
              height: "100%",
              width: '100%',
              border: "1px solid #ddd",
              borderRadius: 2,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={book.image}
              alt={book.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", marginTop: 1 }}
              >
                {book.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
