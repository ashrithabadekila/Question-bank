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
'use strict'

const express = require('express')
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const app = express()
var mongoose=require('mongoose');
const router = express.Router()
const randomBytes=require('random-bytes');
var crypto=require('crypto');
var mime=require('mime-types');
var MongoClient = require('mongodb').MongoClient;
//var dt = require('./app1');
var Schema = mongoose.Schema;

// connect to mongo
mongoose.connect('localhost', 'node');
var dbo=mongoose.connection;
// example schema
var schema = new Schema({
   college: String,
    branch:  String,
   // sem:  String,
    subject:String,
    year:  String,
    examination:String,
    img_path: String,
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/upload/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});




const upload = multer({storage:storage,
  //  dest:'images/upload/', 

    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
    
        if (!file.originalname.match(/\.(pdf)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')

router.post('/images/upload', (req, res) => {

   //console.log(req.file);

    upload(req, res, function (err) {
      console.log(req.body.college);


var url = "mongodb://localhost:27017/node";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("node");
 
 dbo.collection("as").find({$or:[{college:req.body.college},{college:'vtu'}],branch:req.body.branch,subject:req.body.subject,year:req.body.year,examination:req.body.examination}).toArray(function(err, result) {
    if (err) throw err;
    if(result==''){
      console.log(result);
         if (err) {

            res.status(400).json({message: err.message})

        } else {
            console.log(req.file);



var A = mongoose.model('A', schema);
 mongoose.connection.on('open', function () {
  console.error('mongo is open')

   
    var a = new A;
    if(req.body.examination=='external')
    {
      a.college='vtu';
    }
    else

         {
          a.college= req.body.college;
        }
   
    //a.sem= req.body.sem;
   
    a.branch= req.body.branch;
  
    a.subject=req.body.subject;
  
    a.year= req.body.year;
  
   a.examination=req.body.examination;
 
   
    a.img_path= req.file.path;
 
    a.save(function (err, a) {
      if (err) throw err;
      else
        console.log('path is succefully stored in database!!!!!!!!!!!!!');
}); 
   
});

         
          let path=req.file.path;
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
       // console.log(result);
     }
     else
     {
      console.log("no");
      res.send("QUESTION PAPER is already exist!!!!");
     }

    db.close();
  });
});

 })
   
    })

router.get('/images/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/images/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

  res.writeHead(200, {'Content-Type': mime })
  res.end(image, 'binary')
})


app.use('/', router)

app.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Image Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})

router.post('/download', (req, res) => {
  var pathhh;

         
          var branch=req.body.branch;
          var year=req.body.year;
          var subject=req.body.subject;
          var college=req.body.college;
          
       
  var query = { "branch":branch,"year":year,"subject":subject,"college":college }
  dbo.collection("as").find(query, {_id:false, college:false,sem:false,branch:false,subject:false,year:false,_v:false}).toArray(function(err, result) {
if(result.length==0){
  res.send("Question paper doesn't exist.....!");
}

if(result.length!=0){
  

    //  if (err) throw err;
//for(var i=0;i<result.length;i++){
pathhh=__dirname+'\\'+result[0].img_path;

//console.log(__dirname+pathhh);
res.download(pathhh,'file.pdf');
}
});

  });


router.post('/search', (req,res) => {


var query={} ;
      var subject=req.body.subject;
      if(!req.body.subject){res.send("you should enter subject")}
            var branch=req.body.branch;
            if(!req.body.branch){res.send("you should enter branch")}
            var year=req.body.year;
           
            var college=req.body.college;
            var exam=req.body.examination;
       

            query={"branch":branch,"subject":subject}
          
          if(college){
             query["college"]=college;
            }
          
             if(year){
               query["year"]=year;
            }
            console.log(subject);
            console.log(branch);
            

          dbo.collection("as").find(query).toArray(function(err, result) {
    if (err) throw err;
   res.send(result);
   console.log(result);
});

 });
       

router.get('/endpoint', function(request, response) {
    var id = request.query.college;
    response.end("I have received the ID: " + id);
});


module.exports = router;
