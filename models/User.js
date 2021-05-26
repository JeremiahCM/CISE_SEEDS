const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  hash: String
});

module.exports = User = mongoose.model('user', UserSchema);