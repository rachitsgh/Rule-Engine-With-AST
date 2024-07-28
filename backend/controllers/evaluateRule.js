const Node = require('../models/nodeSchema');
const Rule = require('../models/ruleSchema');


class ASTNode {
    constructor(elemType, value, left = null, right = null) {
        this.elemType = elemType;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

const ElemType = {
    COMPARISON: 'COMPARISON',
    LOGICAL: 'LOGICAL'
};

// Function to reconstruct the AST from MongoDB
const reconstructAST = async (nodeId) => {
    try {
        if (!nodeId) {
            return null;
        }
        const node = await Node.findById(nodeId).exec();
        if (!node) {
            return null;
        }
        const leftNode = await reconstructAST(node.left);
        const rightNode = await reconstructAST(node.right);
        return new ASTNode(node.elemType, node.value, leftNode, rightNode);
    } catch (error) {
        console.error('Error reconstructing AST:', error);
        throw new Error('Failed to reconstruct AST');
    }
};

// Function to evaluate the AST
const evaluateAST = (node, conditions) => {
    try {
        if (!node) {
            return false;
        }

        if (node.elemType === ElemType.COMPARISON) {
            const leftValue = conditions[node.left.value]; // Get the value of the left node (e.g., 'age' or 'department')
            const parsedRightValue = conditions[node.right.value] !== undefined ? conditions[node.right.value] : node.right.value; // Get the value of the right node (e.g., '35' or 'sales')
            
            // If rightValue is not a number, it means it's a variable from conditions
            // const parsedRightValue = isNaN(rightValue) ? rightValue : parseInt(rightValue, 10);
            
            switch (node.value) {
                case '>':
                    return leftValue > parsedRightValue;
                case '<':
                    return leftValue < parsedRightValue;
                case '=':
                    return leftValue === parsedRightValue;
                case '<=':
                    return leftValue <= parsedRightValue;
                case '>=':
                    return leftValue >= parsedRightValue;
                default:
                    return false;
            }
        }

        if (node.elemType === ElemType.LOGICAL) {
            const leftEval = evaluateAST(node.left, conditions);
            const rightEval = evaluateAST(node.right, conditions);

            if (node.value === 'and') {
                return leftEval && rightEval;
            } else if (node.value === 'or') {
                return leftEval || rightEval;
            }
        }

        return false;
    } catch (error) {
        console.error('Error evaluating AST:', error);
        throw new Error('Failed to evaluate AST');
    }
};

// Controller function to find and evaluate the rule
const evaluateRule = async (req, res) => {
    try {
        const { rule_name, conditions } = req.body;

        try {
            // Find the rule by name
            const rule = await Rule.findOne({ ruleName: rule_name }).exec();
            if (!rule) {
                return res.status(404).send({ error: "Rule not found" });
            }

            // Reconstruct the AST from the rule
            const rootNode = await reconstructAST(rule.root);
            if (!rootNode) {
                return res.status(500).send({ error: "Failed to reconstruct AST" });
            }

            // Evaluate the AST with the given conditions
            const evaluationResult = evaluateAST(rootNode, conditions);
            console.log('Evaluation Result:', evaluationResult);

            res.status(200).send({ message: 'Rule evaluated successfully', evaluationResult });
        } catch (error) {
            console.error('Error processing rule:', error);
            res.status(500).send({ error: "Error processing rule" });
        }

    } catch (error) {
        console.error('Error evaluating Rule:', error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = { evaluateRule };