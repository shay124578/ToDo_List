const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 481;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public',)));

app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});