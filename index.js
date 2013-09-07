#!/usr/bin/env node
'use strict';

var express = require('express');
var fs = require('fs');

var app = module.exports = express();

app.use(express.logger('dev'));

app.post('/', function (req, res) {

});

app.get('/', function (req, res) {

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
