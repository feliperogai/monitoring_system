# Global Solution - Engenharia de Computação

# Monitoring System

Este projeto é um sistema de monitoramento com funcionalidades de login, cadastro de usuários e criação de tickets de recarga. Ele possui um backend em Node.js com SQLite como banco de dados e um frontend desenvolvido em React, utilizando o `styled-components` para estilização.

## Desenvolvido por:

Felipe Rogai - RM95938
Matheus Luchi - RM551097
Cristiano Soares - RM86951

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

## Backend

### Tecnologias Usadas

- **Node.js** para o backend.
- **SQLite** como banco de dados.
- **Express.js** para as rotas e servidor.
- **CORS** para permitir requisições entre frontend e backend.

### Endpoints da API

- **POST `/api/users`**: Cadastra um novo usuário (requisição com `nome`, `email`, `senha`).
- **POST `/api/recarga-tickets`**: Cria um ticket de recarga (requisição com `userId` e `statusId`).
- **GET `/api/status`**: Retorna todos os status de recarga.

## Frontend

### Tecnologias Usadas

- **React** para a construção da interface do usuário.
- **Styled-components** para a estilização dos componentes.
- **React Router** para o gerenciamento de rotas.

### Instalação do Projeto Backend/Frontend

1. Navegue até a pasta `monitoring_system` no seu terminal:

    ```bash
    cd monitoring_system
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```

    O projeto estará disponível na porta `3000` ou `localhost:3000`.


