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

export default function CardRequestsSubjects() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3005/requests-subjects');
        setRequests(response.data);
      } catch (error) {
        console.error('Erro ao buscar os requests:', error);
        toast.error('Erro ao carregar os requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = (request) => {
    try {
      axios.put(`http://localhost:3005/requests-subjects/${request.id}/status`, { status: 'accepted' });
      axios.post(`http://localhost:3005/subject`, request.uploadSubject);
      toast.success(`Request ${request.id} aceito!`);
    } catch (error) {
      console.error('Erro ao aceitar o request:', error);
      toast.error('Erro ao aceitar o request.');
    }
  };

  const handleRejectRequest = (request) => {
    try {
      axios.put(`http://localhost:3005/requests-subjects/${request.id}/status`, { status: 'rejected' });
      toast.error(`Request ${request.id} rejeitado!`);
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
            <TableCell>Disciplina</TableCell>
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
  const { id, uploadSubject, requester } = request;
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
        <TableCell>{uploadSubject?.name || 'Disciplina não fornecida'}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: status === 'pending' ? 'green' : 'gray', height: '25px', cursor: 'pointer', marginRight: '10px' }}
            onClick={() => {
                if (request.status === 'pending' && status === 'pending') {
                  onAccept(request)
                  setStatus('accepted')
                }
              }
            }
          />
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ color: status === 'pending' ? 'red' : 'gray', height: '25px', cursor: 'pointer' }}
            onClick={() => {
                if (request.status === 'pending' && status === 'pending') {
                  onReject(request)
                  setStatus('rejected')
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
              {uploadSubject ? (
                <Table size="small" aria-label="subject-details">
                  <TableBody>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>{uploadSubject.name || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Professor</TableCell>
                      <TableCell>{uploadSubject.teacher || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Semestre</TableCell>
                      <TableCell>{uploadSubject.semester || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Link</TableCell>
                      <TableCell>
                        <a href={uploadSubject.fileLink} target="_blank" rel="noopener noreferrer">
                          {uploadSubject.fileLink || 'N/A'}
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="span">Sem informações do request.</Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
