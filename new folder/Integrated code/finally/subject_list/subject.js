var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/testing_storeImg";
var unique = require("array-unique");
var assert = require('assert');
var express=require('express');
var router = express.Router();
var docs,sems;
var i,j,k;
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/subjects',function(req,res){

  MongoClient.connect(url, function(err, db) {

      var collection = db.collection('as');
         collection.distinct("subject",{branch:req.param('branch')},(function(err, docs){

          console.log(docs);
        res.json(docs);
                                       
                        
       
}))
         assert.equal(null, err);
       
             db.close();
      
   })
});

module.exports = router;



