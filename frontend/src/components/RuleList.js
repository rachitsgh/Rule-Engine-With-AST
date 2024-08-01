import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RulesLoader from './RulesLoader';

const RuleList = () => {
  const [rules, setRules] = useState([]);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('https://rule-engine-with-ast-1.onrender.com/api/rules/getRules');
        setRules(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []);

  return isLoading?<div className='text-white flex justify-center'><RulesLoader text={"Loading Rules"}/></div>:(
    <div className="bg-black shadow-md rounded-lg p-4">
      <h2 className="text-3xl text-white font-bold mb-4">Rule List</h2>
      <ul className='text-green-500'>
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