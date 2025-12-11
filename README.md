# Job Applications Management System (JAMS)

This is a fullstack application designed to help candidates track their job application processes, organize interviews, manage feedback, and keep a record of companies and applicant tracking systems.

## Technologies

The project uses a modern toolchain focused on developer experience and performance:

- `nuxt` — The Intuitive Vue Framework for building the application.
- `vue` — The Progressive JavaScript Framework.
- `prisma` — Next-generation ORM for Node.js and TypeScript.
- `tailwindcss` — Utility-first CSS framework for styling.
- `@nuxt/ui` — A UI Library for Nuxt.
- `pnpm` — Fast and disk-efficient JavaScript package manager.

## Prerequisites

Before installing and running this app, make sure you have the following installed on your machine:

- Node.js (recommended v18+; verify with `node -v`)
- pnpm (package manager; install via `corepack enable` or `npm i -g pnpm`)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/thiagocrux/jams-fullstack
cd jams-fullstack
```

2. Install dependencies:

```bash
pnpm install
```

3. Setup the database:

   This project uses Prisma with SQLite. You need to initialize the database and generate the Prisma Client before running the app.

   Run the migrations to create the local SQLite database (`dev.db`) and apply the schema:

   ```bash
   pnpm prisma:migrate
   ```

   Generate the Prisma Client type definitions (this is usually done automatically by the migrate command, but it's good practice to know):

   ```bash
   pnpm prisma:generate
   ```

4. Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Available scripts

This section documents the main scripts available in `package.json` and what they do.

### Development

- #### `dev`

  Starts the Nuxt development server.

  ```bash
  pnpm dev
  ```

- #### `prisma:studio`

  Opens Prisma Studio, a visual editor for your database.

  ```bash
  pnpm prisma:studio
  ```

### Production

- #### `build`

  Builds the application for production.

  ```bash
  pnpm build
  ```

- #### `preview`

  Starts the server to preview the production build.

  ```bash
  pnpm preview
  ```

- #### `prisma:migrate:deploy`

  Runs pending migrations for production environments.

  ```bash
  pnpm prisma:migrate:deploy
  ```

### Database Management

- #### `prisma:migrate`

  Runs `prisma migrate dev` to apply migrations to the development database.

  ```bash
  pnpm prisma:migrate
  ```

- #### `prisma:generate`

  Generates the Prisma Client based on your schema.

  ```bash
  pnpm prisma:generate
  ```

- #### `prisma:migrate:reset`

  Resets the database (Caution: deletes all data).

  ```bash
  pnpm prisma:migrate:reset
  ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
