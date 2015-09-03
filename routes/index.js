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
    var array = master.people.map(function(person){
      return person.addressId
    })
    console.log('jninuubu');
    return addresses.find({_id:{$in: array}}).then(function(address){
      master.people = master.people.map(function(person){
        person.address = findMatchingAddress(person.addressId, address)
        return person
      })
      return master
    })
  }).then(function(master){
    console.log(master);
    res.render('index' ,master);
  })
});



function findMatchingAddress(addressId, addresses){
  for (var i = 0; i < addresses.length; i++) {
    if(addressId.toString() === addresses[i]._id.toString()){
      return addresses[i];
    }
  }

}
module.exports = router;
