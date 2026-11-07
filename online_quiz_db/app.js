const express = require('express');
const path = require('path');
const db = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test Server
app.get('/test', (req, res) => {
    res.send('Node.js Server is Working Successfully!');
});

// Test MySQL Connection
app.get('/test-db', (req, res) => {

    console.log('Database test request received');

    db.query('SELECT 1 AS test', (err, results) => {

        if (err) {
            console.log('MySQL Query Error:', err.message);
            return res.status(500).send('Database Error: ' + err.message);
        }

        console.log('MySQL Query Successful');

        res.send('MySQL Database Connected Successfully!');
    });
});

// Get All Quizzes
app.get('/quizzes', (req, res) => {

    db.query('SELECT * FROM quizzes', (err, results) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);
    });
});

// Server Port
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});