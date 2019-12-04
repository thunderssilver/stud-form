
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  //database:"sampledb2"
});

con.connect(function(error) {
  if (!!error)
  {
  		console.log('Error'); 
  }
  else{
  	console.log("Connected!");
  }
  con.query("CREATE DATABASE mydb", function (error, result) {
    if (!!error){

    	console.log('error in query');
    }else{
    	console.log("Database created");
    }
    
  });
})