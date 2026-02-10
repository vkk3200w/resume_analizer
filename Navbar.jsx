import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <Briefcase className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-gray-900">ResumeMatchers</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Home</Link>
                        <Link to="/upload" className="bg-primary text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors">
                            Analyze Resume
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
