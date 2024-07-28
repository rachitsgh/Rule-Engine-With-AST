const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruleSchema = new Schema({
    ruleName: String,
    rule:String,
    root: { type: Schema.Types.ObjectId, ref: 'Node' },
    postfixExpr: [String]
});

module.exports = mongoose.model('Rule', ruleSchema);