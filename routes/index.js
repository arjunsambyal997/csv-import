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
              email_address: data[2],
              mobile_number: data[3],
              date_of_birth:data[4],
              gender:data[5],
              address:data[6] 
         });
         
          item.save(function(error){
            console.log(item);
              if(error){
                   throw error;
              }
          }); 

    }).on("end", function(){

    });
  
    stream.pipe(csvStream);
    res.json({success : "Data imported successfully.", status : 200});
    console.log('data imported to database');

     
  }).get('/fetchdata', function(req, res, next) {
    
    User.find({}, function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
        } else { 
            throw err;
        }
    });
  
});
module.exports = router;