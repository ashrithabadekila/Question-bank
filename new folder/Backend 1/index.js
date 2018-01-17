// grab the packages we need
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const http = require('http');
const mongoose = require('mongoose');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var f,b,c,d,e;
var upload = multer({ storage : storage}).single(req.body.img);

// routes will go here
/*  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

  res.send(user_id + ' ' + token + ' ' + geo);
});*/


/*const storage = multer.diskStorage({
destination: '.public/uploads/',
filename: function(req, file, cb){
  cb(null,file.fieldname + '-'+Date.now()+path.extname(file.originalname));
}
});*/
var Schema = mongoose.Schema;

// connect to mongo
mongoose.connect('localhost', 'testing_storeImg');

// example schema
var schema = new Schema({
    college: { data: String, contentType: String},
    branch: { data: String, contentType: String},
    sem: { data: String, contentType: String},
    subject: { data: String, contentType: String},
    year: { data: String, contentType: String},
    img_path: { data: String, contentType: String},
});
//a.img.data = fs.readFileSync(req.file.path);
// our model







var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/users', function(req, res) {
    //var user_id = req.body.id;
   // var token = req.body.token;
   // var geo = req.body.geo;


  //  res.send(user_id + ' ' + token + ' ' + geo);

 //***********************************************************************************************************  
   f= req.body.college;
   
  b= req.body.sem;
  
  c= req.body.branch;
  
  d= req.body.subject;
  
    e= req.body.year;
     res.send('image is stored'); 
     console.log(req.img);

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'C:/api/users/.public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, f+b+c+d+e+'.pdf');
  }
});
app.use(express.static('./public'));

var upload = multer({ storage : storage}).single(req.body.img);
 upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });

//******************************************************************************************************



     var A = mongoose.model('A', schema);
 mongoose.connection.on('open', function () {
  console.error('mongo is open')

   // console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A;
 a.college.data= req.body.college;
    a.college.contentType= 'String';
    a.sem.data= req.body.sem;
    a.sem.contentType= 'String';
    a.branch.data= req.body.branch;
    a.branch.contentType= 'String';
    a.subject.data=req.body.subject;
    a.subject.contentType= 'String';
    a.year.data= req.body.year;
    a.year.contentType= 'String';
    a.img_path.data= 'C:/api/users/.public/uploads'+req.body.college+req.body.sem+req.body.branch+req.body.subject+req.body.year+'.pdf';

    a.img_path.contentType= 'url';
    a.save(function (err, a) {
      if (err) throw err;
      else
      	console.log('path is succefully stored in database!!!!!!!!!!!!!');
}); 
   
});
    
    
    
});
 
   

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);