const express=require('express');
const router=express.Router();
const {createRule}=require('../controllers/createRule')
const {combineRules}=require('../controllers/combineRule')
const {evaluateRule}=require('../controllers/evaluateRule');
const getAllRules = require('../controllers/rules');



//createRule
router.post('/create',createRule);
//combineRule
router.post('/combine_rules',combineRules);
//evaluateRule
router.post('/eval',evaluateRule);
//getAllRules
router.get('/getRules',getAllRules)

module.exports=router