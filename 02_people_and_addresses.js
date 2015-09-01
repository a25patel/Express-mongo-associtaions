var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')


var address = function(currentId){
  return people.findOne({id:currentId}).then(function(person){
    var master = {};
    master.person = person
    return master
  }).then(function(master){
    return addresses.findOne({id: master.person.addressId}).then(function(address){
      master.address = address
      return master
    })
  })
}

module.exports = {
  address: address
};
