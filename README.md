# Teste Cashforce:

## Escopo do projeto:

- O teste consiste em criar uma API em Node utilizando preferencialmente express e sequelize, conectada ao banco de dados que iremos disponibilizar.

- Após a criação dessa API, você  terá que construir uma tela desenhada no figma, preferencialmente em Vue.js, consultando essa API criada por você e exibindo os dados que estão retornando dessa API.

### Explicando melhor o banco de dados

- O banco de dados possuem alguns relacionamentos
- Na tabela de orders os campos cnpjId, userId, buyerId e providerId tem relacionamento com as tabelas cnpjs, users, buyers e providers respectivamente.
- buyers = sacados; providers = cedentes

## Tarefas solicitadas: 
-  [x] Construir uma API com node.js, express.js e sequelize para ler o banco de dados informado.
-  [x] Construir um frontend em Vue.js que consome esta API e lista as notas fiscais do banco de dados.

## Features extras:

### Backend
-  [x] Autenticação por JWT da API
-  [x] Swagger de documentação da API
-  [x] Containerização da estrutura de backend

### Frontend
-  [x] Funcionalidade de navegação entre páginas no web app
-  [x] Funcionalidade de exibir dados adicionais do Cedente
