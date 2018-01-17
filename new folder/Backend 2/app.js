var express = require('express'),
  app = express();
var http = require('http').Server(app);
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const storage = multer.diskStorage({
destination: '.public/uploads/',
filename: function(req, file, cb){
  cb(null,file.fieldname + '-'+Date.now()+path.extname(file.originalname));
}
});

const upload =multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file ,cb){
   checkFileType(file, cb);
  }
}).single('MyImage');
function checkFileType(file, cb){
const filetypes = /jpeg|jpg|png|gif/;
const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
const mimetype= filetypes.test(file.mimetype);
if(mimetype && extname){
  return cb(null,true);
}else{
  cb('Error: Image only!');
}
}

app.set('view engine', 'ejs'); 
app.use(express.static('./public'));
 app.get('/', (req, res) =>res.render('index'));
  app.get('/posts',function (req, res){
 mongoose.model('posts').find(function(err, posts){

  res.send(posts);
 });

 });
  
const port = 3000;
app.post('/upload',(req,res)=>{
upload(req,res,(err)=>{
if(err){
res.render('index',{
msg: err
}); 
}else {
  console.log(req.file);

  if(req.file==undefined){
    res.render('index',{
      msg: 'File uploaded!',
      file: 'uploads/${req.file.filename}'
    });
  }
  var Schema = mongoose.Schema;

// connect to mongo
mongoose.connect('localhost', 'testing_storeImg');

// example schema
var schema = new Schema({
  img:{data:Buffer,contentType:String},
    college: { data: String, contentType: String},
   sem: { data: String, contentType: String},
     branch: { data: String, contentType: String},
    subject: { data: String, contentType: String},
   year: { data: String, contentType: String},
    img_path: { data: String, contentType: String}
});
 

// our model
var A = mongoose.model('A', schema);
// var a = new A;
 // a.img.data = fs.readFileSync(req.file.path);
mongoose.connection.on('open', function () {
  console.error('mongo is open')

    console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A;
  a.img.data = fs.readFileSync(req.file.path);
   a.college.data= req.file.data;
    a.college.contentType= 'String';
    a.sem.data= req.file.college;
    a.sem.contentType= 'String';
    a.branch.data= req.file.branch;
    a.branch.contentType= 'String';
    a.subject.data= req.file.subject;
    a.subject.contentType= 'String';
    a.year.data= req.file.year;
    a.year.contentType= 'String';
    a.img_path.data= req.file.path;
    a.img_path.contentType= 'url';
    a.save(function (err, a) {
      if (err) throw err;
});      
});
    
    console.error('saved img to mongo');
}
});
});

 // app = express();
//var http = require('http').Server(app);
//var path = require('path');

//mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/testing_storeImg'); 

 app.get('/sem',function (req, res){
     var asc=req.params.url;
     console.log("All query strings: " + JSON.stringify(req.query));
   res.send('hello'+JSON.stringify(req.params.sem));

   })





  app.get('/',function (req, res){
     var asc=req.params.url;
     console.log(asc);
    res.sendfile('index.html');
  })
  mongoose.model('files',{filepath: String});
   mongoose.model('posts',{content: String});
      mongoose.model('download',{content: String});

var Schema = mongoose.Schema;

//backend 2 code starts
var TaskSchema = new Schema({
  id : { type:String}});
// Code to fetch parameters from url
 app.post('/semi',function (req, res){
module.exports=function(bodyParser,model,path){
    return function(req,res){
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader("Access-Control-Allow-Method","'GET, POST, OPTIONS, PUT, PATCH, DELETE'");
      const user={
            "year":req.body.year,
            "subject":req.body.subject,
            "branch":req.body.branch,
            "sem":req.body.sem,
            "college":req.body.college,
                    };
 console.log(req.body);
}
}})
//downloading an image
  app.get('/download',function (req, res){
     console.log(req.file);

 var asd='/.public/uploads/img1.jpg';
    res.download(__dirname+asd,'file.jpg');
      })

module.exports = mongoose.model('Tasks', TaskSchema);

  http.listen(3000, function () {
    console.log('Server started on port',+ port);

  })
  //http://localhost:3000/semi  if we pass this in postman, it wont throw error, instead it loads then stops saying it cannot get response