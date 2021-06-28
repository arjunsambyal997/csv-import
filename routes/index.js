var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');

var mongoose = require('mongoose');

var User  = mongoose.model('Users');

var csvfile = __dirname + "/../public/files/user.csv";
var stream = fs.createReadStream(csvfile);


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Import CSV' });

}).get('/import', function(req, res, next) {

    var  user  = []
    var csvStream = csv.parse({header : true})
        .on("data", function(data){
         
         var item = new User({
              first_name: data[0] ,
              last_name: data[1]   ,
              email: data[2],
              mobile_number: data[3],
              date_of_birth:data[4],
              gender:data[5],
              permanent_address:data[6],
              optional_address:data[7]

         });
         
          item.save(function(error){
            console.log(item);
              if(error){
                  console.log( "\x1b[1m","\x1b[41m","can be duplicate entries, data already exits in database check fecth for new data already added","\x1b[0m");
                   throw error;
              }
          }); 

    }).on("end", function(){

    });
  
    stream.pipe(csvStream);
    res.json({success : "Data imported successfully.. :-)", status : 200});
    console.log("\x1b[1m","\x1b[42m","data imported to database","\x1b[0m");

     
  }).get('/fetchdata', function(req, res, next) {
    
    User.find({}, function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
            console.log("\x1b[1m","\x1b[42m","Data fetched properly no duplicate found","\x1b[0m");
        } else { 
            console.log(err);
            throw err;
            
        }
    });
  
});
module.exports = router;