# BeTalent Backend

Tecnologias: NodeJS - AdonisJS - LucidORM - Japa

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) (recomendo a versão LTS)
- [npm](https://www.npmjs.com)
- [MySQL](https://www.mysql.com/)

### Opcional

- [MySQL WORKBENCH](https://www.mysql.com/products/workbench/)
- [DBeaver](https://dbeaver.io/download/)
- [Docker](https://www.docker.com) e [Docker Compose](https://docs.docker.com/compose/)

## Passo a Passo

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### 1. Clonando o Repositório

Abra o terminal e execute o comando abaixo para clonar o repositório:

```bash
git clone https://github.com/thiagoleite92/betalent-backend
```

### 2. Navegando até o Diretório do Projeto

```bash
cd betalent-backend
```

### 3. Instalando as Dependências

```bash
npm install
```

### 4. Configurando Variáveis de Ambiente

```bash
cp .env.example .env
```

### 5.1 Rodando as Migrações - Sem utilizar o Docker

```bash
node ace migration:run
```

### 5.1 Rodando as Migrações - Utilizando o Docker

```bash
docker-compose up -d
```

#### OBS: Talvez seja necessário configurar o banco de dados para aceitar conexões fora de sua máquina [tutorial com DBeaver](https://medium.com/@edu18ds/running-mysql-in-container-docker-and-setting-dbeaver-5f9e5781649d)

```bash
node ace migration:run
```

### 6. Rodando o Projeto

```bash
node ace serve --watch
```

A aplicação estará rodando em http://localhost:3333.

## TESTES

### 1. Configurando Variáveis de Ambiente para Testes

Crie um arquivo .env.test na raiz do projeto e configure a chave DB_DATABASE com o nome do banco de dados de testes:

DB_DATABASE=nome_do_banco_de_testes

```bash
cp .env.example .env.test
```

### 2. Rodando os Testes

Para rodar os testes de integração (e2e), utilize o seguinte comando:

```bash
node ace test
```

### 3. Escolher qual teste rodar

Lista de testes individuais

- e2e.signup
- e2e.login
- e2e.clients
- e2e.products
- e2e.sales

```bash
node ace test --groups="e2e.signup"
```

# Funcionalidades

## Cadastro de Usuário

- [x] Cadastro de usuário do sistema (signup)

## Login

- [x] Login com JWT de usuário cadastrado (login)

## Clientes

- [x] Listar todos os clientes cadastrados (index)
  - [x] Apenas dados principais devem vir aqui
  - [x] Ordenar pelo ID
- [x] Detalhar um(a) cliente e vendas a ele(a) (show)
  - [x] Trazer as vendas mais recentes primeiro
  - [x] Possibilidade de filtrar as vendas por mês + ano
- [x] Adicionar um(a) cliente (store)
- [x] Editar um(a) cliente (update)
- [x] Excluir um(a) cliente e vendas a ele(a) (delete)

## Produtos

- [x] Listar todos os produtos cadastrados (index)
  - [x] Apenas dados principais devem vir aqui
  - [x] Ordenar alfabeticamente
- [x] Detalhar um produto (show)
- [x] Criar um produto (store)
- [x] Editar um produto (update)
- [x] Exclusão lógica ("soft delete") de um produto (delete)

## Vendas

- [x] Registrar venda de 1 produto a 1 cliente (store)

## Rotas Privdas

- [x] As rotas de Produtos, Clientes e Vendas devem só podem ser acessadas por usuários autenticados.
