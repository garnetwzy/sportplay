var express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static')
const path = require('path')

var app = express();
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use('/', serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 8080

app.listen(port);
console.log('Server running on port: ' + port);