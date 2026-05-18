const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();

// ✅ THIS was missing — serves everything in /public as static files
// This is what allows fetch('/components/nav.html') to work
app.use(express.static(path.join(__dirname, 'public')));

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



