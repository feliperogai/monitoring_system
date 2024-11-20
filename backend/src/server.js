const express = require('express');
const cors = require('cors');
const morgan = require('morgan');  // Para logging de requisições
const dotenv = require('dotenv');  // Carregar variáveis de ambiente
const { validationResult } = require('express-validator'); // Para validação de dados

// Carregar variáveis de ambiente
dotenv.config();

// Criar o aplicativo Express
const app = express();

// Configurações do middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',  // Defina a origem permitida (ajuste conforme necessário)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Permite chamadas de diferentes origens (cross-origin)

app.use(express.json());  // Interpreta o corpo das requisições como JSON (Express 4.16+)
app.use(morgan('dev'));  // Registra as requisições HTTP no console

// Importando rotas
const statusRoutes = require('./routes/statusRoutes');

// Roteamento: Roteador de status está sendo passado para as rotas de "/api/status"
app.use('/api', statusRoutes);  // Use '/api' como prefixo para as rotas de status

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  // Verifica se o erro é de validação ou outro tipo específico
  if (err.name === 'ValidationError') {
    // Erro de validação (ex: dados inválidos fornecidos pelo cliente)
    return res.status(400).json({
      message: 'Dados inválidos.',
      errors: err.errors,  // Retorna os detalhes do erro de validação
    });
  }
  
  // Erro de autenticação (caso de login ou tokens inválidos)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
  }
  
  // Erros internos do servidor
  console.error('Erro interno no servidor:', err.stack);  // Log do erro detalhado
  
  // Erro genérico para qualquer outro tipo de erro não tratado acima
  res.status(500).json({
    message: 'Erro interno no servidor. Tente novamente mais tarde.',
    error: process.env.NODE_ENV === 'production' ? null : err.message,  // Não expõe o erro completo em produção
  });
});

// Middleware para validação de dados (opcional, você pode adicionar isso nas rotas específicas)
// Exemplo de como você poderia validar os dados em uma rota
app.post('/some-route', [
  // Suponha que você tenha alguns validadores aqui, como express-validator
  // Exemplo: check('email').isEmail()
], (req, res, next) => {
  const errors = validationResult(req);  // Verifica os erros de validação
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Se não houver erros, continue com a execução da rota
  next();
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;  // Usar a variável de ambiente PORT ou a porta 5000
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});