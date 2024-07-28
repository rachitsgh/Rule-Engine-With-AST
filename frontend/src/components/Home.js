import React from 'react';
import { Link } from 'react-router-dom';
// import Header from './Header';

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
        <h1 className="text-4xl font-bold mb-8">Rule Engine Using AST</h1>
        <div className="space-y-4 space-x-6 font-extrabold text-3xl ">
          <Link to="/create-rule">
            <button className="px-6 py-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300">
              Create Rule
            </button>
          </Link>
          <Link to="/combine-rules">
            <button className="px-6 py-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
              Combine Rules
            </button>
          </Link>
          <Link to="/evaluate-rule">
            <button className="px-6 py-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300">
              Evaluate Rule
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;