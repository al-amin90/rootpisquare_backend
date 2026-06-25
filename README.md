# RootpiSquare Backend

RootpiSquare Backend is a TypeScript-based REST API for managing educational content such as classes, batches, subjects, notes, playlists, and videos. It provides authentication, authorization, file upload support, and database-backed content management.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Zod validation
- Multer + Cloudinary for file uploads
- CORS + Cookie Parser
- tsup for build output

## Features

- User authentication and authorization
- Role-based access control for admin and users
- CRUD APIs for:
  - Auth
  - Batch
  - Class
  - Subject
  - Note
  - Playlist
  - Video
- File upload and image management with Cloudinary
- Centralized error handling and validation

## Project Structure

```bash
src/
  app.ts
  server.ts
  app/
    config/
    errors/
    middlewares/
    modules/
    routes/
    utils/
```

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm or pnpm
- MongoDB instance
- Cloudinary account

## Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd rootpisquare_backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the required environment variables:

   ```env
   PORT=5000
   NODE_ENV=development
   DB_URL=mongodb://localhost:27017/rootpisquare

   JWT_ACCESS_TOKEN=your_access_secret
   JWT_REFRESH_TOKEN=your_refresh_secret
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_REFRESH_EXPIRES_IN=30d

   BCRYPT_SALT_ROUNDS=10
   DEFAULT_PASSWORD=your_default_password

   CLOUDINARY_URL=cloudinary://your_cloudinary_url
   SINGLE_ADMIN_EMAIL=admin@example.com
   SINGLE_ADMIN_PASSWORD=admin_password
   ```

## Running the Project

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Start built app

```bash
npm start
```

## API Base URL

By default, the API runs at:

```bash
http://localhost:5000/api/v1
```

## Notes

- The server uses Express middleware for JSON parsing, cookie parsing, CORS, validation, and global error handling.
- Cloudinary is used for storing uploaded media files.
- The application is structured in modular folders under the `src/app/modules` directory for easy scaling.

## License

This project is licensed under the ISC License.
