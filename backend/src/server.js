const http = require('http');
const fs = require('fs');
const path = require('path');

let payments = {};
let counter = 1;

function serveStatic(res, filePath, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const file = path.join(__dirname, '../../frontend/index.html');
    serveStatic(res, file);
  } else if (req.method === 'POST' && req.url === '/api/payments') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { amount, currency } = JSON.parse(body || '{}');
        const id = counter++;
        payments[id] = { id, amount, currency, status: 'pending' };
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payments[id]));
      } catch (e) {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
  } else if (req.method === 'GET' && req.url.startsWith('/api/payments/')) {
    const id = req.url.split('/').pop();
    const payment = payments[id];
    if (!payment) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payment));
  } else if (req.method === 'GET' && req.url.startsWith('/')) {
    // Serve other static files from frontend directory
    const file = path.join(__dirname, '../../frontend', req.url);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      const ext = path.extname(file);
      const type = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html'
      }[ext] || 'application/octet-stream';
      serveStatic(res, file, type);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
