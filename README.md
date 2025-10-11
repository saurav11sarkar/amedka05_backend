# Travel Management Platform API

A robust and scalable Node.js TypeScript backend application for managing travel operations, user authentication, and content management.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)
![Express.js](https://img.shields.io/badge/Express.js-5.0-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)

## 🌟 Features

### 🔐 Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (Admin, User)
- Secure password hashing with bcrypt
- Email verification system
- Password reset functionality

### 👥 User Management
- User registration and profile management
- Role-based permissions system
- Profile image upload with Cloudinary integration
- OTP-based email verification

### 🚀 Core Modules
- **Trips Management** - Create, read, update, delete travel trips
- **Agent System** - Agent registration and status management
- **Creator Platform** - Content creator management
- **Partnerships** - Partnership program management
- **Events** - Event management with video support
- **Contact System** - Customer contact management
- **Dashboard** - Admin analytics and reporting

### 🛡️ Security Features
- Input validation with Zod
- File upload sanitization
- CORS enabled with credentials
- Rate limiting ready
- Global error handling
- Secure environment configuration

### 📁 File Management
- Image and video upload support
- Cloudinary integration for media storage
- File type validation
- Automatic file optimization

## 🚀 Quick Start

### Prerequisites

- Node.js (18+ recommended)
- MongoDB (local or cloud)
- Cloudinary account (for file storage)
- Email service (SMTP credentials)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FSDTeam-SAA/amedka05_backend.git
cd boilerplate-web-nodejs-typescript
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/travel-platform

# Security
BCRYPT_SALT_ROUNDS=12
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRES=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES=7d

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Service (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

4. **Run the application**

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start:prod
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/auth/register` | User registration | Public |
| POST | `/api/v1/auth/login` | User login | Public |
| POST | `/api/v1/auth/refresh-token` | Refresh access token | Public |
| POST | `/api/v1/auth/forgot-password` | Request password reset | Public |
| POST | `/api/v1/auth/verify-email` | Verify email address | Public |
| POST | `/api/v1/auth/reset-password-change` | Reset password | Public |
| POST | `/api/v1/auth/logout` | User logout | Authenticated |

### User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/user/create-user` | Create new user | Public |
| GET | `/api/v1/user/get-all-user` | Get all users | Admin |
| GET | `/api/v1/user/get-user/:id` | Get user by ID | Admin, User |
| PUT | `/api/v1/user/update-user/:id` | Update user | Admin, User |
| DELETE | `/api/v1/user/delete-user/:id` | Delete user | Admin |

### Trips Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/trip/create` | Create trip | Admin |
| GET | `/api/v1/trip/` | Get all trips | Public |
| GET | `/api/v1/trip/:id` | Get single trip | Public |
| PUT | `/api/v1/trip/:id` | Update trip | Admin |
| DELETE | `/api/v1/trip/:id` | Delete trip | Admin |

### Agent System

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/agent/request` | Request agent status | Public |
| PUT | `/api/v1/agent/status/:id` | Update agent status | Admin |
| GET | `/api/v1/agent/` | Get all agents | Public |
| GET | `/api/v1/agent/:id` | Get single agent | Public |
| PUT | `/api/v1/agent/:id` | Update agent | Admin |
| DELETE | `/api/v1/agent/:id` | Delete agent | Admin |

### Creator Platform

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/creator/request` | Request creator status | Public |
| PUT | `/api/v1/creator/status/:id` | Update creator status | Admin |
| GET | `/api/v1/creator/` | Get all creators | Public |
| GET | `/api/v1/creator/:id` | Get single creator | Public |
| PUT | `/api/v1/creator/:id` | Update creator | Admin |
| DELETE | `/api/v1/creator/:id` | Delete creator | Admin |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── config/           # Environment configuration
│   ├── error/           # Custom error handlers
│   ├── interface/       # TypeScript interfaces
│   ├── middlewares/     # Express middlewares
│   └── utils/          # Utility functions
├── modules/
│   ├── auth/           # Authentication module
│   ├── user/           # User management
│   ├── trips/          # Trips management
│   ├── agent/          # Agent system
│   ├── creator/        # Creator platform
│   ├── partnership/    # Partnership management
│   ├── event/          # Event management
│   ├── contact/        # Contact system
│   ├── setting/        # User settings
│   └── dashboard/      # Admin dashboard
├── helper/             # Helper functions
├── routes/             # Route definitions
└── server.ts          # Server entry point
```

## 🔧 Development Scripts

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start:prod

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run prettier
npm run prettier:fix

# Run tests (when implemented)
npm test
```

## 🗄️ Database Models

### User Model
- Personal information (name, email, password)
- Role-based permissions (admin, user)
- Profile management with image support
- Email verification system

### Trip Model
- Destination details (country, location)
- Date ranges and participant management
- Image support for trip visuals

### Agent Model
- Professional information and credentials
- Status management (pending, accepted, rejected)
- Brand and contact details

### Creator Model
- Content creator profiles
- Social media integration
- Interest-based categorization
- Multi-image support

## 🔒 Security Implementation

- **Password Security**: bcrypt hashing with configurable salt rounds
- **JWT Tokens**: Secure token-based authentication with refresh mechanism
- **Input Validation**: Zod schema validation for all endpoints
- **File Upload Security**: Type validation and sanitization
- **CORS**: Configurable cross-origin resource sharing
- **Error Handling**: Comprehensive error management without information leakage

## 📦 Dependencies

### Core Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **typescript**: Type support
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cloudinary**: File storage
- **multer**: File upload handling
- **nodemailer**: Email service
- **zod**: Schema validation

### Development Dependencies
- **@types/***: TypeScript definitions
- **eslint**: Code linting
- **prettier**: Code formatting
- **ts-node-dev**: Development server
- **nodemon**: File watch utility

## 🌐 Deployment

### Environment Setup for Production

1. **Set NODE_ENV to production**
```env
NODE_ENV=production
```

2. **Configure production database**
```env
MONGO_URI=your-production-mongodb-uri
```

3. **Use strong secrets**
```env
ACCESS_TOKEN_SECRET=strong-production-secret
REFRESH_TOKEN_SECRET=strong-production-refresh-secret
```

4. **Configure production Cloudinary account**
```env
CLOUDINARY_CLOUD_NAME=production-cloud-name
CLOUDINARY_API_KEY=production-api-key
CLOUDINARY_API_SECRET=production-api-secret
```

### Deployment Platforms

The application can be deployed on:
- **Heroku**
- **AWS EC2**
- **DigitalOcean**
- **Railway**
- **Vercel** (with serverless functions)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, contact:
- **Name**: Saurav Sarkar
- **Email**: saurav.bdcalling@gmail.com
- **Phone**: +8801518643073
- **GitHub**: [FSDTeam-SAA/amedka05_backend](https://github.com/FSDTeam-SAA/amedka05_backend.git)

---

**Built with ❤️ using Node.js, Express, TypeScript, and MongoDB**

**Developer**: Saurav Sarkar  
**Contact**: saurav.bdcalling@gmail.com | +8801518643073  
**GitHub**: https://github.com/FSDTeam-SAA/amedka05_backend.git