import React, { useState } from 'react';
import axios from 'axios';
import RuleList from '../components/RuleList';
import { toast ,Flip } from 'react-toastify';

const CreateRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [rule, setRule] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    try {
      const res = await axios.post('http://localhost:5004/api/rules/create', {
        rule_name: ruleName,
        rule,
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded shadow-md">
      <h2 className="text-4xl font-bold mb-4">Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-2xl font-bold">Rule Name:</label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full p-2 border rounded bg-gray text-2xl"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-2xl font-bold">Rule:</label>
          <textarea
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="w-full p-2 border text-2xl rounded"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 px-4 text-3xl font-bold my-6 text-white p-2 rounded">Create Rule</button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <pre>{JSON.stringify(response, null,2)}</pre>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded text-red-700 text-3xl font-bold">
          {error}
        </div>
      )}
      <RuleList/>
    </div>
  );
};

export default CreateRule;