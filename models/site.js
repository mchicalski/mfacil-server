var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var siteSchema = new Schema({
  title: String,
  searchUrl: String,
  icon: String
});

module.exports = mongoose.model('Site', siteSchema);