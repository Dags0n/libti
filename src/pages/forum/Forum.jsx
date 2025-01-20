import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";
import TopicModal from "../../components/forum/TopicModal";
import axios from "axios";
import { useCookies } from "react-cookie";

const defaultAvatar =
  "https://super.abril.com.br/wp-content/uploads/2018/07/5281183b865be245b1000225gorila.jpeg?quality=70&w=720&crop=1";

const ButtonNewTopic = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #013A93",
  padding: "10px",
  marginBottom: "16px",
  borderRadius: "10px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.01)",
  },
  cursor: "pointer",
}));

export default function Forum() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentVisibleComment, setCurrentVisibleComment] = useState(null);
  const [currentVisibleText, setCurrentVisibleText] = useState(null);
  const [cookies] = useCookies(["userId"]);

  useEffect(() => {
    axios.get("http://localhost:3005/posts").then((response) => {
      const postsWithCommentsPromises = response.data.map((post) => {
        return axios
          .get(`http://localhost:3005/posts/${post.id}/comments`)
          .then((commentResponse) => {
            const commentsWithUserNames = commentResponse.data.map((comment) => {
              return axios
                .get(`http://localhost:3005/users/${comment.userId}`)
                .then((userResponse) => {
                  comment.userName = userResponse.data.name;
                  return comment;
                })
                .catch((err) => {
                  console.error("Erro ao carregar o nome do usuário:", err);
                  return comment;
                });
            });
  
            return Promise.all(commentsWithUserNames).then((updatedComments) => {
              post.comments = updatedComments;
              return post;
            });
          })
          .catch((err) => {
            console.error("Erro ao carregar comentários:", err);
            return post;
          });
      });
  
      Promise.all(postsWithCommentsPromises)
        .then((postsWithComments) => {
          setPosts(postsWithComments);
        })
        .catch((err) => {
          console.error("Erro ao carregar posts e comentários:", err);
        });
    });
  }, [posts]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpvote = async (id) => {
    try {
      await axios.post(`http://localhost:3005/posts/${id}/votes`, {
        userId: cookies.userId,
      });
      toast.success("Voto cadastrado com sucesso");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao votar";
      toast.error(errorMessage);
    }
  };
  
  const handleDownvote = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/posts/${id}/votes/${cookies.userId}`, {
        userId: cookies.userId,
      });
      toast.success("Voto removido com sucesso");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao votar";
      toast.error(errorMessage);
    }
  };

  const handleComentShow = (id) => {
    setCurrentVisibleComment(currentVisibleComment === id ? null : id);
  };

  const handleTextShow = (id) => {
    setCurrentVisibleText(currentVisibleText === id ? null : id);
  };

  const handleReport = (event, postId) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value.trim();
    if (!comment) {
      toast.warn("Comentário vazio");
    } else {
      try {
        axios.post(`http://localhost:3005/posts/${postId}/comments`, { 
          text: comment,
          userId: cookies.userId,
        });
        toast.success("Comentário enviado com sucesso");
        event.target.elements.comment.value = "";
      } catch (error) {
        toast.error("Erro ao enviar comentário");
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <TopicModal open={open} handleClose={handleClose} />
      <ButtonNewTopic onClick={handleOpen}>
        <Typography variant="body" sx={{ color: "#013A93" }}>
          Criar Novo Tópico
        </Typography>
        <SendIcon color="primary" />
      </ButtonNewTopic>
      {posts.map((post) => (
        <Paper
          key={post.id}
          sx={{
            padding: 2,
            marginBottom: 2,
            border: "1px solid #013A93",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex">
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                mt={1}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleUpvote(post.id)}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  {post.votes}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => handleDownvote(post.id)}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="caption" color="primary" ml={2}>
                  {post.date}
                </Typography>
                <Typography
                  variant="body1"
                  ml={2}
                  sx={{
                    color: "#013A93",
                    fontWeight: "bold",
                  }}
                >
                  {post.text}
                </Typography>
                <Box display="flex" alignItems="center" mt={2} ml={2} gap={2}>
                  <IconButton onClick={() => handleTextShow(post.id)}>
                    <ChatBubbleOutlineIcon color="primary" />
                    <Typography variant="body2" color="primary">
                      {Array.isArray(post.comments) ? post.comments.length : 0}
                    </Typography>
                  </IconButton>
                  <IconButton>
                    <ReportGmailerrorredIcon color="primary" />
                  </IconButton>
                </Box>
              </Box>
              <IconButton
                onClick={() => handleComentShow(post.id)}
                sx={{
                  ml: "auto",
                  mt: "auto",
                }}
              >
                {currentVisibleComment === post.id ? (
                  <KeyboardArrowUpIcon color="primary" />
                ) : (
                  <KeyboardArrowDownIcon color="primary" />
                )}
              </IconButton>
            </Box>
            <Box>
              {currentVisibleComment === post.id && Array.isArray(post.comments) && post.comments.length > 0 &&
                post.comments.map((comment, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #013A93",
                      borderRadius: 2,
                      padding: 1,
                      marginTop: 4,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Box display="flex">
                      <Avatar
                        src={defaultAvatar}
                        sx={{
                          width: 30,
                          height: 30,
                          marginRight: 1,
                          ml: 1,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#013A93",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.userName}
                      </Typography>
                    </Box>
                    <Box mt={1} ml={2}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          color: "#013A93",
                        }}
                      >
                        {comment.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              {currentVisibleText === post.id && (
                <Box
                  mt={2}
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <form onSubmit={(e) => handleReport(e, post.id)}>
                    <TextField
                      id="comment"
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Comentar..."
                      InputProps={{
                        endAdornment: (
                          <IconButton type="submit">
                            <SendIcon color="primary" />
                          </IconButton>
                        ),
                      }}
                    />
                  </form>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </Container>
  );
}
