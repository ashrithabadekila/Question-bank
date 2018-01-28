var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/testing_storeImg";
var unique = require("array-unique");
var assert = require('assert');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var docs,sems;
var i,j,k;


router.get('/colleges',function(req,res){

  MongoClient.connect(url, function(err, db) {

      var collection = db.collection('as')
         collection.distinct("college",{
          branch:req.param('branch'),subject:req.param('subject')},(function(err, docs){

          console.log(docs);
          
 collection.distinct("year",{ branch:req.param('branch'),subject:req.param('subject')}, (function(err, years){ 
                                 console.log(years);
                                
    
                                       var body=[
                                       docs,
                                       years
                                       
                                       ]
                                       res.json(body);
                                       
                          }))
       //assert.equal(null, err);
         //assert.equal(null, err);
             db.close();
         }))

   


})
});

module.exports = router;




