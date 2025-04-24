# Authentication Service

This service handles user authentication and authorization for the PFE application.

## Features

- User registration with validation
- User login with JWT token generation
- Password hashing with bcrypt
- Token validation
- User profile management
- Role-based authorization

## API Endpoints

### Public Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Protected Routes

- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/change-password` - Change user password
- `GET /api/auth/validate-token` - Validate JWT token

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=3001
   JWT_SECRET=your_jwt_secret_key
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=pfe_db
   ```

3. Start the service:
   ```
   npm run dev
   ```

## Dependencies

- express - Web framework
- pg - PostgreSQL client
- bcrypt - Password hashing
- jsonwebtoken - JWT handling
- joi - Request validation
- dotenv - Environment variables
- cors - Cross-origin resource sharing 