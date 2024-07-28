import React, { useState } from 'react';
import axios from 'axios';
import RuleList from './RuleList';

const EvaluateRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [conditions, setConditions] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5004/api/rules/eval', {
        rule_name: ruleName,
        conditions: JSON.parse(conditions),
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error evaluating rule', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Rule Name:</label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Conditions (JSON format):</label>
          <textarea
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Evaluate Rule</button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <RuleList/>
    </div>
  );
};

export default EvaluateRule;