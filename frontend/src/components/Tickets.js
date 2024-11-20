import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');
  const [fonteEnergia, setFonteEnergia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const navigate = useNavigate();

  // Status de recarga como picklist
  const statusOptions = [
    "Pendente",
    "Em andamento",
    "Concluído",
    "Atrasado",
    "Cancelado",
    "Em espera",
    "Em revisão",
    "Aprovado",
    "Rejeitado",
    "Bloqueado"
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redireciona para o login se não houver token
    } else {
      // Carregar os tickets do usuário
      axios
        .get('http://localhost:5000/api/tickets/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTickets(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao carregar os tickets do usuário:', error);
          setError('Erro ao carregar os tickets');
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleCreateTicket = () => {
    const token = localStorage.getItem('authToken');

    if (!nome || !status || !fonteEnergia || !horaInicio) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    // Enviar requisição para criar um novo ticket
    axios
      .post(
        'http://localhost:5000/api/tickets',
        { nome, status, fonteEnergia, horaInicio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTickets([...tickets, response.data]); // Adiciona o novo ticket à lista
        setNome(''); // Limpa os campos
        setStatus('');
        setFonteEnergia('');
        setHoraInicio('');
      })
      .catch((error) => {
        console.error('Erro ao criar o ticket:', error);
        setError('Erro ao criar o ticket');
      });
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="tickets-container">
      <h1>Tickets</h1>

      {/* Formulário de Criação de Ticket */}
      <div className="create-ticket-form">
        <h3>Criar Ticket</h3>
        <input
          className="input-field"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select
          className="input-field"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Selecione o Status</option>
          {statusOptions.map((statusOption, index) => (
            <option key={index} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
        <input
          className="input-field"
          type="text"
          placeholder="Fonte de Energia"
          value={fonteEnergia}
          onChange={(e) => setFonteEnergia(e.target.value)}
        />
        <input
          className="input-field"
          type="time"
          placeholder="Hora de Início"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
        <button className="submit-button" onClick={handleCreateTicket}>
          Criar Ticket
        </button>
      </div>

      {/* Lista de Tickets do Usuário */}
      <h3>Meus Tickets</h3>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <strong>Ticket ID:</strong> {ticket.id} <br />
            <strong>Nome:</strong> {ticket.nome} <br />
            <strong>Status:</strong> {ticket.status} <br />
            <strong>Fonte de Energia:</strong> {ticket.fonteEnergia} <br />
            <strong>Hora de Início:</strong> {ticket.horaInicio}
          </li>
        ))}
      </ul>

      {/* Estilos em CSS dentro do próprio componente */}
      <style jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Arial', sans-serif;
        background: url('https://www.fiap.com.br/wp-content/themes/fiap2016/images/fiap/graduacao/curso/header/cc.png') no-repeat center center fixed;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: #fff;
      }

      .tickets-container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      h1 {
        font-size: 2rem;
        color: #ff4081;
        text-align: center;
        margin-bottom: 20px;
      }

      .create-ticket-form {
        background-color: rgba(0, 0, 0, 0.7);
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        margin-bottom: 30px;
        backdrop-filter: blur(10px);
        text-align: center;
      }

      h3 {
        color: #fff;
        font-size: 1.5rem;
        margin-bottom: 15px;
      }

      .input-field {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 2px solid #fff;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 1rem;
        outline: none;
        transition: border 0.3s ease, background-color 0.3s ease;
      }

      .input-field:focus {
        border-color: #ff4081;
        background-color: rgba(255, 255, 255, 0.2); /* Leve mudança de fundo para dar efeito de foco */
      }

      select.input-field {
        background-color: rgba(255, 255, 255, 0.15);
        color: #fff;
        padding: 12px;
        font-size: 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        appearance: none;
        cursor: pointer;
        transition: border 0.3s ease, background-color 0.3s ease;
      }

      select.input-field:focus {
        border-color: #ff4081;
        background-color: rgba(255, 255, 255, 0.2);
      }

      /* Estilos para o 'option' dentro do select */
      select.input-field option {
        background-color: rgba(0, 0, 0, 0.6); /* Fundo para as opções */
        color: #fff; /* Cor do texto das opções */
        padding: 12px;
      }

      /* Melhorando o botão de envio */
      .submit-button {
        width: 100%;
        padding: 12px;
        background-color: #ff4081;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
      }

      .submit-button:hover {
        background-color: #f50057;
        transform: translateY(-2px); /* Pequeno efeito de elevação */
      }

      .ticket-list {
        list-style: none;
        padding: 0;
      }

      .ticket-item {
        background-color: rgba(0, 0, 0, 0.6);
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
        color: #fff;
      }

      .ticket-item strong {
        color: #ff4081;
      }

      .error-message {
        color: #ff4081;
        text-align: center;
        font-size: 1.2rem;
      }

      @media (max-width: 768px) {
        .create-ticket-form {
          padding: 20px;
        }
        h1 {
          font-size: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .create-ticket-form {
          padding: 15px;
        }
        h1 {
          font-size: 1.3rem;
        }
        .input-field, .submit-button {
          font-size: 1rem;
        }
      }
      `}</style>
    </div>
  );
};

export default Tickets;