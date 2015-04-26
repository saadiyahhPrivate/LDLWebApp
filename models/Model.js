var mongoose = require("mongoose"),
Schema = mongoose.Schema;
ObjectId = mongoose.Schema.ObjectId;


var possibleDiagnosis = [
"Ebola", 
"Dengue",
"Malaria", 
"Healthy" 
];


var locationSchema = mongoose.Schema({    
location: {        
lat: {type: Number, required: true},        
lng: {type: Number, required: true}     
},    
diagnosis: {
type: String, 
required:true, 
enum:possibleDiagnosis 
}  
}); 

var Location = mongoose.model("Location", locationSchema); 

module.exports = Location;