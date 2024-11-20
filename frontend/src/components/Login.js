import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Componente estilizado para o container
const LoginContainer = styled.div`
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

// Componente estilizado para o título
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
`;

// Componente para o logo
const Logo = styled.img`
  height: 100px;
  margin-bottom: 20px;
`;

// Componente estilizado para o input
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

// Componente estilizado para o botão de login
const LoginButton = styled.button`
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

// Componente estilizado para a mensagem de link de registro
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Sua lógica de login
  };

  return (
    <LoginContainer>
      {/* Logo da empresa */}
      <Logo src="https://c5gwmsmjx1.execute-api.us-east-1.amazonaws.com/prod/dados_processo_seletivo/logo_empresa/124918/logo-420x100px.png_name_20221121-18288-5b9rii.png" alt="Logo" />
      <Title>Login</Title>
      <form onSubmit={handleLogin}>
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
        <LoginButton type="submit">Login</LoginButton>
      </form>

      {/* Link para a página de cadastro */}
      <RegisterLink>
        <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login;