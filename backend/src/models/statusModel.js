const sqlite3 = require('sqlite3').verbose();

// Caminho absoluto ou relativo para o banco de dados
const db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida.");
  }
});

// Função para obter o status de recarga dos veículos
const getStatus = (callback) => {
  const sql = "SELECT * FROM status_recarga";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

// Função para adicionar um status de recarga
const addStatus = (nome, status, fonteEnergia, horaInicio, callback) => {
  const sql = "INSERT INTO status_recarga (nome, status, fonteEnergia, horaInicio) VALUES (?, ?, ?, ?)";
  db.run(sql, [nome, status, fonteEnergia, horaInicio], function(err) {
    if (err) {
      throw err;
    }
    callback({ id: this.lastID, nome, status, fonteEnergia, horaInicio });
  });
};

// Criar a tabela se ela não existir
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS status_recarga (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT, fonteEnergia TEXT, horaInicio TEXT)");
});

module.exports = { getStatus, addStatus };