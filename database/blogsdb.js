const mongoose = require('mongoose');
let blogScheme = new mongoose.Schema({
 title:String,
 image:String,
 body:String,
 created:{type:Date,default:Date.now}
});
module.exports = mongoose.model('posts',blogScheme);