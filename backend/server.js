const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/db.js');

const app = express();
const PORT = 481;

// Serve all static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'index.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'ToDo.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'login.html'));
});

// Endpoint to capture user info
app.get('/capture-info', (req, res) => {
    const userInfo = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // User's IP address
        userAgent: req.headers['user-agent'], // Browser and system info
        referrer: req.headers['referer'] || 'Direct Access', // Referrer info
        language: req.headers['accept-language'], // User's preferred language
        encoding: req.headers['accept-encoding'], // Accepted encoding formats
        cookies: req.headers['cookie'] || 'No cookies sent', // Cookies sent by the client
        time: new Date().toISOString(), // Timestamp of the request
        host: req.headers['host'], // Hostname of the server
        connection: req.headers['connection'], // Connection type (e.g., keep-alive)
        contentType: req.headers['content-type'] || 'Not specified', // Content type of the request
        accept: req.headers['accept'], // Accepted response formats
        protocol: req.protocol, // Protocol (http or https)
        method: req.method, // HTTP method (GET, POST, etc.)
        path: req.path, // Path of the request
        queryParams: req.query, // Query parameters in the URL
        secure: req.secure, // Whether the request is secure (HTTPS)
        httpVersion: req.httpVersion, // HTTP version
    };

    console.log('Captured User Info:', userInfo); // Log the info to the server console

    // Redirect the client to the home page (ToDo.html)
    res.redirect('/home');
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log('Sign Up Data:', { username, email, password }); // Log the submitted data

    db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        function (err) {
            if (err) {
                console.error('Error inserting user:', err.message);
                res.status(500).send('Error signing up');
            } else {
                console.log(`User ${username} added with ID ${this.lastID}`);
                // Redirect to ToDo.html after successful signup
                res.redirect('/home');
            }
        }
    );
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password],
        (err, row) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).send('Internal server error');
            }
            if (row) {
                // Credentials are correct, redirect to ToDo.html
                res.redirect('/home');
            } else {
                // Credentials are incorrect, redirect back to sign-up form
                // Option 1: Redirect to login with a query param (recommended)
                res.redirect('/login?showSignUp=1');
                // Option 2: Render a message or handle via JS (see below)
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});