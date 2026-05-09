# Backend Local Migrations (Node)

This project runs PostgreSQL in Docker and runs migrations with Node (`node-pg-migrate`).

## 1) Install Node dependencies

```bash
cd backend
npm install
```

## 2) Configure environment

```bash
cp .env.example .env
```

Ensure `.env` includes:

```bash
DATABASE_URL=postgres://user:password@127.0.0.1:5434/happyshare?sslmode=disable
```

## 3) Start database services

```bash
npm run db:up
```

## 4) Create and run migrations

```bash
npm run migrate:create -- create_users_table
npm run migrate:up
```

Optional rollback:

```bash
npm run migrate:down
```
