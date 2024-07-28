// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <nav className="flex justify-between items-center">
        <Link to="/" className="hover:underline"><h1 className="text-2xl">Rule Engine</h1>
        </Link>
        <div className="space-x-4">
          <Link to="/create-rule" className="hover:underline">
            Create Rule
          </Link>
          <Link to="/combine-rules" className="hover:underline">
            Combine Rules
          </Link>
          <Link to="/evaluate-rule" className="hover:underline">
            Evaluate Rule
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;