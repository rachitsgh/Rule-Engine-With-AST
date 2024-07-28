const Node = require('../models/nodeSchema');
const Rule = require('../models/ruleSchema');

const getAllRules = async (req, res) => {
    try {
        const rules = await Rule.find();
        res.status(200).json(rules);
    } catch (error) {
        console.error('Error fetching rules:', error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports=getAllRules;