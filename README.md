# Ecourja Innovations — Dynamic Website

A fully dynamic website for Ecourja Innovations powered by Express.js, EJS templates, MongoDB, and user authentication.

## Features

- **Dynamic Content Rendering**: EJS templates for flexible, server-side rendering
- **User Authentication**: Complete registration and login system with Passport.js
- **MongoDB Integration**: User data stored securely in MongoDB Atlas
- **Interactive Calculators**: Solar and Wind energy savings calculators
- **Contact Form**: Contact form submissions with JSON response
- **Secure Sessions**: Session management with express-session
- **Flash Messages**: User feedback via connect-flash
- **Responsive Design**: Bootstrap 5 for mobile-friendly layout

## How to Run

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Installation

```powershell
cd "C:\Users\ADMIN\OneDrive\Desktop\EcourjaWebsite"
npm install
```

### Configuration

Create or update `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secure_session_secret
PORT=3000
NODE_ENV=development
```

### Start the Server

```powershell
npm start
```

Open http://localhost:3000 in your browser.

## Project Structure

```
EcourjaWebsite/
├── models/
│   └── User.js              # User model with password hashing
├── views/
│   ├── partials/
│   │   ├── header.ejs       # Navigation header
│   │   ├── footer.ejs       # Footer
│   │   └── messages.ejs     # Flash messages
│   ├── index.ejs            # Main homepage
│   ├── login.ejs            # Login page
│   └── register.ejs         # Registration page
├── public/
│   ├── images/              # Static images
│   ├── css/                 # Stylesheets
│   └── js/                  # Client-side JavaScript
├── server.js                # Express server configuration
├── database.js              # MongoDB connection
├── .env                     # Environment variables (not in git)
└── package.json             # Dependencies
```

## Dynamic Features

### 1. User Authentication
- Registration with username/password
- Login with session management
- Logout functionality
- Protected routes

### 2. Dynamic Product Display
Products are rendered dynamically from server-side data, making it easy to add/remove/update products without changing templates.

### 3. Interactive Calculators
- **Solar Calculator**: Calculates annual savings, CO2 reduction, and ROI
- **Wind Calculator**: Estimates energy generation and payback period

### 4. Contact Form
Submits data via AJAX and returns JSON response.

## Security Features

- Password hashing with bcryptjs
- Session management with secure cookies
- Environment variable configuration
- CSRF protection ready (csurf package installed)
- Secure MongoDB connection

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **Templating**: EJS
- **Frontend**: Bootstrap 5, Font Awesome, Animate.css
- **Security**: bcryptjs, express-session, connect-flash

## Notes

- Static assets (styles.css, script.js, images) are served from the `public` directory
- MongoDB connection uses environment variables for security
- Session secret should be changed in production
- All views use EJS partials for consistent layout
- Flash messages provide user feedback for authentication actions

