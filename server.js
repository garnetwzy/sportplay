var express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static')
const path = require('path')

var app = express();
app.use(cors())

app.use('/', serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 8080

app.listen(port);
console.log('Server running on port: ' + port);