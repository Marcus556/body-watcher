const mongoose = require('mongoose');
//users schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 512
  },
  body: {
    type: Object,
    ref: 'body'
  },
  date: {
    type: Date,
    default: Date.now
  }

});

//export model User with schema: userSchema
module.exports = mongoose.model('User', userSchema)