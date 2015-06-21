$(document).ready(function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoibW1keGFwcCIsImEiOiJwY0Q4MHZ3In0.pM9yzFoRKpkXcm8T8rh1QQ';
  var map = L.mapbox.map('map', 'mmdxapp.58a3a46d', {
    // These options apply to the tile layer in the map.
    tileLayer: {
    // This map option disables world wrapping. by default, it is false.
      continuousWorld: false,
    // This option disables loading tiles outside of the world bounds.
      noWrap: true
    }
  }).setView([11.109315, 22.000575], 2);


  map.featureLayer.setGeoJSON([]);


   


  $.ajax({

        url: "/map",
        method: "GET",
        success: function(data) {
            if (data.statusCode == 200) {
              addMarkers(data.results);
              addDateSlider(data.results);

            } else {
                errorRedirect(data.message);
            }
        }   
    });

      
  var addDateSlider = function(results){
    var dates = getDatesArray(results);
    var maxDate=new Date(Math.max.apply(null,dates)); 
    var minDate=new Date(Math.min.apply(null,dates));

    $("#slider").dateRangeSlider({
      valueLabels: "change",
      bounds:{
        min: minDate,
        max:maxDate
      },
      step:{
        days: 2
      },
      defaultValues:{
        min: minDate,
        max: maxDate
      }
    });


  }
  var addMarkers = function(results){
    var markers = [];
    var diagnosisColors = {'Dengue I': '#fa0', 'Dengue II': "#8DD2D7", 'Dengue III': "#CF4E4E", 'Dengue IV': "#53CF4E"};
    var symbol = {'Dengue I': 'd', 'Dengue II': "d", 'Dengue III': "d", 'Dengue IV': "d"};
    //var diagnosisColors = {'Malaria': '#fa0', 'Tuberculosis': "#fa0", 'Dengue': "#fa0", 'Ebola': "#fa0"};
    for (var i=0; i<results.length; i++){
      var res = results[i];
      var diagnosis = res.diagnosis;
      var myColor = diagnosisColors[diagnosis];
      var mySymbol = symbol[diagnosis];
      //console.log(myColor);
      var description = "latitude: "+ res.lat + ", longitude: "+ res.lng+"; CreatedAt: "+res.createdAt;
      var geojson = {
             type: "Feature",
             geometry: {
              type: "Point",
              coordinates: [res.lng, res.lat]
             },
             properties: {
               title: diagnosis,
               description: description,
              'marker-size': 'small',
              'marker-symbol': mySymbol,
              'marker-color': myColor
            }
      };
      markers.push(geojson);

    }
    map.featureLayer.setGeoJSON(markers);
  }


  $("#filters").submit(function(){
    event.preventDefault();
    var dengueIChecked = $("#dengueIRadio").is(":checked");
    var dengueIIChecked = $("#dengueIIRadio").is(":checked");
    var dengueIIIChecked = $("#dengueIIIRadio").is(":checked");
    var dengueIVChecked = $("#dengueIVRadio").is(":checked");
    var disList = [];
    if(dengueIChecked){
      disList.push("Dengue I");
    }

    if(dengueIIChecked){
      disList.push("Dengue II");
    }

    if(dengueIIIChecked){
      disList.push("Dengue III");
    }

    if(dengueIVChecked){
      disList.push("Dengue IV");
    }

    var query = {'diseases':disList};

    var dateValues = $("#slider").dateRangeSlider("values");
    var minDate = dateValues.min;
    var maxDate = dateValues.max;
    query.minDate = minDate;
    query.maxDate = maxDate;


    $.ajax({
          url: "/map_filtered",
          method: "POST",
          data:JSON.stringify(query),
          processData: false,
          contentType: 'application/json',
          success: function(data) {
              if (data.statusCode == 200) {
                addMarkers(data.results);

              } else {
                  console.log("ERROR");
              }
          }   
      });


      });

  var getDatesArray = function(results){
    var dates = [];
    for (var i=0; i< results.length; i++){
      dates.push(new Date(results[i].createdAt));
    }
    return dates;
  }
});    