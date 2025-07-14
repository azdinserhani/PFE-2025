# Ed-Club - Educational Platform

[![Deployment Status](https://img.shields.io/badge/Deployed-GitHub%20Pages-brightgreen)](https://azdinserhani.github.io/PFE-2025/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](https://postgresql.org/)

A modern, full-stack educational platform that enables instructors to create and manage courses while providing students with an interactive learning experience. Built with a microservices architecture and featuring multilingual support, payment integration, and comprehensive analytics.

## 🚀 Live Demo

Visit the live application: [Ed-Club Platform](https://azdinserhani.github.io/PFE-2025/)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Students
- 🎓 Browse and enroll in courses
- 📚 Interactive video lectures with AI chat support
- 📝 Take exams and quizzes
- 🛒 Shopping cart and secure payment processing
- 📊 Track learning progress
- 🌐 Multi-language support (English, French, Arabic, German, Spanish)
- 📱 Responsive design for all devices

### For Instructors
- 📖 Create and manage courses
- 🎬 Upload and organize lecture content
- 📋 Create exams and quizzes with multiple question types
- 📈 Analytics dashboard with detailed insights
- 💰 Revenue tracking and analytics
- 👥 Student management and progress monitoring

### For Administrators
- 👨‍💼 User management and role assignments
- 📊 Platform-wide analytics
- 🏷️ Category and content management
- 💳 Payment and transaction oversight

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19.0.0 with Vite
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI, Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: Formik with Yup validation
- **Charts**: Chart.js with React Chart.js 2
- **Video Player**: Plyr React
- **Rich Text Editor**: TinyMCE
- **Code Editor**: Monaco Editor
- **Internationalization**: i18next
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt
- **Validation**: Joi
- **Architecture**: Microservices

### Services Architecture
- **API Gateway**: Request routing and rate limiting
- **Auth Service**: Authentication and authorization
- **Course Service**: Course, module, and lecture management
- **User Service**: User and admin management
- **Payment Service**: Payment processing and webhooks
- **Media Service**: File upload and media handling

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │
│   (React)       │◄──►│   (Port 3000)   │
└─────────────────┘    └─────────┬───────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
            ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
            │ Auth Service │ │Course Service│ │ User Service │
            │ (Port 3001)  │ │ (Port 3002)  │ │ (Port 3003)  │
            └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
                   │                │                │
                   └────────────────┼────────────────┘
                                    ▼
                            ┌──────────────┐
                            │ PostgreSQL   │
                            │   Database   │
                            └──────────────┘
```

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ed-club/PFE-2025
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install main backend dependencies
npm install

# Install dependencies for each service
cd auth-service && npm install && cd ..
cd course-service && npm install && cd ..
cd user-service && npm install && cd ..
cd payment-service && npm install && cd ..
cd media-service && npm install && cd ..
cd api-gateway && npm install && cd ..
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frent-end

# Install dependencies
npm install
```

### 4. Database Setup

1. Create a PostgreSQL database
2. Update database configuration in each service's `config/db.js` file
3. Run the provided SQL queries from `Query.sql` to set up the database schema

## ⚙️ Configuration

### Environment Variables

Create `.env` files in each backend service directory with the following variables:

#### Auth Service (.env)
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edclub_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

#### Course Service (.env)
```env
PORT=3002
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edclub_db
DB_USER=your_username
DB_PASSWORD=your_password
```

#### Other Services
Follow similar patterns for user-service, payment-service, and media-service.

### Frontend Configuration

Update the API base URL in `src/utils/axios.js` to match your backend configuration.

## 🎯 Usage

### Development Mode

#### Start Backend Services

```bash
# From the backend directory
npm run start:all
```

This will start all microservices concurrently:
- API Gateway: http://localhost:3000
- Auth Service: http://localhost:3001
- Course Service: http://localhost:3002
- User Service: http://localhost:3003
- Payment Service: http://localhost:3004
- Media Service: http://localhost:3005

#### Start Frontend

```bash
# From the frent-end directory
npm run dev
```

The frontend will be available at http://localhost:5173

### Production Build

#### Frontend
```bash
npm run build
npm run preview
```

#### Deployment
```bash
npm run deploy
```

This will deploy the application to GitHub Pages.

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset

### Course Endpoints
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/enrollments` - Get user enrollments

For complete API documentation, refer to the individual service controllers.

## 🎨 Customization

### Themes
The application supports dark/light themes. Modify `src/context/ThemeContext.jsx` to customize theme settings.

### Internationalization
Add new languages by creating translation files in `public/locales/[language-code]/translation.json`.

### Styling
- Tailwind CSS classes can be customized in `tailwind.config.js`
- Material-UI theme can be modified in the theme provider setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure and naming conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when necessary
- Ensure all linting rules pass (`npm run lint`)

## 📝 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped build this platform
- Special thanks to the open-source community for the amazing tools and libraries

## 📞 Support

For support, email [azdineserhani1@gmail.com] or create an issue in the repository.

---

**Built with ❤️ for education**
