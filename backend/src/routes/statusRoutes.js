const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, getStatus, getUsers, addUser, addRecargaTicket, getTicketsByUser} = require('../models/statusModel'); // Importando as funções do modelo
const router = express.Router();

// Carregando variáveis de ambiente
require('dotenv').config();

// Rota para adicionar um usuário
router.post('/users', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Gerar o hash da senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt(10); // Gera um salt com 10 rounds
    const hashedPassword = await bcrypt.hash(senha, salt); // Criptografa a senha

    // Agora, a senha armazenada será a senha criptografada
    const user = await addUser(nome, email, hashedPassword);  // Alterei para async/await
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criptografar a senha", error);
    res.status(500).json({ message: "Erro ao criar o usuário" });
  }
});

// Rota de login (autenticação do usuário)
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  console.log("cheguei no login");

  try {
    // Usando a função do modelo para obter o usuário pelo e-mail
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verificando a senha
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const secretKey = process.env.JWT_SECRET || 'defaultSecretKey'; // fallback

    // Gerando o token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviando o token como resposta
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
  }
});

// Rota para obter todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();  // Alterado para usar async/await
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao obter usuários", error);
    res.status(500).json({ message: "Erro ao obter usuários" });
  }
});

router.get('/status', async (req, res) => {
  try {
    const status = await getStatus(); // Função para buscar os status de recarga do banco de dados
    res.status(200).json(status); // Retorna os status encontrados
  } catch (error) {
    console.error('Erro ao carregar os status de recarga:', error);
    res.status(500).json({ message: 'Erro ao carregar os status de recarga' });
  }
});

// Rota para obter os tickets de um usuário
router.get('/tickets', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Pegando o token do cabeçalho
  
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    // Verificar se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Obter os tickets do usuário
    const tickets = await getTicketsByUser(userId); // Função para pegar tickets do usuário
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Erro ao verificar token ou obter tickets:', error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
});

// Rota para criar um novo ticket
router.post('/tickets', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Captura o token JWT
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    const { nome, status, fonteEnergia, horaInicio } = req.body; // Obtendo os dados enviados
    if (!nome || !status || !fonteEnergia || !horaInicio) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Criar o ticket no banco de dados
    const ticket = await addRecargaTicket(userId, nome, status, fonteEnergia, horaInicio);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Erro ao criar o ticket:', error);
    res.status(500).json({ message: 'Erro ao criar o ticket' });
  }
});

// statusRoutes.js
router.get('/tickets/user', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Captura o token JWT
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    // Buscar os tickets criados pelo usuário
    const tickets = await getTicketsByUser(userId);
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Erro ao carregar os tickets do usuário:', error);
    res.status(500).json({ message: 'Erro ao carregar os tickets' });
  }
});


// Exportando as rotas
module.exports = router;