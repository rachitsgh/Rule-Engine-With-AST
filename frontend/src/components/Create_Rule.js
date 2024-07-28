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
      toast.success('Rule Created Succesfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      toast.error(err.response?.data?.error , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        });
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Rule</h2>
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
          <label className="block text-gray-700">Rule:</label>
          <textarea
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Rule</button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded text-red-700">
          {error}
        </div>
      )}
      <RuleList/>
    </div>
  );
};

export default CreateRule;