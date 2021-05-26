const mongoose = require('mongoose');
const CollectionSchema = new mongoose.Schema({
  userName: String,
  articleID: String
});
const Collection = mongoose.model('collection', CollectionSchema);
module.exports = Collection;
