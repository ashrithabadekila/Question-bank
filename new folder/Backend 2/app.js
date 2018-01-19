'use strict'

const express = require('express')
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const app = express()
var mongoose=require('mongoose');
var reverse = require('reverse-string');
const router = express.Router()

const port     = process.env.PORT || 8080;


var f,b,c,d,e;

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
var dbo = mongoose.connection;
 
 var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
// example schema
var schema = new Schema({
    college:  String,
    branch:  String,
    sem:  String,
    subject: String,
    year: String,
    img_path:  String,
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// filename:function(req,file,callback){
       // callback(null,req.body.college+req.body.sem+req.body.branch+req.body.subject+req.body.year+'.jpg');
 //   }

 /*var myDocument = db.as.findOne();

if (myDocument) {
   var myName = myDocument.name;

   print (tojson(myName));
}*/
const upload = multer({
    dest:'images/upload/', 

    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
    
        if (!file.originalname.match(/\.(jpg|jpeg|JPG|pdf|png)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')
var pathh;

router.post('/images/upload', (req, res) => {

    upload(req, res, function (err) {

        if (err) {

            res.status(400).json({message: err.message})

        } else {
          
          /* var sem=req.body.sem;
            var branch=req.body.branch;
            var year=req.body.year;
            var subject=req.body.subject;
            var college=req.body.college;
            console.log(sem);
            console.log(branch);
            console.log(year);
            console.log(subject);
            console.log(college);
*/
             console.log(req.file);
          
            //"sem":sem ,"branch":branch,"year":year,"subject":subject,"college":college 
           // "sem":"5" ,"college":"vcet","subject":"daa" ,"year":"2015"
                       var query = {"year":req.body.year , "sem":req.body.sem}

          /*  dbo.collection("as").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

  });
*/

           // console.log(result.file.path);
           
          //  let path = `/images/${req.body.college+req.body.sem+req.body.branch+req.body.subject+req.body.year+'.jpg'}`
          let path=req.file.path;
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
    })
    var A = mongoose.model('A', schema);
 mongoose.connection.on('open', function () {
  console.error('mongo is open')

   // console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A;
 a.college= req.body.college;
    //a.college.contentType= 'String';
    a.sem= req.body.sem;
   // a.sem.contentType= 'String';
    a.branch= req.body.branch;
    //a.branch.contentType= 'String';
    a.subject=req.body.subject;
    //a.subject.contentType= 'String';
    a.year= req.body.year;
    //a.year.contentType= 'String';
    a.img_path= req.file.path;
   // a.img_path.contentType= 'url';
    a.save(function (err, a) {
      if (err) throw err;
      else
        console.log('path is succefully stored in database!!!!!!!!!!!!!');
}); 
   
});
    
    
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

/*app.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Image Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})*/

var pathhh;
app.post('/download', (req, res) => {
    

           var sem=req.body.sem;
            var branch=req.body.branch;
            var year=req.body.year;
            var subject=req.body.subject;
            var college=req.body.college;
            console.log(sem);
            console.log(branch);
            console.log(year);
            console.log(subject);
            console.log(college);
            //"sem":sem ,"branch":branch,"year":year,"subject":subject,"college":college 
           // "sem":"5" ,"college":"vcet","subject":"daa" ,"year":"2015"
                       var query = {"sem":sem ,"branch":branch,"year":year,"subject":subject,"college":college }

            dbo.collection("as").find(query, {_id:false, college:false,sem:false,branch:false,subject:false,year:false,_v:false}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
for(var i=0;i<result.length;i++){
  console.log(result[0].path);
  pathhh=result[0].path;


res.download(pathhh,'file.pdf');

}
    

 //pt="images/upload/"+pathhj
//console.log(pt);



  });
   



 // console.log(req.file.img_path.data);
// pathh=req.body.img_path;
            //console.log(pathh);
//var querry={"college":college,"sem":sem,"year":year,"branch":branch,"subject":subject};

  //console.log(pathhj);


    });

  /*  dbo.collection('as', function(err, collection) {
         //       collection.find({year:year , subject:subject ,branch:branch ,college:college ,sem:sem}, {_id:false,img_path:true , sem:false,branch:false,subject:false,year:false,_v:false}).toArray(function(err, items) {

        collection.find({}, {_id:false,img_path:false , college:true ,sem:false,branch:false,subject:false,year:false,_v:false}).toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });

    });*/

          /*  dbo.collection("as").f:ind(querry,(err,path)=>{
                res.send(path);
            })*/



app.get('/search', (req,res) => {

  /*  mongoose.connection.on('open', function () {
  if (err) throw err;
  var dbo = db.db("testing_storeImg");
  var query = { college: "vcet" };
  dbo.collection("as").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});*/

/*})

*/
});
var http = require('http');
var url  = require('url');
/*app.get('/:name', (req, res) => {
http.createServer(function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log(query); //{Object}

    res.end("End")
})
})*/
app.get('/endpoint', function(request, response) {
    var id = request.query.college;
    response.end("I have received the ID: " + id);
});

/*app.get('/:name', (req, res) => {

    var sPageURL = req.getParameter("name");
console.log("hii")
console.log(sPageURL);
});*/
app.listen(port)
console.log(`App Runs on ${port}`)