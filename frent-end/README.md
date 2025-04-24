# EdClub Learning Management System

## Overview

EdClub is a modern, feature-rich Learning Management System (LMS) built with a microservices architecture. The platform provides an interactive learning experience with courses, content management, progress tracking, and AI-powered recommendations.

## Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- Tailwind CSS for styling
- Chart.js for data visualization
- Framer Motion for animations
- Material UI components
- Drag-and-drop capabilities with dnd-kit

### Backend
- Microservices architecture
- Authentication and authorization service
- User management service
- Course and content management services
- Progress tracking service
- AI-powered recommendation service
- API Gateway for unified access

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- JEE (Java Entreprise Edition)
- NestJs
### Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/azdinserhani/PFE-2025.git
   ```

2. Navigate to the frontend directory
   ```bash
   cd PFE-2025/frent-end
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   ```

### Backend Setup

1. Navigate to the backend directory
   ```bash
   cd ../../backend
   ```

2. Start the backend services
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

## Features

- **User Authentication**: Secure login, registration, and profile management
- **Course Management**: Create, edit, and organize courses and learning paths
- **Interactive Content**: Support for various content types (video, quizzes, etc.)
- **Progress Tracking**: Monitor student progress and achievements
- **Analytics Dashboard**: Visualize learning data and performance metrics
- **AI Recommendations**: Personalized course suggestions based on user behavior
- **Responsive Design**: Optimal experience across all device sizes

## Project Structure

```
EdClub/
├── PFE-2025/frent-end/    # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── redux/         # State management
│   │   ├── context/       # React context providers
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
│
└── backend/               # Microservices backend
    ├── auth-service/      # Authentication service
    ├── user-service/      # User management
    ├── course-service/    # Course information
    ├── content-service/   # Course content
    ├── progress-service/  # Progress tracking
    ├── ai-service/        # AI recommendations
    ├── gateway/           # API Gateway
    └── shared/            # Shared utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/)
- [Vite](https://vitejs.dev/)
