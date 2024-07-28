import React, { useState } from 'react';
import axios from 'axios';
// import { toast } from 'react-toastify';
import RuleList from './RuleList'
const CombineRules = () => {
    const [ruleName, setRuleName] = useState('');
    const [rules, setRules] = useState(['']);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleAddRule = () => {
        setRules([...rules, '']);
    };

    const handleRemoveRule = (index) => {
        const newRules = [...rules];
        newRules.splice(index, 1);
        setRules(newRules);
    };

    const handleRuleChange = (index, value) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://rule-engine-with-ast-1.onrender.com/api/rules/combine_rules', {
                rule_name: ruleName,
                rules
            });
            setMessage(response.data.message);
            setError('');
            // toast.success(response.data.message);
        } catch (error) {
            console.error('Error combining rules:', error);
            setError(error.response?.data?.error || 'Failed to combine rules');
            // toast.error(error.response?.data?.error || 'Failed to combine rules');
        }
    };

    return (
        <>
            <div className="p-4 bg-gradient-to-r from-blue-200 to-cyan-200">
                <h2 className="text-xl font-bold mb-4">Combine Rules</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-2xl font-bold">Rule Name</label>
                        <input
                            type="text"
                            className="border rounded w-full py-2 px-3"
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                            required
                        />
                    </div>
                    {rules.map((rule, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <label className="block text-gray-700 mr-2 w-20 text-2xl font-bold">Rule {index + 1}</label>
                            <input
                                type="text"
                                className="border rounded w-full py-2 px-3 mr-2 text-2xl"
                                value={rule}
                                onChange={(e) => handleRuleChange(index, e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded text-2xl"
                                onClick={() => handleRemoveRule(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 px-4 text-3xl font-bold my-6"
                        onClick={handleAddRule}
                    >
                        Add Rule
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded px-4 text-3xl font-bold my-6"
                    >
                        Combine Rules
                    </button>
                </form>
                {message && <p className="mt-4 text-green-600 text-3xl font-bold">{message}</p>}
                {error && <p className="mt-4 text-red-600 text-3xl font-bold">{error}</p>}
            </div>
            <RuleList/>
        </>
    );
};

export default CombineRules;