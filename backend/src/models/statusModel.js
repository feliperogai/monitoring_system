const sqlite3 = require('sqlite3').verbose();
const path = require('path');

require('dotenv').config();

// Caminho absoluto ou relativo para o banco de dados
const db = new sqlite3.Database(path.resolve('./src/db/database.db'), (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida.");
  }
});

// Função para buscar o usuário pelo email
const getUserByEmail = (email) => {
  console.log("Buscando usuário com o email:", email); // Log para depuração
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err); // Log do erro
        reject(err);
      } else {
        console.log("Usuário encontrado:", row); // Log do usuário encontrado
        resolve(row);
      }
    });
  });
};

// Função para criar as tabelas no banco de dados
const createTables = () => {
  db.serialize(() => {
    // Criar a tabela de usuários
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        senha TEXT
      )
    `);

    // Criar a tabela de status de recarga
    db.run(`
      CREATE TABLE IF NOT EXISTS status_recarga (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        status TEXT,
        fonteEnergia TEXT,
        horaInicio TEXT
      )
    `);

    // Criar a tabela de tickets de recarga
    db.run(`
      CREATE TABLE IF NOT EXISTS recarga_tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        status_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (status_id) REFERENCES status_recarga(id)
      )
    `);
  });
};

// Função para obter o status de recarga dos veículos
const getStatus = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM status_recarga";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Função para adicionar um novo status de recarga
const addStatus = (nome, status, fonteEnergia, horaInicio) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO status_recarga (nome, status, fonteEnergia, horaInicio) VALUES (?, ?, ?, ?)";
    db.run(sql, [nome, status, fonteEnergia, horaInicio], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, nome, status, fonteEnergia, horaInicio });
      }
    });
  });
};

// Função para adicionar um usuário
const addUser = (nome, email, senha) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
    db.run(sql, [nome, email, senha], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, nome, email });
      }
    });
  });
};

// Função para obter todos os usuários
const getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Função para adicionar um ticket de recarga, associando um usuário a um status de recarga
const addRecargaTicket = (userId, statusId) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO recarga_tickets (user_id, status_id) VALUES (?, ?)";
    db.run(sql, [userId, statusId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, userId, statusId });
      }
    });
  });
};

// Criar as tabelas (certifique-se de que isso seja feito uma vez no servidor)
createTables();

// Exportando todas as funções necessárias
module.exports = { db, getUserByEmail, getStatus, addStatus, addUser, getUsers, addRecargaTicket };