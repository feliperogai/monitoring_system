import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Estilos do componente
const Container = styled.div`
  background-color: #333;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
  backdrop-filter: blur(10px); /* Efeito de desfoque */
  margin: auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
`;

const Logo = styled.img`
  height: 100px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #ff4081; /* Rosa claro ao focar no campo */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff4081; /* Rosa claro */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f50057; /* Rosa mais escuro no hover */
  }
`;

const ErrorMessage = styled.p`
  color: #f50057; /* Cor vermelha para mensagem de erro */
  font-size: 1rem;
`;

const RegisterLink = styled.div`
  margin-top: 10px;
  color: #ff4081;

  a {
    color: #ff4081;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users', { nome, email, senha })
      .then(response => {
        navigate('/login');
      })
      .catch(err => {
        setError('Erro ao criar conta. Tente novamente.');
      });
  };

  return (
    <Container>
      <Logo src="https://c5gwmsmjx1.execute-api.us-east-1.amazonaws.com/prod/dados_processo_seletivo/logo_empresa/124918/logo-420x100px.png_name_20221121-18288-5b9rii.png" alt="Logo" />
      <Title>Cadastro</Title>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome</label>
          <Input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Email</label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <Input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Cadastrar</Button>
      </form>
      <RegisterLink>
        Já tem uma conta? <a href="/login">Faça login</a>
      </RegisterLink>
    </Container>
  );
};

export default Register;