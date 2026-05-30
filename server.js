const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();

require('dotenv').config();
const cookies = require('cookie-parser');


// ✅ THIS was missing — serves everything in /public as static files
// This is what allows fetch('/components/nav.html') to work


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'components'))); // Serve components as static files
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', require('./routes/api'));
// app.use('/auth', require('./routes/auth'));
// app.use('/users', require('./routes/users'));

app.use('/api/auth', require('./src/routes/auth.js'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"), (err) => {
        if (err) res.status(500).end(`Error loading file: ${err}`);
    });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"), (err) => {
        if (err) res.status(500).end(`Error loading file: ${err}`);
    });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"), (err) => {
        if (err) res.status(500).end(`Error loading file: ${err}`);
    });
});

app.get('/display', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "display.html"), (err) => {
        if (err) res.status(500).end(`Error loading file: ${err}`);
    });
});

app.listen(port, () => console.log(`🚀 http://localhost:${port}`));
// const server = http.createServer('/', (req, res) => {

// console.log(req.url);
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
//     res.sendFile(path.join(__dirname,"public","backend.html"), (err) => {
//         if (err) {
//             res.statusCode = 500;
//             res.end(`Error loading file: ${err}`);
//         }
//     });
// });
// server.listen(port, () => console.log(`🚀 http://localhost:${port}`));



