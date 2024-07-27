const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new Schema({
    elemType: Number,
    value: String,
    left: { type: Schema.Types.ObjectId, ref: 'Node' },
    right: { type: Schema.Types.ObjectId, ref: 'Node' }
});

module.exports = mongoose.model('Node', nodeSchema);