# Replit Configuration for Programme FUTUR Certificate Authentication System

## Overview

This is a simplified certificate authentication system for Programme FUTUR built with pure HTML, Tailwind CSS, and vanilla JavaScript. The system allows users to search for and verify certificate authenticity by student matricule number, with an admin interface for managing student records.

## User Preferences

Preferred communication style: Simple, everyday language.
Technology preference: HTML, Tailwind CSS, and vanilla JavaScript only (no frameworks).

## System Architecture

### Frontend Architecture
- **Technology**: Pure HTML5, Tailwind CSS, vanilla JavaScript
- **Styling**: Tailwind CSS via CDN with custom configuration
- **Typography**: Montserrat font from Google Fonts
- **Color Scheme**: Custom blue theme (#0b1d3a background, #00ffff accent, #ff7f00 secondary)
- **Responsive**: Mobile-first design with Tailwind responsive utilities

### Backend Architecture
- **Simplified**: Minimal Express.js server for development workflow compatibility
- **Data Storage**: JavaScript arrays in memory (client-side data)
- **No Database**: Removed PostgreSQL dependencies as per user request

### Project Structure
```
├── index.html       # Main application file
├── script.js        # All JavaScript functionality
├── server/          # Minimal server for development workflow
└── shared/          # Simple TypeScript interfaces
```

## Key Components

### Data Layer
- **Student Data**: JavaScript array with default student records
- **Storage**: Client-side JavaScript variables (resets on page refresh)
- **Data Structure**: Simple objects with id, name, firstName, matricule, filiere, photo

### Authentication System
- **Admin Access**: Simple password check ("futur2025")
- **Session**: Basic boolean flag in JavaScript
- **Public Access**: Open certificate search functionality

### Certificate Management
- **Student Records**: Hardcoded sample data with 3 default students
- **Search**: Case-insensitive matricule matching
- **Admin Dashboard**: Add new students with photo upload (base64 encoding)
- **Photo Management**: File upload with preview, fallback to default images

### UI Features
- **French Interface**: All text and labels in French
- **Professional Design**: Modern card-based layout with gradients
- **Notifications**: Success/error messages with auto-hide
- **Modal System**: Admin login modal with backdrop
- **Responsive Layout**: Works on mobile and desktop

## Data Flow

1. **Certificate Search**: User input → JavaScript search → Display results or error
2. **Admin Login**: Password check → Show admin dashboard
3. **Student Management**: Form submission → Add to JavaScript array → Update UI
4. **Photo Upload**: File selection → Base64 conversion → Store in student object

## Current Student Data

Default students included:
- Jean KOUAKOU (FUT2024001) - Informatique
- Marie DIABATE (FUT2024002) - Marketing Digital  
- Amadou TRAORE (FUT2024003) - Comptabilité

## Key Features

### Search Functionality
- Case-insensitive matricule search
- Professional certificate display with student photo
- Clear error messages for non-existent certificates
- Smooth scrolling to results

### Admin Dashboard  
- Password-protected access ("futur2025")
- Add new students with required fields
- File upload for student photos with preview
- Real-time student list updates
- Logout functionality

### Design Elements
- Custom Tailwind configuration with project colors
- Montserrat font throughout
- Professional footer with contact information
- Gradient backgrounds and hover effects
- Responsive grid layouts

## Recent Changes (January 26, 2025)

- ✓ Completely removed React/TypeScript framework
- ✓ Removed PostgreSQL database and all related dependencies
- ✓ Simplified to pure HTML, CSS, and JavaScript
- ✓ Implemented vanilla JavaScript for all functionality
- ✓ Maintained professional design and French localization
- ✓ Kept admin functionality with simplified authentication
- ✓ Photo upload works with base64 encoding

## Development

- **Command**: Files can be served directly or through the existing Express server
- **Hot Reload**: Automatic refresh when files change
- **No Build Process**: Direct HTML/CSS/JS execution
- **No Dependencies**: Everything works without npm packages (except dev server)