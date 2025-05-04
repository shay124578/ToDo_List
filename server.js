const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 481;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public',)));

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ToDo.html'));
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

    // Redirect the client to ToDo.html
    res.redirect('/home');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});