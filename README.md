# Recraft Dashboard (Full-Stack Version)

A powerful web application for AI image generation, vectorization, and management with an intuitive user interface and robust backend services.

## Features

### Image Generation & Processing
- Generate images using state-of-the-art AI models
- Custom style presets for consistent results
- Real-time progress tracking
- Adjustable parameters for fine-tuned control
- Persistent settings across sessions
- Server-side image processing and optimization

### Image Management
- Modern gallery interface with image previews
- Download functionality for generated images
- Image metadata viewing and management
- Prompt and settings reuse functionality
- Secure cloud storage with CDN support
- Database-backed image organization

### User Management
- Secure authentication system
- User preferences persistence
- Custom style management
- Usage tracking and quotas
- Role-based access control

### User Interface
- Clean, modern design with dark mode
- Responsive layout
- Intuitive sidebar navigation
- Modal-based image viewing and actions
- Smooth animations and transitions

## Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI for accessible components
  - Lucide React for icons
  - Shadcn/ui for styled components
- **State Management**: React Context API
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with jose
- **Security**: 
  - Helmet for HTTP headers
  - CORS protection
  - Rate limiting
- **API Documentation**: OpenAPI/Swagger

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- PostgreSQL (v14 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recraft-dashboard.git
cd recraft-dashboard
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Backend setup
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
cd backend
npx prisma migrate dev
```

5. Start the development servers:
```bash
# From the root directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
recraft-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Frontend utilities
│   │   └── styles/        # Global styles
│   ├── public/           # Static assets
│   └── index.html        # HTML template
├── backend/
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
│   ├── prisma/          # Database schema
│   └── tests/           # Backend tests
└── package.json         # Root package.json
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow consistent coding standards
- Implement proper error handling
- Write comprehensive tests
- Document API endpoints

### Database Management
- Use Prisma migrations for schema changes
- Implement proper indexing
- Handle transactions appropriately
- Back up data regularly

### Security Considerations
- Implement proper authentication
- Validate all user input
- Use secure session management
- Follow OWASP security guidelines
- Implement rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Component styling from [shadcn/ui](https://ui.shadcn.com/)
- Backend powered by [Express](https://expressjs.com/)
- Database ORM by [Prisma](https://www.prisma.io/)