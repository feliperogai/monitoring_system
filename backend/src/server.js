const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const statusRoutes = require('./routes/statusRoutes');  // Certifique-se de que esse caminho esteja correto

// Criar o aplicativo Express
const app = express();

// Configurações do middleware
app.use(cors());                // Permite chamadas de diferentes origens (cross-origin)
app.use(bodyParser.json());     // Interpreta o corpo das requisições como JSON

// Roteamento: Roteador de status está sendo passado para as rotas de "/api/status"
app.use('/api', statusRoutes);  // Use '/api' como prefixo para as rotas de status (isso vai incluir "/api/status", "/api/users", etc.)

// Iniciar o servidor
const PORT = process.env.PORT || 5000;  // Usar a variável de ambiente PORT ou a porta 5000
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});