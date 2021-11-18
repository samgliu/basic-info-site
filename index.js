import http from 'http';
import https from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};

const server = https.createServer(options, (req, res) => {
    let getFileName = (req) => {
        switch (req.url) {
            case '/':
            case '/index.html':
                return 'index.html';
            case '/about':
            case '/about.html':
                return 'about.html';
            case '/contact-me':
            case '/contact-me.html':
                return 'contact-me.html';
            default:
                return '404.html';
        }
    };
    let filename = getFileName(req);
    let filePath = path.join(__dirname, filename);
    // extension of file
    let extname = path.extname(filePath);
    // initial content type
    let contentType = 'text/html';
    // check ext and set type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;

        case '.json':
            contentType = 'application/json';
            break;

        case '.png':
            contentType = 'image/png';
            break;

        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // page not found
                /*fs.readFile(
                    path.join(__dirname, '404.html'),

                    (err, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    }
                );*/
            } else {
                // server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => `Server is running on port ${PORT}`);
