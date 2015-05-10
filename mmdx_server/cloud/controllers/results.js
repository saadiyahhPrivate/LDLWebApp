var Result = Parse.Object.extend('Result');



exports.receiveData = function(req, res) {
  var results = req.body; //get data from query
  alert(results);
  var new_result = new Result();

    new_result.set("lat", results.lat.toString());
    new_result.set("lng", results.lng.toString());
    new_result.set("diagnosis", results.diagnosis);

    new_result.save(null, {
      success: function(new_result) {
      // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + new_result.id);
        res.redirect('/');
      },
      error: function(new_result, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
        res.send(500, 'Failed creating Result object');
      }
  });
}

exports.giveAll = function(req, res) {
  var query = new Parse.Query(Result);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.json({statusCode: 200, results:results});
    //res.render('index', {results: results });
  },
  function() {
    res.json({statusCode: 500, message:"too bad"});
    //res.send(500, 'Failed loading results');
  });
};

exports.showAll = function(req, res) {
  var query = new Parse.Query(Result);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.render('index', {results: results });
  },
  function() {
    res.send(500, 'Failed loading results');
  });
};