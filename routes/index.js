var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var utils = require('../utils/utils');
var Model = require("../models/Model");
/* GET home page. */



router.get('/results', function(req, res) {
 var results = req.query;
 console.log(results);
 if (!results.lat){
 	  res.render('index', { title: 'MMDX', lat: "Unknown", lng: "Unknown", diagnosis: "Unknown"});
 	}

 else{
 	 console.log("Got results");
 	 Model.create({location:{lat:parseFloat(results.lat), lng: parseFloat(results.lng)}, diagnosis: results.diagnosis}, function(err, request){
 	 	if (err){
 	res.json({
               statusCode: 500, 
               message: "Error creating a new data instance "+ err
           });
 	}
 	else{
 	  res.render('index', { title: 'MMDX', lat: results.lat, lng: results.lng, diagnosis: results.diagnosis });	  
 	}
 	 });
 
 }
});

module.exports = router;