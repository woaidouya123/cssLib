var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
    content: String
})

module.exports = mongoose.model('label', LabelSchema);