# Replit Configuration for Programme FUTUR Certificate Authentication System

## Overview

This is a full-stack React application for authenticating certificates issued by Programme FUTUR. The system allows users to search for and verify certificate authenticity by student matricule number. It features a public search interface and an admin dashboard for managing student records.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the stack
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with Vite integration

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Data Layer
- **Database Schema**: Simple student interface with local storage
- **Storage**: Browser localStorage for student data persistence
- **Validation**: TypeScript interfaces for type safety
- **Storage Interface**: Local storage functions with CRUD operations

### Authentication System
- **Admin Access**: Simple password-based authentication ("futur2025")
- **Session Management**: Server-side sessions with PostgreSQL storage
- **Public Access**: No authentication required for certificate lookup

### Certificate Management
- **Student Records**: Local storage with default seed data
- **Search Functionality**: Matricule-based certificate lookup
- **Admin Dashboard**: CRUD operations for student management
- **Photo Management**: File upload support with base64 encoding and URL fallbacks

### UI Architecture
- **Component Library**: Shadcn/ui components built on Radix UI
- **Theming**: Custom CSS variables with dark/light mode support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **French Localization**: All UI text in French

## Data Flow

1. **Certificate Search**: User enters matricule → Local storage lookup → Display certificate or error
2. **Admin Login**: Password verification → Session creation → Dashboard access
3. **Student Management**: Admin adds/edits students → Local storage update → UI refresh
4. **Database Operations**: Drizzle ORM → PostgreSQL queries → Type-safe results

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database queries
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type checking and compilation
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Server**: Express with Vite middleware for HMR
- **Database**: Requires DATABASE_URL environment variable
- **Port**: Configurable, defaults to development server

### Production Build
- **Frontend**: `vite build` outputs to `dist/public`
- **Backend**: `esbuild` bundles server to `dist/index.js`
- **Database**: Drizzle migrations with `npm run db:push`
- **Start**: `npm start` runs production server

### Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Set to "production" for production builds
- **Session Storage**: Requires PostgreSQL for session persistence

### Key Architectural Decisions

1. **Hybrid Storage**: Local storage for demo data with PostgreSQL backend for sessions
   - **Rationale**: Allows immediate functionality while maintaining scalable architecture
   - **Trade-off**: Data persistence limited until full database integration

2. **Serverless PostgreSQL**: Neon Database for managed PostgreSQL
   - **Rationale**: Reduces infrastructure complexity and provides automatic scaling
   - **Benefits**: No server management, built-in connection pooling

3. **Monorepo Structure**: Client, server, and shared code in one repository
   - **Rationale**: Simplifies development and deployment workflows
   - **Benefits**: Shared types, easier refactoring, single build process

4. **French-First UI**: All interface text in French
   - **Rationale**: Targets French-speaking users of Programme FUTUR
   - **Implementation**: Hard-coded French strings, no i18n library

5. **Simple Authentication**: Basic password protection for admin features
   - **Rationale**: Minimal security requirements for certificate management
   - **Trade-off**: Not suitable for production without proper user management