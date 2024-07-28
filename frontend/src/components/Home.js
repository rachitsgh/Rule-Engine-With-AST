import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Rule Management System</h1>
      <div className="space-y-4">
        <Link to="/create-rule">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300">
            Create Rule
          </button>
        </Link>
        <Link to="/combine-rules">
          <button className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
            Combine Rules
          </button>
        </Link>
        <Link to="/evaluate-rule">
          <button className="px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300">
            Evaluate Rule
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;