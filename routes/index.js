var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')
var information = require('../lib/mongo.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  people.find({}).then(function(documents){
    var master = {};
    master.people = documents;
    return master
  }).then(function(master){
    return addresses.find({_id: documents.addressId}).then(function(address){
      master.address = address;
      return master
    })
      res.render('index' ,master);
    })
  });

module.exports = router;
