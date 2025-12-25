# Quick Start Guide - Ecourja Dynamic Website

## ✅ What Was Fixed

Your website now has:
- ✅ Proper environment variable configuration (.env loaded)
- ✅ Secure session management
- ✅ Modern Express body parsing (deprecated body-parser removed)
- ✅ Flash messages for user feedback
- ✅ Fixed duplicate User.js file issue
- ✅ Corrected MongoDB connection
- ✅ Updated login view
- ✅ Better error handling

## 🚀 How to Run

### Option 1: Quick Start
```powershell
npm start
```

Then open: http://localhost:3000

### Option 2: With Custom Port
```powershell
$env:PORT=5000; npm start
```

## 🧪 Test Your Dynamic Website

### 1. Homepage (Dynamic Content)
- ✅ 3 products displayed dynamically from server
- ✅ User authentication status in header
- ✅ Interactive calculators
- ✅ Contact form

### 2. User Registration
1. Visit http://localhost:3000
2. Click "Login" button
3. Click "Don't Have An Account? Register"
4. Create account with:
   - Username: testuser
   - Password: Test123!
5. ✅ Should see success message and redirect to login

### 3. User Login
1. Enter your credentials
2. ✅ Should redirect to homepage
3. ✅ Header shows "Hello, testuser" and "Logout"

### 4. Dynamic Features Test
- ✅ **Solar Calculator**: Enter bill amount and sunlight hours
- ✅ **Wind Calculator**: Enter wind speed and property size
- ✅ **Contact Form**: Fill and submit (check console for log)
- ✅ **Navigation**: All links scroll to sections
- ✅ **Logout**: Click logout, should return to guest view

## 🔧 Environment Variables

Your `.env` file is configured with:
```
MONGODB_URI=mongodb+srv://[your-connection-string]
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANT**: Change `SESSION_SECRET` before deploying to production!

## 📊 What Makes This Dynamic?

### Server-Side Rendering (EJS)
- **Header**: Displays different content for logged-in vs guest users
- **Products**: Rendered from server data (easy to add more)
- **Flash Messages**: Server-driven user notifications
- **User Data**: Username displayed when logged in

### Database Integration
- **MongoDB Atlas**: User accounts stored in cloud
- **Mongoose Models**: Structured data with validation
- **Password Hashing**: Secure bcrypt implementation

### User Authentication
- **Passport.js**: Industry-standard authentication
- **Sessions**: Secure, encrypted user sessions
- **Protected Routes**: /profile route requires login

## 🎯 Key Dynamic Features

1. **Product Display** (lines 82-123 in server.js)
   - Products array passed to template
   - Easy to add/modify products
   - Each product rendered dynamically

2. **User Context** (lines 52-56 in server.js)
   - Every page knows if user is logged in
   - Header adapts to show login/logout
   - Username displayed when authenticated

3. **Flash Messages** (lines 44-50 in server.js)
   - Registration success/error messages
   - Login failure notifications
   - Displayed via EJS partials

4. **Form Handling**
   - Registration: Validates, hashes password, stores in DB
   - Login: Authenticates against DB
   - Contact: Accepts JSON, returns JSON

## 📁 Project Structure

```
EcourjaWebsite/
├── 📄 server.js          ← Main server (UPDATED - uses dotenv, flash, no body-parser)
├── 📄 database.js        ← MongoDB connection (UPDATED - correct env variable)
├── 📄 .env              ← Environment config (UPDATED - added SESSION_SECRET)
├── 📂 models/
│   └── User.js          ← User model with password hashing
├── 📂 views/
│   ├── index.ejs        ← Dynamic homepage
│   ├── login.ejs        ← Login page (FIXED - proper Bootstrap form)
│   ├── register.ejs     ← Registration page
│   └── 📂 partials/
│       ├── header.ejs   ← Navigation (UPDATED - correct logout link)
│       ├── footer.ejs   ← Footer
│       └── messages.ejs ← Flash messages display
├── 📂 public/
│   ├── script.js        ← Calculator logic
│   ├── styles.css       ← Styling
│   └── 📂 images/
│       └── ecourja.jpg
├── 📄 README.md         ← Full documentation (UPDATED)
└── 📄 CHANGES.md        ← This change log
```

## 🔐 Security Features

- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **Session Security**: Secure cookies in production
- ✅ **Environment Variables**: Credentials not in code
- ✅ **Session Secret**: Configurable via .env
- ✅ **HTTPS Ready**: Secure cookie flag for production

## 🚨 Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution**: Make sure views/index.ejs exists

### Issue: MongoDB connection error
**Solution**: Check your MONGODB_URI in .env file

### Issue: "User.js not found"
**Solution**: User.js should only exist in models/ folder (root copy removed)

### Issue: Flash messages not showing
**Solution**: Already fixed! Flash is now properly configured

### Issue: Body parser deprecated warning
**Solution**: Already fixed! Using Express built-in parsing

## 📈 Performance Notes

- Static files cached by Express
- Sessions stored in memory (consider Redis for production)
- MongoDB connection pooling enabled
- EJS templates compiled and cached

## 🎉 You're All Set!

Your website is now a **fully dynamic, database-driven web application** with:
- ✅ User authentication
- ✅ Dynamic content rendering  
- ✅ Database integration
- ✅ Secure session management
- ✅ Interactive features
- ✅ Production-ready security practices

Run `npm start` and enjoy your dynamic website! 🚀
