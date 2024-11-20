# Global Solution - Engenharia de Computação

## Monitoring System

Este projeto é um sistema de monitoramento com funcionalidades de login, cadastro de usuários e criação de tickets de recarga. O sistema possui um backend em **Node.js** utilizando **SQLite** como banco de dados, e um frontend desenvolvido em **React** com **styled-components** para estilização.

### Desenvolvido por:
- Felipe Rogai - RM95938
- Matheus Luchi - RM551097
- Cristiano Soares - RM86951

## Estrutura do Projeto

A estrutura do projeto está dividida em duas partes principais: **Backend** e **Frontend**.

### Backend

#### Tecnologias Usadas
- **Node.js**: Para o desenvolvimento do backend.
- **SQLite**: Banco de dados utilizado para persistência dos dados.
- **Express.js**: Framework utilizado para criação das rotas e gerenciamento do servidor.
- **CORS**: Permite o compartilhamento de recursos entre o frontend e o backend.

#### Endpoints da API
- **POST `/api/users`**: Cadastra um novo usuário. A requisição deve conter os parâmetros:
  - `nome` (string)
  - `email` (string)
  - `senha` (string)
  
- **POST `/api/recarga-tickets`**: Cria um ticket de recarga. A requisição deve conter os parâmetros:
  - `userId` (ID do usuário)
  - `statusId` (ID do status da recarga)
  
- **GET `/api/status`**: Retorna todos os status de recarga.

### Frontend

#### Tecnologias Usadas
- **React**: Para construção da interface do usuário.
- **Styled-components**: Para estilização dos componentes de maneira modular e reutilizável.
- **React Router**: Para gerenciamento das rotas no frontend.

## Instalação e Execução

### Passos para executar o backend e o frontend

1. Clone o repositório ou faça o download do projeto.

2. Navegue até a pasta do projeto **monitoring_system** no seu terminal:
    ```bash
    cd monitoring_system
    ```

3. Instale as dependências para o backend e frontend:
    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

   O projeto estará disponível no endereço `http://localhost:3000`.
