const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const statusRoutes = require('./routes/statusRoutes');

// Criar o aplicativo Express
const app = express();

// Configurações
app.use(cors());
app.use(bodyParser.json());

// Roteamento
app.use('/api/status', statusRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});