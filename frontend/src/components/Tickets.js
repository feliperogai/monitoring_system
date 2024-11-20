import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o token JWT está no localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redireciona para o login se não houver token
    } else {
      // Realizar a requisição para obter os tickets
      axios
        .get('http://localhost:5000/api/tickets', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTickets(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Erro ao carregar os tickets');
          setLoading(false);
        });
    }
  }, [navigate]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;