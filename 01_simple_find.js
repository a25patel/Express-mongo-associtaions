var db = require('monk')('localhost/association-objects')
var people = db.get('people')
var employers = db.get('employers')
var addresses = db.get('addresses')

var findPerson = function(){
  var master = {};
  return people.find({}).then(function(peopleInfo){
    master.people = peopleInfo;
    return master
  })
}

module.exports = {
  findPerson: findPerson
};
