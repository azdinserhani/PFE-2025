# Microservices Backend

This is a microservices-based backend architecture consisting of the following services:

## Services

- **Auth Service**: Handles authentication and authorization
- **User Service**: Manages user profiles and accounts
- **Course Service**: Manages course information and metadata
- **Content Service**: Handles course content and materials
- **Progress Service**: Tracks user progress through courses
- **AI Service**: Provides AI-powered features and recommendations
- **API Gateway**: Acts as a single entry point to the microservices architecture

## Shared Directory

The `shared` directory contains common utilities, libraries, and constants used across multiple services.

## Getting Started

### Prerequisites
- Node.js (for local development)
- JEE


### Running the Services

1. Clone the repository
2. Navigate to the backend directory
3. Start the backend services
   ```bash
   # Start each service individually
   cd auth-service && npm run dev
   cd user-service && npm run dev
   cd course-service && npm run dev
   cd content-service && npm run dev
   cd progress-service && npm run dev
   cd ai-service && npm run dev
   cd gateway && npm run dev
   ```

This will start all services defined in the docker-compose.yml file.

### Development

To work on a specific service:

1. Navigate to the service directory
2. Install dependencies: `npm install`
3. Start the service: `npm run dev`

## Architecture

Each service is designed to be independently deployable and scalable, following microservices principles. Communication between services happens through API calls via the gateway. 