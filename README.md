
# Server

A simple Express server with Prisma, TypeScript, and Zod for validation.

## 🚀 Getting Started

To get this project running on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/mdrayaanpasha/EMC-SERVER.git
cd EMC-SERVER

````

### 2\. Install dependencies

Run the following command to install both the production and development dependencies:

```bash
npm install
```

### 3\. Set up the database

Make sure your `.env` file contains your database URL. For example:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb?schema=public"
```

Then, generate Prisma Client by running:

```bash
npx prisma generate
```

If you're using migrations (recommended for production), use:

```bash
npx prisma migrate dev
```

### 4\. Start the server

To start the development server, run:

```bash
npm run dev
```

This will start the server with hot-reloading via `ts-node-dev`.

The server will be running on [https://www.google.com/search?q=http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## 🛠 Project Structure

  - **`/src`**: All your source code lives here.

      - **`/routes`**: Express routes.
      - **`index.ts`**: Entry point of the server.

  - **`/prisma`**: Prisma schema and migration files.

      - **`schema.prisma`**: Prisma schema to define your database models.

## ⚙️ Scripts

  - **`npm run dev`**: Starts the development server with `ts-node-dev` for hot-reloading.
  - **`npm run generate`**: Regenerates Prisma Client after changes to the Prisma schema.
  - **`npm run migrate`**: Apply Prisma migrations (for production).

## 🧠 Dependencies

### Production Dependencies:

  - **`@prisma/client`**: Prisma Client for database interaction.
  - **`express`**: Web framework for Node.js.
  - **`bcrypt`**: For hashing passwords securely.
  - **`zod`**: For validation schema.

### Development Dependencies:

  - **`typescript`**: TypeScript compiler.
  - **`ts-node-dev`**: For running TypeScript code with hot-reloading during development.
  - **`@types/express`**: Type definitions for Express.
  - **`@types/node`**: Type definitions for Node.js.

## 📝 Notes

  - If you add new Prisma models, remember to run `npx prisma generate` to update the client.
  - Use **Zod** for input validation and **bcrypt** for password hashing in your project.

```
