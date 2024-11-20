# Global Solution - Engenharia de Computação

# Monitoring System

Este projeto é um sistema de monitoramento com funcionalidades de login, cadastro de usuários e criação de tickets de recarga. Ele possui um backend em Node.js com SQLite como banco de dados e um frontend desenvolvido em React, utilizando o `styled-components` para estilização.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

## Backend

### Tecnologias Usadas

- **Node.js** para o backend.
- **SQLite** como banco de dados.
- **Express.js** para as rotas e servidor.
- **CORS** para permitir requisições entre frontend e backend.

### Instalação do Backend

1. Navegue até a pasta `backend` no seu terminal:

    ```bash
    cd monitoring_system/backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie o banco de dados e as tabelas necessárias (o script será executado automaticamente quando o servidor for iniciado).

4. Inicie o servidor:

    ```bash
    npm start
    ```

   O servidor estará rodando na porta `5000`.

### Endpoints da API

- **POST `/api/users`**: Cadastra um novo usuário (requisição com `nome`, `email`, `senha`).
- **POST `/api/recarga-tickets`**: Cria um ticket de recarga (requisição com `userId` e `statusId`).
- **GET `/api/status`**: Retorna todos os status de recarga.

## Frontend

### Tecnologias Usadas

- **React** para a construção da interface do usuário.
- **Styled-components** para a estilização dos componentes.
- **React Router** para o gerenciamento de rotas.

### Instalação do Frontend

1. Navegue até a pasta `frontend` no seu terminal:

    ```bash
    cd monitoring_system/frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```

   O frontend estará disponível na porta `3000` ou `localhost:3000`.


