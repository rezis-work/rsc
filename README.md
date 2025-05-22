# React Server Components without a Framework

This project demonstrates how to use React Server Components (RSC) without a framework like Next.js or Remix. It provides a minimal setup to understand how RSC works under the hood.

## Features

- Server Components rendered on the server
- Client Components hydrated on the client
- Webpack module bundling
- Fastify server with React Server DOM integration
- SQLite database integration (example)

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development servers:
   ```bash
   npm run dev:client
   npm run dev:server
   ```
4. Open http://localhost:3000 in your browser

## Project Structure

- `src/` - React components (both Server and Client)
- `server/` - Fastify server implementation
- `public/` - Static assets
- `dist/` - Built assets (generated)

## How It Works

1. The Fastify server handles requests:
   - Serves static files
   - Renders React Server Components to a binary stream
2. The client:
   - Receives the RSC stream
   - Hydrates Client Components
   - Handles interactivity

## Dependencies

- React 19 (experimental)
- React Server DOM Webpack
- Fastify
- Webpack
- Babel

## License

MIT
