
//var http = require('http');
var mysql = require('mysql');
var express=require('express');
//const router=express.Router();
var bodyParser=require('body-parser');
//var fs=require('fs');
const app=express();
const port=8080;
//app.use(express.static('../library'))
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//postman reads as empty set if not used
app.use(bodyParser.urlencoded({ extended: true }));//postman reads as empty set if not used
app.set('view engine','pug');

app.get('/',function(req,res){
	res.sendFile('index.html',{root:__dirname})
});



/*
app.post('/submit',function(req,res){

	console.log(req.body);
res.render('index',{title:'Data saved',
message: 'data saved'})
});*/
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});



/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html',null,function(error, data){

  	if(error){

  		res.writeHead(404);
  		res.write('File not Found');
  	}
  	else{

  		res.write(data);
  	}
  	res.end();
  });
 
}).listen(8080);*/


con.connect(function(err) {
  if (err){

  	console.log("err");
  }
  console.log("Connected!");

});



app.post('/submit',function(req,res){
//console.log(req.body);


var sql = "INSERT INTO stud VALUES (null,'"+req.body.named+"','"+req.body.add+"')";
  
  
  con.query(sql, function (err, rows,fields) {
    if (err) {

    	console.log("err in q");
    }else{

      res.send({named:req.body.named,add:req.body.add});
    res.render('index',{title: 'Data saved', 
message: 'Data saved'})
		}  
  });
//con.end();
})



app.get('/users',function(req,res){
	var sql = "Select * from stud";
  
  
  con.query(sql, function (err, rows,fields) {
    if (err) {

    	console.log("err in q");
    }else{
      //res.send({named:req.body.named,add:req.body.add});

      res.status(200).json({
                message:"All Details.",
                rows:rows,
                fields:fields
            });
    res.render('users',{title: 'User Details', 
items: rows})
		}  
  });
//con.end();
});


app.post("/delete", (req, res, next) => {
 
    //var pid = req.body.productId;
 var sql = "DELETE FROM stud WHERE name ='"+req.body.named+"'";
    con.query(sql, (err, data)=> {
        if(!err) {
            if(data > 0) {
                res.status(200).json({
                    message:"name deleted.",
                    named:req.body.named
                });
            } else {
                res.status(200).json({
                    message:"name Not found."
                });
            }
        } 
    });   
});




app.listen(port,()=>console.log("listening on port::8080"));
//module.exports=router;