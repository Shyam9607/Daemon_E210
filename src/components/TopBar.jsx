import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../data/mockDB';
import { FaBell, FaSearch } from 'react-icons/fa';

const TopBar = () => {
    const navigate = useNavigate();
    const courses = Object.keys(db.courses); // ["CSE311", "CSE312"]

    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-blue-600 z-40 shadow-md flex items-center justify-between px-6">
            <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar mask-gradient-right">
                <span className="text-blue-100 font-medium text-sm mr-2 uppercase tracking-wider">My Courses:</span>
                {courses.map((code) => (
                    <button
                        key={code}
                        id={`btn-course-${code}`}
                        onClick={() => navigate(`/course/${code}/home`)}
                        className="px-4 py-1.5 bg-blue-700 hover:bg-blue-500 text-white text-sm font-medium rounded-full transition-colors border border-blue-500 hover:border-blue-400 whitespace-nowrap"
                    >
                        {code}
                    </button>
                ))}
            </div>

            <div className="flex items-center space-x-4 text-white">
                <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                    <FaSearch className="text-lg opacity-80" />
                </button>
                <button className="p-2 hover:bg-blue-500 rounded-full transition-colors relative">
                    <FaBell className="text-lg opacity-80" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-blue-600"></span>
                </button>
                <div className="flex items-center space-x-3 ml-2 pl-4 border-l border-blue-500">
                    <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-xs font-bold border border-blue-400">
                        DM
                    </div>
                    <span className="text-sm font-medium opacity-90 hidden sm:block">
                        {db.student.name.split(" ")[0]}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
