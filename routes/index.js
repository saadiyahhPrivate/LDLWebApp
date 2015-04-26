var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Model = require("../models/Model")
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
