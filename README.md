# Gym
Gym management system developed as a part of Databases course in NaUKMA

## Technologies

### Backend
- **Node.js** / **TypeScript**
- **NestJS** – Backend framework
- **PostgreSQL** – Relational database

### Frontend
- **React**
- **Next.js**

## Project Installation

### Backend

#### If `yarn` is not installed:
```bash
npm install -g yarn
```

#### Install dependencies
From the root directory:
```bash
cd packages/backend
yarn install
```

#### Set up environment
Create a `.env` file in the root directory with the following variables:
```
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
PORT=
SECRET=
CLIENT_URL=
```

#### Start Backend
To start services using Docker:
```bash
yarn docker:up
```

To start the backend in development mode(when db server is already running):
```bash
yarn start:dev
```

To reset the database:
```bash
yarn reset-db
> ⚠️ All existing data will be lost.
```

---

### Frontend

#### Install dependencies
From the root directory:
```bash
cd packages/client
npm install
```

#### Set up environment
Create a `.env` file in `packages/client` with:
```
NEXT_PUBLIC_API_URL=
```

#### Start Frontend
```bash
npm run dev
```
