# gym
Gym management system developed as a part of Databases course in NaUKMA


## Technologies

- **Node.js** / **TypeScript**
- **NestJS** – Backend framework
- **PostgreSQL** – Relational database


## Project installation

### If `yarn` not installed:
```bash
npm install -g yarn
```

### Install dependencies

#### From root directory:
```bash
cd packages/backend
yarn install
```

### Set up environment

#### Create .env file in root directory with the following variables:

- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DATABASE
- PORT
- SECRET


## Start

```bash
yarn start:dev
```