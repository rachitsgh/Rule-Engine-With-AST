import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RuleList = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/rules');
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Rule List</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule._id} className="mb-2">
            <strong>{rule.ruleName}</strong>: {rule.rule}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;