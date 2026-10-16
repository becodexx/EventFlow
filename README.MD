# EventFlow API — Command Reference

This document provides the commands required to set up, run, test, and manage the EventFlow backend API.

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Install Backend Dependencies](#2-install-backend-dependencies)
3. [Environment Configuration](#3-environment-configuration)
4. [Run the API](#4-run-the-api)
5. [Type Checking, Build, and Tests](#5-type-checking-build-and-tests)
6. [Prisma Commands](#6-prisma-commands)
7. [Git Commands](#7-git-commands)
8. [Common Development Workflow](#8-common-development-workflow)
9. [Troubleshooting](#9-troubleshooting)

> **Important:** Run commands from the EventFlow repository root (`D:\EventFlow`) unless specified otherwise. Never commit environment files or expose database credentials.

## 1. Prerequisites

Ensure the following software and resources are available:

- Node.js
- npm
- Git
- PostgreSQL
- The `eventflow` database created in PostgreSQL

### Check Installed Versions

```bash
node --version
npm --version
git --version
```

## 2. Install Backend Dependencies

### Install Prisma CLI

Install Prisma CLI as a development dependency in the API workspace.

```bash
npm install -D prisma@7 --workspace=@eventflow/api
```

### Install Prisma Client and PostgreSQL Dependencies

```bash
npm install @prisma/client@7 @prisma/adapter-pg pg dotenv --workspace=@eventflow/api
```

### Verify Installed Packages

```bash
npm ls prisma @prisma/client @prisma/adapter-pg pg dotenv --workspace=@eventflow/api
```

## 3. Environment Configuration

Create or update the following file:

`apps/api/.env`

Add the required environment variables:

```dotenv
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventflow
DB_USER=postgres
DB_PASSWORD="your_actual_password"
```

Replace `your_actual_password` with your local PostgreSQL password.

### Security Guidelines

- Never commit `.env` to Git.
- Ensure `.env` is included in `.gitignore`.
- Never store real credentials in this README.
- Use the correct PostgreSQL host, port, database name, and username.
- Keep your existing API port configuration unchanged unless you intentionally need to modify it.

## 4. Run the API

Start the backend in development mode:

```bash
npm run dev:api
```

### Available Endpoints

When the API is running on port `4000`:

| Endpoint                         | Purpose                         |
| -------------------------------- | ------------------------------- |
| `http://localhost:4000/health`   | Checks API health               |
| `http://localhost:4000/api-docs` | Opens Swagger API documentation |

If your configured port is different, replace `4000` with the actual port.

## 5. Type Checking, Build, and Tests

### Type-Check the API

```bash
npm run typecheck --workspace=@eventflow/api
```

### Build the API

```bash
npm run build --workspace=@eventflow/api
```

### Run Automated Tests

```bash
npm test --workspace=@eventflow/api
```

### Run Tests in Watch Mode

```bash
npm run test:watch --workspace=@eventflow/api
```

## 6. Prisma Commands

Run all commands in this section from the repository root.

### Validate the Prisma Schema

Checks the Prisma schema and configuration for errors.

```bash
npm exec --workspace=@eventflow/api -- prisma validate
```

### Generate Prisma Client

Generates the TypeScript client based on `schema.prisma`.

```bash
npm exec --workspace=@eventflow/api -- prisma generate
```

### Create and Apply a Development Migration

After reviewing your schema, create a migration and apply it to the development database.

```bash
npm exec --workspace=@eventflow/api -- prisma migrate dev --name create_event_model
```

Replace `create_event_model` with a descriptive name for the schema change.

> **Warning:** This command changes the development database schema. Do not run development migrations against a production database.

### Check Migration Status

```bash
npm exec --workspace=@eventflow/api -- prisma migrate status
```

### Open Prisma Studio

Prisma Studio provides a graphical interface for viewing and managing database records.

```bash
npm exec --workspace=@eventflow/api -- prisma studio
```

## 7. Git Commands

### Check Working Tree Status

```bash
git status
```

### Stage Changes

```bash
git add .
```

### Commit Changes

```bash
git commit -m "chore: configure Prisma"
```

Use a commit message that accurately describes your changes.

### View Recent Commits

```bash
git log --oneline -5
```

Before committing, verify that `.env`, passwords, API keys, and other secrets are not staged.

## 8. Common Development Workflow

Follow this workflow after modifying `apps/api/prisma/schema.prisma`.

### Step 1: Validate the Schema

```bash
npm exec --workspace=@eventflow/api -- prisma validate
```

### Step 2: Generate Prisma Client

```bash
npm exec --workspace=@eventflow/api -- prisma generate
```

### Step 3: Create and Apply a Migration

When the schema is ready to be applied to the local development database:

```bash
npm exec --workspace=@eventflow/api -- prisma migrate dev --name describe_your_change
```

Replace `describe_your_change` with a meaningful migration name.

### Step 4: Run Automated Tests

```bash
npm test --workspace=@eventflow/api
```

### Step 5: Review Changes

```bash
git status
```

Review the modified files before committing your changes.

## 9. Troubleshooting

### Missing Environment Variable

- Verify that `apps/api/.env` exists.
- Check that the variable names match those used in `prisma.config.ts`.
- Ensure the commands are running from the expected workspace context.

### Database Connection Refused

- Confirm that PostgreSQL is running.
- Verify the host and port.
- Confirm that the `eventflow` database exists.

### Database Authentication Failed

- Verify the PostgreSQL username and password.
- Check whether the PostgreSQL user has permission to connect to the database.
- Never share your password in chat or commit it to Git.

### Prisma Schema Validation Failed

- Read the first reported error.
- Check the syntax in `schema.prisma` and `prisma.config.ts`.
- Fix the error before generating the client or running migrations.

### Port Already in Use

- Check whether another process is using the configured API port.
- Stop the conflicting process or intentionally configure a different port.

---

**End of EventFlow API Command Reference**
