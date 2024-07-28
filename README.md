# Rule Engine with AST

## Objective

Develop a simple 3-tier rule engine application (Simple UI, API, and Backend, Data) to determine user eligibility based on attributes like age, department, income, spend, etc. The system uses an Abstract Syntax Tree (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of these rules.

## Data Structure

Define a data structure to represent the AST. The data structure should allow rule changes. One possible data structure is a `Node` with the following fields:

- **type**: String indicating the node type ("operator" for AND/OR, "operand" for conditions)
- **left**: Reference to another Node (left child)
- **right**: Reference to another Node (right child for operators)
- **value**: Optional value for operand nodes (e.g., number for comparisons)

## Data Storage

Define the choice of database for storing the above rules and application metadata. MongoDB is a suitable choice for its flexibility and JSON-like documents.

### Schema Example

**Rule Schema**:
```json
{
  "rule_name": "string",
  "rule": "string",
  "postfixExpr":"string",
  "AST": "object"
}
```

##API Design

1.create_rule(rule_string) 

-This function takes a string representing a rule (as shown in the examples) and returns a Node object representing the corresponding AST. The Shunting Yard algorithm is used to convert the rule string into a postfix expression, which is then used to construct the AST.
![create_rule logical diagram](create_rule.png)
