var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Model = require("../models/Model")
/* GET home page. */



router.get('/results', function(req, res) {
  var results = req.query;
  console.log(results);
  if (!results.lat){
  	   	res.render('index', { title: 'MMDX', lat: "Unknown", lng: "Unknown", diagnosis: "Unknown"});
  	}

  else{
	  var new_data = new Model({location:{lat:results.lat, lng: results.lon}, diagnosis:results.diagnosis});
	  new_data.save(function(err){
	  	if (err){
	  		res.json({
	                statusCode: 500, 
	                message: "Error creating a new data instance"
	            });
	  	}
	  	else{
	  	   	res.render('index', { title: 'MMDX', lat: results.lat, lng: results.lng, diagnosis: results.diagnosis });	   	
	  	}
	  });
  }
});

module.exports = router;
