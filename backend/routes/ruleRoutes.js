const express=require('express');
const router=express.Router();
const {createRule}=require('../controllers/createRule')
// const {combineRules}=require('../controllers/combineRule')
// const {evaluateRule}=require('../controllers/evaluateRule')



//createRule
router.post('/create',createRule);
//combineRule
// router.post('/combine_rules',combineRules);
//evaluateRule
// router.get('/evaluate_rule',evaluateRule);

module.exports=router