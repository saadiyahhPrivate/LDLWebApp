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
      arrows:false,
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
    var diagnosisColors = {'Malaria': '#fa0', 'Tuberculosis': "#8DD2D7", 'Dengue': "#CF4E4E", 'Ebola': "#53CF4E"};
    var symbol = {'Malaria': 'm', 'Tuberculosis': "t", 'Dengue': "d", 'Ebola': "e"};
    //var diagnosisColors = {'Malaria': '#fa0', 'Tuberculosis': "#fa0", 'Dengue': "#fa0", 'Ebola': "#fa0"};
    for (var i=0; i<results.length; i++){
      var res = results[i];
      var diagnosis = res.diagnosis;
      var myColor = diagnosisColors[diagnosis];
      var mySymbol = symbol[diagnosis];
      //console.log(myColor);
      var description = "latitude: "+ res.lat + ", longitude: "+ res.lng;
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
    var ebolaChecked = $("#ebolaRadio").is(":checked");
    var dengueChecked = $("#dengueRadio").is(":checked");
    var tuberculosisChecked = $("#tuberculosisRadio").is(":checked");
    var malariaChecked = $("#malariaRadio").is(":checked");
    var disList = [];
    if(ebolaChecked){
      disList.push("Ebola");
    }

    if(dengueChecked){
      disList.push("Dengue");
    }

    if(malariaChecked){
      disList.push("Malaria");
    }

    if(tuberculosisChecked){
      disList.push("Tuberculosis");
    }

    var query = {'diseases':disList};


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