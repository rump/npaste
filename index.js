#!/usr/bin/env node
'use strict';

var express = require('express');
var fs = require('fs');

var app = module.exports = express();

app.use(express.logger('dev'));
app.use(express.multipart());

app.get('/', function (req, res, next) {
  fs.readFile('index.html', function (err, data) {
    if (err) next(err);
    res.end(data);
  });
});

app.post('/', function (req, res, next) {
  var filename = 'pastes/' + new Date().getTime();
  fs.writeFile(filename, req.body.data + '\n', function (err) {
    if (err) next(err);
    res.redirect(filename);
  });
});

app.get(/^\/pastes\/(\d+)$/, function (req, res, next) {
  fs.readFile('pastes/' + req.params[0], function (err, data) {
    if (err) next();
    res.end(data);
  });
});

app.use(function (req, res, next) {
  res.statusCode = 404;
  res.end('404');
});

app.use(function (err, req, res, next) {
  res.statusCode = 500;
  res.end('500');
  console.error(err.stack);
});

app.listen(process.env.NODE_PORT || 8000);
process.title = process.env.NODE_NAME || 'npaste';
// process.setgid('nobody');
// process.setuid('nobody');
console.log('OK', new Date());
