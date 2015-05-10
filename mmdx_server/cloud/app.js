
// These two lines are required to initialize Express in Cloud Code.
 express = require('express');
 var resultsController = require('cloud/controllers/results.js');
 app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.

app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});


app.post('/send_data', resultsController.receiveData);
app.get('/all', resultsController.showAll);

//adding stuff for d3.js
// require.config({
//   paths: {
//     "d3": "http://d3js.org/d3.v3.min",
//     "d3.geo.projection": "http://d3js.org/d3.geo.projection.v0.min",
//     "topojson": "http://d3js.org/topojson.v1.min"
//   },
//   shim: {
//     "d3.geo.projection": ["d3.global"]
//   }
// });

// define("d3.global", ["d3"], function(_) {
//   d3 = _;
// });

// require(["d3", "topojson", "d3.geo.projection"], function(d3, topojson) {
//   console.log(d3.geo.aitoff);
// });

//adding stuff for d3.js

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
