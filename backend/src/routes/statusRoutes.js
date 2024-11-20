const express = require('express');
const bcrypt = require('bcryptjs');
const { addUser, addRecargaTicket, getStatus, getUsers } = require('../models/statusModel');
const router = express.Router();

// Rota para adicionar um usuário
router.post('/users', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Gerar o hash da senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt(10); // Gera um salt com 10 rounds
    const hashedPassword = await bcrypt.hash(senha, salt); // Criptografa a senha

    // Agora, a senha armazenada será a senha criptografada
    addUser(nome, email, hashedPassword, (user) => {
      res.status(201).json(user);
    });
  } catch (error) {
    console.error("Erro ao criptografar a senha", error);
    res.status(500).json({ message: "Erro ao criar o usuário" });
  }
});

// Rota para obter todos os usuários
router.get('/users', (req, res) => {
  getUsers((users) => {
    res.status(200).json(users);
  });
});

// Rota para criar um ticket de recarga
router.post('/recarga-tickets', (req, res) => {
  const { userId, statusId } = req.body;
  addRecargaTicket(userId, statusId, (ticket) => {
    res.status(201).json(ticket);
  });
});

// Rota para obter o status de recarga
router.get('/status', (req, res) => {
  getStatus((status) => {
    res.status(200).json(status);
  });
});

module.exports = router;