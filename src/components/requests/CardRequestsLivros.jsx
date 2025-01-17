import React, { useState, useEffect } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CardRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3005/requests-books');
        setRequests(response.data);
      } catch (error) {
        console.error('Erro ao buscar os requests:', error);
        toast.error('Erro ao carregar os requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = (id) => {
    try {
      axios.put(`http://localhost:3005/requests-books/${id}/status`, { status: 'accepted' });
      toast.success(`Request ${id} aceito!`);
    } catch (error) {
      console.error('Erro ao aceitar o request:', error);
      toast.error('Erro ao aceitar o request.');
    }
  };

  const handleRejectRequest = (id) => {
    try {
      axios.put(`http://localhost:3005/requests-books/${id}/status`, { status: 'rejected' });
      toast.error(`Request ${id} rejeitado!`);
    } catch (error) {
      console.error('Erro ao rejeitar o request:', error);
      toast.error('Erro ao rejeitar o request.');
    }
  };

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #6899E6', boxShadow: 4, borderRadius: '10px' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID do Request</TableCell>
            <TableCell>Solicitante</TableCell>
            <TableCell>Título do Livro</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <Row
                key={request.id}
                request={request}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhum request encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ request, onAccept, onReject }) {
  const [open, setOpen] = useState(false);
  const { id, uploadBook, requester } = request;
  const [status, setStatus] = useState(request.status);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell>{requester?.name || 'Desconhecido'}</TableCell>
        <TableCell>{uploadBook?.title || 'Nome não fornecido'}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: 'green', height: '25px', cursor: 'pointer', marginRight: '10px' }}
            onClick={() => {
                if (request.status === 'pending' && status === 'pending') {
                  onAccept(id);
                  setStatus('accepted');
                }
              }
            }
          />
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ color: 'red', height: '25px', cursor: 'pointer' }}
            onClick={() => {
                if (request.status === 'pending' && status === 'pending') {
                  onReject(id);
                  setStatus('rejected');
                }
              }
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Detalhes do Request
              </Typography>
              {uploadBook ? (
                <Table size="small" aria-label="book-details">
                  <TableBody>
                    <TableRow>
                      <TableCell>Título</TableCell>
                      <TableCell>{uploadBook.title || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Autor</TableCell>
                      <TableCell>{uploadBook.author || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Editora</TableCell>
                      <TableCell>{uploadBook.publisher || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ano de Publicação</TableCell>
                      <TableCell>{uploadBook.yearPublication || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Link</TableCell>
                      <TableCell>
                        <a href={uploadBook.link} target="_blank" rel="noopener noreferrer">
                          {uploadBook.link}
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Typography variant='span'>Sem informações do request.</Typography>
              )}
            </Box>  
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
