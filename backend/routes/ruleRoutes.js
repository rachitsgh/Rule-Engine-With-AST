const express=require('express');
const router=express.Router();
const createRule=require('../controllers/createRule')
const combineRules=require('../controllers/combineRule')
const evaluateRule=require('../controllers/evaluateRule')


//TODO
//createRule
router.post('/create_rule',createRule);
router.post('/combine_rules',combineRules);
router.post('/evaluate_rule',evaluateRule);

module.exports={router}