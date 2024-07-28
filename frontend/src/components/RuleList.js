import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RuleList = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('https://rule-engine-with-ast-1.onrender.com/api/rules/getRules');
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-3xl font-bold mb-4">Rule List</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule._id} className="mb-2 text-2xl">
            <strong>{rule.ruleName}</strong>: {rule.rule}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;