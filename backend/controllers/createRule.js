const Node = require('../models/nodeSchema');
const Rule = require('../models/ruleSchema')
const createRule = async (req, res) => {
    try {
        console.log(req.body);
        const { rule_name, rule } = req.body;
        console.log(!rule_name);
        console.log(rule_name.length>0);

        //Validate Input
        if (rule_name.length <=0) {
            return res.status(400).send({ error: "rule_name can't be null or length can't be zero" })
        }
        if (!rule || typeof rule != 'string') {
            return res.status(400).send({ error: "rule can't be null" })
        }

        //Shunting Yard Algorith
        const PRECEDENCE = {
            '(': -1,
            ')': -1,
            'or': 1,
            'and': 1,
            '<': 2,
            '>': 2,
            '=': 2,
            '<=': 2,
            '>=': 2
        };

        const ElemType = {
            LOGICAL: 1,
            COMPARISON: 2,
            STRING: 3,
            INTEGER: 4,
            VARIABLE: 5
        };

        class ASTNode {
            constructor(elemType, value, left = null, right = null) {
                this.elemType = elemType;
                this.value = value;
                this.left = left;
                this.right = right;
            }
        }

        function shuntingYard(rule) {
            const tokens = rule.match(/\w+|[><]=?|AND|OR|\(|\)|=/g);
            const stack = [];
            const postfixExpr = [];

            for (let token of tokens) {
                if (!(token.toLowerCase() in PRECEDENCE)) {
                    postfixExpr.push(token);
                } else {
                    token = token.toLowerCase();
                    if (stack.length === 0) {
                        stack.push(token);
                    } else {
                        let prevoper = PRECEDENCE[stack[stack.length - 1]];
                        let curroper = PRECEDENCE[token];
                        if (curroper > prevoper) {
                            stack.push(token);
                        } else {
                            if (token === '(') {
                                stack.push(token);
                            } else if (token === ')') {
                                while (stack[stack.length - 1] !== '(') {
                                    postfixExpr.push(stack.pop());
                                }
                                stack.pop(); // remove the (
                            } else {
                                while (stack.length > 0 && curroper <= PRECEDENCE[stack[stack.length - 1]]) {
                                    postfixExpr.push(stack.pop());
                                }
                                stack.push(token);
                            }
                        }
                    }
                }
            }

            while (stack.length > 0) {
                let popped = stack.pop();
                if (PRECEDENCE[popped] === -1) {
                    return [];
                }
                postfixExpr.push(popped);
            }

            return postfixExpr;
        }
        //Convet POSTFIX to AST

        async function createAST(postfixExpr) {
            const nodestack = [];
            console.log(`Postfix: ${postfixExpr}`);
            for (let token of postfixExpr) {
                if (!(token in PRECEDENCE)) {
                    const node = new Node({ elemType: ElemType.STRING, value: token });
                    await node.save();
                    nodestack.push(node);
                } else {
                    const operand1 = nodestack.pop();
                    const operand2 = nodestack.pop();
                    const node = new Node({
                        elemType: token==='and'||token==='or'?ElemType.LOGICAL:ElemType.COMPARISON,
                        value: token,
                        left: operand2._id,
                        right: operand1._id
                    });
                    await node.save();
                    nodestack.push(node);
                }
            }
            console.log(nodestack);
            return nodestack.length === 1 ? nodestack[0] : null;
        }

        const postfixExpr = shuntingYard(rule);
        const root = await createAST(postfixExpr);
        if (root) {
            const newRule = new Rule({
                ruleName: rule_name,
                root: root._id,
                postfixExpr
            });
            await newRule.save();
            res.status(201).send({ message: 'Rule created successfully', rule: newRule });
        } else {
            res.status(500).send({ error: 'Failed to create AST' });
        }

    } catch (error) {
        console.error('Error creating Rule', error);
        res.status(500).send({ error: "Invalid Server Error" })
    }
}

module.exports = { createRule };