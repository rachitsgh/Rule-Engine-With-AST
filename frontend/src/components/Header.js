
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-6 text-white">
      <nav className="flex justify-between items-center">
        <Link to="/" className="hover:underline"><h1 className="text-3xl">Rule Engine</h1>
        </Link>
        <div className="space-x-6">
          <Link to="/create-rule" className="text-3xl hover:underline">
            Create Rule
          </Link>
          <Link to="/combine-rules" className="text-3xl hover:underline">
            Combine Rules
          </Link>
          <Link to="/evaluate-rule" className="text-3xl hover:underline">
            Evaluate Rule
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;