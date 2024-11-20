import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const [statusList, setStatusList] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    axios.get('http://localhost:5000/api/status')
      .then(response => {
        setStatusList(response.data);
      });

    axios.get('http://localhost:5000/api/recarga-tickets')
      .then(response => {
        setTickets(response.data);
        setFilteredTickets(response.data);  // Default show all tickets
      });
  }, [navigate, user]);

  const handleCreateTicket = (statusId) => {
    axios.post('http://localhost:5000/api/recarga-tickets', {
      userId: user.id,
      statusId
    }).then(response => {
      setTickets([...tickets, response.data]);
      setFilteredTickets([...tickets, response.data]);
    });
  };

  const handleFilterTickets = (userId) => {
    const filtered = tickets.filter(ticket => ticket.user_id === userId);
    setFilteredTickets(filtered);
  };

  return (
    <div>
      <h2>Tickets de Recarga</h2>
      <div>
        <label>Filtrar por usuário</label>
        <select onChange={(e) => handleFilterTickets(e.target.value)} value={selectedUser}>
          <option value="">Todos</option>
          {/* Aqui você pode adicionar os usuários carregados da API */}
          {/* Exemplo de como os usuários podem ser filtrados */}
          {/* userList.map(user => (
            <option key={user.id} value={user.id}>{user.nome}</option>
          )) */}
        </select>
      </div>

      <div>
        <h3>Criar Ticket de Recarga</h3>
        <label>Fonte de Energia</label>
        <select>
          {statusList.map(status => (
            <option key={status.id} value={status.id}>{status.nome}</option>
          ))}
        </select>
        <button onClick={() => handleCreateTicket(status.id)}>Criar Ticket</button>
      </div>

      <div>
        <h3>Tickets Existentes</h3>
        {filteredTickets.map(ticket => (
          <div key={ticket.id}>
            <p>Ticket ID: {ticket.id}, Status: {ticket.status_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;