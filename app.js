import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 8000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/about.html'));
});
app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(__dirname, '/contact-me.html'));
});

app.use(function (req, res, next) {
    //Capture All 404 errors
    res.status(404).sendFile(path.join(__dirname, '/404.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
