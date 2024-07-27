
const createRule = async (req, res) => {
    try {
        const { rule_name, rule_id, rule } = req.body;

        //Validate Input
        if (!rule_name || rule_name.length > 0) {
            return res.status(400).send({ error: "rule_name can't be null or length can't be zero" })
        }
        if (!rule || typeof rule != 'string') {
            return res.status(400).send({ error: "rule can't be null" })
        }

        //TODO: Converting INFIX to POSTFIX

        //TODO: Convet POSTFIX to AST

    } catch (error) {
        console.error('Error creating Rule', error);
        res.status(500).send({ error: "Invalid Server Error" })
    }
}

module.exports = { createRule };