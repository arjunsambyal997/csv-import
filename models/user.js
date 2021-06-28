var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

  first_name: { type: String, Required:  'First name cannot be left blank.' },

  last_name:    { type: String,     Required: false },

  email_address: { type: String ,    Required:  true },

  mobile_number: { type: Number ,    Required: true },

  date_of_birth: { type: String ,     Required: true},

  gender: { type: String ,      Required: true},

  address: {type : String }
});

module.exports = mongoose.model('Users', userSchema);