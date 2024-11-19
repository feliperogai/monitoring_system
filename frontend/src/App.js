import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';

function App() {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/status')
      .then((response) => {
        setStatus(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Erro ao carregar os dados');
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
        Monitoramento de Recarga de Veículos Elétricos
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {status.map((veiculo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {veiculo.nome}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {veiculo.status}
                  </Typography>
                  <Typography color="textSecondary">
                    Fonte de Energia: {veiculo.fonteEnergia}
                  </Typography>
                  <Typography color="textSecondary">
                    Hora de Início: {veiculo.horaInicio}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                    Detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;