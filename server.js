require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const connectDB = require('./database');
const User = require('./models/User');

// Initialize Express app
const app = express();

// Connect to Database
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware - Use Express built-in body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') || '';
    res.locals.error_msg = req.flash('error_msg') || '';
    res.locals.error = req.flash('error') || '';
    res.locals.errors = req.flash('errors') || [];
    next();
});

// --- Passport.js Configuration ---

// Local Strategy for username/password login
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// --- Routes ---

// Middleware to pass company name to all views
app.use((req, res, next) => {
    res.locals.companyName = 'Ecourja Innovations';
    res.locals.user = req.user || null;
    next();
});

// Home page
app.get('/', (req, res) => {
    const pageData = {
        title: 'Ecourja Innovations',
        products: [
            {
                id: 'home-solar',
                name: 'Home Solar Solution',
                category: 'Residential',
                badgeClass: 'bg-success',
                image: '/images/home-solar.jpg',
                specs: {
                    inverter: '5kW Hybrid Inverter',
                    generation: 'Up to 800 kWh/month',
                    storage: '10 kWh Battery'
                },
                description: 'A complete solar solution for your home, reducing your electricity bills and carbon footprint.'
            },
            {
                id: 'commercial-wind',
                name: 'Commercial Wind Turbine',
                category: 'Commercial',
                badgeClass: 'bg-info',
                image: '/images/commercial-wind.jpg',
                specs: {
                    inverter: '100kW Grid-Tied Inverter',
                    generation: 'Up to 40,000 kWh/month',
                    storage: 'Grid-tied system'
                },
                description: 'Powerful wind turbines designed for commercial properties to generate clean energy and significant savings.'
            },
            {
                id: 'industrial-hybrid',
                name: 'Industrial Hybrid System',
                category: 'Industrial',
                badgeClass: 'bg-warning',
                image: '/images/industrial-hybrid.jpg',
                specs: {
                    inverter: '500kW Hybrid Inverter',
                    generation: 'Up to 200,000 kWh/month',
                    storage: '1 MWh Battery Storage'
                },
                description: 'Large-scale hybrid solar-wind solution for industrial facilities seeking energy independence.'
            }
        ]
    };
    res.render('index', pageData);
});

// Registration route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash('error_msg', 'Username already exists');
            return res.redirect('/register');
        }
        
        const user = new User({ username, password });
        await user.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
    } catch (err) {
        console.error('Error during registration:', err);
        req.flash('error_msg', 'Error registering user: ' + err.message);
        res.redirect('/register');
    }
});

// Login route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout route
app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Simple form routes (for demonstration)
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
    res.render('register', { 
        title: 'Register',
        name: '',
        email: '',
        password: '',
        password2: ''
    });
});

app.post('/contact', express.json(), (req, res) => {
    // Placeholder for handling contact form submissions
    console.log('Contact form received:', req.body);
    res.json({ ok: true, message: 'Form received' });
});

// Protected route example
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome to your profile, ${req.user.username}`);
    } else {
        res.redirect('/login');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});